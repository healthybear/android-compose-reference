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
 * ModifierPointerInputDemo 演示 Modifier.pointerInput() 的用法。
 *
 * pointerInput 用于处理底层的手势和触摸事件，提供比 clickable 更灵活的控制。
 *
 * 核心特性：
 * - 检测点击、长按、拖动等手势
 * - 获取触摸位置信息
 * - 自定义手势处理逻辑
 *
 * 常用检测器：
 * - detectTapGestures：点击、长按、双击
 * - detectDragGestures：拖动
 * - detectTransformGestures：缩放、旋转
 */
@Composable
fun ModifierPointerInputDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("Modifier.pointerInput 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 检测点击 ───────────────────────────────────────
        SectionLabel("检测点击位置")

        var tapPosition by remember { mutableStateOf("未点击") }

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(120.dp)
                .background(
                    MaterialTheme.colorScheme.primaryContainer,
                    RoundedCornerShape(8.dp)
                )
                .pointerInput(Unit) {
                    detectTapGestures { offset ->
                        tapPosition = "点击位置：(${offset.x.toInt()}, ${offset.y.toInt()})"
                    }
                },
            contentAlignment = Alignment.Center
        ) {
            Text(
                tapPosition,
                style = MaterialTheme.typography.bodyMedium
            )
        }

        HorizontalDivider()

        // ── 2. 检测长按 ───────────────────────────────────────
        SectionLabel("检测长按")

        var pressState by remember { mutableStateOf("正常状态") }

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(120.dp)
                .background(
                    when (pressState) {
                        "长按中" -> MaterialTheme.colorScheme.secondaryContainer
                        "已长按" -> MaterialTheme.colorScheme.tertiaryContainer
                        else -> MaterialTheme.colorScheme.surfaceVariant
                    },
                    RoundedCornerShape(8.dp)
                )
                .pointerInput(Unit) {
                    detectTapGestures(
                        onPress = {
                            pressState = "长按中"
                            tryAwaitRelease()
                            pressState = "正常状态"
                        },
                        onLongPress = {
                            pressState = "已长按"
                        }
                    )
                },
            contentAlignment = Alignment.Center
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    pressState,
                    style = MaterialTheme.typography.titleMedium
                )
                Text(
                    "长按区域试试",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        HorizontalDivider()

        // ── 3. 检测双击 ───────────────────────────────────────
        SectionLabel("检测双击")

        var clickCount by remember { mutableStateOf(0) }
        var doubleClickCount by remember { mutableStateOf(0) }

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(120.dp)
                    .pointerInput(Unit) {
                        detectTapGestures(
                            onTap = { clickCount++ },
                            onDoubleTap = { doubleClickCount++ }
                        )
                    },
                contentAlignment = Alignment.Center
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Text(
                        "单击次数：$clickCount",
                        style = MaterialTheme.typography.bodyLarge
                    )
                    Text(
                        "双击次数：$doubleClickCount",
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.primary
                    )
                    Text(
                        "点击或双击区域",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• pointerInput 提供底层手势控制\n" +
            "• detectTapGestures 检测点击、长按、双击\n" +
            "• 可以获取触摸位置和详细事件信息\n" +
            "• 适合需要自定义手势处理的场景",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
