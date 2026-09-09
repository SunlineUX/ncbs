import { computed, defineComponent, h } from 'vue'
import { SideLayout, TopLayout } from '@/components/layout/AppLayout'
import { useSettingsStore } from '@/stores/modules/settings'

export default defineComponent({
	name: 'Version32Layout',
	setup() {
		const settingsStore = useSettingsStore()
		const layoutComponents = {
			side: SideLayout,
			top: TopLayout,
		} as const

		const currentLayout = computed(() => layoutComponents[settingsStore.layoutMode])

		return () => h(currentLayout.value)
	},
})
