package demos

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
import androidx.compose.ui.window.Dialog

/**
 * BasicAlertDialogDemo 演示 Material3 BasicAlertDialog 的用法。
 *
 * BasicAlertDialog 是完全自定义内容的对话框容器，
 * 不提供预定义的标题/正文/按钮布局，开发者可以在 content lambda 中
 * 放置任意 Composable，实现复杂的自定义对话框。
 *
 * 与 AlertDialog 的区别：
 * - AlertDialog：有固定的 title/text/confirmButton/dismissButton 插槽，适合标准确认框
 * - BasicAlertDialog：content 完全自由，适合自定义表单、选择器、图片预览等
 *
 * 注意：BasicAlertDialog 是实验性 API（@ExperimentalMaterial3Api），
 * 使用时需要 @OptIn(ExperimentalMaterial3Api::class)。
 *
 * 对话框背景和圆角需要手动添加（通常用 Surface 或 Card 包裹内容）。
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BasicAlertDialogDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("BasicAlertDialog 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("说明")
        Text(
            "BasicAlertDialog 不提供预设布局，内容完全自定义。\n适合需要特殊排版的弹窗场景。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        HorizontalDivider()

        // ── 1. 自定义内容弹窗 ─────────────────────────────────
        SectionLabel("自定义内容弹窗")
        var showCustom by remember { mutableStateOf(false) }

        Button(onClick = { showCustom = true }) { Text("打开自定义弹窗") }

        if (showCustom) {
            BasicAlertDialog(onDismissRequest = { showCustom = false }) {
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    tonalElevation = 6.dp
                ) {
                    Column(
                        modifier = Modifier.padding(24.dp),
                        verticalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        Text("自定义弹窗标题", style = MaterialTheme.typography.headlineSmall)
                        Text(
                            "这里可以放任意 Composable 内容，比如表单、图片、列表等。",
                            style = MaterialTheme.typography.bodyMedium
                        )
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.End,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            TextButton(onClick = { showCustom = false }) { Text("关闭") }
                        }
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 2. 评分弹窗 ───────────────────────────────────────
        SectionLabel("评分弹窗（自定义布局）")
        var showRating by remember { mutableStateOf(false) }
        var rating by remember { mutableStateOf(0) }
        var submitted by remember { mutableStateOf(false) }

        OutlinedButton(onClick = { showRating = true; submitted = false }) { Text("打开评分弹窗") }
        if (submitted) Text("你的评分：${"★".repeat(rating)}${"☆".repeat(5 - rating)}",
            style = MaterialTheme.typography.bodyMedium)

        if (showRating) {
            BasicAlertDialog(onDismissRequest = { showRating = false }) {
                Surface(shape = RoundedCornerShape(16.dp), tonalElevation = 6.dp) {
                    Column(
                        modifier = Modifier.padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        Icon(Icons.Filled.Star, contentDescription = null,
                            modifier = Modifier.size(40.dp),
                            tint = MaterialTheme.colorScheme.primary)
                        Text("请为本次体验评分", style = MaterialTheme.typography.titleMedium)
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            (1..5).forEach { i ->
                                IconButton(onClick = { rating = i }) {
                                    Icon(
                                        if (i <= rating) Icons.Filled.Star else Icons.Filled.StarBorder,
                                        contentDescription = "$i 星",
                                        tint = if (i <= rating) MaterialTheme.colorScheme.primary
                                               else MaterialTheme.colorScheme.onSurfaceVariant,
                                        modifier = Modifier.size(32.dp)
                                    )
                                }
                            }
                        }
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.End
                        ) {
                            TextButton(onClick = { showRating = false }) { Text("跳过") }
                            Spacer(Modifier.width(8.dp))
                            Button(
                                onClick = { submitted = true; showRating = false },
                                enabled = rating > 0
                            ) { Text("提交") }
                        }
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 3. 使用 Dialog 替代 ───────────────────────────────
        SectionLabel("Dialog（更底层的弹窗原语）")
        var showDialog by remember { mutableStateOf(false) }

        FilledTonalButton(onClick = { showDialog = true }) { Text("打开 Dialog") }

        if (showDialog) {
            Dialog(onDismissRequest = { showDialog = false }) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(MaterialTheme.colorScheme.surface, RoundedCornerShape(16.dp))
                        .padding(24.dp)
                ) {
                    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                        Text("Dialog 原语", style = MaterialTheme.typography.titleMedium)
                        Text("Dialog 是最底层的弹窗，BasicAlertDialog 在其基础上封装了 Material 样式。",
                            style = MaterialTheme.typography.bodySmall)
                        TextButton(
                            onClick = { showDialog = false },
                            modifier = Modifier.align(Alignment.End)
                        ) { Text("关闭") }
                    }
                }
            }
        }
    }
}
