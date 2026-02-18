<script setup lang="ts">
import { useSearch } from '@/composables/useSearch'
import { categories } from '@/data/components'
import { useRouter } from 'vue-router'

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
</script>

<template>
  <div class="home-page">
    <div class="home-hero">
      <h1>Jetpack Compose 速查</h1>
      <p>快速查阅 Compose 组件用法、参数说明与交互示例</p>
      <el-input
        v-model="query"
        placeholder="搜索组件名称、分类或关键词..."
        size="large"
        clearable
        class="hero-search"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <template v-for="cat in categories" :key="cat">
      <div
        v-if="results.some(c => c.category === cat)"
        class="category-section"
      >
        <h2 class="category-title">
          <el-tag :type="(categoryColors[cat] as any) || 'primary'" size="large">{{ cat }}</el-tag>
        </h2>
        <div class="component-grid">
          <el-card
            v-for="comp in results.filter(c => c.category === cat)"
            :key="comp.id"
            class="component-card"
            shadow="hover"
            @click="router.push(`/component/${comp.id}`)"
          >
            <div class="card-name">{{ comp.name }}</div>
            <div class="card-desc">{{ comp.description }}</div>
            <div class="card-footer">
              <el-tag v-if="comp.demoId" size="small" type="success">可预览</el-tag>
              <span class="card-params">{{ comp.params.length }} 个参数</span>
            </div>
          </el-card>
        </div>
      </div>
    </template>

    <el-empty v-if="results.length === 0" description="未找到匹配的组件" />
  </div>
</template>

<style scoped>
.home-page {
  max-width: 1100px;
}

.home-hero {
  margin-bottom: 40px;
}

.home-hero h1 {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px;
  color: var(--el-text-color-primary);
}

.home-hero p {
  color: var(--el-text-color-secondary);
  margin: 0 0 20px;
  font-size: 15px;
}

.hero-search {
  max-width: 500px;
}

.category-section {
  margin-bottom: 36px;
}

.category-title {
  margin: 0 0 16px;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.component-card {
  cursor: pointer;
  transition: transform 0.15s;
}

.component-card:hover {
  transform: translateY(-2px);
}

.card-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--el-text-color-primary);
}

.card-desc {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-params {
  font-size: 12px;
  color: var(--el-text-color-placeholder);
}
</style>
