<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/modules/theme'
import { appConfig } from '@/config'
import { i18n } from '@/locales'
import type { ThemeMode } from '@/types/global'

const themeStore = useThemeStore()
const { t } = i18n.global

const modes = computed(() => appConfig.themeModes)

function selectMode(mode: ThemeMode) {
  themeStore.setMode(mode)
}

function nextMode(): ThemeMode {
  const idx = modes.value.findIndex((m) => m.value === themeStore.mode)
  const next = modes.value[(idx + 1) % modes.value.length]
  return next.value
}

function onToggle() {
  themeStore.setMode(nextMode())
}

const icon = computed(() => {
  if (themeStore.isDark) return '🌙'
  return '☀'
})

const label = computed(() => {
  const mode = themeStore.mode
  const found = modes.value.find((m) => m.value === mode)
  return found ? t(found.labelKey) : mode
})
</script>

<template>
  <div class="theme-toggle">
    <button class="theme-toggle__btn" type="button" :title="t('theme.toggle')" @click="onToggle">
      <span class="theme-toggle__icon">{{ icon }}</span>
      <span class="theme-toggle__text">{{ label }}</span>
    </button>
    <ul class="theme-toggle__menu">
      <li
        v-for="m in modes"
        :key="m.value"
        class="theme-toggle__item"
        :class="{ 'is-active': themeStore.mode === m.value }"
        @click="selectMode(m.value)"
      >
        {{ t(m.labelKey) }}
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.theme-toggle {
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
