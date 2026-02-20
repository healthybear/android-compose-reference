package demos

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.*
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.drawIntoCanvas
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

@Composable
fun DrawModifierDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("Draw Modifier 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. drawBehind ─────────────────────────────────────
        SectionLabel("drawBehind（在内容后面绘制）")
        val primary = MaterialTheme.colorScheme.primary
        val primaryContainer = MaterialTheme.colorScheme.primaryContainer

        Text(
            "drawBehind 绘制自定义背景",
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier
                .fillMaxWidth()
                .drawBehind {
                    // 绘制圆角矩形背景
                    drawRoundRect(
                        color = primaryContainer,
                        cornerRadius = androidx.compose.ui.geometry.CornerRadius(12.dp.toPx())
                    )
                    // 绘制左侧强调线
                    drawRect(
                        color = primary,
                        topLeft = Offset(0f, 0f),
                        size = Size(4.dp.toPx(), size.height)
                    )
                }
                .padding(horizontal = 16.dp, vertical = 12.dp)
        )

        HorizontalDivider()

        // ── 2. drawWithContent ────────────────────────────────
        SectionLabel("drawWithContent（在内容前后绘制）")
        var showOverlay by remember { mutableStateOf(true) }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Switch(checked = showOverlay, onCheckedChange = { showOverlay = it })
                Text("显示水印遮罩", style = MaterialTheme.typography.bodySmall)
            }

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(80.dp)
                    .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                    .drawWithContent {
                        drawContent() // 先绘制内容
                        if (showOverlay) {
                            // 再在内容上方绘制半透明遮罩
                            drawRect(
                                color = Color(0x336750A4),
                            )
                            // 绘制对角线水印文字效果（用线条模拟）
                            for (i in 0..4) {
                                drawLine(
                                    color = Color(0x226750A4),
                                    start = Offset(i * size.width / 4f, 0f),
                                    end = Offset(0f, i * size.height / 4f),
                                    strokeWidth = 1.dp.toPx()
                                )
                            }
                        }
                    },
                contentAlignment = Alignment.Center
            ) {
                Text("内容区域", style = MaterialTheme.typography.bodyMedium)
            }
        }

        HorizontalDivider()

        // ── 3. Canvas Composable ──────────────────────────────
        SectionLabel("Canvas（独立绘制区域）")
        var progress by remember { mutableStateOf(0.65f) }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Slider(
                value = progress,
                onValueChange = { progress = it },
                modifier = Modifier.fillMaxWidth()
            )

            Canvas(modifier = Modifier.fillMaxWidth().height(120.dp)) {
                val strokeWidth = 12.dp.toPx()
                val radius = (size.minDimension - strokeWidth) / 2f
                val center = Offset(size.width / 2f, size.height / 2f)

                // 背景圆弧
                drawArc(
                    color = Color(0xFFE8DEF8),
                    startAngle = -210f,
                    sweepAngle = 240f,
                    useCenter = false,
                    topLeft = Offset(center.x - radius, center.y - radius),
                    size = Size(radius * 2, radius * 2),
                    style = Stroke(width = strokeWidth, cap = StrokeCap.Round)
                )
                // 进度圆弧
                drawArc(
                    color = Color(0xFF6750A4),
                    startAngle = -210f,
                    sweepAngle = 240f * progress,
                    useCenter = false,
                    topLeft = Offset(center.x - radius, center.y - radius),
                    size = Size(radius * 2, radius * 2),
                    style = Stroke(width = strokeWidth, cap = StrokeCap.Round)
                )
                // 中心文字用 drawIntoCanvas
                drawIntoCanvas { canvas ->
                    val paint = Paint().apply {
                        color = Color(0xFF6750A4)
                    }
                    canvas.drawCircle(center, 4.dp.toPx(), paint)
                }
            }
            Text(
                "${(progress * 100).toInt()}%",
                style = MaterialTheme.typography.titleLarge,
                color = MaterialTheme.colorScheme.primary,
                modifier = Modifier.align(Alignment.CenterHorizontally)
            )
        }

        HorizontalDivider()

        // ── 4. drawBehind 自定义边框 ──────────────────────────
        SectionLabel("drawBehind 自定义边框")
        val secondary = MaterialTheme.colorScheme.secondary

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(64.dp)
                .drawBehind {
                    val borderWidth = 2.dp.toPx()
                    // 只绘制底部边框
                    drawLine(
                        color = secondary,
                        start = Offset(0f, size.height - borderWidth / 2),
                        end = Offset(size.width, size.height - borderWidth / 2),
                        strokeWidth = borderWidth
                    )
                    // 绘制左上角装饰
                    drawLine(
                        color = secondary,
                        start = Offset(0f, 0f),
                        end = Offset(0f, 16.dp.toPx()),
                        strokeWidth = borderWidth
                    )
                    drawLine(
                        color = secondary,
                        start = Offset(0f, 0f),
                        end = Offset(16.dp.toPx(), 0f),
                        strokeWidth = borderWidth
                    )
                }
                .padding(12.dp),
            contentAlignment = Alignment.CenterStart
        ) {
            Text("自定义边框样式", style = MaterialTheme.typography.bodyMedium)
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• drawBehind { } 在组件内容后面绘制，不影响布局\n" +
            "• drawWithContent { } 可控制绘制顺序（drawContent() 前后）\n" +
            "• Canvas { } 是独立的绘制区域，不包含子组件\n" +
            "• DrawScope 提供 size、center 等便捷属性",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
