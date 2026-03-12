<script setup lang="ts">
import type { RepositoryFullData } from '~/types/github'
import type { ChatMessage } from '~/types/ai'

defineProps<{
  left: RepositoryFullData
  right: RepositoryFullData
  messages: readonly ChatMessage[]
  aiLoading: boolean
  aiError: { message: string } | null
  quickQuestions: string[]
  placeholder: string
}>()

const emit = defineEmits<{ chat: [msg: string] }>()
</script>
<template>
  <main class="compare-workspace">
    <div class="compare-workspace__split">
      <div class="compare-workspace__col compare-workspace__col--a">
        <div class="compare-workspace__col-label compare-workspace__col-label--a">A</div>
        <RepoStats :data="left" />
      </div>

      <div class="compare-workspace__divider">
        <div class="compare-workspace__divider-line"></div>
        <span class="compare-workspace__divider-vs">vs</span>
        <div class="compare-workspace__divider-line"></div>
      </div>

      <div class="compare-workspace__col compare-workspace__col--b">
        <div class="compare-workspace__col-label compare-workspace__col-label--b">B</div>
        <RepoStats :data="right" />
      </div>
    </div>

    <ChatPanel
        :repo-name-a="left.repo.full_name"
        :repo-name-b="right.repo.full_name"
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
.compare-workspace {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.compare-workspace__split {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  border-bottom: 1px solid var(--border);
  max-height: 45vh;
  overflow: hidden;
}

.compare-workspace__col {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
  position: relative;
}

.compare-workspace__col-label {
  position: sticky;
  top: 0;
  z-index: 5;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  padding: 0.3rem 0.75rem;
  border-bottom: 1px solid var(--border);
}

.compare-workspace__col-label--a {
  background: rgba(99, 102, 241, 0.1);
  color: var(--accent-light);
}

.compare-workspace__col-label--b {
  background: rgba(96, 165, 250, 0.08);
  color: #60a5fa;
}

.compare-workspace__divider {
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  gap: 0.4rem;
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  background: var(--bg-2);
}

.compare-workspace__divider-line {
  flex: 1;
  width: 1px;
  background: var(--border);
}

.compare-workspace__divider-vs {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--text-3);
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

@media (max-width: 860px) {
  .compare-workspace__split {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    max-height: none;
  }

  .compare-workspace__divider {
    width: 100%;
    height: 36px;
    flex-direction: row;
    padding: 0 1rem;
    border-left: none;
    border-right: none;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .compare-workspace__divider-vs {
    writing-mode: horizontal-tb;
  }
}
</style>
