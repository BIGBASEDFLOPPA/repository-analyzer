<script setup lang="ts">
import { buildCompareContext } from '~/utils/repoContext'
import type { RepositoryFullData } from '~/types/github'
import AppNavbar from "~/components/ui/AppNavbar.vue";
import CompareSearchBar from "~/components/search/CompareSearchBar.vue";
import AppErrorBar from "~/components/ui/AppErrorBar.vue";
import CompareWorkspace from "~/components/workspace/CompareWorkspace.vue";
import CompareLandingView from "~/components/landing/CompareLandingView.vue";
import AppLoader from "~/components/ui/AppLoader.vue";

useHead(() => ({ title: 'Compare — GitHub AI Analyzer' }))

const { locale, t } = useLocale()
const { messages, isLoading: aiLoading, error: aiError, sendMessage, addSystemGreeting } = useAIChat()

const status = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
const error = ref<{ message: string; statusCode?: number } | null>(null)
const left = ref<RepositoryFullData | null>(null)
const right = ref<RepositoryFullData | null>(null)

const compareContext = computed(() =>
  left.value && right.value ? buildCompareContext(left.value, right.value) : ''
)

const quickQuestions = computed(() =>
  [t.value.compareQ1, t.value.compareQ2, t.value.compareQ3, t.value.compareQ4]
)

function parseInput(raw: string): { owner: string; repo: string } | null {
  const cleaned = raw.trim().replace(/\/$/, '')
  const urlMatch = cleaned.match(/github\.com\/([^/]+)\/([^/]+)/)
  if (urlMatch) return { owner: urlMatch[1], repo: urlMatch[2] }
  const shortMatch = cleaned.match(/^([^/\s]+)\/([^/\s]+)$/)
  if (shortMatch) return { owner: shortMatch[1], repo: shortMatch[2] }
  return null
}

async function handleSubmit(raw1: string, raw2: string) {
  const p1 = parseInput(raw1)
  const p2 = parseInput(raw2)
  if (!p1 || !p2) return

  status.value = 'loading'
  error.value = null

  try {
    const data = await $fetch<{ left: RepositoryFullData; right: RepositoryFullData }>('/api/compare', {
      query: { owner1: p1.owner, repo1: p1.repo, owner2: p2.owner, repo2: p2.repo },
    })
    left.value = data.left
    right.value = data.right
    status.value = 'ready'
    addSystemGreeting(`${data.left.repo.full_name} vs ${data.right.repo.full_name}`, locale.value)
  } catch (err: unknown) {
    status.value = 'error'
    error.value = (err && typeof err === 'object' && 'message' in err)
      ? err as { message: string; statusCode?: number }
      : { message: 'Failed to fetch repositories' }
  }
}

async function handleChat(msg: string) {
  await sendMessage(msg, compareContext.value)
}
</script>

<template>
  <div class="compare-page">
    <AppNavbar />

    <CompareSearchBar :disabled="status === 'loading'" @submit="handleSubmit" />

    <AppErrorBar
      v-if="status === 'error' && error"
      :status-code="error.statusCode"
      :message="error.message"
    />

    <CompareWorkspace
      v-if="status === 'ready' && left && right"
      :left="left"
      :right="right"
      :messages="messages"
      :ai-loading="aiLoading"
      :ai-error="aiError"
      :quick-questions="quickQuestions"
      :placeholder="t.compareChatPlaceholder"
      @chat="handleChat"
    />

    <CompareLandingView v-else-if="status === 'idle'" />

    <AppLoader v-else-if="status === 'loading'" :text="t.compareFetching + '…'" />
  </div>
</template>

<style scoped>
.compare-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
