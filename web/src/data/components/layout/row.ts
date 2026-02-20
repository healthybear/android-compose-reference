import type { ComponentEntry } from '../../types'

export const rowComponent: ComponentEntry = {
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
}
