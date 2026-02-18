# 架构说明

## 整体结构

```
AndroidComposeReference/
├── web/                  # Vue 3 + Vite 前端
├── compose-demos/        # Kotlin/Wasm Demo（Compose Multiplatform）
├── docs/                 # 项目文档
├── pnpm-workspace.yaml
└── package.json
```

## 前端（web/）

```
src/
├── App.vue               # 布局外壳：Header + 侧边栏 + 主内容区
├── main.ts               # 入口，注册 Element Plus / Router / Pinia
├── router/index.ts       # Hash 路由：/ 首页，/component/:id 详情页
├── data/
│   ├── types.ts          # ComponentEntry 等类型定义
│   └── components/
│       └── index.ts      # 所有组件条目数据（用户在此添加内容）
├── composables/
│   ├── useTheme.ts       # 亮/暗主题，持久化到 localStorage
│   └── useSearch.ts      # 内存搜索，匹配 name / description / tags / category
├── components/
│   ├── CodeBlock.vue     # Shiki 代码高亮（Kotlin），支持复制
│   ├── ParamsTable.vue   # 参数说明表格
│   └── WasmDemo.vue      # iframe 嵌入 Wasm Demo，postMessage 同步主题
└── pages/
    ├── HomePage.vue      # 组件卡片网格，按分类分组
    └── ComponentPage.vue # 组件详情：参数表 + 代码示例 + 交互预览
```

## Kotlin/Wasm（compose-demos/）

所有 Demo 编译为**单个 Wasm 模块**，通过 URL 参数 `?demo=xxx` 区分展示哪个 Demo。

```
src/wasmJsMain/kotlin/
├── Main.kt               # 入口：读取 ?demo= 参数，路由到对应 Demo
└── demos/
    ├── ButtonDemo.kt
    └── TextDemo.kt
```

`Main.kt` 同时监听来自 Vue 的 `postMessage`，实现主题同步：

```
Vue (isDark 变化)
  → iframe.contentWindow.postMessage({ type: 'theme', dark: true })
    → Kotlin 监听 window message 事件
      → 切换 MaterialTheme colorScheme
```

## 自动集成流程

```
./gradlew wasmJsBrowserDistribution
  → 编译 Kotlin/Wasm
  → Gradle Copy 任务自动触发
    → 产物复制到 web/public/demos/
      → Vite dev server 直接提供静态文件
```

## 路由设计

使用 Hash 模式（`createWebHashHistory`），方便部署到任意静态托管（GitHub Pages、Nginx 等）无需服务端配置。

| 路径 | 页面 |
|------|------|
| `/#/` | 首页，组件卡片网格 |
| `/#/component/:id` | 组件详情页 |
