<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTheme } from '@/composables/useTheme'

defineProps<{
  demoId: string
  height?: number
}>()

const { isDark } = useTheme()
const iframeRef = ref<HTMLIFrameElement | null>(null)

// 主题变化时通知 iframe 内的 Compose Demo
watch(isDark, (val) => {
  iframeRef.value?.contentWindow?.postMessage({ type: 'theme', dark: val }, '*')
})
</script>

<template>
  <div class="wasm-demo">
    <div class="demo-header">
      <el-icon><Monitor /></el-icon>
      <span>交互预览</span>
    </div>
    <iframe
      ref="iframeRef"
      :src="`/demos/index.html?demo=${demoId}`"
      :height="height ?? 320"
      width="100%"
      frameborder="0"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin"
      class="demo-iframe"
    />
  </div>
</template>

<style scoped>
.wasm-demo {
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  overflow: hidden;
  margin: 12px 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: var(--el-fill-color-light);
  border-bottom: 1px solid var(--el-border-color);
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.demo-iframe {
  display: block;
  background: var(--el-bg-color);
}
</style>
