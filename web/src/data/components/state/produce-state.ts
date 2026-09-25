import type { ComponentEntry } from '../../types'

export const produceStateComponent: ComponentEntry = {
  id: 'produce-state',
  demo: { id: 'produce-state', sourceFile: 'ProduceStateDemo.kt' },
  name: 'produceState',
  category: 'State',
  description: '将非 Compose 的异步数据源（Flow、suspend 函数、回调）转换为 Compose State，在协程中更新值。适合将外部数据源适配为 Compose 可观察状态。',
  tags: ['state', 'async', 'coroutine', 'flow', '异步状态', 'data-source'],
  params: [
    { name: 'initialValue', type: 'T', required: true, description: '初始值，在异步数据到达前显示' },
    { name: 'keys', type: 'vararg Any?', default: '（无）', description: '依赖键，键变化时取消旧协程并重新启动' },
    { name: 'producer', type: 'suspend ProduceStateScope<T>.() -> Unit', required: true, description: '协程块，通过 value = ... 更新状态' },
  ],
  examples: [
    {
      title: '加载网络数据',
      code: `@Composable
fun UserProfile(userId: String) {
    val uiState by produceState<UiState<User>>(
        initialValue = UiState.Loading,
        userId
    ) {
        value = try {
            val user = userRepository.getUser(userId)
            UiState.Success(user)
        } catch (e: Exception) {
            UiState.Error(e.message ?: "Unknown error")
        }
    }

    when (val state = uiState) {
        is UiState.Loading -> CircularProgressIndicator()
        is UiState.Success -> UserContent(state.data)
        is UiState.Error -> Text("错误: " + state.message)
    }
}`,
    },
    {
      title: '监听回调 API',
      code: `@Composable
fun LocationDisplay() {
    val location by produceState<Location?>(initialValue = null) {
        val locationManager = context.getSystemService<LocationManager>()!!

        val listener = LocationListener { loc ->
            value = loc  // 回调中更新状态
        }

        locationManager.requestLocationUpdates(
            LocationManager.GPS_PROVIDER,
            1000L,
            10f,
            listener
        )

        awaitDispose {
            locationManager.removeUpdates(listener)
        }
    }

    location?.let {
        Text("位置: " + it.latitude + ", " + it.longitude)
    } ?: Text("获取位置中...")
}`,
    },
    {
      title: '收集 Flow',
      code: `@Composable
fun TimerDisplay() {
    val seconds by produceState(initialValue = 0) {
        // 将 Flow 转换为 State
        flow {
            var count = 0
            while (true) {
                emit(count++)
                delay(1000)
            }
        }.collect {
            value = it
        }
    }

    Text("运行时间: " + seconds + "秒")
}`,
    },
    {
      title: '轮询数据',
      code: `@Composable
fun PollingData(interval: Long) {
    val data by produceState<List<Item>>(
        initialValue = emptyList(),
        interval
    ) {
        while (true) {
            val items = repository.fetchLatestItems()
            value = items
            delay(interval)
        }
    }

    LazyColumn {
        items(data) { item ->
            Text(item.title)
        }
    }
}`,
    },
    {
      title: '依赖键变化时重新加载',
      code: `@Composable
fun SearchResults(query: String, category: String) {
    val results by produceState(
        initialValue = emptyList<Item>(),
        query,
        category
    ) {
        // query 或 category 变化时，旧协程自动取消，重新搜索
        if (query.isNotBlank()) {
            value = repository.search(query, category)
        } else {
            value = emptyList()
        }
    }

    if (results.isEmpty()) {
        Text("无搜索结果")
    } else {
        LazyColumn {
            items(results) { item ->
                ItemCard(item)
            }
        }
    }
}`,
    },
    {
      title: '组合多个数据源',
      code: `@Composable
fun CombinedData(userId: String) {
    val combinedState by produceState<CombinedData?>(
        initialValue = null,
        userId
    ) {
        // 并发加载多个数据源
        coroutineScope {
            val profile = async { userRepository.getProfile(userId) }
            val posts = async { postRepository.getUserPosts(userId) }
            val friends = async { friendRepository.getFriends(userId) }

            value = CombinedData(
                profile = profile.await(),
                posts = posts.await(),
                friends = friends.await()
            )
        }
    }

    combinedState?.let { data ->
        Column {
            ProfileHeader(data.profile)
            PostsList(data.posts)
            FriendsList(data.friends)
        }
    } ?: CircularProgressIndicator()
}`,
    },
  ],

  useCases: [
    {
      title: '数据库实时查询',
      description: '监听数据库变化，自动更新 UI',
      code: `@Composable
fun TodoList(category: String) {
    val todos by produceState<List<Todo>>(
        initialValue = emptyList(),
        category
    ) {
        // 收集 Room 的 Flow 查询结果
        database.todoDao()
            .getTodosByCategory(category)
            .collect { todoList ->
                value = todoList
            }
    }

    LazyColumn {
        items(todos, key = { it.id }) { todo ->
            TodoItem(todo)
        }
    }
}`
    },
    {
      title: 'WebSocket 消息流',
      description: '将 WebSocket 消息转换为 Compose State',
      code: `@Composable
fun LiveChatMessages(chatId: String) {
    val messages by produceState<List<Message>>(
        initialValue = emptyList(),
        chatId
    ) {
        val socket = webSocketClient.connect(chatId)

        try {
            socket.messages.collect { message ->
                value = value + message
            }
        } finally {
            socket.close()
        }

        awaitDispose {
            socket.close()
        }
    }

    LazyColumn {
        items(messages) { message ->
            MessageBubble(message)
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 awaitDispose 清理资源',
      description: 'produceState 提供 awaitDispose 用于在协程取消时清理资源',
      goodExample: `produceState(initialValue = null) {
    val listener = registerListener()

    awaitDispose {
        listener.unregister()
    }
}`,
      badExample: `produceState(initialValue = null) {
    val listener = registerListener()
    // 缺少清理逻辑，导致内存泄漏
}`
    },
    {
      title: 'produceState vs collectAsState',
      description: '已有 Flow 时使用 collectAsState，需要自定义逻辑时使用 produceState',
      goodExample: `// 已有 StateFlow：使用 collectAsState
val state by viewModel.uiState.collectAsState()

// 需要自定义逻辑：使用 produceState
val data by produceState(initialValue = null) {
    value = fetchData()
}`,
    },
    {
      title: '依赖键应包含所有影响数据加载的变量',
      description: '确保数据在正确的时机重新加载',
      goodExample: `produceState(
    initialValue = emptyList(),
    userId,
    filter,
    sortOrder
) {
    value = repository.fetchData(userId, filter, sortOrder)
}`,
      badExample: `produceState(initialValue = emptyList(), userId) {
    // filter 变化时不会重新加载，使用了过期的 filter
    value = repository.fetchData(userId, filter, sortOrder)
}`
    },
    {
      title: '提供有意义的初始值',
      description: '初始值应该代表加载状态，避免使用 null 导致空指针',
      goodExample: `// 使用密封类表示加载状态
val uiState by produceState<UiState>(UiState.Loading) {
    value = UiState.Success(fetchData())
}

// 或使用空集合
val items by produceState(emptyList<Item>()) {
    value = fetchItems()
}`,
      badExample: `// 使用 null 需要到处判空
val items by produceState<List<Item>?>(null) {
    value = fetchItems()
}
items?.forEach { }  // 需要判空`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'produceState 自动管理生命周期',
      content: '当组件离开组合或依赖键变化时，produceState 自动取消协程。使用 awaitDispose 在取消时执行清理逻辑'
    },
    {
      type: 'tip',
      title: 'produceState 适合适配外部数据源',
      content: 'produceState 是将非 Compose 数据源（回调 API、轮询、WebSocket）转换为 Compose State 的标准方式'
    },
    {
      type: 'tip',
      title: '通过 value 属性更新状态',
      content: 'produceState 提供 ProduceStateScope，可以在协程中通过 value = newValue 更新状态，触发重组'
    },
    {
      type: 'warning',
      title: 'produceState 在主线程执行',
      content: 'produceState 的协程默认在主线程。耗时操作使用 withContext(Dispatchers.IO) 切换到后台线程'
    },
    {
      type: 'tip',
      title: 'awaitDispose vs onDispose',
      content: 'produceState 使用 awaitDispose（挂起函数），DisposableEffect 使用 onDispose（同步）。awaitDispose 会等待协程取消后执行'
    },
    {
      type: 'danger',
      title: '避免在 producer 中捕获并忽略 CancellationException',
      content: 'catch (e: Exception) 会捕获 CancellationException，导致协程无法正常取消。应使用 catch (e: Exception) { if (e is CancellationException) throw e }'
    },
  ],

  relatedComponents: ['collect-as-state', 'launched-effect', 'remember', 'disposable-effect'],
  since: '1.0.0',
}
