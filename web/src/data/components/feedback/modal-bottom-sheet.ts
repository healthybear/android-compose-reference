import type { ComponentEntry } from '../../types'

export const modalBottomSheetComponent: ComponentEntry = {
  id: 'modal-bottom-sheet',
  demo: { id: 'modal-bottom-sheet', sourceFile: 'ModalBottomSheetDemo.kt' },
  name: 'ModalBottomSheet',
  category: 'Feedback',
  description: 'ModalBottomSheet 是模态底部面板，从屏幕底部滑入，覆盖主内容并显示遮罩。支持拖拽关闭、滚动内容，适合操作菜单、筛选面板、详情预览等场景。',
  tags: ['bottom-sheet', 'modal', 'sheet', 'drawer', 'panel'],
  params: [
    { name: 'onDismissRequest', type: '() -> Unit', required: true, description: '面板关闭时的回调（下滑关闭或点击遮罩）' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'sheetState', type: 'SheetState', default: 'rememberModalBottomSheetState()', description: '面板状态，可程序控制展开/收起' },
    { name: 'sheetMaxWidth', type: 'Dp', default: 'BottomSheetDefaults.SheetMaxWidth', description: '面板最大宽度，平板/大屏下限制宽度（640dp）' },
    { name: 'shape', type: 'Shape', default: 'BottomSheetDefaults.ExpandedShape', description: '面板形状，默认顶部圆角' },
    { name: 'containerColor', type: 'Color', default: 'BottomSheetDefaults.ContainerColor', description: '面板背景色' },
    { name: 'contentColor', type: 'Color', default: 'contentColorFor(containerColor)', description: '内容颜色' },
    { name: 'tonalElevation', type: 'Dp', default: 'BottomSheetDefaults.Elevation', description: '色调高度' },
    { name: 'scrimColor', type: 'Color', default: 'BottomSheetDefaults.ScrimColor', description: '遮罩颜色（半透明黑色）' },
    { name: 'dragHandle', type: '@Composable (() -> Unit)?', default: '{ BottomSheetDefaults.DragHandle() }', description: '顶部拖拽把手，null 可隐藏' },
    { name: 'windowInsets', type: 'WindowInsets', default: 'BottomSheetDefaults.windowInsets', description: '窗口内边距，处理系统栏' },
    { name: 'properties', type: 'ModalBottomSheetProperties', default: 'ModalBottomSheetDefaults.properties', description: '面板属性配置' },
    { name: 'content', type: '@Composable ColumnScope.() -> Unit', required: true, description: '面板内容，自动放在 Column 中' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var showBottomSheet by remember { mutableStateOf(false) }

Button(onClick = { showBottomSheet = true }) {
    Text("打开底部面板")
}

if (showBottomSheet) {
    ModalBottomSheet(
        onDismissRequest = { showBottomSheet = false }
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(
                "操作菜单",
                style = MaterialTheme.typography.titleLarge
            )
            Spacer(Modifier.height(16.dp))
            Text("这是底部面板的内容")
        }
    }
}`,
    },
    {
      title: '操作菜单',
      code: `var showSheet by remember { mutableStateOf(false) }

if (showSheet) {
    ModalBottomSheet(
        onDismissRequest = { showSheet = false }
    ) {
        Column(modifier = Modifier.fillMaxWidth()) {
            Text(
                "选择操作",
                style = MaterialTheme.typography.titleMedium,
                modifier = Modifier.padding(16.dp)
            )

            ListItem(
                headlineContent = { Text("分享") },
                leadingContent = {
                    Icon(Icons.Default.Share, contentDescription = null)
                },
                modifier = Modifier.clickable {
                    showSheet = false
                    // 执行分享
                }
            )

            ListItem(
                headlineContent = { Text("收藏") },
                leadingContent = {
                    Icon(Icons.Default.Favorite, contentDescription = null)
                },
                modifier = Modifier.clickable {
                    showSheet = false
                    // 执行收藏
                }
            )

            ListItem(
                headlineContent = { Text("举报") },
                leadingContent = {
                    Icon(Icons.Default.Report, contentDescription = null)
                },
                modifier = Modifier.clickable {
                    showSheet = false
                    // 执行举报
                }
            )

            Spacer(Modifier.height(16.dp))
        }
    }
}`,
    },
    {
      title: '可滚动内容',
      code: `var showSheet by remember { mutableStateOf(false) }

if (showSheet) {
    ModalBottomSheet(
        onDismissRequest = { showSheet = false }
    ) {
        LazyColumn(
            modifier = Modifier.fillMaxWidth()
        ) {
            item {
                Text(
                    "选择城市",
                    style = MaterialTheme.typography.titleMedium,
                    modifier = Modifier.padding(16.dp)
                )
            }

            items(cities) { city ->
                ListItem(
                    headlineContent = { Text(city) },
                    modifier = Modifier.clickable {
                        selectedCity = city
                        showSheet = false
                    }
                )
                HorizontalDivider()
            }

            item {
                Spacer(Modifier.height(16.dp))
            }
        }
    }
}`,
    },
    {
      title: '程序控制展开/收起',
      code: `var showSheet by remember { mutableStateOf(false) }
val sheetState = rememberModalBottomSheetState()
val scope = rememberCoroutineScope()

if (showSheet) {
    ModalBottomSheet(
        onDismissRequest = { showSheet = false },
        sheetState = sheetState
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text("面板内容")

            Spacer(Modifier.height(16.dp))

            Button(
                onClick = {
                    scope.launch {
                        sheetState.hide()
                    }.invokeOnCompletion {
                        if (!sheetState.isVisible) {
                            showSheet = false
                        }
                    }
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("关闭")
            }
        }
    }
}`,
    },
    {
      title: '隐藏拖拽把手',
      code: `var showSheet by remember { mutableStateOf(false) }

if (showSheet) {
    ModalBottomSheet(
        onDismissRequest = { showSheet = false },
        dragHandle = null  // 隐藏顶部拖拽把手
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text("无拖拽把手的面板")

            Spacer(Modifier.height(16.dp))

            Button(
                onClick = { showSheet = false },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("关闭")
            }
        }
    }
}`,
    },
    {
      title: '筛选面板',
      code: `var showFilterSheet by remember { mutableStateOf(false) }
var selectedCategory by remember { mutableStateOf("全部") }
var priceRange by remember { mutableStateOf(0f..1000f) }

if (showFilterSheet) {
    ModalBottomSheet(
        onDismissRequest = { showFilterSheet = false }
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(
                "筛选",
                style = MaterialTheme.typography.titleLarge
            )

            Spacer(Modifier.height(16.dp))

            Text("分类", style = MaterialTheme.typography.titleMedium)
            Spacer(Modifier.height(8.dp))

            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                listOf("全部", "美食", "购物", "娱乐").forEach { category ->
                    FilterChip(
                        selected = selectedCategory == category,
                        onClick = { selectedCategory = category },
                        label = { Text(category) }
                    )
                }
            }

            Spacer(Modifier.height(16.dp))

            Text("价格范围", style = MaterialTheme.typography.titleMedium)
            RangeSlider(
                value = priceRange,
                onValueChange = { priceRange = it },
                valueRange = 0f..1000f
            )
            Text("¥100 - ¥800")

            Spacer(Modifier.height(16.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedButton(
                    onClick = {
                        selectedCategory = "全部"
                        priceRange = 0f..1000f
                    },
                    modifier = Modifier.weight(1f)
                ) {
                    Text("重置")
                }

                Button(
                    onClick = {
                        showFilterSheet = false
                        // 应用筛选
                    },
                    modifier = Modifier.weight(1f)
                ) {
                    Text("确定")
                }
            }

            Spacer(Modifier.height(16.dp))
        }
    }
}`,
    },
    {
      title: '详情预览',
      code: `var showDetailSheet by remember { mutableStateOf(false) }

