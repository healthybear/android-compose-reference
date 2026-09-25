import type { ComponentEntry } from '../../types'

export const disposableEffectComponent: ComponentEntry = {
  id: 'disposable-effect',
  demo: { id: 'disposable-effect', sourceFile: 'DisposableEffectDemo.kt' },
  name: 'DisposableEffect',
  category: 'State',
  description: 'DisposableEffect 用于执行需要清理的副作用（如注册监听器、订阅事件）。当依赖键变化或组件离开组合时，自动执行 onDispose 清理块。适合管理外部资源的生命周期。',
  tags: ['effect', 'dispose', 'cleanup', 'lifecycle', 'resource'],
  params: [
    { name: 'key1, key2, ...', type: 'Any?', required: true, description: '依赖键，变化时先执行 onDispose 再重新执行 effect。传 Unit 表示只在组件进入/离开组合时执行' },
    { name: 'effect', type: 'DisposableEffectScope.() -> DisposableEffectResult', required: true, description: '副作用块，必须以 onDispose { } 结尾返回清理逻辑' },
  ],
  examples: [
    {
      title: '注册/注销生命周期监听',
      code: `@Composable
fun LifecycleObserver(
    onResume: () -> Unit,
    onPause: () -> Unit
) {
    val lifecycleOwner = LocalLifecycleOwner.current

    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event ->
            when (event) {
                Lifecycle.Event.ON_RESUME -> onResume()
                Lifecycle.Event.ON_PAUSE  -> onPause()
                else -> {}
            }
        }
        lifecycleOwner.lifecycle.addObserver(observer)

        onDispose {
            lifecycleOwner.lifecycle.removeObserver(observer)
        }
    }
}`,
    },
    {
      title: '注册广播接收器',
      code: `@Composable
fun NetworkStatusObserver(
    onStatusChange: (Boolean) -> Unit
) {
    val context = LocalContext.current

    DisposableEffect(Unit) {
        val receiver = object : BroadcastReceiver() {
            override fun onReceive(ctx: Context, intent: Intent) {
                val isConnected = isNetworkAvailable(ctx)
                onStatusChange(isConnected)
            }
        }
        val filter = IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION)
        context.registerReceiver(receiver, filter)

        onDispose {
            context.unregisterReceiver(receiver)
        }
    }
}`,
    },
    {
      title: '管理焦点',
      code: `@Composable
fun AutoFocusTextField() {
    val focusRequester = remember { FocusRequester() }

    DisposableEffect(Unit) {
        focusRequester.requestFocus()

        onDispose {
            // 组件销毁时清除焦点
        }
    }

    TextField(
        value = "",
        onValueChange = {},
        modifier = Modifier.focusRequester(focusRequester)
    )
}`,
    },
    {
      title: '订阅和取消订阅',
      code: `@Composable
fun ChatMessagesListener(
    chatId: String,
    onMessage: (Message) -> Unit
) {
    DisposableEffect(chatId) {
        val listener = chatRepository.subscribeToMessages(chatId) { message ->
            onMessage(message)
        }

        onDispose {
            listener.unsubscribe()
        }
    }
}`,
    },
    {
      title: '播放器资源管理',
      code: `@Composable
fun VideoPlayer(videoUrl: String) {
    val context = LocalContext.current

    DisposableEffect(videoUrl) {
        val player = ExoPlayer.Builder(context).build().apply {
            setMediaItem(MediaItem.fromUri(videoUrl))
            prepare()
            play()
        }

        onDispose {
            player.stop()
            player.release()
        }
    }
}`,
    },
    {
      title: '传感器监听',
      code: `@Composable
fun AccelerometerSensor(
    onDataChanged: (FloatArray) -> Unit
) {
    val context = LocalContext.current

    DisposableEffect(Unit) {
        val sensorManager = context.getSystemService<SensorManager>()!!
        val accelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)

        val listener = object : SensorEventListener {
            override fun onSensorChanged(event: SensorEvent) {
                onDataChanged(event.values)
            }

            override fun onAccuracyChanged(sensor: Sensor, accuracy: Int) {}
        }

        sensorManager.registerListener(
            listener,
            accelerometer,
            SensorManager.SENSOR_DELAY_NORMAL
        )

        onDispose {
            sensorManager.unregisterListener(listener)
        }
    }
}`,
    },
    {
      title: '数据库观察者',
      code: `@Composable
fun DatabaseObserver(
    query: String,
    onDataChanged: (List<Item>) -> Unit
) {
    val database = LocalDatabase.current

    DisposableEffect(query) {
        val observer = object : InvalidationTracker.Observer("items") {
            override fun onInvalidated(tables: Set<String>) {
                val items = database.itemDao().query(query)
                onDataChanged(items)
            }
        }

        database.invalidationTracker.addObserver(observer)

        onDispose {
            database.invalidationTracker.removeObserver(observer)
        }
    }
}`,
    },
    {
      title: '定时器管理',
      code: `@Composable
fun TimerComponent(intervalMs: Long, onTick: () -> Unit) {
    DisposableEffect(intervalMs) {
        val timer = Timer()
        val task = object : TimerTask() {
            override fun run() {
                onTick()
            }
        }

        timer.scheduleAtFixedRate(task, 0L, intervalMs)

        onDispose {
            timer.cancel()
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '返回键拦截',
      description: '注册返回键处理器，离开页面时自动注销',
      code: `@Composable
fun BackPressHandler(
    enabled: Boolean = true,
    onBackPressed: () -> Unit
) {
    val backDispatcher = LocalOnBackPressedDispatcherOwner.current?.onBackPressedDispatcher

    DisposableEffect(enabled) {
        val callback = object : OnBackPressedCallback(enabled) {
            override fun handleOnBackPressed() {
                onBackPressed()
            }
        }

        backDispatcher?.addCallback(callback)

        onDispose {
            callback.remove()
        }
    }
}

// 使用
@Composable
fun EditScreen() {
    var hasUnsavedChanges by remember { mutableStateOf(false) }
    var showDialog by remember { mutableStateOf(false) }

    BackPressHandler(enabled = hasUnsavedChanges) {
        showDialog = true  // 拦截返回，显示确认对话框
    }

    if (showDialog) {
        AlertDialog(
            onDismissRequest = { showDialog = false },
            title = { Text("确认退出？") },
            text = { Text("您有未保存的更改") },
            confirmButton = {
                TextButton(onClick = { /* 退出 */ }) {
                    Text("退出")
                }
            },
            dismissButton = {
                TextButton(onClick = { showDialog = false }) {
                    Text("取消")
                }
            }
        )
    }
}`
    },
    {
      title: '全屏模式管理',
      description: '进入页面时设置全屏，离开时恢复',
      code: `@Composable
fun FullscreenVideoPlayer() {
    val activity = LocalContext.current as? Activity

    DisposableEffect(Unit) {
        // 进入全屏
        activity?.window?.decorView?.systemUiVisibility = (
            View.SYSTEM_UI_FLAG_FULLSCREEN
            or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        )

        onDispose {
            // 退出全屏
            activity?.window?.decorView?.systemUiVisibility = View.SYSTEM_UI_FLAG_VISIBLE
        }
    }

    // 视频播放器内容
}`
    },
  ],

  bestPractices: [
    {
      title: '必须以 onDispose 结尾',
      description: 'DisposableEffect 必须返回 onDispose，即使清理逻辑为空',
      goodExample: `DisposableEffect(key) {
    // 副作用逻辑
    registerListener()

    onDispose {
        unregisterListener()
    }
}`,
      badExample: `DisposableEffect(key) {
    registerListener()
    // 编译错误：缺少 onDispose
}`
    },
    {
      title: 'LaunchedEffect vs DisposableEffect',
      description: 'LaunchedEffect 用于协程，DisposableEffect 用于需要显式清理的同步资源',
      goodExample: `// 网络请求：使用 LaunchedEffect
LaunchedEffect(userId) {
    val data = fetchUser(userId)
}

// 监听器注册：使用 DisposableEffect
DisposableEffect(userId) {
    val listener = registerListener(userId)
    onDispose { listener.unregister() }
}`,
    },
    {
      title: '依赖键应包含影响清理的变量',
      description: '确保资源在正确的时机重新创建和清理',
      goodExample: `DisposableEffect(chatId) {
    // chatId 变化时先清理旧订阅再创建新订阅
    val subscription = subscribeTo(chatId)
    onDispose { subscription.cancel() }
}`,
      badExample: `DisposableEffect(Unit) {
    // chatId 变化时不会重新订阅，订阅了错误的聊天室
    val subscription = subscribeTo(chatId)
    onDispose { subscription.cancel() }
}`
    },
    {
      title: 'onDispose 中避免捕获可变状态',
      description: 'onDispose 捕获的是创建时的闭包值',
      goodExample: `DisposableEffect(key) {
    val listenerRef = registerListener { data ->
        processData(data)
    }

    onDispose {
        listenerRef.unregister()  // 使用捕获的引用
    }
}`,
    },
    {
      title: '配合 remember 使用',
      description: '需要清理的对象应该用 remember 创建，避免每次重组都重新创建',
      goodExample: `val player = remember { ExoPlayer.Builder(context).build() }

DisposableEffect(videoUrl) {
    player.setMediaItem(MediaItem.fromUri(videoUrl))
    player.play()

    onDispose {
        player.release()
    }
}`,
      badExample: `DisposableEffect(videoUrl) {
    // 每次重组都创建新的 player，旧的未释放导致内存泄漏
    val player = ExoPlayer.Builder(context).build()
    player.play()

    onDispose {
        player.release()
    }
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'DisposableEffect 的执行时机',
      content: '副作用在首次组合后执行，onDispose 在组件离开组合或依赖键变化时执行。键变化时先 onDispose 再执行新的副作用'
    },
    {
      type: 'warning',
      title: 'onDispose 必须是同步的',
      content: 'onDispose 不能是挂起函数。如需异步清理，使用 LaunchedEffect + Job.cancel()'
    },
    {
      type: 'info',
      title: '使用 remember 创建需要清理的对象',
      content: 'remember + DisposableEffect 是管理有生命周期的对象的标准模式：val player = remember { ExoPlayer.create() } 然后在 DisposableEffect 中清理'
    },
    {
      type: 'info',
      title: 'DisposableEffect 适合桥接传统 Android API',
      content: 'DisposableEffect 是将基于回调的 Android API（生命周期、传感器、广播）集成到 Compose 的标准方式'
    },
    {
      type: 'info',
      title: '键变化时的执行顺序',
      content: '当依赖键变化时，执行顺序是：1) 调用旧的 onDispose 2) 执行新的副作用块 3) 注册新的 onDispose。确保清理逻辑不依赖新的状态'
    },
    {
      type: 'error',
      title: '避免在 onDispose 中访问 Compose 状态',
      content: 'onDispose 可能在组件已销毁后执行，访问状态可能导致异常。只清理外部资源'
    },
    {
      type: 'warning',
      title: '避免内存泄漏',
      content: '未正确清理的监听器、回调、订阅会导致内存泄漏。确保每个注册操作都有对应的注销操作在 onDispose 中'
    },
  ],

  relatedComponents: ['launched-effect', 'remember', 'side-effect'],
  since: '1.0.0',
}
