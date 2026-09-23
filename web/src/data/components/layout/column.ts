import type { ComponentEntry } from '../../types'

export const columnComponent: ComponentEntry = {
  id: 'column',
  demo: { id: 'column', sourceFile: 'ColumnDemo.kt' },
  name: 'Column',
  category: 'Layout',
  description: 'Column 是最基础的垂直布局容器，将子元素按从上到下的顺序排列。支持灵活的间距分配和对齐方式。',
  tags: ['column', 'layout', 'vertical', 'flex', 'container'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、内边距、背景等' },
    { name: 'verticalArrangement', type: 'Arrangement.Vertical', default: 'Arrangement.Top', description: '垂直方向排列方式（Top/Center/Bottom/SpaceBetween/SpaceAround/SpaceEvenly/spacedBy）' },
    { name: 'horizontalAlignment', type: 'Alignment.Horizontal', default: 'Alignment.Start', description: '水平方向对齐方式（Start/CenterHorizontally/End）' },
    { name: 'content', type: '@Composable ColumnScope.() -> Unit', required: true, description: '子元素内容，在 ColumnScope 中可使用 weight 和 align 修饰符' },
  ],
  examples: [
    {
      title: '基础垂直布局',
      code: `Column {
    Text("第一行")
    Text("第二行")
    Text("第三行")
}`,
    },
    {
      title: '居中对齐',
      code: `Column(
    modifier = Modifier.fillMaxSize(),
    verticalArrangement = Arrangement.Center,
    horizontalAlignment = Alignment.CenterHorizontally
) {
    Text("垂直水平居中")
}`,
    },
    {
      title: '间距分配',
      code: `Column(
    verticalArrangement = Arrangement.spacedBy(16.dp)
) {
    Text("项目 1")
    Text("项目 2")
    Text("项目 3")
}`,
    },
    {
      title: '使用 weight 权重',
      code: `Column(modifier = Modifier.fillMaxSize()) {
    Box(
        Modifier
            .weight(1f)
            .fillMaxWidth()
            .background(Color.Red)
    )
    Box(
        Modifier
            .weight(2f)
            .fillMaxWidth()
            .background(Color.Blue)
    )
}`,
    },
    {
      title: '子元素单独对齐',
      code: `Column(
    modifier = Modifier.fillMaxWidth(),
    horizontalAlignment = Alignment.Start
) {
    Text("默认左对齐")
    Text(
        "单独居中",
        modifier = Modifier.align(Alignment.CenterHorizontally)
    )
    Text(
        "单独右对齐",
        modifier = Modifier.align(Alignment.End)
    )
}`,
    },
    {
      title: 'SpaceBetween 布局',
      code: `Column(
    modifier = Modifier
        .fillMaxSize()
        .padding(16.dp),
    verticalArrangement = Arrangement.SpaceBetween
) {
    Text("顶部内容")
    Text("中间内容")
    Text("底部内容")
}`,
    },
  ],

  useCases: [
    {
      title: '表单布局',
      description: '使用 Column 构建垂直表单，配合 spacedBy 统一间距',
      code: `Column(
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(12.dp)
) {
    Text("用户信息", style = MaterialTheme.typography.titleMedium)
    OutlinedTextField(
        value = name,
        onValueChange = { name = it },
        label = { Text("姓名") },
        modifier = Modifier.fillMaxWidth()
    )
    OutlinedTextField(
        value = email,
        onValueChange = { email = it },
        label = { Text("邮箱") },
        modifier = Modifier.fillMaxWidth()
    )
    Button(
        onClick = { /* 提交 */ },
        modifier = Modifier.fillMaxWidth()
    ) {
        Text("提交")
    }
}`
    },
    {
      title: '页面整体布局',
      description: '使用 weight 实现头部固定、内容滚动、底部固定的经典布局',
      code: `Column(modifier = Modifier.fillMaxSize()) {
    // 顶部标题栏（固定高度）
    TopAppBar(title = { Text("我的应用") })

    // 可滚动内容区（占满剩余空间）
    LazyColumn(
        modifier = Modifier.weight(1f)
    ) {
        items(100) { index ->
            Text("项目 $index")
        }
    }

    // 底部按钮栏（固定高度）
    Button(
        onClick = { },
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        Text("操作按钮")
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 fillMaxSize 时注意父容器约束',
      description: 'Column 需要明确的高度约束才能正确应用 fillMaxSize',
      goodExample: `// 父容器有明确尺寸
Box(modifier = Modifier.size(200.dp)) {
    Column(modifier = Modifier.fillMaxSize()) {
        Text("正常显示")
    }
}`,
      badExample: `// 父容器没有约束，Column 高度为 0
Column(modifier = Modifier.fillMaxSize()) {
    // 不会显示，因为外层没有尺寸约束
}`
    },
    {
      title: 'verticalArrangement 需要额外空间才生效',
      description: 'SpaceBetween/SpaceAround 等排列方式只在内容总高度小于 Column 高度时生效',
      goodExample: `Column(
    modifier = Modifier
        .fillMaxHeight()
        .padding(16.dp),
    verticalArrangement = Arrangement.SpaceBetween
) {
    Text("顶部")
    Text("底部")
}`,
      badExample: `// Column 没有指定高度，SpaceBetween 不生效
Column(
    verticalArrangement = Arrangement.SpaceBetween
) {
    Text("顶部")
    Text("底部")
}`
    },
    {
      title: '使用 spacedBy 统一子元素间距',
      description: '比为每个子元素单独设置 padding 更简洁、一致',
      goodExample: `Column(
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    Text("项目 1")
    Text("项目 2")
    Text("项目 3")
}`,
      badExample: `Column {
    Text("项目 1", modifier = Modifier.padding(bottom = 8.dp))
    Text("项目 2", modifier = Modifier.padding(bottom = 8.dp))
    Text("项目 3")
}`
    },
    {
      title: 'Modifier 顺序很重要',
      description: 'padding 在 background 之前和之后效果不同',
      goodExample: `Column(
    modifier = Modifier
        .background(Color.LightGray)  // 先背景
        .padding(16.dp)               // 后内边距
) {
    Text("内边距在背景内部")
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'ColumnScope 提供专属修饰符',
      content: 'Column 的 content 在 ColumnScope 中执行，子元素可使用 Modifier.weight() 按比例分配空间，使用 Modifier.align() 单独设置对齐方式'
    },
    {
      type: 'warning',
      title: '避免在 LazyColumn 中嵌套 Column',
      content: '不要在可滚动容器（LazyColumn/ScrollableColumn）中嵌套使用 Column(Modifier.fillMaxHeight())，会导致测量异常和性能问题'
    },
    {
      type: 'tip',
      title: '使用 weight(1f, fill = false) 优化性能',
      content: '当子元素不需要填满分配的空间时，使用 weight(1f, fill = false) 可以避免不必要的重组'
    },
    {
      type: 'tip',
      title: 'Arrangement.spacedBy 可以添加首尾间距',
      content: '使用 Arrangement.spacedBy(8.dp, Alignment.Top) 可以在保持间距的同时控制对齐方式'
    },
    {
      type: 'danger',
      title: '注意无障碍性',
      content: '对于复杂的垂直布局，考虑为 Column 添加 semantics { contentDescription = "..." } 帮助屏幕阅读器理解布局结构'
    },
  ],

  relatedComponents: ['row', 'box', 'lazy-column', 'spacer', 'surface'],
  since: '1.0.0',
}
