<script setup lang="ts">
import { computed } from 'vue'
import { i18n } from '@/locales'
import { useLocaleStore } from '@/stores/modules/locale'
import { useThemeStore } from '@/stores/modules/theme'
import type { Locale, ThemeMode } from '@/types/global'
import {
  useSettingsStore,
  type DensityMode,
  type LayoutMode,
  type PrimaryColor,
  type RadiusMode,
} from '@/stores/modules/settings'
import BaseButton from '@/components/base/BaseButton/BaseButton.vue'
import IconFont from '@/components/base/IconFont/IconFont.vue'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (event: 'close'): void }>()

const { t } = i18n.global
const settingsStore = useSettingsStore()
const themeStore = useThemeStore()
const localeStore = useLocaleStore()
const themeModes = computed<{ value: ThemeMode; label: string }[]>(() => [
  { value: 'auto', label: t('theme.mode.auto') },
  { value: 'dark', label: t('theme.mode.dark') },
  { value: 'light', label: t('theme.mode.light') },
  { value: 'darkblue', label: t('theme.mode.darkblue') },
])
const languages = computed<{ value: Locale; label: string }[]>(() => [
  { value: 'zh-CN', label: '简体中文 SC' },
  { value: 'en-US', label: 'English' },
])

function setTheme(mode: ThemeMode) {
  themeStore.setMode(mode)
}

function setLocale(locale: Locale) {
  localeStore.setLocale(locale)
}

function setLayout(value: LayoutMode) {
  settingsStore.layoutMode = value
  settingsStore.apply()
}
function setDensity(value: DensityMode) {
  settingsStore.density = value
  settingsStore.apply()
}
function setPrimaryColor(value: PrimaryColor) {
  settingsStore.primaryColor = value
  settingsStore.apply()
}
function setRadius(value: RadiusMode) {
  settingsStore.radiusMode = value
  settingsStore.apply()
}
function reset() {
  settingsStore.reset()
  themeStore.setMode('light')
  localeStore.setLocale('zh-CN')
}
</script>

<template>
  <Transition name="fade">
    <div v-if="props.open" class="app-setting">
      <button
        class="app-setting__mask"
        type="button"
        aria-label="Close settings"
        @click="emit('close')"
      />
      <aside class="app-setting__panel">
        <header class="app-setting__header">
          <h2>{{ t('layout.settings.title') }}</h2>
          <BaseButton variant="text" size="sm" :title="t('common.close')" @click="emit('close')">
            <IconFont name="CloseFilled" />
          </BaseButton>
        </header>

        <div class="app-setting__body">
          <section class="app-setting__section">
            <h3>{{ t('layout.settings.layout') }}</h3>
            <div class="app-setting__choices app-setting__choices--two">
              <button
                :class="{ 'is-selected': settingsStore.layoutMode === 'side' }"
                type="button"
                @click="setLayout('side')"
              >
                {{ t('layout.settings.sideLayout') }}
              </button>
              <button
                :class="{ 'is-selected': settingsStore.layoutMode === 'top' }"
                type="button"
                @click="setLayout('top')"
              >
                {{ t('layout.settings.topLayout') }}
              </button>
            </div>
          </section>

          <section class="app-setting__section">
            <h3>{{ t('layout.settings.theme') }}</h3>
            <div class="app-setting__flat-list">
              <button
                v-for="mode in themeModes"
                :key="mode.value"
                class="app-setting__flat-option app-setting__theme-option"
                :class="{ 'is-selected': themeStore.mode === mode.value }"
                type="button"
                @click="setTheme(mode.value)"
              >
                <span class="app-setting__theme-mark" :class="`is-${mode.value}`" />
                <span>{{ mode.label }}</span>
              </button>
            </div>
          </section>

          <section class="app-setting__section">
            <h3>{{ t('layout.settings.language') }}</h3>
            <div class="app-setting__flat-list">
              <button
                v-for="language in languages"
                :key="language.value"
                class="app-setting__flat-option app-setting__language-option"
                :class="{ 'is-selected': localeStore.locale === language.value }"
                type="button"
                @click="setLocale(language.value)"
              >
                <span>{{ language.label }}</span>
                <span
                  v-if="localeStore.locale === language.value"
                  class="app-setting__check"
                  aria-hidden="true"
                />
              </button>
            </div>
          </section>

          <section class="app-setting__section">
            <h3>{{ t('layout.settings.primaryColor') }}</h3>
            <div class="app-setting__colors">
              <button
                v-for="color in ['blue', 'green', 'orange', 'red'] as PrimaryColor[]"
                :key="color"
                class="app-setting__color"
                :class="[`is-${color}`, { 'is-selected': settingsStore.primaryColor === color }]"
                type="button"
                :title="color"
                @click="setPrimaryColor(color)"
              />
            </div>
          </section>

          <section class="app-setting__section">
            <h3>{{ t('layout.settings.density') }}</h3>
            <div class="app-setting__choices app-setting__choices--two">
              <button
                :class="{ 'is-selected': settingsStore.density === 'comfortable' }"
                type="button"
                @click="setDensity('comfortable')"
              >
                {{ t('layout.settings.comfortable') }}
              </button>
              <button
                :class="{ 'is-selected': settingsStore.density === 'compact' }"
                type="button"
                @click="setDensity('compact')"
              >
                {{ t('layout.settings.compact') }}
              </button>
            </div>
          </section>

          <section class="app-setting__section">
            <h3>{{ t('layout.settings.radius') }}</h3>
            <div class="app-setting__choices app-setting__choices--three">
              <button
                v-for="radius in ['default', 'round', 'square'] as RadiusMode[]"
                :key="radius"
                :class="{ 'is-selected': settingsStore.radiusMode === radius }"
                type="button"
                @click="setRadius(radius)"
              >
                {{ t(`layout.settings.radius_${radius}`) }}
              </button>
            </div>
          </section>

          <section class="app-setting__section">
            <label
              ><input v-model="settingsStore.enableTabs" type="checkbox" />
              {{ t('layout.settings.tabs') }}</label
            >
            <label
              ><input v-model="settingsStore.enableBreadcrumb" type="checkbox" />
              {{ t('layout.settings.breadcrumb') }}</label
            >
          </section>
        </div>

        <footer class="app-setting__footer">
          <BaseButton block variant="default" @click="reset">{{ t('common.reset') }}</BaseButton>
        </footer>
      </aside>
    </div>
  </Transition>
