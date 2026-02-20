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

@Composable
fun LazyHorizontalGridDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("LazyHorizontalGrid 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. GridCells.Fixed(2) ─────────────────────────────
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
