import type { ComponentEntry } from '../../types'

export const brushComponent: ComponentEntry = {
  id: 'brush',
  name: 'Brush',
  category: 'Advanced',
  description: '创建渐变画笔，用于 background、drawBehind、文字着色等场景，支持线性渐变、径向渐变和扫描渐变。',
  tags: ['brush', 'gradient', 'color', 'paint', '渐变'],
  params: [
    { name: 'colors', type: 'List<Color>', required: true, description: '渐变颜色列表，至少两个颜色' },
    { name: 'start', type: 'Offset', default: 'Offset.Zero', description: 'linearGradient 的起点' },
    { name: 'end', type: 'Offset', default: 'Offset.Infinite', description: 'linearGradient 的终点' },
    { name: 'center', type: 'Offset', default: 'Offset.Unspecified', description: 'radialGradient 的圆心' },
    { name: 'radius', type: 'Float', default: 'Float.POSITIVE_INFINITY', description: 'radialGradient 的半径' },
    { name: 'tileMode', type: 'TileMode', default: 'TileMode.Clamp', description: '超出范围的填充模式' },
  ],
  examples: [
    {
      title: '线性渐变背景',
      code: `Box(
    modifier = Modifier
        .fillMaxWidth()
        .height(200.dp)
        .background(
            brush = Brush.linearGradient(
                colors = listOf(Color(0xFF6200EE), Color(0xFF03DAC5))
            )
        )
)

// 垂直渐变
Box(
    modifier = Modifier
        .fillMaxWidth()
        .height(200.dp)
        .background(
            brush = Brush.verticalGradient(
                colors = listOf(MaterialTheme.colorScheme.primary, MaterialTheme.colorScheme.secondary)
            )
        )
)`,
    },
    {
      title: '渐变文字',
      code: `val gradientBrush = Brush.horizontalGradient(
    colors = listOf(Color(0xFFFF6B6B), Color(0xFF4ECDC4), Color(0xFF45B7D1))
)

Text(
    text = "渐变文字效果",
    style = TextStyle(
        brush = gradientBrush,
        fontSize = 32.sp,
        fontWeight = FontWeight.Bold
    )
)`,
    },
    {
      title: '径向渐变',
      code: `Box(
    modifier = Modifier
        .size(200.dp)
        .background(
            brush = Brush.radialGradient(
                colors = listOf(Color.Yellow, Color.Red, Color.Transparent),
                center = Offset(100f, 100f),
                radius = 150f
            ),
            shape = CircleShape
        )
)`,
    },
  ],
}
