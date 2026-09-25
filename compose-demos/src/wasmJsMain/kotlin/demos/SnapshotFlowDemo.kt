package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.snapshotFlow
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.filter

/**
 * SnapshotFlowDemo 演示 snapshotFlow 的用法。
 *
 * snapshotFlow 将 Compose 状态转换为 Kotlin Flow，允许使用 Flow 操作符处理状态变化。
 *
 * 核心特性：
 * - 将状态转换为 Flow
 * - 可以使用 Flow 操作符（map、filter、debounce 等）
 * - 自动追踪状态依赖
 *
 * 使用场景：
 * - 需要对状态变化进行复杂处理
 * - 结合 Flow 操作符进行过滤、转换
 * - 响应多个状态的组合变化
 */
@Composable
fun SnapshotFlowDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("snapshotFlow 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础用法 ───────────────────────────────────────
        SectionLabel("基础用法：监听状态变化")

        var counter by remember { mutableStateOf(0) }
        var flowValue by remember { mutableStateOf("") }

        LaunchedEffect(Unit) {
            snapshotFlow { counter }
                .collect { value ->
                    flowValue = "Flow 收到值：$value"
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
                Text(
                    "计数器：$counter",
                    style = MaterialTheme.typography.titleLarge
                )

                Text(
                    flowValue,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.primary
                )

                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Button(onClick = { counter++ }) {
                        Text("+1")
                    }
                    OutlinedButton(onClick = { counter-- }) {
                        Text("-1")
                    }
                    TextButton(onClick = { counter = 0 }) {
                        Text("重置")
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 2. 使用 Flow 操作符 ───────────────────────────────
        SectionLabel("使用 Flow 操作符（filter）")

        var number by remember { mutableStateOf(0) }
        var evenNumbers by remember { mutableStateOf(listOf<Int>()) }

        LaunchedEffect(Unit) {
            snapshotFlow { number }
                .filter { it % 2 == 0 } // 只收集偶数
                .distinctUntilChanged()
                .collect { value ->
                    evenNumbers = evenNumbers + value
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
                Text(
                    "当前数字：$number",
                    style = MaterialTheme.typography.titleMedium
                )

                Text(
                    "收集到的偶数：${evenNumbers.joinToString(", ")}",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.primary
                )

                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Button(onClick = { number++ }) {
                        Text("增加")
                    }
                    OutlinedButton(
                        onClick = {
                            number = 0
                            evenNumbers = listOf()
                        }
                    ) {
                        Text("重置")
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 3. 监听多个状态 ───────────────────────────────────
        SectionLabel("监听多个状态组合")

        var width by remember { mutableStateOf(100f) }
        var height by remember { mutableStateOf(100f) }
        var area by remember { mutableStateOf(0f) }

        LaunchedEffect(Unit) {
            snapshotFlow { width * height } // 组合多个状态
                .collect { value ->
                    area = value
                }
        }

        Card(
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(
                    "面积计算器",
                    style = MaterialTheme.typography.titleSmall
                )

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("宽度：${width.toInt()}")
                    Slider(
                        value = width,
                        onValueChange = { width = it },
                        valueRange = 50f..200f,
                        modifier = Modifier.weight(1f).padding(horizontal = 8.dp)
                    )
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("高度：${height.toInt()}")
                    Slider(
                        value = height,
                        onValueChange = { height = it },
                        valueRange = 50f..200f,
                        modifier = Modifier.weight(1f).padding(horizontal = 8.dp)
                    )
                }

                HorizontalDivider()

                Text(
                    "面积：${area.toInt()}",
                    style = MaterialTheme.typography.titleMedium,
                    color = MaterialTheme.colorScheme.primary
                )
            }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• snapshotFlow 将 Compose 状态转换为 Kotlin Flow\n" +
            "• 可以使用 Flow 操作符（filter、map、distinctUntilChanged 等）\n" +
            "• 自动追踪状态依赖，只在相关状态变化时触发\n" +
            "• 适合需要对状态进行复杂处理的场景",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
