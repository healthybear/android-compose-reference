# Compose Demo 进度表

每个 Demo 对应 `compose-demos/src/wasmJsMain/kotlin/demos/` 下一个 `.kt` 文件，
在 `DemoRegistry.kt` 中注册，并在组件数据的 `demo` 字段中声明 `id` 和 `sourceFile`。
运行 `pnpm run validate:demos` 可以检查三者及本文档中已完成条目、汇总数字是否一致。

图例：`[ ]` 待做 · `[x]` 已完成 · `[-]` 跳过（不适合 Wasm 演示）

---

## Foundation

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `TextDemo.kt` | `text` | Typography 体系 / 字重字号 / 颜色 / 装饰 / AnnotatedString / 溢出 / 对齐 |
| [x] | `ImageDemo.kt` | `image` | ContentScale 各模式对比、clip 圆形、tint |
| [x] | `IconDemo.kt` | `icon` | 常用 Material 图标、不同尺寸与颜色 |
| [x] | `CanvasDemo.kt` | `canvas` | drawRect / drawCircle / drawLine / Path 绘制 |

---

## Layout

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `ColumnDemo.kt` | `column` | verticalArrangement 各值对比、horizontalAlignment |
| [x] | `RowDemo.kt` | `row` | horizontalArrangement 各值对比、verticalAlignment |
| [x] | `BoxDemo.kt` | `box` | contentAlignment 九宫格、多层叠加 |
| [x] | `BoxWithConstraintsDemo.kt` | `box-with-constraints` | 根据 maxWidth 切换单/双列布局 |
| [x] | `SpacerDemo.kt` | `spacer` | 固定间距 vs weight 填充 |
| [x] | `FlowRowDemo.kt` | `flow-row` | 自动换行、horizontalArrangement、maxItemsInEachRow |
| [x] | `FlowColumnDemo.kt` | `flow-column` | 自动换列、verticalArrangement |

---

## LazyList

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `LazyColumnDemo.kt` | `lazy-column` | 100 条数据滚动、stickyHeader、itemsIndexed |
| [x] | `LazyRowDemo.kt` | `lazy-row` | 横向滚动卡片列表 |
| [x] | `LazyVerticalGridDemo.kt` | `lazy-vertical-grid` | GridCells.Fixed vs Adaptive |
| [x] | `LazyHorizontalGridDemo.kt` | `lazy-horizontal-grid` | 横向网格 |
| [x] | `HorizontalPagerDemo.kt` | `horizontal-pager` | 左右翻页 + 页码指示器 |
| [x] | `VerticalPagerDemo.kt` | `vertical-pager` | 上下翻页 |

---

## Modifier

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `ModifierSizeDemo.kt` | `modifier-size` | fillMaxSize / fillMaxWidth / size(dp) / wrapContentSize |
| [x] | `ModifierPaddingDemo.kt` | `modifier-padding` | all / horizontal+vertical / 各边单独设置 |
| [x] | `ModifierBackgroundDemo.kt` | `modifier-background` | 纯色、RoundedCorner、Brush 渐变背景 |
| [x] | `ModifierClickableDemo.kt` | `modifier-clickable` | 点击计数、ripple、combinedClickable 长按 |
| [x] | `ModifierOffsetDemo.kt` | `modifier-offset` | 滑块拖动改变 offset |
| [x] | `ModifierScrollDemo.kt` | `modifier-scroll` | verticalScroll / horizontalScroll |
| [x] | `ModifierAlphaDemo.kt` | `modifier-alpha` | 透明度控制（0f-1f）、禁用状态视觉反馈 |
| [x] | `ModifierAnimateContentSizeDemo.kt` | `modifier-animate-content-size` | 内容大小变化自动动画 |
| [x] | `ModifierWeightDemo.kt` | `modifier-weight` | Row/Column 中按权重分配空间 |
| [x] | `ModifierPointerInputDemo.kt` | `modifier-pointer-input` | 检测点击、长按、双击手势 |
| [-] | `ModifierSemanticsDemo.kt` | — | 无障碍属性无法在 Wasm 中直观演示，跳过 |

---

## Theme

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `MaterialThemeDemo.kt` | `material-theme` | 亮/暗色切换（已有 postMessage 机制）、colorScheme 色块展示 |
| [x] | `ColorSchemeDemo.kt` | `color-scheme` | primary / secondary / surface / error 等色块 |
| [x] | `TypographyDemo.kt` | `typography` | displayLarge → labelSmall 全部样式展示 |
| [x] | `ShapesDemo.kt` | `shapes` | ExtraSmall → ExtraLarge 圆角对比 |

---

