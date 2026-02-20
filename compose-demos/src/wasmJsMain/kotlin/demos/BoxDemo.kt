package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun BoxDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Box 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. contentAlignment 九宫格 ────────────────────────
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
