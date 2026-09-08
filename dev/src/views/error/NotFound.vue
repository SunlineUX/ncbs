<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/base/BaseButton/BaseButton.vue'

const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <div class="not-found">
    <div class="not-found__code">404</div>
    <p class="not-found__text">{{ t('common.noData', 'Page not found') }}</p>
    <BaseButton variant="primary" @click="router.push('/')">
      {{ t('common.back') }}
    </BaseButton>
  </div>
</template>

<style lang="less" scoped>
.not-found {
  .flex-center();
  flex-direction: column;
  gap: @spacing-md;
  min-height: 100vh;
  padding: @spacing-xl;

  &__code {
    font-size: 80px;
    font-weight: @font-weight-bold;
    color: var(--color-primary);
    line-height: 1;
  }

  &__text {
    color: var(--color-text-muted);
    font-size: @font-size-md;
  }
}
</style>
