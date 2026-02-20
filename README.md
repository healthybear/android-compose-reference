# Jetpack Compose 速查站

一个面向 Android 开发者的 Jetpack Compose 学习与速查工具，帮助你快速熟悉 Kotlin 语法和 Compose UI 开发。

- **组件速查**：涵盖 Layout、Material3、Foundation、Animation、Gestures、State、Navigation 等分类，每个组件附带参数说明与代码示例
- **快速上手指南**：从环境搭建到导航、状态管理、主题、语义无障碍等 9 篇系统性教程
- **交互预览**：部分组件内嵌 Compose Multiplatform (Kotlin/Wasm) 实时演示
- **相关组件推荐**：基于 tag 相似度自动推荐关联组件
- **全文搜索**：按组件名、分类、关键词即时过滤
- **深色模式 / 响应式**：支持桌面、平板、手机

## 技术栈

| 层 | 技术 |
|---|---|
| 前端框架 | Vue 3 + TypeScript + Vite |
| UI 组件库 | Element Plus 2.9 |
| 样式 | UnoCSS (Tailwind 兼容语法) |
| 路由 | Vue Router 4 (Hash 模式) |
| 代码高亮 | Shiki (github-light / github-dark) |
| 交互预览 | Compose Multiplatform / Kotlin Wasm |

## 项目结构

```
AndroidComposeReference/
├── web/                        Vue 3 前端
│   └── src/
│       ├── data/
│       │   ├── components/     组件数据（按分类分目录）
│       │   │   ├── layout/
│       │   │   ├── material/
│       │   │   ├── foundation/
│       │   │   ├── animation/
│       │   │   ├── gestures/
│       │   │   ├── state/
│       │   │   ├── navigation/
│       │   │   └── ...
│       │   ├── guides/         快速上手指南数据
│       │   └── types.ts        数据类型定义
│       ├── pages/              路由页面
│       ├── components/         通用组件（CodeBlock、ParamsTable 等）
│       ├── composables/        组合式函数（搜索、主题、相关组件）
│       └── router/
├── compose-demos/              Kotlin/Wasm 交互 Demo 源码
└── docs/                       架构与开发文档
```

## 快速开始

### 前置要求

- Node.js 18+，pnpm（`npm i -g pnpm`）
- 编译 Wasm Demo 还需要 JDK 17+

### 启动开发服务器

```bash
pnpm install
pnpm dev
```

访问 http://localhost:5173

**局域网访问**（手机/平板调试）：`vite.config.ts` 已配置 `server.host: true`，启动后终端会打印 `Network: http://192.168.x.x:5173`，同局域网设备直接访问该地址即可。

### 编译 Compose Wasm Demo（可选）

```bash
cd compose-demos

# Windows
./gradlew.bat wasmJsBrowserDistribution

# macOS / Linux
./gradlew wasmJsBrowserDistribution
```

产物自动复制到 `web/public/demos/`，刷新页面即可看到交互预览。

### 生产构建

```bash
pnpm build:demos   # 编译 Wasm（需要 JDK）
pnpm build:web     # 打包 Vue
```

---

## 开发指南

### 添加组件条目

在对应分类目录（如 [web/src/data/components/lazy-list/](web/src/data/components/lazy-list/)）新建文件：

```ts
// web/src/data/components/lazy-list/lazy-column.ts
import type { ComponentEntry } from '../../types'

export const lazyColumnEntry: ComponentEntry = {
  id: 'lazy-column',
  name: 'LazyColumn',
  category: 'LazyList',
  description: '只渲染可见区域的垂直滚动列表，适合大量数据场景。',
  tags: ['lazy', 'list', 'scroll', 'recyclerview'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    {
      name: 'content',
      type: 'LazyListScope.() -> Unit',
      required: true,
      description: '列表内容，使用 items / item 构建',
    },
  ],
  examples: [
    {
      title: '基础用法',
      code: `LazyColumn {
    items(100) { index ->
        Text("Item ${'$'}index")
    }
}`,
    },
  ],
}
```

然后在该分类的 `index.ts` 中引入并加入数组，保存后 Vite 热更新立即生效。

### 添加 Compose 交互 Demo

**第一步**：新建 Kotlin 文件 `compose-demos/src/wasmJsMain/kotlin/demos/LazyColumnDemo.kt`：

```kotlin
@Composable
fun LazyColumnDemo() {
    LazyColumn(modifier = Modifier.fillMaxSize()) {
        items(30) { i -> Text("Item $i", modifier = Modifier.padding(12.dp)) }
    }
}
```

**第二步**：在 `Main.kt` 的 `when` 分支里注册：

```kotlin
"lazy-column" -> LazyColumnDemo()
```

**第三步**：组件数据加上 `demoId: 'lazy-column'`，重新编译即可。

### 添加快速上手指南

编辑 [web/src/data/guides/index.ts](web/src/data/guides/index.ts)，按 `GuideEntry` 类型追加一条记录，`steps` 数组中每一步支持 `code`（Kotlin 代码块）、`tip`（提示文字）、`previewUrl`（iframe 预览链接）字段。

---

## 常见问题

### gradle-wrapper.jar 缺失

**报错**：`错误: 找不到或无法加载主类 org.gradle.wrapper.GradleWrapperMain`

`gradle-wrapper.jar` 未提交到仓库，手动下载：

```bash
# 查看所需版本
cat compose-demos/gradle/wrapper/gradle-wrapper.properties | grep distributionUrl

# 下载（以 8.11.1 为例）
curl -L "https://github.com/gradle/gradle/raw/v8.11.1/gradle/wrapper/gradle-wrapper.jar" \
  -o compose-demos/gradle/wrapper/gradle-wrapper.jar
```

### 编译内存不足

`compose-demos/gradle.properties` 中已配置 `-Xmx2g`，内存充足时可改为 `-Xmx4g`。

### Compose Wasm 中文不显示

项目已将 Noto Sans SC 字体打包进 `compose-demos/src/commonMain/composeResources/font/`，通过 `Res.font` 加载并注入 `MaterialTheme`。如需更换字体，替换该目录下的 `.otf` 文件并更新 `Main.kt` 中的引用名称，重新编译即可。
