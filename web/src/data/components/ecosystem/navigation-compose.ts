import type { ComponentEntry } from '../../types'

export const navigationComposeComponent: ComponentEntry = {
  id: 'navigation-compose',
  name: 'Navigation Compose',
  category: 'Ecosystem',
  description: 'Jetpack Navigation 的 Compose 版本，通过 NavHost + NavController 管理页面路由，支持参数传递、返回栈和深链接，需引入 androidx.navigation:navigation-compose。',
  tags: ['navigation', 'navhost', 'navcontroller', 'routing', '路由导航'],
  params: [
    { name: 'navController', type: 'NavHostController', required: true, description: 'NavController 实例，由 rememberNavController() 创建' },
    { name: 'startDestination', type: 'String', required: true, description: '起始路由，应用启动时显示的页面' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: 'NavHost 的修饰符' },
    { name: 'builder', type: 'NavGraphBuilder.() -> Unit', required: true, description: '路由图构建块，使用 composable { } 注册路由' },
  ],
  examples: [
    {
      title: '基础路由设置',
      code: `// build.gradle.kts
// implementation("androidx.navigation:navigation-compose:2.8.4")

@Composable
fun AppNavigation() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = "home"
    ) {
        composable("home") {
            HomeScreen(
                onNavigateToDetail = { id ->
                    navController.navigate("detail/$id")
                }
            )
        }
        composable("detail/{id}") { backStackEntry ->
            val id = backStackEntry.arguments?.getString("id") ?: ""
            DetailScreen(id = id, onBack = { navController.popBackStack() })
        }
        composable("settings") {
            SettingsScreen()
        }
    }
}`,
    },
    {
      title: '类型安全路由（Navigation 2.8+）',
      code: `// 定义路由（可序列化数据类）
@Serializable object HomeRoute
@Serializable data class DetailRoute(val id: String)
@Serializable object SettingsRoute

@Composable
fun AppNavigation() {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = HomeRoute) {
        composable<HomeRoute> {
            HomeScreen(onNavigate = { navController.navigate(DetailRoute(it)) })
        }
        composable<DetailRoute> { backStackEntry ->
            val route: DetailRoute = backStackEntry.toRoute()
            DetailScreen(id = route.id)
        }
        composable<SettingsRoute> { SettingsScreen() }
    }
}`,
    },
    {
      title: '配合底部导航栏',
      code: `val navController = rememberNavController()
val currentBackStack by navController.currentBackStackEntryAsState()
val currentRoute = currentBackStack?.destination?.route

Scaffold(
    bottomBar = {
        NavigationBar {
            listOf("home", "search", "profile").forEach { route ->
                NavigationBarItem(
                    selected = currentRoute == route,
                    onClick = {
                        navController.navigate(route) {
                            popUpTo(navController.graph.startDestinationId) { saveState = true }
                            launchSingleTop = true
                            restoreState = true
                        }
                    },
                    icon = { /* 图标 */ },
                    label = { Text(route) }
                )
            }
        }
    }
) { padding ->
    NavHost(navController, startDestination = "home", modifier = Modifier.padding(padding)) {
        composable("home") { HomeScreen() }
        composable("search") { SearchScreen() }
        composable("profile") { ProfileScreen() }
    }
}`,
    },
    {
      title: '嵌套导航图',
      code: `NavHost(navController = navController, startDestination = "main") {
    // 主导航图
    navigation(startDestination = "home", route = "main") {
        composable("home") { HomeScreen() }
        composable("search") { SearchScreen() }
    }

    // 认证导航图
    navigation(startDestination = "login", route = "auth") {
        composable("login") {
            LoginScreen(onLoginSuccess = {
                navController.navigate("main") {
                    popUpTo("auth") { inclusive = true }
                }
            })
        }
        composable("register") { RegisterScreen() }
        composable("forgot_password") { ForgotPasswordScreen() }
    }

    // 设置导航图
    navigation(startDestination = "settings_main", route = "settings") {
        composable("settings_main") { SettingsMainScreen() }
        composable("settings_profile") { ProfileSettingsScreen() }
        composable("settings_privacy") { PrivacySettingsScreen() }
    }
}`,
    },
    {
      title: '传递复杂参数',
      code: `// 使用类型安全导航传递复杂对象
@Serializable
data class UserRoute(
    val userId: String,
    val name: String,
    val age: Int,
    val isVerified: Boolean = false
)

NavHost(navController = navController, startDestination = "list") {
    composable("list") {
        UserListScreen(
            onUserClick = { user ->
                navController.navigate(
                    UserRoute(
                        userId = user.id,
                        name = user.name,
                        age = user.age,
                        isVerified = user.verified
                    )
                )
            }
        )
    }

    composable<UserRoute> { backStackEntry ->
        val userRoute = backStackEntry.toRoute<UserRoute>()
        UserDetailScreen(
            userId = userRoute.userId,
            name = userRoute.name,
            age = userRoute.age,
            isVerified = userRoute.isVerified
        )
    }
}`,
    },
    {
      title: '对话框作为导航目的地',
      code: `NavHost(navController = navController, startDestination = "home") {
    composable("home") {
        HomeScreen(
            onShowDialog = { navController.navigate("confirm_dialog") }
        )
    }

    dialog("confirm_dialog") {
        AlertDialog(
            onDismissRequest = { navController.popBackStack() },
            title = { Text("确认操作") },
            text = { Text("确定要执行此操作吗？") },
            confirmButton = {
                TextButton(onClick = {
                    // 执行操作
                    navController.popBackStack()
                }) {
                    Text("确定")
                }
            },
            dismissButton = {
                TextButton(onClick = { navController.popBackStack() }) {
                    Text("取消")
                }
            }
        )
    }
}`,
    },
    {
      title: '深度链接配置',
      code: `// AndroidManifest.xml 配置
// <intent-filter>
//     <action android:name="android.intent.action.VIEW" />
//     <category android:name="android.intent.category.DEFAULT" />
//     <category android:name="android.intent.category.BROWSABLE" />
//     <data android:scheme="myapp" android:host="product" />
// </intent-filter>

NavHost(navController = navController, startDestination = "home") {
    composable(
        route = "product/{productId}",
        deepLinks = listOf(
            navDeepLink {
                uriPattern = "myapp://product/{productId}"
            },
            navDeepLink {
                uriPattern = "https://example.com/product/{productId}"
            }
        )
    ) { backStackEntry ->
        val productId = backStackEntry.arguments?.getString("productId") ?: ""
        ProductScreen(productId = productId)
    }
}

// 使用深度链接导航
val intent = Intent(Intent.ACTION_VIEW, Uri.parse("myapp://product/123"))
context.startActivity(intent)`,
    },
    {
      title: '带可选参数的路由',
      code: `NavHost(navController = navController, startDestination = "search") {
    composable(
        route = "search?query={query}&category={category}",
        arguments = listOf(
            navArgument("query") {
                type = NavType.StringType
                defaultValue = ""
            },
            navArgument("category") {
                type = NavType.StringType
                nullable = true
                defaultValue = null
            }
        )
    ) { backStackEntry ->
        val query = backStackEntry.arguments?.getString("query") ?: ""
        val category = backStackEntry.arguments?.getString("category")

        SearchScreen(
            initialQuery = query,
            initialCategory = category
        )
    }
}

// 导航时可传可不传
navController.navigate("search")
navController.navigate("search?query=kotlin")
navController.navigate("search?query=kotlin&category=books")`,
    },
    {
      title: '共享 ViewModel 跨页面',
      code: `// 在导航图级别共享 ViewModel
@Composable
fun AppNavigation() {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = "step1") {
        navigation(startDestination = "step1", route = "wizard") {
            composable("step1") { backStackEntry ->
                val parentEntry = remember(backStackEntry) {
                    navController.getBackStackEntry("wizard")
                }
                val sharedViewModel: WizardViewModel = viewModel(parentEntry)

                Step1Screen(
                    viewModel = sharedViewModel,
                    onNext = { navController.navigate("step2") }
                )
            }

            composable("step2") { backStackEntry ->
                val parentEntry = remember(backStackEntry) {
                    navController.getBackStackEntry("wizard")
                }
                val sharedViewModel: WizardViewModel = viewModel(parentEntry)

                Step2Screen(
                    viewModel = sharedViewModel,
                    onBack = { navController.popBackStack() },
                    onNext = { navController.navigate("step3") }
                )
            }

            composable("step3") { backStackEntry ->
                val parentEntry = remember(backStackEntry) {
                    navController.getBackStackEntry("wizard")
                }
                val sharedViewModel: WizardViewModel = viewModel(parentEntry)

                Step3Screen(
                    viewModel = sharedViewModel,
                    onFinish = {
                        navController.navigate("home") {
                            popUpTo("wizard") { inclusive = true }
                        }
                    }
                )
            }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '多模块导航架构',
      description: '在多模块项目中集中管理导航',
      code: `// :navigation 模块 - 定义导航路由
sealed interface AppDestination {
    @Serializable object Home : AppDestination
    @Serializable data class ProductDetail(val productId: String) : AppDestination
    @Serializable object Cart : AppDestination
    @Serializable object Profile : AppDestination
}

// :feature:home 模块
@Composable
fun HomeScreen(onNavigateToProduct: (String) -> Unit) {
    // Home 实现
}

// :feature:product 模块
@Composable
fun ProductDetailScreen(productId: String) {
    // Product 实现
}

// :app 模块 - 组装导航图
@Composable
fun AppNavigation() {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = AppDestination.Home) {
        composable<AppDestination.Home> {
            HomeScreen(
                onNavigateToProduct = { productId ->
                    navController.navigate(AppDestination.ProductDetail(productId))
                }
            )
        }

        composable<AppDestination.ProductDetail> { backStackEntry ->
            val destination = backStackEntry.toRoute<AppDestination.ProductDetail>()
            ProductDetailScreen(productId = destination.productId)
        }

        composable<AppDestination.Cart> {
            CartScreen()
        }

        composable<AppDestination.Profile> {
            ProfileScreen()
        }
    }
}`
    },
    {
      title: '认证流程导航',
      description: '根据登录状态动态调整起始页面',
      code: `@Composable
fun AppNavigation(isLoggedIn: Boolean) {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = if (isLoggedIn) "main" else "auth"
    ) {
        // 认证流程
        navigation(startDestination = "login", route = "auth") {
            composable("login") {
                LoginScreen(
                    onLoginSuccess = {
                        navController.navigate("main") {
                            popUpTo("auth") { inclusive = true }
                        }
                    },
                    onNavigateToRegister = { navController.navigate("register") }
                )
            }

            composable("register") {
                RegisterScreen(
                    onRegisterSuccess = {
                        navController.navigate("main") {
                            popUpTo("auth") { inclusive = true }
                        }
                    },
                    onBack = { navController.popBackStack() }
                )
            }
        }

        // 主应用流程
        navigation(startDestination = "home", route = "main") {
            composable("home") {
                HomeScreen(
                    onLogout = {
                        navController.navigate("auth") {
                            popUpTo("main") { inclusive = true }
                        }
                    }
                )
            }

            composable("profile") {
                ProfileScreen()
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '优先使用类型安全导航（Navigation 2.8+）',
      description: '使用 @Serializable 数据类替代字符串路由，编译时检查类型安全',
      goodExample: `@Serializable data class UserRoute(val id: String, val name: String)

composable<UserRoute> { backStackEntry ->
    val route = backStackEntry.toRoute<UserRoute>()
    UserScreen(id = route.id, name = route.name)
}

navController.navigate(UserRoute("123", "Alice"))`,
      badExample: `// 字符串拼接容易出错
composable("user/{id}/{name}") { backStackEntry ->
    val id = backStackEntry.arguments?.getString("id") ?: ""
    val name = backStackEntry.arguments?.getString("name") ?: ""
}

navController.navigate("user/123/Alice")`
    },
    {
      title: '底部导航使用 launchSingleTop 和状态保存',
      description: '避免重复创建实例，保存和恢复页面状态',
      goodExample: `navController.navigate(route) {
    popUpTo(navController.graph.startDestinationId) {
        saveState = true
    }
    launchSingleTop = true
    restoreState = true
}`,
      badExample: `// 每次点击都创建新实例，丢失状态
navController.navigate(route)`
    },
    {
      title: '从 ViewModel 导航使用导航事件',
      description: 'ViewModel 不应持有 NavController，通过事件通知 UI 导航',
      goodExample: `// ViewModel
class HomeViewModel : ViewModel() {
    private val _navigationEvent = MutableStateFlow<NavigationEvent?>(null)
    val navigationEvent = _navigationEvent.asStateFlow()

    fun onProductClick(id: String) {
        _navigationEvent.value = NavigationEvent.ToProductDetail(id)
    }
}

// Composable
LaunchedEffect(Unit) {
    viewModel.navigationEvent.collect { event ->
        when (event) {
            is NavigationEvent.ToProductDetail ->
                navController.navigate(ProductRoute(event.id))
            null -> {}
        }
    }
}`,
      badExample: `// ViewModel 持有 NavController（错误）
class HomeViewModel(private val navController: NavController) : ViewModel() {
    fun onProductClick(id: String) {
        navController.navigate("product/$id")
    }
}`
    },
    {
      title: '使用 SavedStateHandle 保存页面状态',
      description: '进程重建后恢复页面状态',
      goodExample: `class DetailViewModel(
    savedStateHandle: SavedStateHandle
) : ViewModel() {
    private val productId: String = savedStateHandle["productId"] ?: ""

    var scrollPosition by savedStateHandle.saveable { mutableStateOf(0) }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Navigation 2.8+ 引入类型安全导航',
      content: '使用 @Serializable 注解定义路由，替代字符串拼接，支持复杂参数和编译时类型检查'
    },
    {
      type: 'tip',
      title: '使用 currentBackStackEntryAsState 观察当前路由',
      content: 'val currentRoute = navController.currentBackStackEntryAsState().value?.destination?.route 可用于高亮当前导航项'
    },
    {
      type: 'tip',
      title: 'popUpTo 和 popUpToInclusive 清理返回栈',
      content: 'popUpTo 指定返回到某路由，inclusive = true 表示该路由也出栈。常用于登录后清除登录页'
    },
    {
      type: 'tip',
      title: '使用 navigation() 创建嵌套导航图',
      content: '嵌套导航图可以组织相关页面（如认证流程），并支持共享 ViewModel 的作用域'
    },
    {
      type: 'warning',
      title: 'NavController 不应传递给 ViewModel',
      content: 'ViewModel 持有 NavController 会导致内存泄漏和测试困难。使用事件或回调函数代替'
    },
    {
      type: 'warning',
      title: '深度链接需要在 AndroidManifest.xml 配置',
      content: '只在代码中配置 deepLinks 不够，还需要在 manifest 中声明 intent-filter'
    },
    {
      type: 'danger',
      title: '不要在 Composable 外部调用 navigate',
      content: '在 LaunchedEffect/DisposableEffect 外或初始化时调用 navigate 可能导致导航失败或崩溃'
    },
  ],

  relatedComponents: ['scaffold', 'lazy-column', 'remember'],
  since: '1.0.0',
}
