import type { ComponentEntry } from '../../types'

export const pullToRefreshComponent: ComponentEntry = {
  id: 'pull-to-refresh',
  name: 'PullToRefreshBox',
  category: 'Feedback',
  description: '下拉刷新容器，包裹可滚动内容，下拉时显示刷新指示器并触发刷新回调，符合 Material3 规范。',
  tags: ['pull-to-refresh', 'refresh', 'swipe', 'list', '下拉刷新'],
  params: [
    { name: 'isRefreshing', type: 'Boolean', required: true, description: '是否正在刷新，控制指示器显示' },
    { name: 'onRefresh', type: '() -> Unit', required: true, description: '下拉触发刷新的回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'state', type: 'PullToRefreshState', default: 'rememberPullToRefreshState()', description: '刷新状态' },
    { name: 'indicator', type: '@Composable BoxScope.() -> Unit', default: 'PullToRefreshDefaults.Indicator', description: '自定义刷新指示器' },
    { name: 'content', type: '@Composable BoxScope.() -> Unit', required: true, description: '可滚动的内容区域' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var isRefreshing by remember { mutableStateOf(false) }
val scope = rememberCoroutineScope()
val items = remember { mutableStateListOf<String>() }

LaunchedEffect(Unit) {
    items.addAll(List(20) { "项目 $it" })
}

PullToRefreshBox(
    isRefreshing = isRefreshing,
    onRefresh = {
        isRefreshing = true
        scope.launch {
            delay(1500)  // 模拟网络请求
            items.clear()
            items.addAll(List(20) { "刷新后的项 $it" })
            isRefreshing = false
        }
    }
) {
    LazyColumn(modifier = Modifier.fillMaxSize()) {
        items(items) { item ->
            ListItem(headlineContent = { Text(item) })
        }
    }
}`,
    },
    {
      title: '配合 ViewModel',
      code: `val uiState by viewModel.uiState.collectAsState()

PullToRefreshBox(
    isRefreshing = uiState.isRefreshing,
    onRefresh = { viewModel.refresh() }
) {
    when {
        uiState.error != null -> {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("加载失败")
                    Button(onClick = { viewModel.refresh() }) {
                        Text("重试")
                    }
                }
            }
        }
        uiState.items.isEmpty() -> {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Text("暂无数据")
            }
        }
        else -> {
            LazyColumn(modifier = Modifier.fillMaxSize()) {
                items(uiState.items) { item ->
                    ListItem(headlineContent = { Text(item.title) })
                }
            }
        }
    }
}`,
    },
    {
      title: '自定义刷新指示器',
      code: `var isRefreshing by remember { mutableStateOf(false) }
val pullState = rememberPullToRefreshState()
val scope = rememberCoroutineScope()

PullToRefreshBox(
    isRefreshing = isRefreshing,
    onRefresh = {
        isRefreshing = true
        scope.launch {
            delay(2000)
            isRefreshing = false
        }
    },
    state = pullState,
    indicator = {
        Box(
            modifier = Modifier
                .align(Alignment.TopCenter)
                .padding(top = 16.dp)
        ) {
            if (isRefreshing) {
                CircularProgressIndicator(modifier = Modifier.size(32.dp))
            } else if (pullState.progress > 0f) {
                CircularProgressIndicator(
                    progress = { pullState.progress },
                    modifier = Modifier.size(32.dp)
                )
            }
        }
    }
) {
    LazyColumn(modifier = Modifier.fillMaxSize()) {
        items(50) { Text("项目 $it", modifier = Modifier.padding(16.dp)) }
    }
}`,
    },
    {
      title: '多 Tab 场景',
      code: `var selectedTab by remember { mutableIntStateOf(0) }
var isRefreshing by remember { mutableStateOf(false) }
val tabs = listOf("推荐", "关注", "热门")
val scope = rememberCoroutineScope()

Column(modifier = Modifier.fillMaxSize()) {
    TabRow(selectedTabIndex = selectedTab) {
        tabs.forEachIndexed { index, title ->
            Tab(
                selected = selectedTab == index,
                onClick = { selectedTab = index },
                text = { Text(title) }
            )
        }
    }

    PullToRefreshBox(
        isRefreshing = isRefreshing,
        onRefresh = {
            isRefreshing = true
            scope.launch {
                delay(1500)
                isRefreshing = false
            }
        },
        modifier = Modifier.fillMaxSize()
    ) {
        LazyColumn(modifier = Modifier.fillMaxSize()) {
            items(30) { index ->
                ListItem(
                    headlineContent = { Text("Tab $selectedTab - 项目 $index") }
                )
            }
        }
    }
}`,
    },
    {
      title: '带加载更多',
      code: `var isRefreshing by remember { mutableStateOf(false) }
var isLoadingMore by remember { mutableStateOf(false) }
val items = remember { mutableStateListOf<String>() }
val listState = rememberLazyListState()
val scope = rememberCoroutineScope()

LaunchedEffect(Unit) {
    items.addAll(List(20) { "项目 $it" })
}

LaunchedEffect(listState) {
    snapshotFlow { listState.layoutInfo.visibleItemsInfo.lastOrNull()?.index }
        .collect { lastIndex ->
            if (lastIndex != null && lastIndex >= items.size - 3 && !isLoadingMore) {
                isLoadingMore = true
                delay(1000)
                items.addAll(List(10) { "加载更多项" })
                isLoadingMore = false
            }
        }
}

PullToRefreshBox(
    isRefreshing = isRefreshing,
    onRefresh = {
        isRefreshing = true
        scope.launch {
            delay(1500)
            items.clear()
            items.addAll(List(20) { "刷新后 $it" })
            isRefreshing = false
        }
    }
) {
    LazyColumn(state = listState, modifier = Modifier.fillMaxSize()) {
        items(items) { item ->
            ListItem(headlineContent = { Text(item) })
        }
        if (isLoadingMore) {
            item {
                Box(
                    modifier = Modifier.fillMaxWidth().padding(16.dp),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator(modifier = Modifier.size(24.dp))
                }
            }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '新闻列表刷新',
      description: '典型的新闻 Feed 流下拉刷新场景',
      code: `@Composable
fun NewsFeedScreen(viewModel: NewsViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsState()

    Scaffold(
        topBar = { TopAppBar(title = { Text("新闻") }) }
    ) { padding ->
        PullToRefreshBox(
            isRefreshing = uiState.isRefreshing,
            onRefresh = { viewModel.refreshNews() },
            modifier = Modifier.padding(padding)
        ) {
            LazyColumn(modifier = Modifier.fillMaxSize()) {
                items(uiState.news, key = { it.id }) { newsItem ->
                    Card(
                        onClick = { /* 跳转详情 */ },
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp, vertical = 8.dp)
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Text(
                                text = newsItem.title,
                                style = MaterialTheme.typography.titleMedium,
                                maxLines = 2
                            )
                            Spacer(Modifier.height(8.dp))
                            Row {
                                Text(
                                    text = newsItem.source,
                                    style = MaterialTheme.typography.bodySmall
                                )
                                Text(" · ")
                                Text(
                                    text = newsItem.timeAgo,
                                    style = MaterialTheme.typography.bodySmall
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}`,
    },
    {
      title: '社交动态刷新',
      description: '社交应用的动态流刷新',
      code: `@Composable
fun FeedScreen(viewModel: FeedViewModel = viewModel()) {
    val feeds by viewModel.feeds.collectAsState()
    val isRefreshing by viewModel.isRefreshing.collectAsState()
    var showNewPosts by remember { mutableStateOf(false) }

    Scaffold { padding ->
        Box(modifier = Modifier.padding(padding)) {
            PullToRefreshBox(
                isRefreshing = isRefreshing,
                onRefresh = { viewModel.refreshFeeds() }
            ) {
                LazyColumn(modifier = Modifier.fillMaxSize()) {
                    items(feeds, key = { it.id }) { feed ->
                        FeedCard(
                            feed = feed,
                            onLike = { viewModel.likeFeed(feed.id) }
                        )
                    }
                }
            }

            if (showNewPosts) {
                Surface(
                    onClick = {
                        viewModel.refreshFeeds()
                        showNewPosts = false
                    },
                    modifier = Modifier
                        .align(Alignment.TopCenter)
                        .padding(top = 8.dp),
                    shape = RoundedCornerShape(20.dp),
                    shadowElevation = 4.dp
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(Icons.Default.ArrowUpward, null, modifier = Modifier.size(16.dp))
                        Spacer(Modifier.width(8.dp))
                        Text("有新动态", style = MaterialTheme.typography.bodySmall)
                    }
                }
            }
        }
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '使用 ViewModel 管理刷新状态',
      description: '将 isRefreshing 状态和刷新逻辑放在 ViewModel 中',
      goodExample: `class MyViewModel : ViewModel() {
    private val _isRefreshing = MutableStateFlow(false)
    val isRefreshing = _isRefreshing.asStateFlow()

    fun refresh() {
        viewModelScope.launch {
            _isRefreshing.value = true
            repository.fetchData()
            _isRefreshing.value = false
        }
    }
}`,
    },
    {
      title: '错误处理要友好',
      description: '刷新失败时显示提示并提供重试',
      goodExample: `onRefresh = {
    scope.launch {
        try {
            fetchData()
        } catch (e: Exception) {
            showSnackbar("刷新失败")
        }
    }
}`,
    },
    {
      title: '避免重复刷新',
      description: '正在刷新时禁止再次触发',
      goodExample: `fun refresh() {
    if (_isRefreshing.value) return
    _isRefreshing.value = true
    // 执行刷新
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'PullToRefreshBox 是 Material3 组件',
      content: '需要依赖 androidx.compose.material3，替代了旧的 SwipeRefresh',
    },
    {
      type: 'info',
      title: 'isRefreshing 控制指示器',
      content: 'isRefreshing = true 时显示刷新动画，false 时隐藏',
    },
    {
      type: 'tip',
      title: '适合垂直滚动内容',
      content: 'LazyColumn、Column.verticalScroll 等垂直滚动容器都支持下拉刷新',
    },
    {
      type: 'tip',
      title: '可以自定义刷新指示器',
      content: '通过 indicator 参数完全自定义刷新指示器的样式',
    },
    {
      type: 'warning',
      title: '不要忘记设置 isRefreshing = false',
      content: '刷新完成后必须将 isRefreshing 设置为 false',
    },
    {
      type: 'warning',
      title: '避免在嵌套滚动中使用',
      content: '不要在已经滚动的容器内嵌套 PullToRefreshBox',
    },
    {
      type: 'danger',
      title: '注意内存泄漏',
      content: '确保使用 viewModelScope 或正确取消协程',
    },
  ],

  relatedComponents: ['lazy-column', 'swipe-to-dismiss'],
  since: '1.0.0',
}
