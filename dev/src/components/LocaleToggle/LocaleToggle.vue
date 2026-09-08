<script setup lang="ts">
import { computed } from 'vue'
import { useLocaleStore } from '@/stores/modules/locale'
import { i18n } from '@/locales'
import { appConfig } from '@/config'
import type { Locale } from '@/types/global'

const localeStore = useLocaleStore()
const { t } = i18n.global

const locales = computed(() => appConfig.locales)

function selectLocale(value: Locale) {
  localeStore.setLocale(value)
}

const currentLabel = computed(() => {
  const found = locales.value.find((l) => l.value === localeStore.locale)
  return found?.label ?? localeStore.locale
})
</script>

<template>
  <div class="locale-toggle">
    <button class="locale-toggle__btn" type="button" :title="t('layout.locale')">
      <span class="locale-toggle__icon">🌐</span>
      <span class="locale-toggle__text">{{ currentLabel }}</span>
    </button>
    <ul class="locale-toggle__menu">
      <li
        v-for="l in locales"
        :key="l.value"
        class="locale-toggle__item"
        :class="{ 'is-active': localeStore.locale === l.value }"
        @click="selectLocale(l.value)"
      >
        {{ l.label }}
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.locale-toggle {
  position: relative;

  &__btn {
    .flex-center();
    gap: @spacing-xs;
    height: 32px;
    padding: 0 @spacing-sm;
    border-radius: @radius-md;
    color: var(--color-text-base);
    transition: background-color @transition-fast @ease-in-out;

    &:hover {
      background-color: var(--color-primary-light);
      color: var(--color-primary);
    }
  }

  &__icon {
    font-size: @font-size-md;
  }

  &__text {
    font-size: @font-size-xs;
  }

  &__menu {
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    min-width: 120px;
    background-color: var(--color-bg-elevated);
    border: 1px solid var(--color-border);
    border-radius: @radius-md;
    box-shadow: var(--shadow-md);
    padding: @spacing-xs 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4px);
    transition: all @transition-fast @ease-in-out;
    z-index: @z-dropdown;
  }

  &:hover &__menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  &__item {
    padding: @spacing-xs @spacing-md;
    cursor: pointer;
    font-size: @font-size-sm;
    color: var(--color-text-base);
    transition: background-color @transition-fast @ease-in-out;

    &:hover {
      background-color: var(--color-sidebar-item-hover);
    }

    &.is-active {
      color: var(--color-primary);
      background-color: var(--color-primary-light);
    }
  }
}
</style>
