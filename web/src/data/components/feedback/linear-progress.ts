import type { ComponentEntry } from '../../types'

export const linearProgressComponent: ComponentEntry = {
  id: 'linear-progress',
  demo: { id: 'linear-progress', sourceFile: 'LinearProgressDemo.kt' },
  name: 'LinearProgressIndicator',
  category: 'Feedback',
  description: 'LinearProgressIndicator 是线性进度条，支持确定进度（0-100%）和不确定滑动动画。常用于页面顶部加载提示、文件上传/下载进度、任务完成度展示。',
  tags: ['progress', 'loading', 'indicator', 'linear', 'progressbar'],
  params: [
    { name: 'progress', type: '(() -> Float)?', default: 'null', description: '进度值函数，返回 0f~1f；null 时显示不确定滑动动画' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，通常使用 fillMaxWidth() 占满宽度' },
    { name: 'color', type: 'Color', default: 'ProgressIndicatorDefaults.linearColor', description: '进度条颜色' },
    { name: 'trackColor', type: 'Color', default: 'ProgressIndicatorDefaults.linearTrackColor', description: '轨道背景色（确定进度时可见）' },
    { name: 'strokeCap', type: 'StrokeCap', default: 'ProgressIndicatorDefaults.LinearStrokeCap', description: '端点形状（Round/Butt/Square）' },
    { name: 'gapSize', type: 'Dp', default: '0.dp', description: '进度条和轨道之间的间隙' },
  ],
  examples: [
    {
      title: '不确定进度（加载中）',
      code: `// 默认滑动动画，用于未知加载时间
LinearProgressIndicator(
    modifier = Modifier.fillMaxWidth()
)`,
    },
    {
      title: '确定进度',
      code: `var progress by remember { mutableFloatStateOf(0.3f) }

Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    LinearProgressIndicator(
        progress = { progress },
        modifier = Modifier.fillMaxWidth()
    )
    Text("30%")
    Slider(
        value = progress,
        onValueChange = { progress = it }
    )
}`,
    },
    {
      title: '页面顶部加载指示器',
      code: `@Composable
fun ScreenWithLoading(isLoading: Boolean) {
    Column {
        if (isLoading) {
            LinearProgressIndicator(
                modifier = Modifier.fillMaxWidth()
            )
        }

        // 页面内容
        LazyColumn(modifier = Modifier.fillMaxSize()) {
            items(100) { index ->
                ListItem(
                    headlineContent = { Text("Item $index") }
                )
            }
        }
    }
}`,
    },
    {
      title: '文件上传进度',
      code: `var uploadProgress by remember { mutableFloatStateOf(0f) }

Card(modifier = Modifier.fillMaxWidth()) {
    Column(modifier = Modifier.padding(16.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text("正在上传 image.jpg")
            Text("45%")
        }

        Spacer(Modifier.height(8.dp))

        LinearProgressIndicator(
            progress = { uploadProgress },
            modifier = Modifier.fillMaxWidth()
        )
    }
}`,
    },
    {
      title: '自定义颜色和样式',
      code: `Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
    // 成功色
    LinearProgressIndicator(
        progress = { 0.8f },
        modifier = Modifier.fillMaxWidth(),
        color = MaterialTheme.colorScheme.tertiary,
        trackColor = MaterialTheme.colorScheme.tertiaryContainer
    )

    // 警告色
    LinearProgressIndicator(
        progress = { 0.5f },
        modifier = Modifier.fillMaxWidth(),
        color = Color(0xFFFFA726)
    )

    // 错误色
    LinearProgressIndicator(
        progress = { 0.2f },
        modifier = Modifier.fillMaxWidth(),
        color = MaterialTheme.colorScheme.error
    )
}`,
    },
    {
      title: '多任务进度',
      code: `data class Task(val name: String, var progress: Float)

@Composable
fun TasksProgress(tasks: List<Task>) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        tasks.forEach { task ->
            Column {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        task.name,
                        style = MaterialTheme.typography.bodyMedium
                    )
                    Text(
                        "75%",
                        style = MaterialTheme.typography.bodySmall
                    )
                }

                Spacer(Modifier.height(4.dp))

                LinearProgressIndicator(
                    progress = { task.progress },
                    modifier = Modifier.fillMaxWidth()
                )
            }
        }
    }
}`,
    },
    {
      title: '下拉刷新指示器',
      code: `@Composable
fun RefreshableContent() {
    var isRefreshing by remember { mutableStateOf(false) }
    val pullRefreshState = rememberPullRefreshState(
        refreshing = isRefreshing,
        onRefresh = {
            isRefreshing = true
            // 执行刷新操作
        }
    )

    Box(Modifier.pullRefresh(pullRefreshState)) {
        LazyColumn(Modifier.fillMaxSize()) {
            items(items) { item ->
                ListItem(
                    headlineContent = { Text(item.title) }
                )
            }
        }

        if (isRefreshing) {
            LinearProgressIndicator(
                modifier = Modifier
                    .fillMaxWidth()
                    .align(Alignment.TopCenter)
            )
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '网络请求加载',
      description: '在数据加载时显示进度',
      code: `@Composable
fun DataLoadingScreen(viewModel: DataViewModel) {
    val uiState by viewModel.uiState.collectAsState()

    Column {
        if (uiState.isLoading) {
            LinearProgressIndicator(
                modifier = Modifier.fillMaxWidth()
            )
        }

        when (val data = uiState.data) {
            is Success -> DataList(data.value)
            is Error -> ErrorMessage(data.message)
            else -> EmptyState()
        }
    }
}`
    },
    {
      title: '表单提交进度',
      description: '表单提交时显示进度',
      code: `@Composable
fun FormWithProgress() {
    var isSubmitting by remember { mutableStateOf(false) }

    Column(modifier = Modifier.padding(16.dp)) {
        if (isSubmitting) {
            LinearProgressIndicator(
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(Modifier.height(8.dp))
        }

        OutlinedTextField(
            value = name,
            onValueChange = { name = it },
            label = { Text("姓名") },
            enabled = !isSubmitting,
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(Modifier.height(16.dp))

        Button(
            onClick = {
                isSubmitting = true
                // 提交表单
            },
            enabled = !isSubmitting,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(if (isSubmitting) "提交中..." else "提交")
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 fillMaxWidth() 占满宽度',
      description: 'LinearProgressIndicator 应该占满容器宽度',
      goodExample: `LinearProgressIndicator(
    modifier = Modifier.fillMaxWidth()
)`,
      badExample: `LinearProgressIndicator()  // 默认宽度过小`
    },
    {
      title: '能计算进度时使用确定进度',
      description: '提供更好的用户体验',
      goodExample: `LinearProgressIndicator(
    progress = { uploadProgress },
    modifier = Modifier.fillMaxWidth()
)`,
      badExample: `LinearProgressIndicator(
    modifier = Modifier.fillMaxWidth()
)  // 已知进度却显示不确定动画`
    },
    {
      title: '页面加载指示器放在顶部',
      description: '符合用户习惯',
      goodExample: `Column {
    if (isLoading) {
        LinearProgressIndicator(Modifier.fillMaxWidth())
    }
    Content()
}`,
      badExample: `Column {
    Content()
    if (isLoading) {
        LinearProgressIndicator(Modifier.fillMaxWidth())
    }
}`
    },
    {
      title: '使用颜色表达进度状态',
      description: '低进度用错误色，高进度用成功色',
      goodExample: `LinearProgressIndicator(
    progress = { progress },
    color = when {
        progress < 0.3f -> MaterialTheme.colorScheme.error
        progress < 0.7f -> Color(0xFFFFA726)
        else -> MaterialTheme.colorScheme.tertiary
    },
    modifier = Modifier.fillMaxWidth()
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'progress 参数类型',
      content: 'progress 是函数类型 (() -> Float)，而非直接的 Float 值，这样可以避免不必要的重组'
    },
    {
      type: 'warning',
      title: 'progress 值范围',
      content: 'progress 必须在 0f~1f 之间，超出范围会被截断。0f 表示 0%，1f 表示 100%'
    },
    {
      type: 'info',
      title: '默认高度为 4dp',
      content: 'LinearProgressIndicator 默认高度 4dp，符合 Material Design 规范，一般无需调整'
    },
    {
      type: 'info',
      title: '线性进度条适合页面级加载',
      content: '页面级加载使用 LinearProgressIndicator；局部加载（按钮、列表项）使用 CircularProgressIndicator'
    },
    {
      type: 'error',
      title: '避免嵌套在滚动容器中',
      content: '进度条应固定在顶部，不应随内容滚动。使用 Scaffold 或固定布局'
    },
  ],

  relatedComponents: ['circular-progress', 'button'],
  since: '1.0.0',
}
