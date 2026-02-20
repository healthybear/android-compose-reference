<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { guides } from '@/data/guides'
import { allComponents } from '@/data/components'
import type { ComponentEntry } from '@/data/types'
import CodeBlock from '@/components/CodeBlock.vue'

const route = useRoute()
const router = useRouter()

const guide = computed(() => guides.find(g => g.id === route.params.id))

const currentIndex = computed(() => guides.findIndex(g => g.id === route.params.id))
const prevGuide = computed(() => currentIndex.value > 0 ? guides[currentIndex.value - 1] : null)
const nextGuide = computed(() => currentIndex.value < guides.length - 1 ? guides[currentIndex.value + 1] : null)

const relatedComponents = computed<ComponentEntry[]>(() =>
  (guide.value?.relatedComponents ?? [])
    .map(id => allComponents.find(c => c.id === id))
    .filter((c): c is ComponentEntry => !!c)
)
</script>

<template>
  <div v-if="guide" class="max-w-[860px]">
    <!-- 页头 -->
    <div class="mb-2">
      <div
        class="flex items-center gap-1 mb-3 text-el-text-secondary text-sm cursor-pointer hover:text-el-primary w-fit"
        @click="router.push('/guide')"
      >
        <el-icon><ArrowLeft /></el-icon>
        快速上手
      </div>
      <h1 class="text-[28px] font-bold mt-3 mb-2 text-el-text">{{ guide.title }}</h1>
      <p class="text-[15px] text-el-text-secondary m-0 mb-3 leading-relaxed">{{ guide.description }}</p>
    </div>

    <el-divider />

    <!-- 步骤列表 -->
    <div v-for="(step, index) in guide.steps" :key="index" class="mb-8">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-7 h-7 rounded-full bg-el-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {{ index + 1 }}
        </div>
        <h2 class="text-lg font-semibold m-0 text-el-text">{{ step.title }}</h2>
      </div>
      <p class="text-[14px] text-el-text-regular leading-relaxed m-0 mb-3 ml-10">{{ step.content }}</p>
      <div class="ml-10">
        <CodeBlock v-if="step.code" :code="step.code" />
        <!-- iframe 预览 -->
        <div v-if="step.previewUrl" class="mt-3 border border-el-border rounded-lg overflow-hidden">
          <div class="flex items-center justify-between px-3 py-1.5 bg-el-fill-light border-b border-el-border">
            <span class="text-xs text-el-text-secondary">预览</span>
            <a :href="step.previewUrl" target="_blank" class="text-xs text-el-primary no-underline hover:underline">
              在新窗口打开 ↗
            </a>
          </div>
          <iframe
            :src="step.previewUrl"
            class="w-full border-none"
            style="height: 360px;"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
        <el-alert
          v-if="step.tip"
          :title="step.tip"
          type="info"
          :closable="false"
          show-icon
          class="mt-2"
        />
      </div>
    </div>

    <!-- 相关组件 -->
    <template v-if="relatedComponents.length > 0">
      <el-divider />
      <h2 class="text-lg font-semibold m-0 mb-4 text-el-text">相关组件</h2>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3 mb-6">
        <el-card
          v-for="comp in relatedComponents"
          :key="comp.id"
          class="cursor-pointer transition-transform hover:-translate-y-0.5"
          shadow="hover"
          @click="router.push(`/component/${comp.id}`)"
        >
          <div class="text-sm font-semibold mb-1 text-el-text">{{ comp.name }}</div>
          <div class="text-[12px] text-el-text-secondary line-clamp-2">{{ comp.description }}</div>
        </el-card>
      </div>
    </template>

    <!-- 上一篇 / 下一篇 -->
    <el-divider />
    <div class="flex justify-between pb-8">
      <el-button v-if="prevGuide" @click="router.push(`/guide/${prevGuide.id}`)">
        <el-icon><ArrowLeft /></el-icon>
        {{ prevGuide.title }}
      </el-button>
      <span v-else />
      <el-button v-if="nextGuide" type="primary" @click="router.push(`/guide/${nextGuide.id}`)">
        {{ nextGuide.title }}
        <el-icon><ArrowRight /></el-icon>
      </el-button>
    </div>
  </div>

  <el-empty v-else description="指南不存在" />
</template>
