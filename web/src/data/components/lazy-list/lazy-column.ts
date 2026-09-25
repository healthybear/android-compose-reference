import type { ComponentEntry } from '../../types'

export const lazyColumnComponent: ComponentEntry = {
  id: 'lazy-column',
  name: 'LazyColumn',
  category: 'LazyList',
  description: 'LazyColumn 是垂直方向的懒加载列表容器，仅渲染可见区域的子项，类似 Android 的 RecyclerView。适合展示大量数据，自动处理视图回收和重用，性能优异。',
  tags: ['lazycolumn', 'list', 'scroll', 'recyclerview', 'lazy', 'performance'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、背景等' },
    { name: 'state', type: 'LazyListState', default: 'rememberLazyListState()', description: '列表滚动状态，用于监听滚动位置或程序化滚动' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'PaddingValues(0.dp)', description: '内容区域内边距，影响首尾项与边界的距离' },
    { name: 'reverseLayout', type: 'Boolean', default: 'false', description: '是否反向排列（从底部向上布局），常用于聊天界面' },
    { name: 'verticalArrangement', type: 'Arrangement.Vertical', default: 'Arrangement.Top', description: '子项垂直排列方式（Top/Center/Bottom/SpaceBetween/spacedBy）' },
    { name: 'horizontalAlignment', type: 'Alignment.Horizontal', default: 'Alignment.Start', description: '子项水平对齐方式（Start/CenterHorizontally/End）' },
    { name: 'flingBehavior', type: 'FlingBehavior', default: 'ScrollableDefaults.flingBehavior()', description: '惯性滚动行为配置' },
    { name: 'userScrollEnabled', type: 'Boolean', default: 'true', description: '是否允许用户手势滚动，false 时仍可通过 state 程序化滚动' },
    { name: 'content', type: 'LazyListScope.() -> Unit', required: true, description: '列表内容，使用 item/items/itemsIndexed/stickyHeader 等 DSL 构建' },
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
      title: '使用数据源 + key',
      code: `data class User(val id: String, val name: String)

val users = listOf(
    User("1", "Alice"),
    User("2", "Bob")
)

LazyColumn {
    items(
        items = users,
        key = { user -> user.id }  // 提供稳定 key 优化重组
    ) { user ->
        ListItem(
            headlineContent = { Text(user.name) }
        )
    }
}`,
    },
    {
      title: '带分割线和间距',
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
            is FeedItem.Header -> "header_" + item.title
            is FeedItem.Post -> "post_" + item.id
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
    {
      title: '程序化滚动',
      code: `val state = rememberLazyListState()
val scope = rememberCoroutineScope()

LazyColumn(state = state) {
    items(100) { index ->
        Text("Item $index", modifier = Modifier.padding(16.dp))
    }
}

Button(onClick = {
    scope.launch {
        state.animateScrollToItem(50)
    }
}) {
    Text("跳到第 50 项")
}`,
    },
    {
      title: '监听滚动状态',
      code: `val state = rememberLazyListState()

LaunchedEffect(state) {
    snapshotFlow { state.firstVisibleItemIndex }
        .collect { index ->
            println("当前首个可见项: $index")
        }
}

LazyColumn(state = state) {
    items(100) { index ->
        Text("Item $index", modifier = Modifier.padding(16.dp))
    }
}`,
    },
    {
      title: '粘性头部（Sticky Header）',
      code: `LazyColumn {
    val grouped = items.groupBy { it.category }

    grouped.forEach { (category, items) ->
        stickyHeader {
            Surface(
                modifier = Modifier.fillMaxWidth(),
                color = MaterialTheme.colorScheme.surfaceVariant
            ) {
                Text(
                    text = category,
                    modifier = Modifier.padding(16.dp),
                    style = MaterialTheme.typography.titleMedium
                )
            }
        }

        items(items, key = { it.id }) { item ->
            ListItem(headlineContent = { Text(item.name) })
        }
    }
}`,
    },
  ],
  demo: { id: 'lazy-column', sourceFile: 'LazyColumnDemo.kt' },

  useCases: [
    {
      title: '分页加载列表',
      description: '监听滚动到底部，自动触发加载更多',
      code: `@Composable
fun PaginatedList(
    items: List<Item>,
    isLoading: Boolean,
    onLoadMore: () -> Unit
) {
    val state = rememberLazyListState()

    // 监听滚动到底部
    LaunchedEffect(state) {
        snapshotFlow {
            val layoutInfo = state.layoutInfo
            val totalItems = layoutInfo.totalItemsCount
            val lastVisible = layoutInfo.visibleItemsInfo.lastOrNull()?.index ?: 0

            lastVisible >= totalItems - 3  // 提前 3 项触发
        }
        .distinctUntilChanged()
        .filter { it }
        .collect {
            if (!isLoading) {
                onLoadMore()
            }
        }
    }

    LazyColumn(state = state) {
        items(items, key = { it.id }) { item ->
            ItemCard(item)
        }

        if (isLoading) {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator()
                }
            }
        }
    }
}`
    },
    {
      title: '聊天消息列表（反向布局）',
      description: '使用 reverseLayout 实现从底部开始的聊天界面',
      code: `@Composable
fun ChatMessageList(messages: List<Message>) {
    val state = rememberLazyListState()

    LaunchedEffect(messages.size) {
        // 新消息到达时自动滚动到底部
        if (messages.isNotEmpty()) {
            state.animateScrollToItem(0)
        }
    }

    LazyColumn(
        state = state,
        reverseLayout = true,  // 从底部开始布局
        modifier = Modifier.fillMaxSize()
    ) {
        items(
            items = messages.reversed(),  // 反转数据源
            key = { it.id }
        ) { message ->
            MessageBubble(
                message = message,
                isFromMe = message.senderId == currentUserId,
                modifier = Modifier.padding(
                    horizontal = 16.dp,
                    vertical = 4.dp
                )
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '始终提供稳定的 key',
      description: 'key 应该唯一且稳定，避免使用 index 作为 key',
      goodExample: `LazyColumn {
    items(
        items = users,
        key = { user -> user.id }  // 使用唯一 ID
    ) { user ->
        UserCard(user)
    }
}`,
      badExample: `LazyColumn {
    itemsIndexed(users) { index, user ->
        // 使用 index 作为隐式 key，删除/插入时会导致错误重组
        UserCard(user)
    }
}`
    },
    {
      title: '使用 contentType 优化异构列表',
      description: '不同类型的项应该声明不同的 contentType，提高重用效率',
      goodExample: `LazyColumn {
    items(
        items = feedItems,
        contentType = { item ->
            when (item) {
                is Header -> "header"
                is Post -> "post"
                is Ad -> "ad"
            }
        }
    ) { item ->
        RenderItem(item)
    }
}`,
      badExample: `LazyColumn {
    items(feedItems) { item ->
        // 未声明 contentType，不同类型无法高效重用
        RenderItem(item)
    }
}`
    },
    {
      title: '避免在 item 内嵌套滚动容器',
      description: '不要在 LazyColumn 的 item 中再嵌套 LazyColumn/Column(Modifier.verticalScroll)',
      goodExample: `// 方案 1：使用单一 LazyColumn + 不同 contentType
LazyColumn {
    item(contentType = "header") { Header() }
    items(list1, contentType = "type1") { Item1(it) }
    item(contentType = "divider") { Divider() }
    items(list2, contentType = "type2") { Item2(it) }
}

// 方案 2：如果确需嵌套，使用固定高度
LazyColumn {
    item {
        LazyRow(
            modifier = Modifier.height(100.dp)  // 固定高度
        ) {
            items(horizontalItems) { HorizontalItem(it) }
        }
    }
}`,
      badExample: `LazyColumn {
    item {
        // 不要在 item 内嵌套无限高度的滚动容器
        LazyColumn(modifier = Modifier.fillMaxHeight()) {
            items(innerList) { InnerItem(it) }
        }
    }
}`
    },
    {
      title: '合理使用 contentPadding',
      description: 'contentPadding 用于内容区域的内边距，不影响滚动条位置',
      goodExample: `LazyColumn(
    contentPadding = PaddingValues(
        horizontal = 16.dp,
        vertical = 8.dp
    )
) {
    items(list) { Item(it) }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'LazyColumn 不是 Column + 滚动',
      content: 'LazyColumn 是懒加载的，只渲染可见项和周围的少量缓冲项。如果数据量少（< 20 项），使用 Column + Modifier.verticalScroll 更简单'
    },
    {
      type: 'warning',
      title: '避免在 item 内使用 remember 缓存耗时计算',
      content: '由于 item 会被回收重用，remember 的状态可能不会如预期保留。对于列表项的状态，应该存储在数据模型中或使用 rememberSaveable'
    },
    {
      type: 'info',
      title: '使用 key 提升性能',
      content: '提供稳定的 key 后，当数据顺序变化时，Compose 可以识别并移动已有的组合，而不是重新创建，大幅提升性能'
    },
    {
      type: 'info',
      title: 'LazyListState 可以保存和恢复',
      content: '使用 rememberSaveable { LazyListState() } 可以在配置变更（如旋转屏幕）时保持滚动位置'
    },
    {
      type: 'error',
      title: 'animateScrollToItem 在布局完成前调用可能失败',
      content: '如果在 LazyColumn 首次组合时立即调用 animateScrollToItem，可能因布局尚未完成而失败。建议在 LaunchedEffect 中延迟调用或监听 layoutInfo'
    },
  ],

  relatedComponents: ['lazy-row', 'lazy-vertical-grid', 'column', 'list-item'],
  since: '1.0.0',
}
