<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, type RouteLocationMatched } from 'vue-router'
import { i18n } from '@/locales'

const router = useRouter()
const { t, te } = i18n.global

interface BreadcrumbItem {
  title: string
  path?: string
}

/** 从当前 matched 路由链提取面包屑节点 */
const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const matched = router.currentRoute.value.matched as RouteLocationMatched[]
  const items: BreadcrumbItem[] = []

  // 始终在最前插入「首页」
  items.push({ title: t('layout.breadcrumbHome'), path: '/' })

  matched.forEach((m) => {
    if (m.meta?.hidden) return
    if (m.path === '/') return
    const titleKey = m.meta?.title
    const title = titleKey && te(titleKey) ? t(titleKey) : (titleKey ?? m.name?.toString() ?? '')
    if (!title) return
    if (items.some((x) => x.path === m.path)) return
    items.push({ title, path: m.path })
  })
  return items
})
</script>

<template>
  <nav class="app-breadcrumb">
    <template v-for="(item, idx) in breadcrumbs" :key="idx">
      <span
        class="app-breadcrumb__item"
        :class="{ 'is-current': idx === breadcrumbs.length - 1 }"
        @click="item.path ? router.push(item.path) : undefined"
      >
        {{ item.title }}
      </span>
      <span v-if="idx < breadcrumbs.length - 1" class="app-breadcrumb__sep">/</span>
    </template>
  </nav>
</template>

<style lang="less" scoped>
.app-breadcrumb {
  display: flex;
  align-items: center;
  gap: @spacing-xs;
  font-size: @font-size-sm;
  color: var(--color-text-muted);

  &__item {
    cursor: pointer;
    .text-ellipsis();

    &:hover {
      color: var(--color-primary);
    }

    &.is-current {
      color: var(--color-text);
      cursor: default;
    }
  }

  &__sep {
    color: var(--color-text-muted);
    user-select: none;
  }
}
</style>
