package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay

@Composable
fun LaunchedEffectDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("LaunchedEffect 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础：key=Unit，只执行一次 ────────────────────
        SectionLabel("key=Unit（只执行一次）")
        var initMessage by remember { mutableStateOf("等待…") }
        LaunchedEffect(Unit) {
            delay(500)
            initMessage = "LaunchedEffect(Unit) 已执行 ✓"
        }
        Text(initMessage, style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.primary)

        HorizontalDivider()

        // ── 2. key 变化时重新执行 ─────────────────────────────
        SectionLabel("key 变化时重新执行")
        var searchQuery by remember { mutableStateOf("") }
        var searchResult by remember { mutableStateOf("") }
        var searching by remember { mutableStateOf(false) }

        LaunchedEffect(searchQuery) {
            if (searchQuery.isBlank()) {
                searchResult = ""
                return@LaunchedEffect
            }
            searching = true
            searchResult = "搜索中…"
            delay(600) // 模拟网络请求
            searchResult = "「$searchQuery」的搜索结果（共 ${searchQuery.length * 3} 条）"
            searching = false
        }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                label = { Text("搜索关键词") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
                trailingIcon = {
                    if (searching) CircularProgressIndicator(modifier = Modifier.size(20.dp), strokeWidth = 2.dp)
                }
            )
            if (searchResult.isNotEmpty()) {
                Text(searchResult, style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }

        HorizontalDivider()

        // ── 3. 倒计时 ─────────────────────────────────────────
        SectionLabel("倒计时（协程循环）")
        var running by remember { mutableStateOf(false) }
        var seconds by remember { mutableStateOf(10) }

        LaunchedEffect(running) {
            if (running) {
                while (seconds > 0) {
                    delay(1000)
                    seconds--
                }
                running = false
            }
        }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier.size(64.dp)
                        .background(
                            if (seconds > 0) MaterialTheme.colorScheme.primaryContainer
                            else MaterialTheme.colorScheme.errorContainer,
                            RoundedCornerShape(12.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        if (seconds > 0) "$seconds" else "0",
                        style = MaterialTheme.typography.headlineMedium,
                        color = if (seconds > 0) MaterialTheme.colorScheme.onPrimaryContainer
                                else MaterialTheme.colorScheme.onErrorContainer
                    )
                }
                Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Button(
                        onClick = { running = true },
                        enabled = !running && seconds > 0
                    ) { Text("开始") }
                    OutlinedButton(
                        onClick = { running = false; seconds = 10 }
                    ) { Text("重置") }
                }
            }
            if (seconds == 0) {
                Text("时间到！", style = MaterialTheme.typography.titleMedium,
                    color = MaterialTheme.colorScheme.error)
            }
        }

        HorizontalDivider()

        // ── 4. 多 key ─────────────────────────────────────────
        SectionLabel("多 key（任一变化即重新执行）")
        var page by remember { mutableStateOf(1) }
        var pageSize by remember { mutableStateOf(10) }
        var loadResult by remember { mutableStateOf("") }

        LaunchedEffect(page, pageSize) {
            loadResult = "加载中…"
            delay(400)
            loadResult = "第 $page 页，每页 $pageSize 条（共 ${pageSize} 条数据）"
        }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedButton(onClick = { if (page > 1) page-- }) { Text("上一页") }
                Text("第 $page 页", style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.align(Alignment.CenterVertically))
                OutlinedButton(onClick = { page++ }) { Text("下一页") }
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                listOf(5, 10, 20).forEach { size ->
                    FilterChip(
                        selected = pageSize == size,
                        onClick = { pageSize = size },
                        label = { Text("$size 条") }
                    )
                }
            }
            Text(loadResult, style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• LaunchedEffect(key) 在 key 变化时取消旧协程并启动新协程\n" +
            "• key=Unit 表示只在首次进入组合时执行一次\n" +
            "• 组件离开组合树时协程自动取消\n" +
            "• 适合：数据加载、动画触发、副作用等异步操作",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