## Material — 按钮

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `ButtonDemo.kt` | `button` | 五种样式 / 禁用+加载中 / 交互计数 / 切换状态 / FAB 系列 |
| [x] | `OutlinedButtonDemo.kt` | `outlined-button` | 正常/禁用/带图标 |
| [x] | `TextButtonDemo.kt` | `text-button` | 正常/禁用/带图标 |
| [x] | `FilledTonalButtonDemo.kt` | `filled-tonal-button` | 正常/禁用/带图标 |
| [x] | `ElevatedButtonDemo.kt` | `elevated-button` | 正常/禁用/带图标 |
| [x] | `IconButtonDemo.kt` | `icon-button` | IconButton / FilledIconButton / OutlinedIconButton |
| [x] | `FabDemo.kt` | `floating-action-button` | Small / Regular / Large FAB |
| [x] | `ExtendedFabDemo.kt` | `extended-fab` | 展开/收起文字动画 |

---

## Material — Chip

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `AssistChipDemo.kt` | `assist-chip` | 带图标、禁用 |
| [x] | `FilterChipDemo.kt` | `filter-chip` | 多选状态切换 |
| [x] | `InputChipDemo.kt` | `input-chip` | 可删除标签列表 |
| [x] | `SuggestionChipDemo.kt` | `suggestion-chip` | 搜索建议列表 |

---

## Material — 卡片 & 列表

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `CardDemo.kt` | `card` | 可点击卡片、内容布局 |
| [x] | `ElevatedCardDemo.kt` | `elevated-card` | 阴影层级对比 |
| [x] | `OutlinedCardDemo.kt` | `outlined-card` | 边框卡片 |
| [x] | `BadgeDemo.kt` | `badge` | 数字角标、红点角标 |
| [x] | `ListItemDemo.kt` | `list-item` | leadingContent / trailingContent / 多行文本 |
| [x] | `HorizontalDividerDemo.kt` | `horizontal-divider` | 分隔线、缩进 |

---

## Material — 菜单

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `DropdownMenuDemo.kt` | `dropdown-menu` | 点击按钮弹出菜单、选中关闭 |
| [x] | `ExposedDropdownMenuDemo.kt` | `exposed-dropdown-menu` | 下拉选择框 |

---

## Form

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `TextFieldDemo.kt` | `text-field` | label / placeholder / error / trailingIcon / 字数统计 |
| [x] | `OutlinedTextFieldDemo.kt` | `outlined-text-field` | 同上，Outlined 样式 |
| [x] | `CheckboxDemo.kt` | `checkbox` | 单选、全选/半选（indeterminate） |
| [x] | `RadioButtonDemo.kt` | `radio-button` | 单选组 |
| [x] | `SwitchDemo.kt` | `switch` | 开关切换、带图标 thumbContent |
| [x] | `SliderDemo.kt` | `slider` | 连续值、steps 离散值、显示当前值 |
| [x] | `RangeSliderDemo.kt` | `range-slider` | 区间选择 |
| [-] | — | — | FocusRequester / KeyboardOptions：键盘行为在浏览器中无法完整演示，跳过 |

---

## Feedback

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `AlertDialogDemo.kt` | `alert-dialog` | 确认/取消弹窗 |
| [x] | `BasicAlertDialogDemo.kt` | `basic-alert-dialog` | 自定义内容弹窗 |
| [x] | `SnackbarDemo.kt` | `snackbar` | 带 Action 的 Snackbar、自动消失 |
| [x] | `CircularProgressDemo.kt` | `circular-progress` | 不确定进度 + 确定进度动画 |
| [x] | `LinearProgressDemo.kt` | `linear-progress` | 不确定进度 + 确定进度动画 |
| [x] | `SwipeToDismissDemo.kt` | `swipe-to-dismiss` | 左滑删除列表项 |
| [x] | `TooltipDemo.kt` | `tooltip` | 悬浮提示组件 |
| [x] | `ModalBottomSheetDemo.kt` | `modal-bottom-sheet` | 从底部弹出的模态对话框 |
| [-] | — | — | PullToRefresh：下拉刷新手势在 Wasm Canvas 中受限，跳过 |

---

## Navigation

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `TopAppBarDemo.kt` | `top-app-bar` | 标题居中、navigationIcon、actions |
| [x] | `CenterAlignedTopAppBarDemo.kt` | `center-aligned-top-app-bar` | 标题居中的顶部应用栏 |
| [x] | `MediumTopAppBarDemo.kt` | `medium-top-app-bar` | 中等大小标题的顶部应用栏 |
| [x] | `LargeTopAppBarDemo.kt` | `large-top-app-bar` | 大标题顶部应用栏，支持滚动折叠 |
| [x] | `BottomAppBarDemo.kt` | `bottom-app-bar` | 底部操作栏 + FAB |
| [x] | `NavigationDrawerDemo.kt` | `navigation-drawer` | 侧边抽屉开关、选中项高亮 |
| [x] | `PermanentNavigationDrawerDemo.kt` | `permanent-navigation-drawer` | 常驻侧边栏 |
| [x] | `NavigationRailDemo.kt` | `navigation-rail` | 垂直导航栏，适合平板设备 |

