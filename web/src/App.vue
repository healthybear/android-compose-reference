<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Moon, Sunny, HomeFilled, Fold, Expand } from '@element-plus/icons-vue'
import { useTheme } from '@/composables/useTheme'
import { useSearch } from '@/composables/useSearch'
import { allComponents, categories } from '@/data/components'

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
            :default-active="$route.path"
            :collapse="collapsed"
            :collapse-transition="false"
            class="!border-r-none h-full"
          >
            <el-menu-item index="/">
              <el-icon><HomeFilled /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-divider />
            <el-menu-item-group
              v-for="cat in categories"
              :key="cat"
              :title="cat"
            >
              <el-menu-item
                v-for="comp in allComponents.filter(c => c.category === cat)"
                :key="comp.id"
                :index="`/component/${comp.id}`"
              >
                {{ comp.name }}
              </el-menu-item>
            </el-menu-item-group>
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
