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
val suggestions = listOf("Kotlin", "Compose", "Android", "Material Design")
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
    onExpandedChange = { expanded = it },
    modifier = Modifier.fillMaxWidth()
) {
    if (suggestions.isNotEmpty()) {
        suggestions.forEach { suggestion ->
            ListItem(
                headlineContent = { Text(suggestion) },
                leadingContent = { Icon(Icons.Default.History, null) },
                modifier = Modifier.clickable {
                    query = suggestion
                    expanded = false
                }
            )
        }
    } else if (query.isNotEmpty()) {
        Text(
            text = "无搜索结果",
            modifier = Modifier.padding(16.dp),
            style = MaterialTheme.typography.bodyMedium
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
                        Icon(Icons.Default.Clear, "清除")
                    }
                }
            }
        )
    },
    expanded = expanded,
    onExpandedChange = { expanded = it },
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp)
) {
    // 搜索建议列表
    repeat(5) { index ->
        ListItem(
            headlineContent = { Text("搜索结果 " + (index + 1)) },
            modifier = Modifier.clickable {
                query = "结果 " + (index + 1)
                expanded = false
            }
        )
        if (index < 4) {
            HorizontalDivider()
        }
    }
}`,
    },
    {
      title: '带搜索历史',
      code: `var query by remember { mutableStateOf("") }
var expanded by remember { mutableStateOf(false) }
var searchHistory by remember { mutableStateOf(listOf("Kotlin", "Jetpack Compose")) }

SearchBar(
    inputField = {
        SearchBarDefaults.InputField(
            query = query,
            onQueryChange = { query = it },
            onSearch = { searchQuery ->
                if (searchQuery.isNotBlank() && searchQuery !in searchHistory) {
                    searchHistory = (listOf(searchQuery) + searchHistory).take(10)
                }
                expanded = false
            },
            expanded = expanded,
            onExpandedChange = { expanded = it },
            placeholder = { Text("搜索...") },
            leadingIcon = { Icon(Icons.Default.Search, null) },
            trailingIcon = {
                if (query.isNotEmpty()) {
                    IconButton(onClick = { query = "" }) {
                        Icon(Icons.Default.Clear, "清除")
                    }
                }
            }
        )
    },
    expanded = expanded,
    onExpandedChange = { expanded = it },
    modifier = Modifier.fillMaxWidth()
) {
    if (query.isEmpty() && searchHistory.isNotEmpty()) {
        Text(
            text = "最近搜索",
            modifier = Modifier.padding(16.dp),
            style = MaterialTheme.typography.labelLarge
        )
        searchHistory.forEach { historyItem ->
            ListItem(
                headlineContent = { Text(historyItem) },
                leadingContent = { Icon(Icons.Default.History, null) },
                trailingContent = {
                    IconButton(onClick = {
                        searchHistory = searchHistory - historyItem
                    }) {
                        Icon(Icons.Default.Close, "删除")
                    }
                },
                modifier = Modifier.clickable {
                    query = historyItem
                    expanded = false
                }
            )
        }
    }
}`,
    },
    {
      title: '带分类的搜索建议',
      code: `var query by remember { mutableStateOf("") }
var expanded by remember { mutableStateOf(false) }

data class SearchSuggestion(val text: String, val category: String)

val allSuggestions = listOf(
    SearchSuggestion("Kotlin 协程", "教程"),
    SearchSuggestion("Compose 布局", "教程"),
    SearchSuggestion("Android Studio", "工具"),
    SearchSuggestion("Material Design", "设计")
)

val suggestions = allSuggestions.filter {
    it.text.contains(query, ignoreCase = true)
}

