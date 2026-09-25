import type { ComponentEntry } from '../../types'

export const permanentNavigationDrawerComponent: ComponentEntry = {
  id: 'permanent-navigation-drawer',
  demo: { id: 'permanent-navigation-drawer', sourceFile: 'PermanentNavigationDrawerDemo.kt' },
  name: 'PermanentNavigationDrawer',
  category: 'Navigation',
  description: '永久固定的侧边导航抽屉，始终可见不可关闭，适合平板或桌面端的宽屏布局。',
  tags: ['drawer', 'navigation', 'permanent', 'tablet', '固定侧边栏'],
  params: [
    { name: 'drawerContent', type: '@Composable () -> Unit', required: true, description: '抽屉内容，通常为 PermanentDrawerSheet { ... }' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '主内容区域，与抽屉并排显示' },
  ],
  examples: [
    {
      title: '基础用法（平板布局）',
      code: `var selectedRoute by remember { mutableStateOf("home") }

PermanentNavigationDrawer(
    drawerContent = {
        PermanentDrawerSheet(modifier = Modifier.width(240.dp)) {
            Text(
                "导航",
                modifier = Modifier.padding(16.dp),
                style = MaterialTheme.typography.titleMedium
            )
            HorizontalDivider()
            NavigationDrawerItem(
                label = { Text("首页") },
                selected = selectedRoute == "home",
                icon = { Icon(Icons.Default.Home, contentDescription = null) },
                onClick = { selectedRoute = "home" }
            )
            NavigationDrawerItem(
                label = { Text("收藏") },
                selected = selectedRoute == "favorites",
                icon = { Icon(Icons.Default.Favorite, contentDescription = null) },
                onClick = { selectedRoute = "favorites" }
            )
            NavigationDrawerItem(
                label = { Text("设置") },
                selected = selectedRoute == "settings",
                icon = { Icon(Icons.Default.Settings, contentDescription = null) },
                onClick = { selectedRoute = "settings" }
            )
        }
    }
) {
    // 主内容区域
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(
                    when (selectedRoute) {
                        "home" -> "首页"
                        "favorites" -> "收藏"
                        "settings" -> "设置"
                        else -> ""
                    }
                )}
            )
        }
    ) { padding ->
        Box(
            modifier = Modifier.fillMaxSize().padding(padding),
            contentAlignment = Alignment.Center
        ) {
            Text("主内容区域")
        }
    }
}`,
    },
    {
      title: '自适应：宽屏用 Permanent，窄屏用 Modal',
      code: `val windowSizeClass = calculateWindowSizeClass(this)
val isExpanded = windowSizeClass.widthSizeClass == WindowWidthSizeClass.Expanded
val drawerState = rememberDrawerState(DrawerValue.Closed)
val scope = rememberCoroutineScope()

if (isExpanded) {
    // 平板/桌面：永久侧边栏
    PermanentNavigationDrawer(
        drawerContent = {
            PermanentDrawerSheet(modifier = Modifier.width(280.dp)) {
                DrawerContent(onItemClick = { selectedItem = it })
            }
        }
    ) {
        MainContent(
            onMenuClick = null  // 宽屏不需要菜单按钮
        )
    }
} else {
    // 手机：模态抽屉
    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet {
                DrawerContent(onItemClick = {
                    selectedItem = it
                    scope.launch { drawerState.close() }
                })
            }
        }
    ) {
        MainContent(
            onMenuClick = { scope.launch { drawerState.open() } }
        )
    }
}`,
    },
    {
      title: '带头部和分组的抽屉',
      code: `PermanentNavigationDrawer(
    drawerContent = {
        PermanentDrawerSheet(modifier = Modifier.width(280.dp)) {
            // 头部
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(MaterialTheme.colorScheme.primaryContainer)
                    .padding(16.dp)
            ) {
                Icon(
                    Icons.Default.AccountCircle,
                    contentDescription = null,
                    modifier = Modifier.size(64.dp),
                    tint = MaterialTheme.colorScheme.onPrimaryContainer
                )
                Spacer(Modifier.height(8.dp))
                Text(
                    "用户名",
                    style = MaterialTheme.typography.titleMedium,
                    color = MaterialTheme.colorScheme.onPrimaryContainer
                )
                Text(
                    "user@example.com",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onPrimaryContainer
                )
            }

            Spacer(Modifier.height(8.dp))

            // 主要功能分组
            Text(
                "主要功能",
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            NavigationDrawerItem(
                label = { Text("仪表盘") },
                selected = selectedItem == "dashboard",
                icon = { Icon(Icons.Default.Dashboard, null) },
                onClick = { selectedItem = "dashboard" },
                modifier = Modifier.padding(horizontal = 12.dp)
            )
            NavigationDrawerItem(
                label = { Text("项目") },
                selected = selectedItem == "projects",
                icon = { Icon(Icons.Default.Folder, null) },
                badge = { Badge { Text("3") } },
                onClick = { selectedItem = "projects" },
                modifier = Modifier.padding(horizontal = 12.dp)
            )
            NavigationDrawerItem(
                label = { Text("任务") },
                selected = selectedItem == "tasks",
                icon = { Icon(Icons.Default.Task, null) },
                onClick = { selectedItem = "tasks" },
                modifier = Modifier.padding(horizontal = 12.dp)
            )

            HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))

            // 其他功能分组
            Text(
                "其他",
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            NavigationDrawerItem(
                label = { Text("设置") },
                selected = selectedItem == "settings",
                icon = { Icon(Icons.Default.Settings, null) },
                onClick = { selectedItem = "settings" },
                modifier = Modifier.padding(horizontal = 12.dp)
            )
            NavigationDrawerItem(
                label = { Text("帮助") },
                selected = selectedItem == "help",
                icon = { Icon(Icons.Default.Help, null) },
                onClick = { selectedItem = "help" },
                modifier = Modifier.padding(horizontal = 12.dp)
            )
        }
    }
) {
    MainContentArea()
}`,
    },
    {
      title: '迷你抽屉（仅图标）',
      code: `var isExpanded by remember { mutableStateOf(false) }

PermanentNavigationDrawer(
    drawerContent = {
        PermanentDrawerSheet(
            modifier = Modifier.width(if (isExpanded) 240.dp else 80.dp)
        ) {
            Column(
                modifier = Modifier.fillMaxWidth(),
                horizontalAlignment = if (isExpanded) Alignment.Start else Alignment.CenterHorizontally
            ) {
                IconButton(
                    onClick = { isExpanded = !isExpanded },
                    modifier = Modifier.padding(16.dp)
                ) {
                    Icon(
                        if (isExpanded) Icons.Default.MenuOpen else Icons.Default.Menu,
                        contentDescription = if (isExpanded) "收起" else "展开"
                    )
                }

                HorizontalDivider()

                listOf(
                    "首页" to Icons.Default.Home,
                    "搜索" to Icons.Default.Search,
                    "通知" to Icons.Default.Notifications,
                    "设置" to Icons.Default.Settings
                ).forEachIndexed { index, (label, icon) ->
                    NavigationDrawerItem(
                        label = { if (isExpanded) Text(label) },
                        selected = selectedIndex == index,
                        icon = { Icon(icon, contentDescription = label) },
                        onClick = { selectedIndex = index },
                        modifier = Modifier.padding(horizontal = 12.dp)
                    )
                }
            }
        }
    }
) {
    MainContent()
}`,
    },
    {
      title: '双层抽屉（二级菜单）',
      code: `var selectedCategory by remember { mutableStateOf("documents") }
var selectedItem by remember { mutableStateOf("doc1") }

Row(modifier = Modifier.fillMaxSize()) {
    // 第一层：分类抽屉
    PermanentDrawerSheet(modifier = Modifier.width(80.dp)) {
        Column(
            modifier = Modifier.fillMaxWidth(),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Spacer(Modifier.height(16.dp))
            listOf(
                "documents" to Icons.Default.Description,
                "images" to Icons.Default.Image,
                "videos" to Icons.Default.VideoLibrary,
                "music" to Icons.Default.MusicNote
            ).forEach { (category, icon) ->
                IconButton(
                    onClick = { selectedCategory = category },
                    modifier = Modifier
                        .padding(8.dp)
                        .background(
                            if (selectedCategory == category)
                                MaterialTheme.colorScheme.primaryContainer
                            else Color.Transparent,
                            shape = RoundedCornerShape(12.dp)
                        )
                ) {
                    Icon(icon, contentDescription = category)
                }
            }
        }
    }

    // 第二层：项目列表
    PermanentDrawerSheet(modifier = Modifier.width(240.dp)) {
        Column {
            Text(
                text = when (selectedCategory) {
                    "documents" -> "文档"
                    "images" -> "图片"
                    "videos" -> "视频"
                    "music" -> "音乐"
                    else -> ""
                },
                modifier = Modifier.padding(16.dp),
                style = MaterialTheme.typography.titleMedium
            )
            HorizontalDivider()
            LazyColumn {
                items(10) { index ->
                    NavigationDrawerItem(
                        label = { Text("项目 " + (index + 1)) },
                        selected = selectedItem == "item$index",
                        icon = { Icon(Icons.Default.InsertDriveFile, null) },
                        onClick = { selectedItem = "item$index" },
                        modifier = Modifier.padding(horizontal = 12.dp)
                    )
                }
            }
        }
    }

    // 主内容区域
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Text("主内容：" + selectedItem)
    }
}`,
    },
    {
      title: '带搜索和底部操作',
      code: `var searchQuery by remember { mutableStateOf("") }

PermanentNavigationDrawer(
    drawerContent = {
        PermanentDrawerSheet(modifier = Modifier.width(280.dp)) {
            Column(modifier = Modifier.fillMaxHeight()) {
                // 搜索框
                OutlinedTextField(
                    value = searchQuery,
                    onValueChange = { searchQuery = it },
                    placeholder = { Text("搜索...") },
                    leadingIcon = { Icon(Icons.Default.Search, null) },
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    singleLine = true
                )

                // 导航项
                LazyColumn(modifier = Modifier.weight(1f)) {
                    items(navigationItems.filter {
                        it.label.contains(searchQuery, ignoreCase = true)
                    }) { item ->
                        NavigationDrawerItem(
                            label = { Text(item.label) },
                            selected = selectedItem == item.id,
                            icon = { Icon(item.icon, null) },
                            onClick = { selectedItem = item.id },
                            modifier = Modifier.padding(horizontal = 12.dp)
                        )
                    }
                }

                // 底部操作
                HorizontalDivider()
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    IconButton(onClick = { /* 设置 */ }) {
                        Icon(Icons.Default.Settings, null)
                    }
                    IconButton(onClick = { /* 帮助 */ }) {
                        Icon(Icons.Default.Help, null)
                    }
                    IconButton(onClick = { /* 退出 */ }) {
                        Icon(Icons.Default.Logout, null)
                    }
                }
            }
        }
    }
) {
    MainContent()
}`,
    },
  ],

  useCases: [
    {
      title: '企业管理后台',
      description: '多功能管理系统的固定侧边导航',
      code: `@Composable
fun AdminDashboard() {
    var selectedSection by remember { mutableStateOf("overview") }

    PermanentNavigationDrawer(
        drawerContent = {
            PermanentDrawerSheet(modifier = Modifier.width(280.dp)) {
                // 顶部 Logo 和标题
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        Icons.Default.Business,
                        contentDescription = null,
                        modifier = Modifier.size(32.dp),
                        tint = MaterialTheme.colorScheme.primary
                    )
                    Spacer(Modifier.width(12.dp))
                    Text(
                        "管理后台",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold
                    )
                }

                HorizontalDivider()

                LazyColumn {
                    item {
                        DrawerSection(title = "概览") {
                            DrawerNavItem(
                                "overview",
                                "总览",
                                Icons.Default.Dashboard,
                                selectedSection
                            ) { selectedSection = it }
                            DrawerNavItem(
                                "analytics",
                                "数据分析",
                                Icons.Default.Analytics,
                                selectedSection
                            ) { selectedSection = it }
                        }
                    }

                    item {
                        DrawerSection(title = "管理") {
                            DrawerNavItem(
                                "users",
                                "用户管理",
                                Icons.Default.People,
                                selectedSection,
                                badge = "125"
                            ) { selectedSection = it }
                            DrawerNavItem(
                                "products",
                                "商品管理",
                                Icons.Default.Inventory,
                                selectedSection
                            ) { selectedSection = it }
                            DrawerNavItem(
                                "orders",
                                "订单管理",
                                Icons.Default.ShoppingCart,
                                selectedSection,
                                badge = "12"
                            ) { selectedSection = it }
                        }
                    }

                    item {
                        DrawerSection(title = "系统") {
                            DrawerNavItem(
                                "settings",
                                "系统设置",
                                Icons.Default.Settings,
                                selectedSection
                            ) { selectedSection = it }
                            DrawerNavItem(
                                "logs",
                                "操作日志",
                                Icons.Default.History,
                                selectedSection
                            ) { selectedSection = it }
                        }
                    }
                }
            }
        }
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text(getSectionTitle(selectedSection)) },
                    actions = {
                        IconButton(onClick = { /* 通知 */ }) {
                            Badge(content = { Text("5") }) {
                                Icon(Icons.Default.Notifications, null)
                            }
                        }
                        IconButton(onClick = { /* 个人中心 */ }) {
                            Icon(Icons.Default.AccountCircle, null)
                        }
                    }
                )
            }
        ) { padding ->
            when (selectedSection) {
                "overview" -> OverviewScreen(Modifier.padding(padding))
                "analytics" -> AnalyticsScreen(Modifier.padding(padding))
                "users" -> UsersScreen(Modifier.padding(padding))
                "products" -> ProductsScreen(Modifier.padding(padding))
                "orders" -> OrdersScreen(Modifier.padding(padding))
                "settings" -> SettingsScreen(Modifier.padding(padding))
                "logs" -> LogsScreen(Modifier.padding(padding))
            }
        }
    }
}

@Composable
fun DrawerSection(
    title: String,
    content: @Composable () -> Unit
) {
    Column {
        Text(
            text = title,
            modifier = Modifier.padding(horizontal = 28.dp, vertical = 8.dp),
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        content()
    }
}

@Composable
fun DrawerNavItem(
    id: String,
    label: String,
    icon: ImageVector,
    selectedId: String,
    badge: String? = null,
    onClick: (String) -> Unit
) {
    NavigationDrawerItem(
        label = { Text(label) },
        selected = selectedId == id,
        icon = { Icon(icon, null) },
        badge = badge?.let { { Badge { Text(it) } } },
        onClick = { onClick(id) },
        modifier = Modifier.padding(horizontal = 12.dp)
    )
}`,
    },
    {
      title: '邮件客户端',
      description: '邮箱应用的文件夹导航',
      code: `@Composable
fun EmailClient() {
    var selectedFolder by remember { mutableStateOf("inbox") }
    var selectedEmail by remember { mutableStateOf<Email?>(null) }

    PermanentNavigationDrawer(
        drawerContent = {
            PermanentDrawerSheet(modifier = Modifier.width(240.dp)) {
                Column(modifier = Modifier.fillMaxHeight()) {
                    // 写邮件按钮
                    Button(
                        onClick = { /* 写邮件 */ },
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp)
                    ) {
                        Icon(Icons.Default.Edit, null)
                        Spacer(Modifier.width(8.dp))
                        Text("写邮件")
                    }

                    LazyColumn(modifier = Modifier.weight(1f)) {
                        item {
                            NavigationDrawerItem(
                                label = { Text("收件箱") },
                                selected = selectedFolder == "inbox",
                                icon = { Icon(Icons.Default.Inbox, null) },
                                badge = { Badge { Text("42") } },
                                onClick = { selectedFolder = "inbox" },
                                modifier = Modifier.padding(horizontal = 12.dp)
                            )
                        }
                        item {
                            NavigationDrawerItem(
                                label = { Text("已加星标") },
                                selected = selectedFolder == "starred",
                                icon = { Icon(Icons.Default.Star, null) },
                                onClick = { selectedFolder = "starred" },
                                modifier = Modifier.padding(horizontal = 12.dp)
                            )
                        }
                        item {
                            NavigationDrawerItem(
                                label = { Text("已发送") },
                                selected = selectedFolder == "sent",
                                icon = { Icon(Icons.Default.Send, null) },
                                onClick = { selectedFolder = "sent" },
                                modifier = Modifier.padding(horizontal = 12.dp)
                            )
                        }
                        item {
                            NavigationDrawerItem(
                                label = { Text("草稿箱") },
                                selected = selectedFolder == "drafts",
                                icon = { Icon(Icons.Default.Drafts, null) },
                                badge = { Badge { Text("3") } },
                                onClick = { selectedFolder = "drafts" },
                                modifier = Modifier.padding(horizontal = 12.dp)
                            )
                        }
                        item {
                            NavigationDrawerItem(
                                label = { Text("垃圾箱") },
                                selected = selectedFolder == "trash",
                                icon = { Icon(Icons.Default.Delete, null) },
                                onClick = { selectedFolder = "trash" },
                                modifier = Modifier.padding(horizontal = 12.dp)
                            )
                        }

                        item {
                            HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))
                            Text(
                                "标签",
                                modifier = Modifier.padding(horizontal = 28.dp, vertical = 8.dp),
                                style = MaterialTheme.typography.labelSmall
                            )
                        }

                        items(listOf("工作", "个人", "重要")) { label ->
                            NavigationDrawerItem(
                                label = { Text(label) },
                                selected = selectedFolder == "label_$label",
                                icon = { Icon(Icons.Default.Label, null) },
                                onClick = { selectedFolder = "label_$label" },
                                modifier = Modifier.padding(horizontal = 12.dp)
                            )
                        }
                    }

                    // 存储空间
                    HorizontalDivider()
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            "存储空间",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        LinearProgressIndicator(
                            progress = { 0.65f },
                            modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp)
                        )
                        Text(
                            "6.5 GB / 10 GB 已使用",
                            style = MaterialTheme.typography.bodySmall
                        )
                    }
                }
            }
        }
    ) {
        Row(modifier = Modifier.fillMaxSize()) {
            // 邮件列表
            EmailList(
                folder = selectedFolder,
                selectedEmail = selectedEmail,
                onEmailSelect = { selectedEmail = it },
                modifier = Modifier.weight(0.4f)
            )

            VerticalDivider()

            // 邮件详情
            if (selectedEmail != null) {
                EmailDetail(
                    email = selectedEmail!!,
                    modifier = Modifier.weight(0.6f)
                )
            } else {
                Box(
                    modifier = Modifier.weight(0.6f),
                    contentAlignment = Alignment.Center
                ) {
                    Text("选择一封邮件查看")
                }
            }
        }
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '使用 WindowSizeClass 适配不同屏幕',
      description: '根据屏幕宽度自动切换 Permanent 和 Modal 抽屉',
      goodExample: `val windowSizeClass = calculateWindowSizeClass(this)
val usePermDrawer = windowSizeClass.widthSizeClass == WindowWidthSizeClass.Expanded

if (usePermDrawer) {
    PermanentNavigationDrawer(/* ... */)
} else {
    ModalNavigationDrawer(/* ... */)
}`,
    },
    {
      title: '抽屉宽度遵循 Material 规范',
      description: '标准抽屉宽度为 240-360dp',
      goodExample: `PermanentDrawerSheet(
    modifier = Modifier.width(280.dp)  // 标准宽度
)`,
      badExample: `PermanentDrawerSheet(
    modifier = Modifier.width(500.dp)  // 过宽，占用过多空间
)`,
    },
    {
      title: '内容分组和层级清晰',
      description: '使用分隔线和标签区分不同功能模块',
      goodExample: `Text("主要功能", style = MaterialTheme.typography.labelSmall)
NavigationDrawerItem(/* ... */)
HorizontalDivider()
Text("其他", style = MaterialTheme.typography.labelSmall)`,
    },
    {
      title: '避免嵌套滚动',
      description: '抽屉内使用 LazyColumn 而不是 Column + Modifier.verticalScroll',
      goodExample: `PermanentDrawerSheet {
    LazyColumn {
        items(menuItems) { /* ... */ }
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: '适用场景',
      content: 'PermanentNavigationDrawer 适合平板和桌面端（宽度 >= 600dp），手机端应使用 ModalNavigationDrawer',
    },
    {
      type: 'info',
      title: '与 ModalNavigationDrawer 的区别',
      content: 'Permanent 始终可见不可关闭，Modal 可以打开/关闭并带遮罩层',
    },
    {
      type: 'tip',
      title: '使用 WindowSizeClass 自适应',
      content: '通过 accompanist 或 material3-window-size-class 库判断屏幕尺寸，动态选择抽屉类型',
    },
    {
      type: 'tip',
      title: 'NavigationDrawerItem 状态管理',
      content: '使用 selected 参数高亮当前选中项，提供清晰的导航状态反馈',
    },
    {
      type: 'warning',
      title: '不要在手机端使用',
      content: 'PermanentNavigationDrawer 会永久占用屏幕宽度，手机端会压缩主内容空间',
    },
    {
      type: 'warning',
      title: '抽屉内容要可滚动',
      content: '当导航项过多时，使用 LazyColumn 确保内容可滚动',
    },
    {
      type: 'danger',
      title: '避免过度嵌套',
      content: '不要在 PermanentNavigationDrawer 内再嵌套另一个 Drawer，会导致布局混乱',
    },
  ],

  relatedComponents: ['navigation-rail', 'navigation-bar'],
  since: '1.0.0',
}
