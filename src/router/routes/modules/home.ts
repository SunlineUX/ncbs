import type { RouteModule } from '@/types/global'
import { RouteNames } from '@/constants'

const homeRoutes: RouteModule = {
  order: 1,
  routes: [
    {
      path: '/',
      name: RouteNames.HOME,
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: 'menu.home',
        icon: 'home',
      },
    },
  ],
}

export default homeRoutes
