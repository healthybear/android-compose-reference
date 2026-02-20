import type { ComponentEntry } from '../../types'

export const navigationBarComponent: ComponentEntry = {
  id: 'navigation-bar',
  name: 'NavigationBar',
  category: 'Navigation',
  description: 'Material3 底部导航栏，包含 2-5 个 NavigationBarItem，适合手机端主要页面间的切换。',
  tags: ['navigation', 'bottom-nav', 'tab', 'navbar', '底部导航'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'containerColor', type: 'Color', default: 'NavigationBarDefaults.containerColor', description: '背景色' },
    { name: 'contentColor', type: 'Color', default: 'MaterialTheme.colorScheme.contentColorFor(containerColor)', description: '内容颜色' },
    { name: 'tonalElevation', type: 'Dp', default: 'NavigationBarDefaults.Elevation', description: '色调高度' },
    { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '导航项内容，通常为多个 NavigationBarItem' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `data class NavItem(val label: String, val icon: ImageVector)

val navItems = listOf(
    NavItem("首页", Icons.Default.Home),
    NavItem("搜索", Icons.Default.Search),
    NavItem("收藏", Icons.Default.Favorite),
    NavItem("我的", Icons.Default.Person)
)
var selectedIndex by remember { mutableIntStateOf(0) }

NavigationBar {
    navItems.forEachIndexed { index, item ->
        NavigationBarItem(
            selected = selectedIndex == index,
            onClick = { selectedIndex = index },
            icon = { Icon(item.icon, contentDescription = item.label) },
            label = { Text(item.label) }
        )
    }
}`,
    },
    {
      title: '配合 NavController 路由',
      code: `val navController = rememberNavController()
val currentBackStack by navController.currentBackStackEntryAsState()
val currentRoute = currentBackStack?.destination?.route

NavigationBar {
    navItems.forEach { item ->
        NavigationBarItem(
            selected = currentRoute == item.route,
            onClick = {
                navController.navigate(item.route) {
                    popUpTo(navController.graph.startDestinationId) { saveState = true }
                    launchSingleTop = true
                    restoreState = true
                }
            },
            icon = { Icon(item.icon, contentDescription = item.label) },
            label = { Text(item.label) }
        )
    }
}`,
    },
  ],
}
