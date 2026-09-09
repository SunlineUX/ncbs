import type { RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue'
import type { RouteModule } from '@/types/global'
import { RouteNames } from '@/constants'

// 加载各版本路由及其专属布局
const modules = import.meta.glob('./modules/*.ts', { eager: true }) as Record<
  string,
  { default: RouteModule }
>
const layouts = import.meta.glob('../../views/*/layout.ts', { eager: true }) as Record<
  string,
  { default: Component }
>

const versionLayouts = Object.entries(layouts).reduce<Record<string, Component>>(
  (result, [path, module]) => {
    const version = path.split('/').at(-2)
    if (version) result[version] = module.default
    return result
  },
  {},
)

const addVersionLayout = (route: RouteRecordRaw, version: string): RouteRecordRaw =>
  ({
    ...route,
    meta: {
      ...route.meta,
      versionLayout: versionLayouts[version],
    },
    children: route.children?.map((child) => addVersionLayout(child, version)),
  }) as RouteRecordRaw

const moduleList = Object.entries(modules).sort(([, a], [, b]) => {
  const oa = a.default.order ?? 99
  const ob = b.default.order ?? 99
  return oa - ob
})

const asyncRoutes: RouteRecordRaw[] = moduleList.flatMap(([, module]) => {
  const version = module.default.version
  return version
    ? module.default.routes.map((route) => addVersionLayout(route, version))
    : module.default.routes
})

// 根路由：404 占位（用动态加载组件，避免误报）
const notFoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: RouteNames.NOT_FOUND,
  component: () => import('@/views/error/NotFound.vue'),
  meta: { hidden: true, layout: 'BlankLayout' },
}

export const routes: RouteRecordRaw[] = [...asyncRoutes, notFoundRoute]
