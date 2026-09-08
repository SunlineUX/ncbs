<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="blank-layout">
    <RouterView />
  </div>
</template>

<style lang="less" scoped>
.blank-layout {
  width: 100%;
  height: 100%;
  background-color: var(--color-bg);
}
</style>
