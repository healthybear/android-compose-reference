import type { ComponentEntry } from '../../types'

export const textComponent: ComponentEntry = {
  id: 'text',
  name: 'Text',
  category: 'Foundation',
  description: 'Text 是 Compose 中显示文本内容的基础组件，支持丰富的排版样式、文本对齐、溢出处理、字体设置等功能。是所有文本显示的基础。',
  tags: ['text', 'typography', 'string', 'label', 'paragraph'],
  params: [
    { name: 'text', type: 'String', required: true, description: '要显示的文本内容' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、内边距、背景等' },
    { name: 'color', type: 'Color', default: 'Color.Unspecified', description: '文本颜色，未指定时使用 LocalContentColor' },
    { name: 'fontSize', type: 'TextUnit', default: 'TextUnit.Unspecified', description: '字体大小，如 16.sp' },
    { name: 'fontStyle', type: 'FontStyle?', default: 'null', description: '字体样式（Normal/Italic）' },
    { name: 'fontWeight', type: 'FontWeight?', default: 'null', description: '字体粗细（Thin/Light/Normal/Medium/Bold/ExtraBold）' },
    { name: 'fontFamily', type: 'FontFamily?', default: 'null', description: '字体系列' },
    { name: 'letterSpacing', type: 'TextUnit', default: 'TextUnit.Unspecified', description: '字符间距' },
    { name: 'textDecoration', type: 'TextDecoration?', default: 'null', description: '文本装饰（Underline/LineThrough）' },
    { name: 'textAlign', type: 'TextAlign?', default: 'null', description: '文本对齐方式（Left/Center/Right/Justify/Start/End）' },
    { name: 'lineHeight', type: 'TextUnit', default: 'TextUnit.Unspecified', description: '行高' },
    { name: 'overflow', type: 'TextOverflow', default: 'TextOverflow.Clip', description: '文本溢出处理方式（Clip/Ellipsis/Visible）' },
    { name: 'softWrap', type: 'Boolean', default: 'true', description: '是否在软换行符处换行' },
    { name: 'maxLines', type: 'Int', default: 'Int.MAX_VALUE', description: '最大行数，配合 overflow 使用' },
    { name: 'minLines', type: 'Int', default: '1', description: '最小行数，用于预留空间' },
    { name: 'onTextLayout', type: '(TextLayoutResult) -> Unit', default: '{}', description: '文本布局完成的回调，用于获取文本尺寸等信息' },
    { name: 'style', type: 'TextStyle', default: 'LocalTextStyle.current', description: '文本样式，通常使用 MaterialTheme.typography 中的预设样式' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `Text(text = "Hello, Compose!")`,
    },
    {
      title: '使用 Material 排版样式',
      code: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    Text("Display Large", style = MaterialTheme.typography.displayLarge)
    Text("Headline Medium", style = MaterialTheme.typography.headlineMedium)
    Text("Title Large", style = MaterialTheme.typography.titleLarge)
    Text("Body Large", style = MaterialTheme.typography.bodyLarge)
    Text("Label Small", style = MaterialTheme.typography.labelSmall)
}`,
    },
    {
      title: '自定义样式',
      code: `Text(
    text = "标题文本",
    fontSize = 24.sp,
    fontWeight = FontWeight.Bold,
    color = MaterialTheme.colorScheme.primary,
    letterSpacing = 0.15.sp
)`,
    },
    {
      title: '多行截断',
      code: `Text(
    text = "这是一段很长的文本内容，超出部分会被截断显示省略号，用户可以点击查看完整内容。",
    maxLines = 2,
    overflow = TextOverflow.Ellipsis,
    modifier = Modifier.width(200.dp)
)`,
    },
    {
      title: '文本对齐',
      code: `Column(modifier = Modifier.fillMaxWidth()) {
    Text("左对齐", textAlign = TextAlign.Start, modifier = Modifier.fillMaxWidth())
    Text("居中对齐", textAlign = TextAlign.Center, modifier = Modifier.fillMaxWidth())
    Text("右对齐", textAlign = TextAlign.End, modifier = Modifier.fillMaxWidth())
    Text(
        "两端对齐示例，文本会均匀分布在整行宽度内。",
        textAlign = TextAlign.Justify,
        modifier = Modifier.fillMaxWidth()
    )
}`,
    },
    {
      title: '文本装饰',
      code: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    Text("下划线", textDecoration = TextDecoration.Underline)
    Text("删除线", textDecoration = TextDecoration.LineThrough)
    Text(
        "下划线 + 删除线",
        textDecoration = TextDecoration.Underline + TextDecoration.LineThrough
    )
}`,
    },
    {
      title: '响应式文本截断',
      code: `var expanded by remember { mutableStateOf(false) }

Text(
    text = longText,
    maxLines = if (expanded) Int.MAX_VALUE else 3,
    overflow = TextOverflow.Ellipsis,
    modifier = Modifier
        .fillMaxWidth()
        .clickable { expanded = !expanded }
)`,
    },
  ],
  demo: { id: 'text', sourceFile: 'TextDemo.kt' },

  useCases: [
    {
      title: '列表项标题与副标题',
      description: '使用不同样式组合展示主次信息',
      code: `ListItem(
    headlineContent = {
        Text(
            "主标题",
            style = MaterialTheme.typography.bodyLarge,
            fontWeight = FontWeight.Medium
        )
    },
    supportingContent = {
        Text(
            "副标题或描述文本",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    },
    trailingContent = {
        Text(
            "12:30",
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.outline
        )
    }
)`
    },
    {
      title: '动态文本度量',
      description: '使用 onTextLayout 获取文本实际尺寸，用于自定义布局',
      code: `var textWidth by remember { mutableStateOf(0) }

Text(
    text = "测量文本宽度",
    onTextLayout = { layoutResult ->
        textWidth = layoutResult.size.width
    }
)

Text("文本宽度: 285px")`
    },
  ],

  bestPractices: [
    {
      title: '使用 MaterialTheme.typography 预设样式',
      description: '保持应用排版一致性，响应主题变化',
      goodExample: `Text(
    text = "标题",
    style = MaterialTheme.typography.titleLarge
)`,
      badExample: `Text(
    text = "标题",
    fontSize = 22.sp,
    fontWeight = FontWeight.Medium,
    lineHeight = 28.sp
)`
    },
    {
      title: 'maxLines 配合 overflow 使用',
      description: '限制行数时必须指定溢出处理方式',
      goodExample: `Text(
    text = longText,
    maxLines = 3,
    overflow = TextOverflow.Ellipsis  // 明确溢出显示省略号
)`,
      badExample: `Text(
    text = longText,
    maxLines = 3
    // 未指定 overflow，超出部分被裁剪，无省略号
)`
    },
    {
      title: '使用 LocalContentColor 继承颜色',
      description: '未指定颜色时自动适配父容器的内容色',
      goodExample: `Surface(color = MaterialTheme.colorScheme.primary) {
    // Text 自动使用 onPrimary 颜色
    Text("文本")
}`,
      badExample: `Surface(color = MaterialTheme.colorScheme.primary) {
    // 硬编码颜色，无法适配主题
    Text("文本", color = Color.White)
}`
    },
    {
      title: '避免在 Text 内进行复杂计算',
      description: '将计算逻辑提取到外部，避免每次重组都重新计算',
      goodExample: `val formattedText = remember(data) {
    formatComplexData(data)
}
Text(formattedText)`,
      badExample: `Text(
    // 每次重组都会重新格式化
    text = formatComplexData(data)
)`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Text 是无状态组件',
      content: 'Text 不处理用户输入或交互。如需可编辑文本，使用 TextField、BasicTextField 或 OutlinedTextField'
    },
    {
      type: 'warning',
      title: 'overflow = TextOverflow.Ellipsis 需要宽度约束',
      content: '省略号截断只有在 Text 有明确宽度约束时才生效。如果父容器是无限宽（如 Row），需要使用 Modifier.width() 或 Modifier.fillMaxWidth() 限制宽度'
    },
    {
      type: 'tip',
      title: '使用 AnnotatedString 实现富文本',
      content: 'Text 支持 AnnotatedString 类型的 text 参数，可以实现部分文字样式变化、点击等富文本效果'
    },
    {
      type: 'tip',
      title: 'minLines 用于预留空间',
      content: 'minLines 可以确保 Text 始终占据指定行数的高度，即使实际文本不足，避免布局抖动'
    },
    {
      type: 'danger',
      title: '注意无障碍性',
      content: '对于纯装饰性文本，考虑使用 Modifier.semantics { contentDescription = null } 让屏幕阅读器跳过。对于重要信息，确保文本与背景有足够对比度'
    },
  ],

  relatedComponents: ['text-field', 'outlined-text-field', 'basic-text-field'],
  since: '1.0.0',
}