</template>

<style lang="less" scoped>
.app-setting {
  position: fixed;
  inset: 0;
  z-index: @z-modal;

  &__mask {
    position: absolute;
    inset: 0;
    width: 100%;
    background: var(--color-bg-overlay);
  }

  &__panel {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    width: min(360px, 100vw);
    height: 100%;
    background: var(--color-bg-elevated);
    color: var(--color-text);
    box-shadow: var(--shadow-lg);
  }

  &__header,
  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: @spacing-md @spacing-lg;
    border-bottom: 1px solid var(--color-border);
  }

  &__header h2 {
    font-size: @font-size-lg;
  }
  &__body {
    flex: 1;
    overflow-y: auto;
    padding: @spacing-lg;
  }
  &__section {
    padding: @spacing-md 0;
    border-bottom: 1px solid var(--color-border-light);
  }
  &__section h3 {
    margin-bottom: @spacing-sm;
    font-size: @font-size-sm;
    color: var(--color-text-muted);
  }
  &__flat-list {
    display: flex;
    flex-direction: column;
    gap: @spacing-xs;
  }

  &__flat-option {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 48px;
    padding: 0 @spacing-sm;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    color: var(--color-text-base);
    text-align: left;
    transition:
      background-color @transition-fast @ease-in-out,
      border-color @transition-fast @ease-in-out;

    &:hover {
      background-color: var(--color-bg-soft);
    }

    &.is-selected {
      border-color: var(--color-border-light);
      background-color: var(--color-bg-soft);
      color: var(--color-text);
    }
  }

  &__theme-option {
    gap: @spacing-md;
    font-size: @font-size-md;
  }

  &__theme-mark {
    width: 22px;
    height: 22px;
    flex: 0 0 22px;
    border: 5px solid var(--color-border-strong);
    border-radius: 50%;

    &.is-auto {
      border-color: var(--color-primary);
    }

    &.is-dark {
      border-color: #1f2937;
    }

    &.is-light {
      border-color: #d1d5db;
    }

    &.is-darkblue {
      border-color: #2563eb;
    }
  }

  &__language-option {
    justify-content: space-between;
    min-height: 56px;
    padding: 0 @spacing-md;
    font-size: @font-size-lg;
  }

  &__check {
    width: 14px;
    height: 8px;
    border-bottom: 3px solid var(--color-text);
    border-left: 3px solid var(--color-text);
    transform: rotate(-45deg) translateY(-2px);
  }

  &__language-option .iconfont {
    color: var(--color-text);
    font-size: @font-size-xl;
  }
  label {
    display: block;
    margin: @spacing-sm 0;
    font-size: @font-size-sm;
    cursor: pointer;
  }
  input {
    margin-right: @spacing-xs;
    accent-color: var(--color-primary);
  }
  &__choices {
    display: grid;
    gap: @spacing-xs;
  }
  &__choices--two {
    grid-template-columns: repeat(2, 1fr);
  }
  &__choices--three {
    grid-template-columns: repeat(3, 1fr);
  }
  &__choices button {
    min-height: 34px;
    padding: 0 @spacing-xs;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-base);
  }
  &__choices button.is-selected {
    border-color: var(--color-primary);
    color: var(--color-primary);
    background: var(--color-primary-light);
  }
  &__colors {
    display: flex;
    gap: @spacing-md;
  }
  &__color {
    width: 26px;
    height: 26px;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  &__color.is-selected {
    border-color: var(--color-text);
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  &__color.is-blue {
    background: #2563eb;
  }
  &__color.is-green {
    background: #16a34a;
  }
  &__color.is-orange {
    background: #ea580c;
  }
  &__color.is-red {
    background: #dc2626;
  }
  &__footer {
    border-top: 1px solid var(--color-border);
    border-bottom: 0;
  }
}
</style>
