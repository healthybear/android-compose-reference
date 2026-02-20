package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

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
    }
}
