import type { ComponentEntry } from '../../types'

export const spacerComponent: ComponentEntry = {
  id: 'spacer',
  demo: { id: 'spacer', sourceFile: 'SpacerDemo.kt' },
  name: 'Spacer',
  category: 'Layout',
  description: 'Spacer 是专门用于创建空白间距的轻量级组件。不渲染任何内容，只占据指定的空间，常用于 Row/Column 中分隔元素或实现弹性布局。',
  tags: ['spacer', 'layout', 'gap', 'space', 'padding', 'margin'],
  params: [
    { name: 'modifier', type: 'Modifier', required: true, description: '通过 Modifier.width/height/size/weight 指定占位尺寸。必须提供尺寸信息，否则 Spacer 不可见' },
  ],
  examples: [
    {
      title: '固定水平间距',
      code: `Row {
    Text("左")
    Spacer(modifier = Modifier.width(16.dp))
    Text("右")
}`,
    },
    {
      title: '固定垂直间距',
      code: `Column {
    Text("上")
    Spacer(modifier = Modifier.height(24.dp))
    Text("下")
}`,
    },
    {
      title: '弹性填充（推到两端）',
      code: `Row(modifier = Modifier.fillMaxWidth()) {
    Text("左侧")
    Spacer(modifier = Modifier.weight(1f))
    Text("右侧")
}`,
    },
    {
      title: '多个 Spacer 权重分配',
      code: `Row(modifier = Modifier.fillMaxWidth()) {
    Text("左")
    Spacer(Modifier.weight(1f))
    Text("中")
    Spacer(Modifier.weight(2f)) // 这个间距是左边的 2 倍
    Text("右")
}`,
    },
    {
      title: '占位符（保持布局稳定）',
      code: `Column {
    Text("始终显示的内容")
    if (showOptionalContent) {
        Text("可选内容")
    } else {
        // 保持布局高度不变
        Spacer(Modifier.height(20.dp))
    }
    Text("底部内容")
}`,
    },
  ],

  useCases: [
    {
      title: '工具栏左中右布局',
      description: '使用两个 weight(1f) 的 Spacer 实现中间元素居中，左右元素靠边',
      code: `Row(
    modifier = Modifier.fillMaxWidth(),
    verticalAlignment = Alignment.CenterVertically
) {
    // 左侧按钮
    IconButton(onClick = { }) {
        Icon(Icons.Default.Menu, contentDescription = "菜单")
    }

    // 左侧弹性空间
    Spacer(Modifier.weight(1f))

    // 中间标题（自然居中）
    Text("标题", style = MaterialTheme.typography.titleLarge)

    // 右侧弹性空间
    Spacer(Modifier.weight(1f))

    // 右侧按钮
    IconButton(onClick = { }) {
        Icon(Icons.Default.Search, contentDescription = "搜索")
    }
}`
    },
    {
      title: '底部固定按钮布局',
      description: '使用 weight(1f) 的 Spacer 将按钮推到底部',
      code: `Column(
    modifier = Modifier
        .fillMaxSize()
        .padding(16.dp)
) {
    // 顶部内容
    Text("页面内容", style = MaterialTheme.typography.bodyLarge)
    Text("更多描述信息...")

    // 弹性空白，将按钮推到底部
    Spacer(Modifier.weight(1f))

    // 底部按钮
    Button(
        onClick = { },
        modifier = Modifier.fillMaxWidth()
    ) {
        Text("确认")
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '优先使用 Arrangement.spacedBy',
      description: '对于统一间距，Arrangement.spacedBy 比多个 Spacer 更简洁',
      goodExample: `Column(
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    Text("项目 1")
    Text("项目 2")
    Text("项目 3")
}`,
      badExample: `Column {
    Text("项目 1")
    Spacer(Modifier.height(8.dp))
    Text("项目 2")
    Spacer(Modifier.height(8.dp))
    Text("项目 3")
}`
    },
    {
      title: '使用 weight 实现响应式间距',
      description: 'weight(1f) 可以让 Spacer 自动适应可用空间',
      goodExample: `Row(modifier = Modifier.fillMaxWidth()) {
    Button(onClick = { }) { Text("取消") }
    Spacer(Modifier.weight(1f))
    Button(onClick = { }) { Text("确认") }
}`,
      badExample: `// 固定间距在不同屏幕尺寸下效果不佳
Row(modifier = Modifier.fillMaxWidth()) {
    Button(onClick = { }) { Text("取消") }
    Spacer(Modifier.width(200.dp))
    Button(onClick = { }) { Text("确认") }
}`
    },
    {
      title: '避免不必要的 Spacer',
      description: '如果可以用 padding 解决，优先使用 padding',
      goodExample: `Row {
    Icon(
        Icons.Default.Star,
        contentDescription = null,
        modifier = Modifier.padding(end = 8.dp)
    )
    Text("评分")
}`,
      badExample: `Row {
    Icon(Icons.Default.Star, contentDescription = null)
    Spacer(Modifier.width(8.dp))
    Text("评分")
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Spacer 是空组件',
      content: 'Spacer 不渲染任何内容，纯粹用于占据空间。它的实现非常轻量，性能开销极小'
    },
    {
      type: 'warning',
      title: '必须指定尺寸',
      content: 'Spacer 必须通过 Modifier 指定至少一个维度的尺寸（width/height/size/weight），否则不会占据任何空间'
    },
    {
      type: 'tip',
      title: 'weight 只在 Row/Column 中有效',
      content: 'Modifier.weight() 只能在 RowScope 和 ColumnScope 中使用，在普通 Box 中无效'
    },
    {
      type: 'tip',
      title: '组合使用固定尺寸和 weight',
      content: '可以在同一个布局中混合使用固定尺寸的 Spacer 和 weight 的 Spacer，实现复杂的间距分配'
    },
    {
      type: 'tip',
      title: '调试时可临时添加背景',
      content: '调试布局时，可以为 Spacer 添加 .background(Color.Red) 来可视化其占据的空间'
    },
  ],

  relatedComponents: ['column', 'row', 'box'],
  since: '1.0.0',
}
