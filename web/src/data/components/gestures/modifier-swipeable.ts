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
  ],
}
