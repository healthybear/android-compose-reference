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
  <el-header class="flex items-center justify-between gap-2 md:gap-4 w-full">
    <div class="flex items-center gap-2 flex-shrink-0">
      <el-tooltip :content="isMobile ? (drawerOpen ? '关闭导航菜单' : '打开导航菜单') : (collapsed ? '展开侧边栏' : '折叠侧边栏')" placement="bottom">
        <el-button
          :icon="isMobile ? (drawerOpen ? Close : Expand) : (collapsed ? Expand : Fold)"
          :aria-label="isMobile ? (drawerOpen ? '关闭导航菜单' : '打开导航菜单') : (collapsed ? '展开侧边栏' : '折叠侧边栏')"
          text
          circle
          @click="emit('toggleSidebar')"
        />
      </el-tooltip>
      <router-link to="/" class="flex items-center gap-2 no-underline text-el-text font-semibold text-base"><span class="text-xl">🚀</span><span class="hidden sm:inline">Compose 速查</span></router-link>
      <el-tooltip placement="bottom" class="hidden md:inline-flex">
        <template #content><div class="text-xs leading-6"><div>Android 文档 · Compose BOM &nbsp;<b>{{ composeVersion.bom }}</b></div><div>UI &nbsp;<b>{{ composeVersion.ui }}</b></div><div>Material3 &nbsp;<b>{{ composeVersion.material3 }}</b></div><div>Runtime &nbsp;<b>{{ composeVersion.runtime }}</b></div><div>Foundation &nbsp;<b>{{ composeVersion.foundation }}</b></div><div class="mt-1 pt-1 border-t border-el-border">Wasm Demo · Compose Multiplatform &nbsp;<b>{{ wasmRuntimeVersion.composeMultiplatform }}</b></div><div>Wasm Demo · Kotlin &nbsp;<b>{{ wasmRuntimeVersion.kotlin }}</b></div></div></template>
        <el-tag size="small" type="info" class="cursor-default select-none hidden md:inline-flex">Android BOM {{ composeVersion.bom }}</el-tag>
      </el-tooltip>
      <el-tooltip placement="bottom" class="hidden md:inline-flex"><template #content>Wasm Demo 运行时：Compose Multiplatform {{ wasmRuntimeVersion.composeMultiplatform }} · Kotlin {{ wasmRuntimeVersion.kotlin }}</template><el-tag size="small" type="success" class="cursor-default select-none hidden md:inline-flex ml-1">Wasm {{ wasmRuntimeVersion.composeMultiplatform }}</el-tag></el-tooltip>
    </div>
    <div class="flex-1 max-w-[400px]"><SearchPalette :query="query" :results="results" :is-mobile="isMobile" :visible="searchVisible" @update:query="emit('update:query', $event)" @update:visible="emit('update:searchVisible', $event)" @select="emit('selectSearch', $event)" @focus="emit('focusSearch')" /></div>
    <div class="flex-shrink-0">
      <el-tooltip :content="isDark ? '切换为浅色主题' : '切换为深色主题'" placement="bottom">
        <el-button :icon="isDark ? Sunny : Moon" :aria-label="isDark ? '切换为浅色主题' : '切换为深色主题'" circle @click="emit('toggleTheme')" />
      </el-tooltip>
    </div>
  </el-header>
</template>
