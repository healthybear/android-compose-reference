import type { ComponentEntry } from '../../types'

export const navigationBarComponent: ComponentEntry = {
  id: 'navigation-bar',
  name: 'NavigationBar',
  category: 'Navigation',
  description: 'NavigationBar 是 Material Design 3 的底部导航栏，包含 2-5 个 NavigationBarItem，用于在应用的主要目的地之间切换。适合手机端顶级页面导航。',
  tags: ['navigation', 'bottom-nav', 'tab', 'navbar', 'bottombar'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'containerColor', type: 'Color', default: 'NavigationBarDefaults.containerColor', description: '背景色' },
    { name: 'contentColor', type: 'Color', default: 'contentColorFor(containerColor)', description: '内容颜色，自动根据背景色计算' },
    { name: 'tonalElevation', type: 'Dp', default: 'NavigationBarDefaults.Elevation', description: '色调高度，影响背景色深浅' },
    { name: 'windowInsets', type: 'WindowInsets', default: 'NavigationBarDefaults.windowInsets', description: '窗口内边距，用于处理系统导航栏' },
    { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '导航项内容，通常为 2-5 个 NavigationBarItem' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `@Composable
fun MainScreen() {
    var selectedTab by remember { mutableIntStateOf(0) }
    val tabs = listOf("首页", "发现", "消息", "我的")
    val icons = listOf(
        Icons.Default.Home,
        Icons.Default.Explore,
        Icons.Default.Notifications,
        Icons.Default.Person
    )

    Scaffold(
        bottomBar = {
            NavigationBar {
                tabs.forEachIndexed { index, title ->
                    NavigationBarItem(
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
        }
    ) { paddingValues ->
        when (selectedTab) {
            0 -> HomeScreen(Modifier.padding(paddingValues))
            1 -> ExploreScreen(Modifier.padding(paddingValues))
            2 -> NotificationsScreen(Modifier.padding(paddingValues))
            3 -> ProfileScreen(Modifier.padding(paddingValues))
        }
    }
}`,
    },
    {
      title: '配合 NavController 导航',
      code: `@Composable
fun AppNavigation() {
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
        NavItem("search", "搜索", Icons.Default.Search),
        NavItem("favorites", "收藏", Icons.Default.Favorite),
        NavItem("profile", "我的", Icons.Default.Person)
    )

    Scaffold(
        bottomBar = {
            NavigationBar {
                navItems.forEach { item ->
                    NavigationBarItem(
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
                            Icon(
                                item.icon,
                                contentDescription = item.label
                            )
                        },
                        label = { Text(item.label) }
                    )
                }
            }
        }
    ) { paddingValues ->
        NavHost(
            navController = navController,
            startDestination = "home",
            modifier = Modifier.padding(paddingValues)
        ) {
            composable("home") { HomeScreen() }
            composable("search") { SearchScreen() }
            composable("favorites") { FavoritesScreen() }
            composable("profile") { ProfileScreen() }
        }
    }
}`,
    },
    {
      title: '带徽章的导航项',
      code: `var selectedTab by remember { mutableIntStateOf(0) }
val unreadCount = 5

Scaffold(
    bottomBar = {
        NavigationBar {
            NavigationBarItem(
                selected = selectedTab == 0,
                onClick = { selectedTab = 0 },
                icon = { Icon(Icons.Default.Home, contentDescription = "首页") },
                label = { Text("首页") }
            )

            NavigationBarItem(
                selected = selectedTab == 1,
                onClick = { selectedTab = 1 },
                icon = {
                    BadgedBox(
                        badge = {
                            if (unreadCount > 0) {
                                Badge { Text(unreadCount.toString()) }
                            }
                        }
                    ) {
                        Icon(Icons.Default.Notifications, contentDescription = "消息")
                    }
                },
                label = { Text("消息") }
            )

            NavigationBarItem(
                selected = selectedTab == 2,
                onClick = { selectedTab = 2 },
                icon = { Icon(Icons.Default.Person, contentDescription = "我的") },
                label = { Text("我的") }
            )
        }
    }
) { paddingValues ->
    Content(modifier = Modifier.padding(paddingValues))
}`,
    },
    {
      title: '隐藏标签（alwaysShowLabel = false）',
      code: `var selectedTab by remember { mutableIntStateOf(0) }

NavigationBar {
    tabs.forEachIndexed { index, (title, icon) ->
        NavigationBarItem(
            selected = selectedTab == index,
            onClick = { selectedTab = index },
            icon = { Icon(icon, contentDescription = title) },
            label = { Text(title) },
            alwaysShowLabel = false  // 未选中时隐藏标签
        )
    }
}`,
    },
    {
      title: '自定义颜色',
      code: `NavigationBar(
    containerColor = MaterialTheme.colorScheme.surfaceVariant,
    contentColor = MaterialTheme.colorScheme.onSurfaceVariant
) {
    tabs.forEachIndexed { index, (title, icon) ->
        NavigationBarItem(
            selected = selectedTab == index,
            onClick = { selectedTab = index },
            icon = { Icon(icon, contentDescription = title) },
            label = { Text(title) },
            colors = NavigationBarItemDefaults.colors(
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
  ],

  useCases: [
    {
      title: '电商应用导航',
      description: '典型的电商应用底部导航',
      code: `@Composable
fun ECommerceNavigation() {
    var selectedTab by remember { mutableIntStateOf(0) }
    val cartItemCount = 3

    val tabs = listOf(
        Triple("首页", Icons.Default.Home, 0),
        Triple("分类", Icons.Default.Category, 0),
        Triple("购物车", Icons.Default.ShoppingCart, cartItemCount),
        Triple("我的", Icons.Default.Person, 0)
    )

    Scaffold(
        bottomBar = {
            NavigationBar {
                tabs.forEachIndexed { index, (label, icon, badgeCount) ->
                    NavigationBarItem(
                        selected = selectedTab == index,
                        onClick = { selectedTab = index },
                        icon = {
                            if (badgeCount > 0) {
                                BadgedBox(
                                    badge = { Badge { Text(badgeCount.toString()) } }
                                ) {
                                    Icon(icon, contentDescription = label)
                                }
                            } else {
                                Icon(icon, contentDescription = label)
                            }
                        },
                        label = { Text(label) }
                    )
                }
            }
        }
    ) { paddingValues ->
        when (selectedTab) {
            0 -> HomeScreen(Modifier.padding(paddingValues))
            1 -> CategoryScreen(Modifier.padding(paddingValues))
            2 -> CartScreen(Modifier.padding(paddingValues))
            3 -> ProfileScreen(Modifier.padding(paddingValues))
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: 'NavigationBar 应包含 2-5 个导航项',
      description: '少于 2 个无需导航栏，多于 5 个考虑使用 NavigationDrawer',
      goodExample: `NavigationBar {
    // 3-4 个导航项最合适
    NavigationBarItem(...)
    NavigationBarItem(...)
    NavigationBarItem(...)
}`,
      badExample: `NavigationBar {
    // 7 个导航项太多，拥挤且难以点击
    repeat(7) { NavigationBarItem(...) }
}`
    },
    {
      title: '使用 NavigationBarItem 而非自定义',
      description: 'NavigationBarItem 提供标准样式和交互',
      goodExample: `NavigationBar {
    NavigationBarItem(
        selected = true,
        onClick = { },
        icon = { Icon(Icons.Default.Home, null) },
        label = { Text("首页") }
    )
}`,
      badExample: `NavigationBar {
    // 自定义导航项，样式不统一
    Box(Modifier.clickable { }) {
        Column {
            Icon(...)
            Text(...)
        }
    }
}`
    },
    {
      title: '配合 Scaffold 使用',
      description: 'NavigationBar 应放在 Scaffold 的 bottomBar 中',
      goodExample: `Scaffold(
    bottomBar = { NavigationBar { ... } }
) { paddingValues ->
    Content(Modifier.padding(paddingValues))
}`,
      badExample: `Column {
    Content()
    NavigationBar { }  // 内容可能被遮挡
}`
    },
    {
      title: '为图标提供 contentDescription',
      description: '确保无障碍用户能理解每个导航项',
      goodExample: `NavigationBarItem(
    icon = { Icon(Icons.Default.Home, contentDescription = "首页") },
    label = { Text("首页") },
    ...
)`,
      badExample: `NavigationBarItem(
    icon = { Icon(Icons.Default.Home, contentDescription = null) },
    ...
)`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'NavigationBar vs NavigationRail',
      content: 'NavigationBar 用于手机底部导航，NavigationRail 用于平板/桌面侧边导航'
    },
    {
      type: 'warning',
      title: 'NavigationBar 用于顶级目的地',
      content: 'NavigationBar 只用于应用的顶级页面（首页、搜索、个人中心等），不用于二级页面导航'
    },
    {
      type: 'tip',
      title: 'alwaysShowLabel 控制标签显示',
      content: '默认 true 始终显示标签；false 时未选中项隐藏标签，节省空间'
    },
    {
      type: 'tip',
      title: 'NavigationBar 自动处理安全区域',
      content: 'windowInsets 参数自动处理系统导航栏，Edge-to-edge 模式下正确显示'
    },
  ],

  relatedComponents: ['scaffold', 'navigation-rail', 'navigation-drawer'],
  since: '1.0.0',
}
