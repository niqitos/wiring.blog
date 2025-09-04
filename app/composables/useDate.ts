import type { LocaleObject } from '@nuxtjs/i18n'

export const useDate = () => {
  const { $i18n } = useNuxtApp()

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString($i18n.locales.value.find((l: LocaleObject) => l.code === $i18n.locale.value)?.language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return {
    formatDate
  }
}
