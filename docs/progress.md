# Compose 速查站 — 开发进度表

> 数据文件按分类拆分到 `web/src/data/components/<category>/` 各子目录，每个分类有独立的 `index.ts`，由顶层 `components/index.ts` 统一聚合。

---

## 基础设施（已完成）

| 项目 | 文件 | 说明 |
|------|------|------|
| 类型定义 | `web/src/data/types.ts` | `ComponentCategory`（14个）、`ComponentGroup`、`ComposeVersion` |
| 分组配置 | `web/src/data/components/index.ts` | `componentGroups` 13个分组，`composeVersion` BOM 2026.02.00 |
| 侧边栏 | `web/src/App.vue` | 改为 `el-sub-menu` 分组结构，header 添加版本 badge |
| 分类数据目录 | `web/src/data/components/<category>/` | 各分类独立子目录，含 `index.ts` 导出 |

---

## 分组与 category 对照表

| 侧边栏分组 | category 值 | 优先级 |
|-----------|------------|--------|
| 布局 | `Layout` / `LazyList` | 高 |
| 基础组件 | `Foundation` | 高 |
| Modifier | `Modifier` | 高 |
| 主题 | `Theme` | 高 |
| 表单 | `Form` | 高 |
| Material | `Material` | 高 |
| 反馈 | `Feedback` | 高 |
| 导航 | `Navigation` | 高 |
| 动画 | `Animation` | 中 |
| 手势 | `Gestures` | 中 |
| 状态 | `State` | 中 |
| 进阶 | `Advanced` | 低 |
| 生态集成 | `Ecosystem` | 低 |

---

## 数据填充进度

### ✅ 布局（Layout）

| 组件 | id | 状态 |
|------|----|------|
| Column | `column` | ✅ |
| Row | `row` | ✅ |
| Box | `box` | ✅ |
| BoxWithConstraints | `box-with-constraints` | ✅ |
| Spacer | `spacer` | ✅ |
| FlowRow | `flow-row` | ✅ |
| FlowColumn | `flow-column` | ✅ |
| ConstraintLayout | `constraint-layout` | ✅ |
| Surface | `surface` | ✅ |
| Popup | `popup` | ✅ |

### ✅ 列表与网格（LazyList）

| 组件 | id | 状态 |
|------|----|------|
| LazyColumn | `lazy-column` | ✅ |
| LazyRow | `lazy-row` | ✅ |
| LazyVerticalGrid | `lazy-vertical-grid` | ✅ |
| LazyHorizontalGrid | `lazy-horizontal-grid` | ✅ |
| HorizontalPager | `horizontal-pager` | ✅ |
| VerticalPager | `vertical-pager` | ✅ |
| LazyVerticalStaggeredGrid | `lazy-staggered-grid` | ✅ |

### ✅ 基础组件（Foundation）

| 组件 | id | 状态 |
|------|----|------|
| Text | `text` | ✅ |
| Image | `image` | ✅ |
| Icon | `icon` | ✅ |
| Canvas | `canvas` | ✅ |
| SelectionContainer | `selection-container` | ✅ |

### ✅ Modifier（Modifier）

| 条目 | id | 状态 |
|------|----|------|
| size / fillMax* | `modifier-size` | ✅ |
| padding | `modifier-padding` | ✅ |
| background / border / clip | `modifier-background` | ✅ |
| clickable / combinedClickable | `modifier-clickable` | ✅ |
| offset / graphicsLayer | `modifier-offset` | ✅ |
| scrollable / nestedScroll | `modifier-scroll` | ✅ |
| semantics（无障碍） | `modifier-semantics` | ✅ |
| pointerInput | `modifier-pointer-input` | ✅ |
| alpha / rotate / scale / graphicsLayer | `modifier-graphics` | ✅ |

### ✅ 主题（Theme）

| 组件 | id | 状态 |
|------|----|------|
| MaterialTheme | `material-theme` | ✅ |
| ColorScheme | `color-scheme` | ✅ |
| Typography | `typography` | ✅ |
| Shapes | `shapes` | ✅ |

---

### ✅ 表单（Form）

