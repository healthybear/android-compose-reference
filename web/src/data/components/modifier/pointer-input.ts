import type { ComponentEntry } from '../../types'

export const pointerInputComponent: ComponentEntry = {
  id: 'modifier-pointer-input',
  name: 'Modifier.pointerInput',
  category: 'Modifier',
  description: '底层指针输入处理，通过 PointerInputScope 挂起函数处理原始触摸/鼠标事件，是 detectTapGestures 等高层 API 的基础。',
  tags: ['pointer', 'touch', 'gesture', 'input', '指针输入'],
  params: [
    { name: 'key1', type: 'Any?', required: true, description: '当 key 变化时重启手势处理协程，通常传入与手势相关的状态' },
    { name: 'block', type: 'suspend PointerInputScope.() -> Unit', required: true, description: '手势处理挂起函数，在此使用 detect* 系列函数' },
  ],
  examples: [
    {
      title: '自定义点击与长按',
      code: `Box(
    modifier = Modifier
        .size(100.dp)
        .background(MaterialTheme.colorScheme.primary)
        .pointerInput(Unit) {
            detectTapGestures(
                onTap = { offset ->
                    println("点击位置：\${offset.x}, \${offset.y}")
                },
                onLongPress = { offset ->
                    println("长按位置：\${offset.x}, \${offset.y}")
                },
                onDoubleTap = {
                    println("双击")
                }
            )
        }
)`,
    },
    {
      title: '多点触控（原始事件）',
      code: `var pointerCount by remember { mutableIntStateOf(0) }

Box(
    modifier = Modifier
        .fillMaxSize()
        .pointerInput(Unit) {
            awaitEachGesture {
                // 等待第一个手指按下
                val down = awaitFirstDown()
                pointerCount = 1

                // 持续追踪所有指针
                do {
                    val event = awaitPointerEvent()
                    pointerCount = event.changes.count { it.pressed }
                } while (event.changes.any { it.pressed })

                pointerCount = 0
            }
        },
    contentAlignment = Alignment.Center
) {
    Text("当前触点数：\$pointerCount")
}`,
    },
    {
      title: '自定义拖拽（原始实现）',
      code: `var offset by remember { mutableStateOf(Offset.Zero) }

Box(
    modifier = Modifier
        .offset { IntOffset(offset.x.roundToInt(), offset.y.roundToInt()) }
        .size(80.dp)
        .background(MaterialTheme.colorScheme.tertiary, CircleShape)
        .pointerInput(Unit) {
            detectDragGestures { _, dragAmount ->
                offset += dragAmount
            }
        }
)`,
    },
  ],
}
