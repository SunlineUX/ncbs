import { defineStore } from 'pinia'
import type { ResolvedTheme, ThemeMode } from '@/types/global'
import { appConfig } from '@/config'
import { applyResolvedTheme, resolveTheme, watchSystemTheme } from '@/utils/theme'
import { storage } from '@/utils/storage'
import { StorageKeys } from '@/constants'

// ===============================
// 主题状态管理
// 通过 <html data-theme> 驱动 CSS 变量切换
// ===============================

export const useThemeStore = defineStore('theme', {
  state: () => ({
    /** 主题模式：实际主题名称或 auto */
    mode: appConfig.defaultThemeMode as ThemeMode,
    /** 已解析生效的实际主题 */
    resolved: 'light' as ResolvedTheme,
  }),
  getters: {
    isDark: (state) => state.resolved !== 'light',
  },
  actions: {
    /** 应用 mode → resolved → <html data-theme> */
    apply() {
      this.resolved = resolveTheme(this.mode)
      applyResolvedTheme(this.resolved)
    },
    /** 设置模式并立即应用 */
    setMode(mode: ThemeMode) {
      this.mode = mode
      this.apply()
      storage.set(`${this.$id}:${StorageKeys.THEME_MODE}`, mode)
    },
    /** 初始化：从 localStorage 恢复 mode，应用主题，注册系统监听 */
    init() {
      const saved = storage.get<ThemeMode | null>(`${this.$id}:${StorageKeys.THEME_MODE}`, null)
      if (saved) this.mode = saved
      this.apply()
      // auto 模式下响应系统主题变化
      watchSystemTheme((theme) => {
        if (this.mode === 'auto' && this.resolved !== theme) {
          this.resolved = theme
          applyResolvedTheme(theme)
        }
      })
    },
  },
  persist: [StorageKeys.THEME_MODE],
})
