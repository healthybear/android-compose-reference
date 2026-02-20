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
fun ModifierSizeDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Modifier.size 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. size(dp) 固定尺寸 ──────────────────────────────
        SectionLabel("size(dp) — 固定宽高")
        Row(
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.Bottom
        ) {
            listOf(32.dp to "32", 56.dp to "56", 80.dp to "80", 100.dp to "100").forEach { (s, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(s)
                            .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(6.dp))
                    )
                    Text("${label}dp", style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 2. fillMaxWidth / fillMaxHeight ───────────────────
        SectionLabel("fillMaxWidth / fillMaxHeight")
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(32.dp)
                    .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(6.dp)),
                contentAlignment = Alignment.Center
            ) { Text("fillMaxWidth()", style = MaterialTheme.typography.labelMedium) }

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth(0.5f)
                        .height(32.dp)
                        .background(MaterialTheme.colorScheme.secondaryContainer, RoundedCornerShape(6.dp)),
                    contentAlignment = Alignment.Center
                ) { Text("fillMaxWidth(0.5f)", style = MaterialTheme.typography.labelSmall) }
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(32.dp)
                        .background(MaterialTheme.colorScheme.tertiaryContainer, RoundedCornerShape(6.dp)),
                    contentAlignment = Alignment.Center
                ) { Text("剩余宽度", style = MaterialTheme.typography.labelSmall) }
            }
        }

        HorizontalDivider()

        // ── 3. wrapContentSize ────────────────────────────────
        SectionLabel("wrapContentSize — 内容决定尺寸")
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(80.dp)
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp)),
            contentAlignment = Alignment.Center
        ) {
            Box(
                modifier = Modifier
                    .wrapContentSize()
                    .background(MaterialTheme.colorScheme.primary, RoundedCornerShape(6.dp))
                    .padding(horizontal = 16.dp, vertical = 8.dp)
            ) {
                Text(
                    "wrapContentSize",
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.onPrimary
                )
            }
        }

        HorizontalDivider()

        // ── 4. requiredSize vs size ───────────────────────────
        SectionLabel("width / height 单独设置")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .width(120.dp)
                    .height(40.dp)
                    .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(6.dp)),
                contentAlignment = Alignment.Center
            ) { Text("width=120, height=40", style = MaterialTheme.typography.labelSmall) }

            Box(
                modifier = Modifier
                    .width(60.dp)
                    .height(60.dp)
                    .background(MaterialTheme.colorScheme.secondaryContainer, RoundedCornerShape(6.dp)),
                contentAlignment = Alignment.Center
            ) { Text("60×60", style = MaterialTheme.typography.labelSmall) }
        }
    }
}
