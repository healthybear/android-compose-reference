import type { ComponentEntry } from '../../types'

export const snackbarComponent: ComponentEntry = {
  id: 'snackbar',
  demo: { id: 'snackbar', sourceFile: 'SnackbarDemo.kt' },
  name: 'Snackbar / SnackbarHost',
  category: 'Feedback',
  description: 'Snackbar 是底部轻量级提示条，用于向用户反馈操作结果或提供简短信息。通过 SnackbarHostState 触发，配合 Scaffold 的 snackbarHost 插槽使用，支持操作按钮和自动消失。',
  tags: ['snackbar', 'toast', 'notification', 'feedback', 'message'],
  params: [
    { name: 'hostState', type: 'SnackbarHostState', required: true, description: 'SnackbarHost 的状态对象，用于触发和管理 Snackbar 显示' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: 'SnackbarHost 的修饰符' },
    { name: 'snackbar', type: '@Composable (SnackbarData) -> Unit', default: '{ Snackbar(it) }', description: '自定义 Snackbar 外观的组合函数' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `@Composable
fun BasicSnackbarScreen() {
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) { paddingValues ->
        Button(
            onClick = {
                scope.launch {
                    snackbarHostState.showSnackbar("操作成功")
                }
            },
            modifier = Modifier.padding(paddingValues)
        ) {
            Text("显示提示")
        }
    }
}`,
    },
    {
      title: '带操作按钮',
      code: `val snackbarHostState = remember { SnackbarHostState() }
val scope = rememberCoroutineScope()

Button(
    onClick = {
        scope.launch {
            val result = snackbarHostState.showSnackbar(
                message = "已删除 1 项",
                actionLabel = "撤销",
                duration = SnackbarDuration.Long
            )
            when (result) {
                SnackbarResult.ActionPerformed -> {
                    // 用户点击了"撤销"
                    undoDelete()
                }
                SnackbarResult.Dismissed -> {
                    // 用户滑动关闭或自动消失
                }
            }
        }
    }
) {
    Text("删除")
}`,
    },
    {
      title: '不同持续时间',
      code: `scope.launch {
    // 短暂显示（4秒）
    snackbarHostState.showSnackbar(
        message = "已保存",
        duration = SnackbarDuration.Short
    )
}

scope.launch {
    // 长时间显示（10秒）
    snackbarHostState.showSnackbar(
        message = "网络连接失败",
        actionLabel = "重试",
        duration = SnackbarDuration.Long
    )
}

scope.launch {
    // 无限显示（需手动关闭）
    snackbarHostState.showSnackbar(
        message = "请完成必填项",
        actionLabel = "知道了",
        duration = SnackbarDuration.Indefinite
    )
}`,
    },
    {
      title: '自定义 Snackbar 样式',
      code: `val snackbarHostState = remember { SnackbarHostState() }

Scaffold(
    snackbarHost = {
        SnackbarHost(snackbarHostState) { data ->
            Snackbar(
                snackbarData = data,
                containerColor = MaterialTheme.colorScheme.errorContainer,
                contentColor = MaterialTheme.colorScheme.onErrorContainer,
                actionColor = MaterialTheme.colorScheme.error
            )
        }
    }
) { paddingValues ->
    Button(
        onClick = {
            scope.launch {
                snackbarHostState.showSnackbar(
                    message = "操作失败，请重试",
                    actionLabel = "重试"
                )
            }
        },
        modifier = Modifier.padding(paddingValues)
    ) {
        Text("触发错误提示")
    }
}`,
    },
    {
      title: '多行文本 Snackbar',
      code: `scope.launch {
    snackbarHostState.showSnackbar(
        message = "您的文件已成功上传到云端存储，可以在"我的文件"中查看",
        actionLabel = "查看",
        duration = SnackbarDuration.Long,
        withDismissAction = true
    )
}`,
    },
    {
      title: '带关闭按钮的 Snackbar',
      code: `scope.launch {
    snackbarHostState.showSnackbar(
        message = "新版本可用",
        actionLabel = "更新",
        withDismissAction = true,  // 显示关闭按钮
        duration = SnackbarDuration.Indefinite
    )
}`,
    },
    {
      title: '连续显示多个 Snackbar',
      code: `val snackbarHostState = remember { SnackbarHostState() }
val scope = rememberCoroutineScope()

Column {
    Button(
        onClick = {
            scope.launch {
                // 新的 Snackbar 会排队等待
                snackbarHostState.showSnackbar("第一条消息")
            }
        }
    ) {
        Text("显示消息 1")
    }

    Button(
        onClick = {
            scope.launch {
                // 如果第一条还在显示，这条会等待
                snackbarHostState.showSnackbar("第二条消息")
            }
        }
    ) {
        Text("显示消息 2")
    }

    Button(
        onClick = {
            // 立即关闭当前 Snackbar
            snackbarHostState.currentSnackbarData?.dismiss()
        }
    ) {
        Text("关闭当前提示")
    }
}`,
    },
  ],

  useCases: [
    {
      title: '表单提交反馈',
      description: '表单提交后显示成功或失败提示',
      code: `@Composable
fun FormScreen(viewModel: FormViewModel) {
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()

    LaunchedEffect(viewModel.submitResult) {
        viewModel.submitResult?.let { result ->
            when (result) {
                is Success -> {
                    snackbarHostState.showSnackbar("提交成功")
                }
                is Error -> {
                    val snackbarResult = snackbarHostState.showSnackbar(
                        message = "提交失败: 网络错误",
                        actionLabel = "重试",
                        duration = SnackbarDuration.Long
                    )
                    if (snackbarResult == SnackbarResult.ActionPerformed) {
                        viewModel.retrySubmit()
                    }
                }
            }
        }
    }

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) { paddingValues ->
        FormContent(
            modifier = Modifier.padding(paddingValues),
            onSubmit = { viewModel.submit(it) }
        )
    }
}`
    },
    {
      title: '撤销删除操作',
      description: '删除后提供撤销选项',
      code: `@Composable
fun ItemListScreen(viewModel: ItemViewModel) {
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) { paddingValues ->
        LazyColumn(modifier = Modifier.padding(paddingValues)) {
            items(
                items = viewModel.items,
                key = { it.id }
            ) { item ->
                SwipeToDismissBox(
                    onDismissed = {
                        viewModel.deleteItem(item)
                        scope.launch {
                            val result = snackbarHostState.showSnackbar(
                                message = "已删除"任务项"",
                                actionLabel = "撤销",
                                duration = SnackbarDuration.Short
                            )
                            if (result == SnackbarResult.ActionPerformed) {
                                viewModel.restoreItem(item)
                            }
                        }
                    }
                ) {
                    ListItem(
                        headlineContent = { Text(item.name) }
                    )
                }
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: 'Snackbar 应简短明了',
      description: '消息控制在 1-2 行，避免冗长文本',
      goodExample: `snackbarHostState.showSnackbar("已保存")`,
      badExample: `snackbarHostState.showSnackbar(
    "您的更改已经成功保存到本地存储中，您可以随时返回查看和编辑"
)  // 过长`
    },
    {
      title: 'SnackbarHost 应放在 Scaffold 中',
      description: '使用 Scaffold 的 snackbarHost 插槽',
      goodExample: `Scaffold(
    snackbarHost = { SnackbarHost(snackbarHostState) }
) { paddingValues ->
    Content(Modifier.padding(paddingValues))
}`,
      badExample: `Box {
    Content()
    SnackbarHost(snackbarHostState)  // 可能被内容遮挡
}`
    },
    {
      title: '使用 rememberCoroutineScope',
      description: 'showSnackbar 是挂起函数，需要在协程中调用',
      goodExample: `val scope = rememberCoroutineScope()

Button(
    onClick = {
        scope.launch {
            snackbarHostState.showSnackbar("操作成功")
        }
    }
) { Text("提交") }`,
      badExample: `Button(
    onClick = {
        snackbarHostState.showSnackbar("操作成功")  // 编译错误
    }
) { Text("提交") }`
    },
    {
      title: '避免过度使用',
      description: '不要每个操作都显示 Snackbar',
      goodExample: `// 只在重要操作时显示
snackbarHostState.showSnackbar("文件已删除")`,
      badExample: `// 过度使用
snackbarHostState.showSnackbar("已点击按钮")
snackbarHostState.showSnackbar("已滚动到顶部")
snackbarHostState.showSnackbar("已切换标签")`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Snackbar 与 Toast 的区别',
      content: 'Snackbar 是 Material Design 规范的提示组件，支持操作按钮；Toast 是 Android 原生 API，只能显示文本'
    },
    {
      type: 'warning',
      title: 'showSnackbar 是挂起函数',
      content: 'showSnackbar 会挂起直到 Snackbar 消失或被关闭，需要在协程中调用。多次调用会排队依次显示'
    },
    {
      type: 'info',
      title: 'SnackbarDuration 三种时长',
      content: 'Short（4秒）、Long（10秒）、Indefinite（永久显示，需手动关闭）'
    },
    {
      type: 'info',
      title: '使用 withDismissAction 显示关闭按钮',
      content: 'withDismissAction = true 会在 Snackbar 右侧显示 X 关闭按钮'
    },
    {
      type: 'error',
      title: '避免在 Snackbar 中执行重要操作',
      content: 'Snackbar 会自动消失，不适合承载关键信息或操作。关键操作使用 AlertDialog'
    },
  ],

  relatedComponents: ['alert-dialog', 'scaffold'],
  since: '1.0.0',
}
