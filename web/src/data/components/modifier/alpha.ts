import type { ComponentEntry } from '../../types'

export const modifierAlphaComponent: ComponentEntry = {
  id: 'modifier-alpha',
  demo: { id: 'modifier-alpha', sourceFile: 'ModifierAlphaDemo.kt' },
  name: 'Modifier.alpha',
  category: 'Modifier',
  description: 'Modifier.alpha 用于设置组件的透明度，0f 完全透明，1f 完全不透明。常用于禁用状态、淡入淡出效果、视觉层级表达。',
  tags: ['modifier', 'alpha', 'opacity', 'transparency', 'fade'],
  params: [
    { name: 'alpha', type: 'Float', required: true, description: '透明度值，范围 0f~1f。0f 完全透明（不可见），1f 完全不透明（默认）' },
  ],
  examples: [
    {
      title: '基础透明度',
      code: `Column(
    verticalArrangement = Arrangement.spacedBy(16.dp),
    modifier = Modifier.padding(16.dp)
) {
    Text("完全不透明（alpha = 1f）")

    Text(
        "半透明（alpha = 0.5f）",
        modifier = Modifier.alpha(0.5f)
    )

    Text(
        "几乎透明（alpha = 0.2f）",
        modifier = Modifier.alpha(0.2f)
    )
}`,
    },
    {
      title: '禁用状态',
      code: `@Composable
fun DisabledButton() {
    var enabled by remember { mutableStateOf(true) }

    Column(
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Button(
            onClick = { /* 提交 */ },
            enabled = enabled,
            modifier = Modifier.alpha(if (enabled) 1f else 0.5f)
        ) {
            Text("提交")
        }

        Switch(
            checked = enabled,
            onCheckedChange = { enabled = it }
        )
    }
}`,
    },
    {
      title: '动画淡入淡出',
      code: `var visible by remember { mutableStateOf(true) }
val alpha by animateFloatAsState(
    targetValue = if (visible) 1f else 0f,
    label = "alpha"
)

Column(
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.spacedBy(16.dp)
) {
    Box(
        modifier = Modifier
            .size(100.dp)
            .alpha(alpha)
            .background(Color.Blue)
    )

    Button(onClick = { visible = !visible }) {
        Text(if (visible) "淡出" else "淡入")
    }
}`,
    },
    {
      title: '列表项交互反馈',
      code: `@Composable
fun InteractiveListItem(item: Item) {
    var pressed by remember { mutableStateOf(false) }

    ListItem(
        headlineContent = { Text(item.title) },
        supportingContent = { Text(item.subtitle) },
        modifier = Modifier
            .alpha(if (pressed) 0.6f else 1f)
            .pointerInput(Unit) {
                detectTapGestures(
                    onPress = {
                        pressed = true
                        tryAwaitRelease()
                        pressed = false
                    }
                )
            }
    )
}`,
    },
    {
      title: '图层透明度',
      code: `Box(
    modifier = Modifier
        .fillMaxSize()
        .background(Color.White)
) {
    // 背景图
    Image(
        painter = painterResource(R.drawable.background),
        contentDescription = null,
        modifier = Modifier.fillMaxSize()
    )

    // 半透明遮罩层
    Box(
        modifier = Modifier
            .fillMaxSize()
            .alpha(0.7f)
            .background(Color.Black)
    )

    // 前景内容
    Column(
        modifier = Modifier
            .align(Alignment.Center)
            .padding(16.dp)
    ) {
        Text(
            "标题",
            color = Color.White,
            style = MaterialTheme.typography.headlineLarge
        )
        Spacer(Modifier.height(8.dp))
        Text(
            "副标题",
            color = Color.White,
            style = MaterialTheme.typography.bodyLarge
        )
    }
}`,
    },
    {
      title: '滑块控制透明度',
      code: `var alpha by remember { mutableFloatStateOf(1f) }

Column(
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp)
) {
    Box(
        modifier = Modifier
            .size(150.dp)
            .alpha(alpha)
            .background(Color.Blue),
        contentAlignment = Alignment.Center
    ) {
        Text(
            "alpha = " + (alpha * 100).toInt() + "%",
            color = Color.White
        )
    }

    Text("透明度: " + (alpha * 100).toInt() + "%")

    Slider(
        value = alpha,
        onValueChange = { alpha = it },
        valueRange = 0f..1f
    )
}`,
    },
    {
      title: '水印效果',
      code: `Box(modifier = Modifier.fillMaxSize()) {
    // 主内容
    LazyColumn(
        modifier = Modifier.fillMaxSize()
    ) {
        items(50) { index ->
            ListItem(
                headlineContent = { Text("Item $index") }
            )
        }
    }

    // 水印
    Text(
        "机密文档",
        fontSize = 48.sp,
        color = Color.Gray,
        modifier = Modifier
            .align(Alignment.Center)
            .alpha(0.2f)
            .rotate(45f)
    )
}`,
    },
  ],

  useCases: [
    {
      title: '加载态遮罩',
      description: '显示半透明遮罩和加载指示器',
      code: `@Composable
fun LoadingOverlay(isLoading: Boolean, content: @Composable () -> Unit) {
    Box(modifier = Modifier.fillMaxSize()) {
        content()

        if (isLoading) {
            // 半透明遮罩
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .alpha(0.5f)
                    .background(Color.Black)
                    .clickable(enabled = false) { }
            )

            // 加载指示器
            CircularProgressIndicator(
                modifier = Modifier.align(Alignment.Center),
                color = Color.White
            )
        }
    }
}`
    },
    {
      title: '占位符效果',
      description: '内容未加载时显示半透明占位符',
      code: `@Composable
fun ContentPlaceholder(isLoading: Boolean, content: String?) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(100.dp)
            .background(Color.LightGray)
            .alpha(if (isLoading) 0.3f else 1f)
    ) {
        if (content != null) {
            Text(
                content,
                modifier = Modifier
                    .align(Alignment.Center)
                    .padding(16.dp)
            )
        } else {
            // 加载中的占位符
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .shimmer()  // 骨架屏效果
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: 'alpha 范围是 0f~1f',
      description: '超出范围会被截断',
      goodExample: `Box(Modifier.alpha(0.5f))  // 半透明
Box(Modifier.alpha(0f))   // 完全透明
Box(Modifier.alpha(1f))   // 完全不透明`,
      badExample: `Box(Modifier.alpha(50f))   // 会被截断为 1f
Box(Modifier.alpha(-0.5f))  // 会被截断为 0f`
    },
    {
      title: '禁用状态推荐使用 0.38f',
      description: 'Material Design 规范推荐禁用状态透明度为 38%',
      goodExample: `Button(
    onClick = { },
    enabled = false,
    modifier = Modifier.alpha(0.38f)
) {
    Text("禁用按钮")
}`,
    },
    {
      title: 'alpha(0f) 的元素仍然占用空间',
      description: 'alpha 只影响可见性，不影响布局',
      goodExample: `// 完全隐藏且不占用布局空间
if (visible) {
    Text("内容")
}`,
      badExample: `// 不可见但仍占用布局空间
Text(
    "内容",
    modifier = Modifier.alpha(if (visible) 1f else 0f)
)`
    },
    {
      title: '使用 animateFloatAsState 实现平滑过渡',
      description: '透明度变化应该有动画',
      goodExample: `val alpha by animateFloatAsState(
    targetValue = if (visible) 1f else 0f
)
Box(Modifier.alpha(alpha))`,
      badExample: `val alpha = if (visible) 1f else 0f
Box(Modifier.alpha(alpha))  // 突变，没有过渡`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'alpha 影响整个组件树',
      content: 'Modifier.alpha 会影响组件及其所有子组件的透明度'
    },
    {
      type: 'warning',
      title: 'alpha(0f) 仍然响应触摸事件',
      content: 'alpha(0f) 的组件虽然不可见，但仍然可以响应点击等事件。如果要完全禁用交互，使用 enabled = false'
    },
    {
      type: 'info',
      title: 'alpha 不影响布局',
      content: 'alpha 只影响视觉渲染，不影响组件在布局中占用的空间。完全透明的组件仍然占据原有空间'
    },
    {
      type: 'info',
      title: '使用 Color.copy(alpha) 控制颜色透明度',
      content: '对于单一颜色的透明度，可以使用 Color.copy(alpha = 0.5f) 代替 Modifier.alpha'
    },
    {
      type: 'error',
      title: 'alpha 影响性能',
      content: '频繁改变 alpha 值（如每帧动画）会触发重绘，影响性能。对于静态透明度，可以考虑使用带透明度的颜色'
    },
  ],

  relatedComponents: ['modifier-background', 'animated-visibility'],
  since: '1.0.0',
}
