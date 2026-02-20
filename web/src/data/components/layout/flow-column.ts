import type { ComponentEntry } from '../../types'

export const flowColumnComponent: ComponentEntry = {
  id: 'flow-column',
  name: 'FlowColumn',
  category: 'Layout',
  description: '垂直流式布局，子元素超出高度时自动换列。',
  tags: ['flowcolumn', 'layout', 'wrap', 'flow', 'column'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'verticalArrangement', type: 'Arrangement.Vertical', default: 'Arrangement.Top', description: '垂直排列方式' },
    { name: 'horizontalArrangement', type: 'Arrangement.Horizontal', default: 'Arrangement.Start', description: '列间水平排列方式' },
    { name: 'maxItemsInEachColumn', type: 'Int', default: 'Int.MAX_VALUE', description: '每列最多子元素数' },
    { name: 'content', type: '@Composable FlowColumnScope.() -> Unit', required: true, description: '子元素内容' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `FlowColumn(
    modifier = Modifier.height(200.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    repeat(10) { Text("Item $it") }
}`,
    },
  ],
}
