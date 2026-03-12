import type { RepositoryFullData } from '~/types/github'

export function buildRepoContext(data: RepositoryFullData): string {
  const { repo, contributors, languages, releases, recentCommits, readme, fileTree, fileContents } = data
  const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0)
  const languageList = Object.entries(languages).sort(([, a], [, b]) => b - a)
    .map(([lang, bytes]) => `${lang} (${((bytes / totalBytes) * 100).toFixed(1)}%)`).join(', ')
  const topContributors = contributors.slice(0, 5).map(c => `${c.login} (${c.contributions} commits)`).join(', ')
  const latestRelease = releases[0] ? `${releases[0].tag_name} (${new Date(releases[0].published_at).toLocaleDateString()})` : 'No releases'
  const recentCommitMessages = recentCommits.slice(0, 5).map(c => `- ${c.commit.message.split('\n')[0]}`).join('\n')
  const readmeSnippet = readme ? readme.slice(0, 1500) + (readme.length > 1500 ? '...[truncated]' : '') : 'No README found'
  const treeSnippet = fileTree.slice(0, 80).join('\n')
  const filesSection = Object.entries(fileContents).map(([path, content]) => {
    const truncated = content.length > 3000 ? content.slice(0, 3000) + '\n...[truncated]' : content
    return `### ${path}\n\`\`\`\n${truncated}\n\`\`\``
  }).join('\n\n')
  return `
# Repository Analysis Context

## Basic Information
- **Name**: ${repo.full_name}
- **Description**: ${repo.description || 'No description'}
- **URL**: ${repo.html_url}
- **Visibility**: ${repo.visibility}
- **Archived**: ${repo.archived}
- **License**: ${repo.license?.name || 'No license'}
- **Default Branch**: ${repo.default_branch}

## Statistics
- **Stars**: ${repo.stargazers_count.toLocaleString()}
- **Forks**: ${repo.forks_count.toLocaleString()}
- **Open Issues**: ${repo.open_issues_count.toLocaleString()}

## Technology
- **Primary Language**: ${repo.language || 'Unknown'}
- **All Languages**: ${languageList || 'Unknown'}
- **Topics**: ${repo.topics.join(', ') || 'None'}

## Community
- **Top Contributors**: ${topContributors || 'Unknown'}
- **Latest Release**: ${latestRelease}

## Recent Commits
${recentCommitMessages || 'No recent commits'}

## File Tree
\`\`\`
${treeSnippet}
\`\`\`

## README
${readmeSnippet}

## Source Files
${filesSection || 'No source files fetched'}
`.trim()
}

export function buildCompareContext(left: RepositoryFullData, right: RepositoryFullData): string {
  function repoSection(data: RepositoryFullData, label: string): string {
    const { repo, contributors, languages, releases, recentCommits, readme } = data
    const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0)
    const languageList = Object.entries(languages).sort(([, a], [, b]) => b - a)
      .map(([lang, bytes]) => `${lang} (${((bytes / totalBytes) * 100).toFixed(1)}%)`).join(', ')
    const topContributors = contributors.slice(0, 3).map(c => `${c.login} (${c.contributions})`).join(', ')
    const latestRelease = releases[0] ? `${releases[0].tag_name} (${new Date(releases[0].published_at).toLocaleDateString()})` : 'No releases'
    const recentMsgs = recentCommits.slice(0, 3).map(c => `  - ${c.commit.message.split('\n')[0]}`).join('\n')
    const readmeSnippet = readme ? readme.slice(0, 800) + (readme.length > 800 ? '...' : '') : 'No README'
    const filesSection = Object.entries(data.fileContents).slice(0, 4).map(([path, content]) => {
      const truncated = content.length > 1500 ? content.slice(0, 1500) + '\n...[truncated]' : content
      return `  ### ${path}\n  \`\`\`\n${truncated}\n  \`\`\``
    }).join('\n\n')
    return `
## ${label}: ${repo.full_name}
- Description: ${repo.description || 'None'}
- Stars: ${repo.stargazers_count.toLocaleString()} | Forks: ${repo.forks_count.toLocaleString()} | Issues: ${repo.open_issues_count.toLocaleString()}
- License: ${repo.license?.spdx_id || 'None'} | Archived: ${repo.archived}
- Created: ${new Date(repo.created_at).toLocaleDateString()} | Last push: ${new Date(repo.pushed_at).toLocaleDateString()}
- Languages: ${languageList || 'Unknown'}
- Topics: ${repo.topics.join(', ') || 'None'}
- Contributors: ${topContributors || 'Unknown'}
- Latest release: ${latestRelease}
- Recent commits:
${recentMsgs}
- README excerpt: ${readmeSnippet}
- Source files:
${filesSection || '  (none fetched)'}
`.trim()
  }

  return `# Repository Comparison Context

You are comparing two GitHub repositories. Be neutral, analytical, and fair to both.
For each aspect you analyze, consider both sides before drawing conclusions.

${repoSection(left, 'REPO A')}

---

${repoSection(right, 'REPO B')}

---

When answering:
- Always reference repos as "${left.repo.full_name}" and "${right.repo.full_name}" (not just A/B)
- Give concrete pros and cons for each
- End with a clear recommendation based on use case
- Use markdown tables where helpful for direct comparisons
`
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days < 1) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  if (days < 365) return `${Math.floor(days / 30)} months ago`
  return `${Math.floor(days / 365)} years ago`
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
