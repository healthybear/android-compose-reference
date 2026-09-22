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
 * 6. 右侧目录导航（显示页面章节）
 */
import { computed, shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { allComponents } from '@/data/components'
import CodeBlock from '@/components/CodeBlock.vue'
import ParamsTable from '@/components/ParamsTable.vue'
import WasmDemo from '@/components/WasmDemo.vue'
import TableOfContents from '@/components/TableOfContents.vue'
import { useRelatedComponents } from '@/composables/useRelatedComponents'
import { ArrowRight, Loading } from '@element-plus/icons-vue'
import type { TocItem } from '@/components/TableOfContents.vue'

const route = useRoute()

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

// 生成目录导航
const tocItems = computed<TocItem[]>(() => {
  if (!component.value) return []

  const items: TocItem[] = []

  if (demo.value) {
    items.push({ id: 'preview-section', text: '完整示例', level: 1 })
  }

  if (component.value.params.length > 0) {
    items.push({ id: 'params-section', text: '参数', level: 1 })
  }

  items.push({ id: 'examples-section', text: '代码片段', level: 1 })

  component.value.examples.forEach((example, i) => {
    items.push({
      id: `example-${i}`,
      text: example.title,
      level: 2
    })
  })

  if (relatedComponents.value.length > 0) {
    items.push({ id: 'related-section', text: '相关组件', level: 1 })
  }

  return items
})
</script>

<style scoped>
.component-page-wrapper {
  display: flex;
  gap: var(--space-2xl);
  max-width: 1400px;
  margin: 0 auto;
  align-items: flex-start;
}

.component-page {
  flex: 1;
  min-width: 0;
  max-width: 920px;
}

/* Page Header */
.page-header {
  margin-bottom: var(--space-xl);
}

.component-title {
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  margin: var(--space-md) 0 var(--space-sm) 0;
  color: var(--color-fg-light);
  letter-spacing: -0.01em;
}

.component-desc {
  font-size: 1rem;
  color: var(--el-text-color-secondary);
  margin: 0 0 var(--space-md) 0;
  line-height: 1.7;
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.category-tag {
  font-family: var(--font-heading);
  font-weight: 600;
}

.feature-tag {
  font-weight: 500;
}

/* Section Divider */
.section-divider {
  margin: var(--space-2xl) 0;
}

/* Section Headers */
.section-header {
  margin-bottom: var(--space-lg);
}

.section-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 var(--space-xs) 0;
  color: var(--color-fg-light);
}

.section-subtitle {
  font-size: 0.875rem;
  color: var(--el-text-color-secondary);
  margin: 0;
  line-height: 1.5;
}

/* Preview Section */
.preview-section {
  margin-bottom: var(--space-xl);
}

.wasm-demo-container {
  background: var(--color-card-light);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  border: 1px solid rgba(34, 197, 94, 0.2);
  box-shadow: var(--glow-active);
  margin-bottom: var(--space-md);
  position: relative;
  transition: all var(--transition-base);
}

.wasm-demo-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg,
    rgba(34, 197, 94, 0) 0%,
    rgba(34, 197, 94, 0.5) 50%,
    rgba(34, 197, 94, 0) 100%);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.wasm-demo-wrapper {
  /* No additional margin needed */
}

.source-toggle {
  margin-bottom: var(--space-md);
  font-family: var(--font-body);
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  cursor: pointer;
}

.toggle-icon {
  transition: transform var(--transition-base);
}

.source-code-wrapper {
  margin-bottom: var(--space-lg);
}

/* Parameters Section */
.params-section {
  margin-bottom: var(--space-xl);
}

/* Examples Section */
.examples-section {
  margin-bottom: var(--space-xl);
}

.example-item {
  margin-bottom: var(--space-2xl);
}

.example-item:last-child {
  margin-bottom: 0;
}

.example-title {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 var(--space-xs) 0;
  color: var(--color-fg-light);
}

.example-desc {
  font-size: 0.875rem;
  color: var(--el-text-color-secondary);
  margin: 0 0 var(--space-sm) 0;
  line-height: 1.5;
}

/* Related Components */
.related-section {
  margin-bottom: var(--space-2xl);
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(160px, 100%), 1fr));
  gap: var(--space-md);
}

.related-card-link {
  display: block;
  text-decoration: none;
  border-radius: var(--radius-lg);
  transition: transform var(--transition-base);
}

.related-card-link:hover {
  transform: translateY(-2px);
}

.related-card {
  background: var(--color-card-light);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  transition: all var(--transition-base);
  cursor: pointer;
}

.related-card-link:hover .related-card {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
}

.related-name {
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-fg-light);
}

.related-desc {
  font-size: 0.75rem;
  color: var(--el-text-color-secondary);
  line-height: 1.5;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-tag {
  align-self: flex-start;
}

/* Page Footer / Navigation */
.page-footer {
  padding-bottom: var(--space-2xl);
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-md);
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-base);
  cursor: pointer;
}

.nav-btn-prev {
  background: var(--color-card-light);
  color: var(--color-fg-light);
  border: 2px solid var(--color-border-light);
}

