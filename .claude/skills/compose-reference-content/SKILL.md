---
name: compose-reference-content
description: >
  专门用于向本项目 Jetpack Compose 速查站填充组件内容数据的 skill。
  当用户需要以下操作时触发：
  (1) 添加新的 Compose 组件条目（如"帮我加一个 LazyColumn 的数据"）
  (2) 补充或修改组件的参数、示例、描述（如"给 Button 加几个示例"）
  (3) 批量生成某个分类的组件数据（如"把 Material3 的基础组件都加上"）
  (4) 询问某个 Compose 组件的 API（如"Scaffold 有哪些参数"）
  数据写入位置：web/src/data/components/index.ts，类型定义见 web/src/data/types.ts
---

# Compose 速查站内容填充

## 数据结构（必须严格遵守）

```ts
// web/src/data/types.ts
interface ComponentEntry {
  id: string          // kebab-case，如 "lazy-column"
  name: string        // 组件名，如 "LazyColumn"
  category: string    // 见下方分类表
  description: string // 一句话，说清楚用途
  params: ComponentParam[]
  examples: CodeExample[]
  demoId?: string     // 有 Wasm Demo 时填写，与 id 保持一致
  tags: string[]      // 搜索关键词，3-6 个
}

interface ComponentParam {
  name: string
  type: string        // Kotlin 类型，完整写法
  default?: string    // 有默认值时填写
  description: string
  required?: boolean  // 无默认值的必填参数设为 true
}

interface CodeExample {
  title: string       // 简短标题，如"基础用法"、"带状态"
  code: string        // Kotlin 代码，缩进用 4 空格
  description?: string
}
```

## 分类表

| category | 包含组件 |
|----------|---------|
| `Foundation` | Text, Image, Icon, Canvas, BasicText |
| `Layout` | Column, Row, Box, BoxWithConstraints, ConstraintLayout, LazyColumn, LazyRow, LazyVerticalGrid, LazyHorizontalGrid, FlowRow, FlowColumn, Spacer |
| `Material` | Button, OutlinedButton, TextButton, FilledTonalButton, ElevatedButton, IconButton, FloatingActionButton, Chip, Card, ListItem, NavigationBar, NavigationRail, NavigationDrawer, TopAppBar, BottomAppBar, Scaffold, ModalBottomSheet, AlertDialog, Snackbar, Badge, Divider, ProgressIndicator |
| `Text Input` | TextField, OutlinedTextField, BasicTextField, SearchBar |
| `Selection` | Checkbox, RadioButton, Switch, Slider, RangeSlider |
| `Animation` | AnimatedVisibility, AnimatedContent, Crossfade, animate*AsState, Transition, InfiniteTransition |
| `Gestures` | Modifier.clickable, Modifier.draggable, Modifier.swipeable, Modifier.transformable, detectTapGestures |
| `State` | remember, rememberSaveable, derivedStateOf, produceState, collectAsState, LaunchedEffect, SideEffect, DisposableEffect |

## 写入位置

文件：`web/src/data/components/index.ts`

在 `sampleComponents` 数组末尾追加，保持同一数组，不要新建变量。

## 代码质量要求

- Kotlin 代码示例必须可直接运行，import 不写（速查站只展示核心代码）
- 每个组件至少 2 个示例：基础用法 + 1 个进阶/常见场景
- 参数只列核心参数（5-10 个），不要把所有重载都列出
- `required: true` 只用于没有默认值且调用时必须传的参数
- tags 包含：组件名小写、功能关键词、对应的 View 系统类比（如 recyclerview）

## 详细 API 参考

需要某个组件完整 API 时，读取对应参考文件：

- Layout 类（Column/Row/Box/Lazy 系列）：[references/layout-apis.md](references/layout-apis.md)
- Material3 组件（Button/Card/Scaffold 等）：[references/material3-apis.md](references/material3-apis.md)
- 修饰符 Modifier：[references/modifier-apis.md](references/modifier-apis.md)
