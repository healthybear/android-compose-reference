import type { ComponentEntry } from '../../types'

export const infiniteTransitionComponent: ComponentEntry = {
  id: 'infinite-transition',
  name: 'rememberInfiniteTransition',
  category: 'Animation',
  description: '创建无限循环动画，适合加载指示器、呼吸灯、闪烁效果等持续运行的动画场景。',
  tags: ['animation', 'infinite', 'loop', 'repeat', '循环动画'],
  params: [
    { name: 'label', type: 'String', default: '"InfiniteTransition"', description: '调试标签' },
  ],
  examples: [
    {
      title: '呼吸灯效果',
      code: `val infiniteTransition = rememberInfiniteTransition(label = "pulse")

val alpha by infiniteTransition.animateFloat(
    initialValue = 0.2f,
    targetValue = 1f,
    animationSpec = infiniteRepeatable(
        animation = tween(1000),
        repeatMode = RepeatMode.Reverse
    ),
    label = "alpha"
)

Box(
    modifier = Modifier
        .size(80.dp)
        .alpha(alpha)
        .background(MaterialTheme.colorScheme.primary, CircleShape)
)`,
    },
    {
      title: '旋转加载动画',
      code: `val infiniteTransition = rememberInfiniteTransition(label = "rotate")

val rotation by infiniteTransition.animateFloat(
    initialValue = 0f,
    targetValue = 360f,
    animationSpec = infiniteRepeatable(
        animation = tween(1000, easing = LinearEasing)
    ),
    label = "rotation"
)

Icon(
    Icons.Default.Refresh,
    contentDescription = "加载中",
    modifier = Modifier.rotate(rotation)
)`,
    },
    {
      title: '颜色渐变循环',
      code: `val infiniteTransition = rememberInfiniteTransition(label = "color")

val color by infiniteTransition.animateColor(
    initialValue = MaterialTheme.colorScheme.primary,
    targetValue = MaterialTheme.colorScheme.tertiary,
    animationSpec = infiniteRepeatable(
        animation = tween(2000),
        repeatMode = RepeatMode.Reverse
    ),
    label = "color"
)

Box(modifier = Modifier.fillMaxWidth().height(4.dp).background(color))`,
    },
  ],
}
