import { appConfig } from '@/config'

// ===============================
// 带命名空间的 localStorage 封装
// 支持 JSON 序列化，并提供类型安全的读取
// ===============================

const buildKey = (key: string): string => `${appConfig.storageNamespace}:${key}`

export const storage = {
  /** 设置值（自动 JSON 序列化） */
  set<T>(key: string, value: T): void {
    try {
      window.localStorage.setItem(buildKey(key), JSON.stringify(value))
    } catch (err) {
      console.error('[storage] set failed:', err)
    }
  },

  /** 读取值（自动反序列化），解析失败返回 fallback */
  get<T>(key: string, fallback: T): T {
    try {
      const raw = window.localStorage.getItem(buildKey(key))
      if (raw === null) return fallback
      return JSON.parse(raw) as T
    } catch (err) {
      console.error('[storage] get failed:', err)
      return fallback
    }
  },

  /** 读取字符串（不解析，无值时返回 null） */
  getString(key: string): string | null {
    const raw = window.localStorage.getItem(buildKey(key))
    return raw
  },

  /** 删除键 */
  remove(key: string): void {
    window.localStorage.removeItem(buildKey(key))
  },

  /** 清空当前命名空间下所有键 */
  clear(): void {
    const prefix = `${appConfig.storageNamespace}:`
    Object.keys(window.localStorage).forEach((k) => {
      if (k.startsWith(prefix)) window.localStorage.removeItem(k)
    })
  },
}
