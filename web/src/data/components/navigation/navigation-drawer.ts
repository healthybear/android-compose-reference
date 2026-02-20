import type { ComponentEntry } from '../../types'

export const modalNavigationDrawerComponent: ComponentEntry = {
  id: 'navigation-drawer',
  name: 'ModalNavigationDrawer',
  category: 'Navigation',
  description: '模态侧边导航抽屉，从左侧滑入并带遮罩层，适合手机端的主导航菜单，关闭时内容区域可正常交互。',
  tags: ['drawer', 'navigation', 'sidebar', 'modal', '侧边抽屉'],
  params: [
    { name: 'drawerContent', type: '@Composable () -> Unit', required: true, description: '抽屉内容，通常为 ModalDrawerSheet { ... }' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'drawerState', type: 'DrawerState', default: 'rememberDrawerState(DrawerValue.Closed)', description: '抽屉开关状态' },
    { name: 'gesturesEnabled', type: 'Boolean', default: 'true', description: '是否允许手势滑动开关' },
    { name: 'scrimColor', type: 'Color', default: 'DrawerDefaults.scrimColor', description: '遮罩层颜色' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '主内容区域' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `val drawerState = rememberDrawerState(DrawerValue.Closed)
val scope = rememberCoroutineScope()

ModalNavigationDrawer(
    drawerState = drawerState,
    drawerContent = {
        ModalDrawerSheet {
            Text("应用名称", modifier = Modifier.padding(16.dp), style = MaterialTheme.typography.titleLarge)
            HorizontalDivider()
            NavigationDrawerItem(
                label = { Text("首页") },
                selected = true,
                icon = { Icon(Icons.Default.Home, contentDescription = null) },
                onClick = { scope.launch { drawerState.close() } }
            )
            NavigationDrawerItem(
                label = { Text("设置") },
                selected = false,
                icon = { Icon(Icons.Default.Settings, contentDescription = null) },
                onClick = { scope.launch { drawerState.close() } }
            )
        }
    }
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("首页") },
                navigationIcon = {
                    IconButton(onClick = { scope.launch { drawerState.open() } }) {
                        Icon(Icons.Default.Menu, contentDescription = "菜单")
                    }
                }
            )
        }
    ) { padding ->
        // 页面内容
    }
}`,
    },
    {
      title: '程序控制开关',
      code: `val drawerState = rememberDrawerState(DrawerValue.Closed)
val scope = rememberCoroutineScope()

// 打开
scope.launch { drawerState.open() }

// 关闭
scope.launch { drawerState.close() }

// 切换
scope.launch {
    if (drawerState.isClosed) drawerState.open() else drawerState.close()
}`,
    },
  ],
}
