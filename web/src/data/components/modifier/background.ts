import type { ComponentEntry } from '../../types'

export const modifierBackgroundComponent: ComponentEntry = {
  id: 'modifier-background',
  name: 'Modifier.background / border / clip',
  category: 'Modifier',
  description: '控制组件背景色、边框和形状裁剪的修饰符。',
  tags: ['modifier', 'background', 'border', 'clip', 'shape', 'color'],
  params: [
    { name: 'background(color, shape)', type: 'Modifier', description: '设置背景色和形状' },
    { name: 'border(width, color, shape)', type: 'Modifier', description: '添加边框' },
    { name: 'clip(shape)', type: 'Modifier', description: '按形状裁剪内容' },
    { name: 'shadow(elevation, shape)', type: 'Modifier', description: '添加阴影' },
  ],
  examples: [
    {
      title: '圆角卡片效果',
      code: `Box(
    modifier = Modifier
        .clip(RoundedCornerShape(12.dp))
        .background(MaterialTheme.colorScheme.surfaceVariant)
        .padding(16.dp)
) {
    Text("圆角背景")
}`,
    },
    {
      title: '带边框的圆形',
      code: `Box(
    modifier = Modifier
        .size(80.dp)
        .clip(CircleShape)
        .border(2.dp, MaterialTheme.colorScheme.primary, CircleShape)
        .background(MaterialTheme.colorScheme.surface)
)`,
    },
  ],
}