---

## Animation

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `AnimatedVisibilityDemo.kt` | `animated-visibility` | 淡入淡出、滑入滑出、自定义 enter/exit |
| [x] | `AnimatedContentDemo.kt` | `animated-content` | 内容切换动画（数字递增） |
| [x] | `CrossfadeDemo.kt` | `crossfade` | 两个内容之间淡入淡出切换 |
| [x] | `AnimateAsStateDemo.kt` | `animate-as-state` | 点击改变大小/颜色，平滑过渡 |
| [x] | `UpdateTransitionDemo.kt` | `update-transition` | 多属性联动过渡（颜色+尺寸） |
| [x] | `InfiniteTransitionDemo.kt` | `infinite-transition` | 无限循环脉冲/旋转动画 |

---

## Gestures

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `DraggableDemo.kt` | `modifier-draggable` | 水平/垂直拖动滑块 |
| [x] | `TransformableDemo.kt` | `modifier-transformable` | 双指缩放+旋转（鼠标模拟） |
| [x] | `DetectTapGesturesDemo.kt` | `detect-tap-gestures` | 单击/双击/长按分别触发不同反馈 |
| [x] | `DetectDragGesturesDemo.kt` | `detect-drag-gestures` | 自由拖拽方块，显示坐标 |
| [-] | — | — | SwipeableV2：已废弃且依赖 Material 实验性 API，跳过 |

---

## State

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `RememberDemo.kt` | `remember` | 计数器，对比有/无 remember 的重组行为 |
| [x] | `DerivedStateOfDemo.kt` | `derived-state-of` | 列表过滤，derivedStateOf 避免多余重组 |
| [x] | `LaunchedEffectDemo.kt` | `launched-effect` | key 变化触发协程（倒计时） |
| [x] | `SideEffectDemo.kt` | `side-effect` | 每次重组同步外部计数器 |
| [x] | `DisposableEffectDemo.kt` | `disposable-effect` | 模拟订阅/取消订阅生命周期 |
| [x] | `ProduceStateDemo.kt` | `produce-state` | 模拟异步加载（delay + 状态切换） |
| [x] | `RememberCoroutineScopeDemo.kt` | `remember-coroutine-scope` | 响应用户交互启动协程 |
| [x] | `SnapshotFlowDemo.kt` | `snapshot-flow` | 将 Compose 状态转换为 Kotlin Flow |
| [-] | — | — | CollectAsState：需要 ViewModel/Flow，Wasm 中用 produceState 替代演示，跳过 |

---

## Advanced

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `CompositionLocalDemo.kt` | `composition-local` | 自定义 LocalColor，子组件读取 |
| [x] | `LocalContentColorDemo.kt` | `local-content-color` | LocalContentColor 内容颜色继承 |
| [x] | `CustomLayoutDemo.kt` | `custom-layout` | Layout 自定义测量/放置（瀑布流简版） |
| [x] | `SubcomposeLayoutDemo.kt` | `subcompose-layout` | 先测量内容再决定容器尺寸 |
| [x] | `DrawModifierDemo.kt` | `draw-modifier` | drawBehind / drawWithContent 自定义绘制 |
| [x] | `BrushDemo.kt` | `brush` | linearGradient / radialGradient / sweepGradient |

---

## Composition

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `FormCompositionDemo.kt` | `form-composition` | 完整注册表单（验证、加载、反馈） |
| [x] | `SearchBarCompositionDemo.kt` | `search-bar-composition` | 实时搜索（防抖、历史记录） |
| [x] | `ListWithDialogCompositionDemo.kt` | `list-with-dialog-composition` | 任务列表管理（展开、对话框、删除确认） |
| [x] | `SettingsScreenCompositionDemo.kt` | `settings-screen-composition` | 完整设置页面（Switch、Slider、Dialog） |
| [x] | `OnboardingCompositionDemo.kt` | `onboarding-composition` | 应用引导流程（HorizontalPager、页面指示器） |

---

## Ecosystem

| 状态 | 说明 |
|------|------|
| [-] | CoilAsyncImage — 依赖网络图片加载库，Wasm 中无法使用，跳过 |
| [-] | NavigationCompose — 路由系统，Wasm 单页无法演示，跳过 |
| [-] | Lottie — 依赖 .json 动画文件和 Android 库，跳过 |

---

## 汇总

- 组件文档条目：**127**
- 已完成并注册 Demo：**103**
- 明确跳过项：**8**
- 交互预览覆盖：**103 / 127**（约 81.1%）

> 统计口径：组件数来自 Web 组件数据；Demo 数以组件 `demo` 元数据、`DemoRegistry.kt`、Kotlin 源文件和上方 `[x]` 表格四方一致为准。`pnpm run validate:demos` 会在任一处遗漏或汇总数字过期时失败。
