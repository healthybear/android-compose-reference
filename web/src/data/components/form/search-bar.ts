import type { ComponentEntry } from '../../types'

export const searchBarComponent: ComponentEntry = {
  id: 'search-bar',
  name: 'SearchBar',
  category: 'Form',
  description: 'Material3 搜索栏，支持展开/收起状态，展开时显示搜索建议列表。',
  tags: ['searchbar', 'search', 'form', 'input', 'material3'],
  params: [
    { name: 'inputField', type: '@Composable () -> Unit', required: true, description: '输入区域，通常使用 SearchBarDefaults.InputField' },
    { name: 'expanded', type: 'Boolean', required: true, description: '是否展开显示建议' },
    { name: 'onExpandedChange', type: '(Boolean) -> Unit', required: true, description: '展开状态变化回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'content', type: '@Composable ColumnScope.() -> Unit', required: true, description: '展开时显示的建议内容' },
  ],
  examples: [
    {
      title: '基础搜索栏',
      code: `var query by remember { mutableStateOf("") }
var expanded by remember { mutableStateOf(false) }
val suggestions = listOf("Kotlin", "Compose", "Android")
    .filter { it.contains(query, ignoreCase = true) }

SearchBar(
    inputField = {
        SearchBarDefaults.InputField(
            query = query,
            onQueryChange = { query = it },
            onSearch = { expanded = false },
            expanded = expanded,
            onExpandedChange = { expanded = it },
            placeholder = { Text("搜索...") },
            leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) }
        )
    },
    expanded = expanded,
    onExpandedChange = { expanded = it }
) {
    suggestions.forEach { suggestion ->
        ListItem(
            headlineContent = { Text(suggestion) },
            modifier = Modifier.clickable {
                query = suggestion
                expanded = false
            }
        )
    }
}`,
    },
  ],
}
