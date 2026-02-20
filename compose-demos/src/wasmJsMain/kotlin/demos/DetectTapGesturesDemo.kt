package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.unit.dp

/**
 * DetectTapGesturesDemo 演示 detectTapGestures 的各种点击手势识别。
 *
 * detectTapGestures 是处理点击类手势的底层 API，通过 pointerInput 调用，
 * 支持四种手势回调（均可选）：
 * - `onTap`：单击（快速按下抬起）
 * - `onDoubleTap`：双击（在系统双击时间窗口内连续点击两次）
 * - `onLongPress`：长按（按下超过约 400ms）
 * - `onPress`：按下时立即触发（最早的回调，是挂起函数）
 *
 * 与高级 API 的对比：
 * - `clickable`：只支持单击，有 Ripple，适合标准按钮
 * - `combinedClickable`：支持单击+双击+长按，封装程度高
 * - `detectTapGestures`：最底层，无默认视觉反馈，完全自定义
 *
 * 注意：同时注册 onTap 和 onDoubleTap 时，单击会有短暂延迟（等待双击判定窗口）。
 * 只注册 onTap 时，单击响应更即时。
 */
@Composable
fun DetectTapGesturesDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("detectTapGestures 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 单击 / 双击 / 长按 ─────────────────────────────
        SectionLabel("单击 / 双击 / 长按")
        var action by remember { mutableStateOf("等待操作…") }
        var actionColor by remember { mutableStateOf(androidx.compose.ui.graphics.Color.Unspecified) }

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(100.dp)
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(12.dp))
                .pointerInput(Unit) {
                    detectTapGestures(
                        onTap = {
                            action = "单击 ✓"
                            actionColor = androidx.compose.ui.graphics.Color.Unspecified
                        },
                        onDoubleTap = {
                            action = "双击 ✓✓"
                            actionColor = androidx.compose.ui.graphics.Color.Unspecified
                        },
                        onLongPress = {
                            action = "长按 ⬛"
                            actionColor = androidx.compose.ui.graphics.Color.Unspecified
                        },
                        onPress = {
                            // onPress 在按下时立即触发
                        }
                    )
                },
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("单击 / 双击 / 长按我", style = MaterialTheme.typography.bodyMedium)
                Text(action, style = MaterialTheme.typography.titleMedium,
                    color = MaterialTheme.colorScheme.primary)
            }
        }

        HorizontalDivider()

        // ── 2. 各手势独立区域 ─────────────────────────────────
        SectionLabel("各手势独立区域")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            var tapCount by remember { mutableStateOf(0) }
            var doubleTapCount by remember { mutableStateOf(0) }
            var longPressCount by remember { mutableStateOf(0) }

            // 单击区
            Box(
                modifier = Modifier.weight(1f).height(72.dp)
                    .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(8.dp))
                    .pointerInput(Unit) {
                        detectTapGestures(onTap = { tapCount++ })
                    },
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("单击", style = MaterialTheme.typography.labelMedium)
                    Text("$tapCount", style = MaterialTheme.typography.titleLarge,
                        color = MaterialTheme.colorScheme.primary)
                }
            }

            // 双击区
            Box(
                modifier = Modifier.weight(1f).height(72.dp)
                    .background(MaterialTheme.colorScheme.secondaryContainer, RoundedCornerShape(8.dp))
                    .pointerInput(Unit) {
                        detectTapGestures(onDoubleTap = { doubleTapCount++ })
                    },
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("双击", style = MaterialTheme.typography.labelMedium)
                    Text("$doubleTapCount", style = MaterialTheme.typography.titleLarge,
                        color = MaterialTheme.colorScheme.secondary)
                }
            }

            // 长按区
            Box(
                modifier = Modifier.weight(1f).height(72.dp)
                    .background(MaterialTheme.colorScheme.tertiaryContainer, RoundedCornerShape(8.dp))
                    .pointerInput(Unit) {
                        detectTapGestures(onLongPress = { longPressCount++ })
                    },
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("长按", style = MaterialTheme.typography.labelMedium)
                    Text("$longPressCount", style = MaterialTheme.typography.titleLarge,
                        color = MaterialTheme.colorScheme.tertiary)
                }
            }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• detectTapGestures 在 pointerInput 内使用\n" +
            "• onTap / onDoubleTap / onLongPress / onPress 均可选\n" +
            "• 与 clickable / combinedClickable 相比，更底层、更灵活",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
