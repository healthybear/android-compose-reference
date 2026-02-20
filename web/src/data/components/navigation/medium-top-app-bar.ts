import type { ComponentEntry } from '../../types'

export const mediumTopAppBarComponent: ComponentEntry = {
  id: 'medium-top-app-bar',
  name: 'MediumTopAppBar',
  category: 'Navigation',
  description: '中等高度顶部应用栏，展开时标题较大，滚动折叠后变为标准高度，介于 TopAppBar 和 LargeTopAppBar 之间。',
  tags: ['appbar', 'topbar', 'medium', 'collapsing', '顶部栏'],
  params: [
    { name: 'title', type: '@Composable () -> Unit', required: true, description: '标题内容，折叠时自动缩小' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'navigationIcon', type: '@Composable () -> Unit', default: '{}', description: '左侧导航图标' },
    { name: 'actions', type: '@Composable RowScope.() -> Unit', default: '{}', description: '右侧操作按钮' },
    { name: 'colors', type: 'TopAppBarColors', default: 'TopAppBarDefaults.mediumTopAppBarColors()', description: '颜色配置' },
    { name: 'collapsedHeight', type: 'Dp', default: 'TopAppBarDefaults.TopAppBarExpandedHeight', description: '折叠后的高度' },
    { name: 'expandedHeight', type: 'Dp', default: 'TopAppBarDefaults.MediumAppBarExpandedHeight', description: '展开时的高度' },
    { name: 'windowInsets', type: 'WindowInsets', default: 'TopAppBarDefaults.windowInsets', description: '窗口内边距' },
    { name: 'scrollBehavior', type: 'TopAppBarScrollBehavior?', default: 'null', description: '滚动联动行为，通常用 exitUntilCollapsedScrollBehavior' },
  ],
  examples: [
    {
      title: '滚动折叠效果',
      code: `val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

Scaffold(
    topBar = {
        MediumTopAppBar(
            title = { Text("文章详情") },
            navigationIcon = {
                IconButton(onClick = { navController.popBackStack() }) {
                    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "返回")
                }
            },
            actions = {
                IconButton(onClick = { /* 分享 */ }) {
                    Icon(Icons.Default.Share, contentDescription = "分享")
                }
            },
            scrollBehavior = scrollBehavior
        )
    },
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection)
) { padding ->
    LazyColumn(contentPadding = padding) {
        items(50) {
            Text("段落内容 \$it", modifier = Modifier.padding(16.dp))
        }
    }
}`,
    },
  ],
}
