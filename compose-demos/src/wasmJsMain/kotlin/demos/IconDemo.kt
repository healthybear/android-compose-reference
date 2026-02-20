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

/**
 * IconDemo 演示 Compose 中 [Icon] 组件的核心用法。
 *
 * 涵盖以下知识点：
 * 1. Material Icons Filled/Outlined：两套风格图标的区别与适用场景。
 *    Filled 适合主要操作，Outlined 适合次要操作或未选中状态。
 * 2. Icon 尺寸控制：通过 [Modifier.size] 自定义图标大小，默认为 24dp。
 * 3. Icon 颜色控制：通过 [tint] 参数应用主题色或自定义颜色，
 *    默认继承 LocalContentColor（通常为 onSurface）。
 */
@Composable
fun IconDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Icon 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 常用 Material 图标 ─────────────────────────────
        // Icons.Filled.* 是 Material Design 实心风格图标
        // 需要在 build.gradle 中引入 material-icons-extended 依赖
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
        // Filled（实心）适合选中/激活状态，Outlined（描边）适合未选中状态
        // 例如底部导航栏：选中项用 Filled，未选中用 Outlined
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
        // Icon 默认尺寸为 24dp（Material Design 规范）
        // 通过 Modifier.size() 可自定义，常见场景：
        //   16dp — 紧凑型 UI（如 Chip 内图标）
        //   24dp — 标准（默认）
        //   32dp — 强调型操作
        //   48dp — 大型展示
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
        // tint 参数覆盖图标颜色，传入 Color.Unspecified 则使用 LocalContentColor
        // 实际项目中通常使用 MaterialTheme.colorScheme 中的语义色
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
