<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { SideLayout, TopLayout } from '@/components/layout/AppLayout'
import BlankLayout from '@/components/layout/BlankLayout/BlankLayout.vue'
import AiLayout from '@/views/version-ai/Layout.vue'
import { useSettingsStore } from '@/stores/modules/settings'

// ===============================
// 根组件：根据路由 meta.layout 选择布局
// 布局组件内部已含 <RouterView /> 渲染页面，无需在此处再包一层
// ===============================

const router = useRouter()
const settingsStore = useSettingsStore()
const layoutComponents = {
  side: SideLayout,
  top: TopLayout,
} as const

const currentLayout = computed(() => {
  if (router.currentRoute.value.meta?.layout === 'BlankLayout') return BlankLayout
  if (router.currentRoute.value.meta?.layout === 'AiLayout') return AiLayout
  if (router.currentRoute.value.meta?.versionLayout) {
    return router.currentRoute.value.meta.versionLayout
  }
  return layoutComponents[settingsStore.layoutMode]
})
</script>

<template>
  <component :is="currentLayout" />
</template>
