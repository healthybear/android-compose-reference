import type { ComponentEntry } from '../../types'

export const animatedVisibilityComponent: ComponentEntry = {
  id: 'animated-visibility',
  demo: { id: 'animated-visibility', sourceFile: 'AnimatedVisibilityDemo.kt' },
  name: 'AnimatedVisibility',
  category: 'Animation',
  description: '为子组件的显示/隐藏添加进入和退出动画，支持淡入淡出、滑动、缩放等内置过渡效果。',
  tags: ['animation', 'visibility', 'enter', 'exit', '显隐动画'],
  params: [
    { name: 'visible', type: 'Boolean', required: true, description: '是否显示内容' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enter', type: 'EnterTransition', default: 'fadeIn() + expandVertically()', description: '进入动画，可组合多个效果' },
    { name: 'exit', type: 'ExitTransition', default: 'fadeOut() + shrinkVertically()', description: '退出动画，可组合多个效果' },
    { name: 'label', type: 'String', default: '"AnimatedVisibility"', description: '调试标签，用于调试工具识别' },
    { name: 'content', type: '@Composable AnimatedVisibilityScope.() -> Unit', required: true, description: '需要动画显隐的内容' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var visible by remember { mutableStateOf(true) }

Button(onClick = { visible = !visible }) {
    Text(if (visible) "隐藏" else "显示")
}

AnimatedVisibility(visible = visible) {
    Card(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
        Text("可动画显隐的内容", modifier = Modifier.padding(16.dp))
    }
}`,
    },
    {
      title: '自定义进入/退出动画',
      code: `AnimatedVisibility(
    visible = visible,
    enter = slideInHorizontally { -it } + fadeIn(),
    exit = slideOutHorizontally { -it } + fadeOut()
) {
    Text("从左侧滑入/滑出")
}

// 常用进入效果：
// fadeIn()、expandIn()、expandVertically()、expandHorizontally()
// slideInVertically { it }、slideInHorizontally { -it }
// scaleIn()

// 常用退出效果（对应 shrink/slideOut/scaleOut/fadeOut）`,
    },
    {
      title: '组合多个动画效果',
      code: `AnimatedVisibility(
    visible = isExpanded,
    enter = fadeIn(animationSpec = tween(300)) +
            expandVertically(animationSpec = tween(300)) +
            slideInVertically { -it },
    exit = fadeOut(animationSpec = tween(300)) +
           shrinkVertically(animationSpec = tween(300)) +
           slideOutVertically { -it }
) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("标题", style = MaterialTheme.typography.titleMedium)
        Text("详细内容...")
    }
}`,
    },
    {
      title: '不同方向的滑动',
      code: `// 从上往下滑入
AnimatedVisibility(
    visible = visible,
    enter = slideInVertically { -it },
    exit = slideOutVertically { -it }
) { Text("从上滑入") }

// 从下往上滑入
AnimatedVisibility(
    visible = visible,
    enter = slideInVertically { it },
    exit = slideOutVertically { it }
) { Text("从下滑入") }

// 从右往左滑入
AnimatedVisibility(
    visible = visible,
    enter = slideInHorizontally { it },
    exit = slideOutHorizontally { it }
) { Text("从右滑入") }`,
    },
    {
      title: '子元素独立动画',
      code: `AnimatedVisibility(visible = visible) {
    Column {
        Text(
            "第一行",
            modifier = Modifier.animateEnterExit(
                enter = fadeIn() + slideInHorizontally(),
                exit = fadeOut() + slideOutHorizontally()
            )
        )
        Text(
            "第二行",
            modifier = Modifier.animateEnterExit(
                enter = fadeIn(animationSpec = tween(300, delayMillis = 150)),
                exit = fadeOut()
            )
        )
    }
}`,
    },
  ],

  useCases: [
    {
      title: '展开/收起详情',
      description: '在列表项或卡片中展开显示更多内容',
      code: `var expanded by remember { mutableStateOf(false) }

Card(
    modifier = Modifier.fillMaxWidth(),
    onClick = { expanded = !expanded }
) {
    Column(modifier = Modifier.padding(16.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text("标题", style = MaterialTheme.typography.titleMedium)
            Icon(
                imageVector = if (expanded) Icons.Default.ExpandLess
                              else Icons.Default.ExpandMore,
                contentDescription = null
            )
        }

        AnimatedVisibility(
            visible = expanded,
            enter = expandVertically() + fadeIn(),
            exit = shrinkVertically() + fadeOut()
        ) {
            Text(
                "这里是详细内容，点击卡片可以展开或收起",
                modifier = Modifier.padding(top = 8.dp),
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}`,
    },
    {
      title: '消息通知',
      description: '显示临时提示消息，自动消失',
      code: `var showMessage by remember { mutableStateOf(false) }

LaunchedEffect(showMessage) {
    if (showMessage) {
        delay(3000)
        showMessage = false
    }
}

Column {
    Button(onClick = { showMessage = true }) {
        Text("显示消息")
    }

    AnimatedVisibility(
        visible = showMessage,
        enter = slideInVertically { -it } + fadeIn(),
        exit = slideOutVertically { -it } + fadeOut()
    ) {
        Surface(
            color = MaterialTheme.colorScheme.primaryContainer,
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(
                "操作成功！",
                modifier = Modifier.padding(16.dp)
            )
        }
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '使用 + 组合多个动画',
      description: '通过 + 运算符组合多个进入/退出效果，创建更流畅的过渡',
      goodExample: `AnimatedVisibility(
    visible = visible,
    enter = fadeIn() + expandVertically(),
    exit = fadeOut() + shrinkVertically()
) { /* content */ }`,
      badExample: `// 只使用单一效果会显得生硬
AnimatedVisibility(
    visible = visible,
    enter = fadeIn()
) { /* content */ }`,
    },
    {
      title: '保持进入/退出动画对称',
      description: '进入和退出动画应该是相反的过程，提供一致的用户体验',
      goodExample: `AnimatedVisibility(
    visible = visible,
    enter = slideInHorizontally { -it } + fadeIn(),
    exit = slideOutHorizontally { -it } + fadeOut()
) { /* content */ }`,
      badExample: `// 进入从左滑入，退出却淡出，不对称
AnimatedVisibility(
    visible = visible,
    enter = slideInHorizontally { -it },
    exit = fadeOut()
) { /* content */ }`,
    },
    {
      title: '控制动画时长保持一致',
      description: '使用 animationSpec 统一控制动画时长，避免动画过快或过慢',
      goodExample: `val animSpec = tween<IntOffset>(300)
AnimatedVisibility(
    visible = visible,
    enter = slideInVertically(animSpec) + fadeIn(tween(300)),
    exit = slideOutVertically(animSpec) + fadeOut(tween(300))
) { /* content */ }`,
    },
    {
      title: '避免在 LazyColumn 中使用',
      description: 'LazyColumn 已经有内置的项目动画，额外使用 AnimatedVisibility 会影响性能',
      goodExample: `LazyColumn {
    items(list, key = { it.id }) { item ->
        ItemContent(item)
    }
}`,
      badExample: `LazyColumn {
    items(list) { item ->
        AnimatedVisibility(visible = true) {
            ItemContent(item)
        }
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'AnimatedVisibilityScope 提供额外功能',
      content: 'content lambda 在 AnimatedVisibilityScope 中执行，可以使用 animateEnterExit() 为子元素添加独立的进入/退出动画',
    },
    {
      type: 'warning',
      title: '动画期间组件仍在组合树中',
      content: '退出动画播放期间，组件仍然存在于组合树中，只是视觉上不可见。如果需要完全移除，应等待动画完成',
    },
    {
      type: 'tip',
      title: '使用 lambda 计算偏移量',
      content: 'slideIn/slideOut 系列动画的 lambda 参数是组件的完整尺寸，{ -it } 表示从组件外部滑入，{ it/2 } 表示从一半位置开始',
    },
    {
      type: 'tip',
      title: '调试动画',
      content: '使用 label 参数为动画命名，在 Layout Inspector 或动画调试工具中可以更容易识别和调试',
    },
    {
      type: 'danger',
      title: '避免频繁切换 visible 状态',
      content: '如果在动画播放期间再次改变 visible 状态，可能导致动画中断或视觉上的跳变。建议使用防抖或等待动画完成',
    },
  ],

  relatedComponents: ['animated-content', 'crossfade', 'animate-as-state', 'modifier-animate-content-size'],
  since: '1.0.0',
}
