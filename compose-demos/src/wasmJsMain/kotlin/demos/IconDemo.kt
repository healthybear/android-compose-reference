package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

@Composable
fun IconDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Icon 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 常用 Material 图标 ─────────────────────────────
        SectionLabel("常用 Material 图标（Filled）")
        val commonIcons: List<Pair<ImageVector, String>> = listOf(
            Icons.Filled.Home        to "Home",
            Icons.Filled.Search      to "Search",
            Icons.Filled.Settings    to "Settings",
            Icons.Filled.Favorite    to "Favorite",
            Icons.Filled.Share       to "Share",
            Icons.Filled.Delete      to "Delete",
            Icons.Filled.Edit        to "Edit",
            Icons.Filled.Add         to "Add",
            Icons.Filled.Close       to "Close",
            Icons.Filled.Check       to "Check",
            Icons.Filled.ArrowBack   to "ArrowBack",
            Icons.Filled.Menu        to "Menu",
        )
        // 每行 4 个
        commonIcons.chunked(4).forEach { row ->
            Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                row.forEach { (icon, label) ->
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(4.dp),
                        modifier = Modifier.width(56.dp)
                    ) {
                        Icon(imageVector = icon, contentDescription = label)
                        Text(label, style = MaterialTheme.typography.labelSmall)
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 2. Filled vs Outlined ─────────────────────────────
        SectionLabel("Filled vs Outlined")
        val pairedIcons: List<Triple<ImageVector, ImageVector, String>> = listOf(
            Triple(Icons.Filled.Home,     Icons.Outlined.Home,     "Home"),
            Triple(Icons.Filled.Favorite, Icons.Outlined.FavoriteBorder, "Favorite"),
            Triple(Icons.Filled.Settings, Icons.Outlined.Settings, "Settings"),
            Triple(Icons.Filled.Notifications, Icons.Outlined.Notifications, "Notifications"),
        )
        Row(horizontalArrangement = Arrangement.spacedBy(24.dp)) {
            pairedIcons.forEach { (filled, outlined, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        Icon(imageVector = filled,   contentDescription = "filled $label")
                        Icon(imageVector = outlined, contentDescription = "outlined $label")
                    }
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 3. 不同尺寸 ───────────────────────────────────────
        SectionLabel("不同尺寸")
        Row(
            horizontalArrangement = Arrangement.spacedBy(24.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            listOf(16.dp to "16dp", 24.dp to "24dp", 32.dp to "32dp", 48.dp to "48dp").forEach { (size, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Icon(
                        imageVector = Icons.Filled.Star,
                        contentDescription = label,
                        modifier = Modifier.size(size)
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 4. 不同颜色 ───────────────────────────────────────
        SectionLabel("不同颜色")
        Row(horizontalArrangement = Arrangement.spacedBy(24.dp)) {
            listOf(
                MaterialTheme.colorScheme.primary        to "primary",
                MaterialTheme.colorScheme.secondary      to "secondary",
                MaterialTheme.colorScheme.error          to "error",
                MaterialTheme.colorScheme.onSurfaceVariant to "onSurfaceVariant",
                Color(0xFF4CAF50)                        to "#4CAF50",
            ).forEach { (color, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Icon(
                        imageVector = Icons.Filled.Favorite,
                        contentDescription = label,
                        tint = color,
                        modifier = Modifier.size(28.dp)
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }
    }
}
