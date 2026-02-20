import type { ComponentEntry } from '../../types'

export const iconComponent: ComponentEntry = {
  id: 'icon',
  name: 'Icon',
  category: 'Foundation',
  description: '显示 Material 图标或矢量图的组件，自动应用主题色。',
  tags: ['icon', 'vector', 'material-icons', 'symbol', 'image'],
  params: [
    { name: 'imageVector', type: 'ImageVector', required: true, description: '矢量图标，如 Icons.Default.Add' },
    { name: 'contentDescription', type: 'String?', required: true, description: '无障碍描述' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'tint', type: 'Color', default: 'LocalContentColor.current', description: '图标颜色' },
  ],
  examples: [
    {
      title: '基础图标',
      code: `Icon(
    imageVector = Icons.Default.Add,
    contentDescription = "添加"
)`,
    },
    {
      title: '自定义颜色和尺寸',
      code: `Icon(
    imageVector = Icons.Default.Favorite,
    contentDescription = "收藏",
    tint = Color.Red,
    modifier = Modifier.size(32.dp)
)`,
    },
    {
      title: '使用 Painter（drawable 资源）',
      code: `Icon(
    painter = painterResource(R.drawable.ic_custom),
    contentDescription = "自定义图标",
    tint = MaterialTheme.colorScheme.onSurface
)`,
    },
  ],
}
