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
  <el-container class="h-screen overflow-hidden">
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

    <el-container class="h-[calc(100vh-60px)] overflow-hidden relative">
      <!-- 移动端遮罩 -->
      <Transition name="fade">
        <div
          v-if="isMobile && drawerOpen"
          class="absolute inset-0 bg-black/40 z-10"
          @click="drawerOpen = false"
        />
      </Transition>

      <Transition name="slide">
        <AppSidebar
          :is-mobile="isMobile"
          :drawer-open="drawerOpen"
          :collapsed="collapsed"
          :route-path="route.path"
        />
      </Transition>

      <!-- 主内容区 -->
      <el-main id="main-content" class="!p-0 overflow-hidden" tabindex="-1">
        <el-scrollbar ref="mainScrollbar">
          <div class="p-4 md:p-8 min-h-full">
            <router-view />
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
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
