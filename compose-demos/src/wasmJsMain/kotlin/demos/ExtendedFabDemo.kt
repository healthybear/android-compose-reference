package demos

import androidx.compose.animation.*
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Navigation
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ExtendedFabDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("ExtendedFloatingActionButton 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础 ExtendedFAB ───────────────────────────────
        SectionLabel("基础用法")
        ExtendedFloatingActionButton(
            onClick = {},
            icon = { Icon(Icons.Filled.Add, contentDescription = null) },
            text = { Text("新建") }
        )

        HorizontalDivider()

        // ── 2. 展开 / 收起动画 ────────────────────────────────
        SectionLabel("展开 / 收起文字动画")
        var expanded by remember { mutableStateOf(true) }
        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            ExtendedFloatingActionButton(
                onClick = { expanded = !expanded },
                expanded = expanded,
                icon = { Icon(Icons.Filled.Edit, contentDescription = null) },
                text = { Text("编辑内容") }
            )
            Text(
                if (expanded) "点击收起文字" else "点击展开文字",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }

        HorizontalDivider()

        // ── 3. 多种样式 ───────────────────────────────────────
        SectionLabel("containerColor 变体")
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            ExtendedFloatingActionButton(
                onClick = {},
                icon = { Icon(Icons.Filled.Navigation, contentDescription = null) },
                text = { Text("导航") },
                containerColor = MaterialTheme.colorScheme.primaryContainer,
                contentColor = MaterialTheme.colorScheme.onPrimaryContainer
            )
            ExtendedFloatingActionButton(
                onClick = {},
                icon = { Icon(Icons.Filled.Navigation, contentDescription = null) },
                text = { Text("导航") },
                containerColor = MaterialTheme.colorScheme.secondaryContainer,
                contentColor = MaterialTheme.colorScheme.onSecondaryContainer
            )
        }

        HorizontalDivider()

        // ── 4. 说明 ───────────────────────────────────────────
        SectionLabel("说明")
        Text(
            "• expanded = true 时显示图标 + 文字\n" +
            "• expanded = false 时只显示图标，文字淡出\n" +
            "• 通常配合列表滚动方向自动切换展开状态",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
