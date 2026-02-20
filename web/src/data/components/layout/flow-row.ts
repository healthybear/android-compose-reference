import type { ComponentEntry } from '../../types'

export const flowRowComponent: ComponentEntry = {
  id: 'flow-row',
  name: 'FlowRow',
  category: 'Layout',
  description: '水平流式布局，子元素超出宽度时自动换行，类似 CSS flexbox wrap。',
  tags: ['flowrow', 'layout', 'wrap', 'flow', 'flex'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'horizontalArrangement', type: 'Arrangement.Horizontal', default: 'Arrangement.Start', description: '水平排列方式' },
    { name: 'verticalArrangement', type: 'Arrangement.Vertical', default: 'Arrangement.Top', description: '行间垂直排列方式' },
    { name: 'maxItemsInEachRow', type: 'Int', default: 'Int.MAX_VALUE', description: '每行最多子元素数' },
    { name: 'content', type: '@Composable FlowRowScope.() -> Unit', required: true, description: '子元素内容' },
  ],
  examples: [
    {
      title: '标签云',
      code: `FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    listOf("Kotlin", "Compose", "Android", "Material3", "UI").forEach { tag ->
        AssistChip(onClick = {}, label = { Text(tag) })
    }
}`,
    },
    {
      title: '限制每行数量',
      code: `FlowRow(
    maxItemsInEachRow = 3,
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    repeat(7) { index ->
        Card(modifier = Modifier.size(80.dp)) {
            Box(contentAlignment = Alignment.Center) { Text("$index") }
        }
    }
}`,
    },
  ],
}
