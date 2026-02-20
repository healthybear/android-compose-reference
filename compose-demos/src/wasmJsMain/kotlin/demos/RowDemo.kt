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
fun RowDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Row 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. horizontalArrangement 对比 ─────────────────────
        SectionLabel("horizontalArrangement 对比")
        Text(
            "容器宽度撑满，放入 3 个色块",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(4.dp))

        val arrangements = listOf(
            Arrangement.Start        to "Start",
            Arrangement.Center       to "Center",
            Arrangement.End          to "End",
            Arrangement.SpaceBetween to "SpaceBetween",
            Arrangement.SpaceAround  to "SpaceAround",
            Arrangement.SpaceEvenly  to "SpaceEvenly",
        )

        arrangements.forEach { (arr, label) ->
            Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                Text(label, style = MaterialTheme.typography.labelSmall)
                Row(
                    horizontalArrangement = arr,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(28.dp)
                        .background(
                            MaterialTheme.colorScheme.surfaceVariant,
                            RoundedCornerShape(4.dp)
                        )
                        .padding(4.dp)
                ) {
                    listOf(
                        MaterialTheme.colorScheme.primary,
                        MaterialTheme.colorScheme.secondary,
                        MaterialTheme.colorScheme.tertiary
                    ).forEach { color ->
                        Box(
                            modifier = Modifier
                                .width(40.dp)
                                .fillMaxHeight()
                                .background(color, RoundedCornerShape(2.dp))
                        )
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 2. verticalAlignment 对比 ─────────────────────────
        SectionLabel("verticalAlignment 对比")
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            listOf(
                Alignment.Top    to "Top",
                Alignment.CenterVertically to "Center",
                Alignment.Bottom to "Bottom",
            ).forEach { (align, label) ->
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Row(
                        verticalAlignment = align,
                        modifier = Modifier
                            .width(72.dp)
                            .height(60.dp)
                            .background(
                                MaterialTheme.colorScheme.surfaceVariant,
                                RoundedCornerShape(4.dp)
                            )
                            .padding(4.dp)
                    ) {
                        listOf(40.dp, 24.dp, 16.dp).forEach { h ->
                            Box(
                                modifier = Modifier
                                    .width(14.dp)
                                    .height(h)
                                    .background(
                                        MaterialTheme.colorScheme.primary,
                                        RoundedCornerShape(2.dp)
                                    )
                            )
                            Spacer(Modifier.width(4.dp))
                        }
                    }
                    Spacer(Modifier.height(4.dp))
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 3. weight 填充 ────────────────────────────────────
        SectionLabel("weight — 按比例分配宽度")
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            // 1:2:1
            Row(
                modifier = Modifier.fillMaxWidth().height(32.dp),
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                listOf(
                    1f to MaterialTheme.colorScheme.primary,
                    2f to MaterialTheme.colorScheme.secondary,
                    1f to MaterialTheme.colorScheme.tertiary,
                ).forEach { (w, color) ->
                    Box(
                        modifier = Modifier
                            .weight(w)
                            .fillMaxHeight()
                            .background(color, RoundedCornerShape(4.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            "×${w.toInt()}",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onPrimary
                        )
                    }
                }
            }
            Text("weight 1 : 2 : 1", style = MaterialTheme.typography.bodySmall)
        }
    }
}
