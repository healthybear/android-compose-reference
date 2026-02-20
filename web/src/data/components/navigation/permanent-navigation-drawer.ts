import type { ComponentEntry } from '../../types'

export const permanentNavigationDrawerComponent: ComponentEntry = {
  id: 'permanent-navigation-drawer',
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
      code: `PermanentNavigationDrawer(
    drawerContent = {
        PermanentDrawerSheet(modifier = Modifier.width(240.dp)) {
            Text("导航", modifier = Modifier.padding(16.dp), style = MaterialTheme.typography.titleMedium)
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
    when (selectedRoute) {
        "home" -> HomeScreen()
        "favorites" -> FavoritesScreen()
        "settings" -> SettingsScreen()
    }
}`,
    },
    {
      title: '自适应：宽屏用 Permanent，窄屏用 Modal',
      code: `val windowSizeClass = calculateWindowSizeClass(activity)
val isExpanded = windowSizeClass.widthSizeClass == WindowWidthSizeClass.Expanded

if (isExpanded) {
    PermanentNavigationDrawer(drawerContent = { /* 抽屉内容 */ }) {
        /* 主内容 */
    }
} else {
    ModalNavigationDrawer(drawerState = drawerState, drawerContent = { /* 抽屉内容 */ }) {
        /* 主内容 */
    }
}`,
    },
  ],
}
