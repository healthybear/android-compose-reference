package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

/**
 * ModifierBackgroundDemo 演示 Modifier.background 的各种用法。
 *
 * Modifier.background 为组件绘制背景色或渐变，支持两种形式：
 * - `background(color, shape)` — 纯色背景，shape 参数控制圆角/形状
 * - `background(brush, shape)` — 渐变背景，brush 可以是线性/径向/扫描渐变
 *
 * 常用 Shape：
 * - [RoundedCornerShape]：圆角矩形，参数为圆角半径（dp 或百分比）
 * - [CircleShape]：圆形（等价于 RoundedCornerShape(50%)）
 *
 * 注意：background 在 Modifier 链中的位置决定背景的范围。
 * 放在 padding 之前，背景包含内边距区域；放在 padding 之后，背景只覆盖内容。
 */
@Composable
fun ModifierBackgroundDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Modifier.background 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 纯色背景 ───────────────────────────────────────
        SectionLabel("纯色背景")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            listOf(
                MaterialTheme.colorScheme.primaryContainer   to "primaryContainer",
                MaterialTheme.colorScheme.secondaryContainer to "secondaryContainer",
                MaterialTheme.colorScheme.tertiaryContainer  to "tertiaryContainer",
                Color(0xFFFF9800)                            to "#FF9800",
            ).forEach { (color, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(56.dp)
                            .background(color, RoundedCornerShape(8.dp))
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 2. RoundedCornerShape ─────────────────────────────
        SectionLabel("RoundedCornerShape — 圆角")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            listOf(0.dp to "0dp", 8.dp to "8dp", 16.dp to "16dp", 28.dp to "圆形").forEach { (r, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(56.dp)
                            .background(
                                MaterialTheme.colorScheme.primary,
                                if (r == 28.dp) CircleShape else RoundedCornerShape(r)
                            )
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 3. Brush 渐变背景 ─────────────────────────────────
        SectionLabel("Brush — 渐变背景")
        val primary = MaterialTheme.colorScheme.primary
        val secondary = MaterialTheme.colorScheme.secondary
        val tertiary = MaterialTheme.colorScheme.tertiary

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            // 线性渐变
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(48.dp)
                    .background(
                        Brush.linearGradient(listOf(primary, secondary)),
                        RoundedCornerShape(8.dp)
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    "linearGradient",
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.onPrimary
                )
            }

            // 水平渐变
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(48.dp)
                    .background(
                        Brush.horizontalGradient(listOf(primary, tertiary, secondary)),
                        RoundedCornerShape(8.dp)
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    "horizontalGradient（3色）",
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.onPrimary
                )
            }

            // 垂直渐变
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(48.dp)
                    .background(
                        Brush.verticalGradient(listOf(secondary, Color.Transparent)),
                        RoundedCornerShape(8.dp)
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    "verticalGradient → Transparent",
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.onSecondary
                )
            }

            // 径向渐变
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                Box(
                    modifier = Modifier
                        .size(80.dp)
                        .background(
                            Brush.radialGradient(listOf(primary, Color.Transparent)),
                            CircleShape
                        )
                )
                Column(verticalArrangement = Arrangement.Center, modifier = Modifier.fillMaxHeight()) {
                    Text("radialGradient", style = MaterialTheme.typography.labelMedium)
                }
            }
        }
    }
}