SearchBar(
    inputField = {
        SearchBarDefaults.InputField(
            query = query,
            onQueryChange = { query = it },
            onSearch = { expanded = false },
            expanded = expanded,
            onExpandedChange = { expanded = it },
            placeholder = { Text("搜索教程或工具...") },
            leadingIcon = { Icon(Icons.Default.Search, null) }
        )
    },
    expanded = expanded,
    onExpandedChange = { expanded = it },
    modifier = Modifier.fillMaxWidth()
) {
    suggestions.groupBy { it.category }.forEach { (category, items) ->
        Text(
            text = category,
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
            style = MaterialTheme.typography.labelMedium,
            color = MaterialTheme.colorScheme.primary
        )
        items.forEach { suggestion ->
            ListItem(
                headlineContent = { Text(suggestion.text) },
                supportingContent = { Text(category) },
                leadingContent = {
                    Icon(
                        if (category == "教程") Icons.Default.Article else Icons.Default.Build,
                        null
                    )
                },
                modifier = Modifier.clickable {
                    query = suggestion.text
                    expanded = false
                }
            )
        }
    }
}`,
    },
    {
      title: '异步搜索建议',
      code: `var query by remember { mutableStateOf("") }
var expanded by remember { mutableStateOf(false) }
var suggestions by remember { mutableStateOf<List<String>>(emptyList()) }
var isLoading by remember { mutableStateOf(false) }

// 模拟异步搜索
LaunchedEffect(query) {
    if (query.length >= 2) {
        isLoading = true
        delay(300)  // 防抖
        suggestions = fetchSuggestions(query)
        isLoading = false
    } else {
        suggestions = emptyList()
    }
}

