import type { ComponentEntry } from '../../types'

export const surfaceComponent: ComponentEntry = {
  id: 'surface',
  name: 'Surface',
  category: 'Layout',
  description: 'Material3 基础容器，提供背景色、形状、阴影、边框和点击交互，是构建卡片、按钮等组件的基础。',
  tags: ['surface', 'container', 'material3', 'card', '容器'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'shape', type: 'Shape', default: 'RectangleShape', description: '形状，支持圆角等' },
    { name: 'color', type: 'Color', default: 'MaterialTheme.colorScheme.surface', description: '背景色' },
    { name: 'contentColor', type: 'Color', default: 'contentColorFor(color)', description: '内容默认颜色，自动适配背景色' },
    { name: 'tonalElevation', type: 'Dp', default: '0.dp', description: '色调高度，影响 surface 颜色叠加' },
    { name: 'shadowElevation', type: 'Dp', default: '0.dp', description: '阴影高度' },
    { name: 'border', type: 'BorderStroke?', default: 'null', description: '边框' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '内容' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `Surface(
    shape = RoundedCornerShape(12.dp),
    tonalElevation = 2.dp,
    shadowElevation = 4.dp,
    modifier = Modifier.padding(16.dp)
) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("标题", style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(8.dp))
        Text("这是一段内容文字。", style = MaterialTheme.typography.bodyMedium)
    }
}`,
    },
    {
      title: '可点击 Surface',
      code: `Surface(
    onClick = { /* 处理点击 */ },
    shape = RoundedCornerShape(16.dp),
    color = MaterialTheme.colorScheme.primaryContainer,
    modifier = Modifier.fillMaxWidth().padding(16.dp)
) {
    Row(
        modifier = Modifier.padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(Icons.Default.Notifications, contentDescription = null)
        Spacer(Modifier.width(12.dp))
        Text("点击查看通知", style = MaterialTheme.typography.bodyLarge)
    }
}`,
    },
    {
      title: '带边框',
      code: `Surface(
    shape = RoundedCornerShape(8.dp),
    border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline),
    color = Color.Transparent,
    modifier = Modifier.fillMaxWidth().padding(16.dp)
) {
    Text(
        text = "带边框的容器",
        modifier = Modifier.padding(16.dp)
    )
}`,
    },
  ],
}
