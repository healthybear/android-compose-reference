import type { ComponentEntry } from '../../types'

export const brushComponent: ComponentEntry = {
  id: 'brush',
  demo: { id: 'brush', sourceFile: 'BrushDemo.kt' },
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
)

// 水平渐变
Box(
    modifier = Modifier
        .fillMaxWidth()
        .height(200.dp)
        .background(
            brush = Brush.horizontalGradient(
                colors = listOf(Color(0xFFE91E63), Color(0xFF9C27B0), Color(0xFF3F51B5))
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
)

// 垂直渐变文字
Text(
    text = "炫彩标题",
    style = TextStyle(
        brush = Brush.verticalGradient(
            colors = listOf(
                Color(0xFFFFD700),
                Color(0xFFFFA500),
                Color(0xFFFF6347)
            )
        ),
        fontSize = 48.sp,
        fontWeight = FontWeight.ExtraBold
    )
)`,
    },
    {
      title: '径向渐变',
      code: `// 圆形径向渐变
Box(
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
)

// 聚光灯效果
Box(
    modifier = Modifier
        .fillMaxWidth()
        .height(300.dp)
        .background(
            brush = Brush.radialGradient(
                colors = listOf(
                    Color.White.copy(alpha = 0.8f),
                    Color.Transparent
                ),
                radius = 300f
            ),
            shape = RectangleShape
        )
)`,
    },
    {
      title: '扫描渐变（圆锥渐变）',
      code: `// 色轮效果
Canvas(modifier = Modifier.size(200.dp)) {
    drawCircle(
        brush = Brush.sweepGradient(
            colors = listOf(
                Color.Red,
                Color.Yellow,
                Color.Green,
                Color.Cyan,
                Color.Blue,
                Color.Magenta,
                Color.Red
            )
        )
    )
}

// 进度指示器
Box(
    modifier = Modifier
        .size(150.dp)
        .background(
            brush = Brush.sweepGradient(
                colors = listOf(
                    MaterialTheme.colorScheme.primary,
                    MaterialTheme.colorScheme.tertiary,
                    MaterialTheme.colorScheme.secondary,
                    MaterialTheme.colorScheme.primary
                )
            ),
            shape = CircleShape
        )
)`,
    },
    {
      title: '自定义渐变位置（stops）',
      code: `// 使用 colorStops 精确控制渐变位置
Box(
    modifier = Modifier
        .fillMaxWidth()
        .height(200.dp)
        .background(
            brush = Brush.horizontalGradient(
                0.0f to Color(0xFF6200EE),
                0.3f to Color(0xFF03DAC5),
                0.7f to Color(0xFFFFB74D),
                1.0f to Color(0xFFE91E63)
            )
        )
)

// 急剧过渡效果
Box(
    modifier = Modifier
        .fillMaxWidth()
        .height(200.dp)
        .background(
            brush = Brush.linearGradient(
                0.0f to Color.Blue,
                0.49f to Color.Blue,
                0.51f to Color.Red,
                1.0f to Color.Red
            )
        )
)`,
    },
    {
      title: '渐变边框',
      code: `// 使用 border + brush 创建渐变边框
Box(
    modifier = Modifier
        .size(150.dp)
        .border(
            width = 4.dp,
            brush = Brush.linearGradient(
                colors = listOf(
                    Color(0xFFFF6B6B),
                    Color(0xFF4ECDC4),
                    Color(0xFF45B7D1)
                )
            ),
            shape = RoundedCornerShape(16.dp)
        )
        .padding(16.dp),
    contentAlignment = Alignment.Center
) {
    Text("渐变边框", fontWeight = FontWeight.Bold)
}

// 圆形渐变边框
Box(
    modifier = Modifier
        .size(120.dp)
        .border(
            width = 6.dp,
            brush = Brush.sweepGradient(
                colors = listOf(
                    Color(0xFFE91E63),
                    Color(0xFF9C27B0),
                    Color(0xFF3F51B5),
                    Color(0xFFE91E63)
                )
            ),
            shape = CircleShape
        )
)`,
    },
    {
      title: 'TileMode 填充模式',
      code: `// TileMode.Clamp（默认）：边缘颜色延伸
Box(
    modifier = Modifier
        .size(200.dp)
        .background(
            brush = Brush.linearGradient(
                colors = listOf(Color.Red, Color.Blue),
                start = Offset(50f, 50f),
                end = Offset(150f, 150f),
                tileMode = TileMode.Clamp
            )
        )
)

// TileMode.Repeat：重复渐变
Box(
    modifier = Modifier
        .size(200.dp)
        .background(
            brush = Brush.linearGradient(
                colors = listOf(Color.Yellow, Color.Green),
                start = Offset(0f, 0f),
                end = Offset(50f, 50f),
                tileMode = TileMode.Repeated
            )
        )
)

// TileMode.Mirror：镜像重复
Box(
    modifier = Modifier
        .size(200.dp)
        .background(
            brush = Brush.linearGradient(
                colors = listOf(Color.Cyan, Color.Magenta),
                start = Offset(0f, 0f),
                end = Offset(50f, 0f),
                tileMode = TileMode.Mirror
            )
        )
)`,
    },
  ],

  useCases: [
    {
      title: '动态渐变背景',
      description: '实现可交互的动态渐变背景效果',
      code: `@Composable
fun DynamicGradientBackground() {
    var offsetX by remember { mutableFloatStateOf(0f) }
    val infiniteTransition = rememberInfiniteTransition(label = "gradient")

    val animatedOffset by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 1000f,
        animationSpec = infiniteRepeatable(
            animation = tween(3000, easing = LinearEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "offset"
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                brush = Brush.linearGradient(
                    colors = listOf(
                        Color(0xFF667eea),
                        Color(0xFF764ba2),
                        Color(0xFFF093FB),
                        Color(0xFF4FACFE)
                    ),
                    start = Offset(animatedOffset, 0f),
                    end = Offset(animatedOffset + 500f, 500f)
                )
            )
            .pointerInput(Unit) {
                detectDragGestures { change, dragAmount ->
                    offsetX += dragAmount.x
                }
            },
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = "动态渐变背景",
            color = Color.White,
            fontSize = 32.sp,
            fontWeight = FontWeight.Bold
        )
    }
}`
    },
    {
      title: '渐变按钮组',
      description: '创建具有渐变背景的按钮组件',
      code: `@Composable
fun GradientButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .height(56.dp)
            .background(
                brush = Brush.horizontalGradient(
                    colors = listOf(
                        Color(0xFF6200EE),
                        Color(0xFF9C27B0),
                        Color(0xFFE91E63)
                    )
                ),
                shape = RoundedCornerShape(28.dp)
            )
            .clickable(onClick = onClick)
            .padding(horizontal = 32.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = text,
            color = Color.White,
            fontSize = 16.sp,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
fun ButtonShowcase() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        GradientButton(
            text = "立即开始",
            onClick = { }
        )

        // 径向渐变按钮
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp)
                .background(
                    brush = Brush.radialGradient(
                        colors = listOf(
                            Color(0xFFFFEB3B),
                            Color(0xFFFFC107),
                            Color(0xFFFF9800)
                        ),
                        radius = 300f
                    ),
                    shape = RoundedCornerShape(28.dp)
                )
                .clickable { },
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "径向渐变",
                fontWeight = FontWeight.Bold,
                fontSize = 16.sp
            )
        }

        // 扫描渐变按钮
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp)
                .background(
                    brush = Brush.sweepGradient(
                        colors = listOf(
                            Color(0xFF00BCD4),
                            Color(0xFF009688),
                            Color(0xFF4CAF50),
                            Color(0xFF00BCD4)
                        )
                    ),
                    shape = RoundedCornerShape(28.dp)
                )
                .clickable { },
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "扫描渐变",
                color = Color.White,
                fontWeight = FontWeight.Bold,
                fontSize = 16.sp
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用颜色列表定义渐变',
      description: '至少提供两个颜色，更多颜色会创建更丰富的渐变效果',
      goodExample: `Brush.linearGradient(
    colors = listOf(
        Color(0xFF6200EE),
        Color(0xFF03DAC5),
        Color(0xFFFFB74D)
    )
)`,
      badExample: `Brush.linearGradient(
    colors = listOf(Color.Blue)  // 至少需要两个颜色
)`,
    },
    {
      title: '使用 colorStops 精确控制',
      description: '需要精确控制渐变位置时使用 Pair<Float, Color> 形式',
      goodExample: `Brush.horizontalGradient(
    0.0f to Color.Red,
    0.2f to Color.Yellow,
    0.8f to Color.Green,
    1.0f to Color.Blue
)`,
      badExample: `// 颜色分布不均匀
Brush.horizontalGradient(
    colors = listOf(Color.Red, Color.Yellow, Color.Green, Color.Blue)
)`,
    },
    {
      title: '选择合适的渐变类型',
      description: '根据设计需求选择线性、径向或扫描渐变',
      goodExample: `// 顶部渐隐效果：线性渐变
Brush.verticalGradient(
    colors = listOf(Color.Black.copy(alpha = 0.7f), Color.Transparent)
)

// 聚光灯效果：径向渐变
Brush.radialGradient(
    colors = listOf(Color.White, Color.Transparent)
)

// 彩虹色轮：扫描渐变
Brush.sweepGradient(
    colors = listOf(Color.Red, Color.Yellow, Color.Green, Color.Blue, Color.Red)
)`,
    },
    {
      title: '注意性能优化',
      description: '避免在循环或高频更新中创建 Brush 对象',
      goodExample: `val gradientBrush = remember {
    Brush.linearGradient(
        colors = listOf(Color.Red, Color.Blue)
    )
}

Box(modifier = Modifier.background(brush = gradientBrush))`,
      badExample: `// 每次重组都创建新 Brush
Box(
    modifier = Modifier.background(
        brush = Brush.linearGradient(
            colors = listOf(Color.Red, Color.Blue)
        )
    )
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Brush 可用于多种场景',
      content: 'Brush 不仅可以用于 background，还可用于 border、Text 的 brush 参数、Canvas 绘制等'
    },
    {
      type: 'info',
      title: '坐标系统',
      content: 'linearGradient 的 start 和 end、radialGradient 的 center 使用 Offset(x, y) 指定像素坐标'
    },
    {
      type: 'info',
      title: '便捷方法',
      content: 'Brush.horizontalGradient 和 Brush.verticalGradient 是 linearGradient 的便捷方法，自动设置方向'
    },
    {
      type: 'info',
      title: 'TileMode 填充模式',
      content: '当渐变范围小于绘制区域时，TileMode 控制超出部分：Clamp（延伸）、Repeated（重复）、Mirror（镜像）'
    },
    {
      type: 'warning',
      title: '颜色数量限制',
      content: '虽然技术上可以使用很多颜色，但过多颜色会导致渐变显得杂乱，建议 2-5 个颜色'
    },
    {
      type: 'warning',
      title: 'alpha 通道支持',
      content: '渐变完全支持透明度，可以使用 Color.copy(alpha = 0.5f) 或 Color(0x80FFFFFF) 创建半透明渐变'
    },
  ],

  relatedComponents: ['canvas', 'draw-modifier'],
  since: '1.0.0',
}
