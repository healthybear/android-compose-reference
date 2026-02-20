import type { ComponentEntry } from '../../types'

export const exposedDropdownMenuComponent: ComponentEntry = {
  id: 'exposed-dropdown-menu',
  name: 'ExposedDropdownMenuBox',
  category: 'Material',
  description: '暴露式下拉选择框，将 TextField 与下拉菜单结合，用于表单中的单项选择场景。',
  tags: ['dropdown', 'select', 'picker', 'form', 'exposed', '下拉选择'],
  params: [
    { name: 'expanded', type: 'Boolean', required: true, description: '下拉菜单是否展开' },
    { name: 'onExpandedChange', type: '(Boolean) -> Unit', required: true, description: '展开状态变化回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'content', type: '@Composable ExposedDropdownMenuBoxScope.() -> Unit', required: true, description: '内容，包含 TextField 和 ExposedDropdownMenu' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `val options = listOf("选项 A", "选项 B", "选项 C")
var expanded by remember { mutableStateOf(false) }
var selectedOption by remember { mutableStateOf(options[0]) }

ExposedDropdownMenuBox(
    expanded = expanded,
    onExpandedChange = { expanded = it }
) {
    OutlinedTextField(
        value = selectedOption,
        onValueChange = {},
        readOnly = true,
        label = { Text("请选择") },
        trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) },
        modifier = Modifier.menuAnchor()
    )
    ExposedDropdownMenu(
        expanded = expanded,
        onDismissRequest = { expanded = false }
    ) {
        options.forEach { option ->
            DropdownMenuItem(
                text = { Text(option) },
                onClick = {
                    selectedOption = option
                    expanded = false
                }
            )
        }
    }
}`,
    },
    {
      title: '可编辑过滤',
      code: `var query by remember { mutableStateOf("") }
val filtered = options.filter { it.contains(query, ignoreCase = true) }
var expanded by remember { mutableStateOf(false) }

ExposedDropdownMenuBox(
    expanded = expanded && filtered.isNotEmpty(),
    onExpandedChange = { expanded = it }
) {
    TextField(
        value = query,
        onValueChange = { query = it; expanded = true },
        label = { Text("搜索选项") },
        modifier = Modifier.menuAnchor()
    )
    ExposedDropdownMenu(
        expanded = expanded && filtered.isNotEmpty(),
        onDismissRequest = { expanded = false }
    ) {
        filtered.forEach { option ->
            DropdownMenuItem(
                text = { Text(option) },
                onClick = { query = option; expanded = false }
            )
        }
    }
}`,
    },
  ],
}
