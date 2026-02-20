import type { ComponentEntry } from '../../types'

export const pullToRefreshComponent: ComponentEntry = {
  id: 'pull-to-refresh',
  name: 'PullToRefreshBox',
  category: 'Feedback',
  description: '下拉刷新容器，包裹可滚动内容，下拉时显示刷新指示器并触发刷新回调，符合 Material3 规范。',
  tags: ['pull-to-refresh', 'refresh', 'swipe', 'list', '下拉刷新'],
  params: [
    { name: 'isRefreshing', type: 'Boolean', required: true, description: '是否正在刷新，控制指示器显示' },
    { name: 'onRefresh', type: '() -> Unit', required: true, description: '下拉触发刷新的回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'state', type: 'PullToRefreshState', default: 'rememberPullToRefreshState()', description: '刷新状态' },
    { name: 'indicator', type: '@Composable BoxScope.() -> Unit', default: 'PullToRefreshDefaults.Indicator', description: '自定义刷新指示器' },
    { name: 'content', type: '@Composable BoxScope.() -> Unit', required: true, description: '可滚动的内容区域' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var isRefreshing by remember { mutableStateOf(false) }
val scope = rememberCoroutineScope()

PullToRefreshBox(
    isRefreshing = isRefreshing,
    onRefresh = {
        isRefreshing = true
        scope.launch {
            delay(1500)  // 模拟网络请求
            isRefreshing = false
        }
    }
) {
    LazyColumn(modifier = Modifier.fillMaxSize()) {
        items(items) { item ->
            ListItem(headlineContent = { Text(item) })
        }
    }
}`,
    },
    {
      title: '配合 ViewModel',
      code: `val uiState by viewModel.uiState.collectAsState()

PullToRefreshBox(
    isRefreshing = uiState.isRefreshing,
    onRefresh = { viewModel.refresh() }
) {
    LazyColumn {
        items(uiState.items) { Text(it.title, modifier = Modifier.padding(16.dp)) }
    }
}`,
    },
  ],
}
