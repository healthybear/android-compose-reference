<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import type { ComponentEntry } from '@/data/types'

defineProps<{ query: string; results: ComponentEntry[]; isMobile: boolean; visible: boolean }>()

const emit = defineEmits<{
  'update:query': [value: string]
  'update:visible': [value: boolean]
  select: [id: string]
  focus: []
}>()
</script>

<template>
  <el-popover :visible="visible" placement="bottom" :width="isMobile ? 300 : 480" trigger="click" popper-class="search-popover" @update:visible="emit('update:visible', $event)">
    <template #reference>
      <el-input :model-value="query" placeholder="搜索组件..." :prefix-icon="Search" clearable class="w-full" @update:model-value="emit('update:query', $event)" @focus="emit('focus')" />
    </template>
    <el-empty v-if="query && results.length === 0" description="未找到匹配的组件" :image-size="60" />
    <el-scrollbar v-else-if="query" max-height="360px">
      <div v-for="item in results" :key="item.id" class="flex items-center gap-2 px-3 py-[10px] cursor-pointer rounded-md transition-colors hover:bg-el-fill-light" @click="emit('select', item.id)">
        <span class="font-semibold min-w-[80px]">{{ item.name }}</span>
        <el-tag size="small" type="info" class="hidden sm:inline-flex">{{ item.category }}</el-tag>
        <span class="text-el-text-secondary text-[13px] overflow-hidden text-ellipsis whitespace-nowrap">{{ item.description }}</span>
      </div>
    </el-scrollbar>
  </el-popover>
</template>
