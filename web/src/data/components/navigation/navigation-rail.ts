import type { ComponentEntry } from '../../types'

export const navigationRailComponent: ComponentEntry = {
  id: 'navigation-rail',
  demo: { id: 'navigation-rail', sourceFile: 'NavigationRailDemo.kt' },
  name: 'NavigationRail',
  category: 'Navigation',
  description: 'NavigationRail 是侧边导航栏，适合平板和折叠屏等宽屏设备。垂直排列 3-7 个导航项，可在顶部放置 FAB 或 Logo，提供比 NavigationBar 更节省垂直空间的导航方案。',
  tags: ['navigation', 'rail', 'sidebar', 'tablet', 'desktop'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'containerColor', type: 'Color', default: 'NavigationRailDefaults.ContainerColor', description: '背景色' },
    { name: 'contentColor', type: 'Color', default: 'contentColorFor(containerColor)', description: '内容颜色' },
    { name: 'header', type: '@Composable (ColumnScope.() -> Unit)?', default: 'null', description: '顶部区域，可放置 FAB、Logo 或应用标题' },
    { name: 'windowInsets', type: 'WindowInsets', default: 'NavigationRailDefaults.windowInsets', description: '窗口内边距，Edge-to-edge 时处理系统栏' },
    { name: 'content', type: '@Composable ColumnScope.() -> Unit', required: true, description: '导航项内容，通常为 3-7 个 NavigationRailItem' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `@Composable
fun AppWithNavigationRail() {
    var selectedTab by remember { mutableIntStateOf(0) }
    val tabs = listOf("首页", "搜索", "通知", "设置")
    val icons = listOf(
        Icons.Default.Home,
        Icons.Default.Search,
        Icons.Default.Notifications,
        Icons.Default.Settings
    )

    Row(modifier = Modifier.fillMaxSize()) {
        NavigationRail {
            tabs.forEachIndexed { index, title ->
                NavigationRailItem(
                    selected = selectedTab == index,
                    onClick = { selectedTab = index },
                    icon = {
                        Icon(
                            icons[index],
                            contentDescription = title
                        )
                    },
                    label = { Text(title) }
                )
            }
        }

        // 主内容区
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(MaterialTheme.colorScheme.background)
        ) {
            when (selectedTab) {
                0 -> HomeScreen()
                1 -> SearchScreen()
                2 -> NotificationsScreen()
                3 -> SettingsScreen()
            }
        }
    }
}`,
    },
    {
      title: '顶部带 FAB',
      code: `Row(modifier = Modifier.fillMaxSize()) {
    NavigationRail(
        header = {
            FloatingActionButton(
                onClick = { /* 新建 */ },
                modifier = Modifier.padding(vertical = 16.dp)
            ) {
                Icon(
                    Icons.Default.Add,
                    contentDescription = "新建"
                )
            }
        }
    ) {
        navItems.forEachIndexed { index, (label, icon) ->
            NavigationRailItem(
                selected = selectedIndex == index,
                onClick = { selectedIndex = index },
                icon = {
                    Icon(icon, contentDescription = label)
                },
                label = { Text(label) }
            )
        }
    }

    Content(modifier = Modifier.weight(1f))
}`,
    },
    {
      title: '顶部显示 Logo',
      code: `Row(modifier = Modifier.fillMaxSize()) {
    NavigationRail(
        header = {
            Image(
                painter = painterResource(R.drawable.app_logo),
                contentDescription = "应用 Logo",
                modifier = Modifier
                    .size(56.dp)
                    .padding(vertical = 16.dp)
            )
        }
    ) {
        tabs.forEachIndexed { index, tab ->
            NavigationRailItem(
                selected = selectedTab == index,
                onClick = { selectedTab = index },
                icon = {
                    Icon(tab.icon, contentDescription = tab.label)
                },
                label = { Text(tab.label) }
            )
        }
    }

    MainContent(modifier = Modifier.weight(1f))
}`,
    },
    {
      title: '响应式布局（手机/平板切换）',
      code: `@Composable
fun ResponsiveNavigation() {
    val windowSizeClass = currentWindowAdaptiveInfo().windowSizeClass
    val useNavigationRail = windowSizeClass.windowWidthSizeClass != WindowWidthSizeClass.COMPACT

    var selectedTab by remember { mutableIntStateOf(0) }

    Scaffold(
        bottomBar = {
            if (!useNavigationRail) {
                NavigationBar {
                    tabs.forEachIndexed { index, (label, icon) ->
                        NavigationBarItem(
                            selected = selectedTab == index,
                            onClick = { selectedTab = index },
                            icon = { Icon(icon, contentDescription = label) },
                            label = { Text(label) }
                        )
                    }
                }
            }
        }
    ) { paddingValues ->
        Row(modifier = Modifier.padding(paddingValues)) {
            if (useNavigationRail) {
                NavigationRail {
                    tabs.forEachIndexed { index, (label, icon) ->
                        NavigationRailItem(
                            selected = selectedTab == index,
                            onClick = { selectedTab = index },
                            icon = { Icon(icon, contentDescription = label) },
                            label = { Text(label) }
                        )
                    }
                }
            }

            Box(modifier = Modifier.weight(1f)) {
                TabContent(selectedTab)
            }
        }
    }
}`,
    },
    {
      title: '隐藏标签（alwaysShowLabel = false）',
      code: `NavigationRail {
    tabs.forEachIndexed { index, (label, icon) ->
        NavigationRailItem(
            selected = selectedTab == index,
            onClick = { selectedTab = index },
            icon = {
                Icon(icon, contentDescription = label)
            },
            label = { Text(label) },
            alwaysShowLabel = false  // 未选中时隐藏标签
        )
    }
}`,
    },
    {
      title: '自定义颜色',
      code: `NavigationRail(
    containerColor = MaterialTheme.colorScheme.surfaceVariant,
    contentColor = MaterialTheme.colorScheme.onSurfaceVariant
) {
    tabs.forEachIndexed { index, (label, icon) ->
        NavigationRailItem(
            selected = selectedTab == index,
            onClick = { selectedTab = index },
            icon = {
                Icon(icon, contentDescription = label)
            },
            label = { Text(label) },
            colors = NavigationRailItemDefaults.colors(
                selectedIconColor = MaterialTheme.colorScheme.primary,
                selectedTextColor = MaterialTheme.colorScheme.primary,
                indicatorColor = MaterialTheme.colorScheme.primaryContainer,
                unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant
            )
        )
    }
}`,
    },
    {
      title: '配合 NavController',
      code: `@Composable
fun AppNavigationRail() {
    val navController = rememberNavController()
    val currentBackStack by navController.currentBackStackEntryAsState()
    val currentRoute = currentBackStack?.destination?.route

    data class NavItem(
        val route: String,
        val label: String,
        val icon: ImageVector
    )

    val navItems = listOf(
        NavItem("home", "首页", Icons.Default.Home),
        NavItem("library", "资料库", Icons.Default.LibraryBooks),
        NavItem("favorites", "收藏", Icons.Default.Favorite),
        NavItem("profile", "我的", Icons.Default.Person)
    )

    Row(modifier = Modifier.fillMaxSize()) {
        NavigationRail {
            navItems.forEach { item ->
                NavigationRailItem(
                    selected = currentRoute == item.route,
                    onClick = {
                        navController.navigate(item.route) {
                            popUpTo(navController.graph.startDestinationId) {
                                saveState = true
                            }
                            launchSingleTop = true
                            restoreState = true
                        }
                    },
                    icon = {
                        Icon(item.icon, contentDescription = item.label)
                    },
                    label = { Text(item.label) }
                )
            }
        }

        NavHost(
            navController = navController,
            startDestination = "home",
            modifier = Modifier.weight(1f)
        ) {
            composable("home") { HomeScreen() }
            composable("library") { LibraryScreen() }
            composable("favorites") { FavoritesScreen() }
            composable("profile") { ProfileScreen() }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '邮件客户端布局',
      description: '侧边导航 + 邮件列表 + 详情',
      code: `@Composable
fun EmailApp() {
    var selectedFolder by remember { mutableIntStateOf(0) }
    val folders = listOf(
        "收件箱" to Icons.Default.Inbox,
        "已发送" to Icons.Default.Send,
        "草稿" to Icons.Default.Drafts,
        "垃圾箱" to Icons.Default.Delete
    )

    Row(modifier = Modifier.fillMaxSize()) {
        // 侧边导航
        NavigationRail(
            header = {
                IconButton(
                    onClick = { /* 写邮件 */ },
                    modifier = Modifier.padding(vertical = 16.dp)
                ) {
                    Icon(
                        Icons.Default.Edit,
                        contentDescription = "写邮件"
                    )
                }
            }
        ) {
            folders.forEachIndexed { index, (label, icon) ->
                NavigationRailItem(
                    selected = selectedFolder == index,
                    onClick = { selectedFolder = index },
                    icon = { Icon(icon, contentDescription = label) },
                    label = { Text(label) }
                )
            }
        }

        // 邮件列表
        EmailList(
            folder = folders[selectedFolder].first,
            modifier = Modifier
                .width(320.dp)
                .fillMaxHeight()
        )

        // 邮件详情
        EmailDetail(
            modifier = Modifier.weight(1f)
        )
    }
}`
    },
    {
      title: '设置页面',
      description: '侧边导航 + 设置内容',
      code: `@Composable
fun SettingsScreen() {
    var selectedCategory by remember { mutableIntStateOf(0) }
    val categories = listOf(
        "账号" to Icons.Default.Person,
        "通知" to Icons.Default.Notifications,
        "隐私" to Icons.Default.Lock,
        "外观" to Icons.Default.Palette,
        "关于" to Icons.Default.Info
    )

    Row(modifier = Modifier.fillMaxSize()) {
        NavigationRail {
            categories.forEachIndexed { index, (label, icon) ->
                NavigationRailItem(
                    selected = selectedCategory == index,
                    onClick = { selectedCategory = index },
                    icon = { Icon(icon, contentDescription = label) },
                    label = { Text(label) }
                )
            }
        }

        Box(
            modifier = Modifier
                .weight(1f)
                .padding(24.dp)
        ) {
            when (selectedCategory) {
                0 -> AccountSettings()
                1 -> NotificationSettings()
                2 -> PrivacySettings()
                3 -> AppearanceSettings()
                4 -> AboutScreen()
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: 'NavigationRail 用于宽屏设备',
      description: '平板/折叠屏/桌面使用 NavigationRail，手机使用 NavigationBar',
      goodExample: `val useRail = windowWidthSizeClass != WindowWidthSizeClass.COMPACT

if (useRail) {
    Row {
        NavigationRail { }
        Content()
    }
} else {
    Scaffold(bottomBar = { NavigationBar { } }) {
        Content()
    }
}`,
    },
    {
      title: 'NavigationRail 应包含 3-7 个导航项',
      description: '少于 3 个不适合使用，多于 7 个考虑使用 NavigationDrawer',
      goodExample: `NavigationRail {
    // 4-5 个导航项最合适
    repeat(4) { NavigationRailItem(...) }
}`,
      badExample: `NavigationRail {
    // 10 个导航项太多，拥挤且难以使用
    repeat(10) { NavigationRailItem(...) }
}`
    },
    {
      title: 'header 可放置 FAB 或 Logo',
      description: '利用顶部空间放置常用操作或品牌标识',
      goodExample: `NavigationRail(
    header = {
        FloatingActionButton(onClick = { }) {
            Icon(Icons.Default.Add, null)
        }
    }
) { }`,
    },
    {
      title: 'NavigationRail 应固定在左侧',
      description: 'NavigationRail 始终显示，不应该隐藏或折叠',
      goodExample: `Row {
    NavigationRail { }  // 固定显示
    Content(Modifier.weight(1f))
}`,
      badExample: `if (showRail) {
    NavigationRail { }  // 不应该动态显隐
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'NavigationRail 用于持久导航',
      content: 'NavigationRail 用于应用的顶级目的地，始终可见，不应该隐藏或折叠'
    },
    {
      type: 'warning',
      title: 'NavigationRail 只用于宽屏设备',
      content: 'NavigationRail 适合平板和桌面，手机屏幕宽度不足，应使用 NavigationBar'
    },
    {
      type: 'info',
      title: 'NavigationRail 宽度固定 80dp',
      content: 'NavigationRail 默认宽度 80dp，符合 Material Design 规范，一般无需调整'
    },
    {
      type: 'info',
      title: 'alwaysShowLabel 控制标签显示',
      content: '默认 true 始终显示标签；false 时未选中项隐藏标签，节省空间'
    },
    {
      type: 'error',
      title: '避免 NavigationRail 和 NavigationBar 同时显示',
      content: '同一界面只应该有一种导航方式，根据屏幕尺寸选择 NavigationRail 或 NavigationBar'
    },
  ],

  relatedComponents: ['navigation-bar', 'navigation-drawer', 'scaffold'],
  since: '1.0.0',
}
