import type { ComponentEntry } from '../../types'

export const bottomAppBarComponent: ComponentEntry = {
  id: 'bottom-app-bar',
  demo: { id: 'bottom-app-bar', sourceFile: 'BottomAppBarDemo.kt' },
  name: 'BottomAppBar',
  category: 'Material',
  description: 'Material 3 底部应用栏，固定在屏幕底部，通常配合 FAB 使用，提供主要导航或操作按钮。',
  tags: ['bottom', 'app-bar', 'navigation', 'fab', '底部导航'],
  params: [
    { name: 'actions', type: '@Composable RowScope.() -> Unit', required: true, description: '操作按钮，从左侧开始排列' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'floatingActionButton', type: '@Composable (() -> Unit)?', default: 'null', description: 'FAB，会自动对齐到 BottomAppBar 的凹槽或末端' },
    { name: 'containerColor', type: 'Color', default: 'BottomAppBarDefaults.containerColor', description: '背景色' },
    { name: 'contentColor', type: 'Color', default: 'contentColorFor(containerColor)', description: '内容颜色' },
    { name: 'tonalElevation', type: 'Dp', default: 'BottomAppBarDefaults.ContainerElevation', description: '色调高度' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'BottomAppBarDefaults.ContentPadding', description: '内容内边距' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `Scaffold(
    bottomBar = {
        BottomAppBar(
            actions = {
                IconButton(onClick = { /* 主页 */ }) {
                    Icon(Icons.Default.Home, contentDescription = "主页")
                }
                IconButton(onClick = { /* 搜索 */ }) {
                    Icon(Icons.Default.Search, contentDescription = "搜索")
                }
                IconButton(onClick = { /* 通知 */ }) {
                    Icon(Icons.Default.Notifications, contentDescription = "通知")
                }
            }
        )
    }
) { padding ->
    // 页面内容
}`,
    },
    {
      title: '配合 FAB 使用',
      code: `Scaffold(
    bottomBar = {
        BottomAppBar(
            actions = {
                IconButton(onClick = { /* 操作1 */ }) {
                    Icon(Icons.Default.Check, contentDescription = "操作1")
                }
                IconButton(onClick = { /* 操作2 */ }) {
                    Icon(Icons.Default.Edit, contentDescription = "操作2")
                }
                IconButton(onClick = { /* 操作3 */ }) {
                    Icon(Icons.Default.Mic, contentDescription = "操作3")
                }
            },
            floatingActionButton = {
                FloatingActionButton(
                    onClick = { /* 主操作 */ },
                    containerColor = BottomAppBarDefaults.bottomAppBarFabColor,
                    elevation = FloatingActionButtonDefaults.bottomAppBarFabElevation()
                ) {
                    Icon(Icons.Default.Add, contentDescription = "添加")
                }
            }
        )
    }
) { padding ->
    LazyColumn(
        modifier = Modifier.padding(padding)
    ) {
        items(50) { index ->
            Text("Item $index", modifier = Modifier.padding(16.dp))
        }
    }
}`,
    },
    {
      title: '动态隐藏底部栏',
      code: `val listState = rememberLazyListState()
var isBottomBarVisible by remember { mutableStateOf(true) }

LaunchedEffect(listState) {
    snapshotFlow { listState.isScrollInProgress }
        .collect { isScrolling ->
            if (isScrolling) {
                val firstVisible = listState.firstVisibleItemIndex
                isBottomBarVisible = listState.layoutInfo.visibleItemsInfo
                    .firstOrNull()?.index == firstVisible
            }
        }
}

Scaffold(
    bottomBar = {
        AnimatedVisibility(
            visible = isBottomBarVisible,
            enter = slideInVertically(initialOffsetY = { it }),
            exit = slideOutVertically(targetOffsetY = { it })
        ) {
            BottomAppBar(
                actions = {
                    IconButton(onClick = { }) {
                        Icon(Icons.Default.Home, contentDescription = "主页")
                    }
                    IconButton(onClick = { }) {
                        Icon(Icons.Default.Search, contentDescription = "搜索")
                    }
                }
            )
        }
    }
) { padding ->
    LazyColumn(
        state = listState,
        contentPadding = padding
    ) {
        items(100) {
            Text("Item $it", modifier = Modifier.padding(16.dp))
        }
    }
}`,
    },
    {
      title: '自定义颜色',
      code: `BottomAppBar(
    containerColor = MaterialTheme.colorScheme.primaryContainer,
    contentColor = MaterialTheme.colorScheme.onPrimaryContainer,
    actions = {
        IconButton(onClick = { }) {
            Icon(Icons.Default.Favorite, contentDescription = "收藏")
        }
        IconButton(onClick = { }) {
            Icon(Icons.Default.Share, contentDescription = "分享")
        }
    }
)`,
    },
    {
      title: '带文字标签的操作',
      code: `BottomAppBar(
    actions = {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.clickable { /* 主页 */ }
            ) {
                Icon(Icons.Default.Home, contentDescription = null)
                Spacer(Modifier.height(4.dp))
                Text(
                    text = "主页",
                    style = MaterialTheme.typography.labelSmall
                )
            }
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.clickable { /* 搜索 */ }
            ) {
                Icon(Icons.Default.Search, contentDescription = null)
                Spacer(Modifier.height(4.dp))
                Text(
                    text = "搜索",
                    style = MaterialTheme.typography.labelSmall
                )
            }
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.clickable { /* 我的 */ }
            ) {
                Icon(Icons.Default.Person, contentDescription = null)
                Spacer(Modifier.height(4.dp))
                Text(
                    text = "我的",
                    style = MaterialTheme.typography.labelSmall
                )
            }
        }
    }
)`,
    },
  ],

  useCases: [
    {
      title: '社交应用主导航',
      description: '底部导航栏配合 FAB 实现主要功能入口',
      code: `@Composable
fun SocialAppScreen() {
    var selectedTab by remember { mutableIntStateOf(0) }
    val tabs = listOf(
        NavigationItem("首页", Icons.Default.Home),
        NavigationItem("发现", Icons.Default.Explore),
        NavigationItem("消息", Icons.Default.Message),
        NavigationItem("我的", Icons.Default.Person)
    )

    Scaffold(
        bottomBar = {
            BottomAppBar(
                actions = {
                    tabs.forEachIndexed { index, item ->
                        IconButton(
                            onClick = { selectedTab = index },
                            modifier = Modifier.weight(1f)
                        ) {
                            Column(
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                Icon(
                                    item.icon,
                                    contentDescription = item.label,
                                    tint = if (selectedTab == index) {
                                        MaterialTheme.colorScheme.primary
                                    } else {
                                        MaterialTheme.colorScheme.onSurfaceVariant
                                    }
                                )
                                Text(
                                    text = item.label,
                                    style = MaterialTheme.typography.labelSmall,
                                    color = if (selectedTab == index) {
                                        MaterialTheme.colorScheme.primary
                                    } else {
                                        MaterialTheme.colorScheme.onSurfaceVariant
                                    }
                                )
                            }
                        }
                    }
                },
                floatingActionButton = {
                    FloatingActionButton(
                        onClick = { /* 发布 */ },
                        containerColor = BottomAppBarDefaults.bottomAppBarFabColor,
                        elevation = FloatingActionButtonDefaults.bottomAppBarFabElevation()
                    ) {
                        Icon(Icons.Default.Add, contentDescription = "发布")
                    }
                }
            )
        }
    ) { padding ->
        Box(modifier = Modifier.padding(padding)) {
            when (selectedTab) {
                0 -> HomeContent()
                1 -> DiscoverContent()
                2 -> MessagesContent()
                3 -> ProfileContent()
            }
        }
    }
}

data class NavigationItem(val label: String, val icon: ImageVector)`
    },
    {
      title: '媒体播放器控制栏',
      description: '音乐或视频应用的底部播放控制',
      code: `@Composable
fun MediaPlayerScreen() {
    var isPlaying by remember { mutableStateOf(false) }
    var currentTrack by remember { mutableStateOf(Track("Song Title", "Artist Name")) }

    Scaffold(
        bottomBar = {
            BottomAppBar(
                containerColor = MaterialTheme.colorScheme.surfaceVariant,
                tonalElevation = 3.dp
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 8.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    // 当前播放信息
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.weight(1f)
                    ) {
                        AsyncImage(
                            model = currentTrack.coverUrl,
                            contentDescription = null,
                            modifier = Modifier
                                .size(48.dp)
                                .clip(RoundedCornerShape(4.dp))
                        )
                        Spacer(Modifier.width(12.dp))
                        Column {
                            Text(
                                text = currentTrack.title,
                                style = MaterialTheme.typography.bodyMedium,
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis
                            )
                            Text(
                                text = currentTrack.artist,
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                maxLines = 1
                            )
                        }
                    }

                    // 播放控制
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        IconButton(onClick = { /* 上一首 */ }) {
                            Icon(Icons.Default.SkipPrevious, contentDescription = "上一首")
                        }
                        IconButton(onClick = { isPlaying = !isPlaying }) {
                            Icon(
                                if (isPlaying) Icons.Default.Pause else Icons.Default.PlayArrow,
                                contentDescription = if (isPlaying) "暂停" else "播放"
                            )
                        }
                        IconButton(onClick = { /* 下一首 */ }) {
                            Icon(Icons.Default.SkipNext, contentDescription = "下一首")
                        }
                    }
                }
            }
        }
    ) { padding ->
        // 主内容区域
        LazyColumn(
            modifier = Modifier.padding(padding)
        ) {
            // 播放列表
        }
    }
}

data class Track(val title: String, val artist: String, val coverUrl: String = "")`
    },
  ],

  bestPractices: [
    {
      title: '操作按钮不宜过多',
      description: 'BottomAppBar 的操作按钮建议 2-5 个',
      goodExample: `BottomAppBar(
    actions = {
        IconButton(onClick = { }) { Icon(Icons.Default.Home, ...) }
        IconButton(onClick = { }) { Icon(Icons.Default.Search, ...) }
        IconButton(onClick = { }) { Icon(Icons.Default.Person, ...) }
    }
)`,
      badExample: `// 按钮过多，拥挤
BottomAppBar(
    actions = {
        // 7 个按钮太多
        repeat(7) { IconButton(...) }
    }
)`
    },
    {
      title: 'FAB 使用专用颜色和 elevation',
      description: '与 BottomAppBar 搭配的 FAB 应使用专用配置',
      goodExample: `FloatingActionButton(
    onClick = { },
    containerColor = BottomAppBarDefaults.bottomAppBarFabColor,
    elevation = FloatingActionButtonDefaults.bottomAppBarFabElevation()
) { Icon(...) }`,
      badExample: `// 使用默认配置，视觉不协调
FloatingActionButton(onClick = { }) {
    Icon(...)
}`
    },
    {
      title: 'BottomAppBar vs NavigationBar',
      description: 'BottomAppBar 用于操作，NavigationBar 用于导航',
      goodExample: `// 主要导航使用 NavigationBar
NavigationBar {
    NavigationBarItem(...)
}

// 工具/操作使用 BottomAppBar
BottomAppBar(actions = { IconButton(...) })`,
      badExample: `// 导航混用 BottomAppBar
BottomAppBar {
    // 实现导航功能
}`
    },
    {
      title: '配合 Scaffold 使用',
      description: 'BottomAppBar 应该放在 Scaffold 的 bottomBar 参数中',
      goodExample: `Scaffold(
    bottomBar = {
        BottomAppBar(actions = { })
    }
) { padding ->
    // 内容会自动考虑 bottomBar 高度
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'BottomAppBar 自动处理 FAB 位置',
      content: 'floatingActionButton 参数会自动将 FAB 对齐到 BottomAppBar 的末端'
    },
    {
      type: 'tip',
      title: 'BottomAppBar vs NavigationBar',
      content: 'BottomAppBar 用于提供操作按钮，NavigationBar 用于页面导航。不要混用'
    },
    {
      type: 'warning',
      title: 'actions 是 RowScope',
      content: 'actions 在 RowScope 中，内部元素会水平排列。如需特殊布局，使用 Row 包裹'
    },
    {
      type: 'tip',
      title: '滚动时可以隐藏',
      content: '配合 AnimatedVisibility 可以在滚动时隐藏 BottomAppBar，节省屏幕空间'
    },
    {
      type: 'tip',
      title: 'tonalElevation 影响背景色',
      content: 'tonalElevation 不是阴影，而是色调高度，会让背景色稍微变亮'
    },
    {
      type: 'danger',
      title: '避免遮挡重要内容',
      content: 'BottomAppBar 是固定的，确保页面内容使用 Scaffold 的 padding，避免被遮挡'
    },
  ],

  relatedComponents: ['top-app-bar', 'navigation-bar', 'floating-action-button'],
  since: '1.0.0',
}
