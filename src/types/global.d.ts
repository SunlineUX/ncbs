// ===============================
// 全局类型定义
// ===============================

import type { RouteRecordRaw } from 'vue-router'
import type { ThemeName as RegisteredThemeName } from '@/config/themes'

// 实际主题名称
export type ThemeName = RegisteredThemeName

// 主题模式
export type ThemeMode = ThemeName | 'auto'

// 实际生效的主题（auto 解析后的结果）
export type ResolvedTheme = ThemeName

// 支持的语言
export type Locale = 'zh-CN' | 'en-US'

// 路由元信息扩展
declare module 'vue-router' {
  interface RouteMeta {
    /** 路由标题（多语言 key 或固定文本） */
    title?: string
    /** 使用的布局，默认 AppLayout */
    layout?: 'AppLayout' | 'BlankLayout'
    /** 是否在侧边栏菜单中隐藏 */
    hidden?: boolean
    /** 菜单图标（图标名称，由图标系统解析） */
    icon?: string
    /** 是否需要登录访问 */
    requiresAuth?: boolean
  }
}

// 路由模块标准结构
export interface RouteModule {
  order?: number
  routes: RouteRecordRaw[]
}
