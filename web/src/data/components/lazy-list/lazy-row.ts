import type { ComponentEntry } from '../../types'

export const lazyRowComponent: ComponentEntry = {
  id: 'lazy-row',
  demo: { id: 'lazy-row', sourceFile: 'LazyRowDemo.kt' },
  name: 'LazyRow',
  category: 'LazyList',
  description: 'LazyRow 是水平方向的懒加载列表容器，仅渲染可见区域的子项，类似水平滚动的 RecyclerView。适合展示横向滚动的卡片、标签、图片等内容。',
  tags: ['lazyrow', 'list', 'horizontal', 'scroll', 'recyclerview', 'carousel'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、背景等' },
    { name: 'state', type: 'LazyListState', default: 'rememberLazyListState()', description: '列表滚动状态，用于监听滚动位置或程序化滚动' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'PaddingValues(0.dp)', description: '内容区域内边距，常用于首尾留白' },
    { name: 'reverseLayout', type: 'Boolean', default: 'false', description: '是否反向排列（从右向左布局，RTL 环境下自动适配）' },
    { name: 'horizontalArrangement', type: 'Arrangement.Horizontal', default: 'Arrangement.Start', description: '子项水平排列方式（Start/Center/End/SpaceBetween/spacedBy）' },
    { name: 'verticalAlignment', type: 'Alignment.Vertical', default: 'Alignment.Top', description: '子项垂直对齐方式（Top/CenterVertically/Bottom）' },
    { name: 'flingBehavior', type: 'FlingBehavior', default: 'ScrollableDefaults.flingBehavior()', description: '惯性滚动行为配置' },
    { name: 'userScrollEnabled', type: 'Boolean', default: 'true', description: '是否允许用户手势滚动' },
    { name: 'content', type: 'LazyListScope.() -> Unit', required: true, description: '列表内容，使用 item/items DSL 构建' },
  ],
  examples: [
    {
      title: '基础横向列表',
      code: `LazyRow(
    contentPadding = PaddingValues(horizontal = 16.dp),
    horizontalArrangement = Arrangement.spacedBy(12.dp)
) {
    items(20) { index ->
        Card(modifier = Modifier.size(120.dp, 80.dp)) {
            Box(contentAlignment = Alignment.Center) {
                Text("Item $index")
            }
        }
    }
}`,
    },
    {
      title: '类别标签列表',
      code: `LazyRow(
    contentPadding = PaddingValues(horizontal = 16.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp)
) {
    items(
        items = categories,
        key = { it.id }
    ) { category ->
        FilterChip(
            selected = selectedCategory == category.id,
            onClick = { selectedCategory = category.id },
            label = { Text(category.name) }
        )
    }
}`,
    },
    {
      title: '故事/状态圆形头像',
      code: `LazyRow(
    contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
    horizontalArrangement = Arrangement.spacedBy(12.dp)
) {
    items(stories, key = { it.userId }) { story ->
        Column(
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Surface(
                shape = CircleShape,
                border = BorderStroke(2.dp, MaterialTheme.colorScheme.primary),
                modifier = Modifier.size(64.dp)
            ) {
                AsyncImage(
                    model = story.avatarUrl,
                    contentDescription = story.userName,
                    modifier = Modifier.padding(2.dp),
                    contentScale = ContentScale.Crop
                )
            }
            Spacer(Modifier.height(4.dp))
            Text(
                text = story.userName,
                style = MaterialTheme.typography.bodySmall,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
                modifier = Modifier.width(64.dp)
            )
        }
    }
}`,
    },
    {
      title: '图片轮播',
      code: `val state = rememberLazyListState()
val scope = rememberCoroutineScope()

LazyRow(
    state = state,
    modifier = Modifier.fillMaxWidth()
) {
    items(images, key = { it.id }) { image ->
        AsyncImage(
            model = image.url,
            contentDescription = image.description,
            modifier = Modifier
                .fillParentMaxWidth()
                .height(200.dp)
                .clickable { /* 查看大图 */ },
            contentScale = ContentScale.Crop
        )
    }
}

// 指示器
Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.Center
) {
    repeat(images.size) { index ->
        val isActive = state.firstVisibleItemIndex == index
        Box(
            modifier = Modifier
                .size(8.dp)
                .padding(2.dp)
                .background(
                    if (isActive) Color.White else Color.White.copy(alpha = 0.5f),
                    CircleShape
                )
        )
    }
}`,
    },
    {
      title: '带标题的卡片横滑',
      code: `Column {
    Text(
        text = "推荐内容",
        style = MaterialTheme.typography.titleMedium,
        modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
    )

    LazyRow(
        contentPadding = PaddingValues(horizontal = 16.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(recommendations, key = { it.id }) { item ->
            Card(
                modifier = Modifier.width(160.dp),
                onClick = { /* 打开详情 */ }
            ) {
                Column {
                    AsyncImage(
                        model = item.imageUrl,
                        contentDescription = null,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(120.dp),
                        contentScale = ContentScale.Crop
                    )
                    Text(
                        text = item.title,
                        modifier = Modifier.padding(12.dp),
                        style = MaterialTheme.typography.bodyMedium,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '首页横向内容分区',
      description: '常见于电商、视频应用的首页，多个横向滑动分区',
      code: `LazyColumn {
    item {
        // 顶部轮播
        BannerCarousel(banners)
    }

    item {
        SectionHeader("热门推荐")
        LazyRow(
            contentPadding = PaddingValues(horizontal = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(hotItems, key = { it.id }) { item ->
                ProductCard(item, modifier = Modifier.width(150.dp))
            }
        }
    }

    item {
        SectionHeader("今日特惠")
        LazyRow(
            contentPadding = PaddingValues(horizontal = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(dealsItems, key = { it.id }) { item ->
                DealCard(item, modifier = Modifier.width(180.dp))
            }
        }
    }
}`
    },
    {
      title: '自动循环轮播',
      description: '使用 LaunchedEffect 实现自动轮播效果',
      code: `@Composable
fun AutoCarousel(images: List<String>) {
    val state = rememberLazyListState()
    val scope = rememberCoroutineScope()

    // 自动轮播
    LaunchedEffect(Unit) {
        while (true) {
            delay(3000)
            val nextIndex = (state.firstVisibleItemIndex + 1) % images.size
            scope.launch {
                state.animateScrollToItem(nextIndex)
            }
        }
    }

    LazyRow(
        state = state,
        modifier = Modifier.fillMaxWidth()
    ) {
        items(images.size) { index ->
            AsyncImage(
                model = images[index],
                contentDescription = null,
                modifier = Modifier
                    .fillParentMaxWidth()
                    .height(200.dp),
                contentScale = ContentScale.Crop
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 fillParentMaxWidth 实现轮播效果',
      description: '让每个子项填满父容器宽度，实现一次滚动一屏的效果',
      goodExample: `LazyRow(modifier = Modifier.fillMaxWidth()) {
    items(images) { image ->
        Image(
            painter = painterResource(image),
            contentDescription = null,
            modifier = Modifier.fillParentMaxWidth()
        )
    }
}`,
      badExample: `LazyRow(modifier = Modifier.fillMaxWidth()) {
    items(images) { image ->
        // 使用固定宽度无法适配不同屏幕
        Image(
            painter = painterResource(image),
            contentDescription = null,
            modifier = Modifier.width(360.dp)
        )
    }
}`
    },
    {
      title: '固定子项高度',
      description: 'LazyRow 中的子项应该有明确的高度，避免测量异常',
      goodExample: `LazyRow {
    items(cards) { card ->
        Card(
            modifier = Modifier
                .width(120.dp)
                .height(80.dp)  // 明确高度
        ) {
            CardContent(card)
        }
    }
}`,
      badExample: `LazyRow {
    items(cards) { card ->
        Card(modifier = Modifier.width(120.dp)) {
            // 没有指定高度，可能导致布局问题
            CardContent(card)
        }
    }
}`
    },
    {
      title: '使用 contentPadding 而非外层 padding',
      description: 'contentPadding 让首尾项可以滑动到边缘外',
      goodExample: `LazyRow(
    contentPadding = PaddingValues(horizontal = 16.dp)
) {
    items(items) { Item(it) }
}`,
      badExample: `// 外层 padding 会导致首尾项无法完全滑出
Box(modifier = Modifier.padding(horizontal = 16.dp)) {
    LazyRow {
        items(items) { Item(it) }
    }
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'LazyRow 与 LazyColumn 参数类似',
      content: 'LazyRow 的大部分参数和行为与 LazyColumn 一致，主要区别在于滚动方向和 arrangement/alignment 的方向'
    },
    {
      type: 'warning',
      title: '避免在 LazyColumn 的 item 中使用无限宽度的 LazyRow',
      content: '如果必须嵌套，LazyRow 应该有固定宽度（通常是 fillMaxWidth）。不要让 LazyRow 根据内容自适应宽度'
    },
    {
      type: 'tip',
      title: '使用 key 优化重组性能',
      content: '与 LazyColumn 一样，提供稳定的 key 可以显著提升性能，特别是在数据顺序变化时'
    },
    {
      type: 'tip',
      title: 'RTL 布局自动适配',
      content: 'LazyRow 会根据系统语言自动适配 RTL（从右到左）布局，Start/End 会自动镜像'
    },
    {
      type: 'danger',
      title: '注意横向列表的无障碍性',
      content: '确保横向列表的内容也能通过键盘或辅助技术访问，考虑为整个横向列表添加语义描述'
    },
  ],

  relatedComponents: ['lazy-column', 'lazy-horizontal-grid', 'row', 'horizontal-pager'],
  since: '1.0.0',
}
