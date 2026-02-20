package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun ColorSchemeDemo() {
    val cs = MaterialTheme.colorScheme

    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("ColorScheme 示例", style = MaterialTheme.typography.titleMedium)

        // ── 主色系 ────────────────────────────────────────────
        SectionLabel("主色系")
        ColorGroup(
            listOf(
                cs.primary         to "primary"         to cs.onPrimary,
                cs.onPrimary       to "onPrimary"       to cs.primary,
                cs.primaryContainer to "primaryContainer" to cs.onPrimaryContainer,
                cs.onPrimaryContainer to "onPrimaryContainer" to cs.primaryContainer,
            )
        )

        // ── 次色系 ────────────────────────────────────────────
        SectionLabel("次色系")
        ColorGroup(
            listOf(
                cs.secondary         to "secondary"         to cs.onSecondary,
                cs.onSecondary       to "onSecondary"       to cs.secondary,
                cs.secondaryContainer to "secondaryContainer" to cs.onSecondaryContainer,
                cs.onSecondaryContainer to "onSecondaryContainer" to cs.secondaryContainer,
            )
        )

        // ── 第三色系 ──────────────────────────────────────────
        SectionLabel("第三色系")
        ColorGroup(
            listOf(
                cs.tertiary         to "tertiary"         to cs.onTertiary,
                cs.onTertiary       to "onTertiary"       to cs.tertiary,
                cs.tertiaryContainer to "tertiaryContainer" to cs.onTertiaryContainer,
                cs.onTertiaryContainer to "onTertiaryContainer" to cs.tertiaryContainer,
            )
        )

        // ── 错误色 ────────────────────────────────────────────
        SectionLabel("错误色")
        ColorGroup(
            listOf(
                cs.error         to "error"         to cs.onError,
                cs.onError       to "onError"       to cs.error,
                cs.errorContainer to "errorContainer" to cs.onErrorContainer,
                cs.onErrorContainer to "onErrorContainer" to cs.errorContainer,
            )
        )

        // ── 背景 & 表面 ───────────────────────────────────────
        SectionLabel("背景 & 表面")
        ColorGroup(
            listOf(
                cs.background    to "background"    to cs.onBackground,
                cs.onBackground  to "onBackground"  to cs.background,
                cs.surface       to "surface"       to cs.onSurface,
                cs.onSurface     to "onSurface"     to cs.surface,
                cs.surfaceVariant to "surfaceVariant" to cs.onSurfaceVariant,
                cs.onSurfaceVariant to "onSurfaceVariant" to cs.surfaceVariant,
            ),
            showBorder = true
        )

        // ── 轮廓 ──────────────────────────────────────────────
        SectionLabel("轮廓")
        ColorGroup(
            listOf(
                cs.outline        to "outline"        to cs.background,
                cs.outlineVariant to "outlineVariant" to cs.onBackground,
            ),
            showBorder = true
        )
    }
}

@Composable
private fun ColorGroup(
    items: List<Pair<Pair<Color, String>, Color>>,
    showBorder: Boolean = false
) {
    // 每行 2 个
    items.chunked(2).forEach { row ->
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            row.forEach { (colorLabel, textColor) ->
                val (color, label) = colorLabel
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(48.dp)
                        .background(color, RoundedCornerShape(6.dp))
                        .then(
                            if (showBorder)
                                Modifier.border(1.dp, MaterialTheme.colorScheme.outline, RoundedCornerShape(6.dp))
                            else Modifier
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        label,
                        style = MaterialTheme.typography.labelSmall,
                        color = textColor
                    )
                }
            }
        }
    }
}
