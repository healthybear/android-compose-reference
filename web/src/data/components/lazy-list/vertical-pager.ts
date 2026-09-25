import type { ComponentEntry } from '../../types'

export const verticalPagerComponent: ComponentEntry = {
  id: 'vertical-pager',
  demo: { id: 'vertical-pager', sourceFile: 'VerticalPagerDemo.kt' },
  name: 'VerticalPager',
  category: 'LazyList',
  description: '垂直翻页容器，每次滚动一整页，常用于短视频流、竖向引导页。',
  tags: ['verticalpager', 'pager', 'vertical', 'scroll', 'swipe'],
  params: [
    { name: 'state', type: 'PagerState', required: true, description: '通过 rememberPagerState() 创建' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'pageSpacing', type: 'Dp', default: '0.dp', description: '页面间距' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'PaddingValues(0.dp)', description: '内容内边距' },
    { name: 'pageContent', type: '@Composable PagerScope.(page: Int) -> Unit', required: true, description: '每页内容，page 为当前页索引' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `val pagerState = rememberPagerState(pageCount = { 5 })

VerticalPager(
    state = pagerState,
    modifier = Modifier.fillMaxSize()
) { page ->
    Box(
        contentAlignment = Alignment.Center,
        modifier = Modifier
            .fillMaxSize()
            .background(
                when (page % 5) {
                    0 -> Color(0xFFE3F2FD)
                    1 -> Color(0xFFFCE4EC)
                    2 -> Color(0xFFF3E5F5)
                    3 -> Color(0xFFE8F5E9)
                    else -> Color(0xFFFFF3E0)
                }
            )
    ) {
        Text("第 " + (page + 1) + " 页", style = MaterialTheme.typography.headlineMedium)
    }
}`,
    },
    {
      title: '短视频流（带播放控制）',
      code: `val pagerState = rememberPagerState(pageCount = { videos.size })

VerticalPager(
    state = pagerState,
    modifier = Modifier.fillMaxSize()
) { page ->
    val isCurrentPage = pagerState.currentPage == page

    DisposableEffect(isCurrentPage) {
        if (isCurrentPage) {
            // 当前页：开始播放
            videoPlayers[page]?.play()
        } else {
            // 离开页面：暂停播放
            videoPlayers[page]?.pause()
        }
        onDispose {
            videoPlayers[page]?.pause()
        }
    }

    Box(modifier = Modifier.fillMaxSize()) {
        VideoPlayer(
            url = videos[page].url,
            isPlaying = isCurrentPage,
            modifier = Modifier.fillMaxSize()
        )

        // 视频信息覆盖层
        Column(
            modifier = Modifier
                .align(Alignment.BottomStart)
                .padding(16.dp)
        ) {
            Text(
                text = videos[page].title,
                style = MaterialTheme.typography.titleMedium,
                color = Color.White
            )
            Text(
                text = videos[page].author,
                style = MaterialTheme.typography.bodySmall,
                color = Color.White.copy(alpha = 0.8f)
            )
        }

        // 右侧操作栏
        Column(
            modifier = Modifier
                .align(Alignment.CenterEnd)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            IconButton(onClick = { /* 点赞 */ }) {
                Icon(Icons.Default.Favorite, null, tint = Color.White)
            }
            IconButton(onClick = { /* 评论 */ }) {
                Icon(Icons.Default.Comment, null, tint = Color.White)
            }
            IconButton(onClick = { /* 分享 */ }) {
                Icon(Icons.Default.Share, null, tint = Color.White)
            }
        }
    }
}`,
    },
    {
      title: '全屏故事/动态查看',
      code: `val pagerState = rememberPagerState(pageCount = { stories.size })
val scope = rememberCoroutineScope()

Box(modifier = Modifier.fillMaxSize()) {
    VerticalPager(
        state = pagerState,
        modifier = Modifier.fillMaxSize()
    ) { page ->
        Box(modifier = Modifier.fillMaxSize()) {
            AsyncImage(
                model = stories[page].imageUrl,
                contentDescription = null,
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop
            )

            // 顶部进度条
            LinearProgressIndicator(
                progress = { (page + 1).toFloat() / stories.size },
                modifier = Modifier
                    .fillMaxWidth()
                    .align(Alignment.TopCenter),
                color = Color.White
            )

            // 底部用户信息
            Row(
                modifier = Modifier
                    .align(Alignment.BottomStart)
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                AsyncImage(
                    model = stories[page].avatar,
                    contentDescription = null,
                    modifier = Modifier
                        .size(40.dp)
                        .clip(CircleShape)
                )
                Spacer(Modifier.width(12.dp))
                Column {
                    Text(
                        text = stories[page].username,
                        color = Color.White,
                        style = MaterialTheme.typography.titleSmall
                    )
                    Text(
                        text = stories[page].timeAgo,
                        color = Color.White.copy(alpha = 0.7f),
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }
        }
    }

    // 关闭按钮
    IconButton(
        onClick = { /* 关闭 */ },
        modifier = Modifier
            .align(Alignment.TopEnd)
            .padding(16.dp)
    ) {
        Icon(Icons.Default.Close, null, tint = Color.White)
    }
}`,
    },
    {
      title: '带页面指示器',
      code: `val pagerState = rememberPagerState(pageCount = { pages.size })

Box(modifier = Modifier.fillMaxSize()) {
    VerticalPager(
        state = pagerState,
        modifier = Modifier.fillMaxSize()
    ) { page ->
        Card(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(24.dp),
                verticalArrangement = Arrangement.Center
            ) {
                Icon(
                    imageVector = pages[page].icon,
                    contentDescription = null,
                    modifier = Modifier.size(80.dp),
                    tint = MaterialTheme.colorScheme.primary
                )
                Spacer(Modifier.height(16.dp))
                Text(
                    text = pages[page].title,
                    style = MaterialTheme.typography.headlineMedium
                )
                Spacer(Modifier.height(8.dp))
                Text(
                    text = pages[page].content,
                    style = MaterialTheme.typography.bodyLarge,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }

    // 右侧垂直指示器
    Column(
        modifier = Modifier
            .align(Alignment.CenterEnd)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        repeat(pages.size) { index ->
            Box(
                modifier = Modifier
                    .size(8.dp, if (pagerState.currentPage == index) 32.dp else 8.dp)
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
}`,
    },
    {
      title: '预加载相邻页面',
      code: `val pagerState = rememberPagerState(pageCount = { articles.size })

// 预加载当前页前后各一页的数据
LaunchedEffect(pagerState.currentPage) {
    val currentPage = pagerState.currentPage
    val prevPage = (currentPage - 1).coerceAtLeast(0)
    val nextPage = (currentPage + 1).coerceAtMost(articles.size - 1)

    // 预加载相邻页面数据
    listOf(prevPage, currentPage, nextPage).forEach { page ->
        if (!articles[page].isLoaded) {
            viewModel.preloadArticle(articles[page].id)
        }
    }
}

VerticalPager(
    state = pagerState,
    modifier = Modifier.fillMaxSize(),
    beyondViewportPageCount = 1  // 保持前后各一页在内存中
) { page ->
    ArticleDetailView(article = articles[page])
}`,
    },
    {
      title: '页面切换动画效果',
      code: `val pagerState = rememberPagerState(pageCount = { items.size })

VerticalPager(
    state = pagerState,
    modifier = Modifier.fillMaxSize()
) { page ->
    val pageOffset = (pagerState.currentPage - page) + pagerState.currentPageOffsetFraction
    val scale = lerp(
        start = 0.9f,
        stop = 1f,
        fraction = 1f - pageOffset.absoluteValue.coerceIn(0f, 1f)
    )
    val alpha = lerp(
        start = 0.5f,
        stop = 1f,
        fraction = 1f - pageOffset.absoluteValue.coerceIn(0f, 1f)
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .graphicsLayer {
                scaleX = scale
                scaleY = scale
                this.alpha = alpha
            }
            .background(MaterialTheme.colorScheme.surface),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.padding(32.dp)
        ) {
            Text(
                text = items[page].title,
                style = MaterialTheme.typography.headlineLarge,
                textAlign = TextAlign.Center
            )
            Spacer(Modifier.height(16.dp))
            Text(
                text = items[page].description,
                style = MaterialTheme.typography.bodyLarge,
                textAlign = TextAlign.Center,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '短视频 Feed 流',
      description: '类似抖音、快手的全屏竖向滑动视频流',
      code: `@Composable
fun ShortVideoFeed(videos: List<Video>) {
    val pagerState = rememberPagerState(pageCount = { videos.size })
    val scope = rememberCoroutineScope()

    Box(modifier = Modifier.fillMaxSize()) {
        VerticalPager(
            state = pagerState,
            modifier = Modifier.fillMaxSize(),
            beyondViewportPageCount = 1
        ) { page ->
            val isCurrentPage = pagerState.currentPage == page

            Box(modifier = Modifier.fillMaxSize().background(Color.Black)) {
                // 视频播放器
                AndroidView(
                    factory = { context ->
                        PlayerView(context).apply {
                            player = ExoPlayer.Builder(context).build().apply {
                                setMediaItem(MediaItem.fromUri(videos[page].url))
                                prepare()
                                repeatMode = Player.REPEAT_MODE_ONE
                                if (isCurrentPage) playWhenReady = true
                            }
                        }
                    },
                    modifier = Modifier.fillMaxSize()
                )

                // 左侧用户信息和描述
                Column(
                    modifier = Modifier
                        .align(Alignment.BottomStart)
                        .padding(16.dp)
                        .widthIn(max = 280.dp)
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        AsyncImage(
                            model = videos[page].authorAvatar,
                            contentDescription = null,
                            modifier = Modifier
                                .size(48.dp)
                                .clip(CircleShape)
                                .border(2.dp, Color.White, CircleShape)
                        )
                        Spacer(Modifier.width(12.dp))
                        Column {
                            Text(
                                text = videos[page].authorName,
                                color = Color.White,
                                style = MaterialTheme.typography.titleSmall,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = videos[page].publishTime,
                                color = Color.White.copy(alpha = 0.7f),
                                style = MaterialTheme.typography.bodySmall
                            )
                        }
                        Spacer(Modifier.weight(1f))
                        OutlinedButton(
                            onClick = { /* 关注 */ },
                            colors = ButtonDefaults.outlinedButtonColors(
                                contentColor = Color.White
                            )
                        ) {
                            Text("关注")
                        }
                    }

                    Spacer(Modifier.height(12.dp))
                    Text(
                        text = videos[page].description,
                        color = Color.White,
                        style = MaterialTheme.typography.bodyMedium,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )
                }

                // 右侧互动按钮
                Column(
                    modifier = Modifier
                        .align(Alignment.CenterEnd)
                        .padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(32.dp)
                ) {
                    InteractionButton(
                        icon = if (videos[page].isLiked) Icons.Filled.Favorite else Icons.Outlined.FavoriteBorder,
                        count = videos[page].likeCount,
                        tint = if (videos[page].isLiked) Color.Red else Color.White,
                        onClick = { /* 点赞 */ }
                    )
                    InteractionButton(
                        icon = Icons.Outlined.Comment,
                        count = videos[page].commentCount,
                        tint = Color.White,
                        onClick = { /* 评论 */ }
                    )
                    InteractionButton(
                        icon = Icons.Outlined.Share,
                        count = videos[page].shareCount,
                        tint = Color.White,
                        onClick = { /* 分享 */ }
                    )
                }
            }
        }
    }
}

@Composable
fun InteractionButton(
    icon: ImageVector,
    count: Int,
    tint: Color,
    onClick: () -> Unit
) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        IconButton(
            onClick = onClick,
            modifier = Modifier.size(48.dp)
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = tint,
                modifier = Modifier.size(32.dp)
            )
        }
        Text(
            text = if (count > 10000) (count / 1000).toString() + "k" else count.toString(),
            color = Color.White,
            style = MaterialTheme.typography.bodySmall
        )
    }
}`,
    },
    {
      title: '全屏阅读器（文章翻页）',
      description: '类似微信公众号的全屏文章阅读',
      code: `@Composable
