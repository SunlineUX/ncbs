import type { App } from 'vue'
import BaseButton from './BaseButton.vue'

BaseButton.install = (app: App) => {
  app.component('BaseButton', BaseButton)
}

export default BaseButton
export { BaseButton }
