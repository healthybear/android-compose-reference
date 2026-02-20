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
