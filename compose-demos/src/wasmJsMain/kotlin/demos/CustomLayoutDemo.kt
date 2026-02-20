package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.Layout
import androidx.compose.ui.layout.Placeable
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

@Composable
fun CustomLayoutDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("自定义 Layout 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 简单居中布局 ───────────────────────────────────
        SectionLabel("SimpleCenter（自定义居中）")
        SimpleCenter(
            modifier = Modifier.fillMaxWidth().height(80.dp)
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
        ) {
            Box(
                modifier = Modifier.size(48.dp)
                    .background(MaterialTheme.colorScheme.primary, RoundedCornerShape(8.dp)),
                contentAlignment = Alignment.Center
            ) {
                Text("居中", style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onPrimary)
            }
        }

        HorizontalDivider()

        // ── 2. 垂直列表（自定义间距）─────────────────────────
        SectionLabel("CustomColumn（自定义间距）")
        var spacing by remember { mutableStateOf(8) }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("间距：${spacing}dp", style = MaterialTheme.typography.bodySmall)
                Slider(
                    value = spacing.toFloat(),
                    onValueChange = { spacing = it.toInt() },
                    valueRange = 0f..24f,
                    modifier = Modifier.weight(1f)
                )
            }
            CustomColumn(spacing = spacing.dp) {
                repeat(4) { i ->
                    Box(
                        modifier = Modifier.fillMaxWidth().height(36.dp)
                            .background(
                                when (i % 3) {
                                    0 -> MaterialTheme.colorScheme.primaryContainer
                                    1 -> MaterialTheme.colorScheme.secondaryContainer
                                    else -> MaterialTheme.colorScheme.tertiaryContainer
                                },
                                RoundedCornerShape(6.dp)
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("Item ${i + 1}", style = MaterialTheme.typography.labelMedium)
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 3. 瀑布流布局 ─────────────────────────────────────
        SectionLabel("StaggeredRow（错落排列）")
        val heights = remember { listOf(48, 64, 40, 72, 56, 44, 68, 52) }

        StaggeredRow(
            modifier = Modifier.fillMaxWidth(),
            spacing = 6.dp
        ) {
            heights.forEachIndexed { i, h ->
                Box(
                    modifier = Modifier.width(60.dp).height(h.dp)
                        .background(
                            MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.5f + i * 0.06f),
                            RoundedCornerShape(6.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text("${h}dp", style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• Layout { } 是 Compose 自定义布局的核心 API\n" +
            "• measurables.map { it.measure(constraints) } 测量子项\n" +
            "• layout(width, height) { placeable.placeAt(x, y) } 放置子项\n" +
            "• 可实现任意布局逻辑，如瀑布流、环形、错落等",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

/** 将唯一子项居中放置 */
@Composable
private fun SimpleCenter(
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit
) {
    Layout(content = content, modifier = modifier) { measurables, constraints ->
        val placeable = measurables.first().measure(constraints)
        layout(constraints.maxWidth, constraints.maxHeight) {
            placeable.placeRelative(
                x = (constraints.maxWidth - placeable.width) / 2,
                y = (constraints.maxHeight - placeable.height) / 2
            )
        }
    }
}

/** 自定义垂直列表，支持自定义间距 */
@Composable
private fun CustomColumn(
    modifier: Modifier = Modifier,
    spacing: Dp = 8.dp,
    content: @Composable () -> Unit
) {
    Layout(content = content, modifier = modifier) { measurables, constraints ->
        val spacingPx = spacing.roundToPx()
        val placeables: List<Placeable> = measurables.map { it.measure(constraints) }
        val totalHeight = placeables.sumOf { it.height } + spacingPx * (placeables.size - 1).coerceAtLeast(0)
        layout(constraints.maxWidth, totalHeight) {
            var y = 0
            placeables.forEach { placeable ->
                placeable.placeRelative(0, y)
                y += placeable.height + spacingPx
            }
        }
    }
}

/** 水平错落排列，子项高度不同 */
@Composable
private fun StaggeredRow(
    modifier: Modifier = Modifier,
    spacing: Dp = 8.dp,
    content: @Composable () -> Unit
) {
    Layout(content = content, modifier = modifier) { measurables, constraints ->
        val spacingPx = spacing.roundToPx()
        val placeables = measurables.map { it.measure(constraints.copy(minWidth = 0, minHeight = 0)) }
        val maxHeight = placeables.maxOfOrNull { it.height } ?: 0
        val totalWidth = placeables.sumOf { it.width } + spacingPx * (placeables.size - 1).coerceAtLeast(0)
        layout(totalWidth.coerceAtMost(constraints.maxWidth), maxHeight) {
            var x = 0
            placeables.forEach { placeable ->
                // 底部对齐
                placeable.placeRelative(x, maxHeight - placeable.height)
                x += placeable.width + spacingPx
            }
        }
    }
}