| 组件 | id | 状态 |
|------|----|------|
| TextField | `text-field` | ✅ |
| OutlinedTextField | `outlined-text-field` | ✅ |
| BasicTextField | `basic-text-field` | ✅ |
| SearchBar | `search-bar` | ✅ |
| Checkbox | `checkbox` | ✅ |
| RadioButton | `radio-button` | ✅ |
| Switch | `switch` | ✅ |
| Slider | `slider` | ✅ |
| RangeSlider | `range-slider` | ✅ |
| FocusRequester | `focus-requester` | ✅ |
| KeyboardOptions / KeyboardActions | `keyboard-options` | ✅ |
| DatePicker / DatePickerDialog / DateRangePicker | `date-picker` | ✅ |
| TimePicker / TimeInput | `time-picker` | ✅ |

### ✅ Material 组件（Material）

| 组件 | id | 状态 |
|------|----|------|
| Button | `button` | ✅ |
| OutlinedButton | `outlined-button` | ✅ |
| TextButton | `text-button` | ✅ |
| FilledTonalButton | `filled-tonal-button` | ✅ |
| ElevatedButton | `elevated-button` | ✅ |
| IconButton | `icon-button` | ✅ |
| FloatingActionButton | `floating-action-button` | ✅ |
| ExtendedFAB | `extended-fab` | ✅ |
| AssistChip | `assist-chip` | ✅ |
| FilterChip | `filter-chip` | ✅ |
| InputChip | `input-chip` | ✅ |
| SuggestionChip | `suggestion-chip` | ✅ |
| Card | `card` | ✅ |
| ElevatedCard | `elevated-card` | ✅ |
| OutlinedCard | `outlined-card` | ✅ |
| ListItem | `list-item` | ✅ |
| Badge | `badge` | ✅ |
| HorizontalDivider | `horizontal-divider` | ✅ |
| VerticalDivider | `vertical-divider` | ✅ |
| DropdownMenu | `dropdown-menu` | ✅ |
| ExposedDropdownMenuBox | `exposed-dropdown-menu` | ✅ |
| SegmentedButton | `segmented-button` | ✅ |

### ✅ 反馈（Feedback）

| 组件 | id | 状态 |
|------|----|------|
| AlertDialog | `alert-dialog` | ✅ |
| BasicAlertDialog | `basic-alert-dialog` | ✅ |
| Snackbar / SnackbarHost | `snackbar` | ✅ |
| LinearProgressIndicator | `linear-progress` | ✅ |
| CircularProgressIndicator | `circular-progress` | ✅ |
| ModalBottomSheet | `modal-bottom-sheet` | ✅ |
| TooltipBox | `tooltip` | ✅ |
| PullToRefreshBox | `pull-to-refresh` | ✅ |
| SwipeToDismissBox | `swipe-to-dismiss` | ✅ |
| BottomSheetScaffold | `bottom-sheet-scaffold` | ✅ |

### ✅ 导航（Navigation）

| 组件 | id | 状态 |
|------|----|------|
| Scaffold | `scaffold` | ✅ |
| TopAppBar | `top-app-bar` | ✅ |
| CenterAlignedTopAppBar | `center-aligned-top-app-bar` | ✅ |
| MediumTopAppBar | `medium-top-app-bar` | ✅ |
| LargeTopAppBar | `large-top-app-bar` | ✅ |
| BottomAppBar | `bottom-app-bar` | ✅ |
| NavigationBar | `navigation-bar` | ✅ |
| NavigationRail | `navigation-rail` | ✅ |
| ModalNavigationDrawer | `navigation-drawer` | ✅ |
| PermanentNavigationDrawer | `permanent-navigation-drawer` | ✅ |

---

### ✅ 动画（Animation）

| 条目 | id | 状态 |
|------|----|------|
| AnimatedVisibility | `animated-visibility` | ✅ |
| AnimatedContent | `animated-content` | ✅ |
| Crossfade | `crossfade` | ✅ |
| animate*AsState | `animate-as-state` | ✅ |
| updateTransition | `update-transition` | ✅ |
| rememberInfiniteTransition | `infinite-transition` | ✅ |

### ✅ 手势（Gestures）

| 条目 | id | 状态 |
|------|----|------|
| Modifier.draggable | `modifier-draggable` | ✅ |
| Modifier.anchoredDraggable（swipeable） | `modifier-swipeable` | ✅ |
| Modifier.transformable | `modifier-transformable` | ✅ |
| detectTapGestures | `detect-tap-gestures` | ✅ |
| detectDragGestures | `detect-drag-gestures` | ✅ |

### ✅ 状态（State）

