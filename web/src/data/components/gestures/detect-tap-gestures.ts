import type { ComponentEntry } from '../../types'

export const detectTapGesturesComponent: ComponentEntry = {
  id: 'detect-tap-gestures',
  demo: { id: 'detect-tap-gestures', sourceFile: 'DetectTapGesturesDemo.kt' },
  name: 'detectTapGestures',
  category: 'Gestures',
  description: '在 pointerInput 中检测点击、双击、长按、按下等精细点击手势，比 Modifier.clickable 提供更多控制和灵活性。',
  tags: ['gesture', 'tap', 'click', 'longpress', 'doubletap', '点击手势'],
  params: [
    { name: 'onTap', type: '((Offset) -> Unit)?', default: 'null', description: '单击回调，携带点击位置坐标' },
    { name: 'onDoubleTap', type: '((Offset) -> Unit)?', default: 'null', description: '双击回调，携带点击位置坐标' },
    { name: 'onLongPress', type: '((Offset) -> Unit)?', default: 'null', description: '长按回调，携带点击位置坐标' },
    { name: 'onPress', type: 'suspend PressGestureScope.(Offset) -> Unit', default: 'NoPressGesture', description: '按下回调，可等待松手或取消，用于实现按下效果' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `Box(
    modifier = Modifier
        .size(120.dp)
        .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(12.dp))
        .pointerInput(Unit) {
            detectTapGestures(
                onTap = { offset -> println("单击位置: $offset") },
                onDoubleTap = { offset -> println("双击位置: $offset") },
                onLongPress = { offset -> println("长按位置: $offset") }
            )
        },
    contentAlignment = Alignment.Center
) {
    Text("点击/双击/长按")
}`,
    },
    {
      title: '按下时改变外观',
      code: `var isPressed by remember { mutableStateOf(false) }

Box(
    modifier = Modifier
        .size(80.dp)
        .scale(if (isPressed) 0.9f else 1f)
        .background(MaterialTheme.colorScheme.primary, CircleShape)
        .pointerInput(Unit) {
            detectTapGestures(
                onPress = {
                    isPressed = true
                    tryAwaitRelease()  // 等待松手
                    isPressed = false
                },
                onTap = { /* 执行操作 */ }
            )
        }
)`,
    },
    {
      title: '获取点击位置',
      code: `var clickPosition by remember { mutableStateOf<Offset?>(null) }

Box(
    modifier = Modifier
        .fillMaxSize()
        .background(Color.LightGray)
        .pointerInput(Unit) {
            detectTapGestures(
                onTap = { offset ->
                    clickPosition = offset
                }
            )
        }
) {
    clickPosition?.let { pos ->
        Box(
            modifier = Modifier
                .offset { IntOffset(pos.x.toInt() - 25, pos.y.toInt() - 25) }
                .size(50.dp)
                .background(MaterialTheme.colorScheme.primary, CircleShape)
        )
    }
}`,
    },
    {
      title: '区分不同手势类型',
      code: `var gestureType by remember { mutableStateOf("等待操作") }

Column {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(200.dp)
            .background(MaterialTheme.colorScheme.surfaceVariant)
            .pointerInput(Unit) {
                detectTapGestures(
                    onTap = { gestureType = "单击" },
                    onDoubleTap = { gestureType = "双击" },
                    onLongPress = { gestureType = "长按" }
                )
            },
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = "检测到: $gestureType",
            style = MaterialTheme.typography.headlineSmall
        )
    }
}`,
    },
    {
      title: '按下取消处理',
      code: `var status by remember { mutableStateOf("未按下") }

Box(
    modifier = Modifier
        .size(150.dp)
        .background(MaterialTheme.colorScheme.secondaryContainer)
        .pointerInput(Unit) {
            detectTapGestures(
                onPress = { offset ->
                    status = "按下中"
                    val released = tryAwaitRelease()
                    status = if (released) "正常释放" else "按下取消"
                },
                onTap = {
                    status = "点击完成"
                }
            )
        },
    contentAlignment = Alignment.Center
) {
    Text(status)
}`,
    },
  ],

  useCases: [
    {
      title: '图片查看器 - 双击缩放',
      description: '双击放大图片，再次双击恢复',
      code: `@Composable
fun ZoomableImage(painter: Painter) {
    var scale by remember { mutableStateOf(1f) }
    val targetScale by animateFloatAsState(targetValue = scale)

    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Image(
            painter = painter,
            contentDescription = null,
            modifier = Modifier
                .fillMaxWidth()
                .scale(targetScale)
                .pointerInput(Unit) {
                    detectTapGestures(
                        onDoubleTap = {
                            scale = if (scale == 1f) 2f else 1f
                        }
                    )
                }
        )
    }
}`,
    },
    {
      title: '长按显示菜单',
      description: '长按元素显示上下文菜单',
      code: `@Composable
fun LongPressMenuItem(text: String) {
    var showMenu by remember { mutableStateOf(false) }
    var menuPosition by remember { mutableStateOf(Offset.Zero) }

    Box {
        Text(
            text = text,
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
                .pointerInput(Unit) {
                    detectTapGestures(
                        onLongPress = { offset ->
                            menuPosition = offset
                            showMenu = true
                        }
                    )
                }
        )

        DropdownMenu(
            expanded = showMenu,
            onDismissRequest = { showMenu = false },
            offset = DpOffset(
                x = with(LocalDensity.current) { menuPosition.x.toDp() },
                y = with(LocalDensity.current) { menuPosition.y.toDp() }
            )
        ) {
            DropdownMenuItem(
                text = { Text("复制") },
                onClick = { showMenu = false }
            )
            DropdownMenuItem(
                text = { Text("分享") },
                onClick = { showMenu = false }
            )
            DropdownMenuItem(
                text = { Text("删除") },
                onClick = { showMenu = false }
            )
        }
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '使用 pointerInput(Unit) 作为 key',
      description: '使用 Unit 作为 key 确保手势检测器只创建一次',
      goodExample: `Box(
    modifier = Modifier.pointerInput(Unit) {
        detectTapGestures { /* ... */ }
    }
)`,
      badExample: `// 每次重组都会重新创建手势检测器
Box(
    modifier = Modifier.pointerInput(true) {
        detectTapGestures { /* ... */ }
    }
)`,
    },
    {
      title: '与 Modifier.clickable 的选择',
      description: '简单点击用 clickable，需要位置信息、双击、长按或按下效果时用 detectTapGestures',
      goodExample: `// 需要点击位置
Modifier.pointerInput(Unit) {
    detectTapGestures(onTap = { offset ->
        handleClick(offset)
    })
}

// 简单点击
Modifier.clickable { handleClick() }`,
    },
    {
      title: '使用 tryAwaitRelease 实现按下效果',
      description: '在 onPress 中使用 tryAwaitRelease 等待释放，实现按下高亮效果',
      goodExample: `detectTapGestures(
    onPress = {
        isPressed = true
        tryAwaitRelease()
        isPressed = false
    }
)`,
    },
    {
      title: '处理手势冲突',
      description: '当多个手势并存时，按下会阻止双击和长按。合理组合使用',
      goodExample: `// 只监听需要的手势
detectTapGestures(
    onTap = { /* 单击 */ },
    onDoubleTap = { /* 双击 */ }
    // 不需要长按就不设置
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Offset 携带点击坐标',
      content: '所有回调的 Offset 参数都是相对于组件左上角的坐标，可以用来判断点击区域或显示涟漪效果',
    },
    {
      type: 'tip',
      title: 'onPress 与其他手势的关系',
      content: 'onPress 会在手指按下时立即触发，而 onTap/onDoubleTap/onLongPress 在手势完成后触发。onPress 可以用来实现按下反馈',
    },
    {
      type: 'tip',
      title: 'tryAwaitRelease 返回值',
      content: 'tryAwaitRelease() 返回 Boolean：true 表示正常释放，false 表示手势被取消（如手指移出区域）',
    },
    {
      type: 'warning',
      title: '与可滚动容器的冲突',
      content: '在 LazyColumn 等滚动容器中使用时，长按可能与滚动冲突。考虑使用 onLongPress 而不是 onPress',
    },
    {
      type: 'warning',
      title: '双击时也会触发单击',
      content: '双击操作会先触发一次 onTap，然后触发 onDoubleTap。如果业务逻辑不兼容，考虑延迟执行单击操作',
    },
    {
      type: 'danger',
      title: '避免在 pointerInput 中读取外部状态',
      content: 'pointerInput 的 lambda 不会因为外部状态变化而重新执行。如果需要读取状态，将状态作为 key 传入 pointerInput(key)',
    },
  ],

  relatedComponents: ['modifier-clickable', 'detect-drag-gestures'],
  since: '1.0.0',
}
