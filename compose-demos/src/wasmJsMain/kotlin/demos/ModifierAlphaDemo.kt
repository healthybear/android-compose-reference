package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.unit.dp

/**
 * ModifierAlphaDemo 演示 Modifier.alpha() 的用法。
 *
 * alpha 用于设置组件的透明度，范围 0f（完全透明）到 1f（完全不透明）。
 *
 * 核心特性：
 * - 控制组件透明度
 * - 可用于显示禁用状态
 * - 配合动画实现淡入淡出效果
 *
 * 注意事项：
 * - alpha 不影响布局空间
 * - alpha = 0f 时组件仍然存在且可交互
 * - 如需完全隐藏，应结合其他方式
 */
@Composable
fun ModifierAlphaDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("Modifier.alpha 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础用法 ───────────────────────────────────────
        SectionLabel("不同透明度级别")

        val alphaLevels = listOf(1f, 0.8f, 0.6f, 0.4f, 0.2f)

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            alphaLevels.forEach { alpha ->
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp)
                        .alpha(alpha)
                        .background(
                            MaterialTheme.colorScheme.primaryContainer,
                            RoundedCornerShape(8.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        "透明度 ${(alpha * 100).toInt()}%",
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
            }
        }

        HorizontalDivider()

        // ── 2. 动态透明度 ─────────────────────────────────────
        SectionLabel("动态透明度调节")

        var alphaValue by remember { mutableStateOf(1f) }

        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(100.dp)
                    .alpha(alphaValue)
                    .background(
                        MaterialTheme.colorScheme.secondaryContainer,
                        RoundedCornerShape(12.dp)
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    "当前透明度：${(alphaValue * 100).toInt()}%",
                    style = MaterialTheme.typography.titleMedium
                )
            }

            Slider(
                value = alphaValue,
                onValueChange = { alphaValue = it },
                valueRange = 0f..1f
            )

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("0%", style = MaterialTheme.typography.labelSmall)
                Text("50%", style = MaterialTheme.typography.labelSmall)
                Text("100%", style = MaterialTheme.typography.labelSmall)
            }
        }

        HorizontalDivider()

        // ── 3. 禁用状态示例 ───────────────────────────────────
        SectionLabel("禁用状态视觉反馈")

        var isEnabled by remember { mutableStateOf(true) }

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("启用功能")
                    Switch(
                        checked = isEnabled,
                        onCheckedChange = { isEnabled = it }
                    )
                }

                HorizontalDivider()

                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .alpha(if (isEnabled) 1f else 0.4f),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Text(
                        "功能内容",
                        style = MaterialTheme.typography.bodyLarge
                    )
                    Text(
                        "当功能禁用时，内容会变得半透明，提供视觉反馈。",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• alpha = 1f：完全不透明\n" +
            "• alpha = 0f：完全透明\n" +
            "• alpha 不影响布局空间\n" +
            "• 透明组件仍然可以交互",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
