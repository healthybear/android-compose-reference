package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * SnackbarDemo 演示 Material3 Snackbar 的用法。
 *
 * Snackbar 是轻量级的临时消息提示，从屏幕底部弹出，
 * 短暂显示后自动消失，可选包含一个操作按钮。
 *
 * Compose 中 Snackbar 的使用模式：
 * 1. 创建 [SnackbarHostState]（通常用 remember）
 * 2. 在布局中放置 [SnackbarHost]，传入 hostState
 * 3. 在协程中调用 `hostState.showSnackbar(message, actionLabel, duration)` 显示
 * 4. `showSnackbar` 是挂起函数，会等待 Snackbar 消失后返回 [SnackbarResult]
 *
 * SnackbarResult：
 * - `ActionPerformed`：用户点击了操作按钮
 * - `Dismissed`：Snackbar 自动消失或被手动关闭
 *
 * 注意：showSnackbar 必须在协程中调用，通常配合 LaunchedEffect 或 rememberCoroutineScope。
 */
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

        HorizontalDivider()

        // ── 4. 实际场景：操作反馈 ─────────────────────────────
        SectionLabel("场景示例：操作反馈与撤销")

        data class Item(val id: Int, val name: String)

        val items = remember {
            mutableStateListOf(
                Item(1, "项目 A"),
                Item(2, "项目 B"),
                Item(3, "项目 C")
            )
        }
        var deletedItem by remember { mutableStateOf<Item?>(null) }
        var showDeleteSnackbar by remember { mutableStateOf(false) }

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
                Text(
                    "我的项目 (${items.size})",
                    style = MaterialTheme.typography.titleSmall
                )

                if (items.isEmpty()) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 20.dp),
                        contentAlignment = androidx.compose.ui.Alignment.Center
                    ) {
                        Text(
                            "暂无项目",
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.outline
                        )
                    }
                } else {
                    items.forEach { item ->
                        Card(
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(12.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
                            ) {
                                Text(
                                    item.name,
                                    style = MaterialTheme.typography.bodyMedium
                                )
                                IconButton(
                                    onClick = {
                                        deletedItem = item
                                        items.remove(item)
                                        showDeleteSnackbar = true
                                    }
                                ) {
                                    Icon(
                                        androidx.compose.material.icons.Icons.Filled.Delete,
                                        contentDescription = "删除",
                                        tint = MaterialTheme.colorScheme.error
                                    )
                                }
                            }
                        }
                    }
                }

                // Snackbar
                if (showDeleteSnackbar && deletedItem != null) {
                    Snackbar(
                        action = {
                            TextButton(
                                onClick = {
                                    deletedItem?.let { items.add(it) }
                                    showDeleteSnackbar = false
                                    deletedItem = null
                                }
                            ) {
                                Text("撤销")
                            }
                        },
                        dismissAction = {
                            IconButton(
                                onClick = {
                                    showDeleteSnackbar = false
                                    deletedItem = null
                                }
                            ) {
                                Icon(
                                    androidx.compose.material.icons.Icons.Filled.Close,
                                    contentDescription = "关闭",
                                    modifier = Modifier.size(18.dp)
                                )
                            }
                        },
                        containerColor = MaterialTheme.colorScheme.inverseSurface,
                        contentColor = MaterialTheme.colorScheme.inverseOnSurface
                    ) {
                        Text("已删除「${deletedItem?.name}」")
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 5. 实际场景：网络状态提示 ─────────────────────────
        SectionLabel("场景示例：状态提示")

        var networkStatus by remember { mutableStateOf("在线") }
        var showStatusSnackbar by remember { mutableStateOf(false) }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Button(
                    onClick = {
                        networkStatus = "离线"
                        showStatusSnackbar = true
                    }
                ) {
                    Text("模拟离线")
                }
                OutlinedButton(
                    onClick = {
                        networkStatus = "在线"
                        showStatusSnackbar = true
                    }
                ) {
                    Text("恢复在线")
                }
            }

            if (showStatusSnackbar) {
                Snackbar(
                    containerColor = if (networkStatus == "离线")
                        MaterialTheme.colorScheme.errorContainer
                    else
                        MaterialTheme.colorScheme.primaryContainer,
                    contentColor = if (networkStatus == "离线")
                        MaterialTheme.colorScheme.onErrorContainer
                    else
                        MaterialTheme.colorScheme.onPrimaryContainer,
                    dismissAction = {
                        IconButton(onClick = { showStatusSnackbar = false }) {
                            Icon(
                                androidx.compose.material.icons.Icons.Filled.Close,
                                contentDescription = "关闭",
                                modifier = Modifier.size(18.dp)
                            )
                        }
                    }
                ) {
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
                    ) {
                        Icon(
                            if (networkStatus == "离线")
                                androidx.compose.material.icons.Icons.Filled.Warning
                            else
                                androidx.compose.material.icons.Icons.Filled.Check,
                            contentDescription = null,
                            modifier = Modifier.size(20.dp)
                        )
                        Text(
                            if (networkStatus == "离线")
                                "网络连接已断开"
                            else
                                "网络连接已恢复"
                        )
                    }
                }
            }
        }
    }
}
