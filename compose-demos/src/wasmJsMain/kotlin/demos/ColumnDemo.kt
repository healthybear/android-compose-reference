package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun ColumnDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Column 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. verticalArrangement 对比 ───────────────────────
        SectionLabel("verticalArrangement 对比")
        Text(
            "容器高度固定 120 dp，放入 3 个色块",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(4.dp))

        val arrangements = listOf(
            Arrangement.Top          to "Top",
            Arrangement.Center       to "Center",
            Arrangement.Bottom       to "Bottom",
            Arrangement.SpaceBetween to "SpaceBetween",
            Arrangement.SpaceAround  to "SpaceAround",
            Arrangement.SpaceEvenly  to "SpaceEvenly",
        )

        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            arrangements.forEach { (arr, label) ->
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Column(
                        verticalArrangement = arr,
                        modifier = Modifier
                            .width(44.dp)
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

        // ── 2. horizontalAlignment 对比 ───────────────────────
        SectionLabel("horizontalAlignment 对比")
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            listOf(
                Alignment.Start          to "Start",
                Alignment.CenterHorizontally to "Center",
                Alignment.End            to "End",
            ).forEach { (align, label) ->
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Column(
                        horizontalAlignment = align,
                        modifier = Modifier
                            .width(80.dp)
                            .height(80.dp)
                            .background(
                                MaterialTheme.colorScheme.surfaceVariant,
                                RoundedCornerShape(4.dp)
                            )
                            .padding(4.dp)
                    ) {
                        listOf(60.dp, 40.dp, 20.dp).forEach { w ->
                            Box(
                                modifier = Modifier
                                    .width(w)
                                    .height(14.dp)
                                    .background(
                                        MaterialTheme.colorScheme.primary,
                                        RoundedCornerShape(2.dp)
                                    )
                            )
                            Spacer(Modifier.height(4.dp))
                        }
                    }
                    Spacer(Modifier.height(4.dp))
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 3. weight 填充 ────────────────────────────────────
        SectionLabel("weight — 按比例分配高度")
        Row(
            modifier = Modifier.height(120.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // 1:2:1
            Column(
                modifier = Modifier.width(60.dp).fillMaxHeight(),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                listOf(
                    1f to MaterialTheme.colorScheme.primary,
                    2f to MaterialTheme.colorScheme.secondary,
                    1f to MaterialTheme.colorScheme.tertiary,
                ).forEach { (w, color) ->
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .weight(w)
                            .background(color, RoundedCornerShape(2.dp))
                    )
                }
            }
            Column(
                modifier = Modifier.fillMaxHeight(),
                verticalArrangement = Arrangement.Center
            ) {
                Text("weight 1:2:1", style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}
