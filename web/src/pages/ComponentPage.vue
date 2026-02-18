<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { allComponents } from '@/data/components'
import CodeBlock from '@/components/CodeBlock.vue'
import ParamsTable from '@/components/ParamsTable.vue'
import WasmDemo from '@/components/WasmDemo.vue'

const route = useRoute()
const router = useRouter()

const component = computed(() =>
  allComponents.find(c => c.id === route.params.id)
)

// 上一个 / 下一个导航
const currentIndex = computed(() =>
  allComponents.findIndex(c => c.id === route.params.id)
)
const prevComp = computed(() =>
  currentIndex.value > 0 ? allComponents[currentIndex.value - 1] : null
)
const nextComp = computed(() =>
  currentIndex.value < allComponents.length - 1 ? allComponents[currentIndex.value + 1] : null
)
</script>

<template>
  <div v-if="component" class="component-page">
    <!-- 页头 -->
    <div class="page-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ component.category }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ component.name }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h1 class="comp-title">{{ component.name }}</h1>
      <p class="comp-desc">{{ component.description }}</p>
      <div class="comp-tags">
        <el-tag type="info" size="small">{{ component.category }}</el-tag>
        <el-tag
          v-for="tag in component.tags.slice(0, 4)"
          :key="tag"
          size="small"
          style="margin-left: 6px"
        >{{ tag }}</el-tag>
      </div>
    </div>

    <el-divider />

    <!-- 交互预览（如果有 Wasm Demo） -->
    <template v-if="component.demoId">
      <h2 class="section-title">效果预览</h2>
      <WasmDemo :demo-id="component.demoId" />
      <el-divider />
    </template>

    <!-- 参数说明 -->
    <template v-if="component.params.length > 0">
      <h2 class="section-title">参数</h2>
      <ParamsTable :params="component.params" />
      <el-divider />
    </template>

    <!-- 代码示例 -->
    <h2 class="section-title">代码示例</h2>
    <div
      v-for="(example, i) in component.examples"
      :key="i"
      class="example-block"
    >
      <h3 class="example-title">{{ example.title }}</h3>
      <p v-if="example.description" class="example-desc">{{ example.description }}</p>
      <CodeBlock :code="example.code" />
    </div>

    <!-- 上一个 / 下一个 -->
    <el-divider />
    <div class="page-nav">
      <el-button
        v-if="prevComp"
        @click="router.push(`/component/${prevComp.id}`)"
      >
        ← {{ prevComp.name }}
      </el-button>
      <span v-else />
      <el-button
        v-if="nextComp"
        type="primary"
        @click="router.push(`/component/${nextComp.id}`)"
      >
        {{ nextComp.name }} →
      </el-button>
    </div>
  </div>

  <el-empty v-else description="组件不存在" />
</template>

<style scoped>
.component-page {
  max-width: 860px;
}

.page-header {
  margin-bottom: 8px;
}

.comp-title {
  font-size: 28px;
  font-weight: 700;
  margin: 12px 0 8px;
  color: var(--el-text-color-primary);
}

.comp-desc {
  font-size: 15px;
  color: var(--el-text-color-secondary);
  margin: 0 0 12px;
  line-height: 1.6;
}

.comp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px;
  color: var(--el-text-color-primary);
}

.example-block {
  margin-bottom: 24px;
}

.example-title {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 4px;
  color: var(--el-text-color-regular);
}

.example-desc {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  margin: 0 0 8px;
}

.page-nav {
  display: flex;
  justify-content: space-between;
  padding-bottom: 32px;
}
</style>
