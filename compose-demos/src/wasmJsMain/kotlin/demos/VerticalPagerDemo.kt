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

@Composable
fun VerticalPagerDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("VerticalPager 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 上下翻页 ───────────────────────────────────────
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
