<script setup lang="ts">
import { buildRepoContext } from '~/utils/repoContext'
import AppErrorBar from "~/components/ui/AppErrorBar.vue";
import AppNavbar from "~/components/ui/AppNavbar.vue";
import RepoWorkspace from "~/components/workspace/RepoWorkspace.vue";
import AppLoader from "~/components/ui/AppLoader.vue";

useHead(() => ({ title: 'GitHub AI Analyzer' }))

const { locale, t } = useLocale()
const { repoData, status, error, isLoading, isReady, fetchRepo } = useGitHubRepo()
const { messages, isLoading: aiLoading, error: aiError, sendMessage, addSystemGreeting } = useAIChat()

const repoContext = computed(() =>
  repoData.value ? buildRepoContext(repoData.value) : ''
)

const quickQuestions = computed(() => [t.value.q1, t.value.q2, t.value.q3, t.value.q4])

const loaderText = computed(() => {
  const name = repoData.value?.repo.full_name ?? '…'
  return `${t.value.fetching} <strong>${name}</strong>`
})

function parseInput(raw: string): { owner: string; repo: string } | null {
  const cleaned = raw.trim().replace(/\/$/, '')
  const urlMatch = cleaned.match(/github\.com\/([^/]+)\/([^/]+)/)
  if (urlMatch) return { owner: urlMatch[1], repo: urlMatch[2] }
  const shortMatch = cleaned.match(/^([^/\s]+)\/([^/\s]+)$/)
  if (shortMatch) return { owner: shortMatch[1], repo: shortMatch[2] }
  return null
}

async function handleSubmit(raw: string) {
  const parsed = parseInput(raw)
  if (!parsed) return
  const ok = await fetchRepo(parsed.owner, parsed.repo)
  if (ok && repoData.value) addSystemGreeting(repoData.value.repo.full_name, locale.value)
}

async function handleChat(msg: string) {
  await sendMessage(msg, repoContext.value)
}
</script>

<template>
  <div class="index-page">
    <AppNavbar />

    <SearchBar :disabled="isLoading" @submit="handleSubmit" />

    <AppErrorBar
      v-if="status === 'error' && error"
      :status-code="error.statusCode"
      :message="error.message"
      :rate-limit="t.errorRateLimit"
    />

    <RepoWorkspace
      v-if="isReady && repoData"
      :data="repoData"
      :messages="messages"
      :ai-loading="aiLoading"
      :ai-error="aiError"
      :quick-questions="quickQuestions"
      :placeholder="t.chatPlaceholder"
      @chat="handleChat"
    />

    <LandingView v-else-if="status === 'idle'" />

    <AppLoader v-else-if="isLoading" :text="loaderText" />
  </div>
</template>

<style scoped>
.index-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
