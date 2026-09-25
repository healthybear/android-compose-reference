import type { ComponentEntry } from '../../types'

export const modifierAnimateContentSizeComponent: ComponentEntry = {
  id: 'modifier-animate-content-size',
  demo: { id: 'modifier-animate-content-size', sourceFile: 'ModifierAnimateContentSizeDemo.kt' },
  name: 'Modifier.animateContentSize',
  category: 'Modifier',
  description: '当组件内容尺寸变化时自动添加平滑的尺寸过渡动画，适用于展开/收起、文本长度变化、列表项增减等场景。',
  tags: ['modifier', 'animation', 'size', 'expand', 'collapse', '尺寸动画'],
  params: [
    { name: 'animationSpec', type: 'FiniteAnimationSpec<IntSize>', default: 'spring()', description: '动画规格，控制尺寸变化的速度曲线' },
    { name: 'alignment', type: 'Alignment', default: 'Alignment.TopStart', description: '内容对齐方式，影响尺寸变化的锚点' },
    { name: 'finishedListener', type: '((initialValue: IntSize, targetValue: IntSize) -> Unit)?', default: 'null', description: '动画完成回调' },
  ],
  examples: [
    {
      title: '基础用法 - 展开/收起',
      code: `var expanded by remember { mutableStateOf(false) }

Column(
    modifier = Modifier
        .fillMaxWidth()
        .animateContentSize()
        .background(MaterialTheme.colorScheme.surfaceVariant)
        .clickable { expanded = !expanded }
        .padding(16.dp)
) {
    Text(
        text = "点击展开/收起",
        style = MaterialTheme.typography.titleMedium
    )

    if (expanded) {
        Text(
            text = "这是展开后显示的详细内容。可以包含多行文本、图片或其他组件。",
            modifier = Modifier.padding(top = 8.dp)
        )
    }
}`,
    },
    {
      title: '文本长度变化',
      code: `var isLongText by remember { mutableStateOf(false) }

Column {
    Text(
        text = if (isLongText) {
            "这是一段很长的文本内容，用于演示 animateContentSize 如何处理文本长度变化的动画效果"
        } else {
            "短文本"
        },
        modifier = Modifier
            .fillMaxWidth()
            .animateContentSize()
            .background(MaterialTheme.colorScheme.primaryContainer)
            .padding(16.dp)
    )

    Button(onClick = { isLongText = !isLongText }) {
        Text("切换文本长度")
    }
}`,
    },
    {
      title: '自定义动画规格',
      code: `var itemCount by remember { mutableStateOf(1) }

Column(
    modifier = Modifier
        .fillMaxWidth()
        .animateContentSize(
            animationSpec = tween(
                durationMillis = 500,
                easing = FastOutSlowInEasing
            )
        )
        .border(1.dp, MaterialTheme.colorScheme.outline)
        .padding(16.dp)
) {
    repeat(itemCount) { index ->
        Text("列表项 " + (index + 1))
        if (index < itemCount - 1) {
            Spacer(modifier = Modifier.height(8.dp))
        }
    }
}

Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    Button(
        onClick = { if (itemCount > 1) itemCount-- },
        enabled = itemCount > 1
    ) {
        Text("减少")
    }
    Button(onClick = { itemCount++ }) {
        Text("增加")
    }
}`,
    },
    {
      title: '改变对齐方式',
      code: `var expanded by remember { mutableStateOf(false) }

// 从中心扩展
Box(
    modifier = Modifier
        .animateContentSize(alignment = Alignment.Center)
        .background(MaterialTheme.colorScheme.tertiaryContainer)
        .clickable { expanded = !expanded }
        .padding(16.dp),
    contentAlignment = Alignment.Center
) {
    Text(
        text = if (expanded) "展开的内容区域" else "收起",
        modifier = Modifier.padding(if (expanded) 32.dp else 0.dp)
    )
}

// 从底部扩展
Box(
    modifier = Modifier
        .animateContentSize(alignment = Alignment.BottomCenter)
        .background(MaterialTheme.colorScheme.secondaryContainer)
        .clickable { expanded = !expanded }
        .padding(16.dp)
) {
    Column {
        Text("标题（固定在顶部）")
        if (expanded) {
            Text("详细内容从底部展开")
        }
    }
}`,
    },
    {
      title: '动画完成回调',
      code: `var expanded by remember { mutableStateOf(false) }
var animationCount by remember { mutableStateOf(0) }

Column {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .animateContentSize(
                finishedListener = { initial, target ->
                    animationCount++
                    println("动画完成: $initial -> $target")
                }
            )
            .background(MaterialTheme.colorScheme.surface)
            .clickable { expanded = !expanded }
            .padding(if (expanded) 32.dp else 16.dp)
    ) {
        Text(if (expanded) "展开状态" else "收起状态")
    }

    Text("动画完成次数: $animationCount")
}`,
    },
  ],

  useCases: [
    {
      title: 'FAQ 可展开列表',
      description: '常见问题列表，点击问题展开答案',
      code: `@Composable
fun FaqItem(question: String, answer: String) {
    var expanded by remember { mutableStateOf(false) }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        onClick = { expanded = !expanded }
    ) {
        Column(
            modifier = Modifier
                .animateContentSize(
                    animationSpec = spring(
                        dampingRatio = Spring.DampingRatioMediumBouncy,
                        stiffness = Spring.StiffnessMedium
                    )
                )
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = question,
                    style = MaterialTheme.typography.titleMedium,
                    modifier = Modifier.weight(1f)
                )
                Icon(
                    imageVector = if (expanded) {
                        Icons.Default.ExpandLess
                    } else {
                        Icons.Default.ExpandMore
                    },
                    contentDescription = null
                )
            }

            AnimatedVisibility(visible = expanded) {
                Text(
                    text = answer,
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.padding(top = 8.dp)
                )
            }
        }
    }
}`,
    },
    {
      title: '动态标签云',
      description: '标签数量变化时带有流畅的尺寸动画',
      code: `@Composable
fun TagCloud() {
    var tags by remember {
        mutableStateOf(listOf("Kotlin", "Jetpack Compose"))
    }

    Column {
        FlowRow(
            modifier = Modifier
                .fillMaxWidth()
                .animateContentSize()
                .border(1.dp, MaterialTheme.colorScheme.outline)
                .padding(8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            tags.forEach { tag ->
                AssistChip(
                    onClick = { tags = tags - tag },
                    label = { Text(tag) },
                    trailingIcon = {
                        Icon(
                            Icons.Default.Close,
                            contentDescription = "移除",
                            modifier = Modifier.size(16.dp)
                        )
                    }
                )
            }
        }

        Button(
            onClick = {
                tags = tags + ("新标签 " + (tags.size + 1))
            },
            modifier = Modifier.padding(top = 8.dp)
        ) {
            Text("添加标签")
        }
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '放在正确的位置',
      description: 'animateContentSize 应该添加到尺寸会变化的容器上，而不是内部元素',
      goodExample: `Column(
    modifier = Modifier.animateContentSize()  // 容器尺寸会变化
) {
    if (expanded) {
        Text("内容")
    }
}`,
      badExample: `Column {
    if (expanded) {
        Text(
            "内容",
            modifier = Modifier.animateContentSize()  // 文本本身尺寸不变
        )
    }
}`,
    },
    {
      title: '与 AnimatedVisibility 配合使用',
      description: '内容显隐用 AnimatedVisibility，外层容器用 animateContentSize',
      goodExample: `Column(
    modifier = Modifier.animateContentSize()
) {
    Text("标题")
    AnimatedVisibility(visible = expanded) {
        Text("详细内容")
    }
}`,
    },
    {
      title: '使用 spring 获得自然效果',
      description: 'spring 动画比 tween 更自然，适合大多数尺寸变化场景',
      goodExample: `Modifier.animateContentSize(
    animationSpec = spring(
        dampingRatio = Spring.DampingRatioMediumBouncy
    )
)`,
      badExample: `// tween 在尺寸变化时可能显得僵硬
Modifier.animateContentSize(
    animationSpec = tween(200)
)`,
    },
    {
      title: '注意性能影响',
      description: '避免在嵌套滚动容器或大量列表项中使用',
      goodExample: `// 单个卡片使用
Card(modifier = Modifier.animateContentSize()) {
    /* 内容 */
}`,
      badExample: `// 避免在列表的每一项都使用
LazyColumn {
    items(1000) {
        Card(modifier = Modifier.animateContentSize()) {
            /* 每项都会计算动画 */
        }
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: '自动检测尺寸变化',
      content: 'animateContentSize 会自动检测内容导致的宽度或高度变化，无需手动触发动画',
    },
    {
      type: 'tip',
      title: '与其他动画组合',
      content: 'animateContentSize 可以与 AnimatedVisibility、Crossfade、AnimatedContent 等组合使用，创建更丰富的效果',
    },
    {
      type: 'tip',
      title: 'alignment 参数的作用',
      content: 'alignment 决定了内容在尺寸变化时的锚点位置。TopStart 表示左上角固定，内容向右下扩展；Center 表示中心固定，向四周扩展',
    },
    {
      type: 'warning',
      title: '性能考虑',
      content: '频繁的尺寸变化会触发重新布局和重绘。如果内容变化非常频繁（如每帧更新），考虑使用其他动画方式',
    },
    {
      type: 'warning',
      title: 'Modifier 顺序很重要',
      content: 'animateContentSize 应该在 padding、background 等影响尺寸的 Modifier 之前调用，这样动画才能包含这些效果',
    },
    {
      type: 'danger',
      title: '不要在无限滚动容器中使用',
      content: 'LazyColumn、LazyRow 等组件已经有自己的性能优化，在它们的根节点使用 animateContentSize 会导致严重性能问题',
    },
  ],

  relatedComponents: ['animated-visibility', 'animated-content', 'animate-as-state'],
  since: '1.1.0',
}
