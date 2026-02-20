import type { ComponentEntry } from '../../types'

export const detectDragGesturesComponent: ComponentEntry = {
  id: 'detect-drag-gestures',
  name: 'detectDragGestures',
  category: 'Gestures',
  description: '在 pointerInput 中检测任意方向的拖拽手势，比 Modifier.draggable 更灵活，支持二维拖拽。',
  tags: ['gesture', 'drag', 'pointer', 'freeform', '自由拖拽'],
  params: [
    { name: 'onDragStart', type: '(Offset) -> Unit', default: '{}', description: '拖拽开始回调，携带起始位置' },
    { name: 'onDragEnd', type: '() -> Unit', default: '{}', description: '拖拽结束回调' },
    { name: 'onDragCancel', type: '() -> Unit', default: '{}', description: '拖拽取消回调' },
    { name: 'onDrag', type: '(change: PointerInputChange, dragAmount: Offset) -> Unit', required: true, description: '拖拽中回调，dragAmount 为本次增量偏移' },
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
    val maxX = constraints.maxWidth - 80.dp.toPx()
    val maxY = constraints.maxHeight - 80.dp.toPx()

    Box(
        modifier = Modifier
            .offset { IntOffset(offset.x.roundToInt(), offset.y.roundToInt()) }
            .size(80.dp)
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
  ],
}
