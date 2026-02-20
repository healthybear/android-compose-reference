package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.pager.VerticalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp

/**
 * VerticalPagerDemo 演示了 Jetpack Compose 中 VerticalPager 的核心用法。
 *
 * VerticalPager 是 HorizontalPager 的垂直版本，支持上下手势翻页，
 * 常见于短视频 Feed（如抖音/TikTok 风格）、竖向引导页、全屏卡片流等场景。
 *
 * 本示例涵盖：
 * 1. 上下翻页：使用 VerticalPager 配合侧边竖向指示器
 * 2. 与 HorizontalPager 的对比说明
 *
 * 学习要点：
 * - VerticalPager 与 HorizontalPager 共用同一个 rememberPagerState，
 *   API 完全对称，只需将 HorizontalPager 替换为 VerticalPager 即可切换方向
 * - 侧边指示器使用竖向 Column + 高度变化（24.dp vs 8.dp）来区分当前页，
 *   比圆点指示器更适合竖向布局的视觉语言
 * - weight(1f) 让 VerticalPager 占据 Row 中除指示器外的所有水平空间，
 *   是 Compose 中"填充剩余空间"的标准做法
 * - height(200.dp) 是必须设置的约束，VerticalPager 需要明确的高度才能正确布局
 */
@Composable
fun VerticalPagerDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("VerticalPager 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 上下翻页 ───────────────────────────────────────
        // VerticalPager 放在 Row 内，右侧配合侧边指示器
        // padding(vertical = 6.dp) 让相邻页面之间有视觉间隙，
        // 用户可以隐约看到上下页的边缘，暗示"可以继续滑动"
        SectionLabel("上下翻页 + 侧边指示器")
        val pages = listOf(
            "第 1 页" to "Compose UI",
            "第 2 页" to "State 管理",
            "第 3 页" to "动画系统",
            "第 4 页" to "手势处理",
        )
        val pagerState = rememberPagerState(pageCount = { pages.size })

        Row(
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            VerticalPager(
                state = pagerState,
                modifier = Modifier
                    .weight(1f)
                    .height(200.dp)
            ) { page ->
                val (label, title) = pages[page]
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(vertical = 6.dp)
                        .background(
                            listOf(
                                MaterialTheme.colorScheme.primaryContainer,
                                MaterialTheme.colorScheme.secondaryContainer,
                                MaterialTheme.colorScheme.tertiaryContainer,
                                MaterialTheme.colorScheme.errorContainer,
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

            // 侧边指示器
            // 使用高度变化（24.dp vs 8.dp）代替大小变化来标识当前页，
            // 竖条形状比圆点更符合竖向翻页的视觉隐喻
            // 生产环境可用 animateDpAsState 为高度变化添加弹性动画
            Column(
                verticalArrangement = Arrangement.spacedBy(6.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                repeat(pages.size) { i ->
                    Box(
                        modifier = Modifier
                            .width(4.dp)
                            .height(if (i == pagerState.currentPage) 24.dp else 8.dp)
                            .clip(RoundedCornerShape(2.dp))
                            .background(
                                if (i == pagerState.currentPage)
                                    MaterialTheme.colorScheme.primary
                                else
                                    MaterialTheme.colorScheme.outlineVariant
                            )
                    )
                }
            }
        }

        Text(
            "当前页：${pagerState.currentPage + 1} / ${pages.size}",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        HorizontalDivider()

        // ── 2. 说明 ───────────────────────────────────────────
        // 此区块总结 VerticalPager 与 HorizontalPager 的共同点和差异，
        // 帮助开发者理解两者可以互换使用，只需修改组件名称
        SectionLabel("说明")
        Text(
            "• VerticalPager 支持手势上下滑动翻页\n" +
            "• 与 HorizontalPager 共用 rememberPagerState\n" +
            "• 侧边指示器通过 pagerState.currentPage 驱动高度变化",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
