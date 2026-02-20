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
