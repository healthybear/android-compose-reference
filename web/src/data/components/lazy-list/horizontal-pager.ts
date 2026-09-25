import type { ComponentEntry } from '../../types'

export const horizontalPagerComponent: ComponentEntry = {
  id: 'horizontal-pager',
  demo: { id: 'horizontal-pager', sourceFile: 'HorizontalPagerDemo.kt' },
  name: 'HorizontalPager',
  category: 'LazyList',
  description: '水平翻页容器，每次滚动一整页，常用于轮播图、引导页，对应 ViewPager2。',
  tags: ['horizontalpager', 'pager', 'viewpager', 'carousel', 'swipe'],
  params: [
    { name: 'state', type: 'PagerState', required: true, description: '通过 rememberPagerState() 创建' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'pageSpacing', type: 'Dp', default: '0.dp', description: '页面间距' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'PaddingValues(0.dp)', description: '内容内边距，可用于显示相邻页面' },
    { name: 'pageContent', type: '@Composable PagerScope.(page: Int) -> Unit', required: true, description: '每页内容，page 为当前页索引' },
  ],
  examples: [
    {
      title: '基础轮播',
      code: `val pagerState = rememberPagerState(pageCount = { images.size })

HorizontalPager(state = pagerState) { page ->
    AsyncImage(
        model = images[page],
        contentDescription = null,
        modifier = Modifier.fillMaxWidth().aspectRatio(16f / 9f),
        contentScale = ContentScale.Crop
    )
}`,
    },
    {
      title: '带指示器',
      code: `val pagerState = rememberPagerState(pageCount = { 4 })

Column {
    HorizontalPager(state = pagerState, modifier = Modifier.weight(1f)) { page ->
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier
                .fillMaxSize()
                .background(
                    when (page % 4) {
                        0 -> MaterialTheme.colorScheme.primaryContainer
                        1 -> MaterialTheme.colorScheme.secondaryContainer
                        2 -> MaterialTheme.colorScheme.tertiaryContainer
                        else -> MaterialTheme.colorScheme.surfaceVariant
                    }
                )
        ) {
            Text("第 " + (page + 1) + " 页", style = MaterialTheme.typography.headlineMedium)
        }
    }
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 16.dp),
        horizontalArrangement = Arrangement.Center
    ) {
        repeat(4) { index ->
            val selected = pagerState.currentPage == index
            Box(
                modifier = Modifier
                    .padding(4.dp)
                    .size(if (selected) 10.dp else 8.dp)
                    .clip(CircleShape)
                    .background(if (selected) MaterialTheme.colorScheme.primary else Color.Gray)
            )
        }
    }
}`,
    },
    {
      title: '自动轮播',
      code: `val pagerState = rememberPagerState(pageCount = { banners.size })

LaunchedEffect(pagerState) {
    while (true) {
        delay(3000)
        val nextPage = (pagerState.currentPage + 1) % banners.size
        pagerState.animateScrollToPage(nextPage)
    }
}

HorizontalPager(state = pagerState) { page ->
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp)
            .height(180.dp)
    ) {
        Box(contentAlignment = Alignment.BottomStart) {
            AsyncImage(
                model = banners[page].imageUrl,
                contentDescription = null,
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop
            )
            Text(
                text = banners[page].title,
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color.Black.copy(alpha = 0.6f))
                    .padding(16.dp),
                color = Color.White,
                style = MaterialTheme.typography.titleMedium
            )
        }
    }
}`,
    },
    {
      title: '露出相邻页面（预览效果）',
      code: `val pagerState = rememberPagerState(pageCount = { 5 })

HorizontalPager(
    state = pagerState,
    contentPadding = PaddingValues(horizontal = 48.dp),
    pageSpacing = 16.dp,
    modifier = Modifier.fillMaxWidth()
) { page ->
    val pageOffset = (pagerState.currentPage - page) + pagerState.currentPageOffsetFraction
    val scale = lerp(
        start = 0.85f,
        stop = 1f,
        fraction = 1f - pageOffset.absoluteValue.coerceIn(0f, 1f)
    )

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .aspectRatio(0.8f)
            .graphicsLayer {
                scaleX = scale
                scaleY = scale
                alpha = lerp(0.5f, 1f, scale)
            },
        elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
    ) {
        Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxSize()) {
            Text("卡片 " + (page + 1), style = MaterialTheme.typography.headlineLarge)
        }
    }
}`,
    },
    {
      title: '程序化滚动到指定页',
      code: `val pagerState = rememberPagerState(pageCount = { 10 })
val scope = rememberCoroutineScope()

Column {
    Row(
        modifier = Modifier.fillMaxWidth().padding(16.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Button(onClick = {
            scope.launch { pagerState.animateScrollToPage(0) }
        }) {
            Text("首页")
        }
        Button(onClick = {
            scope.launch {
                val prev = (pagerState.currentPage - 1).coerceAtLeast(0)
                pagerState.animateScrollToPage(prev)
            }
        }) {
            Icon(Icons.Default.ArrowBack, contentDescription = "上一页")
        }
        Button(onClick = {
            scope.launch {
                val next = (pagerState.currentPage + 1).coerceAtMost(9)
                pagerState.animateScrollToPage(next)
            }
        }) {
            Icon(Icons.Default.ArrowForward, contentDescription = "下一页")
        }
        Button(onClick = {
            scope.launch { pagerState.animateScrollToPage(9) }
        }) {
            Text("末页")
        }
    }

    HorizontalPager(state = pagerState, modifier = Modifier.weight(1f)) { page ->
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Text("第 " + (page + 1) + " / 10 页")
        }
    }
}`,
    },
    {
      title: '监听页面切换事件',
      code: `val pagerState = rememberPagerState(pageCount = { items.size })
var lastPage by remember { mutableIntStateOf(0) }

LaunchedEffect(pagerState.currentPage) {
    // 页面切换时触发
    Log.d("Pager", "从第 " + lastPage + " 页切换到第 " + pagerState.currentPage + " 页")
    lastPage = pagerState.currentPage

    // 可以在此处触发埋点、视频播放控制等
    trackPageView(pagerState.currentPage)
}

HorizontalPager(state = pagerState) { page ->
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(200.dp)
            .padding(horizontal = 16.dp)
    ) {
        Column(
            modifier = Modifier.fillMaxSize().padding(16.dp),
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = items[page].title,
                style = MaterialTheme.typography.titleLarge
            )
            Spacer(Modifier.height(8.dp))
            Text(
                text = items[page].description,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '商品图片画廊',
      description: '电商详情页的商品多图展示，支持左右滑动查看',
      code: `@Composable
fun ProductImageGallery(images: List<String>) {
    val pagerState = rememberPagerState(pageCount = { images.size })

    Box(modifier = Modifier.fillMaxWidth()) {
        HorizontalPager(
            state = pagerState,
            modifier = Modifier
                .fillMaxWidth()
                .aspectRatio(1f)
        ) { page ->
            AsyncImage(
                model = images[page],
                contentDescription = "商品图片 " + (page + 1),
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop
            )
        }

        // 图片计数器
        Surface(
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(16.dp),
            shape = RoundedCornerShape(16.dp),
            color = Color.Black.copy(alpha = 0.6f)
        ) {
            Text(
                text = (pagerState.currentPage + 1).toString() + " / " + images.size,
                color = Color.White,
                modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                style = MaterialTheme.typography.bodySmall
            )
        }

        // 缩略图指示器
        Row(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .padding(bottom = 8.dp)
                .horizontalScroll(rememberScrollState()),
            horizontalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            images.forEachIndexed { index, imageUrl ->
                AsyncImage(
                    model = imageUrl,
                    contentDescription = null,
                    modifier = Modifier
                        .size(48.dp)
                        .clip(RoundedCornerShape(4.dp))
                        .border(
                            width = 2.dp,
                            color = if (pagerState.currentPage == index)
                                MaterialTheme.colorScheme.primary
                            else Color.Transparent,
                            shape = RoundedCornerShape(4.dp)
                        )
                        .clickable {
                            // 点击缩略图跳转到对应页
                            scope.launch { pagerState.animateScrollToPage(index) }
                        },
                    contentScale = ContentScale.Crop
                )
            }
        }
    }
}`,
    },
    {
      title: '新手引导页',
      description: 'App 首次启动的欢迎引导流程',
      code: `@Composable
fun OnboardingScreen(onFinish: () -> Unit) {
    val pages = listOf(
        OnboardingPage("欢迎", "欢迎使用我们的应用", Icons.Default.Star),
        OnboardingPage("功能", "探索强大的功能", Icons.Default.Build),
        OnboardingPage("开始", "立即开始使用", Icons.Default.Check)
    )
    val pagerState = rememberPagerState(pageCount = { pages.size })
    val scope = rememberCoroutineScope()

    Box(modifier = Modifier.fillMaxSize()) {
        HorizontalPager(
            state = pagerState,
            modifier = Modifier.fillMaxSize()
        ) { page ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(32.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Icon(
                    imageVector = pages[page].icon,
                    contentDescription = null,
                    modifier = Modifier.size(120.dp),
                    tint = MaterialTheme.colorScheme.primary
                )
                Spacer(Modifier.height(32.dp))
                Text(
                    text = pages[page].title,
                    style = MaterialTheme.typography.headlineLarge,
                    fontWeight = FontWeight.Bold
                )
                Spacer(Modifier.height(16.dp))
                Text(
                    text = pages[page].description,
                    style = MaterialTheme.typography.bodyLarge,
                    textAlign = TextAlign.Center,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        // 底部控制栏
        Row(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            TextButton(
                onClick = { onFinish() },
                enabled = pagerState.currentPage < pages.size - 1
            ) {
                Text(if (pagerState.currentPage < pages.size - 1) "跳过" else "")
            }

            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                repeat(pages.size) { index ->
                    Box(
                        modifier = Modifier
                            .size(if (pagerState.currentPage == index) 24.dp else 8.dp, 8.dp)
                            .clip(RoundedCornerShape(4.dp))
                            .background(
                                if (pagerState.currentPage == index)
                                    MaterialTheme.colorScheme.primary
                                else
                                    MaterialTheme.colorScheme.surfaceVariant
                            )
                    )
                }
            }

            Button(
                onClick = {
                    scope.launch {
                        if (pagerState.currentPage < pages.size - 1) {
                            pagerState.animateScrollToPage(pagerState.currentPage + 1)
                        } else {
                            onFinish()
                        }
                    }
                }
            ) {
                Text(if (pagerState.currentPage < pages.size - 1) "下一步" else "开始")
            }
        }
    }
}

data class OnboardingPage(val title: String, val description: String, val icon: ImageVector)`,
    },
  ],

  bestPractices: [
    {
      title: '使用 key 参数优化动态列表',
      description: '当 pageCount 动态变化时，提供稳定的 key 避免状态丢失',
      goodExample: `val pagerState = rememberPagerState(
    pageCount = { items.size },
    initialPage = 0
)

HorizontalPager(
    state = pagerState,
    key = { items[it].id }  // 使用稳定的 ID 作为 key
) { page ->
    ItemCard(items[page])
}`,
      badExample: `HorizontalPager(state = pagerState) { page ->
    // 没有 key，items 变化时可能导致显示错误的页面
    ItemCard(items[page])
}`,
    },
    {
      title: '自动轮播要处理用户交互',
      description: '用户手动滑动时应暂停自动轮播，避免冲突',
      goodExample: `var isUserInteracting by remember { mutableStateOf(false) }

LaunchedEffect(pagerState, isUserInteracting) {
    if (!isUserInteracting) {
        while (true) {
            delay(3000)
            pagerState.animateScrollToPage((pagerState.currentPage + 1) % pageCount)
        }
    }
}

HorizontalPager(
    state = pagerState,
    modifier = Modifier.pointerInput(Unit) {
        detectTapGestures(
            onPress = { isUserInteracting = true },
            onTap = { isUserInteracting = false }
        )
    }
) { page -> /* ... */ }`,
    },
    {
      title: '使用 contentPadding 露出相邻页面',
      description: '通过 contentPadding 让用户看到前后页面，提升可发现性',
      goodExample: `HorizontalPager(
    state = pagerState,
    contentPadding = PaddingValues(horizontal = 32.dp),
    pageSpacing = 8.dp
) { page ->
    Card(modifier = Modifier.fillMaxWidth()) { /* ... */ }
}`,
      badExample: `HorizontalPager(state = pagerState) { page ->
    // 完全填充，用户不知道还有其他页面
    Card(modifier = Modifier.fillMaxSize()) { /* ... */ }
}`,
    },
    {
      title: '配合 LaunchedEffect 监听页面变化',
      description: '在页面切换时执行副作用，如数据加载、埋点上报',
      goodExample: `LaunchedEffect(pagerState.currentPage) {
    // 页面切换时加载数据
    viewModel.loadPageData(pagerState.currentPage)
    analytics.trackPageView("page_" + pagerState.currentPage)
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'PagerState 参数说明',
      content: 'rememberPagerState(pageCount, initialPage, initialPageOffsetFraction)，pageCount 是 lambda 以支持动态变化',
    },
    {
      type: 'info',
      title: 'currentPage 和 targetPage 的区别',
      content: 'currentPage 是当前完全停留的页面，targetPage 是滑动过程中的目标页面（包括手势拖动时的目标）',
    },
    {
      type: 'info',
      title: '使用 animateScrollToPage 平滑滚动',
      content: '使用 animateScrollToPage(page) 带动画滚动，scrollToPage(page) 立即跳转无动画',
    },
    {
      type: 'info',
      title: 'contentPadding 可实现露出效果',
      content: '设置 contentPadding = PaddingValues(horizontal = 48.dp) 可以让相邻页面露出一部分，提升视觉效果',
    },
    {
      type: 'warning',
      title: '大量页面使用懒加载',
      content: 'HorizontalPager 类似 LazyRow，会根据可见范围懒加载页面。如果每页内容复杂，确保单页性能',
    },
    {
      type: 'warning',
      title: '避免在 Pager 内嵌套 Pager',
      content: '嵌套的 HorizontalPager 会导致滑动手势冲突，考虑用 TabRow + HorizontalPager 替代',
    },
    {
      type: 'error',
      title: 'pageCount 变化时注意索引越界',
      content: '动态改变 pageCount 时，如果 currentPage >= 新的 pageCount，会自动调整到最后一页',
    },
  ],

  relatedComponents: ['vertical-pager', 'lazy-row'],
  since: '1.0.0',
}
