import { translations, type Locale, type Translations } from '~/i18n/translations'

//  default ru for dev
function detectLocale(): Locale {
  if (import.meta.server) return 'ru'
  const host = window.location.hostname
  if (host.endsWith('.ru') || host === 'localhost' || host === '127.0.0.1') {
    return 'ru'
  }
  return 'en'
}

const locale = ref<Locale>('ru')

export function useLocale() {
  onMounted(() => {
    locale.value = detectLocale()
  })

  const t = computed<Translations>(() => translations[locale.value])

  function toggleLocale() {
    locale.value = locale.value === 'ru' ? 'en' : 'ru'
  }

  function setLocale(l: Locale) {
    locale.value = l
  }

  return {
    locale: readonly(locale),
    t,
    toggleLocale,
    setLocale,
  }
}
