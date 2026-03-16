<script setup lang="ts">
/**
 * 应用主布局组件
 *
 * 功能：
 * 1. 响应式布局：桌面端侧边栏 + 移动端抽屉
 * 2. 顶部导航栏：搜索、主题切换、版本信息
 * 3. 侧边栏：组件分组导航
 * 4. 路由切换时自动滚动到顶部
 */
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Search, Moon, Sunny, HomeFilled, Fold, Expand, Reading, Close } from '@element-plus/icons-vue'
import { useTheme } from '@/composables/useTheme'
import { useSearch } from '@/composables/useSearch'
import { allComponents, componentGroups, composeVersion } from '@/data/components'

const router = useRouter()
const route = useRoute()
const { isDark, toggle } = useTheme()
const { query, results } = useSearch()

const searchVisible = ref(false)
const collapsed = ref(false)
const mainScrollbar = ref()

// 移动端侧边栏抽屉状态
const isMobile = ref(false)       // 是否为移动端（宽度 < 768px）
const drawerOpen = ref(false)     // 抽屉是否打开

// 检测是否为移动端
// 移动端自动折叠侧边栏，改用抽屉模式
function checkMobile() {
  isMobile.value = window.innerWidth < 768
  if (isMobile.value) collapsed.value = true  // 移动端强制折叠
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => window.removeEventListener('resize', checkMobile))

// 路由切换时的处理
watch(() => route.path, () => {
  mainScrollbar.value?.setScrollTop(0)        // 滚动到顶部
  if (isMobile.value) drawerOpen.value = false  // 移动端自动关闭抽屉
})

function goToComponent(id: string) {
  searchVisible.value = false
  query.value = ''
  router.push(`/component/${id}`)
}

function groupComponents(categories: string[]) {
  return allComponents.filter(c => categories.includes(c.category))
}

// 切换侧边栏显示状态
// 桌面端：折叠/展开侧边栏
// 移动端：打开/关闭抽屉
function toggleSidebar() {
  if (isMobile.value) {
    drawerOpen.value = !drawerOpen.value
  } else {
    collapsed.value = !collapsed.value
  }
}
</script>

<template>
  <el-container class="h-screen overflow-hidden">
    <!-- 顶部 Header -->
    <el-header class="flex items-center justify-between gap-2 md:gap-4 w-full">
      <div class="flex items-center gap-2 flex-shrink-0">
        <el-button :icon="isMobile ? (drawerOpen ? Close : Expand) : (collapsed ? Expand : Fold)" text circle @click="toggleSidebar" />
        <router-link to="/" class="flex items-center gap-2 no-underline text-el-text font-semibold text-base">
          <span class="text-xl">🚀</span>
          <span class="hidden sm:inline">Compose 速查</span>
        </router-link>
        <el-tooltip placement="bottom" class="hidden md:inline-flex">
          <template #content>
            <div class="text-xs leading-6">
              <div>Compose BOM &nbsp;<b>{{ composeVersion.bom }}</b></div>
              <div>UI &nbsp;<b>{{ composeVersion.ui }}</b></div>
              <div>Material3 &nbsp;<b>{{ composeVersion.material3 }}</b></div>
              <div>Runtime &nbsp;<b>{{ composeVersion.runtime }}</b></div>
              <div>Foundation &nbsp;<b>{{ composeVersion.foundation }}</b></div>
            </div>
          </template>
          <el-tag size="small" type="info" class="cursor-default select-none hidden md:inline-flex">
            BOM {{ composeVersion.bom }}
          </el-tag>
        </el-tooltip>
      </div>
      <div class="flex-1 max-w-[400px]">
        <el-popover
          v-model:visible="searchVisible"
          placement="bottom"
          :width="isMobile ? 300 : 480"
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
              <el-tag size="small" type="info" class="hidden sm:inline-flex">{{ item.category }}</el-tag>
              <span class="text-el-text-secondary text-[13px] overflow-hidden text-ellipsis whitespace-nowrap">{{ item.description }}</span>
            </div>
          </el-scrollbar>
        </el-popover>
      </div>
      <div class="flex-shrink-0">
        <el-button :icon="isDark ? Sunny : Moon" circle @click="toggle" />
      </div>
    </el-header>

    <el-container class="h-[calc(100vh-60px)] overflow-hidden relative">
      <!-- 移动端遮罩 -->
      <Transition name="fade">
        <div
          v-if="isMobile && drawerOpen"
          class="absolute inset-0 bg-black/40 z-10"
          @click="drawerOpen = false"
        />
      </Transition>

      <!-- 侧边栏（桌面端正常流，移动端绝对定位抽屉） -->
      <Transition name="slide">
        <el-aside
          v-show="!isMobile || drawerOpen"
          :width="isMobile ? '240px' : (collapsed ? '64px' : '220px')"
          :class="[
            'border-r border-el-border bg-el-bg overflow-hidden transition-[width] duration-300',
            isMobile ? 'absolute top-0 left-0 h-full z-20 shadow-xl' : ''
          ]"
        >
          <el-scrollbar>
            <el-menu
              :router="true"
              :default-active="$route.path.startsWith('/guide') ? '/guide' : $route.path"
              :collapse="!isMobile && collapsed"
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
      </Transition>

      <!-- 主内容区 -->
      <el-main class="!p-0 overflow-hidden">
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
</style>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform 0.25s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }
</style>
