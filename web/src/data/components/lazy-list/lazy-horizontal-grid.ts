import type { ComponentEntry } from '../../types'

export const lazyHorizontalGridComponent: ComponentEntry = {
  id: 'lazy-horizontal-grid',
  demo: { id: 'lazy-horizontal-grid', sourceFile: 'LazyHorizontalGridDemo.kt' },
  name: 'LazyHorizontalGrid',
  category: 'LazyList',
  description: '水平方向的懒加载网格，固定行数，横向滚动。',
  tags: ['lazyhorizontalgrid', 'grid', 'horizontal', 'scroll', 'list'],
  params: [
    { name: 'rows', type: 'GridCells', required: true, description: 'GridCells.Fixed(n) 固定行数' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'state', type: 'LazyGridState', default: 'rememberLazyGridState()', description: '网格滚动状态' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'PaddingValues(0.dp)', description: '内容区域内边距' },
    { name: 'content', type: 'LazyGridScope.() -> Unit', required: true, description: '网格内容' },
  ],
  examples: [
    {
      title: '固定 2 行横向滚动',
      code: `LazyHorizontalGrid(
    rows = GridCells.Fixed(2),
    modifier = Modifier
        .fillMaxWidth()
        .height(200.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp),
    contentPadding = PaddingValues(horizontal = 16.dp)
) {
    items(20) { index ->
        Card(modifier = Modifier.size(120.dp, 80.dp)) {
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier.fillMaxSize()
            ) {
                Text("项 " + (index + 1))
            }
        }
    }
}`,
    },
    {
      title: '自适应行数',
      code: `LazyHorizontalGrid(
    rows = GridCells.Adaptive(minSize = 80.dp),
    modifier = Modifier
        .fillMaxWidth()
        .height(300.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp),
    contentPadding = PaddingValues(horizontal = 16.dp)
) {
    items(photos) { photo ->
        AsyncImage(
            model = photo.url,
            contentDescription = null,
            modifier = Modifier
                .width(120.dp)
                .aspectRatio(1f),
            contentScale = ContentScale.Crop
        )
    }
}`,
    },
    {
      title: '固定 3 行横向商品列表',
      code: `LazyHorizontalGrid(
    rows = GridCells.Fixed(3),
    modifier = Modifier
        .fillMaxWidth()
        .height(360.dp),
    horizontalArrangement = Arrangement.spacedBy(12.dp),
    verticalArrangement = Arrangement.spacedBy(12.dp),
    contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp)
) {
    items(products, key = { it.id }) { product ->
        Card(
            modifier = Modifier
                .width(140.dp)
                .fillMaxHeight(),
            onClick = { /* 打开详情 */ }
        ) {
            Column(modifier = Modifier.padding(8.dp)) {
                AsyncImage(
                    model = product.imageUrl,
                    contentDescription = product.name,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(80.dp)
                        .clip(RoundedCornerShape(4.dp)),
                    contentScale = ContentScale.Crop
                )
                Spacer(Modifier.height(4.dp))
                Text(
                    text = product.name,
                    style = MaterialTheme.typography.bodySmall,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Text(
                    text = "¥99.00",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.error
                )
            }
        }
    }
}`,
    },
    {
      title: '带标题的分类横滚',
      code: `Column {
    Text(
        text = "推荐商品",
        style = MaterialTheme.typography.titleMedium,
        modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
    )

    LazyHorizontalGrid(
        rows = GridCells.Fixed(2),
        modifier = Modifier
            .fillMaxWidth()
            .height(240.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp),
        contentPadding = PaddingValues(horizontal = 16.dp)
    ) {
        items(recommendedItems) { item ->
            Card(modifier = Modifier.size(150.dp, 100.dp)) {
                Box(modifier = Modifier.fillMaxSize()) {
                    AsyncImage(
                        model = item.imageUrl,
                        contentDescription = null,
                        modifier = Modifier.fillMaxSize(),
                        contentScale = ContentScale.Crop
                    )
                    Text(
                        text = item.title,
                        modifier = Modifier
                            .align(Alignment.BottomStart)
                            .background(Color.Black.copy(alpha = 0.6f))
                            .padding(8.dp),
                        color = Color.White,
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }
        }
    }
}`,
    },
    {
      title: '横向视频列表',
      code: `LazyHorizontalGrid(
    rows = GridCells.Fixed(1),
    modifier = Modifier
        .fillMaxWidth()
        .height(180.dp),
    horizontalArrangement = Arrangement.spacedBy(12.dp),
    contentPadding = PaddingValues(horizontal = 16.dp)
) {
    items(videos, key = { it.id }) { video ->
        Card(
            modifier = Modifier
                .width(280.dp)
                .fillMaxHeight(),
            onClick = { /* 播放视频 */ }
        ) {
            Box {
                AsyncImage(
                    model = video.thumbnailUrl,
                    contentDescription = video.title,
                    modifier = Modifier.fillMaxSize(),
                    contentScale = ContentScale.Crop
                )

                // 播放按钮
                Icon(
                    Icons.Default.PlayCircleOutline,
                    contentDescription = "播放",
                    modifier = Modifier
                        .align(Alignment.Center)
                        .size(48.dp),
                    tint = Color.White
                )

                // 时长标签
                Surface(
                    modifier = Modifier
                        .align(Alignment.BottomEnd)
                        .padding(8.dp),
                    color = Color.Black.copy(alpha = 0.7f),
                    shape = RoundedCornerShape(4.dp)
                ) {
                    Text(
                        text = video.duration,
                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                        color = Color.White,
                        style = MaterialTheme.typography.labelSmall
                    )
                }
            }
        }
    }
}`,
    },
    {
      title: '响应式行数',
      code: `val configuration = LocalConfiguration.current
val rows = when {
    configuration.screenHeightDp >= 800 -> 3  // 大屏
    configuration.screenHeightDp >= 600 -> 2  // 中屏
    else -> 1  // 小屏
}

LazyHorizontalGrid(
    rows = GridCells.Fixed(rows),
    modifier = Modifier
        .fillMaxWidth()
        .height((rows * 100).dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp),
    contentPadding = PaddingValues(horizontal = 16.dp)
) {
    items(categories) { category ->
        CategoryChip(category)
    }
}`,
    },
  ],

  useCases: [
    {
      title: '首页推荐分类横滚',
      description: '首页多行横向滚动的分类推荐列表',
      code: `@Composable
fun HomeRecommendSection(
    title: String,
    items: List<RecommendItem>,
    onItemClick: (RecommendItem) -> Unit,
    onSeeMore: () -> Unit
) {
    Column {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = title,
                style = MaterialTheme.typography.titleMedium
            )
            TextButton(onClick = onSeeMore) {
                Text("查看更多")
                Icon(
                    Icons.AutoMirrored.Filled.ArrowForward,
                    contentDescription = null,
                    modifier = Modifier.size(16.dp)
                )
            }
        }

        LazyHorizontalGrid(
            rows = GridCells.Fixed(2),
            modifier = Modifier
                .fillMaxWidth()
                .height(280.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp)
        ) {
            items(items, key = { it.id }) { item ->
                RecommendCard(
                    item = item,
                    onClick = { onItemClick(item) }
                )
            }
        }
    }
}

@Composable
fun RecommendCard(
    item: RecommendItem,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .width(160.dp)
            .fillMaxHeight(),
        onClick = onClick
    ) {
        Column {
            AsyncImage(
                model = item.imageUrl,
                contentDescription = null,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(100.dp),
                contentScale = ContentScale.Crop
            )
            Column(modifier = Modifier.padding(8.dp)) {
                Text(
                    text = item.title,
                    style = MaterialTheme.typography.bodyMedium,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
                Spacer(Modifier.height(4.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = "¥288.00",
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.error
                    )
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            Icons.Default.Star,
                            contentDescription = null,
                            modifier = Modifier.size(14.dp),
                            tint = Color(0xFFFFB800)
                        )
                        Text(
                            text = "4.5",
                            style = MaterialTheme.typography.bodySmall
                        )
                    }
                }
            }
        }
    }
}`
    },
    {
      title: '应用推荐横向列表',
      description: '应用商店的横向应用推荐',
      code: `@Composable
fun AppRecommendationList(
    apps: List<AppInfo>,
    onAppClick: (AppInfo) -> Unit
) {
    Column {
        Text(
            text = "为你推荐",
            style = MaterialTheme.typography.titleLarge,
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp)
        )

        LazyHorizontalGrid(
            rows = GridCells.Fixed(3),
            modifier = Modifier
                .fillMaxWidth()
                .height(360.dp),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            contentPadding = PaddingValues(horizontal = 16.dp)
        ) {
            items(apps, key = { it.packageName }) { app ->
                Row(
                    modifier = Modifier
                        .width(280.dp)
                        .clickable { onAppClick(app) }
                        .padding(8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    AsyncImage(
                        model = app.iconUrl,
                        contentDescription = null,
                        modifier = Modifier
                            .size(56.dp)
                            .clip(RoundedCornerShape(12.dp))
                    )
                    Spacer(Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = app.name,
                            style = MaterialTheme.typography.bodyLarge,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis
                        )
                        Text(
                            text = app.category,
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            repeat(5) { index ->
                                Icon(
                                    if (index < app.rating.toInt()) Icons.Filled.Star else Icons.Outlined.Star,
                                    contentDescription = null,
                                    modifier = Modifier.size(12.dp),
                                    tint = if (index < app.rating.toInt()) Color(0xFFFFB800) else Color.Gray
                                )
                            }
                            Spacer(Modifier.width(4.dp))
                            Text(
                                text = "4.8",
                                style = MaterialTheme.typography.labelSmall
                            )
                        }
                    }
                    OutlinedButton(
                        onClick = { /* 安装 */ },
                        modifier = Modifier.height(32.dp)
                    ) {
                        Text("安装", style = MaterialTheme.typography.labelMedium)
                    }
                }
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '设置合适的容器高度',
      description: 'LazyHorizontalGrid 需要明确的高度约束',
      goodExample: `LazyHorizontalGrid(
    rows = GridCells.Fixed(2),
    modifier = Modifier
        .fillMaxWidth()
        .height(240.dp)  // 明确高度
) { }`,
      badExample: `LazyHorizontalGrid(
    rows = GridCells.Fixed(2),
    modifier = Modifier.fillMaxWidth()  // 缺少高度
) { }`
    },
    {
      title: '使用 key 提升性能',
      description: '为每个 item 提供稳定的 key',
      goodExample: `LazyHorizontalGrid(rows = GridCells.Fixed(2)) {
    items(products, key = { it.id }) { product ->
        ProductCard(product)
    }
}`,
      badExample: `LazyHorizontalGrid(rows = GridCells.Fixed(2)) {
    items(products) { product ->
        ProductCard(product)  // 没有 key
    }
}`
    },
    {
      title: '合理设置行数',
      description: '行数过多会导致每行高度过小',
      goodExample: `// 2-3 行比较合适
LazyHorizontalGrid(rows = GridCells.Fixed(2)) { }`,
      badExample: `// 行数过多，单行高度太小
LazyHorizontalGrid(
    rows = GridCells.Fixed(5),
    modifier = Modifier.height(200.dp)  // 每行只有 40dp
) { }`
    },
    {
      title: '使用 contentPadding 留出边距',
      description: '横向滚动列表两端应该有内边距',
      goodExample: `LazyHorizontalGrid(
    rows = GridCells.Fixed(2),
    contentPadding = PaddingValues(horizontal = 16.dp)
) { }`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'LazyHorizontalGrid 横向滚动',
      content: 'LazyHorizontalGrid 固定行数，横向滚动。与 LazyVerticalGrid（固定列数，垂直滚动）相对应'
    },
    {
      type: 'warning',
      title: '必须提供明确的高度',
      content: 'LazyHorizontalGrid 需要知道总高度来分配每行的高度。如果没有高度约束，可能显示异常'
    },
    {
      type: 'info',
      title: 'GridCells.Adaptive 根据高度自适应行数',
      content: 'GridCells.Adaptive(minSize = 80.dp) 会根据容器高度自动计算行数，类似 LazyVerticalGrid 的列数自适应'
    },
    {
      type: 'info',
      title: '适合首页横向推荐列表',
      content: 'LazyHorizontalGrid 非常适合首页多行横向滚动的推荐内容，用户可以左右滑动浏览更多内容'
    },
    {
      type: 'error',
      title: '避免嵌套横向滚动',
      content: '不要在 LazyRow 或 HorizontalPager 中嵌套 LazyHorizontalGrid，会导致手势冲突'
    },
    {
      type: 'info',
      title: '行高由最高的 item 决定',
      content: '每行的高度由该行中最高的 item 决定，其他 item 会垂直对齐（根据 verticalArrangement）'
    },
  ],

  relatedComponents: ['lazy-vertical-grid', 'lazy-row', 'lazy-column'],
  since: '1.0.0',
}
