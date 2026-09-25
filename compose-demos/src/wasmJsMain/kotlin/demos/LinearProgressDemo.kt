package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * LinearProgressDemo 演示 Material3 LinearProgressIndicator 的用法。
 *
 * LinearProgressIndicator 是水平线形进度指示器，同样有两种模式：
 * - 不确定进度（Indeterminate）：波浪形无限动画，表示"正在处理"
 * - 确定进度（Determinate）：从左到右填充，显示具体进度
 *
 * 核心参数：
 * - 不传 `progress` → 不确定模式
 * - 传入 `progress: () -> Float` → 确定模式（0f=空，1f=满）
 * - `color`：进度条颜色
 * - `trackColor`：背景轨道颜色
 * - `strokeCap`：线条端点样式（Round/Butt）
 *
 * LinearProgressIndicator vs CircularProgressIndicator：
 * - 线形适合页面加载、文件下载等有明确进度的场景
 * - 圆形适合按钮内嵌、小区域内的加载状态
 */
@Composable
fun LinearProgressDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("LinearProgressIndicator 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 不确定进度 ─────────────────────────────────────
        SectionLabel("不确定进度（Indeterminate）")
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            LinearProgressIndicator(modifier = Modifier.fillMaxWidth())
            Text("加载中…", style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        HorizontalDivider()

        // ── 2. 确定进度 ───────────────────────────────────────
        SectionLabel("确定进度（Determinate）")
        var progress by remember { mutableStateOf(0.4f) }
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            LinearProgressIndicator(
                progress = { progress },
                modifier = Modifier.fillMaxWidth()
            )
            Text("${(progress * 100).toInt()}%", style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedButton(onClick = { progress = (progress - 0.1f).coerceAtLeast(0f) }) { Text("-10%") }
                OutlinedButton(onClick = { progress = (progress + 0.1f).coerceAtMost(1f) }) { Text("+10%") }
                TextButton(onClick = { progress = 0f }) { Text("重置") }
            }
        }

        HorizontalDivider()

        // ── 3. 自定义颜色 ─────────────────────────────────────
        SectionLabel("自定义颜色")
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            listOf(
                MaterialTheme.colorScheme.primary   to MaterialTheme.colorScheme.primaryContainer   to "primary",
                MaterialTheme.colorScheme.secondary to MaterialTheme.colorScheme.secondaryContainer to "secondary",
                MaterialTheme.colorScheme.error     to MaterialTheme.colorScheme.errorContainer     to "error",
            ).forEach { (colorTrack, label) ->
                val (color, track) = colorTrack
                Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                    Text(label, style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant)
                    LinearProgressIndicator(
                        progress = { 0.6f },
                        color = color,
                        trackColor = track,
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            }
        }

        HorizontalDivider()

        // ── 4. 场景示例：文件下载 ─────────────────────────────
        SectionLabel("场景示例：文件下载")
        var downloading by remember { mutableStateOf(false) }
        var downloadProgress by remember { mutableStateOf(0f) }

        LaunchedEffect(downloading) {
            if (downloading) {
                downloadProgress = 0f
                while (downloadProgress < 1f) {
                    kotlinx.coroutines.delay(80)
                    downloadProgress = (downloadProgress + 0.02f).coerceAtMost(1f)
                }
                downloading = false
            }
        }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            if (downloading || downloadProgress > 0f) {
                LinearProgressIndicator(
                    progress = { downloadProgress },
                    modifier = Modifier.fillMaxWidth()
                )
                Text(
                    if (downloadProgress >= 1f) "下载完成 ✓"
                    else "下载中… ${(downloadProgress * 100).toInt()}%",
                    style = MaterialTheme.typography.bodySmall,
                    color = if (downloadProgress >= 1f) MaterialTheme.colorScheme.primary
                            else MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            Button(
                onClick = { downloading = true },
                enabled = !downloading
            ) { Text(if (downloadProgress >= 1f) "重新下载" else "开始下载") }
        }

        HorizontalDivider()

        // ── 5. 实际场景：批量任务处理 ─────────────────────────
        SectionLabel("场景示例：批量任务处理")

        data class Task(val name: String, val progress: Float, val status: String)

        val tasks = remember {
            mutableStateListOf(
                Task("处理图片压缩", 0f, "等待中"),
                Task("生成缩略图", 0f, "等待中"),
                Task("上传到服务器", 0f, "等待中")
            )
        }
        var processingTasks by remember { mutableStateOf(false) }

        LaunchedEffect(processingTasks) {
            if (processingTasks) {
                tasks.forEachIndexed { index, _ ->
                    tasks[index] = tasks[index].copy(status = "处理中", progress = 0f)
                    while (tasks[index].progress < 1f) {
                        kotlinx.coroutines.delay(50)
                        tasks[index] = tasks[index].copy(
                            progress = (tasks[index].progress + 0.05f).coerceAtMost(1f)
                        )
                    }
                    tasks[index] = tasks[index].copy(status = "已完成", progress = 1f)
                }
                processingTasks = false
            }
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
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
                ) {
                    Text(
                        "批量处理任务",
                        style = MaterialTheme.typography.titleSmall
                    )
                    Text(
                        "${tasks.count { it.status == "已完成" }} / ${tasks.size}",
                        style = MaterialTheme.typography.labelMedium,
                        color = MaterialTheme.colorScheme.primary
                    )
                }

                tasks.forEach { task ->
                    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
                        ) {
                            Text(
                                task.name,
                                style = MaterialTheme.typography.bodyMedium
                            )
                            Text(
                                task.status,
                                style = MaterialTheme.typography.labelSmall,
                                color = when (task.status) {
                                    "已完成" -> MaterialTheme.colorScheme.primary
                                    "处理中" -> MaterialTheme.colorScheme.secondary
                                    else -> MaterialTheme.colorScheme.outline
                                }
                            )
                        }
                        LinearProgressIndicator(
                            progress = { task.progress },
                            modifier = Modifier.fillMaxWidth(),
                            color = if (task.status == "已完成")
                                MaterialTheme.colorScheme.primary
                            else
                                MaterialTheme.colorScheme.secondary
                        )
                    }
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Button(
                        onClick = { processingTasks = true },
                        enabled = !processingTasks,
                        modifier = Modifier.weight(1f)
                    ) {
                        Text("开始处理")
                    }
                    OutlinedButton(
                        onClick = {
                            tasks.forEachIndexed { i, task ->
                                tasks[i] = task.copy(progress = 0f, status = "等待中")
                            }
                        },
                        enabled = !processingTasks && tasks.any { it.progress > 0f }
                    ) {
                        Text("重置")
                    }
                }
            }
        }
    }
}
