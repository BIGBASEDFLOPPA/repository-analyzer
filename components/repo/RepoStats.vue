<script setup lang="ts">
import type { RepositoryFullData } from '~/types/github'

const props = defineProps<{ data: RepositoryFullData }>()
const { t } = useLocale()

const latestRelease = computed(() => props.data.releases[0] ?? null)
</script>

<template>
  <div class="stats">
    <RepoHeader :repo="data.repo" />
    <div class="rule" />
    <RepoCounters :repo="data.repo" :contributors="data.contributors" />
    <div class="rule" />
    <section class="section">
      <h4 class="sec-title">{{ t.sectionLanguages }}</h4>
      <RepoLanguages :languages="data.languages" />
    </section>
    <div class="rule" />
    <section class="section">
      <h4 class="sec-title">{{ t.sectionCommits }}</h4>
      <RepoCommits :commits="data.recentCommits" />
    </section>
    <div class="rule" />
    <RepoMeta :repo="data.repo" :latest-release="latestRelease" />
  </div>
</template>

<style scoped>
.stats { padding: 1rem; display: flex; flex-direction: column; gap: 0.85rem; }
.rule  { height: 1px; background: var(--border); }
.section { display: flex; flex-direction: column; gap: 0.45rem; }
.sec-title {
  font-size: 0.68rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--text-3);
}
</style>
