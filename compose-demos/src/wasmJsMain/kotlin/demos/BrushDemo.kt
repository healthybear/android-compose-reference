package demos

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.*
import androidx.compose.ui.unit.dp

/**
 * BrushDemo 演示 Compose 中 Brush 的各种渐变类型及使用方式。
 *
 * Brush 的四种渐变类型：
 * - `linearGradient` — 线性渐变，沿直线方向过渡（水平/垂直/对角）
 * - `radialGradient` — 径向渐变，从中心点向外扩散
 * - `sweepGradient` — 扫描渐变，围绕中心点旋转（类似色轮）
 * - `verticalGradient` — 垂直渐变（linearGradient 的垂直方向快捷方式）
 *
 * Brush 的使用场景：
 * - `Modifier.background(brush)` — 组件背景渐变
 * - `DrawScope.drawRect(brush = brush)` — Canvas 中填充渐变矩形
 * - `DrawScope.drawCircle(brush = brush)` — Canvas 中填充渐变圆形
 *
 * colorStops 精确控制：
 * `colorStops = arrayOf(0.0f to Color(...), 0.5f to Color(...), 1.0f to Color(...))`
 * 可以精确指定每个颜色在渐变中的位置（0f 为起点，1f 为终点）。
 */
@Composable
fun BrushDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("Brush 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 线性渐变 ───────────────────────────────────────
        SectionLabel("linearGradient（线性渐变）")
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            // 水平渐变
            Box(
                modifier = Modifier.fillMaxWidth().height(48.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(
                        Brush.linearGradient(
                            colors = listOf(Color(0xFF6750A4), Color(0xFF0061A4))
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text("水平线性渐变", style = MaterialTheme.typography.labelLarge,
                    color = Color.White)
            }

            // 对角渐变
            Box(
                modifier = Modifier.fillMaxWidth().height(48.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(
                        Brush.linearGradient(
                            colors = listOf(Color(0xFFBF360C), Color(0xFFFFB300), Color(0xFF2E7D32)),
                            start = Offset(0f, 0f),
                            end = Offset(Float.POSITIVE_INFINITY, Float.POSITIVE_INFINITY)
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text("对角线性渐变", style = MaterialTheme.typography.labelLarge,
                    color = Color.White)
            }
        }

        HorizontalDivider()

        // ── 2. 径向渐变 ───────────────────────────────────────
        SectionLabel("radialGradient（径向渐变）")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            Box(
                modifier = Modifier.size(80.dp)
                    .clip(RoundedCornerShape(40.dp))
                    .background(
                        Brush.radialGradient(
                            colors = listOf(Color(0xFFFFFFFF), Color(0xFF6750A4))
                        )
                    )
            )
            Box(
                modifier = Modifier.size(80.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(
                        Brush.radialGradient(
                            colors = listOf(Color(0xFFFFEB3B), Color(0xFFFF5722), Color(0xFF9C27B0)),
                            radius = 120f
                        )
                    )
            )
            Box(
                modifier = Modifier.size(80.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(
                        Brush.radialGradient(
                            colorStops = arrayOf(
                                0.0f to Color(0xFF00BCD4),
                                0.5f to Color(0xFF3F51B5),
                                1.0f to Color(0xFF9C27B0)
                            )
                        )
                    )
            )
        }

        HorizontalDivider()

        // ── 3. 扫描渐变 ───────────────────────────────────────
        SectionLabel("sweepGradient（扫描渐变）")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            Box(
                modifier = Modifier.size(80.dp)
                    .clip(RoundedCornerShape(40.dp))
                    .background(
                        Brush.sweepGradient(
                            colors = listOf(
                                Color(0xFFFF0000), Color(0xFFFF7F00), Color(0xFFFFFF00),
                                Color(0xFF00FF00), Color(0xFF0000FF), Color(0xFF8B00FF),
                                Color(0xFFFF0000)
                            )
                        )
                    )
            )
            Box(
                modifier = Modifier.size(80.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(
                        Brush.sweepGradient(
                            colors = listOf(Color(0xFF6750A4), Color(0xFF0061A4), Color(0xFF6750A4))
                        )
                    )
            )
        }

        HorizontalDivider()

        // ── 4. 垂直渐变 ───────────────────────────────────────
        SectionLabel("verticalGradient（垂直渐变）")
        Box(
            modifier = Modifier.fillMaxWidth().height(80.dp)
                .clip(RoundedCornerShape(8.dp))
                .background(
                    Brush.verticalGradient(
                        colors = listOf(
                            Color(0xFF6750A4),
                            Color(0xFF6750A4).copy(alpha = 0f)
                        )
                    )
                ),
            contentAlignment = Alignment.TopCenter
        ) {
            Text("从上到下淡出", style = MaterialTheme.typography.labelLarge,
                color = Color.White, modifier = Modifier.padding(top = 8.dp))
        }

        HorizontalDivider()

        // ── 5. Canvas 中使用 Brush ────────────────────────────
        SectionLabel("Canvas 中使用 Brush")
        var selectedBrush by remember { mutableStateOf(0) }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                listOf("线性", "径向", "扫描").forEachIndexed { i, name ->
                    FilterChip(
                        selected = selectedBrush == i,
                        onClick = { selectedBrush = i },
                        label = { Text(name) }
                    )
                }
            }

            Canvas(modifier = Modifier.fillMaxWidth().height(100.dp)) {
                val brush = when (selectedBrush) {
                    0 -> Brush.linearGradient(
                        colors = listOf(Color(0xFF6750A4), Color(0xFF0061A4), Color(0xFF006874)),
                        start = Offset(0f, 0f),
                        end = Offset(size.width, size.height)
                    )
                    1 -> Brush.radialGradient(
                        colors = listOf(Color(0xFFFFEB3B), Color(0xFFFF5722)),
                        center = Offset(size.width / 2, size.height / 2),
                        radius = size.minDimension / 2
                    )
                    else -> Brush.sweepGradient(
                        colors = listOf(Color(0xFF6750A4), Color(0xFF0061A4), Color(0xFF006874), Color(0xFF6750A4)),
                        center = Offset(size.width / 2, size.height / 2)
                    )
                }
                drawRect(brush = brush)
                drawCircle(
                    brush = Brush.radialGradient(
                        colors = listOf(Color.White.copy(alpha = 0.8f), Color.Transparent),
                        center = Offset(size.width / 2, size.height / 2),
                        radius = 30.dp.toPx()
                    ),
                    radius = 30.dp.toPx(),
                    center = Offset(size.width / 2, size.height / 2)
                )
            }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• Brush.linearGradient / radialGradient / sweepGradient / verticalGradient\n" +
            "• 可用于 Modifier.background()、drawRect()、drawCircle() 等\n" +
            "• colorStops 参数支持精确控制颜色位置（0f~1f）\n" +
            "• ShaderBrush 可实现更复杂的自定义着色器效果",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
