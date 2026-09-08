import { defineStore } from 'pinia'

// ===============================
// 用户状态（占位，供后续接入登录扩展）
// ===============================

export interface UserInfo {
  id: string | number
  name: string
  avatar?: string
  roles: string[]
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '' as string,
    userInfo: null as UserInfo | null,
  }),
  getters: {
    isLogin: (state) => !!state.token,
    displayName: (state) => state.userInfo?.name || '',
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info
    },
    logout() {
      this.token = ''
      this.userInfo = null
    },
  },
})
