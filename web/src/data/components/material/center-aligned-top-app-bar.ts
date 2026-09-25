import type { ComponentEntry } from '../../types'

export const centerAlignedTopAppBarComponent: ComponentEntry = {
  id: 'center-aligned-top-app-bar',
  demo: { id: 'center-aligned-top-app-bar', sourceFile: 'CenterAlignedTopAppBarDemo.kt' },
  name: 'CenterAlignedTopAppBar',
  category: 'Material',
  description: 'Material 3 居中对齐的顶部应用栏，标题居中显示，适合短标题的单页面应用。',
  tags: ['top-app-bar', 'center', 'navigation', 'title', '顶部导航'],
  params: [
    { name: 'title', type: '@Composable () -> Unit', required: true, description: '标题，居中显示' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'navigationIcon', type: '@Composable () -> Unit', default: '{}', description: '导航图标，通常是返回按钮或菜单' },
    { name: 'actions', type: '@Composable RowScope.() -> Unit', default: '{}', description: '操作按钮，从右侧开始排列' },
    { name: 'windowInsets', type: 'WindowInsets', default: 'TopAppBarDefaults.windowInsets', description: '窗口插入' },
    { name: 'colors', type: 'TopAppBarColors', default: 'TopAppBarDefaults.centerAlignedTopAppBarColors()', description: '颜色配置' },
    { name: 'scrollBehavior', type: 'TopAppBarScrollBehavior?', default: 'null', description: '滚动行为配置' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `Scaffold(
    topBar = {
        CenterAlignedTopAppBar(
            title = { Text("标题") }
        )
    }
) { padding ->
    // 页面内容
}`,
    },
    {
      title: '带返回按钮',
      code: `CenterAlignedTopAppBar(
    title = { Text("详情页") },
    navigationIcon = {
        IconButton(onClick = { navController.popBackStack() }) {
            Icon(
                Icons.AutoMirrored.Filled.ArrowBack,
                contentDescription = "返回"
            )
        }
    }
)`,
    },
    {
      title: '带操作按钮',
      code: `CenterAlignedTopAppBar(
    title = { Text("设置") },
    navigationIcon = {
        IconButton(onClick = { navController.popBackStack() }) {
            Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "返回")
        }
    },
    actions = {
        IconButton(onClick = { /* 搜索 */ }) {
            Icon(Icons.Default.Search, contentDescription = "搜索")
        }
        IconButton(onClick = { /* 更多 */ }) {
            Icon(Icons.Default.MoreVert, contentDescription = "更多")
        }
    }
)`,
    },
    {
      title: '滚动时隐藏',
      code: `val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()

Scaffold(
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
    topBar = {
        CenterAlignedTopAppBar(
            title = { Text("文章") },
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
      title: '自定义颜色',
      code: `CenterAlignedTopAppBar(
    title = { Text("自定义主题") },
    colors = TopAppBarDefaults.centerAlignedTopAppBarColors(
        containerColor = MaterialTheme.colorScheme.primaryContainer,
        titleContentColor = MaterialTheme.colorScheme.onPrimaryContainer,
        navigationIconContentColor = MaterialTheme.colorScheme.onPrimaryContainer,
        actionIconContentColor = MaterialTheme.colorScheme.onPrimaryContainer
    )
)`,
    },
    {
      title: '带下拉菜单',
      code: `var expanded by remember { mutableStateOf(false) }

CenterAlignedTopAppBar(
    title = { Text("菜单示例") },
    actions = {
        Box {
            IconButton(onClick = { expanded = true }) {
                Icon(Icons.Default.MoreVert, contentDescription = "更多选项")
            }
            DropdownMenu(
                expanded = expanded,
                onDismissRequest = { expanded = false }
            ) {
                DropdownMenuItem(
                    text = { Text("设置") },
                    onClick = {
                        expanded = false
                        // 处理设置
                    },
                    leadingIcon = {
                        Icon(Icons.Default.Settings, contentDescription = null)
                    }
                )
                DropdownMenuItem(
                    text = { Text("关于") },
                    onClick = {
                        expanded = false
                        // 处理关于
                    },
                    leadingIcon = {
                        Icon(Icons.Default.Info, contentDescription = null)
                    }
                )
            }
        }
    }
)`,
    },
  ],

  useCases: [
    {
      title: '详情页顶部栏',
      description: '内容详情页的居中标题栏，配合返回和分享功能',
      code: `@Composable
fun ArticleDetailScreen(
    article: Article,
    onNavigateBack: () -> Unit
) {
    var isFavorite by remember { mutableStateOf(article.isFavorite) }
    var showShareSheet by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            CenterAlignedTopAppBar(
                title = {
                    Text(
                        text = article.category,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(
                            Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "返回"
                        )
                    }
                },
                actions = {
                    IconButton(onClick = { isFavorite = !isFavorite }) {
                        Icon(
                            if (isFavorite) Icons.Default.Favorite else Icons.Default.FavoriteBorder,
                            contentDescription = if (isFavorite) "取消收藏" else "收藏",
                            tint = if (isFavorite) Color.Red else LocalContentColor.current
                        )
                    }
                    IconButton(onClick = { showShareSheet = true }) {
                        Icon(
                            Icons.Default.Share,
                            contentDescription = "分享"
                        )
                    }
                }
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            item {
                // 文章标题
                Text(
                    text = article.title,
                    style = MaterialTheme.typography.headlineMedium,
                    modifier = Modifier.padding(16.dp)
                )
            }
            item {
                // 文章内容
                Text(
                    text = article.content,
                    style = MaterialTheme.typography.bodyLarge,
                    modifier = Modifier.padding(horizontal = 16.dp)
                )
            }
        }

        if (showShareSheet) {
            ShareBottomSheet(
                article = article,
                onDismiss = { showShareSheet = false }
            )
        }
    }
}`
    },
    {
      title: '设置页面',
      description: '应用设置页面的居中标题栏',
      code: `@Composable
fun SettingsScreen(
    onNavigateBack: () -> Unit
) {
    var showAboutDialog by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            CenterAlignedTopAppBar(
                title = { Text("设置") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(
                            Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "返回"
                        )
                    }
                },
                actions = {
                    IconButton(onClick = { showAboutDialog = true }) {
                        Icon(
                            Icons.Default.Info,
                            contentDescription = "关于"
                        )
                    }
                }
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            item {
                ListItem(
                    headlineContent = { Text("账号") },
                    supportingContent = { Text("user@example.com") },
                    leadingContent = {
                        Icon(Icons.Default.Person, contentDescription = null)
                    },
                    modifier = Modifier.clickable { /* 编辑账号 */ }
                )
            }
            item {
                ListItem(
                    headlineContent = { Text("通知") },
                    leadingContent = {
                        Icon(Icons.Default.Notifications, contentDescription = null)
                    },
                    trailingContent = {
                        Switch(checked = true, onCheckedChange = { })
                    }
                )
            }
            item {
                ListItem(
                    headlineContent = { Text("隐私") },
                    leadingContent = {
                        Icon(Icons.Default.Lock, contentDescription = null)
                    },
                    modifier = Modifier.clickable { /* 隐私设置 */ }
                )
            }
        }

        if (showAboutDialog) {
            AlertDialog(
                onDismissRequest = { showAboutDialog = false },
                title = { Text("关于") },
                text = { Text("应用版本 1.0.0") },
                confirmButton = {
                    TextButton(onClick = { showAboutDialog = false }) {
                        Text("确定")
                    }
                }
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '标题应简短',
      description: 'CenterAlignedTopAppBar 的标题应该简短，避免截断',
      goodExample: `CenterAlignedTopAppBar(
    title = { Text("设置") }
)`,
      badExample: `CenterAlignedTopAppBar(
    title = { Text("这是一个非常长的标题会被截断") }
)`
    },
    {
      title: 'navigationIcon 通常是返回按钮',
      description: '居中标题栏的左侧图标通常是返回按钮',
      goodExample: `CenterAlignedTopAppBar(
    title = { Text("详情") },
    navigationIcon = {
        IconButton(onClick = { navController.popBackStack() }) {
            Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "返回")
        }
    }
)`,
      badExample: `CenterAlignedTopAppBar(
    title = { Text("详情") },
    navigationIcon = {
        Icon(Icons.Default.Menu, contentDescription = "菜单")
    }
)`
    },
    {
      title: 'actions 不宜过多',
      description: '操作按钮建议不超过 3 个',
      goodExample: `CenterAlignedTopAppBar(
    title = { Text("标题") },
    actions = {
        IconButton(onClick = { }) { Icon(Icons.Default.Search, ...) }
        IconButton(onClick = { }) { Icon(Icons.Default.MoreVert, ...) }
    }
)`,
      badExample: `// 操作按钮过多，挤压标题空间
CenterAlignedTopAppBar(
    title = { Text("标题") },
    actions = {
        repeat(5) { IconButton(...) }
    }
)`
    },
    {
      title: '长标题使用 TopAppBar',
      description: '标题较长时应使用左对齐的 TopAppBar',
      goodExample: `// 长标题使用 TopAppBar
TopAppBar(
    title = { Text("这是一个较长的标题可以显示完整") }
)

// 短标题使用 CenterAlignedTopAppBar
CenterAlignedTopAppBar(
    title = { Text("设置") }
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'CenterAlignedTopAppBar 标题居中',
      content: 'CenterAlignedTopAppBar 的标题会自动居中显示，适合短标题'
    },
    {
      type: 'info',
      title: '适合详情页和设置页',
      content: 'CenterAlignedTopAppBar 通常用于详情页、设置页等次级页面'
    },
    {
      type: 'warning',
      title: '标题过长会被截断',
      content: '如果标题文字过长，会被截断显示省略号。长标题应使用 TopAppBar'
    },
    {
      type: 'info',
      title: 'scrollBehavior 控制滚动行为',
      content: 'scrollBehavior 可以实现滚动时隐藏、固定、折叠等效果'
    },
    {
      type: 'info',
      title: '使用 nestedScroll 配合滚动',
      content: '使用 scrollBehavior 时，Scaffold 需要添加 nestedScroll 修饰符'
    },
    {
      type: 'error',
      title: 'actions 会压缩标题空间',
      content: 'actions 越多，留给标题的空间越少，可能导致标题显示不完整'
    },
  ],

  relatedComponents: ['top-app-bar', 'medium-top-app-bar', 'large-top-app-bar', 'bottom-app-bar'],
  since: '1.0.0',
}
