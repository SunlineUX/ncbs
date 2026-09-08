// ===============================
// 全局常量
// ===============================

// localStorage 键名（与 storage 命名空间结合使用）
export const StorageKeys = {
  THEME_MODE: 'theme_mode',
  LOCALE: 'locale',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  TOKEN: 'token',
  USER_INFO: 'user_info',
} as const

// 布局类型标识
export const LayoutType = {
  APP: 'AppLayout',
  BLANK: 'BlankLayout',
} as const

// 路由名称（用于重定向、命名跳转）
export const RouteNames = {
  ROOT: 'root',
  HOME: 'home',
  ABOUT: 'about',
  SYSTEM_USER: 'system_user',
  NOT_FOUND: 'not_found',
} as const
