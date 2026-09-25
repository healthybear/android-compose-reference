import type { ComponentEntry } from '../../types'

export const scaffoldComponent: ComponentEntry = {
  id: 'scaffold',
  name: 'Scaffold',
  category: 'Navigation',
  description: 'Scaffold 是 Material Design 3 的页面脚手架，提供标准的页面结构布局。统一管理 TopAppBar、BottomBar、FloatingActionButton、Snackbar 等组件的位置，并通过 PaddingValues 确保内容不被遮挡。',
  tags: ['scaffold', 'layout', 'appbar', 'structure', 'page', 'container'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置整个页面的样式' },
    { name: 'topBar', type: '@Composable () -> Unit', default: '{}', description: '顶部栏插槽，通常为 TopAppBar 或 CenterAlignedTopAppBar' },
    { name: 'bottomBar', type: '@Composable () -> Unit', default: '{}', description: '底部栏插槽，通常为 NavigationBar 或 BottomAppBar' },
    { name: 'snackbarHost', type: '@Composable () -> Unit', default: '{}', description: 'Snackbar 宿主插槽，传入 SnackbarHost(snackbarHostState)' },
    { name: 'floatingActionButton', type: '@Composable () -> Unit', default: '{}', description: 'FloatingActionButton 插槽' },
    { name: 'floatingActionButtonPosition', type: 'FabPosition', default: 'FabPosition.End', description: 'FAB 位置：End（右下）或 Center（底部居中）' },
    { name: 'containerColor', type: 'Color', default: 'MaterialTheme.colorScheme.background', description: '页面背景色' },
    { name: 'contentColor', type: 'Color', default: 'contentColorFor(containerColor)', description: '内容色，自动根据背景色计算' },
    { name: 'contentWindowInsets', type: 'WindowInsets', default: 'ScaffoldDefaults.contentWindowInsets', description: '内容区域窗口内边距，用于处理系统栏' },
    { name: 'content', type: '@Composable (PaddingValues) -> Unit', required: true, description: '页面内容，接收 PaddingValues 参数，必须应用到内容避免被 TopBar/BottomBar 遮挡' },
  ],
  examples: [
    {
      title: '标准页面结构',
      code: `@Composable
fun HomeScreen() {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("首页") },
                actions = {
                    IconButton(onClick = { /* 搜索 */ }) {
                        Icon(Icons.Default.Search, contentDescription = "搜索")
                    }
                }
            )
        },
        bottomBar = {
            NavigationBar {
                NavigationBarItem(
                    selected = true,
                    onClick = { },
                    icon = { Icon(Icons.Default.Home, contentDescription = null) },
                    label = { Text("首页") }
                )
                NavigationBarItem(
                    selected = false,
                    onClick = { },
                    icon = { Icon(Icons.Default.Explore, contentDescription = null) },
                    label = { Text("发现") }
                )
            }
        },
        floatingActionButton = {
            FloatingActionButton(onClick = { /* 新建 */ }) {
                Icon(Icons.Default.Add, contentDescription = "新建")
            }
        }
    ) { paddingValues ->
        LazyColumn(
            contentPadding = paddingValues
        ) {
            items(50) { index ->
                Text(
                    "Item $index",
                    modifier = Modifier.padding(16.dp)
                )
            }
        }
    }
}`,
    },
    {
      title: '带 Snackbar',
      code: `@Composable
fun DetailScreen() {
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("详情") },
                navigationIcon = {
                    IconButton(onClick = { /* 返回 */ }) {
                        Icon(
                            Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "返回"
                        )
                    }
                }
            )
        },
        snackbarHost = {
            SnackbarHost(hostState = snackbarHostState)
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .padding(paddingValues)
                .padding(16.dp)
        ) {
            Button(
                onClick = {
                    scope.launch {
                        snackbarHostState.showSnackbar("保存成功")
                    }
                }
            ) {
                Text("保存")
            }
        }
    }
}`,
    },
    {
      title: 'FAB 居中（配合 BottomAppBar）',
      code: `Scaffold(
    bottomBar = {
        BottomAppBar(
            actions = {
                IconButton(onClick = { }) {
                    Icon(Icons.Default.Search, contentDescription = "搜索")
                }
                IconButton(onClick = { }) {
                    Icon(Icons.Default.MoreVert, contentDescription = "更多")
                }
            },
            floatingActionButton = {
                FloatingActionButton(
                    onClick = { },
                    containerColor = BottomAppBarDefaults.bottomAppBarFabColor,
                    elevation = FloatingActionButtonDefaults.bottomAppBarFabElevation()
                ) {
                    Icon(Icons.Default.Add, contentDescription = "添加")
                }
            }
        )
    }
) { paddingValues ->
    Content(modifier = Modifier.padding(paddingValues))
}`,
    },
    {
      title: '简洁页面（无 TopBar/BottomBar）',
      code: `Scaffold { paddingValues ->
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(paddingValues)
            .padding(16.dp)
    ) {
        Text("纯内容页面", style = MaterialTheme.typography.headlineMedium)
        Text("无顶部栏和底部栏")
    }
}`,
    },
    {
      title: '自定义背景色',
      code: `Scaffold(
    containerColor = MaterialTheme.colorScheme.surfaceVariant,
    topBar = {
        TopAppBar(
            title = { Text("设置") },
            colors = TopAppBarDefaults.topAppBarColors(
                containerColor = MaterialTheme.colorScheme.primaryContainer
            )
        )
    }
) { paddingValues ->
    Content(modifier = Modifier.padding(paddingValues))
}`,
    },
    {
      title: '带 ExtendedFAB',
      code: `val listState = rememberLazyListState()
val expandedFab by remember {
    derivedStateOf {
        listState.firstVisibleItemIndex == 0
    }
}

Scaffold(
    floatingActionButton = {
        ExtendedFloatingActionButton(
            onClick = { /* 撰写 */ },
            expanded = expandedFab,
            icon = { Icon(Icons.Default.Edit, contentDescription = null) },
            text = { Text("撰写") }
        )
    }
) { paddingValues ->
    LazyColumn(
        state = listState,
        contentPadding = paddingValues
    ) {
        items(50) { Text("Item $it", modifier = Modifier.padding(16.dp)) }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '多 Tab 应用',
      description: '使用 Scaffold 配合 NavigationBar 实现多 Tab 切换',
      code: `@Composable
fun MainScreen() {
    var selectedTab by remember { mutableStateOf(0) }
    val tabs = listOf("首页", "发现", "我的")

    Scaffold(
        topBar = {
            TopAppBar(title = { Text(tabs[selectedTab]) })
        },
        bottomBar = {
            NavigationBar {
                tabs.forEachIndexed { index, title ->
                    NavigationBarItem(
                        selected = selectedTab == index,
                        onClick = { selectedTab = index },
                        icon = {
                            Icon(
                                when (index) {
                                    0 -> Icons.Default.Home
                                    1 -> Icons.Default.Explore
                                    else -> Icons.Default.Person
                                },
                                contentDescription = title
                            )
                        },
                        label = { Text(title) }
                    )
                }
            }
        }
    ) { paddingValues ->
        when (selectedTab) {
            0 -> HomeContent(Modifier.padding(paddingValues))
            1 -> ExploreContent(Modifier.padding(paddingValues))
            2 -> ProfileContent(Modifier.padding(paddingValues))
        }
    }
}`
    },
    {
      title: '详情页面（返回+操作按钮）',
      description: '典型的详情页面布局',
      code: `@Composable
fun ArticleDetailScreen(
    onBackClick: () -> Unit,
    onShareClick: () -> Unit
) {
    val snackbarHostState = remember { SnackbarHostState() }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("文章详情") },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(
                            Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "返回"
                        )
                    }
                },
                actions = {
                    IconButton(onClick = onShareClick) {
                        Icon(Icons.Default.Share, contentDescription = "分享")
                    }
                    IconButton(onClick = { }) {
                        Icon(Icons.Default.MoreVert, contentDescription = "更多")
                    }
                }
            )
        },
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) { paddingValues ->
        LazyColumn(
            contentPadding = paddingValues,
            modifier = Modifier.fillMaxSize()
        ) {
            item {
                ArticleContent()
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '必须将 paddingValues 应用到内容',
      description: '避免内容被 TopBar/BottomBar 遮挡',
      goodExample: `Scaffold { paddingValues ->
    LazyColumn(
        contentPadding = paddingValues
    ) {
        items(list) { Text(it) }
    }
}`,
      badExample: `Scaffold { paddingValues ->
    LazyColumn {
        // 内容被 TopBar/BottomBar 遮挡
        items(list) { Text(it) }
    }
}`
    },
    {
      title: '使用 contentPadding 而非 padding',
      description: 'LazyColumn/LazyRow 应使用 contentPadding',
      goodExample: `Scaffold { paddingValues ->
    LazyColumn(
        contentPadding = paddingValues  // 正确
    ) {
        items(list) { Text(it) }
    }
}`,
      badExample: `Scaffold { paddingValues ->
    LazyColumn(
        modifier = Modifier.padding(paddingValues)  // 滚动性能差
    ) {
        items(list) { Text(it) }
    }
}`
    },
    {
      title: 'Snackbar 使用 SnackbarHost',
      description: 'Snackbar 必须通过 SnackbarHost 显示',
      goodExample: `val snackbarHostState = remember { SnackbarHostState() }
Scaffold(
    snackbarHost = { SnackbarHost(snackbarHostState) }
) { }`,
      badExample: `// 错误：直接在 content 中显示 Snackbar
Scaffold { paddingValues ->
    Box {
        Content()
        Snackbar { Text("消息") }  // 位置不对
    }
}`
    },
    {
      title: 'FAB 通过 Scaffold 放置',
      description: '避免手动定位 FAB',
      goodExample: `Scaffold(
    floatingActionButton = {
        FloatingActionButton(onClick = { }) {
            Icon(Icons.Default.Add, contentDescription = "添加")
        }
    }
) { }`,
      badExample: `Scaffold { paddingValues ->
    Box {
        Content()
        // 手动定位，可能遮挡内容
        FloatingActionButton(
            onClick = { },
            modifier = Modifier.align(Alignment.BottomEnd)
        ) {
            Icon(Icons.Default.Add, contentDescription = "添加")
        }
    }
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Scaffold 管理页面结构',
      content: 'Scaffold 自动处理 TopBar、BottomBar、FAB、Snackbar 的布局和 Z 轴层级，确保组件不相互遮挡'
    },
    {
      type: 'warning',
      title: 'paddingValues 必须应用到内容',
      content: '忽略 paddingValues 会导致内容被 TopBar 或 BottomBar 遮挡。LazyColumn 使用 contentPadding，普通内容使用 Modifier.padding()'
    },
    {
      type: 'info',
      title: 'FAB 位置可配置',
      content: 'floatingActionButtonPosition 支持 End（右下，默认）和 Center（底部居中，通常配合 BottomAppBar）'
    },
    {
      type: 'info',
      title: 'Scaffold 可嵌套使用',
      content: '可以在 NavigationDrawer 或其他容器中嵌套 Scaffold，但通常一个页面只需要一个 Scaffold'
    },
    {
      type: 'error',
      title: '注意 contentWindowInsets',
      content: 'Edge-to-edge 布局时需要正确配置 contentWindowInsets，否则内容可能被系统栏遮挡'
    },
  ],

  relatedComponents: ['top-app-bar', 'navigation-bar', 'floating-action-button', 'snackbar'],
  since: '1.0.0',
}
