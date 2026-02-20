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
    { name: 'shape', type: 'Shape', default: 'SearchBarDefaults.inputFieldShape', description: '搜索栏形状' },
    { name: 'colors', type: 'SearchBarColors', default: 'SearchBarDefaults.colors()', description: '颜色配置' },
    { name: 'tonalElevation', type: 'Dp', default: 'SearchBarDefaults.TonalElevation', description: '色调高度' },
    { name: 'shadowElevation', type: 'Dp', default: 'SearchBarDefaults.ShadowElevation', description: '阴影高度' },
    { name: 'windowInsets', type: 'WindowInsets', default: 'SearchBarDefaults.windowInsets', description: '窗口内边距' },
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
    {
      title: 'DockedSearchBar（嵌入式）',
      code: `// DockedSearchBar 不全屏展开，适合嵌入页面内部
var query by remember { mutableStateOf("") }
var expanded by remember { mutableStateOf(false) }

DockedSearchBar(
    inputField = {
        SearchBarDefaults.InputField(
            query = query,
            onQueryChange = { query = it },
            onSearch = { expanded = false },
            expanded = expanded,
            onExpandedChange = { expanded = it },
            placeholder = { Text("搜索商品") },
            leadingIcon = { Icon(Icons.Default.Search, null) },
            trailingIcon = {
                if (query.isNotEmpty()) {
                    IconButton(onClick = { query = "" }) {
                        Icon(Icons.Default.Clear, null)
                    }
                }
            }
        )
    },
    expanded = expanded,
    onExpandedChange = { expanded = it },
    modifier = Modifier.padding(16.dp)
) {
    // 搜索建议列表
}`,
    },
  ],
}
