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
fun SpacerDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Spacer 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 固定间距 ───────────────────────────────────────
        SectionLabel("固定间距 — Spacer(Modifier.height / width)")
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                .padding(12.dp)
        ) {
            listOf(4.dp to "4 dp", 12.dp to "12 dp", 24.dp to "24 dp").forEach { (space, label) ->
                ColorBlock("Block A", MaterialTheme.colorScheme.primaryContainer)
                Spacer(Modifier.height(space))
                ColorBlock("Block B（间距 $label）", MaterialTheme.colorScheme.secondaryContainer)
                Spacer(Modifier.height(16.dp))
            }
        }

        HorizontalDivider()

        // ── 2. weight 填充剩余空间 ────────────────────────────
        SectionLabel("weight 填充 — Spacer(Modifier.weight(1f))")
        Text(
            "Spacer 配合 weight 可把剩余空间推到两端",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(4.dp))

        // 垂直方向：把按钮推到底部
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .height(160.dp)
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                .padding(12.dp)
        ) {
            Text("顶部内容", style = MaterialTheme.typography.bodyMedium)
            Spacer(Modifier.weight(1f))
            Button(onClick = {}) { Text("底部按钮") }
        }

        Spacer(Modifier.height(8.dp))

        // 水平方向：把按钮推到右侧
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("左侧标题", style = MaterialTheme.typography.bodyMedium)
            Spacer(Modifier.weight(1f))
            TextButton(onClick = {}) { Text("右侧操作") }
        }
    }
}

@Composable
private fun ColorBlock(label: String, color: androidx.compose.ui.graphics.Color) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(32.dp)
            .background(color, RoundedCornerShape(4.dp)),
        contentAlignment = Alignment.Center
    ) {
        Text(label, style = MaterialTheme.typography.labelSmall)
    }
}
