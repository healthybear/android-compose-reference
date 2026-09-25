import type { ComponentEntry } from '../../types'

export const detectDragGesturesComponent: ComponentEntry = {
  id: 'detect-drag-gestures',
  demo: { id: 'detect-drag-gestures', sourceFile: 'DetectDragGesturesDemo.kt' },
  name: 'detectDragGestures',
  category: 'Gestures',
  description: '在 pointerInput 中检测任意方向的自由拖拽手势，比 Modifier.draggable 更灵活，支持二维拖拽和完整的拖拽生命周期控制。',
  tags: ['gesture', 'drag', 'pointer', 'freeform', '自由拖拽', '二维拖拽'],
  params: [
    { name: 'onDragStart', type: '(Offset) -> Unit', default: '{}', description: '拖拽开始回调，携带起始位置坐标' },
    { name: 'onDragEnd', type: '() -> Unit', default: '{}', description: '拖拽正常结束回调（手指抬起）' },
    { name: 'onDragCancel', type: '() -> Unit', default: '{}', description: '拖拽取消回调（手势被中断）' },
    { name: 'onDrag', type: '(change: PointerInputChange, dragAmount: Offset) -> Unit', required: true, description: '拖拽中回调，dragAmount 为本次增量偏移（delta）' },
  ],
  examples: [
    {
      title: '自由拖拽组件',
      code: `var offset by remember { mutableStateOf(Offset.Zero) }

Box(
    modifier = Modifier
        .offset { IntOffset(offset.x.roundToInt(), offset.y.roundToInt()) }
        .size(80.dp)
        .background(MaterialTheme.colorScheme.primary, RoundedCornerShape(8.dp))
        .pointerInput(Unit) {
            detectDragGestures { _, dragAmount ->
                offset += dragAmount
            }
        }
)`,
    },
    {
      title: '带边界限制的拖拽',
      code: `var offset by remember { mutableStateOf(Offset.Zero) }

BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
    val boxSize = 80.dp
    val maxX = constraints.maxWidth - boxSize.toPx()
    val maxY = constraints.maxHeight - boxSize.toPx()

    Box(
        modifier = Modifier
            .offset { IntOffset(offset.x.roundToInt(), offset.y.roundToInt()) }
            .size(boxSize)
            .background(MaterialTheme.colorScheme.tertiary, CircleShape)
            .pointerInput(Unit) {
                detectDragGestures { _, dragAmount ->
                    offset = Offset(
                        x = (offset.x + dragAmount.x).coerceIn(0f, maxX),
                        y = (offset.y + dragAmount.y).coerceIn(0f, maxY)
                    )
                }
            }
    )
}`,
    },
    {
      title: '拖拽生命周期',
      code: `var offset by remember { mutableStateOf(Offset.Zero) }
var isDragging by remember { mutableStateOf(false) }
var dragStartPos by remember { mutableStateOf(Offset.Zero) }

Box(
    modifier = Modifier
        .offset { IntOffset(offset.x.roundToInt(), offset.y.roundToInt()) }
        .size(100.dp)
        .scale(if (isDragging) 1.1f else 1f)
        .background(
            if (isDragging) MaterialTheme.colorScheme.primary
            else MaterialTheme.colorScheme.primaryContainer,
            RoundedCornerShape(12.dp)
        )
        .pointerInput(Unit) {
            detectDragGestures(
                onDragStart = { startOffset ->
                    isDragging = true
                    dragStartPos = startOffset
                },
                onDragEnd = {
                    isDragging = false
                    println("拖拽结束")
                },
                onDragCancel = {
                    isDragging = false
                    println("拖拽被取消")
                },
                onDrag = { change, dragAmount ->
                    change.consume()
                    offset += dragAmount
                }
            )
        },
    contentAlignment = Alignment.Center
) {
    Text(if (isDragging) "拖拽中" else "可拖拽")
}`,
    },
    {
      title: '带惯性的拖拽',
      code: `var offset by remember { mutableStateOf(Offset.Zero) }
var velocity by remember { mutableStateOf(Offset.Zero) }
val coroutineScope = rememberCoroutineScope()

LaunchedEffect(velocity) {
    if (velocity != Offset.Zero) {
        // 模拟惯性减速
        val decay = 0.95f
        while (velocity.getDistance() > 1f) {
            delay(16)
            offset += velocity
            velocity *= decay
        }
        velocity = Offset.Zero
    }
}

Box(
    modifier = Modifier
        .offset { IntOffset(offset.x.roundToInt(), offset.y.roundToInt()) }
        .size(80.dp)
        .background(MaterialTheme.colorScheme.secondary, CircleShape)
        .pointerInput(Unit) {
            detectDragGestures(
                onDragStart = { velocity = Offset.Zero },
                onDragEnd = {
                    // 拖拽结束时保留速度，产生惯性效果
                },
                onDrag = { change, dragAmount ->
                    offset += dragAmount
                    velocity = dragAmount
                }
            )
        }
)`,
    },
    {
      title: '水平或垂直方向拖拽',
      code: `var offsetX by remember { mutableStateOf(0f) }
var offsetY by remember { mutableStateOf(0f) }

Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
    // 只允许水平拖拽
    Box(
        modifier = Modifier
            .offset { IntOffset(offsetX.roundToInt(), 0) }
            .size(80.dp, 60.dp)
            .background(MaterialTheme.colorScheme.primary)
            .pointerInput(Unit) {
                detectDragGestures { _, dragAmount ->
                    offsetX += dragAmount.x
                    // 忽略 y 方向
                }
            }
    )

    // 只允许垂直拖拽
    Box(
        modifier = Modifier
            .offset { IntOffset(0, offsetY.roundToInt()) }
            .size(60.dp, 80.dp)
            .background(MaterialTheme.colorScheme.secondary)
            .pointerInput(Unit) {
                detectDragGestures { _, dragAmount ->
                    offsetY += dragAmount.y
                    // 忽略 x 方向
                }
            }
    )
}`,
    },
  ],

  useCases: [
    {
      title: '可拖拽的浮动按钮',
      description: '悬浮操作按钮可以自由拖动到屏幕任意位置',
      code: `@Composable
fun DraggableFAB() {
    var offset by remember { mutableStateOf(Offset(100f, 100f)) }

    Box(modifier = Modifier.fillMaxSize()) {
        FloatingActionButton(
            onClick = { /* 执行操作 */ },
            modifier = Modifier
                .offset { IntOffset(offset.x.roundToInt(), offset.y.roundToInt()) }
                .pointerInput(Unit) {
                    detectDragGestures { change, dragAmount ->
                        change.consume()
                        offset += dragAmount
                    }
                }
        ) {
            Icon(Icons.Default.Add, contentDescription = "添加")
        }
    }
}`,
    },
    {
      title: '图片裁剪框',
      description: '可以拖拽移动的裁剪框',
      code: `@Composable
fun CropBox(imageSize: IntSize) {
    var cropOffset by remember { mutableStateOf(Offset(50f, 50f)) }
    val cropSize = 200.dp

    Box(modifier = Modifier.size(imageSize.width.dp, imageSize.height.dp)) {
        // 背景图片
        Image(
            painter = painterResource(id = R.drawable.photo),
            contentDescription = null,
            modifier = Modifier.fillMaxSize()
        )

        // 裁剪框
        Box(
            modifier = Modifier
                .offset {
                    IntOffset(cropOffset.x.roundToInt(), cropOffset.y.roundToInt())
                }
                .size(cropSize)
                .border(2.dp, Color.White)
                .pointerInput(Unit) {
                    detectDragGestures { _, dragAmount ->
                        val maxX = imageSize.width - cropSize.toPx()
                        val maxY = imageSize.height - cropSize.toPx()
                        cropOffset = Offset(
                            x = (cropOffset.x + dragAmount.x).coerceIn(0f, maxX),
                            y = (cropOffset.y + dragAmount.y).coerceIn(0f, maxY)
                        )
                    }
                }
        )
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '使用 change.consume() 消费事件',
      description: '调用 consume() 防止事件继续传播到父组件',
      goodExample: `detectDragGestures { change, dragAmount ->
    change.consume()  // 消费事件
    offset += dragAmount
}`,
      badExample: `detectDragGestures { change, dragAmount ->
    // 未消费，可能导致父组件也响应拖拽
    offset += dragAmount
}`,
    },
    {
      title: '使用边界限制保持组件可见',
      description: '使用 coerceIn 限制位置范围，防止组件被拖出屏幕',
      goodExample: `val maxX = containerWidth - boxWidth
offset = Offset(
    x = (offset.x + dragAmount.x).coerceIn(0f, maxX),
    y = (offset.y + dragAmount.y).coerceIn(0f, maxY)
)`,
    },
    {
      title: '利用 onDragStart 初始化状态',
      description: '在拖拽开始时重置或初始化相关状态',
      goodExample: `detectDragGestures(
    onDragStart = {
        velocity = Offset.Zero
        isDragging = true
    },
    onDrag = { _, dragAmount -> /* ... */ }
)`,
    },
    {
      title: '区分 onDragEnd 和 onDragCancel',
      description: '正常结束和取消可能需要不同的处理逻辑',
      goodExample: `detectDragGestures(
    onDragEnd = {
        // 正常结束：应用惯性、保存位置
        applyInertia()
    },
    onDragCancel = {
        // 取消：恢复初始状态
        resetPosition()
    }
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'dragAmount 是增量值',
      content: 'onDrag 回调中的 dragAmount 是本次移动的增量（delta），不是累计位移。需要累加到当前位置：offset += dragAmount',
    },
    {
      type: 'tip',
      title: '与 Modifier.draggable 的区别',
      content: 'detectDragGestures 支持二维自由拖拽，而 Modifier.draggable 只支持单方向（水平或垂直）拖拽但提供更高级的功能如 DraggableState',
    },
    {
      type: 'tip',
      title: '使用 BoxWithConstraints 获取边界',
      content: 'BoxWithConstraints 提供父容器尺寸信息，用于计算拖拽边界限制',
    },
    {
      type: 'warning',
      title: '与滚动容器的冲突',
      content: '在 LazyColumn 等滚动容器中使用时，拖拽会与滚动冲突。考虑使用 Modifier.draggable 或调用 change.consume() 阻止滚动',
    },
    {
      type: 'warning',
      title: '性能考虑',
      content: '拖拽时每帧都会触发重组。避免在 onDrag 中进行复杂计算，保持回调轻量',
    },
    {
      type: 'danger',
      title: 'offset 需要使用 remember',
      content: '拖拽位置必须用 remember 保存，否则每次重组都会重置位置',
    },
  ],

  relatedComponents: ['modifier-draggable', 'detect-tap-gestures', 'modifier-transformable'],
  since: '1.0.0',
}
