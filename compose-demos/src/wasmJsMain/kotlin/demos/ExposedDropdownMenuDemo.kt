package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ExposedDropdownMenuDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("ExposedDropdownMenu 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 只读下拉选择框 ─────────────────────────────────
        SectionLabel("只读下拉选择框（ReadOnly）")
        val fruits = listOf("苹果", "香蕉", "橙子", "葡萄", "西瓜", "草莓")
        var expanded1 by remember { mutableStateOf(false) }
        var selectedFruit by remember { mutableStateOf(fruits[0]) }

        ExposedDropdownMenuBox(
            expanded = expanded1,
            onExpandedChange = { expanded1 = it }
        ) {
            OutlinedTextField(
                value = selectedFruit,
                onValueChange = {},
                readOnly = true,
                label = { Text("选择水果") },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded1) },
                colors = ExposedDropdownMenuDefaults.outlinedTextFieldColors(),
                modifier = Modifier.menuAnchor().fillMaxWidth()
            )
            ExposedDropdownMenu(
                expanded = expanded1,
                onDismissRequest = { expanded1 = false }
            ) {
                fruits.forEach { fruit ->
                    DropdownMenuItem(
                        text = { Text(fruit) },
                        onClick = { selectedFruit = fruit; expanded1 = false },
                        contentPadding = ExposedDropdownMenuDefaults.ItemContentPadding
                    )
                }
            }
        }

        HorizontalDivider()

        // ── 2. 可输入过滤 ─────────────────────────────────────
        SectionLabel("可输入过滤")
        val allOptions = listOf("Compose", "Kotlin", "Android", "Material3", "Coroutines", "Flow", "Wasm")
        var expanded2 by remember { mutableStateOf(false) }
        var inputText by remember { mutableStateOf("") }
        val filtered = allOptions.filter { it.contains(inputText, ignoreCase = true) }

        ExposedDropdownMenuBox(
            expanded = expanded2 && filtered.isNotEmpty(),
            onExpandedChange = { expanded2 = it }
        ) {
            OutlinedTextField(
                value = inputText,
                onValueChange = { inputText = it; expanded2 = true },
                label = { Text("搜索技术栈") },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded2) },
                colors = ExposedDropdownMenuDefaults.outlinedTextFieldColors(),
                modifier = Modifier.menuAnchor().fillMaxWidth()
            )
            if (filtered.isNotEmpty()) {
                ExposedDropdownMenu(
                    expanded = expanded2,
                    onDismissRequest = { expanded2 = false }
                ) {
                    filtered.forEach { option ->
                        DropdownMenuItem(
                            text = { Text(option) },
                            onClick = { inputText = option; expanded2 = false },
                            contentPadding = ExposedDropdownMenuDefaults.ItemContentPadding
                        )
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 3. Filled 样式 ────────────────────────────────────
        SectionLabel("Filled 样式（TextField）")
        val sizes = listOf("小", "中", "大", "特大")
        var expanded3 by remember { mutableStateOf(false) }
        var selectedSize by remember { mutableStateOf(sizes[1]) }

        ExposedDropdownMenuBox(
            expanded = expanded3,
            onExpandedChange = { expanded3 = it }
        ) {
            TextField(
                value = selectedSize,
                onValueChange = {},
                readOnly = true,
                label = { Text("尺寸") },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded3) },
                colors = ExposedDropdownMenuDefaults.textFieldColors(),
                modifier = Modifier.menuAnchor().fillMaxWidth()
            )
            ExposedDropdownMenu(
                expanded = expanded3,
                onDismissRequest = { expanded3 = false }
            ) {
                sizes.forEach { size ->
                    DropdownMenuItem(
                        text = { Text(size) },
                        onClick = { selectedSize = size; expanded3 = false },
                        contentPadding = ExposedDropdownMenuDefaults.ItemContentPadding
                    )
                }
            }
        }
    }
}
