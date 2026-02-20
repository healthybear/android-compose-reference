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
                if (scaffoldState.bottomSheetState.isVisible) {
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
      code: `BottomSheetScaffold(
    sheetPeekHeight = 120.dp,
    sheetContent = {
        // 搜索栏（始终可见）
        SearchBar(
            inputField = { SearchBarDefaults.InputField(
                query = query, onQueryChange = { query = it },
                onSearch = {}, expanded = false, onExpandedChange = {}
            )},
            expanded = false, onExpandedChange = {},
            modifier = Modifier.padding(horizontal = 16.dp)
        ) {}
        // 展开后的搜索结果
        LazyColumn(modifier = Modifier.height(400.dp)) {
            items(results) { ListItem(headlineContent = { Text(it) }) }
        }
    },
    topBar = {
        TopAppBar(title = { Text("地图") })
    }
) { padding ->
    // 地图内容
    Box(modifier = Modifier.fillMaxSize().padding(padding)) {
        Text("地图区域", modifier = Modifier.align(Alignment.Center))
    }
}`,
    },
  ],
}
