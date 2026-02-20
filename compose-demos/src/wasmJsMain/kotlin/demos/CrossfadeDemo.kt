package demos

import androidx.compose.animation.Crossfade
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * CrossfadeDemo 演示 Crossfade 的交叉淡入淡出切换效果。
 *
 * Crossfade 是 AnimatedContent 的简化版，专注于淡入淡出切换，
 * 当 targetState 变化时，旧内容淡出的同时新内容淡入。
 *
 * 核心参数：
 * - `targetState`：驱动内容切换的状态
 * - `animationSpec`：控制淡入淡出的时间曲线（默认 tween(300)）
 * - `label`：调试标签
 * - content lambda 接收当前正在渲染的状态值（动画期间可能是旧值或新值）
 *
 * Crossfade vs AnimatedContent：
 * - Crossfade：只支持淡入淡出，代码更简洁，语义更清晰
 * - AnimatedContent：支持自定义方向性动画（滑入滑出等），功能更强大
 * - 只需要淡入淡出时，优先使用 Crossfade
 *
 * 典型用途：图片切换、页面切换、图标状态切换。
 */
@Composable
fun CrossfadeDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("Crossfade 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础淡入淡出切换 ───────────────────────────────
        SectionLabel("基础 Crossfade")
        var screen by remember { mutableStateOf("首页") }
        val screens = listOf("首页", "搜索", "收藏", "我的")

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                screens.forEach { s ->
                    FilterChip(
                        selected = s == screen,
                        onClick = { screen = s },
                        label = { Text(s) }
                    )
                }
            }
            Crossfade(targetState = screen, label = "screen") { current ->
                Box(
                    modifier = Modifier.fillMaxWidth().height(80.dp)
                        .background(
                            when (current) {
                                "首页" -> MaterialTheme.colorScheme.primaryContainer
                                "搜索" -> MaterialTheme.colorScheme.secondaryContainer
                                "收藏" -> MaterialTheme.colorScheme.tertiaryContainer
                                else   -> MaterialTheme.colorScheme.errorContainer
                            },
                            RoundedCornerShape(8.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            when (current) {
                                "首页" -> Icons.Filled.Home
                                "搜索" -> Icons.Filled.Search
                                "收藏" -> Icons.Filled.Favorite
                                else   -> Icons.Filled.Person
                            },
                            contentDescription = null
                        )
                        Text(current, style = MaterialTheme.typography.titleMedium)
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 2. 自定义动画时长 ─────────────────────────────────
        SectionLabel("自定义 animationSpec（慢速 800ms）")
        var slowScreen by remember { mutableStateOf(true) }
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { slowScreen = !slowScreen }) { Text("切换") }
            Crossfade(
                targetState = slowScreen,
                animationSpec = tween(800),
                label = "slow_crossfade"
            ) { isA ->
                Box(
                    modifier = Modifier.fillMaxWidth().height(60.dp)
                        .background(
                            if (isA) MaterialTheme.colorScheme.primaryContainer
                            else MaterialTheme.colorScheme.secondaryContainer,
                            RoundedCornerShape(8.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text(if (isA) "状态 A" else "状态 B", style = MaterialTheme.typography.titleMedium)
                }
            }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• Crossfade 是 AnimatedContent 的简化版，专注于淡入淡出切换\n" +
            "• 适合图片、页面、图标等内容的平滑切换\n" +
            "• 比 AnimatedContent 代码更简洁，但不支持方向性动画",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
