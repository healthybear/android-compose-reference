import type { ComponentEntry } from '../../types'

export const centerAlignedTopAppBarComponent: ComponentEntry = {
  id: 'center-aligned-top-app-bar',
  name: 'CenterAlignedTopAppBar',
  category: 'Navigation',
  description: '标题居中的顶部应用栏，适合强调页面标题的场景，参数与 TopAppBar 完全相同。',
  tags: ['appbar', 'topbar', 'center', 'title', '居中标题栏'],
  params: [
    { name: 'title', type: '@Composable () -> Unit', required: true, description: '居中显示的标题内容' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'navigationIcon', type: '@Composable () -> Unit', default: '{}', description: '左侧导航图标' },
    { name: 'actions', type: '@Composable RowScope.() -> Unit', default: '{}', description: '右侧操作按钮' },
    { name: 'colors', type: 'TopAppBarColors', default: 'TopAppBarDefaults.centerAlignedTopAppBarColors()', description: '颜色配置' },
    { name: 'scrollBehavior', type: 'TopAppBarScrollBehavior?', default: 'null', description: '滚动联动行为' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `CenterAlignedTopAppBar(
    title = { Text("详情") },
    navigationIcon = {
        IconButton(onClick = { navController.popBackStack() }) {
            Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "返回")
        }
    },
    actions = {
        IconButton(onClick = { /* 分享 */ }) {
            Icon(Icons.Default.Share, contentDescription = "分享")
        }
    }
)`,
    },
    {
      title: '滚动时折叠（pinnedScroll）',
      code: `val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()

Scaffold(
    topBar = {
        CenterAlignedTopAppBar(
            title = { Text("文章") },
            scrollBehavior = scrollBehavior
        )
    },
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection)
) { padding ->
    LazyColumn(contentPadding = padding) {
        items(50) { Text("段落 $it", modifier = Modifier.padding(16.dp)) }
    }
}`,
    },
  ],
}
