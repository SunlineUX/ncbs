<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseCard from '@/components/base/BaseCard/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput/BaseInput.vue'

const { t } = useI18n()

interface UserRecord {
  id: number
  name: string
  email: string
  role: string
}

const users = ref<UserRecord[]>([
  { id: 1, name: 'Alice', email: 'alice@ncbs.dev', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@ncbs.dev', role: 'Editor' },
  { id: 3, name: 'Charlie', email: 'charlie@ncbs.dev', role: 'Viewer' },
])

const keyword = ref('')

const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase()
  if (!k) return users.value
  return users.value.filter(
    (u) => u.name.toLowerCase().includes(k) || u.email.toLowerCase().includes(k),
  )
})
</script>

<template>
  <div class="user-view">
    <h2 class="user-view__title">{{ t('menu.system.user') }}</h2>
    <BaseCard>
      <div class="user-view__toolbar">
        <BaseInput
          v-model="keyword"
          :placeholder="t('common.search')"
          clearable
          style="max-width: 240px"
        />
        <BaseButton variant="primary" size="md">{{ t('common.save') }}</BaseButton>
      </div>
      <table class="user-view__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>{{ t('common.name', 'Name') }}</th>
            <th>Email</th>
            <th>Role</th>
            <th>{{ t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in filtered" :key="u.id">
            <td>{{ u.id }}</td>
            <td>{{ u.name }}</td>
            <td>{{ u.email }}</td>
            <td>{{ u.role }}</td>
            <td>
              <BaseButton size="sm" variant="text">{{ t('common.edit', 'Edit') }}</BaseButton>
              <BaseButton size="sm" variant="text">{{ t('common.delete', 'Delete') }}</BaseButton>
            </td>
          </tr>
          <tr v-if="filtered.length === 0">
            <td colspan="5" class="user-view__empty">{{ t('common.noData') }}</td>
          </tr>
        </tbody>
      </table>
    </BaseCard>
  </div>
</template>

<style lang="less" scoped>
.user-view {
  &__title {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-lg);
  }

  &__toolbar {
    .flex-between();
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-sm);

    th,
    td {
      padding: var(--spacing-sm) var(--spacing-md);
      text-align: left;
      border-bottom: 1px solid var(--color-border-light);
    }

    th {
      color: var(--color-text-muted);
      font-weight: var(--font-weight-medium);
      background-color: var(--color-bg-soft);
    }

    td {
      color: var(--color-text-base);
    }

    tbody tr:hover {
      background-color: var(--color-sidebar-item-hover);
    }
  }

  &__empty {
    text-align: center;
    color: var(--color-text-muted);
    padding: var(--spacing-lg) 0 !important;
  }
}
</style>
