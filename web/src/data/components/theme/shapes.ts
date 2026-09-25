import type { ComponentEntry } from '../../types'

export const shapesComponent: ComponentEntry = {
  id: 'shapes',
  demo: { id: 'shapes', sourceFile: 'ShapesDemo.kt' },
  name: 'Shapes',
  category: 'Theme',
  description: 'Material3 形状规范，定义 extraSmall 到 extraLarge 五个级别的圆角，统一组件外观。',
  tags: ['shapes', 'shape', 'corner', 'theme', 'material3', 'roundedcorner'],
  params: [
    { name: 'extraSmall', type: 'Shape', default: 'RoundedCornerShape(4.dp)', description: '极小圆角（4dp），用于 Chip、FilledTextField' },
    { name: 'small', type: 'Shape', default: 'RoundedCornerShape(8.dp)', description: '小圆角（8dp），用于 Button、Badge' },
    { name: 'medium', type: 'Shape', default: 'RoundedCornerShape(12.dp)', description: '中圆角（12dp），用于 Card、AlertDialog' },
    { name: 'large', type: 'Shape', default: 'RoundedCornerShape(16.dp)', description: '大圆角（16dp），用于 NavigationDrawer、ModalBottomSheet' },
    { name: 'extraLarge', type: 'Shape', default: 'RoundedCornerShape(28.dp)', description: '极大圆角（28dp），用于 FAB、LargeTopAppBar' },
  ],
  examples: [
    {
      title: '使用主题形状',
      code: `@Composable
fun ShapesShowcase() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Extra Small - 4dp
        Box(
            modifier = Modifier
                .size(100.dp)
                .clip(MaterialTheme.shapes.extraSmall)
                .background(MaterialTheme.colorScheme.primaryContainer),
            contentAlignment = Alignment.Center
        ) {
            Text("Extra Small")
        }

        // Small - 8dp
        Box(
            modifier = Modifier
                .size(100.dp)
                .clip(MaterialTheme.shapes.small)
                .background(MaterialTheme.colorScheme.secondaryContainer),
            contentAlignment = Alignment.Center
        ) {
            Text("Small")
        }

        // Medium - 12dp
        Box(
            modifier = Modifier
                .size(100.dp)
                .clip(MaterialTheme.shapes.medium)
                .background(MaterialTheme.colorScheme.tertiaryContainer),
            contentAlignment = Alignment.Center
        ) {
            Text("Medium")
        }

        // Large - 16dp
        Box(
            modifier = Modifier
                .size(100.dp)
                .clip(MaterialTheme.shapes.large)
                .background(MaterialTheme.colorScheme.surfaceVariant),
            contentAlignment = Alignment.Center
        ) {
            Text("Large")
        }

        // Extra Large - 28dp
        Box(
            modifier = Modifier
                .size(100.dp)
                .clip(MaterialTheme.shapes.extraLarge)
                .background(MaterialTheme.colorScheme.errorContainer),
            contentAlignment = Alignment.Center
        ) {
            Text("Extra Large")
        }
    }
}`,
    },
    {
      title: '自定义形状规范',
      code: `val CustomShapes = Shapes(
    extraSmall = RoundedCornerShape(2.dp),
    small = RoundedCornerShape(4.dp),
    medium = RoundedCornerShape(8.dp),
    large = RoundedCornerShape(16.dp),
    extraLarge = RoundedCornerShape(24.dp)
)

// 更激进的圆角设计
val RoundedShapes = Shapes(
    extraSmall = RoundedCornerShape(8.dp),
    small = RoundedCornerShape(12.dp),
    medium = RoundedCornerShape(16.dp),
    large = RoundedCornerShape(24.dp),
    extraLarge = RoundedCornerShape(32.dp)
)

// 直角设计
val SharpShapes = Shapes(
    extraSmall = RoundedCornerShape(0.dp),
    small = RoundedCornerShape(0.dp),
    medium = RoundedCornerShape(0.dp),
    large = RoundedCornerShape(0.dp),
    extraLarge = RoundedCornerShape(4.dp)
)

@Composable
fun AppTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        shapes = CustomShapes,
        content = content
    )
}`,
    },
    {
      title: '不同形状类型',
      code: `@Composable
fun ShapeVariations() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // 完全圆角（圆形或胶囊形）
        Box(
            modifier = Modifier
                .size(100.dp)
                .clip(CircleShape)
                .background(MaterialTheme.colorScheme.primary)
        )

        // 圆角矩形
        Box(
            modifier = Modifier
                .size(width = 150.dp, height = 100.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(MaterialTheme.colorScheme.secondary)
        )

        // 仅顶部圆角
        Box(
            modifier = Modifier
                .size(width = 150.dp, height = 100.dp)
                .clip(RoundedCornerShape(topStart = 16.dp, topEnd = 16.dp))
                .background(MaterialTheme.colorScheme.tertiary)
        )

        // 切角形状
        Box(
            modifier = Modifier
                .size(width = 150.dp, height = 100.dp)
                .clip(CutCornerShape(16.dp))
                .background(MaterialTheme.colorScheme.error)
        )

        // 非对称圆角
        Box(
            modifier = Modifier
                .size(width = 150.dp, height = 100.dp)
                .clip(
                    RoundedCornerShape(
                        topStart = 24.dp,
                        topEnd = 8.dp,
                        bottomStart = 8.dp,
                        bottomEnd = 24.dp
                    )
                )
                .background(MaterialTheme.colorScheme.surfaceVariant)
        )

        // 百分比圆角
        Box(
            modifier = Modifier
                .size(width = 150.dp, height = 100.dp)
                .clip(RoundedCornerShape(50))  // 50% 形成胶囊
                .background(MaterialTheme.colorScheme.primaryContainer)
        )
    }
}`,
    },
    {
      title: '组件形状应用',
      code: `@Composable
fun ComponentShapes() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Card 使用 medium 形状
        Card(
            shape = MaterialTheme.shapes.medium,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(
                text = "Card with medium shape",
                modifier = Modifier.padding(16.dp)
            )
        }

        // Button 使用 small 形状
        Button(
            onClick = {},
            shape = MaterialTheme.shapes.small
        ) {
            Text("Button with small shape")
        }

        // TextField 使用 extraSmall 形状
        OutlinedTextField(
            value = "",
            onValueChange = {},
            label = { Text("TextField") },
            shape = MaterialTheme.shapes.extraSmall,
            modifier = Modifier.fillMaxWidth()
        )

        // FAB 使用 extraLarge 形状
        FloatingActionButton(
            onClick = {},
            shape = MaterialTheme.shapes.extraLarge
        ) {
            Icon(Icons.Default.Add, "Add")
        }

        // 自定义形状的 Surface
        Surface(
            shape = RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp),
            color = MaterialTheme.colorScheme.surfaceVariant,
            modifier = Modifier
                .fillMaxWidth()
                .height(100.dp)
        ) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Text("Bottom Sheet Style")
            }
        }
    }
}`,
    },
    {
      title: '动态形状变化',
      code: `@Composable
fun AnimatedShape() {
    var isExpanded by remember { mutableStateOf(false) }

    val cornerRadius by animateDpAsState(
        targetValue = if (isExpanded) 24.dp else 8.dp,
        animationSpec = tween(300),
        label = "corner"
    )

    Box(
        modifier = Modifier
            .size(150.dp, 100.dp)
            .clip(RoundedCornerShape(cornerRadius))
            .background(MaterialTheme.colorScheme.primary)
            .clickable { isExpanded = !isExpanded },
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = if (isExpanded) "Expanded" else "Click Me",
            color = MaterialTheme.colorScheme.onPrimary
        )
    }
}`,
    },
    {
      title: '形状组合与边框',
      code: `@Composable
fun ShapeWithBorder() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // 带边框的形状
        Box(
            modifier = Modifier
                .size(150.dp, 100.dp)
                .border(
                    width = 2.dp,
                    color = MaterialTheme.colorScheme.primary,
                    shape = MaterialTheme.shapes.medium
                )
                .padding(16.dp)
        ) {
            Text("Bordered Shape")
        }

        // 阴影 + 形状
        Surface(
            shape = MaterialTheme.shapes.large,
            shadowElevation = 8.dp,
            modifier = Modifier.size(150.dp, 100.dp)
        ) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Text("Elevated Shape")
            }
        }

        // 渐变 + 形状
        Box(
            modifier = Modifier
                .size(150.dp, 100.dp)
                .clip(MaterialTheme.shapes.extraLarge)
                .background(
                    Brush.horizontalGradient(
                        colors = listOf(
                            MaterialTheme.colorScheme.primary,
                            MaterialTheme.colorScheme.tertiary
                        )
                    )
                ),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "Gradient Shape",
                color = MaterialTheme.colorScheme.onPrimary
            )
        }
    }
}`,
    },
    {
      title: '响应式形状',
      code: `@Composable
fun ResponsiveShapes() {
    val configuration = LocalConfiguration.current
    val screenWidth = configuration.screenWidthDp

    // 根据屏幕尺寸调整圆角大小
    val shapeScale = when {
        screenWidth < 360 -> 0.75f
        screenWidth > 600 -> 1.25f
        else -> 1f
    }

    val responsiveShapes = Shapes(
        extraSmall = RoundedCornerShape((4 * shapeScale).dp),
        small = RoundedCornerShape((8 * shapeScale).dp),
        medium = RoundedCornerShape((12 * shapeScale).dp),
        large = RoundedCornerShape((16 * shapeScale).dp),
        extraLarge = RoundedCornerShape((28 * shapeScale).dp)
    )

    MaterialTheme(shapes = responsiveShapes) {
        Card(
            shape = MaterialTheme.shapes.medium,
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(
                text = "响应式圆角卡片",
                modifier = Modifier.padding(16.dp)
            )
        }
    }
}`,
    },
    {
      title: '自定义形状实现',
      code: `class TicketShape(
    private val cornerRadius: Dp,
    private val circleRadius: Dp
) : Shape {
    override fun createOutline(
        size: Size,
        layoutDirection: LayoutDirection,
        density: Density
    ): Outline {
        val path = Path().apply {
            val radius = with(density) { cornerRadius.toPx() }
            val circleR = with(density) { circleRadius.toPx() }

            // 顶部圆角
            moveTo(radius, 0f)
            lineTo(size.width - radius, 0f)
            arcTo(
                Rect(size.width - 2 * radius, 0f, size.width, 2 * radius),
                270f, 90f, false
            )

            // 右侧边（中间半圆凹陷）
            lineTo(size.width, size.height / 2 - circleR)
            arcTo(
                Rect(
                    size.width - 2 * circleR,
                    size.height / 2 - circleR,
                    size.width,
                    size.height / 2 + circleR
                ),
                0f, -180f, false
            )
            lineTo(size.width, size.height - radius)

            // 底部圆角
            arcTo(
                Rect(size.width - 2 * radius, size.height - 2 * radius, size.width, size.height),
                0f, 90f, false
            )
            lineTo(radius, size.height)
            arcTo(
                Rect(0f, size.height - 2 * radius, 2 * radius, size.height),
                90f, 90f, false
            )

            // 左侧边（中间半圆凹陷）
            lineTo(0f, size.height / 2 + circleR)
            arcTo(
                Rect(0f, size.height / 2 - circleR, 2 * circleR, size.height / 2 + circleR),
                180f, -180f, false
            )
            lineTo(0f, radius)

            // 完成路径
            arcTo(Rect(0f, 0f, 2 * radius, 2 * radius), 180f, 90f, false)
            close()
        }
        return Outline.Generic(path)
    }
}

@Composable
fun TicketCard() {
    Box(
        modifier = Modifier
            .size(300.dp, 150.dp)
            .clip(TicketShape(cornerRadius = 16.dp, circleRadius = 12.dp))
            .background(MaterialTheme.colorScheme.primaryContainer)
            .padding(24.dp)
    ) {
        Text(
            text = "电影票样式",
            style = MaterialTheme.typography.titleLarge,
            color = MaterialTheme.colorScheme.onPrimaryContainer
        )
    }
}`,
    },
  ],

  useCases: [
    {
      title: '品牌风格主题',
      description: '根据品牌设计语言定制形状系统',
      code: `// 科技感十足的直角设计
val TechShapes = Shapes(
    extraSmall = RectangleShape,
    small = RectangleShape,
    medium = RoundedCornerShape(2.dp),
    large = RoundedCornerShape(4.dp),
    extraLarge = RoundedCornerShape(8.dp)
)

// 友好圆润的设计
val FriendlyShapes = Shapes(
    extraSmall = RoundedCornerShape(12.dp),
    small = RoundedCornerShape(16.dp),
    medium = RoundedCornerShape(20.dp),
    large = RoundedCornerShape(24.dp),
    extraLarge = CircleShape  // 完全圆形
)

// 混合切角设计
val ModernShapes = Shapes(
    extraSmall = CutCornerShape(4.dp),
    small = CutCornerShape(6.dp),
    medium = CutCornerShape(8.dp),
    large = RoundedCornerShape(16.dp),  // 大组件保持圆角
    extraLarge = RoundedCornerShape(28.dp)
)

@Composable
fun BrandedApp(brand: String) {
    val shapes = when (brand) {
        "tech" -> TechShapes
        "friendly" -> FriendlyShapes
        "modern" -> ModernShapes
        else -> Shapes()  // 默认 M3 形状
    }

    MaterialTheme(shapes = shapes) {
        Scaffold { padding ->
            Column(
                modifier = Modifier
                    .padding(padding)
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Card(
                    shape = MaterialTheme.shapes.medium,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        text = "品牌：" + brand,
                        modifier = Modifier.padding(16.dp)
                    )
                }

                Button(
                    onClick = {},
                    shape = MaterialTheme.shapes.small
                ) {
                    Text("品牌按钮")
                }

                FloatingActionButton(
                    onClick = {},
                    shape = MaterialTheme.shapes.extraLarge
                ) {
                    Icon(Icons.Default.Add, "Add")
                }
            }
        }
    }
}`
    },
    {
      title: '层级视觉区分',
      description: '使用不同形状大小表达内容层级关系',
      code: `@Composable
fun HierarchicalLayout() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // 主要内容 - 大圆角
        Card(
            shape = MaterialTheme.shapes.large,
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.primaryContainer
            )
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text(
                    text = "主要内容区域",
                    style = MaterialTheme.typography.headlineMedium
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text("使用大圆角突出重要性")
            }
        }

        // 次要内容 - 中圆角
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Card(
                shape = MaterialTheme.shapes.medium,
                modifier = Modifier.weight(1f),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.secondaryContainer
                )
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "次要区域 1",
                        style = MaterialTheme.typography.titleMedium
                    )
                    Text("中等圆角", style = MaterialTheme.typography.bodySmall)
                }
            }

            Card(
                shape = MaterialTheme.shapes.medium,
                modifier = Modifier.weight(1f),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.secondaryContainer
                )
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "次要区域 2",
                        style = MaterialTheme.typography.titleMedium
                    )
                    Text("中等圆角", style = MaterialTheme.typography.bodySmall)
                }
            }
        }

        // 辅助信息 - 小圆角
        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(5) { index ->
                Surface(
                    shape = MaterialTheme.shapes.small,
                    color = MaterialTheme.colorScheme.tertiaryContainer,
                    modifier = Modifier.size(80.dp)
                ) {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("Tag " + (index + 1).toString())
                    }
                }
            }
        }

        // 细节元素 - 极小圆角
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            repeat(4) {
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(40.dp)
                        .clip(MaterialTheme.shapes.extraSmall)
                        .background(MaterialTheme.colorScheme.surfaceVariant),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Chip",
                        style = MaterialTheme.typography.labelSmall
                    )
                }
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '保持形状系统一致性',
      description: '同类组件使用相同级别的形状，建立清晰的视觉层级',
      goodExample: `// 所有按钮使用 small 形状
Button(onClick = {}, shape = MaterialTheme.shapes.small) {
    Text("Primary")
}

OutlinedButton(onClick = {}, shape = MaterialTheme.shapes.small) {
    Text("Secondary")
}

// 所有卡片使用 medium 形状
Card(shape = MaterialTheme.shapes.medium) { }
ElevatedCard(shape = MaterialTheme.shapes.medium) { }`,
      badExample: `// 同类组件使用不同形状，视觉混乱
Button(onClick = {}, shape = MaterialTheme.shapes.small) { }
OutlinedButton(onClick = {}, shape = MaterialTheme.shapes.large) { }

Card(shape = MaterialTheme.shapes.medium) { }
ElevatedCard(shape = RoundedCornerShape(20.dp)) { }`,
    },
    {
      title: '形状与尺寸匹配',
      description: '较大的组件使用较大的圆角，小组件使用小圆角',
      goodExample: `// 小组件 - 小圆角
Chip(shape = MaterialTheme.shapes.extraSmall)

// 中等组件 - 中圆角
Button(shape = MaterialTheme.shapes.small)
Card(shape = MaterialTheme.shapes.medium)

// 大组件 - 大圆角
FloatingActionButton(shape = MaterialTheme.shapes.extraLarge)
ModalBottomSheet(shape = MaterialTheme.shapes.large)`,
      badExample: `// 小组件用大圆角
Chip(shape = MaterialTheme.shapes.extraLarge)  // 视觉不协调

// 大组件用小圆角
ModalBottomSheet(shape = MaterialTheme.shapes.extraSmall)  // 不够醒目`,
    },
    {
      title: '使用 clip() 应用形状',
      description: '需要裁剪内容时使用 clip()，边框使用 border(shape = ...)',
      goodExample: `// 裁剪图片
Image(
    painter = painterResource(R.drawable.photo),
    contentDescription = null,
    modifier = Modifier
        .size(100.dp)
        .clip(MaterialTheme.shapes.medium)
)

// 带边框的形状
Box(
    modifier = Modifier
        .border(2.dp, Color.Blue, MaterialTheme.shapes.small)
        .padding(8.dp)
)`,
      badExample: `// 忘记 clip，内容溢出圆角
Box(
    modifier = Modifier
        .background(Color.Blue, MaterialTheme.shapes.medium)
) {
    Image(...)  // 图片会溢出圆角
}`,
    },
    {
      title: '避免过度圆角',
      description: '圆角半径不应超过组件尺寸的一半，除非有意设计为圆形',
      goodExample: `// 适度圆角
Card(
    shape = MaterialTheme.shapes.medium,  // 12dp 圆角
    modifier = Modifier.size(width = 200.dp, height = 100.dp)
)

// 完全圆形设计
FloatingActionButton(
    shape = CircleShape,  // 明确使用圆形
    onClick = {}
)`,
      badExample: `// 过度圆角，看起来奇怪
Card(
    shape = RoundedCornerShape(80.dp),  // 圆角太大
    modifier = Modifier.size(width = 200.dp, height = 100.dp)
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Material 3 形状系统',
      content: 'Shapes 定义了 5 个形状级别，对应不同尺寸的组件。默认值为：extraSmall(4dp)、small(8dp)、medium(12dp)、large(16dp)、extraLarge(28dp)'
    },
    {
      type: 'tip',
      title: 'Shape vs clip()',
      content: 'Shape 定义形状规范，需要配合 clip() 或 border() 使用。clip() 裁剪内容，border(shape = ...) 绘制边框，background(color, shape) 绘制带形状的背景'
    },
    {
      type: 'tip',
      title: 'CircleShape vs RoundedCornerShape(50%)',
      content: 'CircleShape 始终生成正圆（取宽高最小值），RoundedCornerShape(50) 按百分比计算，矩形会变成胶囊形。按钮通常用百分比，头像用 CircleShape'
    },
    {
      type: 'warning',
      title: 'CutCornerShape 性能',
      content: 'CutCornerShape（切角）需要自定义路径绘制，性能略低于 RoundedCornerShape。在列表或高频重组场景中大量使用可能影响性能'
    },
    {
      type: 'warning',
      title: 'clip() 的抗锯齿',
      content: 'clip() 使用硬件加速的路径裁剪，在某些设备上可能出现轻微锯齿。对于重要视觉元素，考虑使用 Shadow 或 graphicsLayer 优化边缘'
    },
    {
      type: 'danger',
      title: '形状影响点击区域',
      content: 'clip() 会裁剪点击区域。如果组件被裁剪成圆形或复杂形状，裁剪外的区域将无法响应点击。需要完整点击区域时，使用 background(shape = ...) 而非 clip()'
    },
    {
      type: 'tip',
      title: '自定义形状实现',
      content: '实现 Shape 接口的 createOutline() 方法可以创建任意形状。返回 Outline.Rectangle、Outline.Rounded、Outline.Generic(path) 三种类型之一'
    },
  ],

  relatedComponents: ['material-theme', 'surface', 'card', 'button'],
  since: '1.0.0',
}
