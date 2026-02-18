<script setup lang="ts">
import type { ComponentParam } from '@/data/types'

defineProps<{
  params: ComponentParam[]
}>()
</script>

<template>
  <el-table :data="params" border stripe class="params-table">
    <el-table-column prop="name" label="参数" width="160">
      <template #default="{ row }">
        <code class="param-name">{{ row.name }}</code>
        <el-tag v-if="row.required" size="small" type="danger" style="margin-left: 6px">必填</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类型" width="220">
      <template #default="{ row }">
        <code class="param-type">{{ row.type }}</code>
      </template>
    </el-table-column>
    <el-table-column prop="default" label="默认值" width="160">
      <template #default="{ row }">
        <code v-if="row.default" class="param-default">{{ row.default }}</code>
        <span v-else class="no-default">—</span>
      </template>
    </el-table-column>
    <el-table-column prop="description" label="说明" />
  </el-table>
</template>

<style scoped>
.params-table {
  width: 100%;
  margin: 12px 0;
}

code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 13px;
  background: var(--el-fill-color);
  padding: 2px 6px;
  border-radius: 4px;
}

.param-name {
  color: var(--el-color-primary);
}

.param-type {
  color: var(--el-color-success-dark-2);
}

.param-default {
  color: var(--el-text-color-secondary);
}

.no-default {
  color: var(--el-text-color-placeholder);
}
</style>
