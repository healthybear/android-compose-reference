import type { ComponentEntry } from '../../types'

export const updateTransitionComponent: ComponentEntry = {
  id: 'update-transition',
  name: 'updateTransition',
  category: 'Animation',
  description: '管理多个动画值同步过渡的 API，适合一个状态变化需要同时驱动多个属性动画的场景。',
  tags: ['animation', 'transition', 'multi', 'state', '多属性动画'],
  params: [
    { name: 'targetState', type: 'T', required: true, description: '目标状态，变化时所有子动画同步执行' },
    { name: 'label', type: 'String?', default: 'null', description: '调试标签，在 Android Studio 动画预览中显示' },
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
            boxState = if (boxState == BoxState.Collapsed) BoxState.Expanded else BoxState.Collapsed
        }
)`,
    },
    {
      title: '检查动画是否正在运行',
      code: `val transition = updateTransition(targetState = isExpanded, label = "expand")

// transition.isRunning 为 true 时动画正在执行
// 可用于禁用交互防止重复触发
Button(
    onClick = { isExpanded = !isExpanded },
    enabled = !transition.isRunning
) {
    Text("切换")
}`,
    },
  ],
}
