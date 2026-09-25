import type { ComponentEntry } from '../../types'

export const customLayoutComponent: ComponentEntry = {
  id: 'custom-layout',
  demo: { id: 'custom-layout', sourceFile: 'CustomLayoutDemo.kt' },
  name: 'Layout（自定义布局）',
  category: 'Advanced',
  description: '完全自定义测量和放置逻辑的布局组件，通过 MeasurePolicy 控制子组件的尺寸和位置。',
  tags: ['layout', 'custom', 'measure', 'place', '自定义布局'],
  params: [
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '子组件内容' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'measurePolicy', type: 'MeasurePolicy', required: true, description: '测量策略，定义如何测量和放置子组件' },
  ],
  examples: [
    {
      title: '自定义垂直居中布局',
      code: `@Composable
fun CenteredColumn(
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit
) {
    Layout(
        content = content,
        modifier = modifier
    ) { measurables, constraints ->
        // 1. 测量所有子组件
        val placeables = measurables.map { measurable ->
            measurable.measure(constraints)
        }

        // 2. 计算总高度
        val totalHeight = placeables.sumOf { it.height }
        val width = constraints.maxWidth

        // 3. 布局并放置子组件
        layout(width, totalHeight) {
            var yOffset = 0
            placeables.forEach { placeable ->
                // 水平居中
                val xOffset = (width - placeable.width) / 2
                placeable.placeRelative(xOffset, yOffset)
                yOffset += placeable.height
            }
        }
    }
}`,
    },
    {
      title: '瀑布流布局',
      code: `@Composable
fun WaterfallLayout(
    modifier: Modifier = Modifier,
    columns: Int = 2,
    content: @Composable () -> Unit
) {
    Layout(
        content = content,
        modifier = modifier
    ) { measurables, constraints ->
        val columnWidth = constraints.maxWidth / columns
        val itemConstraints = constraints.copy(
            minWidth = 0,
            maxWidth = columnWidth
        )

        // 测量所有子项
        val placeables = measurables.map { it.measure(itemConstraints) }

        // 记录每列的当前高度
        val columnHeights = IntArray(columns) { 0 }

        // 计算总高度
        val height = placeables.maxOfOrNull { it.height }?.times(
            (placeables.size + columns - 1) / columns
        ) ?: 0

        layout(constraints.maxWidth, height) {
            placeables.forEach { placeable ->
                // 找到最短的列
                val column = columnHeights.indexOf(columnHeights.minOrNull()!!)
                val x = column * columnWidth
                val y = columnHeights[column]

                placeable.placeRelative(x, y)
                columnHeights[column] += placeable.height
            }
        }
    }
}`,
    },
    {
      title: '使用 layout Modifier',
      code: `// 单个组件使用 layout modifier 调整测量/放置
Text(
    text = "偏移文字",
    modifier = Modifier.layout { measurable, constraints ->
        val placeable = measurable.measure(constraints)

        // 报告比实际更小的高度（让后续组件上移）
        layout(placeable.width, placeable.height / 2) {
            placeable.placeRelative(0, 0)
        }
    }
)

// 添加基线对齐
Text(
    text = "Baseline",
    modifier = Modifier.layout { measurable, constraints ->
        val placeable = measurable.measure(constraints)

        layout(placeable.width, placeable.height) {
            // 自定义 baseline
            placeable.placeRelative(0, 0)
        }
    }
)`,
    },
    {
      title: '对角线布局',
      code: `@Composable
fun DiagonalLayout(
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit
) {
    Layout(
        content = content,
        modifier = modifier
    ) { measurables, constraints ->
        val placeables = measurables.map { measurable ->
            measurable.measure(constraints.copy(minWidth = 0, minHeight = 0))
        }

        val width = placeables.maxOfOrNull { it.width }?.times(placeables.size) ?: 0
        val height = placeables.maxOfOrNull { it.height }?.times(placeables.size) ?: 0

        layout(width, height) {
            placeables.forEachIndexed { index, placeable ->
                val offset = index * 50  // 对角线偏移
                placeable.placeRelative(offset, offset)
            }
        }
    }
}`,
    },
    {
      title: '自定义 Grid 布局',
      code: `@Composable
fun SimpleGrid(
    columns: Int,
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit
) {
    Layout(
        content = content,
        modifier = modifier
    ) { measurables, constraints ->
        val columnWidth = constraints.maxWidth / columns
        val rows = (measurables.size + columns - 1) / columns

        val itemConstraints = constraints.copy(
            minWidth = columnWidth,
            maxWidth = columnWidth,
            minHeight = 0
        )

        val placeables = measurables.map { it.measure(itemConstraints) }
        val rowHeight = placeables.maxOfOrNull { it.height } ?: 0
        val height = rowHeight * rows

        layout(constraints.maxWidth, height) {
            placeables.forEachIndexed { index, placeable ->
                val row = index / columns
                val column = index % columns
                placeable.placeRelative(
                    x = column * columnWidth,
                    y = row * rowHeight
                )
            }
        }
    }
}`,
    },
    {
      title: 'SubcomposeLayout 延迟测量',
      code: `@Composable
fun AdaptiveLayout(
    header: @Composable () -> Unit,
    content: @Composable (availableHeight: Dp) -> Unit
) {
    SubcomposeLayout { constraints ->
        // 先测量 header
        val headerPlaceables = subcompose("header", header).map {
            it.measure(constraints)
        }

        val headerHeight = headerPlaceables.maxOfOrNull { it.height } ?: 0
        val availableHeight = constraints.maxHeight - headerHeight

        // 根据剩余高度测量 content
        val contentPlaceables = subcompose("content") {
            content(availableHeight.toDp())
        }.map {
            it.measure(constraints.copy(
                maxHeight = availableHeight
            ))
        }

        val totalHeight = headerHeight + (contentPlaceables.maxOfOrNull { it.height } ?: 0)

        layout(constraints.maxWidth, totalHeight) {
            var y = 0
            headerPlaceables.forEach { placeable ->
                placeable.placeRelative(0, y)
                y += placeable.height
            }
            contentPlaceables.forEach { placeable ->
                placeable.placeRelative(0, y)
                y += placeable.height
            }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '自定义标签云布局',
      description: '实现带行高优化的标签云',
      code: `@Composable
fun TagCloudLayout(
    modifier: Modifier = Modifier,
    spacing: Dp = 8.dp,
    content: @Composable () -> Unit
) {
    Layout(
        content = content,
        modifier = modifier
    ) { measurables, constraints ->
        val spacingPx = spacing.roundToPx()
        val placeables = measurables.map { it.measure(constraints.copy(minWidth = 0)) }

        var currentX = 0
        var currentY = 0
        var maxRowHeight = 0
        val positions = mutableListOf<Pair<Int, Int>>()

        // 计算每个标签的位置
        placeables.forEach { placeable ->
            if (currentX + placeable.width > constraints.maxWidth && currentX > 0) {
                // 换行
                currentX = 0
                currentY += maxRowHeight + spacingPx
                maxRowHeight = 0
            }

            positions.add(currentX to currentY)
            maxRowHeight = maxOf(maxRowHeight, placeable.height)
            currentX += placeable.width + spacingPx
        }

        val totalHeight = currentY + maxRowHeight

        layout(constraints.maxWidth, totalHeight) {
            placeables.forEachIndexed { index, placeable ->
                val (x, y) = positions[index]
                placeable.placeRelative(x, y)
            }
        }
    }
}

// 使用
TagCloudLayout(
    modifier = Modifier.fillMaxWidth().padding(16.dp),
    spacing = 8.dp
) {
    listOf("Kotlin", "Compose", "Android", "Material3", "UI", "Jetpack").forEach { tag ->
        AssistChip(onClick = {}, label = { Text(tag) })
    }
}`
    },
    {
      title: '聊天气泡布局',
      description: '根据消息长度自适应的聊天气泡',
      code: `@Composable
fun ChatBubbleLayout(
    isSender: Boolean,
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit
) {
    Layout(
        content = content,
        modifier = modifier
    ) { measurables, constraints ->
        // 限制最大宽度为容器的 75%
        val maxBubbleWidth = (constraints.maxWidth * 0.75f).toInt()
        val bubbleConstraints = constraints.copy(
            minWidth = 0,
            maxWidth = maxBubbleWidth
        )

        val placeables = measurables.map { it.measure(bubbleConstraints) }
        val width = constraints.maxWidth
        val height = placeables.maxOfOrNull { it.height } ?: 0

        layout(width, height) {
            placeables.forEach { placeable ->
                val x = if (isSender) {
                    // 发送者：右对齐
                    width - placeable.width
                } else {
                    // 接收者：左对齐
                    0
                }
                placeable.placeRelative(x, 0)
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '理解测量和放置的两阶段',
      description: 'Layout 分为测量阶段和放置阶段，不要在测量阶段进行放置',
      goodExample: `Layout(content) { measurables, constraints ->
    // 1. 测量阶段
    val placeables = measurables.map { it.measure(constraints) }

    // 2. 确定自身尺寸
    val width = placeables.maxOfOrNull { it.width } ?: 0
    val height = placeables.sumOf { it.height }

    // 3. 放置阶段
    layout(width, height) {
        var y = 0
        placeables.forEach { placeable ->
            placeable.placeRelative(0, y)
            y += placeable.height
        }
    }
}`,
    },
    {
      title: '使用 placeRelative 而非 place',
      description: 'placeRelative 会自动处理 RTL 布局',
      goodExample: `layout(width, height) {
    placeable.placeRelative(x, y)  // 支持 RTL
}`,
      badExample: `layout(width, height) {
    placeable.place(x, y)  // 不支持 RTL
}`
    },
    {
      title: '约束传递要正确',
      description: '传递给子组件的约束必须符合父约束',
      goodExample: `Layout(content) { measurables, constraints ->
    val itemConstraints = constraints.copy(
        minWidth = 0,  // 放松最小宽度约束
        maxWidth = constraints.maxWidth / 2
    )
    val placeables = measurables.map { it.measure(itemConstraints) }
}`,
      badExample: `Layout(content) { measurables, constraints ->
    // 错误：子约束超出父约束
    val itemConstraints = constraints.copy(
        maxWidth = constraints.maxWidth * 2  // 超出父容器
    )
}`
    },
    {
      title: '优先使用现有布局组件',
      description: '只在确实需要时才创建自定义布局',
      goodExample: `// 简单布局：使用 Column/Row/Box
Column { ... }

// 需要特殊测量逻辑：使用 Layout
Layout { measurables, constraints -> ... }`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Layout 是 Compose 布局的基础',
      content: 'Column、Row、Box 等都是基于 Layout 实现的。自定义布局时直接使用 Layout 可以完全控制测量和放置逻辑'
    },
    {
      type: 'warning',
      title: 'Layout 不会自动处理内边距',
      content: 'Layout 本身不会处理 padding。如果需要内边距，在 modifier 中添加或在放置逻辑中手动处理'
    },
    {
      type: 'tip',
      title: 'SubcomposeLayout 用于延迟组合',
      content: 'SubcomposeLayout 允许根据第一批子组件的测量结果来决定后续子组件的组合。适合实现自适应布局'
    },
    {
      type: 'tip',
      title: 'layout Modifier 用于单个组件',
      content: 'Modifier.layout 可以在不创建完整 Layout 的情况下调整单个组件的测量和放置'
    },
    {
      type: 'danger',
      title: '每个 Measurable 只能测量一次',
      content: '在同一个布局过程中，每个 Measurable 只能调用一次 measure()。重复测量会抛出异常'
    },
    {
      type: 'tip',
      title: '使用 MeasurePolicy 复用测量逻辑',
      content: '可以创建 MeasurePolicy 对象来复用测量逻辑：val policy = MeasurePolicy { ... }，然后使用 Layout(content, measurePolicy = policy)'
    },
  ],

  relatedComponents: ['column', 'row', 'box', 'box-with-constraints'],
  since: '1.0.0',
}
