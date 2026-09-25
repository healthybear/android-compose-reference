import type { ComponentEntry } from '../../types'

export const largeTopAppBarComponent: ComponentEntry = {
  id: 'large-top-app-bar',
  demo: { id: 'large-top-app-bar', sourceFile: 'LargeTopAppBarDemo.kt' },
  name: 'LargeTopAppBar',
  category: 'Material',
  description: 'Material 3 大号顶部应用栏，标题很大且左对齐，滚动时会折叠成普通 TopAppBar，适合主页面的视觉强调。',
  tags: ['top-app-bar', 'large', 'collapsing', 'scroll', '可折叠导航'],
  params: [
    { name: 'title', type: '@Composable () -> Unit', required: true, description: '大号标题，展开时显示很大' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'navigationIcon', type: '@Composable () -> Unit', default: '{}', description: '导航图标' },
    { name: 'actions', type: '@Composable RowScope.() -> Unit', default: '{}', description: '操作按钮' },
    { name: 'windowInsets', type: 'WindowInsets', default: 'TopAppBarDefaults.windowInsets', description: '窗口插入' },
    { name: 'colors', type: 'TopAppBarColors', default: 'TopAppBarDefaults.largeTopAppBarColors()', description: '颜色配置' },
    { name: 'scrollBehavior', type: 'TopAppBarScrollBehavior?', default: 'null', description: '滚动行为，通常使用 exitUntilCollapsedScrollBehavior' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

Scaffold(
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
    topBar = {
        LargeTopAppBar(
            title = { Text("主页") },
            scrollBehavior = scrollBehavior
        )
    }
) { padding ->
    LazyColumn(
        modifier = Modifier.padding(padding)
    ) {
        items(50) {
            Text("Item $it", modifier = Modifier.padding(16.dp))
        }
    }
}`,
    },
    {
      title: '带导航和操作',
      code: `val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

Scaffold(
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
    topBar = {
        LargeTopAppBar(
            title = { Text("我的文件") },
            navigationIcon = {
                IconButton(onClick = { /* 打开抽屉 */ }) {
                    Icon(Icons.Default.Menu, contentDescription = "菜单")
                }
            },
            actions = {
                IconButton(onClick = { /* 搜索 */ }) {
                    Icon(Icons.Default.Search, contentDescription = "搜索")
                }
                IconButton(onClick = { /* 更多 */ }) {
                    Icon(Icons.Default.MoreVert, contentDescription = "更多")
                }
            },
            scrollBehavior = scrollBehavior
        )
    }
) { padding ->
    LazyColumn(
        modifier = Modifier.padding(padding)
    ) {
        items(documents) { document ->
            DocumentItem(document)
        }
    }
}`,
    },
    {
      title: '固定不折叠',
      code: `Scaffold(
    topBar = {
        LargeTopAppBar(
            title = { Text("欢迎") },
            scrollBehavior = null  // 不提供 scrollBehavior，保持展开
        )
    }
) { padding ->
    Column(
        modifier = Modifier
            .padding(padding)
            .fillMaxSize()
    ) {
        // 内容
    }
}`,
    },
    {
      title: '自定义颜色',
      code: `val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

LargeTopAppBar(
    title = { Text("品牌页面") },
    colors = TopAppBarDefaults.largeTopAppBarColors(
        containerColor = MaterialTheme.colorScheme.primaryContainer,
        scrolledContainerColor = MaterialTheme.colorScheme.primary,
        titleContentColor = MaterialTheme.colorScheme.onPrimaryContainer
    ),
    scrollBehavior = scrollBehavior
)`,
    },
    {
      title: '多行标题',
      code: `val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

LargeTopAppBar(
    title = {
        Column {
            Text(
                text = "早上好",
                style = MaterialTheme.typography.labelLarge
            )
            Text(
                text = "用户名",
                style = MaterialTheme.typography.headlineMedium
            )
        }
    },
    scrollBehavior = scrollBehavior
)`,
    },
  ],

  useCases: [
    {
      title: '应用主页',
      description: '应用首页使用 LargeTopAppBar 强调品牌和内容',
      code: `@Composable
fun HomeScreen(
    onNavigateToProfile: () -> Unit,
    onNavigateToSettings: () -> Unit
) {
    val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()
    var searchQuery by remember { mutableStateOf("") }
    var showSearchBar by remember { mutableStateOf(false) }

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            LargeTopAppBar(
                title = {
                    if (showSearchBar) {
                        TextField(
                            value = searchQuery,
                            onValueChange = { searchQuery = it },
                            placeholder = { Text("搜索...") },
                            modifier = Modifier.fillMaxWidth(),
                            colors = TextFieldDefaults.colors(
                                focusedContainerColor = Color.Transparent,
                                unfocusedContainerColor = Color.Transparent
                            )
                        )
                    } else {
                        Text("发现")
                    }
                },
                navigationIcon = {
                    IconButton(onClick = onNavigateToProfile) {
                        Icon(Icons.Default.Person, contentDescription = "个人中心")
                    }
                },
                actions = {
                    IconButton(onClick = { showSearchBar = !showSearchBar }) {
                        Icon(
                            if (showSearchBar) Icons.Default.Close else Icons.Default.Search,
                            contentDescription = if (showSearchBar) "关闭搜索" else "搜索"
                        )
                    }
                    IconButton(onClick = onNavigateToSettings) {
                        Icon(Icons.Default.Settings, contentDescription = "设置")
                    }
                },
                scrollBehavior = scrollBehavior
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            item {
                // 推荐内容
                Text(
                    text = "为你推荐",
                    style = MaterialTheme.typography.titleLarge,
                    modifier = Modifier.padding(16.dp)
                )
            }
            items(20) { index ->
                FeedItem(
                    title = "内容 $index",
                    description = "这是内容的描述..."
                )
            }
        }
    }
}`
    },
    {
      title: '邮件应用收件箱',
      description: '邮件列表页使用大标题显示文件夹名称',
      code: `@Composable
fun InboxScreen(
    emails: List<Email>,
    onNavigateToMenu: () -> Unit,
    onCompose: () -> Unit
) {
    val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            LargeTopAppBar(
                title = {
                    Column {
                        Text("收件箱")
                        Text(
                            text = "5 封未读",
                            style = MaterialTheme.typography.labelMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                },
                navigationIcon = {
                    IconButton(onClick = onNavigateToMenu) {
                        Icon(Icons.Default.Menu, contentDescription = "菜单")
                    }
                },
                actions = {
                    IconButton(onClick = { /* 搜索 */ }) {
                        Icon(Icons.Default.Search, contentDescription = "搜索")
                    }
                },
                scrollBehavior = scrollBehavior
            )
        },
        floatingActionButton = {
            ExtendedFloatingActionButton(
                onClick = onCompose,
                icon = { Icon(Icons.Default.Edit, contentDescription = null) },
                text = { Text("写邮件") }
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier.padding(padding)
        ) {
            items(emails, key = { it.id }) { email ->
                EmailListItem(
                    email = email,
                    onClick = { /* 打开邮件 */ }
                )
                HorizontalDivider()
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '必须配合 scrollBehavior 使用',
      description: 'LargeTopAppBar 的价值在于滚动折叠效果',
      goodExample: `val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

Scaffold(
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
    topBar = {
        LargeTopAppBar(
            title = { Text("标题") },
            scrollBehavior = scrollBehavior
        )
    }
)`,
      badExample: `// 不提供 scrollBehavior，失去折叠效果
LargeTopAppBar(
    title = { Text("标题") }
)`
    },
    {
      title: '适合主页面',
      description: 'LargeTopAppBar 适合应用主页、列表页等顶级页面',
      goodExample: `// 主页使用 LargeTopAppBar
LargeTopAppBar(title = { Text("主页") })

// 详情页使用 TopAppBar 或 CenterAlignedTopAppBar
TopAppBar(title = { Text("详情") })`,
      badExample: `// 详情页使用 LargeTopAppBar 过于强调
LargeTopAppBar(title = { Text("文章详情") })`
    },
    {
      title: '标题应简洁有力',
      description: 'LargeTopAppBar 的标题是视觉焦点，应简短有力',
      goodExample: `LargeTopAppBar(
    title = { Text("发现") }
)`,
      badExample: `LargeTopAppBar(
    title = { Text("欢迎来到我们的应用发现页面") }
)`
    },
    {
      title: '使用 exitUntilCollapsedScrollBehavior',
      description: '滚动行为通常使用 exitUntilCollapsedScrollBehavior',
      goodExample: `val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

LargeTopAppBar(scrollBehavior = scrollBehavior)`,
      badExample: `// pinnedScrollBehavior 不会折叠
val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()

LargeTopAppBar(scrollBehavior = scrollBehavior)`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'LargeTopAppBar 展开时很高',
      content: 'LargeTopAppBar 展开时高度约 152dp，折叠后变为普通 TopAppBar 的 64dp'
    },
    {
      type: 'tip',
      title: '滚动时会自动折叠',
      content: '使用 exitUntilCollapsedScrollBehavior 时，向上滚动会将 LargeTopAppBar 折叠成普通 TopAppBar'
    },
    {
      type: 'warning',
      title: '必须使用 nestedScroll',
      content: '使用 scrollBehavior 时，Scaffold 必须添加 nestedScroll 修饰符，否则不会折叠'
    },
    {
      type: 'tip',
      title: 'scrolledContainerColor 控制折叠后颜色',
      content: 'colors 的 scrolledContainerColor 参数控制完全折叠后的背景色'
    },
    {
      type: 'tip',
      title: '标题可以是多行内容',
      content: 'title 可以包含多行文本或复杂布局，充分利用大标题的空间'
    },
    {
      type: 'danger',
      title: '不适合内容较少的页面',
      content: 'LargeTopAppBar 占用大量垂直空间，内容较少时会显得空旷'
    },
  ],

  relatedComponents: ['top-app-bar', 'medium-top-app-bar', 'center-aligned-top-app-bar', 'bottom-app-bar'],
  since: '1.0.0',
}
