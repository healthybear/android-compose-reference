import type { ComponentEntry } from '../../types'

export const swipeableComponent: ComponentEntry = {
  id: 'modifier-swipeable',
  name: 'Modifier.anchoredDraggable',
  category: 'Gestures',
  description: '将组件拖拽限制在预定义的锚点之间，松手后自动吸附到最近锚点，适合抽屉、底部面板、开关等场景。',
  tags: ['gesture', 'swipe', 'anchor', 'snap', '锚点拖拽'],
  params: [
    { name: 'state', type: 'AnchoredDraggableState<T>', required: true, description: '锚点拖拽状态，包含当前值和锚点定义' },
    { name: 'orientation', type: 'Orientation', required: true, description: '拖拽方向' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用手势' },
    { name: 'reverseDirection', type: 'Boolean', default: 'false', description: '是否反转方向' },
  ],
  examples: [
    {
      title: '两态开关（anchoredDraggable）',
      code: `enum class DragValue { Start, End }

val density = LocalDensity.current
val state = remember {
    AnchoredDraggableState(
        initialValue = DragValue.Start,
        anchors = DraggableAnchors {
            DragValue.Start at 0f
            DragValue.End at with(density) { 200.dp.toPx() }
        },
        positionalThreshold = { distance -> distance * 0.5f },
        velocityThreshold = { with(density) { 100.dp.toPx() } },
        snapAnimationSpec = tween(),
        decayAnimationSpec = exponentialDecay()
    )
}

Box(
    modifier = Modifier
        .width(240.dp)
        .height(56.dp)
        .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(28.dp))
) {
    Box(
        modifier = Modifier
            .offset { IntOffset(state.requireOffset().roundToInt(), 0) }
            .size(56.dp)
            .background(MaterialTheme.colorScheme.primary, CircleShape)
            .anchoredDraggable(state, Orientation.Horizontal)
    )
}`,
    },
    {
      title: '查询当前状态',
      code: `// 当前稳定值
val currentValue = state.currentValue  // DragValue.Start 或 DragValue.End

// 目标值（手势进行中）
val targetValue = state.targetValue

// 是否正在动画
val isAnimating = state.isAnimationRunning

// 程序触发跳转
scope.launch { state.animateTo(DragValue.End) }`,
    },
    {
      title: '三态底部面板',
      code: `enum class SheetState { Collapsed, HalfExpanded, Expanded }

val density = LocalDensity.current
val screenHeight = with(density) { LocalConfiguration.current.screenHeightDp.dp.toPx() }

val state = remember {
    AnchoredDraggableState(
        initialValue = SheetState.Collapsed,
        anchors = DraggableAnchors {
            SheetState.Collapsed at screenHeight * 0.9f
            SheetState.HalfExpanded at screenHeight * 0.5f
            SheetState.Expanded at screenHeight * 0.1f
        },
        positionalThreshold = { distance -> distance * 0.3f },
        velocityThreshold = { with(density) { 125.dp.toPx() } }
    )
}

Box(modifier = Modifier.fillMaxSize()) {
    // 背景内容
    Text("主界面内容", modifier = Modifier.padding(16.dp))

    // 底部面板
    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .fillMaxHeight()
            .offset { IntOffset(0, state.requireOffset().roundToInt()) }
            .anchoredDraggable(state, Orientation.Vertical),
        color = MaterialTheme.colorScheme.surface,
        shadowElevation = 8.dp,
        shape = RoundedCornerShape(topStart = 16.dp, topEnd = 16.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            // 拖动手柄
            Box(
                modifier = Modifier
                    .width(40.dp)
                    .height(4.dp)
                    .background(Color.Gray, RoundedCornerShape(2.dp))
                    .align(Alignment.CenterHorizontally)
            )
            Spacer(modifier = Modifier.height(16.dp))
            Text("拖动面板", style = MaterialTheme.typography.titleLarge)
            Text("当前状态: " + state.currentValue)
        }
    }
}`,
    },
    {
      title: '自定义锚点阈值',
      code: `enum class SwipeState { Left, Center, Right }

val density = LocalDensity.current
val state = remember {
    AnchoredDraggableState(
        initialValue = SwipeState.Center,
        anchors = DraggableAnchors {
            SwipeState.Left at -with(density) { 100.dp.toPx() }
            SwipeState.Center at 0f
            SwipeState.Right at with(density) { 100.dp.toPx() }
        },
        // 位置阈值：拖动超过 40% 就切换
        positionalThreshold = { distance -> distance * 0.4f },
        // 速度阈值：快速滑动 (>150dp/s) 直接切换
        velocityThreshold = { with(density) { 150.dp.toPx() } }
    )
}

Box(
    modifier = Modifier
        .offset { IntOffset(state.requireOffset().roundToInt(), 0) }
        .size(100.dp)
        .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(12.dp))
        .anchoredDraggable(state, Orientation.Horizontal),
    contentAlignment = Alignment.Center
) {
    Text(
        text = when (state.currentValue) {
            SwipeState.Left -> "←"
            SwipeState.Center -> "●"
            SwipeState.Right -> "→"
        }
    )
}`,
    },
    {
      title: '可关闭的卡片',
      code: `enum class CardState { Visible, Dismissed }

var isVisible by remember { mutableStateOf(true) }
val density = LocalDensity.current
val dismissThreshold = with(density) { 300.dp.toPx() }

val state = remember {
    AnchoredDraggableState(
        initialValue = CardState.Visible,
        anchors = DraggableAnchors {
            CardState.Visible at 0f
            CardState.Dismissed at dismissThreshold
        },
        positionalThreshold = { distance -> distance * 0.5f },
        velocityThreshold = { with(density) { 100.dp.toPx() } },
        confirmValueChange = { newValue ->
            if (newValue == CardState.Dismissed) {
                isVisible = false
            }
            true
        }
    )
}

AnimatedVisibility(visible = isVisible) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .offset { IntOffset(state.requireOffset().roundToInt(), 0) }
            .anchoredDraggable(state, Orientation.Horizontal)
            .padding(16.dp)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text("向右滑动关闭")
            Icon(Icons.Default.Close, contentDescription = null)
        }
    }
}`,
    },
    {
      title: '进度条式滑动',
      code: `enum class Progress { P0, P25, P50, P75, P100 }

val density = LocalDensity.current
val maxWidth = with(density) { 300.dp.toPx() }

val state = remember {
    AnchoredDraggableState(
        initialValue = Progress.P0,
        anchors = DraggableAnchors {
            Progress.P0 at 0f
            Progress.P25 at maxWidth * 0.25f
            Progress.P50 at maxWidth * 0.5f
            Progress.P75 at maxWidth * 0.75f
            Progress.P100 at maxWidth
        },
        positionalThreshold = { distance -> distance * 0.5f },
        velocityThreshold = { with(density) { 50.dp.toPx() } }
    )
}

Column {
    Text("进度: " + when (state.currentValue) {
        Progress.P0 -> "0%"
        Progress.P25 -> "25%"
        Progress.P50 -> "50%"
        Progress.P75 -> "75%"
        Progress.P100 -> "100%"
    })

    Box(
        modifier = Modifier
            .width(300.dp)
            .height(48.dp)
            .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(24.dp))
    ) {
        Box(
            modifier = Modifier
                .offset { IntOffset(state.requireOffset().roundToInt(), 0) }
                .size(48.dp)
                .background(MaterialTheme.colorScheme.primary, CircleShape)
                .anchoredDraggable(state, Orientation.Horizontal)
        )
    }
}`,
    },
  ],

  useCases: [
    {
      title: '滑动删除列表项',
      description: '向左滑动显示删除按钮，继续滑动直接删除',
      code: `@Composable
fun SwipeToDeleteItem(
    text: String,
    onDelete: () -> Unit
) {
    enum class SwipeState { Normal, ShowDelete, Deleted }

    val density = LocalDensity.current
    val state = remember {
        AnchoredDraggableState(
            initialValue = SwipeState.Normal,
            anchors = DraggableAnchors {
                SwipeState.Normal at 0f
                SwipeState.ShowDelete at with(density) { -80.dp.toPx() }
                SwipeState.Deleted at with(density) { -300.dp.toPx() }
            },
            positionalThreshold = { distance -> distance * 0.5f },
            velocityThreshold = { with(density) { 125.dp.toPx() } },
            confirmValueChange = { newValue ->
                if (newValue == SwipeState.Deleted) {
                    onDelete()
                }
                true
            }
        )
    }

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(64.dp)
    ) {
        // 背景删除按钮
        Box(
            modifier = Modifier
                .align(Alignment.CenterEnd)
                .width(80.dp)
                .fillMaxHeight()
                .background(Color.Red),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Delete,
                contentDescription = "删除",
                tint = Color.White
            )
        }

        // 前景内容
        Surface(
            modifier = Modifier
                .fillMaxSize()
                .offset { IntOffset(state.requireOffset().roundToInt(), 0) }
                .anchoredDraggable(state, Orientation.Horizontal),
            color = MaterialTheme.colorScheme.surface
        ) {
            Row(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(text, style = MaterialTheme.typography.bodyLarge)
            }
        }
    }
}`,
    },
    {
      title: '自定义开关按钮',
      description: '带动画的滑动开关',
      code: `@Composable
fun CustomSwitch(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit
) {
    enum class SwitchState { Off, On }

    val density = LocalDensity.current
    val trackWidth = 60.dp
    val thumbSize = 28.dp
    val trackWidthPx = with(density) { trackWidth.toPx() }
    val thumbSizePx = with(density) { thumbSize.toPx() }

    val state = remember(checked) {
        AnchoredDraggableState(
            initialValue = if (checked) SwitchState.On else SwitchState.Off,
            anchors = DraggableAnchors {
                SwitchState.Off at 0f
                SwitchState.On at trackWidthPx - thumbSizePx
            },
            positionalThreshold = { distance -> distance * 0.5f },
            velocityThreshold = { with(density) { 125.dp.toPx() } },
            confirmValueChange = { newValue ->
                onCheckedChange(newValue == SwitchState.On)
                true
            }
        )
    }

    LaunchedEffect(checked) {
        state.animateTo(if (checked) SwitchState.On else SwitchState.Off)
    }

    Box(
        modifier = Modifier
            .width(trackWidth)
            .height(32.dp)
            .background(
                color = if (state.currentValue == SwitchState.On)
                    MaterialTheme.colorScheme.primary
                else
                    MaterialTheme.colorScheme.outline,
                shape = RoundedCornerShape(16.dp)
            )
            .padding(2.dp)
    ) {
        Box(
            modifier = Modifier
                .offset { IntOffset(state.requireOffset().roundToInt(), 0) }
                .size(thumbSize)
                .background(Color.White, CircleShape)
                .anchoredDraggable(state, Orientation.Horizontal)
        )
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '使用枚举定义状态',
      description: '用枚举类定义所有可能的状态，类型安全且易于理解',
      goodExample: `enum class DrawerState { Closed, Open }

AnchoredDraggableState(
    initialValue = DrawerState.Closed,
    anchors = DraggableAnchors {
        DrawerState.Closed at 0f
        DrawerState.Open at 300f
    }
)`,
      badExample: `// 使用字符串或数字，容易出错
AnchoredDraggableState<String>(
    initialValue = "closed",
    anchors = DraggableAnchors {
        "closed" at 0f
        "open" at 300f
    }
)`,
    },
    {
      title: '合理设置阈值',
      description: 'positionalThreshold 控制切换难度，通常设置为 30%-50%',
      goodExample: `AnchoredDraggableState(
    // 拖动超过距离的 40% 就切换
    positionalThreshold = { distance -> distance * 0.4f },
    // 快速滑动 (>125dp/s) 直接切换
    velocityThreshold = { with(density) { 125.dp.toPx() } }
)`,
    },
    {
      title: '使用 confirmValueChange 处理副作用',
      description: '在状态确认时执行操作，返回 false 可以阻止状态改变',
      goodExample: `AnchoredDraggableState(
    confirmValueChange = { newValue ->
        if (newValue == State.Deleted) {
            onDelete()
        }
        true  // 允许状态改变
    }
)`,
    },
    {
      title: '响应式更新锚点',
      description: '当容器尺寸变化时，使用 updateAnchors 更新锚点位置',
      goodExample: `BoxWithConstraints {
    val maxOffset = constraints.maxWidth.toFloat()
    LaunchedEffect(maxOffset) {
        state.updateAnchors(
            DraggableAnchors {
                State.Start at 0f
                State.End at maxOffset
            }
        )
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'anchoredDraggable 替代了旧的 swipeable',
      content: 'Material 3 使用 anchoredDraggable 代替旧的 swipeable API，提供更好的性能和更灵活的配置',
    },
    {
      type: 'info',
      title: 'requireOffset 与 offset 的区别',
      content: 'requireOffset() 在锚点未初始化时会抛异常，offset 返回 Float? 可能为 null。通常在 remember 后使用 requireOffset',
    },
    {
      type: 'tip',
      title: 'positionalThreshold 控制切换难度',
      content: '返回值越小，越容易切换到下一个锚点。0.5f 表示需要拖动到两个锚点中间位置才切换',
    },
    {
      type: 'tip',
      title: 'velocityThreshold 支持快速滑动',
      content: '当滑动速度超过阈值时，即使没有达到 positionalThreshold 也会切换到下一个锚点',
    },
    {
      type: 'warning',
      title: '锚点必须在 remember 中创建',
      content: 'AnchoredDraggableState 必须使用 remember 保存，否则每次重组都会重置状态',
    },
    {
      type: 'warning',
      title: '动态锚点需要调用 updateAnchors',
      content: '如果锚点位置依赖于布局尺寸，需要在尺寸确定后使用 updateAnchors 更新',
    },
    {
      type: 'danger',
      title: '避免在动画过程中修改锚点',
      content: '在 isAnimationRunning 为 true 时修改锚点可能导致动画跳变或崩溃',
    },
  ],

  relatedComponents: ['modifier-draggable', 'detect-drag-gestures'],
  since: '1.0.0',
}
