import { createApp } from 'vue'
import App from './App.vue'
import { pinia } from './stores'
import { useThemeStore } from './stores/modules/theme'
import { useLocaleStore } from './stores/modules/locale'
import { useSettingsStore } from './stores/modules/settings'
import { i18n } from './locales'
import router from './router'
import { setupBaseComponents } from './components/base'
import { setupDirectives } from './directives'
import './styles/index.less'
import './assets/font/iconfont.css'

// ===============================
// 应用入口：装配 Pinia / Router / I18n / 全局组件 / 指令 / 全局样式
// ===============================

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)
setupBaseComponents(app)
setupDirectives(app)

// 初始化主题与语言状态（必须在 router 安装之后，guard 会依赖 locale）
const themeStore = useThemeStore()
themeStore.init()

const localeStore = useLocaleStore()
localeStore.init()

const settingsStore = useSettingsStore()
settingsStore.init()

app.mount('#app')
