import type { ComponentEntry } from '../../types'

export const circularProgressComponent: ComponentEntry = {
  id: 'circular-progress',
  name: 'CircularProgressIndicator',
  category: 'Feedback',
  description: '圆形进度指示器，支持确定进度和不确定旋转动画，常用于按钮加载态或全屏加载遮罩。',
  tags: ['progress', 'loading', 'circular', 'spinner', '圆形进度'],
  params: [
    { name: 'progress', type: '(() -> Float)?', default: 'null', description: '进度值函数，返回 0f~1f；为 null 时显示旋转动画' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，可控制尺寸' },
    { name: 'color', type: 'Color', default: 'ProgressIndicatorDefaults.circularColor', description: '进度弧颜色' },
    { name: 'strokeWidth', type: 'Dp', default: 'ProgressIndicatorDefaults.CircularStrokeWidth', description: '线条宽度' },
    { name: 'trackColor', type: 'Color', default: 'ProgressIndicatorDefaults.circularTrackColor', description: '轨道背景色' },
    { name: 'strokeCap', type: 'StrokeCap', default: 'ProgressIndicatorDefaults.CircularIndeterminateStrokeCap', description: '端点形状' },
  ],
  examples: [
    {
      title: '不确定进度（旋转加载）',
      code: `CircularProgressIndicator()`,
    },
    {
      title: '全屏加载遮罩',
      code: `if (isLoading) {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        CircularProgressIndicator()
    }
}`,
    },
    {
      title: '按钮加载态',
      code: `Button(onClick = { /* 提交 */ }, enabled = !isLoading) {
    if (isLoading) {
        CircularProgressIndicator(
            modifier = Modifier.size(16.dp),
            strokeWidth = 2.dp,
            color = MaterialTheme.colorScheme.onPrimary
        )
        Spacer(Modifier.width(8.dp))
    }
    Text("提交")
}`,
    },
  ],
}
