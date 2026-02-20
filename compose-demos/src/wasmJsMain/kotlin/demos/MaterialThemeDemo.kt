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
fun MaterialThemeDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("MaterialTheme 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 亮/暗色说明 ────────────────────────────────────
        SectionLabel("亮色 / 暗色切换")
        Text(
            "点击右上角 🌙 / ☀️ 按钮可切换主题，当前 Demo 会随之响应。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        // 当前主题色块预览
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            listOf(
                MaterialTheme.colorScheme.background  to "background",
                MaterialTheme.colorScheme.surface     to "surface",
                MaterialTheme.colorScheme.primary     to "primary",
                MaterialTheme.colorScheme.secondary   to "secondary",
            ).forEach { (color, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(56.dp)
                            .background(color, RoundedCornerShape(8.dp))
                            .then(
                                if (color == MaterialTheme.colorScheme.background ||
                                    color == MaterialTheme.colorScheme.surface)
                                    Modifier.border(1.dp, MaterialTheme.colorScheme.outline, RoundedCornerShape(8.dp))
                                else Modifier
                            )
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 2. colorScheme 访问 ───────────────────────────────
        SectionLabel("MaterialTheme.colorScheme 访问")
        Text(
            "在任意 Composable 中通过 MaterialTheme.colorScheme.xxx 读取当前主题色。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(8.dp))
                .padding(16.dp)
        ) {
            Text(
                "primaryContainer 背景 + onPrimaryContainer 文字",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onPrimaryContainer
            )
        }

        HorizontalDivider()

        // ── 3. typography 访问 ────────────────────────────────
        SectionLabel("MaterialTheme.typography 访问")
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("titleLarge", style = MaterialTheme.typography.titleLarge)
            Text("bodyLarge", style = MaterialTheme.typography.bodyLarge)
            Text("labelMedium", style = MaterialTheme.typography.labelMedium)
        }

        HorizontalDivider()

        // ── 4. shapes 访问 ────────────────────────────────────
        SectionLabel("MaterialTheme.shapes 访问")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            listOf(
                MaterialTheme.shapes.extraSmall to "extraSmall",
                MaterialTheme.shapes.medium     to "medium",
                MaterialTheme.shapes.extraLarge to "extraLarge",
            ).forEach { (shape, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(56.dp)
                            .background(MaterialTheme.colorScheme.primary, shape)
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }
    }
}

private fun Modifier.border(width: androidx.compose.ui.unit.Dp, color: androidx.compose.ui.graphics.Color, shape: androidx.compose.ui.graphics.Shape): Modifier =
    this.then(androidx.compose.foundation.border(width, color, shape))
