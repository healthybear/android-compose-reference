import type { ComponentEntry } from '../../types'

export const animatedContentComponent: ComponentEntry = {
  id: 'animated-content',
  demo: { id: 'animated-content', sourceFile: 'AnimatedContentDemo.kt' },
  name: 'AnimatedContent',
  category: 'Animation',
  description: '当目标状态变化时，为内容切换添加丰富的动画过渡效果，支持滑动、缩放、旋转等多种组合。比 Crossfade 更强大，适合复杂的内容切换场景。',
  tags: ['animation', 'content', 'transition', 'slide', '内容切换动画'],
  params: [
    { name: 'targetState', type: 'S', required: true, description: '目标状态，状态变化时触发动画' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'transitionSpec', type: 'AnimatedContentTransitionScope<S>.() -> ContentTransform', default: 'fadeIn() togetherWith fadeOut()', description: '进入/退出动画规格，使用 togetherWith 组合' },
    { name: 'contentAlignment', type: 'Alignment', default: 'Alignment.TopStart', description: '内容对齐方式，影响滑动方向计算' },
    { name: 'label', type: 'String', default: '"AnimatedContent"', description: '调试标签，用于调试工具识别' },
    { name: 'contentKey', type: '(S) -> Any?', default: '{ it }', description: '内容的唯一标识，用于优化性能' },
    { name: 'content', type: '@Composable AnimatedContentScope.(S) -> Unit', required: true, description: '根据目标状态渲染的内容' },
  ],
  examples: [
    {
      title: '数字计数动画',
      code: `var count by remember { mutableIntStateOf(0) }

Row(verticalAlignment = Alignment.CenterVertically) {
    IconButton(onClick = { count-- }) {
        Icon(Icons.Default.Remove, null)
    }

    AnimatedContent(
        targetState = count,
        transitionSpec = {
            // 根据变化方向选择动画
            if (targetState > initialState) {
                slideInVertically { -it } + fadeIn() togetherWith
                slideOutVertically { it } + fadeOut()
            } else {
                slideInVertically { it } + fadeIn() togetherWith
                slideOutVertically { -it } + fadeOut()
            }
        },
        label = "counter"
    ) { targetCount ->
        Text(
            text = "$targetCount",
            style = MaterialTheme.typography.headlineMedium
        )
    }

    IconButton(onClick = { count++ }) {
        Icon(Icons.Default.Add, null)
    }
}`,
    },
    {
      title: '多状态内容切换',
      code: `sealed class UiState {
    object Loading : UiState()
    data class Success(val data: String) : UiState()
    object Error : UiState()
}

var uiState by remember { mutableStateOf<UiState>(UiState.Loading) }

AnimatedContent(
    targetState = uiState,
    transitionSpec = {
        fadeIn(tween(300)) togetherWith fadeOut(tween(300))
    }
) { state ->
    when (state) {
        is UiState.Loading -> {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator()
            }
        }
        is UiState.Success -> {
            Text(state.data, style = MaterialTheme.typography.bodyLarge)
        }
        is UiState.Error -> {
            Text(
                "加载失败",
                color = MaterialTheme.colorScheme.error
            )
        }
    }
}`,
    },
    {
      title: '使用 SlideDirection',
      code: `var currentStep by remember { mutableStateOf(0) }

AnimatedContent(
    targetState = currentStep,
    transitionSpec = {
        slideIntoContainer(
            towards = AnimatedContentTransitionScope.SlideDirection.Start,
            animationSpec = tween(300)
        ) togetherWith slideOutOfContainer(
            towards = AnimatedContentTransitionScope.SlideDirection.Start,
            animationSpec = tween(300)
        )
    }
) { step ->
    when (step) {
        0 -> StepOneContent()
        1 -> StepTwoContent()
        2 -> StepThreeContent()
    }
}`,
    },
    {
      title: '使用 SizeTransform',
      code: `var expanded by remember { mutableStateOf(false) }

AnimatedContent(
    targetState = expanded,
    transitionSpec = {
        fadeIn(tween(300)) togetherWith fadeOut(tween(300)) using
        SizeTransform { initialSize, targetSize ->
            tween(300, easing = FastOutSlowInEasing)
        }
    }
) { isExpanded ->
    if (isExpanded) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("完整内容", style = MaterialTheme.typography.titleLarge)
            Text("详细信息 1")
            Text("详细信息 2")
            Text("详细信息 3")
        }
    } else {
        Text("点击展开", modifier = Modifier.padding(16.dp))
    }
}`,
    },
    {
      title: '缩放 + 淡入淡出',
      code: `var selected by remember { mutableStateOf(false) }

AnimatedContent(
    targetState = selected,
    transitionSpec = {
        scaleIn(initialScale = 0.8f) + fadeIn() togetherWith
        scaleOut(targetScale = 0.8f) + fadeOut()
    }
) { isSelected ->
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        colors = if (isSelected) {
            CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.primaryContainer
            )
        } else {
            CardDefaults.cardColors()
        }
    ) {
        Text(
            text = if (isSelected) "已选中" else "未选中",
            modifier = Modifier.padding(16.dp)
        )
    }
}`,
    },
  ],

  useCases: [
    {
      title: '步骤向导',
      description: '多步骤表单或引导流程，带有方向感的滑动切换',
      code: `var currentStep by remember { mutableStateOf(0) }
val steps = listOf("基本信息", "联系方式", "确认提交")

Column {
    // 进度指示器
    LinearProgressIndicator(
        progress = { (currentStep + 1) / steps.size.toFloat() },
        modifier = Modifier.fillMaxWidth()
    )

    Text(
        text = "步骤 2/3",
        modifier = Modifier.padding(16.dp),
        style = MaterialTheme.typography.titleMedium
    )

    // 内容区域
    AnimatedContent(
        targetState = currentStep,
        transitionSpec = {
            val direction = if (targetState > initialState) {
                AnimatedContentTransitionScope.SlideDirection.Start
            } else {
                AnimatedContentTransitionScope.SlideDirection.End
            }
            slideIntoContainer(towards = direction) togetherWith
            slideOutOfContainer(towards = direction)
        },
        modifier = Modifier
            .weight(1f)
            .fillMaxWidth()
    ) { step ->
        when (step) {
            0 -> StepOneForm()
            1 -> StepTwoForm()
            2 -> StepThreeConfirmation()
        }
    }

    // 导航按钮
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Button(
            onClick = { if (currentStep > 0) currentStep-- },
            enabled = currentStep > 0
        ) {
            Text("上一步")
        }
        Button(
            onClick = { if (currentStep < steps.size - 1) currentStep++ },
            enabled = currentStep < steps.size - 1
        ) {
            Text("下一步")
        }
    }
}`,
    },
    {
      title: '可展开的详情卡片',
      description: '卡片展开时内容平滑增加，带有尺寸过渡动画',
      code: `@Composable
fun ExpandableCard(item: Item) {
    var expanded by remember { mutableStateOf(false) }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
            .clickable { expanded = !expanded }
    ) {
        Column {
            ListItem(
                headlineContent = { Text(item.title) },
                trailingContent = {
                    Icon(
                        imageVector = if (expanded) {
                            Icons.Default.ExpandLess
                        } else {
                            Icons.Default.ExpandMore
                        },
                        contentDescription = null
                    )
                }
            )

            AnimatedContent(
                targetState = expanded,
                transitionSpec = {
                    fadeIn() + expandVertically() togetherWith
                    fadeOut() + shrinkVertically() using
                    SizeTransform(clip = false)
                }
            ) { isExpanded ->
                if (isExpanded) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text("详细描述：" + item.description)
                        Text("创建时间：" + item.timestamp)
                        Spacer(modifier = Modifier.height(8.dp))
                        Row {
                            Button(onClick = { }) { Text("编辑") }
                            Spacer(modifier = Modifier.width(8.dp))
                            Button(onClick = { }) { Text("删除") }
                        }
                    }
                }
            }
        }
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '使用 togetherWith 组合进入和退出',
      description: 'togetherWith 用于同时指定进入和退出动画，保持对称性',
      goodExample: `AnimatedContent(
    targetState = state,
    transitionSpec = {
        slideInHorizontally { it } togetherWith
        slideOutHorizontally { -it }
    }
) { /* content */ }`,
      badExample: `// 不要只指定一个方向的动画
AnimatedContent(
    targetState = state,
    transitionSpec = { slideInHorizontally { it } }
) { /* content */ }`,
    },
    {
      title: '根据状态变化方向选择动画',
      description: '利用 initialState 和 targetState 判断变化方向，提供有方向感的动画',
      goodExample: `transitionSpec = {
    if (targetState > initialState) {
        slideInVertically { -it } togetherWith slideOutVertically { it }
    } else {
        slideInVertically { it } togetherWith slideOutVertically { -it }
    }
}`,
    },
    {
      title: '使用 SizeTransform 处理尺寸变化',
      description: '当内容尺寸变化时，使用 SizeTransform 添加平滑的尺寸过渡',
      goodExample: `transitionSpec = {
    fadeIn() togetherWith fadeOut() using
    SizeTransform { initialSize, targetSize ->
        tween(300, easing = FastOutSlowInEasing)
    }
}`,
    },
    {
      title: '为复杂状态提供 contentKey',
      description: '当状态是复杂对象时，提供稳定的 key 以优化性能',
      goodExample: `AnimatedContent(
    targetState = userState,
    contentKey = { it.id }  // 使用稳定的 ID
) { user -> UserProfile(user) }`,
      badExample: `// 使用整个对象会导致不必要的重组
AnimatedContent(targetState = userState) { user ->
    UserProfile(user)
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'AnimatedContentScope 提供额外功能',
      content: 'content lambda 在 AnimatedContentScope 中执行，可以访问 transition 对象，以及使用 animateEnterExit 为子元素添加独立动画',
    },
    {
      type: 'tip',
      title: 'slideIntoContainer vs slideInVertically',
      content: 'slideIntoContainer 会考虑容器边界，适合页面切换；slideInVertically 是固定距离，适合数字等小元素',
    },
    {
      type: 'tip',
      title: 'using SizeTransform 的用法',
      content: '使用 using 关键字连接 ContentTransform 和 SizeTransform，实现内容和尺寸的协调动画',
    },
    {
      type: 'warning',
      title: '动画期间两个内容同时存在',
      content: '过渡期间，旧内容和新内容同时在组合树中。如果内容很重（如视频播放器），注意内存和性能影响',
    },
    {
      type: 'danger',
      title: '避免频繁切换状态',
      content: '如果状态在动画播放期间频繁变化，可能导致动画混乱。建议添加防抖或等待动画完成后再切换',
    },
  ],

  relatedComponents: ['crossfade', 'animated-visibility', 'update-transition', 'modifier-animate-content-size'],
  since: '1.1.0',
}
