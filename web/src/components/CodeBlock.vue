<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { highlightKotlin, type CodeTheme } from '@/utils/codeHighlighter'

const props = defineProps<{
  code: string
  lang?: string
}>()

const { isDark } = useTheme()
const highlighted = ref('')
const loading = ref(true)
const copied = ref(false)
let highlightRequest = 0

function fallbackCode(code: string) {
  return `<pre><code>${code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
}

watch([() => props.code, () => props.lang, isDark], async () => {
  const request = ++highlightRequest
  loading.value = true
  try {
    const theme: CodeTheme = isDark.value ? 'github-dark' : 'github-light'
    const html = await highlightKotlin(props.code, theme)
    if (request === highlightRequest) highlighted.value = html
  } catch {
    if (request === highlightRequest) highlighted.value = fallbackCode(props.code)
  } finally {
    if (request === highlightRequest) loading.value = false
  }
}, { immediate: true })

async function copyCode() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="code-block-container">
    <div class="code-header">
      <span class="code-lang">{{ lang ?? 'kotlin' }}</span>
      <el-button size="small" :type="copied ? 'success' : 'default'" text @click="copyCode" class="copy-button">
        {{ copied ? '已复制' : '复制' }}
      </el-button>
    </div>
    <div v-if="loading" class="code-loading" role="status" aria-live="polite">
      加载中…
    </div>
    <div v-else class="code-content" v-html="highlighted" />
  </div>
</template>

<style scoped>
/* Code Block - IDE Editor Style */
.code-block-container {
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin: var(--space-md) 0;
  background: var(--color-muted-light);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.code-block-container:hover {
  box-shadow: var(--shadow-md);
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-xs) var(--space-md);
  background: var(--color-muted-light);
  border-bottom: 1px solid var(--color-border-light);
}

.code-lang {
  font-size: 0.75rem;
  color: var(--el-text-color-secondary);
  font-family: var(--font-heading);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.copy-button {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 500;
}

.code-loading {
  padding: var(--space-lg) var(--space-xl);
  color: var(--el-text-color-placeholder);
  font-size: 0.875rem;
  font-family: var(--font-heading);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.code-content :deep(pre) {
  margin: 0;
  padding: var(--space-lg);
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
  background: transparent;
  font-variant-ligatures: common-ligatures;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.code-content :deep(code) {
  font-family: var(--font-heading);
  font-weight: 400;
}

/* Scrollbar styling for code blocks */
.code-content :deep(pre::-webkit-scrollbar) {
  height: 8px;
}

.code-content :deep(pre::-webkit-scrollbar-track) {
  background: transparent;
}

.code-content :deep(pre::-webkit-scrollbar-thumb) {
  background: var(--color-border-light);
  border-radius: 4px;
}

.code-content :deep(pre::-webkit-scrollbar-thumb:hover) {
  background: var(--color-border);
}
</style>
