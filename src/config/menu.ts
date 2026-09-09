// ===============================
// 菜单结构与内容配置
// 菜单布局组件只消费这里的数据，不直接依赖路由定义
// ===============================

export interface MenuItem {
  key: string
  label: string
  icon?: string
  children?: MenuItem[]
}

export const menuItems: MenuItem[] = [
  {
    key: '/home',
    label: 'menu.home',
    icon: 'HomeFilled',
  },
  {
    key: '/about',
    label: 'menu.about',
    icon: 'CompassFilled',
  },
  {
    key: '/system',
    label: 'menu.system.self',
    icon: 'SettingFilled',
    children: [
      {
        key: '/system/user',
        label: 'menu.system.user',
        icon: 'UserInfoFilled',
      },
    ],
  },
]

export const aiMenus: MenuItem[] = [
  {
    key: '/ai',
    label: 'menu.ai.home',
    icon: 'HomeFilled',
  },
  {
    key: '/ai/dev',
    label: 'menu.ai.dev',
    icon: 'CompassFilled',
  },
  // {
  //   key: '/system',
  //   label: 'menu.system.self',
  //   icon: 'SettingFilled',
  //   children: [
  //     {
  //       key: '/system/user',
  //       label: 'menu.system.user',
  //       icon: 'UserInfoFilled',
  //     },
  //   ],
  // },
]