<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import { useUserStore } from '@/stores/modules/user'
import { i18n } from '@/locales'
import AppBreadcrumb from '@/components/layout/AppBreadcrumb/AppBreadcrumb.vue'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle.vue'
import LocaleToggle from '@/components/LocaleToggle/LocaleToggle.vue'
import BaseButton from '@/components/base/BaseButton/BaseButton.vue'
import IconFont from '@/components/base/IconFont/IconFont.vue'
import AppSetting from '@/components/layout/AppSetting/AppSetting.vue'
import { useSettingsStore } from '@/stores/modules/settings'

withDefaults(
  defineProps<{
    showSidebarToggle?: boolean
  }>(),
  { showSidebarToggle: true },
)

const appStore = useAppStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const settingOpen = ref(false)

const { t } = i18n.global

function toggleSidebar() {
  appStore.toggleSidebar()
}
</script>

<template>
  <header class="app-header">
    <div class="app-header__left">
      <BaseButton
        v-if="showSidebarToggle"
        class="app-header__collapse"
        :title="appStore.sidebarCollapsed ? t('layout.expandSidebar') : t('layout.collapseSidebar')"
        variant="text"
        size="sm"
        @click="toggleSidebar"
      >
        <span class="app-header__collapse-icon">
          <IconFont
            :name="appStore.sidebarCollapsed ? 'SidebarLeftCollapse' : 'SidebarLeftExpand'"
            size="16"
          />
        </span>
        <!-- <span class="app-header__collapse-icon">{{ appStore.sidebarCollapsed ? '☰' : '⊟' }}</span> -->
      </BaseButton>
      <AppBreadcrumb v-if="settingsStore.enableBreadcrumb" />
    </div>

    <div class="app-header__right">
      <LocaleToggle />
      <ThemeToggle />
      <BaseButton
        variant="text"
        size="sm"
        :title="t('layout.settings.open')"
        @click="settingOpen = true"
      >
        <IconFont name="SettingFilled" />
      </BaseButton>
      <div class="app-header__user">
        <span class="app-header__avatar">{{ userStore.displayName.charAt(0) || 'U' }}</span>
        <!-- <span class="app-header__username">
          {{ userStore.displayName || t('layout.userCenter') }}
        </span> -->
        <!-- <BaseButton variant="text" size="sm" @click="handleLogout">
          {{ t('layout.logout') }}
        </BaseButton> -->
      </div>
    </div>
  </header>
  <AppSetting :open="settingOpen" @close="settingOpen = false" />
</template>

<style lang="less" scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: @layout-header-height;
  padding: 0 @spacing-md;
  background-color: var(--color-header-bg);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;

  &__left {
    display: flex;
    align-items: center;
    gap: @spacing-sm;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: @spacing-md;
  }

  &__collapse-icon {
    font-size: @font-size-md;
  }

  &__user {
    display: flex;
    align-items: center;
    gap: @spacing-xs;
  }

  &__avatar {
    .flex-center();
    width: 28px;
    height: 28px;
    border-radius: @radius-full;
    background-color: var(--color-primary);
    color: var(--color-primary-inverse);
    font-size: @font-size-xs;
    font-weight: @font-weight-semibold;
  }

  &__username {
    font-size: @font-size-sm;
    color: var(--color-text);
    .text-ellipsis();
  }
}
</style>
