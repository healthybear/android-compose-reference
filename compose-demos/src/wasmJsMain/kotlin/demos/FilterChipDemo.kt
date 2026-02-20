package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * FilterChipDemo 演示 Material3 FilterChip 的用法。
 *
 * FilterChip 用于让用户从一组选项中筛选内容，持有"选中/未选中"的二元状态。
 * 选中时通常显示勾选图标，视觉上与未选中状态有明显区别。
 *
 * 核心参数：
 * - `selected`：选中状态（FilterChip 的核心参数）
 * - `onClick`：点击回调，通常用于切换 selected 状态
 * - `label`：标签内容
 * - `leadingIcon`：前置图标（选中时显示勾选图标，未选中时为 null）
 *
 * 多选模式：
 * 用 `mutableStateListOf` 管理选中项集合，
 * 每个 FilterChip 的 `selected = (item in selectedList)`，
 * 点击时添加/移除对应项，实现多选切换。
 *
 * 变体：[ElevatedFilterChip] 带阴影，功能与 FilterChip 完全一致。
 */
@Composable
fun FilterChipDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("FilterChip 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 单个切换 ───────────────────────────────────────
        SectionLabel("单个选中切换")
        var selected by remember { mutableStateOf(false) }
        FilterChip(
            selected = selected,
            onClick = { selected = !selected },
            label = { Text(if (selected) "已选中" else "未选中") },
            leadingIcon = if (selected) {
                { Icon(Icons.Filled.Check, contentDescription = null,
                    modifier = Modifier.size(FilterChipDefaults.IconSize)) }
            } else null
        )

        HorizontalDivider()

        // ── 2. 多选标签组 ─────────────────────────────────────
        SectionLabel("多选标签组")
        val filters = listOf("全部", "Kotlin", "Compose", "Android", "Material3", "Wasm")
        val selectedFilters = remember { mutableStateListOf("全部") }

        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            filters.forEach { filter ->
                val isSelected = filter in selectedFilters
                FilterChip(
                    selected = isSelected,
                    onClick = {
                        if (isSelected) selectedFilters.remove(filter)
                        else selectedFilters.add(filter)
                    },
                    label = { Text(filter) },
                    leadingIcon = if (isSelected) {
                        { Icon(Icons.Filled.Check, contentDescription = null,
                            modifier = Modifier.size(FilterChipDefaults.IconSize)) }
                    } else null
                )
            }
        }
        Text(
            "已选：${selectedFilters.joinToString(", ").ifEmpty { "无" }}",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        HorizontalDivider()

        // ── 3. ElevatedFilterChip ─────────────────────────────
        SectionLabel("ElevatedFilterChip")
        val elevatedOptions = listOf("价格", "评分", "距离")
        val elevatedSelected = remember { mutableStateListOf("评分") }
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            elevatedOptions.forEach { opt ->
                val sel = opt in elevatedSelected
                ElevatedFilterChip(
                    selected = sel,
                    onClick = {
                        if (sel) elevatedSelected.remove(opt) else elevatedSelected.add(opt)
                    },
                    label = { Text(opt) },
                    leadingIcon = if (sel) {
                        { Icon(Icons.Filled.Check, contentDescription = null,
                            modifier = Modifier.size(FilterChipDefaults.IconSize)) }
                    } else null
                )
            }
        }
    }
}
