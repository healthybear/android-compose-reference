import type { ComponentEntry } from '../../types'

export const elevatedCardComponent: ComponentEntry = {
  id: 'elevated-card',
  name: 'ElevatedCard',
  category: 'Material',
  description: '带明显阴影的卡片，通过阴影高度与背景区分，适合需要突出层次感的内容。',
  tags: ['card', 'elevated', 'shadow', 'container', '阴影卡片'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'onClick', type: '(() -> Unit)?', default: 'null', description: '点击回调' },
    { name: 'shape', type: 'Shape', default: 'CardDefaults.elevatedShape', description: '形状' },
    { name: 'colors', type: 'CardColors', default: 'CardDefaults.elevatedCardColors()', description: '颜色配置' },
    { name: 'elevation', type: 'CardElevation', default: 'CardDefaults.elevatedCardElevation()', description: '阴影配置，默认高度更大' },
    { name: 'content', type: '@Composable ColumnScope.() -> Unit', required: true, description: '卡片内容' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `ElevatedCard(modifier = Modifier.fillMaxWidth()) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("突出显示的内容", style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(8.dp))
        Text("ElevatedCard 通过阴影与背景区分层次。")
    }
}`,
    },
    {
      title: '自定义阴影高度',
      code: `ElevatedCard(
    elevation = CardDefaults.elevatedCardElevation(defaultElevation = 8.dp),
    modifier = Modifier.fillMaxWidth()
) {
    Text("高阴影卡片", modifier = Modifier.padding(16.dp))
}`,
    },
  ],
}
