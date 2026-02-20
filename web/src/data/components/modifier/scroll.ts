import type { ComponentEntry } from '../../types'

export const modifierScrollComponent: ComponentEntry = {
  id: 'modifier-scroll',
  name: 'Modifier.verticalScroll / nestedScroll',
  category: 'Modifier',
  description: 'verticalScroll/horizontalScroll 为 Column/Row 添加滚动；nestedScroll 处理嵌套滚动协调，如 TopAppBar 联动。',
  tags: ['modifier', 'scroll', 'nestedscroll', 'scrollable', 'verticalscroll'],
  params: [
    { name: 'verticalScroll(state)', type: 'Modifier', description: '为 Column 等添加垂直滚动' },
    { name: 'horizontalScroll(state)', type: 'Modifier', description: '为 Row 等添加水平滚动' },
    { name: 'scrollable(state, orientation)', type: 'Modifier', description: '底层滚动修饰符，需配合 ScrollableState' },
    { name: 'nestedScroll(connection)', type: 'Modifier', description: '参与嵌套滚动协议，与 TopAppBar scrollBehavior 配合' },
  ],
  examples: [
    {
      title: 'Column 可滚动',
      code: `val scrollState = rememberScrollState()

Column(
    modifier = Modifier
        .fillMaxSize()
        .verticalScroll(scrollState)
) {
    repeat(50) { Text("Item $it", modifier = Modifier.padding(16.dp)) }
}`,
    },
    {
      title: 'TopAppBar 滚动联动',
      code: `val scrollBehavior = TopAppBarDefaults.enterAlwaysScrollBehavior()

Scaffold(
    topBar = {
        TopAppBar(
            title = { Text("标题") },
            scrollBehavior = scrollBehavior
        )
    },
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection)
) { padding ->
    LazyColumn(contentPadding = padding) {
        items(50) { Text("Item $it", modifier = Modifier.padding(16.dp)) }
    }
}`,
    },
  ],
}
