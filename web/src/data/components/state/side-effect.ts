import type { ComponentEntry } from '../../types'

export const sideEffectComponent: ComponentEntry = {
  id: 'side-effect',
  demo: { id: 'side-effect', sourceFile: 'SideEffectDemo.kt' },
  name: 'SideEffect',
  category: 'State',
  description: '每次重组成功后同步执行副作用，用于将 Compose 状态同步到非 Compose 管理的对象（如 Analytics、View 系统）。与 LaunchedEffect 不同，SideEffect 在主线程同步执行，不启动协程。',
  tags: ['effect', 'side-effect', 'sync', 'analytics', '同步副作用', 'recomposition'],
  params: [
    { name: 'effect', type: '() -> Unit', required: true, description: '每次重组成功后执行的副作用块，在主线程同步执行' },
  ],
  examples: [
    {
      title: '同步状态到 Analytics',
      code: `@Composable
fun ScreenTracker(screenName: String, userId: String?) {
    SideEffect {
        // 每次 screenName 或 userId 变化导致重组时，同步到 Analytics
        analytics.setCurrentScreen(screenName)
        userId?.let { analytics.setUserId(it) }
    }

    // 页面内容
    Text("当前页面: " + screenName)
}`,
    },
    {
      title: '同步到非 Compose View',
      code: `@Composable
fun MapView(
    mapController: MapController,
    cameraPosition: CameraPosition,
    markers: List<Marker>
) {
    SideEffect {
        // 将 Compose 状态同步到传统 View 系统的 MapController
        mapController.moveCamera(cameraPosition)
        mapController.updateMarkers(markers)
    }

    AndroidView(factory = { mapController.view })
}`,
    },
    {
      title: '日志记录',
      code: `@Composable
fun DebuggableContent(state: UiState) {
    SideEffect {
        // 每次重组时记录当前状态，便于调试
        Log.d("Compose", "State changed: " + state.toString())
    }

    when (state) {
        is UiState.Loading -> LoadingView()
        is UiState.Success -> ContentView(state.data)
        is UiState.Error -> ErrorView(state.message)
    }
}`,
    },
    {
      title: '同步选中状态到外部系统',
      code: `@Composable
fun SelectableItem(
    item: Item,
    isSelected: Boolean,
    selectionManager: SelectionManager
) {
    SideEffect {
        // 将 Compose 的选中状态同步到外部选择管理器
        if (isSelected) {
            selectionManager.select(item.id)
        } else {
            selectionManager.deselect(item.id)
        }
    }

    Surface(
        color = if (isSelected) MaterialTheme.colorScheme.primaryContainer
                else MaterialTheme.colorScheme.surface
    ) {
        Text(item.name)
    }
}`,
    },
    {
      title: '通知外部监听器',
      code: `@Composable
fun ProgressTracker(
    progress: Float,
    onProgressChanged: (Float) -> Unit
) {
    SideEffect {
        // 每次进度变化时通知外部监听器
        onProgressChanged(progress)
    }

    LinearProgressIndicator(
        progress = progress,
        modifier = Modifier.fillMaxWidth()
    )
}`,
    },
    {
      title: '发布状态变化事件',
      code: `@Composable
fun FormField(
    value: String,
    isValid: Boolean,
    eventBus: EventBus
) {
    SideEffect {
        // 将验证结果发布到事件总线
        eventBus.post(ValidationEvent(value, isValid))
    }

    TextField(
        value = value,
        onValueChange = { },
        isError = !isValid
    )
}`,
    },
  ],

  useCases: [
    {
      title: '混合 Compose 和 View 系统',
      description: '在使用 AndroidView 时，将 Compose 状态同步到传统 View',
      code: `@Composable
fun CustomVideoPlayer(
    videoUrl: String,
    isPlaying: Boolean,
    volume: Float
) {
    val playerView = remember { PlayerView(LocalContext.current) }
    val player = remember { ExoPlayer.Builder(LocalContext.current).build() }

    SideEffect {
        // 同步所有状态到原生播放器
        player.setMediaItem(MediaItem.fromUri(videoUrl))
        if (isPlaying) player.play() else player.pause()
        player.volume = volume
    }

    DisposableEffect(Unit) {
        playerView.player = player
        onDispose {
            player.release()
        }
    }

    AndroidView(factory = { playerView })
}`
    },
    {
      title: '多页面状态同步',
      description: '跨页面追踪用户行为，同步到分析系统',
      code: `@Composable
fun AnalyticsTracker(
    currentRoute: String,
    userProperties: Map<String, String>
) {
    val analytics = LocalAnalytics.current

    SideEffect {
        // 页面切换时自动上报
        analytics.logScreen(currentRoute)

        // 同步用户属性
        userProperties.forEach { (key, value) ->
            analytics.setUserProperty(key, value)
        }
    }
}

@Composable
fun App() {
    val navController = rememberNavController()
    val currentRoute by navController.currentBackStackEntryAsState()

    AnalyticsTracker(
        currentRoute = currentRoute?.destination?.route ?: "unknown",
        userProperties = mapOf(
            "theme" to "dark",
            "language" to "zh-CN"
        )
    )

    NavHost(navController, startDestination = "home") {
        composable("home") { HomeScreen() }
        composable("profile") { ProfileScreen() }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: 'SideEffect vs LaunchedEffect',
      description: 'SideEffect 用于同步副作用，LaunchedEffect 用于异步操作',
      goodExample: `// 同步到外部对象：使用 SideEffect
SideEffect {
    externalController.updateState(value)
}

// 网络请求：使用 LaunchedEffect
LaunchedEffect(key) {
    val data = fetchData()
}`,
      badExample: `// 错误：在 SideEffect 中执行耗时操作会阻塞 UI
SideEffect {
    Thread.sleep(1000)  // 阻塞主线程！
    externalController.updateState(value)
}`
    },
    {
      title: 'SideEffect 没有依赖键',
      description: 'SideEffect 每次重组都会执行，确保副作用是幂等的',
      goodExample: `SideEffect {
    // 幂等操作：多次执行结果相同
    analytics.setCurrentScreen(screenName)
    mapController.moveTo(position)
}`,
      badExample: `SideEffect {
    // 非幂等操作：每次重组都会累加
    counter++  // 重组会导致计数错误
    eventBus.post(Event())  // 重组会发送重复事件
}`
    },
    {
      title: '避免在 SideEffect 中执行耗时操作',
      description: 'SideEffect 在主线程同步执行，耗时操作会阻塞 UI',
      goodExample: `// 只执行快速的同步操作
SideEffect {
    logger.log("State: " + state)
    analytics.track(event)
}`,
      badExample: `// 错误：执行耗时操作
SideEffect {
    database.insert(data)  // 可能阻塞
    writeToFile(content)   // 可能阻塞
}`
    },
    {
      title: '用于发布而非订阅',
      description: 'SideEffect 用于将状态推送到外部，不用于订阅外部变化',
      goodExample: `// 发布状态变化
SideEffect {
    externalSystem.notifyStateChange(state)
}

// 订阅外部变化：使用 DisposableEffect
DisposableEffect(Unit) {
    val listener = externalSystem.addListener { }
    onDispose { listener.remove() }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'SideEffect 在每次重组后执行',
      content: 'SideEffect 没有依赖键，每次成功重组后都会执行。如果只想在特定值变化时执行，应该使用 LaunchedEffect'
    },
    {
      type: 'warning',
      title: 'SideEffect 在主线程执行',
      content: 'SideEffect 是同步的，在主线程执行。不要在其中执行耗时操作、网络请求或数据库操作，这会阻塞 UI'
    },
    {
      type: 'info',
      title: '适合同步到非 Compose 系统',
      content: 'SideEffect 的典型用途是将 Compose 状态同步到外部系统：Analytics、日志、传统 View、事件总线等'
    },
    {
      type: 'info',
      title: '副作用应该是幂等的',
      content: '因为 SideEffect 可能在同一状态下执行多次（重组），副作用应该是幂等的，即多次执行产生相同结果'
    },
    {
      type: 'error',
      title: '不要在 SideEffect 中修改 State',
      content: '在 SideEffect 中修改 Compose State 会导致无限重组循环。SideEffect 用于单向同步到外部，不要反向影响 Compose'
    },
    {
      type: 'warning',
      title: '重组可能被跳过',
      content: '如果组件的输入未改变，Compose 可能跳过重组，SideEffect 也不会执行。不要依赖 SideEffect 在每一帧都执行'
    },
  ],

  relatedComponents: ['launched-effect', 'disposable-effect', 'remember', 'derived-state-of'],
  since: '1.0.0',
}
