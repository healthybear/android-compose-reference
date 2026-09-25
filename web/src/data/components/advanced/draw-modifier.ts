import type { ComponentEntry } from '../../types'

export const drawModifierComponent: ComponentEntry = {
  id: 'draw-modifier',
  demo: { id: 'draw-modifier', sourceFile: 'DrawModifierDemo.kt' },
  name: 'drawBehind / drawWithContent',
  category: 'Advanced',
  description: 'drawBehind 在组件背后绘制自定义图形；drawWithContent 可在组件内容前后插入绘制，两者都使用 Canvas DrawScope API。',
  tags: ['draw', 'canvas', 'custom', 'graphics', '自定义绘制'],
  params: [
    { name: 'onDraw', type: 'DrawScope.() -> Unit', required: true, description: '绘制块，在 DrawScope 中调用 drawCircle、drawRect 等绘制函数' },
  ],
  examples: [
    {
      title: 'drawBehind 绘制背景装饰',
      code: `// 在文字后面画一个圆形高亮背景
Text(
    text = "3",
    color = Color.White,
    modifier = Modifier
        .padding(8.dp)
        .drawBehind {
            drawCircle(
                color = Color.Red,
                radius = size.minDimension / 2
            )
        }
)

// 绘制自定义下划线
Text(
    text = "带下划线",
    modifier = Modifier.drawBehind {
        val strokeWidth = 2.dp.toPx()
        val y = size.height - strokeWidth / 2
        drawLine(
            color = Color.Blue,
            start = Offset(0f, y),
            end = Offset(size.width, y),
            strokeWidth = strokeWidth
        )
    }
)

// 圆角矩形背景
Text(
    text = "标签",
    color = Color.White,
    modifier = Modifier
        .padding(8.dp)
        .drawBehind {
            drawRoundRect(
                color = MaterialTheme.colorScheme.primary,
                cornerRadius = CornerRadius(8.dp.toPx())
            )
        }
        .padding(horizontal = 12.dp, vertical = 6.dp)
)`,
    },
    {
      title: 'drawWithContent 叠加效果',
      code: `// 在内容上叠加渐变遮罩（实现文字淡出效果）
LazyColumn(
    modifier = Modifier
        .fillMaxSize()
        .drawWithContent {
            drawContent()  // 先绘制原始内容
            // 再叠加底部渐变遮罩
            drawRect(
                brush = Brush.verticalGradient(
                    colors = listOf(Color.Transparent, Color.White),
                    startY = size.height * 0.7f,
                    endY = size.height
                )
            )
        }
) {
    items(50) { index ->
        Text(
            text = "Item " + index.toString(),
            modifier = Modifier.padding(16.dp)
        )
    }
}

// 内容前后都绘制
Box(
    modifier = Modifier
        .size(200.dp)
        .drawWithContent {
            // 在内容之前绘制背景
            drawRect(color = Color.LightGray)

            // 绘制内容
            drawContent()

            // 在内容之上绘制边框
            drawRect(
                color = Color.Blue,
                style = Stroke(width = 4.dp.toPx())
            )
        }
) {
    Text("前后绘制", modifier = Modifier.align(Alignment.Center))
}`,
    },
    {
      title: '网格背景',
      code: `Box(
    modifier = Modifier
        .fillMaxSize()
        .drawBehind {
            val gridSize = 50.dp.toPx()
            val strokeWidth = 1.dp.toPx()

            // 绘制垂直线
            var x = 0f
            while (x <= size.width) {
                drawLine(
                    color = Color.LightGray,
                    start = Offset(x, 0f),
                    end = Offset(x, size.height),
                    strokeWidth = strokeWidth
                )
                x += gridSize
            }

            // 绘制水平线
            var y = 0f
            while (y <= size.height) {
                drawLine(
                    color = Color.LightGray,
                    start = Offset(0f, y),
                    end = Offset(size.width, y),
                    strokeWidth = strokeWidth
                )
                y += gridSize
            }
        }
        .padding(16.dp)
) {
    Text("网格背景上的内容")
}`,
    },
    {
      title: '徽章指示器',
      code: `Box {
    Icon(
        Icons.Default.Notifications,
        contentDescription = "通知",
        modifier = Modifier.size(32.dp)
    )

    // 使用 drawBehind 绘制红点徽章
    Box(
        modifier = Modifier
            .align(Alignment.TopEnd)
            .offset(x = 4.dp, y = (-4).dp)
            .size(12.dp)
            .drawBehind {
                drawCircle(
                    color = Color.Red,
                    radius = size.minDimension / 2
                )
                drawCircle(
                    color = Color.White,
                    radius = size.minDimension / 2,
                    style = Stroke(width = 1.dp.toPx())
                )
            }
    )
}

// 带数字的徽章
Box {
    Icon(
        Icons.Default.Email,
        contentDescription = "邮件",
        modifier = Modifier.size(32.dp)
    )

    Box(
        modifier = Modifier
            .align(Alignment.TopEnd)
            .offset(x = 8.dp, y = (-8).dp)
            .drawBehind {
                drawCircle(
                    color = Color(0xFFE53935),
                    radius = 10.dp.toPx()
                )
            }
            .padding(6.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = "5",
            color = Color.White,
            fontSize = 10.sp,
            fontWeight = FontWeight.Bold
        )
    }
}`,
    },
    {
      title: '水印效果',
      code: `Box(
    modifier = Modifier
        .fillMaxSize()
        .drawWithContent {
            drawContent()

            // 在内容上方绘制水印
            val watermarkText = "DRAFT"
            rotate(degrees = -45f, pivot = center) {
                drawContext.canvas.nativeCanvas.apply {
                    val paint = android.graphics.Paint().apply {
                        color = android.graphics.Color.parseColor("#30000000")
                        textSize = 80.sp.toPx()
                        textAlign = android.graphics.Paint.Align.CENTER
                    }
                    drawText(
                        watermarkText,
                        center.x,
                        center.y,
                        paint
                    )
                }
            }
        }
) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("文档内容", style = MaterialTheme.typography.headlineMedium)
        Spacer(Modifier.height(8.dp))
        repeat(10) {
            Text("这是文档的第 " + (it + 1).toString() + " 段内容")
        }
    }
}`,
    },
    {
      title: '进度环',
      code: `@Composable
fun CircularProgressWithLabel(progress: Float) {
    Box(
        modifier = Modifier
            .size(120.dp)
            .drawWithContent {
                val strokeWidth = 12.dp.toPx()
                val radius = (size.minDimension - strokeWidth) / 2

                // 绘制背景圆环
                drawCircle(
                    color = Color.LightGray.copy(alpha = 0.3f),
                    radius = radius,
                    style = Stroke(width = strokeWidth)
                )

                // 绘制进度圆弧
                drawArc(
                    color = MaterialTheme.colorScheme.primary,
                    startAngle = -90f,
                    sweepAngle = 360f * progress,
                    useCenter = false,
                    style = Stroke(width = strokeWidth, cap = StrokeCap.Round),
                    size = Size(radius * 2, radius * 2),
                    topLeft = Offset(
                        (size.width - radius * 2) / 2,
                        (size.height - radius * 2) / 2
                    )
                )

                // 绘制内容（文字）
                drawContent()
            },
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = (progress * 100).toInt().toString() + "%",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold
        )
    }
}`,
    },
    {
      title: '阴影和发光效果',
      code: `// 自定义阴影效果
Box(
    modifier = Modifier
        .size(120.dp)
        .drawBehind {
            // 绘制多层阴影
            repeat(5) { index ->
                val offset = (index + 1) * 2.dp.toPx()
                val alpha = 0.1f - (index * 0.015f)
                drawRoundRect(
                    color = Color.Black.copy(alpha = alpha),
                    topLeft = Offset(offset, offset),
                    size = size,
                    cornerRadius = CornerRadius(16.dp.toPx())
                )
            }

            // 绘制主体
            drawRoundRect(
                color = Color.White,
                cornerRadius = CornerRadius(16.dp.toPx())
            )
        }
        .padding(16.dp),
    contentAlignment = Alignment.Center
) {
    Text("自定义阴影", fontWeight = FontWeight.Bold)
}

// 发光效果
Box(
    modifier = Modifier
        .size(100.dp)
        .drawBehind {
            // 绘制外发光
            repeat(8) { index ->
                val radius = 50.dp.toPx() + (index * 4.dp.toPx())
                val alpha = 0.15f - (index * 0.015f)
                drawCircle(
                    color = MaterialTheme.colorScheme.primary.copy(alpha = alpha),
                    radius = radius
                )
            }

            // 绘制主体
            drawCircle(
                color = MaterialTheme.colorScheme.primary
            )
        }
)`,
    },
  ],

  useCases: [
    {
      title: '自定义分隔线',
      description: '使用 drawBehind 绘制各种样式的分隔线',
      code: `@Composable
fun CustomDividers() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        // 虚线分隔
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(1.dp)
                .drawBehind {
                    drawLine(
                        color = Color.Gray,
                        start = Offset(0f, 0f),
                        end = Offset(size.width, 0f),
                        strokeWidth = 1.dp.toPx(),
                        pathEffect = PathEffect.dashPathEffect(
                            intervals = floatArrayOf(10f, 5f)
                        )
                    )
                }
        )

        // 渐变分隔线
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(2.dp)
                .drawBehind {
                    drawLine(
                        brush = Brush.horizontalGradient(
                            colors = listOf(
                                Color.Transparent,
                                MaterialTheme.colorScheme.primary,
                                Color.Transparent
                            )
                        ),
                        start = Offset(0f, size.height / 2),
                        end = Offset(size.width, size.height / 2),
                        strokeWidth = 2.dp.toPx()
                    )
                }
        )

        // 点状分隔线
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(8.dp)
                .drawBehind {
                    val dotRadius = 2.dp.toPx()
                    val spacing = 12.dp.toPx()
                    var x = dotRadius
                    while (x < size.width) {
                        drawCircle(
                            color = Color.Gray,
                            radius = dotRadius,
                            center = Offset(x, size.height / 2)
                        )
                        x += spacing
                    }
                }
        )
    }
}`
    },
    {
      title: '卡片装饰效果',
      description: '使用 drawWithContent 为卡片添加装饰边框和角标',
      code: `@Composable
fun DecoratedCard(
    title: String,
    content: String,
    tagText: String = "NEW"
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
            .drawWithContent {
                // 绘制内容
                drawContent()

                // 绘制左上角装饰条
                drawRect(
                    brush = Brush.linearGradient(
                        colors = listOf(
                            MaterialTheme.colorScheme.primary,
                            MaterialTheme.colorScheme.tertiary
                        )
                    ),
                    topLeft = Offset(0f, 0f),
                    size = Size(4.dp.toPx(), 60.dp.toPx())
                )

                // 绘制右上角标签
                val tagWidth = 60.dp.toPx()
                val tagHeight = 24.dp.toPx()
                drawRoundRect(
                    color = Color(0xFFE53935),
                    topLeft = Offset(size.width - tagWidth - 16.dp.toPx(), 16.dp.toPx()),
                    size = Size(tagWidth, tagHeight),
                    cornerRadius = CornerRadius(4.dp.toPx())
                )

                // 绘制标签文字
                drawContext.canvas.nativeCanvas.apply {
                    val paint = android.graphics.Paint().apply {
                        color = android.graphics.Color.WHITE
                        textSize = 12.sp.toPx()
                        textAlign = android.graphics.Paint.Align.CENTER
                        isFakeBoldText = true
                    }
                    drawText(
                        tagText,
                        size.width - tagWidth / 2 - 16.dp.toPx(),
                        16.dp.toPx() + tagHeight / 2 + 4.dp.toPx(),
                        paint
                    )
                }
            },
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = title,
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold
            )
            Spacer(Modifier.height(8.dp))
            Text(
                text = content,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: 'drawBehind 在内容之后，drawWithContent 可控制顺序',
      description: 'drawBehind 绘制在内容下方，drawWithContent 通过 drawContent() 位置控制绘制顺序',
      goodExample: `// drawWithContent 可以在内容前后绘制
Modifier.drawWithContent {
    drawRect(Color.Gray)  // 背景
    drawContent()         // 内容
    drawRect(Color.Red)   // 前景
}`,
      badExample: `// drawBehind 只能在内容后面
Modifier.drawBehind {
    drawRect(Color.Red)  // 总是在内容下方
}`,
    },
    {
      title: '使用 dp.toPx() 转换单位',
      description: 'DrawScope 使用像素单位，需要将 dp 转换为 px',
      goodExample: `Modifier.drawBehind {
    drawLine(
        color = Color.Blue,
        strokeWidth = 2.dp.toPx(),  // dp 转 px
        start = Offset(0f, size.height)
    )
}`,
      badExample: `Modifier.drawBehind {
    drawLine(
        color = Color.Blue,
        strokeWidth = 2f,  // 硬编码像素值
        start = Offset(0f, size.height)
    )
}`,
    },
    {
      title: '避免在绘制回调中创建对象',
      description: '绘制回调会频繁执行，避免创建大量临时对象',
      goodExample: `val paint = remember {
    android.graphics.Paint().apply {
        color = android.graphics.Color.RED
    }
}

Modifier.drawBehind {
    drawContext.canvas.nativeCanvas.drawCircle(
        center.x, center.y, 50f, paint
    )
}`,
      badExample: `Modifier.drawBehind {
    // 每次绘制都创建新 Paint 对象
    val paint = android.graphics.Paint()
    paint.color = android.graphics.Color.RED
    drawContext.canvas.nativeCanvas.drawCircle(
        center.x, center.y, 50f, paint
    )
}`,
    },
    {
      title: '使用 size 和 center 属性',
      description: 'DrawScope 提供便捷属性，避免硬编码尺寸',
      goodExample: `Modifier.drawBehind {
    drawCircle(
        color = Color.Blue,
        radius = size.minDimension / 2,
        center = center
    )
}`,
      badExample: `Modifier.drawBehind {
    drawCircle(
        color = Color.Blue,
        radius = 50f,  // 硬编码
        center = Offset(100f, 100f)
    )
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'drawBehind 和 drawWithContent 的区别',
      content: 'drawBehind 在组件内容之后（下方）绘制，drawWithContent 可通过 drawContent() 调用位置控制绘制在内容前或后'
    },
    {
      type: 'info',
      title: 'DrawScope API',
      content: '两个修饰符都提供 DrawScope，可以使用 drawCircle、drawRect、drawLine、drawPath 等绘制函数'
    },
    {
      type: 'info',
      title: 'size 和 center 属性',
      content: 'DrawScope 提供 size（当前组件尺寸）和 center（中心点）属性，方便响应式绘制'
    },
    {
      type: 'info',
      title: '使用 drawContext 访问高级功能',
      content: 'drawContext.canvas.nativeCanvas 可以访问 Android 原生 Canvas，使用更多绘制功能'
    },
    {
      type: 'warning',
      title: '绘制回调会频繁执行',
      content: '每次重组或重绘都会执行绘制回调，避免在其中执行耗时操作或创建大量对象'
    },
    {
      type: 'warning',
      title: '不影响布局测量',
      content: 'drawBehind 和 drawWithContent 的绘制不会影响组件的测量和布局，绘制超出边界不会改变组件尺寸'
    },
  ],

  relatedComponents: ['canvas', 'brush'],
  since: '1.0.0',
}
