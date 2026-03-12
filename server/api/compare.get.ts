import type { RepositoryFullData, GitHubRepository, GitHubContributor, GitHubLanguages, GitHubRelease, GitHubCommit } from '~/types/github'

async function fetchGitHub<T>(url: string, token?: string): Promise<T> {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'GitHub-AI-Analyzer/1.0',
  }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(url, { headers })
  if (!res.ok) {
    if (res.status === 404) throw createError({ statusCode: 404, message: `Repository not found` })
    if (res.status === 403) throw createError({ statusCode: 403, message: 'GitHub API rate limit exceeded' })
    throw createError({ statusCode: res.status, message: `GitHub API error: ${res.statusText}` })
  }
  return res.json() as Promise<T>
}

async function fetchReadme(owner: string, repo: string, token?: string): Promise<string | null> {
  try {
    const data = await fetchGitHub<{ content: string; encoding: string }>(
      `https://api.github.com/repos/${owner}/${repo}/readme`, token
    )
    if (data.encoding === 'base64') return atob(data.content.replace(/\n/g, ''))
    return data.content
  } catch { return null }
}

interface TreeItem { path: string; type: string; size?: number; sha: string }

async function fetchFileTree(owner: string, repo: string, branch: string, token?: string): Promise<TreeItem[]> {
  try {
    const data = await fetchGitHub<{ tree: TreeItem[] }>(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`, token
    )
    return data.tree.filter(f => f.type === 'blob')
  } catch { return [] }
}

function pickImportantFiles(files: TreeItem[]): TreeItem[] {
  const priority = [
    /^(package\.json|cargo\.toml|go\.mod|pyproject\.toml|requirements\.txt)$/i,
    /^(dockerfile|docker-compose\.yml)$/i,
    /^src\/(index|main|app)\.(ts|js|py|go|rs)$/i,
    /^(index|main|app)\.(ts|js|py|go|rs)$/i,
    /^(tsconfig|vite\.config|nuxt\.config|next\.config)\.(json|ts|js)$/i,
  ]
  const important: TreeItem[] = []
  const seen = new Set<string>()
  for (const pattern of priority) {
    for (const file of files) {
      if (!seen.has(file.path) && pattern.test(file.path) && (file.size ?? 0) < 50000) {
        important.push(file); seen.add(file.path)
      }
    }
  }
  const srcFiles = files
    .filter(f => !seen.has(f.path) && (f.path.startsWith('src/') || f.path.startsWith('lib/'))
      && /\.(ts|js|vue|py|go|rs)$/.test(f.path)
      && !f.path.includes('test') && (f.size ?? 0) < 30000)
    .slice(0, 6)
  return [...important, ...srcFiles]
}

async function fetchFileContent(owner: string, repo: string, path: string, token?: string): Promise<string | null> {
  try {
    const data = await fetchGitHub<{ content: string; encoding: string }>(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`, token
    )
    if (data.encoding === 'base64') return atob(data.content.replace(/\n/g, ''))
    return data.content
  } catch { return null }
}

async function fetchFullRepo(owner: string, repo: string, token?: string): Promise<RepositoryFullData> {
  const BASE = `https://api.github.com/repos/${owner}/${repo}`
  const [repoData, contributors, languages, releases, recentCommits, readme] = await Promise.all([
    fetchGitHub<GitHubRepository>(BASE, token),
    fetchGitHub<GitHubContributor[]>(`${BASE}/contributors?per_page=10`, token).catch(() => [] as GitHubContributor[]),
    fetchGitHub<GitHubLanguages>(`${BASE}/languages`, token).catch(() => ({} as GitHubLanguages)),
    fetchGitHub<GitHubRelease[]>(`${BASE}/releases?per_page=3`, token).catch(() => [] as GitHubRelease[]),
    fetchGitHub<GitHubCommit[]>(`${BASE}/commits?per_page=8`, token).catch(() => [] as GitHubCommit[]),
    fetchReadme(owner, repo, token),
  ])
  const fileTree = await fetchFileTree(owner, repo, repoData.default_branch, token)
  const importantFiles = pickImportantFiles(fileTree)
  const fileContents: Record<string, string> = {}
  const results = await Promise.all(importantFiles.map(f => fetchFileContent(owner, repo, f.path, token).then(c => ({ path: f.path, content: c }))))
  for (const { path, content } of results) { if (content) fileContents[path] = content }
  return { repo: repoData, contributors, languages, releases, recentCommits, readme, fileTree: fileTree.map(f => f.path), fileContents }
}

export default defineEventHandler(async (event) => {
  const { owner1, repo1, owner2, repo2 } = getQuery(event) as Record<string, string>
  if (!owner1 || !repo1 || !owner2 || !repo2) {
    throw createError({ statusCode: 400, message: 'owner1, repo1, owner2, repo2 are required' })
  }
  const config = useRuntimeConfig(event)
  const token = config.githubToken || undefined
  const [left, right] = await Promise.all([
    fetchFullRepo(owner1, repo1, token),
    fetchFullRepo(owner2, repo2, token),
  ])
  return { left, right }
})
