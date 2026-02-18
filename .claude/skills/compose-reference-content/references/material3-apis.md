# Material3 组件 API 参考

## Button 系列

```kotlin
// 填充按钮（主操作）
Button(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    shape: Shape = ButtonDefaults.shape,
    colors: ButtonColors = ButtonDefaults.buttonColors(),
    elevation: ButtonElevation? = ButtonDefaults.buttonElevation(),
    border: BorderStroke? = null,
    contentPadding: PaddingValues = ButtonDefaults.ContentPadding,
    content: @Composable RowScope.() -> Unit
)
```

**变体**：`OutlinedButton` / `TextButton` / `FilledTonalButton` / `ElevatedButton`（参数相同）

**IconButton**：
```kotlin
IconButton(onClick: () -> Unit, modifier: Modifier = Modifier, enabled: Boolean = true) {
    Icon(Icons.Default.Add, contentDescription = "添加")
}
```

**FloatingActionButton**：
```kotlin
FloatingActionButton(onClick: () -> Unit, containerColor: Color = ...) {
    Icon(Icons.Default.Add, contentDescription = null)
}
// 变体：SmallFloatingActionButton / LargeFloatingActionButton / ExtendedFloatingActionButton
```

---

## TextField / OutlinedTextField

```kotlin
TextField(  // 或 OutlinedTextField
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    readOnly: Boolean = false,
    label: @Composable (() -> Unit)? = null,
    placeholder: @Composable (() -> Unit)? = null,
    leadingIcon: @Composable (() -> Unit)? = null,
    trailingIcon: @Composable (() -> Unit)? = null,
    prefix: @Composable (() -> Unit)? = null,
    suffix: @Composable (() -> Unit)? = null,
    supportingText: @Composable (() -> Unit)? = null,  // 底部辅助文字/错误提示
    isError: Boolean = false,
    visualTransformation: VisualTransformation = VisualTransformation.None,  // PasswordVisualTransformation()
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
    keyboardActions: KeyboardActions = KeyboardActions.Default,
    singleLine: Boolean = false,
    maxLines: Int = if (singleLine) 1 else Int.MAX_VALUE,
    minLines: Int = 1,
)
```

**常用 KeyboardOptions**：
```kotlin
KeyboardOptions(
    keyboardType = KeyboardType.Number,  // Email / Password / Phone / Uri
    imeAction = ImeAction.Done           // Search / Next / Send / Go
)
```

---

## Card

```kotlin
Card(
    modifier: Modifier = Modifier,
    shape: Shape = CardDefaults.shape,
    colors: CardColors = CardDefaults.cardColors(),
    elevation: CardElevation = CardDefaults.cardElevation(),
    border: BorderStroke? = null,
    content: @Composable ColumnScope.() -> Unit
)
// 变体：OutlinedCard / ElevatedCard
```

**可点击 Card**：
```kotlin
Card(onClick = { /* navigate */ }, modifier = Modifier.fillMaxWidth()) { ... }
```

---

## Scaffold

```kotlin
Scaffold(
    modifier: Modifier = Modifier,
    topBar: @Composable () -> Unit = {},
    bottomBar: @Composable () -> Unit = {},
    snackbarHost: @Composable () -> Unit = {},
    floatingActionButton: @Composable () -> Unit = {},
    floatingActionButtonPosition: FabPosition = FabPosition.End,
    containerColor: Color = MaterialTheme.colorScheme.background,
    contentColor: Color = contentColorFor(containerColor),
    content: @Composable (PaddingValues) -> Unit  // 必须将 paddingValues 应用到内容
)
```

**标准用法**：
```kotlin
Scaffold(
    topBar = { TopAppBar(title = { Text("标题") }) },
    floatingActionButton = { FloatingActionButton(onClick = {}) { Icon(Icons.Default.Add, null) } }
) { paddingValues ->
    LazyColumn(contentPadding = paddingValues) { ... }
}
```

---

## TopAppBar

```kotlin
TopAppBar(
    title: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    navigationIcon: @Composable () -> Unit = {},
    actions: @Composable RowScope.() -> Unit = {},
    colors: TopAppBarColors = TopAppBarDefaults.topAppBarColors(),
    scrollBehavior: TopAppBarScrollBehavior? = null
)
// 变体：CenterAlignedTopAppBar / MediumTopAppBar / LargeTopAppBar
```

