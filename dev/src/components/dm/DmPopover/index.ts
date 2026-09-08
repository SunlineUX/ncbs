import type { App } from 'vue'
import DmPopover from './DmPopover.vue'

DmPopover.install = (app: App) => {
  app.component('DmPopover', DmPopover)
}

export default DmPopover
export { DmPopover }
