import type { ComponentEntry } from '../../types'

export const fabComponent: ComponentEntry = {
  id: 'floating-action-button',
  demo: { id: 'floating-action-button', sourceFile: 'FabDemo.kt' },
  name: 'FloatingActionButton',
  category: 'Material',
  description: 'FloatingActionButton（FAB）是悬浮操作按钮，代表页面最主要、最常用的操作。通常固定在屏幕右下角，醒目且易于访问。应与 Scaffold 配合使用。',
  tags: ['fab', 'floating', 'action', 'button', 'primary'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置位置、尺寸等' },
    { name: 'shape', type: 'Shape', default: 'FloatingActionButtonDefaults.shape', description: '形状，默认大圆角（16.dp）' },
    { name: 'containerColor', type: 'Color', default: 'MaterialTheme.colorScheme.primaryContainer', description: '背景色，默认主题容器色' },
    { name: 'contentColor', type: 'Color', default: 'contentColorFor(containerColor)', description: '内容色，自动适配背景色' },
    { name: 'elevation', type: 'FloatingActionButtonElevation', default: 'FloatingActionButtonDefaults.elevation()', description: '阴影配置（默认/按下/聚焦/悬停状态）' },
    { name: 'interactionSource', type: 'MutableInteractionSource?', default: 'null', description: '交互状态源' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '内容，通常为 Icon 组件' },
  ],
  examples: [
    {
      title: '基础用法（配合 Scaffold）',
      code: `Scaffold(
    floatingActionButton = {
        FloatingActionButton(onClick = { /* 新建 */ }) {
            Icon(Icons.Default.Add, contentDescription = "新建")
        }
    }
) { paddingValues ->
    // 页面内容
    Content(modifier = Modifier.padding(paddingValues))
}`,
    },
    {
      title: 'ExtendedFloatingActionButton（带文本）',
      code: `Scaffold(
    floatingActionButton = {
        ExtendedFloatingActionButton(
            onClick = { /* 撰写 */ },
            icon = {
                Icon(Icons.Default.Edit, contentDescription = null)
            },
            text = { Text("撰写") }
        )
    }
) { paddingValues ->
    Content(modifier = Modifier.padding(paddingValues))
}`,
    },
    {
      title: '尺寸变体',
      code: `Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
    // 小号 FAB
    SmallFloatingActionButton(onClick = { }) {
        Icon(
            Icons.Default.Add,
            contentDescription = "添加"
        )
    }

    // 普通 FAB（默认）
    FloatingActionButton(onClick = { }) {
        Icon(
            Icons.Default.Add,
            contentDescription = "添加"
        )
    }

    // 大号 FAB
    LargeFloatingActionButton(onClick = { }) {
        Icon(
            Icons.Default.Add,
            contentDescription = "添加",
            modifier = Modifier.size(36.dp)
        )
    }
}`,
    },
    {
      title: '自定义颜色',
      code: `FloatingActionButton(
    onClick = { /* 删除 */ },
    containerColor = MaterialTheme.colorScheme.errorContainer,
    contentColor = MaterialTheme.colorScheme.onErrorContainer
) {
    Icon(Icons.Default.Delete, contentDescription = "删除")
}`,
    },
    {
      title: '滚动时隐藏 FAB',
      code: `val listState = rememberLazyListState()
val fabVisible by remember {
    derivedStateOf {
        listState.firstVisibleItemIndex == 0
    }
}

Scaffold(
    floatingActionButton = {
        AnimatedVisibility(
            visible = fabVisible,
            enter = fadeIn() + scaleIn(),
            exit = fadeOut() + scaleOut()
        ) {
            FloatingActionButton(onClick = { }) {
                Icon(Icons.Default.Add, contentDescription = "添加")
            }
        }
    }
) { paddingValues ->
    LazyColumn(
        state = listState,
        modifier = Modifier.padding(paddingValues)
    ) {
        items(100) {
            Text("Item $it", modifier = Modifier.padding(16.dp))
        }
    }
}`,
    },
    {
      title: 'FAB 展开菜单',
      code: `var expanded by remember { mutableStateOf(false) }

Box {
    // 展开时的子 FAB
    AnimatedVisibility(
        visible = expanded,
        enter = fadeIn() + expandVertically(expandFrom = Alignment.Bottom),
        exit = fadeOut() + shrinkVertically(shrinkTowards = Alignment.Bottom)
    ) {
        Column(
            modifier = Modifier.padding(bottom = 80.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            SmallFloatingActionButton(onClick = { /* 相机 */ }) {
                Icon(Icons.Default.Camera, contentDescription = "相机")
            }
            SmallFloatingActionButton(onClick = { /* 图库 */ }) {
                Icon(Icons.Default.Photo, contentDescription = "图库")
            }
        }
    }

    // 主 FAB
    FloatingActionButton(
        onClick = { expanded = !expanded }
    ) {
        Icon(
            imageVector = if (expanded) Icons.Default.Close else Icons.Default.Add,
            contentDescription = if (expanded) "关闭" else "添加"
        )
    }
}`,
    },
  ],

  useCases: [
    {
      title: '聊天应用新建消息',
      description: '典型的 FAB 使用场景：触发主要创建操作',
      code: `@Composable
fun ChatListScreen(
    onNewChat: () -> Unit
) {
    Scaffold(
        topAppBar = {
            TopAppBar(title = { Text("消息") })
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = onNewChat
            ) {
                Icon(
                    Icons.Default.Edit,
                    contentDescription = "新建聊天"
                )
            }
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier.padding(paddingValues)
        ) {
            items(chatList) { chat ->
                ChatItem(chat)
            }
        }
    }
}`
    },
    {
      title: 'FAB 位置配置',
      description: '通过 Scaffold 的 floatingActionButtonPosition 控制位置',
      code: `Scaffold(
    floatingActionButton = {
        FloatingActionButton(onClick = { }) {
            Icon(Icons.Default.Add, contentDescription = "添加")
        }
    },
    floatingActionButtonPosition = FabPosition.Center,  // 底部居中
    bottomBar = {
        BottomAppBar {
            // 底部栏内容
        }
    }
) { paddingValues ->
    Content(modifier = Modifier.padding(paddingValues))
}`
    },
  ],

  bestPractices: [
    {
      title: 'FAB 应代表最主要的操作',
      description: '每个页面最多一个 FAB，且应是最重要、最常用的操作',
      goodExample: `// 笔记应用：新建笔记
FloatingActionButton(onClick = { createNote() }) {
    Icon(Icons.Default.Add, contentDescription = "新建笔记")
}`,
      badExample: `// 设置页面放置 FAB（设置页无主要操作）
FloatingActionButton(onClick = { save() }) {
    Icon(Icons.Default.Save, contentDescription = "保存")
}`
    },
    {
      title: '使用 Scaffold 管理 FAB',
      description: 'FAB 应通过 Scaffold 放置，而不是手动定位',
      goodExample: `Scaffold(
    floatingActionButton = {
        FloatingActionButton(onClick = { }) {
            Icon(Icons.Default.Add, contentDescription = "添加")
        }
    }
) { }`,
      badExample: `Box(modifier = Modifier.fillMaxSize()) {
    Content()
    // 手动定位 FAB，可能遮挡内容
    FloatingActionButton(
        onClick = { },
        modifier = Modifier.align(Alignment.BottomEnd).padding(16.dp)
    ) {
        Icon(Icons.Default.Add, contentDescription = "添加")
    }
}`
    },
    {
      title: '为 FAB 提供清晰的 contentDescription',
      description: 'FAB 通常只有图标，必须提供无障碍描述',
      goodExample: `FloatingActionButton(onClick = { }) {
    Icon(
        Icons.Default.Add,
        contentDescription = "新建笔记"  // 明确说明功能
    )
}`,
      badExample: `FloatingActionButton(onClick = { }) {
    Icon(
        Icons.Default.Add,
        contentDescription = null  // 无障碍用户无法理解
    )
}`
    },
    {
      title: '避免频繁改变 FAB 功能',
      description: 'FAB 功能应保持一致，不要根据状态频繁切换',
      goodExample: `// FAB 始终执行"添加"操作
FloatingActionButton(onClick = { addItem() }) {
    Icon(Icons.Default.Add, contentDescription = "添加")
}`,
      badExample: `// FAB 功能频繁切换，用户困惑
FloatingActionButton(
    onClick = { if (isEditing) save() else edit() }
) {
    Icon(
        if (isEditing) Icons.Default.Save else Icons.Default.Edit,
        contentDescription = if (isEditing) "保存" else "编辑"
    )
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'FAB 尺寸变体',
      content: 'Compose 提供 SmallFloatingActionButton、FloatingActionButton（标准）、LargeFloatingActionButton 和 ExtendedFloatingActionButton（带文本）四种变体'
    },
    {
      type: 'warning',
      title: '每个页面最多一个 FAB',
      content: '如果有多个操作需要突出，考虑使用 BottomAppBar 或展开菜单，而不是放置多个 FAB'
    },
    {
      type: 'info',
      title: 'ExtendedFloatingActionButton 适合首次使用',
      content: '带文本的 ExtendedFAB 更明确，适合用户首次访问页面时使用。滚动后可以收缩为普通 FAB'
    },
    {
      type: 'info',
      title: 'FAB 位置可配置',
      content: 'Scaffold 的 floatingActionButtonPosition 支持 End（默认，右下）和 Center（底部居中，通常与 BottomAppBar 配合）'
    },
    {
      type: 'error',
      title: '注意 FAB 遮挡内容',
      content: '确保列表等可滚动内容使用 Scaffold 的 paddingValues，避免内容被 FAB 遮挡'
    },
  ],

  relatedComponents: ['button', 'icon-button', 'scaffold'],
  since: '1.0.0',
}
