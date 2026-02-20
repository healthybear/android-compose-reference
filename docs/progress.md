# Compose 速查站 — 开发进度表

> 数据文件：`web/src/data/components/index.ts`，所有组件数据追加到 `sampleComponents` 数组末尾（`]` 之前）。

---

## 基础设施（已完成）

| 项目 | 文件 | 说明 |
|------|------|------|
| 类型定义 | `web/src/data/types.ts` | `ComponentCategory`（14个）、`ComponentGroup`、`ComposeVersion` |
| 分组配置 | `web/src/data/components/index.ts` | `componentGroups` 13个分组，`composeVersion` BOM 2024.09.00 |
| 侧边栏 | `web/src/App.vue` | 改为 `el-sub-menu` 分组结构，header 添加版本 badge |

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

### ✅ 列表与网格（LazyList）

| 组件 | id | 状态 |
|------|----|------|
| LazyColumn | `lazy-column` | ✅ |
| LazyRow | `lazy-row` | ✅ |
| LazyVerticalGrid | `lazy-vertical-grid` | ✅ |
| LazyHorizontalGrid | `lazy-horizontal-grid` | ✅ |
| HorizontalPager | `horizontal-pager` | ✅ |
| VerticalPager | `vertical-pager` | ⬜ 待补充 |

### ✅ 基础组件（Foundation）

| 组件 | id | 状态 |
|------|----|------|
| Text | `text` | ✅ |
| Image | `image` | ✅ |
| Icon | `icon` | ✅ |
| Canvas | `canvas` | ✅ |

### ✅ Modifier（Modifier）

| 条目 | id | 状态 |
|------|----|------|
| size / fillMax* | `modifier-size` | ✅ |
| padding | `modifier-padding` | ✅ |
| background / border / clip | `modifier-background` | ✅ |
| clickable / combinedClickable | `modifier-clickable` | ✅ |
| offset / graphicsLayer | `modifier-offset` | ✅ |
| scrollable / nestedScroll | `modifier-scroll` | ⬜ 待补充 |
| semantics（无障碍） | `modifier-semantics` | ⬜ 待补充 |

### ✅ 主题（Theme）

| 组件 | id | 状态 |
|------|----|------|
| MaterialTheme | `material-theme` | ✅ |
| ColorScheme | `color-scheme` | ✅ |
| Typography | `typography` | ✅ |
| Shapes | `shapes` | ⬜ 待补充 |

---

### ⬜ 表单（Form）— 待填充

| 组件 | id | 备注 |
|------|----|------|
| TextField | `text-field` | |
| OutlinedTextField | `outlined-text-field` | |
| BasicTextField | `basic-text-field` | |
| SearchBar | `search-bar` | |
| Checkbox | `checkbox` | |
| RadioButton | `radio-button` | |
| Switch | `switch` | |
| Slider | `slider` | |
| RangeSlider | `range-slider` | |
| FocusRequester | `focus-requester` | 焦点管理 |
| KeyboardOptions / KeyboardActions | `keyboard-options` | 键盘配置 |

### ⬜ Material 组件（Material）— 待填充

| 组件 | id | 备注 |
|------|----|------|
| Button | `button` | ✅ 已有，category 已是 `Material` |
| OutlinedButton | `outlined-button` | |
| TextButton | `text-button` | |
| FilledTonalButton | `filled-tonal-button` | |
| ElevatedButton | `elevated-button` | |
| IconButton | `icon-button` | |
| FloatingActionButton | `floating-action-button` | |
| ExtendedFAB | `extended-fab` | |
| AssistChip | `assist-chip` | |
| FilterChip | `filter-chip` | |
| InputChip | `input-chip` | |
| SuggestionChip | `suggestion-chip` | |
| Card | `card` | |
| ElevatedCard | `elevated-card` | |
| OutlinedCard | `outlined-card` | |
| ListItem | `list-item` | |
| Badge | `badge` | |
| HorizontalDivider | `horizontal-divider` | |
| DropdownMenu | `dropdown-menu` | |
| ExposedDropdownMenuBox | `exposed-dropdown-menu` | |

### ⬜ 反馈（Feedback）— 待填充

| 组件 | id | 备注 |
|------|----|------|
| AlertDialog | `alert-dialog` | |
| BasicAlertDialog | `basic-alert-dialog` | M3 自定义对话框 |
| Snackbar / SnackbarHost | `snackbar` | |
| LinearProgressIndicator | `linear-progress` | |
| CircularProgressIndicator | `circular-progress` | |
| ModalBottomSheet | `modal-bottom-sheet` | |
| Tooltip（PlainTooltip） | `tooltip` | |
| PullToRefreshBox | `pull-to-refresh` | M3 1.3+ |
| SwipeToDismissBox | `swipe-to-dismiss` | M3 1.3+ |

### ⬜ 导航（Navigation）— 待填充

| 组件 | id | 备注 |
|------|----|------|
| Scaffold | `scaffold` | |
| TopAppBar | `top-app-bar` | |
| CenterAlignedTopAppBar | `center-aligned-top-app-bar` | |
| LargeTopAppBar | `large-top-app-bar` | |
| BottomAppBar | `bottom-app-bar` | |
| NavigationBar | `navigation-bar` | |
| NavigationRail | `navigation-rail` | |
| ModalNavigationDrawer | `navigation-drawer` | |
| PermanentNavigationDrawer | `permanent-navigation-drawer` | |

---

### ⬜ 动画（Animation）— 待填充

| 条目 | id |
|------|----|
| AnimatedVisibility | `animated-visibility` |
| AnimatedContent | `animated-content` |
| Crossfade | `crossfade` |
| animate*AsState | `animate-as-state` |
| updateTransition | `update-transition` |
| rememberInfiniteTransition | `infinite-transition` |

### ⬜ 手势（Gestures）— 待填充

| 条目 | id |
|------|----|
| Modifier.draggable | `modifier-draggable` |
| Modifier.swipeable | `modifier-swipeable` |
| Modifier.transformable | `modifier-transformable` |
| detectTapGestures | `detect-tap-gestures` |
| detectDragGestures | `detect-drag-gestures` |

### ⬜ 状态（State）— 待填充

| 条目 | id |
|------|----|
| remember / rememberSaveable | `remember` |
| derivedStateOf | `derived-state-of` |
| produceState | `produce-state` |
| collectAsState | `collect-as-state` |
| LaunchedEffect | `launched-effect` |
| SideEffect | `side-effect` |
| DisposableEffect | `disposable-effect` |

### ⬜ 进阶（Advanced）— 待填充

| 条目 | id |
|------|----|
| CompositionLocal / CompositionLocalProvider | `composition-local` |
| Layout（自定义布局） | `custom-layout` |
| SubcomposeLayout | `subcompose-layout` |
| drawBehind / drawWithContent | `draw-modifier` |
| Brush | `brush` |

### ⬜ 生态集成（Ecosystem）— 待填充

| 条目 | id | 备注 |
|------|----|------|
| Coil AsyncImage | `coil-async-image` | 需注明库版本 |
| Navigation Compose | `navigation-compose` | NavHost / NavController |
| Lottie | `lottie` | 可选 |

---

## 注意事项

- 追加数据时在 `sampleComponents` 数组的 `]` **之前**插入，不要新建变量
- `VerticalPager` 可与 `HorizontalPager` 合并为一个条目，或单独补充
- 版本号统一在 `composeVersion` 对象维护，升级时只改一处
- 生态集成分组每个条目需在 `description` 中注明所属库及版本
