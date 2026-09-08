import { defineStore } from 'pinia'
import type { Locale } from '@/types/global'
import { appConfig } from '@/config'
import { storage } from '@/utils/storage'
import { i18n } from '@/locales'
import { StorageKeys } from '@/constants'

// ===============================
// 语言状态管理
// 与 Vue I18n 的 locale 同步，并同步 <html lang>
// ===============================

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: appConfig.defaultLocale as Locale,
  }),
  getters: {
    isZh: (state) => state.locale === 'zh-CN',
    isEn: (state) => state.locale === 'en-US',
  },
  actions: {
    /** 切换语言并同步到 <html lang> 与 i18n 实例 */
    setLocale(locale: Locale) {
      this.locale = locale
      document.documentElement.setAttribute('lang', locale)
      // Composition API 模式下 i18n.global.locale 为 WritableComputedRef
      i18n.global.locale.value = locale
      storage.set(`${this.$id}:${StorageKeys.LOCALE}`, locale)
    },
    /** 初始化：从 localStorage 恢复语言并同步 <html lang> */
    init() {
      const saved = storage.get<Locale | null>(`${this.$id}:${StorageKeys.LOCALE}`, null)
      const target = saved || appConfig.defaultLocale
      this.setLocale(target)
    },
  },
  persist: [StorageKeys.LOCALE],
})
