package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.unit.dp

@Composable
fun DropdownMenuDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("DropdownMenu 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础下拉菜单 ───────────────────────────────────
        SectionLabel("基础下拉菜单")
        var expanded1 by remember { mutableStateOf(false) }
        var selected1 by remember { mutableStateOf("未选择") }
        Box {
            Button(onClick = { expanded1 = true }) { Text("打开菜单（$selected1）") }
            DropdownMenu(expanded = expanded1, onDismissRequest = { expanded1 = false }) {
                listOf("选项 A", "选项 B", "选项 C", "选项 D").forEach { item ->
                    DropdownMenuItem(
                        text = { Text(item) },
                        onClick = { selected1 = item; expanded1 = false }
                    )
                }
            }
        }

        HorizontalDivider()

        // ── 2. 带图标的菜单项 ─────────────────────────────────
        SectionLabel("带图标的菜单项")
        var expanded2 by remember { mutableStateOf(false) }
        var lastAction by remember { mutableStateOf("无") }
        Box {
            IconButton(onClick = { expanded2 = true }) {
                Icon(Icons.Filled.MoreVert, contentDescription = "更多")
            }
            DropdownMenu(expanded = expanded2, onDismissRequest = { expanded2 = false }) {
                DropdownMenuItem(
                    text = { Text("编辑") },
                    leadingIcon = { Icon(Icons.Filled.Edit, contentDescription = null) },
                    onClick = { lastAction = "编辑"; expanded2 = false }
                )
                DropdownMenuItem(
                    text = { Text("分享") },
                    leadingIcon = { Icon(Icons.Filled.Share, contentDescription = null) },
                    onClick = { lastAction = "分享"; expanded2 = false }
                )
                HorizontalDivider()
                DropdownMenuItem(
                    text = { Text("删除") },
                    leadingIcon = { Icon(Icons.Filled.Delete, contentDescription = null,
                        tint = MaterialTheme.colorScheme.error) },
                    onClick = { lastAction = "删除"; expanded2 = false }
                )
            }
        }
        Text("上次操作：$lastAction", style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant)

        HorizontalDivider()

        // ── 3. 禁用菜单项 ─────────────────────────────────────
        SectionLabel("禁用菜单项")
        var expanded3 by remember { mutableStateOf(false) }
        Box {
            OutlinedButton(onClick = { expanded3 = true }) { Text("带禁用项的菜单") }
            DropdownMenu(expanded = expanded3, onDismissRequest = { expanded3 = false }) {
                DropdownMenuItem(text = { Text("可用项 1") }, onClick = { expanded3 = false })
                DropdownMenuItem(text = { Text("禁用项") }, onClick = {}, enabled = false)
                DropdownMenuItem(text = { Text("可用项 2") }, onClick = { expanded3 = false })
            }
        }
    }
}
