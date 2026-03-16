<script setup lang="ts">
/**
 * WASM 交互预览组件
 *
 * 功能：
 * 1. 通过 iframe 嵌入 Compose WASM demo
 * 2. 监听主题切换，同步到 iframe 内部
 * 3. 接收 iframe 内容高度消息，自动调整 iframe 高度
 * 4. 限制最大高度，避免过长内容影响页面布局
 */
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
const iframeHeight = ref(props.height ?? 480)  // 默认高度 480px
const maxHeight = props.maxHeight ?? 600       // 默认最大高度 600px，防止内容过长

// 监听主题切换，通过 postMessage 通知 iframe 内部
// iframe 内的 Main.kt 会接收此消息并切换主题
watch(isDark, (val) => {
  iframeRef.value?.contentWindow?.postMessage({ type: 'theme', dark: val }, '*')
})

// 处理来自 iframe 的高度消息
// 工作原理：
// 1. iframe 内的 Main.kt 通过 postMessage 发送内容高度
// 2. 验证消息来源（必须来自当前 iframe）
// 3. 加 48px padding 余量（上下各 24dp，避免内容紧贴边缘）
// 4. 限制最大高度（防止超长内容撑开页面）
function onMessage(e: MessageEvent) {
  if (e.source !== iframeRef.value?.contentWindow) return  // 安全检查：仅接受来自当前 iframe 的消息
  const data = e.data as { type?: string; height?: number }
  if (data?.type === 'height' && typeof data.height === 'number' && data.height > 0) {
    const calculatedHeight = data.height + 48  // 加 padding 余量
    iframeHeight.value = Math.min(calculatedHeight, maxHeight)  // 限制最大高度
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
