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
fun HorizontalDividerDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("HorizontalDivider 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础分隔线 ─────────────────────────────────────
        SectionLabel("基础分隔线")
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text("上方内容", style = MaterialTheme.typography.bodyMedium)
            HorizontalDivider()
            Text("下方内容", style = MaterialTheme.typography.bodyMedium)
        }

        HorizontalDivider()

        // ── 2. 自定义厚度和颜色 ───────────────────────────────
        SectionLabel("thickness & color")
        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            listOf(
                1.dp  to "1 dp（默认）",
                2.dp  to "2 dp",
                4.dp  to "4 dp",
            ).forEach { (thickness, label) ->
                Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text(label, style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant)
                    HorizontalDivider(thickness = thickness)
                }
            }
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text("自定义颜色（primary）", style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant)
                HorizontalDivider(color = MaterialTheme.colorScheme.primary)
            }
        }

        HorizontalDivider()

        // ── 3. 缩进（indent）─────────────────────────────────
        SectionLabel("indent — 缩进")
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                .padding(vertical = 4.dp)
        ) {
            repeat(4) { i ->
                Row(
                    modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(32.dp)
                            .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(16.dp))
                    )
                    Text("列表项 ${i + 1}", style = MaterialTheme.typography.bodyMedium)
                }
                if (i < 3) {
                    HorizontalDivider(
                        modifier = Modifier.padding(start = 60.dp) // 缩进，跳过图标区域
                    )
                }
            }
        }

        HorizontalDivider()

        // ── 4. VerticalDivider ────────────────────────────────
        SectionLabel("VerticalDivider — 垂直分隔线")
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Text("左侧", style = MaterialTheme.typography.bodyMedium)
            VerticalDivider()
            Text("中间", style = MaterialTheme.typography.bodyMedium)
            VerticalDivider(thickness = 2.dp, color = MaterialTheme.colorScheme.primary)
            Text("右侧", style = MaterialTheme.typography.bodyMedium)
        }
    }
}
