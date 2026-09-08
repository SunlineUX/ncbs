<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import SideMenu from '../AppMenu/SideMenu.vue'
import Logo from '../AppLogo/Logo.vue'
import { menuItems } from '@/config/menu'

const props = defineProps<{ width: string }>()

const appStore = useAppStore()

const sidebarStyle = computed<CSSProperties>(() => ({
  width: props.width,
}))
</script>

<template>
  <aside class="app-sidebar" :style="sidebarStyle">
    <Logo />
    <SideMenu :items="menuItems" mode="collapse" :inline-collapsed="appStore.sidebarCollapsed" />
  </aside>
</template>

<style lang="less" scoped>
.app-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: var(--color-sidebar-bg);
  border-right: 1px solid var(--color-border);
  transition: width @transition-base @ease-in-out;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: @z-sidebar;
}
</style>
