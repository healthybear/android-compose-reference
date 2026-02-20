# Compose Demo 进度表

每个 Demo 对应 `compose-demos/src/wasmJsMain/kotlin/demos/` 下一个 `.kt` 文件，
并在 `Main.kt` 的 `when` 分支中注册，组件数据里加上 `demoId`。

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
| [-] | — | — | PullToRefresh：下拉刷新手势在 Wasm Canvas 中受限，跳过 |

---

## Navigation

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `TopAppBarDemo.kt` | `top-app-bar` | 标题居中、navigationIcon、actions |
| [x] | `BottomAppBarDemo.kt` | `bottom-app-bar` | 底部操作栏 + FAB |
| [x] | `NavigationDrawerDemo.kt` | `navigation-drawer` | 侧边抽屉开关、选中项高亮 |
| [x] | `PermanentNavigationDrawerDemo.kt` | `permanent-navigation-drawer` | 常驻侧边栏 |

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
| [-] | — | — | CollectAsState：需要 ViewModel/Flow，Wasm 中用 produceState 替代演示，跳过 |

---

## Advanced

| 状态 | Demo 文件 | demoId | 演示要点 |
|------|-----------|--------|---------|
| [x] | `CompositionLocalDemo.kt` | `composition-local` | 自定义 LocalColor，子组件读取 |
| [x] | `CustomLayoutDemo.kt` | `custom-layout` | Layout 自定义测量/放置（瀑布流简版） |
| [x] | `SubcomposeLayoutDemo.kt` | `subcompose-layout` | 先测量内容再决定容器尺寸 |
| [x] | `DrawModifierDemo.kt` | `draw-modifier` | drawBehind / drawWithContent 自定义绘制 |
| [x] | `BrushDemo.kt` | `brush` | linearGradient / radialGradient / sweepGradient |

---

## Ecosystem

| 状态 | 说明 |
|------|------|
| [-] | CoilAsyncImage — 依赖网络图片加载库，Wasm 中无法使用，跳过 |
| [-] | NavigationCompose — 路由系统，Wasm 单页无法演示，跳过 |
| [-] | Lottie — 依赖 .json 动画文件和 Android 库，跳过 |

---

## 汇总

- 总计需要新建 Demo：**62 个**
- 已完成（需增强）：**2 个**（ButtonDemo、TextDemo）
- 已完成（新建）：**60 个**
- 跳过：**8 个**
