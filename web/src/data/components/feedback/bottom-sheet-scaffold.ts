import type { ComponentEntry } from '../../types'

export const bottomSheetScaffoldComponent: ComponentEntry = {
  id: 'bottom-sheet-scaffold',
  name: 'BottomSheetScaffold',
  category: 'Feedback',
  description: '非模态底部面板脚手架，底部面板始终存在于页面中，可拖拽展开/收起，不遮挡背景交互，适合地图、播放器等场景。',
  tags: ['bottom-sheet', 'scaffold', 'persistent', 'sheet', '持久底部面板'],
  params: [
    { name: 'sheetContent', type: '@Composable ColumnScope.() -> Unit', required: true, description: '底部面板内容' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'scaffoldState', type: 'BottomSheetScaffoldState', default: 'rememberBottomSheetScaffoldState()', description: '脚手架状态，包含 bottomSheetState 和 snackbarHostState' },
    { name: 'sheetPeekHeight', type: 'Dp', default: 'BottomSheetDefaults.SheetPeekHeight', description: '面板收起时露出的高度（56.dp）' },
    { name: 'sheetMaxWidth', type: 'Dp', default: 'BottomSheetDefaults.SheetMaxWidth', description: '面板最大宽度' },
    { name: 'sheetShape', type: 'Shape', default: 'BottomSheetDefaults.ExpandedShape', description: '面板形状' },
    { name: 'sheetContainerColor', type: 'Color', default: 'BottomSheetDefaults.ContainerColor', description: '面板背景色' },
    { name: 'sheetDragHandle', type: '@Composable (() -> Unit)?', default: '{ BottomSheetDefaults.DragHandle() }', description: '拖拽把手' },
    { name: 'topBar', type: '@Composable (() -> Unit)?', default: 'null', description: '顶部栏插槽' },
    { name: 'snackbarHost', type: '@Composable (SnackbarHostState) -> Unit', default: '{ SnackbarHost(it) }', description: 'Snackbar 宿主' },
    { name: 'content', type: '@Composable (PaddingValues) -> Unit', required: true, description: '主内容区域，paddingValues 包含底部面板高度' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `val scaffoldState = rememberBottomSheetScaffoldState()
val scope = rememberCoroutineScope()

BottomSheetScaffold(
    scaffoldState = scaffoldState,
    sheetPeekHeight = 80.dp,
    sheetContent = {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("底部面板", style = MaterialTheme.typography.titleMedium)
            Spacer(Modifier.height(8.dp))
            Text("向上拖拽展开更多内容")
            Spacer(Modifier.height(200.dp))
            Text("展开后的内容区域")
        }
    }
) { padding ->
    Box(
        modifier = Modifier.fillMaxSize().padding(padding),
        contentAlignment = Alignment.Center
    ) {
        Button(onClick = {
            scope.launch {
                if (scaffoldState.bottomSheetState.currentValue == SheetValue.Expanded) {
                    scaffoldState.bottomSheetState.partialExpand()
                } else {
                    scaffoldState.bottomSheetState.expand()
                }
            }
        }) {
            Text("切换面板状态")
        }
    }
}`,
    },
    {
      title: '地图 + 搜索面板场景',
      code: `val scaffoldState = rememberBottomSheetScaffoldState()
var query by remember { mutableStateOf("") }
val searchResults = listOf("结果1", "结果2", "结果3")

BottomSheetScaffold(
    scaffoldState = scaffoldState,
    sheetPeekHeight = 120.dp,
    sheetContent = {
        Column(modifier = Modifier.fillMaxWidth()) {
            // 搜索栏（始终可见）
            OutlinedTextField(
                value = query,
                onValueChange = { query = it },
                placeholder = { Text("搜索地点") },
                leadingIcon = { Icon(Icons.Default.Search, null) },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            )
            HorizontalDivider()
            // 展开后的搜索结果
            LazyColumn(modifier = Modifier.height(400.dp)) {
                items(searchResults) { result ->
                    ListItem(
                        headlineContent = { Text(result) },
                        leadingContent = { Icon(Icons.Default.Place, null) }
                    )
                }
            }
        }
    },
    topBar = {
        TopAppBar(title = { Text("地图") })
    }
) { padding ->
    // 地图内容
    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(padding)
            .background(Color(0xFFE0E0E0))
    ) {
        Text("地图区域", modifier = Modifier.align(Alignment.Center))
    }
}`,
    },
    {
      title: '音乐播放器控制面板',
      code: `val scaffoldState = rememberBottomSheetScaffoldState()
var isPlaying by remember { mutableStateOf(false) }
var progress by remember { mutableFloatStateOf(0.3f) }

BottomSheetScaffold(
    scaffoldState = scaffoldState,
    sheetPeekHeight = 72.dp,
    sheetDragHandle = null,
    sheetContent = {
        Column(modifier = Modifier.fillMaxWidth()) {
            // 迷你播放栏（收起时可见）
            if (scaffoldState.bottomSheetState.currentValue == SheetValue.PartiallyExpanded) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(72.dp)
                        .clickable {
                            scope.launch { scaffoldState.bottomSheetState.expand() }
                        }
                        .padding(horizontal = 16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    AsyncImage(
                        model = "cover.jpg",
                        contentDescription = null,
                        modifier = Modifier
                            .size(48.dp)
                            .clip(RoundedCornerShape(4.dp))
                    )
                    Spacer(Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text("歌曲名称", style = MaterialTheme.typography.bodyMedium)
                        Text("艺术家", style = MaterialTheme.typography.bodySmall)
                    }
                    IconButton(onClick = { isPlaying = !isPlaying }) {
                        Icon(
                            if (isPlaying) Icons.Default.Pause else Icons.Default.PlayArrow,
                            contentDescription = null
                        )
                    }
                }
            } else {
                // 完整播放器（展开时）
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    IconButton(
                        onClick = { scope.launch { scaffoldState.bottomSheetState.partialExpand() } }
                    ) {
                        Icon(Icons.Default.ExpandMore, contentDescription = "收起")
                    }

                    Spacer(Modifier.height(24.dp))
                    AsyncImage(
                        model = "cover.jpg",
                        contentDescription = null,
                        modifier = Modifier
                            .size(280.dp)
                            .clip(RoundedCornerShape(16.dp))
                    )

                    Spacer(Modifier.height(32.dp))
                    Text("歌曲名称", style = MaterialTheme.typography.headlineSmall)
                    Text(
                        "艺术家",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    Spacer(Modifier.height(24.dp))
                    Slider(
                        value = progress,
                        onValueChange = { progress = it },
                        modifier = Modifier.fillMaxWidth()
                    )
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("1:23", style = MaterialTheme.typography.bodySmall)
                        Text("4:56", style = MaterialTheme.typography.bodySmall)
                    }

                    Spacer(Modifier.height(16.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        IconButton(onClick = { }) {
                            Icon(Icons.Default.SkipPrevious, null, modifier = Modifier.size(36.dp))
                        }
                        FloatingActionButton(onClick = { isPlaying = !isPlaying }) {
                            Icon(
                                if (isPlaying) Icons.Default.Pause else Icons.Default.PlayArrow,
                                null
                            )
                        }
                        IconButton(onClick = { }) {
                            Icon(Icons.Default.SkipNext, null, modifier = Modifier.size(36.dp))
                        }
                    }
                }
            }
        }
    }
) { padding ->
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(padding)
    ) {
        items(20) { index ->
            ListItem(
                headlineContent = { Text("歌曲 $index") },
                supportingContent = { Text("艺术家 $index") }
            )
        }
    }
}`,
    },
    {
      title: '购物车面板',
      code: `val scaffoldState = rememberBottomSheetScaffoldState()
val cartItems = remember { mutableStateListOf<CartItem>() }
val totalPrice = cartItems.sumOf { it.price * it.quantity }

BottomSheetScaffold(
    scaffoldState = scaffoldState,
    sheetPeekHeight = 80.dp,
    sheetContent = {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .height(400.dp)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("购物车", style = MaterialTheme.typography.titleLarge)
                TextButton(onClick = { cartItems.clear() }) {
                    Text("清空")
                }
            }
            HorizontalDivider()

            LazyColumn(modifier = Modifier.weight(1f)) {
                items(cartItems) { item ->
                    ListItem(
                        headlineContent = { Text(item.name) },
                        supportingContent = { Text("¥" + item.price) },
                        trailingContent = {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                IconButton(onClick = { /* 减少数量 */ }) {
                                    Icon(Icons.Default.Remove, null)
                                }
                                Text(item.quantity.toString())
                                IconButton(onClick = { /* 增加数量 */ }) {
                                    Icon(Icons.Default.Add, null)
                                }
                            }
                        }
                    )
                }
            }

            HorizontalDivider()
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text("合计", style = MaterialTheme.typography.bodySmall)
                    Text(
                        "¥" + totalPrice,
                        style = MaterialTheme.typography.titleLarge,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
                Button(
                    onClick = { /* 结算 */ },
                    enabled = cartItems.isNotEmpty()
                ) {
                    Text("去结算")
                }
            }
        }
    }
) { padding ->
    LazyVerticalGrid(
        columns = GridCells.Fixed(2),
        contentPadding = padding,
        modifier = Modifier.fillMaxSize()
    ) {
        items(20) { index ->
            ProductCard(
                name = "商品 $index",
                price = 99.0,
                onAddToCart = { /* 添加到购物车 */ }
            )
        }
    }
}`,
    },
    {
      title: '筛选面板',
      code: `val scaffoldState = rememberBottomSheetScaffoldState()
var selectedCategory by remember { mutableStateOf("全部") }
var priceRange by remember { mutableStateOf(0f..1000f) }
val scope = rememberCoroutineScope()

BottomSheetScaffold(
    scaffoldState = scaffoldState,
    sheetPeekHeight = 0.dp,
    sheetContent = {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .height(500.dp)
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("筛选", style = MaterialTheme.typography.titleLarge)
                TextButton(onClick = {
                    selectedCategory = "全部"
                    priceRange = 0f..1000f
                }) {
                    Text("重置")
                }
            }

            Spacer(Modifier.height(16.dp))
            Text("分类", style = MaterialTheme.typography.titleMedium)
            Spacer(Modifier.height(8.dp))
            FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                listOf("全部", "电子", "服饰", "食品", "图书").forEach { category ->
                    FilterChip(
                        selected = selectedCategory == category,
                        onClick = { selectedCategory = category },
                        label = { Text(category) }
                    )
                }
            }

            Spacer(Modifier.height(24.dp))
            Text("价格区间", style = MaterialTheme.typography.titleMedium)
            RangeSlider(
                value = priceRange,
                onValueChange = { priceRange = it },
                valueRange = 0f..1000f,
                modifier = Modifier.fillMaxWidth()
            )
            Text(
                "¥" + priceRange.start.toInt() + " - ¥" + priceRange.endInclusive.toInt(),
                style = MaterialTheme.typography.bodyMedium
            )

            Spacer(Modifier.weight(1f))
            Button(
                onClick = {
                    scope.launch {
                        scaffoldState.bottomSheetState.partialExpand()
                        // 应用筛选
                    }
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("应用")
            }
        }
    }
) { padding ->
    Column(modifier = Modifier.fillMaxSize().padding(padding)) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text("商品列表", style = MaterialTheme.typography.titleLarge)
            TextButton(onClick = {
                scope.launch { scaffoldState.bottomSheetState.expand() }
            }) {
                Icon(Icons.Default.FilterList, null)
                Spacer(Modifier.width(4.dp))
                Text("筛选")
            }
        }

        LazyColumn {
            items(15) { index ->
                ListItem(
                    headlineContent = { Text("商品 $index") },
                    supportingContent = { Text("¥99") }
                )
            }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '地图POI详情',
      description: '地图应用中展示位置详情，支持拖拽展开查看更多信息',
      code: `@Composable
fun MapWithPoiDetails(poi: PoiInfo?) {
    val scaffoldState = rememberBottomSheetScaffoldState()
    val scope = rememberCoroutineScope()

    LaunchedEffect(poi) {
        if (poi != null) {
            scaffoldState.bottomSheetState.partialExpand()
        }
    }

    BottomSheetScaffold(
        scaffoldState = scaffoldState,
        sheetPeekHeight = if (poi != null) 160.dp else 0.dp,
        sheetContent = {
            poi?.let { location ->
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .heightIn(min = 160.dp, max = 600.dp)
                ) {
                    // 收起时显示的精简信息
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        AsyncImage(
                            model = location.coverImage,
                            contentDescription = null,
                            modifier = Modifier
                                .size(80.dp)
                                .clip(RoundedCornerShape(8.dp))
                        )
                        Spacer(Modifier.width(12.dp))
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                location.name,
                                style = MaterialTheme.typography.titleMedium,
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis
                            )
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    Icons.Default.Star,
                                    null,
                                    modifier = Modifier.size(16.dp),
                                    tint = Color(0xFFFFA000)
                                )
                                Text(
                                    location.rating.toString(),
                                    style = MaterialTheme.typography.bodySmall
                                )
                                Text(" · ", style = MaterialTheme.typography.bodySmall)
                                Text(
                                    location.distance,
                                    style = MaterialTheme.typography.bodySmall
                                )
                            }
                            Text(
                                location.address,
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis
                            )
                        }
                    }

                    // 展开后显示的详细信息
                    if (scaffoldState.bottomSheetState.currentValue == SheetValue.Expanded) {
                        HorizontalDivider()
                        LazyColumn(modifier = Modifier.weight(1f)) {
                            item {
                                Column(modifier = Modifier.padding(16.dp)) {
                                    Text("营业时间", style = MaterialTheme.typography.titleSmall)
                                    Text(
                                        location.openingHours,
                                        style = MaterialTheme.typography.bodyMedium
                                    )

                                    Spacer(Modifier.height(16.dp))
                                    Text("联系方式", style = MaterialTheme.typography.titleSmall)
                                    Text(
                                        location.phone,
                                        style = MaterialTheme.typography.bodyMedium,
                                        color = MaterialTheme.colorScheme.primary
                                    )

                                    Spacer(Modifier.height(16.dp))
                                    Text("用户评价", style = MaterialTheme.typography.titleSmall)
                                }
                            }
                            items(location.reviews) { review ->
                                ReviewCard(review)
                            }
                        }

                        HorizontalDivider()
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp),
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            OutlinedButton(
                                onClick = { /* 打电话 */ },
                                modifier = Modifier.weight(1f)
                            ) {
                                Icon(Icons.Default.Phone, null)
                                Spacer(Modifier.width(4.dp))
                                Text("拨号")
                            }
                            Button(
                                onClick = { /* 导航 */ },
                                modifier = Modifier.weight(1f)
                            ) {
                                Icon(Icons.Default.Navigation, null)
                                Spacer(Modifier.width(4.dp))
                                Text("导航")
                            }
                        }
                    }
                }
            }
        }
    ) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            // 地图视图
            MapView(
                onPoiClick = { /* 更新 poi */ },
                modifier = Modifier.fillMaxSize()
            )
        }
    }
}`,
    },
    {
      title: '照片编辑工具栏',
      description: '照片编辑器的底部工具面板',
      code: `@Composable
