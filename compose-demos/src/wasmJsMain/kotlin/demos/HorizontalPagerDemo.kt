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

@Composable
fun HorizontalPagerDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("HorizontalPager 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础左右翻页 ───────────────────────────────────
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
