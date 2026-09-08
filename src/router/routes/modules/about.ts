import type { RouteModule } from '@/types/global'
import { RouteNames } from '@/constants'

const aboutRoutes: RouteModule = {
  order: 2,
  routes: [
    {
      path: '/about',
      name: RouteNames.ABOUT,
      component: () => import('@/views/about/index.vue'),
      meta: {
        title: 'menu.about',
        icon: 'info',
      },
    },
  ],
}

export default aboutRoutes
