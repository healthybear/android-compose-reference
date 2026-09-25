import type { ComponentEntry } from '../../types'

export const circularProgressComponent: ComponentEntry = {
  id: 'circular-progress',
  demo: { id: 'circular-progress', sourceFile: 'CircularProgressDemo.kt' },
  name: 'CircularProgressIndicator',
  category: 'Feedback',
  description: 'CircularProgressIndicator 是圆形进度指示器，支持确定进度（0-100%）和不确定旋转动画。常用于按钮加载态、全屏加载遮罩等场景。',
  tags: ['progress', 'loading', 'circular', 'spinner', 'indicator'],
  params: [
    { name: 'progress', type: '(() -> Float)?', default: 'null', description: '进度值函数，返回 0f~1f；null 时显示不确定旋转动画' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，可控制尺寸' },
    { name: 'color', type: 'Color', default: 'ProgressIndicatorDefaults.circularColor', description: '进度弧颜色' },
    { name: 'strokeWidth', type: 'Dp', default: 'ProgressIndicatorDefaults.CircularStrokeWidth (4.dp)', description: '线条宽度' },
    { name: 'trackColor', type: 'Color', default: 'ProgressIndicatorDefaults.circularTrackColor', description: '轨道背景色（确定进度时可见）' },
    { name: 'strokeCap', type: 'StrokeCap', default: 'StrokeCap.Round', description: '端点形状（Round/Butt/Square）' },
  ],
  examples: [
    {
      title: '不确定进度（旋转加载）',
      code: `// 默认旋转动画，用于未知加载时间
CircularProgressIndicator()`,
    },
    {
      title: '确定进度',
      code: `var progress by remember { mutableFloatStateOf(0.3f) }

Column(horizontalAlignment = Alignment.CenterHorizontally) {
    CircularProgressIndicator(
        progress = { progress }
    )
    Spacer(Modifier.height(16.dp))
    Text("30%")
    Slider(
        value = progress,
        onValueChange = { progress = it }
    )
}`,
    },
    {
      title: '全屏加载遮罩',
      code: `if (isLoading) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black.copy(alpha = 0.5f))
            .clickable(enabled = false) { },
        contentAlignment = Alignment.Center
    ) {
        CircularProgressIndicator(
            color = Color.White
        )
    }
}`,
    },
    {
      title: '按钮加载态',
      code: `Button(
    onClick = { isLoading = true },
    enabled = !isLoading
) {
    if (isLoading) {
        CircularProgressIndicator(
            modifier = Modifier.size(16.dp),
            strokeWidth = 2.dp,
            color = MaterialTheme.colorScheme.onPrimary
        )
        Spacer(Modifier.width(8.dp))
    }
    Text(if (isLoading) "提交中..." else "提交")
}`,
    },
    {
      title: '自定义尺寸和颜色',
      code: `Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
    // 小号
    CircularProgressIndicator(
        modifier = Modifier.size(24.dp),
        strokeWidth = 2.dp
    )

    // 默认
    CircularProgressIndicator()

    // 大号
    CircularProgressIndicator(
        modifier = Modifier.size(64.dp),
        strokeWidth = 6.dp,
        color = MaterialTheme.colorScheme.error
    )
}`,
    },
    {
      title: '文件下载进度',
      code: `var downloadProgress by remember { mutableFloatStateOf(0f) }

Card(modifier = Modifier.fillMaxWidth()) {
    Row(
        modifier = Modifier.padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        CircularProgressIndicator(
            progress = { downloadProgress },
            modifier = Modifier.size(48.dp)
        )
        Spacer(Modifier.width(16.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text("正在下载", style = MaterialTheme.typography.bodyLarge)
            Text(
                "65%",
                style = MaterialTheme.typography.bodySmall
            )
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '列表项加载',
      description: '在列表项中显示加载状态',
      code: `LazyColumn {
    items(items) { item ->
        ListItem(
            headlineContent = { Text(item.title) },
            trailingContent = {
                if (item.isLoading) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(24.dp),
                        strokeWidth = 2.dp
                    )
                }
            }
        )
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '确定进度使用 progress 参数',
      description: '能计算进度时使用确定进度，提供更好的用户体验',
      goodExample: `CircularProgressIndicator(progress = { downloadProgress })`,
      badExample: `CircularProgressIndicator()  // 已知进度却显示不确定动画`
    },
    {
      title: '按钮内进度指示器应缩小',
      description: '按钮内使用小尺寸和细线条',
      goodExample: `CircularProgressIndicator(
    modifier = Modifier.size(16.dp),
    strokeWidth = 2.dp
)`,
    },
    {
      title: '避免多个旋转动画',
      description: '页面上同时显示多个旋转动画会分散注意力',
      goodExample: `if (isLoading) {
    Box(Modifier.fillMaxSize(), Alignment.Center) {
        CircularProgressIndicator()  // 单一全局加载
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'progress 参数类型',
      content: 'progress 是函数类型 (() -> Float)，而非直接的 Float 值，这样可以避免不必要的重组'
    },
    {
      type: 'warning',
      title: 'progress 值范围',
      content: 'progress 必须在 0f~1f 之间，超出范围会被截断。0f 表示 0%，1f 表示 100%'
    },
    {
      type: 'tip',
      title: '默认尺寸为 48dp',
      content: 'CircularProgressIndicator 默认尺寸 48dp，使用 Modifier.size() 可以调整'
    },
    {
      type: 'tip',
      title: 'strokeCap 影响端点样式',
      content: 'StrokeCap.Round（圆润）适合大多数场景，StrokeCap.Butt（平直）适合完整圆环'
    },
  ],

  relatedComponents: ['linear-progress', 'button'],
  since: '1.0.0',
}
