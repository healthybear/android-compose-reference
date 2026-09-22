<script setup lang="ts">
import { useSearch } from '@/composables/useSearch'
import { categories } from '@/data/components'
import { Search } from '@element-plus/icons-vue'

const { query, results } = useSearch()
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

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
}

/* Hero Section */
.hero-section {
  margin-bottom: var(--space-3xl);
  text-align: center;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin: 0 0 var(--space-md) 0;
  color: var(--color-fg-light);
  letter-spacing: -0.02em;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--el-text-color-secondary);
  margin: 0 0 var(--space-2xl) 0;
  line-height: 1.7;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.search-wrapper {
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  font-family: var(--font-body);
}

/* Category Section */
.category-section {
  margin-bottom: var(--space-3xl);
}

.category-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.category-tag {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.02em;
}

.category-count {
  font-size: 0.875rem;
  color: var(--el-text-color-secondary);
  font-weight: 500;
}

/* Component Grid */
.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
  gap: var(--space-lg);
}

.component-card-link {
  display: block;
  text-decoration: none;
  border-radius: var(--radius-lg);
  transition: transform var(--transition-base);
}

.component-card-link:hover {
  transform: translateY(-4px);
}

.component-card {
  background: var(--color-card-light);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all var(--transition-base);
  cursor: pointer;
}

.component-card-link:hover .component-card {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-lg);
}

.card-content {
  flex: 1;
  margin-bottom: var(--space-md);
}

.component-name {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 var(--space-sm) 0;
  color: var(--color-fg-light);
  word-break: break-word;
}

.component-description {
  font-size: 0.875rem;
  color: var(--el-text-color-secondary);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.demo-badge {
  flex-shrink: 0;
}

.demo-badge-placeholder {
  flex-shrink: 0;
}

.param-count {
  font-size: 0.75rem;
  color: var(--el-text-color-placeholder);
  flex-shrink: 0;
  font-weight: 500;
}

/* Empty State */
.empty-state {
  margin-top: var(--space-3xl);
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    margin-bottom: var(--space-2xl);
  }

  .category-section {
    margin-bottom: var(--space-2xl);
  }

  .component-grid {
    grid-template-columns: repeat(auto-fill, minmax(min(160px, 100%), 1fr));
    gap: var(--space-md);
  }
}
</style>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <h1 class="hero-title">Jetpack Compose 速查</h1>
      <p class="hero-description">快速查阅 Compose 组件用法、参数说明与交互示例</p>

      <!-- Search Input -->
      <div class="search-wrapper">
        <el-input
          v-model="query"
          placeholder="搜索组件名称、分类或关键词…"
          aria-label="搜索组件名称、分类或关键词"
          name="home-component-search"
          autocomplete="off"
          size="large"
          clearable
          class="search-input focus-ring"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
    </div>

    <!-- Component Categories -->
    <template v-for="cat in categories" :key="cat">
      <section v-if="results.some(c => c.category === cat)" class="category-section">
        <div class="category-header">
          <el-tag :type="(categoryColors[cat] as any) || 'primary'" size="large" class="category-tag">
            {{ cat }}
          </el-tag>
          <span class="category-count">{{ results.filter(c => c.category === cat).length }} 个组件</span>
        </div>

        <div class="component-grid">
          <router-link
            v-for="comp in results.filter(c => c.category === cat)"
            :key="comp.id"
            :to="`/component/${comp.id}`"
            class="component-card-link focus-ring"
          >
            <div class="component-card">
              <div class="card-content">
                <h3 class="component-name">{{ comp.name }}</h3>
                <p class="component-description">{{ comp.description }}</p>
              </div>

              <div class="card-footer">
                <el-tag v-if="comp.demo" size="small" type="success" class="demo-badge">
                  可预览
                </el-tag>
                <span v-else class="demo-badge-placeholder" />
                <span class="param-count">{{ comp.params.length }} 个参数</span>
              </div>
            </div>
          </router-link>
        </div>
      </section>
    </template>

    <!-- Empty State -->
    <div v-if="results.length === 0" class="empty-state">
      <el-empty description="未找到匹配的组件" />
    </div>
  </div>
</template>
