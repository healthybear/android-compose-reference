<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { allComponents } from '@/data/components'
import CodeBlock from '@/components/CodeBlock.vue'
import ParamsTable from '@/components/ParamsTable.vue'
import WasmDemo from '@/components/WasmDemo.vue'
import { useRelatedComponents } from '@/composables/useRelatedComponents'
import { ArrowRight, Loading } from '@element-plus/icons-vue'

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

// demoId 到文件名的特殊映射（不符合通用规则的）
const DEMO_FILE_OVERRIDES: Record<string, string> = {
  'floating-action-button': 'FabDemo.kt',
  'modifier-draggable': 'DraggableDemo.kt',
  'modifier-transformable': 'TransformableDemo.kt',
}

function demoIdToFilename(id: string): string {
  if (DEMO_FILE_OVERRIDES[id]) return DEMO_FILE_OVERRIDES[id]
  return id.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('') + 'Demo.kt'
}

const route = useRoute()
const router = useRouter()

const currentIndex = computed(() =>
  allComponents.findIndex(c => c.id === route.params.id)
)
const component = computed(() =>
  currentIndex.value >= 0 ? allComponents[currentIndex.value] : undefined
)
const prevComp = computed(() =>
  currentIndex.value > 0 ? allComponents[currentIndex.value - 1] : null
)
const nextComp = computed(() =>
  currentIndex.value < allComponents.length - 1 ? allComponents[currentIndex.value + 1] : null
)

const hasDemo = computed(() => !!component.value && DEMO_IDS.has(component.value.id))

// 预览源码
const sourceExpanded = ref(false)
const sourceCode = ref('')
const sourceLoading = ref(false)

watch([hasDemo, component], async ([demo, comp]) => {
  sourceExpanded.value = false
  sourceCode.value = ''
  if (!demo || !comp) return
}, { immediate: true })

async function loadSource() {
  if (sourceCode.value || !component.value) return
  sourceLoading.value = true
  try {
    const filename = demoIdToFilename(component.value.id)
    const res = await fetch(`/demo-sources/${filename}`)
    sourceCode.value = res.ok ? await res.text() : '// 源码加载失败'
  } catch {
    sourceCode.value = '// 源码加载失败'
  } finally {
    sourceLoading.value = false
  }
}

function toggleSource() {
  sourceExpanded.value = !sourceExpanded.value
  if (sourceExpanded.value) loadSource()
}

const relatedComponents = useRelatedComponents(() => component.value)
</script>

<template>
  <div v-if="component" class="max-w-[860px]">
    <!-- 页头 -->
    <div class="mb-2">
      <h1 class="text-[28px] font-bold mt-3 mb-2 text-el-text">{{ component.name }}</h1>
      <p class="text-[15px] text-el-text-secondary m-0 mb-3 leading-relaxed">{{ component.description }}</p>
      <el-space wrap>
        <el-tag type="info" size="small">{{ component.category }}</el-tag>
        <el-tag v-for="tag in component.tags.slice(0, 4)" :key="tag" size="small">{{ tag }}</el-tag>
      </el-space>
    </div>

    <el-divider />

    <!-- 交互预览 -->
    <template v-if="hasDemo">
      <h2 class="text-lg font-semibold m-0 mb-3 text-el-text">效果预览</h2>
      <WasmDemo :demo-id="component.id" />
      <div
        class="flex items-center gap-1.5 text-[13px] text-el-text-secondary cursor-pointer select-none mb-3 hover:text-el-text transition-colors"
        @click="toggleSource"
      >
        <el-icon :class="sourceExpanded ? 'rotate-90' : ''" class="transition-transform">
          <ArrowRight />
        </el-icon>
        <span>{{ sourceExpanded ? '收起' : '查看' }}预览源码</span>
        <el-icon v-if="sourceLoading"><Loading /></el-icon>
      </div>
      <div v-if="sourceExpanded" class="mb-4">
        <CodeBlock v-if="sourceCode" :code="sourceCode" lang="kotlin" />
      </div>
      <el-divider />
    </template>

    <!-- 参数说明 -->
    <template v-if="component.params.length > 0">
      <h2 class="text-lg font-semibold m-0 mb-3 text-el-text">参数</h2>
      <ParamsTable :params="component.params" />
      <el-divider />
    </template>

    <!-- 代码示例 -->
    <h2 class="text-lg font-semibold m-0 mb-3 text-el-text">代码示例</h2>
    <div v-for="(example, i) in component.examples" :key="i" class="mb-6">
      <h3 class="text-[15px] font-semibold m-0 mb-1 text-el-text-regular">{{ example.title }}</h3>
      <p v-if="example.description" class="text-[13px] text-el-text-secondary m-0 mb-2">{{ example.description }}</p>
      <CodeBlock :code="example.code" />
    </div>

    <!-- 相关组件 -->
    <template v-if="relatedComponents.length > 0">
      <el-divider />
      <h2 class="text-lg font-semibold m-0 mb-4 text-el-text">相关组件</h2>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 mb-6">
        <el-card
          v-for="rel in relatedComponents"
          :key="rel.id"
          class="cursor-pointer transition-transform hover:-translate-y-0.5"
          shadow="hover"
          @click="router.push(`/component/${rel.id}`)"
        >
          <div class="text-sm font-semibold mb-1 text-el-text">{{ rel.name }}</div>
          <div class="text-[12px] text-el-text-secondary leading-relaxed line-clamp-2">{{ rel.description }}</div>
          <el-tag size="small" type="info" class="mt-2">{{ rel.category }}</el-tag>
        </el-card>
      </div>
    </template>

    <!-- 上一个 / 下一个 -->
    <el-divider />
    <div class="flex justify-between pb-8">
      <el-button v-if="prevComp" @click="router.push(`/component/${prevComp.id}`)">
        ← {{ prevComp.name }}
      </el-button>
      <span v-else />
      <el-button v-if="nextComp" type="primary" @click="router.push(`/component/${nextComp.id}`)">
        {{ nextComp.name }} →
      </el-button>
    </div>
  </div>

  <el-empty v-else description="组件不存在" />
</template>
