import type { ComponentEntry } from '../../types'

export const checkboxComponent: ComponentEntry = {
  id: 'checkbox',
  name: 'Checkbox',
  category: 'Form',
  description: '复选框，支持选中、未选中、不确定三种状态，通常配合文字标签使用。',
  tags: ['checkbox', 'form', 'selection', 'toggle', 'check'],
  params: [
    { name: 'checked', type: 'Boolean', required: true, description: '是否选中' },
    { name: 'onCheckedChange', type: '((Boolean) -> Unit)?', required: true, description: '状态变化回调，null 时不可交互' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var checked by remember { mutableStateOf(false) }

Row(
    verticalAlignment = Alignment.CenterVertically,
    modifier = Modifier.clickable { checked = !checked }
) {
    Checkbox(checked = checked, onCheckedChange = { checked = it })
    Text("同意用户协议")
}`,
    },
    {
      title: '全选（不确定状态）',
      code: `val items = remember { mutableStateListOf(false, false, false) }
val allChecked = items.all { it }
val someChecked = items.any { it }

Row(verticalAlignment = Alignment.CenterVertically) {
    TriStateCheckbox(
        state = when {
            allChecked -> ToggleableState.On
            someChecked -> ToggleableState.Indeterminate
            else -> ToggleableState.Off
        },
        onClick = {
            val newState = !allChecked
            items.indices.forEach { items[it] = newState }
        }
    )
    Text("全选")
}`,
    },
  ],
}
