import type { ComponentEntry } from '../../types'

export const modifierScrollComponent: ComponentEntry = {
  id: 'modifier-scroll',
  demo: { id: 'modifier-scroll', sourceFile: 'ModifierScrollDemo.kt' },
  name: 'Modifier.verticalScroll / nestedScroll',
  category: 'Modifier',
  description: 'verticalScroll/horizontalScroll 为 Column/Row 添加滚动；nestedScroll 处理嵌套滚动协调，如 TopAppBar 联动。',
  tags: ['modifier', 'scroll', 'nestedscroll', 'scrollable', 'verticalscroll'],
  params: [
    { name: 'verticalScroll(state)', type: 'Modifier', description: '为 Column 等添加垂直滚动' },
    { name: 'horizontalScroll(state)', type: 'Modifier', description: '为 Row 等添加水平滚动' },
    { name: 'scrollable(state, orientation)', type: 'Modifier', description: '底层滚动修饰符，需配合 ScrollableState' },
    { name: 'nestedScroll(connection)', type: 'Modifier', description: '参与嵌套滚动协议，与 TopAppBar scrollBehavior 配合' },
  ],
  examples: [
    {
      title: 'Column 可滚动',
      code: `val scrollState = rememberScrollState()

Column(
    modifier = Modifier
        .fillMaxSize()
        .verticalScroll(scrollState)
) {
    repeat(50) { Text("Item " + it.toString(), modifier = Modifier.padding(16.dp)) }
}

// 初始滚动位置
val scrollState = rememberScrollState(initial = 1000)

Column(
    modifier = Modifier
        .fillMaxSize()
        .verticalScroll(scrollState)
        .padding(16.dp)
) {
    repeat(20) { index ->
        Text(
            text = "Item " + index.toString(),
            modifier = Modifier.padding(8.dp)
        )
    }
}`,
    },
    {
      title: 'TopAppBar 滚动联动',
      code: `val scrollBehavior = TopAppBarDefaults.enterAlwaysScrollBehavior()

Scaffold(
    topBar = {
        TopAppBar(
            title = { Text("标题") },
            scrollBehavior = scrollBehavior
        )
    },
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection)
) { padding ->
    LazyColumn(contentPadding = padding) {
        items(50) { Text("Item " + it.toString(), modifier = Modifier.padding(16.dp)) }
    }
}

// 固定在顶部的 TopAppBar
val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()

// 退出时隐藏的 TopAppBar
val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()`,
    },
    {
      title: 'Row 水平滚动',
      code: `val scrollState = rememberScrollState()

Row(
    modifier = Modifier
        .fillMaxWidth()
        .horizontalScroll(scrollState)
        .padding(16.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp)
) {
    repeat(20) { index ->
        Card(modifier = Modifier.size(120.dp)) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Text("Item " + index.toString())
            }
        }
    }
}`,
    },
    {
      title: '程序化滚动',
      code: `val scrollState = rememberScrollState()
val scope = rememberCoroutineScope()

Column {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Button(onClick = {
            scope.launch {
                scrollState.animateScrollTo(0)  // 滚动到顶部
            }
        }) {
            Text("回到顶部")
        }

        Button(onClick = {
            scope.launch {
                scrollState.animateScrollTo(scrollState.maxValue)  // 滚动到底部
            }
        }) {
            Text("滚动到底部")
        }

        Button(onClick = {
            scope.launch {
                scrollState.animateScrollBy(500f)  // 相对滚动
            }
        }) {
            Text("向下滚动")
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp)
    ) {
        repeat(50) { index ->
            Text("Item " + index.toString(), modifier = Modifier.padding(8.dp))
        }
    }
}`,
    },
    {
      title: '监听滚动状态',
      code: `val scrollState = rememberScrollState()

Column {
    // 显示滚动信息
    Surface(
        modifier = Modifier.fillMaxWidth(),
        color = MaterialTheme.colorScheme.primaryContainer
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("当前位置: " + scrollState.value.toString())
            Text("最大滚动: " + scrollState.maxValue.toString())
            Text("是否可以向下滚: " + scrollState.canScrollForward.toString())
            Text("是否可以向上滚: " + scrollState.canScrollBackward.toString())
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp)
    ) {
        repeat(30) { index ->
            Text("Item " + index.toString(), modifier = Modifier.padding(8.dp))
        }
    }
}

// 滚动到阈值时显示回到顶部按钮
val showButton by remember {
    derivedStateOf { scrollState.value > 1000 }
}

if (showButton) {
    FloatingActionButton(onClick = {
        scope.launch { scrollState.animateScrollTo(0) }
    }) {
        Icon(Icons.Default.KeyboardArrowUp, contentDescription = "回到顶部")
    }
}`,
    },
    {
      title: 'nestedScroll 自定义行为',
      code: `// 实现下拉刷新效果
val nestedScrollConnection = remember {
    object : NestedScrollConnection {
        override fun onPreScroll(available: Offset, source: NestedScrollSource): Offset {
            // 在子组件滚动之前拦截滚动
            return Offset.Zero
        }

        override fun onPostScroll(
            consumed: Offset,
            available: Offset,
            source: NestedScrollSource
        ): Offset {
            // 在子组件滚动之后处理剩余滚动
            if (available.y > 0) {
                // 下拉操作
            }
            return Offset.Zero
        }
    }
}

Box(
    modifier = Modifier
        .fillMaxSize()
        .nestedScroll(nestedScrollConnection)
) {
    LazyColumn {
        items(50) { index ->
            Text("Item " + index.toString(), modifier = Modifier.padding(16.dp))
        }
    }
}`,
    },
    {
      title: '双向滚动',
      code: `// 同时支持水平和垂直滚动
val verticalScrollState = rememberScrollState()
val horizontalScrollState = rememberScrollState()

Box(
    modifier = Modifier
        .fillMaxSize()
        .verticalScroll(verticalScrollState)
        .horizontalScroll(horizontalScrollState)
) {
    // 大表格或地图内容
    Canvas(modifier = Modifier.size(2000.dp, 2000.dp)) {
        // 绘制网格
        val gridSize = 100.dp.toPx()
        for (i in 0..20) {
            val offset = i * gridSize
            drawLine(
                color = Color.LightGray,
                start = Offset(offset, 0f),
                end = Offset(offset, size.height),
                strokeWidth = 2f
            )
            drawLine(
                color = Color.LightGray,
                start = Offset(0f, offset),
                end = Offset(size.width, offset),
                strokeWidth = 2f
            )
        }
    }
}`,
    },
    {
      title: '反向滚动',
      code: `// 从底部开始的聊天界面
val scrollState = rememberScrollState()

LaunchedEffect(Unit) {
    // 初始滚动到底部
    scrollState.scrollTo(scrollState.maxValue)
}

Column(
    modifier = Modifier
        .fillMaxSize()
        .verticalScroll(scrollState, reverseScrolling = true)
        .padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    repeat(20) { index ->
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = if (index % 2 == 0) {
                Arrangement.Start
            } else {
                Arrangement.End
            }
        ) {
            Card {
                Text(
                    text = "消息 " + index.toString(),
                    modifier = Modifier.padding(12.dp)
                )
            }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '设置页面',
      description: '使用 verticalScroll 创建可滚动的设置页面',
      code: `@Composable
fun SettingsScreen() {
    val scrollState = rememberScrollState()

    Scaffold(
        topBar = {
            TopAppBar(title = { Text("设置") })
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(scrollState)
                .padding(padding)
        ) {
            // 账号设置
            SettingsSection(title = "账号") {
                SettingsItem(
                    title = "个人资料",
                    subtitle = "修改头像、昵称等",
                    onClick = { }
                )
                SettingsItem(
                    title = "隐私设置",
                    subtitle = "管理隐私和安全",
                    onClick = { }
                )
            }

            HorizontalDivider()

            // 通知设置
            SettingsSection(title = "通知") {
                var pushEnabled by remember { mutableStateOf(true) }
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text("推送通知", style = MaterialTheme.typography.bodyLarge)
                        Text("接收消息推送", style = MaterialTheme.typography.bodySmall)
                    }
                    Switch(checked = pushEnabled, onCheckedChange = { pushEnabled = it })
                }
            }

            HorizontalDivider()

            // 关于
            SettingsSection(title = "关于") {
                SettingsItem(
                    title = "版本",
                    subtitle = "1.0.0",
                    onClick = { }
                )
                SettingsItem(
                    title = "用户协议",
                    onClick = { }
                )
                SettingsItem(
                    title = "隐私政策",
                    onClick = { }
                )
            }
        }
    }
}

@Composable
fun SettingsSection(
    title: String,
    content: @Composable ColumnScope.() -> Unit
) {
    Column {
        Text(
            text = title,
            style = MaterialTheme.typography.titleMedium,
            color = MaterialTheme.colorScheme.primary,
            modifier = Modifier.padding(16.dp)
        )
        content()
    }
}

@Composable
fun SettingsItem(
    title: String,
    subtitle: String? = null,
    onClick: () -> Unit
) {
    Surface(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(title, style = MaterialTheme.typography.bodyLarge)
                if (subtitle != null) {
                    Text(
                        subtitle,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
            Icon(Icons.Default.ChevronRight, contentDescription = null)
        }
    }
}`
    },
    {
      title: '横向滚动图库',
      description: '实现横向滚动的图片画廊',
      code: `@Composable
fun HorizontalGallery() {
    val scrollState = rememberScrollState()
    val scope = rememberCoroutineScope()

    Column {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                "精选图片",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold
            )

            // 显示滚动进度
            Text(
                text = (scrollState.value.toString() + " / " + scrollState.maxValue.toString()),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(scrollState)
                .padding(horizontal = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            repeat(15) { index ->
                Card(
                    modifier = Modifier.size(200.dp, 280.dp),
                    elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .background(
                                brush = Brush.verticalGradient(
                                    colors = listOf(
                                        Color(0xFF6200EE),
                                        Color(0xFF03DAC5)
                                    )
                                )
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Icon(
                                Icons.Default.Image,
                                contentDescription = null,
                                modifier = Modifier.size(64.dp),
                                tint = Color.White
                            )
                            Spacer(Modifier.height(8.dp))
                            Text(
                                "图片 " + (index + 1).toString(),
                                color = Color.White,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }
        }

        // 滚动控制按钮
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(
                onClick = {
                    scope.launch {
                        scrollState.animateScrollBy(-400f)
                    }
                },
                enabled = scrollState.canScrollBackward
            ) {
                Icon(Icons.Default.ChevronLeft, contentDescription = "向左")
            }

            Spacer(Modifier.width(16.dp))

            IconButton(
                onClick = {
                    scope.launch {
                        scrollState.animateScrollBy(400f)
                    }
                },
                enabled = scrollState.canScrollForward
            ) {
                Icon(Icons.Default.ChevronRight, contentDescription = "向右")
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '选择正确的滚动 API',
      description: 'Column/Row 内容固定时用 verticalScroll/horizontalScroll，内容动态或大量时用 LazyColumn/LazyRow',
      goodExample: `// 固定少量内容
Column(modifier = Modifier.verticalScroll(rememberScrollState())) {
    repeat(20) { Text("Item " + it.toString()) }
}

// 大量或动态内容
LazyColumn {
    items(1000) { Text("Item " + it.toString()) }
}`,
      badExample: `// 大量内容不应该用普通 Column + verticalScroll
Column(modifier = Modifier.verticalScroll(rememberScrollState())) {
    repeat(1000) { Text("Item " + it.toString()) }  // 性能差，全部创建
}`,
    },
    {
      title: '使用 animateScrollTo 而非 scrollTo',
      description: '程序化滚动时使用带动画的方法提供更好的用户体验',
      goodExample: `scope.launch {
    scrollState.animateScrollTo(0)  // 平滑滚动
}`,
      badExample: `scope.launch {
    scrollState.scrollTo(0)  // 立即跳转，体验差
}`,
    },
    {
      title: 'nestedScroll 配合 TopAppBar',
      description: '使用 TopAppBar 的 scrollBehavior 时必须在 Scaffold 上添加 nestedScroll',
      goodExample: `val scrollBehavior = TopAppBarDefaults.enterAlwaysScrollBehavior()

Scaffold(
    topBar = { TopAppBar(title = { Text("标题") }, scrollBehavior = scrollBehavior) },
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection)
) { padding ->
    LazyColumn(contentPadding = padding) { /* ... */ }
}`,
      badExample: `val scrollBehavior = TopAppBarDefaults.enterAlwaysScrollBehavior()

Scaffold(
    topBar = { TopAppBar(title = { Text("标题") }, scrollBehavior = scrollBehavior) }
    // 缺少 nestedScroll，TopAppBar 不会响应滚动
) { padding ->
    LazyColumn(contentPadding = padding) { /* ... */ }
}`,
    },
    {
      title: '保存滚动状态',
      description: '使用 rememberScrollState 自动保存滚动位置，配置变更时恢复',
      goodExample: `val scrollState = rememberScrollState()  // 自动保存和恢复

Column(modifier = Modifier.verticalScroll(scrollState)) {
    // 内容
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'ScrollState 属性',
      content: 'ScrollState 提供 value（当前位置）、maxValue（最大滚动值）、canScrollForward、canScrollBackward 等属性'
    },
    {
      type: 'info',
      title: 'nestedScroll 协调嵌套滚动',
      content: 'nestedScroll 实现父子滚动容器的协调，如 TopAppBar 随内容滚动隐藏、下拉刷新等效果'
    },
    {
      type: 'tip',
      title: 'LazyColumn 不需要 verticalScroll',
      content: 'LazyColumn/LazyRow 内置滚动能力，不要再添加 verticalScroll/horizontalScroll 修饰符'
    },
    {
      type: 'tip',
      title: '程序化滚动需要 CoroutineScope',
      content: '使用 scrollTo 或 animateScrollTo 时需要在协程中调用，通常用 rememberCoroutineScope()'
    },
    {
      type: 'warning',
      title: 'verticalScroll 和 horizontalScroll 不能同时用于同一方向',
      content: '不要在垂直滚动容器内嵌套垂直滚动容器，会导致滚动冲突'
    },
    {
      type: 'warning',
      title: '大量内容避免使用 Column + verticalScroll',
      content: 'Column 会创建所有子项，大量内容时使用 LazyColumn 以获得按需加载和回收'
    },
  ],

  relatedComponents: ['lazy-column', 'lazy-row'],
  since: '1.0.0',
}
