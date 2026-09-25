package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/**
 * RememberCoroutineScopeDemo 演示 rememberCoroutineScope() 的用法。
 *
 * rememberCoroutineScope 用于在 Composable 中启动协程，协程会在 Composable 离开组合时自动取消。
 *
 * 核心特性：
 * - 创建与 Composable 生命周期绑定的协程作用域
 * - 自动取消：Composable 销毁时协程自动取消
 * - 适合响应用户交互启动的异步操作
 *
 * vs LaunchedEffect：
 * - rememberCoroutineScope：用于事件回调（如按钮点击）
 * - LaunchedEffect：用于响应状态变化的副作用
 */
@Composable
fun RememberCoroutineScopeDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("rememberCoroutineScope 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础用法 ───────────────────────────────────────
        SectionLabel("基础用法：异步操作")

        val scope = rememberCoroutineScope()
        var loading by remember { mutableStateOf(false) }
        var result by remember { mutableStateOf("") }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(
                onClick = {
                    scope.launch {
                        loading = true
                        result = "处理中..."
                        delay(2000) // 模拟异步操作
                        result = "操作完成！"
                        loading = false
                    }
                },
                enabled = !loading
            ) {
                if (loading) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(16.dp),
                        strokeWidth = 2.dp,
                        color = MaterialTheme.colorScheme.onPrimary
                    )
                    Spacer(Modifier.width(8.dp))
                }
                Text(if (loading) "处理中..." else "启动异步操作")
            }

            if (result.isNotEmpty()) {
                Text(
                    result,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.primary
                )
            }
        }

        HorizontalDivider()

        // ── 2. 多个并发操作 ───────────────────────────────────
        SectionLabel("多个并发操作")

        val scope2 = rememberCoroutineScope()
        var task1Status by remember { mutableStateOf("未开始") }
        var task2Status by remember { mutableStateOf("未开始") }
        var task3Status by remember { mutableStateOf("未开始") }

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
                    "任务状态",
                    style = MaterialTheme.typography.titleSmall
                )

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("任务 1:", style = MaterialTheme.typography.bodyMedium)
                    Text(
                        task1Status,
                        style = MaterialTheme.typography.bodySmall,
                        color = if (task1Status == "完成") MaterialTheme.colorScheme.primary
                        else MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("任务 2:", style = MaterialTheme.typography.bodyMedium)
                    Text(
                        task2Status,
                        style = MaterialTheme.typography.bodySmall,
                        color = if (task2Status == "完成") MaterialTheme.colorScheme.primary
                        else MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("任务 3:", style = MaterialTheme.typography.bodyMedium)
                    Text(
                        task3Status,
                        style = MaterialTheme.typography.bodySmall,
                        color = if (task3Status == "完成") MaterialTheme.colorScheme.primary
                        else MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }

                HorizontalDivider()

                Button(
                    onClick = {
                        // 并发启动多个协程
                        scope2.launch {
                            task1Status = "执行中"
                            delay(1000)
                            task1Status = "完成"
                        }
                        scope2.launch {
                            task2Status = "执行中"
                            delay(1500)
                            task2Status = "完成"
                        }
                        scope2.launch {
                            task3Status = "执行中"
                            delay(2000)
                            task3Status = "完成"
                        }
                    },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("启动所有任务")
                }

                OutlinedButton(
                    onClick = {
                        task1Status = "未开始"
                        task2Status = "未开始"
                        task3Status = "未开始"
                    },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("重置")
                }
            }
        }

        HorizontalDivider()

        // ── 3. 倒计时示例 ─────────────────────────────────────
        SectionLabel("场景示例：倒计时")

        val scope3 = rememberCoroutineScope()
        var countdown by remember { mutableStateOf(10) }
        var isCountingDown by remember { mutableStateOf(false) }

        Card(
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(
                    if (isCountingDown) "$countdown" else "准备开始",
                    style = MaterialTheme.typography.displayMedium,
                    color = if (countdown <= 3 && isCountingDown)
                        MaterialTheme.colorScheme.error
                    else
                        MaterialTheme.colorScheme.primary
                )

                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Button(
                        onClick = {
                            isCountingDown = true
                            scope3.launch {
                                while (countdown > 0) {
                                    delay(1000)
                                    countdown--
                                }
                                isCountingDown = false
                            }
                        },
                        enabled = !isCountingDown && countdown > 0
                    ) {
                        Text("开始倒计时")
                    }

                    OutlinedButton(
                        onClick = {
                            countdown = 10
                            isCountingDown = false
                        }
                    ) {
                        Text("重置")
                    }
                }
            }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• rememberCoroutineScope 创建与 Composable 绑定的协程作用域\n" +
            "• 适合响应用户交互的异步操作\n" +
            "• Composable 销毁时协程自动取消\n" +
            "• 可以启动多个并发协程",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
