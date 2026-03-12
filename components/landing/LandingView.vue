<script setup lang="ts">
const { t, locale } = useLocale()
</script>

<template>
  <div class="landing">
    <h1 class="landing__title">{{ t.tagline }}</h1>
    <p class="landing__sub">
      {{ locale === 'ru'
        ? 'Вставь ссылку на публичный репозиторий и начни диалог с ИИ.'
        : 'Paste any public repository URL and start chatting with AI.' }}
    </p>

    <div class="landing__features">
      <div class="feature-card">
        <svg class="feature-card__icon" height="16" viewBox="0 0 16 16" width="16" fill="currentColor">
          <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
        </svg>
        <div class="feature-card__body">
          <strong class="feature-card__title">{{ t.feature1Title }}</strong>
          <p class="feature-card__desc">{{ t.feature1Desc }}</p>
        </div>
      </div>

      <div class="feature-card">
        <svg class="feature-card__icon" height="16" viewBox="0 0 16 16" width="16" fill="currentColor">
          <path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 13H8.061l-2.574 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25Z"/>
        </svg>
        <div class="feature-card__body">
          <strong class="feature-card__title">{{ t.feature2Title }}</strong>
          <p class="feature-card__desc">{{ t.feature2Desc }}</p>
        </div>
      </div>

      <div class="feature-card">
        <svg class="feature-card__icon" height="16" viewBox="0 0 16 16" width="16" fill="currentColor">
          <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"/>
        </svg>
        <div class="feature-card__body">
          <strong class="feature-card__title">{{ t.feature3Title }}</strong>
          <p class="feature-card__desc">{{ t.feature3Desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.75rem;
  padding: 4rem 2rem;
  text-align: center;
}

.landing__title {
  font-size: 1.65rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.03em;
  max-width: 500px;
}

.landing__sub {
  font-size: 0.9rem;
  color: var(--text-2);
  max-width: 420px;
  line-height: 1.6;
}

.landing__features {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-width: 460px;
  width: 100%;
  text-align: left;
}

.feature-card {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  padding: 0.9rem 1rem;
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color 0.15s;
}
.feature-card:hover { border-color: var(--border-2); }

.feature-card__icon {
  color: var(--accent-light);
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.feature-card__title {
  display: block;
  font-size: 0.83rem;
  font-weight: 600;
  color: var(--text);
}

.feature-card__desc {
  font-size: 0.77rem;
  color: var(--text-2);
  line-height: 1.5;
}
</style>
