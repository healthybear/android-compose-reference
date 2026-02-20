package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.state.ToggleableState
import androidx.compose.ui.unit.dp

/**
 * CheckboxDemo 演示 Material3 Checkbox 的各种用法。
 *
 * Checkbox 是三态选择控件，支持：
 * - 选中（checked = true）
 * - 未选中（checked = false）
 * - 半选/不确定（TriStateCheckbox 的 ToggleableState.Indeterminate）
 *
 * 核心 API：
 * - [Checkbox]：二态复选框，`checked` + `onCheckedChange` 受控
 * - [TriStateCheckbox]：三态复选框，`state` 参数为 [ToggleableState]
 *
 * 典型用法：
 * - 单个 Checkbox：独立的开关选项
 * - 全选/半选：父级 TriStateCheckbox 反映子项的整体选中状态，
 *   当部分子项选中时显示 Indeterminate（半选）状态
 */
@Composable
fun CheckboxDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("Checkbox 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 单个复选框 ─────────────────────────────────────
        SectionLabel("单个 Checkbox")
        var checked by remember { mutableStateOf(false) }
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(checked = checked, onCheckedChange = { checked = it })
            Text(if (checked) "已勾选" else "未勾选", style = MaterialTheme.typography.bodyMedium)
        }

        HorizontalDivider()

        // ── 2. 多选列表 ───────────────────────────────────────
        SectionLabel("多选列表")
        val options = listOf("Kotlin", "Compose", "Material3", "Coroutines", "Flow")
        val selected = remember { mutableStateListOf("Kotlin", "Compose") }
        Column {
            options.forEach { opt ->
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Checkbox(
                        checked = opt in selected,
                        onCheckedChange = { chk ->
                            if (chk) selected.add(opt) else selected.remove(opt)
                        }
                    )
                    Text(opt, style = MaterialTheme.typography.bodyMedium)
                }
            }
        }
        Text("已选：${selected.joinToString(", ").ifEmpty { "无" }}",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant)

        HorizontalDivider()

        // ── 3. 全选 / 半选（indeterminate）───────────────────
        SectionLabel("全选 / 半选（TriStateCheckbox）")
        val items = listOf("选项 1", "选项 2", "选项 3")
        val checkedItems = remember { mutableStateListOf<String>() }
        val allChecked = checkedItems.size == items.size
        val noneChecked = checkedItems.isEmpty()
        val state = when {
            allChecked  -> ToggleableState.On
            noneChecked -> ToggleableState.Off
            else        -> ToggleableState.Indeterminate
        }

        Column {
            Row(verticalAlignment = Alignment.CenterVertically) {
                TriStateCheckbox(
                    state = state,
                    onClick = {
                        if (allChecked) checkedItems.clear()
                        else { checkedItems.clear(); checkedItems.addAll(items) }
                    }
                )
                Text("全选", style = MaterialTheme.typography.bodyMedium)
            }
            items.forEach { item ->
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(start = 16.dp)
                ) {
                    Checkbox(
                        checked = item in checkedItems,
                        onCheckedChange = { chk ->
                            if (chk) checkedItems.add(item) else checkedItems.remove(item)
                        }
                    )
                    Text(item, style = MaterialTheme.typography.bodyMedium)
                }
            }
        }

        HorizontalDivider()

        // ── 4. 禁用状态 ───────────────────────────────────────
        SectionLabel("禁用状态")
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Checkbox(checked = true, onCheckedChange = null, enabled = false)
                Text("禁用已选", style = MaterialTheme.typography.bodySmall)
            }
            Row(verticalAlignment = Alignment.CenterVertically) {
                Checkbox(checked = false, onCheckedChange = null, enabled = false)
                Text("禁用未选", style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}
