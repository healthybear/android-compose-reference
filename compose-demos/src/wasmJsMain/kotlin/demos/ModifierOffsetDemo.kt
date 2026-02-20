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

/**
 * ModifierOffsetDemo 演示 Modifier.offset 的用法及其与 padding 的区别。
 *
 * offset 将组件在视觉上平移指定距离，但不影响布局占位空间。
 * 这意味着其他组件不会感知到 offset 的存在，可能导致视觉重叠。
 *
 * 两种形式：
 * - `offset(x, y)` — 静态偏移，单位 dp，在布局阶段计算
 * - `offset { IntOffset(x, y) }` — 动态偏移，单位 px，在绘制阶段计算，
 *   性能更好（不触发重新布局），适合动画和手势驱动的偏移
 *
 * offset vs padding 的核心区别：
 * - padding 缩小子组件的可用约束空间，影响布局，其他组件会为其让位
 * - offset 只改变绘制位置，不影响布局，可能与其他组件重叠
 *
 * 典型用途：徽标定位、拖拽手势、视差滚动效果。
 */
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
