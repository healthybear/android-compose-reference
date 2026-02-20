import type { ComponentEntry } from '../../types'

export const verticalDividerComponent: ComponentEntry = {
  id: 'vertical-divider',
  name: 'VerticalDivider',
  category: 'Material',
  description: '垂直分割线，用于在水平排列的元素之间添加视觉分隔，通常用于 Row 或 BottomAppBar 中。',
  tags: ['divider', 'vertical', 'separator', '分割线'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，通常设置高度' },
    { name: 'thickness', type: 'Dp', default: 'DividerDefaults.Thickness', description: '线条粗细（1.dp）' },
    { name: 'color', type: 'Color', default: 'DividerDefaults.color', description: '线条颜色' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `Row(
    modifier = Modifier.height(40.dp),
    verticalAlignment = Alignment.CenterVertically
) {
    Text("左侧内容")
    VerticalDivider(
        modifier = Modifier.padding(horizontal = 8.dp)
    )
    Text("右侧内容")
}`,
    },
    {
      title: '工具栏中的分隔',
      code: `Row(
    modifier = Modifier
        .fillMaxWidth()
        .height(56.dp)
        .padding(horizontal = 8.dp),
    verticalAlignment = Alignment.CenterVertically
) {
    IconButton(onClick = {}) { Icon(Icons.Default.FormatBold, null) }
    IconButton(onClick = {}) { Icon(Icons.Default.FormatItalic, null) }
    VerticalDivider(modifier = Modifier.height(24.dp).padding(horizontal = 4.dp))
    IconButton(onClick = {}) { Icon(Icons.Default.FormatAlignLeft, null) }
    IconButton(onClick = {}) { Icon(Icons.Default.FormatAlignCenter, null) }
}`,
    },
  ],
}
