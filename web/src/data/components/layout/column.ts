import type { ComponentEntry } from '../../types'

export const columnComponent: ComponentEntry = {
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
}
