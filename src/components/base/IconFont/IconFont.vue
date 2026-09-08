<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    size?: string | number
    spin?: boolean
  }>(),
  {
    size: undefined,
    spin: false,
  },
)

const classes = computed(() => ['iconfont', `Dm-${props.name}`, { 'is-spin': props.spin }])
const style = computed(() => (props.size ? { fontSize: toSize(props.size) } : undefined))

function toSize(size: string | number): string {
  return typeof size === 'number' ? `${size}px` : size
}
</script>

<template>
  <i :class="classes" :style="style" aria-hidden="true" />
</template>
