<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useTheme } from '@/composables/useTheme'

const props = defineProps<{
  code: string
  lang?: string
}>()

const { isDark } = useTheme()
const highlighted = ref('')
const copied = ref(false)

watchEffect(async () => {
  const { codeToHtml } = await import('shiki')
  highlighted.value = await codeToHtml(props.code, {
    lang: props.lang ?? 'kotlin',
    theme: isDark.value ? 'github-dark' : 'github-light',
  })
})

async function copyCode() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="code-block">
    <div class="code-toolbar">
      <span class="code-lang">{{ lang ?? 'kotlin' }}</span>
      <el-button
        size="small"
        :type="copied ? 'success' : 'default'"
        text
        @click="copyCode"
      >
        {{ copied ? '已复制' : '复制' }}
      </el-button>
    </div>
    <div class="code-content" v-html="highlighted" />
  </div>
</template>

<style scoped>
.code-block {
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  overflow: hidden;
  margin: 12px 0;
}

.code-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  background: var(--el-fill-color-light);
  border-bottom: 1px solid var(--el-border-color);
}

.code-lang {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  font-family: monospace;
}

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
