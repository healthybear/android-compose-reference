package demos

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.*
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.dp

@Composable
fun CanvasDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Canvas 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. drawRect ───────────────────────────────────────
        SectionLabel("drawRect — 矩形")
        val primary = MaterialTheme.colorScheme.primary
        val secondary = MaterialTheme.colorScheme.secondary
        val tertiary = MaterialTheme.colorScheme.tertiary
        Canvas(modifier = Modifier.fillMaxWidth().height(80.dp)) {
            // 实心矩形
            drawRect(
                color = primary,
                topLeft = Offset(0f, 10f),
                size = Size(120f, 60f)
            )
            // 描边矩形
            drawRect(
                color = secondary,
                topLeft = Offset(140f, 10f),
                size = Size(120f, 60f),
                style = Stroke(width = 4f)
            )
            // 圆角矩形
            drawRoundRect(
                color = tertiary,
                topLeft = Offset(280f, 10f),
                size = Size(120f, 60f),
                cornerRadius = CornerRadius(16f, 16f)
            )
        }

        HorizontalDivider()

        // ── 2. drawCircle ─────────────────────────────────────
        SectionLabel("drawCircle — 圆形")
        val error = MaterialTheme.colorScheme.error
        Canvas(modifier = Modifier.fillMaxWidth().height(80.dp)) {
            // 实心圆
            drawCircle(color = primary, radius = 35f, center = Offset(50f, 40f))
            // 描边圆
            drawCircle(
                color = secondary,
                radius = 35f,
                center = Offset(140f, 40f),
                style = Stroke(width = 4f)
            )
            // 渐变圆
            drawCircle(
                brush = Brush.radialGradient(
                    colors = listOf(error, Color.Transparent),
                    center = Offset(230f, 40f),
                    radius = 35f
                ),
                radius = 35f,
                center = Offset(230f, 40f)
            )
        }

        HorizontalDivider()

        // ── 3. drawLine ───────────────────────────────────────
        SectionLabel("drawLine — 直线")
        Canvas(modifier = Modifier.fillMaxWidth().height(80.dp)) {
            // 普通直线
            drawLine(
                color = primary,
                start = Offset(0f, 20f),
                end = Offset(size.width * 0.3f, 20f),
                strokeWidth = 3f
            )
            // 粗线
            drawLine(
                color = secondary,
                start = Offset(0f, 45f),
                end = Offset(size.width * 0.3f, 45f),
                strokeWidth = 8f
            )
            // 斜线
            drawLine(
                color = tertiary,
                start = Offset(size.width * 0.4f, 10f),
                end = Offset(size.width * 0.7f, 70f),
                strokeWidth = 4f
            )
            // 渐变线（用 Brush）
            drawLine(
                brush = Brush.horizontalGradient(
                    colors = listOf(primary, tertiary),
                    startX = size.width * 0.75f,
                    endX = size.width
                ),
                start = Offset(size.width * 0.75f, 40f),
                end = Offset(size.width, 40f),
                strokeWidth = 6f
            )
        }

        HorizontalDivider()

        // ── 4. Path 绘制 ──────────────────────────────────────
        SectionLabel("Path — 路径绘制")
        Canvas(modifier = Modifier.fillMaxWidth().height(100.dp)) {
            // 三角形
            val triangle = Path().apply {
                moveTo(60f, 10f)
                lineTo(110f, 90f)
                lineTo(10f, 90f)
                close()
            }
            drawPath(triangle, color = primary)

            // 折线（描边）
            val zigzag = Path().apply {
                moveTo(140f, 80f)
                lineTo(180f, 20f)
                lineTo(220f, 80f)
                lineTo(260f, 20f)
                lineTo(300f, 80f)
            }
            drawPath(zigzag, color = secondary, style = Stroke(width = 4f))

            // 贝塞尔曲线
            val curve = Path().apply {
                moveTo(330f, 80f)
                cubicTo(360f, 10f, 420f, 10f, 450f, 80f)
            }
            drawPath(curve, color = tertiary, style = Stroke(width = 4f))
        }

        HorizontalDivider()

        // ── 5. Brush 渐变填充 ─────────────────────────────────
        SectionLabel("Brush — 渐变填充")
        Canvas(modifier = Modifier.fillMaxWidth().height(60.dp)) {
            // 线性渐变
            drawRect(
                brush = Brush.linearGradient(listOf(primary, secondary, tertiary)),
                size = Size(size.width, size.height)
            )
        }
    }
}
