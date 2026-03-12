<script setup lang="ts">
defineProps<{
  statusCode?: number
  message: string
  rateLimit?: string
}>()
</script>

<template>
  <div class="error-bar">
    <svg class="error-bar__icon" height="14" viewBox="0 0 16 16" width="14" fill="currentColor">
      <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
    </svg>
    <span class="error-bar__text">
      <b class="error-bar__code">{{ statusCode || 'Error' }}:</b>
      {{ message }}
      <span v-if="statusCode === 403 && rateLimit" class="error-bar__hint">{{ rateLimit }}</span>
    </span>
  </div>
</template>

<style scoped>
.error-bar {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  padding: 0.65rem 1.5rem;
  background: var(--red-bg);
  border-bottom: 1px solid var(--red-bdr);
  color: var(--red);
  font-size: 0.8rem;
}

.error-bar__icon { flex-shrink: 0; margin-top: 1px; }
.error-bar__text { line-height: 1.5; }
.error-bar__code { font-weight: 700; }
.error-bar__hint { margin-left: 0.25rem; opacity: 0.85; }
</style>
