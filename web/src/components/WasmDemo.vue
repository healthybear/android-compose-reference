<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { Monitor } from '@element-plus/icons-vue'

defineProps<{
  demoId: string
  height?: number
}>()

const { isDark } = useTheme()
const iframeRef = ref<HTMLIFrameElement | null>(null)

watch(isDark, (val) => {
  iframeRef.value?.contentWindow?.postMessage({ type: 'theme', dark: val }, '*')
})
</script>

<template>
  <div class="border border-el-border rounded-lg overflow-hidden my-3">
    <div class="flex items-center gap-1.5 px-3 py-2 bg-el-fill-light border-b border-el-border text-[13px] text-el-text-secondary">
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
      class="block bg-el-bg"
    />
  </div>
</template>
