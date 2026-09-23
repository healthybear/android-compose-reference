import type { ComponentEntry } from '../../types'

export const rowComponent: ComponentEntry = {
  id: 'row',
  demo: { id: 'row', sourceFile: 'RowDemo.kt' },
  name: 'Row',
  category: 'Layout',
  description: 'Row 是最基础的水平布局容器，将子元素按从左到右的顺序排列。支持灵活的间距分配和对齐方式。',
  tags: ['row', 'layout', 'horizontal', 'flex', 'container'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、内边距、背景等' },
    { name: 'horizontalArrangement', type: 'Arrangement.Horizontal', default: 'Arrangement.Start', description: '水平方向排列方式（Start/Center/End/SpaceBetween/SpaceAround/SpaceEvenly/spacedBy）' },
    { name: 'verticalAlignment', type: 'Alignment.Vertical', default: 'Alignment.Top', description: '垂直方向对齐方式（Top/CenterVertically/Bottom）' },
    { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '子元素内容，在 RowScope 中可使用 weight 和 align 修饰符' },
  ],
  examples: [
    {
      title: '基础水平布局',
      code: `Row {
    Text("左")
    Spacer(Modifier.weight(1f))
    Text("右")
}`,
    },
    {
      title: '均匀分布',
      code: `Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.SpaceEvenly
) {
    Text("A")
    Text("B")
    Text("C")
}`,
    },
    {
      title: '垂直居中对齐',
      code: `Row(
    modifier = Modifier.fillMaxWidth(),
    verticalAlignment = Alignment.CenterVertically
) {
    Icon(Icons.Default.Star, contentDescription = null)
    Spacer(Modifier.width(8.dp))
    Text("带图标的文本")
}`,
    },
    {
      title: '使用 weight 权重',
      code: `Row(modifier = Modifier.fillMaxWidth()) {
    Box(
        Modifier
            .weight(1f)
            .height(50.dp)
            .background(Color.Red)
    )
    Box(
        Modifier
            .weight(2f)
            .height(50.dp)
            .background(Color.Blue)
    )
}`,
    },
    {
      title: '子元素单独对齐',
      code: `Row(
    modifier = Modifier
        .fillMaxWidth()
        .height(100.dp),
    verticalAlignment = Alignment.Top
) {
    Text("顶部对齐")
    Text(
        "单独居中",
        modifier = Modifier.align(Alignment.CenterVertically)
    )
    Text(
        "单独底部",
        modifier = Modifier.align(Alignment.Bottom)
    )
}`,
    },
    {
      title: '固定间距',
      code: `Row(
    horizontalArrangement = Arrangement.spacedBy(12.dp)
) {
    repeat(3) {
        Box(
            Modifier
                .size(40.dp)
                .background(Color.Gray)
        )
    }
}`,
    },
  ],

  useCases: [
    {
      title: '列表项布局',
      description: '使用 Row 实现典型的列表项：左侧图标、中间文本、右侧操作按钮',
      code: `Row(
    modifier = Modifier
        .fillMaxWidth()
        .clickable { /* 点击处理 */ }
        .padding(16.dp),
    verticalAlignment = Alignment.CenterVertically
) {
    // 左侧头像
    Image(
        painter = painterResource(R.drawable.avatar),
        contentDescription = "头像",
        modifier = Modifier
            .size(48.dp)
            .clip(CircleShape)
    )

    Spacer(Modifier.width(12.dp))

    // 中间文本（占满剩余空间）
    Column(modifier = Modifier.weight(1f)) {
        Text("用户名", style = MaterialTheme.typography.bodyLarge)
        Text("最后消息内容", style = MaterialTheme.typography.bodySmall)
    }

    // 右侧时间戳
    Text(
        "12:30",
        style = MaterialTheme.typography.bodySmall,
        color = Color.Gray
    )
}`
    },
    {
      title: '工具栏布局',
      description: '实现左侧返回按钮、中间标题、右侧操作按钮的工具栏布局',
      code: `Row(
    modifier = Modifier
        .fillMaxWidth()
        .height(56.dp)
        .background(MaterialTheme.colorScheme.primary)
        .padding(horizontal = 4.dp),
    verticalAlignment = Alignment.CenterVertically
) {
    // 左侧返回按钮
    IconButton(onClick = { navController.popBackStack() }) {
        Icon(
            Icons.AutoMirrored.Filled.ArrowBack,
            contentDescription = "返回",
            tint = Color.White
        )
    }

    // 中间标题（占满剩余空间）
    Text(
        text = "页面标题",
        modifier = Modifier.weight(1f),
        style = MaterialTheme.typography.titleLarge,
        color = Color.White
    )

    // 右侧操作按钮
    IconButton(onClick = { /* 搜索 */ }) {
        Icon(Icons.Default.Search, contentDescription = "搜索", tint = Color.White)
    }
    IconButton(onClick = { /* 更多 */ }) {
        Icon(Icons.Default.MoreVert, contentDescription = "更多", tint = Color.White)
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 fillMaxWidth 时注意父容器约束',
      description: 'Row 需要明确的宽度约束才能正确应用 fillMaxWidth',
      goodExample: `// 父容器有明确尺寸
Box(modifier = Modifier.size(200.dp)) {
    Row(modifier = Modifier.fillMaxWidth()) {
        Text("正常显示")
    }
}`,
      badExample: `// 父容器没有约束，Row 宽度为 0
Row(modifier = Modifier.fillMaxWidth()) {
    // 不会显示，因为外层没有尺寸约束
}`
    },
    {
      title: 'horizontalArrangement 需要额外空间才生效',
      description: 'SpaceBetween/SpaceAround 等排列方式只在内容总宽度小于 Row 宽度时生效',
      goodExample: `Row(
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp),
    horizontalArrangement = Arrangement.SpaceBetween
) {
    Text("左侧")
    Text("右侧")
}`,
      badExample: `// Row 没有指定宽度，SpaceBetween 不生效
Row(
    horizontalArrangement = Arrangement.SpaceBetween
) {
    Text("左侧")
    Text("右侧")
}`
    },
    {
      title: '图标和文本组合时使用垂直居中',
      description: '避免图标和文本高度不一致导致的视觉对齐问题',
      goodExample: `Row(
    verticalAlignment = Alignment.CenterVertically
) {
    Icon(Icons.Default.Info, contentDescription = null)
    Spacer(Modifier.width(8.dp))
    Text("信息文本")
}`,
      badExample: `// 未设置对齐，图标和文本顶部对齐，看起来不协调
Row {
    Icon(Icons.Default.Info, contentDescription = null)
    Spacer(Modifier.width(8.dp))
    Text("信息文本")
}`
    },
    {
      title: '使用 Spacer 控制元素间距',
      description: '比为每个元素单独设置 padding 更灵活',
      goodExample: `Row {
    Text("项目 1")
    Spacer(Modifier.width(8.dp))
    Text("项目 2")
    Spacer(Modifier.weight(1f)) // 弹性间距
    Text("项目 3")
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'RowScope 提供专属修饰符',
      content: 'Row 的 content 在 RowScope 中执行，子元素可使用 Modifier.weight() 按比例分配空间，使用 Modifier.align() 单独设置对齐方式'
    },
    {
      type: 'warning',
      title: '避免在 LazyRow 中嵌套 Row',
      content: '不要在可滚动容器（LazyRow/ScrollableRow）中嵌套使用 Row(Modifier.fillMaxWidth())，会导致测量异常和性能问题'
    },
    {
      type: 'tip',
      title: 'weight() 与固定尺寸组合使用',
      content: '常见模式：固定尺寸的图标 + weight(1f) 的文本 + 固定尺寸的操作按钮，实现响应式布局'
    },
    {
      type: 'tip',
      title: 'Arrangement.spacedBy 控制统一间距',
      content: '使用 Arrangement.spacedBy(8.dp) 比手动添加多个 Spacer 更简洁，且自动处理首尾元素'
    },
    {
      type: 'danger',
      title: 'RTL 布局支持',
      content: '对于需要支持从右到左布局的应用，使用 Arrangement.Start/End 而不是 Arrangement.Left/Right，确保在 RTL 语言环境下正确镜像'
    },
  ],

  relatedComponents: ['column', 'box', 'lazy-row', 'spacer', 'flow-row'],
  since: '1.0.0',
}
