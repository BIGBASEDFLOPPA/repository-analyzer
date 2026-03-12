<script setup lang="ts">
import type { GitHubRepository, GitHubContributor } from '~/types/github'

defineProps<{
  repo: GitHubRepository
  contributors: GitHubContributor[]
}>()
</script>

<template>
  <div class="repo-counters">
    <a :href="repo.html_url + '/stargazers'" target="_blank" rel="noopener" class="repo-counters__item">
      <svg height="15" viewBox="0 0 16 16" width="15" fill="currentColor" class="repo-counters__icon">
        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
      </svg>
      <b class="repo-counters__value">{{ repo.stargazers_count.toLocaleString() }}</b>
      <span class="repo-counters__label">stars</span>
    </a>

    <span class="repo-counters__sep">·</span>

    <a :href="repo.html_url + '/forks'" target="_blank" rel="noopener" class="repo-counters__item">
      <svg height="15" viewBox="0 0 16 16" width="15" fill="currentColor" class="repo-counters__icon">
        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
      </svg>
      <b class="repo-counters__value">{{ repo.forks_count.toLocaleString() }}</b>
      <span class="repo-counters__label">forks</span>
    </a>

    <span class="repo-counters__sep">·</span>

    <a :href="repo.html_url + '/issues'" target="_blank" rel="noopener" class="repo-counters__item">
      <svg height="15" viewBox="0 0 16 16" width="15" fill="currentColor" class="repo-counters__icon">
        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"/>
      </svg>
      <b class="repo-counters__value">{{ repo.open_issues_count.toLocaleString() }}</b>
      <span class="repo-counters__label">issues</span>
    </a>

    <span class="repo-counters__sep">·</span>

    <div class="repo-counters__item repo-counters__item--plain">
      <svg height="15" viewBox="0 0 16 16" width="15" fill="currentColor" class="repo-counters__icon">
        <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.457 1.457 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25ZM2.75 2.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.189l2.72-2.719a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/>
      </svg>
      <b class="repo-counters__value">{{ contributors.length }}+</b>
      <span class="repo-counters__label">contributors</span>
    </div>
  </div>
</template>

<style scoped>
.repo-counters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.15rem;
}

.repo-counters__item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.76rem;
  color: var(--text-2);
  text-decoration: none;
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;
}
.repo-counters__item:not(.repo-counters__item--plain):hover {
  background: var(--bg-hover);
  color: var(--text);
}

.repo-counters__icon { color: var(--text-3); }
.repo-counters__value { color: var(--text); font-weight: 600; }
.repo-counters__sep { color: var(--text-3); font-size: 0.75rem; padding: 0 0.1rem; user-select: none; }
</style>
