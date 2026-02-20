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
fun FlowRowDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("FlowRow 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 自动换行 ───────────────────────────────────────
        SectionLabel("自动换行")
        Text(
            "子项超出宽度时自动换到下一行",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(4.dp))

        val tags = listOf(
            "Jetpack Compose", "Kotlin", "Android", "Material3",
            "UI", "Layout", "FlowRow", "Modifier", "State", "Animation"
        )

        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            tags.forEach { tag ->
                SuggestionChip(onClick = {}, label = { Text(tag) })
            }
        }

        HorizontalDivider()

        // ── 2. horizontalArrangement 对比 ─────────────────────
        SectionLabel("horizontalArrangement 对比")
        listOf(
            Arrangement.Start        to "Start",
            Arrangement.Center       to "Center",
            Arrangement.End          to "End",
            Arrangement.SpaceBetween to "SpaceBetween",
        ).forEach { (arr, label) ->
            Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                Text(label, style = MaterialTheme.typography.labelSmall)
                FlowRow(
                    horizontalArrangement = arr,
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(
                            MaterialTheme.colorScheme.surfaceVariant,
                            RoundedCornerShape(4.dp)
                        )
                        .padding(4.dp)
                ) {
                    listOf("A", "BB", "CCC").forEach { t ->
                        Box(
                            modifier = Modifier
                                .padding(2.dp)
                                .background(
                                    MaterialTheme.colorScheme.primaryContainer,
                                    RoundedCornerShape(4.dp)
                                )
                                .padding(horizontal = 12.dp, vertical = 6.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(t, style = MaterialTheme.typography.labelMedium)
                        }
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 3. maxItemsInEachRow ──────────────────────────────
        SectionLabel("maxItemsInEachRow = 3")
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
            maxItemsInEachRow = 3,
            modifier = Modifier.fillMaxWidth()
        ) {
            repeat(7) { i ->
                Box(
                    modifier = Modifier
                        .background(
                            MaterialTheme.colorScheme.secondaryContainer,
                            RoundedCornerShape(8.dp)
                        )
                        .padding(horizontal = 16.dp, vertical = 8.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text("Item ${i + 1}", style = MaterialTheme.typography.labelMedium)
                }
            }
        }
    }
}
