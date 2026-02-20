package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

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
