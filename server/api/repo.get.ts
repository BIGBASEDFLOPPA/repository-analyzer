import type { RepositoryFullData, GitHubRepository, GitHubContributor, GitHubLanguages, GitHubRelease, GitHubCommit } from '~/types/github'

async function fetchGitHub<T>(url: string, token?: string): Promise<T> {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'GitHub-AI-Analyzer/1.0',
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(url, { headers })

  if (!res.ok) {
    if (res.status === 404) throw createError({ statusCode: 404, message: 'Repository not found' })
    if (res.status === 403) throw createError({ statusCode: 403, message: 'GitHub API rate limit exceeded. Add GITHUB_TOKEN to .env' })
    throw createError({ statusCode: res.status, message: `GitHub API error: ${res.statusText}` })
  }

  return res.json() as Promise<T>
}

async function fetchReadme(owner: string, repo: string, token?: string): Promise<string | null> {
  try {
    const data = await fetchGitHub<{ content: string; encoding: string }>(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      token
    )
    if (data.encoding === 'base64') {
      return atob(data.content.replace(/\n/g, ''))
    }
    return data.content
  } catch {
    return null
  }
}

interface TreeItem {
  path: string
  type: string
  size?: number
  sha: string
}

async function fetchFileTree(owner: string, repo: string, branch: string, token?: string): Promise<TreeItem[]> {
  try {
    const data = await fetchGitHub<{ tree: TreeItem[]; truncated: boolean }>(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
      token
    )
    return data.tree.filter(f => f.type === 'blob')
  } catch {
    return []
  }
}

function pickImportantFiles(files: TreeItem[]): TreeItem[] {
  const priority: RegExp[] = [
    /^(package\.json|cargo\.toml|go\.mod|pyproject\.toml|requirements\.txt|composer\.json)$/i,
    /^(dockerfile|docker-compose\.yml|\.env\.example)$/i,
    /^src\/(index|main|app)\.(ts|js|py|go|rs|java)$/i,
    /^(index|main|app)\.(ts|js|py|go|rs|java)$/i,
    /^\.github\/workflows\/.+\.yml$/i,
    /^(tsconfig|eslint|vite\.config|nuxt\.config|next\.config)\.(json|ts|js)$/i,
  ]

  const important: TreeItem[] = []
  const seen = new Set<string>()

  for (const pattern of priority) {
    for (const file of files) {
      if (!seen.has(file.path) && pattern.test(file.path) && (file.size ?? 0) < 50000) {
        important.push(file)
        seen.add(file.path)
      }
    }
  }

  const srcFiles = files
    .filter(f =>
      !seen.has(f.path) &&
      (f.path.startsWith('src/') || f.path.startsWith('lib/') || f.path.startsWith('app/')) &&
      /\.(ts|js|vue|py|go|rs|java|tsx|jsx)$/.test(f.path) &&
      !f.path.includes('test') &&
      !f.path.includes('spec') &&
      !f.path.includes('node_modules') &&
      (f.size ?? 0) < 30000
    )
    .slice(0, 10)

  return [...important, ...srcFiles]
}

async function fetchFileContent(owner: string, repo: string, path: string, token?: string): Promise<string | null> {
  try {
    const data = await fetchGitHub<{ content: string; encoding: string }>(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      token
    )
    if (data.encoding === 'base64') {
      return atob(data.content.replace(/\n/g, ''))
    }
    return data.content
  } catch {
    return null
  }
}

export default defineEventHandler(async (event) => {
  const { owner, repo } = getQuery(event) as { owner?: string; repo?: string }

  if (!owner || !repo) {
    throw createError({ statusCode: 400, message: 'owner and repo query params are required' })
  }

  const config = useRuntimeConfig(event)
  const token = config.githubToken || undefined
  const BASE = `https://api.github.com/repos/${owner}/${repo}`

  const [repoData, contributors, languages, releases, recentCommits, readme] = await Promise.all([
    fetchGitHub<GitHubRepository>(BASE, token),
    fetchGitHub<GitHubContributor[]>(`${BASE}/contributors?per_page=10`, token).catch(() => [] as GitHubContributor[]),
    fetchGitHub<GitHubLanguages>(`${BASE}/languages`, token).catch(() => ({} as GitHubLanguages)),
    fetchGitHub<GitHubRelease[]>(`${BASE}/releases?per_page=5`, token).catch(() => [] as GitHubRelease[]),
    fetchGitHub<GitHubCommit[]>(`${BASE}/commits?per_page=10`, token).catch(() => [] as GitHubCommit[]),
    fetchReadme(owner, repo, token),
  ])

  const fileTree = await fetchFileTree(owner, repo, repoData.default_branch, token)
  const importantFiles = pickImportantFiles(fileTree)

  const fileContents: Record<string, string> = {}
  const chunks: typeof importantFiles[] = []
  for (let i = 0; i < importantFiles.length; i += 8) {
    chunks.push(importantFiles.slice(i, i + 8))
  }
  for (const chunk of chunks) {
    const results = await Promise.all(
      chunk.map(async (f) => {
        const content = await fetchFileContent(owner, repo, f.path, token)
        return { path: f.path, content }
      })
    )
    for (const { path, content } of results) {
      if (content) fileContents[path] = content
    }
  }

  const result: RepositoryFullData = {
    repo: repoData,
    contributors,
    languages,
    releases,
    recentCommits,
    readme,
    fileTree: fileTree.map(f => f.path),
    fileContents,
  }

  return result
})
