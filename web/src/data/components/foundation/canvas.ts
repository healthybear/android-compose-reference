import type { ComponentEntry } from '../../types'

export const canvasComponent: ComponentEntry = {
  id: 'canvas',
  demo: { id: 'canvas', sourceFile: 'CanvasDemo.kt' },
  name: 'Canvas',
  category: 'Foundation',
  description: '提供 DrawScope 进行自定义 2D 绘制，对应 View 系统的 onDraw()。',
  tags: ['canvas', 'draw', 'custom', 'paint', '2d'],
  params: [
    { name: 'modifier', type: 'Modifier', required: true, description: '必须通过 Modifier 指定尺寸' },
    { name: 'onDraw', type: 'DrawScope.() -> Unit', required: true, description: '绘制回调，在 DrawScope 中调用绘制 API' },
  ],
  examples: [
    {
      title: '绘制圆形和矩形',
      code: `Canvas(modifier = Modifier.size(200.dp)) {
    drawCircle(
        color = Color.Blue,
        radius = size.minDimension / 2
    )
    drawRect(
        color = Color.Red.copy(alpha = 0.5f),
        size = Size(100.dp.toPx(), 60.dp.toPx())
    )
}`,
    },
    {
      title: '绘制折线图',
      code: `Canvas(modifier = Modifier.fillMaxWidth().height(120.dp)) {
    val points = listOf(0f, 40f, 20f, 80f, 60f, 100f)
    val path = Path()
    points.forEachIndexed { i, y ->
        val x = i * (size.width / (points.size - 1))
        if (i == 0) path.moveTo(x, size.height - y.dp.toPx())
        else path.lineTo(x, size.height - y.dp.toPx())
    }
    drawPath(path, color = Color.Green, style = Stroke(width = 3.dp.toPx()))
}`,
    },
    {
      title: '渐变背景',
      code: `Canvas(modifier = Modifier.fillMaxSize()) {
    // 线性渐变
    drawRect(
        brush = Brush.linearGradient(
            colors = listOf(Color(0xFF6200EE), Color(0xFF03DAC5)),
            start = Offset(0f, 0f),
            end = Offset(size.width, size.height)
        )
    )

    // 径向渐变
    drawCircle(
        brush = Brush.radialGradient(
            colors = listOf(Color.White, Color.Transparent),
            center = center,
            radius = size.minDimension / 2
        )
    )

    // 扫描渐变
    drawCircle(
        brush = Brush.sweepGradient(
            colors = listOf(Color.Red, Color.Yellow, Color.Green, Color.Blue, Color.Red),
            center = center
        ),
        radius = 100.dp.toPx()
    )
}`,
    },
    {
      title: '绘制弧形和扇形',
      code: `Canvas(modifier = Modifier.size(200.dp)) {
    val centerX = size.width / 2
    val centerY = size.height / 2
    val radius = 80.dp.toPx()

    // 绘制弧形（描边）
    drawArc(
        color = Color.Blue,
        startAngle = 0f,
        sweepAngle = 120f,
        useCenter = false,
        topLeft = Offset(centerX - radius, centerY - radius),
        size = Size(radius * 2, radius * 2),
        style = Stroke(width = 8.dp.toPx())
    )

    // 绘制扇形（填充）
    drawArc(
        color = Color.Red.copy(alpha = 0.5f),
        startAngle = 150f,
        sweepAngle = 90f,
        useCenter = true,
        topLeft = Offset(centerX - radius, centerY - radius),
        size = Size(radius * 2, radius * 2)
    )
}`,
    },
    {
      title: '自定义进度条',
      code: `@Composable
fun CustomProgressBar(
    progress: Float,
    modifier: Modifier = Modifier
) {
    Canvas(modifier = modifier.height(40.dp).fillMaxWidth()) {
        val cornerRadius = 20.dp.toPx()

        // 背景
        drawRoundRect(
            color = Color.LightGray,
            cornerRadius = CornerRadius(cornerRadius)
        )

        // 进度条
        val progressWidth = size.width * progress.coerceIn(0f, 1f)
        drawRoundRect(
            brush = Brush.horizontalGradient(
                colors = listOf(Color(0xFF6200EE), Color(0xFF03DAC5)),
                endX = progressWidth
            ),
            size = Size(progressWidth, size.height),
            cornerRadius = CornerRadius(cornerRadius)
        )

        // 进度文字
        drawContext.canvas.nativeCanvas.apply {
            val text = (progress * 100).toInt().toString() + "%"
            val paint = Paint().apply {
                color = android.graphics.Color.WHITE
                textSize = 14.sp.toPx()
                textAlign = Paint.Align.CENTER
            }
            drawText(text, size.width / 2, size.height / 2 + 5.dp.toPx(), paint)
        }
    }
}`,
    },
    {
      title: '绘制虚线',
      code: `Canvas(modifier = Modifier.fillMaxWidth().height(100.dp)) {
    // 水平虚线
    drawLine(
        color = Color.Gray,
        start = Offset(0f, 50.dp.toPx()),
        end = Offset(size.width, 50.dp.toPx()),
        strokeWidth = 2.dp.toPx(),
        pathEffect = PathEffect.dashPathEffect(
            intervals = floatArrayOf(10.dp.toPx(), 5.dp.toPx()),
            phase = 0f
        )
    )

    // 虚线矩形
    drawRect(
        color = Color.Blue,
        style = Stroke(
            width = 3.dp.toPx(),
            pathEffect = PathEffect.dashPathEffect(
                intervals = floatArrayOf(15f, 10f)
            )
        )
    )
}`,
    },
    {
      title: '绘制图片',
      code: `@Composable
fun CanvasWithImage() {
    val imageBitmap = ImageBitmap.imageResource(R.drawable.sample_image)

    Canvas(modifier = Modifier.size(300.dp)) {
        // 绘制完整图片
        drawImage(
            image = imageBitmap,
            topLeft = Offset(0f, 0f)
        )

        // 绘制图片的一部分（裁剪）
        drawImage(
            image = imageBitmap,
            srcOffset = IntOffset(50, 50),
            srcSize = IntSize(200, 200),
            dstOffset = IntOffset(150.dp.toPx().toInt(), 150.dp.toPx().toInt()),
            dstSize = IntSize(100.dp.toPx().toInt(), 100.dp.toPx().toInt())
        )

        // 半透明图片
        drawImage(
            image = imageBitmap,
            topLeft = Offset(100.dp.toPx(), 100.dp.toPx()),
            alpha = 0.5f
        )
    }
}`,
    },
    {
      title: '复杂路径绘制',
      code: `Canvas(modifier = Modifier.size(200.dp)) {
    val path = Path().apply {
        // 移动到起点
        moveTo(50.dp.toPx(), 50.dp.toPx())

        // 直线
        lineTo(150.dp.toPx(), 50.dp.toPx())

        // 二次贝塞尔曲线
        quadraticBezierTo(
            x1 = 180.dp.toPx(), y1 = 80.dp.toPx(),
            x2 = 150.dp.toPx(), y2 = 110.dp.toPx()
        )

        // 三次贝塞尔曲线
        cubicTo(
            x1 = 140.dp.toPx(), y1 = 130.dp.toPx(),
            x2 = 110.dp.toPx(), y2 = 130.dp.toPx(),
            x3 = 100.dp.toPx(), y3 = 110.dp.toPx()
        )

        // 圆角连接
        arcTo(
            rect = Rect(
                left = 30.dp.toPx(),
                top = 90.dp.toPx(),
                right = 70.dp.toPx(),
                bottom = 130.dp.toPx()
            ),
            startAngleDegrees = 0f,
            sweepAngleDegrees = 90f,
            forceMoveTo = false
        )

        close()  // 闭合路径
    }

    drawPath(
        path = path,
        color = Color.Blue,
        style = Stroke(width = 3.dp.toPx())
    )
}`,
    },
  ],

  useCases: [
    {
      title: '自定义饼图',
      description: '绘制数据可视化图表',
      code: `data class PieChartData(val label: String, val value: Float, val color: Color)

@Composable
fun PieChart(
    data: List<PieChartData>,
    modifier: Modifier = Modifier
) {
    Canvas(modifier = modifier.size(200.dp)) {
        val total = data.sumOf { it.value.toDouble() }.toFloat()
        var startAngle = 0f

        data.forEach { item ->
            val sweepAngle = (item.value / total) * 360f

            drawArc(
                color = item.color,
                startAngle = startAngle,
                sweepAngle = sweepAngle,
                useCenter = true,
                topLeft = Offset(20.dp.toPx(), 20.dp.toPx()),
                size = Size(160.dp.toPx(), 160.dp.toPx())
            )

            startAngle += sweepAngle
        }
    }
}

// 使用
@Composable
fun ChartScreen() {
    val data = listOf(
        PieChartData("Android", 45f, Color(0xFF4CAF50)),
        PieChartData("iOS", 30f, Color(0xFF2196F3)),
        PieChartData("Web", 25f, Color(0xFFFF9800))
    )

    PieChart(data = data)
}`
    },
    {
      title: '签名板',
      description: '实现手写签名功能',
      code: `@Composable
fun SignaturePad(modifier: Modifier = Modifier) {
    val path = remember { mutableStateOf(Path()) }
    val currentPath = remember { mutableStateOf(Path()) }

    Canvas(
        modifier = modifier
            .fillMaxWidth()
            .height(300.dp)
            .background(Color.White)
            .border(1.dp, Color.Gray)
            .pointerInput(Unit) {
                detectDragGestures(
                    onDragStart = { offset ->
                        currentPath.value.moveTo(offset.x, offset.y)
                    },
                    onDrag = { change, _ ->
                        currentPath.value.lineTo(change.position.x, change.position.y)
                    },
                    onDragEnd = {
                        path.value.addPath(currentPath.value)
                        currentPath.value = Path()
                    }
                )
            }
    ) {
        // 绘制已完成的路径
        drawPath(
            path = path.value,
            color = Color.Black,
            style = Stroke(width = 3.dp.toPx(), cap = StrokeCap.Round)
        )

        // 绘制当前正在绘制的路径
        drawPath(
            path = currentPath.value,
            color = Color.Black,
            style = Stroke(width = 3.dp.toPx(), cap = StrokeCap.Round)
        )
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 dp.toPx() 转换单位',
      description: 'Canvas 使用像素单位，需要将 dp 转换为 px',
      goodExample: `Canvas(modifier = Modifier.size(200.dp)) {
    drawCircle(
        color = Color.Blue,
        radius = 50.dp.toPx()  // dp 转 px
    )
}`,
      badExample: `Canvas(modifier = Modifier.size(200.dp)) {
    drawCircle(
        color = Color.Blue,
        radius = 50f  // 直接使用数字，在不同密度屏幕上显示不一致
    )
}`
    },
    {
      title: '使用 size 属性获取画布尺寸',
      description: 'DrawScope 提供 size 属性，避免硬编码尺寸',
      goodExample: `Canvas(modifier = Modifier.fillMaxSize()) {
    drawCircle(
        color = Color.Blue,
        radius = size.minDimension / 2,  // 响应式尺寸
        center = center
    )
}`,
      badExample: `Canvas(modifier = Modifier.fillMaxSize()) {
    drawCircle(
        color = Color.Blue,
        radius = 100f,  // 硬编码，不适应不同尺寸
        center = Offset(200f, 200f)
    )
}`
    },
    {
      title: '避免在 onDraw 中创建对象',
      description: '频繁创建对象会影响性能，应在外部 remember',
      goodExample: `val path = remember { Path() }

Canvas(modifier = Modifier.size(200.dp)) {
    path.reset()
    path.moveTo(0f, 0f)
    path.lineTo(size.width, size.height)
    drawPath(path, color = Color.Blue)
}`,
      badExample: `Canvas(modifier = Modifier.size(200.dp)) {
    val path = Path()  // 每次重绘都创建新对象
    path.moveTo(0f, 0f)
    path.lineTo(size.width, size.height)
    drawPath(path, color = Color.Blue)
}`
    },
    {
      title: '使用 Stroke 绘制边框',
      description: '通过 style 参数控制填充或描边',
      goodExample: `Canvas(modifier = Modifier.size(200.dp)) {
    // 填充
    drawCircle(color = Color.Blue)

    // 描边
    drawCircle(
        color = Color.Red,
        style = Stroke(width = 4.dp.toPx())
    )
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Canvas 必须指定尺寸',
      content: 'Canvas 没有固有尺寸，必须通过 Modifier.size() 或其他尺寸修饰符明确指定大小'
    },
    {
      type: 'warning',
      title: 'onDraw 会频繁调用',
      content: 'Canvas 的 onDraw 在每次重组和重绘时都会执行，避免在其中进行耗时操作或创建大量对象'
    },
    {
      type: 'tip',
      title: 'DrawScope 提供的便捷属性',
      content: 'size（画布尺寸）、center（中心点）、drawContext（变换和裁剪）等属性简化绘制逻辑'
    },
    {
      type: 'tip',
      title: '使用 drawIntoCanvas 访问原生 Canvas',
      content: '需要使用 Android 原生 Canvas API 时，可以通过 drawContext.canvas.nativeCanvas 访问'
    },
    {
      type: 'tip',
      title: 'Path 可以复用',
      content: '使用 remember 创建 Path 对象，每次绘制前调用 reset() 清空，避免重复创建'
    },
    {
      type: 'danger',
      title: 'Canvas 不支持触摸事件',
      content: 'Canvas 本身不处理交互，需要配合 Modifier.pointerInput() 实现触摸交互'
    },
  ],

  relatedComponents: ['box'],
  since: '1.0.0',
}