**滚动联动**：
```kotlin
val scrollBehavior = TopAppBarDefaults.enterAlwaysScrollBehavior()
Scaffold(
    topBar = { TopAppBar(title = { Text("") }, scrollBehavior = scrollBehavior) },
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection)
) { ... }
```

---

## NavigationBar（底部导航）

```kotlin
NavigationBar {
    items.forEachIndexed { index, item ->
        NavigationBarItem(
            selected = selectedIndex == index,
            onClick = { selectedIndex = index },
            icon = { Icon(item.icon, contentDescription = item.label) },
            label = { Text(item.label) }
        )
    }
}
```

---

## AlertDialog

```kotlin
AlertDialog(
    onDismissRequest: () -> Unit,
    title: @Composable (() -> Unit)? = null,
    text: @Composable (() -> Unit)? = null,
    confirmButton: @Composable () -> Unit,
    dismissButton: @Composable (() -> Unit)? = null,
    icon: @Composable (() -> Unit)? = null,
    shape: Shape = AlertDialogDefaults.shape,
)
```

---

## ModalBottomSheet

```kotlin
ModalBottomSheet(
    onDismissRequest: () -> Unit,
    modifier: Modifier = Modifier,
    sheetState: SheetState = rememberModalBottomSheetState(),
    shape: Shape = BottomSheetDefaults.ExpandedShape,
    dragHandle: @Composable (() -> Unit)? = { BottomSheetDefaults.DragHandle() },
    content: @Composable ColumnScope.() -> Unit
)
```

---

## Chip 系列

```kotlin
// 辅助 Chip（过滤/标签）
FilterChip(
    selected: Boolean,
    onClick: () -> Unit,
    label: @Composable () -> Unit,
    leadingIcon: @Composable (() -> Unit)? = null,
)

// 操作 Chip
AssistChip(onClick: () -> Unit, label: @Composable () -> Unit)

// 输入 Chip（可删除）
InputChip(selected: Boolean, onClick: () -> Unit, label: @Composable () -> Unit,
    trailingIcon: @Composable (() -> Unit)? = null)

// 建议 Chip
SuggestionChip(onClick: () -> Unit, label: @Composable () -> Unit)
```

---

## LinearProgressIndicator / CircularProgressIndicator

```kotlin
// 确定进度
LinearProgressIndicator(progress = { 0.7f })
CircularProgressIndicator(progress = { 0.7f })

// 不确定进度（加载中）
LinearProgressIndicator()
CircularProgressIndicator()
```

---

## Snackbar（配合 SnackbarHostState）

```kotlin
val snackbarHostState = remember { SnackbarHostState() }
val scope = rememberCoroutineScope()

Scaffold(snackbarHost = { SnackbarHost(snackbarHostState) }) { ... }

// 触发
scope.launch {
    snackbarHostState.showSnackbar(
        message = "操作成功",
        actionLabel = "撤销",
        duration = SnackbarDuration.Short
    )
}
```

---

## Switch / Checkbox / RadioButton

```kotlin
Switch(checked: Boolean, onCheckedChange: ((Boolean) -> Unit)?)

Checkbox(checked: Boolean, onCheckedChange: ((Boolean) -> Unit)?)

RadioButton(selected: Boolean, onClick: (() -> Unit)?)
```

---

## Slider / RangeSlider

```kotlin
Slider(
    value: Float,
    onValueChange: (Float) -> Unit,
    valueRange: ClosedFloatingPointRange<Float> = 0f..1f,
    steps: Int = 0,  // 0 = 连续
    onValueChangeFinished: (() -> Unit)? = null
)

RangeSlider(
    value: ClosedFloatingPointRange<Float>,
    onValueChange: (ClosedFloatingPointRange<Float>) -> Unit,
    valueRange: ClosedFloatingPointRange<Float> = 0f..1f,
)
```

---

## ListItem

```kotlin
ListItem(
    headlineContent: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    overlineContent: @Composable (() -> Unit)? = null,
    supportingContent: @Composable (() -> Unit)? = null,
    leadingContent: @Composable (() -> Unit)? = null,
    trailingContent: @Composable (() -> Unit)? = null,
    colors: ListItemColors = ListItemDefaults.colors(),
)
```

---

## Badge

```kotlin
BadgedBox(badge = { Badge { Text("3") } }) {
    Icon(Icons.Default.Notifications, contentDescription = null)
}

// 无数字小红点
BadgedBox(badge = { Badge() }) { ... }
```
