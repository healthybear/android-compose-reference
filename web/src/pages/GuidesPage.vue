<script setup lang="ts">
import { guides } from '@/data/guides'

const difficultyMap = {
  beginner: { label: '入门', type: 'success' },
  intermediate: { label: '进阶', type: 'warning' },
  advanced: { label: '高级', type: 'danger' },
} as const
</script>

<template>
  <div class="guides-page">
    <header class="page-header">
      <h1 class="page-title">快速上手</h1>
      <p class="page-description">
        从零开始学习 Jetpack Compose，掌握核心概念与实践技巧。
      </p>
    </header>

    <div class="guides-grid">
      <router-link
        v-for="guide in guides"
        :key="guide.id"
        :to="`/guide/${guide.id}`"
        class="guide-card-link focus-ring"
      >
        <article class="guide-card">
          <div class="card-header">
            <div class="icon-wrapper" aria-hidden="true">
              <el-icon size="24">
                <component :is="guide.icon" />
              </el-icon>
            </div>
            <h2 class="guide-title">{{ guide.title }}</h2>
          </div>

          <p class="guide-description">
            {{ guide.description }}
          </p>

          <div class="card-footer">
            <el-tag :type="difficultyMap[guide.difficulty].type" size="small" class="difficulty-tag">
              {{ difficultyMap[guide.difficulty].label }}
            </el-tag>
            <span class="step-count">{{ guide.steps.length }} 个步骤</span>
          </div>
        </article>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.guides-page {
  max-width: 1100px;
  margin: 0 auto;
}

/* Page Header */
.page-header {
  margin-bottom: var(--space-3xl);
}

.page-title {
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  margin: var(--space-md) 0 var(--space-sm) 0;
  color: var(--color-fg-light);
  letter-spacing: -0.01em;
}

.page-description {
  font-size: 1rem;
  color: var(--el-text-color-secondary);
  margin: 0 0 var(--space-lg) 0;
  line-height: 1.7;
  max-width: 700px;
}

/* Guides Grid */
.guides-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
  gap: var(--space-lg);
}

.guide-card-link {
  display: block;
  text-decoration: none;
  border-radius: var(--radius-lg);
  transition: transform var(--transition-base);
}

.guide-card-link:hover {
  transform: translateY(-4px);
}

.guide-card {
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

.guide-card-link:hover .guide-card {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-lg);
}

/* Card Header */
.card-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.icon-wrapper {
  color: var(--el-text-color-secondary);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.guide-title {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-fg-light);
}

/* Card Content */
.guide-description {
  font-size: 0.875rem;
  color: var(--el-text-color-secondary);
  line-height: 1.6;
  margin: 0 0 var(--space-md) 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Card Footer */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
}

.difficulty-tag {
  flex-shrink: 0;
  font-weight: 600;
}

.step-count {
  font-size: 0.75rem;
  color: var(--el-text-color-placeholder);
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .page-header {
    margin-bottom: var(--space-2xl);
  }

  .guides-grid {
    grid-template-columns: repeat(auto-fill, minmax(min(160px, 100%), 1fr));
    gap: var(--space-md);
  }
}
</style>
