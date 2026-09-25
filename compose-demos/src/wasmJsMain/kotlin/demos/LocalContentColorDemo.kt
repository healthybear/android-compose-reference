package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

/**
 * LocalContentColorDemo 演示 LocalContentColor 的用法。
 *
 * LocalContentColor 是 Composition Local，用于在组件树中传递内容颜色。
 *
 * 核心特性：
 * - 自动继承父组件的内容颜色
 * - Material3 组件会自动使用 LocalContentColor
 * - 可以通过 CompositionLocalProvider 覆盖
 *
 * 使用场景：
 * - 统一设置子组件的颜色
 * - 实现主题化的内容
 * - 无需手动传递颜色参数
 */
@Composable
fun LocalContentColorDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("LocalContentColor 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础用法 ───────────────────────────────────────
        SectionLabel("基础用法：继承内容颜色")

        val currentColor = LocalContentColor.current

        Text(
            "当前 LocalContentColor: ${colorToHex(currentColor)}",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        HorizontalDivider()

        // ── 2. 使用 CompositionLocalProvider 覆盖 ────────────
        SectionLabel("覆盖内容颜色")

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.primaryContainer
            )
        ) {
            CompositionLocalProvider(LocalContentColor provides MaterialTheme.colorScheme.onPrimaryContainer) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Text(
                        "这个 Card 内的文本",
                        style = MaterialTheme.typography.titleMedium
                    )
                    Text(
                        "自动使用 onPrimaryContainer 颜色",
                        style = MaterialTheme.typography.bodyMedium
                    )
                    Text(
                        "无需手动指定 color 参数",
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }
        }

        HorizontalDivider()

        // ── 3. 不同容器的内容颜色 ─────────────────────────────
        SectionLabel("不同容器的内容颜色")

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            // 主题色容器
            Box(
                modifier = Modifier
                    .weight(1f)
                    .height(120.dp)
                    .background(
                        MaterialTheme.colorScheme.primary,
                        RoundedCornerShape(8.dp)
                    )
                    .padding(12.dp)
            ) {
                CompositionLocalProvider(LocalContentColor provides MaterialTheme.colorScheme.onPrimary) {
                    Column {
                        Text("Primary", style = MaterialTheme.typography.labelSmall)
                        Text("内容", style = MaterialTheme.typography.bodyLarge)
                    }
                }
            }

            // 次要色容器
            Box(
                modifier = Modifier
                    .weight(1f)
                    .height(120.dp)
                    .background(
                        MaterialTheme.colorScheme.secondary,
                        RoundedCornerShape(8.dp)
                    )
                    .padding(12.dp)
            ) {
                CompositionLocalProvider(LocalContentColor provides MaterialTheme.colorScheme.onSecondary) {
                    Column {
                        Text("Secondary", style = MaterialTheme.typography.labelSmall)
                        Text("内容", style = MaterialTheme.typography.bodyLarge)
                    }
                }
            }

            // 第三色容器
            Box(
                modifier = Modifier
                    .weight(1f)
                    .height(120.dp)
                    .background(
                        MaterialTheme.colorScheme.tertiary,
                        RoundedCornerShape(8.dp)
                    )
                    .padding(12.dp)
            ) {
                CompositionLocalProvider(LocalContentColor provides MaterialTheme.colorScheme.onTertiary) {
                    Column {
                        Text("Tertiary", style = MaterialTheme.typography.labelSmall)
                        Text("内容", style = MaterialTheme.typography.bodyLarge)
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 4. 嵌套覆盖 ───────────────────────────────────────
        SectionLabel("嵌套覆盖内容颜色")

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            CompositionLocalProvider(LocalContentColor provides MaterialTheme.colorScheme.primary) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Text(
                        "外层：Primary 颜色",
                        style = MaterialTheme.typography.bodyMedium
                    )

                    Card(
                        colors = CardDefaults.cardColors(
                            containerColor = MaterialTheme.colorScheme.errorContainer
                        )
                    ) {
                        CompositionLocalProvider(LocalContentColor provides MaterialTheme.colorScheme.error) {
                            Text(
                                "内层：Error 颜色",
                                style = MaterialTheme.typography.bodyMedium,
                                modifier = Modifier.padding(12.dp)
                            )
                        }
                    }

                    Text(
                        "外层：继续使用 Primary 颜色",
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
            }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• LocalContentColor 是 Composition Local，用于传递内容颜色\n" +
            "• Material3 组件会自动使用 LocalContentColor\n" +
            "• 使用 CompositionLocalProvider 可以覆盖颜色\n" +
            "• 适合统一设置多个子组件的颜色",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

private fun colorToHex(color: Color): String {
    val red = (color.red * 255).toInt()
    val green = (color.green * 255).toInt()
    val blue = (color.blue * 255).toInt()
    return "#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}"
}
