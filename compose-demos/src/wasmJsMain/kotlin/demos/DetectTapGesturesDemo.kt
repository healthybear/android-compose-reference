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
