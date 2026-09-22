<script setup lang="ts">
import { Moon, Sunny, Fold, Expand, Close } from '@element-plus/icons-vue'
import SearchPalette from './SearchPalette.vue'
import type { ComponentEntry, ComposeVersion, WasmRuntimeVersion } from '@/data/types'

defineProps<{ isMobile: boolean; drawerOpen: boolean; collapsed: boolean; isDark: boolean; query: string; results: ComponentEntry[]; searchVisible: boolean; composeVersion: ComposeVersion; wasmRuntimeVersion: WasmRuntimeVersion }>()

const emit = defineEmits<{
  toggleSidebar: []
  toggleTheme: []
  'update:query': [value: string]
  'update:searchVisible': [value: boolean]
  selectSearch: [id: string]
  focusSearch: []
}>()
</script>

<template>
  <el-header class="app-header">
    <div class="header-content">
      <!-- Left Section -->
      <div class="header-left">
        <el-tooltip :content="isMobile ? (drawerOpen ? '关闭导航菜单' : '打开导航菜单') : (collapsed ? '展开侧边栏' : '折叠侧边栏')" placement="bottom">
          <el-button
            :icon="isMobile ? (drawerOpen ? Close : Expand) : (collapsed ? Expand : Fold)"
            :aria-label="isMobile ? (drawerOpen ? '关闭导航菜单' : '打开导航菜单') : (collapsed ? '展开侧边栏' : '折叠侧边栏')"
            text
            circle
            class="menu-toggle focus-ring"
            @click="emit('toggleSidebar')"
          />
        </el-tooltip>

        <router-link to="/" class="brand-link focus-ring">
          <span class="brand-icon" aria-hidden="true">🚀</span>
          <span class="brand-text">Compose 速查</span>
        </router-link>

        <div class="version-badges">
          <el-tooltip placement="bottom" class="android-version-tooltip">
            <template #content>
              <div class="version-tooltip-content">
                <div class="tooltip-row"><strong>Android 文档 · Compose BOM</strong> {{ composeVersion.bom }}</div>
                <div class="tooltip-row">UI {{ composeVersion.ui }}</div>
                <div class="tooltip-row">Material3 {{ composeVersion.material3 }}</div>
                <div class="tooltip-row">Runtime {{ composeVersion.runtime }}</div>
                <div class="tooltip-row">Foundation {{ composeVersion.foundation }}</div>
                <div class="tooltip-divider" />
                <div class="tooltip-row"><strong>Wasm Demo · Compose Multiplatform</strong> {{ wasmRuntimeVersion.composeMultiplatform }}</div>
                <div class="tooltip-row">Wasm Demo · Kotlin {{ wasmRuntimeVersion.kotlin }}</div>
              </div>
            </template>
            <el-tag size="small" type="info" class="version-tag">Android BOM {{ composeVersion.bom }}</el-tag>
          </el-tooltip>

          <el-tooltip placement="bottom" class="wasm-version-tooltip">
            <template #content>Wasm Demo 运行时：Compose Multiplatform {{ wasmRuntimeVersion.composeMultiplatform }} · Kotlin {{ wasmRuntimeVersion.kotlin }}</template>
            <el-tag size="small" type="success" class="version-tag">Wasm {{ wasmRuntimeVersion.composeMultiplatform }}</el-tag>
          </el-tooltip>
        </div>
      </div>

      <!-- Center Section - Search -->
      <div class="header-center">
        <SearchPalette
          :query="query"
          :results="results"
          :is-mobile="isMobile"
          :visible="searchVisible"
          @update:query="emit('update:query', $event)"
          @update:visible="emit('update:searchVisible', $event)"
          @select="emit('selectSearch', $event)"
          @focus="emit('focusSearch')"
        />
      </div>

      <!-- Right Section - Theme Toggle -->
      <div class="header-right">
        <el-tooltip :content="isDark ? '切换为浅色主题' : '切换为深色主题'" placement="bottom">
          <el-button
            :icon="isDark ? Sunny : Moon"
            :aria-label="isDark ? '切换为浅色主题' : '切换为深色主题'"
            circle
            class="theme-toggle focus-ring"
            @click="emit('toggleTheme')"
          />
        </el-tooltip>
      </div>
    </div>
  </el-header>
</template>

<style scoped>
.app-header {
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg-light);
  backdrop-filter: blur(8px);
  transition: all var(--transition-base);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  width: 100%;
  height: 100%;
}

/* Left Section */
.header-left {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-shrink: 0;
}

.menu-toggle {
  transition: transform var(--transition-base);
}

.menu-toggle:hover {
  transform: scale(1.1);
}

.brand-link {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  text-decoration: none;
  color: var(--color-fg-light);
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1rem;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.brand-link:hover {
  background: var(--color-muted-light);
}

.brand-icon {
  font-size: 1.25rem;
  line-height: 1;
}

.brand-text {
  display: none;
}

@media (min-width: 640px) {
  .brand-text {
    display: inline;
  }
}

.version-badges {
  display: none;
  align-items: center;
  gap: var(--space-xs);
}

@media (min-width: 768px) {
  .version-badges {
    display: flex;
  }
}

.version-tag {
  cursor: default;
  user-select: none;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
}

.version-tooltip-content {
  font-size: 0.75rem;
  line-height: 1.6;
}

.tooltip-row {
  padding: 2px 0;
}

.tooltip-divider {
  margin: var(--space-xs) 0;
  padding-top: var(--space-xs);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

/* Center Section */
.header-center {
  flex: 1;
  max-width: 500px;
  min-width: 0;
}

/* Right Section */
.header-right {
  flex-shrink: 0;
}

.theme-toggle {
  transition: transform var(--transition-base);
}

.theme-toggle:hover {
  transform: rotate(20deg) scale(1.1);
}
</style>
