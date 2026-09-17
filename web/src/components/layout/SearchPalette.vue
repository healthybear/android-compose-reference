<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import type { ComponentEntry } from '@/data/types'

const props = defineProps<{ query: string; results: ComponentEntry[]; isMobile: boolean; visible: boolean }>()

const emit = defineEmits<{
  'update:query': [value: string]
  'update:visible': [value: boolean]
  select: [id: string]
  focus: []
}>()

const activeIndex = shallowRef(-1)
const activeItemId = computed(() => props.results[activeIndex.value]?.id)

watch(() => [props.query, props.visible], () => {
  activeIndex.value = -1
})

function moveActiveItem(offset: number) {
  if (props.results.length === 0) return
  activeIndex.value = (activeIndex.value + offset + props.results.length) % props.results.length
}

function selectActiveItem() {
  const item = props.results[activeIndex.value] ?? props.results[0]
  if (item) emit('select', item.id)
}

function handleKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      moveActiveItem(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      moveActiveItem(-1)
      break
    case 'Enter':
      if (!props.query) return
      event.preventDefault()
      selectActiveItem()
      break
    case 'Escape':
      emit('update:visible', false)
      break
  }
}
</script>

<template>
  <el-popover :visible="visible" placement="bottom" :width="isMobile ? 300 : 480" trigger="click" popper-class="search-popover" @update:visible="emit('update:visible', $event)">
    <template #reference>
      <el-input
        :model-value="query"
        placeholder="搜索组件…"
        :prefix-icon="Search"
        aria-label="搜索组件"
        role="combobox"
        aria-controls="search-results"
        :aria-expanded="visible"
        :aria-activedescendant="activeItemId ? `search-result-${activeItemId}` : undefined"
        name="component-search"
        autocomplete="off"
        clearable
        class="w-full"
        @update:model-value="emit('update:query', $event)"
        @focus="emit('focus')"
        @keydown="handleKeydown"
      />
    </template>
    <el-empty v-if="query && results.length === 0" description="未找到匹配的组件" :image-size="60" />
    <el-scrollbar v-else-if="query" max-height="360px" id="search-results" role="listbox" aria-label="组件搜索结果">
      <button
        v-for="(item, index) in results"
        :key="item.id"
        :id="`search-result-${item.id}`"
        type="button"
        role="option"
        :aria-selected="activeItemId === item.id"
        :class="[
          'flex w-full items-center gap-2 px-3 py-[10px] cursor-pointer rounded-md border-0 text-left transition-colors hover:bg-el-fill-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-el-color-primary',
          activeItemId === item.id ? 'bg-el-fill-light' : 'bg-transparent',
        ]"
        @mouseenter="activeIndex = index"
        @click="emit('select', item.id)"
      >
        <span class="font-semibold min-w-[80px]">{{ item.name }}</span>
        <el-tag size="small" type="info" class="hidden sm:inline-flex">{{ item.category }}</el-tag>
        <span class="min-w-0 text-el-text-secondary text-[13px] overflow-hidden text-ellipsis whitespace-nowrap">{{ item.description }}</span>
      </button>
    </el-scrollbar>
  </el-popover>
</template>
