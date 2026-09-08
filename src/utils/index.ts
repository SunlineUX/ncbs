export * from './storage'
export * from './theme'

// ===============================
// 通用工具函数
// ===============================

/** 判空 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

/** 是否为字符串 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}
