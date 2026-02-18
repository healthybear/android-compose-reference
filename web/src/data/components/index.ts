import type { ComponentEntry } from '../types'

export const sampleComponents: ComponentEntry[] = [
  {
    id: 'text',
    name: 'Text',
    category: 'Foundation',
    description: '显示文本内容的基础组件，支持样式、对齐、溢出处理等。',
    tags: ['text', 'typography', 'string', 'label'],
    params: [
      { name: 'text', type: 'String', required: true, description: '要显示的文本内容' },
      { name: 'color', type: 'Color', default: 'Color.Unspecified', description: '文本颜色' },
      { name: 'fontSize', type: 'TextUnit', default: 'TextUnit.Unspecified', description: '字体大小' },
      { name: 'fontWeight', type: 'FontWeight?', default: 'null', description: '字体粗细' },
      { name: 'textAlign', type: 'TextAlign?', default: 'null', description: '文本对齐方式' },
      { name: 'maxLines', type: 'Int', default: 'Int.MAX_VALUE', description: '最大行数' },
      { name: 'overflow', type: 'TextOverflow', default: 'TextOverflow.Clip', description: '文本溢出处理方式' },
    ],
    examples: [
      {
        title: '基础用法',
        code: `Text(text = "Hello, Compose!")`,
      },
      {
        title: '样式定制',
        code: `Text(
    text = "标题文本",
    fontSize = 24.sp,
    fontWeight = FontWeight.Bold,
    color = MaterialTheme.colorScheme.primary
)`,
      },
      {
        title: '多行截断',
        code: `Text(
    text = "这是一段很长的文本内容，超出部分会被截断显示...",
    maxLines = 2,
    overflow = TextOverflow.Ellipsis
)`,
      },
    ],
    demoId: 'text',
  },
  {
    id: 'button',
    name: 'Button',
    category: 'Material',
    description: 'Material Design 按钮，响应点击事件，支持启用/禁用状态。',
    tags: ['button', 'click', 'material', 'interaction', 'action'],
    params: [
      { name: 'onClick', type: '() -> Unit', required: true, description: '点击时的回调' },
      { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用按钮' },
      { name: 'colors', type: 'ButtonColors', default: 'ButtonDefaults.buttonColors()', description: '按钮颜色配置' },
      { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '按钮内容插槽' },
    ],
    examples: [
      {
        title: '基础按钮',
        code: `Button(onClick = { /* 处理点击 */ }) {
    Text("点击我")
}`,
      },
      {
        title: '禁用状态',
        code: `Button(
    onClick = {},
    enabled = false
) {
    Text("不可用")
}`,
      },
      {
        title: '带图标的按钮',
        code: `Button(onClick = { /* 处理点击 */ }) {
    Icon(Icons.Default.Add, contentDescription = null)
    Spacer(Modifier.width(8.dp))
    Text("添加")
}`,
      },
    ],
    demoId: 'button',
  },
  {
    id: 'column',
    name: 'Column',
    category: 'Layout',
    description: '将子元素垂直排列的布局容器。',
    tags: ['column', 'layout', 'vertical', 'flex'],
    params: [
      { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
      { name: 'verticalArrangement', type: 'Arrangement.Vertical', default: 'Arrangement.Top', description: '垂直方向排列方式' },
      { name: 'horizontalAlignment', type: 'Alignment.Horizontal', default: 'Alignment.Start', description: '水平方向对齐方式' },
      { name: 'content', type: '@Composable ColumnScope.() -> Unit', required: true, description: '子元素内容' },
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
    ],
  },
  {
    id: 'row',
    name: 'Row',
    category: 'Layout',
    description: '将子元素水平排列的布局容器。',
    tags: ['row', 'layout', 'horizontal', 'flex'],
    params: [
      { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
      { name: 'horizontalArrangement', type: 'Arrangement.Horizontal', default: 'Arrangement.Start', description: '水平方向排列方式' },
      { name: 'verticalAlignment', type: 'Alignment.Vertical', default: 'Alignment.Top', description: '垂直方向对齐方式' },
      { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '子元素内容' },
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
    ],
  },
  {
    id: 'box',
    name: 'Box',
    category: 'Layout',
    description: '将子元素叠加放置的布局容器，类似 FrameLayout。',
    tags: ['box', 'layout', 'stack', 'overlay', 'frame'],
    params: [
      { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
      { name: 'contentAlignment', type: 'Alignment', default: 'Alignment.TopStart', description: '子元素默认对齐方式' },
      { name: 'content', type: '@Composable BoxScope.() -> Unit', required: true, description: '子元素内容' },
    ],
    examples: [
      {
        title: '叠加布局',
        code: `Box(
    modifier = Modifier.size(100.dp),
    contentAlignment = Alignment.Center
) {
    // 背景
    Box(modifier = Modifier.fillMaxSize().background(Color.Blue))
    // 前景文字
    Text("居中", color = Color.White)
}`,
      },
    ],
  },
]

export const allComponents = sampleComponents

export const categories = [...new Set(sampleComponents.map(c => c.category))]
