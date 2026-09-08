import type { App } from 'vue'
import BaseButton from './BaseButton'
import BaseInput from './BaseInput'
import BaseCard from './BaseCard'
import IconFont from './IconFont'

// ===============================
// 基础组件统一全局注册
// ===============================

const components = [BaseButton, BaseInput, BaseCard, IconFont]

export function setupBaseComponents(app: App) {
  components.forEach((c) => app.use(c as never))
}

export { BaseButton, BaseInput, BaseCard, IconFont }
