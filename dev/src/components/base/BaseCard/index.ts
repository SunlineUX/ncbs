import type { App } from 'vue'
import BaseCard from './BaseCard.vue'

BaseCard.install = (app: App) => {
  app.component('BaseCard', BaseCard)
}

export default BaseCard
export { BaseCard }
