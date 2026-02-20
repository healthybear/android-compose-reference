import type { ComponentEntry } from '../../types'

export const outlinedCardComponent: ComponentEntry = {
  id: 'outlined-card',
  name: 'OutlinedCard',
  category: 'Material',
  description: '带边框的卡片，无阴影，通过描边与背景区分，适合扁平化设计风格。',
  tags: ['card', 'outlined', 'border', 'flat', '描边卡片'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'onClick', type: '(() -> Unit)?', default: 'null', description: '点击回调' },
    { name: 'shape', type: 'Shape', default: 'CardDefaults.outlinedShape', description: '形状' },
    { name: 'colors', type: 'CardColors', default: 'CardDefaults.outlinedCardColors()', description: '颜色配置' },
    { name: 'elevation', type: 'CardElevation', default: 'CardDefaults.outlinedCardElevation()', description: '阴影配置，默认无阴影' },
    { name: 'border', type: 'BorderStroke', default: 'CardDefaults.outlinedCardBorder()', description: '边框样式' },
    { name: 'content', type: '@Composable ColumnScope.() -> Unit', required: true, description: '卡片内容' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `OutlinedCard(modifier = Modifier.fillMaxWidth()) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("描边卡片", style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(8.dp))
        Text("无阴影，通过边框与背景区分。")
    }
}`,
    },
    {
      title: '自定义边框颜色',
      code: `OutlinedCard(
    border = BorderStroke(2.dp, MaterialTheme.colorScheme.primary),
    modifier = Modifier.fillMaxWidth()
) {
    Text("自定义边框", modifier = Modifier.padding(16.dp))
}`,
    },
  ],
}
