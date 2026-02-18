# Modifier API 参考

Modifier 是 Compose 中最高频使用的 API，链式调用，顺序影响结果。

## 尺寸

```kotlin
Modifier
    .size(100.dp)                    // 固定宽高
    .size(width = 100.dp, height = 50.dp)
    .width(100.dp)
    .height(50.dp)
    .fillMaxSize()                   // 填满父容器
    .fillMaxWidth()
    .fillMaxHeight()
    .fillMaxWidth(fraction = 0.5f)   // 填满 50%
    .wrapContentSize()               // 包裹内容
    .defaultMinSize(minWidth = 48.dp, minHeight = 48.dp)
    .requiredSize(100.dp)            // 强制尺寸，忽略父约束
```

## 内外边距

```kotlin
Modifier
    .padding(16.dp)                  // 四边
    .padding(horizontal = 16.dp, vertical = 8.dp)
    .padding(start = 8.dp, top = 4.dp, end = 8.dp, bottom = 4.dp)
    .absolutePadding(left = 8.dp)    // 不受 RTL 影响
```

> padding 和 size 的顺序很重要：`size(100.dp).padding(8.dp)` 内容区 84dp；`padding(8.dp).size(100.dp)` 总尺寸 116dp。

## 背景与形状

```kotlin
Modifier
    .background(Color.Blue)
    .background(color = MaterialTheme.colorScheme.surface, shape = RoundedCornerShape(8.dp))
    .background(brush = Brush.horizontalGradient(listOf(Color.Red, Color.Blue)))
    .clip(RoundedCornerShape(8.dp))          // 裁剪形状
    .clip(CircleShape)
    .border(1.dp, Color.Gray, RoundedCornerShape(8.dp))
    .shadow(elevation = 4.dp, shape = RoundedCornerShape(8.dp))
```

## 点击与交互

```kotlin
Modifier
    .clickable { /* onClick */ }
    .clickable(
        interactionSource = remember { MutableInteractionSource() },
        indication = null,           // 去掉水波纹
        onClick = { }
    )
    .combinedClickable(
        onClick = { },
        onLongClick = { },
        onDoubleClick = { }
    )
    .selectable(selected = true, onClick = { })
    .toggleable(value = true, onValueChange = { })
    .pointerInput(Unit) {
        detectTapGestures(onTap = { offset -> })
    }
```

## 滚动

```kotlin
Modifier
    .verticalScroll(rememberScrollState())
    .horizontalScroll(rememberScrollState())
    .scrollable(state = rememberScrollableState { delta -> delta }, orientation = Orientation.Vertical)
    .nestedScroll(connection)        // 嵌套滚动，配合 TopAppBar scrollBehavior
```

## 对齐（在 Row/Column/Box 内）

```kotlin
// 在 Box 内
Modifier.align(Alignment.Center)
Modifier.matchParentSize()

// 在 Row 内
Modifier.align(Alignment.CenterVertically)
Modifier.weight(1f)                  // 占据剩余空间

// 在 Column 内
Modifier.align(Alignment.CenterHorizontally)
Modifier.weight(1f)
```

## 绘制与视觉

```kotlin
Modifier
    .alpha(0.5f)                     // 透明度
    .rotate(45f)                     // 旋转（度）
    .scale(1.2f)                     // 缩放
    .scale(scaleX = 1.5f, scaleY = 1f)
    .offset(x = 8.dp, y = 4.dp)     // 偏移（不影响布局）
    .graphicsLayer {                 // 组合变换，性能更好
        rotationZ = 45f
        scaleX = 1.2f
        alpha = 0.8f
        translationX = 8.dp.toPx()
    }
    .drawBehind {                    // 在内容后面绘制
        drawCircle(color = Color.Red, radius = size.minDimension / 2)
    }
    .drawWithContent {               // 控制内容绘制时机
        drawContent()
        drawRect(color = Color.Black.copy(alpha = 0.3f))
    }
```

## 焦点与键盘

```kotlin
Modifier
    .focusable()
    .focusRequester(focusRequester)  // 配合 focusRequester.requestFocus()
    .onFocusChanged { focusState -> }
    .imePadding()                    // 键盘弹出时自动添加 padding
    .imeNestedScroll()               // 键盘弹出时滚动内容
    .windowInsetsPadding(WindowInsets.systemBars)
    .statusBarsPadding()
    .navigationBarsPadding()
    .systemBarsPadding()
```

## 语义（无障碍）

```kotlin
Modifier
    .semantics {
        contentDescription = "关闭按钮"
        role = Role.Button
        onClick(label = "关闭") { true }
    }
    .clearAndSetSemantics { contentDescription = "简化描述" }
    .testTag("submit_button")        // 测试标签
```

## 常用组合模式

```kotlin
// 可点击的圆形图标按钮
Modifier
    .size(48.dp)
    .clip(CircleShape)
    .clickable { }
    .padding(12.dp)

// 填满宽度的卡片内容
Modifier
    .fillMaxWidth()
    .padding(16.dp)

// 固定高度可滚动区域
Modifier
    .fillMaxWidth()
    .height(200.dp)
    .verticalScroll(rememberScrollState())
```
