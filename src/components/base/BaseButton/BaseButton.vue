<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'text'
type ButtonSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    disabled?: boolean
    block?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'default',
    size: 'md',
    disabled: false,
    block: false,
    type: 'button',
  },
)

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const classes = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  { 'is-block': props.block, 'is-disabled': props.disabled },
])
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled"
    @click="(e: MouseEvent) => !disabled && $emit('click', e)"
  >
    <slot />
  </button>
</template>

<style lang="less" scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-strong);
  background-color: var(--color-bg-elevated);
  color: var(--color-text);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  white-space: nowrap;
  user-select: none;
  transition: all var(--transition-fast) var(--ease-in-out);

  &:not(.is-disabled) {
    cursor: pointer;
    &:hover {
      opacity: 0.85;
    }
    &:active {
      transform: translateY(1px);
    }
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &.is-block {
    width: 100%;
    display: flex;
  }

  // 尺寸
  &--sm {
    height: 28px;
    padding: 0 var(--spacing-sm);
    font-size: var(--font-size-xs);
  }
  &--md {
    height: 32px;
    padding: 0 var(--spacing-md);
  }
  &--lg {
    height: 40px;
    padding: 0 var(--spacing-lg);
    font-size: var(--font-size-md);
  }

  // 变体
  &--default {
    background-color: var(--color-bg-elevated);
    border-color: var(--color-border-strong);
    color: var(--color-text);
  }
  &--primary {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-primary-inverse);
  }
  &--success {
    background-color: var(--color-success);
    border-color: var(--color-success);
    color: #fff;
  }
  &--warning {
    background-color: var(--color-warning);
    border-color: var(--color-warning);
    color: #fff;
  }
  &--error {
    background-color: var(--color-error);
    border-color: var(--color-error);
    color: #fff;
  }
  &--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--color-text-base);
    &:not(.is-disabled):hover {
      color: var(--color-primary);
      background-color: var(--color-primary-light);
      opacity: 1;
    }
  }
}
</style>
