import type { ComponentEntry } from '../../types'

export const subcomposeLayoutComponent: ComponentEntry = {
  id: 'subcompose-layout',
  demo: { id: 'subcompose-layout', sourceFile: 'SubcomposeLayoutDemo.kt' },
  name: 'SubcomposeLayout',
  category: 'Advanced',
  description: '允许在测量阶段动态组合子内容，可根据父组件约束条件决定渲染哪些子组件，BoxWithConstraints 内部即使用此 API。',
  tags: ['layout', 'subcompose', 'dynamic', 'measure', '动态布局'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'state', type: 'SubcomposeLayoutState?', default: 'null', description: '可选状态，用于复用 slot' },
    { name: 'measurePolicy', type: 'SubcomposeMeasureScope.(Constraints) -> MeasureResult', required: true, description: '测量策略，可在此调用 subcompose() 动态创建子组件' },
  ],
  examples: [
    {
      title: '根据可用宽度决定布局',
      code: `SubcomposeLayout { constraints ->
    // 先测量内容，获取其尺寸
    val contentPlaceables = subcompose("content") {
        Text("主要内容")
    }.map { it.measure(constraints) }

    val contentWidth = contentPlaceables.maxOf { it.width }

    // 根据剩余空间决定是否显示侧边栏
    val sidebarPlaceables = if (constraints.maxWidth - contentWidth > 200) {
        subcompose("sidebar") {
            SidebarContent()
        }.map { it.measure(Constraints.fixedWidth(200)) }
    } else emptyList()

    layout(constraints.maxWidth, constraints.maxHeight) {
        contentPlaceables.forEach { it.placeRelative(0, 0) }
        sidebarPlaceables.forEach { it.placeRelative(contentWidth, 0) }
    }
}`,
    },
    {
      title: '实现自适应文字截断',
      code: `SubcomposeLayout { constraints ->
    // 先尝试完整内容
    val fullContent = subcompose("full") { Text(fullText) }
        .map { it.measure(constraints) }

    if (fullContent.first().height <= maxHeight) {
        // 内容放得下，直接显示
        layout(constraints.maxWidth, fullContent.first().height) {
            fullContent.forEach { it.placeRelative(0, 0) }
        }
    } else {
        // 放不下，显示截断版本
        val truncated = subcompose("truncated") { Text(truncatedText) }
            .map { it.measure(constraints) }
        layout(constraints.maxWidth, truncated.first().height) {
            truncated.forEach { it.placeRelative(0, 0) }
        }
    }
}`,
    },
    {
      title: '实现 BoxWithConstraints',
      code: `@Composable
fun CustomBoxWithConstraints(
    modifier: Modifier = Modifier,
    content: @Composable BoxWithConstraintsScope.() -> Unit
) {
    SubcomposeLayout(modifier = modifier) { constraints ->
        val scope = object : BoxWithConstraintsScope {
            override val constraints = constraints
            override val minWidth = constraints.minWidth.toDp()
            override val maxWidth = constraints.maxWidth.toDp()
            override val minHeight = constraints.minHeight.toDp()
            override val maxHeight = constraints.maxHeight.toDp()
        }

        val placeables = subcompose(Unit) {
            scope.content()
        }.map { it.measure(constraints) }

        val width = placeables.maxOfOrNull { it.width } ?: constraints.minWidth
        val height = placeables.maxOfOrNull { it.height } ?: constraints.minHeight

        layout(width, height) {
            placeables.forEach { it.placeRelative(0, 0) }
        }
    }
}`,
    },
    {
      title: '根据第一个子组件调整第二个',
      code: `@Composable
fun HeaderWithMatchingFooter(
    header: @Composable () -> Unit,
    footer: @Composable (width: Dp) -> Unit
) {
    SubcomposeLayout { constraints ->
        // 先测量 header
        val headerPlaceables = subcompose("header") {
            header()
        }.map { it.measure(constraints) }

        val headerWidth = headerPlaceables.first().width
        val headerHeight = headerPlaceables.first().height

        // 根据 header 宽度测量 footer
        val footerPlaceables = subcompose("footer") {
            footer(headerWidth.toDp())
        }.map { it.measure(Constraints.fixedWidth(headerWidth)) }

        val footerHeight = footerPlaceables.first().height
        val totalHeight = headerHeight + footerHeight

        layout(constraints.maxWidth, totalHeight) {
            headerPlaceables.forEach { it.placeRelative(0, 0) }
            footerPlaceables.forEach { it.placeRelative(0, headerHeight) }
        }
    }
}`,
    },
    {
      title: '动态列数网格',
      code: `@Composable
fun AdaptiveGrid(
    items: List<String>,
    minColumnWidth: Dp = 100.dp
) {
    SubcomposeLayout { constraints ->
        val columnWidthPx = minColumnWidth.toPx()
        val columnCount = (constraints.maxWidth / columnWidthPx).toInt().coerceAtLeast(1)
        val actualColumnWidth = constraints.maxWidth / columnCount

        val placeables = items.mapIndexed { index, item ->
            subcompose(index) {
                Text(
                    text = item,
                    modifier = Modifier
                        .width(actualColumnWidth.toDp())
                        .padding(8.dp)
                        .background(Color.LightGray)
                )
            }.first().measure(Constraints.fixedWidth(actualColumnWidth))
        }

        val rowCount = (items.size + columnCount - 1) / columnCount
        val height = (0 until rowCount).sumOf { row ->
            (0 until columnCount)
                .mapNotNull { col ->
                    val index = row * columnCount + col
                    placeables.getOrNull(index)?.height
                }
                .maxOrNull() ?: 0
        }

        layout(constraints.maxWidth, height) {
            placeables.forEachIndexed { index, placeable ->
                val row = index / columnCount
                val col = index % columnCount
                val x = col * actualColumnWidth
                val y = (0 until row).sumOf { r ->
                    (0 until columnCount)
                        .mapNotNull { c ->
                            placeables.getOrNull(r * columnCount + c)?.height
                        }
                        .maxOrNull() ?: 0
                }
                placeable.placeRelative(x, y)
            }
        }
    }
}`,
    },
    {
      title: '测量子组件后决定对齐方式',
      code: `@Composable
fun SmartAlignedContent(
    primary: @Composable () -> Unit,
    secondary: @Composable () -> Unit
) {
    SubcomposeLayout { constraints ->
        // 测量两个组件
        val primaryPlaceables = subcompose("primary") {
            primary()
        }.map { it.measure(constraints) }

        val secondaryPlaceables = subcompose("secondary") {
            secondary()
        }.map { it.measure(constraints) }

        val primaryWidth = primaryPlaceables.first().width
        val secondaryWidth = secondaryPlaceables.first().width
        val totalWidth = primaryWidth + secondaryWidth + 16.dp.toPx()

        // 如果总宽度超过约束，垂直排列；否则水平排列
        if (totalWidth > constraints.maxWidth) {
            // 垂直布局
            val totalHeight = primaryPlaceables.first().height +
                            secondaryPlaceables.first().height + 8.dp.toPx().toInt()

            layout(constraints.maxWidth, totalHeight) {
                primaryPlaceables.forEach { it.placeRelative(0, 0) }
                secondaryPlaceables.forEach {
                    it.placeRelative(0, primaryPlaceables.first().height + 8.dp.toPx().toInt())
                }
            }
        } else {
            // 水平布局
            val maxHeight = maxOf(
                primaryPlaceables.first().height,
                secondaryPlaceables.first().height
            )

            layout(totalWidth.toInt(), maxHeight) {
                primaryPlaceables.forEach { it.placeRelative(0, 0) }
                secondaryPlaceables.forEach {
                    it.placeRelative(primaryWidth + 16.dp.toPx().toInt(), 0)
                }
            }
        }
    }
}`,
    },
    {
      title: '实现可折叠标题',
      code: `@Composable
fun CollapsibleHeader(
    isExpanded: Boolean,
    modifier: Modifier = Modifier
) {
    SubcomposeLayout(modifier = modifier) { constraints ->
        if (isExpanded) {
            // 展开状态：显示完整内容
            val placeables = subcompose("expanded") {
                Column {
                    Text("完整标题", style = MaterialTheme.typography.headlineLarge)
                    Text("副标题", style = MaterialTheme.typography.bodyMedium)
                    Text("详细描述内容...", style = MaterialTheme.typography.bodySmall)
                }
            }.map { it.measure(constraints) }

            layout(constraints.maxWidth, placeables.first().height) {
                placeables.forEach { it.placeRelative(0, 0) }
            }
        } else {
            // 折叠状态：只显示标题
            val placeables = subcompose("collapsed") {
                Text("完整标题", style = MaterialTheme.typography.titleMedium)
            }.map { it.measure(constraints) }

            layout(constraints.maxWidth, placeables.first().height) {
                placeables.forEach { it.placeRelative(0, 0) }
            }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '响应式卡片布局',
      description: '根据内容尺寸自动调整布局方向',
      code: `@Composable
fun ResponsiveCard(
    image: @Composable () -> Unit,
    content: @Composable () -> Unit,
    modifier: Modifier = Modifier
) {
    SubcomposeLayout(modifier = modifier) { constraints ->
        // 先测量图片
        val imagePlaceables = subcompose("image") {
            image()
        }.map { it.measure(Constraints()) }

        val imageWidth = imagePlaceables.first().width
        val imageHeight = imagePlaceables.first().height

        // 测量内容
        val contentConstraints = Constraints(
            maxWidth = constraints.maxWidth - imageWidth - 16.dp.toPx().toInt()
        )
        val contentPlaceables = subcompose("content") {
            content()
        }.map { it.measure(contentConstraints) }

        val contentWidth = contentPlaceables.first().width
        val contentHeight = contentPlaceables.first().height

        // 决定布局方向
        val isHorizontal = (imageWidth + contentWidth + 16.dp.toPx()) <= constraints.maxWidth

        if (isHorizontal) {
            // 水平布局
            val totalWidth = imageWidth + contentWidth + 16.dp.toPx().toInt()
            val maxHeight = maxOf(imageHeight, contentHeight)

            layout(totalWidth, maxHeight) {
                imagePlaceables.forEach { it.placeRelative(0, 0) }
                contentPlaceables.forEach {
                    it.placeRelative(imageWidth + 16.dp.toPx().toInt(), 0)
                }
            }
        } else {
            // 垂直布局
            val totalHeight = imageHeight + contentHeight + 16.dp.toPx().toInt()

            layout(constraints.maxWidth, totalHeight) {
                imagePlaceables.forEach { it.placeRelative(0, 0) }
                contentPlaceables.forEach {
                    it.placeRelative(0, imageHeight + 16.dp.toPx().toInt())
                }
            }
        }
    }
}

// 使用
@Composable
fun ProductCard() {
    ResponsiveCard(
        image = {
            Image(
                painter = painterResource(R.drawable.product),
                contentDescription = null,
                modifier = Modifier.size(100.dp)
            )
        },
        content = {
            Column(modifier = Modifier.padding(8.dp)) {
                Text("产品名称", style = MaterialTheme.typography.titleMedium)
                Text("产品描述", style = MaterialTheme.typography.bodySmall)
                Text("价格：¥99", style = MaterialTheme.typography.bodyMedium)
            }
        },
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    )
}`
    },
    {
      title: '自适应标签云',
      description: '根据标签宽度自动换行',
      code: `@Composable
fun TagCloud(
    tags: List<String>,
    modifier: Modifier = Modifier
) {
    SubcomposeLayout(modifier = modifier) { constraints ->
        // 测量所有标签
        val tagPlaceables = tags.mapIndexed { index, tag ->
            subcompose(index) {
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = MaterialTheme.colorScheme.primaryContainer,
                    modifier = Modifier.padding(4.dp)
                ) {
                    Text(
                        text = tag,
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }.first().measure(Constraints())
        }

        // 计算布局
        var currentX = 0
        var currentY = 0
        var currentRowHeight = 0
        val positions = mutableListOf<Pair<Int, Int>>()

        tagPlaceables.forEach { placeable ->
            if (currentX + placeable.width > constraints.maxWidth && currentX > 0) {
                // 换行
                currentX = 0
                currentY += currentRowHeight
                currentRowHeight = 0
            }

            positions.add(currentX to currentY)
            currentX += placeable.width
            currentRowHeight = maxOf(currentRowHeight, placeable.height)
        }

        val totalHeight = currentY + currentRowHeight

        layout(constraints.maxWidth, totalHeight) {
            tagPlaceables.forEachIndexed { index, placeable ->
                val (x, y) = positions[index]
                placeable.placeRelative(x, y)
            }
        }
    }
}

// 使用
@Composable
fun ArticleScreen() {
    TagCloud(
        tags = listOf("Android", "Jetpack Compose", "Kotlin", "UI", "Material Design"),
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    )
}`
    },
  ],

  bestPractices: [
    {
      title: '为每个 subcompose 提供唯一 slotId',
      description: '避免组件复用导致的状态混乱',
      goodExample: `SubcomposeLayout { constraints ->
    val header = subcompose("header") { Header() }
    val content = subcompose("content") { Content() }
    val footer = subcompose("footer") { Footer() }
    // ...
}`,
      badExample: `SubcomposeLayout { constraints ->
    val header = subcompose(Unit) { Header() }
    val content = subcompose(Unit) { Content() }  // slotId 重复
    val footer = subcompose(Unit) { Footer() }
    // ...
}`
    },
    {
      title: '避免测量未使用的组件',
      description: '只测量和布局实际需要显示的组件',
      goodExample: `SubcomposeLayout { constraints ->
    val isWideScreen = constraints.maxWidth > 600.dp.toPx()

    val mainContent = subcompose("main") { MainContent() }
        .map { it.measure(constraints) }

    val sidebar = if (isWideScreen) {
        subcompose("sidebar") { Sidebar() }
            .map { it.measure(Constraints.fixedWidth(200)) }
    } else {
        emptyList()  // 窄屏不测量侧边栏
    }
    // ...
}`,
      badExample: `SubcomposeLayout { constraints ->
    val isWideScreen = constraints.maxWidth > 600.dp.toPx()

    val mainContent = subcompose("main") { MainContent() }
        .map { it.measure(constraints) }

    // 总是测量，即使不显示
    val sidebar = subcompose("sidebar") { Sidebar() }
        .map { it.measure(Constraints.fixedWidth(200)) }

    if (isWideScreen) {
        // 只在宽屏时布局
    }
}`
    },
    {
      title: '使用 SubcomposeLayoutState 优化性能',
      description: '频繁切换时复用组件状态',
      goodExample: `val layoutState = remember { SubcomposeLayoutState() }

SubcomposeLayout(state = layoutState) { constraints ->
    // layoutState 会缓存和复用 slot
    val content = subcompose("content") { Content() }
    // ...
}`,
    },
    {
      title: '合理使用测量约束',
      description: '传递正确的约束以获得预期的尺寸',
      goodExample: `SubcomposeLayout { constraints ->
    // 传递父约束
    val flexible = subcompose("flexible") { FlexibleContent() }
        .map { it.measure(constraints) }

    // 固定宽度
    val fixed = subcompose("fixed") { FixedContent() }
        .map { it.measure(Constraints.fixedWidth(200.dp.toPx().toInt())) }
    // ...
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'SubcomposeLayout 的执行时机',
      content: 'SubcomposeLayout 允许在测量阶段（而非组合阶段）动态创建子组件，可以根据测量结果决定组合哪些子组件'
    },
    {
      type: 'warning',
      title: 'SubcomposeLayout 比普通 Layout 开销更大',
      content: '由于在测量阶段组合子组件，SubcomposeLayout 的性能开销比普通 Layout 更高。仅在真正需要动态布局时使用'
    },
    {
      type: 'info',
      title: 'BoxWithConstraints 基于 SubcomposeLayout',
      content: 'BoxWithConstraints 内部使用 SubcomposeLayout 实现，允许根据可用空间调整内容'
    },
    {
      type: 'info',
      title: 'slotId 用于组件复用',
      content: '相同 slotId 的 subcompose 调用会复用之前的组件状态。不同 slotId 会创建新的组件实例'
    },
    {
      type: 'error',
      title: '避免在 subcompose 中读取外部状态',
      content: 'subcompose 在测量阶段执行，此时读取状态可能导致额外的重组。应该在测量前读取状态'
    },
    {
      type: 'warning',
      title: '测量顺序很重要',
      description: '子组件的测量顺序会影响布局结果，确保先测量依赖项，再测量依赖它的组件'
    },
  ],

  relatedComponents: ['box-with-constraints', 'custom-layout'],
  since: '1.0.0',
}
