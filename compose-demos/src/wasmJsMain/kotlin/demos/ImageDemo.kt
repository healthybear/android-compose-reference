package demos

import androidx.compose.foundation.Image
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp

@Composable
fun ImageDemo() {
    // 用自定义 Painter 画一张渐变色块作为演示图片（无需图片资源文件）
    val demoPainter = remember {
        object : Painter() {
            override val intrinsicSize = Size(300f, 200f)
            override fun DrawScope.onDraw() {
                drawRect(
                    brush = Brush.linearGradient(
                        listOf(Color(0xFF6650A4), Color(0xFF03DAC5))
                    )
                )
            }
        }
    }

    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Image 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. ContentScale 各模式对比 ────────────────────────
        SectionLabel("ContentScale 对比")
        Text(
            "容器固定 120×80 dp，图片原始比例 3:2",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(4.dp))

        val scales = listOf(
            ContentScale.Crop        to "Crop",
            ContentScale.Fit         to "Fit",
            ContentScale.FillBounds  to "FillBounds",
            ContentScale.FillWidth   to "FillWidth",
            ContentScale.FillHeight  to "FillHeight",
            ContentScale.Inside      to "Inside",
            ContentScale.None        to "None",
        )

        // 每行两个
        scales.chunked(2).forEach { row ->
            Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                row.forEach { (scale, label) ->
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Image(
                            painter = demoPainter,
                            contentDescription = label,
                            contentScale = scale,
                            modifier = Modifier
                                .size(width = 120.dp, height = 80.dp)
                                .border(
                                    1.dp,
                                    MaterialTheme.colorScheme.outlineVariant,
                                    RoundedCornerShape(4.dp)
                                )
                                .clip(RoundedCornerShape(4.dp))
                        )
                        Text(label, style = MaterialTheme.typography.labelSmall)
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 2. clip 圆形 ──────────────────────────────────────
        SectionLabel("clip — 圆形裁剪")
        Row(
            horizontalArrangement = Arrangement.spacedBy(24.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Image(
                    painter = demoPainter,
                    contentDescription = "原始",
                    contentScale = ContentScale.Crop,
                    modifier = Modifier.size(80.dp)
                )
                Text("无 clip", style = MaterialTheme.typography.labelSmall)
            }
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Image(
                    painter = demoPainter,
                    contentDescription = "圆形",
                    contentScale = ContentScale.Crop,
                    modifier = Modifier
                        .size(80.dp)
                        .clip(CircleShape)
                )
                Text("CircleShape", style = MaterialTheme.typography.labelSmall)
            }
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Image(
                    painter = demoPainter,
                    contentDescription = "圆角",
                    contentScale = ContentScale.Crop,
                    modifier = Modifier
                        .size(80.dp)
                        .clip(RoundedCornerShape(16.dp))
                )
                Text("RoundedCorner(16)", style = MaterialTheme.typography.labelSmall)
            }
        }

        HorizontalDivider()

        // ── 3. tint ───────────────────────────────────────────
        SectionLabel("colorFilter — tint 着色")
        Row(
            horizontalArrangement = Arrangement.spacedBy(24.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            val tintColors = listOf(
                null                                    to "无 tint",
                MaterialTheme.colorScheme.primary       to "primary",
                MaterialTheme.colorScheme.error         to "error",
                Color(0xFF2196F3)                       to "#2196F3",
            )
            tintColors.forEach { (color, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Image(
                        painter = demoPainter,
                        contentDescription = label,
                        contentScale = ContentScale.Crop,
                        colorFilter = color?.let { ColorFilter.tint(it) },
                        modifier = Modifier
                            .size(64.dp)
                            .clip(RoundedCornerShape(8.dp))
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }
    }
}
