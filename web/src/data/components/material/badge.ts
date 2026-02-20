import type { ComponentEntry } from '../../types'

export const badgeComponent: ComponentEntry = {
  id: 'badge',
  name: 'Badge / BadgedBox',
  category: 'Material',
  description: 'BadgedBox 在子组件右上角叠加 Badge 徽标，用于显示未读数量或状态提示。',
  tags: ['badge', 'notification', 'count', 'indicator', '徽标', '未读数'],
  params: [
    { name: 'badge', type: '@Composable BoxScope.() -> Unit', required: true, description: 'BadgedBox 的徽标内容，通常为 Badge { }' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: 'BadgedBox 的修饰符' },
    { name: 'content', type: '@Composable BoxScope.() -> Unit', required: true, description: '被徽标装饰的主体内容，通常为 Icon' },
  ],
  examples: [
    {
      title: '数字徽标',
      code: `BadgedBox(
    badge = { Badge { Text("3") } }
) {
    Icon(Icons.Default.Notifications, contentDescription = "通知")
}`,
    },
    {
      title: '小红点（无数字）',
      code: `BadgedBox(
    badge = { Badge() }  // 无内容 = 小圆点
) {
    Icon(Icons.Default.Email, contentDescription = "邮件")
}`,
    },
    {
      title: '超出显示 99+',
      code: `val count = 120

BadgedBox(
    badge = {
        Badge {
            Text(if (count > 99) "99+" else count.toString())
        }
    }
) {
    Icon(Icons.Default.ShoppingCart, contentDescription = "购物车")
}`,
    },
  ],
}
