package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.Orientation
import androidx.compose.foundation.gestures.draggable
import androidx.compose.foundation.gestures.rememberDraggableState
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import kotlin.math.roundToInt

/**
 * DraggableDemo 演示 Modifier.draggable 的单轴拖拽手势用法。
 *
 * Modifier.draggable 是处理单轴拖拽的高级 API，比底层的 pointerInput 更简洁，
 * 但只支持水平（Horizontal）或垂直（Vertical）单一方向。
 *
 * 核心 API：
 * - [Modifier.draggable]：绑定拖拽手势，需指定 orientation 和 state
 * - [rememberDraggableState]：创建拖拽状态，lambda 接收每帧位移增量 delta（px）
 * - [LocalDensity]：用于 dp ↔ px 单位换算（手势回调返回 px，布局使用 dp）
 *
 * 与 detectDragGestures 的区别：
 * - draggable：高级 API，单轴，代码简洁
 * - detectDragGestures：底层 API，支持任意方向自由拖拽，灵活性更高
 *
 * 边界限制：使用 coerceIn(min, max) 将偏移量限制在合法范围内，
 * 防止滑块拖出轨道边界。
 */
@Composable
fun DraggableDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("Modifier.draggable 示例", style = MaterialTheme.typography.titleMedium)

        val density = LocalDensity.current

        // ── 1. 水平拖动 ───────────────────────────────────────
        SectionLabel("水平拖动滑块")
        val trackW = 280.dp
        val thumbSize = 40.dp
        val maxOffsetPx = with(density) { (trackW - thumbSize).toPx() }
        var offsetX by remember { mutableStateOf(0f) }

        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Box(
                modifier = Modifier.width(trackW).height(thumbSize)
                    .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(20.dp))
            ) {
                Box(
                    modifier = Modifier.size(thumbSize)
                        .offset { IntOffset(offsetX.roundToInt(), 0) }
                        .background(MaterialTheme.colorScheme.primary, CircleShape)
                        .draggable(
                            orientation = Orientation.Horizontal,
                            state = rememberDraggableState { delta ->
                                offsetX = (offsetX + delta).coerceIn(0f, maxOffsetPx)
                            }
                        )
                )
            }
            Text("offsetX = ${with(density) { offsetX.toDp() }.value.roundToInt()} dp",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        HorizontalDivider()

        // ── 2. 垂直拖动 ───────────────────────────────────────
        SectionLabel("垂直拖动滑块")
        val trackH = 160.dp
        val maxOffsetYPx = with(density) { (trackH - thumbSize).toPx() }
        var offsetY by remember { mutableStateOf(0f) }

        Row(horizontalArrangement = Arrangement.spacedBy(16.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier.width(thumbSize).height(trackH)
                    .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(20.dp))
            ) {
                Box(
                    modifier = Modifier.size(thumbSize)
                        .offset { IntOffset(0, offsetY.roundToInt()) }
                        .background(MaterialTheme.colorScheme.secondary, CircleShape)
                        .draggable(
                            orientation = Orientation.Vertical,
                            state = rememberDraggableState { delta ->
                                offsetY = (offsetY + delta).coerceIn(0f, maxOffsetYPx)
                            }
                        )
                )
            }
            Text("offsetY = ${with(density) { offsetY.toDp() }.value.roundToInt()} dp",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• draggable 只支持单轴（Horizontal / Vertical）\n" +
            "• 自由拖拽（双轴）请用 pointerInput + detectDragGestures\n" +
            "• onDragStarted / onDragStopped 可监听拖拽开始/结束",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
