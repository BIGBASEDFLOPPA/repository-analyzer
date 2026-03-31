import { translations, type Locale, type Translations } from '~/i18n/translations'

function detectLocale(): Locale {
  if (import.meta.server) return 'ru'

  const saved = localStorage.getItem('locale') as Locale | null
  if (saved) return saved

  const host = window.location.hostname
  if (host.endsWith('.ru') || host === 'localhost' || host === '127.0.0.1') {
    return 'ru'
  }

  return 'en'
}

const locale = ref<Locale>(
    import.meta.client
        ? (localStorage.getItem('locale') as Locale) || detectLocale()
        : 'ru'
)

export function useLocale() {
  onMounted(() => {
    locale.value = detectLocale()
  })

  const t = computed<Translations>(() => translations[locale.value])

  function toggleLocale() {
    locale.value = locale.value === 'ru' ? 'en' : 'ru'
    localStorage.setItem('locale', locale.value)
  }

  function setLocale(l: Locale) {
    locale.value = l
    localStorage.setItem('locale', l)
  }

  return {
    locale: readonly(locale),
    t,
    toggleLocale,
    setLocale,
  }
}