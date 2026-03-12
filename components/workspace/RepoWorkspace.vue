<script setup lang="ts">
import type { RepositoryFullData } from '~/types/github'
import type { ChatMessage } from '~/types/ai'

defineProps<{
  data: RepositoryFullData
  messages: readonly ChatMessage[]
  aiLoading: boolean
  aiError: { message: string } | null
  quickQuestions: string[]
  placeholder: string
}>()

const emit = defineEmits<{ chat: [msg: string] }>()
</script>

<template>
  <main class="repo-workspace">
    <aside class="repo-workspace__sidebar">
      <RepoStats :data="data" />
    </aside>
    <ChatPanel
        class="repo-workspace__chat"
        :messages="messages"
        :is-loading="aiLoading"
        :error="aiError"
        :quick-questions="quickQuestions"
        :placeholder="placeholder"
        @send="emit('chat', $event)"
    />
  </main>
</template>

<style scoped>
.repo-workspace {
  flex: 1;
  display: grid;
  grid-template-columns: 300px 1fr;
  overflow: hidden;
  height: calc(100vh - 106px);
}

.repo-workspace__sidebar {
  overflow-y: auto;
  border-right: 1px solid var(--border);
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
  background: var(--bg);
}

.repo-workspace__chat {
  overflow: hidden;
}

@media (max-width: 768px) {
  .repo-workspace {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    height: auto;
    min-height: calc(100vh - 106px);
  }

  .repo-workspace__sidebar {
    border-right: none;
    border-bottom: 1px solid var(--border);
    max-height: 55vh;
  }
}
</style>
