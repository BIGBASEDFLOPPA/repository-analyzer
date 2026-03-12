<script setup lang="ts">
const props = defineProps<{
  placeholder: string
  disabled: boolean
  quickQuestions: string[]
  showQuick: boolean
}>()

const emit = defineEmits<{ send: [message: string] }>()

const input = ref('')

function handleSend() {
  if (!input.value.trim() || props.disabled) return
  emit('send', input.value)
  input.value = ''
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}
</script>

<template>
  <div class="chat-input">
    <div v-if="showQuick && quickQuestions.length" class="chat-input__quick">
      <button
        v-for="q in quickQuestions"
        :key="q"
        class="chat-input__quick-btn"
        :disabled="disabled"
        @click="emit('send', q)"
      >{{ q }}</button>
    </div>

    <div class="chat-input__row">
      <textarea
        v-model="input"
        class="chat-input__textarea"
        :placeholder="placeholder"
        rows="2"
        :disabled="disabled"
        @keydown="onKey"
      />
      <button
        class="chat-input__send"
        :disabled="!input.trim() || disabled"
        title="Send (Enter)"
        @click="handleSend"
      >
        <svg height="14" viewBox="0 0 16 16" width="14" fill="currentColor">
          <path d="M.989 8 .064 2.68a1.342 1.342 0 0 1 1.85-1.462l13.402 5.744a1.13 1.13 0 0 1 0 2.076L1.913 14.782a1.342 1.342 0 0 1-1.85-1.463L.99 8Zm.603-5.288L2.38 7.25h4.87a.75.75 0 0 1 0 1.5H2.38l-.788 4.538L13.929 8Z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-input { display: flex; flex-direction: column; }

.chat-input__quick {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  padding: 0.2rem 1.1rem 0.6rem;
}

.chat-input__quick-btn {
  font-size: 0.72rem;
  padding: 0.25rem 0.65rem;
  border-radius: 20px;
  border: 1px solid var(--border-2);
  background: transparent;
  color: var(--accent-light);
  cursor: pointer;
  font-weight: 500;
  font-family: inherit;
  transition: all 0.15s;
}
.chat-input__quick-btn:hover:not(:disabled) {
  background: var(--accent-dim);
  border-color: var(--accent);
}
.chat-input__quick-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.chat-input__row {
  display: flex;
  gap: 0.5rem;
  padding: 0.65rem 1.1rem;
  border-top: 1px solid var(--border);
}

.chat-input__textarea {
  flex: 1;
  background: var(--bg-2);
  border: 1px solid var(--border-2);
  border-radius: 8px;
  padding: 0.5rem 0.7rem;
  font-size: 0.85rem;
  font-family: inherit;
  color: var(--text);
  resize: none;
  outline: none;
  line-height: 1.5;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.chat-input__textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-dim);
}
.chat-input__textarea::placeholder { color: var(--text-3); }
.chat-input__textarea:disabled { opacity: 0.5; cursor: not-allowed; }

.chat-input__send {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  align-self: flex-end;
  background: var(--btn-bg);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}
.chat-input__send:hover:not(:disabled) { background: var(--btn-hover); }
.chat-input__send:disabled { opacity: 0.38; cursor: not-allowed; }
</style>
