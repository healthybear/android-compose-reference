package demos

import androidx.compose.animation.core.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * CircularProgressDemo 演示 Material3 CircularProgressIndicator 的用法。
 *
 * CircularProgressIndicator 是圆形进度指示器，有两种模式：
 * - 不确定进度（Indeterminate）：无限旋转动画，表示"正在处理，时长未知"
 * - 确定进度（Determinate）：显示具体进度值（0f~1f），表示"已完成 X%"
 *
 * 核心参数：
 * - 不传 `progress` 参数 → 不确定模式（无限旋转）
 * - 传入 `progress: () -> Float` → 确定模式（显示进度）
 * - `strokeWidth`：圆弧线条宽度
 * - `color`：进度弧颜色（默认 primary）
 * - `trackColor`：背景轨道颜色（默认 surfaceVariant）
 *
 * 动画技巧：使用 animateFloatAsState 对 progress 值做平滑过渡，
 * 避免进度条跳变，提升视觉体验。
 */
@Composable
fun CircularProgressDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("CircularProgressIndicator 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 不确定进度（旋转动画）─────────────────────────
        SectionLabel("不确定进度（Indeterminate）")
        Row(
            horizontalArrangement = Arrangement.spacedBy(24.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            CircularProgressIndicator()
            Text("加载中…", style = MaterialTheme.typography.bodyMedium)
        }

        HorizontalDivider()

        // ── 2. 确定进度 ───────────────────────────────────────
        SectionLabel("确定进度（Determinate）")
        var progress by remember { mutableStateOf(0.3f) }
        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                CircularProgressIndicator(progress = { progress })
                Text("${(progress * 100).toInt()}%", style = MaterialTheme.typography.bodyMedium)
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedButton(onClick = { progress = (progress - 0.1f).coerceAtLeast(0f) }) { Text("-10%") }
                OutlinedButton(onClick = { progress = (progress + 0.1f).coerceAtMost(1f) }) { Text("+10%") }
            }
        }

        HorizontalDivider()

        // ── 3. 自定义尺寸和颜色 ───────────────────────────────
        SectionLabel("自定义尺寸 & 颜色")
        Row(
            horizontalArrangement = Arrangement.spacedBy(20.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(4.dp)) {
                CircularProgressIndicator(modifier = Modifier.size(24.dp), strokeWidth = 2.dp)
                Text("小", style = MaterialTheme.typography.labelSmall)
            }
            Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(4.dp)) {
                CircularProgressIndicator()
                Text("默认", style = MaterialTheme.typography.labelSmall)
            }
            Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(4.dp)) {
                CircularProgressIndicator(modifier = Modifier.size(56.dp), strokeWidth = 6.dp)
                Text("大", style = MaterialTheme.typography.labelSmall)
            }
            Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(4.dp)) {
                CircularProgressIndicator(
                    color = MaterialTheme.colorScheme.secondary,
                    trackColor = MaterialTheme.colorScheme.secondaryContainer
                )
                Text("自定义色", style = MaterialTheme.typography.labelSmall)
            }
        }

        HorizontalDivider()

        // ── 4. 加载按钮场景 ───────────────────────────────────
        SectionLabel("场景示例：加载按钮")
        var loading by remember { mutableStateOf(false) }
        var done by remember { mutableStateOf(false) }

        LaunchedEffect(loading) {
            if (loading) {
                kotlinx.coroutines.delay(2000)
                loading = false
                done = true
            }
        }

        Button(
            onClick = { loading = true; done = false },
            enabled = !loading
        ) {
            if (loading) {
                CircularProgressIndicator(
                    modifier = Modifier.size(16.dp),
                    strokeWidth = 2.dp,
                    color = MaterialTheme.colorScheme.onPrimary
                )
                Spacer(Modifier.width(8.dp))
                Text("处理中…")
            } else {
                Text(if (done) "✓ 完成" else "提交")
            }
        }
    }
}
