package demos

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.expandVertically
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.shrinkVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/**
 * ListWithDialogCompositionDemo 演示列表与对话框的组合场景。
 *
 * 展示如何组合 LazyColumn、AlertDialog、SwipeToDismiss 等组件实现：
 * - 列表展开/收起动画
 * - 项目详情对话框
 * - 删除确认对话框
 * - 列表项操作菜单
 * - 筛选和排序功能
 *
 * 学习要点：
 * - 列表状态管理（展开/选中/删除）
 * - 对话框与列表数据联动
 * - AnimatedVisibility 实现展开动画
 * - 用户操作反馈流程
 */
@Composable
fun ListWithDialogCompositionDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("列表+对话框组合示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("任务列表管理")

        data class TodoItem(
            val id: Int,
            val title: String,
            val description: String,
            val priority: Priority,
            var completed: Boolean = false,
            var expanded: Boolean = false
        )

        enum class Priority(val label: String, val color: androidx.compose.ui.graphics.Color) {
            HIGH("高优先级", androidx.compose.ui.graphics.Color(0xFFEF5350)),
            MEDIUM("中优先级", androidx.compose.ui.graphics.Color(0xFFFFA726)),
            LOW("低优先级", androidx.compose.ui.graphics.Color(0xFF66BB6A))
        }

        val todos = remember {
            mutableStateListOf(
                TodoItem(1, "完成项目报告", "整理本周工作进度，准备周会汇报材料", Priority.HIGH),
                TodoItem(2, "代码审查", "审查 PR #123 的代码变更", Priority.MEDIUM, completed = true),
                TodoItem(3, "更新文档", "更新 API 文档和使用示例", Priority.MEDIUM),
                TodoItem(4, "团队会议", "参加每周团队同步会议", Priority.LOW),
                TodoItem(5, "修复 Bug", "解决用户反馈的登录问题", Priority.HIGH)
            )
        }

        var selectedItem by remember { mutableStateOf<TodoItem?>(null) }
        var showDetailDialog by remember { mutableStateOf(false) }
        var itemToDelete by remember { mutableStateOf<TodoItem?>(null) }
        var showDeleteDialog by remember { mutableStateOf(false) }
        var filterCompleted by remember { mutableStateOf(false) }
        var sortByPriority by remember { mutableStateOf(false) }

        val scope = rememberCoroutineScope()

        // 筛选和排序
        val filteredTodos = remember(todos.toList(), filterCompleted, sortByPriority) {
            var result = todos.toList()
            if (filterCompleted) {
                result = result.filter { !it.completed }
            }
            if (sortByPriority) {
                result = result.sortedBy { it.priority.ordinal }
            }
            result
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
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                // 头部：标题和操作
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            "我的任务",
                            style = MaterialTheme.typography.titleSmall
                        )
                        Text(
                            "已完成：${todos.count { it.completed }} / ${todos.size}",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        FilterChip(
                            selected = filterCompleted,
                            onClick = { filterCompleted = !filterCompleted },
                            label = { Text("仅未完成", style = MaterialTheme.typography.labelSmall) },
                            leadingIcon = {
                                Icon(
                                    if (filterCompleted) Icons.Filled.Check else Icons.Filled.Close,
                                    contentDescription = null,
                                    modifier = Modifier.size(16.dp)
                                )
                            }
                        )
                        FilterChip(
                            selected = sortByPriority,
                            onClick = { sortByPriority = !sortByPriority },
                            label = { Text("按优先级", style = MaterialTheme.typography.labelSmall) },
                            leadingIcon = {
                                Icon(
                                    Icons.Filled.Star,
                                    contentDescription = null,
                                    modifier = Modifier.size(16.dp)
                                )
                            }
                        )
                    }
                }

                HorizontalDivider()

                // 列表
                LazyColumn(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(400.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    if (filteredTodos.isEmpty()) {
                        item {
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(vertical = 40.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Column(
                                    horizontalAlignment = Alignment.CenterHorizontally,
                                    verticalArrangement = Arrangement.spacedBy(8.dp)
                                ) {
                                    Icon(
                                        Icons.Filled.CheckCircle,
                                        contentDescription = null,
                                        modifier = Modifier.size(48.dp),
                                        tint = MaterialTheme.colorScheme.outline
                                    )
                                    Text(
                                        "没有待办任务",
                                        style = MaterialTheme.typography.bodyMedium,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant
                                    )
                                }
                            }
                        }
                    } else {
                        items(filteredTodos, key = { it.id }) { item ->
                            Card(
                                modifier = Modifier.fillMaxWidth(),
                                colors = CardDefaults.cardColors(
                                    containerColor = if (item.completed)
                                        MaterialTheme.colorScheme.surfaceVariant
                                    else
                                        MaterialTheme.colorScheme.surface
                                )
                            ) {
                                Column {
                                    Row(
                                        modifier = Modifier
                                            .fillMaxWidth()
                                            .clickable {
                                                val index = todos.indexOf(item)
                                                if (index >= 0) {
                                                    todos[index] = item.copy(expanded = !item.expanded)
                                                }
                                            }
                                            .padding(12.dp),
                                        horizontalArrangement = Arrangement.spacedBy(12.dp),
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        // 优先级指示器
                                        Box(
                                            modifier = Modifier
                                                .size(12.dp)
                                                .clip(CircleShape)
                                                .background(item.priority.color)
                                        )

                                        Column(
                                            modifier = Modifier.weight(1f),
                                            verticalArrangement = Arrangement.spacedBy(4.dp)
                                        ) {
                                            Text(
                                                item.title,
                                                style = MaterialTheme.typography.bodyLarge,
                                                textDecoration = if (item.completed)
                                                    androidx.compose.ui.text.style.TextDecoration.LineThrough
                                                else null
                                            )
                                            Text(
                                                item.priority.label,
                                                style = MaterialTheme.typography.labelSmall,
                                                color = MaterialTheme.colorScheme.onSurfaceVariant
                                            )
                                        }

                                        // 操作按钮
                                        Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                                            IconButton(
                                                onClick = {
                                                    val index = todos.indexOf(item)
                                                    if (index >= 0) {
                                                        todos[index] = item.copy(completed = !item.completed)
                                                    }
                                                }
                                            ) {
                                                Icon(
                                                    if (item.completed) Icons.Filled.CheckCircle else Icons.Filled.Star,
                                                    contentDescription = "标记完成",
                                                    tint = if (item.completed)
                                                        MaterialTheme.colorScheme.primary
                                                    else
                                                        MaterialTheme.colorScheme.outline
                                                )
                                            }

                                            IconButton(
                                                onClick = {
                                                    selectedItem = item
                                                    showDetailDialog = true
                                                }
                                            ) {
                                                Icon(
                                                    Icons.Filled.Info,
                                                    contentDescription = "查看详情"
                                                )
                                            }

                                            IconButton(
                                                onClick = {
                                                    itemToDelete = item
                                                    showDeleteDialog = true
                                                }
                                            ) {
                                                Icon(
                                                    Icons.Filled.Delete,
                                                    contentDescription = "删除",
                                                    tint = MaterialTheme.colorScheme.error
                                                )
                                            }
                                        }
                                    }

                                    // 展开的详情
                                    AnimatedVisibility(
                                        visible = item.expanded,
                                        enter = expandVertically() + fadeIn(),
                                        exit = shrinkVertically() + fadeOut()
                                    ) {
                                        Column(
                                            modifier = Modifier
                                                .fillMaxWidth()
                                                .background(MaterialTheme.colorScheme.surfaceVariant)
                                                .padding(12.dp),
                                            verticalArrangement = Arrangement.spacedBy(8.dp)
                                        ) {
                                            Text(
                                                "详细描述",
                                                style = MaterialTheme.typography.labelMedium,
                                                color = MaterialTheme.colorScheme.primary
                                            )
                                            Text(
                                                item.description,
                                                style = MaterialTheme.typography.bodyMedium
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // 详情对话框
        if (showDetailDialog && selectedItem != null) {
            AlertDialog(
                onDismissRequest = { showDetailDialog = false },
                icon = {
                    Box(
                        modifier = Modifier
                            .size(48.dp)
                            .clip(CircleShape)
                            .background(selectedItem!!.priority.color),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            Icons.Filled.Info,
                            contentDescription = null,
                            tint = androidx.compose.ui.graphics.Color.White
                        )
                    }
                },
                title = { Text(selectedItem!!.title) },
                text = {
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Text(
                            selectedItem!!.description,
                            style = MaterialTheme.typography.bodyMedium
                        )
                        HorizontalDivider()
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(
                                "优先级",
                                style = MaterialTheme.typography.labelMedium
                            )
                            Text(
                                selectedItem!!.priority.label,
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.primary
                            )
                        }
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(
                                "状态",
                                style = MaterialTheme.typography.labelMedium
                            )
                            Text(
                                if (selectedItem!!.completed) "已完成" else "进行中",
                                style = MaterialTheme.typography.bodyMedium,
                                color = if (selectedItem!!.completed)
                                    MaterialTheme.colorScheme.primary
                                else
                                    MaterialTheme.colorScheme.secondary
                            )
                        }
                    }
                },
                confirmButton = {
                    Button(onClick = { showDetailDialog = false }) {
                        Text("关闭")
                    }
                }
            )
        }

        // 删除确认对话框
        if (showDeleteDialog && itemToDelete != null) {
            AlertDialog(
                onDismissRequest = { showDeleteDialog = false },
                icon = {
                    Icon(
                        Icons.Filled.Warning,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.error,
                        modifier = Modifier.size(48.dp)
                    )
                },
                title = { Text("确认删除") },
                text = {
                    Text("确定要删除任务「${itemToDelete!!.title}」吗？此操作无法撤销。")
                },
                confirmButton = {
                    Button(
                        onClick = {
                            todos.remove(itemToDelete)
                            showDeleteDialog = false
                            itemToDelete = null
                        },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = MaterialTheme.colorScheme.error
                        )
                    ) {
                        Text("删除")
                    }
                },
                dismissButton = {
                    TextButton(onClick = { showDeleteDialog = false }) {
                        Text("取消")
                    }
                }
            )
        }
    }
}
