import type { ComponentEntry } from '../../types'

export const popupComponent: ComponentEntry = {
  id: 'popup',
  name: 'Popup',
  category: 'Layout',
  description: '底层弹出层，在当前组件上方渲染浮动内容，不受父布局裁剪限制。DropdownMenu、Tooltip 等组件均基于 Popup 实现。',
  tags: ['popup', 'overlay', 'floating', 'window', '弹出层'],
  params: [
    { name: 'alignment', type: 'Alignment', default: 'Alignment.TopStart', description: '相对于锚点的对齐方式' },
    { name: 'offset', type: 'IntOffset', default: 'IntOffset(0, 0)', description: '相对于对齐位置的偏移' },
    { name: 'onDismissRequest', type: '(() -> Unit)?', default: 'null', description: '点击外部区域时的关闭回调' },
    { name: 'properties', type: 'PopupProperties', default: 'PopupProperties()', description: '弹出层属性，如 focusable、dismissOnBackPress 等' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '弹出层内容' },
  ],
  examples: [
    {
      title: '基础浮动提示',
      code: `var showPopup by remember { mutableStateOf(false) }

Box {
    Button(onClick = { showPopup = true }) { Text("显示 Popup") }

    if (showPopup) {
        Popup(
            alignment = Alignment.TopCenter,
            offset = IntOffset(0, -120),
            onDismissRequest = { showPopup = false }
        ) {
            Surface(
                shape = RoundedCornerShape(8.dp),
                shadowElevation = 8.dp,
                color = MaterialTheme.colorScheme.inverseSurface
            ) {
                Text(
                    "这是一个 Popup",
                    color = MaterialTheme.colorScheme.inverseOnSurface,
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp)
                )
            }
        }
    }
}`,
    },
    {
      title: 'PopupProperties 配置',
      code: `var showPopup by remember { mutableStateOf(false) }

Box {
    Button(onClick = { showPopup = true }) { Text("显示配置 Popup") }

    if (showPopup) {
        Popup(
            alignment = Alignment.Center,
            onDismissRequest = { showPopup = false },
            properties = PopupProperties(
                focusable = true,              // 可获取焦点
                dismissOnBackPress = true,     // 返回键关闭
                dismissOnClickOutside = true,  // 点击外部关闭
                excludeFromSystemGesture = true // 排除系统手势
            )
        ) {
            Card(modifier = Modifier.padding(16.dp).width(280.dp)) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text("弹出内容", style = MaterialTheme.typography.titleMedium)
                    Spacer(Modifier.height(8.dp))
                    Text("可以放置任意 Composable 内容。")
                    Spacer(Modifier.height(16.dp))
                    Button(
                        onClick = { showPopup = false },
                        modifier = Modifier.align(Alignment.End)
                    ) {
                        Text("关闭")
                    }
                }
            }
        }
    }
}`,
    },
    {
      title: '工具提示（Tooltip）',
      code: `var showTooltip by remember { mutableStateOf(false) }

Box {
    IconButton(
        onClick = { /* 操作 */ },
        onLongClick = { showTooltip = true }
    ) {
        Icon(Icons.Default.Info, contentDescription = "信息")
    }

    if (showTooltip) {
        Popup(
            alignment = Alignment.TopCenter,
            offset = IntOffset(0, -60),
            onDismissRequest = { showTooltip = false }
        ) {
            Surface(
                shape = RoundedCornerShape(4.dp),
                color = Color(0xFF616161),
                modifier = Modifier.alpha(0.9f)
            ) {
                Text(
                    text = "这是一个工具提示",
                    color = Color.White,
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                    style = MaterialTheme.typography.bodySmall
                )
            }
        }

        // 自动消失
        LaunchedEffect(Unit) {
            delay(2000)
            showTooltip = false
        }
    }
}`,
    },
    {
      title: '自定义菜单',
      code: `var showMenu by remember { mutableStateOf(false) }

Box {
    IconButton(onClick = { showMenu = true }) {
        Icon(Icons.Default.MoreVert, contentDescription = "更多")
    }

    if (showMenu) {
        Popup(
            alignment = Alignment.TopEnd,
            offset = IntOffset(0, 8),
            onDismissRequest = { showMenu = false },
            properties = PopupProperties(focusable = true)
        ) {
            Surface(
                shape = RoundedCornerShape(8.dp),
                shadowElevation = 8.dp,
                modifier = Modifier.width(160.dp)
            ) {
                Column {
                    listOf("编辑", "分享", "删除").forEach { item ->
                        DropdownMenuItem(
                            text = { Text(item) },
                            onClick = {
                                showMenu = false
                                // 处理菜单项点击
                            }
                        )
                    }
                }
            }
        }
    }
}`,
    },
    {
      title: '跟随光标的弹出层',
      code: `var showPopup by remember { mutableStateOf(false) }
var popupOffset by remember { mutableStateOf(IntOffset(0, 0)) }

Box(
    modifier = Modifier
        .fillMaxSize()
        .pointerInput(Unit) {
            detectTapGestures(
                onLongPress = { offset ->
                    popupOffset = IntOffset(offset.x.toInt(), offset.y.toInt())
                    showPopup = true
                }
            )
        }
) {
    Text("长按屏幕显示菜单", modifier = Modifier.align(Alignment.Center))

    if (showPopup) {
        Popup(
            alignment = Alignment.TopStart,
            offset = popupOffset,
            onDismissRequest = { showPopup = false }
        ) {
            Surface(
                shape = RoundedCornerShape(8.dp),
                shadowElevation = 4.dp
            ) {
                Column(modifier = Modifier.width(120.dp)) {
                    listOf("复制", "粘贴", "选择").forEach { action ->
                        TextButton(
                            onClick = {
                                showPopup = false
                                // 处理动作
                            },
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(action)
                        }
                    }
                }
            }
        }
    }
}`,
    },
    {
      title: '对话框式弹出层',
      code: `var showDialog by remember { mutableStateOf(false) }
var inputText by remember { mutableStateOf("") }

Box {
    Button(onClick = { showDialog = true }) { Text("打开对话框") }

    if (showDialog) {
        // 背景遮罩
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.Black.copy(alpha = 0.5f))
                .clickable(
                    interactionSource = remember { MutableInteractionSource() },
                    indication = null
                ) { showDialog = false }
        )

        Popup(
            alignment = Alignment.Center,
            properties = PopupProperties(focusable = true)
        ) {
            Card(
                modifier = Modifier
                    .width(320.dp)
                    .padding(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        "输入对话框",
                        style = MaterialTheme.typography.titleLarge
                    )
                    Spacer(Modifier.height(16.dp))
                    OutlinedTextField(
                        value = inputText,
                        onValueChange = { inputText = it },
                        label = { Text("请输入内容") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(Modifier.height(16.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.End
                    ) {
                        TextButton(onClick = { showDialog = false }) {
                            Text("取消")
                        }
                        Spacer(Modifier.width(8.dp))
                        Button(onClick = {
                            // 处理输入
                            showDialog = false
                        }) {
                            Text("确定")
                        }
                    }
                }
            }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '颜色选择器',
      description: '点击按钮弹出颜色选择面板',
      code: `@Composable
fun ColorPickerButton() {
    var selectedColor by remember { mutableStateOf(Color.Blue) }
    var showPicker by remember { mutableStateOf(false) }

    val colors = listOf(
        Color.Red, Color.Blue, Color.Green, Color.Yellow,
        Color.Magenta, Color.Cyan, Color.Gray, Color.Black
    )

    Box {
        OutlinedButton(
            onClick = { showPicker = true },
            colors = ButtonDefaults.outlinedButtonColors(
                contentColor = selectedColor
            )
        ) {
            Box(
                modifier = Modifier
                    .size(24.dp)
                    .background(selectedColor, CircleShape)
            )
            Spacer(Modifier.width(8.dp))
            Text("选择颜色")
        }

        if (showPicker) {
            Popup(
                alignment = Alignment.BottomStart,
                offset = IntOffset(0, 8),
                onDismissRequest = { showPicker = false }
            ) {
                Surface(
                    shape = RoundedCornerShape(8.dp),
                    shadowElevation = 8.dp,
                    modifier = Modifier.padding(8.dp)
                ) {
                    Column(modifier = Modifier.padding(8.dp)) {
                        Text(
                            "选择颜色",
                            style = MaterialTheme.typography.titleSmall,
                            modifier = Modifier.padding(bottom = 8.dp)
                        )
                        LazyVerticalGrid(
                            columns = GridCells.Fixed(4),
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalArrangement = Arrangement.spacedBy(8.dp),
                            modifier = Modifier.width(200.dp)
                        ) {
                            items(colors) { color ->
                                Box(
                                    modifier = Modifier
                                        .size(40.dp)
                                        .background(color, CircleShape)
                                        .border(
                                            width = 2.dp,
                                            color = if (selectedColor == color)
                                                MaterialTheme.colorScheme.primary
                                            else Color.Transparent,
                                            shape = CircleShape
                                        )
                                        .clickable {
                                            selectedColor = color
                                            showPicker = false
                                        }
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}`,
    },
    {
      title: '右键菜单',
      description: '长按或右键显示上下文菜单',
      code: `@Composable
fun ContextMenuExample() {
    var showContextMenu by remember { mutableStateOf(false) }
    var menuPosition by remember { mutableStateOf(IntOffset.Zero) }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .pointerInput(Unit) {
                detectTapGestures(
                    onLongPress = { offset ->
                        menuPosition = IntOffset(offset.x.toInt(), offset.y.toInt())
                        showContextMenu = true
                    }
                )
            }
    ) {
        LazyColumn(modifier = Modifier.fillMaxSize()) {
            items(20) { index ->
                ListItem(
                    headlineContent = { Text("列表项 $index") },
                    supportingContent = { Text("长按显示菜单") }
                )
            }
        }

        if (showContextMenu) {
            Popup(
                alignment = Alignment.TopStart,
                offset = menuPosition,
                onDismissRequest = { showContextMenu = false },
                properties = PopupProperties(focusable = true)
            ) {
                Surface(
                    shape = RoundedCornerShape(8.dp),
                    shadowElevation = 8.dp,
                    modifier = Modifier.width(160.dp)
                ) {
                    Column {
                        ContextMenuItem(
                            icon = Icons.Default.ContentCopy,
                            text = "复制",
                            onClick = {
                                showContextMenu = false
                                // 处理复制
                            }
                        )
                        ContextMenuItem(
                            icon = Icons.Default.Share,
                            text = "分享",
                            onClick = {
                                showContextMenu = false
                                // 处理分享
                            }
                        )
                        HorizontalDivider()
                        ContextMenuItem(
                            icon = Icons.Default.Delete,
                            text = "删除",
                            onClick = {
                                showContextMenu = false
                                // 处理删除
                            },
                            color = MaterialTheme.colorScheme.error
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun ContextMenuItem(
    icon: ImageVector,
    text: String,
    onClick: () -> Unit,
    color: Color = MaterialTheme.colorScheme.onSurface
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(horizontal = 16.dp, vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = color,
            modifier = Modifier.size(20.dp)
        )
        Spacer(Modifier.width(12.dp))
        Text(text, color = color)
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '使用 onDismissRequest 处理关闭',
      description: '点击外部、返回键时应关闭 Popup',
      goodExample: `Popup(
    onDismissRequest = { showPopup = false },
    properties = PopupProperties(
        dismissOnBackPress = true,
        dismissOnClickOutside = true
    )
)`,
    },
    {
      title: '配合 Surface 添加阴影和形状',
      description: 'Popup 本身只是布局容器，需要 Surface 提供视觉效果',
      goodExample: `Popup(/* ... */) {
    Surface(
        shape = RoundedCornerShape(8.dp),
        shadowElevation = 8.dp
    ) {
        // 内容
    }
}`,
    },
    {
      title: '设置 focusable = true 捕获输入',
      description: '包含输入框的 Popup 需要设置 focusable',
      goodExample: `Popup(
    properties = PopupProperties(focusable = true)
) {
    TextField(/* ... */)
}`,
    },
    {
      title: '使用 alignment 和 offset 精确定位',
      description: 'alignment 定义锚点，offset 微调位置',
      goodExample: `Popup(
    alignment = Alignment.BottomCenter,
    offset = IntOffset(0, 8)  // 向下偏移 8dp
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Popup 是底层 API',
      content: 'DropdownMenu、Tooltip、Dialog 等高级组件都是基于 Popup 实现的',
    },
    {
      type: 'info',
      title: '不受父布局裁剪限制',
      content: 'Popup 内容渲染在单独的窗口层，不会被父组件的 clip 或边界裁剪',
    },
    {
      type: 'info',
      title: 'alignment 相对于锚点组件',
      content: 'Popup 的 alignment 是相对于其父 Box 或调用位置的对齐方式',
    },
    {
      type: 'info',
      title: '使用 IntOffset 精确控制位置',
      content: 'offset 参数接收 IntOffset(x, y)，单位是像素，可用于跟随手势位置',
    },
    {
      type: 'warning',
      title: 'focusable = true 会拦截外部交互',
      content: '设置 focusable = true 后，Popup 外部的点击事件会触发 dismiss 而不会传递到下层',
    },
    {
      type: 'warning',
      title: '避免嵌套 Popup',
      content: '多层嵌套的 Popup 会导致焦点和关闭逻辑混乱，考虑使用状态机管理',
    },
    {
      type: 'error',
      title: '状态管理要正确',
      content: '使用 if (showPopup) 控制显示，避免内存泄漏和状态不一致',
    },
  ],

  relatedComponents: ['dropdown-menu'],
  since: '1.0.0',
}
