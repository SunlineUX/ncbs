import type { RouteModule } from '@/types/global'
import { RouteNames } from '@/constants'

const systemRoutes: RouteModule = {
  order: 3,
  routes: [
    {
      path: '/system',
      name: 'system',
      redirect: '/system/user',
      meta: {
        title: 'menu.system.self',
        icon: 'settings',
      },
      children: [
        {
          path: 'user',
          name: RouteNames.SYSTEM_USER,
          component: () => import('@/views/system/user/index.vue'),
          meta: {
            title: 'menu.system.user',
            icon: 'user',
          },
        },
      ],
    },
  ],
}

export default systemRoutes