| 条目 | id | 状态 |
|------|----|------|
| remember / rememberSaveable | `remember` | ✅ |
| derivedStateOf | `derived-state-of` | ✅ |
| produceState | `produce-state` | ✅ |
| collectAsState | `collect-as-state` | ✅ |
| LaunchedEffect | `launched-effect` | ✅ |
| SideEffect | `side-effect` | ✅ |
| DisposableEffect | `disposable-effect` | ✅ |

### ✅ 进阶（Advanced）

| 条目 | id | 状态 |
|------|----|------|
| CompositionLocal / CompositionLocalProvider | `composition-local` | ✅ |
| Layout（自定义布局） | `custom-layout` | ✅ |
| SubcomposeLayout | `subcompose-layout` | ✅ |
| drawBehind / drawWithContent | `draw-modifier` | ✅ |
| Brush | `brush` | ✅ |

### ✅ 生态集成（Ecosystem）

| 条目 | id | 状态 |
|------|----|------|
| Coil AsyncImage | `coil-async-image` | ✅ |
| Navigation Compose | `navigation-compose` | ✅ |
| Lottie | `lottie` | ✅ |

---

---

## BOM 2026.02.00 版本升级审查

> 从 BOM `2024.09.00`（ui 1.7.0 / material3 1.3.0）升级到 `2026.02.00`（ui 1.10.3 / material3 1.4.0），需逐一核查以下组件的 API 变化。

### 🔴 高优先级（已知有 breaking change）

| 组件 | 文件 | 变化说明 | 状态 |
|------|------|---------|------|
| SwipeToDismissBox | `feedback/swipe-to-dismiss.ts` | `dismissDirection` → `targetValue` | ✅ |
| PullToRefreshBox | `feedback/pull-to-refresh.ts` | 描述更新，API 稳定 | ✅ |
| Modifier.anchoredDraggable | `gestures/modifier-swipeable.ts` | `animationSpec` → `snapAnimationSpec` + `decayAnimationSpec` | ✅ |
| BasicTextField | `form/basic-text-field.ts` | 重写为新 `TextFieldState` API，`decorationBox` → `decorator`，`singleLine` → `lineLimits` | ✅ |

### 🟡 中优先级（可能有新参数或小变化）

| 组件 | 文件 | 变化说明 | 状态 |
|------|------|---------|------|
| ModalBottomSheet | `feedback/modal-bottom-sheet.ts` | 补充 `sheetMaxWidth`、`tonalElevation`、`scrimColor`、`contentWindowInsets` | ✅ |
| Scaffold | `navigation/scaffold.ts` | 补充 `contentWindowInsets` | ✅ |
| TopAppBar | `navigation/top-app-bar.ts` | 补充 `expandedHeight`、`windowInsets` | ✅ |
| LargeTopAppBar | `navigation/large-top-app-bar.ts` | 补充 `collapsedHeight`、`expandedHeight`、`windowInsets` | ✅ |
| NavigationBar | `navigation/navigation-bar.ts` | 补充 `windowInsets` | ✅ |
| NavigationRail | `navigation/navigation-rail.ts` | 补充 `windowInsets` | ✅ |
| SearchBar | `form/search-bar.ts` | 补充 `shape`、`colors`、`windowInsets` 等参数，新增 `DockedSearchBar` 示例 | ✅ |
| Tooltip | `feedback/tooltip.ts` | `name` 更正为 `TooltipBox`，描述更新 | ✅ |
| LazyColumn / LazyRow | `lazy-list/lazy-column.ts` 等 | 补充 `horizontalAlignment`、`userScrollEnabled`，新增 `contentType` 示例 | ✅ |

### 🟢 低优先级（变化较小，可按需更新）

| 分类 | 状态 |
|------|------|
| Layout（Column/Row/Box 等） | ⬜ |
| Foundation（Text/Image/Icon/Canvas） | ⬜ |
| Modifier | ⬜ |
| Theme | ⬜ |
| Animation | ⬜ |
| State | ⬜ |
| Advanced | ⬜ |
| Ecosystem | ⬜ |

---

## 注意事项

- 新增分类时，在 `web/src/data/components/` 下创建对应子目录，添加各组件 `.ts` 文件和 `index.ts`，再在顶层 `components/index.ts` 中 import 并展开到 `sampleComponents`
- 版本号统一在 `composeVersion` 对象维护，升级时只改一处
- 生态集成分组每个条目需在 `description` 中注明所属库及版本
