<script setup lang="ts">
import { computed } from 'vue'
import { i18n } from '@/locales'
import type { MenuItem } from '@/config/menu'
import DmPopover from '@/components/dm/DmPopover/DmPopover.vue'
import DmTooltip from '@/components/dm/DmTooltip/DmTooltip.vue'

const props = withDefaults(
  defineProps<{
    item: MenuItem
    mode?: 'inline' | 'collapse'
    inlineCollapsed?: boolean
    openKeys?: string[]
    selectedKeys?: string[]
    level?: number
  }>(),
  {
    mode: 'inline',
    inlineCollapsed: false,
    openKeys: () => [],
    selectedKeys: () => [],
    level: 0,
  },
)

const emit = defineEmits<{
  (event: 'click', key: string): void
  (event: 'openChange', key: string): void
}>()

const { t } = i18n.global
const hasChildren = computed(() => Boolean(props.item.children?.length))
const isOpen = computed(() => props.openKeys.includes(props.item.key))
const isSelected = computed(() => props.selectedKeys.includes(props.item.key))
const usePopover = computed(
  () => hasChildren.value && (props.mode === 'inline' || props.inlineCollapsed),
)
const useTooltip = computed(() => props.inlineCollapsed && props.level === 0)
const popoverMode = computed(() => (props.inlineCollapsed ? 'inline' : props.mode))

function handleClick() {
  if (hasChildren.value) {
    emit('openChange', props.item.key)
    return
  }
  emit('click', props.item.key)
}

function handleChildClick(key: string) {
  emit('click', key)
}

function handleChildOpenChange(key: string) {
  emit('openChange', key)
}
</script>

<template>
  <li
    class="app-menu-item"
    :class="{
      'is-open': isOpen,
      'is-selected': isSelected,
      'has-children': hasChildren,
      'is-collapsed': inlineCollapsed && level === 0,
    }"
  >
    <DmPopover v-if="usePopover" placement="right-start" trigger="hover">
      <template #trigger>
        <button
          class="app-menu-item__trigger"
          type="button"
          :title="t(item.label)"
          @click="handleClick"
        >
          <IconFont v-if="item.icon" class="app-menu-item__icon" :name="item.icon" />
          <span v-if="!inlineCollapsed" class="app-menu-item__label">{{ t(item.label) }}</span>
          <span v-if="!inlineCollapsed" class="app-menu-item__arrow" aria-hidden="true">
            <IconFont name="ArrowRight" size="12px" />
          </span>
        </button>
      </template>
      <div v-if="inlineCollapsed" class="app-menu-item__popover-title">
        {{ t(item.label) }}
      </div>
      <ul class="app-menu-item__children app-menu-item__children--popover">
        <SideMenuItem
          v-for="child in item.children"
          :key="child.key"
          :item="child"
          :mode="popoverMode"
          :inline-collapsed="false"
          :open-keys="openKeys"
          :selected-keys="selectedKeys"
          :level="level + 1"
          @click="handleChildClick"
          @open-change="handleChildOpenChange"
        />
      </ul>
    </DmPopover>

    <template v-else-if="useTooltip">
      <DmTooltip placement="right">
        <template #trigger>
          <button
            class="app-menu-item__trigger"
            type="button"
            :title="t(item.label)"
            @click="handleClick"
          >
            <IconFont v-if="item.icon" class="app-menu-item__icon" :name="item.icon" />
          </button>
        </template>
        {{ t(item.label) }}
      </DmTooltip>
    </template>

    <template v-else>
      <button
        class="app-menu-item__trigger"
        type="button"
        :title="t(item.label)"
        @click="handleClick"
      >
        <IconFont v-if="item.icon" class="app-menu-item__icon" :name="item.icon" />
        <span class="app-menu-item__label" v-if="!inlineCollapsed">{{ t(item.label) }}</span>
        <span
          v-if="hasChildren && !inlineCollapsed"
          class="app-menu-item__arrow"
          :class="{ 'rotate-180': isOpen }"
          aria-hidden="true"
        >
          <IconFont name="ArrowDown" size="12px" />
        </span>
      </button>
    </template>

    <ul v-if="hasChildren && !inlineCollapsed && mode === 'collapse'" class="app-menu-item__children">
      <SideMenuItem
        v-for="child in item.children"
        :key="child.key"
        :item="child"
        :mode="mode"
        :inline-collapsed="false"
        :open-keys="openKeys"
        :selected-keys="selectedKeys"
        :level="level + 1"
        @click="handleChildClick"
        @open-change="handleChildOpenChange"
      />
    </ul>
  </li>
</template>

<style lang="less" scoped>
.app-menu-item {
  position: relative;

  &__trigger {
    .flex-start();
    gap: var(--spacing-sm);
    width: 100%;
    height: 40px;
    padding: 0 var(--spacing-md);
    border: 0;
    cursor: pointer;
    color: var(--color-text-base);
    background: transparent;
    transition: background-color var(--transition-fast) var(--ease-in-out);
    white-space: nowrap;
    text-align: left;

    &:hover {
      background-color: var(--color-sidebar-item-hover);
    }
  }

  &.is-selected:not(.has-children) &__trigger {
    background-color: var(--color-sidebar-item-active);
    color: var(--color-sidebar-item-active-text);
  }
  .has-children  &__trigger {
    .flex-center();
  }

  &.is-selected &__trigger {
    color: var(--color-sidebar-item-active-text);
  }
  &.is-collapsed &__trigger {
    justify-content: center;
    padding: 0;
  }

  &__icon {
    .flex-center();
    flex: 0 0 18px;
    width: 18px;
    font-size: var(--font-size-md);
  }

  &__label {
    .text-ellipsis();
    flex: 1;
  }

  &__arrow {
    font-size: var(--font-size-lg);
    line-height: 1;
    // transform: rotate(90deg);
    width: 12px;
    height: 12px;
    display: flex;
    transition: transform var(--transition-fast) var(--ease-in-out);
    transform-origin: center;
  }
  .rotate-180 {
    transform: rotate(-180deg);
  }

  &__children {
    display: none;
    padding: 0;
    list-style: none;
  }

  &.is-open > &__children {
    display: block;
  }

  :deep(.dm-popover) {
    display: block;
    width: 100%;
  }

  &__children--popover {
    display: block;
    min-width: 180px;
  }

  &__popover-title {
    padding: var(--spacing-xs) var(--spacing-sm);
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    white-space: nowrap;
  }

  &__children &__trigger {
    padding-left: var(--spacing-xl);
  }

  &.is-collapsed > &__trigger {
    justify-content: center;
    padding: 0;
  }

  &.is-collapsed > &__trigger &__label {
    display: none;
  }
}
</style>
