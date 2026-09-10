<script setup lang="ts">
import { useSettingsStore } from '@/stores/modules/settings'
import { menuItems } from '@/config/menu'
import TopMenu from '@/components/layout/AppMenu/TopMenu.vue'
import SideLayoutHeader from '@/components/layout/AppHeader/SideLayoutHeader.vue'
import AppContent from '@/components/layout/AppContent/AppContent.vue'
import AppTabs from '@/components/layout/AppTabs/AppTabs.vue'

const settingsStore = useSettingsStore()
</script>

<template>
  <div class="top-layout">
    <nav class="top-layout__nav" aria-label="Main menu">
      <div class="top-layout__logo">NCBS</div>
      <TopMenu :items="menuItems" />
    </nav>
    <div class="top-layout__main">
      <SideLayoutHeader :show-sidebar-toggle="false" />
      <AppTabs v-if="settingsStore.enableTabs" />
      <AppContent />
    </div>
  </div>
</template>

<style lang="less" scoped>
.top-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__nav {
    display: flex;
    flex-shrink: 0;
    height: var(--layout-header-height);
    background-color: var(--color-sidebar-bg);
    border-bottom: 1px solid var(--color-border);
    z-index: var(--z-header);
  }

  &__logo {
    .flex-center();
    width: 220px;
    flex-shrink: 0;
    color: var(--color-primary);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    letter-spacing: 1px;
    border-right: 1px solid var(--color-border);
  }

  &__main {
    display: flex;
    flex: 1;
    min-height: 0;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
