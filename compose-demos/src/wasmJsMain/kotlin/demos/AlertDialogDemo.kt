package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun AlertDialogDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("AlertDialog 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 确认 / 取消弹窗 ───────────────────────────────
        SectionLabel("确认 / 取消弹窗")
        var showConfirm by remember { mutableStateOf(false) }
        var confirmResult by remember { mutableStateOf("未操作") }

        Button(onClick = { showConfirm = true }) { Text("打开确认弹窗") }
        Text("结果：$confirmResult", style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant)

        if (showConfirm) {
            AlertDialog(
                onDismissRequest = { showConfirm = false; confirmResult = "点击外部关闭" },
                icon = { Icon(Icons.Filled.Delete, contentDescription = null) },
                title = { Text("确认删除") },
                text = { Text("此操作不可撤销，确定要删除该项目吗？") },
                confirmButton = {
                    TextButton(onClick = { showConfirm = false; confirmResult = "已确认删除" }) {
                        Text("删除", color = MaterialTheme.colorScheme.error)
                    }
                },
                dismissButton = {
                    TextButton(onClick = { showConfirm = false; confirmResult = "已取消" }) {
                        Text("取消")
                    }
                }
            )
        }

        HorizontalDivider()

        // ── 2. 信息弹窗 ───────────────────────────────────────
        SectionLabel("信息弹窗（仅确认按钮）")
        var showInfo by remember { mutableStateOf(false) }

        OutlinedButton(onClick = { showInfo = true }) { Text("打开信息弹窗") }

        if (showInfo) {
            AlertDialog(
                onDismissRequest = { showInfo = false },
                icon = { Icon(Icons.Filled.Info, contentDescription = null) },
                title = { Text("提示") },
                text = { Text("您的账户已成功更新，新设置将在下次登录后生效。") },
                confirmButton = {
                    TextButton(onClick = { showInfo = false }) { Text("知道了") }
                }
            )
        }

        HorizontalDivider()

        // ── 3. 带列表的弹窗 ───────────────────────────────────
        SectionLabel("带列表内容的弹窗")
        var showList by remember { mutableStateOf(false) }
        var selectedLang by remember { mutableStateOf("中文") }

        FilledTonalButton(onClick = { showList = true }) { Text("选择语言（当前：$selectedLang）") }

        if (showList) {
            val langs = listOf("中文", "English", "日本語", "한국어", "Español")
            AlertDialog(
                onDismissRequest = { showList = false },
                title = { Text("选择语言") },
                text = {
                    Column {
                        langs.forEach { lang ->
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                TextButton(
                                    onClick = { selectedLang = lang; showList = false },
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    Text(
                                        lang,
                                        color = if (lang == selectedLang)
                                            MaterialTheme.colorScheme.primary
                                        else
                                            MaterialTheme.colorScheme.onSurface
                                    )
                                }
                            }
                        }
                    }
                },
                confirmButton = {
                    TextButton(onClick = { showList = false }) { Text("取消") }
                }
            )
        }
    }
}