SearchBar(
    inputField = {
        SearchBarDefaults.InputField(
            query = query,
            onQueryChange = { query = it },
            onSearch = { expanded = false },
            expanded = expanded,
            onExpandedChange = { expanded = it },
            placeholder = { Text("搜索...") },
            leadingIcon = { Icon(Icons.Default.Search, null) }
        )
    },
    expanded = expanded,
    onExpandedChange = { expanded = it },
    modifier = Modifier.fillMaxWidth()
) {
    when {
        isLoading -> {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator()
            }
        }
        suggestions.isNotEmpty() -> {
            suggestions.forEach { suggestion ->
                ListItem(
                    headlineContent = { Text(suggestion) },
                    modifier = Modifier.clickable {
                        query = suggestion
                        expanded = false
                    }
                )
            }
        }
        query.length >= 2 -> {
            Text(
                text = "无搜索结果",
                modifier = Modifier.padding(16.dp)
            )
        }
        else -> {
            Text(
                text = "输入至少2个字符开始搜索",
                modifier = Modifier.padding(16.dp),
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}`,
    },
    {
      title: '语音搜索',
      code: `var query by remember { mutableStateOf("") }
var expanded by remember { mutableStateOf(false) }

SearchBar(
    inputField = {
        SearchBarDefaults.InputField(
            query = query,
            onQueryChange = { query = it },
            onSearch = { expanded = false },
            expanded = expanded,
            onExpandedChange = { expanded = it },
            placeholder = { Text("搜索或说出关键词") },
            leadingIcon = { Icon(Icons.Default.Search, null) },
            trailingIcon = {
                Row {
                    if (query.isNotEmpty()) {
                        IconButton(onClick = { query = "" }) {
                            Icon(Icons.Default.Clear, "清除")
                        }
                    }
                    IconButton(onClick = { /* 启动语音识别 */ }) {
                        Icon(Icons.Default.Mic, "语音搜索")
                    }
                }
            }
        )
    },
    expanded = expanded,
    onExpandedChange = { expanded = it },
    modifier = Modifier.fillMaxWidth()
) {
    // 搜索建议
}`,
    },
  ],

  useCases: [
    {
      title: '应用内全局搜索',
      description: '实现顶部搜索栏，可搜索应用内所有内容',
      code: `@Composable
fun GlobalSearchBar(
    onNavigateToResult: (String) -> Unit
) {
    var query by rememberSaveable { mutableStateOf("") }
    var expanded by rememberSaveable { mutableStateOf(false) }
    var searchResults by remember { mutableStateOf<List<SearchResult>>(emptyList()) }
    var isSearching by remember { mutableStateOf(false) }

    LaunchedEffect(query) {
        if (query.length >= 2) {
            isSearching = true
            delay(300)
            searchResults = performSearch(query)
            isSearching = false
        } else {
            searchResults = emptyList()
        }
    }

    SearchBar(
        inputField = {
            SearchBarDefaults.InputField(
                query = query,
                onQueryChange = { query = it },
                onSearch = {
                    expanded = false
                    if (searchResults.isNotEmpty()) {
                        onNavigateToResult(searchResults.first().id)
                    }
                },
                expanded = expanded,
                onExpandedChange = { expanded = it },
                placeholder = { Text("搜索文章、用户、话题...") },
                leadingIcon = {
                    if (expanded) {
                        IconButton(onClick = { expanded = false }) {
                            Icon(Icons.AutoMirrored.Filled.ArrowBack, "返回")
                        }
                    } else {
                        Icon(Icons.Default.Search, null)
                    }
                },
                trailingIcon = {
                    if (query.isNotEmpty()) {
                        IconButton(onClick = { query = "" }) {
                            Icon(Icons.Default.Clear, "清除")
                        }
                    }
                }
            )
        },
        expanded = expanded,
        onExpandedChange = { expanded = it },
        modifier = Modifier.fillMaxWidth()
    ) {
        when {
            isSearching -> {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(32.dp),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator()
                }
            }
            searchResults.isNotEmpty() -> {
                LazyColumn {
                    items(searchResults) { result ->
                        SearchResultItem(
                            result = result,
                            onClick = {
                                expanded = false
                                onNavigateToResult(result.id)
                            }
                        )
                    }
                }
            }
            query.length >= 2 -> {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(32.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(
                            Icons.Default.SearchOff,
                            contentDescription = null,
                            modifier = Modifier.size(48.dp),
                            tint = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Spacer(Modifier.height(8.dp))
                        Text("未找到相关内容")
                    }
                }
            }
        }
    }
}`
    },
    {
      title: '电商商品搜索',
      description: '带热门搜索和搜索历史的商品搜索栏',
      code: `@Composable
fun ProductSearchBar(
    onSearchProduct: (String) -> Unit
) {
    var query by rememberSaveable { mutableStateOf("") }
    var expanded by rememberSaveable { mutableStateOf(false) }
    var searchHistory by rememberSaveable { mutableStateOf(listOf<String>()) }

    val hotSearches = listOf("iPhone 15", "MacBook", "AirPods", "iPad")

    DockedSearchBar(
        inputField = {
            SearchBarDefaults.InputField(
                query = query,
                onQueryChange = { query = it },
                onSearch = { searchQuery ->
                    if (searchQuery.isNotBlank()) {
                        if (searchQuery !in searchHistory) {
                            searchHistory = (listOf(searchQuery) + searchHistory).take(10)
                        }
                        onSearchProduct(searchQuery)
                        expanded = false
                    }
                },
                expanded = expanded,
                onExpandedChange = { expanded = it },
                placeholder = { Text("搜索商品") },
                leadingIcon = { Icon(Icons.Default.Search, null) },
                trailingIcon = {
                    if (query.isNotEmpty()) {
                        IconButton(onClick = { query = "" }) {
                            Icon(Icons.Default.Clear, "清除")
                        }
                    }
                }
            )
        },
        expanded = expanded,
        onExpandedChange = { expanded = it },
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp)
    ) {
        LazyColumn {
            // 搜索历史
            if (query.isEmpty() && searchHistory.isNotEmpty()) {
                item {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "搜索历史",
                            style = MaterialTheme.typography.titleSmall
                        )
                        TextButton(onClick = { searchHistory = emptyList() }) {
                            Text("清空")
                        }
                    }
                }
                items(searchHistory) { historyItem ->
                    ListItem(
                        headlineContent = { Text(historyItem) },
                        leadingContent = { Icon(Icons.Default.History, null) },
                        trailingContent = {
                            IconButton(onClick = {
                                searchHistory = searchHistory - historyItem
                            }) {
                                Icon(Icons.Default.Close, "删除")
                            }
                        },
                        modifier = Modifier.clickable {
                            query = historyItem
                            onSearchProduct(historyItem)
                            expanded = false
                        }
                    )
                }
            }

            // 热门搜索
            if (query.isEmpty()) {
                item {
                    Text(
                        text = "热门搜索",
                        modifier = Modifier.padding(16.dp),
                        style = MaterialTheme.typography.titleSmall
                    )
                }
                item {
                    FlowRow(
                        modifier = Modifier.padding(horizontal = 16.dp),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        hotSearches.forEach { hotSearch ->
                            SuggestionChip(
                                onClick = {
                                    query = hotSearch
                                    onSearchProduct(hotSearch)
                                    expanded = false
                                },
                                label = { Text(hotSearch) }
                            )
                        }
                    }
                }
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '选择 SearchBar 或 DockedSearchBar',
      description: 'SearchBar 展开时全屏覆盖，DockedSearchBar 展开时只占用局部区域',
      goodExample: `// 顶部全局搜索：使用 SearchBar
SearchBar(...)  // 展开时覆盖整个屏幕

// 页面内搜索：使用 DockedSearchBar
Column {
    DockedSearchBar(...)  // 展开时只在当前位置显示建议
    // 其他内容
}`,
    },
    {
      title: '实现搜索防抖',
      description: '使用 LaunchedEffect 延迟触发搜索请求',
      goodExample: `var query by remember { mutableStateOf("") }

LaunchedEffect(query) {
    if (query.length >= 2) {
        delay(300)  // 用户停止输入 300ms 后才搜索
        performSearch(query)
    }
}`,
      badExample: `// 每次输入都立即搜索，造成大量无用请求
TextField(
    value = query,
    onValueChange = {
        query = it
        performSearch(it)  // 不好
    }
)`
    },
    {
      title: '提供清空按钮',
      description: '在输入内容时显示清空按钮',
      goodExample: `SearchBarDefaults.InputField(
    query = query,
    onQueryChange = { query = it },
    trailingIcon = {
        if (query.isNotEmpty()) {
            IconButton(onClick = { query = "" }) {
                Icon(Icons.Default.Clear, "清除")
            }
        }
    }
)`,
    },
    {
      title: '展开时显示返回按钮',
      description: '在展开状态下将搜索图标替换为返回图标',
      goodExample: `SearchBarDefaults.InputField(
    leadingIcon = {
        if (expanded) {
            IconButton(onClick = { expanded = false }) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, "返回")
            }
        } else {
            Icon(Icons.Default.Search, null)
        }
    }
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'SearchBar vs DockedSearchBar',
      content: 'SearchBar 展开时全屏显示搜索建议，适合顶部应用栏。DockedSearchBar 展开时在原位置显示建议，适合嵌入页面内容中'
    },
    {
      type: 'tip',
      title: '使用 rememberSaveable 保存搜索状态',
      content: '搜索查询和展开状态应使用 rememberSaveable 保存，避免配置更改（如旋转屏幕）时丢失用户输入'
    },
    {
      type: 'warning',
      title: 'SearchBar 会改变窗口布局',
      content: 'SearchBar 展开时会全屏覆盖内容，需要处理好 windowInsets 以避免与系统栏重叠'
    },
    {
      type: 'tip',
      title: '搜索建议应该可交互',
      content: '建议列表中的每一项都应该是可点击的，点击后将建议填入搜索框或直接触发搜索'
    },
    {
      type: 'danger',
      title: '避免在 onQueryChange 中执行耗时操作',
      content: 'onQueryChange 在每次按键时触发，不要在这里执行网络请求等耗时操作。使用 LaunchedEffect + delay 实现防抖'
    },
    {
      type: 'tip',
      title: 'onSearch 触发时机',
      content: 'onSearch 在用户点击键盘的搜索按钮或选择建议时触发，是执行实际搜索的合适时机'
    },
  ],

  relatedComponents: ['text-field', 'outlined-text-field', 'keyboard-options'],
  since: '1.1.0',
}
