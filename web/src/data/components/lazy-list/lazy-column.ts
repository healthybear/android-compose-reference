import type { ComponentEntry } from '../../types'

export const lazyColumnComponent: ComponentEntry = {
  id: 'lazy-column',
  name: 'LazyColumn',
  category: 'LazyList',
  description: '垂直方向的懒加载列表，只渲染可见区域的子项，对应 RecyclerView（垂直）。',
  tags: ['lazycolumn', 'list', 'scroll', 'recyclerview', 'lazy'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'state', type: 'LazyListState', default: 'rememberLazyListState()', description: '列表滚动状态' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'PaddingValues(0.dp)', description: '内容区域内边距' },
    { name: 'reverseLayout', type: 'Boolean', default: 'false', description: '是否反向排列（从底部开始）' },
    { name: 'verticalArrangement', type: 'Arrangement.Vertical', default: 'Arrangement.Top', description: '子项垂直排列方式' },
    { name: 'horizontalAlignment', type: 'Alignment.Horizontal', default: 'Alignment.Start', description: '子项水平对齐方式' },
    { name: 'userScrollEnabled', type: 'Boolean', default: 'true', description: '是否允许用户手势滚动，false 时仍可程序化滚动' },
    { name: 'content', type: 'LazyListScope.() -> Unit', required: true, description: '列表内容，使用 item/items DSL' },
  ],
  examples: [
    {
      title: '基础列表',
      code: `LazyColumn {
    items(100) { index ->
        Text(
            text = "Item $index",
            modifier = Modifier.padding(16.dp)
        )
    }
}`,
    },
    {
      title: '带分割线 + 内边距',
      code: `LazyColumn(
    contentPadding = PaddingValues(vertical = 8.dp),
    verticalArrangement = Arrangement.spacedBy(4.dp)
) {
    items(items = dataList, key = { it.id }) { item ->
        ListItem(headlineContent = { Text(item.title) })
        HorizontalDivider()
    }
}`,
    },
    {
      title: '混合类型列表（contentType 优化）',
      code: `sealed class FeedItem {
    data class Header(val title: String) : FeedItem()
    data class Post(val id: Int, val text: String) : FeedItem()
}

LazyColumn {
    items(
        items = feedItems,
        key = { item -> when (item) {
            is FeedItem.Header -> "header_\${item.title}"
            is FeedItem.Post -> "post_\${item.id}"
        }},
        contentType = { item -> item::class }  // 相同类型复用组合项
    ) { item ->
        when (item) {
            is FeedItem.Header -> Text(item.title, style = MaterialTheme.typography.titleMedium)
            is FeedItem.Post -> ListItem(headlineContent = { Text(item.text) })
        }
    }
}`,
    },
      code: `val state = rememberLazyListState()
val scope = rememberCoroutineScope()

LazyColumn(state = state) {
    items(100) { Text("Item $it", modifier = Modifier.padding(16.dp)) }
}

Button(onClick = { scope.launch { state.animateScrollToItem(50) } }) {
    Text("跳到第 50 项")
}`,
    },
  ],
  demoId: 'lazy-column',
}
