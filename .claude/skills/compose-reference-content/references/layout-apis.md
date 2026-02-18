# Layout 类组件 API 参考

## Column

```kotlin
Column(
    modifier: Modifier = Modifier,
    verticalArrangement: Arrangement.Vertical = Arrangement.Top,
    horizontalAlignment: Alignment.Horizontal = Alignment.Start,
    content: @Composable ColumnScope.() -> Unit
)
```

**Arrangement.Vertical 常用值**：`Top` / `Bottom` / `Center` / `SpaceBetween` / `SpaceAround` / `SpaceEvenly` / `spacedBy(dp)`

**Alignment.Horizontal 常用值**：`Start` / `End` / `CenterHorizontally`

**ColumnScope Modifier**：`Modifier.weight(Float)` / `Modifier.align(Alignment.Horizontal)`

---

## Row

```kotlin
Row(
    modifier: Modifier = Modifier,
    horizontalArrangement: Arrangement.Horizontal = Arrangement.Start,
    verticalAlignment: Alignment.Vertical = Alignment.Top,
    content: @Composable RowScope.() -> Unit
)
```

**Arrangement.Horizontal 常用值**：`Start` / `End` / `Center` / `SpaceBetween` / `SpaceAround` / `SpaceEvenly` / `spacedBy(dp)`

**Alignment.Vertical 常用值**：`Top` / `Bottom` / `CenterVertically`

**RowScope Modifier**：`Modifier.weight(Float)` / `Modifier.align(Alignment.Vertical)`

---

## Box

```kotlin
Box(
    modifier: Modifier = Modifier,
    contentAlignment: Alignment = Alignment.TopStart,
    propagateMinConstraints: Boolean = false,
    content: @Composable BoxScope.() -> Unit
)
```

**Alignment 常用值**：`TopStart` / `TopCenter` / `TopEnd` / `CenterStart` / `Center` / `CenterEnd` / `BottomStart` / `BottomCenter` / `BottomEnd`

**BoxScope Modifier**：`Modifier.align(Alignment)` / `Modifier.matchParentSize()`

---

## LazyColumn

```kotlin
LazyColumn(
    modifier: Modifier = Modifier,
    state: LazyListState = rememberLazyListState(),
    contentPadding: PaddingValues = PaddingValues(0.dp),
    reverseLayout: Boolean = false,
    verticalArrangement: Arrangement.Vertical = Arrangement.Top,
    horizontalAlignment: Alignment.Horizontal = Alignment.Start,
    flingBehavior: FlingBehavior = ScrollableDefaults.flingBehavior(),
    userScrollEnabled: Boolean = true,
    content: LazyListScope.() -> Unit
)
```

**LazyListScope DSL**：

```kotlin
LazyColumn {
    // 单个 item
    item { Text("Header") }

    // 列表
    items(list) { item -> Text(item.name) }

    // 带 key（性能优化，避免重组）
    items(list, key = { it.id }) { item -> Text(item.name) }

    // 固定数量
    items(count = 10) { index -> Text("Item $index") }

    // 带 contentType（相同类型复用）
    items(list, contentType = { it.type }) { ... }
}
```

**LazyListState 常用属性/方法**：

```kotlin
val state = rememberLazyListState()
state.firstVisibleItemIndex       // 第一个可见 item 索引
state.firstVisibleItemScrollOffset
state.isScrollInProgress
state.scrollToItem(index)         // 立即跳转（suspend）
state.animateScrollToItem(index)  // 动画跳转（suspend）
```

---

## LazyRow

与 LazyColumn 相同，方向为水平。参数中 `verticalArrangement` 换为 `horizontalArrangement`，`horizontalAlignment` 换为 `verticalAlignment`。

---

## LazyVerticalGrid

```kotlin
LazyVerticalGrid(
    columns: GridCells,           // GridCells.Fixed(3) 或 GridCells.Adaptive(minSize = 120.dp)
    modifier: Modifier = Modifier,
    state: LazyGridState = rememberLazyGridState(),
    contentPadding: PaddingValues = PaddingValues(0.dp),
    verticalArrangement: Arrangement.Vertical = Arrangement.Top,
    horizontalArrangement: Arrangement.Horizontal = Arrangement.Start,
    content: LazyGridScope.() -> Unit
)
```

**GridCells**：
- `GridCells.Fixed(count)` — 固定列数
- `GridCells.Adaptive(minSize)` — 自适应，每列最小宽度

**LazyGridScope DSL**：

```kotlin
LazyVerticalGrid(columns = GridCells.Fixed(2)) {
    items(list) { item -> Card { Text(item.name) } }

    // 跨列
    item(span = { GridItemSpan(maxLineSpan) }) {
        Text("Full width header")
    }
}
```

---

## Spacer

```kotlin
Spacer(modifier = Modifier.height(16.dp))
Spacer(modifier = Modifier.width(8.dp))
Spacer(modifier = Modifier.weight(1f))  // 在 Row/Column 中填充剩余空间
```

---

## BoxWithConstraints

```kotlin
BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
    // 可访问 maxWidth, maxHeight, minWidth, minHeight (Dp)
    if (maxWidth > 600.dp) {
        // 宽屏布局
    } else {
        // 窄屏布局
    }
}
```

---

## FlowRow / FlowColumn（Compose 1.4+）

```kotlin
FlowRow(
    modifier: Modifier = Modifier,
    horizontalArrangement: Arrangement.Horizontal = Arrangement.Start,
    verticalArrangement: Arrangement.Vertical = Arrangement.Top,
    maxItemsInEachRow: Int = Int.MAX_VALUE,
    content: @Composable FlowRowScope.() -> Unit
)
```

自动换行，适合 Tag 列表、Chip 组等场景。
