<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

export interface TocItem {
  id: string
  text: string
  level: number
}

const props = defineProps<{
  items: TocItem[]
}>()

const activeId = ref('')
const route = useRoute()

// 监听滚动，高亮当前可见的章节
function updateActiveSection() {
  const sections = props.items.map(item => ({
    id: item.id,
    element: document.getElementById(item.id)
  })).filter(s => s.element)

  // 找到当前在视口中的第一个章节
  for (const section of sections) {
    const rect = section.element!.getBoundingClientRect()
    if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
      activeId.value = section.id
      return
    }
  }

  // 如果没有找到，使用最上方的章节
  for (const section of sections) {
    const rect = section.element!.getBoundingClientRect()
    if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
      activeId.value = section.id
      return
    }
  }
}

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeId.value = id
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveSection, { passive: true })
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})

// 路由变化时重新计算
watch(() => route.path, () => {
  setTimeout(updateActiveSection, 100)
})
</script>

<template>
  <aside class="table-of-contents" aria-label="目录导航">
    <div class="toc-header">目录</div>
    <nav class="toc-nav">
      <ul class="toc-list">
        <li
          v-for="item in items"
          :key="item.id"
          :class="['toc-item', `toc-level-${item.level}`, { active: activeId === item.id }]"
        >
          <a
            :href="`#${item.id}`"
            class="toc-link focus-ring"
            @click.prevent="scrollToSection(item.id)"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.table-of-contents {
  position: sticky;
  top: var(--space-lg);
  max-height: calc(100vh - var(--space-2xl));
  overflow-y: auto;
  padding: var(--space-lg);
  background: var(--color-card-light);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  min-width: 200px;
  max-width: 280px;
}

.toc-header {
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-fg-light);
  margin-bottom: var(--space-md);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.toc-nav {
  overflow-y: auto;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin-bottom: var(--space-xs);
  transition: all var(--transition-fast);
}

.toc-link {
  display: block;
  font-size: 0.875rem;
  color: var(--el-text-color-secondary);
  text-decoration: none;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  line-height: 1.5;
  border-left: 2px solid transparent;
}

.toc-link:hover {
  color: var(--color-accent);
  background: var(--color-muted-light);
}

.toc-item.active .toc-link {
  color: var(--color-accent);
  font-weight: 600;
  border-left-color: var(--color-accent);
  background: var(--color-muted-light);
  position: relative;
}

.toc-item.active .toc-link::before {
  content: '';
  position: absolute;
  left: -1px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--color-accent);
  border-radius: 0 2px 2px 0;
}

/* Level indentation */
.toc-level-2 .toc-link {
  padding-left: var(--space-md);
}

.toc-level-3 .toc-link {
  padding-left: var(--space-lg);
  font-size: 0.8125rem;
}

/* Scrollbar styling */
.table-of-contents::-webkit-scrollbar {
  width: 4px;
}

.table-of-contents::-webkit-scrollbar-track {
  background: transparent;
}

.table-of-contents::-webkit-scrollbar-thumb {
  background: var(--color-border-light);
  border-radius: 2px;
}

.table-of-contents::-webkit-scrollbar-thumb:hover {
  background: var(--color-border);
}

/* Responsive - hide on small screens */
@media (max-width: 1200px) {
  .table-of-contents {
    display: none;
  }
}
</style>
