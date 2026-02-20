package demos

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp

/**
 * AnimateAsStateDemo 演示 animateXxxAsState 系列状态驱动动画。
 *
 * animateXxxAsState 是 Compose 中最简单的动画方式：
 * 将普通状态值包装为带动画的状态，当 targetValue 改变时自动插值过渡。
 *
 * 常用 API：
 * - [animateDpAsState]：Dp 尺寸平滑过渡
 * - [animateColorAsState]：Color 颜色平滑过渡（在 ARGB 空间插值）
 * - [animateFloatAsState]：Float 浮点值平滑过渡（透明度、旋转角度等）
 * - 还有 animateIntAsState、animateSizeAsState、animateOffsetAsState 等
 *
 * animationSpec 参数决定插值方式：
 * - [spring]：弹簧物理模拟，有自然弹性感，DampingRatioMediumBouncy 为中等弹性
 * - [tween]：固定时长缓动曲线，适合需要精确控制时长的场景
 *
 * animateContentSize：Modifier 扩展，自动检测内容尺寸变化并做动画，
 * 无需手动指定目标尺寸，适合动态内容场景。
 */
@Composable
fun AnimateAsStateDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("animateXxxAsState 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. animateDpAsState — 尺寸 ────────────────────────
        SectionLabel("animateDpAsState — 尺寸平滑过渡")
        var enlarged by remember { mutableStateOf(false) }
        val size by animateDpAsState(
            targetValue = if (enlarged) 100.dp else 48.dp,
            animationSpec = spring(dampingRatio = Spring.DampingRatioMediumBouncy),
            label = "size"
        )
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Box(
                modifier = Modifier.size(size)
                    .background(MaterialTheme.colorScheme.primary, CircleShape)
            )
            Button(onClick = { enlarged = !enlarged }) {
                Text(if (enlarged) "缩小" else "放大")
            }
        }

        HorizontalDivider()

        // ── 2. animateColorAsState — 颜色 ─────────────────────
        SectionLabel("animateColorAsState — 颜色平滑过渡")
        var active by remember { mutableStateOf(false) }
        val color by animateColorAsState(
            targetValue = if (active) MaterialTheme.colorScheme.primary
                          else MaterialTheme.colorScheme.surfaceVariant,
            animationSpec = tween(500),
            label = "color"
        )
        val textColor by animateColorAsState(
            targetValue = if (active) MaterialTheme.colorScheme.onPrimary
                          else MaterialTheme.colorScheme.onSurfaceVariant,
            label = "text_color"
        )
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Box(
                modifier = Modifier.size(80.dp).clip(RoundedCornerShape(12.dp)).background(color),
                contentAlignment = Alignment.Center
            ) {
                Text(if (active) "激活" else "未激活", style = MaterialTheme.typography.labelMedium, color = textColor)
            }
            Button(onClick = { active = !active }) { Text("切换") }
        }

        HorizontalDivider()

        // ── 3. animateFloatAsState — 透明度 ───────────────────
        SectionLabel("animateFloatAsState — 透明度")
        var faded by remember { mutableStateOf(false) }
        val alpha by animateFloatAsState(
            targetValue = if (faded) 0.1f else 1f,
            animationSpec = tween(600),
            label = "alpha"
        )
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Box(
                modifier = Modifier.size(80.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(MaterialTheme.colorScheme.secondaryContainer.copy(alpha = alpha)),
                contentAlignment = Alignment.Center
            ) {
                Text("透明度 ${(alpha * 100).toInt()}%", style = MaterialTheme.typography.labelSmall)
            }
            Button(onClick = { faded = !faded }) { Text(if (faded) "恢复" else "淡出") }
        }

        HorizontalDivider()

        // ── 4. animateContentSize ─────────────────────────────
        SectionLabel("animateContentSize — 内容尺寸动画")
        var expanded by remember { mutableStateOf(false) }
        Card(
            modifier = Modifier.fillMaxWidth().animateContentSize(
                animationSpec = spring(stiffness = Spring.StiffnessMedium)
            )
        ) {
            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("可展开卡片", style = MaterialTheme.typography.titleSmall)
                if (expanded) {
                    Text(
                        "这是展开后的详细内容。animateContentSize 会自动对高度变化做动画，无需手动指定目标高度。",
                        style = MaterialTheme.typography.bodySmall
                    )
                }
                TextButton(onClick = { expanded = !expanded }) {
                    Text(if (expanded) "收起 ▲" else "展开 ▼")
                }
            }
        }
    }
}
