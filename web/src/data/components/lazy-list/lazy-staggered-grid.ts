import type { ComponentEntry } from '../../types'

export const lazyStaggeredGridComponent: ComponentEntry = {
  id: 'lazy-staggered-grid',
  name: 'LazyVerticalStaggeredGrid',
  category: 'LazyList',
  description: '垂直瀑布流网格，每列高度独立，适合图片流、卡片流等高度不一致的场景。对应水平方向为 LazyHorizontalStaggeredGrid。',
  tags: ['staggered', 'grid', 'waterfall', 'masonry', '瀑布流'],
  params: [
    { name: 'columns', type: 'StaggeredGridCells', required: true, description: '列数配置，Fixed(n) 固定列数，Adaptive(minSize) 自适应列宽' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'state', type: 'LazyStaggeredGridState', default: 'rememberLazyStaggeredGridState()', description: '滚动状态' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'PaddingValues(0.dp)', description: '内容区域内边距' },
    { name: 'verticalItemSpacing', type: 'Dp', default: '0.dp', description: '子项垂直间距' },
    { name: 'horizontalArrangement', type: 'Arrangement.Horizontal', default: 'Arrangement.spacedBy(0.dp)', description: '列间距配置' },
    { name: 'userScrollEnabled', type: 'Boolean', default: 'true', description: '是否允许用户手势滚动' },
    { name: 'content', type: 'LazyStaggeredGridScope.() -> Unit', required: true, description: '列表内容，使用 item/items DSL' },
  ],
  examples: [
    {
      title: '固定列数瀑布流',
      code: `val items = remember {
    List(20) { index ->
        Pair("Item " + (index + 1), (80 + (index * 37) % 120).dp)
    }
}

LazyVerticalStaggeredGrid(
    columns = StaggeredGridCells.Fixed(2),
    verticalItemSpacing = 8.dp,
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    contentPadding = PaddingValues(16.dp),
    modifier = Modifier.fillMaxSize()
) {
    items(items) { (title, height) ->
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .height(height)
        ) {
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier.fillMaxSize()
            ) {
                Text(title, modifier = Modifier.padding(12.dp))
            }
        }
    }
}`,
    },
    {
      title: '自适应列宽瀑布流',
      code: `LazyVerticalStaggeredGrid(
    columns = StaggeredGridCells.Adaptive(minSize = 160.dp),
    verticalItemSpacing = 8.dp,
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    contentPadding = PaddingValues(16.dp),
    modifier = Modifier.fillMaxSize()
) {
    items(photoList, key = { it.id }) { photo ->
        AsyncImage(
            model = photo.url,
            contentDescription = null,
            modifier = Modifier
                .fillMaxWidth()
                .aspectRatio(photo.width.toFloat() / photo.height),
            contentScale = ContentScale.Crop
        )
    }
}`,
    },
    {
      title: 'Pinterest 风格图片瀑布流',
      code: `LazyVerticalStaggeredGrid(
    columns = StaggeredGridCells.Fixed(2),
    verticalItemSpacing = 12.dp,
    horizontalArrangement = Arrangement.spacedBy(12.dp),
    contentPadding = PaddingValues(12.dp),
    modifier = Modifier.fillMaxSize()
) {
    items(images, key = { it.id }) { image ->
        Card(
            modifier = Modifier.fillMaxWidth(),
            onClick = { /* 打开详情 */ }
        ) {
            Column {
                AsyncImage(
                    model = image.url,
                    contentDescription = null,
                    modifier = Modifier
                        .fillMaxWidth()
                        .aspectRatio(image.aspectRatio),
                    contentScale = ContentScale.Crop
                )
                Column(modifier = Modifier.padding(8.dp)) {
                    Text(
                        text = image.title,
                        style = MaterialTheme.typography.bodyMedium,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )
                    Spacer(Modifier.height(4.dp))
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        AsyncImage(
                            model = image.authorAvatar,
                            contentDescription = null,
                            modifier = Modifier
                                .size(20.dp)
                                .clip(CircleShape)
                        )
                        Spacer(Modifier.width(4.dp))
                        Text(
                            text = image.authorName,
                            style = MaterialTheme.typography.bodySmall,
                            modifier = Modifier.weight(1f)
                        )
                        Icon(
                            Icons.Default.Favorite,
                            contentDescription = null,
                            modifier = Modifier.size(16.dp),
                            tint = Color.Red
                        )
                        Text(
                            text = "1.2k",
                            style = MaterialTheme.typography.bodySmall
                        )
                    }
                }
            }
        }
    }
}`,
    },
    {
      title: 'LazyHorizontalStaggeredGrid（横向瀑布流）',
      code: `LazyHorizontalStaggeredGrid(
    rows = StaggeredGridCells.Fixed(3),
    verticalArrangement = Arrangement.spacedBy(8.dp),
    horizontalItemSpacing = 8.dp,
    contentPadding = PaddingValues(16.dp),
    modifier = Modifier
        .fillMaxWidth()
        .height(300.dp)
) {
    items(tagList) { tag ->
        SuggestionChip(
            onClick = {},
            label = { Text(tag) }
        )
    }
}`,
    },
    {
      title: '笔记瀑布流',
      code: `LazyVerticalStaggeredGrid(
    columns = StaggeredGridCells.Fixed(2),
    verticalItemSpacing = 8.dp,
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    contentPadding = PaddingValues(16.dp),
    modifier = Modifier.fillMaxSize()
) {
    items(notes, key = { it.id }) { note ->
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = Color(note.backgroundColor)
            ),
            onClick = { /* 编辑笔记 */ }
        ) {
            Column(modifier = Modifier.padding(12.dp)) {
                if (note.imageUrl != null) {
                    AsyncImage(
                        model = note.imageUrl,
                        contentDescription = null,
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(8.dp)),
                        contentScale = ContentScale.Crop
                    )
                    Spacer(Modifier.height(8.dp))
                }

                Text(
                    text = note.title,
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Bold
                )

                if (note.content.isNotEmpty()) {
                    Spacer(Modifier.height(4.dp))
                    Text(
                        text = note.content,
                        style = MaterialTheme.typography.bodySmall,
                        maxLines = 6,
                        overflow = TextOverflow.Ellipsis
                    )
                }

                Spacer(Modifier.height(8.dp))

                Text(
                    text = note.timestamp,
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}`,
    },
    {
      title: '商品瀑布流',
      code: `LazyVerticalStaggeredGrid(
    columns = StaggeredGridCells.Adaptive(minSize = 150.dp),
    verticalItemSpacing = 12.dp,
    horizontalArrangement = Arrangement.spacedBy(12.dp),
    contentPadding = PaddingValues(16.dp),
    modifier = Modifier.fillMaxSize()
) {
    items(products, key = { it.id }) { product ->
        Card(
            modifier = Modifier.fillMaxWidth(),
            onClick = { /* 打开详情 */ }
        ) {
            Column {
                Box {
                    AsyncImage(
                        model = product.imageUrl,
                        contentDescription = product.name,
                        modifier = Modifier
                            .fillMaxWidth()
                            .aspectRatio(0.8f),
                        contentScale = ContentScale.Crop
                    )

                    // 折扣标签
                    if (product.discount > 0) {
                        Surface(
                            modifier = Modifier
                                .align(Alignment.TopEnd)
                                .padding(8.dp),
                            color = Color.Red,
                            shape = RoundedCornerShape(4.dp)
                        ) {
                            Text(
                                text = "30% OFF",
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                                color = Color.White,
                                style = MaterialTheme.typography.labelSmall
                            )
                        }
                    }
                }

                Column(modifier = Modifier.padding(8.dp)) {
                    Text(
                        text = product.name,
                        style = MaterialTheme.typography.bodyMedium,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )
                    Spacer(Modifier.height(4.dp))
                    Row(
                        verticalAlignment = Alignment.Bottom
                    ) {
                        Text(
                            text = "¥199.00",
                            style = MaterialTheme.typography.titleMedium,
                            color = MaterialTheme.colorScheme.error
                        )
                        if (product.originalPrice > product.price) {
                            Spacer(Modifier.width(4.dp))
                            Text(
                                text = "¥299.00",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                textDecoration = TextDecoration.LineThrough
                            )
                        }
                    }
                }
            }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '社交媒体动态瀑布流',
      description: '实现类似小红书的图文混合瀑布流',
      code: `@Composable
fun SocialFeedStaggeredGrid(
    posts: List<Post>,
    onPostClick: (Post) -> Unit,
    onAuthorClick: (String) -> Unit
) {
    LazyVerticalStaggeredGrid(
        columns = StaggeredGridCells.Fixed(2),
        verticalItemSpacing = 12.dp,
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        contentPadding = PaddingValues(12.dp),
        modifier = Modifier.fillMaxSize()
    ) {
        items(posts, key = { it.id }) { post ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                onClick = { onPostClick(post) }
            ) {
                Column {
                    // 图片或视频封面
                    Box {
                        AsyncImage(
                            model = post.coverUrl,
                            contentDescription = null,
                            modifier = Modifier
                                .fillMaxWidth()
                                .aspectRatio(post.aspectRatio),
                            contentScale = ContentScale.Crop
                        )

                        // 视频标识
                        if (post.isVideo) {
                            Icon(
                                Icons.Default.PlayCircleOutline,
                                contentDescription = "视频",
                                modifier = Modifier
                                    .align(Alignment.Center)
                                    .size(48.dp),
                                tint = Color.White
                            )
                        }

                        // 图片数量标识
                        if (post.imageCount > 1) {
                            Surface(
                                modifier = Modifier
                                    .align(Alignment.TopEnd)
                                    .padding(8.dp),
                                color = Color.Black.copy(alpha = 0.6f),
                                shape = RoundedCornerShape(12.dp)
                            ) {
                                Row(
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Icon(
                                        Icons.Default.Image,
                                        contentDescription = null,
                                        modifier = Modifier.size(14.dp),
                                        tint = Color.White
                                    )
                                    Spacer(Modifier.width(4.dp))
                                    Text(
                                        text = "9",
                                        color = Color.White,
                                        style = MaterialTheme.typography.labelSmall
                                    )
                                }
                            }
                        }
                    }

                    // 内容信息
                    Column(modifier = Modifier.padding(8.dp)) {
                        Text(
                            text = post.title,
                            style = MaterialTheme.typography.bodyMedium,
                            maxLines = 2,
                            overflow = TextOverflow.Ellipsis,
                            fontWeight = FontWeight.Medium
                        )

                        Spacer(Modifier.height(8.dp))

                        // 作者信息
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier
                                    .weight(1f)
                                    .clickable { onAuthorClick(post.authorId) }
                            ) {
                                AsyncImage(
                                    model = post.authorAvatar,
                                    contentDescription = null,
                                    modifier = Modifier
                                        .size(24.dp)
                                        .clip(CircleShape)
                                )
                                Spacer(Modifier.width(4.dp))
                                Text(
                                    text = post.authorName,
                                    style = MaterialTheme.typography.bodySmall,
                                    maxLines = 1,
                                    overflow = TextOverflow.Ellipsis
                                )
                            }

                            // 点赞
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    if (post.isLiked) Icons.Filled.Favorite else Icons.Outlined.FavoriteBorder,
                                    contentDescription = null,
                                    modifier = Modifier.size(16.dp),
                                    tint = if (post.isLiked) Color.Red else MaterialTheme.colorScheme.onSurfaceVariant
                                )
                                Spacer(Modifier.width(2.dp))
                                Text(
                                    text = formatCount(post.likes),
                                    style = MaterialTheme.typography.bodySmall
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

private fun formatCount(count: Int): String {
    return when {
        count >= 10000 -> (count / 1000).toString() + "k"
        count >= 1000 -> (count / 1000).toString() + "." + ((count % 1000) / 100).toString() + "k"
        else -> count.toString()
    }
}`
    },
    {
      title: '瀑布流相册',
      description: '照片按宽高比自然排列的相册',
      code: `@Composable
fun PhotoGalleryStaggered(
    photos: List<Photo>,
    onPhotoClick: (Photo, Int) -> Unit
) {
    LazyVerticalStaggeredGrid(
        columns = StaggeredGridCells.Adaptive(minSize = 120.dp),
        verticalItemSpacing = 4.dp,
        horizontalArrangement = Arrangement.spacedBy(4.dp),
        contentPadding = PaddingValues(4.dp),
        modifier = Modifier.fillMaxSize()
    ) {
        itemsIndexed(photos, key = { _, photo -> photo.id }) { index, photo ->
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onPhotoClick(photo, index) }
            ) {
                AsyncImage(
                    model = photo.url,
                    contentDescription = null,
                    modifier = Modifier
                        .fillMaxWidth()
                        .aspectRatio(photo.width.toFloat() / photo.height),
                    contentScale = ContentScale.Crop
                )

                // 选中标记
                if (photo.isSelected) {
                    Surface(
                        modifier = Modifier
                            .align(Alignment.TopEnd)
                            .padding(8.dp)
                            .size(24.dp),
                        shape = CircleShape,
                        color = MaterialTheme.colorScheme.primary
                    ) {
                        Icon(
                            Icons.Default.Check,
                            contentDescription = "已选中",
                            modifier = Modifier.padding(4.dp),
                            tint = Color.White
                        )
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
      title: '使用 StaggeredGridCells.Adaptive 实现响应式',
      description: '自适应列宽可以在不同屏幕尺寸上自动调整列数',
      goodExample: `LazyVerticalStaggeredGrid(
    columns = StaggeredGridCells.Adaptive(minSize = 150.dp),
    // 手机：2列，平板：3-4列，自动适应
) { }`,
      badExample: `LazyVerticalStaggeredGrid(
    columns = StaggeredGridCells.Fixed(2),
    // 固定2列，在平板上浪费空间
) { }`
    },
    {
      title: '为每个 item 提供稳定的 key',
      description: 'key 确保数据更新时动画流畅',
      goodExample: `LazyVerticalStaggeredGrid(columns = StaggeredGridCells.Fixed(2)) {
    items(photos, key = { it.id }) { photo ->
        PhotoCard(photo)
    }
}`,
      badExample: `LazyVerticalStaggeredGrid(columns = StaggeredGridCells.Fixed(2)) {
    items(photos) { photo ->
        PhotoCard(photo)  // 没有 key，更新时可能闪烁
    }
}`
    },
    {
      title: '使用 aspectRatio 保持图片比例',
      description: '根据实际宽高比显示图片，避免拉伸变形',
      goodExample: `AsyncImage(
    model = photo.url,
    contentDescription = null,
    modifier = Modifier
        .fillMaxWidth()
        .aspectRatio(photo.width.toFloat() / photo.height),  // 保持原始比例
    contentScale = ContentScale.Crop
)`,
      badExample: `AsyncImage(
    model = photo.url,
    contentDescription = null,
    modifier = Modifier
        .fillMaxWidth()
        .height(200.dp),  // 固定高度会导致变形
    contentScale = ContentScale.Crop
)`
    },
    {
      title: 'LazyVerticalStaggeredGrid vs LazyVerticalGrid',
      description: '根据内容高度是否一致选择合适的组件',
      goodExample: `// 高度不一致（图片、笔记）：使用 LazyVerticalStaggeredGrid
LazyVerticalStaggeredGrid(columns = StaggeredGridCells.Fixed(2)) {
    items(photos) { photo ->
        AsyncImage(model = photo.url, modifier = Modifier.aspectRatio(photo.ratio))
    }
}

// 高度一致（商品卡片）：使用 LazyVerticalGrid
LazyVerticalGrid(columns = GridCells.Fixed(2)) {
    items(products) { product ->
        ProductCard(product, modifier = Modifier.height(200.dp))
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'LazyVerticalStaggeredGrid 支持真正的瀑布流',
      content: 'LazyVerticalStaggeredGrid 的每列高度独立，新项会被添加到当前最短的列，形成真正的瀑布流效果'
    },
    {
      type: 'info',
      title: 'StaggeredGridCells.Adaptive 自动调整列数',
      content: 'Adaptive(minSize = 150.dp) 根据可用宽度自动计算列数，屏幕越宽列数越多，适合响应式布局'
    },
    {
      type: 'warning',
      title: '内容高度差异不宜过大',
      content: '如果 item 高度差异过大，可能导致某些列明显偏长。建议 item 高度在合理范围内变化'
    },
    {
      type: 'info',
      title: 'LazyHorizontalStaggeredGrid 用于横向瀑布流',
      content: 'LazyHorizontalStaggeredGrid 是横向滚动的瀑布流，每行宽度独立，适合横向标签流等场景'
    },
    {
      type: 'error',
      title: '避免在 item 中使用 Modifier.weight',
      content: 'LazyStaggeredGrid 的 item 不支持 weight 修饰符，使用会导致布局异常'
    },
    {
      type: 'info',
      title: '性能优化',
      content: '与 LazyColumn 一样，LazyStaggeredGrid 只渲染可见区域的 item。大量数据时性能优异'
    },
  ],

  relatedComponents: ['lazy-vertical-grid', 'lazy-column', 'lazy-horizontal-grid'],
  since: '1.2.0',
}
