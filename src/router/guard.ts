import type { Router } from 'vue-router'
import { appConfig } from '@/config'
import { i18n } from '@/locales'
import { useLocaleStore } from '@/stores/modules/locale'

// ===============================
// 路由守卫：标题设置、语言同步、权限占位
// ===============================

const { t, te } = i18n.global

/** 解析标题：若为 i18n key 则翻译，否则直接返回 */
function resolveTitle(title: string | undefined): string {
  if (!title) return appConfig.appTitle
  return te(title) ? t(title) : title
}

export function setupRouterGuard(router: Router) {
  router.beforeEach((to, _from, next) => {
    // 设置文档标题：路由标题 · 应用标题
    const title = resolveTitle(to.meta?.title)
    document.title = `${title} · ${appConfig.appTitle}`

    // 确保 <html lang> 与 store 同步（仅初始化一次后由 store 主动维护）
    const localeStore = useLocaleStore()
    document.documentElement.setAttribute('lang', localeStore.locale)

    // 权限校验占位：requiresAuth 路由若未登录则跳转登录
    if (to.meta.requiresAuth && !isAuthenticated()) {
      next({ path: '/', query: { redirect: to.fullPath } })
      return
    }

    next()
  })
}

function isAuthenticated(): boolean {
  // 占位：实际接入登录后改为读取 token store
  return true
}
