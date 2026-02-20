package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun LazyRowDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("LazyRow 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础横向滚动 ───────────────────────────────────
        SectionLabel("基础横向列表（可滚动）")
        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            contentPadding = PaddingValues(horizontal = 4.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            itemsIndexed((1..20).toList()) { index, item ->
                Box(
                    modifier = Modifier
                        .size(72.dp)
                        .background(
                            MaterialTheme.colorScheme.primaryContainer,
                            RoundedCornerShape(12.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(
                            "$item",
                            style = MaterialTheme.typography.titleMedium,
                            color = MaterialTheme.colorScheme.onPrimaryContainer
                        )
                        Text(
                            "#${index + 1}",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onPrimaryContainer
                        )
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 2. 卡片列表 ───────────────────────────────────────
        SectionLabel("横向卡片列表")
        val cards = listOf(
            "Compose"   to MaterialTheme.colorScheme.primaryContainer,
            "Kotlin"    to MaterialTheme.colorScheme.secondaryContainer,
            "Material3" to MaterialTheme.colorScheme.tertiaryContainer,
            "Android"   to MaterialTheme.colorScheme.errorContainer,
            "Wasm"      to MaterialTheme.colorScheme.surfaceVariant,
            "Coroutines" to MaterialTheme.colorScheme.primaryContainer,
            "Flow"      to MaterialTheme.colorScheme.secondaryContainer,
        )
        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            contentPadding = PaddingValues(horizontal = 4.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            itemsIndexed(cards) { _, (title, color) ->
                Card(
                    modifier = Modifier.width(120.dp).height(80.dp),
                    colors = CardDefaults.cardColors(containerColor = color),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(title, style = MaterialTheme.typography.titleSmall)
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 3. contentPadding 说明 ────────────────────────────
        SectionLabel("contentPadding — 首尾留白")
        Text(
            "设置 contentPadding 后，列表首尾会有额外空白，但滚动时内容仍可滚到边缘。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            contentPadding = PaddingValues(horizontal = 32.dp),
            modifier = Modifier
                .fillMaxWidth()
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                .padding(vertical = 8.dp)
        ) {
            items(8) { i ->
                Box(
                    modifier = Modifier
                        .size(48.dp)
                        .background(
                            MaterialTheme.colorScheme.secondary,
                            RoundedCornerShape(8.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        "${i + 1}",
                        style = MaterialTheme.typography.labelLarge,
                        color = MaterialTheme.colorScheme.onSecondary
                    )
                }
            }
        }
    }
}
