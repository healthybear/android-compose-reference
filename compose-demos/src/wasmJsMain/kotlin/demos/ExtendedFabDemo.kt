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

/**
 * ExtendedFabDemo 演示 [ExtendedFloatingActionButton] 的用法。
 *
 * ExtendedFAB 在标准 FAB 基础上增加了文字标签，适合操作含义不够直观、
 * 需要文字辅助说明的场景。核心特性：
 * - expanded = true：同时显示图标与文字（宽胶囊形）
 * - expanded = false：仅显示图标（圆形），文字以动画淡出
 * - 通常配合列表/页面滚动方向自动切换 expanded 状态，节省屏幕空间
 */
@Composable
fun ExtendedFabDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("ExtendedFloatingActionButton 示例", style = MaterialTheme.typography.titleMedium)

        // 最简用法：icon + text 均为 lambda，内部自动处理间距与动画。
        // ── 1. 基础 ExtendedFAB ───────────────────────────────
        SectionLabel("基础用法")
        ExtendedFloatingActionButton(
            onClick = {},
            icon = { Icon(Icons.Filled.Add, contentDescription = null) },
            text = { Text("新建") }
        )

        HorizontalDivider()

        // expanded 参数由 Material3 内部驱动动画：文字宽度变化 + 淡入淡出，
        // 开发者只需维护一个 Boolean 状态，无需手动编写 AnimatedVisibility。
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

        // containerColor 决定 FAB 的语义：primaryContainer 对应主操作，
        // secondaryContainer 对应次要操作，两者可在同一页面共存而不混淆。
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

        // 说明区块用于补充 API 行为细节，帮助开发者理解参数背后的设计意图，
        // 而非仅展示视觉效果。
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
