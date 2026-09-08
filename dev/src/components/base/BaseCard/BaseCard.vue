<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    shadow?: 'sm' | 'md' | 'lg' | 'none'
    bodyPadding?: boolean
  }>(),
  {
    title: '',
    shadow: 'md',
    bodyPadding: true,
  },
)
</script>

<template>
  <div class="base-card" :class="[`base-card--shadow-${shadow}`]">
    <div v-if="title || $slots.header" class="base-card__header">
      <slot name="header">
        <span class="base-card__title">{{ title }}</span>
      </slot>
    </div>
    <div class="base-card__body" :class="{ 'is-padding': bodyPadding }">
      <slot />
    </div>
    <div v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.base-card {
  background-color: var(--color-bg-elevated);
  border-radius: @radius-lg;
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: box-shadow @transition-base @ease-in-out;

  &--shadow-sm {
    box-shadow: var(--shadow-sm);
  }
  &--shadow-md {
    box-shadow: var(--shadow-md);
  }
  &--shadow-lg {
    box-shadow: var(--shadow-lg);
  }
  &--shadow-none {
    box-shadow: none;
  }

  &__header {
    .flex-between();
    padding: @spacing-md @spacing-lg;
    border-bottom: 1px solid var(--color-border-light);
  }

  &__title {
    font-size: @font-size-md;
    font-weight: @font-weight-semibold;
    color: var(--color-text);
  }

  &__body {
    &.is-padding {
      padding: @spacing-md @spacing-lg;
    }
  }

  &__footer {
    padding: @spacing-sm @spacing-lg;
    border-top: 1px solid var(--color-border-light);
  }
}
</style>
