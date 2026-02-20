package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ListItemDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("ListItem 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础单行 ───────────────────────────────────────
        SectionLabel("单行 ListItem")
        Card(modifier = Modifier.fillMaxWidth()) {
            Column {
                ListItem(headlineContent = { Text("单行列表项") })
                HorizontalDivider()
                ListItem(headlineContent = { Text("带 leadingContent") },
                    leadingContent = { Icon(Icons.Filled.Person, contentDescription = null) })
                HorizontalDivider()
                ListItem(
                    headlineContent = { Text("带 trailingContent") },
                    trailingContent = { Icon(Icons.Filled.ChevronRight, contentDescription = null) }
                )
            }
        }

        HorizontalDivider()

        // ── 2. 双行 ───────────────────────────────────────────
        SectionLabel("双行 ListItem（supportingContent）")
        Card(modifier = Modifier.fillMaxWidth()) {
            Column {
                ListItem(
                    headlineContent = { Text("Alice") },
                    supportingContent = { Text("上次消息：你好！") },
                    leadingContent = { Icon(Icons.Filled.Person, contentDescription = null) },
                    trailingContent = { Text("12:30", style = MaterialTheme.typography.labelSmall) }
                )
                HorizontalDivider()
                ListItem(
                    headlineContent = { Text("Bob") },
                    supportingContent = { Text("上次消息：明天见") },
                    leadingContent = { Icon(Icons.Filled.Person, contentDescription = null) },
                    trailingContent = { Text("昨天", style = MaterialTheme.typography.labelSmall) }
                )
                HorizontalDivider()
                ListItem(
                    headlineContent = { Text("Carol") },
                    supportingContent = { Text("上次消息：好的，没问题！") },
                    leadingContent = { Icon(Icons.Filled.Person, contentDescription = null) },
                    trailingContent = { Text("周一", style = MaterialTheme.typography.labelSmall) }
                )
            }
        }

        HorizontalDivider()

        // ── 3. 三行 ───────────────────────────────────────────
        SectionLabel("三行 ListItem（overlineContent）")
        Card(modifier = Modifier.fillMaxWidth()) {
            Column {
                ListItem(
                    overlineContent = { Text("置顶") },
                    headlineContent = { Text("重要通知标题") },
                    supportingContent = { Text("这是通知的详细内容，可以显示更多信息。") },
                    leadingContent = { Icon(Icons.Filled.Notifications, contentDescription = null) },
                    trailingContent = {
                        IconButton(onClick = {}) {
                            Icon(Icons.Filled.Close, contentDescription = "关闭")
                        }
                    }
                )
            }
        }
    }
}
