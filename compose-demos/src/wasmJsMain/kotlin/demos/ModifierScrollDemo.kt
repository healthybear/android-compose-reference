package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ModifierScrollDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Modifier.scroll 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. verticalScroll ─────────────────────────────────
        SectionLabel("verticalScroll — 垂直滚动")
        val vScrollState = rememberScrollState()
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .height(160.dp)
                .verticalScroll(vScrollState)
        ) {
            repeat(12) { i ->
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(40.dp)
                        .padding(vertical = 2.dp)
                        .background(
                            if (i % 2 == 0) MaterialTheme.colorScheme.primaryContainer
                            else MaterialTheme.colorScheme.surfaceVariant,
                            RoundedCornerShape(6.dp)
                        ),
                    contentAlignment = Alignment.CenterStart
                ) {
                    Text(
                        "  行 ${i + 1}",
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
            }
        }
        Text(
            "滚动位置：${vScrollState.value} px / ${vScrollState.maxValue} px",
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        HorizontalDivider()

        // ── 2. horizontalScroll ───────────────────────────────
        SectionLabel("horizontalScroll — 水平滚动")
        val hScrollState = rememberScrollState()
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(hScrollState),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            repeat(16) { i ->
                Box(
                    modifier = Modifier
                        .size(width = 80.dp, height = 60.dp)
                        .background(
                            listOf(
                                MaterialTheme.colorScheme.primaryContainer,
                                MaterialTheme.colorScheme.secondaryContainer,
                                MaterialTheme.colorScheme.tertiaryContainer,
                            )[i % 3],
                            RoundedCornerShape(8.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text("卡片 ${i + 1}", style = MaterialTheme.typography.labelMedium)
                }
            }
        }
        Text(
            "滚动位置：${hScrollState.value} px / ${hScrollState.maxValue} px",
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        HorizontalDivider()

        // ── 3. ScrollState 说明 ───────────────────────────────
        SectionLabel("ScrollState 说明")
        Text(
            "• rememberScrollState() 持有滚动位置，可读取 value / maxValue\n" +
            "• 可通过 scrollState.animateScrollTo(px) 编程滚动\n" +
            "• verticalScroll / horizontalScroll 适合内容量固定的场景\n" +
            "• 大量数据请用 LazyColumn / LazyRow（按需组合）",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
