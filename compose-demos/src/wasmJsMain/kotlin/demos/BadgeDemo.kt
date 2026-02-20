package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * BadgeDemo 演示 Material3 Badge 和 BadgedBox 的用法。
 *
 * Badge 是角标组件，通常叠加在图标右上角，用于显示未读数量或状态提示。
 *
 * 核心 API：
 * - [BadgedBox]：容器组件，将 Badge 定位在内容的右上角
 *   - `badge` 参数：角标内容插槽
 *   - `content` 参数：被标注的主体内容（通常是 Icon）
 * - [Badge]：角标本身，可以是：
 *   - 空 Badge（无内容）：显示为小红点，表示"有新内容"
 *   - 带数字 Badge：显示具体数量（如未读消息数）
 *   - 带文字 Badge：显示"NEW"等标签
 *
 * 数字显示规范：超过 99 时通常显示 "99+"，避免角标过宽。
 */
@Composable
fun BadgeDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("Badge 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 数字角标 ───────────────────────────────────────
        SectionLabel("数字角标")
        Row(horizontalArrangement = Arrangement.spacedBy(24.dp), verticalAlignment = Alignment.CenterVertically) {
            BadgedBox(badge = { Badge { Text("3") } }) {
                Icon(Icons.Filled.Notifications, contentDescription = "通知")
            }
            BadgedBox(badge = { Badge { Text("99+") } }) {
                Icon(Icons.Filled.Email, contentDescription = "邮件")
            }
            BadgedBox(badge = { Badge { Text("12") } }) {
                Icon(Icons.Filled.ShoppingCart, contentDescription = "购物车")
            }
        }

        HorizontalDivider()

        // ── 2. 红点角标（无数字）─────────────────────────────
        SectionLabel("红点角标（无数字）")
        Row(horizontalArrangement = Arrangement.spacedBy(24.dp), verticalAlignment = Alignment.CenterVertically) {
            BadgedBox(badge = { Badge() }) {
                Icon(Icons.Filled.Notifications, contentDescription = "通知")
            }
            BadgedBox(badge = { Badge() }) {
                Icon(Icons.Filled.Message, contentDescription = "消息")
            }
        }

        HorizontalDivider()

        // ── 3. 动态更新 ───────────────────────────────────────
        SectionLabel("动态更新角标")
        var count by remember { mutableStateOf(0) }
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp), verticalAlignment = Alignment.CenterVertically) {
            BadgedBox(
                badge = {
                    if (count > 0) Badge { Text(if (count > 99) "99+" else "$count") }
                }
            ) {
                Icon(Icons.Filled.Notifications, contentDescription = "通知",
                    modifier = Modifier.size(32.dp))
            }
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Button(onClick = { count++ }) { Text("+1") }
                    OutlinedButton(onClick = { if (count > 0) count-- }) { Text("-1") }
                    TextButton(onClick = { count = 0 }) { Text("清零") }
                }
                Text("当前：$count 条未读", style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }

        HorizontalDivider()

        // ── 4. 配合 NavigationBar ─────────────────────────────
        SectionLabel("配合导航栏使用")
        NavigationBar {
            listOf(
                Triple(Icons.Filled.Home, "首页", 0),
                Triple(Icons.Filled.Search, "搜索", 0),
                Triple(Icons.Filled.Notifications, "通知", 5),
                Triple(Icons.Filled.Person, "我的", 0),
            ).forEachIndexed { index, (icon, label, badge) ->
                NavigationBarItem(
                    selected = index == 0,
                    onClick = {},
                    icon = {
                        BadgedBox(badge = { if (badge > 0) Badge { Text("$badge") } }) {
                            Icon(icon, contentDescription = label)
                        }
                    },
                    label = { Text(label) }
                )
            }
        }
    }
}
