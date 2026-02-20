package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * BoxDemo 演示了 Compose 中 Box 布局的核心用法。
 *
 * Box 是层叠布局容器，子项默认从左上角开始叠放，后声明的子项绘制在上层。
 * 这与 Android View 体系中的 FrameLayout 类似，但功能更强大。
 *
 * 本示例涵盖三个关键知识点：
 *  1. contentAlignment —— 统一设置所有子项的默认对齐位置（九宫格定位）
 *  2. 多层叠加          —— 利用声明顺序控制 Z 轴层叠，实现徽章、浮层等效果
 *  3. matchParentSize  —— 让背景层跟随内容层尺寸，避免背景撑大父容器
 *
 * 学习建议：理解 Box 与 Column/Row 的本质区别——Box 是 Z 轴叠加，后者是线性排列。
 */
@Composable
fun BoxDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Box 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. contentAlignment 九宫格 ────────────────────────
        // contentAlignment 为 Box 内所有子项设置默认对齐点，共 9 个位置。
        // 子项也可以通过 Modifier.align() 单独覆盖父级的 contentAlignment。
        // 这里用 3×3 网格直观展示每种对齐方式的视觉效果。
        SectionLabel("contentAlignment — 九宫格")
        Text(
            "外层 Box 固定 200×200 dp，内层小方块按 alignment 定位",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(4.dp))

        val alignments = listOf(
            Alignment.TopStart     to "TopStart",
            Alignment.TopCenter    to "TopCenter",
            Alignment.TopEnd       to "TopEnd",
            Alignment.CenterStart  to "CenterStart",
            Alignment.Center       to "Center",
            Alignment.CenterEnd    to "CenterEnd",
            Alignment.BottomStart  to "BottomStart",
            Alignment.BottomCenter to "BottomCenter",
            Alignment.BottomEnd    to "BottomEnd",
        )

        // 3×3 网格展示
        alignments.chunked(3).forEach { row ->
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                row.forEach { (align, label) ->
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Box(
                            contentAlignment = align,
                            modifier = Modifier
                                .size(80.dp)
                                .background(
                                    MaterialTheme.colorScheme.surfaceVariant,
                                    RoundedCornerShape(4.dp)
                                )
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(24.dp)
                                    .background(
                                        MaterialTheme.colorScheme.primary,
                                        RoundedCornerShape(4.dp)
                                    )
                            )
                        }
                        Text(label, style = MaterialTheme.typography.labelSmall)
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 2. 多层叠加 ───────────────────────────────────────
        // Box 中的子项按声明顺序叠放：先声明的在底层，后声明的在顶层。
        // 这里用三个同心圆演示层叠效果，类似实现头像+在线状态徽章的常见场景。
        // Modifier.align() 让每个子项独立定位，不受其他子项影响。
        SectionLabel("多层叠加（层叠顺序）")
        Box(
            modifier = Modifier
                .size(200.dp)
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
        ) {
            // 底层：大圆
            Box(
                modifier = Modifier
                    .size(160.dp)
                    .align(Alignment.Center)
                    .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(80.dp))
            )
            // 中层：中圆
            Box(
                modifier = Modifier
                    .size(100.dp)
                    .align(Alignment.Center)
                    .background(MaterialTheme.colorScheme.secondaryContainer, RoundedCornerShape(50.dp))
            )
            // 顶层：小圆
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .align(Alignment.Center)
                    .background(MaterialTheme.colorScheme.primary, RoundedCornerShape(24.dp))
            )
            // 角标
            Text(
                "叠加",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurface,
                modifier = Modifier
                    .align(Alignment.BottomEnd)
                    .padding(8.dp)
            )
        }

        HorizontalDivider()

        // ── 3. matchParentSize ────────────────────────────────
        // matchParentSize 是 Box 作用域内专属的 Modifier，让子项尺寸匹配父 Box。
        // 与 fillMaxSize 的关键区别：matchParentSize 不参与父 Box 的尺寸测量，
        // 因此背景层不会意外撑大容器，而 fillMaxSize 会影响父容器的测量结果。
        SectionLabel("matchParentSize — 子项撑满父 Box")
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(80.dp)
        ) {
            // 背景层用 matchParentSize，不影响 Box 自身尺寸测量
            Box(
                modifier = Modifier
                    .matchParentSize()
                    .background(
                        MaterialTheme.colorScheme.primaryContainer,
                        RoundedCornerShape(8.dp)
                    )
            )
            Text(
                "内容决定 Box 高度，背景用 matchParentSize 撑满",
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier
                    .align(Alignment.Center)
                    .padding(16.dp)
            )
        }
    }
}
