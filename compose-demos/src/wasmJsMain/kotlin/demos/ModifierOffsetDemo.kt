package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.draggable
import androidx.compose.foundation.gestures.rememberDraggableState
import androidx.compose.foundation.gestures.Orientation
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
fun ModifierOffsetDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Modifier.offset 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 固定 offset ────────────────────────────────────
        SectionLabel("offset(x, y) — 固定偏移")
        Text(
            "offset 不影响布局占位，仅视觉位移",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(100.dp)
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
        ) {
            // 基准位置（虚线框感知）
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .align(Alignment.TopStart)
                    .padding(8.dp)
                    .background(MaterialTheme.colorScheme.outlineVariant, RoundedCornerShape(4.dp))
            )
            // 偏移后的方块
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .align(Alignment.TopStart)
                    .offset(x = 24.dp, y = 24.dp)
                    .background(MaterialTheme.colorScheme.primary, RoundedCornerShape(4.dp)),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    "+24,+24",
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onPrimary
                )
            }
        }

        HorizontalDivider()

        // ── 2. 拖动改变 offset ────────────────────────────────
        SectionLabel("拖动滑块改变水平 offset")
        val trackWidthDp = 280.dp
        val thumbSizeDp = 40.dp
        val density = LocalDensity.current
        val trackWidthPx = with(density) { trackWidthDp.toPx() }
        val thumbSizePx  = with(density) { thumbSizeDp.toPx() }
        val maxOffsetPx  = trackWidthPx - thumbSizePx

        var offsetX by remember { mutableStateOf(0f) }
        val draggableState = rememberDraggableState { delta ->
            offsetX = (offsetX + delta).coerceIn(0f, maxOffsetPx)
        }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Box(
                modifier = Modifier
                    .width(trackWidthDp)
                    .height(thumbSizeDp)
                    .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(20.dp))
            ) {
                Box(
                    modifier = Modifier
                        .size(thumbSizeDp)
                        .offset { IntOffset(offsetX.roundToInt(), 0) }
                        .background(MaterialTheme.colorScheme.primary, CircleShape)
                        .draggable(
                            state = draggableState,
                            orientation = Orientation.Horizontal
                        )
                )
            }
            Text(
                "offsetX = ${with(density) { offsetX.toDp() }.value.roundToInt()} dp",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }

        HorizontalDivider()

        // ── 3. offset vs padding 区别 ─────────────────────────
        SectionLabel("offset vs padding 区别")
        Text(
            "padding 会缩小可用空间；offset 只移动视觉位置，不影响其他子项布局。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Row(horizontalArrangement = Arrangement.spacedBy(24.dp)) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Row {
                    Box(
                        modifier = Modifier
                            .size(32.dp)
                            .offset(x = 8.dp)
                            .background(MaterialTheme.colorScheme.primary, RoundedCornerShape(4.dp))
                    )
                    Box(
                        modifier = Modifier
                            .size(32.dp)
                            .background(MaterialTheme.colorScheme.secondary, RoundedCornerShape(4.dp))
                    )
                }
                Text("offset：两块重叠", style = MaterialTheme.typography.labelSmall)
            }
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Row {
                    Box(
                        modifier = Modifier
                            .size(32.dp)
                            .padding(start = 8.dp)
                            .background(MaterialTheme.colorScheme.primary, RoundedCornerShape(4.dp))
                    )
                    Box(
                        modifier = Modifier
                            .size(32.dp)
                            .background(MaterialTheme.colorScheme.secondary, RoundedCornerShape(4.dp))
                    )
                }
                Text("padding：推开间距", style = MaterialTheme.typography.labelSmall)
            }
        }
    }
}
