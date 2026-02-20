package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * LazyHorizontalGridDemo 演示了 Jetpack Compose 中 LazyHorizontalGrid 的三种行布局策略。
 *
 * LazyHorizontalGrid 是 LazyVerticalGrid 的水平版本：内容沿水平方向滚动，
 * 行数固定，列数随内容增长。适合横向滚动的多行网格场景，
 * 例如：表情包选择器、横向图标宫格、多行标签栏等。
 *
 * 本示例涵盖：
 * 1. GridCells.Fixed(2)：固定 2 行，条目从左到右、从上到下填充
 * 2. GridCells.Adaptive：根据容器高度和最小行高自动计算行数
 * 3. 卡片样式：3 行固定布局，每列使用循环色彩区分
 *
 * 学习要点：
 * - LazyHorizontalGrid 的 rows 参数对应 LazyVerticalGrid 的 columns 参数，
 *   两者 API 完全对称，学会一个即可触类旁通
 * - height() 是必须设置的约束，否则网格无法确定行高
 * - fillMaxHeight() 让每个条目撑满行高，配合固定 width 实现矩形卡片效果
 * - colors[i % 3] 是循环取色的常用技巧，避免硬编码每个条目的颜色
 */
@Composable
fun LazyHorizontalGridDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("LazyHorizontalGrid 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. GridCells.Fixed(2) ─────────────────────────────
        // rows = Fixed(2) 固定 2 行，条目按列优先顺序排列（先填满第 1 列再填第 2 列）
        // height(120.dp) 决定网格总高度，每行高度 = (120.dp - 间距) / 2
        // size(52.dp) 让每个格子保持正方形，多余空间由 horizontalArrangement 的间距填充
        SectionLabel("GridCells.Fixed(2) — 固定 2 行，横向滚动")
        LazyHorizontalGrid(
            rows = GridCells.Fixed(2),
            verticalArrangement = Arrangement.spacedBy(8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            contentPadding = PaddingValues(horizontal = 4.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(120.dp)
        ) {
            items(16) { i ->
                Box(
                    modifier = Modifier
                        .size(52.dp)
                        .background(
                            MaterialTheme.colorScheme.primaryContainer,
                            RoundedCornerShape(8.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        "${i + 1}",
                        style = MaterialTheme.typography.titleSmall,
                        color = MaterialTheme.colorScheme.onPrimaryContainer
                    )
                }
            }
        }

        HorizontalDivider()

        // ── 2. GridCells.Adaptive ─────────────────────────────
        // Adaptive(minSize = 48.dp) 根据容器高度自动计算行数：
        // 行数 = floor(容器高 / 48.dp)，实际行高均分剩余空间
        // 当容器高度为 160.dp 时，约可放 3 行（160 / 48 ≈ 3.3，取整为 3）
        SectionLabel("GridCells.Adaptive(48.dp) — 自适应行数")
        Text(
            "每行最小 48 dp，容器高度决定实际行数",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        LazyHorizontalGrid(
            rows = GridCells.Adaptive(minSize = 48.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            contentPadding = PaddingValues(horizontal = 4.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(160.dp)
        ) {
            items(20) { i ->
                Box(
                    modifier = Modifier
                        .size(48.dp)
                        .background(
                            MaterialTheme.colorScheme.secondaryContainer,
                            RoundedCornerShape(8.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        "${i + 1}",
                        style = MaterialTheme.typography.titleSmall,
                        color = MaterialTheme.colorScheme.onSecondaryContainer
                    )
                }
            }
        }

        HorizontalDivider()

        // ── 3. 卡片样式 ───────────────────────────────────────
        // 使用 colors[i % 3] 循环取色，让同一列的 3 张卡片颜色各不相同
        // width(100.dp) + fillMaxHeight() 组合：宽度固定，高度撑满行高，形成矩形卡片
        // 这与 LazyVerticalGrid 中常用的 aspectRatio(1f) 形成对比：
        // 水平网格更适合用固定宽度 + 自适应高度，而非强制正方形
        SectionLabel("卡片样式（3 行）")
        val colors = listOf(
            MaterialTheme.colorScheme.primaryContainer,
            MaterialTheme.colorScheme.secondaryContainer,
            MaterialTheme.colorScheme.tertiaryContainer,
        )
        LazyHorizontalGrid(
            rows = GridCells.Fixed(3),
            verticalArrangement = Arrangement.spacedBy(8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            contentPadding = PaddingValues(horizontal = 4.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(180.dp)
        ) {
            items(15) { i ->
                Box(
                    modifier = Modifier
                        .width(100.dp)
                        .fillMaxHeight()
                        .background(colors[i % 3], RoundedCornerShape(10.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        "Card ${i + 1}",
                        style = MaterialTheme.typography.labelLarge
                    )
                }
            }
        }
    }
}
