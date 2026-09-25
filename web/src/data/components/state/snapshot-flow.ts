import type { ComponentEntry } from '../../types'

export const snapshotFlowComponent: ComponentEntry = {
  id: 'snapshot-flow',
  demo: { id: 'snapshot-flow', sourceFile: 'SnapshotFlowDemo.kt' },
  name: 'snapshotFlow',
  category: 'State',
  description: '将 Compose State 转换为 Kotlin Flow，State 变化时自动发射新值。用于在协程中监听 Compose 状态变化，是 collectAsState 的反向操作。',
  tags: ['state', 'flow', 'snapshot', 'reactive', 'observe'],
  params: [
    { name: 'block', type: '() -> T', required: true, description: '读取 State 的 lambda，任何读取的 State 变化时都会发射新值' },
  ],
  examples: [
    {
      title: '监听单个 State',
      code: `@Composable
fun ScrollObserver() {
    val listState = rememberLazyListState()

    LaunchedEffect(listState) {
        snapshotFlow { listState.firstVisibleItemIndex }
            .collect { index ->
                Log.d("Scroll", "First visible item: " + index)
            }
    }

    LazyColumn(state = listState) {
        items(100) { index ->
            Text("Item " + index)
        }
    }
}`,
    },
    {
      title: '监听多个 State',
      code: `@Composable
fun FormValidator() {
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var isValid by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        snapshotFlow {
            // 同时监听两个 State
            username.length >= 3 && password.length >= 6
        }.collect { valid ->
            isValid = valid
        }
    }

    Column {
        TextField(value = username, onValueChange = { username = it })
        TextField(value = password, onValueChange = { password = it })
        Button(enabled = isValid, onClick = { }) {
            Text("提交")
        }
    }
}`,
    },
    {
      title: '使用 Flow 操作符',
      code: `@Composable
fun SearchWithDebounce() {
    var searchQuery by remember { mutableStateOf("") }
    var results by remember { mutableStateOf<List<Item>>(emptyList()) }

    LaunchedEffect(Unit) {
        snapshotFlow { searchQuery }
            .debounce(300)  // 防抖
            .filter { it.isNotBlank() }
            .distinctUntilChanged()
            .collect { query ->
                results = repository.search(query)
            }
    }

    Column {
        TextField(value = searchQuery, onValueChange = { searchQuery = it })
        LazyColumn {
            items(results) { item ->
                Text(item.name)
            }
        }
    }
}`,
    },
    {
      title: '监听滚动到底部',
      code: `@Composable
fun InfiniteScrollList() {
    val listState = rememberLazyListState()
    var items by remember { mutableStateOf(loadInitialItems()) }
    var isLoading by remember { mutableStateOf(false) }

    LaunchedEffect(listState) {
        snapshotFlow {
            val layoutInfo = listState.layoutInfo
            val totalItems = layoutInfo.totalItemsCount
            val lastVisibleItem = layoutInfo.visibleItemsInfo.lastOrNull()?.index ?: 0

            lastVisibleItem >= totalItems - 3
        }
        .distinctUntilChanged()
        .filter { it && !isLoading }
        .collect {
            isLoading = true
            val newItems = loadMoreItems()
            items = items + newItems
            isLoading = false
        }
    }

    LazyColumn(state = listState) {
        items(items) { item ->
            ItemCard(item)
        }
        if (isLoading) {
            item {
                CircularProgressIndicator()
            }
        }
    }
}`,
    },
    {
      title: '监听组合对象属性',
      code: `@Composable
fun AnimationProgressTracker() {
    val animatable = remember { Animatable(0f) }

    LaunchedEffect(Unit) {
        launch {
            animatable.animateTo(1f, tween(2000))
        }

        // 监听动画进度
        snapshotFlow { animatable.value }
            .collect { progress ->
                if (progress >= 0.5f) {
                    Log.d("Animation", "Halfway done!")
                }
            }
    }

    Box(Modifier.alpha(animatable.value)) {
        Text("Fading in")
    }
}`,
    },
    {
      title: '复杂状态组合',
      code: `@Composable
fun ComplexStateObserver() {
    var count by remember { mutableIntStateOf(0) }
    var isEnabled by remember { mutableStateOf(true) }
    var multiplier by remember { mutableIntStateOf(2) }

    LaunchedEffect(Unit) {
        snapshotFlow {
            // 组合多个状态计算派生值
            if (isEnabled) count * multiplier else 0
        }
        .distinctUntilChanged()
        .collect { result ->
            analytics.track("ResultChanged", mapOf("value" to result))
        }
    }

    Column {
        Text("Result: " + (if (isEnabled) count * multiplier else 0))
        Button(onClick = { count++ }) { Text("Increment") }
        Switch(checked = isEnabled, onCheckedChange = { isEnabled = it })
    }
}`,
    },
  ],

  useCases: [
    {
      title: '智能刷新指示器',
      description: '监听滚动状态，动态显示"回到顶部"按钮',
      code: `@Composable
fun SmartScrollToTop() {
    val listState = rememberLazyListState()
    var showButton by remember { mutableStateOf(false) }
    val coroutineScope = rememberCoroutineScope()

    LaunchedEffect(listState) {
        snapshotFlow { listState.firstVisibleItemIndex }
            .map { it > 5 }
            .distinctUntilChanged()
            .collect { shouldShow ->
                showButton = shouldShow
            }
    }

    Box(Modifier.fillMaxSize()) {
        LazyColumn(state = listState) {
            items(100) { index ->
                Text(
                    "Item " + index,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp)
                )
            }
        }

        AnimatedVisibility(
            visible = showButton,
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(16.dp)
        ) {
            FloatingActionButton(
                onClick = {
                    coroutineScope.launch {
                        listState.animateScrollToItem(0)
                    }
                }
            ) {
                Icon(Icons.Default.ArrowUpward, "回到顶部")
            }
        }
    }
}`
    },
    {
      title: '状态同步到 ViewModel',
      description: '将 Compose UI 状态同步到 ViewModel',
      code: `@Composable
fun SyncStateToViewModel(viewModel: MyViewModel = viewModel()) {
    var localSelection by remember { mutableStateOf<String?>(null) }
    val coroutineScope = rememberCoroutineScope()

    LaunchedEffect(Unit) {
        snapshotFlow { localSelection }
            .filterNotNull()
            .distinctUntilChanged()
            .collect { selection ->
                viewModel.updateSelection(selection)
            }
    }

    SelectionUI(
        onSelectionChange = { localSelection = it }
    )
}`
    },
  ],

  bestPractices: [
    {
      title: '配合 distinctUntilChanged 避免重复发射',
      description: 'snapshotFlow 在读取的任何 State 变化时都会发射，使用 distinctUntilChanged 过滤相同值',
      goodExample: `snapshotFlow { state.value }
    .distinctUntilChanged()  // 只在值真正变化时发射
    .collect { }`,
      badExample: `snapshotFlow { state.value }
    .collect { }  // 可能收到重复的相同值`
    },
    {
      title: '使用 Flow 操作符处理',
      description: 'snapshotFlow 返回标准 Flow，可以使用所有 Flow 操作符',
      goodExample: `snapshotFlow { searchQuery }
    .debounce(300)
    .filter { it.length >= 3 }
    .distinctUntilChanged()
    .collect { query ->
        search(query)
    }`,
    },
    {
      title: 'snapshotFlow vs derivedStateOf',
      description: 'derivedStateOf 用于计算派生状态，snapshotFlow 用于在协程中观察状态',
      goodExample: `// 派生状态：使用 derivedStateOf
val isValid by remember {
    derivedStateOf { username.length >= 3 }
}

// 协程观察：使用 snapshotFlow
LaunchedEffect(Unit) {
    snapshotFlow { username }
        .collect { saveToPreferences(it) }
}`,
    },
    {
      title: '在 LaunchedEffect 中使用',
      description: 'snapshotFlow 应该在 effect 中收集，不要在普通 Composable 代码中',
      goodExample: `LaunchedEffect(Unit) {
    snapshotFlow { state.value }
        .collect { log(it) }
}`,
      badExample: `// 错误：在 Composable 中直接收集
snapshotFlow { state.value }
    .collect { log(it) }  // 阻塞组合`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'snapshotFlow 是 collectAsState 的反向操作',
      content: 'collectAsState 将 Flow 转为 State，snapshotFlow 将 State 转为 Flow。两者配合可以在 Compose 和协程之间双向转换'
    },
    {
      type: 'info',
      title: 'snapshotFlow 自动追踪读取的 State',
      content: 'lambda 中读取的任何 State 都会被自动追踪，任一 State 变化时都会发射新值。不需要手动指定依赖'
    },
    {
      type: 'warning',
      title: 'snapshotFlow 可能频繁发射',
      content: '如果 lambda 中读取了多个 State，任何一个变化都会发射。使用 distinctUntilChanged 和其他 Flow 操作符控制发射频率'
    },
    {
      type: 'info',
      title: '适合桥接 Compose 和协程世界',
      content: 'snapshotFlow 让你可以在协程中使用 Flow 的强大操作符（debounce、filter、map 等）处理 Compose 状态'
    },
    {
      type: 'error',
      title: '不要在 snapshotFlow 中修改 State',
      content: '在 snapshotFlow 的 lambda 中修改 State 会导致无限循环。lambda 应该是只读的'
    },
    {
      type: 'info',
      title: 'snapshotFlow 返回冷流',
      content: 'snapshotFlow 返回冷 Flow，每次收集都会重新开始观察。如需热流，使用 shareIn 或 stateIn 转换'
    },
  ],

  relatedComponents: ['collect-as-state', 'derived-state-of', 'launched-effect', 'remember'],
  since: '1.0.0',
}
