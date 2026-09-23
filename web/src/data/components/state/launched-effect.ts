import type { ComponentEntry } from '../../types'

export const launchedEffectComponent: ComponentEntry = {
  id: 'launched-effect',
  demo: { id: 'launched-effect', sourceFile: 'LaunchedEffectDemo.kt' },
  name: 'LaunchedEffect',
  category: 'State',
  description: 'LaunchedEffect 用于在 Composable 中安全地执行副作用（网络请求、数据库操作、动画等）。当依赖键变化时自动取消旧协程并启动新协程，组件离开组合时自动清理。',
  tags: ['effect', 'coroutine', 'side-effect', 'lifecycle', 'async'],
  params: [
    { name: 'key1, key2, ...', type: 'Any?', required: true, description: '依赖键，任一键变化时取消并重启协程。传 Unit 表示只在首次组合时执行一次' },
    { name: 'block', type: 'suspend CoroutineScope.() -> Unit', required: true, description: '协程块，在 Compose 管理的协程作用域中执行，自动处理取消' },
  ],
  examples: [
    {
      title: '首次加载数据（只执行一次）',
      code: `@Composable
fun ItemListScreen() {
    var items by remember { mutableStateOf<List<Item>?>(null) }
    var isLoading by remember { mutableStateOf(true) }

    LaunchedEffect(Unit) {  // Unit = 只在首次组合时执行
        items = repository.fetchItems()
        isLoading = false
    }

    if (isLoading) {
        CircularProgressIndicator()
    } else {
        LazyColumn {
            items(items!!) { item ->
                Text(item.title)
            }
        }
    }
}`,
    },
    {
      title: '依赖键变化时重新加载',
      code: `@Composable
fun UserProfile(userId: String) {
    var profile by remember { mutableStateOf<Profile?>(null) }
    var isLoading by remember { mutableStateOf(true) }

    LaunchedEffect(userId) {  // userId 变化时取消旧请求并重新加载
        isLoading = true
        profile = userRepository.getProfile(userId)
        isLoading = false
    }

    if (isLoading) {
        CircularProgressIndicator()
    } else {
        ProfileContent(profile!!)
    }
}`,
    },
    {
      title: '显示 Snackbar',
      code: `@Composable
fun Screen(errorMessage: String?) {
    val snackbarHostState = remember { SnackbarHostState() }

    // errorMessage 变化时显示 Snackbar
    LaunchedEffect(errorMessage) {
        errorMessage?.let {
            snackbarHostState.showSnackbar(
                message = it,
                duration = SnackbarDuration.Short
            )
        }
    }

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) {
        // 页面内容
    }
}`,
    },
    {
      title: '多个依赖键',
      code: `@Composable
fun FilteredList(
    category: String,
    sortOrder: SortOrder,
    searchQuery: String
) {
    var items by remember { mutableStateOf<List<Item>>(emptyList()) }

    // 三个参数任一变化都重新搜索
    LaunchedEffect(category, sortOrder, searchQuery) {
        items = repository.searchItems(
            category = category,
            sortOrder = sortOrder,
            query = searchQuery
        )
    }

    LazyColumn {
        items(items) { item ->
            ItemCard(item)
        }
    }
}`,
    },
    {
      title: '延迟执行和取消',
      code: `@Composable
fun AutoHideMessage(message: String) {
    var visible by remember { mutableStateOf(true) }

    LaunchedEffect(message) {
        visible = true
        delay(3000)  // 3 秒后自动隐藏
        visible = false
    }

    AnimatedVisibility(visible = visible) {
        Text(message)
    }
}`,
    },
    {
      title: '监听 Flow',
      code: `@Composable
fun LocationTracker(locationFlow: Flow<Location>) {
    var currentLocation by remember { mutableStateOf<Location?>(null) }

    LaunchedEffect(locationFlow) {
        locationFlow.collect { location ->
            currentLocation = location
        }
    }

    currentLocation?.let { location ->
        Text("当前位置: \${location.latitude}, \${location.longitude}")
    }
}`,
    },
  ],

  useCases: [
    {
      title: '分页加载',
      description: '监听滚动状态，触底时自动加载更多',
      code: `@Composable
fun PaginatedList() {
    val listState = rememberLazyListState()
    var items by remember { mutableStateOf(listOf<Item>()) }
    var page by remember { mutableIntStateOf(0) }
    var isLoading by remember { mutableStateOf(false) }

    // 监听滚动到底部
    LaunchedEffect(listState) {
        snapshotFlow {
            val layoutInfo = listState.layoutInfo
            val totalItems = layoutInfo.totalItemsCount
            val lastVisible = layoutInfo.visibleItemsInfo.lastOrNull()?.index ?: 0

            lastVisible >= totalItems - 3  // 距底部 3 项时触发
        }
        .distinctUntilChanged()
        .filter { it }
        .collect {
            if (!isLoading) {
                isLoading = true
                val newItems = repository.fetchPage(page)
                items = items + newItems
                page++
                isLoading = false
            }
        }
    }

    LazyColumn(state = listState) {
        items(items) { item ->
            ItemCard(item)
        }

        if (isLoading) {
            item {
                CircularProgressIndicator(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp)
                )
            }
        }
    }
}`
    },
    {
      title: '自动保存草稿',
      description: '文本变化后延迟保存，避免频繁调用',
      code: `@Composable
fun DraftEditor() {
    var text by remember { mutableStateOf("") }
    var lastSaved by remember { mutableStateOf<String?>(null) }

    // 文本变化 1 秒后自动保存
    LaunchedEffect(text) {
        if (text != lastSaved) {
            delay(1000)  // 防抖
            repository.saveDraft(text)
            lastSaved = text
        }
    }

    Column {
        TextField(
            value = text,
            onValueChange = { text = it },
            label = { Text("草稿") },
            modifier = Modifier.fillMaxWidth()
        )

        if (lastSaved != null) {
            Text(
                "已保存",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 Unit 作为键表示只执行一次',
      description: '页面初始化等只需执行一次的副作用使用 Unit',
      goodExample: `LaunchedEffect(Unit) {
    // 只在首次组合时执行
    loadInitialData()
}`,
      badExample: `LaunchedEffect(true) {
    // 使用常量 true，但语义不如 Unit 清晰
    loadInitialData()
}`
    },
    {
      title: '依赖键应包含所有影响副作用的变量',
      description: '确保依赖键完整，避免使用过期的闭包值',
      goodExample: `LaunchedEffect(userId, filter) {
    // userId 或 filter 变化时都会重新执行
    fetchData(userId, filter)
}`,
      badExample: `LaunchedEffect(userId) {
    // filter 变化时不会重新执行，使用过期的 filter 值
    fetchData(userId, filter)
}`
    },
    {
      title: '不要在 LaunchedEffect 中直接调用 suspend 函数返回值',
      description: '使用 remember + LaunchedEffect 分离状态和副作用',
      goodExample: `var data by remember { mutableStateOf<Data?>(null) }

LaunchedEffect(Unit) {
    data = fetchData()  // 结果保存到状态
}

data?.let { DisplayData(it) }`,
      badExample: `// 错误：每次重组都会重新创建 LaunchedEffect
val data = LaunchedEffect(Unit) {
    fetchData()  // 返回值无法使用
}`
    },
    {
      title: '长时间运行的任务使用 isActive 检查',
      description: '避免协程被取消后继续执行无用操作',
      goodExample: `LaunchedEffect(query) {
    val results = mutableListOf<Item>()
    for (page in 0..10) {
        if (!isActive) break  // 协程被取消时停止
        results.addAll(fetchPage(page))
    }
    items = results
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'LaunchedEffect 自动处理生命周期',
      content: '当 Composable 离开组合树或依赖键变化时，LaunchedEffect 会自动取消协程，无需手动管理'
    },
    {
      type: 'warning',
      title: 'LaunchedEffect 中的取消是协作式的',
      content: 'delay()、yield() 等挂起函数会响应取消。如果协程块中有阻塞操作（如 Thread.sleep），需要手动检查 isActive'
    },
    {
      type: 'tip',
      title: '使用 snapshotFlow 监听 State 变化',
      content: 'snapshotFlow { state.value } 可以将 Compose State 转换为 Flow，在 LaunchedEffect 中监听'
    },
    {
      type: 'tip',
      title: 'LaunchedEffect 运行在 Main 线程',
      content: 'LaunchedEffect 默认在主线程执行。耗时操作使用 withContext(Dispatchers.IO) 切换到后台线程'
    },
    {
      type: 'danger',
      title: '避免在 LaunchedEffect 中捕获并忽略 CancellationException',
      content: 'catch (e: Exception) { } 会捕获 CancellationException，导致协程无法正常取消。应使用 catch (e: Exception) { if (e is CancellationException) throw e }'
    },
  ],

  relatedComponents: ['remember', 'disposable-effect', 'derived-state-of', 'side-effect'],
  since: '1.0.0',
}
