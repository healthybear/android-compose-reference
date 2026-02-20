import type { ComponentEntry } from '../../types'

export const detectTapGesturesComponent: ComponentEntry = {
  id: 'detect-tap-gestures',
  name: 'detectTapGestures',
  category: 'Gestures',
  description: '在 pointerInput 中检测点击、双击、长按、按下等精细点击手势，比 Modifier.clickable 提供更多控制。',
  tags: ['gesture', 'tap', 'click', 'longpress', '点击手势'],
  params: [
    { name: 'onTap', type: '((Offset) -> Unit)?', default: 'null', description: '单击回调，携带点击位置' },
    { name: 'onDoubleTap', type: '((Offset) -> Unit)?', default: 'null', description: '双击回调' },
    { name: 'onLongPress', type: '((Offset) -> Unit)?', default: 'null', description: '长按回调' },
    { name: 'onPress', type: 'suspend PressGestureScope.(Offset) -> Unit', default: 'NoPressGesture', description: '按下回调，可等待松手或取消' },
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
                onTap = { offset -> println("单击 $offset") },
                onDoubleTap = { offset -> println("双击 $offset") },
                onLongPress = { offset -> println("长按 $offset") }
            )
        },
    contentAlignment = Alignment.Center
) {
    Text("点击/双击/长按")
}`,
    },
    {
      title: '按下时改变外观（onPress）',
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
  ],
}
