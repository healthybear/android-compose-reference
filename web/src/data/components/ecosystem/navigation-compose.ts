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
  ],
}