fun PhotoEditorScreen() {
    val scaffoldState = rememberBottomSheetScaffoldState()
    var selectedTool by remember { mutableStateOf<EditTool?>(null) }
    var brightness by remember { mutableFloatStateOf(0f) }
    var contrast by remember { mutableFloatStateOf(0f) }

    BottomSheetScaffold(
        scaffoldState = scaffoldState,
        sheetPeekHeight = 80.dp,
        sheetContent = {
            Column(modifier = Modifier.fillMaxWidth()) {
                // 工具选择栏（始终可见）
                LazyRow(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 8.dp),
                    horizontalArrangement = Arrangement.SpaceEvenly
                ) {
                    items(EditTool.entries) { tool ->
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            modifier = Modifier
                                .clickable {
                                    selectedTool = tool
                                    scope.launch { scaffoldState.bottomSheetState.expand() }
                                }
                                .padding(8.dp)
                        ) {
                            Icon(tool.icon, null)
                            Text(
                                tool.label,
                                style = MaterialTheme.typography.bodySmall
                            )
                        }
                    }
                }

                // 工具参数调整区（展开后显示）
                if (scaffoldState.bottomSheetState.currentValue == SheetValue.Expanded) {
                    HorizontalDivider()
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(200.dp)
                            .padding(16.dp)
                    ) {
                        when (selectedTool) {
                            EditTool.BRIGHTNESS -> {
                                Text("亮度")
                                Slider(
                                    value = brightness,
                                    onValueChange = { brightness = it },
                                    valueRange = -1f..1f
                                )
                            }
                            EditTool.CONTRAST -> {
                                Text("对比度")
                                Slider(
                                    value = contrast,
                                    onValueChange = { contrast = it },
                                    valueRange = -1f..1f
                                )
                            }
                            else -> {
                                Text("请选择编辑工具")
                            }
                        }
                    }
                }
            }
        },
        topBar = {
            TopAppBar(
                title = { Text("编辑照片") },
                actions = {
                    TextButton(onClick = { /* 保存 */ }) {
                        Text("保存")
                    }
                }
            )
        }
    ) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding),
            contentAlignment = Alignment.Center
        ) {
            AsyncImage(
                model = "photo.jpg",
                contentDescription = null,
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Fit
            )
        }
    }
}

