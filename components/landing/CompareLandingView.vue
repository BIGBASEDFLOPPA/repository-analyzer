<script setup lang="ts">
const { t, locale } = useLocale()
</script>

<template>
  <div class="compare-landing">
    <h1 class="compare-landing__title">{{ t.compareTitle }}</h1>
    <p class="compare-landing__sub">
      {{ locale === 'ru'
        ? 'ИИ нейтрально разберёт плюсы и минусы каждого репозитория и даст рекомендацию.'
        : 'AI will neutrally analyze pros and cons of each repository and give a recommendation.' }}
    </p>
    <div class="compare-landing__hint">
      <svg class="compare-landing__hint-icon" height="15" viewBox="0 0 16 16" width="15" fill="currentColor">
        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
      </svg>
      <span class="compare-landing__hint-text">
        {{ locale === 'ru'
          ? 'Можно вставить полный URL или короткий формат owner/repo'
          : 'You can paste a full URL or use the short owner/repo format' }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.compare-landing {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  padding: 4rem 2rem;
  text-align: center;
}

.compare-landing__title {
  font-size: 1.55rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.03em;
}

.compare-landing__sub {
  font-size: 0.9rem;
  color: var(--text-2);
  max-width: 460px;
  line-height: 1.6;
}

.compare-landing__hint {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-2);
}

.compare-landing__hint-icon {
  color: var(--accent-light);
  flex-shrink: 0;
}

.compare-landing__hint-text {
  font-size: 0.78rem;
  color: var(--text-3);
}
</style>
