<script setup lang="ts">
import { SINGLE_EXAMPLES } from '~/constants/examples'

const props = defineProps<{
  disabled: boolean
}>()

const emit = defineEmits<{ submit: [raw: string] }>()

const { t } = useLocale()
const inputRaw = ref('')

function handleSubmit() {
  if (!inputRaw.value.trim() || props.disabled) return
  emit('submit', inputRaw.value)
}

function tryExample(ex: string) {
  inputRaw.value = ex
  emit('submit', ex)
}
</script>

<template>
  <div class="search-bar">
    <div class="search-bar__inner">
      <div class="search-bar__row">
        <div class="search-bar__field">
          <svg class="search-bar__icon" height="15" viewBox="0 0 16 16" width="15" fill="currentColor">
            <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"/>
          </svg>
          <input
            v-model="inputRaw"
            class="search-bar__input"
            :placeholder="t.searchPlaceholder"
            :disabled="disabled"
            @keydown.enter="handleSubmit"
          />
        </div>
        <button
          class="search-bar__btn"
          :disabled="!inputRaw.trim() || disabled"
          @click="handleSubmit"
        >
          <span v-if="disabled" class="search-bar__spinner"></span>
          <span v-else>{{ t.analyzeBtn }}</span>
        </button>
      </div>

      <div class="search-bar__examples">
        <span class="search-bar__examples-label">{{ t.tryLabel }}</span>
        <button
          v-for="ex in SINGLE_EXAMPLES"
          :key="ex"
          class="search-bar__chip"
          :disabled="disabled"
          @click="tryExample(ex)"
        >{{ ex }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  background: var(--bg-2);
  border-bottom: 1px solid var(--border);
  padding: 0.9rem 1.5rem;
}

.search-bar__inner {
  max-width: 860px;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.search-bar__row {
  display: flex;
  gap: 0.5rem;
}

.search-bar__field {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-bar__icon {
  position: absolute;
  left: 0.75rem;
  color: var(--text-3);
  pointer-events: none;
}

.search-bar__input {
  width: 100%;
  height: 38px;
  padding: 0 0.85rem 0 2.2rem;
  background: var(--bg);
  border: 1px solid var(--border-2);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  color: var(--text);
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.search-bar__input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-dim);
}
.search-bar__input::placeholder { color: var(--text-3); }
.search-bar__input:disabled { opacity: 0.5; }

.search-bar__btn {
  height: 38px;
  padding: 0 1.1rem;
  background: var(--btn-bg);
  color: var(--btn-text);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: background 0.15s;
}
.search-bar__btn:hover:not(:disabled) { background: var(--btn-hover); }
.search-bar__btn:disabled { opacity: 0.4; cursor: not-allowed; }

.search-bar__spinner {
  width: 13px;
  height: 13px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-top-color: #fff;
  border-radius: 50%;
  animation: search-spin 0.65s linear infinite;
  display: inline-block;
}

.search-bar__examples {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.search-bar__examples-label {
  font-size: 0.72rem;
  color: var(--text-3);
}

.search-bar__chip {
  font-size: 0.7rem;
  padding: 0.12rem 0.55rem;
  border-radius: 20px;
  border: 1px solid var(--border-2);
  background: transparent;
  color: var(--accent-light);
  cursor: pointer;
  font-weight: 500;
  font-family: ui-monospace, 'Cascadia Code', monospace;
  transition: all 0.15s;
}
.search-bar__chip:hover:not(:disabled) {
  background: var(--accent-dim);
  border-color: var(--accent);
}
.search-bar__chip:disabled { opacity: 0.35; cursor: not-allowed; }

@keyframes search-spin { to { transform: rotate(360deg); } }
</style>
