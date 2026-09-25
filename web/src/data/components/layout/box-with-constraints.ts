import type { ComponentEntry } from '../../types'

export const boxWithConstraintsComponent: ComponentEntry = {
  id: 'box-with-constraints',
  demo: { id: 'box-with-constraints', sourceFile: 'BoxWithConstraintsDemo.kt' },
  name: 'BoxWithConstraints',
  category: 'Layout',
  description: '可在内容中读取父容器约束（maxWidth/maxHeight）的 Box，适合响应式布局。',
  tags: ['boxwithconstraints', 'layout', 'constraints', 'responsive', 'adaptive'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'contentAlignment', type: 'Alignment', default: 'Alignment.TopStart', description: '子元素默认对齐方式' },
    { name: 'content', type: '@Composable BoxWithConstraintsScope.() -> Unit', required: true, description: '可访问 maxWidth/maxHeight/constraints 的内容插槽' },
  ],
  examples: [
    {
      title: '响应式布局切换',
      code: `BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
    if (maxWidth < 600.dp) {
        // 手机布局：单列
        Column(modifier = Modifier.fillMaxSize()) {
            Text("手机布局", style = MaterialTheme.typography.titleLarge)
            ContentList()
        }
    } else {
        // 平板布局：双列
        Row(modifier = Modifier.fillMaxSize()) {
            NavigationRail(modifier = Modifier.width(80.dp))
            ContentList(modifier = Modifier.weight(1f))
        }
    }
}`,
    },
    {
      title: '按比例分配宽度',
      code: `BoxWithConstraints(modifier = Modifier.fillMaxWidth()) {
    val itemWidth = maxWidth / 3

    Row(modifier = Modifier.fillMaxWidth()) {
        repeat(3) { index ->
            Box(
                modifier = Modifier
                    .width(itemWidth)
                    .height(100.dp)
                    .background(MaterialTheme.colorScheme.primaryContainer)
            ) {
                Text(
                    text = "列 " + (index + 1),
                    modifier = Modifier.align(Alignment.Center)
                )
            }
        }
    }
}`,
    },
    {
      title: '根据可用高度调整内容',
      code: `BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
    Column {
        TopAppBar(title = { Text("标题") })

        // 根据剩余高度决定是否显示图片
        if (maxHeight > 400.dp) {
            Image(
                painter = painterResource(R.drawable.banner),
                contentDescription = null,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp),
                contentScale = ContentScale.Crop
            )
        }

        LazyColumn(modifier = Modifier.weight(1f)) {
            items(items) { item ->
                Text(item.name)
            }
        }
    }
}`,
    },
    {
      title: '自适应字体大小',
      code: `BoxWithConstraints(modifier = Modifier.fillMaxWidth()) {
    val fontSize = when {
        maxWidth < 360.dp -> 14.sp  // 小屏手机
        maxWidth < 600.dp -> 16.sp  // 普通手机
        maxWidth < 840.dp -> 18.sp  // 大屏手机/小平板
        else -> 20.sp  // 平板
    }

    Text(
        text = "响应式文字",
        fontSize = fontSize,
        modifier = Modifier.padding(16.dp)
    )
}`,
    },
    {
      title: '读取父容器约束',
      code: `BoxWithConstraints {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("容器尺寸信息：")
        Text("maxWidth: 360.dp")
        Text("maxHeight: 800.dp")
        Text("minWidth: 0.dp")
        Text("minHeight: 0.dp")

        Spacer(Modifier.height(16.dp))

        // 使用约束信息
        val gridColumns = (maxWidth / 120.dp).toInt().coerceAtLeast(1)
        Text("建议网格列数：2")
    }
}`,
    },
    {
      title: '横竖屏自适应',
      code: `BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
    val isLandscape = maxWidth > maxHeight

    if (isLandscape) {
        // 横屏：左右布局
        Row(modifier = Modifier.fillMaxSize()) {
            Box(
                modifier = Modifier
                    .weight(0.4f)
                    .fillMaxHeight()
                    .background(MaterialTheme.colorScheme.primaryContainer)
            ) {
                Text("侧边栏", modifier = Modifier.align(Alignment.Center))
            }
            Box(
                modifier = Modifier
                    .weight(0.6f)
                    .fillMaxHeight()
            ) {
                Text("主内容", modifier = Modifier.align(Alignment.Center))
            }
        }
    } else {
        // 竖屏：上下布局
        Column(modifier = Modifier.fillMaxSize()) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(0.3f)
                    .background(MaterialTheme.colorScheme.primaryContainer)
            ) {
                Text("顶部", modifier = Modifier.align(Alignment.Center))
            }
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(0.7f)
            ) {
                Text("主内容", modifier = Modifier.align(Alignment.Center))
            }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '自适应图片画廊',
      description: '根据屏幕宽度动态调整网格列数',
      code: `@Composable
fun AdaptivePhotoGallery(photos: List<Photo>) {
    BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
        val columns = when {
            maxWidth < 600.dp -> 2  // 手机
            maxWidth < 840.dp -> 3  // 大屏手机
            maxWidth < 1200.dp -> 4  // 平板
            else -> 5  // 大平板/桌面
        }

        val itemSize = (maxWidth - (columns + 1) * 8.dp) / columns

        LazyVerticalGrid(
            columns = GridCells.Fixed(columns),
            contentPadding = PaddingValues(8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(photos) { photo ->
                Card(
                    modifier = Modifier.size(itemSize)
                ) {
                    AsyncImage(
                        model = photo.url,
                        contentDescription = photo.description,
                        modifier = Modifier.fillMaxSize(),
                        contentScale = ContentScale.Crop
                    )
                }
            }
        }
    }
}`
    },
    {
      title: '响应式详情页',
      description: '根据屏幕尺寸在单列和双列布局间切换',
      code: `@Composable
fun ProductDetailPage(product: Product) {
    BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
        val useWideLayout = maxWidth >= 840.dp

        if (useWideLayout) {
            // 平板/桌面：左右布局
            Row(modifier = Modifier.fillMaxSize()) {
                // 左侧：图片轮播
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .fillMaxHeight()
                ) {
                    ImageCarousel(
                        images = product.images,
                        modifier = Modifier
                            .fillMaxWidth()
                            .aspectRatio(1f)
                            .align(Alignment.Center)
                    )
                }

                // 右侧：详情信息
                LazyColumn(
                    modifier = Modifier
                        .weight(1f)
                        .fillMaxHeight()
                        .padding(24.dp)
                ) {
                    item {
                        Text(
                            text = product.name,
                            style = MaterialTheme.typography.headlineLarge
                        )
                    }
                    item {
                        Text(
                            text = "¥199.00",
                            style = MaterialTheme.typography.headlineMedium,
                            color = MaterialTheme.colorScheme.error,
                            modifier = Modifier.padding(vertical = 16.dp)
                        )
                    }
                    item {
                        Text(
                            text = product.description,
                            style = MaterialTheme.typography.bodyLarge
                        )
                    }
                    item {
                        Spacer(Modifier.height(24.dp))
                        Button(
                            onClick = { /* 加入购物车 */ },
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text("加入购物车")
                        }
                    }
                }
            }
        } else {
            // 手机：上下布局
            LazyColumn(modifier = Modifier.fillMaxSize()) {
                item {
                    ImageCarousel(
                        images = product.images,
                        modifier = Modifier
                            .fillMaxWidth()
                            .aspectRatio(1f)
                    )
                }
                item {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            text = product.name,
                            style = MaterialTheme.typography.headlineMedium
                        )
                        Text(
                            text = "¥199.00",
                            style = MaterialTheme.typography.headlineSmall,
                            color = MaterialTheme.colorScheme.error,
                            modifier = Modifier.padding(vertical = 8.dp)
                        )
                        Text(
                            text = product.description,
                            style = MaterialTheme.typography.bodyMedium
                        )
                        Spacer(Modifier.height(16.dp))
                        Button(
                            onClick = { /* 加入购物车 */ },
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text("加入购物车")
                        }
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
      title: '使用明确的断点值',
      description: '定义清晰的屏幕尺寸断点，与 Material Design 规范一致',
      goodExample: `BoxWithConstraints {
    val windowSize = when {
        maxWidth < 600.dp -> WindowSize.Compact
        maxWidth < 840.dp -> WindowSize.Medium
        else -> WindowSize.Expanded
    }

    when (windowSize) {
        WindowSize.Compact -> CompactLayout()
        WindowSize.Medium -> MediumLayout()
        WindowSize.Expanded -> ExpandedLayout()
    }
}`,
      badExample: `BoxWithConstraints {
    // 使用模糊的断点值
    if (maxWidth < 500.dp) {
        SmallLayout()
    } else if (maxWidth < 700.dp) {
        MediumLayout()
    } else {
        LargeLayout()
    }
}`
    },
    {
      title: '避免过度使用 BoxWithConstraints',
      description: 'BoxWithConstraints 会触发额外的测量，仅在必要时使用',
      goodExample: `// 场景 1：确实需要根据尺寸切换布局
BoxWithConstraints {
    if (maxWidth < 600.dp) {
        SingleColumnLayout()
    } else {
        TwoColumnLayout()
    }
}

// 场景 2：简单的响应式可以用 fillMaxWidth + weight
Row(modifier = Modifier.fillMaxWidth()) {
    Box(modifier = Modifier.weight(1f))
    Box(modifier = Modifier.weight(1f))
}`,
      badExample: `// 不需要 BoxWithConstraints 的场景
BoxWithConstraints {
    // 只是为了获取宽度但不做任何条件判断
    Text("宽度：360.dp")
}`
    },
    {
      title: '结合 LocalConfiguration 使用',
      description: '对于屏幕方向等信息，LocalConfiguration 可能更合适',
      goodExample: `val configuration = LocalConfiguration.current

// 使用 Configuration 判断方向
val isLandscape = configuration.orientation == Configuration.ORIENTATION_LANDSCAPE

// 使用 BoxWithConstraints 判断实际可用空间
BoxWithConstraints {
    val effectiveWidth = maxWidth
    // 基于实际约束做决策
}`,
    },
    {
      title: '考虑性能影响',
      description: 'BoxWithConstraints 的内容会在约束变化时重组',
      goodExample: `BoxWithConstraints {
    val columns = remember(maxWidth) {
        (maxWidth / 120.dp).toInt().coerceAtLeast(1)
    }
    // 使用 remember 缓存计算结果
    LazyVerticalGrid(columns = GridCells.Fixed(columns)) { }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'BoxWithConstraintsScope 提供约束信息',
      content: 'content lambda 在 BoxWithConstraintsScope 中执行，可以访问 maxWidth、maxHeight、minWidth、minHeight 和 constraints 属性'
    },
    {
      type: 'warning',
      title: 'BoxWithConstraints 会延迟子组合',
      content: 'BoxWithConstraints 需要先测量自己才能确定约束，然后才能组合子内容。这可能导致额外的重组和性能开销'
    },
    {
      type: 'info',
      title: '约束值单位是 Dp',
      content: 'maxWidth/maxHeight 等返回的是 Dp 类型，可以直接与 dp 值比较。constraints 属性返回原始的 Constraints 对象（单位是像素）'
    },
    {
      type: 'info',
      title: '断点建议（Material Design）',
      content: 'Compact: 0-599dp（手机竖屏）、Medium: 600-839dp（手机横屏/小平板）、Expanded: 840dp+（平板/桌面）'
    },
    {
      type: 'error',
      title: '避免在 BoxWithConstraints 中读取无限约束',
      content: '如果父容器没有提供明确约束（如 LazyColumn 中的 item），maxWidth/maxHeight 可能是 Infinity，需要处理这种情况'
    },
    {
      type: 'info',
      title: '可与 remember 配合缓存计算',
      content: '基于约束的计算结果可以用 remember(maxWidth) { } 缓存，避免每次重组都重新计算'
    },
  ],

  relatedComponents: ['box', 'column', 'row', 'scaffold'],
  since: '1.0.0',
}
