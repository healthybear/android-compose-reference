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
  <div v-if="component" class="max-w-[860px]">
    <!-- 页头 -->
    <div class="mb-2">
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ component.category }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ component.name }}</el-breadcrumb-item>
      </el-breadcrumb> -->
      <h1 class="text-[28px] font-bold mt-3 mb-2 text-el-text">{{ component.name }}</h1>
      <p class="text-[15px] text-el-text-secondary m-0 mb-3 leading-relaxed">{{ component.description }}</p>
      <el-space wrap>
        <el-tag type="info" size="small">{{ component.category }}</el-tag>
        <el-tag v-for="tag in component.tags.slice(0, 4)" :key="tag" size="small">{{ tag }}</el-tag>
      </el-space>
    </div>

    <el-divider />

    <!-- 交互预览 -->
    <template v-if="component.demoId">
      <h2 class="text-lg font-semibold m-0 mb-3 text-el-text">效果预览</h2>
      <WasmDemo :demo-id="component.demoId" />
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
