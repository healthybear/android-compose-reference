package demos

import androidx.compose.animation.*
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
 * AnimatedVisibilityDemo 演示 AnimatedVisibility 的显示/隐藏过渡动画。
 *
 * AnimatedVisibility 在组件显示/隐藏时自动播放过渡动画，
 * 与直接用 if 判断相比，它保证退出动画完整播放后才移除组件。
 *
 * 核心参数：
 * - `visible`：控制显示/隐藏的布尔状态
 * - `enter`：进入动画（默认 fadeIn + expandIn）
 * - `exit`：退出动画（默认 fadeOut + shrinkOut）
 *
 * 常用动画效果（可用 `+` 组合）：
 * - [fadeIn] / [fadeOut]：透明度渐变
 * - [slideInVertically] / [slideOutVertically]：垂直滑动，lambda 参数为偏移量
 * - [expandVertically] / [shrinkVertically]：高度展开/收起（影响布局空间）
 * - [expandHorizontally] / [shrinkHorizontally]：宽度展开/收起
 *
 * 组合示例：`enter = fadeIn() + expandHorizontally()` 同时淡入并水平展开。
 */
@Composable
fun AnimatedVisibilityDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("AnimatedVisibility 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础淡入淡出 ───────────────────────────────────
        SectionLabel("基础淡入淡出（fadeIn / fadeOut）")
        var visible1 by remember { mutableStateOf(true) }
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { visible1 = !visible1 }) {
                Text(if (visible1) "隐藏" else "显示")
            }
            AnimatedVisibility(visible = visible1) {
                Box(
                    modifier = Modifier.fillMaxWidth().height(48.dp)
                        .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(8.dp)),
                    contentAlignment = Alignment.Center
                ) { Text("淡入淡出内容", style = MaterialTheme.typography.bodyMedium) }
            }
        }

        HorizontalDivider()

        // ── 2. 滑入滑出 ───────────────────────────────────────
        SectionLabel("滑入滑出（slideIn / slideOut）")
        var visible2 by remember { mutableStateOf(true) }
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { visible2 = !visible2 }) {
                Text(if (visible2) "隐藏" else "显示")
            }
            AnimatedVisibility(
                visible = visible2,
                enter = slideInVertically { -it },
                exit = slideOutVertically { -it }
            ) {
                Box(
                    modifier = Modifier.fillMaxWidth().height(48.dp)
                        .background(MaterialTheme.colorScheme.secondaryContainer, RoundedCornerShape(8.dp)),
                    contentAlignment = Alignment.Center
                ) { Text("从顶部滑入", style = MaterialTheme.typography.bodyMedium) }
            }
        }

        HorizontalDivider()

        // ── 3. 展开收起 ───────────────────────────────────────
        SectionLabel("展开收起（expandVertically / shrinkVertically）")
        var visible3 by remember { mutableStateOf(false) }
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedButton(onClick = { visible3 = !visible3 }) {
                Text(if (visible3) "收起详情 ▲" else "展开详情 ▼")
            }
            AnimatedVisibility(
                visible = visible3,
                enter = expandVertically(),
                exit = shrinkVertically()
            ) {
                Card(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text("详情内容", style = MaterialTheme.typography.titleSmall)
                        Text("这里是展开后显示的详细信息，可以放任意内容。", style = MaterialTheme.typography.bodySmall)
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 4. 自定义 enter/exit 组合 ─────────────────────────
        SectionLabel("自定义组合（fadeIn + expandHorizontally）")
        var visible4 by remember { mutableStateOf(true) }
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            FilledTonalButton(onClick = { visible4 = !visible4 }) {
                Text(if (visible4) "隐藏" else "显示")
            }
            AnimatedVisibility(
                visible = visible4,
                enter = fadeIn() + expandHorizontally(),
                exit = fadeOut() + shrinkHorizontally()
            ) {
                Box(
                    modifier = Modifier.height(48.dp)
                        .background(MaterialTheme.colorScheme.tertiaryContainer, RoundedCornerShape(8.dp))
                        .padding(horizontal = 24.dp),
                    contentAlignment = Alignment.Center
                ) { Text("水平展开 + 淡入", style = MaterialTheme.typography.bodyMedium) }
            }
        }

        HorizontalDivider()

        // ── 5. 实际场景：列表项展开 ───────────────────────────
        SectionLabel("场景示例：列表项展开/收起")

        data class ExpandableItem(
            val id: Int,
            val title: String,
            val details: String,
            var expanded: Boolean = false
        )

        val items = remember {
            mutableStateListOf(
                ExpandableItem(1, "Jetpack Compose", "现代化的 Android UI 工具包，使用声明式 API 构建原生界面"),
                ExpandableItem(2, "Material Design 3", "Google 最新的设计系统，提供灵活的主题和组件"),
                ExpandableItem(3, "Kotlin Coroutines", "用于异步编程的强大库，简化并发代码编写")
            )
        }

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items.forEach { item ->
                    Card(modifier = Modifier.fillMaxWidth()) {
                        Column {
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(12.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    item.title,
                                    style = MaterialTheme.typography.bodyLarge,
                                    modifier = Modifier.weight(1f)
                                )
                                IconButton(
                                    onClick = {
                                        val index = items.indexOf(item)
                                        items[index] = item.copy(expanded = !item.expanded)
                                    }
                                ) {
                                    Icon(
                                        if (item.expanded)
                                            androidx.compose.material.icons.Icons.Filled.KeyboardArrowUp
                                        else
                                            androidx.compose.material.icons.Icons.Filled.KeyboardArrowDown,
                                        contentDescription = if (item.expanded) "收起" else "展开"
                                    )
                                }
                            }

                            AnimatedVisibility(
                                visible = item.expanded,
                                enter = expandVertically() + fadeIn(),
                                exit = shrinkVertically() + fadeOut()
                            ) {
                                Box(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .background(MaterialTheme.colorScheme.surfaceVariant)
                                        .padding(12.dp)
                                ) {
                                    Text(
                                        item.details,
                                        style = MaterialTheme.typography.bodyMedium,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 6. 实际场景：通知提示 ─────────────────────────────
        SectionLabel("场景示例：通知提示显示/消失")

        var showNotification by remember { mutableStateOf(false) }
        var notificationMessage by remember { mutableStateOf("") }

        LaunchedEffect(showNotification) {
            if (showNotification) {
                kotlinx.coroutines.delay(3000)
                showNotification = false
            }
        }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Button(
                    onClick = {
                        notificationMessage = "操作成功！"
                        showNotification = true
                    }
                ) {
                    Text("显示成功通知")
                }
                OutlinedButton(
                    onClick = {
                        notificationMessage = "出现错误，请重试"
                        showNotification = true
                    }
                ) {
                    Text("显示错误通知")
                }
            }

            AnimatedVisibility(
                visible = showNotification,
                enter = slideInVertically { -it } + fadeIn(),
                exit = slideOutVertically { -it } + fadeOut()
            ) {
                Card(
                    colors = CardDefaults.cardColors(
                        containerColor = if (notificationMessage.contains("成功"))
                            MaterialTheme.colorScheme.primaryContainer
                        else
                            MaterialTheme.colorScheme.errorContainer
                    )
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(12.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                if (notificationMessage.contains("成功"))
                                    androidx.compose.material.icons.Icons.Filled.CheckCircle
                                else
                                    androidx.compose.material.icons.Icons.Filled.Warning,
                                contentDescription = null,
                                tint = if (notificationMessage.contains("成功"))
                                    MaterialTheme.colorScheme.onPrimaryContainer
                                else
                                    MaterialTheme.colorScheme.onErrorContainer
                            )
                            Text(
                                notificationMessage,
                                style = MaterialTheme.typography.bodyMedium,
                                color = if (notificationMessage.contains("成功"))
                                    MaterialTheme.colorScheme.onPrimaryContainer
                                else
                                    MaterialTheme.colorScheme.onErrorContainer
                            )
                        }
                        IconButton(onClick = { showNotification = false }) {
                            Icon(
                                androidx.compose.material.icons.Icons.Filled.Close,
                                contentDescription = "关闭",
                                modifier = Modifier.size(18.dp)
                            )
                        }
                    }
                }
            }

            if (showNotification) {
                Text(
                    "通知将在 3 秒后自动消失",
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}
