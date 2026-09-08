import { defineStore } from 'pinia'

// ===============================
// 应用布局状态：侧边栏折叠
// ===============================

export const useAppStore = defineStore('app', {
  state: () => ({
    /** 侧边栏是否折叠 */
    sidebarCollapsed: false,
  }),
  getters: {
    sidebarWidth: (state) => (state.sidebarCollapsed ? '64px' : '220px'),
  },
  actions: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    setSidebarCollapsed(value: boolean) {
      this.sidebarCollapsed = value
    },
  },
  persist: ['sidebarCollapsed'],
})
