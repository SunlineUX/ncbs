import type { RouteModule } from '@/types/global'
import { RouteNames } from '@/constants'

const aboutRoutes: RouteModule = {
  version: 'version-ai',
  order: 100,
  routes: [
    {
      path: '/ai',
      name: RouteNames.AI,
      redirect: '/ai/home',
      meta: {
        title: 'menu.ai.home',
        layout: 'AiLayout',
      },
      children: [
        {
          path: 'home',
          name: RouteNames.AI_HOME,
          component: () => import('@/views/version-ai/Home.vue'),
          meta: {
            title: 'menu.ai.home',
          },
        },
        {
          path: 'dev',
          name: RouteNames.DEV,
          component: () => import('@/views/version-ai/Dev.vue'),
          meta: {
            title: 'menu.ai.dev',
          },
        },
      ],
    },
  ],
}

export default aboutRoutes