import type { ComponentEntry } from '../../types'

export const linearProgressComponent: ComponentEntry = {
  id: 'linear-progress',
  name: 'LinearProgressIndicator',
  category: 'Feedback',
  description: '水平线性进度条，支持确定进度（0~1）和不确定进度（加载中）两种模式。',
  tags: ['progress', 'loading', 'indicator', 'linear', '进度条'],
  params: [
    { name: 'progress', type: '(() -> Float)?', default: 'null', description: '进度值函数，返回 0f~1f；为 null 时显示不确定动画' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，可控制宽度' },
    { name: 'color', type: 'Color', default: 'ProgressIndicatorDefaults.linearColor', description: '进度条颜色' },
    { name: 'trackColor', type: 'Color', default: 'ProgressIndicatorDefaults.linearTrackColor', description: '轨道背景色' },
    { name: 'strokeCap', type: 'StrokeCap', default: 'ProgressIndicatorDefaults.LinearStrokeCap', description: '端点形状' },
  ],
  examples: [
    {
      title: '不确定进度（加载中）',
      code: `LinearProgressIndicator(modifier = Modifier.fillMaxWidth())`,
    },
    {
      title: '确定进度',
      code: `var progress by remember { mutableFloatStateOf(0f) }

Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    LinearProgressIndicator(
        progress = { progress },
        modifier = Modifier.fillMaxWidth()
    )
    Text("\${(progress * 100).toInt()}%")
    Button(onClick = { progress = (progress + 0.1f).coerceAtMost(1f) }) {
        Text("+10%")
    }
}`,
    },
  ],
}