enum class EditTool(val label: String, val icon: ImageVector) {
    BRIGHTNESS("亮度", Icons.Default.Brightness6),
    CONTRAST("对比度", Icons.Default.Contrast),
    SATURATION("饱和度", Icons.Default.ColorLens),
    CROP("裁剪", Icons.Default.Crop)
}`,
    },
  ],

  bestPractices: [
    {
      title: '合理设置 sheetPeekHeight',
      description: '预览高度应足够显示关键信息，引导用户拖拽展开',
      goodExample: `BottomSheetScaffold(
    sheetPeekHeight = 80.dp,  // 显示关键信息和拖拽提示
    sheetContent = { /* ... */ }
)`,
      badExample: `BottomSheetScaffold(
    sheetPeekHeight = 0.dp,  // 用户不知道有底部面板
    sheetContent = { /* ... */ }
)`,
    },
    {
      title: '根据展开状态显示不同内容',
      description: '收起时显示摘要，展开时显示详细信息',
      goodExample: `if (scaffoldState.bottomSheetState.currentValue == SheetValue.PartiallyExpanded) {
    // 精简信息
    SummaryView()
} else {
    // 详细信息
    DetailedView()
}`,
    },
    {
      title: '使用 content 的 PaddingValues',
      description: '主内容应使用提供的 padding 避免被底部面板遮挡',
      goodExample: `BottomSheetScaffold(/* ... */) { padding ->
    LazyColumn(contentPadding = padding) { /* ... */ }
}`,
      badExample: `BottomSheetScaffold(/* ... */) { padding ->
    LazyColumn { /* 底部内容被遮挡 */ }
}`,
    },
    {
      title: '程序化控制展开状态',
      description: '使用 scaffoldState 控制面板展开/收起',
      goodExample: `val scope = rememberCoroutineScope()

