import { storeToRefs } from 'pinia'
import { useLocaleStore } from '@/stores/modules/locale'
import { i18n } from '@/locales'
import type { Locale } from '@/types/global'
import { appConfig } from '@/config'

// ===============================
// 语言组合式函数
// ===============================

export function useLocale() {
  const localeStore = useLocaleStore()
  const { locale, isZh, isEn } = storeToRefs(localeStore)

  const locales = appConfig.locales

  function setLocale(value: Locale) {
    localeStore.setLocale(value)
  }

  return {
    locale,
    isZh,
    isEn,
    locales,
    setLocale,
    t: i18n.global.t,
  }
}
