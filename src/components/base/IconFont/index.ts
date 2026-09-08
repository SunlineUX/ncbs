import type { App } from 'vue'
import IconFont from './IconFont.vue'

IconFont.install = (app: App) => {
  app.component('IconFont', IconFont)
}

export default IconFont
export { IconFont }
