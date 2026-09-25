import type { ComponentEntry } from '../../types'

export const inputChipComponent: ComponentEntry = {
  id: 'input-chip',
  demo: { id: 'input-chip', sourceFile: 'InputChipDemo.kt' },
  name: 'InputChip',
  category: 'Material',
  description: '输入 Chip，表示用户输入的信息（如标签、联系人），通常带删除按钮，可选中。',
  tags: ['chip', 'input', 'tag', 'deletable', '输入标签'],
  params: [
    { name: 'selected', type: 'Boolean', required: true, description: '是否选中' },
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'label', type: '@Composable () -> Unit', required: true, description: '标签文字' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互' },
    { name: 'avatar', type: '@Composable (() -> Unit)?', default: 'null', description: '头像，显示在最左侧' },
    { name: 'leadingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '前置图标' },
    { name: 'trailingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '后置图标，通常为删除按钮' },
  ],
  examples: [
    {
      title: '可删除标签',
      code: `var tags by remember { mutableStateOf(listOf("Kotlin", "Compose", "Android")) }

Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    tags.forEach { tag ->
        InputChip(
            selected = false,
            onClick = {},
            label = { Text(tag) },
            trailingIcon = {
                Icon(
                    Icons.Default.Close,
                    contentDescription = "删除 $tag",
                    modifier = Modifier
                        .size(InputChipDefaults.IconSize)
                        .clickable { tags = tags - tag }
                )
            }
        )
    }
}`,
    },
    {
      title: '带头像',
      code: `InputChip(
    selected = false,
    onClick = {},
    label = { Text("张三") },
    avatar = {
        Icon(Icons.Default.Person, contentDescription = null, modifier = Modifier.size(InputChipDefaults.AvatarSize))
    },
    trailingIcon = {
        Icon(Icons.Default.Close, contentDescription = "移除", modifier = Modifier.size(InputChipDefaults.IconSize))
    }
)`,
    },
    {
      title: '可选择的标签',
      code: `var selectedTags by remember { mutableStateOf(setOf<String>()) }
val allTags = listOf("技术", "设计", "产品", "运营")

FlowRow(
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    allTags.forEach { tag ->
        InputChip(
            selected = tag in selectedTags,
            onClick = {
                selectedTags = if (tag in selectedTags) {
                    selectedTags - tag
                } else {
                    selectedTags + tag
                }
            },
            label = { Text(tag) },
            leadingIcon = if (tag in selectedTags) {
                { Icon(Icons.Default.Check, contentDescription = null, modifier = Modifier.size(InputChipDefaults.IconSize)) }
            } else null
        )
    }
}`,
    },
    {
      title: '联系人标签',
      code: `var contacts by remember {
    mutableStateOf(listOf(
        Contact("张三", "avatar1.jpg"),
        Contact("李四", "avatar2.jpg")
    ))
}

FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    contacts.forEach { contact ->
        InputChip(
            selected = false,
            onClick = {},
            label = { Text(contact.name) },
            avatar = {
                AsyncImage(
                    model = contact.avatar,
                    contentDescription = null,
                    modifier = Modifier
                        .size(InputChipDefaults.AvatarSize)
                        .clip(CircleShape)
                )
            },
            trailingIcon = {
                IconButton(
                    onClick = { contacts = contacts - contact },
                    modifier = Modifier.size(InputChipDefaults.IconSize)
                ) {
                    Icon(
                        Icons.Default.Close,
                        contentDescription = "移除联系人",
                        modifier = Modifier.size(18.dp)
                    )
                }
            }
        )
    }
}`,
    },
    {
      title: '带前置图标',
      code: `InputChip(
    selected = true,
    onClick = { /* 切换选择 */ },
    label = { Text("重要") },
    leadingIcon = {
        Icon(
            Icons.Default.Star,
            contentDescription = null,
            modifier = Modifier.size(InputChipDefaults.IconSize)
        )
    }
)`,
    },
    {
      title: '输入框中的标签',
      code: `var inputText by remember { mutableStateOf("") }
var tags by remember { mutableStateOf(listOf("Android", "Jetpack")) }

Column(modifier = Modifier.fillMaxWidth()) {
    // 标签显示区域
    FlowRow(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        tags.forEach { tag ->
            InputChip(
                selected = false,
                onClick = {},
                label = { Text(tag) },
                trailingIcon = {
                    Icon(
                        Icons.Default.Close,
                        contentDescription = "删除",
                        modifier = Modifier
                            .size(InputChipDefaults.IconSize)
                            .clickable { tags = tags - tag }
                    )
                }
            )
        }
    }

    // 输入框
    OutlinedTextField(
        value = inputText,
        onValueChange = { inputText = it },
        label = { Text("添加标签") },
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
        keyboardActions = KeyboardActions(
            onDone = {
                if (inputText.isNotBlank()) {
                    tags = tags + inputText.trim()
                    inputText = ""
                }
            }
        )
    )
}`,
    },
  ],

  useCases: [
    {
      title: '电子邮件收件人选择',
      description: '在邮件应用中选择和管理收件人',
      code: `@Composable
fun RecipientSelector(
    recipients: List<Contact>,
    onAddRecipient: (Contact) -> Unit,
    onRemoveRecipient: (Contact) -> Unit
) {
    var showContactPicker by remember { mutableStateOf(false) }

    Column(modifier = Modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "收件人：",
                style = MaterialTheme.typography.labelLarge,
                modifier = Modifier.width(80.dp)
            )

            FlowRow(
                modifier = Modifier.weight(1f),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                recipients.forEach { contact ->
                    InputChip(
                        selected = false,
                        onClick = {},
                        label = { Text(contact.email) },
                        avatar = {
                            if (contact.avatarUrl != null) {
                                AsyncImage(
                                    model = contact.avatarUrl,
                                    contentDescription = null,
                                    modifier = Modifier
                                        .size(InputChipDefaults.AvatarSize)
                                        .clip(CircleShape)
                                )
                            } else {
                                Icon(
                                    Icons.Default.Person,
                                    contentDescription = null,
                                    modifier = Modifier.size(InputChipDefaults.AvatarSize)
                                )
                            }
                        },
                        trailingIcon = {
                            Icon(
                                Icons.Default.Close,
                                contentDescription = "移除",
                                modifier = Modifier
                                    .size(InputChipDefaults.IconSize)
                                    .clickable { onRemoveRecipient(contact) }
                            )
                        }
                    )
                }

                // 添加按钮
                InputChip(
                    selected = false,
                    onClick = { showContactPicker = true },
                    label = { Text("添加") },
                    leadingIcon = {
                        Icon(
                            Icons.Default.Add,
                            contentDescription = null,
                            modifier = Modifier.size(InputChipDefaults.IconSize)
                        )
                    }
                )
            }
        }

        if (showContactPicker) {
            ContactPickerDialog(
                onDismiss = { showContactPicker = false },
                onSelect = { contact ->
                    onAddRecipient(contact)
                    showContactPicker = false
                }
            )
        }
    }
}`
    },
    {
      title: '文章标签编辑器',
      description: '内容管理系统中的标签编辑功能',
      code: `@Composable
fun TagEditor(
    tags: List<String>,
    onTagsChanged: (List<String>) -> Unit,
    suggestions: List<String> = emptyList()
) {
    var inputText by remember { mutableStateOf("") }

    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(
            text = "标签",
            style = MaterialTheme.typography.titleMedium
        )

        // 已选标签
        if (tags.isNotEmpty()) {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                tags.forEach { tag ->
                    InputChip(
                        selected = false,
                        onClick = {},
                        label = { Text(tag) },
                        trailingIcon = {
                            Icon(
                                Icons.Default.Close,
                                contentDescription = "删除标签",
                                modifier = Modifier
                                    .size(InputChipDefaults.IconSize)
                                    .clickable {
                                        onTagsChanged(tags - tag)
                                    }
                            )
                        }
                    )
                }
            }
        }

        // 输入框
        OutlinedTextField(
            value = inputText,
            onValueChange = { inputText = it },
            label = { Text("添加标签") },
            placeholder = { Text("输入标签名称并按回车") },
            modifier = Modifier.fillMaxWidth(),
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
            keyboardActions = KeyboardActions(
                onDone = {
                    val newTag = inputText.trim()
                    if (newTag.isNotBlank() && newTag !in tags) {
                        onTagsChanged(tags + newTag)
                        inputText = ""
                    }
                }
            ),
            trailingIcon = {
                if (inputText.isNotBlank()) {
                    IconButton(onClick = {
                        val newTag = inputText.trim()
                        if (newTag.isNotBlank() && newTag !in tags) {
                            onTagsChanged(tags + newTag)
                            inputText = ""
                        }
                    }) {
                        Icon(Icons.Default.Add, contentDescription = "添加")
                    }
                }
            }
        )

        // 推荐标签
        if (suggestions.isNotEmpty()) {
            Column {
                Text(
                    text = "推荐标签",
                    style = MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Spacer(Modifier.height(8.dp))
                FlowRow(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    suggestions.filter { it !in tags }.forEach { suggestion ->
                        SuggestionChip(
                            onClick = {
                                onTagsChanged(tags + suggestion)
                            },
                            label = { Text(suggestion) }
                        )
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
      title: '使用 trailingIcon 提供删除功能',
      description: 'InputChip 通常配合删除图标使用',
      goodExample: `InputChip(
    selected = false,
    onClick = {},
    label = { Text("标签") },
    trailingIcon = {
        Icon(
            Icons.Default.Close,
            contentDescription = "删除",
            modifier = Modifier.clickable { removeTag() }
        )
    }
)`,
      badExample: `// 缺少删除功能，用户无法移除标签
InputChip(
    selected = false,
    onClick = {},
    label = { Text("标签") }
)`
    },
    {
      title: 'avatar vs leadingIcon 的选择',
      description: 'avatar 用于人物头像，leadingIcon 用于状态图标',
      goodExample: `// 联系人使用 avatar
InputChip(
    selected = false,
    onClick = {},
    label = { Text("张三") },
    avatar = { /* 头像图片 */ }
)

// 分类标签使用 leadingIcon
InputChip(
    selected = true,
    onClick = {},
    label = { Text("重要") },
    leadingIcon = { Icon(Icons.Default.Star, ...) }
)`,
      badExample: `// 联系人错用 leadingIcon
InputChip(
    selected = false,
    onClick = {},
    label = { Text("张三") },
    leadingIcon = { /* 头像 */ }
)`
    },
    {
      title: '选中状态用于筛选',
      description: 'selected 状态应反映标签是否被激活或用于筛选',
      goodExample: `InputChip(
    selected = isFilterActive,
    onClick = { toggleFilter() },
    label = { Text("标签") }
)`,
      badExample: `// 标签输入场景不需要 selected 状态
InputChip(
    selected = true,  // 始终为 true 没有意义
    onClick = {},
    label = { Text("标签") }
)`
    },
    {
      title: '配合 FlowRow 自动换行',
      description: '多个 InputChip 使用 FlowRow 实现自动换行布局',
      goodExample: `FlowRow(
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    tags.forEach { tag ->
        InputChip(...)
    }
}`,
      badExample: `// Row 不会换行，标签过多会溢出
Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    tags.forEach { tag ->
        InputChip(...)
    }
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'InputChip 表示用户输入',
      content: 'InputChip 用于展示用户输入的信息（标签、联系人等），通常支持删除操作'
    },
    {
      type: 'tip',
      title: 'avatar 和 leadingIcon 不能同时使用',
      content: 'avatar 和 leadingIcon 参数互斥，只能使用其中一个'
    },
    {
      type: 'tip',
      title: '删除图标使用 Close 而非 Cancel',
      content: 'trailingIcon 通常使用 Icons.Default.Close 表示删除/移除操作'
    },
    {
      type: 'warning',
      title: 'selected 状态不同于 enabled',
      content: 'selected 表示激活状态，enabled 表示可交互状态，两者含义不同'
    },
    {
      type: 'tip',
      title: '配合输入框实现标签输入',
      content: 'InputChip 常配合 TextField 实现类似邮件收件人的标签输入功能'
    },
    {
      type: 'danger',
      title: '注意无障碍性',
      content: 'trailingIcon 的删除按钮必须提供 contentDescription，说明删除的是哪个标签'
    },
  ],

  relatedComponents: ['assist-chip', 'filter-chip', 'suggestion-chip'],
  since: '1.2.0',
}
