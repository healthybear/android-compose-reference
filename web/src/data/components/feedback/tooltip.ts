import type { ComponentEntry } from '../../types'

export const tooltipComponent: ComponentEntry = {
  id: 'tooltip',
  demo: { id: 'tooltip', sourceFile: 'TooltipDemo.kt' },
  name: 'TooltipBox',
  category: 'Feedback',
  description: 'TooltipBox 是气泡提示容器，长按或悬停时在目标组件附近显示提示信息。支持 PlainTooltip（纯文字提示）和 RichTooltip（带标题和操作按钮的富文本提示）。',
  tags: ['tooltip', 'hint', 'popup', 'longpress', 'hover'],
  params: [
    { name: 'tooltip', type: '@Composable TooltipScope.() -> Unit', required: true, description: 'Tooltip 内容，使用 PlainTooltip 或 RichTooltip' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: 'TooltipBox 的修饰符' },
    { name: 'state', type: 'TooltipState', default: 'rememberTooltipState()', description: 'Tooltip 显示状态，可程序控制显示/隐藏' },
    { name: 'positionProvider', type: 'PopupPositionProvider', default: 'TooltipDefaults.rememberPlainTooltipPositionProvider()', description: '气泡位置策略，决定气泡相对目标的位置' },
    { name: 'cursor', type: 'PointerIcon', default: 'PointerIcon.Default', description: '鼠标指针样式' },
    { name: 'enableUserInput', type: 'Boolean', default: 'true', description: '是否启用用户交互触发' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '触发 Tooltip 的目标组件，如 IconButton' },
  ],
  examples: [
    {
      title: '基础用法（PlainTooltip）',
      code: `TooltipBox(
    positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
    tooltip = {
        PlainTooltip {
            Text("删除")
        }
    },
    state = rememberTooltipState()
) {
    IconButton(onClick = { /* 删除 */ }) {
        Icon(
            Icons.Default.Delete,
            contentDescription = "删除"
        )
    }
}`,
    },
    {
      title: 'IconButton 工具栏提示',
      code: `Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    TooltipBox(
        positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
        tooltip = { PlainTooltip { Text("复制") } },
        state = rememberTooltipState()
    ) {
        IconButton(onClick = { /* 复制 */ }) {
            Icon(Icons.Default.ContentCopy, contentDescription = "复制")
        }
    }

    TooltipBox(
        positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
        tooltip = { PlainTooltip { Text("粘贴") } },
        state = rememberTooltipState()
    ) {
        IconButton(onClick = { /* 粘贴 */ }) {
            Icon(Icons.Default.ContentPaste, contentDescription = "粘贴")
        }
    }

    TooltipBox(
        positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
        tooltip = { PlainTooltip { Text("分享") } },
        state = rememberTooltipState()
    ) {
        IconButton(onClick = { /* 分享 */ }) {
            Icon(Icons.Default.Share, contentDescription = "分享")
        }
    }
}`,
    },
    {
      title: 'RichTooltip（富文本提示）',
      code: `TooltipBox(
    positionProvider = TooltipDefaults.rememberRichTooltipPositionProvider(),
    tooltip = {
        RichTooltip(
            title = { Text("格式化文本") },
            action = {
                TextButton(
                    onClick = { /* 了解更多 */ }
                ) {
                    Text("了解更多")
                }
            }
        ) {
            Text("将选中的文字应用 Markdown 格式。支持粗体、斜体、链接等。")
        }
    },
    state = rememberTooltipState(isPersistent = true)
) {
    IconButton(onClick = { /* 格式化 */ }) {
        Icon(
            Icons.Default.FormatBold,
            contentDescription = "格式化"
        )
    }
}`,
    },
    {
      title: '程序控制显示/隐藏',
      code: `val tooltipState = rememberTooltipState()
val scope = rememberCoroutineScope()

Column {
    Button(
        onClick = {
            scope.launch {
                tooltipState.show()
            }
        }
    ) {
        Text("显示提示")
    }

    Spacer(Modifier.height(16.dp))

    TooltipBox(
        positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
        tooltip = {
            PlainTooltip {
                Text("这是一个程序控制的提示")
            }
        },
        state = tooltipState
    ) {
        Box(
            modifier = Modifier
                .size(100.dp)
                .background(MaterialTheme.colorScheme.primaryContainer),
            contentAlignment = Alignment.Center
        ) {
            Text("目标")
        }
    }
}`,
    },
    {
      title: '不同位置的提示',
      code: `Column(
    verticalArrangement = Arrangement.spacedBy(16.dp),
    modifier = Modifier.padding(16.dp)
) {
    // 顶部提示
    TooltipBox(
        positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
        tooltip = { PlainTooltip { Text("顶部提示") } },
        state = rememberTooltipState()
    ) {
        Button(onClick = { }) {
            Text("顶部")
        }
    }

    // 底部提示
    TooltipBox(
        positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
        tooltip = { PlainTooltip { Text("底部提示") } },
        state = rememberTooltipState()
    ) {
        Button(onClick = { }) {
            Text("底部")
        }
    }
}`,
    },
    {
      title: 'FloatingActionButton 提示',
      code: `TooltipBox(
    positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
    tooltip = {
        PlainTooltip {
            Text("新建")
        }
    },
    state = rememberTooltipState()
) {
    FloatingActionButton(
        onClick = { /* 新建 */ }
    ) {
        Icon(
            Icons.Default.Add,
            contentDescription = "新建"
        )
    }
}`,
    },
    {
      title: '长文本提示',
      code: `TooltipBox(
    positionProvider = TooltipDefaults.rememberRichTooltipPositionProvider(),
    tooltip = {
        RichTooltip(
            title = { Text("功能说明") }
        ) {
            Text(
                "这是一个复杂功能的详细说明。" +
                "点击此按钮将执行一系列操作，包括数据验证、网络请求和UI更新。" +
                "操作可能需要几秒钟时间。",
                maxLines = 3,
                overflow = TextOverflow.Ellipsis
            )
        }
    },
    state = rememberTooltipState(isPersistent = true)
) {
    IconButton(onClick = { }) {
        Icon(
            Icons.Default.Info,
            contentDescription = "帮助"
        )
    }
}`,
    },
  ],

  useCases: [
    {
      title: '工具栏按钮提示',
      description: '为工具栏按钮提供功能说明',
      code: `@Composable
fun EditorToolbar() {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        horizontalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        val actions = listOf(
            Icons.Default.FormatBold to "粗体",
            Icons.Default.FormatItalic to "斜体",
            Icons.Default.FormatUnderlined to "下划线",
            Icons.Default.FormatListBulleted to "列表",
            Icons.Default.Link to "插入链接"
        )

        actions.forEach { (icon, label) ->
            TooltipBox(
                positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
                tooltip = { PlainTooltip { Text(label) } },
                state = rememberTooltipState()
            ) {
                IconButton(onClick = { /* 执行格式化 */ }) {
                    Icon(icon, contentDescription = label)
                }
            }
        }
    }
}`
    },
    {
      title: '功能引导提示',
      description: '首次使用时显示功能说明',
      code: `@Composable
fun NewFeatureButton() {
    val tooltipState = rememberTooltipState(
        isPersistent = true,
        initialIsVisible = true  // 首次自动显示
    )
    val scope = rememberCoroutineScope()

    TooltipBox(
        positionProvider = TooltipDefaults.rememberRichTooltipPositionProvider(),
        tooltip = {
            RichTooltip(
                title = { Text("新功能") },
                action = {
                    TextButton(
                        onClick = {
                            scope.launch { tooltipState.dismiss() }
                        }
                    ) {
                        Text("知道了")
                    }
                }
            ) {
                Text("点击这里可以快速访问最近使用的文件。")
            }
        },
        state = tooltipState
    ) {
        IconButton(onClick = { /* 打开最近文件 */ }) {
            Icon(
                Icons.Default.History,
                contentDescription = "最近文件"
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '简短的提示使用 PlainTooltip',
      description: '单行文字使用 PlainTooltip',
      goodExample: `TooltipBox(
    tooltip = { PlainTooltip { Text("删除") } },
    ...
) { IconButton(...) }`,
      badExample: `TooltipBox(
    tooltip = {
        RichTooltip {  // 简单文字不需要 RichTooltip
            Text("删除")
        }
    },
    ...
) { IconButton(...) }`
    },
    {
      title: '复杂内容使用 RichTooltip',
      description: '需要标题、多行文本或操作按钮时使用 RichTooltip',
      goodExample: `TooltipBox(
    tooltip = {
        RichTooltip(
            title = { Text("功能说明") },
            action = { TextButton(...) { Text("了解更多") } }
        ) {
            Text("详细的功能描述...")
        }
    },
    ...
) { }`,
    },
    {
      title: 'IconButton 应该提供 Tooltip',
      description: '没有文字标签的图标按钮应该有 Tooltip',
      goodExample: `TooltipBox(
    tooltip = { PlainTooltip { Text("设置") } },
    ...
) {
    IconButton(onClick = { }) {
        Icon(Icons.Default.Settings, contentDescription = "设置")
    }
}`,
      badExample: `IconButton(onClick = { }) {
    Icon(Icons.Default.Settings, contentDescription = "设置")
}  // 没有 Tooltip，用户不知道功能`
    },
    {
      title: 'Tooltip 文字应简洁',
      description: '提示文字应该简短明了',
      goodExample: `PlainTooltip { Text("保存") }`,
      badExample: `PlainTooltip {
    Text("点击此按钮可以保存您当前的所有更改")  // 过长
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Tooltip 默认长按触发',
      content: '移动端长按目标组件会显示 Tooltip；桌面端鼠标悬停会显示'
    },
    {
      type: 'warning',
      title: 'TooltipBox 需要包裹目标组件',
      content: 'TooltipBox 的 content 参数是被提示的目标组件，tooltip 参数是提示内容'
    },
    {
      type: 'info',
      title: 'PlainTooltip vs RichTooltip',
      content: 'PlainTooltip 用于简短文字提示；RichTooltip 支持标题、多行文本和操作按钮'
    },
    {
      type: 'info',
      title: 'isPersistent 控制持久显示',
      content: 'isPersistent = true 时，Tooltip 不会自动消失，需要用户手动关闭或点击操作按钮'
    },
    {
      type: 'error',
      title: '避免 Tooltip 中包含关键信息',
      content: 'Tooltip 是辅助提示，不应该包含用户必须看到的关键信息。关键信息应该直接显示在界面上'
    },
  ],

  relatedComponents: ['icon-button', 'floating-action-button'],
  since: '1.0.0',
}
