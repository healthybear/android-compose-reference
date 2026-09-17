<script setup lang="ts">
/**
 * 组件详情页
 *
 * 功能：
 * 1. 展示 Compose 组件的详细文档（参数、示例、描述）
 * 2. 提供 WASM 交互预览（支持的组件）
 * 3. 按需加载预览源码（从 /demo-sources/ 获取）
 * 4. 推荐相关组件（基于标签和分类相似度）
 * 5. 支持上一个/下一个组件导航
 */
import { computed, shallowRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { allComponents } from '@/data/components'
import CodeBlock from '@/components/CodeBlock.vue'
import ParamsTable from '@/components/ParamsTable.vue'
import WasmDemo from '@/components/WasmDemo.vue'
import { useRelatedComponents } from '@/composables/useRelatedComponents'
import { ArrowRight, Loading } from '@element-plus/icons-vue'

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

const demo = computed(() => component.value?.demo)

// 预览源码
const sourceExpanded = shallowRef(false)
const sourceCode = shallowRef('')
const sourceLoading = shallowRef(false)

// 监听组件切换，重置源码展示状态
// 原因：避免切换组件时显示上一个组件的源码
watch(() => component.value?.id, () => {
  sourceExpanded.value = false  // 收起源码面板
  sourceCode.value = ''         // 清空已加载的源码
}, { immediate: true })

// 异步加载 demo 源码
async function loadSource() {
  if (sourceCode.value || !demo.value) return
  sourceLoading.value = true
  try {
    const res = await fetch(`/demo-sources/${demo.value.sourceFile}`)
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
    <template v-if="demo">
      <h2 class="text-lg font-semibold m-0 mb-3 text-el-text">效果预览</h2>
      <WasmDemo :demo-id="demo.id" />
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
    <div v-for="(example, i) in component.examples" :key="`${component.id}-${i}`" class="mb-6">
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
