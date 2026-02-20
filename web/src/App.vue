<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Moon, Sunny, HomeFilled, Fold, Expand, Reading } from '@element-plus/icons-vue'
import { useTheme } from '@/composables/useTheme'
import { useSearch } from '@/composables/useSearch'
import { allComponents, componentGroups, composeVersion } from '@/data/components'

const router = useRouter()
const { isDark, toggle } = useTheme()
const { query, results } = useSearch()

const searchVisible = ref(false)
const collapsed = ref(false)

function goToComponent(id: string) {
  searchVisible.value = false
  query.value = ''
  router.push(`/component/${id}`)
}

function groupComponents(categories: string[]) {
  return allComponents.filter(c => categories.includes(c.category))
}
</script>

<template>
  <el-container class="h-screen overflow-hidden">
    <!-- 顶部 Header -->
    <el-header class="flex items-center justify-between gap-4 w-full">
      <div class="flex items-center gap-2 flex-shrink-0">
        <el-tooltip :content="collapsed ? '展开侧边栏' : '收起侧边栏'">
          <el-button :icon="collapsed ? Expand : Fold" text circle @click="collapsed = !collapsed" />
        </el-tooltip>
        <router-link to="/" class="flex items-center gap-2 no-underline text-el-text font-semibold text-base">
          <span class="text-xl">🚀</span>
          <span>Compose 速查</span>
        </router-link>
        <el-tooltip placement="bottom">
          <template #content>
            <div class="text-xs leading-6">
              <div>Compose BOM &nbsp;<b>{{ composeVersion.bom }}</b></div>
              <div>UI &nbsp;<b>{{ composeVersion.ui }}</b></div>
              <div>Material3 &nbsp;<b>{{ composeVersion.material3 }}</b></div>
              <div>Runtime &nbsp;<b>{{ composeVersion.runtime }}</b></div>
              <div>Foundation &nbsp;<b>{{ composeVersion.foundation }}</b></div>
            </div>
          </template>
          <el-tag size="small" type="info" class="cursor-default select-none">
            BOM {{ composeVersion.bom }}
          </el-tag>
        </el-tooltip>
      </div>
      <div class="flex-1 max-w-[400px]">
        <el-popover
          v-model:visible="searchVisible"
          placement="bottom"
          :width="480"
          trigger="click"
          popper-class="search-popover"
        >
          <template #reference>
            <el-input
              v-model="query"
              placeholder="搜索组件..."
              :prefix-icon="Search"
              clearable
              class="w-full"
              @focus="searchVisible = true"
            />
          </template>
          <el-empty v-if="query && results.length === 0" description="未找到匹配的组件" :image-size="60" />
          <el-scrollbar v-else-if="query" max-height="360px">
            <div
              v-for="item in results"
              :key="item.id"
              class="flex items-center gap-2 px-3 py-[10px] cursor-pointer rounded-md transition-colors hover:bg-el-fill-light"
              @click="goToComponent(item.id)"
            >
              <span class="font-semibold min-w-[80px]">{{ item.name }}</span>
              <el-tag size="small" type="info">{{ item.category }}</el-tag>
              <span class="text-el-text-secondary text-[13px] overflow-hidden text-ellipsis whitespace-nowrap">{{ item.description }}</span>
            </div>
          </el-scrollbar>
        </el-popover>
      </div>
      <div class="flex-shrink-0">
        <el-tooltip :content="isDark ? '切换浅色' : '切换深色'">
          <el-button :icon="isDark ? Sunny : Moon" circle @click="toggle" />
        </el-tooltip>
      </div>
    </el-header>

    <el-container class="h-[calc(100vh-60px)] overflow-hidden">
      <!-- 侧边栏 -->
      <el-aside
        :width="collapsed ? '64px' : '220px'"
        class="border-r border-el-border bg-el-bg overflow-hidden transition-[width] duration-300"
      >
        <el-scrollbar>
          <el-menu
            :router="true"
            :default-active="$route.path.startsWith('/guide') ? '/guide' : $route.path"
            :collapse="collapsed"
            :collapse-transition="false"
            class="!border-r-none h-full"
          >
            <el-menu-item index="/">
              <el-icon><HomeFilled /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/guide">
              <el-icon><Reading /></el-icon>
              <span>快速上手</span>
            </el-menu-item>
            <el-divider />
            <el-sub-menu
              v-for="group in componentGroups"
              :key="group.label"
              :index="group.label"
            >
              <template #title>
                <el-icon><component :is="group.icon" /></el-icon>
                <span>{{ group.label }}</span>
              </template>
              <el-menu-item
                v-for="comp in groupComponents(group.categories)"
                :key="comp.id"
                :index="`/component/${comp.id}`"
              >
                {{ comp.name }}
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <!-- 主内容区 -->
      <el-main class="!p-0 overflow-hidden">
        <el-scrollbar>
          <div class="p-8 min-h-full">
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
</style>
