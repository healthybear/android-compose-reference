import type { ComponentEntry } from '../../types'

export const updateTransitionComponent: ComponentEntry = {
  id: 'update-transition',
  demo: { id: 'update-transition', sourceFile: 'UpdateTransitionDemo.kt' },
  name: 'updateTransition',
  category: 'Animation',
  description: '管理多个动画值同步过渡的高级 API，一个状态变化可以同时驱动多个属性动画。适合复杂的状态机动画场景。',
  tags: ['animation', 'transition', 'multi', 'state', '多属性动画'],
  params: [
    { name: 'targetState', type: 'T', required: true, description: '目标状态，变化时所有子动画同步执行' },
    { name: 'label', type: 'String?', default: 'null', description: '调试标签，在 Android Studio 动画预览和 Layout Inspector 中显示' },
  ],
  examples: [
    {
      title: '多属性同步动画',
      code: `enum class BoxState { Collapsed, Expanded }
var boxState by remember { mutableStateOf(BoxState.Collapsed) }

val transition = updateTransition(targetState = boxState, label = "box")

val size by transition.animateDp(label = "size") { state ->
    if (state == BoxState.Expanded) 200.dp else 80.dp
}
val color by transition.animateColor(label = "color") { state ->
    if (state == BoxState.Expanded) MaterialTheme.colorScheme.primary
    else MaterialTheme.colorScheme.surfaceVariant
}
val cornerRadius by transition.animateDp(label = "corner") { state ->
    if (state == BoxState.Expanded) 16.dp else 50.dp
}

Box(
    modifier = Modifier
        .size(size)
        .background(color, RoundedCornerShape(cornerRadius))
        .clickable {
            boxState = if (boxState == BoxState.Collapsed) {
                BoxState.Expanded
            } else {
                BoxState.Collapsed
            }
        }
)`,
    },
    {
      title: '所有可用的动画扩展',
      code: `val transition = updateTransition(targetState = state, label = "demo")

// 各种类型的动画值
val dp by transition.animateDp { /* 根据状态返回 Dp */ }
val color by transition.animateColor { /* 根据状态返回 Color */ }
val float by transition.animateFloat { /* 根据状态返回 Float */ }
val int by transition.animateInt { /* 根据状态返回 Int */ }
val offset by transition.animateOffset { /* 根据状态返回 Offset */ }
val size by transition.animateSize { /* 根据状态返回 Size */ }
val rect by transition.animateRect { /* 根据状态返回 Rect */ }
val intOffset by transition.animateIntOffset { /* 根据状态返回 IntOffset */ }
val intSize by transition.animateIntSize { /* 根据状态返回 IntSize */ }`,
    },
    {
      title: '自定义每个动画的规格',
      code: `val transition = updateTransition(targetState = isExpanded, label = "card")

val height by transition.animateDp(
    transitionSpec = {
        // 根据状态转换方向自定义动画
        if (targetState) {
            spring(dampingRatio = Spring.DampingRatioMediumBouncy)
        } else {
            tween(durationMillis = 200)
        }
    },
    label = "height"
) { expanded ->
    if (expanded) 300.dp else 100.dp
}

val alpha by transition.animateFloat(
    transitionSpec = { tween(300) },
    label = "alpha"
) { expanded ->
    if (expanded) 1f else 0.5f
}`,
    },
    {
      title: '检查动画运行状态',
      code: `val transition = updateTransition(targetState = isExpanded, label = "expand")

val size by transition.animateDp { state ->
    if (state) 200.dp else 100.dp
}

Column {
    Box(
        modifier = Modifier
            .size(size)
            .background(MaterialTheme.colorScheme.primary)
    )

    // 动画运行时禁用按钮
    Button(
        onClick = { isExpanded = !isExpanded },
        enabled = !transition.isRunning
    ) {
        Text(if (transition.isRunning) "动画中..." else "切换")
    }

    // 显示当前状态
    Text("当前状态: " + transition.currentState)
    Text("目标状态: " + transition.targetState)
}`,
    },
    {
      title: '嵌套状态过渡',
      code: `sealed class CardState {
    object Collapsed : CardState()
    object PartialExpanded : CardState()
    object FullyExpanded : CardState()
}

var cardState by remember { mutableStateOf<CardState>(CardState.Collapsed) }
val transition = updateTransition(targetState = cardState, label = "card")

val height by transition.animateDp(label = "height") { state ->
    when (state) {
        CardState.Collapsed -> 80.dp
        CardState.PartialExpanded -> 200.dp
        CardState.FullyExpanded -> 400.dp
    }
}

val elevation by transition.animateDp(label = "elevation") { state ->
    when (state) {
        CardState.Collapsed -> 1.dp
        CardState.PartialExpanded -> 4.dp
        CardState.FullyExpanded -> 8.dp
    }
}

Card(
    modifier = Modifier
        .fillMaxWidth()
        .height(height),
    elevation = CardDefaults.cardElevation(defaultElevation = elevation),
    onClick = {
        cardState = when (cardState) {
            CardState.Collapsed -> CardState.PartialExpanded
            CardState.PartialExpanded -> CardState.FullyExpanded
            CardState.FullyExpanded -> CardState.Collapsed
        }
    }
) {
    Text("点击切换状态", modifier = Modifier.padding(16.dp))
}`,
    },
  ],

  useCases: [
    {
      title: '音乐播放器控制按钮',
      description: '播放/暂停状态切换时，图标、颜色、尺寸同步变化',
      code: `enum class PlayState { Playing, Paused }

@Composable
fun PlayButton(
    playState: PlayState,
    onToggle: () -> Unit
) {
    val transition = updateTransition(targetState = playState, label = "play")

    val backgroundColor by transition.animateColor(label = "bgColor") { state ->
        when (state) {
            PlayState.Playing -> MaterialTheme.colorScheme.primary
            PlayState.Paused -> MaterialTheme.colorScheme.surfaceVariant
        }
    }

    val iconColor by transition.animateColor(label = "iconColor") { state ->
        when (state) {
            PlayState.Playing -> MaterialTheme.colorScheme.onPrimary
            PlayState.Paused -> MaterialTheme.colorScheme.onSurfaceVariant
        }
    }

    val size by transition.animateDp(label = "size") { state ->
        when (state) {
            PlayState.Playing -> 64.dp
            PlayState.Paused -> 56.dp
        }
    }

    val iconRotation by transition.animateFloat(label = "rotation") { state ->
        when (state) {
            PlayState.Playing -> 0f
            PlayState.Paused -> 180f
        }
    }

    FloatingActionButton(
        onClick = onToggle,
        modifier = Modifier.size(size),
        containerColor = backgroundColor
    ) {
        Icon(
            imageVector = if (playState == PlayState.Playing) {
                Icons.Default.Pause
            } else {
                Icons.Default.PlayArrow
            },
            contentDescription = null,
            tint = iconColor,
            modifier = Modifier.rotate(iconRotation)
        )
    }
}`,
    },
    {
      title: '下拉刷新指示器',
      description: '根据下拉距离和刷新状态同步更新多个属性',
      code: `enum class RefreshState { Idle, Pulling, Refreshing, Success }

@Composable
fun RefreshIndicator(state: RefreshState, pullProgress: Float) {
    val transition = updateTransition(targetState = state, label = "refresh")

    val rotation by transition.animateFloat(label = "rotation") { refreshState ->
        when (refreshState) {
            RefreshState.Idle -> 0f
            RefreshState.Pulling -> pullProgress * 360f
            RefreshState.Refreshing -> 360f
            RefreshState.Success -> 720f
        }
    }

    val scale by transition.animateFloat(label = "scale") { refreshState ->
        when (refreshState) {
            RefreshState.Idle -> 0f
            RefreshState.Pulling -> pullProgress
            RefreshState.Refreshing -> 1f
            RefreshState.Success -> 1.2f
        }
    }

    val alpha by transition.animateFloat(label = "alpha") { refreshState ->
        when (refreshState) {
            RefreshState.Idle -> 0f
            RefreshState.Pulling -> pullProgress
            RefreshState.Refreshing, RefreshState.Success -> 1f
        }
    }

    Box(
        modifier = Modifier
            .size(48.dp)
            .scale(scale)
            .alpha(alpha)
            .rotate(rotation),
        contentAlignment = Alignment.Center
    ) {
        if (state == RefreshState.Success) {
            Icon(
                Icons.Default.Check,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary
            )
        } else {
            CircularProgressIndicator(
                modifier = Modifier.size(24.dp),
                strokeWidth = 2.dp
            )
        }
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '为每个动画提供 label',
      description: 'label 有助于在 Android Studio 的动画预览工具中调试和识别动画',
      goodExample: `val transition = updateTransition(targetState = state, label = "card")
val height by transition.animateDp(label = "height") { /* ... */ }
val color by transition.animateColor(label = "color") { /* ... */ }`,
      badExample: `val transition = updateTransition(targetState = state)
val height by transition.animateDp { /* ... */ }`,
    },
    {
      title: '使用枚举或密封类作为状态',
      description: '明确的状态类型比 Boolean 更易维护和扩展',
      goodExample: `enum class DrawerState { Open, Closed, Dragging }
val transition = updateTransition(targetState = drawerState, label = "drawer")`,
      badExample: `// Boolean 难以扩展到三个以上的状态
val transition = updateTransition(targetState = isOpen, label = "drawer")`,
    },
    {
      title: '利用 isRunning 防止重复触发',
      description: '在动画播放期间禁用交互，避免状态混乱',
      goodExample: `Button(
    onClick = { state = newState },
    enabled = !transition.isRunning
) { Text("切换") }`,
    },
    {
      title: '为不同转换定制动画规格',
      description: '在 transitionSpec 中根据状态转换方向选择合适的动画',
      goodExample: `transition.animateDp(
    transitionSpec = {
        if (targetState == State.Expanded) {
            spring(dampingRatio = Spring.DampingRatioMediumBouncy)
        } else {
            tween(200)
        }
    }
) { /* ... */ }`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: '所有子动画同步执行',
      content: 'updateTransition 会确保所有通过它创建的动画（animateDp、animateColor 等）同步开始和结束，保持一致性',
    },
    {
      type: 'info',
      title: 'currentState vs targetState',
      content: 'currentState 是动画当前所在的状态，targetState 是动画的目标状态。在动画过程中，currentState 会逐渐过渡到 targetState',
    },
    {
      type: 'info',
      title: '与 AnimatedContent 结合',
      content: 'updateTransition 可以和 AnimatedContent 结合使用，通过 transition.AnimatedContent 创建带内容切换的复杂动画',
    },
    {
      type: 'warning',
      title: '避免在 lambda 中读取外部状态',
      content: '在 animateDp/animateColor 的 lambda 中，应该只根据传入的 state 参数计算值，不要读取外部可变状态，否则可能导致动画不更新',
    },
    {
      type: 'warning',
      title: '性能考虑',
      content: '如果只需要一个属性动画，使用 animate*AsState 更简单高效。只有需要多个属性同步变化时才使用 updateTransition',
    },
    {
      type: 'error',
      title: '状态类型需要正确的 equals',
      content: '如果使用自定义类作为状态，必须正确实现 equals 方法，否则状态变化可能无法触发动画。建议使用 data class 或 enum',
    },
  ],

  relatedComponents: ['animate-as-state', 'animated-content', 'animated-visibility'],
  since: '1.0.0',
}
