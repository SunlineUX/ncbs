<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { appConfig } from '@/config'
import BaseCard from '@/components/base/BaseCard/BaseCard.vue'

const { t } = useI18n()
</script>

<template>
  <div class="about-view">
    <h2 class="about-view__title">{{ t('menu.about') }}</h2>
    <BaseCard title="NCBS">
      <p class="about-view__desc">
        {{ appConfig.appTitle }} · Vite + Vue 3 + TypeScript + Pinia + Vue Router + Vue I18n
      </p>
      <ul class="about-view__list">
        <li>路由管理：动态模块化路由 + 守卫</li>
        <li>状态管理：Pinia + localStorage 持久化</li>
        <li>组件管理：自研基础组件 + 统一注册</li>
        <li>布局管理：可切换布局（AppLayout / BlankLayout）</li>
        <li>主题管理：CSS 变量 + 深浅色切换</li>
        <li>国际化：中英文切换，模块化语言包</li>
      </ul>
    </BaseCard>
  </div>
</template>

<style lang="less" scoped>
.about-view {
  &__title {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-lg);
  }

  &__desc {
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-md);
  }

  &__list {
    li {
      padding: var(--spacing-xs) 0;
      color: var(--color-text-base);
    }
  }
}
</style>
