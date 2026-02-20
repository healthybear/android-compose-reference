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
fun FlowColumnDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("FlowColumn 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 自动换列 ───────────────────────────────────────
        SectionLabel("自动换列")
        Text(
            "子项超出高度时自动换到下一列",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(4.dp))

        FlowColumn(
            verticalArrangement = Arrangement.spacedBy(8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(200.dp)
        ) {
            repeat(10) { i ->
                Box(
                    modifier = Modifier
                        .background(
                            MaterialTheme.colorScheme.primaryContainer,
                            RoundedCornerShape(8.dp)
                        )
                        .padding(horizontal = 16.dp, vertical = 10.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text("Item ${i + 1}", style = MaterialTheme.typography.labelMedium)
                }
            }
        }

        HorizontalDivider()

        // ── 2. verticalArrangement 对比 ───────────────────────
        SectionLabel("verticalArrangement 对比")
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            listOf(
                Arrangement.Top          to "Top",
                Arrangement.Center       to "Center",
                Arrangement.SpaceBetween to "SpaceBetween",
            ).forEach { (arr, label) ->
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    FlowColumn(
                        verticalArrangement = arr,
                        modifier = Modifier
                            .width(60.dp)
                            .height(120.dp)
                            .background(
                                MaterialTheme.colorScheme.surfaceVariant,
                                RoundedCornerShape(4.dp)
                            )
                            .padding(4.dp)
                    ) {
                        repeat(3) { i ->
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(20.dp)
                                    .background(
                                        listOf(
                                            MaterialTheme.colorScheme.primary,
                                            MaterialTheme.colorScheme.secondary,
                                            MaterialTheme.colorScheme.tertiary
                                        )[i],
                                        RoundedCornerShape(2.dp)
                                    )
                            )
                        }
                    }
                    Spacer(Modifier.height(4.dp))
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 3. maxItemsInEachColumn ───────────────────────────
        SectionLabel("maxItemsInEachColumn = 3")
        FlowColumn(
            verticalArrangement = Arrangement.spacedBy(8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            maxItemsInEachColumn = 3,
            modifier = Modifier.fillMaxWidth().height(140.dp)
        ) {
            repeat(8) { i ->
                Box(
                    modifier = Modifier
                        .background(
                            MaterialTheme.colorScheme.secondaryContainer,
                            RoundedCornerShape(8.dp)
                        )
                        .padding(horizontal = 14.dp, vertical = 8.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text("Item ${i + 1}", style = MaterialTheme.typography.labelMedium)
                }
            }
        }
    }
}
