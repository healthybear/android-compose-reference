import type { ComponentEntry } from '../../types'

export const topAppBarComponent: ComponentEntry = {
  id: 'top-app-bar',
  name: 'TopAppBar',
  category: 'Navigation',
  description: '标准顶部应用栏，单行高度，支持导航图标、标题和操作按钮，可配合 scrollBehavior 实现滚动联动。',
  tags: ['appbar', 'toolbar', 'topbar', 'navigation', '顶部栏'],
  params: [
    { name: 'title', type: '@Composable () -> Unit', required: true, description: '标题内容' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'navigationIcon', type: '@Composable () -> Unit', default: '{}', description: '左侧导航图标，通常为返回按钮' },
    { name: 'actions', type: '@Composable RowScope.() -> Unit', default: '{}', description: '右侧操作按钮区域' },
    { name: 'colors', type: 'TopAppBarColors', default: 'TopAppBarDefaults.topAppBarColors()', description: '颜色配置' },
    { name: 'scrollBehavior', type: 'TopAppBarScrollBehavior?', default: 'null', description: '滚动联动行为，需配合 nestedScroll 使用' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `TopAppBar(
    title = { Text("设置") },
    navigationIcon = {
        IconButton(onClick = { navController.popBackStack() }) {
            Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "返回")
        }
    },
    actions = {
        IconButton(onClick = { /* 搜索 */ }) {
            Icon(Icons.Default.Search, contentDescription = "搜索")
        }
        IconButton(onClick = { /* 更多 */ }) {
            Icon(Icons.Default.MoreVert, contentDescription = "更多")
        }
    }
)`,
    },
    {
      title: '滚动时隐藏（enterAlways）',
      code: `val scrollBehavior = TopAppBarDefaults.enterAlwaysScrollBehavior()

Scaffold(
    topBar = {
        TopAppBar(
            title = { Text("列表") },
            scrollBehavior = scrollBehavior
        )
    },
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection)
) { padding ->
    LazyColumn(contentPadding = padding) {
        items(100) { Text("Item $it", modifier = Modifier.padding(16.dp)) }
    }
}`,
    },
  ],
}
