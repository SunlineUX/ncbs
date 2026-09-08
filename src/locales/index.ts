import { createI18n } from 'vue-i18n'
import type { Locale } from '@/types/global'
import { appConfig } from '@/config'
import zhCN from './zh-CN'
import enUS from './en-US'

// ===============================
// Vue I18n 实例（Composition API 模式）
// ===============================

export const messages = {
  'zh-CN': zhCN,
  'en-US': enUS,
} as const

export const supportLocales = appConfig.locales.map((l) => l.value) as Locale[]

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: appConfig.defaultLocale,
  fallbackLocale: appConfig.defaultLocale,
  messages,
})

export type MessageSchema = typeof zhCN