if (showDetailSheet) {
    ModalBottomSheet(
        onDismissRequest = { showDetailSheet = false }
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .padding(16.dp)
        ) {
            // 商品图片
            AsyncImage(
                model = product.imageUrl,
                contentDescription = null,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp)
                    .clip(RoundedCornerShape(8.dp))
            )

            Spacer(Modifier.height(16.dp))

            // 商品信息
            Text(
                product.name,
                style = MaterialTheme.typography.titleLarge
            )

            Spacer(Modifier.height(8.dp))

            Text(
                "¥299.00",
                style = MaterialTheme.typography.titleMedium,
                color = MaterialTheme.colorScheme.primary
            )

            Spacer(Modifier.height(16.dp))

            Text(
                product.description,
                style = MaterialTheme.typography.bodyMedium
            )

            Spacer(Modifier.height(16.dp))

            Button(
                onClick = {
                    showDetailSheet = false
                    // 加入购物车
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("加入购物车")
            }

            Spacer(Modifier.height(16.dp))
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '图片选择器',
      description: '选择图片来源',
      code: `@Composable
fun ImagePickerSheet(
    onDismiss: () -> Unit,
    onCameraClick: () -> Unit,
    onGalleryClick: () -> Unit
) {
    ModalBottomSheet(onDismissRequest = onDismiss) {
        Column(modifier = Modifier.fillMaxWidth()) {
            Text(
                "选择图片",
                style = MaterialTheme.typography.titleMedium,
                modifier = Modifier.padding(16.dp)
            )

            ListItem(
                headlineContent = { Text("拍照") },
                leadingContent = {
                    Icon(Icons.Default.CameraAlt, contentDescription = null)
                },
                modifier = Modifier.clickable {
                    onDismiss()
                    onCameraClick()
                }
            )

            ListItem(
                headlineContent = { Text("从相册选择") },
                leadingContent = {
                    Icon(Icons.Default.PhotoLibrary, contentDescription = null)
                },
                modifier = Modifier.clickable {
                    onDismiss()
                    onGalleryClick()
                }
            )

            Spacer(Modifier.height(16.dp))
        }
    }
}`
    },
    {
      title: '分享面板',
      description: '分享到不同平台',
      code: `@Composable
fun ShareSheet(
    onDismiss: () -> Unit,
    onShareTo: (Platform) -> Unit
) {
    ModalBottomSheet(onDismissRequest = onDismiss) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(
                "分享到",
                style = MaterialTheme.typography.titleMedium
            )

            Spacer(Modifier.height(16.dp))

            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                items(sharePlatforms) { platform ->
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier.clickable {
                            onDismiss()
                            onShareTo(platform)
                        }
                    ) {
                        Icon(
                            platform.icon,
                            contentDescription = platform.name,
                            modifier = Modifier.size(48.dp)
                        )
                        Spacer(Modifier.height(4.dp))
                        Text(
                            platform.name,
                            style = MaterialTheme.typography.bodySmall
                        )
                    }
                }
            }

            Spacer(Modifier.height(16.dp))
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 if 语句控制显示',
      description: 'ModalBottomSheet 应该在条件为 true 时才渲染',
      goodExample: `var showSheet by remember { mutableStateOf(false) }

if (showSheet) {
    ModalBottomSheet(
        onDismissRequest = { showSheet = false }
    ) {
        // 内容
    }
}`,
      badExample: `ModalBottomSheet(
    onDismissRequest = { },
    sheetState = sheetState  // 总是渲染，难以管理
) {
    // 内容
}`
    },
    {
      title: 'onDismissRequest 必须正确关闭',
      description: '确保用户可以通过下滑或点击遮罩关闭面板',
      goodExample: `var showSheet by remember { mutableStateOf(false) }

ModalBottomSheet(
    onDismissRequest = { showSheet = false }
) { }`,
      badExample: `ModalBottomSheet(
    onDismissRequest = { }  // 空实现，用户无法关闭
) { }`
    },
    {
      title: '长内容使用 LazyColumn 或 verticalScroll',
      description: '确保内容可以滚动',
      goodExample: `ModalBottomSheet(onDismissRequest = { }) {
    LazyColumn {
        items(longList) { item ->
            ListItem(...)
        }
    }
}`,
    },
    {
      title: '操作完成后关闭面板',
      description: '用户点击操作项后应关闭面板',
      goodExample: `ListItem(
    headlineContent = { Text("分享") },
    modifier = Modifier.clickable {
        showSheet = false  // 先关闭面板
        onShareClick()      // 再执行操作
    }
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'ModalBottomSheet 是模态组件',
      content: 'ModalBottomSheet 会覆盖主内容并显示遮罩，阻止用户与下方内容交互'
    },
    {
      type: 'warning',
      title: 'onDismissRequest 必须处理',
      content: 'onDismissRequest 在下滑关闭或点击遮罩时触发，必须正确关闭面板，否则用户无法退出'
    },
    {
      type: 'tip',
      title: '默认显示拖拽把手',
      content: 'ModalBottomSheet 顶部默认显示拖拽把手，提示用户可以下滑关闭。设置 dragHandle = null 可隐藏'
    },
    {
      type: 'tip',
      title: 'content 自动放在 Column 中',
      content: 'ModalBottomSheet 的 content 参数类型是 ColumnScope，内容会自动垂直排列'
    },
    {
      type: 'danger',
      title: '避免在面板中嵌套面板',
      content: '不要在 ModalBottomSheet 中再打开另一个 ModalBottomSheet，会困惑用户'
    },
  ],

  relatedComponents: ['alert-dialog', 'scaffold'],
  since: '1.0.0',
}
