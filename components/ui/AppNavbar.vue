<script setup lang="ts">
const { t, toggleLocale } = useLocale()
const route = useRoute()
const isCompare = computed(() => route.path === '/compare')
</script>

<template>
  <nav class="app-navbar">
    <div class="app-navbar__left">
      <svg class="app-navbar__logo" height="20" viewBox="0 0 16 16" width="20" fill="currentColor">
        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/>
      </svg>
      <span class="app-navbar__brand">AI Analyzer</span>
    </div>

    <div class="app-navbar__modes">
      <NuxtLink to="/" class="app-navbar__mode-btn" :class="{ 'app-navbar__mode-btn--active': !isCompare }">
        {{ t.singleMode }}
      </NuxtLink>
      <NuxtLink to="/compare" class="app-navbar__mode-btn" :class="{ 'app-navbar__mode-btn--active': isCompare }">
        {{ t.compareMode }}
      </NuxtLink>
    </div>

    <button class="app-navbar__lang-btn" @click="toggleLocale">{{ t.langSwitch }}</button>
  </nav>
</template>

<style scoped>
.app-navbar {
  height: 54px;
  background: var(--bg-2);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
}

.app-navbar__left { display: flex; align-items: center; gap: 0.5rem; }
.app-navbar__logo  { color: var(--accent-light); }
.app-navbar__brand { font-size: 0.9rem; font-weight: 700; color: var(--text); letter-spacing: -0.02em; }

.app-navbar__modes { display: flex; align-items: center; gap: 0.25rem; }

.app-navbar__mode-btn {
  font-size: 0.78rem;
  font-weight: 500;
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
  border: 1px solid transparent;
  color: var(--text-2);
  text-decoration: none;
  transition: all 0.15s;
}
.app-navbar__mode-btn:hover { color: var(--text); background: var(--bg-hover); }
.app-navbar__mode-btn--active {
  color: var(--accent-light);
  background: var(--accent-dim);
  border-color: rgba(99, 102, 241, 0.3);
}

.app-navbar__lang-btn {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 0.25rem 0.7rem;
  border-radius: 20px;
  border: 1px solid var(--border-2);
  background: transparent;
  color: var(--text-2);
  cursor: pointer;
  transition: all 0.15s;
}
.app-navbar__lang-btn:hover {
  color: var(--accent-light);
  border-color: var(--accent);
  background: var(--accent-dim);
}
</style>
