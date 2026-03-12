<script setup lang="ts">
import type { ChatMessage } from '~/types/ai'

defineProps<{ message: ChatMessage }>()

function renderMarkdown(text: string): string {
  return text
    .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code class="chat-message__code-block">$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="chat-message__inline-code">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="chat-message__strong">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h3 class="chat-message__h3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="chat-message__h2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="chat-message__h1">$1</h1>')
    .replace(/^- (.+)$/gm, '<li class="chat-message__li">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/gs, '<ul class="chat-message__list">$&</ul>')
    .replace(/\n\n/g, '<br/><br/>')
}
</script>

<template>
  <div class="chat-message">
    <div
      class="chat-message__avatar"
      :class="message.role === 'user' ? 'chat-message__avatar--user' : 'chat-message__avatar--ai'"
    >
      <svg v-if="message.role === 'user'" height="13" viewBox="0 0 16 16" width="13" fill="currentColor">
        <path d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"/>
      </svg>
      <svg v-else height="13" viewBox="0 0 16 16" width="13" fill="currentColor">
        <path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 13H8.061l-2.574 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25Z"/>
      </svg>
    </div>

    <div class="chat-message__body">
      <span class="chat-message__who">{{ message.role === 'user' ? 'You' : 'Assistant' }}</span>

      <div
        v-if="message.role === 'assistant'"
        class="chat-message__text"
        v-html="message.isStreaming ? '<span class=\'chat-message__cursor\'>▌</span>' : renderMarkdown(message.content)"
      />
      <div v-else class="chat-message__text chat-message__text--user">
        {{ message.content }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-message {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
}

.chat-message__avatar {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-message__avatar--user {
  background: var(--accent);
  color: #fff;
}

.chat-message__avatar--ai {
  background: var(--bg-3);
  border: 1px solid var(--border-2);
  color: var(--accent-light);
}

.chat-message__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.22rem;
}

.chat-message__who {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-3);
}

.chat-message__text {
  font-size: 0.86rem;
  line-height: 1.65;
  color: var(--text);
  word-break: break-word;
}

.chat-message__text--user {
  background: var(--bg-3);
  border: 1px solid var(--border-2);
  border-radius: 3px 10px 10px 10px;
  padding: 0.5rem 0.75rem;
  width: fit-content;
  max-width: 100%;
}

/* Markdown rendered elements — БЭМ через :deep т.к. v-html */
:deep(.chat-message__h1) {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0.45rem 0 0.2rem;
}
:deep(.chat-message__h2) {
  font-size: 0.92rem;
  font-weight: 600;
  margin: 0.4rem 0 0.15rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.18rem;
}
:deep(.chat-message__h3) {
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--accent-light);
  margin: 0.3rem 0 0.1rem;
}
:deep(.chat-message__inline-code) {
  font-family: ui-monospace, 'Cascadia Code', monospace;
  font-size: 0.77rem;
  background: var(--bg-3);
  padding: 0.1rem 0.38rem;
  border-radius: 5px;
  border: 1px solid var(--border-2);
  color: var(--text);
}
:deep(pre) {
  margin: 0.35rem 0;
  border-radius: 8px;
  border: 1px solid var(--border-2);
  overflow: hidden;
}
:deep(.chat-message__code-block) {
  display: block;
  font-family: ui-monospace, 'Cascadia Code', monospace;
  font-size: 0.77rem;
  background: var(--bg);
  padding: 0.8rem 1rem;
  overflow-x: auto;
  white-space: pre;
  color: var(--text);
  line-height: 1.55;
}
:deep(.chat-message__list) {
  margin: 0.3rem 0;
  padding-left: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
}
:deep(.chat-message__li) { font-size: 0.86rem; }
:deep(.chat-message__strong) { font-weight: 600; }

.chat-message__cursor {
  display: inline-block;
  color: var(--accent-light);
  animation: cursor-blink 0.7s step-end infinite;
}
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
</style>
