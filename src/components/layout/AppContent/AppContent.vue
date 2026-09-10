<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="app-content">
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade-slide" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </Transition>
    </RouterView>
  </main>
</template>

<style lang="less" scoped>
.app-content {
  flex: 1;
  overflow: auto;
  padding: var(--layout-content-padding, var(--layout-content-padding));
  background-color: var(--color-bg);
  .scrollbar-themed();
}
</style>
