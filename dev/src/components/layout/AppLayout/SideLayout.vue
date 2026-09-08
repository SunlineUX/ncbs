<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import { useSettingsStore } from '@/stores/modules/settings'
import SideLayoutHeader from '@/components/layout/AppHeader/SideLayoutHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar/AppSidebar.vue'
import AppContent from '@/components/layout/AppContent/AppContent.vue'
import AppTabs from '@/components/layout/AppTabs/AppTabs.vue'

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const sidebarWidth = computed(() => (appStore.sidebarCollapsed ? '64px' : '220px'))
</script>

<template>
  <div class="app-layout">
    <AppSidebar :width="sidebarWidth" />
    <div class="app-layout__main" :style="{ marginLeft: sidebarWidth }">
      <SideLayoutHeader />
      <AppTabs v-if="settingsStore.enableTabs" />
      <AppContent />
    </div>
  </div>
</template>

<style lang="less" scoped>
.app-layout {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__main {
    height: 100%;
    transition: margin-left @transition-base @ease-in-out;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}
</style>
