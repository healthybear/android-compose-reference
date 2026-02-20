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

/**
 * ImageDemo 演示 Compose 中 [Image] 组件的核心用法。
 *
 * 涵盖以下知识点：
 * 1. 自定义 [Painter]：无需图片资源，通过重写 onDraw 用 Canvas API 绘制内容，
 *    适合在 Demo 或测试场景中快速生成占位图。
 * 2. [ContentScale]：控制图片在容器内的缩放/裁剪策略，共 7 种模式对比展示。
 * 3. [Modifier.clip]：配合 Shape 对图片进行形状裁剪（圆形、圆角矩形等）。
 * 4. [ColorFilter.tint]：对图片叠加颜色滤镜，常用于图标着色或主题化处理。
 */
@Composable
fun ImageDemo() {
    // 用自定义 Painter 画一张渐变色块作为演示图片（无需图片资源文件）
    // Wasm 环境无法加载网络图片，因此继承 Painter 并在 onDraw 中手动绘制
    val demoPainter = remember {
        object : Painter() {
        // intrinsicSize 告知 Compose 图片的"原始"宽高比，用于 ContentScale 计算
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
        // ContentScale 决定图片如何适配容器尺寸：
        //   Crop       — 等比缩放并裁剪，填满容器（类似 CSS background-size: cover）
        //   Fit        — 等比缩放，完整显示，可能留白（类似 CSS object-fit: contain）
        //   FillBounds — 拉伸填满，不保持比例
        //   FillWidth  — 宽度填满，高度等比
        //   FillHeight — 高度填满，宽度等比
        //   Inside     — 若图片比容器小则不放大，否则等比缩小
        //   None       — 不做任何缩放，按原始像素显示
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
        // Modifier.clip(shape) 将内容裁剪为指定形状
        // 注意：clip 必须在 background/border 之前应用才能正确裁剪
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
        // ColorFilter.tint(color) 用指定颜色对图片进行混合着色
        // BlendMode 默认为 SrcIn，即用颜色填充图片的不透明区域
        // 常用于：图标换色、主题化处理、状态反馈（如禁用时变灰）
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
