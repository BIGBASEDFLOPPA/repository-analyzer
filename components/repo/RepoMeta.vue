<script setup lang="ts">
import type { GitHubRepository, GitHubRelease } from '~/types/github'
import { timeAgo } from '~/utils/repoContext'

defineProps<{
  repo: GitHubRepository
  latestRelease: GitHubRelease | null
}>()

const { t } = useLocale()
</script>

<template>
  <div class="repo-meta">
    <div class="repo-meta__item">
      <span class="repo-meta__label">{{ t.metaCreated }}</span>
      <span class="repo-meta__value">{{ new Date(repo.created_at).toLocaleDateString() }}</span>
    </div>
    <div class="repo-meta__item">
      <span class="repo-meta__label">{{ t.metaLastPush }}</span>
      <span class="repo-meta__value">{{ timeAgo(repo.pushed_at) }}</span>
    </div>
    <div v-if="latestRelease" class="repo-meta__item">
      <span class="repo-meta__label">{{ t.metaRelease }}</span>
      <span class="repo-meta__value repo-meta__value--tag">{{ latestRelease.tag_name }}</span>
    </div>
  </div>
</template>

<style scoped>
.repo-meta { display: flex; flex-wrap: wrap; gap: 0.6rem 1.1rem; }

.repo-meta__item { display: flex; flex-direction: column; gap: 0.1rem; }

.repo-meta__label {
  font-size: 0.63rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-3);
}

.repo-meta__value { font-size: 0.78rem; color: var(--text); font-weight: 500; }
.repo-meta__value--tag { color: var(--accent-light); }
</style>
