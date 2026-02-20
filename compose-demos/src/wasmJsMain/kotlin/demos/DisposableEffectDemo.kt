package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun DisposableEffectDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("DisposableEffect 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础：挂载 / 卸载日志 ─────────────────────────
        SectionLabel("挂载 / 卸载生命周期")
        var showComponent by remember { mutableStateOf(true) }
        val lifecycleLog = remember { mutableStateListOf<String>() }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Switch(checked = showComponent, onCheckedChange = { showComponent = it })
                Text(if (showComponent) "组件已挂载" else "组件已卸载",
                    style = MaterialTheme.typography.bodyMedium)
            }

            if (showComponent) {
                DisposableEffectTarget(
                    onMount = { lifecycleLog.add("✓ 挂载（onMount）") },
                    onDispose = { lifecycleLog.add("✕ 卸载（onDispose）") }
                )
            }

            Column(
                modifier = Modifier.fillMaxWidth()
                    .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                    .padding(8.dp),
                verticalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                Text("生命周期日志：", style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.primary)
                if (lifecycleLog.isEmpty()) {
                    Text("切换开关查看日志…", style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
                lifecycleLog.takeLast(8).forEach { log ->
                    Text(log, style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
            TextButton(onClick = { lifecycleLog.clear() }) { Text("清除日志") }
        }

        HorizontalDivider()

        // ── 2. key 变化时重新注册 ─────────────────────────────
        SectionLabel("key 变化时重新注册监听器")
        var listenerId by remember { mutableStateOf(1) }
        val listenerLog = remember { mutableStateListOf<String>() }

        DisposableEffect(listenerId) {
            listenerLog.add("注册监听器 #$listenerId")
            onDispose {
                listenerLog.add("注销监听器 #$listenerId")
            }
        }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Button(onClick = { listenerId++ }) { Text("切换监听器（当前 #$listenerId）") }
            }
            Column(
                modifier = Modifier.fillMaxWidth()
                    .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                    .padding(8.dp),
                verticalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                listenerLog.takeLast(8).forEach { log ->
                    Text(log, style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
            TextButton(onClick = { listenerLog.clear() }) { Text("清除") }
        }

        HorizontalDivider()

        // ── 3. 模拟计时器 ─────────────────────────────────────
        SectionLabel("模拟计时器（DisposableEffect + 外部资源）")
        var timerActive by remember { mutableStateOf(false) }
        var elapsed by remember { mutableStateOf(0) }

        // 用 LaunchedEffect 模拟外部计时器的 start/stop
        LaunchedEffect(timerActive) {
            if (timerActive) {
                while (true) {
                    kotlinx.coroutines.delay(1000)
                    elapsed++
                }
            }
        }

        Row(
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier.size(72.dp)
                    .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(12.dp)),
                contentAlignment = Alignment.Center
            ) {
                Text("${elapsed}s", style = MaterialTheme.typography.headlineSmall,
                    color = MaterialTheme.colorScheme.onPrimaryContainer)
            }
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Button(
                    onClick = { timerActive = !timerActive }
                ) { Text(if (timerActive) "暂停" else "开始") }
                OutlinedButton(onClick = { timerActive = false; elapsed = 0 }) { Text("重置") }
            }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• DisposableEffect(key) 在 key 变化或组件离开时执行 onDispose\n" +
            "• onDispose { } 用于清理资源：注销监听器、取消订阅等\n" +
            "• 与 LaunchedEffect 不同，DisposableEffect 是同步的\n" +
            "• 典型用途：EventBus 注册/注销、传感器监听、WebSocket 连接",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

@Composable
private fun DisposableEffectTarget(onMount: () -> Unit, onDispose: () -> Unit) {
    DisposableEffect(Unit) {
        onMount()
        onDispose { onDispose() }
    }
    Box(
        modifier = Modifier.fillMaxWidth().height(48.dp)
            .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(8.dp)),
        contentAlignment = Alignment.Center
    ) {
        Text("组件已挂载", style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onPrimaryContainer)
    }
}
