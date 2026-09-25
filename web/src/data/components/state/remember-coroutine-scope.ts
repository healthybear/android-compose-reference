import type { ComponentEntry } from '../../types'

export const rememberCoroutineScopeComponent: ComponentEntry = {
  id: 'remember-coroutine-scope',
  demo: { id: 'remember-coroutine-scope', sourceFile: 'RememberCoroutineScopeDemo.kt' },
  name: 'rememberCoroutineScope',
  category: 'State',
  description: '获取一个与当前组件生命周期绑定的协程作用域，用于在事件回调中启动协程。组件离开组合时自动取消作用域内的所有协程。',
  tags: ['coroutine', 'scope', 'lifecycle', 'async', '协程作用域'],
  params: [],
  examples: [
    {
      title: '按钮点击触发异步操作',
      code: `@Composable
fun LoadDataButton() {
    val scope = rememberCoroutineScope()
    var isLoading by remember { mutableStateOf(false) }
    var data by remember { mutableStateOf<Data?>(null) }

    Button(
        onClick = {
            scope.launch {
                isLoading = true
                data = repository.fetchData()
                isLoading = false
            }
        }
    ) {
        if (isLoading) {
            CircularProgressIndicator(modifier = Modifier.size(16.dp))
        } else {
            Text("加载数据")
        }
    }

    data?.let { Text(it.content) }
}`,
    },
    {
      title: '滚动到指定位置',
      code: `@Composable
fun ScrollableList() {
    val listState = rememberLazyListState()
    val scope = rememberCoroutineScope()

    Column {
        Button(
            onClick = {
                scope.launch {
                    listState.animateScrollToItem(0)
                }
            }
        ) {
            Text("回到顶部")
        }

        LazyColumn(state = listState) {
            items(100) { index ->
                Text("Item " + index)
            }
        }
    }
}`,
    },
    {
      title: '显示 Snackbar',
      code: `@Composable
fun SnackbarExample() {
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) { padding ->
        Button(
            onClick = {
                scope.launch {
                    val result = snackbarHostState.showSnackbar(
                        message = "操作成功",
                        actionLabel = "撤销",
                        duration = SnackbarDuration.Short
                    )
                    if (result == SnackbarResult.ActionPerformed) {
                        // 用户点击了"撤销"
                    }
                }
            },
            modifier = Modifier.padding(padding)
        ) {
            Text("显示 Snackbar")
        }
    }
}`,
    },
    {
      title: 'ModalBottomSheet 控制',
      code: `@Composable
fun BottomSheetExample() {
    val sheetState = rememberModalBottomSheetState()
    val scope = rememberCoroutineScope()
    var showSheet by remember { mutableStateOf(false) }

    Button(
        onClick = { showSheet = true }
    ) {
        Text("显示 BottomSheet")
    }

    if (showSheet) {
        ModalBottomSheet(
            onDismissRequest = { showSheet = false },
            sheetState = sheetState
        ) {
            Column(Modifier.padding(16.dp)) {
                Text("这是 BottomSheet 内容")
                Button(
                    onClick = {
                        scope.launch {
                            sheetState.hide()
                            showSheet = false
                        }
                    }
                ) {
                    Text("关闭")
                }
            }
        }
    }
}`,
    },
    {
      title: '动画控制',
      code: `@Composable
fun AnimationControl() {
    val animatable = remember { Animatable(0f) }
    val scope = rememberCoroutineScope()

    Column {
        Box(
            Modifier
                .size(100.dp)
                .scale(animatable.value)
                .background(Color.Blue)
        )

        Row {
            Button(
                onClick = {
                    scope.launch {
                        animatable.animateTo(
                            targetValue = 1.5f,
                            animationSpec = tween(500)
                        )
                    }
                }
            ) {
                Text("放大")
            }

            Button(
                onClick = {
                    scope.launch {
                        animatable.animateTo(
                            targetValue = 1f,
                            animationSpec = spring()
                        )
                    }
                }
            ) {
                Text("重置")
            }
        }
    }
}`,
    },
    {
      title: '表单提交',
      code: `@Composable
fun LoginForm(onLoginSuccess: () -> Unit) {
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var isLoading by remember { mutableStateOf(false) }
    var errorMessage by remember { mutableStateOf<String?>(null) }
    val scope = rememberCoroutineScope()

    Column(Modifier.padding(16.dp)) {
        TextField(
            value = username,
            onValueChange = { username = it },
            label = { Text("用户名") }
        )

        TextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("密码") },
            visualTransformation = PasswordVisualTransformation()
        )

        errorMessage?.let {
            Text(it, color = MaterialTheme.colorScheme.error)
        }

        Button(
            onClick = {
                scope.launch {
                    isLoading = true
                    errorMessage = null
                    try {
                        authRepository.login(username, password)
                        onLoginSuccess()
                    } catch (e: Exception) {
                        errorMessage = "登录失败: " + e.message
                    } finally {
                        isLoading = false
                    }
                }
            },
            enabled = !isLoading
        ) {
            if (isLoading) {
                CircularProgressIndicator(modifier = Modifier.size(16.dp))
            } else {
                Text("登录")
            }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '下拉刷新',
      description: '实现下拉刷新功能',
      code: `@Composable
fun PullToRefreshScreen() {
    var isRefreshing by remember { mutableStateOf(false) }
    var items by remember { mutableStateOf(loadInitialItems()) }
    val scope = rememberCoroutineScope()
    val pullToRefreshState = rememberPullToRefreshState()

    if (pullToRefreshState.isRefreshing) {
        LaunchedEffect(true) {
            scope.launch {
                isRefreshing = true
                delay(1000)
                items = loadFreshItems()
                isRefreshing = false
            }
        }
    }

    Box(Modifier.nestedScroll(pullToRefreshState.nestedScrollConnection)) {
        LazyColumn {
            items(items) { item ->
                ItemCard(item)
            }
        }

        PullToRefreshContainer(
            state = pullToRefreshState,
            modifier = Modifier.align(Alignment.TopCenter)
        )
    }
}`
    },
    {
      title: '多步骤向导',
      description: '处理多步骤表单的导航和数据提交',
      code: `@Composable
fun MultiStepWizard() {
    var currentStep by remember { mutableIntStateOf(0) }
    val pagerState = rememberPagerState { 3 }
    val scope = rememberCoroutineScope()

    Column {
        HorizontalPager(state = pagerState) { page ->
            when (page) {
                0 -> Step1Screen()
                1 -> Step2Screen()
                2 -> Step3Screen()
            }
        }

        Row(
            Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            if (pagerState.currentPage > 0) {
                Button(
                    onClick = {
                        scope.launch {
                            pagerState.animateScrollToPage(pagerState.currentPage - 1)
                        }
                    }
                ) {
                    Text("上一步")
                }
            }

            if (pagerState.currentPage < 2) {
                Button(
                    onClick = {
                        scope.launch {
                            pagerState.animateScrollToPage(pagerState.currentPage + 1)
                        }
                    }
                ) {
                    Text("下一步")
                }
            } else {
                Button(
                    onClick = {
                        scope.launch {
                            submitWizardData()
                        }
                    }
                ) {
                    Text("完成")
                }
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: 'rememberCoroutineScope vs LaunchedEffect',
      description: 'LaunchedEffect 用于自动启动的副作用，rememberCoroutineScope 用于事件触发的协程',
      goodExample: `// 自动执行：使用 LaunchedEffect
LaunchedEffect(userId) {
    val user = fetchUser(userId)
}

// 事件触发：使用 rememberCoroutineScope
val scope = rememberCoroutineScope()
Button(onClick = {
    scope.launch { performAction() }
}) { Text("执行") }`,
    },
    {
      title: '作用域自动取消',
      description: 'rememberCoroutineScope 返回的作用域在组件离开组合时自动取消，无需手动管理',
      goodExample: `val scope = rememberCoroutineScope()

Button(onClick = {
    scope.launch {
        // 组件销毁时自动取消
        longRunningTask()
    }
}) { Text("开始") }`,
    },
    {
      title: '使用结构化并发',
      description: '在作用域中启动的所有协程会自动继承取消',
      goodExample: `scope.launch {
    coroutineScope {
        launch { task1() }
        launch { task2() }
        // 所有子协程都会随 scope 取消
    }
}`,
    },
    {
      title: '错误处理',
      description: '在协程中捕获异常，避免崩溃',
      goodExample: `scope.launch {
    try {
        val result = riskyOperation()
        handleSuccess(result)
    } catch (e: Exception) {
        handleError(e)
    }
}`,
      badExample: `scope.launch {
    // 未处理的异常会导致崩溃
    val result = riskyOperation()
    handleSuccess(result)
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'rememberCoroutineScope 绑定组件生命周期',
      content: '返回的 CoroutineScope 在组件离开组合树时自动取消。作用域内启动的所有协程也会被取消'
    },
    {
      type: 'info',
      title: '用于事件回调中启动协程',
      content: 'rememberCoroutineScope 的主要用途是在事件处理器（onClick、onSwipe 等）中启动协程，因为这些回调不是挂起函数'
    },
    {
      type: 'warning',
      title: '不要在 Composable 顶层启动协程',
      content: '不要在 Composable 函数体中直接调用 scope.launch，每次重组都会启动新协程。应该在事件回调中使用'
    },
    {
      type: 'info',
      title: '作用域使用 Main 调度器',
      content: 'rememberCoroutineScope 返回的作用域默认在主线程执行。耗时操作使用 withContext(Dispatchers.IO) 切换线程'
    },
    {
      type: 'info',
      title: '配合 State API 使用',
      content: '通常配合 Animatable、ScrollState、SnackbarHostState 等提供挂起函数的 API 使用'
    },
    {
      type: 'error',
      title: '避免捕获并忽略 CancellationException',
      content: 'catch (e: Exception) 会捕获 CancellationException，导致协程无法正常取消。应该重新抛出或使用 catch (e: Exception) { if (e is CancellationException) throw e }'
    },
  ],

  relatedComponents: ['launched-effect', 'disposable-effect', 'remember', 'snapshot-flow'],
  since: '1.0.0',
}
