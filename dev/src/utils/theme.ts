import type { ResolvedTheme, ThemeMode } from '@/types/global'
import { ThemeNames } from '@/config/themes'

// ===============================
// 主题工具：操作 <html data-theme> 属性
// ===============================

const DATA_THEME_ATTR = 'data-theme'

/** 读取当前生效的主题（从 <html data-theme> 解析） */
export function getResolvedTheme(): ResolvedTheme {
  const value = document.documentElement.getAttribute(DATA_THEME_ATTR)
  return ThemeNames.includes(value as ResolvedTheme) ? (value as ResolvedTheme) : 'light'
}

/** 将 resolved 主题写入 <html data-theme> */
export function applyResolvedTheme(theme: ResolvedTheme): void {
  document.documentElement.setAttribute(DATA_THEME_ATTR, theme)
}

/** 获取系统 prefers-color-scheme 当前值 */
export function getSystemTheme(): ResolvedTheme {
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  return mql.matches ? 'dark' : 'light'
}

/** 根据 mode 解析得到实际主题：light/dark 直接返回，auto 跟随系统 */
export function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === 'auto') return getSystemTheme()
  return mode
}

/**
 * 监听系统 prefers-color-scheme 变化
 * @returns 取消监听函数
 */
export function watchSystemTheme(callback: (theme: ResolvedTheme) => void): () => void {
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const handler = (e: MediaQueryListEvent) => callback(e.matches ? 'dark' : 'light')
  mql.addEventListener('change', handler)
  return () => mql.removeEventListener('change', handler)
}
