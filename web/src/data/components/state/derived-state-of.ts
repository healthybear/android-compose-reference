import type { ComponentEntry } from '../../types'

export const derivedStateOfComponent: ComponentEntry = {
  id: 'derived-state-of',
  demo: { id: 'derived-state-of', sourceFile: 'DerivedStateOfDemo.kt' },
  name: 'derivedStateOf',
  category: 'State',
  description: 'derivedStateOf 从一个或多个状态计算出派生状态。只有当计算结果实际改变时才触发重组，即使依赖的状态频繁变化。用于优化性能，避免不必要的重组。',
  tags: ['state', 'derived', 'computed', 'optimization', 'memoization'],
  params: [
    { name: 'calculation', type: '() -> T', required: true, description: '派生计算块，读取其他状态并返回派生值。在状态读取时自动追踪依赖' },
  ],
  examples: [
    {
      title: '列表滚动状态派生',
      code: `@Composable
fun ScrollableList() {
    val listState = rememberLazyListState()

    // 只有结果从 true 变 false 或反之时才重组
    val showScrollToTop by remember {
        derivedStateOf {
            listState.firstVisibleItemIndex > 0
        }
    }

    Box {
        LazyColumn(state = listState) {
            items(100) { index ->
                Text("Item $index", modifier = Modifier.padding(16.dp))
            }
        }

        AnimatedVisibility(
            visible = showScrollToTop,
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(16.dp)
        ) {
            FloatingActionButton(
                onClick = {
                    // 滚回顶部
                }
            ) {
                Icon(Icons.Default.KeyboardArrowUp, contentDescription = "回到顶部")
            }
        }
    }
}`,
    },
    {
      title: '表单验证',
      code: `@Composable
fun LoginForm() {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    // 只有 isValid 结果变化时才重组按钮
    val isValid by remember {
        derivedStateOf {
            email.contains("@") && password.length >= 8
        }
    }

    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        TextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("邮箱") }
        )

        TextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("密码") }
        )

        Button(
            onClick = { /* 登录 */ },
            enabled = isValid
        ) {
            Text("登录")
        }
    }
}`,
    },
    {
      title: '过滤和排序列表',
      code: `@Composable
fun FilteredList(items: List<Item>) {
    var searchQuery by remember { mutableStateOf("") }
    var sortAscending by remember { mutableStateOf(true) }

    // 只有过滤排序结果变化时才重组列表
    val processedItems by remember {
        derivedStateOf {
            items
                .filter { it.name.contains(searchQuery, ignoreCase = true) }
                .sortedBy { if (sortAscending) it.name else it.name.reversed() }
        }
    }

    Column {
        Row {
            TextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                label = { Text("搜索") }
            )
            Switch(
                checked = sortAscending,
                onCheckedChange = { sortAscending = it }
            )
        }

        LazyColumn {
            items(processedItems) { item ->
                Text(item.name)
            }
        }
    }
}`,
    },
    {
      title: '复杂条件判断',
      code: `@Composable
fun PriceCalculator() {
    var quantity by remember { mutableIntStateOf(1) }
    var discountCode by remember { mutableStateOf("") }
    var isVip by remember { mutableStateOf(false) }

    val finalPrice by remember {
        derivedStateOf {
            val basePrice = quantity * 100.0
            val discount = when {
                discountCode == "SAVE20" -> 0.8
                discountCode == "SAVE10" -> 0.9
                else -> 1.0
            }
            val vipDiscount = if (isVip) 0.95 else 1.0
            basePrice * discount * vipDiscount
        }
    }

    Text("最终价格: ¥85.00")
}`,
    },
    {
      title: '避免不必要的重组',
      code: `@Composable
fun ScrollProgress() {
    val listState = rememberLazyListState()

    // 不使用 derivedStateOf：每次滚动都重组
    // val progress = listState.firstVisibleItemScrollOffset / 100f

    // 使用 derivedStateOf：只有整数部分变化才重组
    val progress by remember {
        derivedStateOf {
            (listState.firstVisibleItemScrollOffset / 100).toInt()
        }
    }

    Column {
        Text("滚动进度: $progress")
        LazyColumn(state = listState) {
            items(100) { Text("Item $it") }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '优化搜索性能',
      description: '搜索框输入频繁变化，但只在有意义的变化时才触发搜索',
      code: `@Composable
fun SearchScreen() {
    var rawQuery by remember { mutableStateOf("") }

    // 只有去除空格后的查询变化时才搜索
    val trimmedQuery by remember {
        derivedStateOf {
            rawQuery.trim()
        }
    }

    // trimmedQuery 变化时才重新搜索
    val searchResults by produceState(
        initialValue = emptyList<Item>(),
        trimmedQuery
    ) {
        if (trimmedQuery.isNotEmpty()) {
            value = repository.search(trimmedQuery)
        } else {
            value = emptyList()
        }
    }

    Column {
        TextField(
            value = rawQuery,
            onValueChange = { rawQuery = it },
            label = { Text("搜索") }
        )

        LazyColumn {
            items(searchResults) { item ->
                Text(item.name)
            }
        }
    }
}`
    },
    {
      title: '分页加载触发优化',
      description: '只在接近底部时触发加载，避免每次滚动都检查',
      code: `@Composable
fun PaginatedList() {
    val listState = rememberLazyListState()
    var items by remember { mutableStateOf(listOf<Item>()) }
    var page by remember { mutableIntStateOf(0) }

    // 只有 shouldLoadMore 从 false 变 true 时触发
    val shouldLoadMore by remember {
        derivedStateOf {
            val layoutInfo = listState.layoutInfo
            val totalItems = layoutInfo.totalItemsCount
            val lastVisible = layoutInfo.visibleItemsInfo.lastOrNull()?.index ?: 0

            lastVisible >= totalItems - 5 && totalItems > 0
        }
    }

    LaunchedEffect(shouldLoadMore) {
        if (shouldLoadMore) {
            val newItems = repository.fetchPage(page)
            items = items + newItems
            page++
        }
    }

    LazyColumn(state = listState) {
        items(items) { item ->
            ItemCard(item)
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '在 remember 中使用 derivedStateOf',
      description: 'derivedStateOf 应配合 remember 使用，避免每次重组都重新创建',
      goodExample: `val isValid by remember {
    derivedStateOf {
        email.contains("@") && password.length >= 8
    }
}`,
      badExample: `// 每次重组都重新创建 derivedStateOf
val isValid by derivedStateOf {
    email.contains("@") && password.length >= 8
}`
    },
    {
      title: '用于优化频繁变化的状态',
      description: 'derivedStateOf 适合源状态频繁变化但结果不常变的场景',
      goodExample: `// scrollOffset 频繁变化，但 showButton 结果只有两种
val showButton by remember {
    derivedStateOf {
        scrollOffset > 1000  // true/false 不频繁变化
    }
}`,
      badExample: `// 结果和源状态一样频繁变化，derivedStateOf 无优化作用
val displayOffset by remember {
    derivedStateOf {
        scrollOffset  // 直接返回，无意义
    }
}`
    },
    {
      title: '避免在 derivedStateOf 中执行副作用',
      description: 'derivedStateOf 是纯计算，不应包含副作用',
      goodExample: `val filteredList by remember {
    derivedStateOf {
        items.filter { it.isActive }  // 纯计算
    }
}`,
      badExample: `val filteredList by remember {
    derivedStateOf {
        val filtered = items.filter { it.isActive }
        Log.d("Filter", "Filtered 12 items")  // 副作用
        filtered
    }
}`
    },
    {
      title: '计算应该快速',
      description: 'derivedStateOf 在状态读取时同步计算，避免耗时操作',
      goodExample: `val isValid by remember {
    derivedStateOf {
        email.contains("@")  // 快速计算
    }
}`,
      badExample: `val processedData by remember {
    derivedStateOf {
        // 耗时计算，应放在 LaunchedEffect 中异步执行
        heavyProcessing(rawData)
    }
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'derivedStateOf 自动追踪依赖',
      content: 'derivedStateOf 在计算时会自动追踪读取的所有 State，任一依赖变化时重新计算'
    },
    {
      type: 'warning',
      title: 'derivedStateOf 不延迟计算',
      content: 'derivedStateOf 在依赖状态变化时立即重新计算，而不是延迟到读取时。如果计算耗时，考虑使用 LaunchedEffect + 普通 State'
    },
    {
      type: 'info',
      title: '使用 by 委托简化代码',
      content: 'val result by remember { derivedStateOf { ... } } 可以直接读取 result，无需 .value'
    },
    {
      type: 'info',
      title: 'derivedStateOf 使用结构相等性',
      content: 'derivedStateOf 使用 == 比较新旧值。对于自定义类，确保正确实现 equals() 和 hashCode()'
    },
    {
      type: 'error',
      title: '避免循环依赖',
      content: '不要在 derivedStateOf 中读取另一个 derivedStateOf，可能导致无限循环或性能问题'
    },
  ],

  relatedComponents: ['remember', 'launched-effect', 'disposable-effect'],
  since: '1.0.0',
}
