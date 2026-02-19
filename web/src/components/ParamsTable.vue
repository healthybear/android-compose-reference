<script setup lang="ts">
import type { ComponentParam } from '@/data/types'

defineProps<{
  params: ComponentParam[]
}>()
</script>

<template>
  <el-table :data="params" border stripe class="w-full my-3">
    <el-table-column prop="name" label="参数" width="160">
      <template #default="{ row }">
        <code class="code-tag text-el-primary">{{ row.name }}</code>
        <el-tag v-if="row.required" size="small" type="danger" class="ml-1.5">必填</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类型" width="220">
      <template #default="{ row }">
        <code class="code-tag text-el-success-dark">{{ row.type }}</code>
      </template>
    </el-table-column>
    <el-table-column prop="default" label="默认值" width="160">
      <template #default="{ row }">
        <code v-if="row.default" class="code-tag text-el-text-secondary">{{ row.default }}</code>
        <span v-else class="text-el-text-placeholder">—</span>
      </template>
    </el-table-column>
    <el-table-column prop="description" label="说明" />
  </el-table>
</template>
