import type { ComponentEntry } from '../../types'

export const dropdownMenuComponent: ComponentEntry = {
  id: 'dropdown-menu',
  demo: { id: 'dropdown-menu', sourceFile: 'DropdownMenuDemo.kt' },
  name: 'DropdownMenu',
  category: 'Material',
  description: 'DropdownMenu 是下拉菜单，锚定在触发元素附近弹出，包含一组 DropdownMenuItem 操作项。常用于更多操作、选项选择、上下文菜单等场景。',
  tags: ['dropdown', 'menu', 'popup', 'context-menu', 'overflow'],
  params: [
    { name: 'expanded', type: 'Boolean', required: true, description: '是否展开显示菜单' },
    { name: 'onDismissRequest', type: '() -> Unit', required: true, description: '点击菜单外部或返回键时的关闭回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'offset', type: 'DpOffset', default: 'DpOffset(0.dp, 0.dp)', description: '相对锚点的偏移量' },
    { name: 'scrollState', type: 'ScrollState', default: 'rememberScrollState()', description: '滚动状态，菜单项过多时可滚动' },
    { name: 'properties', type: 'PopupProperties', default: 'PopupProperties(focusable = true)', description: '弹窗属性配置' },
    { name: 'content', type: '@Composable ColumnScope.() -> Unit', required: true, description: '菜单内容，通常为多个 DropdownMenuItem' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var expanded by remember { mutableStateOf(false) }

Box {
    IconButton(onClick = { expanded = true }) {
        Icon(
            Icons.Default.MoreVert,
            contentDescription = "更多"
        )
    }

    DropdownMenu(
        expanded = expanded,
        onDismissRequest = { expanded = false }
    ) {
        DropdownMenuItem(
            text = { Text("编辑") },
            onClick = {
                expanded = false
                // 执行编辑
            },
            leadingIcon = {
                Icon(
                    Icons.Default.Edit,
                    contentDescription = null
                )
            }
        )

        DropdownMenuItem(
            text = { Text("分享") },
            onClick = {
                expanded = false
                // 执行分享
            },
            leadingIcon = {
                Icon(
                    Icons.Default.Share,
                    contentDescription = null
                )
            }
        )

        DropdownMenuItem(
            text = { Text("删除") },
            onClick = {
                expanded = false
                // 执行删除
            },
            leadingIcon = {
                Icon(
                    Icons.Default.Delete,
                    contentDescription = null
                )
            }
        )
    }
}`,
    },
    {
      title: '带分割线的菜单',
      code: `var expanded by remember { mutableStateOf(false) }

Box {
    Button(onClick = { expanded = true }) {
        Text("操作")
        Icon(Icons.Default.ArrowDropDown, null)
    }

    DropdownMenu(
        expanded = expanded,
        onDismissRequest = { expanded = false }
    ) {
        DropdownMenuItem(
            text = { Text("复制") },
            onClick = { expanded = false }
        )

        DropdownMenuItem(
            text = { Text("粘贴") },
            onClick = { expanded = false }
        )

        HorizontalDivider()

        DropdownMenuItem(
            text = {
                Text(
                    "删除",
                    color = MaterialTheme.colorScheme.error
                )
            },
            onClick = { expanded = false }
        )
    }
}`,
    },
    {
      title: 'TopAppBar 溢出菜单',
      code: `@Composable
fun TopBarWithMenu() {
    var showMenu by remember { mutableStateOf(false) }

    TopAppBar(
        title = { Text("标题") },
        actions = {
            IconButton(onClick = { showMenu = true }) {
                Icon(
                    Icons.Default.MoreVert,
                    contentDescription = "更多选项"
                )
            }

            DropdownMenu(
                expanded = showMenu,
                onDismissRequest = { showMenu = false }
            ) {
                DropdownMenuItem(
                    text = { Text("刷新") },
                    onClick = {
                        showMenu = false
                        // 刷新
                    },
                    leadingIcon = {
                        Icon(Icons.Default.Refresh, null)
                    }
                )

                DropdownMenuItem(
                    text = { Text("设置") },
                    onClick = {
                        showMenu = false
                        // 打开设置
                    },
                    leadingIcon = {
                        Icon(Icons.Default.Settings, null)
                    }
                )

                HorizontalDivider()

                DropdownMenuItem(
                    text = { Text("关于") },
                    onClick = {
                        showMenu = false
                        // 打开关于
                    },
                    leadingIcon = {
                        Icon(Icons.Default.Info, null)
                    }
                )
            }
        }
    )
}`,
    },
    {
      title: '列表项上下文菜单',
      code: `@Composable
fun ListItemWithMenu(item: Item) {
    var showMenu by remember { mutableStateOf(false) }

    ListItem(
        headlineContent = { Text(item.title) },
        supportingContent = { Text(item.subtitle) },
        trailingContent = {
            Box {
                IconButton(onClick = { showMenu = true }) {
                    Icon(
                        Icons.Default.MoreVert,
                        contentDescription = "更多"
                    )
                }

                DropdownMenu(
                    expanded = showMenu,
                    onDismissRequest = { showMenu = false }
                ) {
                    DropdownMenuItem(
                        text = { Text("查看详情") },
                        onClick = {
                            showMenu = false
                            // 查看详情
                        }
                    )

                    DropdownMenuItem(
                        text = { Text("编辑") },
                        onClick = {
                            showMenu = false
                            // 编辑
                        }
                    )

                    DropdownMenuItem(
                        text = { Text("删除") },
                        onClick = {
                            showMenu = false
                            // 删除
                        }
                    )
                }
            }
        },
        modifier = Modifier.clickable { /* 点击列表项 */ }
    )
}`,
    },
    {
      title: '选择菜单',
      code: `var expanded by remember { mutableStateOf(false) }
var selectedOption by remember { mutableStateOf("选项一") }
val options = listOf("选项一", "选项二", "选项三", "选项四")

Box {
    OutlinedButton(
        onClick = { expanded = true }
    ) {
        Text(selectedOption)
        Spacer(Modifier.width(8.dp))
        Icon(
            Icons.Default.ArrowDropDown,
            contentDescription = null
        )
    }

    DropdownMenu(
        expanded = expanded,
        onDismissRequest = { expanded = false }
    ) {
        options.forEach { option ->
            DropdownMenuItem(
                text = { Text(option) },
                onClick = {
                    selectedOption = option
                    expanded = false
                },
                trailingIcon = {
                    if (option == selectedOption) {
                        Icon(
                            Icons.Default.Check,
                            contentDescription = null
                        )
                    }
                }
            )
        }
    }
}`,
    },
    {
      title: '自定义偏移量',
      code: `var expanded by remember { mutableStateOf(false) }

Box {
    Button(onClick = { expanded = true }) {
        Text("菜单")
    }

    DropdownMenu(
        expanded = expanded,
        onDismissRequest = { expanded = false },
        offset = DpOffset(8.dp, 4.dp)  // 向右 8dp，向下 4dp
    ) {
        DropdownMenuItem(
            text = { Text("选项 1") },
            onClick = { expanded = false }
        )
        DropdownMenuItem(
            text = { Text("选项 2") },
            onClick = { expanded = false }
        )
    }
}`,
    },
    {
      title: '禁用菜单项',
      code: `DropdownMenu(
    expanded = expanded,
    onDismissRequest = { expanded = false }
) {
    DropdownMenuItem(
        text = { Text("可用选项") },
        onClick = { expanded = false }
    )

    DropdownMenuItem(
        text = { Text("禁用选项") },
        onClick = { },
        enabled = false
    )

    DropdownMenuItem(
        text = { Text("另一个可用选项") },
        onClick = { expanded = false }
    )
}`,
    },
    {
      title: '带副标题的菜单项',
      code: `DropdownMenu(
    expanded = expanded,
    onDismissRequest = { expanded = false }
) {
    DropdownMenuItem(
        text = {
            Column {
                Text(
                    "通知",
                    style = MaterialTheme.typography.bodyLarge
                )
                Text(
                    "管理应用通知设置",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        },
        onClick = { expanded = false },
        leadingIcon = {
            Icon(Icons.Default.Notifications, null)
        }
    )

    DropdownMenuItem(
        text = {
            Column {
                Text(
                    "隐私",
                    style = MaterialTheme.typography.bodyLarge
                )
                Text(
                    "管理隐私和数据",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        },
        onClick = { expanded = false },
        leadingIcon = {
            Icon(Icons.Default.Lock, null)
        }
    )
}`,
    },
  ],

  useCases: [
    {
      title: '文本编辑器菜单',
      description: '格式化和编辑操作',
      code: `@Composable
fun TextEditorMenu() {
    var showMenu by remember { mutableStateOf(false) }

    Box {
        IconButton(onClick = { showMenu = true }) {
            Icon(Icons.Default.MoreVert, "更多")
        }

        DropdownMenu(
            expanded = showMenu,
            onDismissRequest = { showMenu = false }
        ) {
            DropdownMenuItem(
                text = { Text("撤销") },
                onClick = {
                    showMenu = false
                    // 撤销
                },
                leadingIcon = { Icon(Icons.Default.Undo, null) }
            )

            DropdownMenuItem(
                text = { Text("重做") },
                onClick = {
                    showMenu = false
                    // 重做
                },
                leadingIcon = { Icon(Icons.Default.Redo, null) }
            )

            HorizontalDivider()

            DropdownMenuItem(
                text = { Text("剪切") },
                onClick = {
                    showMenu = false
                    // 剪切
                },
                leadingIcon = { Icon(Icons.Default.ContentCut, null) }
            )

            DropdownMenuItem(
                text = { Text("复制") },
                onClick = {
                    showMenu = false
                    // 复制
                },
                leadingIcon = { Icon(Icons.Default.ContentCopy, null) }
            )

            DropdownMenuItem(
                text = { Text("粘贴") },
                onClick = {
                    showMenu = false
                    // 粘贴
                },
                leadingIcon = { Icon(Icons.Default.ContentPaste, null) }
            )

            HorizontalDivider()

            DropdownMenuItem(
                text = { Text("全选") },
                onClick = {
                    showMenu = false
                    // 全选
                },
                leadingIcon = { Icon(Icons.Default.SelectAll, null) }
            )
        }
    }
}`
    },
    {
      title: '排序和筛选菜单',
      description: '列表排序选项',
      code: `@Composable
fun SortMenu() {
    var showMenu by remember { mutableStateOf(false) }
    var sortBy by remember { mutableStateOf("日期") }

    Box {
        TextButton(onClick = { showMenu = true }) {
            Text("排序: $sortBy")
            Icon(Icons.Default.ArrowDropDown, null)
        }

        DropdownMenu(
            expanded = showMenu,
            onDismissRequest = { showMenu = false }
        ) {
            listOf("日期", "名称", "大小", "类型").forEach { option ->
                DropdownMenuItem(
                    text = { Text(option) },
                    onClick = {
                        sortBy = option
                        showMenu = false
                        // 应用排序
                    },
                    trailingIcon = {
                        if (option == sortBy) {
                            Icon(Icons.Default.Check, null)
                        }
                    }
                )
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: 'DropdownMenu 应该锚定在触发元素上',
      description: '将 DropdownMenu 和触发元素放在同一个 Box 中',
      goodExample: `Box {
    IconButton(onClick = { expanded = true }) {
        Icon(Icons.Default.MoreVert, null)
    }
    DropdownMenu(expanded = expanded, ...) { }
}`,
      badExample: `Column {
    IconButton(onClick = { expanded = true }) { }
    DropdownMenu(expanded = expanded, ...) { }  // 位置错误
}`
    },
    {
      title: '点击菜单项后关闭菜单',
      description: '执行操作前先关闭菜单',
      goodExample: `DropdownMenuItem(
    onClick = {
        expanded = false  // 先关闭
        executeAction()   // 再执行
    },
    ...
)`,
      badExample: `DropdownMenuItem(
    onClick = {
        executeAction()
        // 忘记关闭菜单
    },
    ...
)`
    },
    {
      title: 'onDismissRequest 必须关闭菜单',
      description: '确保用户可以通过点击外部关闭菜单',
      goodExample: `DropdownMenu(
    expanded = expanded,
    onDismissRequest = { expanded = false }
) { }`,
      badExample: `DropdownMenu(
    expanded = expanded,
    onDismissRequest = { }  // 空实现，无法关闭
) { }`
    },
    {
      title: '危险操作使用分割线隔离',
      description: '删除等危险操作应该与其他选项分开',
      goodExample: `DropdownMenu(...) {
    DropdownMenuItem(text = { Text("编辑") }, ...)
    DropdownMenuItem(text = { Text("分享") }, ...)
    HorizontalDivider()
    DropdownMenuItem(
        text = { Text("删除", color = error) },
        ...
    )
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'DropdownMenu 自动定位',
      content: 'DropdownMenu 会自动定位在触发元素附近，默认在下方，空间不足时会自动调整到上方或其他位置'
    },
    {
      type: 'warning',
      title: 'DropdownMenu 需要 Box 包裹',
      content: 'DropdownMenu 必须和触发元素放在同一个 Box 中，才能正确定位'
    },
    {
      type: 'info',
      title: 'offset 参数调整位置',
      content: '使用 offset 参数可以微调菜单相对于锚点的位置，DpOffset(x, y) 中 x 向右为正，y 向下为正'
    },
    {
      type: 'info',
      title: 'DropdownMenuItem 支持三行布局',
      content: 'DropdownMenuItem 支持 leadingIcon、text、trailingIcon 三个插槽，可以创建丰富的菜单项'
    },
    {
      type: 'error',
      title: '避免菜单项过多',
      content: '菜单项过多会导致菜单过长，超过 7 个选项应该考虑其他方案，如 ModalBottomSheet'
    },
  ],

  relatedComponents: ['icon-button', 'modal-bottom-sheet', 'list-item'],
  since: '1.0.0',
}
