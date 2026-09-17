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
import { computed, onMounted, onUnmounted, shallowRef, useTemplateRef, watch } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { Monitor } from '@element-plus/icons-vue'

const props = defineProps<{
  demoId: string
  height?: number
  maxHeight?: number
}>()

const { isDark } = useTheme()
const iframeRef = useTemplateRef<HTMLIFrameElement>('iframeRef')
const iframeHeight = shallowRef(props.height ?? 480)  // 默认高度 480px
const maxHeight = props.maxHeight ?? 600       // 默认最大高度 600px，防止内容过长
const trustedOrigin = window.location.origin
const demoUrl = computed(() => {
  const url = new URL('/demos/index.html', trustedOrigin)
  url.searchParams.set('demo', props.demoId)
  return url.href
})

interface HeightMessage {
  type: 'compose-demo:height'
  height: number
}

interface ReadyMessage {
  type: 'compose-demo:ready'
}

interface ThemeAppliedMessage {
  type: 'compose-demo:theme-applied'
  dark: boolean
}

function sendTheme() {
  iframeRef.value?.contentWindow?.postMessage(
    { type: 'compose-demo:theme', dark: isDark.value },
    trustedOrigin,
  )
}

// 监听主题切换，通过 postMessage 通知 iframe 内部
// iframe 内的 Main.kt 会接收此消息并切换主题
watch(isDark, sendTheme)

function isHeightMessage(data: unknown): data is HeightMessage {
  if (typeof data !== 'object' || data === null) return false
  const message = data as Record<string, unknown>
  return message.type === 'compose-demo:height'
    && typeof message.height === 'number'
    && Number.isFinite(message.height)
    && message.height > 0
    && message.height <= 100_000
}

function isReadyMessage(data: unknown): data is ReadyMessage {
  if (typeof data !== 'object' || data === null) return false
  return (data as Record<string, unknown>).type === 'compose-demo:ready'
}

function isThemeAppliedMessage(data: unknown): data is ThemeAppliedMessage {
  if (typeof data !== 'object' || data === null) return false
  const message = data as Record<string, unknown>
  return message.type === 'compose-demo:theme-applied' && typeof message.dark === 'boolean'
}

// 处理来自 iframe 的高度消息
// 工作原理：
// 1. iframe 内的 Main.kt 通过 postMessage 发送内容高度
// 2. 验证消息来源（必须来自当前 iframe）
// 3. 加 48px padding 余量（上下各 24dp，避免内容紧贴边缘）
// 4. 限制最大高度（防止超长内容撑开页面）
function onMessage(e: MessageEvent) {
  if (e.origin !== trustedOrigin || e.source !== iframeRef.value?.contentWindow) return
  if (isReadyMessage(e.data)) {
    sendTheme()
    return
  }
  if (isThemeAppliedMessage(e.data)) return
  if (!isHeightMessage(e.data)) return

  const calculatedHeight = e.data.height + 48  // 加 padding 余量
  iframeHeight.value = Math.min(calculatedHeight, maxHeight)  // 限制最大高度
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
      :src="demoUrl"
      :title="`${demoId} Compose 交互预览`"
      :style="{ height: iframeHeight + 'px' }"
      width="100%"
      frameborder="0"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin"
      class="block bg-el-bg overflow-auto"
      @load="sendTheme"
    />
  </div>
</template>
