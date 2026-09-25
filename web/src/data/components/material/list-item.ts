import type { ComponentEntry } from '../../types'

export const listItemComponent: ComponentEntry = {
  id: 'list-item',
  demo: { id: 'list-item', sourceFile: 'ListItemDemo.kt' },
  name: 'ListItem',
  category: 'Material',
  description: 'ListItem 是 Material Design 3 标准列表项组件，支持 1-3 行文本、前置内容（图标/头像）、后置内容（操作按钮/状态）。自动处理间距和对齐，符合 Material 规范。',
  tags: ['list', 'item', 'row', 'cell', 'listview'],
  params: [
    { name: 'headlineContent', type: '@Composable () -> Unit', required: true, description: '主标题内容，通常为 Text' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，可添加 clickable 实现点击' },
    { name: 'overlineContent', type: '@Composable (() -> Unit)?', default: 'null', description: '标题上方的辅助文本，如分类标签' },
    { name: 'supportingContent', type: '@Composable (() -> Unit)?', default: 'null', description: '副标题/描述文字，主标题下方' },
    { name: 'leadingContent', type: '@Composable (() -> Unit)?', default: 'null', description: '左侧内容，如头像、图标、复选框' },
    { name: 'trailingContent', type: '@Composable (() -> Unit)?', default: 'null', description: '右侧内容，如操作按钮、时间戳、开关' },
    { name: 'colors', type: 'ListItemColors', default: 'ListItemDefaults.colors()', description: '颜色配置' },
    { name: 'tonalElevation', type: 'Dp', default: 'ListItemDefaults.Elevation', description: '色调高度' },
    { name: 'shadowElevation', type: 'Dp', default: '0.dp', description: '阴影高度' },
  ],
  examples: [
    {
      title: '基础单行列表项',
      code: `ListItem(
    headlineContent = { Text("标题文字") }
)`,
    },
    {
      title: '两行列表项（标题 + 副标题）',
      code: `ListItem(
    headlineContent = { Text("张三") },
    supportingContent = { Text("138-1234-5678") }
)`,
    },
    {
      title: '三行列表项（overline + 标题 + 副标题）',
      code: `ListItem(
    headlineContent = { Text("会议通知") },
    overlineContent = { Text("工作") },
    supportingContent = { Text("明天上午 10:00 在会议室召开周会") }
)`,
    },
    {
      title: '带图标的列表项',
      code: `ListItem(
    headlineContent = { Text("通知") },
    supportingContent = { Text("允许应用发送通知") },
    leadingContent = {
        Icon(
            Icons.Default.Notifications,
            contentDescription = null
        )
    },
    trailingContent = {
        Switch(
            checked = notificationsEnabled,
            onCheckedChange = { notificationsEnabled = it }
        )
    }
)`,
    },
    {
      title: '带头像的聊天列表',
      code: `@Composable
fun ChatListItem(chat: Chat) {
    ListItem(
        headlineContent = { Text(chat.userName) },
        supportingContent = {
            Text(
                chat.lastMessage,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
        },
        leadingContent = {
            AsyncImage(
                model = chat.avatarUrl,
                contentDescription = chat.userName,
                modifier = Modifier
                    .size(40.dp)
                    .clip(CircleShape)
            )
        },
        trailingContent = {
            Column(horizontalAlignment = Alignment.End) {
                Text(
                    chat.timestamp,
                    style = MaterialTheme.typography.bodySmall
                )
                if (chat.unreadCount > 0) {
                    Spacer(Modifier.height(4.dp))
                    Badge {
                        Text(
                            if (chat.unreadCount > 99) "99+"
                            else chat.unreadCount.toString()
                        )
                    }
                }
            }
        },
        modifier = Modifier.clickable { /* 打开聊天 */ }
    )
}`,
    },
    {
      title: '可点击列表（LazyColumn）',
      code: `LazyColumn {
    items(contacts) { contact ->
        ListItem(
            headlineContent = { Text(contact.name) },
            supportingContent = { Text(contact.phone) },
            leadingContent = {
                Icon(
                    Icons.Default.Person,
                    contentDescription = null
                )
            },
            trailingContent = {
                IconButton(onClick = { /* 拨打 */ }) {
                    Icon(
                        Icons.Default.Phone,
                        contentDescription = "拨打"
                    )
                }
            },
            modifier = Modifier.clickable {
                navController.navigate("contact/" + contact.id)
            }
        )
        HorizontalDivider()
    }
}`,
    },
    {
      title: '多选列表',
      code: `@Composable
fun MultiSelectList(items: List<String>) {
    var selectedItems by remember {
        mutableStateOf(setOf<String>())
    }

    LazyColumn {
        items(items) { item ->
            ListItem(
                headlineContent = { Text(item) },
                leadingContent = {
                    Checkbox(
                        checked = item in selectedItems,
                        onCheckedChange = null  // 由外层 clickable 处理
                    )
                },
                modifier = Modifier.clickable {
                    selectedItems = if (item in selectedItems) {
                        selectedItems - item
                    } else {
                        selectedItems + item
                    }
                }
            )
        }
    }
}`,
    },
    {
      title: '设置列表项',
      code: `Column {
    ListItem(
        headlineContent = { Text("深色模式") },
        leadingContent = {
            Icon(Icons.Default.DarkMode, contentDescription = null)
        },
        trailingContent = {
            Switch(
                checked = darkMode,
                onCheckedChange = { darkMode = it }
            )
        }
    )

    HorizontalDivider()

    ListItem(
        headlineContent = { Text("语言") },
        supportingContent = { Text("简体中文") },
        leadingContent = {
            Icon(Icons.Default.Language, contentDescription = null)
        },
        trailingContent = {
            Icon(Icons.AutoMirrored.Filled.KeyboardArrowRight, contentDescription = null)
        },
        modifier = Modifier.clickable { /* 打开语言选择 */ }
    )

    HorizontalDivider()

    ListItem(
        headlineContent = { Text("关于") },
        supportingContent = { Text("版本 1.0.0") },
        leadingContent = {
            Icon(Icons.Default.Info, contentDescription = null)
        },
        modifier = Modifier.clickable { /* 打开关于页面 */ }
    )
}`,
    },
  ],

  useCases: [
    {
      title: '联系人列表',
      description: '通讯录应用的联系人列表',
      code: `@Composable
fun ContactList(contacts: List<Contact>, onContactClick: (Contact) -> Unit) {
    LazyColumn {
        items(
            items = contacts,
            key = { it.id }
        ) { contact ->
            ListItem(
                headlineContent = { Text(contact.name) },
                supportingContent = { Text(contact.phone) },
                leadingContent = {
                    if (contact.avatarUrl != null) {
                        AsyncImage(
                            model = contact.avatarUrl,
                            contentDescription = contact.name,
                            modifier = Modifier
                                .size(40.dp)
                                .clip(CircleShape)
                        )
                    } else {
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .clip(CircleShape)
                                .background(MaterialTheme.colorScheme.primaryContainer),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                contact.name.first().toString(),
                                color = MaterialTheme.colorScheme.onPrimaryContainer
                            )
                        }
                    }
                },
                trailingContent = {
                    Row {
                        IconButton(onClick = { /* 拨打 */ }) {
                            Icon(Icons.Default.Phone, contentDescription = "拨打")
                        }
                        IconButton(onClick = { /* 发消息 */ }) {
                            Icon(Icons.Default.Message, contentDescription = "发消息")
                        }
                    }
                },
                modifier = Modifier.clickable { onContactClick(contact) }
            )
            HorizontalDivider()
        }
    }
}`
    },
    {
      title: '邮件列表',
      description: '邮箱应用的邮件列表',
      code: `@Composable
fun EmailList(emails: List<Email>) {
    LazyColumn {
        items(emails) { email ->
            ListItem(
                headlineContent = {
                    Text(
                        email.subject,
                        fontWeight = if (email.isRead) FontWeight.Normal else FontWeight.Bold
                    )
                },
                overlineContent = { Text(email.sender) },
                supportingContent = {
                    Text(
                        email.preview,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                },
                leadingContent = {
                    Checkbox(
                        checked = email.isSelected,
                        onCheckedChange = { /* 切换选中 */ }
                    )
                },
                trailingContent = {
                    Column(horizontalAlignment = Alignment.End) {
                        Text(
                            email.time,
                            style = MaterialTheme.typography.bodySmall
                        )
                        if (email.hasAttachment) {
                            Spacer(Modifier.height(4.dp))
                            Icon(
                                Icons.Default.AttachFile,
                                contentDescription = "附件",
                                modifier = Modifier.size(16.dp)
                            )
                        }
                    }
                },
                modifier = Modifier.clickable { /* 打开邮件 */ }
            )
            HorizontalDivider()
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 clickable 实现点击',
      description: 'ListItem 本身不处理点击，需要添加 Modifier.clickable',
      goodExample: `ListItem(
    headlineContent = { Text("项目") },
    modifier = Modifier.clickable { /* 处理点击 */ }
)`,
      badExample: `ListItem(
    headlineContent = { Text("项目") },
    onClick = { }  // ListItem 没有 onClick 参数
)`
    },
    {
      title: 'leadingContent 推荐尺寸',
      description: '图标 24dp，头像 40dp',
      goodExample: `leadingContent = {
    Icon(
        Icons.Default.Person,
        contentDescription = null
    )  // Icon 默认 24dp
}

leadingContent = {
    AsyncImage(
        model = avatarUrl,
        contentDescription = null,
        modifier = Modifier.size(40.dp).clip(CircleShape)
    )
}`,
    },
    {
      title: '多行文本使用 maxLines',
      description: '防止文本过长撑开列表项',
      goodExample: `supportingContent = {
    Text(
        longText,
        maxLines = 2,
        overflow = TextOverflow.Ellipsis
    )
}`,
      badExample: `supportingContent = {
    Text(longText)  // 可能显示很多行
}`
    },
    {
      title: '列表项之间使用 HorizontalDivider',
      description: '分隔列表项',
      goodExample: `LazyColumn {
    items(items) { item ->
        ListItem(...)
        HorizontalDivider()
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'ListItem 自动处理布局',
      content: 'ListItem 自动处理内边距、对齐和间距，符合 Material Design 规范，无需手动调整'
    },
    {
      type: 'warning',
      title: 'ListItem 不支持 onClick',
      content: 'ListItem 本身没有 onClick 参数，需要通过 Modifier.clickable { } 实现点击'
    },
    {
      type: 'tip',
      title: 'overlineContent 显示在标题上方',
      content: '用于显示分类、时间戳等辅助信息，字号较小'
    },
    {
      type: 'tip',
      title: 'trailingContent 支持多个元素',
      content: '可以使用 Row 在右侧放置多个按钮或图标'
    },
    {
      type: 'danger',
      title: '避免 ListItem 内容过于复杂',
      content: 'ListItem 设计用于简单内容展示，过于复杂的布局应使用自定义 Row 或 Card'
    },
  ],

  relatedComponents: ['lazy-column', 'horizontal-divider', 'checkbox'],
  since: '1.0.0',
}
