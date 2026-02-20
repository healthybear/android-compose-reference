package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.SubcomposeLayout
import androidx.compose.ui.unit.dp

@Composable
fun SubcomposeLayoutDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("SubcomposeLayout 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础：内容自适应 Header ────────────────────────
        SectionLabel("内容驱动尺寸（Header + Body）")
        var headerText by remember { mutableStateOf("短标题") }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                listOf("短标题", "这是一个比较长的标题文字", "极长的标题内容用于测试自适应宽度布局效果").forEach { t ->
                    FilterChip(
                        selected = headerText == t,
                        onClick = { headerText = t },
                        label = { Text(t.take(6) + if (t.length > 6) "…" else "") }
                    )
                }
            }

            // SubcomposeLayout：先测量 header，再用其宽度约束 body
            SubcomposeLayout(modifier = Modifier.fillMaxWidth()) { constraints ->
                val headerPlaceables = subcompose("header") {
                    Box(
                        modifier = Modifier
                            .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(8.dp))
                            .padding(horizontal = 16.dp, vertical = 8.dp)
                    ) {
                        Text(headerText, style = MaterialTheme.typography.titleSmall,
                            color = MaterialTheme.colorScheme.onPrimaryContainer)
                    }
                }.map { it.measure(constraints) }

                val headerWidth = headerPlaceables.maxOfOrNull { it.width } ?: constraints.maxWidth
                val headerHeight = headerPlaceables.maxOfOrNull { it.height } ?: 0

                val bodyPlaceables = subcompose("body") {
                    Box(
                        modifier = Modifier
                            .width(headerWidth.toDp())
                            .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                            .padding(12.dp)
                    ) {
                        Text("Body 宽度与 Header 一致（${headerWidth}px）",
                            style = MaterialTheme.typography.bodySmall)
                    }
                }.map { it.measure(constraints) }

                val bodyHeight = bodyPlaceables.maxOfOrNull { it.height } ?: 0
                val totalHeight = headerHeight + 8.dp.roundToPx() + bodyHeight

                layout(constraints.maxWidth, totalHeight) {
                    headerPlaceables.forEach { it.placeRelative(0, 0) }
                    bodyPlaceables.forEach { it.placeRelative(0, headerHeight + 8.dp.roundToPx()) }
                }
            }
        }

        HorizontalDivider()

        // ── 2. 动态插槽（Slot API 模拟）─────────────────────
        SectionLabel("动态插槽（Slot API）")
        var showBadge by remember { mutableStateOf(true) }
        var badgeCount by remember { mutableStateOf(3) }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Switch(checked = showBadge, onCheckedChange = { showBadge = it })
                Text("显示徽标", style = MaterialTheme.typography.bodySmall)
                if (showBadge) {
                    OutlinedButton(onClick = { badgeCount++ }) { Text("+") }
                    OutlinedButton(onClick = { if (badgeCount > 0) badgeCount-- }) { Text("-") }
                }
            }

            SubcomposeLayout { constraints ->
                val iconPlaceables = subcompose("icon") {
                    Box(
                        modifier = Modifier.size(48.dp)
                            .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(12.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("📧", style = MaterialTheme.typography.titleLarge)
                    }
                }.map { it.measure(constraints) }

                val iconWidth = iconPlaceables.maxOfOrNull { it.width } ?: 0
                val iconHeight = iconPlaceables.maxOfOrNull { it.height } ?: 0

                val badgePlaceables = if (showBadge) {
                    subcompose("badge") {
                        Box(
                            modifier = Modifier
                                .background(MaterialTheme.colorScheme.error, RoundedCornerShape(10.dp))
                                .padding(horizontal = 6.dp, vertical = 2.dp)
                        ) {
                            Text("$badgeCount", style = MaterialTheme.typography.labelSmall,
                                color = MaterialTheme.colorScheme.onError)
                        }
                    }.map { it.measure(constraints) }
                } else emptyList()

                val badgeWidth = badgePlaceables.maxOfOrNull { it.width } ?: 0
                val badgeHeight = badgePlaceables.maxOfOrNull { it.height } ?: 0

                val totalWidth = iconWidth + badgeWidth / 2
                val totalHeight = iconHeight + badgeHeight / 2

                layout(totalWidth, totalHeight) {
                    iconPlaceables.forEach { it.placeRelative(0, badgeHeight / 2) }
                    badgePlaceables.forEach {
                        it.placeRelative(iconWidth - badgeWidth / 2, 0)
                    }
                }
            }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• SubcomposeLayout 允许在测量阶段按需组合子内容\n" +
            "• subcompose(slotId) { } 延迟组合，可依赖其他子项的测量结果\n" +
            "• 适合：Badge 定位、自适应布局、Scaffold 插槽等\n" +
            "• 比普通 Layout 更灵活，但性能开销略高",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
