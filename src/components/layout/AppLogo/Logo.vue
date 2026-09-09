
<template>
    <div class="app-logo__logo" :class="{ 'is-collapsed': appStore.sidebarCollapsed }">
      <div class="app-logo__logo-link">
        <span class="app-logo__logo-icon">
          <img src="@/assets/logo.svg" alt="logo" />
        </span>
        <span class="app-logo__logo-text" v-if="!appStore.sidebarCollapsed">{{ appConfig.appTitle }}</span>
      </div>
      <BaseButton
        v-if="showSidebarToggle"
        class="app-header__collapse"
        :title="appStore.sidebarCollapsed ? t('layout.expandSidebar') : t('layout.collapseSidebar')"
        variant="text"
        size="sm"
        @click="toggleSidebar"
      >
        <span class="app-header__collapse-icon" >
          <IconFont
            :name="appStore.sidebarCollapsed ? 'SidebarLeftCollapse' : 'SidebarLeftExpand'"
            size="16"
          />
        </span>
      </BaseButton>
    </div>
</template>
<script setup lang="ts">
import { appConfig } from '@/config'
import { useAppStore } from '@/stores/modules/app'
import { i18n } from '@/locales'
import BaseButton from '@/components/base/BaseButton/BaseButton.vue'
import IconFont from '@/components/base/IconFont/IconFont.vue'

withDefaults(
  defineProps<{
    showSidebarToggle?: boolean
  }>(),
  { showSidebarToggle: true },
)

const appStore = useAppStore()

const { t } = i18n.global

function toggleSidebar() {
  appStore.toggleSidebar()
}


</script>
<style lang="less" scoped>
.app-logo {
  height: 100%;
  &__logo {
    height: 100%;
    .flex-between();
    height: 100%;
    flex-shrink: 0;
    padding: 0 @spacing-md;
    transition: all @transition-fast @ease-in-out;
    &.is-collapsed {
      // padding: 0 @spacing-lg;
      .app-header__collapse{
        
        opacity: 0;
      }
      &:hover .app-header__collapse{
        opacity: 1;
        transform: translateX(-32px);
      }
      &:hover .app-logo__logo-link{
        opacity: 0;
        transform: translateX(-40px);
      }
    }
  }
  &__logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    gap: @spacing-sm;
    transition: all @transition-fast @ease-in-out;
  }

  &__logo-icon {
    width: 32px;
    height: 32px;
  }

  &__logo-text {
    font-size: @font-size-lg;
    font-weight: @font-weight-bold;
    color: var(--color-primary);
    letter-spacing: 1px;
    white-space: nowrap;
  }
}
</style>