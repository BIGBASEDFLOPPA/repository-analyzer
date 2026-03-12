<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <div class="loader">
    <div class="loader__spinner"></div>
    <p class="loader__text" v-html="text"></p>
  </div>
</template>

<style scoped>
.loader {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.loader__spinner {
  width: 32px;
  height: 32px;
  border: 2px solid var(--border-2);
  border-top-color: var(--accent-light);
  border-radius: 50%;
  animation: loader-spin 0.65s linear infinite;
}

.loader__text {
  font-size: 0.875rem;
  color: var(--text-2);
}

.loader__text :deep(strong) { color: var(--text); }

@keyframes loader-spin { to { transform: rotate(360deg); } }
</style>
