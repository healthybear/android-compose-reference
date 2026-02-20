package demos

import androidx.compose.animation.animateColor
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
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.draw.scale
import androidx.compose.ui.unit.dp

@Composable
fun InfiniteTransitionDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("InfiniteTransition 示例", style = MaterialTheme.typography.titleMedium)

        val infiniteTransition = rememberInfiniteTransition(label = "infinite")

        // ── 1. 脉冲缩放 ───────────────────────────────────────
        SectionLabel("脉冲缩放（pulse）")
        val scale by infiniteTransition.animateFloat(
            initialValue = 0.85f,
            targetValue = 1.15f,
            animationSpec = infiniteRepeatable(
                animation = tween(800, easing = FastOutSlowInEasing),
                repeatMode = RepeatMode.Reverse
            ),
            label = "scale"
        )
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Box(
                modifier = Modifier.size(48.dp).scale(scale)
                    .background(MaterialTheme.colorScheme.primary, CircleShape)
            )
            Text("scale: ${"%.2f".format(scale)}", style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        HorizontalDivider()

        // ── 2. 无限旋转 ───────────────────────────────────────
        SectionLabel("无限旋转（rotation）")
        val rotation by infiniteTransition.animateFloat(
            initialValue = 0f,
            targetValue = 360f,
            animationSpec = infiniteRepeatable(
                animation = tween(2000, easing = LinearEasing)
            ),
            label = "rotation"
        )
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Box(
                modifier = Modifier.size(48.dp).rotate(rotation)
                    .background(MaterialTheme.colorScheme.secondary, RoundedCornerShape(8.dp))
            )
            Text("${rotation.toInt()}°", style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        HorizontalDivider()

        // ── 3. 颜色循环 ───────────────────────────────────────
        SectionLabel("颜色循环")
        val animColor by infiniteTransition.animateColor(
            initialValue = MaterialTheme.colorScheme.primary,
            targetValue = MaterialTheme.colorScheme.tertiary,
            animationSpec = infiniteRepeatable(
                animation = tween(1500, easing = LinearEasing),
                repeatMode = RepeatMode.Reverse
            ),
            label = "color"
        )
        Box(
            modifier = Modifier.fillMaxWidth().height(48.dp)
                .clip(RoundedCornerShape(12.dp)).background(animColor),
            contentAlignment = Alignment.Center
        ) {
            Text("颜色循环动画", style = MaterialTheme.typography.labelLarge,
                color = MaterialTheme.colorScheme.onPrimary)
        }

        HorizontalDivider()

        // ── 4. 加载骨架屏 ─────────────────────────────────────
        SectionLabel("骨架屏（shimmer）")
        val shimmerAlpha by infiniteTransition.animateFloat(
            initialValue = 0.3f,
            targetValue = 1f,
            animationSpec = infiniteRepeatable(
                animation = tween(1000, easing = FastOutSlowInEasing),
                repeatMode = RepeatMode.Reverse
            ),
            label = "shimmer"
        )
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            repeat(3) {
                Box(
                    modifier = Modifier.fillMaxWidth().height(16.dp)
                        .clip(RoundedCornerShape(4.dp))
                        .background(MaterialTheme.colorScheme.surfaceVariant.copy(alpha = shimmerAlpha))
                )
            }
            Box(
                modifier = Modifier.fillMaxWidth(0.6f).height(16.dp)
                    .clip(RoundedCornerShape(4.dp))
                    .background(MaterialTheme.colorScheme.surfaceVariant.copy(alpha = shimmerAlpha))
            )
        }
    }
}
