<script setup lang="ts">
import type { GitHubLanguages } from '~/types/github'
import { getLangColor } from '~/constants/langColors'

const props = defineProps<{ languages: GitHubLanguages }>()

const totalBytes = computed(() =>
  Object.values(props.languages).reduce((a, b) => a + b, 0)
)

const items = computed( () =>
  Object.entries(props.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([lang, bytes]) => ({
      lang,
      pct: ((bytes / totalBytes.value) * 100).toFixed(1),
      color: getLangColor(lang),
    }))
)
</script>

<template>
  <div v-if="items.length" class="repo-languages">
    <div class="repo-languages__bar">
      <div
        v-for="item in items"
        :key="item.lang"
        class="repo-languages__bar-seg"
        :style="{ width: item.pct + '%', background: item.color }"
        :title="`${item.lang}: ${item.pct}%`"
      />
    </div>
    <div class="repo-languages__legend">
      <div v-for="item in items" :key="item.lang" class="repo-languages__legend-item">
        <span class="repo-languages__dot" :style="{ background: item.color }"></span>
        <span class="repo-languages__lang-name">{{ item.lang }}</span>
        <span class="repo-languages__lang-pct">{{ item.pct }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.repo-languages { display: flex; flex-direction: column; gap: 0.55rem; }

.repo-languages__bar {
  display: flex;
  height: 7px;
  border-radius: 4px;
  overflow: hidden;
  gap: 2px;
}

.repo-languages__bar-seg {
  cursor: default;
  transition: opacity 0.15s;
}
.repo-languages__bar-seg:hover { opacity: 0.75; }

.repo-languages__legend { display: flex; flex-wrap: wrap; gap: 0.4rem 0.85rem; }

.repo-languages__legend-item { display: flex; align-items: center; gap: 0.28rem; }

.repo-languages__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.repo-languages__lang-name { font-size: 0.74rem; color: var(--text); font-weight: 500; }
.repo-languages__lang-pct  { font-size: 0.7rem;  color: var(--text-2); }
</style>