fun ArticleReader(articles: List<Article>, initialPage: Int = 0) {
    val pagerState = rememberPagerState(
        pageCount = { articles.size },
        initialPage = initialPage
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("文章 " + (pagerState.currentPage + 1) + " / " + articles.size) },
                navigationIcon = {
                    IconButton(onClick = { /* 返回 */ }) {
                        Icon(Icons.Default.ArrowBack, null)
                    }
                },
                actions = {
                    IconButton(onClick = { /* 分享 */ }) {
                        Icon(Icons.Default.Share, null)
                    }
                }
            )
        }
    ) { padding ->
        VerticalPager(
            state = pagerState,
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) { page ->
            val scrollState = rememberScrollState()

            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .verticalScroll(scrollState)
                    .padding(horizontal = 16.dp, vertical = 24.dp)
            ) {
                Text(
                    text = articles[page].title,
                    style = MaterialTheme.typography.headlineMedium,
                    fontWeight = FontWeight.Bold
                )
                Spacer(Modifier.height(8.dp))
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Text(
                        text = articles[page].author,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Text("·", color = MaterialTheme.colorScheme.onSurfaceVariant)
                    Text(
                        text = articles[page].publishDate,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                Spacer(Modifier.height(24.dp))

                // 文章内容（Markdown 渲染或富文本）
                Text(
                    text = articles[page].content,
                    style = MaterialTheme.typography.bodyLarge,
                    lineHeight = 28.sp
                )

                Spacer(Modifier.height(32.dp))

                // 底部导航提示
                if (page < articles.size - 1) {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        onClick = {
                            scope.launch {
                                pagerState.animateScrollToPage(page + 1)
                            }
                        }
                    ) {
                        Row(
                            modifier = Modifier.padding(16.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column(modifier = Modifier.weight(1f)) {
                                Text("下一篇", style = MaterialTheme.typography.bodySmall)
                                Text(
                                    articles[page + 1].title,
                                    style = MaterialTheme.typography.titleSmall,
                                    maxLines = 2,
                                    overflow = TextOverflow.Ellipsis
                                )
                            }
                            Icon(Icons.Default.ArrowForward, null)
                        }
                    }
                }
            }
        }
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '视频播放器要根据页面切换控制播放',
      description: '当前页播放，离开页面时暂停，避免多个视频同时播放',
      goodExample: `DisposableEffect(pagerState.currentPage) {
    val isCurrentPage = pagerState.currentPage == page
    if (isCurrentPage) {
        player.play()
    } else {
        player.pause()
    }
    onDispose {
        player.pause()
    }
}`,
      badExample: `// 所有页面的视频都在播放，浪费资源
VideoPlayer(url = url, autoPlay = true)`,
    },
    {
      title: '使用 beyondViewportPageCount 控制预加载',
      description: '设置保持在内存中的非可见页面数量，平衡性能和流畅度',
      goodExample: `VerticalPager(
    state = pagerState,
    beyondViewportPageCount = 1  // 保持前后各1页在内存中
) { page -> /* ... */ }`,
    },
    {
      title: '嵌套滚动要合理处理',
      description: 'VerticalPager 内嵌 LazyColumn 时，会自动处理滚动优先级',
      goodExample: `VerticalPager(state = pagerState) { page ->
    LazyColumn {
        // 内容可独立滚动，滚到顶部/底部时才触发翻页
        items(50) { Text("Item $it") }
    }
}`,
    },
    {
      title: '全屏视频要处理系统UI',
      description: '短视频场景下隐藏状态栏和导航栏',
      goodExample: `val activity = LocalContext.current as? Activity

DisposableEffect(Unit) {
    val window = activity?.window
    val insetsController = window?.insetsController
    insetsController?.hide(WindowInsets.Type.systemBars())

    onDispose {
        insetsController?.show(WindowInsets.Type.systemBars())
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'VerticalPager 与 HorizontalPager 参数相同',
      content: '两者只是滚动方向不同，参数和用法完全一致，都使用 PagerState 管理状态',
    },
    {
      type: 'info',
      title: '适合全屏沉浸式内容',
      content: 'VerticalPager 更适合全屏内容如视频、图片、文章，而列表数据应使用 LazyColumn',
    },
    {
      type: 'tip',
      title: '视频播放器性能优化',
      content: '使用 DisposableEffect 在页面离开时释放播放器资源，避免内存泄漏',
    },
    {
      type: 'tip',
      title: 'currentPage 变化监听',
      content: '使用 LaunchedEffect(pagerState.currentPage) 监听页面切换，执行数据加载、埋点等操作',
    },
    {
      type: 'warning',
      title: '避免过度预加载',
      content: 'beyondViewportPageCount 不宜设置过大，视频等重资源场景建议设为 1，避免内存压力',
    },
    {
      type: 'warning',
      title: '注意嵌套滚动的手势冲突',
      content: 'VerticalPager 内嵌 Column.verticalScroll 时需确保内容滚动到边界后才能触发翻页',
    },
    {
      type: 'danger',
      title: '视频列表内存管理',
      content: '大量视频页面要及时释放非当前页的播放器实例，使用 DisposableEffect 管理生命周期',
    },
  ],

  relatedComponents: ['horizontal-pager', 'lazy-column'],
  since: '1.0.0',
}
