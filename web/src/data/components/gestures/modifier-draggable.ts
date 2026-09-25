import type { ComponentEntry } from '../../types'

export const draggableComponent: ComponentEntry = {
  id: 'modifier-draggable',
  demo: { id: 'modifier-draggable', sourceFile: 'DraggableDemo.kt' },
  name: 'Modifier.draggable',
  category: 'Gestures',
  description: '为组件添加单轴（水平或垂直）拖拽手势，通过 DraggableState 追踪拖拽偏移量。',
  tags: ['gesture', 'drag', 'draggable', 'swipe', '拖拽'],
  params: [
    { name: 'state', type: 'DraggableState', required: true, description: '拖拽状态，由 rememberDraggableState { delta -> } 创建' },
    { name: 'orientation', type: 'Orientation', required: true, description: '拖拽方向：Orientation.Horizontal 或 Orientation.Vertical' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用拖拽' },
    { name: 'reverseDirection', type: 'Boolean', default: 'false', description: '是否反转拖拽方向' },
    { name: 'onDragStarted', type: 'suspend CoroutineScope.(startedPosition: Offset) -> Unit', default: '{}', description: '拖拽开始回调' },
    { name: 'onDragStopped', type: 'suspend CoroutineScope.(velocity: Float) -> Unit', default: '{}', description: '拖拽结束回调，携带松手速度' },
  ],
  examples: [
    {
      title: '水平拖拽',
      code: `var offsetX by remember { mutableFloatStateOf(0f) }

Box(
    modifier = Modifier
        .offset { IntOffset(offsetX.roundToInt(), 0) }
        .size(80.dp)
        .background(MaterialTheme.colorScheme.primary, RoundedCornerShape(8.dp))
        .draggable(
            orientation = Orientation.Horizontal,
            state = rememberDraggableState { delta -> offsetX += delta }
        )
)`,
    },
    {
      title: '带回弹效果',
      code: `val offsetX = remember { Animatable(0f) }
val scope = rememberCoroutineScope()

Box(
    modifier = Modifier
        .offset { IntOffset(offsetX.value.roundToInt(), 0) }
        .size(80.dp)
        .background(MaterialTheme.colorScheme.primary, CircleShape)
        .draggable(
            orientation = Orientation.Horizontal,
            state = rememberDraggableState { delta ->
                scope.launch { offsetX.snapTo(offsetX.value + delta) }
            },
            onDragStopped = {
                scope.launch {
                    offsetX.animateTo(0f, spring(dampingRatio = Spring.DampingRatioMediumBouncy))
                }
            }
        )
)`,
    },
    {
      title: '垂直拖拽带边界限制',
      code: `var offsetY by remember { mutableFloatStateOf(0f) }
val maxOffset = 300f

Box(
    modifier = Modifier
        .fillMaxWidth()
        .height(400.dp)
) {
    Box(
        modifier = Modifier
            .offset { IntOffset(0, offsetY.roundToInt()) }
            .size(100.dp)
            .background(MaterialTheme.colorScheme.secondary, RoundedCornerShape(12.dp))
            .draggable(
                orientation = Orientation.Vertical,
                state = rememberDraggableState { delta ->
                    offsetY = (offsetY + delta).coerceIn(0f, maxOffset)
                }
            ),
        contentAlignment = Alignment.Center
    ) {
        Text("上下拖动", color = Color.White)
    }
}`,
    },
    {
      title: '带惯性滑动',
      code: `val offsetX = remember { Animatable(0f) }
val scope = rememberCoroutineScope()

Box(
    modifier = Modifier
        .offset { IntOffset(offsetX.value.roundToInt(), 0) }
        .size(80.dp)
        .background(MaterialTheme.colorScheme.tertiary, RoundedCornerShape(8.dp))
        .draggable(
            orientation = Orientation.Horizontal,
            state = rememberDraggableState { delta ->
                scope.launch { offsetX.snapTo(offsetX.value + delta) }
            },
            onDragStopped = { velocity ->
                scope.launch {
                    // 根据速度计算衰减动画
                    offsetX.animateDecay(
                        initialVelocity = velocity,
                        animationSpec = exponentialDecay()
                    )
                }
            }
        )
)`,
    },
    {
      title: '拖拽状态反馈',
      code: `var offsetX by remember { mutableFloatStateOf(0f) }
var isDragging by remember { mutableStateOf(false) }

Box(
    modifier = Modifier
        .offset { IntOffset(offsetX.roundToInt(), 0) }
        .size(100.dp)
        .scale(if (isDragging) 1.1f else 1f)
        .background(
            color = if (isDragging) MaterialTheme.colorScheme.primary
                    else MaterialTheme.colorScheme.primaryContainer,
            shape = RoundedCornerShape(12.dp)
        )
        .draggable(
            orientation = Orientation.Horizontal,
            state = rememberDraggableState { delta -> offsetX += delta },
            onDragStarted = { isDragging = true },
            onDragStopped = { isDragging = false }
        ),
    contentAlignment = Alignment.Center
) {
    Text(
        text = if (isDragging) "拖拽中" else "可拖拽",
        color = if (isDragging) Color.White else Color.Unspecified
    )
}`,
    },
    {
      title: '反向拖拽',
      code: `var offsetX by remember { mutableFloatStateOf(0f) }

Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.spacedBy(16.dp)
) {
    // 正常方向
    Box(
        modifier = Modifier
            .offset { IntOffset(offsetX.roundToInt(), 0) }
            .size(80.dp)
            .background(MaterialTheme.colorScheme.primary)
            .draggable(
                orientation = Orientation.Horizontal,
                state = rememberDraggableState { delta -> offsetX += delta }
            )
    )

    // 反向拖拽（向右拖时向左移动）
    Box(
        modifier = Modifier
            .offset { IntOffset(offsetX.roundToInt(), 0) }
            .size(80.dp)
            .background(MaterialTheme.colorScheme.secondary)
            .draggable(
                orientation = Orientation.Horizontal,
                reverseDirection = true,
                state = rememberDraggableState { delta -> offsetX += delta }
            )
    )
}`,
    },
  ],

  useCases: [
    {
      title: '音量/亮度滑块',
      description: '垂直拖动调节音量或亮度',
      code: `@Composable
fun VolumeSlider() {
    var volume by remember { mutableFloatStateOf(0.5f) }
    val maxHeight = 200f

    Box(
        modifier = Modifier
            .width(60.dp)
            .height(240.dp)
            .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(30.dp))
            .padding(8.dp)
    ) {
        // 音量指示器
        Box(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .fillMaxWidth()
                .height((volume * maxHeight).dp)
                .background(
                    brush = Brush.verticalGradient(
                        colors = listOf(
                            MaterialTheme.colorScheme.primary,
                            MaterialTheme.colorScheme.tertiary
                        )
                    ),
                    shape = RoundedCornerShape(22.dp)
                )
        )

        // 拖拽手柄
        Box(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .offset { IntOffset(0, -(volume * maxHeight * 3).roundToInt()) }
                .size(44.dp)
                .background(MaterialTheme.colorScheme.primary, CircleShape)
                .border(3.dp, Color.White, CircleShape)
                .draggable(
                    orientation = Orientation.Vertical,
                    reverseDirection = true,
                    state = rememberDraggableState { delta ->
                        volume = (volume + delta / (maxHeight * 3)).coerceIn(0f, 1f)
                    }
                ),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = (volume * 100).roundToInt().toString() + "%",
                fontSize = 10.sp,
                color = Color.White
            )
        }
    }
}`,
    },
    {
      title: '侧边抽屉',
      description: '从屏幕边缘拖出的导航抽屉',
      code: `@Composable
fun SideDrawer() {
    val drawerWidth = 280.dp
    val drawerWidthPx = with(LocalDensity.current) { drawerWidth.toPx() }
    val offsetX = remember { Animatable(-drawerWidthPx) }
    val scope = rememberCoroutineScope()

    Box(modifier = Modifier.fillMaxSize()) {
        // 主内容
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Button(onClick = {
                scope.launch { offsetX.animateTo(0f) }
            }) {
                Text("打开抽屉")
            }
        }

        // 抽屉
        Surface(
            modifier = Modifier
                .offset { IntOffset(offsetX.value.roundToInt(), 0) }
                .fillMaxHeight()
                .width(drawerWidth)
                .draggable(
                    orientation = Orientation.Horizontal,
                    state = rememberDraggableState { delta ->
                        scope.launch {
                            offsetX.snapTo((offsetX.value + delta).coerceIn(-drawerWidthPx, 0f))
                        }
                    },
                    onDragStopped = { velocity ->
                        scope.launch {
                            val targetOffset = if (velocity > 0 || offsetX.value > -drawerWidthPx / 2) {
                                0f
                            } else {
                                -drawerWidthPx
                            }
                            offsetX.animateTo(targetOffset)
                        }
                    }
                ),
            color = MaterialTheme.colorScheme.surface,
            shadowElevation = 8.dp
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("导航菜单", style = MaterialTheme.typography.headlineSmall)
                Spacer(modifier = Modifier.height(16.dp))
                repeat(5) { index ->
                    Text("菜单项 " + (index + 1), modifier = Modifier.padding(vertical = 8.dp))
                }
            }
        }
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '使用 Animatable 配合 snapTo',
      description: '在 DraggableState 中使用 Animatable 可以同时支持手动拖拽和程序化动画',
      goodExample: `val offset = remember { Animatable(0f) }
val scope = rememberCoroutineScope()

Modifier.draggable(
    state = rememberDraggableState { delta ->
        scope.launch { offset.snapTo(offset.value + delta) }
    }
)`,
      badExample: `var offset by remember { mutableFloatStateOf(0f) }

Modifier.draggable(
    state = rememberDraggableState { delta ->
        offset += delta  // 无法平滑地程序化动画
    }
)`,
    },
    {
      title: '在 onDragStopped 中处理惯性',
      description: '利用松手速度实现惯性滑动或自动吸附',
      goodExample: `Modifier.draggable(
    state = rememberDraggableState { delta -> /* ... */ },
    onDragStopped = { velocity ->
        scope.launch {
            if (abs(velocity) > 1000) {
                // 速度大时添加惯性
                offset.animateDecay(velocity, exponentialDecay())
            } else {
                // 速度小时吸附到最近位置
                offset.animateTo(snapToNearest())
            }
        }
    }
)`,
    },
    {
      title: '使用 coerceIn 限制拖拽范围',
      description: '防止组件被拖出可见区域',
      goodExample: `rememberDraggableState { delta ->
    offset = (offset + delta).coerceIn(minOffset, maxOffset)
}`,
      badExample: `rememberDraggableState { delta ->
    offset += delta  // 可能拖出屏幕无法找回
}`,
    },
    {
      title: '单方向拖拽选择正确的 API',
      description: '单轴拖拽用 draggable，二维自由拖拽用 detectDragGestures',
      goodExample: `// 单轴拖拽
Modifier.draggable(orientation = Orientation.Horizontal, state = state)

// 二维自由拖拽
Modifier.pointerInput(Unit) {
    detectDragGestures { change, dragAmount ->
        offset += dragAmount
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'delta 是增量值',
      content: 'rememberDraggableState 回调中的 delta 是本次拖拽的增量（单位：像素），需要累加到当前位置',
    },
    {
      type: 'info',
      title: 'velocity 单位是 px/s',
      content: 'onDragStopped 回调的 velocity 参数单位是像素/秒，正值表示正方向，负值表示反方向',
    },
    {
      type: 'info',
      title: '使用 reverseDirection 反转方向',
      content: '设置 reverseDirection = true 可以反转拖拽方向，向右拖时 delta 为负值',
    },
    {
      type: 'info',
      title: '结合 offset 修饰符使用',
      content: '通常配合 Modifier.offset { IntOffset(...) } 来实际移动组件位置',
    },
    {
      type: 'warning',
      title: '与滚动容器的冲突',
      content: '在 LazyColumn 等滚动容器中使用水平 draggable 可以共存，但垂直 draggable 会与滚动冲突',
    },
    {
      type: 'warning',
      title: 'enabled 参数控制启用状态',
      content: '当 enabled = false 时，拖拽手势被禁用，但不会影响其他修饰符的功能',
    },
    {
      type: 'error',
      title: '避免在回调中执行耗时操作',
      content: 'DraggableState 回调在每一帧都会被调用，避免在其中执行复杂计算或网络请求',
    },
  ],

  relatedComponents: ['detect-drag-gestures', 'modifier-swipeable'],
  since: '1.0.0',
}
