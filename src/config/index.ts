import type { Locale, ThemeMode } from '@/types/global'
import { themeDefinitions } from './themes'

// ===============================
// 全局应用配置
// ===============================

export interface AppConfig {
  /** 应用标题 */
  appTitle: string
  /** 基础路径 */
  baseUrl: string
  /** 相对路径 */
  relativeUrl: string
  /** 默认语言 */
  defaultLocale: Locale
  /** 可选语言列表 */
  locales: { value: Locale; label: string }[]
  /** 默认主题模式 */
  defaultThemeMode: ThemeMode
  /** 可选主题模式 */
  themeModes: { value: ThemeMode; labelKey: string }[]
  /** localStorage 命名空间 */
  storageNamespace: string
}

export const appConfig: AppConfig = {
  appTitle: import.meta.env.VITE_APP_TITLE || 'NCBS',
  baseUrl: import.meta.env.VITE_APP_BASE_URL || '/',
  relativeUrl: '/ncbs/datamind/',
  defaultLocale: 'zh-CN',
  locales: [
    { value: 'zh-CN', label: '简体中文' },
    { value: 'en-US', label: 'English' },
  ],
  defaultThemeMode: 'light',
  themeModes: [
    ...themeDefinitions,
    { value: 'auto', labelKey: 'theme.mode.auto' },
  ],
  storageNamespace: 'ncbs',
}
