import type { RouteRecordRaw } from 'vue-router'
import type { RouteModule } from '@/types/global'
import { RouteNames } from '@/constants'

// 路由模块聚合（按 order 排序后展开）
const modules = import.meta.glob('./modules/*.ts', { eager: true }) as Record<
  string,
  { default: RouteModule }
>

const moduleList = Object.values(modules).sort((a, b) => {
  const oa = a.default.order ?? 99
  const ob = b.default.order ?? 99
  return oa - ob
})

const asyncRoutes: RouteRecordRaw[] = moduleList.flatMap((m) => m.default.routes)

// 根路由：404 占位（用动态加载组件，避免误报）
const notFoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: RouteNames.NOT_FOUND,
  component: () => import('@/views/error/NotFound.vue'),
  meta: { hidden: true, layout: 'BlankLayout' },
}

export const routes: RouteRecordRaw[] = [...asyncRoutes, notFoundRoute]
