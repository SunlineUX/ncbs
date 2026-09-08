import type { App } from 'vue'
import BaseInput from './BaseInput.vue'

BaseInput.install = (app: App) => {
  app.component('BaseInput', BaseInput)
}

export default BaseInput
export { BaseInput }
