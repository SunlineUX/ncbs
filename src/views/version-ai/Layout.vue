<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useAppStore } from '@/stores/modules/app'
import SideBar from './SideBar.vue'

const appStore = useAppStore()
const sidebarWidth = computed(() => (appStore.sidebarCollapsed ? '56px' : '180px'))
</script>

<template>
  <div class="ai-layout">
    <SideBar :width="sidebarWidth" />
    <div class="app-layout__main" :style="{ marginLeft: sidebarWidth }">
      <RouterView />
    </div>
  </div>
</template>

<style lang="less" scoped>
.ai-layout {
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
