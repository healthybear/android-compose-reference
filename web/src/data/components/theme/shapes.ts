import type { ComponentEntry } from '../../types'

export const shapesComponent: ComponentEntry = {
  id: 'shapes',
  name: 'Shapes',
  category: 'Theme',
  description: 'Material3 形状规范，定义 extraSmall 到 extraLarge 五个级别的圆角，统一组件外观。',
  tags: ['shapes', 'shape', 'corner', 'theme', 'material3', 'roundedcorner'],
  params: [
    { name: 'extraSmall', type: 'Shape', default: 'RoundedCornerShape(4.dp)', description: '极小圆角，如 Chip、TextField' },
    { name: 'small', type: 'Shape', default: 'RoundedCornerShape(8.dp)', description: '小圆角，如 Button' },
    { name: 'medium', type: 'Shape', default: 'RoundedCornerShape(12.dp)', description: '中圆角，如 Card' },
    { name: 'large', type: 'Shape', default: 'RoundedCornerShape(16.dp)', description: '大圆角，如 NavigationDrawer' },
    { name: 'extraLarge', type: 'Shape', default: 'RoundedCornerShape(28.dp)', description: '极大圆角，如 FAB、BottomSheet' },
  ],
  examples: [
    {
      title: '使用主题形状',
      code: `Box(
    modifier = Modifier
        .clip(MaterialTheme.shapes.medium)
        .background(MaterialTheme.colorScheme.surfaceVariant)
        .padding(16.dp)
) {
    Text("中等圆角卡片")
}`,
    },
    {
      title: '自定义形状规范',
      code: `val AppShapes = Shapes(
    small = RoundedCornerShape(4.dp),
    medium = RoundedCornerShape(8.dp),
    large = RoundedCornerShape(0.dp)  // 直角大容器
)

MaterialTheme(shapes = AppShapes) { /* ... */ }`,
    },
  ],
}
