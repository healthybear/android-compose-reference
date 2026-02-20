import type { ComponentEntry } from '../../types'

export const textComponent: ComponentEntry = {
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
}
