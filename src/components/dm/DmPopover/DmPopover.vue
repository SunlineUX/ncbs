<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    placement?: 'right-start' | 'bottom-start'
    trigger?: 'hover' | 'click'
    offset?: number
  }>(),
  {
    placement: 'right-start',
    trigger: 'hover',
    offset: 4,
  },
)

const open = ref(false)
const root = ref<HTMLElement | null>(null)
const triggerElement = ref<HTMLElement | null>(null)
const contentElement = ref<HTMLElement | null>(null)
const contentStyle = ref<Record<string, string>>({})
let closeTimer: ReturnType<typeof setTimeout> | undefined

const classes = computed(() => [`is-${props.placement}`, { 'is-open': open.value }])

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

function toggle() {
  if (open.value) {
    open.value = false
  } else {
    show()
  }
}

function updatePosition() {
  if (!triggerElement.value) return
  const rect = triggerElement.value.getBoundingClientRect()
  const position =
    props.placement === 'bottom-start'
      ? { top: rect.bottom + props.offset, left: rect.left }
      : { top: rect.top, left: rect.right + props.offset }
  contentStyle.value = {
    top: `${position.top}px`,
    left: `${position.left}px`,
  }
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node
  const insideTrigger = root.value?.contains(target)
  const insideContent = contentElement.value?.contains(target)
  if (props.trigger === 'click' && !insideTrigger && !insideContent) {
    open.value = false
  }
}

document.addEventListener('click', handleDocumentClick)
onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  clearCloseTimer()
})
</script>

<template>
  <span
    ref="root"
    class="dm-popover"
    :class="classes"
    @mouseenter="trigger === 'hover' ? show() : undefined"
    @mouseleave="trigger === 'hover' ? hide() : undefined"
  >
    <span
      ref="triggerElement"
      class="dm-popover__trigger"
      @click.stop="trigger === 'click' ? toggle() : undefined"
    >
      <slot name="trigger" />
    </span>
    <Teleport to="body">
      <span
        v-if="open"
        ref="contentElement"
        class="dm-popover__content"
        :style="contentStyle"
        @mouseenter="trigger === 'hover' ? show() : undefined"
        @mouseleave="trigger === 'hover' ? hide() : undefined"
      >
        <slot />
      </span>
    </Teleport>
  </span>
</template>

<style lang="less" scoped>
.dm-popover {
  position: relative;
  display: inline-block;

  &__trigger {
    display: block;
  }

  &__content {
    position: fixed;
    z-index: var(--z-dropdown);
    display: block;
    min-width: 180px;
    padding: var(--spacing-xs) 0;
    background-color: var(--color-bg-elevated);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
  }
}
</style>
