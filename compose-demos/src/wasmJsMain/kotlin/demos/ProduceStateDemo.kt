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
fun ProduceStateDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("produceState 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 模拟异步数据加载 ───────────────────────────────
        SectionLabel("异步数据加载")

        // produceState 将异步数据转换为 State
        val weatherState by produceState<WeatherUiState>(initialValue = WeatherUiState.Loading) {
            delay(1200)
            value = WeatherUiState.Success(
                city = "北京",
                temp = 22,
                desc = "晴转多云"
            )
        }

        Box(
            modifier = Modifier.fillMaxWidth().height(100.dp)
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(12.dp)),
            contentAlignment = Alignment.Center
        ) {
            when (val state = weatherState) {
                is WeatherUiState.Loading -> {
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        CircularProgressIndicator(modifier = Modifier.size(20.dp), strokeWidth = 2.dp)
                        Text("加载天气数据…", style = MaterialTheme.typography.bodyMedium)
                    }
                }
                is WeatherUiState.Success -> {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("${state.city} ${state.temp}°C",
                            style = MaterialTheme.typography.titleLarge,
                            color = MaterialTheme.colorScheme.primary)
                        Text(state.desc, style = MaterialTheme.typography.bodyMedium)
                    }
                }
                is WeatherUiState.Error -> {
                    Text("加载失败：${state.message}", color = MaterialTheme.colorScheme.error)
                }
            }
        }

        HorizontalDivider()

        // ── 2. key 变化时重新加载 ─────────────────────────────
        SectionLabel("key 变化时重新加载")
        var userId by remember { mutableStateOf(1) }

        val userState by produceState<String>(initialValue = "加载中…", key1 = userId) {
            value = "加载中…"
            delay(800)
            value = "用户 #$userId：${listOf("Alice", "Bob", "Charlie", "Diana")[userId % 4]}"
        }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                OutlinedButton(onClick = { if (userId > 1) userId-- }) { Text("上一个") }
                Text("ID: $userId", style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.align(Alignment.CenterVertically))
                OutlinedButton(onClick = { userId++ }) { Text("下一个") }
            }
            Text(userState, style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.primary)
        }

        HorizontalDivider()

        // ── 3. 轮询更新 ───────────────────────────────────────
        SectionLabel("轮询更新（每秒刷新）")
        var pollingEnabled by remember { mutableStateOf(false) }

        val tickState by produceState(initialValue = 0, key1 = pollingEnabled) {
            if (pollingEnabled) {
                while (true) {
                    delay(1000)
                    value++
                }
            }
        }

        Row(
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Switch(checked = pollingEnabled, onCheckedChange = { pollingEnabled = it })
            Text(
                if (pollingEnabled) "轮询中… tick=$tickState" else "轮询已停止",
                style = MaterialTheme.typography.bodyMedium,
                color = if (pollingEnabled) MaterialTheme.colorScheme.primary
                        else MaterialTheme.colorScheme.onSurfaceVariant
            )
        }

        HorizontalDivider()

        // ── 4. produceState vs LaunchedEffect 对比 ────────────
        SectionLabel("produceState vs LaunchedEffect")
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
                        Text("produceState", style = MaterialTheme.typography.labelMedium,
                            color = MaterialTheme.colorScheme.primary)
                        Text("• 返回 State<T>\n• 有 initialValue\n• 适合将外部数据流转为 State",
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
                        Text("• 无返回值\n• 需手动管理 State\n• 适合触发副作用",
                            style = MaterialTheme.typography.labelSmall)
                    }
                }
            }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• produceState { } 在协程中更新 value 来驱动 UI\n" +
            "• 支持 key1/key2 参数，key 变化时重新执行\n" +
            "• 组件离开组合树时协程自动取消\n" +
            "• 适合：Flow 收集、网络请求、传感器数据转 State",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

private sealed interface WeatherUiState {
    data object Loading : WeatherUiState
    data class Success(val city: String, val temp: Int, val desc: String) : WeatherUiState
    data class Error(val message: String) : WeatherUiState
}
