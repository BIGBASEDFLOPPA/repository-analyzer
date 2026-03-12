<script setup lang="ts">
import type { GitHubCommit } from '~/types/github'
import { timeAgo } from '~/utils/repoContext'

defineProps<{ commits: GitHubCommit[] }>()
</script>

<template>
  <ul v-if="commits.length" class="repo-commits">
    <li v-for="c in commits.slice(0, 5)" :key="c.sha" class="repo-commits__item">
      <span class="repo-commits__sha">{{ c.sha.slice(0, 7) }}</span>
      <span class="repo-commits__msg">{{ c.commit.message.split('\n')[0] }}</span>
      <span class="repo-commits__when">{{ timeAgo(c.commit.author.date) }}</span>
    </li>
  </ul>
</template>

<style scoped>
.repo-commits {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.repo-commits__item {
  display: grid;
  grid-template-columns: 52px 1fr auto;
  gap: 0.4rem;
  align-items: center;
  padding: 0.28rem 0.5rem;
  border-radius: 6px;
  font-size: 0.73rem;
  border: 1px solid var(--border);
  background: var(--bg-2);
}

.repo-commits__sha  { font-family: ui-monospace, monospace; color: var(--accent-light); font-size: 0.68rem; }
.repo-commits__msg  { color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.repo-commits__when { color: var(--text-3); white-space: nowrap; font-size: 0.66rem; }
</style>
