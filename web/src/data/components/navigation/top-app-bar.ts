import type { ComponentEntry } from '../../types'

export const topAppBarComponent: ComponentEntry = {
  id: 'top-app-bar',
  demo: { id: 'top-app-bar', sourceFile: 'TopAppBarDemo.kt' },
  name: 'TopAppBar',
  category: 'Navigation',
  description: 'TopAppBar 是 Material Design 3 的标准顶部应用栏，单行高度（64dp）。支持导航图标（返回按钮）、标题和操作按钮，可配合 scrollBehavior 实现滚动时的收起/展开效果。',
  tags: ['appbar', 'toolbar', 'topbar', 'navigation', 'header'],
  params: [
    { name: 'title', type: '@Composable () -> Unit', required: true, description: '标题内容，通常为 Text 组件' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'navigationIcon', type: '@Composable () -> Unit', default: '{}', description: '左侧导航图标，通常为返回按钮或菜单按钮' },
    { name: 'actions', type: '@Composable RowScope.() -> Unit', default: '{}', description: '右侧操作按钮区域，通常为 IconButton' },
    { name: 'windowInsets', type: 'WindowInsets', default: 'TopAppBarDefaults.windowInsets', description: '窗口内边距，用于处理状态栏' },
    { name: 'colors', type: 'TopAppBarColors', default: 'TopAppBarDefaults.topAppBarColors()', description: '颜色配置（容器色/标题色/导航图标色/操作按钮色）' },
    { name: 'scrollBehavior', type: 'TopAppBarScrollBehavior?', default: 'null', description: '滚动联动行为，需配合 Modifier.nestedScroll() 使用' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `TopAppBar(
    title = { Text("设置") },
    navigationIcon = {
        IconButton(onClick = { navController.popBackStack() }) {
            Icon(
                Icons.AutoMirrored.Filled.ArrowBack,
                contentDescription = "返回"
            )
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
      title: '配合 Scaffold 使用',
      code: `@Composable
fun SettingsScreen() {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("设置") },
                navigationIcon = {
                    IconButton(onClick = { /* 返回 */ }) {
                        Icon(
                            Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "返回"
                        )
                    }
                }
            )
        }
    ) { paddingValues ->
        LazyColumn(contentPadding = paddingValues) {
            items(settingsList) { setting ->
                SettingItem(setting)
            }
        }
    }
}`,
    },
    {
      title: '滚动时隐藏（enterAlways）',
      code: `val scrollBehavior = TopAppBarDefaults.enterAlwaysScrollBehavior()

Scaffold(
    topBar = {
        TopAppBar(
            title = { Text("列表") },
            scrollBehavior = scrollBehavior
        )
    },
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection)
) { paddingValues ->
    LazyColumn(contentPadding = paddingValues) {
        items(100) { index ->
            Text(
                "Item $index",
                modifier = Modifier.padding(16.dp)
            )
        }
    }
}`,
    },
    {
      title: '滚动时固定（pinnedScrollBehavior）',
      code: `val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()

Scaffold(
    topBar = {
        TopAppBar(
            title = { Text("固定 AppBar") },
            scrollBehavior = scrollBehavior
        )
    },
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection)
) { paddingValues ->
    LazyColumn(contentPadding = paddingValues) {
        items(100) { Text("Item $it", modifier = Modifier.padding(16.dp)) }
    }
}`,
    },
    {
      title: '带下拉菜单的操作按钮',
      code: `@Composable
fun TopAppBarWithMenu() {
    var showMenu by remember { mutableStateOf(false) }

    TopAppBar(
        title = { Text("首页") },
        actions = {
            IconButton(onClick = { /* 搜索 */ }) {
                Icon(Icons.Default.Search, contentDescription = "搜索")
            }

            Box {
                IconButton(onClick = { showMenu = true }) {
                    Icon(Icons.Default.MoreVert, contentDescription = "更多")
                }

                DropdownMenu(
                    expanded = showMenu,
                    onDismissRequest = { showMenu = false }
                ) {
                    DropdownMenuItem(
                        text = { Text("设置") },
                        onClick = {
                            showMenu = false
                            // 跳转到设置
                        }
                    )
                    DropdownMenuItem(
                        text = { Text("关于") },
                        onClick = {
                            showMenu = false
                            // 跳转到关于
                        }
                    )
                }
            }
        }
    )
}`,
    },
    {
      title: '自定义颜色',
      code: `TopAppBar(
    title = { Text("自定义颜色") },
    colors = TopAppBarDefaults.topAppBarColors(
        containerColor = MaterialTheme.colorScheme.primaryContainer,
        titleContentColor = MaterialTheme.colorScheme.onPrimaryContainer,
        navigationIconContentColor = MaterialTheme.colorScheme.onPrimaryContainer,
        actionIconContentColor = MaterialTheme.colorScheme.onPrimaryContainer
    )
)`,
    },
  ],

  useCases: [
    {
      title: '详情页 AppBar',
      description: '标准的详情页顶部栏，带返回和操作按钮',
      code: `@Composable
