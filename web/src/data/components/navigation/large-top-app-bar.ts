import type { ComponentEntry } from '../../types'

export const largeTopAppBarComponent: ComponentEntry = {
  id: 'large-top-app-bar',
  name: 'LargeTopAppBar',
  category: 'Navigation',
  description: '大标题顶部应用栏，标题显示在栏体下方且字号更大，滚动时标题折叠到顶部小字，适合内容详情页。',
  tags: ['appbar', 'topbar', 'large', 'collapsing', '大标题栏'],
  params: [
    { name: 'title', type: '@Composable () -> Unit', required: true, description: '大标题内容，折叠后显示为小标题' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'navigationIcon', type: '@Composable () -> Unit', default: '{}', description: '左侧导航图标' },
    { name: 'actions', type: '@Composable RowScope.() -> Unit', default: '{}', description: '右侧操作按钮' },
    { name: 'colors', type: 'TopAppBarColors', default: 'TopAppBarDefaults.largeTopAppBarColors()', description: '颜色配置' },
    { name: 'collapsedHeight', type: 'Dp', default: 'TopAppBarDefaults.TopAppBarExpandedHeight', description: '折叠后的高度' },
    { name: 'expandedHeight', type: 'Dp', default: 'TopAppBarDefaults.LargeAppBarExpandedHeight', description: '展开时的高度' },
    { name: 'windowInsets', type: 'WindowInsets', default: 'TopAppBarDefaults.windowInsets', description: '窗口内边距，edge-to-edge 时控制与状态栏的间距' },
    { name: 'scrollBehavior', type: 'TopAppBarScrollBehavior?', default: 'null', description: '滚动联动行为，通常用 exitUntilCollapsedScrollBehavior' },
  ],
  examples: [
    {
      title: '滚动折叠大标题',
      code: `val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

Scaffold(
    topBar = {
        LargeTopAppBar(
            title = { Text("Jetpack Compose 完全指南") },
            navigationIcon = {
                IconButton(onClick = { navController.popBackStack() }) {
                    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "返回")
                }
            },
            scrollBehavior = scrollBehavior
        )
    },
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection)
) { padding ->
    LazyColumn(contentPadding = padding) {
        items(50) { Text("内容段落 $it", modifier = Modifier.padding(16.dp)) }
    }
}`,
    },
    {
      title: 'MediumTopAppBar（中等大小）',
      code: `// MediumTopAppBar 参数与 LargeTopAppBar 相同，标题字号介于两者之间
val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

MediumTopAppBar(
    title = { Text("分类") },
    scrollBehavior = scrollBehavior
)`,
    },
  ],
}
