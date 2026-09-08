import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/modules/theme'
import type { ThemeMode } from '@/types/global'

// ===============================
// 主题组合式函数：在组件中便捷访问主题状态
// ===============================

export function useTheme() {
  const themeStore = useThemeStore()
  const { mode, resolved, isDark } = storeToRefs(themeStore)

  function setMode(value: ThemeMode) {
    themeStore.setMode(value)
  }

  function toggle() {
    setMode(isDark.value ? 'light' : 'dark')
  }

  return {
    mode,
    resolved,
    isDark,
    setMode,
    toggle,
    apply: themeStore.apply,
  }
}
