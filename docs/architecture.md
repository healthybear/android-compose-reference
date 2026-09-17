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

技术栈：Vue 3 + Element Plus 2.9 + UnoCSS（原子样式）+ Shiki（代码高亮）

版本边界：页面文档面向 Android Jetpack Compose，当前目标版本为 Compose BOM `2026.02.00`（UI `1.10.3`）；交互预览运行在 Compose Multiplatform/Wasm（Compose Multiplatform `1.8.0`、Kotlin `2.1.10`）。两套版本分别维护，升级时需分别验证。

```
src/
├── App.vue               # 布局外壳：Header + 可收缩侧边栏 + 主内容区
├── main.ts               # 入口，注册 Element Plus / Router / Pinia，引入 virtual:uno.css
├── router/index.ts       # Hash 路由：首页、组件详情、指南列表与指南详情
├── data/
│   ├── types.ts          # ComponentEntry 等类型定义
│   ├── guides/index.ts   # 快速上手指南数据
│   └── components/
│       ├── index.ts      # 汇总入口：componentGroups、composeVersion、wasmRuntimeVersion、sampleComponents
│       ├── foundation/   # 基础组件（Text、Image、Icon、Canvas）
│       ├── layout/       # 布局（Column、Row、Box、Spacer、FlowRow、FlowColumn 等）
│       ├── lazy-list/    # 列表与网格（LazyColumn、LazyRow、Grid、Pager 等）
│       ├── modifier/     # Modifier（size、padding、background、clickable 等）
│       ├── theme/        # 主题（MaterialTheme、ColorScheme、Typography、Shapes）
│       ├── material/     # Material 组件（Button 等）
│       ├── form/         # 表单（TextField、Checkbox、Switch、Slider 等）
│       └── ...           # 反馈、导航、动画、手势、状态、进阶、生态集成
├── composables/
│   ├── useTheme.ts       # 亮/暗主题，持久化到 localStorage
│   ├── useSearch.ts      # 内存搜索，匹配 name / description / tags / category
│   └── useRelatedComponents.ts # 按标签计算相关组件
├── components/
│   ├── CodeBlock.vue     # Shiki 代码高亮（Kotlin），支持复制
│   ├── ParamsTable.vue   # 参数说明表格
│   └── WasmDemo.vue      # iframe 嵌入 Wasm Demo，postMessage 同步主题
└── pages/
    ├── HomePage.vue      # 组件卡片网格，按分类分组
    ├── ComponentPage.vue # 组件详情：参数表 + 代码示例 + 交互预览
    ├── GuidesPage.vue    # 快速上手指南列表
    └── GuideDetailPage.vue # 指南正文、前后导航和相关组件
```

每个分类目录下有独立的 `index.ts` 导出该分类的组件数组，由顶层 `components/index.ts` 统一聚合到 `sampleComponents`。

## Kotlin/Wasm（compose-demos/）

所有 Demo 编译为**单个 Wasm 模块**，通过 URL 参数 `?demo=xxx` 区分展示哪个 Demo。

```
src/wasmJsMain/kotlin/
├── Main.kt               # 入口：读取 ?demo= 参数，路由到对应 Demo，注入中文字体
└── demos/
    ├── DemoRegistry.kt   # Demo ID 到 Composable 的集中注册表
    ├── ButtonDemo.kt
    ├── TextDemo.kt
    └── ...               # 当前共 85 个已注册 Demo
src/commonMain/composeResources/
└── font/
    └── NotoSansSC-Regular.otf   # 中文字体，通过 Res.font 加载注入 MaterialTheme
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
| `/#/guide` | 快速上手指南列表 |
| `/#/guide/:id` | 指南详情页 |
