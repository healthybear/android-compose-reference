import type { ComponentEntry } from '../../types'

export const lazyVerticalGridComponent: ComponentEntry = {
  id: 'lazy-vertical-grid',
  demo: { id: 'lazy-vertical-grid', sourceFile: 'LazyVerticalGridDemo.kt' },
  name: 'LazyVerticalGrid',
  category: 'LazyList',
  description: 'LazyVerticalGrid 是垂直方向的懒加载网格容器，仅渲染可见区域的子项。支持固定列数或自适应列宽，适合展示图片画廊、商品列表等网格布局内容。',
  tags: ['lazyverticalgrid', 'grid', 'list', 'recyclerview', 'gridlayout', 'gallery'],
  params: [
    { name: 'columns', type: 'GridCells', required: true, description: '列配置：GridCells.Fixed(n) 固定 n 列，GridCells.Adaptive(minSize) 自适应列数（每列最小宽度）' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、背景等' },
    { name: 'state', type: 'LazyGridState', default: 'rememberLazyGridState()', description: '网格滚动状态，用于监听滚动位置或程序化滚动' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'PaddingValues(0.dp)', description: '内容区域内边距' },
    { name: 'reverseLayout', type: 'Boolean', default: 'false', description: '是否反向排列（从底部开始）' },
    { name: 'verticalArrangement', type: 'Arrangement.Vertical', default: 'Arrangement.Top', description: '行间距配置（Top/Center/Bottom/SpaceBetween/spacedBy）' },
    { name: 'horizontalArrangement', type: 'Arrangement.Horizontal', default: 'Arrangement.Start', description: '列间距配置（Start/Center/End/SpaceBetween/spacedBy）' },
    { name: 'flingBehavior', type: 'FlingBehavior', default: 'ScrollableDefaults.flingBehavior()', description: '惯性滚动行为配置' },
    { name: 'userScrollEnabled', type: 'Boolean', default: 'true', description: '是否允许用户手势滚动' },
    { name: 'content', type: 'LazyGridScope.() -> Unit', required: true, description: '网格内容，使用 item/items DSL 构建' },
  ],
  examples: [
    {
      title: '固定 2 列网格',
      code: `LazyVerticalGrid(
    columns = GridCells.Fixed(2),
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp),
    contentPadding = PaddingValues(16.dp)
) {
    items(photos, key = { it.id }) { photo ->
        AsyncImage(
            model = photo.url,
            contentDescription = null,
            modifier = Modifier
                .fillMaxWidth()
                .aspectRatio(1f),
            contentScale = ContentScale.Crop
        )
    }
}`,
    },
    {
      title: '自适应列宽（最小 150dp）',
      code: `LazyVerticalGrid(
    columns = GridCells.Adaptive(minSize = 150.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    contentPadding = PaddingValues(16.dp)
) {
    items(items, key = { it.id }) { item ->
        Card {
            Column(modifier = Modifier.padding(8.dp)) {
                Text(item.name, style = MaterialTheme.typography.bodyMedium)
            }
        }
    }
}`,
    },
    {
      title: '固定 3 列商品网格',
      code: `LazyVerticalGrid(
    columns = GridCells.Fixed(3),
    contentPadding = PaddingValues(8.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    items(products, key = { it.id }) { product ->
        Card(
            onClick = { /* 打开详情 */ }
        ) {
            Column {
                AsyncImage(
                    model = product.imageUrl,
                    contentDescription = product.name,
                    modifier = Modifier
                        .fillMaxWidth()
                        .aspectRatio(1f),
                    contentScale = ContentScale.Crop
                )
                Text(
                    text = product.name,
                    modifier = Modifier.padding(8.dp),
                    style = MaterialTheme.typography.bodySmall,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
                Text(
                    text = "¥99.00",
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.error
                )
            }
        }
    }
}`,
    },
    {
      title: '跨列项（span）',
      code: `LazyVerticalGrid(
    columns = GridCells.Fixed(3)
) {
    item(span = { GridItemSpan(maxLineSpan) }) {
        // 占满一行的头部
        Text(
            text = "标题",
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            style = MaterialTheme.typography.titleLarge
        )
    }

    items(items) { item ->
        // 普通项（占 1 列）
        ItemCard(item)
    }

    item(span = { GridItemSpan(2) }) {
        // 占 2 列的特殊项
        FeaturedCard()
    }
}`,
    },
    {
      title: '响应式网格（横屏自动增加列数）',
      code: `val configuration = LocalConfiguration.current
val columns = when {
    configuration.screenWidthDp >= 840 -> 4  // 平板横屏
    configuration.screenWidthDp >= 600 -> 3  // 平板竖屏
    else -> 2  // 手机
}

LazyVerticalGrid(
    columns = GridCells.Fixed(columns),
    contentPadding = PaddingValues(16.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    items(photos) { photo ->
        PhotoItem(photo)
    }
}`,
    },
    {
      title: '瀑布流效果（不同高度）',
      code: `LazyVerticalGrid(
    columns = GridCells.Fixed(2),
    contentPadding = PaddingValues(8.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    items(images, key = { it.id }) { image ->
        AsyncImage(
            model = image.url,
            contentDescription = null,
            modifier = Modifier
                .fillMaxWidth()
                .height((100..300).random().dp),  // 随机高度
            contentScale = ContentScale.Crop
        )
    }
}`,
    },
  ],

  useCases: [
    {
      title: '图片画廊',
      description: '使用自适应列宽实现响应式图片画廊',
      code: `@Composable
fun PhotoGallery(photos: List<Photo>) {
    val state = rememberLazyGridState()

    LazyVerticalGrid(
        columns = GridCells.Adaptive(minSize = 120.dp),
        state = state,
        contentPadding = PaddingValues(4.dp),
        horizontalArrangement = Arrangement.spacedBy(4.dp),
        verticalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        items(photos, key = { it.id }) { photo ->
            Card(
                onClick = { /* 打开大图 */ },
                modifier = Modifier.aspectRatio(1f)
            ) {
                Box {
                    AsyncImage(
                        model = photo.url,
                        contentDescription = photo.description,
                        modifier = Modifier.fillMaxSize(),
                        contentScale = ContentScale.Crop
                    )

                    // 底部渐变遮罩
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .background(
                                Brush.verticalGradient(
                                    colors = listOf(
                                        Color.Transparent,
                                        Color.Black.copy(alpha = 0.7f)
                                    ),
                                    startY = 100f
                                )
                            )
                    )

                    // 右下角图标
                    Icon(
                        Icons.Default.PhotoCamera,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier
                            .align(Alignment.BottomEnd)
                            .padding(8.dp)
                    )
                }
            }
        }
    }
}`
    },
    {
      title: '应用网格选择器',
      description: '实现类似应用抽屉的网格选择界面',
      code: `@Composable
fun AppGrid(apps: List<App>, onAppClick: (App) -> Unit) {
    LazyVerticalGrid(
        columns = GridCells.Fixed(4),
        contentPadding = PaddingValues(16.dp),
        horizontalArrangement = Arrangement.spacedBy(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        items(apps, key = { it.packageName }) { app ->
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.clickable { onAppClick(app) }
            ) {
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    modifier = Modifier.size(56.dp)
                ) {
                    Image(
                        painter = painterResource(app.iconRes),
                        contentDescription = app.name,
                        modifier = Modifier.padding(8.dp)
                    )
                }
                Spacer(Modifier.height(4.dp))
                Text(
                    text = app.name,
                    style = MaterialTheme.typography.bodySmall,
                    textAlign = TextAlign.Center,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis,
                    modifier = Modifier.width(72.dp)
                )
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '选择合适的 GridCells 类型',
      description: '固定列数适合需要精确控制的场景，自适应适合响应式布局',
      goodExample: `// 场景 1：需要精确 3 列（如商品列表）
LazyVerticalGrid(columns = GridCells.Fixed(3)) { }

// 场景 2：自适应不同屏幕宽度（如图片画廊）
LazyVerticalGrid(columns = GridCells.Adaptive(minSize = 120.dp)) { }`,
      badExample: `// 使用固定列数但未考虑不同屏幕尺寸
LazyVerticalGrid(columns = GridCells.Fixed(3)) {
    // 在小屏手机上可能过于拥挤
}`
    },
    {
      title: '为网格项指定固定宽高比',
      description: '使用 aspectRatio 确保网格对齐整齐',
      goodExample: `LazyVerticalGrid(columns = GridCells.Fixed(2)) {
    items(photos) { photo ->
        AsyncImage(
            model = photo.url,
            contentDescription = null,
            modifier = Modifier
                .fillMaxWidth()
                .aspectRatio(1f)  // 正方形
        )
    }
}`,
      badExample: `LazyVerticalGrid(columns = GridCells.Fixed(2)) {
    items(photos) { photo ->
        // 没有指定宽高比，图片可能被拉伸或变形
        AsyncImage(
            model = photo.url,
            contentDescription = null,
            modifier = Modifier.fillMaxWidth()
        )
    }
}`
    },
    {
      title: '使用 span 实现复杂布局',
      description: '通过 GridItemSpan 让某些项跨越多列',
      goodExample: `LazyVerticalGrid(columns = GridCells.Fixed(3)) {
    item(span = { GridItemSpan(maxLineSpan) }) {
        // 头部占满整行
        Header()
    }
    items(items) { item ->
        // 普通项占 1 列
        NormalItem(item)
    }
}`,
    },
    {
      title: '考虑内容加载性能',
      description: '网格中的图片应该使用适当的缩略图',
      goodExample: `LazyVerticalGrid(columns = GridCells.Fixed(3)) {
    items(photos) { photo ->
        AsyncImage(
            model = ImageRequest.Builder(LocalContext.current)
                .data(photo.thumbnailUrl)  // 使用缩略图
                .size(300)  // 限制加载尺寸
                .build(),
            contentDescription = null
        )
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'GridCells.Adaptive 的列数计算',
      content: 'Adaptive(minSize) 会根据可用宽度自动计算列数：columns = max(1, floor(availableWidth / minSize))。屏幕越宽，列数越多'
    },
    {
      type: 'warning',
      title: 'LazyVerticalGrid 不支持真正的瀑布流',
      content: 'LazyVerticalGrid 的每行高度相同（由该行最高的项决定）。如需真正的瀑布流（每列独立高度），使用 LazyVerticalStaggeredGrid'
    },
    {
      type: 'info',
      title: '使用 key 提升性能',
      content: '与 LazyColumn 一样，为每个 item 提供稳定的 key 可以优化重组和动画性能'
    },
    {
      type: 'info',
      title: 'span 函数中可访问当前行列信息',
      content: 'span lambda 提供 maxLineSpan 和 maxCurrentLineSpan 参数，可以根据当前位置动态决定跨度'
    },
    {
      type: 'error',
      title: '注意网格项的点击区域',
      content: '小尺寸网格项（如图标）应确保点击区域至少 48.dp，使用 Modifier.minimumInteractiveComponentSize() 或增加 padding'
    },
  ],

  relatedComponents: ['lazy-column', 'lazy-horizontal-grid', 'lazy-staggered-grid', 'flow-row'],
  since: '1.0.0',
}
