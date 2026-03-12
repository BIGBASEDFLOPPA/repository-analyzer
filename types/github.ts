export interface GitHubOwner {
  login: string
  avatar_url: string
  html_url: string
  type: 'User' | 'Organization'
}

export interface GitHubLicense {
  key: string
  name: string
  spdx_id: string
}

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  clone_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  watchers_count: number
  forks_count: number
  open_issues_count: number
  size: number
  default_branch: string
  topics: string[]
  visibility: 'public' | 'private'
  archived: boolean
  disabled: boolean
  created_at: string
  updated_at: string
  pushed_at: string
  license: GitHubLicense | null
  owner: GitHubOwner
}

export interface GitHubContributor {
  login: string
  avatar_url: string
  html_url: string
  contributions: number
  type: string
}

export interface GitHubLanguages {
  [language: string]: number
}

export interface GitHubRelease {
  tag_name: string
  name: string | null
  published_at: string
  prerelease: boolean
  draft: boolean
}

export interface GitHubCommit {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      date: string
    }
  }
  author: GitHubOwner | null
}

export interface RepositoryFullData {
  repo: GitHubRepository
  contributors: GitHubContributor[]
  languages: GitHubLanguages
  releases: GitHubRelease[]
  recentCommits: GitHubCommit[]
  readme: string | null
  fileTree: string[]
  fileContents: Record<string, string>
}
