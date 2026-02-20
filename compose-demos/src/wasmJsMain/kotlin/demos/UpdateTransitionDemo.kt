package demos

import androidx.compose.animation.animateColor
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp

private enum class BoxState { Small, Large }

/**
 * UpdateTransitionDemo 演示 updateTransition 的多属性联动动画。
 *
 * updateTransition 是 Compose 中实现"状态驱动多属性同步动画"的核心 API。
 * 当状态（targetState）变化时，所有通过 transition.animateXxx 声明的属性
 * 会同步开始动画，保证多个属性的动画在时间上协调一致。
 *
 * 核心 API：
 * - [updateTransition]：创建 Transition 对象，绑定到目标状态
 * - `transition.animateColor { state -> ... }`：为颜色属性声明动画
 * - `transition.animateDp { state -> ... }`：为 Dp 属性声明动画
 * - `transition.animateFloat { state -> ... }`：为 Float 属性声明动画
 * - 每个 animateXxx 的 lambda 接收当前状态，返回该状态下的目标值
 *
 * 与 animateXxxAsState 的区别：
 * - animateXxxAsState：单个属性的独立动画，各自独立触发
 * - updateTransition：多个属性共享同一个状态机，动画同步触发，适合复杂状态切换
 */
@Composable
fun UpdateTransitionDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("updateTransition 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("说明")
        Text(
            "updateTransition 可以让多个属性联动过渡，保持动画同步。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        HorizontalDivider()

        // ── 1. 颜色 + 尺寸联动 ───────────────────────────────
        SectionLabel("颜色 + 尺寸联动过渡")
        var boxState by remember { mutableStateOf(BoxState.Small) }
        val transition = updateTransition(targetState = boxState, label = "box_transition")

        val size by transition.animateDp(
            transitionSpec = { spring(dampingRatio = Spring.DampingRatioMediumBouncy) },
            label = "size"
        ) { state -> if (state == BoxState.Large) 120.dp else 56.dp }

        val color by transition.animateColor(
            transitionSpec = { tween(400) },
            label = "color"
        ) { state ->
            if (state == BoxState.Large) MaterialTheme.colorScheme.primary
            else MaterialTheme.colorScheme.surfaceVariant
        }

        val cornerRadius by transition.animateDp(
            transitionSpec = { tween(400) },
            label = "corner"
        ) { state -> if (state == BoxState.Large) 24.dp else 8.dp }

        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(24.dp)) {
            Box(
                modifier = Modifier.size(size)
                    .clip(RoundedCornerShape(cornerRadius))
                    .background(color)
            )
            Button(onClick = {
                boxState = if (boxState == BoxState.Small) BoxState.Large else BoxState.Small
            }) {
                Text(if (boxState == BoxState.Small) "放大" else "缩小")
            }
        }

        HorizontalDivider()

        // ── 2. 多状态枚举 ─────────────────────────────────────
        SectionLabel("多状态枚举过渡")
        val states = listOf("待机", "加载", "成功", "失败")
        var currentState by remember { mutableStateOf("待机") }
        val multiTransition = updateTransition(targetState = currentState, label = "multi")

        val bgColor by multiTransition.animateColor(
            transitionSpec = { tween(300) },
            label = "bg"
        ) { s ->
            when (s) {
                "待机" -> MaterialTheme.colorScheme.surfaceVariant
                "加载" -> MaterialTheme.colorScheme.secondaryContainer
                "成功" -> MaterialTheme.colorScheme.primaryContainer
                else   -> MaterialTheme.colorScheme.errorContainer
            }
        }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Box(
                modifier = Modifier.fillMaxWidth().height(56.dp)
                    .clip(RoundedCornerShape(12.dp)).background(bgColor),
                contentAlignment = Alignment.Center
            ) {
                Text(currentState, style = MaterialTheme.typography.titleMedium)
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                states.forEach { s ->
                    FilterChip(
                        selected = s == currentState,
                        onClick = { currentState = s },
                        label = { Text(s) }
                    )
                }
            }
        }
    }
}
