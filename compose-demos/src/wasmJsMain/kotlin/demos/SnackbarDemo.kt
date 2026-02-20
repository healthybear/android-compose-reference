package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun SnackbarDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("Snackbar 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. SnackbarHost + SnackbarHostState ───────────────
        SectionLabel("基础 Snackbar（SnackbarHostState）")
        val snackbarHostState = remember { SnackbarHostState() }
        var message by remember { mutableStateOf("") }

        Box {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Button(onClick = {
                    message = "这是一条 Snackbar 消息"
                }) { Text("显示 Snackbar") }

                Text(
                    "注意：在真实 Scaffold 中，SnackbarHost 放在 scaffoldState 里；\n" +
                    "此处用独立 Box 演示外观。",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )

                // 直接展示 Snackbar 外观
                if (message.isNotEmpty()) {
                    Snackbar(
                        action = {
                            TextButton(onClick = { message = "" }) { Text("关闭") }
                        }
                    ) { Text(message) }
                }
            }
        }

        HorizontalDivider()

        // ── 2. 带 Action 的 Snackbar ──────────────────────────
        SectionLabel("带 Action 的 Snackbar")
        var showAction by remember { mutableStateOf(false) }
        var actionResult by remember { mutableStateOf("") }

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedButton(onClick = { showAction = true; actionResult = "" }) { Text("显示") }
            if (actionResult.isNotEmpty()) {
                Text("操作：$actionResult", style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }

        if (showAction) {
            Snackbar(
                action = {
                    TextButton(onClick = { actionResult = "已撤销"; showAction = false }) {
                        Text("撤销")
                    }
                },
                dismissAction = {
                    TextButton(onClick = { actionResult = "已关闭"; showAction = false }) {
                        Text("✕")
                    }
                }
            ) { Text("已删除 1 条记录") }
        }

        HorizontalDivider()

        // ── 3. 不同样式 ───────────────────────────────────────
        SectionLabel("containerColor 变体")
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Snackbar(
                containerColor = MaterialTheme.colorScheme.inverseSurface,
                contentColor = MaterialTheme.colorScheme.inverseOnSurface
            ) { Text("默认（inverseSurface）") }

            Snackbar(
                containerColor = MaterialTheme.colorScheme.errorContainer,
                contentColor = MaterialTheme.colorScheme.onErrorContainer
            ) { Text("错误提示（errorContainer）") }

            Snackbar(
                containerColor = MaterialTheme.colorScheme.primaryContainer,
                contentColor = MaterialTheme.colorScheme.onPrimaryContainer
            ) { Text("成功提示（primaryContainer）") }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• 实际使用时配合 Scaffold 的 snackbarHost 参数\n" +
            "• 通过 snackbarHostState.showSnackbar() 触发（suspend 函数）\n" +
            "• 返回值 SnackbarResult.ActionPerformed / Dismissed 判断用户操作",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
