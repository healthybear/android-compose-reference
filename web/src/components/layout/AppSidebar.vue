<script setup lang="ts">
import { HomeFilled, Reading } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { allComponents, componentGroups } from '@/data/components'
import type { ComponentCategory } from '@/data/types'

defineProps<{ isMobile: boolean; drawerOpen: boolean; collapsed: boolean; routePath: string }>()
const groupedComponents = computed(() => componentGroups.map(group => ({
  ...group,
  components: allComponents.filter(component => group.categories.includes(component.category as ComponentCategory)),
})))
</script>

<template>
  <el-aside :width="isMobile ? '240px' : (collapsed ? '64px' : '220px')" :class="['border-r border-el-border bg-el-bg overflow-hidden transition-[width,transform] duration-300', isMobile ? 'absolute top-0 left-0 h-full z-20 shadow-xl' : '', (isMobile && !drawerOpen) ? '-translate-x-full' : '']">
    <el-scrollbar><el-menu :router="true" :default-active="routePath.startsWith('/guide') ? '/guide' : routePath" :collapse="!isMobile && collapsed" :collapse-transition="false" class="!border-r-none h-full">
      <el-menu-item index="/"><el-icon><HomeFilled /></el-icon><span>首页</span></el-menu-item>
      <el-menu-item index="/guide"><el-icon><Reading /></el-icon><span>快速上手</span></el-menu-item>
      <el-divider />
      <el-sub-menu v-for="group in groupedComponents" :key="group.label" :index="group.label"><template #title><el-icon><component :is="group.icon" /></el-icon><span>{{ group.label }}</span></template><el-menu-item v-for="component in group.components" :key="component.id" :index="`/component/${component.id}`">{{ component.name }}</el-menu-item></el-sub-menu>
    </el-menu></el-scrollbar>
  </el-aside>
</template>
