import type { ComponentEntry } from '../../types'

export const collectAsStateComponent: ComponentEntry = {
  id: 'collect-as-state',
  name: 'collectAsState',
  category: 'State',
  description: '将 Kotlin Flow / StateFlow / SharedFlow 收集为 Compose State，Flow 发射新值时自动触发重组。是连接 ViewModel 和 Compose UI 的标准方式。',
  tags: ['state', 'flow', 'stateflow', 'viewmodel', 'collect', 'reactive'],
  params: [
    { name: 'initial', type: 'T', default: '（StateFlow 使用 value）', description: '初始值，StateFlow 自动使用当前值' },
    { name: 'context', type: 'CoroutineContext', default: 'EmptyCoroutineContext', description: '收集协程上下文，默认在主线程' },
  ],
  examples: [
    {
      title: '收集 ViewModel StateFlow',
      code: `// ViewModel
class CounterViewModel : ViewModel() {
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()

    fun increment() {
        _count.value++
    }
}

// Composable
@Composable
fun CounterScreen(viewModel: CounterViewModel = viewModel()) {
    val count by viewModel.count.collectAsState()

    Column {
        Text("计数：" + count)
        Button(onClick = { viewModel.increment() }) {
            Text("+1")
        }
    }
}`,
    },
    {
      title: '收集普通 Flow（带初始值）',
      code: `// 普通 Flow 需要提供初始值
val timerFlow = flow {
    var i = 0
    while (true) {
        emit(i++)
        delay(1000)
    }
}

@Composable
fun Timer() {
    val seconds by timerFlow.collectAsState(initial = 0)
    Text("已运行：" + seconds + "s")
}`,
    },
    {
      title: '收集多个 Flow',
      code: `@Composable
fun UserDashboard(viewModel: DashboardViewModel = viewModel()) {
    val userName by viewModel.userName.collectAsState()
    val notifications by viewModel.notifications.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()

    if (isLoading) {
        CircularProgressIndicator()
    } else {
        Column {
            Text("欢迎，" + userName)
            Text("通知：" + notifications.size + " 条")
        }
    }
}`,
    },
    {
      title: '收集 SharedFlow',
      code: `class EventViewModel : ViewModel() {
    private val _events = MutableSharedFlow<Event>()
    val events: SharedFlow<Event> = _events.asSharedFlow()

    fun sendEvent(event: Event) {
        viewModelScope.launch {
            _events.emit(event)
        }
    }
}

@Composable
fun EventListener(viewModel: EventViewModel = viewModel()) {
    val event by viewModel.events.collectAsState(initial = Event.None)

    when (event) {
        is Event.ShowToast -> {
            Toast.makeText(LocalContext.current, event.message, LENGTH_SHORT).show()
        }
        Event.None -> { }
    }
}`,
    },
    {
      title: '使用 lifecycle-aware 收集',
      code: `@Composable
fun LifecycleAwareCollection(viewModel: MyViewModel = viewModel()) {
    val lifecycleOwner = LocalLifecycleOwner.current

    // 使用 collectAsStateWithLifecycle 在后台时停止收集
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    when (uiState) {
        is UiState.Loading -> LoadingView()
        is UiState.Success -> ContentView(uiState.data)
        is UiState.Error -> ErrorView(uiState.error)
    }
}`,
    },
    {
      title: '转换 Flow',
      code: `@Composable
fun FilteredList(viewModel: ListViewModel = viewModel()) {
    val allItems by viewModel.items.collectAsState()
    val searchQuery by viewModel.searchQuery.collectAsState()

    val filteredItems = remember(allItems, searchQuery) {
        allItems.filter { it.name.contains(searchQuery, ignoreCase = true) }
    }

    LazyColumn {
        items(filteredItems) { item ->
            ItemCard(item)
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: 'MVVM 架构数据绑定',
      description: '标准的 ViewModel + StateFlow + Compose 架构',
      code: `// ViewModel 层
class ProductListViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<ProductUiState>(ProductUiState.Loading)
    val uiState: StateFlow<ProductUiState> = _uiState.asStateFlow()

    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery.asStateFlow()

    init {
        loadProducts()
    }

    fun search(query: String) {
        _searchQuery.value = query
        loadProducts()
    }

    private fun loadProducts() {
        viewModelScope.launch {
            _uiState.value = ProductUiState.Loading
            try {
                val products = repository.searchProducts(_searchQuery.value)
                _uiState.value = ProductUiState.Success(products)
            } catch (e: Exception) {
                _uiState.value = ProductUiState.Error(e.message)
            }
        }
    }
}

// UI 层
@Composable
fun ProductListScreen(viewModel: ProductListViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsState()
    val searchQuery by viewModel.searchQuery.collectAsState()

    Column {
        SearchBar(
            query = searchQuery,
            onQueryChange = { viewModel.search(it) }
        )

        when (val state = uiState) {
            is ProductUiState.Loading -> {
                Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    CircularProgressIndicator()
                }
            }
            is ProductUiState.Success -> {
                LazyColumn {
                    items(state.products) { product ->
                        ProductCard(product)
                    }
                }
            }
            is ProductUiState.Error -> {
                ErrorMessage(state.message)
            }
        }
    }
}`
    },
    {
      title: 'Repository Flow 到 UI',
      description: '从 Repository 层的 Flow 直接到 UI 层',
      code: `// Repository 层
class ChatRepository {
    fun observeMessages(chatId: String): Flow<List<Message>> =
        database.messageDao()
            .observeMessages(chatId)
            .map { entities -> entities.map { it.toDomain() } }
}

// UI 层（无需 ViewModel）
@Composable
fun ChatScreen(chatId: String, repository: ChatRepository = get()) {
    val messages by remember(chatId) {
        repository.observeMessages(chatId)
    }.collectAsState(initial = emptyList())

    LazyColumn {
        items(messages, key = { it.id }) { message ->
            MessageBubble(message)
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: 'StateFlow 不需要 initial 参数',
      description: 'StateFlow 有初始值，collectAsState 会自动使用',
      goodExample: `// StateFlow 自动使用 value 作为初始值
val state by stateFlow.collectAsState()`,
      badExample: `// 不需要手动指定 initial
val state by stateFlow.collectAsState(initial = stateFlow.value)`
    },
    {
      title: '使用委托属性简化代码',
      description: '使用 by 委托避免 .value 访问',
      goodExample: `val count by viewModel.count.collectAsState()
Text("Count: " + count)  // 直接使用`,
      badExample: `val countState = viewModel.count.collectAsState()
Text("Count: " + countState.value)  // 需要 .value`
    },
    {
      title: 'collectAsState vs produceState',
      description: '已有 Flow 使用 collectAsState，自定义逻辑使用 produceState',
      goodExample: `// 已有 Flow：使用 collectAsState
val items by repository.itemsFlow.collectAsState(initial = emptyList())

// 自定义逻辑：使用 produceState
val data by produceState(initialValue = null) {
    value = fetchAndTransform()
}`,
    },
    {
      title: '后台时停止收集使用 collectAsStateWithLifecycle',
      description: '避免在应用后台时继续收集数据',
      goodExample: `// 应用后台时自动停止收集，节省资源
val uiState by viewModel.uiState.collectAsStateWithLifecycle()`,
      badExample: `// 应用后台时仍在收集，浪费资源
val uiState by viewModel.uiState.collectAsState()`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'collectAsState 自动管理生命周期',
      content: '当 Composable 离开组合树时，collectAsState 自动停止收集 Flow，无需手动取消'
    },
    {
      type: 'tip',
      title: 'StateFlow vs Flow',
      content: 'StateFlow 有当前值，collectAsState 会立即返回；普通 Flow 需要提供 initial 参数作为初始值，直到 Flow 发射第一个值'
    },
    {
      type: 'tip',
      title: '使用 collectAsStateWithLifecycle 优化性能',
      content: 'collectAsStateWithLifecycle 在应用后台时自动停止收集，前台时恢复，避免不必要的资源消耗。需要添加 lifecycle-runtime-compose 依赖'
    },
    {
      type: 'warning',
      title: 'Flow 在主线程收集',
      content: 'collectAsState 默认在主线程收集 Flow。耗时操作应在 Flow 的上游使用 flowOn(Dispatchers.IO) 切换线程'
    },
    {
      type: 'tip',
      title: 'SharedFlow 需要初始值',
      content: 'SharedFlow 没有当前值，collectAsState 必须提供 initial 参数。如果不需要初始状态，考虑使用 LaunchedEffect + collect'
    },
    {
      type: 'danger',
      title: '避免在 Composable 中创建 Flow',
      content: '不要在 Composable 中直接创建 Flow 并收集，每次重组都会重新创建。Flow 应该来自 ViewModel 或使用 remember 包裹'
    },
  ],

  relatedComponents: ['produce-state', 'launched-effect', 'remember', 'derived-state-of'],
  since: '1.0.0',
}
