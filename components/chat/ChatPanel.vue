<script setup lang="ts">
import type { ChatMessage } from '~/types/ai'

const props = defineProps<{
  messages: readonly ChatMessage[]
  isLoading: boolean
  error: { message: string } | null
  quickQuestions: string[]
  placeholder: string
  // header
  repoNameA?: string
  repoNameB?: string
}>()

const emit = defineEmits<{ send: [message: string] }>()

const { t } = useLocale()
const chatRef = ref<HTMLElement>()
const showQuick = computed(() => props.messages.length <= 1)

watch(() => props.messages.length, async () => {
  await nextTick()
  if (chatRef.value) chatRef.value.scrollTop = chatRef.value.scrollHeight
})
</script>

<template>
  <div class="chat-panel">
    <div class="chat-panel__header">
      <span class="chat-panel__title">
        <svg class="chat-panel__title-icon" height="14" viewBox="0 0 16 16" width="14" fill="currentColor">
          <path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 13H8.061l-2.574 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25Z"/>
        </svg>
        {{ t.aiAnalysis }}
      </span>

      <div v-if="repoNameA && repoNameB" class="chat-panel__compare-tags">
        <span class="chat-panel__repo-tag chat-panel__repo-tag--a">{{ repoNameA }}</span>
        <span class="chat-panel__vs">vs</span>
        <span class="chat-panel__repo-tag chat-panel__repo-tag--b">{{ repoNameB }}</span>
      </div>

      <span class="chat-panel__model">command-r-plus</span>
    </div>

    <div class="chat-panel__messages" ref="chatRef">
      <ChatMessage v-for="msg in messages" :key="msg.id" :message="msg" />

      <div v-if="isLoading && !messages.some(m => m.isStreaming)" class="chat-panel__typing">
        <div class="chat-panel__typing-avatar">
          <svg height="13" viewBox="0 0 16 16" width="13" fill="currentColor">
            <path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 13H8.061l-2.574 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25Z"/>
          </svg>
        </div>
        <div class="chat-panel__dots">
          <span class="chat-panel__dot"></span>
          <span class="chat-panel__dot"></span>
          <span class="chat-panel__dot"></span>
        </div>
      </div>
    </div>

    <div v-if="error" class="chat-panel__error">
      <svg height="13" viewBox="0 0 16 16" width="13" fill="currentColor" class="chat-panel__error-icon">
        <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
      </svg>
      <span class="chat-panel__error-text">{{ error.message }}</span>
    </div>

    <ChatInput
        :placeholder="placeholder"
        :disabled="isLoading"
        :quick-questions="quickQuestions"
        :show-quick="showQuick"
        @send="emit('send', $event)"
    />
  </div>
</template>

<style scoped>
.chat-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.chat-panel__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.55rem 1.1rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg-2);
  flex-shrink: 0;
  flex-wrap: wrap;
}

.chat-panel__title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text);
}

.chat-panel__title-icon { color: var(--accent-light); }

.chat-panel__compare-tags {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex: 1;
  flex-wrap: wrap;
}

.chat-panel__repo-tag {
  font-size: 0.68rem;
  padding: 0.12rem 0.5rem;
  border-radius: 20px;
  font-family: ui-monospace, monospace;
  font-weight: 500;
}

.chat-panel__repo-tag--a {
  background: rgba(99, 102, 241, 0.12);
  color: var(--accent-light);
  border: 1px solid rgba(99, 102, 241, 0.25);
}

.chat-panel__repo-tag--b {
  background: rgba(96, 165, 250, 0.1);
  color: #60a5fa;
  border: 1px solid rgba(96, 165, 250, 0.25);
}

.chat-panel__vs {
  font-size: 0.64rem;
  font-weight: 700;
  color: var(--text-3);
  letter-spacing: 0.05em;
}

.chat-panel__model {
  font-size: 0.64rem;
  padding: 0.1rem 0.5rem;
  border-radius: 20px;
  border: 1px solid var(--border-2);
  color: var(--text-3);
  font-family: ui-monospace, monospace;
  margin-left: auto;
}

.chat-panel__messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}

.chat-panel__typing {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}

.chat-panel__typing-avatar {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-3);
  border: 1px solid var(--border-2);
  color: var(--accent-light);
}

.chat-panel__dots {
  display: flex;
  gap: 0.25rem;
  align-items: center;
  padding: 0.35rem 0;
}

.chat-panel__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--text-3);
  animation: chat-panel-bounce 1.1s ease-in-out infinite;
}
.chat-panel__dot:nth-child(2) { animation-delay: 0.15s; }
.chat-panel__dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes chat-panel-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
  40%           { transform: translateY(-4px); opacity: 1; }
}

.chat-panel__error {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0 1.1rem 0.5rem;
  padding: 0.5rem 0.7rem;
  border-radius: 7px;
  background: var(--red-bg);
  border: 1px solid var(--red-bdr);
  color: var(--red);
  font-size: 0.78rem;
}

.chat-panel__error-icon { flex-shrink: 0; }
.chat-panel__error-text { line-height: 1.4; }
</style>