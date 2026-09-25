import type { ComponentEntry } from '../../types'

export const crossfadeComponent: ComponentEntry = {
  id: 'crossfade',
  demo: { id: 'crossfade', sourceFile: 'CrossfadeDemo.kt' },
  name: 'Crossfade',
  category: 'Animation',
  description: '在不同内容之间执行淡入淡出交叉过渡，是 AnimatedContent 的简化版，适合简单的内容切换场景。',
  tags: ['animation', 'crossfade', 'fade', 'transition', '淡入淡出'],
  params: [
    { name: 'targetState', type: 'T', required: true, description: '目标状态，变化时触发交叉淡入淡出' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'animationSpec', type: 'FiniteAnimationSpec<Float>', default: 'tween()', description: '动画规格，控制时长和缓动曲线' },
    { name: 'label', type: 'String', default: '"Crossfade"', description: '调试标签，用于调试工具识别' },
    { name: 'content', type: '@Composable (T) -> Unit', required: true, description: '根据目标状态渲染的内容' },
  ],
  examples: [
    {
      title: '基础页面切换',
      code: `var currentPage by remember { mutableStateOf("home") }

Crossfade(targetState = currentPage) { page ->
    when (page) {
        "home"     -> HomeScreen()
        "profile"  -> ProfileScreen()
        "settings" -> SettingsScreen()
    }
}`,
    },
    {
      title: '图标切换',
      code: `var isPlaying by remember { mutableStateOf(false) }

IconButton(onClick = { isPlaying = !isPlaying }) {
    Crossfade(targetState = isPlaying, animationSpec = tween(300)) { playing ->
        if (playing) {
            Icon(Icons.Default.Pause, contentDescription = "暂停")
        } else {
            Icon(Icons.Default.PlayArrow, contentDescription = "播放")
        }
    }
}`,
    },
    {
      title: '自定义动画时长',
      code: `var selectedTab by remember { mutableStateOf(0) }

Crossfade(
    targetState = selectedTab,
    animationSpec = tween(
        durationMillis = 500,
        easing = FastOutSlowInEasing
    ),
    label = "tabContent"
) { index ->
    when (index) {
        0 -> Text("第一个标签页内容")
        1 -> Text("第二个标签页内容")
        2 -> Text("第三个标签页内容")
    }
}`,
    },
    {
      title: '加载状态切换',
      code: `var isLoading by remember { mutableStateOf(true) }

Crossfade(targetState = isLoading) { loading ->
    if (loading) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            CircularProgressIndicator()
        }
    } else {
        LazyColumn {
            items(dataList) { item ->
                ListItem(headlineContent = { Text(item.title) })
            }
        }
    }
}`,
    },
    {
      title: '枚举状态切换',
      code: `enum class ViewState { Loading, Success, Error }
var state by remember { mutableStateOf<ViewState>(ViewState.Loading) }

Crossfade(targetState = state) { currentState ->
    when (currentState) {
        ViewState.Loading -> LoadingView()
        ViewState.Success -> SuccessView()
        ViewState.Error -> ErrorView()
    }
}`,
    },
  ],

  useCases: [
    {
      title: '标签页内容切换',
      description: '在 TabRow 中切换不同标签页的内容',
      code: `var selectedTab by remember { mutableStateOf(0) }
val tabs = listOf("首页", "消息", "我的")

Column {
    TabRow(selectedTabIndex = selectedTab) {
        tabs.forEachIndexed { index, title ->
            Tab(
                selected = selectedTab == index,
                onClick = { selectedTab = index },
                text = { Text(title) }
            )
        }
    }

    Crossfade(
        targetState = selectedTab,
        modifier = Modifier.fillMaxSize()
    ) { index ->
        when (index) {
            0 -> HomeTabContent()
            1 -> MessageTabContent()
            2 -> ProfileTabContent()
        }
    }
}`,
    },
    {
      title: '主题切换预览',
      description: '在明暗主题之间平滑切换',
      code: `var isDarkTheme by remember { mutableStateOf(false) }

MaterialTheme(colorScheme = if (isDarkTheme) darkColorScheme() else lightColorScheme()) {
    Surface(modifier = Modifier.fillMaxSize()) {
        Column {
            Switch(
                checked = isDarkTheme,
                onCheckedChange = { isDarkTheme = it }
            )

            Crossfade(targetState = isDarkTheme) { dark ->
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = if (dark) "深色主题" else "浅色主题",
                        style = MaterialTheme.typography.headlineMedium
                    )
                    Text(
                        text = "这是示例内容",
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
            }
        }
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '使用稳定的 key 作为 targetState',
      description: 'targetState 应该是稳定的值（字符串、枚举、数字），避免使用对象引用',
      goodExample: `enum class Screen { Home, Profile }
var screen by remember { mutableStateOf(Screen.Home) }

Crossfade(targetState = screen) { currentScreen ->
    when (currentScreen) {
        Screen.Home -> HomeScreen()
        Screen.Profile -> ProfileScreen()
    }
}`,
      badExample: `// 使用对象引用会导致每次都重新创建
data class ScreenData(val name: String)
var screen by remember { mutableStateOf(ScreenData("home")) }

Crossfade(targetState = screen) { /* ... */ }`,
    },
    {
      title: '只用于简单淡入淡出',
      description: 'Crossfade 只支持淡入淡出，如需滑动等效果应使用 AnimatedContent',
      goodExample: `// 简单内容切换用 Crossfade
Crossfade(targetState = isExpanded) { expanded ->
    if (expanded) DetailView() else SummaryView()
}`,
      badExample: `// 需要滑动效果时应该用 AnimatedContent
Crossfade(targetState = currentPage) { page ->
    PageContent(page)
}`,
    },
    {
      title: '控制动画时长适中',
      description: '淡入淡出动画不宜过长，建议在 200-400ms 之间',
      goodExample: `Crossfade(
    targetState = state,
    animationSpec = tween(300)
) { /* content */ }`,
      badExample: `// 1秒太长，用户会感觉卡顿
Crossfade(
    targetState = state,
    animationSpec = tween(1000)
) { /* content */ }`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: '同时显示两个内容',
      content: '在过渡期间，旧内容淡出的同时新内容淡入，两者会短暂重叠。如果内容较重（如列表），可能影响性能',
    },
    {
      type: 'tip',
      title: 'AnimatedContent 的简化版',
      content: 'Crossfade 本质上是 AnimatedContent 的一个特例，只支持淡入淡出。如果需要更多过渡效果，使用 AnimatedContent',
    },
    {
      type: 'warning',
      title: '内容会被完全重组',
      content: '每次 targetState 改变时，旧内容会被销毁，新内容会完全重新组合。如果内容有复杂状态，注意保存',
    },
    {
      type: 'tip',
      title: '使用 remember(key) 保持状态',
      content: '如果需要在切换时保持某些状态，可以使用 remember(targetState) { ... } 为每个状态创建独立的状态实例',
    },
    {
      type: 'danger',
      title: '避免在 LazyColumn 的 items 中使用',
      content: '在列表项中使用 Crossfade 会严重影响滚动性能。列表项的状态切换应该用 AnimatedVisibility 或简单的条件渲染',
    },
  ],

  relatedComponents: ['animated-content', 'animated-visibility', 'animate-as-state'],
  since: '1.0.0',
}
