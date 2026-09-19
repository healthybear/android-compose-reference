<script setup lang="ts">
import { shallowRef, useTemplateRef, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { useTheme } from '@/composables/useTheme'
import { useSearch } from '@/composables/useSearch'
import { useResponsiveLayout } from '@/composables/useResponsiveLayout'
import { composeVersion, wasmRuntimeVersion } from '@/data/components'

const router = useRouter()
const route = useRoute()
const { isDark, toggle } = useTheme()
const { query, results } = useSearch()
const { isMobile } = useResponsiveLayout()
const searchVisible = shallowRef(false)
const collapsed = shallowRef(false)
const drawerOpen = shallowRef(false)
const mainScrollbar = useTemplateRef<{ setScrollTop: (top: number) => void }>('mainScrollbar')

watch(() => route.path, () => {
  mainScrollbar.value?.setScrollTop(0)
  if (isMobile.value) drawerOpen.value = false
})

function toggleSidebar() {
  if (isMobile.value) drawerOpen.value = !drawerOpen.value
  else collapsed.value = !collapsed.value
}

function selectSearch(id: string) {
  searchVisible.value = false
  query.value = ''
  router.push(`/component/${id}`)
}
</script>

<template>
  <!--
    注意：Element Plus 的 el-container 有自动布局检测机制：
    - 包含 el-header/el-footer 时自动变成 flex-direction: column
    - 包含 el-aside 时自动变成 flex-direction: row

    ⚠️ 但在嵌套使用时，自动检测可能失败，导致内层容器宽度为 0
    解决方案：明确指定外层容器的 flex-direction，不依赖自动检测
  -->
  <el-container class="app-root">
    <a class="skip-link" href="#main-content">跳至主要内容</a>

    <AppHeader
      :is-mobile="isMobile"
      :drawer-open="drawerOpen"
      :collapsed="collapsed"
      :is-dark="isDark"
      :query="query"
      :results="results"
      :search-visible="searchVisible"
      :compose-version="composeVersion"
      :wasm-runtime-version="wasmRuntimeVersion"
      @toggle-sidebar="toggleSidebar"
      @toggle-theme="toggle"
      @update:query="query = $event"
      @update:search-visible="searchVisible = $event"
      @select-search="selectSearch"
      @focus-search="searchVisible = true"
    />

    <el-container class="app-content">
      <!-- 移动端遮罩 -->
      <Transition name="fade">
        <div
          v-if="isMobile && drawerOpen"
          class="overlay"
          @click="drawerOpen = false"
        />
      </Transition>

      <AppSidebar
        :is-mobile="isMobile"
        :drawer-open="drawerOpen"
        :collapsed="collapsed"
        :route-path="route.path"
      />

      <!-- 主内容区 -->
      <main class="main-content">
        <el-scrollbar ref="mainScrollbar" class="main-scrollbar">
          <div id="main-content" class="main-inner" tabindex="-1">
            <router-view />
          </div>
        </el-scrollbar>
      </main>
    </el-container>
  </el-container>
</template>

<style>
* {
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* 确保 #app 容器正确占据整个视口 */
#app {
  display: block !important;
  width: 100vw !important;
  height: 100vh !important;
}

/* 应用根容器：垂直布局，包含 header 和内容区 */
.app-root {
  display: flex !important;
  flex-direction: column !important;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* 内容容器：横向布局，包含 sidebar 和主内容 */
.app-content {
  display: flex !important;
  flex-direction: row !important;
  flex: 1;
  width: 100%;
  overflow: hidden;
  position: relative;
}

/* 移动端遮罩 */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
}

/* 主内容区：占据剩余空间 */
.main-content {
  flex: 1;
  min-width: 0; /* 允许 flex 子元素正确缩小 */
  overflow: hidden;
}

.main-scrollbar {
  width: 100%;
  height: 100%;
}

.main-inner {
  padding: 1rem;
  min-height: 100%;
}

@media (min-width: 768px) {
  .main-inner {
    padding: 2rem;
  }
}

.skip-link {
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 100;
  padding: 0.5rem 0.75rem;
  color: var(--el-color-white);
  background: var(--el-color-primary);
  border-radius: 0.25rem;
  transform: translateY(-150%);
}

.skip-link:focus-visible {
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform 0.25s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }
</style>
