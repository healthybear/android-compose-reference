import type { ComponentEntry } from '../../types'

export const cardComponent: ComponentEntry = {
  id: 'card',
  name: 'Card',
  category: 'Material',
  description: 'Material Design 卡片容器，提供圆角、背景色和阴影，可点击时带涟漪效果。',
  tags: ['card', 'container', 'surface', 'material', '卡片'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'onClick', type: '(() -> Unit)?', default: 'null', description: '点击回调，有值时卡片可点击' },
    { name: 'shape', type: 'Shape', default: 'CardDefaults.shape', description: '形状，默认 12dp 圆角' },
    { name: 'colors', type: 'CardColors', default: 'CardDefaults.cardColors()', description: '颜色配置' },
    { name: 'elevation', type: 'CardElevation', default: 'CardDefaults.cardElevation()', description: '阴影配置' },
    { name: 'border', type: 'BorderStroke?', default: 'null', description: '边框' },
    { name: 'content', type: '@Composable ColumnScope.() -> Unit', required: true, description: '卡片内容' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `Card(modifier = Modifier.fillMaxWidth()) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("标题", style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(8.dp))
        Text("这是卡片的正文内容，可以放置任意 Composable。")
    }
}`,
    },
    {
      title: '可点击卡片',
      code: `Card(
    onClick = { navController.navigate("detail/$id") },
    modifier = Modifier.fillMaxWidth()
) {
    Row(
        modifier = Modifier.padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(Icons.Default.Article, contentDescription = null)
        Spacer(Modifier.width(12.dp))
        Column {
            Text("文章标题", style = MaterialTheme.typography.titleSmall)
            Text("副标题", style = MaterialTheme.typography.bodySmall)
        }
    }
}`,
    },
  ],
}
