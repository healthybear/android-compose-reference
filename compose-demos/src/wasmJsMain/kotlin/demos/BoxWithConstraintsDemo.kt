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
fun BoxWithConstraintsDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("BoxWithConstraints 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("根据 maxWidth 切换布局")
        Text(
            "BoxWithConstraints 可在 Composable 内读取父容器约束，实现响应式布局。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        HorizontalDivider()

        // ── 宽容器：双列布局 ──────────────────────────────────
        SectionLabel("宽容器（maxWidth ≥ 400 dp）→ 双列")
        BoxWithConstraints(modifier = Modifier.fillMaxWidth()) {
            if (maxWidth >= 400.dp) {
                Row(
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    repeat(4) { i ->
                        Box(
                            modifier = Modifier
                                .weight(1f)
                                .height(60.dp)
                                .background(
                                    listOf(
                                        MaterialTheme.colorScheme.primaryContainer,
                                        MaterialTheme.colorScheme.secondaryContainer,
                                        MaterialTheme.colorScheme.tertiaryContainer,
                                        MaterialTheme.colorScheme.errorContainer,
                                    )[i],
                                    RoundedCornerShape(8.dp)
                                ),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("Item ${i + 1}", style = MaterialTheme.typography.labelMedium)
                        }
                    }
                }
            } else {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    repeat(4) { i ->
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(40.dp)
                                .background(
                                    listOf(
                                        MaterialTheme.colorScheme.primaryContainer,
                                        MaterialTheme.colorScheme.secondaryContainer,
                                        MaterialTheme.colorScheme.tertiaryContainer,
                                        MaterialTheme.colorScheme.errorContainer,
                                    )[i],
                                    RoundedCornerShape(8.dp)
                                ),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("Item ${i + 1}", style = MaterialTheme.typography.labelMedium)
                        }
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 窄容器：强制单列 ──────────────────────────────────
        SectionLabel("窄容器（maxWidth < 400 dp）→ 单列")
        BoxWithConstraints(
            modifier = Modifier.width(240.dp)
        ) {
            if (maxWidth >= 400.dp) {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    repeat(4) { i ->
                        Box(
                            modifier = Modifier
                                .weight(1f)
                                .height(40.dp)
                                .background(
                                    MaterialTheme.colorScheme.primaryContainer,
                                    RoundedCornerShape(8.dp)
                                ),
                            contentAlignment = Alignment.Center
                        ) { Text("Item ${i + 1}", style = MaterialTheme.typography.labelSmall) }
                    }
                }
            } else {
                Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    repeat(4) { i ->
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(32.dp)
                                .background(
                                    listOf(
                                        MaterialTheme.colorScheme.primaryContainer,
                                        MaterialTheme.colorScheme.secondaryContainer,
                                        MaterialTheme.colorScheme.tertiaryContainer,
                                        MaterialTheme.colorScheme.errorContainer,
                                    )[i],
                                    RoundedCornerShape(8.dp)
                                ),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                "Item ${i + 1}（maxWidth = $maxWidth）",
                                style = MaterialTheme.typography.labelSmall
                            )
                        }
                    }
                }
            }
        }
    }
}
