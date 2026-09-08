<script setup lang="ts">
import { computed } from 'vue'

type InputSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    size?: InputSize
    disabled?: boolean
    readonly?: boolean
    type?: string
    clearable?: boolean
  }>(),
  {
    modelValue: '',
    placeholder: '',
    size: 'md',
    disabled: false,
    readonly: false,
    type: 'text',
    clearable: false,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
  (e: 'clear'): void
}>()

const inputClasses = computed(() => [
  'base-input',
  `base-input--${props.size}`,
  {
    'is-disabled': props.disabled,
    'is-readonly': props.readonly,
  },
])

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', e)
}

function onClear() {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <div class="base-input-wrapper">
    <input
      :class="inputClasses"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="onInput"
    />
    <span
      v-if="clearable && modelValue && !disabled && !readonly"
      class="base-input__clear"
      @click="onClear"
    >
      ×
    </span>
  </div>
</template>

<style lang="less" scoped>
.base-input-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.base-input {
  width: 100%;
  padding: 0 @spacing-md;
  border: 1px solid var(--color-border-strong);
  border-radius: @radius-md;
  background-color: var(--color-bg-elevated);
  color: var(--color-text);
  font-size: @font-size-base;
  line-height: 1;
  outline: none;
  transition:
    border-color @transition-fast @ease-in-out,
    box-shadow @transition-fast @ease-in-out;

  &::placeholder {
    color: var(--color-text-placeholder);
  }

  &:hover:not(.is-disabled):not(.is-readonly) {
    border-color: var(--color-primary);
  }

  &:focus:not(.is-disabled) {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-focus);
  }

  &.is-disabled,
  &.is-readonly {
    cursor: not-allowed;
    background-color: var(--color-bg-soft);
    opacity: 0.7;
  }

  &--sm {
    height: 28px;
    font-size: @font-size-xs;
    border-radius: @radius-sm;
  }
  &--md {
    height: 32px;
    border-radius: @radius-md;
  }
  &--lg {
    height: 40px;
    font-size: @font-size-md;
    border-radius: @radius-lg;
  }
}

.base-input__clear {
  position: absolute;
  right: @spacing-sm;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--color-text-muted);
  font-size: @font-size-md;
  user-select: none;
  &:hover {
    color: var(--color-text);
  }
}
</style>
