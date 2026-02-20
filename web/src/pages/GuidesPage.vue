<script setup lang="ts">
import { useRouter } from 'vue-router'
import { guides } from '@/data/guides'

const router = useRouter()

const difficultyMap = {
  beginner: { label: '入门', type: 'success' },
  intermediate: { label: '进阶', type: 'warning' },
  advanced: { label: '高级', type: 'danger' },
} as const
</script>

<template>
  <div class="max-w-[860px]">
    <h1 class="text-[28px] font-bold mt-3 mb-2 text-el-text">快速上手</h1>
    <p class="text-[15px] text-el-text-secondary m-0 mb-6 leading-relaxed">
      从零开始学习 Jetpack Compose，掌握核心概念与实践技巧。
    </p>
    <div class="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
      <el-card
        v-for="guide in guides"
        :key="guide.id"
        class="cursor-pointer transition-transform hover:-translate-y-0.5"
        shadow="hover"
        @click="router.push(`/guide/${guide.id}`)"
      >
        <div class="flex items-center gap-2 mb-2">
          <el-icon size="20" class="text-el-text-secondary">
            <component :is="guide.icon" />
          </el-icon>
          <span class="text-base font-semibold text-el-text">{{ guide.title }}</span>
        </div>
        <p class="text-[13px] text-el-text-secondary leading-relaxed m-0 mb-3 line-clamp-2">
          {{ guide.description }}
        </p>
        <div class="flex items-center justify-between">
          <el-tag :type="difficultyMap[guide.difficulty].type" size="small">
            {{ difficultyMap[guide.difficulty].label }}
          </el-tag>
          <span class="text-xs text-el-text-placeholder">{{ guide.steps.length }} 个步骤</span>
        </div>
      </el-card>
    </div>
  </div>
</template>
