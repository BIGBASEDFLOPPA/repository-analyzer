<script setup lang="ts">
import { COMPARE_EXAMPLES } from '~/constants/examples'

const props = defineProps<{
  disabled: boolean
}>()

const emit = defineEmits<{ submit: [raw1: string, raw2: string] }>()

const { t } = useLocale()
const raw1 = ref('')
const raw2 = ref('')

function handleSubmit() {
  if (!raw1.value.trim() || !raw2.value.trim() || props.disabled) return
  emit('submit', raw1.value, raw2.value)
}

function tryExample(e1: string, e2: string) {
  raw1.value = e1
  raw2.value = e2
  emit('submit', e1, e2)
}
</script>

<template>
  <div class="compare-search">
    <div class="compare-search__inner">
      <div class="compare-search__row">
        <div class="compare-search__pair">
          <div class="compare-search__field">
            <svg class="compare-search__icon" height="14" viewBox="0 0 16 16" width="14" fill="currentColor">
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"/>
            </svg>
            <input
              v-model="raw1"
              class="compare-search__input"
              :placeholder="t.compareRepo1"
              :disabled="disabled"
              @keydown.enter="handleSubmit"
            />
          </div>

          <span class="compare-search__vs">{{ t.vs }}</span>

          <div class="compare-search__field">
            <svg class="compare-search__icon" height="14" viewBox="0 0 16 16" width="14" fill="currentColor">
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"/>
            </svg>
            <input
              v-model="raw2"
              class="compare-search__input"
              :placeholder="t.compareRepo2"
              :disabled="disabled"
              @keydown.enter="handleSubmit"
            />
          </div>
        </div>

        <button
          class="compare-search__btn"
          :disabled="!raw1.trim() || !raw2.trim() || disabled"
          @click="handleSubmit"
        >
          <span v-if="disabled" class="compare-search__spinner"></span>
          <span v-else>{{ t.compareBtn }}</span>
        </button>
      </div>

      <div class="compare-search__examples">
        <span class="compare-search__examples-label">{{ t.tryLabel }}</span>
        <button
          v-for="[e1, e2] in COMPARE_EXAMPLES"
          :key="e1"
          class="compare-search__chip"
          :disabled="disabled"
          @click="tryExample(e1, e2)"
        >{{ e1 }} vs {{ e2 }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.compare-search {
  background: var(--bg-2);
  border-bottom: 1px solid var(--border);
  padding: 0.9rem 1.5rem;
}

.compare-search__inner {
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.compare-search__row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.compare-search__pair {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.compare-search__field {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.compare-search__icon {
  position: absolute;
  left: 0.7rem;
  color: var(--text-3);
  pointer-events: none;
}

.compare-search__input {
  width: 100%;
  height: 38px;
  padding: 0 0.8rem 0 2.1rem;
  background: var(--bg);
  border: 1px solid var(--border-2);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  color: var(--text);
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.compare-search__input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-dim);
}
.compare-search__input::placeholder { color: var(--text-3); }
.compare-search__input:disabled { opacity: 0.5; }

.compare-search__vs {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--text-3);
  flex-shrink: 0;
}

.compare-search__btn {
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
.compare-search__btn:hover:not(:disabled) { background: var(--btn-hover); }
.compare-search__btn:disabled { opacity: 0.4; cursor: not-allowed; }

.compare-search__spinner {
  width: 13px;
  height: 13px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-top-color: #fff;
  border-radius: 50%;
  animation: compare-spin 0.65s linear infinite;
  display: inline-block;
}

.compare-search__examples {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.compare-search__examples-label {
  font-size: 0.72rem;
  color: var(--text-3);
}

.compare-search__chip {
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
.compare-search__chip:hover:not(:disabled) {
  background: var(--accent-dim);
  border-color: var(--accent);
}
.compare-search__chip:disabled { opacity: 0.35; cursor: not-allowed; }

@keyframes compare-spin { to { transform: rotate(360deg); } }

@media (max-width: 860px) {
  .compare-search__pair { flex-direction: column; }
}
</style>
