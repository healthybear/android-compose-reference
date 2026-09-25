import type { ComponentEntry } from '../../types'

export const extendedFabComponent: ComponentEntry = {
  id: 'extended-fab',
  demo: { id: 'extended-fab', sourceFile: 'ExtendedFabDemo.kt' },
  name: 'ExtendedFloatingActionButton',
  category: 'Material',
  description: '带文字标签的扩展悬浮操作按钮，比普通 FAB 更具描述性，支持滚动时自动收缩。',
  tags: ['fab', 'extended', 'floating', 'action', '扩展悬浮按钮'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'text', type: '@Composable () -> Unit', required: true, description: '文字标签' },
    { name: 'icon', type: '@Composable () -> Unit', required: true, description: '图标' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'expanded', type: 'Boolean', default: 'true', description: '是否展开显示文字，false 时收缩为圆形' },
    { name: 'shape', type: 'Shape', default: 'FloatingActionButtonDefaults.extendedFabShape', description: '形状' },
    { name: 'containerColor', type: 'Color', default: 'FloatingActionButtonDefaults.containerColor', description: '背景色' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `ExtendedFloatingActionButton(
    onClick = { /* 新建 */ },
    icon = { Icon(Icons.Default.Add, contentDescription = null) },
    text = { Text("新建") }
)`,
    },
    {
      title: '滚动时自动收缩',
      code: `val listState = rememberLazyListState()
val expanded by remember {
    derivedStateOf { listState.firstVisibleItemIndex == 0 }
}

Scaffold(
    floatingActionButton = {
        ExtendedFloatingActionButton(
            onClick = { /* 新建 */ },
            expanded = expanded,
            icon = { Icon(Icons.Default.Add, contentDescription = null) },
            text = { Text("新建") }
        )
    }
) { padding ->
    LazyColumn(state = listState, contentPadding = padding) {
        items(50) { Text("Item $it", modifier = Modifier.padding(16.dp)) }
    }
}`,
    },
    {
      title: '固定展开状态',
      code: `ExtendedFloatingActionButton(
    onClick = { /* 写邮件 */ },
    expanded = true,
    icon = { Icon(Icons.Default.Edit, contentDescription = null) },
    text = { Text("写邮件") }
)`,
    },
    {
      title: '自定义颜色',
      code: `ExtendedFloatingActionButton(
    onClick = { /* 发送 */ },
    icon = { Icon(Icons.Default.Send, contentDescription = null) },
    text = { Text("发送") },
    containerColor = MaterialTheme.colorScheme.tertiary,
    contentColor = MaterialTheme.colorScheme.onTertiary
)`,
    },
    {
      title: '仅图标模式',
      code: `var expanded by remember { mutableStateOf(true) }

ExtendedFloatingActionButton(
    onClick = { expanded = !expanded },
    expanded = expanded,
    icon = { Icon(Icons.Default.Message, contentDescription = null) },
    text = { Text("新消息") }
)`,
    },
    {
      title: '配合 Scaffold 使用',
      code: `Scaffold(
    floatingActionButton = {
        ExtendedFloatingActionButton(
            onClick = { showDialog = true },
            icon = { Icon(Icons.Default.Add, contentDescription = null) },
            text = { Text("添加项目") }
        )
    },
    floatingActionButtonPosition = FabPosition.End
) { padding ->
    // 页面内容
    LazyColumn(
        modifier = Modifier.padding(padding)
    ) {
        items(items) { item ->
            Text(item.name)
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '邮件应用',
      description: '在邮件列表页面，滚动时收缩 FAB 以节省空间',
      code: `@Composable
fun EmailListScreen(
    emails: List<Email>,
    onCompose: () -> Unit
) {
    val listState = rememberLazyListState()
    val fabExpanded by remember {
        derivedStateOf {
            listState.firstVisibleItemIndex == 0 &&
            listState.firstVisibleItemScrollOffset < 100
        }
    }

    Scaffold(
        topAppBar = {
            TopAppBar(
                title = { Text("收件箱") },
                actions = {
                    IconButton(onClick = { /* 搜索 */ }) {
                        Icon(Icons.Default.Search, contentDescription = "搜索")
                    }
                }
            )
        },
        floatingActionButton = {
            ExtendedFloatingActionButton(
                onClick = onCompose,
                expanded = fabExpanded,
                icon = { Icon(Icons.Default.Edit, contentDescription = null) },
                text = { Text("写邮件") }
            )
        }
    ) { padding ->
        LazyColumn(
            state = listState,
            contentPadding = padding
        ) {
            items(emails, key = { it.id }) { email ->
                EmailListItem(email)
                HorizontalDivider()
            }
        }
    }
}`
    },
    {
      title: '笔记应用带多个操作',
      description: '使用状态控制 ExtendedFAB 的展开，配合菜单提供多个快捷操作',
      code: `@Composable
fun NotesScreen(
    notes: List<Note>,
    onNewNote: () -> Unit,
    onNewFolder: () -> Unit,
    onScan: () -> Unit
) {
    val listState = rememberLazyListState()
    var showMenu by remember { mutableStateOf(false) }
    val fabExpanded by remember {
        derivedStateOf { listState.firstVisibleItemIndex == 0 }
    }

    Scaffold(
        floatingActionButton = {
            Column(
                horizontalAlignment = Alignment.End,
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                // 展开的菜单项
                AnimatedVisibility(
                    visible = showMenu,
                    enter = fadeIn() + expandVertically(),
                    exit = fadeOut() + shrinkVertically()
                ) {
                    Column(
                        horizontalAlignment = Alignment.End,
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        SmallFloatingActionButton(onClick = {
                            onScan()
                            showMenu = false
                        }) {
                            Icon(Icons.Default.CameraAlt, contentDescription = "扫描")
                        }
                        SmallFloatingActionButton(onClick = {
                            onNewFolder()
                            showMenu = false
                        }) {
                            Icon(Icons.Default.CreateNewFolder, contentDescription = "新建文件夹")
                        }
                    }
                }

                // 主 FAB
                ExtendedFloatingActionButton(
                    onClick = {
                        if (showMenu) {
                            onNewNote()
                        }
                        showMenu = !showMenu
                    },
                    expanded = fabExpanded,
                    icon = {
                        Icon(
                            if (showMenu) Icons.Default.Close else Icons.Default.Add,
                            contentDescription = null
                        )
                    },
                    text = { Text(if (showMenu) "关闭" else "新建") }
                )
            }
        }
    ) { padding ->
        LazyColumn(
            state = listState,
            contentPadding = padding
        ) {
            items(notes) { note ->
                NoteItem(note)
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '滚动时收缩节省空间',
      description: '使用 derivedStateOf 监听滚动状态自动收缩 FAB',
      goodExample: `val expanded by remember {
    derivedStateOf { listState.firstVisibleItemIndex == 0 }
}

ExtendedFloatingActionButton(
    expanded = expanded,
    icon = { Icon(...) },
    text = { Text("新建") }
)`,
      badExample: `// 始终展开，滚动时遮挡内容
ExtendedFloatingActionButton(
    expanded = true,
    icon = { Icon(...) },
    text = { Text("新建") }
)`
    },
    {
      title: '文字应简短',
      description: 'ExtendedFAB 的文字应简短明了，通常 2-4 个字',
      goodExample: `ExtendedFloatingActionButton(
    onClick = { },
    icon = { Icon(Icons.Default.Add, contentDescription = null) },
    text = { Text("新建") }
)`,
      badExample: `ExtendedFloatingActionButton(
    onClick = { },
    icon = { Icon(Icons.Default.Add, contentDescription = null) },
    text = { Text("新建一个新的项目") }  // 过长
)`
    },
    {
      title: '必须同时提供图标和文字',
      description: 'ExtendedFAB 的 icon 和 text 都是必需参数',
      goodExample: `ExtendedFloatingActionButton(
    onClick = { },
    icon = { Icon(Icons.Default.Edit, contentDescription = null) },
    text = { Text("编辑") }
)`,
      badExample: `// icon 和 text 都是必需的，不能省略
FloatingActionButton(onClick = { }) {
    Icon(Icons.Default.Edit, contentDescription = "编辑")
}`
    },
    {
      title: '收缩状态仍显示图标',
      description: 'expanded = false 时只显示图标，变为圆形 FAB',
      goodExample: `ExtendedFloatingActionButton(
    onClick = { },
    expanded = isExpanded,  // 动态控制
    icon = { Icon(Icons.Default.Add, contentDescription = null) },
    text = { Text("新建") }
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'ExtendedFAB 的两种状态',
      content: 'expanded = true 时显示图标+文字的胶囊形状，false 时只显示图标的圆形'
    },
    {
      type: 'info',
      title: '适合长列表和滚动视图',
      content: 'ExtendedFAB 特别适合在长列表顶部展开显示文字，滚动后收缩为图标节省空间'
    },
    {
      type: 'info',
      title: 'derivedStateOf 监听滚动',
      content: '使用 derivedStateOf 监听 LazyListState 的滚动位置，实现平滑的展开/收缩动画'
    },
    {
      type: 'warning',
      title: '不要频繁切换展开状态',
      content: '避免快速滚动时 FAB 频繁展开收缩，可以添加阈值或延迟'
    },
    {
      type: 'info',
      title: 'icon 和 text 必须是 @Composable',
      content: 'icon 和 text 参数是 Composable 函数，可以自定义动画和状态'
    },
    {
      type: 'error',
      title: '避免遮挡重要内容',
      content: 'ExtendedFAB 展开时占用空间较大，确保不遮挡列表底部的重要内容，使用 contentPadding'
    },
  ],

  relatedComponents: ['floating-action-button'],
  since: '1.0.0',
}
