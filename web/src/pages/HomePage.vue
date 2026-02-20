<script setup lang="ts">
import { useSearch } from '@/composables/useSearch'
import { categories } from '@/data/components'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

const { query, results } = useSearch()
const router = useRouter()

const categoryColors: Record<string, string> = {
  Layout: 'primary',
  Material: 'success',
  Foundation: 'warning',
  Animation: 'danger',
  Text: 'info',
  Gestures: '',
  State: '',
}

const DEMO_IDS = new Set([
  'button', 'text', 'image', 'icon', 'canvas',
  'column', 'row', 'box', 'box-with-constraints', 'spacer', 'flow-row', 'flow-column',
  'lazy-column', 'lazy-row', 'lazy-vertical-grid', 'lazy-horizontal-grid',
  'horizontal-pager', 'vertical-pager',
  'modifier-size', 'modifier-padding', 'modifier-background', 'modifier-clickable',
  'modifier-offset', 'modifier-scroll',
  'material-theme', 'color-scheme', 'typography', 'shapes',
  'outlined-button', 'text-button', 'filled-tonal-button', 'elevated-button',
  'icon-button', 'floating-action-button', 'extended-fab',
  'assist-chip', 'filter-chip', 'input-chip', 'suggestion-chip',
  'card', 'elevated-card', 'outlined-card',
  'badge', 'list-item', 'horizontal-divider',
  'dropdown-menu', 'exposed-dropdown-menu',
  'text-field', 'outlined-text-field',
  'checkbox', 'radio-button', 'switch', 'slider', 'range-slider',
  'alert-dialog', 'basic-alert-dialog', 'snackbar',
  'circular-progress', 'linear-progress', 'swipe-to-dismiss',
  'top-app-bar', 'bottom-app-bar', 'navigation-drawer', 'permanent-navigation-drawer',
  'animated-visibility', 'animated-content', 'crossfade', 'animate-as-state',
  'update-transition', 'infinite-transition',
  'modifier-draggable', 'modifier-transformable',
  'detect-tap-gestures', 'detect-drag-gestures',
  'remember', 'derived-state-of', 'launched-effect', 'side-effect',
  'disposable-effect', 'produce-state', 'composition-local',
  'custom-layout', 'subcompose-layout', 'draw-modifier', 'brush',
])
</script>

<template>
  <div class="max-w-[1100px]">
    <div class="mb-10">
      <h1 class="text-3xl font-bold m-0 mb-2 text-el-text">Jetpack Compose 速查</h1>
      <p class="text-el-text-secondary m-0 mb-5 text-[15px]">快速查阅 Compose 组件用法、参数说明与交互示例</p>
      <el-input
        v-model="query"
        placeholder="搜索组件名称、分类或关键词..."
        size="large"
        clearable
        class="max-w-[500px]"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <template v-for="cat in categories" :key="cat">
      <div v-if="results.some(c => c.category === cat)" class="mb-9">
        <div class="mb-4">
          <el-tag :type="(categoryColors[cat] as any) || 'primary'" size="large">{{ cat }}</el-tag>
        </div>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
          <el-card
            v-for="comp in results.filter(c => c.category === cat)"
            :key="comp.id"
            class="cursor-pointer transition-transform hover:-translate-y-0.5"
            shadow="hover"
            @click="router.push(`/component/${comp.id}`)"
          >
            <div class="text-base font-semibold mb-1.5 text-el-text">{{ comp.name }}</div>
            <div class="text-[13px] text-el-text-secondary leading-relaxed mb-3 line-clamp-2">{{ comp.description }}</div>
            <div class="flex items-center justify-between">
              <el-tag v-if="DEMO_IDS.has(comp.id)" size="small" type="success">可预览</el-tag>
              <span v-else />
              <span class="text-xs text-el-text-placeholder">{{ comp.params.length }} 个参数</span>
            </div>
          </el-card>
        </div>
      </div>
    </template>

    <el-empty v-if="results.length === 0" description="未找到匹配的组件" />
  </div>
</template>
