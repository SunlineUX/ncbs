import { createRouter, createWebHistory } from 'vue-router'
import { appConfig } from '@/config'
import { routes } from './routes'
import { setupRouterGuard } from './guard'

// ===============================
// 路由实例（history 模式）
// ===============================

const router = createRouter({
  history: createWebHistory(appConfig.baseUrl),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})

setupRouterGuard(router)

export default router
