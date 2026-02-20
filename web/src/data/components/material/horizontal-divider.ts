import type { ComponentEntry } from '../../types'

export const horizontalDividerComponent: ComponentEntry = {
  id: 'horizontal-divider',
  name: 'HorizontalDivider',
  category: 'Material',
  description: '水平分割线，用于在列表项、内容区块之间添加视觉分隔，支持自定义厚度和颜色。',
  tags: ['divider', 'separator', 'line', 'horizontal', '分割线'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，可控制宽度和内边距' },
    { name: 'thickness', type: 'Dp', default: 'DividerDefaults.Thickness', description: '线条厚度，默认 1.dp' },
    { name: 'color', type: 'Color', default: 'DividerDefaults.color', description: '线条颜色' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `Column {
    Text("上方内容")
    HorizontalDivider()
    Text("下方内容")
}`,
    },
    {
      title: '带缩进的分割线',
      code: `// 列表项之间的标准分割线（左侧缩进对齐文字）
Column {
    items.forEachIndexed { index, item ->
        ListItem(headlineContent = { Text(item) })
        if (index < items.lastIndex) {
            HorizontalDivider(modifier = Modifier.padding(start = 16.dp))
        }
    }
}`,
    },
    {
      title: '自定义样式',
      code: `HorizontalDivider(
    thickness = 2.dp,
    color = MaterialTheme.colorScheme.primary.copy(alpha = 0.3f)
)`,
    },
  ],
}
