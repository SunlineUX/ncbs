
<template>
    <div class="app-logo__logo">
      <span class="app-logo__logo-text">NCBS</span>
    </div>
</template>
<style lang="less" scoped>
.app-logo {

  &__logo {
    .flex-center();
    height: @layout-header-height;
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
  }

  &__logo-text {
    font-size: @font-size-lg;
    font-weight: @font-weight-bold;
    color: var(--color-primary);
    letter-spacing: 1px;
    white-space: nowrap;
  }
}
</style>