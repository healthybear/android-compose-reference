package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.compose.foundation.gestures.detectDragGestures
import kotlin.math.roundToInt

/**
 * DetectDragGesturesDemo 演示 detectDragGestures 的自由拖拽手势用法。
 *
 * detectDragGestures 是处理任意方向拖拽的底层 API，通过 pointerInput 调用，
 * 支持双轴自由拖拽（区别于 Modifier.draggable 的单轴限制）。
 *
 * 四个生命周期回调：
 * - `onDragStart(startPosition)`：手势开始，参数为起始触摸点坐标
 * - `onDrag(change, dragAmount)`：手势进行中，每帧调用
 *   - `change.consume()`：标记事件已消费，阻止事件向父组件传递
 *   - `dragAmount`：本帧相对上一帧的位移增量（Offset，单位 px）
 * - `onDragEnd()`：手势正常结束（手指抬起）
 * - `onDragCancel()`：手势被系统取消
 *
 * 边界限制：使用 coerceIn 将坐标限制在容器范围内，
 * `size` 属性在 pointerInput 作用域内可直接访问，表示当前组件的像素尺寸。
 */
@Composable
fun DetectDragGesturesDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("detectDragGestures 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 自由拖拽 ───────────────────────────────────────
        SectionLabel("自由拖拽（Free Drag）")
        var offset by remember { mutableStateOf(Offset.Zero) }
        val boxSize = 280.dp
        val dotSize = 48.dp

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(boxSize)
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(12.dp))
                .border(1.dp, MaterialTheme.colorScheme.outline, RoundedCornerShape(12.dp))
        ) {
            Box(
                modifier = Modifier
                    .offset { IntOffset(offset.x.roundToInt(), offset.y.roundToInt()) }
                    .size(dotSize)
                    .background(MaterialTheme.colorScheme.primary, CircleShape)
                    .pointerInput(Unit) {
                        detectDragGestures(
                            onDragStart = { /* 拖拽开始 */ },
                            onDragEnd = { /* 拖拽结束 */ },
                            onDragCancel = { /* 拖拽取消 */ },
                            onDrag = { change, dragAmount ->
                                change.consume()
                                offset = Offset(
                                    x = (offset.x + dragAmount.x).coerceIn(0f, (size.width - dotSize.toPx())),
                                    y = (offset.y + dragAmount.y).coerceIn(0f, (size.height - dotSize.toPx()))
                                )
                            }
                        )
                    },
                contentAlignment = Alignment.Center
            ) {
                Text("拖", style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onPrimary)
            }
            Text(
                "x=${offset.x.roundToInt()}  y=${offset.y.roundToInt()}",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.align(Alignment.BottomCenter).padding(bottom = 8.dp)
            )
        }

        HorizontalDivider()

        // ── 2. 拖拽轨迹 ───────────────────────────────────────
        SectionLabel("拖拽轨迹（Trail）")
        val trail = remember { mutableStateListOf<Offset>() }
        var trailDragging by remember { mutableStateOf(false) }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(160.dp)
                    .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(12.dp))
                    .border(1.dp, MaterialTheme.colorScheme.outline, RoundedCornerShape(12.dp))
                    .pointerInput(Unit) {
                        detectDragGestures(
                            onDragStart = { startPos ->
                                trail.clear()
                                trail.add(startPos)
                                trailDragging = true
                            },
                            onDragEnd = { trailDragging = false },
                            onDragCancel = { trailDragging = false },
                            onDrag = { change, _ ->
                                change.consume()
                                trail.add(change.position)
                            }
                        )
                    }
            ) {
                if (trail.isEmpty()) {
                    Text(
                        "在此区域拖拽绘制轨迹",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.align(Alignment.Center)
                    )
                }
                androidx.compose.foundation.Canvas(modifier = Modifier.fillMaxSize()) {
                    if (trail.size > 1) {
                        for (i in 1 until trail.size) {
                            drawLine(
                                color = androidx.compose.ui.graphics.Color(0xFF6750A4),
                                start = trail[i - 1],
                                end = trail[i],
                                strokeWidth = 4f
                            )
                        }
                    }
                    trail.lastOrNull()?.let { last ->
                        drawCircle(
                            color = androidx.compose.ui.graphics.Color(0xFF6750A4),
                            radius = 8f,
                            center = last
                        )
                    }
                }
            }
            TextButton(onClick = { trail.clear() }) { Text("清除轨迹") }
        }

        HorizontalDivider()

        // ── 3. 拖拽累计距离 ───────────────────────────────────
        SectionLabel("累计拖拽距离")
        var totalDist by remember { mutableStateOf(0f) }
        var dragActive by remember { mutableStateOf(false) }

        Row(
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .background(
                        if (dragActive) MaterialTheme.colorScheme.primaryContainer
                        else MaterialTheme.colorScheme.surfaceVariant,
                        RoundedCornerShape(12.dp)
                    )
                    .pointerInput(Unit) {
                        detectDragGestures(
                            onDragStart = { dragActive = true },
                            onDragEnd = { dragActive = false },
                            onDragCancel = { dragActive = false },
                            onDrag = { change, dragAmount ->
                                change.consume()
                                totalDist += dragAmount.getDistance()
                            }
                        )
                    },
                contentAlignment = Alignment.Center
            ) {
                Text("拖我", style = MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text("累计距离", style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant)
                Text("${totalDist.roundToInt()} px",
                    style = MaterialTheme.typography.titleMedium,
                    color = MaterialTheme.colorScheme.primary)
                TextButton(onClick = { totalDist = 0f }) { Text("重置") }
            }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• detectDragGestures 在 pointerInput 内使用\n" +
            "• onDragStart / onDrag / onDragEnd / onDragCancel 均可选\n" +
            "• onDrag 提供 change（PointerInputChange）和 dragAmount（Offset）\n" +
            "• 调用 change.consume() 防止事件向上传递",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
