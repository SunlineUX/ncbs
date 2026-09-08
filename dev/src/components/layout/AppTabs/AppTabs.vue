<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { i18n } from '@/locales'

interface TabItem {
  path: string
  title: string
}

const router = useRouter()
const route = useRoute()
const { t, te } = i18n.global
const tabs = ref<TabItem[]>([])

function titleForCurrentRoute(): string {
  const title = route.meta.title
  return title && te(title) ? t(title) : title || route.name?.toString() || route.path
}

function addCurrentTab() {
  if (route.meta.hidden || tabs.value.some((tab) => tab.path === route.path)) return
  tabs.value.push({ path: route.path, title: titleForCurrentRoute() })
}

addCurrentTab()
const removeAfterEach = router.afterEach(() => addCurrentTab())

function closeTab(path: string) {
  const index = tabs.value.findIndex((tab) => tab.path === path)
  tabs.value.splice(index, 1)
  if (path === route.path) router.push(tabs.value[index - 1]?.path || '/')
}

onBeforeUnmount(removeAfterEach)
</script>

<template>
  <nav class="app-tabs" aria-label="Page tabs">
    <button
      v-for="tab in tabs"
      :key="tab.path"
      class="app-tabs__tab"
      :class="{ 'is-active': tab.path === route.path }"
      type="button"
      @click="router.push(tab.path)"
    >
      <span>{{ tab.title }}</span>
      <span v-if="tab.path !== '/'" class="app-tabs__close" @click.stop="closeTab(tab.path)"
        >×</span
      >
    </button>
  </nav>
</template>

<style lang="less" scoped>
.app-tabs {
  display: flex;
  flex-shrink: 0;
  gap: @spacing-xs;
  min-height: 38px;
  padding: @spacing-xs @spacing-md 0;
  overflow-x: auto;
  background: var(--color-bg-soft);
  border-bottom: 1px solid var(--color-border);

  &__tab {
    display: inline-flex;
    align-items: center;
    gap: @spacing-xs;
    min-width: 72px;
    max-width: 180px;
    height: 30px;
    padding: 0 @spacing-sm;
    border: 1px solid var(--color-border);
    border-bottom: 0;
    border-radius: var(--radius-md) var(--radius-md) 0 0;
    color: var(--color-text-muted);
    background: var(--color-bg-elevated);
    white-space: nowrap;
  }

  &__tab span:first-child {
    .text-ellipsis();
  }
  &__tab.is-active {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
  &__close {
    font-size: @font-size-md;
    line-height: 1;
  }
}
</style>
