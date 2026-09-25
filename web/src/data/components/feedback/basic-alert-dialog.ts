import type { ComponentEntry } from '../../types'

export const basicAlertDialogComponent: ComponentEntry = {
  id: 'basic-alert-dialog',
  demo: { id: 'basic-alert-dialog', sourceFile: 'BasicAlertDialogDemo.kt' },
  name: 'BasicAlertDialog',
  category: 'Feedback',
  description: 'M3 完全自定义对话框容器，不预设任何插槽，适合需要自定义布局的复杂对话框场景。',
  tags: ['dialog', 'custom', 'modal', 'basic', '自定义对话框'],
  params: [
    { name: 'onDismissRequest', type: '() -> Unit', required: true, description: '点击对话框外部或返回键时的关闭回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'properties', type: 'DialogProperties', default: 'DialogProperties()', description: '对话框属性，如是否可通过返回键关闭' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '完全自定义的对话框内容' },
  ],
  examples: [
    {
      title: '自定义布局对话框',
      code: `BasicAlertDialog(onDismissRequest = { showDialog = false }) {
    Surface(
        shape = MaterialTheme.shapes.extraLarge,
        tonalElevation = 6.dp
    ) {
        Column(modifier = Modifier.padding(24.dp)) {
            Text("选择主题", style = MaterialTheme.typography.headlineSmall)
            Spacer(Modifier.height(16.dp))
            listOf("跟随系统", "浅色", "深色").forEach { option ->
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { selectedTheme = option }
                        .padding(vertical = 8.dp)
                ) {
                    RadioButton(selected = selectedTheme == option, onClick = { selectedTheme = option })
                    Spacer(Modifier.width(8.dp))
                    Text(option)
                }
            }
            Spacer(Modifier.height(8.dp))
            Row(modifier = Modifier.align(Alignment.End)) {
                TextButton(onClick = { showDialog = false }) { Text("取消") }
                TextButton(onClick = { showDialog = false }) { Text("确认") }
            }
        }
    }
}`,
    },
    {
      title: '图片预览对话框',
      code: `BasicAlertDialog(
    onDismissRequest = { showDialog = false },
    properties = DialogProperties(usePlatformDefaultWidth = false)
) {
    Box(
        modifier = Modifier
            .fillMaxWidth(0.9f)
            .clickable { showDialog = false }
    ) {
        AsyncImage(
            model = imageUrl,
            contentDescription = null,
            modifier = Modifier.fillMaxWidth().clip(RoundedCornerShape(12.dp))
        )
    }
}`,
    },
    {
      title: '加载状态对话框',
      code: `BasicAlertDialog(
    onDismissRequest = {},
    properties = DialogProperties(dismissOnBackPress = false, dismissOnClickOutside = false)
) {
    Surface(
        shape = MaterialTheme.shapes.large,
        tonalElevation = 6.dp
    ) {
        Row(
            modifier = Modifier.padding(24.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            CircularProgressIndicator()
            Text("正在处理，请稍候...")
        }
    }
}`,
    },
    {
      title: '底部选择器对话框',
      code: `BasicAlertDialog(onDismissRequest = { showDialog = false }) {
    Surface(
        shape = MaterialTheme.shapes.extraLarge,
        tonalElevation = 6.dp,
        modifier = Modifier.fillMaxWidth()
    ) {
        Column {
            Text(
                text = "选择操作",
                style = MaterialTheme.typography.titleLarge,
                modifier = Modifier.padding(16.dp)
            )
            HorizontalDivider()
            listOf("编辑", "分享", "删除").forEach { action ->
                TextButton(
                    onClick = {
                        handleAction(action)
                        showDialog = false
                    },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(action)
                }
            }
        }
    }
}`,
    },
    {
      title: '带输入框的对话框',
      code: `var inputText by remember { mutableStateOf("") }

BasicAlertDialog(onDismissRequest = { showDialog = false }) {
    Surface(
        shape = MaterialTheme.shapes.extraLarge,
        tonalElevation = 6.dp
    ) {
        Column(modifier = Modifier.padding(24.dp)) {
            Text(
                text = "重命名",
                style = MaterialTheme.typography.headlineSmall
            )
            Spacer(Modifier.height(16.dp))
            OutlinedTextField(
                value = inputText,
                onValueChange = { inputText = it },
                label = { Text("新名称") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(Modifier.height(24.dp))
            Row(
                modifier = Modifier.align(Alignment.End),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                TextButton(onClick = { showDialog = false }) {
                    Text("取消")
                }
                TextButton(
                    onClick = {
                        saveNewName(inputText)
                        showDialog = false
                    },
                    enabled = inputText.isNotBlank()
                ) {
                    Text("确认")
                }
            }
        }
    }
}`,
    },
    {
      title: '全屏自定义对话框',
      code: `BasicAlertDialog(
    onDismissRequest = { showDialog = false },
    properties = DialogProperties(
        usePlatformDefaultWidth = false,
        decorFitsSystemWindows = false
    )
) {
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        Column {
            TopAppBar(
                title = { Text("编辑内容") },
                navigationIcon = {
                    IconButton(onClick = { showDialog = false }) {
                        Icon(Icons.Default.Close, contentDescription = "关闭")
                    }
                },
                actions = {
                    TextButton(onClick = {
                        saveContent()
                        showDialog = false
                    }) {
                        Text("保存")
                    }
                }
            )
            // 主内容区域
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp)
            ) {
                Text("自定义全屏内容...")
            }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '复杂表单对话框',
      description: '创建包含多个输入字段和复杂验证逻辑的表单对话框',
      code: `@Composable
fun AddContactDialog(
    onDismiss: () -> Unit,
    onConfirm: (Contact) -> Unit
) {
    var name by remember { mutableStateOf("") }
    var phone by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    val isValid = name.isNotBlank() && phone.isNotBlank()

    BasicAlertDialog(onDismissRequest = onDismiss) {
        Surface(
            shape = MaterialTheme.shapes.extraLarge,
            tonalElevation = 6.dp
        ) {
            Column(
                modifier = Modifier
                    .padding(24.dp)
                    .width(300.dp)
            ) {
                Text(
                    text = "添加联系人",
                    style = MaterialTheme.typography.headlineSmall
                )
                Spacer(Modifier.height(16.dp))

                OutlinedTextField(
                    value = name,
                    onValueChange = { name = it },
                    label = { Text("姓名") },
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(Modifier.height(12.dp))

                OutlinedTextField(
                    value = phone,
                    onValueChange = { phone = it },
                    label = { Text("电话") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone),
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(Modifier.height(12.dp))

                OutlinedTextField(
                    value = email,
                    onValueChange = { email = it },
                    label = { Text("邮箱（可选）") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
                    modifier = Modifier.fillMaxWidth()
                )

                Spacer(Modifier.height(24.dp))
                Row(
                    modifier = Modifier.align(Alignment.End),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    TextButton(onClick = onDismiss) {
                        Text("取消")
                    }
                    Button(
                        onClick = {
                            onConfirm(Contact(name, phone, email))
                            onDismiss()
                        },
                        enabled = isValid
                    ) {
                        Text("添加")
                    }
                }
            }
        }
    }
}`
    },
    {
      title: '带动画的对话框',
      description: '使用 AnimatedVisibility 为对话框内容添加入场动画',
      code: `@Composable
fun AnimatedContentDialog(
    onDismiss: () -> Unit
) {
    var contentVisible by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        delay(100)
        contentVisible = true
    }

    BasicAlertDialog(onDismissRequest = onDismiss) {
        Surface(
            shape = MaterialTheme.shapes.extraLarge,
            tonalElevation = 6.dp
        ) {
            AnimatedVisibility(
                visible = contentVisible,
                enter = fadeIn() + slideInVertically(),
                exit = fadeOut() + slideOutVertically()
            ) {
                Column(modifier = Modifier.padding(24.dp)) {
                    Icon(
                        Icons.Default.CheckCircle,
                        contentDescription = null,
                        modifier = Modifier
                            .size(64.dp)
                            .align(Alignment.CenterHorizontally),
                        tint = MaterialTheme.colorScheme.primary
                    )
                    Spacer(Modifier.height(16.dp))
                    Text(
                        text = "操作成功",
                        style = MaterialTheme.typography.titleLarge,
                        modifier = Modifier.align(Alignment.CenterHorizontally)
                    )
                    Spacer(Modifier.height(8.dp))
                    Text(
                        text = "您的操作已成功完成",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Spacer(Modifier.height(24.dp))
                    Button(
                        onClick = onDismiss,
                        modifier = Modifier.align(Alignment.End)
                    ) {
                        Text("确定")
                    }
                }
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '必须包裹 Surface',
      description: 'BasicAlertDialog 不提供背景，内容必须自己包裹 Surface',
      goodExample: `BasicAlertDialog(onDismissRequest = { }) {
    Surface(
        shape = MaterialTheme.shapes.extraLarge,
        tonalElevation = 6.dp
    ) {
        Column(modifier = Modifier.padding(24.dp)) {
            Text("内容")
        }
    }
}`,
      badExample: `BasicAlertDialog(onDismissRequest = { }) {
    // 缺少 Surface，对话框无背景色和圆角
    Column(modifier = Modifier.padding(24.dp)) {
        Text("内容")
    }
}`
    },
    {
      title: '使用 DialogProperties 控制行为',
      description: '根据场景配置对话框的关闭行为',
      goodExample: `// 阻止用户意外关闭加载对话框
BasicAlertDialog(
    onDismissRequest = {},
    properties = DialogProperties(
        dismissOnBackPress = false,
        dismissOnClickOutside = false
    )
) { /* 加载内容 */ }`,
      badExample: `// 加载时允许用户关闭，可能导致状态不一致
BasicAlertDialog(onDismissRequest = { showDialog = false }) {
    // 加载中内容
}`
    },
    {
      title: '全屏对话框设置 usePlatformDefaultWidth = false',
      description: '创建全屏对话框时需要禁用默认宽度限制',
      goodExample: `BasicAlertDialog(
    onDismissRequest = { },
    properties = DialogProperties(
        usePlatformDefaultWidth = false
    )
) {
    Surface(modifier = Modifier.fillMaxSize()) {
        // 全屏内容
    }
}`,
      badExample: `BasicAlertDialog(onDismissRequest = { }) {
    // 宽度被限制，无法真正全屏
    Surface(modifier = Modifier.fillMaxSize()) { }
}`
    },
    {
      title: '简单对话框优先使用 AlertDialog',
      description: 'BasicAlertDialog 适合复杂自定义场景，简单对话框应使用 AlertDialog',
      goodExample: `// 简单确认对话框，使用 AlertDialog
AlertDialog(
    onDismissRequest = { },
    title = { Text("确认删除？") },
    text = { Text("此操作不可撤销") },
    confirmButton = { TextButton(onClick = { }) { Text("删除") } }
)`,
      badExample: `// 简单对话框使用 BasicAlertDialog 增加复杂度
BasicAlertDialog(onDismissRequest = { }) {
    Surface(...) {
        // 手动构建标题、内容、按钮布局
    }
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'BasicAlertDialog 是完全空白的容器',
      content: 'BasicAlertDialog 不提供任何预设样式，需要自己用 Surface 包裹内容并设置形状、阴影和内边距'
    },
    {
      type: 'warning',
      title: 'onDismissRequest 不会自动关闭对话框',
      content: 'onDismissRequest 只是一个回调，需要在其中手动更新状态来关闭对话框（如 showDialog = false）'
    },
    {
      type: 'info',
      title: '使用 Material 3 推荐的圆角',
      content: 'Material 3 对话框推荐使用 MaterialTheme.shapes.extraLarge (28.dp 圆角)'
    },
    {
      type: 'info',
      title: 'DialogProperties 提供丰富配置',
      content: 'DialogProperties 可以控制是否允许点击外部关闭、返回键关闭、是否限制宽度、是否铺满系统窗口等'
    },
    {
      type: 'info',
      title: '适合图片预览和全屏编辑器',
      content: 'BasicAlertDialog 的灵活性使其非常适合实现图片预览、视频播放器、全屏编辑器等非标准对话框'
    },
    {
      type: 'error',
      title: 'InputField 可能被键盘遮挡',
      content: '包含输入框的对话框，需要注意键盘弹出时的布局适配。可以使用 imePadding 或在外层添加 verticalScroll'
    },
  ],

  relatedComponents: ['alert-dialog', 'modal-bottom-sheet', 'surface'],
  since: '1.1.0',
}
