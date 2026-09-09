import type { RouteModule } from '@/types/global'
import { RouteNames } from '@/constants'

const datamindRoutes: RouteModule = {
    version: 'version-3.2',
	order: 1,
	routes: [
		{
			path: '/',
			name: RouteNames.ROOT,
			redirect: '/home',
			meta: {
				hidden: true,
			},
            },
        {
            path: '/home',
            name: RouteNames.HOME,
            component: () => import('@/views/home/index.vue'),
            meta: {
                title: 'menu.home',
            },
        },
        {
            path: '/about',
            name: RouteNames.ABOUT,
            component: () => import('@/views/about/index.vue'),
            meta: {
                title: 'menu.about',
                icon: 'info',
            },
        },
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

export default datamindRoutes