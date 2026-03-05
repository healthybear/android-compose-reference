<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { Monitor } from '@element-plus/icons-vue'

const props = defineProps<{
  demoId: string
  height?: number
  maxHeight?: number
}>()

const { isDark } = useTheme()
const iframeRef = ref<HTMLIFrameElement | null>(null)
const iframeHeight = ref(props.height ?? 480)
const maxHeight = props.maxHeight ?? 600 // 默认最大高度 600px

watch(isDark, (val) => {
  iframeRef.value?.contentWindow?.postMessage({ type: 'theme', dark: val }, '*')
})

function onMessage(e: MessageEvent) {
  if (e.source !== iframeRef.value?.contentWindow) return
  const data = e.data as { type?: string; height?: number }
  if (data?.type === 'height' && typeof data.height === 'number' && data.height > 0) {
    const calculatedHeight = data.height + 48 // 加 padding 余量
    iframeHeight.value = Math.min(calculatedHeight, maxHeight) // 限制最大高度
  }
}

onMounted(() => window.addEventListener('message', onMessage))
onUnmounted(() => window.removeEventListener('message', onMessage))
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
      :style="{ height: iframeHeight + 'px' }"
      width="100%"
      frameborder="0"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin"
      class="block bg-el-bg overflow-auto"
    />
  </div>
</template>
