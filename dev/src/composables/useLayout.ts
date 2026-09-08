import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/modules/app'

// ===============================
// 布局组合式函数
// ===============================

export function useLayout() {
  const appStore = useAppStore()
  const { sidebarCollapsed } = storeToRefs(appStore)

  function toggleSidebar() {
    appStore.toggleSidebar()
  }

  function setSidebarCollapsed(value: boolean) {
    appStore.setSidebarCollapsed(value)
  }

  return {
    sidebarCollapsed,
    toggleSidebar,
    setSidebarCollapsed,
  }
}
