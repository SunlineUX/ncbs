<script setup lang="ts">
import { computed } from 'vue'
import { i18n } from '@/locales'
import type { MenuItem } from '@/config/menu'


const props = defineProps<{ item: MenuItem; openKeys: string[]; selectedKeys: string[] }>()
const emit = defineEmits<{
  (event: 'click', key: string): void
  (event: 'openChange', key: string): void
}>()

const { t } = i18n.global
const hasChildren = computed(() => Boolean(props.item.children?.length))
const isOpen = computed(() => props.openKeys.includes(props.item.key))
const isSelected = computed(() => props.selectedKeys.includes(props.item.key))

function handleClick() {
  if (hasChildren.value) {
    emit('openChange', props.item.key)
  } else {
    emit('click', props.item.key)
  }
}
</script>

<template>
  <li class="top-menu-item" :class="{ 'is-open': isOpen, 'is-selected': isSelected }">
    <button
      class="top-menu-item__trigger"
      type="button"
      :title="t(item.label)"
      @click="handleClick"
    >
      <IconFont v-if="item.icon" class="top-menu-item__icon" :name="item.icon" />
      <span>{{ t(item.label) }}</span>
      <span v-if="hasChildren" class="top-menu-item__arrow" aria-hidden="true">
        <IconFont name="ArrowDown" size="12px" />
      </span>
    </button>
    <ul v-if="hasChildren" class="top-menu-item__children">
      <TopMenuItem
        v-for="child in item.children"
        :key="child.key"
        :item="child"
        :open-keys="openKeys"
        :selected-keys="selectedKeys"
        @click="emit('click', $event)"
        @open-change="emit('openChange', $event)"
      />
    </ul>
  </li>
</template>

<style lang="less" scoped>
.top-menu-item {
  position: relative;
  height: 100%;

  &__trigger {
    .flex-center();
    gap: var(--spacing-sm);
    min-width: 112px;
    height: 100%;
    padding: 0 var(--spacing-md);
    color: var(--color-text-base);
    background: transparent;
    white-space: nowrap;
    transition: background-color var(--transition-fast) var(--ease-in-out);

    &:hover,
    .top-menu-item.is-open > & {
      background-color: var(--color-sidebar-item-hover);
    }
  }

  &.is-selected > &__trigger {
    color: var(--color-primary);
    box-shadow: inset 0 -2px var(--color-primary);
  }

  &__icon {
    font-size: var(--font-size-md);
  }

  &__arrow {
    font-size: var(--font-size-md);
  }

  &__children {
    position: absolute;
    top: 100%;
    left: 0;
    display: none;
    min-width: 190px;
    margin: 0;
    padding: var(--spacing-xs) 0;
    list-style: none;
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-border);
    border-radius: 0 0 var(--radius-md) var(--radius-md);
    box-shadow: var(--shadow-md);
    z-index: var(--z-dropdown);
  }

  &:hover > &__children,
  &.is-open > &__children {
    display: block;
  }

  &__children &__trigger {
    justify-content: flex-start;
    width: 100%;
    height: 40px;
  }
}
</style>
