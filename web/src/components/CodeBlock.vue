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
  <div class="border border-el-border rounded-lg overflow-hidden my-3">
    <div class="flex items-center justify-between px-3 py-1.5 bg-el-fill-light border-b border-el-border">
      <span class="text-xs text-el-text-secondary font-mono">{{ lang ?? 'kotlin' }}</span>
      <el-button size="small" :type="copied ? 'success' : 'default'" text @click="copyCode">
        {{ copied ? '已复制' : '复制' }}
      </el-button>
    </div>
    <div v-if="loading" class="px-4 py-3 text-el-text-placeholder text-sm font-mono animate-pulse" role="status" aria-live="polite">
      加载中…
    </div>
    <div v-else class="code-content" v-html="highlighted" />
  </div>
</template>

<style scoped>
.code-content :deep(pre) {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.6;
}

.code-content :deep(code) {
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
}
</style>