Button(onClick = {
    scope.launch {
        scaffoldState.bottomSheetState.expand()
    }
}) { Text("展开") }`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'BottomSheetScaffold vs ModalBottomSheet',
      content: 'BottomSheetScaffold 是非模态的（背景可交互），ModalBottomSheet 是模态的（背景禁用且变暗）',
    },
    {
      type: 'info',
      title: 'SheetValue 状态',
      content: 'PartiallyExpanded（部分展开，显示 peekHeight）和 Expanded（完全展开）',
    },
    {
      type: 'info',
      title: '适合持久化面板',
      content: '音乐播放器、地图搜索、购物车等需要始终存在但可隐藏的面板适合用 BottomSheetScaffold',
    },
    {
      type: 'info',
      title: '自定义拖拽把手',
      content: '通过 sheetDragHandle 参数自定义或隐藏拖拽把手',
    },
    {
      type: 'warning',
      title: '内容高度要合理',
      content: 'sheetContent 的内容高度建议明确指定，避免内容过高超出屏幕',
    },
    {
      type: 'warning',
      title: '避免在面板内嵌套滚动',
      content: '如需面板内滚动，应使用 LazyColumn 且面板高度受限，避免手势冲突',
    },
    {
      type: 'error',
      title: '状态管理注意事项',
      content: '使用 rememberBottomSheetScaffoldState() 记住状态，避免配置更改时状态丢失',
    },
  ],

  relatedComponents: ['modal-bottom-sheet', 'scaffold'],
  since: '1.0.0',
}