.nav-btn-prev:hover {
  border-color: var(--color-accent);
  transform: translateX(-2px);
}

.nav-btn-next {
  background: var(--color-accent);
  color: white;
  border: 2px solid var(--color-accent);
}

.nav-btn-next:hover {
  opacity: 0.9;
  transform: translateX(2px);
}

.nav-placeholder {
  flex-shrink: 0;
}

/* Empty State */
.empty-state {
  margin-top: var(--space-3xl);
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .component-title {
    font-size: 1.5rem;
  }

  .related-grid {
    grid-template-columns: repeat(auto-fill, minmax(min(140px, 100%), 1fr));
  }

  .nav-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .nav-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>

<template>
  <div v-if="component" class="component-page-wrapper">
    <div class="component-page">
      <!-- Page Header -->
      <header class="page-header">
        <h1 class="component-title">{{ component.name }}</h1>
        <p class="component-desc">{{ component.description }}</p>
        <div class="tag-group">
          <el-tag type="info" size="small" class="category-tag">{{ component.category }}</el-tag>
          <el-tag v-for="tag in component.tags.slice(0, 4)" :key="tag" size="small" class="feature-tag">
            {{ tag }}
          </el-tag>
        </div>
      </header>

      <el-divider class="section-divider" />

      <!-- Interactive Preview -->
      <section v-if="demo" id="preview-section" class="preview-section">
        <div class="section-header">
          <h2 class="section-title">已构建验证的完整示例</h2>
          <p class="section-subtitle">此预览及其源码随 Wasm Demo 一同编译。</p>
        </div>

        <div class="wasm-demo-container">
          <WasmDemo :demo-id="demo.id" class="wasm-demo-wrapper" />
        </div>

        <el-button
          text
          class="source-toggle focus-ring"
          :aria-expanded="sourceExpanded"
          aria-controls="demo-source"
          @click="toggleSource"
        >
          <el-icon :class="sourceExpanded ? 'rotate-90' : ''" class="toggle-icon">
            <ArrowRight />
          </el-icon>
          <span>{{ sourceExpanded ? '收起' : '查看' }}预览源码</span>
          <el-icon v-if="sourceLoading"><Loading /></el-icon>
        </el-button>

        <div v-if="sourceExpanded" id="demo-source" class="source-code-wrapper">
          <CodeBlock v-if="sourceCode" :code="sourceCode" lang="kotlin" />
        </div>
      </section>

      <el-divider v-if="demo" class="section-divider" />

      <!-- Parameters -->
      <section v-if="component.params.length > 0" id="params-section" class="params-section">
        <h2 class="section-title">参数</h2>
        <ParamsTable :params="component.params" />
      </section>

      <el-divider v-if="component.params.length > 0" class="section-divider" />

      <!-- Code Examples -->
      <section id="examples-section" class="examples-section">
        <div class="section-header">
          <h2 class="section-title">说明性代码片段</h2>
          <p class="section-subtitle">片段为讲解而省略了部分上下文；可编译实现请查看上方完整示例。</p>
        </div>

        <div v-for="(example, i) in component.examples" :key="`${component.id}-${i}`" :id="`example-${i}`" class="example-item">
          <h3 class="example-title">{{ example.title }}</h3>
          <p v-if="example.description" class="example-desc">{{ example.description }}</p>
          <CodeBlock :code="example.code" />
        </div>
      </section>

      <!-- Related Components -->
      <section v-if="relatedComponents.length > 0" id="related-section" class="related-section">
        <el-divider class="section-divider" />
        <h2 class="section-title">相关组件</h2>
        <div class="related-grid">
          <router-link
            v-for="rel in relatedComponents"
            :key="rel.id"
            :to="`/component/${rel.id}`"
            class="related-card-link focus-ring"
          >
            <div class="related-card">
              <div class="related-name">{{ rel.name }}</div>
              <div class="related-desc">{{ rel.description }}</div>
              <el-tag size="small" type="info" class="related-tag">{{ rel.category }}</el-tag>
            </div>
          </router-link>
        </div>
      </section>

      <!-- Navigation -->
      <footer class="page-footer">
        <el-divider class="section-divider" />
        <nav class="nav-buttons" aria-label="组件导航">
          <router-link
            v-if="prevComp"
            :to="`/component/${prevComp.id}`"
            class="nav-btn nav-btn-prev focus-ring"
          >
            ← {{ prevComp.name }}
          </router-link>
          <span v-else class="nav-placeholder" />
          <router-link
            v-if="nextComp"
            :to="`/component/${nextComp.id}`"
            class="nav-btn nav-btn-next focus-ring"
          >
            {{ nextComp.name }} →
          </router-link>
        </nav>
      </footer>
    </div>

    <!-- Table of Contents - Right Sidebar -->
    <TableOfContents v-if="tocItems.length > 0" :items="tocItems" />
  </div>

  <div v-else class="empty-state">
    <el-empty description="组件不存在" />
  </div>
</template>
