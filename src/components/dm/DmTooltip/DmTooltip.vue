<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    placement?: 'right' | 'bottom'
    offset?: number
  }>(),
  {
    placement: 'right',
    offset: 8,
  },
)

const open = ref(false)
const triggerElement = ref<HTMLElement | null>(null)
const contentStyle = ref<Record<string, string>>({})
let closeTimer: ReturnType<typeof setTimeout> | undefined

function clearCloseTimer() {
  if (closeTimer) clearTimeout(closeTimer)
}

function show() {
  clearCloseTimer()
  open.value = true
  nextTick(updatePosition)
}

function hide() {
  clearCloseTimer()
  closeTimer = setTimeout(() => {
    open.value = false
  }, 80)
}

function updatePosition() {
  if (!triggerElement.value) return
  const rect = triggerElement.value.getBoundingClientRect()
  const position =
    props.placement === 'bottom'
      ? { top: rect.bottom + props.offset, left: rect.left }
      : { top: rect.top + rect.height / 2, left: rect.right + props.offset }

  contentStyle.value = {
    top: `${position.top}px`,
    left: `${position.left}px`,
    transform: props.placement === 'right' ? 'translateY(-50%)' : 'none',
  }
}

onBeforeUnmount(clearCloseTimer)
</script>

<template>
  <span class="dm-tooltip" @mouseenter="show" @mouseleave="hide">
    <span ref="triggerElement" class="dm-tooltip__trigger">
      <slot name="trigger" />
    </span>
    <Teleport to="body">
      <span v-if="open" class="dm-tooltip__content" :style="contentStyle">
        <slot />
      </span>
    </Teleport>
  </span>
</template>

<style lang="less" scoped>
.dm-tooltip {
    display: inline-block;
    width: 100%;

  &__trigger {
    display: inline-block;
    width: 100%;
  }

  &__content {
    position: fixed;
    z-index: @z-dropdown;
    max-width: 240px;
    padding: @spacing-xs @spacing-sm;
    color: var(--color-text-inverse);
    background-color: var(--color-bg-inverse);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-md);
    font-size: @font-size-sm;
    line-height: 1.4;
    white-space: nowrap;
    pointer-events: none;
  }
}
</style>