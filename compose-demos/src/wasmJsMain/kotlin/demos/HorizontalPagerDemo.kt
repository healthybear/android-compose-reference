package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp

private val pagerPages = listOf(
    "第 1 页" to "Jetpack Compose",
    "第 2 页" to "Material Design 3",
    "第 3 页" to "Kotlin Multiplatform",
    "第 4 页" to "Compose for Web",
    "第 5 页" to "Wasm Target",
)

/**
 * HorizontalPagerDemo 演示了 Jetpack Compose 中 HorizontalPager 的核心用法。
 *
 * HorizontalPager 是 Compose 官方提供的水平翻页组件（类似 ViewPager2），
 * 支持手势滑动、编程跳页，常用于引导页、图片轮播、Tab 内容切换等场景。
 *
 * 本示例涵盖：
 * 1. 基础左右翻页：使用 rememberPagerState 管理页面状态，配合自定义页码指示器
 * 2. PagerState 说明：展示 currentPage、animateScrollToPage 等核心 API
 *
 * 学习要点：
 * - rememberPagerState(pageCount = { ... }) 中 pageCount 是 lambda，
 *   支持动态数据源（如网络加载后更新页数）
 * - pagerState.currentPage 是普通 State，在 Composable 中读取会自动触发重组，
 *   因此页码指示器无需额外的 LaunchedEffect 监听
 * - 页码指示器的大小变化（10.dp vs 6.dp）通过条件表达式实现，
 *   生产环境可用 animateDpAsState 添加过渡动画
 * - HorizontalPager 的每个 page lambda 是独立的 Composable 作用域，
 *   可在其中使用任意 Compose 组件
 */
@Composable
fun HorizontalPagerDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("HorizontalPager 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础左右翻页 ───────────────────────────────────
        // rememberPagerState 创建并记住 PagerState，pageCount lambda 在重组时重新求值
        // pagerState 需要传给 HorizontalPager 的 state 参数，同时也用于驱动指示器
        SectionLabel("左右翻页 + 页码指示器")
        val pagerState = rememberPagerState(pageCount = { pagerPages.size })

        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            HorizontalPager(
                state = pagerState,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(160.dp)
            ) { page ->
                val (label, title) = pagerPages[page]
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(horizontal = 8.dp)
                        .background(
                            listOf(
                                MaterialTheme.colorScheme.primaryContainer,
                                MaterialTheme.colorScheme.secondaryContainer,
                                MaterialTheme.colorScheme.tertiaryContainer,
                                MaterialTheme.colorScheme.errorContainer,
                                MaterialTheme.colorScheme.surfaceVariant,
                            )[page],
                            RoundedCornerShape(16.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Text(label, style = MaterialTheme.typography.labelMedium)
                        Text(title, style = MaterialTheme.typography.titleLarge)
                    }
                }
            }

            // 页码指示器
            // 通过比较 i == pagerState.currentPage 来决定圆点大小和颜色
            // pagerState.currentPage 是 State<Int>，读取时自动订阅，页面切换时指示器自动更新
            // 注意：currentPage 在翻页动画完成后才更新，若需要跟随手势实时变化，
            // 应使用 pagerState.currentPageOffsetFraction 计算插值
            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                repeat(pagerPages.size) { i ->
                    Box(
                        modifier = Modifier
                            .size(if (i == pagerState.currentPage) 10.dp else 6.dp)
                            .clip(CircleShape)
                            .background(
                                if (i == pagerState.currentPage)
                                    MaterialTheme.colorScheme.primary
                                else
                                    MaterialTheme.colorScheme.outlineVariant
                            )
                    )
                }
            }

            Text(
                "当前页：${pagerState.currentPage + 1} / ${pagerPages.size}",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }

        HorizontalDivider()

        // ── 2. pageOffset 说明 ────────────────────────────────
        // 此区块用文字总结 HorizontalPager 的核心 API，帮助开发者快速了解扩展能力：
        // - animateScrollToPage() 需在协程作用域中调用（如 LaunchedEffect 或 Button 的 onClick）
        // - beyondBoundsPageCount 可预加载相邻页，提升翻页流畅度（但会增加内存占用）
        SectionLabel("说明")
        Text(
            "• HorizontalPager 支持手势左右滑动翻页\n" +
            "• rememberPagerState 持有当前页索引\n" +
            "• 可通过 pagerState.animateScrollToPage() 编程跳页\n" +
            "• 页码指示器通过 pagerState.currentPage 驱动",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
