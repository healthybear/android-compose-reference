import type { ComponentEntry } from '../../types'

export const scaffoldComponent: ComponentEntry = {
  id: 'scaffold',
  name: 'Scaffold',
  category: 'Navigation',
  description: 'Material Design 页面脚手架，统一管理 TopAppBar、BottomBar、FAB、Snackbar 的布局，并通过 paddingValues 避免内容被系统 UI 遮挡。',
  tags: ['scaffold', 'layout', 'appbar', 'structure', '页面结构'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'topBar', type: '@Composable () -> Unit', default: '{}', description: '顶部栏插槽，通常为 TopAppBar' },
    { name: 'bottomBar', type: '@Composable () -> Unit', default: '{}', description: '底部栏插槽，通常为 NavigationBar 或 BottomAppBar' },
    { name: 'snackbarHost', type: '@Composable () -> Unit', default: '{}', description: 'Snackbar 宿主插槽，传入 SnackbarHost(hostState)' },
    { name: 'floatingActionButton', type: '@Composable () -> Unit', default: '{}', description: 'FAB 插槽' },
    { name: 'floatingActionButtonPosition', type: 'FabPosition', default: 'FabPosition.End', description: 'FAB 位置，End 或 Center' },
    { name: 'containerColor', type: 'Color', default: 'MaterialTheme.colorScheme.background', description: '背景色' },
    { name: 'content', type: '@Composable (PaddingValues) -> Unit', required: true, description: '页面内容，必须将 paddingValues 应用到内容避免遮挡' },
  ],
  examples: [
    {
      title: '标准页面结构',
      code: `Scaffold(
    topBar = {
        TopAppBar(title = { Text("首页") })
    },
    bottomBar = {
        NavigationBar {
            NavigationBarItem(selected = true, onClick = {}, icon = { Icon(Icons.Default.Home, null) }, label = { Text("首页") })
            NavigationBarItem(selected = false, onClick = {}, icon = { Icon(Icons.Default.Search, null) }, label = { Text("搜索") })
        }
    },
    floatingActionButton = {
        FloatingActionButton(onClick = { /* 新建 */ }) {
            Icon(Icons.Default.Add, contentDescription = "新建")
        }
    }
) { paddingValues ->
    LazyColumn(contentPadding = paddingValues) {
        items(50) { Text("Item $it", modifier = Modifier.padding(16.dp)) }
    }
}`,
    },
    {
      title: '带 Snackbar',
      code: `val snackbarHostState = remember { SnackbarHostState() }
val scope = rememberCoroutineScope()

Scaffold(
    snackbarHost = { SnackbarHost(snackbarHostState) },
    topBar = { TopAppBar(title = { Text("详情") }) }
) { padding ->
    Column(modifier = Modifier.padding(padding)) {
        Button(onClick = {
            scope.launch { snackbarHostState.showSnackbar("保存成功") }
        }) {
            Text("保存")
        }
    }
}`,
    },
  ],
}
