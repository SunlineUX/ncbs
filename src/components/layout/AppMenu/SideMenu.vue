<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { menuItems, type MenuItem } from '@/config/menu'
import SideMenuItem from './SideMenuItem.vue'

const props = withDefaults(
  defineProps<{
    mode?: 'inline' | 'collapse'
    items?: MenuItem[]
    inlineCollapsed?: boolean
    selectedKeys?: string[]
    openKeys?: string[]
  }>(),
  {
    items: () => menuItems,
    mode: 'inline',
    inlineCollapsed: false,
    selectedKeys: undefined,
    openKeys: undefined,
  },
)

const emit = defineEmits<{
  (event: 'click', key: string): void
  (event: 'update:selectedKeys', keys: string[]): void
  (event: 'update:openKeys', keys: string[]): void
}>()

const route = useRoute()
const router = useRouter()
const internalOpenKeys = ref<string[]>([])

const selectedKeys = computed(() => props.selectedKeys ?? [route.path])
const openKeys = computed(() => props.openKeys ?? internalOpenKeys.value)

function findParentKeys(items: MenuItem[], target: string, parents: string[] = []): string[] {
  for (const item of items) {
    if (item.key === target) return parents
    if (item.children) {
      const result = findParentKeys(item.children, target, [...parents, item.key])
      if (result.length > parents.length || result.includes(item.key)) return result
    }
  }
  return []
}

function syncRouteState() {
  const parents = findParentKeys(props.items, route.path)
  if (props.openKeys === undefined) internalOpenKeys.value = parents
}

watch(() => route.path, syncRouteState, { immediate: true })

function handleClick(key: string) {
  emit('click', key)
  emit('update:selectedKeys', [key])
  router.push(key)
}

function handleOpenChange(key: string) {
  const nextKeys = openKeys.value.includes(key)
    ? openKeys.value.filter((openKey) => openKey !== key)
    : [...openKeys.value, key]
  if (props.openKeys === undefined) internalOpenKeys.value = nextKeys
  emit('update:openKeys', nextKeys)
}
</script>

<template>
  <nav class="side-menu" aria-label="Side menu">
    <ul class="side-menu__list">
      <SideMenuItem
        v-for="item in items"
        :key="item.key"
        :item="item"
        :mode="mode"
        :inline-collapsed="inlineCollapsed"
        :open-keys="openKeys"
        :selected-keys="selectedKeys"
        @click="handleClick"
        @open-change="handleOpenChange"
      />
    </ul>
  </nav>
</template>

<style lang="less" scoped>
.side-menu {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-sm) 0;
  .scrollbar-themed();

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
</style>
