import type { ComponentEntry } from '../../types'

export const iconButtonComponent: ComponentEntry = {
  id: 'icon-button',
  demo: { id: 'icon-button', sourceFile: 'IconButtonDemo.kt' },
  name: 'IconButton',
  category: 'Material',
  description: 'IconButton 是仅包含图标的可点击按钮，无背景填充。常用于工具栏、AppBar、卡片等场景的操作按钮。点击时显示涟漪效果，自动满足最小触摸目标尺寸（48dp）。',
  tags: ['button', 'icon', 'toolbar', 'action', 'clickable'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、内边距等' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互，false 时禁用点击并显示禁用样式' },
    { name: 'colors', type: 'IconButtonColors', default: 'IconButtonDefaults.iconButtonColors()', description: '颜色配置（内容色/容器色/禁用色）' },
    { name: 'interactionSource', type: 'MutableInteractionSource?', default: 'null', description: '交互状态源，用于监听按下、悬停等状态' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '图标内容，通常为 Icon 组件' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `IconButton(onClick = { /* 搜索 */ }) {
    Icon(Icons.Default.Search, contentDescription = "搜索")
}`,
    },
    {
      title: 'AppBar 中的操作按钮',
      code: `TopAppBar(
    title = { Text("页面标题") },
    navigationIcon = {
        IconButton(onClick = { navController.popBackStack() }) {
            Icon(
                Icons.AutoMirrored.Filled.ArrowBack,
                contentDescription = "返回"
            )
        }
    },
    actions = {
        IconButton(onClick = { /* 搜索 */ }) {
            Icon(Icons.Default.Search, contentDescription = "搜索")
        }
        IconButton(onClick = { /* 更多 */ }) {
            Icon(Icons.Default.MoreVert, contentDescription = "更多")
        }
    }
)`,
    },
    {
      title: '切换按钮（收藏/取消收藏）',
      code: `var isFavorite by remember { mutableStateOf(false) }

IconButton(onClick = { isFavorite = !isFavorite }) {
    Icon(
        imageVector = if (isFavorite) Icons.Filled.Favorite
                      else Icons.Outlined.FavoriteBorder,
        contentDescription = if (isFavorite) "取消收藏" else "收藏",
        tint = if (isFavorite) Color.Red else LocalContentColor.current
    )
}`,
    },
    {
      title: 'FilledIconButton 变体',
      code: `// 填充样式（带背景色）
FilledIconButton(
    onClick = { /* 添加 */ },
    colors = IconButtonDefaults.filledIconButtonColors(
        containerColor = MaterialTheme.colorScheme.primary
    )
) {
    Icon(
        Icons.Default.Add,
        contentDescription = "添加",
        tint = MaterialTheme.colorScheme.onPrimary
    )
}`,
    },
    {
      title: 'OutlinedIconButton 变体',
      code: `// 描边样式
OutlinedIconButton(onClick = { /* 编辑 */ }) {
    Icon(Icons.Default.Edit, contentDescription = "编辑")
}`,
    },
    {
      title: 'FilledTonalIconButton 变体',
      code: `// 色调填充样式（使用主题色容器）
FilledTonalIconButton(onClick = { /* 分享 */ }) {
    Icon(Icons.Default.Share, contentDescription = "分享")
}`,
    },
    {
      title: '禁用状态',
      code: `var processing by remember { mutableStateOf(false) }

IconButton(
    onClick = {
        processing = true
        // 执行操作...
    },
    enabled = !processing
) {
    if (processing) {
        CircularProgressIndicator(
            modifier = Modifier.size(24.dp),
            strokeWidth = 2.dp
        )
    } else {
        Icon(Icons.Default.Send, contentDescription = "发送")
    }
}`,
    },
  ],

  useCases: [
    {
      title: '卡片操作按钮组',
      description: '在卡片中使用 IconButton 提供快捷操作',
      code: `@Composable
fun ActionCard(
    title: String,
    onEdit: () -> Unit,
    onDelete: () -> Unit,
    onShare: () -> Unit
) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                title,
                style = MaterialTheme.typography.titleMedium
            )
            Spacer(Modifier.height(8.dp))
            Row(
                horizontalArrangement = Arrangement.End,
                modifier = Modifier.fillMaxWidth()
            ) {
                IconButton(onClick = onEdit) {
                    Icon(Icons.Default.Edit, contentDescription = "编辑")
                }
                IconButton(onClick = onShare) {
                    Icon(Icons.Default.Share, contentDescription = "分享")
                }
                IconButton(onClick = onDelete) {
                    Icon(
                        Icons.Default.Delete,
                        contentDescription = "删除",
                        tint = MaterialTheme.colorScheme.error
                    )
                }
            }
        }
    }
}`
    },
    {
      title: '带下拉菜单的更多按钮',
      description: '结合 DropdownMenu 实现更多操作菜单',
      code: `@Composable
fun MoreActionsButton(actions: List<Action>) {
    var expanded by remember { mutableStateOf(false) }

    Box {
        IconButton(onClick = { expanded = true }) {
            Icon(Icons.Default.MoreVert, contentDescription = "更多")
        }

        DropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            actions.forEach { action ->
                DropdownMenuItem(
                    text = { Text(action.label) },
                    onClick = {
                        action.onClick()
                        expanded = false
                    },
                    leadingIcon = {
                        Icon(action.icon, contentDescription = null)
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
      title: '始终提供 contentDescription',
      description: 'IconButton 依赖图标传达含义，必须为无障碍用户提供描述',
      goodExample: `IconButton(onClick = { delete() }) {
    Icon(
        Icons.Default.Delete,
        contentDescription = "删除"  // 明确说明功能
    )
}`,
      badExample: `IconButton(onClick = { delete() }) {
    Icon(
        Icons.Default.Delete,
        contentDescription = null  // 屏幕阅读器无法识别
    )
}`
    },
    {
      title: '使用语义化图标',
      description: '选择能清晰传达功能的图标',
      goodExample: `// 使用标准 Material 图标
IconButton(onClick = { search() }) {
    Icon(Icons.Default.Search, contentDescription = "搜索")
}`,
      badExample: `// 使用含义模糊的图标
IconButton(onClick = { search() }) {
    Icon(Icons.Default.Circle, contentDescription = "搜索")
}`
    },
    {
      title: '区分不同风格的使用场景',
      description: '根据重要性和上下文选择合适的 IconButton 变体',
      goodExample: `// 主要操作：使用 FilledIconButton
FilledIconButton(onClick = { confirm() }) {
    Icon(Icons.Default.Check, contentDescription = "确认")
}

// 次要操作：使用普通 IconButton
IconButton(onClick = { cancel() }) {
    Icon(Icons.Default.Close, contentDescription = "取消")
}`,
    },
    {
      title: '避免在 IconButton 中放置文本',
      description: 'IconButton 专为图标设计，文本应使用 TextButton',
      goodExample: `IconButton(onClick = { }) {
    Icon(Icons.Default.Add, contentDescription = "添加")
}`,
      badExample: `IconButton(onClick = { }) {
    Text("添加")  // 文本在 IconButton 中显示异常
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'IconButton 自动满足最小触摸目标',
      content: 'IconButton 默认尺寸为 48dp x 48dp，满足无障碍最小触摸目标要求。即使图标较小，点击区域仍为 48dp'
    },
    {
      type: 'warning',
      title: 'IconButton 不显示工具提示',
      content: 'IconButton 本身不提供悬停工具提示。如需提示文本，使用 TooltipBox 包裹（桌面端）'
    },
    {
      type: 'info',
      title: '使用 IconToggleButton 实现状态切换',
      content: 'IconToggleButton 专为双态切换设计（如静音/取消静音），比手动管理状态的 IconButton 更语义化'
    },
    {
      type: 'info',
      title: '四种 IconButton 变体',
      content: 'IconButton（无背景）、FilledIconButton（填充背景）、FilledTonalIconButton（色调背景）、OutlinedIconButton（描边）'
    },
    {
      type: 'error',
      title: '注意颜色对比度',
      content: '使用自定义颜色时，确保图标与背景有足够对比度（至少 4.5:1），特别是 FilledIconButton'
    },
  ],

  relatedComponents: ['button', 'icon', 'floating-action-button'],
  since: '1.0.0',
}
