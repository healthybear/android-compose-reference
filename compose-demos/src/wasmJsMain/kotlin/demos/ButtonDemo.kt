package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/**
 * ButtonDemo 演示 Material3 中各种按钮组件的用法与视觉差异。
 *
 * Material3 按钮层级（由强到弱）：
 * - [Button]（Filled）— 最高强调，用于主要操作
 * - [ElevatedButton] — 带阴影，用于需要与背景区分的操作
 * - [FilledTonalButton] — 次要强调，使用 secondaryContainer 色
 * - [OutlinedButton] — 中等强调，带边框
 * - [TextButton] — 最低强调，无背景无边框
 */
@Composable
fun ButtonDemo() {
    var count by remember { mutableStateOf(0) }
    var liked by remember { mutableStateOf(false) }
    var loading by remember { mutableStateOf(false) }

    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Button 示例", style = MaterialTheme.typography.titleMedium)

        // 五种按钮共用相同的 onClick / enabled / colors 参数接口，仅外观不同，
        // 选择哪种取决于操作在当前页面的重要程度（视觉层级）。
        // ── 1. 五种样式 ───────────────────────────────────
        SectionLabel("五种样式")
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Button(onClick = {}) { Text("Filled") }
            FilledTonalButton(onClick = {}) { Text("Tonal") }
            OutlinedButton(onClick = {}) { Text("Outlined") }
            ElevatedButton(onClick = {}) { Text("Elevated") }
            TextButton(onClick = {}) { Text("Text") }
        }

        HorizontalDivider()

        // enabled = false 时按钮自动应用 disabledContainerColor / disabledContentColor，
        // 无需手动处理颜色；加载中模式通过 enabled = !loading 防止重复触发。
        // ── 2. 禁用 & 加载中 ──────────────────────────────
        SectionLabel("状态：正常 / 禁用 / 加载中")
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Button(onClick = {}) { Text("正常") }
            Button(onClick = {}, enabled = false) { Text("禁用") }
            Button(
                onClick = { loading = !loading },
                enabled = !loading
            ) {
                if (loading) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(16.dp),
                        strokeWidth = 2.dp,
                        color = MaterialTheme.colorScheme.onPrimary
                    )
                    Spacer(Modifier.width(8.dp))
                    Text("加载中…")
                } else {
                    Text("点击加载")
                }
            }
        }

        HorizontalDivider()

        // 将状态绑定到 onClick 是 Compose 响应式模型的核心：
        // 状态变化 → 重组 → UI 自动更新，无需手动刷新视图。
        // ── 3. 交互计数 ───────────────────────────────────
        SectionLabel("交互计数")
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Button(onClick = { count++ }) { Text("+1") }
            OutlinedButton(onClick = { if (count > 0) count-- }) { Text("-1") }
            TextButton(onClick = { count = 0 }) { Text("重置") }
            Text(
                "计数：$count",
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.primary
            )
        }

        HorizontalDivider()

        // ButtonDefaults.buttonColors() 允许覆盖 containerColor / contentColor，
        // 实现切换态视觉反馈，比手动设置背景色更符合 Material3 规范。
        // ── 4. 切换状态按钮 ───────────────────────────────
        SectionLabel("切换状态")
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Button(
                onClick = { liked = !liked },
                colors = if (liked)
                    ButtonDefaults.buttonColors(
                        containerColor = MaterialTheme.colorScheme.errorContainer,
                        contentColor = MaterialTheme.colorScheme.onErrorContainer
                    )
                else ButtonDefaults.buttonColors()
            ) {
                Text(if (liked) "♥ 已收藏" else "♡ 收藏")
            }
            OutlinedButton(
                onClick = { liked = !liked },
                colors = if (liked)
                    ButtonDefaults.outlinedButtonColors(
                        contentColor = MaterialTheme.colorScheme.error
                    )
                else ButtonDefaults.outlinedButtonColors()
            ) {
                Text(if (liked) "取消收藏" else "收藏")
            }
        }

        HorizontalDivider()

        // FAB 系列与普通按钮的核心区别：FAB 悬浮于内容之上（elevation），
        // 始终可见，用于页面级主操作；普通按钮内嵌于布局流中。
        // ── 5. FAB ────────────────────────────────────────
        SectionLabel("FloatingActionButton")
        Row(
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            SmallFloatingActionButton(onClick = {}) { Text("+") }
            FloatingActionButton(onClick = {}) { Text("+") }
            LargeFloatingActionButton(onClick = {}) { Text("+") }
            ExtendedFloatingActionButton(
                onClick = {},
                text = { Text("新建") },
                icon = { Text("+") }
            )
        }

        HorizontalDivider()

        // 实际场景：表单提交流程演示
        // 展示按钮在真实应用中的状态流转：正常 → 加载 → 成功/失败
        // ── 6. 实际场景：表单提交流程 ──────────────────────────
        SectionLabel("场景示例：表单提交流程")

        var submitState by remember { mutableStateOf<SubmitState>(SubmitState.Idle) }
        val scope = rememberCoroutineScope()

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
                    "模拟表单提交",
                    style = MaterialTheme.typography.titleSmall
                )

                // 提交按钮
                Button(
                    onClick = {
                        scope.launch {
                            submitState = SubmitState.Loading
                            delay(2000) // 模拟网络请求
                            submitState = if ((0..1).random() == 0) {
                                SubmitState.Success
                            } else {
                                SubmitState.Error("网络连接失败，请重试")
                            }
                            delay(3000) // 显示结果 3 秒后重置
                            submitState = SubmitState.Idle
                        }
                    },
                    enabled = submitState != SubmitState.Loading,
                    modifier = Modifier.fillMaxWidth(),
                    colors = when (submitState) {
                        is SubmitState.Success -> ButtonDefaults.buttonColors(
                            containerColor = MaterialTheme.colorScheme.primary,
                            contentColor = MaterialTheme.colorScheme.onPrimary
                        )
                        is SubmitState.Error -> ButtonDefaults.buttonColors(
                            containerColor = MaterialTheme.colorScheme.errorContainer,
                            contentColor = MaterialTheme.colorScheme.onErrorContainer
                        )
                        else -> ButtonDefaults.buttonColors()
                    }
                ) {
                    when (submitState) {
                        SubmitState.Idle -> Text("提交表单")
                        SubmitState.Loading -> {
                            CircularProgressIndicator(
                                modifier = Modifier.size(16.dp),
                                strokeWidth = 2.dp,
                                color = MaterialTheme.colorScheme.onPrimary
                            )
                            Spacer(Modifier.width(8.dp))
                            Text("提交中…")
                        }
                        is SubmitState.Success -> {
                            Icon(
                                Icons.Filled.Check,
                                contentDescription = null,
                                modifier = Modifier.size(20.dp)
                            )
                            Spacer(Modifier.width(8.dp))
                            Text("提交成功")
                        }
                        is SubmitState.Error -> {
                            Icon(
                                Icons.Filled.Warning,
                                contentDescription = null,
                                modifier = Modifier.size(20.dp)
                            )
                            Spacer(Modifier.width(8.dp))
                            Text("提交失败")
                        }
                    }
                }

                // 状态说明
                when (val state = submitState) {
                    SubmitState.Idle -> Text(
                        "点击按钮模拟表单提交（随机成功/失败）",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    SubmitState.Loading -> Text(
                        "正在处理请求…",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.primary
                    )
                    is SubmitState.Success -> Text(
                        "数据已成功保存！",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.primary
                    )
                    is SubmitState.Error -> Text(
                        state.message,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.error
                    )
                }
            }
        }
    }
}

private sealed class SubmitState {
    object Idle : SubmitState()
    object Loading : SubmitState()
    object Success : SubmitState()
    data class Error(val message: String) : SubmitState()
}