fun ArticleDetailAppBar(
    title: String,
    onBackClick: () -> Unit,
    onShareClick: () -> Unit,
    onFavoriteClick: () -> Unit,
    isFavorite: Boolean
) {
    TopAppBar(
        title = {
            Text(
                text = title,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
        },
        navigationIcon = {
            IconButton(onClick = onBackClick) {
                Icon(
                    Icons.AutoMirrored.Filled.ArrowBack,
                    contentDescription = "返回"
                )
            }
        },
        actions = {
            IconButton(onClick = onFavoriteClick) {
                Icon(
                    imageVector = if (isFavorite) Icons.Filled.Favorite
                                  else Icons.Outlined.FavoriteBorder,
                    contentDescription = if (isFavorite) "取消收藏" else "收藏",
                    tint = if (isFavorite) Color.Red else LocalContentColor.current
                )
            }
            IconButton(onClick = onShareClick) {
                Icon(Icons.Default.Share, contentDescription = "分享")
            }
        }
    )
}`
    },
    {
      title: '搜索栏 AppBar',
      description: '可切换为搜索模式的 AppBar',
      code: `@Composable
fun SearchableAppBar() {
    var isSearching by remember { mutableStateOf(false) }
    var searchQuery by remember { mutableStateOf("") }

    TopAppBar(
        title = {
            if (isSearching) {
                TextField(
                    value = searchQuery,
                    onValueChange = { searchQuery = it },
                    placeholder = { Text("搜索...") },
                    modifier = Modifier.fillMaxWidth(),
                    colors = TextFieldDefaults.colors(
                        focusedContainerColor = Color.Transparent,
                        unfocusedContainerColor = Color.Transparent
                    ),
                    singleLine = true
                )
            } else {
                Text("标题")
            }
        },
        navigationIcon = {
            if (isSearching) {
                IconButton(onClick = {
                    isSearching = false
                    searchQuery = ""
                }) {
                    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "取消搜索")
                }
            }
        },
        actions = {
            if (!isSearching) {
                IconButton(onClick = { isSearching = true }) {
                    Icon(Icons.Default.Search, contentDescription = "搜索")
                }
            }
        }
    )
}`
    },
  ],

  bestPractices: [
    {
      title: '为导航图标提供正确的 contentDescription',
      description: '返回按钮应明确说明返回到哪里',
      goodExample: `navigationIcon = {
    IconButton(onClick = onBackClick) {
        Icon(
            Icons.AutoMirrored.Filled.ArrowBack,
            contentDescription = "返回"
        )
    }
}`,
      badExample: `navigationIcon = {
    IconButton(onClick = onBackClick) {
        Icon(
            Icons.AutoMirrored.Filled.ArrowBack,
            contentDescription = null
        )
    }
}`
    },
    {
      title: '限制操作按钮数量',
      description: 'actions 不要放太多按钮，超过 3 个使用菜单',
      goodExample: `actions = {
    IconButton(onClick = { }) {
        Icon(Icons.Default.Search, contentDescription = "搜索")
    }
    IconButton(onClick = { }) {
        Icon(Icons.Default.MoreVert, contentDescription = "更多")
    }
}`,
      badExample: `actions = {
    // 5 个按钮太多，显示不下
    IconButton(onClick = { }) { Icon(Icons.Default.Share, null) }
    IconButton(onClick = { }) { Icon(Icons.Default.Edit, null) }
    IconButton(onClick = { }) { Icon(Icons.Default.Delete, null) }
    IconButton(onClick = { }) { Icon(Icons.Default.Search, null) }
    IconButton(onClick = { }) { Icon(Icons.Default.MoreVert, null) }
}`
    },
    {
      title: '标题文本应处理溢出',
      description: '长标题使用 maxLines 和 overflow',
      goodExample: `title = {
    Text(
        text = veryLongTitle,
        maxLines = 1,
        overflow = TextOverflow.Ellipsis
    )
}`,
      badExample: `title = {
    Text(veryLongTitle)  // 长标题可能挤压操作按钮
}`
    },
    {
      title: 'scrollBehavior 需要配合 nestedScroll',
      description: '设置了 scrollBehavior 必须在 Scaffold 上添加 nestedScroll',
      goodExample: `val scrollBehavior = TopAppBarDefaults.enterAlwaysScrollBehavior()
Scaffold(
    topBar = { TopAppBar(title = { Text("标题") }, scrollBehavior = scrollBehavior) },
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection)
) { }`,
      badExample: `val scrollBehavior = TopAppBarDefaults.enterAlwaysScrollBehavior()
Scaffold(
    topBar = { TopAppBar(title = { Text("标题") }, scrollBehavior = scrollBehavior) }
    // 缺少 nestedScroll，scrollBehavior 不生效
) { }`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'TopAppBar 有四种变体',
      content: 'TopAppBar（标准）、CenterAlignedTopAppBar（居中）、MediumTopAppBar（中号）、LargeTopAppBar（大号）'
    },
    {
      type: 'warning',
      title: 'scrollBehavior 仅支持特定滚动容器',
      content: 'scrollBehavior 只对 LazyColumn/LazyRow/LazyVerticalGrid 等支持 nestedScroll 的容器有效'
    },
    {
      type: 'info',
      title: '三种 scrollBehavior',
      content: 'pinnedScrollBehavior（固定）、enterAlwaysScrollBehavior（滚动时隐藏/显示）、exitUntilCollapsedScrollBehavior（仅用于 Medium/Large）'
    },
    {
      type: 'info',
      title: 'actions 是 RowScope',
      content: 'actions 中可以使用 Row 的 weight 等修饰符，但通常只放置 IconButton'
    },
    {
      type: 'error',
      title: '注意使用 AutoMirrored 图标',
      content: '返回箭头应使用 Icons.AutoMirrored.Filled.ArrowBack，在 RTL 布局下自动镜像'
    },
  ],

  relatedComponents: ['scaffold', 'icon-button', 'center-aligned-top-app-bar', 'large-top-app-bar'],
  since: '1.0.0',
}
