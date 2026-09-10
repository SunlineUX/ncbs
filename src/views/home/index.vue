<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/modules/theme'
import { useAppStore } from '@/stores/modules/app'
import { useLocaleStore } from '@/stores/modules/locale'
import BaseCard from '@/components/base/BaseCard/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton/BaseButton.vue'

const { t } = useI18n()
const themeStore = useThemeStore()
const appStore = useAppStore()
const localeStore = useLocaleStore()
</script>

<template>
  <div class="home-view">
    <h2 class="home-view__title">{{ t('menu.home') }}</h2>
    <div class="home-view__grid">
      <BaseCard :title="t('theme.toggle')">
        <p class="home-view__desc">
          {{ t('theme.mode.light') }} / {{ t('theme.mode.dark') }} /
          {{ t('theme.mode.auto') }}
        </p>
        <p class="home-view__value">
          mode: <code>{{ themeStore.mode }}</code> · resolved:
          <code>{{ themeStore.resolved }}</code>
        </p>
      </BaseCard>

      <BaseCard :title="t('layout.locale')">
        <p class="home-view__value">
          locale: <code>{{ localeStore.locale }}</code>
        </p>
        <BaseButton size="sm" variant="primary" @click="appStore.toggleSidebar">
          {{ t('layout.toggleSidebar') }}
        </BaseButton>
      </BaseCard>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home-view {
  &__title {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-lg);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-md);
  }

  &__desc {
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-sm);
  }

  &__value {
    color: var(--color-text-base);
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-md);

    code {
      color: var(--color-primary);
      background-color: var(--color-primary-light);
      padding: 2px 6px;
      border-radius: var(--radius-sm);
    }
  }
}
</style>
