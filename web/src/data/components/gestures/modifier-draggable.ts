import type { ComponentEntry } from '../../types'

export const draggableComponent: ComponentEntry = {
  id: 'modifier-draggable',
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
  ],
}
