import type { ComponentEntry } from '../../types'

export const mediumTopAppBarComponent: ComponentEntry = {
  id: 'medium-top-app-bar',
  demo: { id: 'medium-top-app-bar', sourceFile: 'MediumTopAppBarDemo.kt' },
  name: 'MediumTopAppBar',
  category: 'Material',
  description: 'Material 3 中号顶部应用栏，标题中等大小且左对齐，滚动时会折叠成普通 TopAppBar，介于 TopAppBar 和 LargeTopAppBar 之间。',
  tags: ['top-app-bar', 'medium', 'collapsing', 'scroll', '中号导航'],
  params: [
    { name: 'title', type: '@Composable () -> Unit', required: true, description: '中号标题' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'navigationIcon', type: '@Composable () -> Unit', default: '{}', description: '导航图标' },
    { name: 'actions', type: '@Composable RowScope.() -> Unit', default: '{}', description: '操作按钮' },
    { name: 'windowInsets', type: 'WindowInsets', default: 'TopAppBarDefaults.windowInsets', description: '窗口插入' },
    { name: 'colors', type: 'TopAppBarColors', default: 'TopAppBarDefaults.mediumTopAppBarColors()', description: '颜色配置' },
    { name: 'scrollBehavior', type: 'TopAppBarScrollBehavior?', default: 'null', description: '滚动行为' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

Scaffold(
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
    topBar = {
        MediumTopAppBar(
            title = { Text("图库") },
            scrollBehavior = scrollBehavior
        )
    }
) { padding ->
    LazyVerticalGrid(
        columns = GridCells.Fixed(3),
        modifier = Modifier.padding(padding)
    ) {
        items(50) { index ->
            Image(...)
        }
    }
}`,
    },
    {
      title: '带导航和操作',
      code: `val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

MediumTopAppBar(
    title = { Text("我的照片") },
    navigationIcon = {
        IconButton(onClick = { navController.popBackStack() }) {
            Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "返回")
        }
    },
    actions = {
        IconButton(onClick = { /* 搜索 */ }) {
            Icon(Icons.Default.Search, contentDescription = "搜索")
        }
        IconButton(onClick = { /* 选择 */ }) {
            Icon(Icons.Default.CheckCircle, contentDescription = "选择")
        }
    },
    scrollBehavior = scrollBehavior
)`,
    },
    {
      title: '列表页标题',
      code: `val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

Scaffold(
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
    topBar = {
        MediumTopAppBar(
            title = { Text("联系人") },
            actions = {
                IconButton(onClick = { /* 添加 */ }) {
                    Icon(Icons.Default.Add, contentDescription = "添加联系人")
                }
                IconButton(onClick = { /* 搜索 */ }) {
                    Icon(Icons.Default.Search, contentDescription = "搜索")
                }
            },
            scrollBehavior = scrollBehavior
        )
    }
) { padding ->
    LazyColumn(modifier = Modifier.padding(padding)) {
        items(contacts) { contact ->
            ContactListItem(contact)
        }
    }
}`,
    },
    {
      title: '自定义颜色',
      code: `val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

MediumTopAppBar(
    title = { Text("相册") },
    colors = TopAppBarDefaults.mediumTopAppBarColors(
        containerColor = MaterialTheme.colorScheme.surface,
        scrolledContainerColor = MaterialTheme.colorScheme.surfaceVariant,
        titleContentColor = MaterialTheme.colorScheme.onSurface
    ),
    scrollBehavior = scrollBehavior
)`,
    },
    {
      title: '带副标题',
      code: `val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

MediumTopAppBar(
    title = {
        Column {
            Text(
                text = "下载",
                style = MaterialTheme.typography.headlineSmall
            )
            Text(
                text = "15 个文件",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    },
    scrollBehavior = scrollBehavior
)`,
    },
  ],

  useCases: [
    {
      title: '相册应用',
      description: '相册列表页使用 MediumTopAppBar 展示相册名称',
      code: `@Composable
fun AlbumScreen(
    albumName: String,
    photos: List<Photo>,
    onNavigateBack: () -> Unit
) {
    val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()
    var selectionMode by remember { mutableStateOf(false) }
    val selectedPhotos = remember { mutableStateListOf<String>() }

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            MediumTopAppBar(
                title = {
                    Column {
                        Text(albumName)
                        Text(
                            text = if (selectionMode) {
                                "3 已选择"
                            } else {
                                "24 张照片"
                            },
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                },
                navigationIcon = {
                    IconButton(onClick = {
                        if (selectionMode) {
                            selectionMode = false
                            selectedPhotos.clear()
                        } else {
                            onNavigateBack()
                        }
                    }) {
                        Icon(
                            if (selectionMode) Icons.Default.Close else Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = if (selectionMode) "取消选择" else "返回"
                        )
                    }
                },
                actions = {
                    if (selectionMode) {
                        IconButton(onClick = { /* 分享 */ }) {
                            Icon(Icons.Default.Share, contentDescription = "分享")
                        }
                        IconButton(onClick = { /* 删除 */ }) {
                            Icon(Icons.Default.Delete, contentDescription = "删除")
                        }
                    } else {
                        IconButton(onClick = { selectionMode = true }) {
                            Icon(Icons.Default.CheckCircle, contentDescription = "选择")
                        }
                        IconButton(onClick = { /* 更多 */ }) {
                            Icon(Icons.Default.MoreVert, contentDescription = "更多")
                        }
                    }
                },
                scrollBehavior = scrollBehavior
            )
        }
    ) { padding ->
        LazyVerticalGrid(
            columns = GridCells.Adaptive(minSize = 120.dp),
            modifier = Modifier.padding(padding),
            contentPadding = PaddingValues(4.dp),
            horizontalArrangement = Arrangement.spacedBy(4.dp),
            verticalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            items(photos, key = { it.id }) { photo ->
                PhotoGridItem(
                    photo = photo,
                    isSelected = photo.id in selectedPhotos,
                    selectionMode = selectionMode,
                    onSelect = {
                        if (photo.id in selectedPhotos) {
                            selectedPhotos.remove(photo.id)
                        } else {
                            selectedPhotos.add(photo.id)
                        }
                    },
                    onClick = {
                        if (selectionMode) {
                            if (photo.id in selectedPhotos) {
                                selectedPhotos.remove(photo.id)
                            } else {
                                selectedPhotos.add(photo.id)
                            }
                        } else {
                            // 打开照片详情
                        }
                    }
                )
            }
        }
    }
}`
    },
    {
      title: '文件管理器',
      description: '文件夹视图使用 MediumTopAppBar',
      code: `@Composable
fun FolderScreen(
    folderName: String,
    files: List<File>,
    onNavigateBack: () -> Unit
) {
    val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()
    var sortBy by remember { mutableStateOf(SortOption.NAME) }
    var showSortMenu by remember { mutableStateOf(false) }

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            MediumTopAppBar(
                title = {
                    Column {
                        Text(folderName)
                        Text(
                            text = "12 项",
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "返回")
                    }
                },
                actions = {
                    IconButton(onClick = { /* 搜索 */ }) {
                        Icon(Icons.Default.Search, contentDescription = "搜索")
                    }
                    Box {
                        IconButton(onClick = { showSortMenu = true }) {
                            Icon(Icons.Default.Sort, contentDescription = "排序")
                        }
                        DropdownMenu(
                            expanded = showSortMenu,
                            onDismissRequest = { showSortMenu = false }
                        ) {
                            DropdownMenuItem(
                                text = { Text("按名称") },
                                onClick = {
                                    sortBy = SortOption.NAME
                                    showSortMenu = false
                                },
                                leadingIcon = {
                                    if (sortBy == SortOption.NAME) {
                                        Icon(Icons.Default.Check, contentDescription = null)
                                    }
                                }
                            )
                            DropdownMenuItem(
                                text = { Text("按日期") },
                                onClick = {
                                    sortBy = SortOption.DATE
                                    showSortMenu = false
                                },
                                leadingIcon = {
                                    if (sortBy == SortOption.DATE) {
                                        Icon(Icons.Default.Check, contentDescription = null)
                                    }
                                }
                            )
                            DropdownMenuItem(
                                text = { Text("按大小") },
                                onClick = {
                                    sortBy = SortOption.SIZE
                                    showSortMenu = false
                                },
                                leadingIcon = {
                                    if (sortBy == SortOption.SIZE) {
                                        Icon(Icons.Default.Check, contentDescription = null)
                                    }
                                }
                            )
                        }
                    }
                },
                scrollBehavior = scrollBehavior
            )
        }
    ) { padding ->
        val sortedFiles = remember(files, sortBy) {
            when (sortBy) {
                SortOption.NAME -> files.sortedBy { it.name }
                SortOption.DATE -> files.sortedByDescending { it.modifiedDate }
                SortOption.SIZE -> files.sortedByDescending { it.size }
            }
        }

        LazyColumn(modifier = Modifier.padding(padding)) {
            items(sortedFiles) { file ->
                FileListItem(file)
                HorizontalDivider()
            }
        }
    }
}

enum class SortOption {
    NAME, DATE, SIZE
}`
    },
  ],

  bestPractices: [
    {
      title: 'MediumTopAppBar 介于 TopAppBar 和 LargeTopAppBar 之间',
      description: '选择合适的尺寸展示标题重要性',
      goodExample: `// 主页使用 LargeTopAppBar
LargeTopAppBar(title = { Text("主页") })

// 次级页面使用 MediumTopAppBar
MediumTopAppBar(title = { Text("相册") })

// 详情页使用 TopAppBar
TopAppBar(title = { Text("照片详情") })`,
      badExample: `// 所有页面都用 LargeTopAppBar
LargeTopAppBar(title = { Text("照片详情") })`
    },
    {
      title: '适合网格和图片列表',
      description: 'MediumTopAppBar 的高度适合图片网格等视觉内容',
      goodExample: `MediumTopAppBar(title = { Text("图库") })
// 配合图片网格
LazyVerticalGrid(...)`,
      badExample: `// 纯文本列表不需要 MediumTopAppBar
MediumTopAppBar(title = { Text("设置") })
// 配合文本列表`
    },
    {
      title: '使用 scrollBehavior 实现折叠',
      description: 'MediumTopAppBar 应该配合 scrollBehavior 使用',
      goodExample: `val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

MediumTopAppBar(
    title = { Text("标题") },
    scrollBehavior = scrollBehavior
)`,
      badExample: `// 不提供 scrollBehavior，失去折叠效果
MediumTopAppBar(title = { Text("标题") })`
    },
    {
      title: '副标题显示统计信息',
      description: '利用空间显示项目数量等辅助信息',
      goodExample: `MediumTopAppBar(
    title = {
        Column {
            Text("相册")
            Text("128 张照片", style = MaterialTheme.typography.bodyMedium)
        }
    }
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'MediumTopAppBar 展开时高度约 112dp',
      content: 'MediumTopAppBar 展开时高度约 112dp，介于 TopAppBar (64dp) 和 LargeTopAppBar (152dp) 之间'
    },
    {
      type: 'info',
      title: '适合列表和网格页面',
      content: 'MediumTopAppBar 适合照片网格、文件列表、联系人列表等内容密集的页面'
    },
    {
      type: 'warning',
      title: '需要 nestedScroll 才能折叠',
      content: '使用 scrollBehavior 时，Scaffold 必须添加 nestedScroll 修饰符'
    },
    {
      type: 'info',
      title: '标题可以包含副标题',
      content: 'title 可以使用 Column 组合主标题和副标题，显示更多信息'
    },
    {
      type: 'info',
      title: '折叠后变为普通 TopAppBar',
      content: '使用 exitUntilCollapsedScrollBehavior 时，滚动会将其折叠为 64dp 的 TopAppBar'
    },
    {
      type: 'error',
      title: '不要在次要详情页使用',
      content: 'MediumTopAppBar 有一定强调作用，不适合深层级的详情页'
    },
  ],

  relatedComponents: ['top-app-bar', 'large-top-app-bar', 'center-aligned-top-app-bar', 'bottom-app-bar'],
  since: '1.0.0',
}
