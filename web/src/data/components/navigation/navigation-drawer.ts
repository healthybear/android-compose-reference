import type { ComponentEntry } from '../../types'

export const modalNavigationDrawerComponent: ComponentEntry = {
  id: 'navigation-drawer',
  demo: { id: 'navigation-drawer', sourceFile: 'NavigationDrawerDemo.kt' },
  name: 'ModalNavigationDrawer',
  category: 'Navigation',
  description: 'ModalNavigationDrawer 是模态侧边导航抽屉，从左侧滑入并显示遮罩层，适合手机端的主导航菜单。打开时阻止主内容交互，关闭后恢复正常。支持手势滑动和程序控制。',
  tags: ['drawer', 'navigation', 'sidebar', 'modal', 'menu'],
  params: [
    { name: 'drawerContent', type: '@Composable () -> Unit', required: true, description: '抽屉内容，通常为 ModalDrawerSheet { ... }' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'drawerState', type: 'DrawerState', default: 'rememberDrawerState(DrawerValue.Closed)', description: '抽屉开关状态，可程序控制' },
    { name: 'gesturesEnabled', type: 'Boolean', default: 'true', description: '是否允许手势滑动开关抽屉' },
    { name: 'scrimColor', type: 'Color', default: 'DrawerDefaults.scrimColor', description: '遮罩层颜色（半透明黑色）' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '主内容区域，通常包含 Scaffold' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `@Composable
fun AppWithDrawer() {
    val drawerState = rememberDrawerState(DrawerValue.Closed)
    val scope = rememberCoroutineScope()

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet {
                Text(
                    "应用菜单",
                    modifier = Modifier.padding(16.dp),
                    style = MaterialTheme.typography.titleLarge
                )
                HorizontalDivider()

                NavigationDrawerItem(
                    label = { Text("首页") },
                    selected = true,
                    icon = {
                        Icon(
                            Icons.Default.Home,
                            contentDescription = null
                        )
                    },
                    onClick = {
                        scope.launch { drawerState.close() }
                    }
                )

                NavigationDrawerItem(
                    label = { Text("收藏") },
                    selected = false,
                    icon = {
                        Icon(
                            Icons.Default.Favorite,
                            contentDescription = null
                        )
                    },
                    onClick = {
                        scope.launch { drawerState.close() }
                    }
                )

                NavigationDrawerItem(
                    label = { Text("设置") },
                    selected = false,
                    icon = {
                        Icon(
                            Icons.Default.Settings,
                            contentDescription = null
                        )
                    },
                    onClick = {
                        scope.launch { drawerState.close() }
                    }
                )
            }
        }
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text("首页") },
                    navigationIcon = {
                        IconButton(
                            onClick = {
                                scope.launch { drawerState.open() }
                            }
                        ) {
                            Icon(
                                Icons.Default.Menu,
                                contentDescription = "打开菜单"
                            )
                        }
                    }
                )
            }
        ) { paddingValues ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues)
            ) {
                Text("主内容区域")
            }
        }
    }
}`,
    },
    {
      title: '完整导航菜单',
      code: `@Composable
fun CompleteDrawerExample() {
    val drawerState = rememberDrawerState(DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    var selectedRoute by remember { mutableStateOf("home") }

    val menuItems = listOf(
        Triple("home", "首页", Icons.Default.Home),
        Triple("explore", "发现", Icons.Default.Explore),
        Triple("favorites", "收藏", Icons.Default.Favorite),
        Triple("downloads", "下载", Icons.Default.Download),
        Triple("history", "历史", Icons.Default.History)
    )

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet {
                // 用户信息区域
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp)
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            Icons.Default.Person,
                            contentDescription = null,
                            modifier = Modifier.size(48.dp)
                        )
                        Spacer(Modifier.width(16.dp))
                        Column {
                            Text(
                                "用户名",
                                style = MaterialTheme.typography.titleMedium
                            )
                            Text(
                                "user@example.com",
                                style = MaterialTheme.typography.bodySmall
                            )
                        }
                    }
                }

                HorizontalDivider()

                // 导航项
                menuItems.forEach { (route, label, icon) ->
                    NavigationDrawerItem(
                        label = { Text(label) },
                        selected = selectedRoute == route,
                        icon = {
                            Icon(icon, contentDescription = null)
                        },
                        onClick = {
                            selectedRoute = route
                            scope.launch { drawerState.close() }
                        }
                    )
                }

                HorizontalDivider()

                // 底部操作
                NavigationDrawerItem(
                    label = { Text("设置") },
                    selected = false,
                    icon = {
                        Icon(
                            Icons.Default.Settings,
                            contentDescription = null
                        )
                    },
                    onClick = {
                        scope.launch { drawerState.close() }
                    }
                )
            }
        }
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text(menuItems.find { it.first == selectedRoute }?.second ?: "") },
                    navigationIcon = {
                        IconButton(onClick = { scope.launch { drawerState.open() } }) {
                            Icon(Icons.Default.Menu, contentDescription = "菜单")
                        }
                    }
                )
            }
        ) { paddingValues ->
            Content(
                route = selectedRoute,
                modifier = Modifier.padding(paddingValues)
            )
        }
    }
}`,
    },
    {
      title: '程序控制开关',
      code: `val drawerState = rememberDrawerState(DrawerValue.Closed)
val scope = rememberCoroutineScope()

Column {
    Button(
        onClick = {
            scope.launch {
                drawerState.open()
            }
        }
    ) {
        Text("打开抽屉")
    }

    Button(
        onClick = {
            scope.launch {
                drawerState.close()
            }
        }
    ) {
        Text("关闭抽屉")
    }

    Button(
        onClick = {
            scope.launch {
                if (drawerState.isClosed) {
                    drawerState.open()
                } else {
                    drawerState.close()
                }
            }
        }
    ) {
        Text("切换抽屉")
    }
}`,
    },
    {
      title: '禁用手势滑动',
      code: `ModalNavigationDrawer(
    drawerState = drawerState,
    gesturesEnabled = false,  // 禁用手势，只能通过按钮控制
    drawerContent = {
        ModalDrawerSheet {
            Text("只能通过按钮关闭")

            Button(
                onClick = {
                    scope.launch { drawerState.close() }
                }
            ) {
                Text("关闭")
            }
        }
    }
) {
    Content()
}`,
    },
    {
      title: '自定义抽屉宽度',
      code: `ModalNavigationDrawer(
    drawerContent = {
        ModalDrawerSheet(
            modifier = Modifier.width(280.dp)  // 自定义宽度
        ) {
            Text(
                "自定义宽度抽屉",
                modifier = Modifier.padding(16.dp)
            )
            // 导航项...
        }
    }
) {
    Content()
}`,
    },
    {
      title: '带徽章的导航项',
      code: `ModalNavigationDrawer(
    drawerContent = {
        ModalDrawerSheet {
            NavigationDrawerItem(
                label = { Text("消息") },
                selected = false,
                icon = {
                    Icon(
                        Icons.Default.Message,
                        contentDescription = null
                    )
                },
                badge = {
                    Badge { Text("5") }
                },
                onClick = { }
            )

            NavigationDrawerItem(
                label = { Text("通知") },
                selected = false,
                icon = {
                    Icon(
                        Icons.Default.Notifications,
                        contentDescription = null
                    )
                },
                badge = {
                    Badge()  // 小红点
                },
                onClick = { }
            )
        }
    }
) {
    Content()
}`,
    },
    {
      title: '配合 NavController',
      code: `@Composable
fun DrawerWithNavController() {
    val navController = rememberNavController()
    val drawerState = rememberDrawerState(DrawerValue.Closed)
    val scope = rememberCoroutineScope()

    val currentBackStack by navController.currentBackStackEntryAsState()
    val currentRoute = currentBackStack?.destination?.route

    data class NavItem(
        val route: String,
        val label: String,
        val icon: ImageVector
    )

    val navItems = listOf(
        NavItem("home", "首页", Icons.Default.Home),
        NavItem("search", "搜索", Icons.Default.Search),
        NavItem("profile", "我的", Icons.Default.Person)
    )

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet {
                Text(
                    "导航",
                    modifier = Modifier.padding(16.dp),
                    style = MaterialTheme.typography.titleLarge
                )
                HorizontalDivider()

                navItems.forEach { item ->
                    NavigationDrawerItem(
                        label = { Text(item.label) },
                        selected = currentRoute == item.route,
                        icon = {
                            Icon(item.icon, contentDescription = null)
                        },
                        onClick = {
                            navController.navigate(item.route) {
                                popUpTo(navController.graph.startDestinationId) {
                                    saveState = true
                                }
                                launchSingleTop = true
                                restoreState = true
                            }
                            scope.launch { drawerState.close() }
                        }
                    )
                }
            }
        }
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text(navItems.find { it.route == currentRoute }?.label ?: "") },
                    navigationIcon = {
                        IconButton(onClick = { scope.launch { drawerState.open() } }) {
                            Icon(Icons.Default.Menu, contentDescription = "菜单")
                        }
                    }
                )
            }
        ) { paddingValues ->
            NavHost(
                navController = navController,
                startDestination = "home",
                modifier = Modifier.padding(paddingValues)
            ) {
                composable("home") { HomeScreen() }
                composable("search") { SearchScreen() }
                composable("profile") { ProfileScreen() }
            }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '新闻应用导航',
      description: '分类导航和个人中心',
      code: `@Composable
fun NewsAppDrawer() {
    val drawerState = rememberDrawerState(DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    var selectedCategory by remember { mutableStateOf("推荐") }

    val categories = listOf("推荐", "科技", "财经", "娱乐", "体育")

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet {
                // 用户区域
                ListItem(
                    headlineContent = { Text("用户名") },
                    supportingContent = { Text("点击登录") },
                    leadingContent = {
                        Icon(
                            Icons.Default.Person,
                            contentDescription = null,
                            modifier = Modifier.size(40.dp)
                        )
                    },
                    modifier = Modifier.clickable { }
                )

                HorizontalDivider()

                Text(
                    "分类",
                    modifier = Modifier.padding(16.dp),
                    style = MaterialTheme.typography.titleSmall
                )

                categories.forEach { category ->
                    NavigationDrawerItem(
                        label = { Text(category) },
                        selected = selectedCategory == category,
                        onClick = {
                            selectedCategory = category
                            scope.launch { drawerState.close() }
                        }
                    )
                }

                HorizontalDivider()

                NavigationDrawerItem(
                    label = { Text("收藏") },
                    selected = false,
                    icon = { Icon(Icons.Default.Bookmark, null) },
                    onClick = { }
                )

                NavigationDrawerItem(
                    label = { Text("历史") },
                    selected = false,
                    icon = { Icon(Icons.Default.History, null) },
                    onClick = { }
                )
            }
        }
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text(selectedCategory) },
                    navigationIcon = {
                        IconButton(onClick = { scope.launch { drawerState.open() } }) {
                            Icon(Icons.Default.Menu, null)
                        }
                    }
                )
            }
        ) { paddingValues ->
            NewsList(
                category = selectedCategory,
                modifier = Modifier.padding(paddingValues)
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: 'ModalNavigationDrawer 用于手机端',
      description: '手机使用 ModalNavigationDrawer，平板使用 NavigationRail',
      goodExample: `val useDrawer = windowWidthSizeClass == WindowWidthSizeClass.COMPACT

if (useDrawer) {
    ModalNavigationDrawer { }
} else {
    Row {
        NavigationRail { }
        Content()
    }
}`,
    },
    {
      title: '点击导航项后关闭抽屉',
      description: '导航后应该关闭抽屉，让用户看到目标页面',
      goodExample: `NavigationDrawerItem(
    onClick = {
        navigateTo(route)
        scope.launch { drawerState.close() }
    },
    ...
)`,
      badExample: `NavigationDrawerItem(
    onClick = {
        navigateTo(route)
        // 忘记关闭，用户需要手动滑动关闭
    },
    ...
)`
    },
    {
      title: '使用 ModalDrawerSheet 包裹内容',
      description: 'drawerContent 应该使用 ModalDrawerSheet',
      goodExample: `ModalNavigationDrawer(
    drawerContent = {
        ModalDrawerSheet {
            // 抽屉内容
        }
    }
) { }`,
      badExample: `ModalNavigationDrawer(
    drawerContent = {
        Column {  // 不应该直接使用 Column
            // 抽屉内容
        }
    }
) { }`
    },
    {
      title: 'TopAppBar 应该有菜单按钮',
      description: '提供明显的入口打开抽屉',
      goodExample: `TopAppBar(
    navigationIcon = {
        IconButton(onClick = { scope.launch { drawerState.open() } }) {
            Icon(Icons.Default.Menu, "菜单")
        }
    },
    ...
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'ModalNavigationDrawer 是模态组件',
      content: 'ModalNavigationDrawer 打开时显示遮罩层，阻止用户与主内容交互'
    },
    {
      type: 'warning',
      title: 'drawerState.open/close 是挂起函数',
      content: 'drawerState.open() 和 drawerState.close() 是挂起函数，需要在协程中调用'
    },
    {
      type: 'info',
      title: 'gesturesEnabled 控制手势',
      content: 'gesturesEnabled = false 可以禁用手势滑动，只能通过按钮控制抽屉'
    },
    {
      type: 'info',
      title: 'ModalDrawerSheet 默认宽度',
      content: 'ModalDrawerSheet 默认宽度根据屏幕尺寸自动调整，通常为屏幕宽度的 80% 或 360dp'
    },
    {
      type: 'error',
      title: '避免抽屉中嵌套抽屉',
      content: '不要在 ModalNavigationDrawer 的抽屉内容中再嵌套另一个 ModalNavigationDrawer'
    },
  ],

  relatedComponents: ['navigation-rail', 'navigation-bar', 'scaffold'],
  since: '1.0.0',
}
