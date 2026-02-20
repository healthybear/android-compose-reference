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
 * LazyVerticalGridDemo 演示了 Jetpack Compose 中 LazyVerticalGrid 的三种列布局策略。
 *
 * LazyVerticalGrid 是垂直方向的懒加载网格，只渲染可见区域内的条目，
 * 适合图片墙、商品列表、图标宫格等二维网格场景。
 *
 * 本示例涵盖：
 * 1. GridCells.Fixed：固定列数，每列等宽，适合列数明确的设计稿
 * 2. GridCells.Adaptive：自适应列数，根据容器宽度和最小列宽自动计算列数，
 *    适合响应式布局（手机/平板/桌面自动适配）
 * 3. span 跨列：让某个条目横跨多列，常用于 Banner、分组标题等场景
 *
 * 学习要点：
 * - aspectRatio(1f) 让每个格子保持正方形，无需硬编码高度
 * - GridCells.Adaptive 是响应式设计的首选，比 Fixed 更灵活
 * - span lambda 接收 GridItemSpanScope，可通过 maxLineSpan 动态获取总列数，
 *   实现"跨满整行"而不依赖硬编码的列数值
 */
@Composable
fun LazyVerticalGridDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("LazyVerticalGrid 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. GridCells.Fixed ────────────────────────────────
        // Fixed(3) 强制分为 3 列，每列宽度 = (容器宽 - 间距) / 3
        // 适合设计稿明确规定列数的场景，但在宽屏设备上格子会变得很宽
        SectionLabel("GridCells.Fixed(3) — 固定列数")
        LazyVerticalGrid(
            columns = GridCells.Fixed(3),
            verticalArrangement = Arrangement.spacedBy(8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(200.dp)
        ) {
            items(12) { i ->
                Box(
                    modifier = Modifier
                        .aspectRatio(1f)
                        .background(
                            MaterialTheme.colorScheme.primaryContainer,
                            RoundedCornerShape(8.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        "${i + 1}",
                        style = MaterialTheme.typography.titleMedium,
                        color = MaterialTheme.colorScheme.onPrimaryContainer
                    )
                }
            }
        }

        HorizontalDivider()

        // ── 2. GridCells.Adaptive ─────────────────────────────
        // Adaptive(minSize = 80.dp) 让 Compose 自动计算列数：
        // 列数 = floor(容器宽 / 80.dp)，实际列宽会均分剩余空间
        // 这是响应式布局的推荐方式，同一套代码在手机和平板上都能良好展示
        SectionLabel("GridCells.Adaptive(80.dp) — 自适应列数")
        Text(
            "每列最小 80 dp，容器宽度决定实际列数",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        LazyVerticalGrid(
            columns = GridCells.Adaptive(minSize = 80.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(200.dp)
        ) {
            items(16) { i ->
                Box(
                    modifier = Modifier
                        .aspectRatio(1f)
                        .background(
                            MaterialTheme.colorScheme.secondaryContainer,
                            RoundedCornerShape(8.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        "${i + 1}",
                        style = MaterialTheme.typography.titleMedium,
                        color = MaterialTheme.colorScheme.onSecondaryContainer
                    )
                }
            }
        }

        HorizontalDivider()

        // ── 3. span 跨列 ──────────────────────────────────────
        // span 参数接收一个 lambda，返回 GridItemSpan 来指定该条目占几列
        // 使用 maxLineSpan 可动态获取总列数，避免硬编码（如改为 Fixed(4) 时无需修改 span）
        // 常见用途：全宽 Banner、分组标题、广告位等需要突破单格限制的场景
        SectionLabel("span — 跨列占位")
        LazyVerticalGrid(
            columns = GridCells.Fixed(3),
            verticalArrangement = Arrangement.spacedBy(8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(180.dp)
        ) {
            // 第一项跨 3 列
            item(span = { GridItemSpan(3) }) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp)
                        .background(
                            MaterialTheme.colorScheme.tertiaryContainer,
                            RoundedCornerShape(8.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        "span = 3（跨满整行）",
                        style = MaterialTheme.typography.labelLarge,
                        color = MaterialTheme.colorScheme.onTertiaryContainer
                    )
                }
            }
            items(6) { i ->
                Box(
                    modifier = Modifier
                        .aspectRatio(1f)
                        .background(
                            MaterialTheme.colorScheme.primaryContainer,
                            RoundedCornerShape(8.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        "${i + 1}",
                        style = MaterialTheme.typography.titleMedium,
                        color = MaterialTheme.colorScheme.onPrimaryContainer
                    )
                }
            }
        }
    }
}
