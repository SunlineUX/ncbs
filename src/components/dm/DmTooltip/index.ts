import type { App } from 'vue'
import DmTooltip from './DmTooltip.vue'

DmTooltip.install = (app: App) => {
  app.component('DmTooltip', DmTooltip)
}

export default DmTooltip
export { DmTooltip }