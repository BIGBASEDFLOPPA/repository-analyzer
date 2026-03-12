import type { RepositoryFullData } from '~/types/github'
import type { AppStatus, AppError } from '~/types/app'

export function useGitHubRepo() {
  const repoData = ref<RepositoryFullData | null>(null)
  const status = ref<AppStatus>('idle')
  const error = ref<AppError | null>(null)

  const isLoading = computed(() => status.value === 'loading')
  const isReady = computed(() => status.value === 'success' && repoData.value !== null)

  async function fetchRepo(owner: string, repo: string): Promise<boolean> {
    status.value = 'loading'
    error.value = null
    repoData.value = null

    try {
      const data = await $fetch<RepositoryFullData>('/api/repo', {
        query: { owner, repo },
      })
      repoData.value = data
      status.value = 'success'
      return true
    } catch (err: unknown) {
      status.value = 'error'
      if (err && typeof err === 'object' && 'statusCode' in err) {
        const fetchError = err as { statusCode: number; message: string }
        error.value = {
          message: fetchError.message || 'Failed to fetch repository',
          statusCode: fetchError.statusCode,
        }
      } else {
        error.value = { message: 'An unexpected error occurred' }
      }
      return false
    }
  }

  function reset() {
    repoData.value = null
    status.value = 'idle'
    error.value = null
  }

  return {
    repoData: readonly(repoData),
    status: readonly(status),
    error: readonly(error),
    isLoading,
    isReady,
    fetchRepo,
    reset,
  }
}
