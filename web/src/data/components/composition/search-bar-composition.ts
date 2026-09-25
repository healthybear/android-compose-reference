import type { ComponentEntry } from '../../types'

export const searchBarCompositionComponent: ComponentEntry = {
  id: 'search-bar-composition',
  demo: { id: 'search-bar-composition', sourceFile: 'SearchBarCompositionDemo.kt' },
  name: 'Search Bar Composition',
  category: 'Composition',
  description: '实时搜索系统组合示例，展示如何结合 TextField、LazyColumn、防抖等技术实现搜索功能。',
  tags: ['search', 'composition', 'debounce', '搜索', '组合'],
  params: [],
  examples: [
    {
      title: '带防抖的搜索',
      code: `var query by remember { mutableStateOf("") }
var debouncedQuery by remember { mutableStateOf("") }

LaunchedEffect(query) {
    delay(500) // 防抖
    debouncedQuery = query
}

Column {
    OutlinedTextField(
        value = query,
        onValueChange = { query = it },
        label = { Text("搜索") }
    )
    LazyColumn {
        items(
            items.filter { it.contains(debouncedQuery, ignoreCase = true) }
        ) { item ->
            Text(item)
        }
    }
}`,
    },
  ],
  bestPractices: [
    {
      type: 'tip',
      title: '使用防抖减少搜索次数',
      content: '在用户停止输入后再触发搜索，避免频繁的网络请求',
    },
    {
      type: 'tip',
      title: '保存搜索历史',
      content: '记录用户的搜索历史，提供快速访问',
    },
  ],
  relatedComponents: ['text-field', 'lazy-column', 'launched-effect'],
  since: '1.0.0',
}
