import type { GuideEntry } from '../types'

export const guides: GuideEntry[] = [
  {
    id: 'setup',
    title: '环境搭建',
    description: '配置 Android Studio 并添加 Compose 依赖，搭建开发环境。',
    icon: 'Setting',
    difficulty: 'beginner',
    relatedComponents: [],
    steps: [
      {
        title: '安装 Android Studio',
        content: '下载并安装最新版 Android Studio（Hedgehog 或更高版本）。安装时勾选 Android SDK、Android SDK Platform 和 Android Virtual Device。',
        tip: '推荐使用 Android Studio Hedgehog (2023.1.1) 及以上版本，内置 Compose 预览支持。',
      },
      {
        title: '创建新项目',
        content: '打开 Android Studio，选择 "New Project"，选择 "Empty Activity" 模板（该模板默认启用 Compose）。设置包名、保存路径和最低 SDK（建议 API 21+）。',
      },
      {
        title: '添加 Compose 依赖',
        content: '在 app/build.gradle.kts 中启用 Compose 并添加 BOM 依赖，BOM 统一管理所有 Compose 库版本，无需为每个库单独指定版本号。',
        code: `// app/build.gradle.kts
android {
    buildFeatures {
        compose = true
    }
}

dependencies {
    val composeBom = platform("androidx.compose:compose-bom:2026.02.00")
    implementation(composeBom)
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.ui:ui-tooling-preview")
    debugImplementation("androidx.compose.ui:ui-tooling")
    implementation("androidx.activity:activity-compose:1.9.0")
}`,
        tip: '使用 BOM 后无需为每个 Compose 库单独指定版本号，版本由 BOM 统一管理。',
      },
    ],
  },
  {
    id: 'first-screen',
    title: '第一个 Compose 界面',
    description: '从 Hello World 开始，理解 setContent 和 @Composable 注解的基本用法。',
    icon: 'Monitor',
    difficulty: 'beginner',
    relatedComponents: ['text', 'column'],
    steps: [
      {
        title: '理解 @Composable 注解',
        content: '@Composable 是 Compose 的核心注解，标记一个函数为"可组合函数"。可组合函数描述 UI 应该呈现什么，而不是如何操作 View。',
        code: `@Composable
fun Greeting(name: String) {
    Text(text = "你好，\$name！")
}`,
      },
      {
        title: '在 Activity 中使用 setContent',
        content: 'setContent 替代了传统的 setContentView，接受一个 @Composable lambda 作为根 UI。',
        code: `class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyAppTheme {
                Greeting(name = "Compose")
            }
        }
    }
}`,
        tip: 'setContent 内部会自动处理重组（recomposition），无需手动刷新 UI。',
      },
      {
        title: '预览 Composable',
        content: '使用 @Preview 注解可以在 Android Studio 中直接预览 UI，无需运行模拟器。',
        code: `@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    MyAppTheme {
        Greeting("Android")
    }
}`,
      },
    ],
  },
  {
    id: 'layout-basics',
    title: '布局基础',
    description: '掌握 Column、Row、Box 三大基础布局容器的使用方式。',
    icon: 'Grid',
    difficulty: 'beginner',
    relatedComponents: ['column', 'row', 'box', 'spacer'],
    steps: [
      {
        title: 'Column — 垂直排列',
        content: 'Column 将子元素从上到下垂直排列，类似 LinearLayout 的垂直方向。通过 verticalArrangement 控制间距，horizontalAlignment 控制水平对齐。',
        code: `Column(
    modifier = Modifier.fillMaxWidth().padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp),
    horizontalAlignment = Alignment.CenterHorizontally
) {
    Text("第一行")
    Text("第二行")
    Button(onClick = {}) { Text("按钮") }
}`,
      },
      {
        title: 'Row — 水平排列',
        content: 'Row 将子元素从左到右水平排列，类似 LinearLayout 的水平方向。Spacer 配合 weight 可实现弹性空间。',
        code: `Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.SpaceBetween,
    verticalAlignment = Alignment.CenterVertically
) {
    Text("左侧")
    Spacer(modifier = Modifier.weight(1f))
    Text("右侧")
}`,
      },
      {
        title: 'Box — 层叠布局',
        content: 'Box 将子元素叠加在一起，类似 FrameLayout，后声明的子元素显示在上层。',
        code: `Box(
    modifier = Modifier.size(200.dp),
    contentAlignment = Alignment.Center
) {
    Image(
        painter = painterResource(R.drawable.bg),
        contentDescription = null,
        modifier = Modifier.fillMaxSize()
    )
    Text(
        text = "叠加文字",
        color = Color.White,
        modifier = Modifier.align(Alignment.BottomCenter).padding(8.dp)
    )
}`,
        tip: 'Box 中可以用 Modifier.align() 单独控制每个子元素的对齐位置，覆盖 contentAlignment 的默认值。',
      },
    ],
  },
  {
    id: 'state-management',
    title: '状态管理',
    description: '理解 remember、mutableStateOf 和重组机制，掌握 Compose 状态驱动 UI 的核心思想。',
    icon: 'DataLine',
    difficulty: 'intermediate',
    relatedComponents: [],
    steps: [
      {
        title: 'mutableStateOf — 可观察状态',
        content: 'mutableStateOf 创建一个可观察的状态对象。当状态值改变时，所有读取该状态的 Composable 会自动重组（recompose）以更新 UI。',
        code: `@Composable
fun Counter() {
    var count by remember { mutableIntStateOf(0) }
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text("当前计数：\$count", style = MaterialTheme.typography.headlineMedium)
        Button(onClick = { count++ }) { Text("点击 +1") }
    }
}`,
      },
      {
        title: 'remember — 跨重组保留状态',
        content: 'remember 让状态在重组之间保持不变。没有 remember 包裹时，每次重组都会重新初始化状态，导致值被重置。',
        code: `// 错误：每次重组 count 都重置为 0
var count = mutableIntStateOf(0)

// 正确：重组时保留上次的值
var count by remember { mutableIntStateOf(0) }`,
        tip: '如果需要在屏幕旋转后也保留状态，使用 rememberSaveable 替代 remember。',
      },
      {
        title: '状态提升（State Hoisting）',
        content: '将状态从子组件提升到父组件，使子组件变为无状态（stateless），提高可复用性和可测试性。这是 Compose 推荐的状态管理模式。',
        code: `// 无状态子组件（可复用、可测试）
@Composable
fun CounterDisplay(count: Int, onIncrement: () -> Unit) {
    Column {
        Text("计数：\$count")
        Button(onClick = onIncrement) { Text("+1") }
    }
}

// 有状态父组件（持有状态）
@Composable
fun CounterScreen() {
    var count by remember { mutableIntStateOf(0) }
    CounterDisplay(count = count, onIncrement = { count++ })
}`,
      },
    ],
  },
  {
    id: 'theme-and-style',
    title: '主题与样式',
    description: '使用 MaterialTheme 统一管理颜色、字体和形状，实现深色模式支持。',
    icon: 'Brush',
    difficulty: 'intermediate',
    relatedComponents: ['material-theme', 'color-scheme', 'typography'],
    steps: [
      {
        title: 'MaterialTheme 结构',
        content: 'MaterialTheme 是 Material3 的主题提供者，向整个子树注入 colorScheme、typography 和 shapes 三套规范，所有子组件都可以读取这些值。',
        code: `@Composable
fun MyAppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) {
        darkColorScheme()
    } else {
        lightColorScheme(
            primary = Color(0xFF6650A4),
            secondary = Color(0xFF625B71),
        )
    }
    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography(),
        content = content
    )
}`,
      },
      {
        title: '在组件中读取主题',
        content: '通过 MaterialTheme.colorScheme、MaterialTheme.typography 和 MaterialTheme.shapes 读取当前主题值，保持 UI 风格一致，并自动支持深色模式。',
        code: `@Composable
fun ThemedCard(title: String, body: String) {
    Card(
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant
        ),
        shape = MaterialTheme.shapes.medium
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = title,
                style = MaterialTheme.typography.titleMedium
            )
            Text(
                text = body,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}`,
        tip: '始终使用 MaterialTheme 中的颜色和字体，而不是硬编码颜色值，这样深色模式会自动生效。',
      },
    ],
  },
  {
    id: 'navigation-intro',
    title: '导航入门',
    description: '使用 Navigation Compose 实现多页面跳转、参数传递和返回栈管理。',
    icon: 'Menu',
    difficulty: 'intermediate',
    relatedComponents: [],
    steps: [
      {
        title: '添加依赖',
        content: '在 app/build.gradle.kts 中添加 Navigation Compose 依赖。',
        code: `dependencies {
    implementation("androidx.navigation:navigation-compose:2.8.4")
}`,
      },
      {
        title: '设置 NavHost',
        content: 'NavHost 是路由容器，通过 composable() 注册每个页面路由。NavController 负责执行导航操作，使用 rememberNavController() 创建。',
        code: `@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = "home") {
        composable("home") {
            HomeScreen(
                onNavigate = { navController.navigate("detail/42") }
            )
        }
        composable("detail/{id}") { backStackEntry ->
            val id = backStackEntry.arguments?.getString("id") ?: ""
            DetailScreen(
                id = id,
                onBack = { navController.popBackStack() }
            )
        }
    }
}`,
      },
      {
        title: '类型安全路由（推荐）',
        content: 'Navigation 2.8+ 支持用数据类定义路由，避免字符串拼接错误，参数类型安全。需要添加 kotlinx-serialization 插件。',
        code: `@Serializable object HomeRoute
@Serializable data class DetailRoute(val id: Int)

NavHost(navController, startDestination = HomeRoute) {
    composable<HomeRoute> {
        HomeScreen(
            onNavigate = { navController.navigate(DetailRoute(id = 42)) }
        )
    }
    composable<DetailRoute> { backStackEntry ->
        val route: DetailRoute = backStackEntry.toRoute()
        DetailScreen(id = route.id)
    }
}`,
        tip: '类型安全路由需要在 build.gradle.kts 中添加 kotlin("plugin.serialization") 插件。',
      },
    ],
  },
  {
    id: 'composition',
    title: '组合与复用',
    description: '理解"组合优于继承"的设计哲学，掌握 Slot API、CompositionLocal 和自定义布局的使用方式。',
    icon: 'Connection',
    difficulty: 'intermediate',
    relatedComponents: ['column', 'box'],
    steps: [
      {
        title: '组合优于继承',
        content: 'Compose 不使用类继承来扩展 UI，而是通过将小的可组合函数组合在一起构建复杂 UI。每个函数只做一件事，通过参数和 content lambda 实现灵活组合。',
        code: `// 不推荐：用继承扩展 UI
// class MyButton : Button() { ... }  ← Compose 中不存在这种模式

// 推荐：通过组合构建
@Composable
fun PrimaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
) {
    Button(
        onClick = onClick,
        modifier = modifier,
        enabled = enabled,
        colors = ButtonDefaults.buttonColors(
            containerColor = MaterialTheme.colorScheme.primary
        )
    ) {
        Text(text)
    }
}`,
        tip: '始终为自定义 Composable 暴露 modifier 参数，让调用方控制布局行为，这是 Compose API 设计的最佳实践。',
      },
      {
        title: 'Slot API — 内容插槽',
        content: '通过接受 @Composable lambda 参数（即"插槽"），让调用方决定某个区域渲染什么内容。这是 Compose 中实现高度灵活组件的核心模式，Scaffold、Card、TopAppBar 都使用了这种设计。',
        code: `// 定义带插槽的组件
@Composable
fun InfoCard(
    title: String,
    modifier: Modifier = Modifier,
    actions: @Composable RowScope.() -> Unit = {},  // 操作区插槽
    content: @Composable () -> Unit,                // 内容插槽
) {
    Card(modifier = modifier) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(title, style = MaterialTheme.typography.titleMedium)
                Row { actions() }
            }
            Spacer(Modifier.height(8.dp))
            content()
        }
    }
}

// 使用时填充插槽
InfoCard(
    title = "用户信息",
    actions = {
        IconButton(onClick = { /* 编辑 */ }) { Icon(Icons.Default.Edit, null) }
    }
) {
    Text("姓名：张三")
    Text("邮箱：zhangsan@example.com")
}`,
      },
      {
        title: 'CompositionLocal — 隐式数据传递',
        content: 'CompositionLocal 允许在组件树中隐式传递数据，避免将参数逐层手动传递（prop drilling）。适合主题、语言、用户信息等全局性数据。',
        code: `// 定义 CompositionLocal
val LocalUserName = compositionLocalOf<String> { error("未提供 UserName") }

// 在父组件中提供值
@Composable
fun App() {
    CompositionLocalProvider(LocalUserName provides "张三") {
        UserProfile()
    }
}

// 在任意子组件中读取，无需逐层传参
@Composable
fun UserProfile() {
    val userName = LocalUserName.current
    Text("欢迎，\$userName")
}`,
        tip: '优先使用 compositionLocalOf（值变化时只重组读取该值的组件）而非 staticCompositionLocalOf（值变化时重组整个子树）。',
      },
      {
        title: '自定义 Layout',
        content: '当内置布局无法满足需求时，使用 Layout composable 完全自定义测量和放置逻辑。Layout 接收子元素列表，你负责测量每个子元素并决定其位置。',
        code: `@Composable
fun SimpleFlowRow(
    modifier: Modifier = Modifier,
    spacing: Dp = 8.dp,
    content: @Composable () -> Unit,
) {
    Layout(content = content, modifier = modifier) { measurables, constraints ->
        val spacingPx = spacing.roundToPx()
        val placeables = measurables.map { it.measure(constraints.copy(minWidth = 0)) }

        var x = 0; var y = 0; var rowHeight = 0
        layout(constraints.maxWidth, constraints.maxHeight) {
            placeables.forEach { placeable ->
                if (x + placeable.width > constraints.maxWidth) {
                    x = 0; y += rowHeight + spacingPx; rowHeight = 0
                }
                placeable.placeRelative(x, y)
                x += placeable.width + spacingPx
                rowHeight = maxOf(rowHeight, placeable.height)
            }
        }
    }
}`,
        tip: '大多数场景下 FlowRow（accompanist 或 Foundation 1.6+）已经够用，只有真正特殊的布局才需要自定义 Layout。',
      },
    ],
  },
  {
    id: 'semantics',
    title: '语义与无障碍',
    description: '理解语义树的作用，掌握 Modifier.semantics、mergeDescendants 和自定义 Action，让应用对所有用户友好。',
    icon: 'View',
    difficulty: 'intermediate',
    relatedComponents: [],
    steps: [
      {
        title: '什么是语义树',
        content: 'Compose 维护两棵树：UI 树（负责渲染）和语义树（负责无障碍服务、测试框架读取）。语义树描述每个节点"是什么"和"能做什么"，TalkBack、Switch Access 等无障碍服务依赖它工作。',
        code: `// 在 Android Studio 中查看语义树（调试用）
// Layout Inspector → 勾选 "Show Semantics"

// 或在测试中打印语义树
composeTestRule.onRoot().printToLog("SemanticTree")`,
        tip: '每个 Composable 都可以有语义信息。Text 自动携带文本内容，Button 自动携带 Role.Button，Image 需要手动提供 contentDescription。',
      },
      {
        title: 'contentDescription 与基础语义',
        content: '为图片、图标等非文本元素提供 contentDescription，让屏幕阅读器能够描述它们。传入 null 表示该元素纯装饰性，无障碍服务会忽略它。',
        code: `// 有意义的图片：提供描述
Image(
    painter = painterResource(R.drawable.avatar),
    contentDescription = "用户头像",
)

// 纯装饰性图标：传 null
Icon(
    imageVector = Icons.Default.Star,
    contentDescription = null,  // 装饰性，不需要朗读
    tint = Color.Yellow
)

// 图标按钮：描述操作而非图标本身
IconButton(onClick = { /* 删除 */ }) {
    Icon(Icons.Default.Delete, contentDescription = "删除该条目")
}`,
      },
      {
        title: 'Modifier.semantics — 自定义语义',
        content: '使用 Modifier.semantics 手动设置或覆盖语义属性，适合自定义组件或需要提供更丰富语义信息的场景。',
        code: `// 为自定义进度条提供语义
@Composable
fun DownloadProgress(progress: Float) {
    val percent = (progress * 100).toInt()
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(8.dp)
            .semantics {
                contentDescription = "下载进度 \$percent%"
                progressBarRangeInfo = ProgressBarRangeInfo(progress, 0f..1f)
            }
    ) {
        // 自定义绘制进度条...
    }
}

// 为可点击区域指定角色
Box(
    modifier = Modifier
        .clickable { onToggle() }
        .semantics {
            role = Role.Switch
            stateDescription = if (checked) "已开启" else "已关闭"
        }
) { /* ... */ }`,
      },
      {
        title: 'mergeDescendants — 合并语义节点',
        content: '当一个逻辑单元由多个子元素组成时（如带文字的图标按钮），使用 mergeDescendants = true 将子节点的语义合并到父节点，避免无障碍服务逐个朗读每个子元素。',
        code: `// 不合并：TalkBack 会分别朗读图标和文字
Row {
    Icon(Icons.Default.Favorite, contentDescription = "收藏")
    Text("收藏")
}

// 合并后：TalkBack 朗读一次"收藏"
Row(
    modifier = Modifier.semantics(mergeDescendants = true) {}
) {
    Icon(Icons.Default.Favorite, contentDescription = null)  // 子节点 null
    Text("收藏")  // 合并后只朗读文字
}

// Button 和 Card 默认已启用 mergeDescendants
Button(onClick = {}) {
    Icon(Icons.Default.Send, contentDescription = null)
    Text("发送")  // TalkBack 只朗读"发送"
}`,
        tip: 'Button、Card、Checkbox 等 Material 组件默认已合并子节点语义，自定义可点击容器需要手动添加 mergeDescendants。',
      },
      {
        title: '自定义语义 Action',
        content: '通过 customActions 为复杂组件提供额外的无障碍操作，让用户通过无障碍服务执行滑动菜单、长按操作等功能。',
        code: `@Composable
fun SwipeableListItem(
    title: String,
    onDelete: () -> Unit,
    onArchive: () -> Unit,
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .semantics {
                // 为滑动操作提供无障碍替代方案
                customActions = listOf(
                    CustomAccessibilityAction(label = "删除") { onDelete(); true },
                    CustomAccessibilityAction(label = "归档") { onArchive(); true },
                )
            }
    ) {
        Text(title, modifier = Modifier.padding(16.dp))
    }
}`,
        tip: '自定义 Action 让无法使用手势的用户也能通过无障碍服务完成滑动、拖拽等操作。',
      },
    ],
  },
  {
    id: 'common-practices',
    title: '常见开发实践',
    description: '副作用处理、性能优化、Modifier 使用技巧等开发中高频遇到的实用模式。',
    icon: 'Tools',
    difficulty: 'intermediate',
    relatedComponents: [],
    steps: [
      {
        title: '副作用：LaunchedEffect',
        content: 'LaunchedEffect 在 Composable 进入组合时启动一个协程，key 变化时取消并重启。适合在组件出现时发起网络请求、播放动画等一次性操作。',
        code: `@Composable
fun UserDetail(userId: String) {
    var user by remember { mutableStateOf<User?>(null) }

    // userId 变化时自动重新加载
    LaunchedEffect(userId) {
        user = repository.getUser(userId)
    }

    if (user != null) {
        Text(user!!.name)
    } else {
        CircularProgressIndicator()
    }
}

// key 为 Unit 表示只在首次进入时执行一次
LaunchedEffect(Unit) {
    analyticsService.logScreenView("UserDetail")
}`,
        tip: '不要在 LaunchedEffect 外部直接调用 suspend 函数，Composable 函数本身不是协程作用域。',
      },
      {
        title: '副作用：DisposableEffect',
        content: 'DisposableEffect 用于需要清理的副作用，如注册监听器、订阅事件。onDispose 块在组件离开组合或 key 变化时执行，确保资源被释放。',
        code: `@Composable
fun NetworkStatusBanner() {
    var isOnline by remember { mutableStateOf(true) }

    DisposableEffect(Unit) {
        val callback = NetworkCallback { online -> isOnline = online }
        connectivityManager.registerCallback(callback)

        onDispose {
            connectivityManager.unregisterCallback(callback)  // 必须清理
        }
    }

    if (!isOnline) {
        Text("网络已断开", color = MaterialTheme.colorScheme.error)
    }
}`,
      },
      {
        title: 'derivedStateOf — 避免过度重组',
        content: '当一个状态是从其他状态派生出来的，使用 derivedStateOf 包裹计算逻辑。只有派生结果真正变化时才触发重组，避免源状态频繁变化导致不必要的重组。',
        code: `@Composable
fun TodoList(items: List<TodoItem>) {
    val listState = rememberLazyListState()

    // 错误：每次滚动都重组（firstVisibleItemIndex 频繁变化）
    val showScrollTop = listState.firstVisibleItemIndex > 0

    // 正确：只有"是否显示"的布尔值变化时才重组
    val showScrollTop by remember {
        derivedStateOf { listState.firstVisibleItemIndex > 0 }
    }

    Box {
        LazyColumn(state = listState) { /* ... */ }
        if (showScrollTop) {
            FloatingActionButton(onClick = { /* 滚回顶部 */ }) {
                Icon(Icons.Default.KeyboardArrowUp, null)
            }
        }
    }
}`,
        tip: 'derivedStateOf 的典型场景：从列表滚动位置派生"是否显示返回顶部按钮"、从表单字段派生"提交按钮是否可用"。',
      },
      {
        title: 'key() — 控制重组标识',
        content: '在 LazyList 或循环中，key 帮助 Compose 识别哪个元素是哪个，避免状态错位。当列表项可以增删重排时，务必提供稳定的 key。',
        code: `// 不提供 key：删除第一项后，后续项的状态会错位
LazyColumn {
    items(messages) { message ->
        MessageItem(message)
    }
}

// 提供稳定 key：每项状态与数据绑定，不会错位
LazyColumn {
    items(messages, key = { it.id }) { message ->
        MessageItem(message)
    }
}

// 非 LazyList 的循环也适用
Column {
    for (item in items) {
        key(item.id) {
            ItemRow(item)
        }
    }
}`,
      },
      {
        title: 'Modifier 顺序很重要',
        content: 'Modifier 是链式调用，顺序直接影响最终效果。padding 在 clickable 之前，点击区域不含 padding；padding 在 clickable 之后，点击区域包含 padding。',
        code: `// padding 在外：点击区域包含 padding（推荐用于列表项）
Box(
    modifier = Modifier
        .clickable { onClick() }
        .padding(16.dp)
) { Text("点击区域包含内边距") }

// padding 在内：点击区域不含 padding（内容缩进但热区小）
Box(
    modifier = Modifier
        .padding(16.dp)
        .clickable { onClick() }
) { Text("点击区域不含内边距") }

// background 与 clip 的顺序
Box(
    modifier = Modifier
        .clip(RoundedCornerShape(8.dp))  // 先裁剪
        .background(Color.Blue)          // 再填充（圆角生效）
) { /* ... */ }`,
        tip: '一般规则：clip → background → padding → clickable，从外到内依次应用。',
      },
      {
        title: '避免在 Composable 中做耗时操作',
        content: 'Composable 函数可能在每帧都被调用，耗时操作会导致掉帧。计算密集型操作应移到 ViewModel 或用 remember/derivedStateOf 缓存结果。',
        code: `// 错误：每次重组都重新排序（可能很慢）
@Composable
fun SortedList(items: List<Item>) {
    val sorted = items.sortedBy { it.name }  // 每次重组都执行
    LazyColumn { items(sorted) { ItemRow(it) } }
}

// 正确：items 变化时才重新排序
@Composable
fun SortedList(items: List<Item>) {
    val sorted = remember(items) { items.sortedBy { it.name } }
    LazyColumn { items(sorted) { ItemRow(it) } }
}

// 更好：在 ViewModel 中处理，Composable 只负责展示
class ListViewModel : ViewModel() {
    val sortedItems = repository.items
        .map { it.sortedBy { item -> item.name } }
        .stateIn(viewModelScope, SharingStarted.Lazily, emptyList())
}`,
        tip: '原则：Composable 函数应该是纯粹的"描述 UI"，业务逻辑和数据处理放在 ViewModel 或 Repository 层。',
      },
    ],
  },
]
