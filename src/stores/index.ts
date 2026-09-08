import { createPinia } from 'pinia'
import { storage } from '@/utils/storage'
import { StorageKeys } from '@/constants'

// ===============================
// Pinia 类型扩展：声明 persist 为合法 store 选项
// ===============================
declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    /** 自定义持久化插件选项：指定需要持久化的 state 字段名或字段名数组 */
    persist?: string | string[]
  }
}

const pinia = createPinia()

/**
 * 轻量级持久化插件：在 store 上配置 `persist` 字段（键名或键名数组），
 * 即可将指定 state 字段同步到 localStorage，并在初始化时恢复。
 */
pinia.use(({ store, options }) => {
  const persist = (options as { persist?: string | string[] } | undefined)?.persist
  if (!persist) return

  const keys = Array.isArray(persist) ? persist : [persist]

  // 初始化时从 localStorage 恢复
  keys.forEach((k) => {
    const saved = storage.get(`${store.$id}:${k}`, null)
    if (saved !== null && saved !== undefined && k in store.$state) {
      ;(store.$state as Record<string, unknown>)[k] = saved
    }
  })

  // state 变化时同步写入
  store.$subscribe((_mutation, state) => {
    keys.forEach((k) => {
      if (k in state) {
        storage.set(`${store.$id}:${k}`, state[k])
      }
    })
  })
})

export { pinia, StorageKeys }
