<script setup lang="ts">
import type { GitHubRepository } from '~/types/github'

defineProps<{ repo: GitHubRepository }>()
const { t } = useLocale()
</script>

<template>
  <div class="repo-header">
    <div class="repo-header__top">
      <img :src="repo.owner.avatar_url" :alt="repo.owner.login" class="repo-header__avatar" />
      <div class="repo-header__info">
        <a :href="repo.html_url" target="_blank" rel="noopener" class="repo-header__link">
          <span class="repo-header__owner">{{ repo.owner.login }}</span>
          <span class="repo-header__sep">/</span>
          <span class="repo-header__name">{{ repo.name }}</span>
        </a>
        <div class="repo-header__badges">
          <span class="repo-header__badge">{{ repo.visibility }}</span>
          <span v-if="repo.archived" class="repo-header__badge repo-header__badge--warn">archived</span>
          <span v-if="repo.license" class="repo-header__badge">{{ repo.license.spdx_id }}</span>
        </div>
      </div>
    </div>

    <p class="repo-header__desc" :class="{ 'repo-header__desc--empty': !repo.description }">
      {{ repo.description || t.noDesc }}
    </p>

    <a v-if="repo.homepage" :href="repo.homepage" target="_blank" rel="noopener" class="repo-header__homepage">
      <svg height="13" viewBox="0 0 16 16" width="13" fill="currentColor">
        <path d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25Zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0Z"/>
      </svg>
      <span class="repo-header__homepage-text">{{ repo.homepage }}</span>
    </a>

    <div v-if="repo.topics.length" class="repo-header__topics">
      <span v-for="topic in repo.topics" :key="topic" class="repo-header__topic">{{ topic }}</span>
    </div>
  </div>
</template>

<style scoped>
.repo-header { display: flex; flex-direction: column; gap: 0.55rem; }

.repo-header__top { display: flex; gap: 0.65rem; align-items: flex-start; }

.repo-header__avatar {
  width: 38px; height: 38px;
  border-radius: 8px;
  border: 1px solid var(--border-2);
  flex-shrink: 0;
}

.repo-header__info { display: flex; flex-direction: column; gap: 0.28rem; min-width: 0; }

.repo-header__link {
  display: block;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  word-break: break-all;
  line-height: 1.3;
}
.repo-header__link:hover .repo-header__name { text-decoration: underline; }

.repo-header__owner { color: var(--text-2); }
.repo-header__sep   { color: var(--text-3); margin: 0 1px; }
.repo-header__name  { color: var(--accent-light); }

.repo-header__badges { display: flex; gap: 0.3rem; flex-wrap: wrap; }

.repo-header__badge {
  font-size: 0.65rem;
  padding: 0.1rem 0.45rem;
  border-radius: 20px;
  border: 1px solid var(--border-2);
  color: var(--text-2);
  font-weight: 500;
}
.repo-header__badge--warn {
  color: #fbbf24;
  border-color: rgba(251, 191, 36, 0.25);
  background: rgba(251, 191, 36, 0.07);
}

.repo-header__desc { font-size: 0.8rem; color: var(--text-2); line-height: 1.5; }
.repo-header__desc--empty { color: var(--text-3); font-style: italic; }

.repo-header__homepage {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  text-decoration: none;
  color: var(--accent-light);
}
.repo-header__homepage:hover .repo-header__homepage-text { text-decoration: underline; }
.repo-header__homepage-text { font-size: 0.76rem; word-break: break-all; }

.repo-header__topics { display: flex; flex-wrap: wrap; gap: 0.3rem; }

.repo-header__topic {
  font-size: 0.68rem;
  padding: 0.15rem 0.5rem;
  border-radius: 20px;
  background: var(--accent-dim);
  color: var(--accent-light);
  font-weight: 500;
  border: 1px solid transparent;
  transition: background 0.15s;
}
.repo-header__topic:hover { background: rgba(99, 102, 241, 0.2); }
</style>
