import type { ComponentEntry } from '../../types'

export const selectionContainerComponent: ComponentEntry = {
  id: 'selection-container',
  name: 'SelectionContainer',
  category: 'Foundation',
  description: '文字选择容器，包裹 Text 后用户可长按选中文字并复制，默认情况下 Compose 的 Text 不可选中。',
  tags: ['selection', 'copy', 'text', 'selectable', '文字选择'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'selection', type: 'Selection?', default: 'null', description: '当前选中范围，配合 onSelectionChange 实现受控模式' },
    { name: 'onSelectionChange', type: '(Selection?) -> Unit', default: '{}', description: '选中范围变化回调' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '包含可选中文字的内容' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `SelectionContainer {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("这段文字可以被选中并复制。", style = MaterialTheme.typography.bodyLarge)
        Spacer(Modifier.height(8.dp))
        Text("长按即可选择文字范围。", style = MaterialTheme.typography.bodyMedium)
    }
}`,
    },
    {
      title: '禁用部分文字选择',
      code: `SelectionContainer {
    Column {
        Text("这段文字可以选中")
        // DisableSelection 可以在 SelectionContainer 内部禁用特定区域
        DisableSelection {
            Text("这段文字不可选中", color = MaterialTheme.colorScheme.outline)
        }
        Text("这段文字也可以选中")
    }
}`,
    },
    {
      title: '多段落文字选择',
      code: `SelectionContainer {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(
            text = "第一段：Jetpack Compose 是 Android 的现代原生界面工具包。",
            style = MaterialTheme.typography.bodyLarge
        )
        Text(
            text = "第二段：它使用声明式 API 简化并加速 Android 上的界面开发。",
            style = MaterialTheme.typography.bodyMedium
        )
        Text(
            text = "第三段：使用更少的代码、强大的工具和直观的 Kotlin API，快速打造生动而精彩的应用。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.secondary
        )
    }
}`,
    },
    {
      title: '结合 LazyColumn 使用',
      code: `LazyColumn(modifier = Modifier.fillMaxSize()) {
    item {
        SelectionContainer {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "文章标题",
                    style = MaterialTheme.typography.headlineMedium,
                    fontWeight = FontWeight.Bold
                )
                Spacer(Modifier.height(8.dp))
                Text(
                    text = "这是一篇长文章的内容，用户可以长按选择并复制任意文字段落。" +
                           "SelectionContainer 可以包裹多个 Text 组件，实现跨 Text 选择。",
                    style = MaterialTheme.typography.bodyLarge
                )
            }
        }
    }
    items(10) { index ->
        DisableSelection {
            ListItem(
                headlineContent = { Text("列表项 " + index.toString()) },
                supportingContent = { Text("这些列表项不可选中") }
            )
        }
    }
}`,
    },
    {
      title: '监听选择变化',
      code: `var selectedText by remember { mutableStateOf("") }

Column {
    SelectionContainer(
        modifier = Modifier.padding(16.dp)
    ) {
        Text(
            text = "长按选择这段文字，下方会显示选中内容的长度信息。" +
                   "SelectionContainer 可以监听用户的文字选择行为。",
            style = MaterialTheme.typography.bodyLarge
        )
    }

    HorizontalDivider()

    // 显示选择信息
    Surface(
        modifier = Modifier.fillMaxWidth(),
        color = MaterialTheme.colorScheme.secondaryContainer
    ) {
        Text(
            text = if (selectedText.isEmpty()) "未选择文字"
                   else "已选择 " + selectedText.length.toString() + " 个字符",
            modifier = Modifier.padding(16.dp),
            style = MaterialTheme.typography.bodyMedium
        )
    }
}`,
    },
    {
      title: '富文本内容选择',
      code: `SelectionContainer {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text(
            text = buildAnnotatedString {
                withStyle(style = SpanStyle(fontWeight = FontWeight.Bold)) {
                    append("粗体文字")
                }
                append(" 普通文字 ")
                withStyle(style = SpanStyle(color = Color.Blue)) {
                    append("蓝色文字")
                }
                append(" ")
                withStyle(style = SpanStyle(fontSize = 20.sp)) {
                    append("大号文字")
                }
            }
        )

        Text(
            text = buildAnnotatedString {
                append("支持 ")
                withStyle(style = SpanStyle(textDecoration = TextDecoration.Underline)) {
                    append("下划线")
                }
                append(" 和 ")
                withStyle(style = SpanStyle(textDecoration = TextDecoration.LineThrough)) {
                    append("删除线")
                }
            }
        )
    }
}`,
    },
    {
      title: '卡片内容选择',
      code: `Card(
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp),
    elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
) {
    SelectionContainer {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = "通知标题",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold
            )
            Spacer(Modifier.height(8.dp))
            Text(
                text = "这是通知的详细内容。用户可以长按选择并复制通知内容，" +
                       "方便分享或保存重要信息。",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Spacer(Modifier.height(8.dp))
            DisableSelection {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.End
                ) {
                    TextButton(onClick = { }) { Text("忽略") }
                    TextButton(onClick = { }) { Text("查看") }
                }
            }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '文章阅读器',
      description: '实现文章内容的长按选择和复制功能',
      code: `@Composable
fun ArticleReader() {
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("文章阅读") })
        }
    ) { padding ->
        LazyColumn(
            contentPadding = padding,
            modifier = Modifier.fillMaxSize()
        ) {
            item {
                SelectionContainer {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        Text(
                            text = "Jetpack Compose 入门指南",
                            style = MaterialTheme.typography.headlineLarge,
                            fontWeight = FontWeight.Bold
                        )

                        Text(
                            text = "作者：Android 开发团队 | 2024年1月",
                            style = MaterialTheme.typography.labelMedium,
                            color = MaterialTheme.colorScheme.secondary
                        )

                        HorizontalDivider()

                        Text(
                            text = "Jetpack Compose 是 Android 的现代工具包，" +
                                   "用于构建原生界面。它简化并加速 Android 上的界面开发，" +
                                   "使用更少的代码、强大的工具和直观的 Kotlin API，" +
                                   "快速让应用生动而精彩地呈现出来。",
                            style = MaterialTheme.typography.bodyLarge,
                            lineHeight = 28.sp
                        )

                        Text(
                            text = "声明式编程范式",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.SemiBold
                        )

                        Text(
                            text = "Compose 采用声明式 API，这意味着您只需描述界面的外观和状态，" +
                                   "框架会自动处理界面更新。当状态发生变化时，" +
                                   "Compose 会重新执行可组合函数，高效地更新界面。",
                            style = MaterialTheme.typography.bodyLarge,
                            lineHeight = 28.sp
                        )
                    }
                }
            }

            item {
                DisableSelection {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp)
                    ) {
                        Text(
                            text = "相关文章",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(Modifier.height(8.dp))
                        repeat(3) { index ->
                            Card(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(vertical = 4.dp),
                                onClick = { }
                            ) {
                                Text(
                                    text = "推荐文章 " + (index + 1).toString(),
                                    modifier = Modifier.padding(16.dp)
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}`
    },
    {
      title: '聊天消息选择',
      description: '聊天应用中实现消息文字的选择和复制',
      code: `data class Message(val text: String, val isFromMe: Boolean)

@Composable
fun ChatScreen() {
    val messages = remember {
        listOf(
            Message("你好，最近怎么样？", false),
            Message("挺好的，正在学习 Jetpack Compose", true),
            Message("那太好了！有什么心得可以分享吗？", false),
            Message("Compose 的声明式 API 真的很直观，开发效率提升了不少。", true)
        )
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(messages) { message ->
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = if (message.isFromMe) {
                    Arrangement.End
                } else {
                    Arrangement.Start
                }
            ) {
                Card(
                    colors = CardDefaults.cardColors(
                        containerColor = if (message.isFromMe) {
                            MaterialTheme.colorScheme.primaryContainer
                        } else {
                            MaterialTheme.colorScheme.surfaceVariant
                        }
                    ),
                    shape = RoundedCornerShape(
                        topStart = 16.dp,
                        topEnd = 16.dp,
                        bottomStart = if (message.isFromMe) 16.dp else 4.dp,
                        bottomEnd = if (message.isFromMe) 4.dp else 16.dp
                    ),
                    modifier = Modifier.widthIn(max = 280.dp)
                ) {
                    SelectionContainer {
                        Text(
                            text = message.text,
                            modifier = Modifier.padding(12.dp),
                            style = MaterialTheme.typography.bodyLarge
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
      title: '在合适的范围使用 SelectionContainer',
      description: '只在需要文字选择的区域使用，避免包裹整个屏幕导致不必要的交互',
      goodExample: `Column {
    SelectionContainer {
        Text("这段文字可以选择")
    }
    Button(onClick = { }) {
        Text("按钮正常工作")
    }
}`,
      badExample: `SelectionContainer {
    Column {
        Text("文字")
        Button(onClick = { }) {
            // SelectionContainer 可能影响按钮点击
            Text("按钮")
        }
    }
}`,
    },
    {
      title: '使用 DisableSelection 排除交互元素',
      description: '在 SelectionContainer 内部使用 DisableSelection 包裹按钮等交互元素',
      goodExample: `SelectionContainer {
    Column {
        Text("可选择的文字内容")
        DisableSelection {
            Row {
                TextButton(onClick = { }) { Text("操作") }
                TextButton(onClick = { }) { Text("分享") }
            }
        }
    }
}`,
      badExample: `SelectionContainer {
    Column {
        Text("可选择的文字内容")
        // 按钮可能难以点击
        Row {
            TextButton(onClick = { }) { Text("操作") }
            TextButton(onClick = { }) { Text("分享") }
        }
    }
}`,
    },
    {
      title: '在列表中谨慎使用',
      description: '在 LazyColumn 中使用时注意性能，考虑只在必要的 item 中使用',
      goodExample: `LazyColumn {
    item {
        // 只在文章内容项使用
        SelectionContainer {
            Text(articleContent)
        }
    }
    items(comments) { comment ->
        // 评论不需要选择功能
        Text(comment)
    }
}`,
    },
    {
      title: '配合 AnnotatedString 使用',
      description: 'SelectionContainer 完全支持富文本选择',
      goodExample: `SelectionContainer {
    Text(
        text = buildAnnotatedString {
            withStyle(SpanStyle(fontWeight = FontWeight.Bold)) {
                append("重点内容")
            }
            append(" 普通内容")
        }
    )
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: '默认 Text 不可选择',
      content: 'Compose 的 Text 组件默认不可选择，必须包裹在 SelectionContainer 中才能长按选择文字'
    },
    {
      type: 'info',
      title: '跨 Text 组件选择',
      content: 'SelectionContainer 内的多个 Text 可以连续选择，选择范围可以跨越不同的 Text 组件'
    },
    {
      type: 'info',
      title: '使用 DisableSelection 排除区域',
      content: '在 SelectionContainer 内部使用 DisableSelection 可以禁用特定区域的文字选择，适用于按钮、链接等交互元素'
    },
    {
      type: 'info',
      title: '选择后自动显示系统菜单',
      content: '选择文字后会自动弹出系统的复制菜单，无需额外代码即可实现复制功能'
    },
    {
      type: 'warning',
      title: '可能影响触摸交互',
      content: 'SelectionContainer 会拦截长按手势，可能影响内部其他需要长按的组件，必要时使用 DisableSelection 排除'
    },
    {
      type: 'warning',
      title: '性能考虑',
      content: '包含大量文字的 SelectionContainer 可能影响性能，建议只在必要的区域使用，避免包裹整个屏幕'
    },
  ],

  relatedComponents: ['text'],
  since: '1.0.0',
}
