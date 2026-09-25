import type { ComponentEntry } from '../../types'

export const modifierBackgroundComponent: ComponentEntry = {
  id: 'modifier-background',
  demo: { id: 'modifier-background', sourceFile: 'ModifierBackgroundDemo.kt' },
  name: 'Modifier.background',
  category: 'Modifier',
  description: 'Modifier.background 及相关修饰符用于设置组件的背景色、渐变、边框和形状裁剪。是视觉样式中最常用的 Modifier 之一。',
  tags: ['modifier', 'background', 'border', 'clip', 'shape', 'color', 'gradient'],
  params: [
    { name: 'background(color, shape, alpha)', type: 'Modifier', description: '设置纯色背景，可指定形状和透明度' },
    { name: 'background(brush, shape, alpha)', type: 'Modifier', description: '设置渐变背景（Brush）' },
    { name: 'border(width, color, shape)', type: 'Modifier', description: '添加边框，width 为边框宽度' },
    { name: 'border(width, brush, shape)', type: 'Modifier', description: '添加渐变边框' },
    { name: 'clip(shape)', type: 'Modifier', description: '按形状裁剪内容和子元素' },
    { name: 'shadow(elevation, shape, clip)', type: 'Modifier', description: '添加阴影，elevation 为阴影高度' },
  ],
  examples: [
    {
      title: '纯色背景',
      code: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    // 纯色背景
    Text(
        "蓝色背景",
        modifier = Modifier
            .background(Color.Blue)
            .padding(16.dp),
        color = Color.White
    )

    // 使用主题色
    Text(
        "主题色背景",
        modifier = Modifier
            .background(MaterialTheme.colorScheme.primaryContainer)
            .padding(16.dp)
    )

    // 半透明背景
    Text(
        "半透明背景",
        modifier = Modifier
            .background(Color.Black.copy(alpha = 0.5f))
            .padding(16.dp),
        color = Color.White
    )
}`,
    },
    {
      title: '圆角背景',
      code: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    // 圆角矩形
    Text(
        "圆角 12dp",
        modifier = Modifier
            .background(Color.Blue, RoundedCornerShape(12.dp))
            .padding(16.dp),
        color = Color.White
    )

    // 圆形
    Text(
        "圆形",
        modifier = Modifier
            .background(Color.Green, CircleShape)
            .padding(16.dp),
        color = Color.White
    )

    // 切角
    Text(
        "切角",
        modifier = Modifier
            .background(Color.Red, CutCornerShape(8.dp))
            .padding(16.dp),
        color = Color.White
    )
}`,
    },
    {
      title: '渐变背景',
      code: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    // 水平渐变
    Box(
        modifier = Modifier
            .size(200.dp, 100.dp)
            .background(
                Brush.horizontalGradient(
                    colors = listOf(Color.Blue, Color.Cyan)
                )
            )
    )

    // 垂直渐变
    Box(
        modifier = Modifier
            .size(200.dp, 100.dp)
            .background(
                Brush.verticalGradient(
                    colors = listOf(Color.Red, Color.Yellow)
                )
            )
    )

    // 径向渐变
    Box(
        modifier = Modifier
            .size(200.dp, 200.dp)
            .background(
                Brush.radialGradient(
                    colors = listOf(Color.White, Color.Blue)
                ),
                CircleShape
            )
    )
}`,
    },
    {
      title: '边框',
      code: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    // 基础边框
    Box(
        modifier = Modifier
            .size(100.dp)
            .border(2.dp, Color.Blue, RoundedCornerShape(8.dp))
            .padding(16.dp)
    ) {
        Text("边框")
    }

    // 渐变边框
    Box(
        modifier = Modifier
            .size(100.dp)
            .border(
                width = 3.dp,
                brush = Brush.horizontalGradient(
                    colors = listOf(Color.Blue, Color.Cyan)
                ),
                shape = RoundedCornerShape(12.dp)
            )
            .padding(16.dp)
    ) {
        Text("渐变边框")
    }
}`,
    },
    {
      title: 'clip 裁剪',
      code: `Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    // 圆形裁剪图片
    AsyncImage(
        model = imageUrl,
        contentDescription = null,
        modifier = Modifier
            .size(80.dp)
            .clip(CircleShape),
        contentScale = ContentScale.Crop
    )

    // 圆角矩形裁剪
    AsyncImage(
        model = imageUrl,
        contentDescription = null,
        modifier = Modifier
            .size(80.dp)
            .clip(RoundedCornerShape(12.dp)),
        contentScale = ContentScale.Crop
    )
}`,
    },
    {
      title: 'background + border + clip 组合',
      code: `// 带边框的圆角卡片
Box(
    modifier = Modifier
        .clip(RoundedCornerShape(12.dp))
        .background(MaterialTheme.colorScheme.surface)
        .border(
            width = 1.dp,
            color = MaterialTheme.colorScheme.outline,
            shape = RoundedCornerShape(12.dp)
        )
        .padding(16.dp)
) {
    Text("卡片内容")
}`,
    },
  ],

  useCases: [
    {
      title: '标签（Tag）组件',
      description: '使用背景和形状创建标签样式',
      code: `@Composable
fun Tag(
    text: String,
    color: Color = MaterialTheme.colorScheme.primary,
    modifier: Modifier = Modifier
) {
    Text(
        text = text,
        modifier = modifier
            .background(
                color = color.copy(alpha = 0.2f),
                shape = RoundedCornerShape(16.dp)
            )
            .border(
                width = 1.dp,
                color = color,
                shape = RoundedCornerShape(16.dp)
            )
            .padding(horizontal = 12.dp, vertical = 4.dp),
        style = MaterialTheme.typography.labelSmall,
        color = color
    )
}

// 使用
Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    Tag("Android")
    Tag("Kotlin", color = Color(0xFF7F52FF))
    Tag("Compose", color = Color(0xFF4285F4))
}`
    },
    {
      title: '渐变按钮',
      description: '使用渐变背景创建醒目的按钮',
      code: `@Composable
fun GradientButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(8.dp))
            .background(
                Brush.horizontalGradient(
                    colors = listOf(
                        Color(0xFF667EEA),
                        Color(0xFF764BA2)
                    )
                )
            )
            .clickable(onClick = onClick)
            .padding(horizontal = 24.dp, vertical = 12.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = text,
            color = Color.White,
            style = MaterialTheme.typography.labelLarge
        )
    }
}`
    },
  ],

  bestPractices: [
    {
      title: 'clip 应在 background 之前',
      description: 'clip 影响后续所有修饰符的形状',
      goodExample: `Box(
    modifier = Modifier
        .clip(RoundedCornerShape(12.dp))
        .background(Color.Blue)  // 背景被裁剪
        .clickable { }  // 点击区域被裁剪
)`,
      badExample: `Box(
    modifier = Modifier
        .background(Color.Blue)
        .clip(RoundedCornerShape(12.dp))  // 只裁剪子元素，背景仍是矩形
)`
    },
    {
      title: 'border 与 clip 同时使用时注意形状一致',
      description: '确保 border 和 clip 使用相同的 shape',
      goodExample: `val shape = RoundedCornerShape(12.dp)
Box(
    modifier = Modifier
        .clip(shape)
        .background(Color.White)
        .border(1.dp, Color.Gray, shape)
)`,
      badExample: `Box(
    modifier = Modifier
        .clip(RoundedCornerShape(12.dp))
        .background(Color.White)
        .border(1.dp, Color.Gray, RoundedCornerShape(8.dp))  // 形状不一致
)`
    },
    {
      title: '使用主题色而非硬编码颜色',
      description: '确保深色模式和主题切换正常工作',
      goodExample: `Box(
    modifier = Modifier
        .background(MaterialTheme.colorScheme.primaryContainer)
)`,
      badExample: `Box(
    modifier = Modifier
        .background(Color(0xFFE3F2FD))  // 硬编码，深色模式下可能不合适
)`
    },
    {
      title: '渐变性能考虑',
      description: '复杂渐变可能影响性能，避免过度使用',
      goodExample: `// 简单渐变，性能良好
Brush.verticalGradient(
    colors = listOf(Color.Blue, Color.Cyan)
)`,
      badExample: `// 过于复杂的渐变，影响性能
Brush.radialGradient(
    colors = List(20) { Color.random() },
    center = Offset(100f, 100f),
    radius = 500f
)`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'background 与 Surface 的区别',
      content: 'background 是简单的视觉修饰符，Surface 是 Material 组件，提供阴影、主题色、内容色等额外功能'
    },
    {
      type: 'warning',
      title: 'clip 影响所有后续内容',
      content: 'clip 会裁剪组件本身和所有子元素。如果只想裁剪背景，使用 background 的 shape 参数'
    },
    {
      type: 'info',
      title: '使用 Brush 创建复杂效果',
      content: 'Brush 支持线性渐变、径向渐变、扫描渐变，还可以自定义 ShaderBrush 实现特殊效果'
    },
    {
      type: 'info',
      title: 'border 在 background 之后',
      content: '通常 border 放在 background 之后，这样边框在背景之上。如果 border 在前，背景会覆盖边框'
    },
    {
      type: 'error',
      title: '避免多层 background 叠加',
      content: '多个 background 会完全覆盖前面的，只有最后一个生效。如需叠加效果，使用 Box 嵌套或自定义 Painter'
    },
  ],

  relatedComponents: ['surface', 'box', 'modifier-padding'],
  since: '1.0.0',
}
