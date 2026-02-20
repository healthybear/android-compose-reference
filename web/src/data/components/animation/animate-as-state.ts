import type { ComponentEntry } from '../../types'

export const animateAsStateComponent: ComponentEntry = {
  id: 'animate-as-state',
  name: 'animate*AsState',
  category: 'Animation',
  description: '将普通状态值转换为带动画的状态，值变化时自动执行补间动画，是最简单的动画 API。',
  tags: ['animation', 'state', 'tween', 'spring', '状态动画'],
  params: [
    { name: 'targetValue', type: 'T', required: true, description: '目标值，变化时触发动画' },
    { name: 'animationSpec', type: 'AnimationSpec<T>', default: 'spring()', description: '动画规格，spring（弹簧）或 tween（补间）' },
    { name: 'label', type: 'String', default: '"animate*AsState"', description: '调试标签' },
    { name: 'finishedListener', type: '((T) -> Unit)?', default: 'null', description: '动画完成回调' },
  ],
  examples: [
    {
      title: '尺寸/透明度动画',
      code: `var expanded by remember { mutableStateOf(false) }

val size by animateDpAsState(
    targetValue = if (expanded) 200.dp else 80.dp,
    animationSpec = spring(dampingRatio = Spring.DampingRatioMediumBouncy),
    label = "size"
)
val alpha by animateFloatAsState(
    targetValue = if (expanded) 1f else 0.3f,
    label = "alpha"
)

Box(
    modifier = Modifier
        .size(size)
        .alpha(alpha)
        .background(MaterialTheme.colorScheme.primary, RoundedCornerShape(12.dp))
        .clickable { expanded = !expanded }
)`,
    },
    {
      title: '颜色动画',
      code: `var selected by remember { mutableStateOf(false) }

val backgroundColor by animateColorAsState(
    targetValue = if (selected) MaterialTheme.colorScheme.primaryContainer
                  else MaterialTheme.colorScheme.surfaceVariant,
    animationSpec = tween(durationMillis = 300),
    label = "bgColor"
)

Box(
    modifier = Modifier
        .fillMaxWidth()
        .height(56.dp)
        .background(backgroundColor)
        .clickable { selected = !selected },
    contentAlignment = Alignment.Center
) {
    Text(if (selected) "已选中" else "点击选中")
}

// 其他变体：animateIntAsState、animateOffsetAsState、animateSizeAsState、animateRectAsState`,
    },
  ],
}
