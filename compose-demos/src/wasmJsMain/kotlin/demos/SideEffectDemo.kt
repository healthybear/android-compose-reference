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
fun SideEffectDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("SideEffect 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. SideEffect 基础 ────────────────────────────────
        SectionLabel("SideEffect（每次重组后执行）")
        var count by remember { mutableStateOf(0) }
        val recomposeLog = remember { mutableStateListOf<String>() }

        // SideEffect 在每次成功重组后执行（非挂起）
        SideEffect {
            recomposeLog.add("重组 #${recomposeLog.size + 1}，count=$count")
            if (recomposeLog.size > 6) recomposeLog.removeAt(0)
        }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Button(onClick = { count++ }) { Text("触发重组（count=$count）") }
                TextButton(onClick = { recomposeLog.clear(); count = 0 }) { Text("清除") }
            }
            Column(
                modifier = Modifier.fillMaxWidth()
                    .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                    .padding(8.dp),
                verticalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                if (recomposeLog.isEmpty()) {
                    Text("点击按钮触发重组…", style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
                recomposeLog.forEach { log ->
                    Text(log, style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }

        HorizontalDivider()

        // ── 2. SideEffect 同步外部状态 ────────────────────────
        SectionLabel("同步外部状态（模拟 Analytics）")
        var currentScreen by remember { mutableStateOf("首页") }
        val analyticsLog = remember { mutableStateListOf<String>() }

        // 每次重组都将当前屏幕名同步给"外部系统"
        SideEffect {
            // 模拟：analytics.setCurrentScreen(currentScreen)
            val entry = "上报页面：$currentScreen"
            if (analyticsLog.lastOrNull() != entry) {
                analyticsLog.add(entry)
                if (analyticsLog.size > 5) analyticsLog.removeAt(0)
            }
        }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                listOf("首页", "详情页", "设置页", "个人中心").forEach { screen ->
                    FilterChip(
                        selected = currentScreen == screen,
                        onClick = { currentScreen = screen },
                        label = { Text(screen) }
                    )
                }
            }
            Column(
                modifier = Modifier.fillMaxWidth()
                    .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                    .padding(8.dp),
                verticalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                Text("Analytics 日志：", style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.primary)
                analyticsLog.forEach { log ->
                    Text(log, style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }

        HorizontalDivider()

        // ── 3. SideEffect vs LaunchedEffect 对比 ─────────────
        SectionLabel("SideEffect vs LaunchedEffect")
        Column(
            modifier = Modifier.fillMaxWidth()
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                .padding(12.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Box(
                    modifier = Modifier.weight(1f)
                        .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(6.dp))
                        .padding(8.dp)
                ) {
                    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text("SideEffect", style = MaterialTheme.typography.labelMedium,
                            color = MaterialTheme.colorScheme.primary)
                        Text("• 每次重组后执行\n• 同步（非挂起）\n• 无 key 参数\n• 适合同步外部状态",
                            style = MaterialTheme.typography.labelSmall)
                    }
                }
                Box(
                    modifier = Modifier.weight(1f)
                        .background(MaterialTheme.colorScheme.secondaryContainer, RoundedCornerShape(6.dp))
                        .padding(8.dp)
                ) {
                    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text("LaunchedEffect", style = MaterialTheme.typography.labelMedium,
                            color = MaterialTheme.colorScheme.secondary)
                        Text("• key 变化时执行\n• 异步（协程）\n• 有 key 参数\n• 适合异步操作",
                            style = MaterialTheme.typography.labelSmall)
                    }
                }
            }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• SideEffect 在每次成功重组后同步执行\n" +
            "• 不接受 key，不能取消，不能挂起\n" +
            "• 典型用途：将 Compose 状态同步给非 Compose 的外部对象",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
