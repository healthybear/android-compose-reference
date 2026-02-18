<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Moon, Sunny, HomeFilled } from '@element-plus/icons-vue'
import { useTheme } from '@/composables/useTheme'
import { useSearch } from '@/composables/useSearch'
import { allComponents, categories } from '@/data/components'

const router = useRouter()
const { isDark, toggle } = useTheme()
const { query, results } = useSearch()

const searchVisible = ref(false)

function goToComponent(id: string) {
  searchVisible.value = false
  query.value = ''
  router.push(`/component/${id}`)
}
</script>

<template>
  <el-container class="app-container">
    <!-- 顶部 Header -->
    <el-header class="app-header">
      <div class="header-left">
        <router-link to="/" class="logo">
          <span class="logo-icon">🚀</span>
          <span class="logo-text">Compose 速查</span>
        </router-link>
      </div>
      <div class="header-center">
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
              class="search-input"
              @focus="searchVisible = true"
            />
          </template>
          <div v-if="query && results.length === 0" class="search-empty">
            未找到匹配的组件
          </div>
          <div v-else-if="query" class="search-results">
            <div
              v-for="item in results"
              :key="item.id"
              class="search-result-item"
              @click="goToComponent(item.id)"
            >
              <span class="result-name">{{ item.name }}</span>
              <el-tag size="small" type="info">{{ item.category }}</el-tag>
              <span class="result-desc">{{ item.description }}</span>
            </div>
          </div>
        </el-popover>
      </div>
      <div class="header-right">
        <el-tooltip :content="isDark ? '切换浅色' : '切换深色'">
          <el-button :icon="isDark ? Sunny : Moon" circle @click="toggle" />
        </el-tooltip>
      </div>
    </el-header>

    <el-container class="main-container">
      <!-- 侧边栏 -->
      <el-aside width="220px" class="app-aside">
        <el-scrollbar>
          <el-menu
            :router="true"
            :default-active="$route.path"
            class="side-menu"
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
      <el-main class="app-main">
        <el-scrollbar>
          <router-view />
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

.app-container {
  height: 100vh;
  overflow: hidden;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid var(--el-border-color);
  background: var(--el-bg-color);
  padding: 0 24px;
  height: 60px !important;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left { flex-shrink: 0; }

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--el-text-color-primary);
  font-weight: 600;
  font-size: 16px;
}

.logo-icon { font-size: 20px; }

.header-center {
  flex: 1;
  max-width: 400px;
}

.search-input { width: 100%; }

.header-right { flex-shrink: 0; }

.main-container {
  height: calc(100vh - 60px);
  overflow: hidden;
}

.app-aside {
  border-right: 1px solid var(--el-border-color);
  background: var(--el-bg-color);
  overflow: hidden;
}

.side-menu {
  border-right: none;
  height: 100%;
}

.app-main {
  padding: 0;
  overflow: hidden;
}

.app-main .el-scrollbar__view {
  padding: 32px;
  min-height: 100%;
}

.search-results {
  max-height: 360px;
  overflow-y: auto;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.15s;
}

.search-result-item:hover {
  background: var(--el-fill-color-light);
}

.result-name {
  font-weight: 600;
  min-width: 80px;
}

.result-desc {
  color: var(--el-text-color-secondary);
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-empty {
  padding: 24px;
  text-align: center;
  color: var(--el-text-color-secondary);
}
</style>
