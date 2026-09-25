import type { ComponentEntry } from '../../types'

export const flowColumnComponent: ComponentEntry = {
  id: 'flow-column',
  demo: { id: 'flow-column', sourceFile: 'FlowColumnDemo.kt' },
  name: 'FlowColumn',
  category: 'Layout',
  description: '垂直流式布局，子元素超出高度时自动换列。',
  tags: ['flowcolumn', 'layout', 'wrap', 'flow', 'column'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'verticalArrangement', type: 'Arrangement.Vertical', default: 'Arrangement.Top', description: '垂直排列方式' },
    { name: 'horizontalArrangement', type: 'Arrangement.Horizontal', default: 'Arrangement.Start', description: '列间水平排列方式' },
    { name: 'maxItemsInEachColumn', type: 'Int', default: 'Int.MAX_VALUE', description: '每列最多子元素数' },
    { name: 'content', type: '@Composable FlowColumnScope.() -> Unit', required: true, description: '子元素内容' },
  ],
  examples: [
    {
      title: '基础垂直流式布局',
      code: `FlowColumn(
    modifier = Modifier
        .height(300.dp)
        .padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp)
) {
    repeat(10) { index ->
        Card(
            modifier = Modifier
                .width(80.dp)
                .height(60.dp)
        ) {
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier.fillMaxSize()
            ) {
                Text("项 " + (index + 1))
            }
        }
    }
}`,
    },
    {
      title: '限制每列最大项数',
      code: `FlowColumn(
    modifier = Modifier
        .height(400.dp)
        .fillMaxWidth()
        .padding(16.dp),
    maxItemsInEachColumn = 4,
    verticalArrangement = Arrangement.spacedBy(8.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp)
) {
    repeat(10) { index ->
        AssistChip(
            onClick = {},
            label = { Text("选项 " + (index + 1)) }
        )
    }
}`,
    },
    {
      title: '不同对齐方式',
      code: `Row(
    modifier = Modifier
        .fillMaxSize()
        .padding(16.dp),
    horizontalArrangement = Arrangement.spacedBy(16.dp)
) {
    // Top 对齐
    FlowColumn(
        modifier = Modifier
            .weight(1f)
            .height(300.dp)
            .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
            .padding(8.dp),
        verticalArrangement = Arrangement.Top,
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        repeat(6) {
            Card(modifier = Modifier.size(60.dp, 40.dp)) {
                Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Text((it + 1).toString())
                }
            }
        }
    }

    // Center 对齐
    FlowColumn(
        modifier = Modifier
            .weight(1f)
            .height(300.dp)
            .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
            .padding(8.dp),
        verticalArrangement = Arrangement.Center,
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        repeat(6) {
            Card(modifier = Modifier.size(60.dp, 40.dp)) {
                Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Text((it + 1).toString())
                }
            }
        }
    }
}`,
    },
    {
      title: '侧边栏菜单',
      code: `FlowColumn(
    modifier = Modifier
        .width(200.dp)
        .fillMaxHeight()
        .background(MaterialTheme.colorScheme.surface)
        .padding(8.dp),
    verticalArrangement = Arrangement.spacedBy(4.dp)
) {
    val menuItems = listOf(
        "仪表盘" to Icons.Default.Dashboard,
        "用户" to Icons.Default.Person,
        "设置" to Icons.Default.Settings,
        "消息" to Icons.Default.Notifications,
        "帮助" to Icons.Default.Help
    )

    menuItems.forEach { (label, icon) ->
        NavigationDrawerItem(
            icon = { Icon(icon, contentDescription = null) },
            label = { Text(label) },
            selected = false,
            onClick = {},
            modifier = Modifier.fillMaxWidth()
        )
    }
}`,
    },
    {
      title: '时间轴布局',
      code: `FlowColumn(
    modifier = Modifier
        .width(120.dp)
        .height(400.dp)
        .padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp)
) {
    val timeSlots = listOf("09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00")

    timeSlots.forEach { time ->
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(
                text = time,
                style = MaterialTheme.typography.bodySmall,
                fontWeight = FontWeight.Bold
            )
            Box(
                modifier = Modifier
                    .size(8.dp)
                    .background(MaterialTheme.colorScheme.primary, CircleShape)
            )
        }
    }
}`,
    },
    {
      title: '垂直标签列表',
      code: `FlowColumn(
    modifier = Modifier
        .width(160.dp)
        .height(500.dp)
        .padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp)
) {
    val categories = listOf(
        "技术", "设计", "产品", "运营", "市场",
        "前端", "后端", "移动端", "数据", "AI"
    )

    categories.forEach { category ->
        SuggestionChip(
            onClick = {},
            label = { Text(category) },
            modifier = Modifier.fillMaxWidth()
        )
    }
}`,
    },
  ],

  useCases: [
    {
      title: '垂直滚动的筛选面板',
      description: '实现固定宽度、可滚动的筛选选项列表',
      code: `@Composable
fun VerticalFilterPanel(
    categories: List<Category>,
    selectedCategory: Category?,
    onCategorySelected: (Category) -> Unit
) {
    Surface(
        modifier = Modifier
            .width(200.dp)
            .fillMaxHeight(),
        color = MaterialTheme.colorScheme.surface,
        tonalElevation = 1.dp
    ) {
        Column {
            Text(
                text = "分类筛选",
                style = MaterialTheme.typography.titleMedium,
                modifier = Modifier.padding(16.dp)
            )

            HorizontalDivider()

            FlowColumn(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f)
                    .verticalScroll(rememberScrollState())
                    .padding(8.dp),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                categories.forEach { category ->
                    FilterChip(
                        selected = category == selectedCategory,
                        onClick = { onCategorySelected(category) },
                        label = {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(category.name)
                                if (category.count > 0) {
                                    Text(
                                        text = "12",
                                        style = MaterialTheme.typography.bodySmall,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant
                                    )
                                }
                            }
                        },
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            }
        }
    }
}`
    },
    {
      title: '多列卡片布局',
      description: '在有限高度内展示多列卡片，超出高度自动增加列数',
      code: `@Composable
fun MultiColumnCardLayout(
    items: List<Item>,
    containerHeight: Dp = 600.dp
) {
    FlowColumn(
        modifier = Modifier
            .fillMaxWidth()
            .height(containerHeight)
            .padding(16.dp),
        maxItemsInEachColumn = 3,
        verticalArrangement = Arrangement.spacedBy(12.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items.forEach { item ->
            Card(
                modifier = Modifier
                    .width(180.dp)
                    .height(160.dp),
                onClick = { /* 打开详情 */ }
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(12.dp)
                ) {
                    AsyncImage(
                        model = item.imageUrl,
                        contentDescription = null,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(80.dp)
                            .clip(RoundedCornerShape(8.dp)),
                        contentScale = ContentScale.Crop
                    )

                    Spacer(Modifier.height(8.dp))

                    Text(
                        text = item.title,
                        style = MaterialTheme.typography.titleSmall,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )

                    Spacer(Modifier.weight(1f))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            text = "¥188.00",
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.primary
                        )
                        Text(
                            text = "2.3k 销量",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
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
      title: 'FlowColumn 需要明确的高度约束',
      description: 'FlowColumn 需要知道何时换列，必须提供明确的高度',
      goodExample: `// 方式 1：固定高度
FlowColumn(modifier = Modifier.height(300.dp)) { }

// 方式 2：填充父容器
FlowColumn(modifier = Modifier.fillMaxHeight()) { }

// 方式 3：使用 weight
Column {
    FlowColumn(modifier = Modifier.weight(1f)) { }
}`,
      badExample: `// 没有高度约束，FlowColumn 无法正确换列
FlowColumn {
    items.forEach { item -> ItemCard(item) }
}`
    },
    {
      title: 'FlowColumn vs Column',
      description: '根据是否需要自动换列选择组件',
      goodExample: `// 需要自动换列：使用 FlowColumn
FlowColumn(modifier = Modifier.height(300.dp)) {
    repeat(20) { Item(it) }  // 自动分成多列
}

// 单列布局：使用 Column
Column(modifier = Modifier.verticalScroll(rememberScrollState())) {
    repeat(20) { Item(it) }  // 垂直滚动
}`,
    },
    {
      title: '使用 maxItemsInEachColumn 控制列高',
      description: '限制每列的最大项数，避免列过长',
      goodExample: `FlowColumn(
    modifier = Modifier.height(400.dp),
    maxItemsInEachColumn = 5  // 每列最多 5 项
) {
    items.forEach { item -> ItemCard(item) }
}`,
    },
    {
      title: '结合滚动使用',
      description: 'FlowColumn 本身不可滚动，需要包裹在 ScrollableColumn 中',
      goodExample: `Column(
    modifier = Modifier
        .width(200.dp)
        .verticalScroll(rememberScrollState())
) {
    FlowColumn(
        modifier = Modifier.height(300.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items.forEach { item -> ItemCard(item) }
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'FlowColumn 自动换列特性',
      content: 'FlowColumn 在子项超出可用高度时自动创建新列，类似报纸的分栏效果'
    },
    {
      type: 'warning',
      title: 'FlowColumn 必须有明确的高度',
      content: 'FlowColumn 需要知道可用高度来决定何时换列。如果没有高度约束，所有子项会被放在第一列'
    },
    {
      type: 'info',
      title: 'verticalArrangement 控制列内排列',
      content: 'verticalArrangement 控制每列内子项的垂直排列方式，horizontalArrangement 控制列与列之间的间距'
    },
    {
      type: 'info',
      title: 'maxItemsInEachColumn 限制列长度',
      content: 'maxItemsInEachColumn 限制每列最多包含的子项数，达到上限后强制换列，即使还有剩余高度'
    },
    {
      type: 'error',
      title: 'FlowColumn 不支持懒加载',
      content: 'FlowColumn 会立即组合所有子项。如果子项数量很多，考虑使用 LazyHorizontalGrid 或分页加载'
    },
    {
      type: 'info',
      title: 'FlowColumn 的使用场景较少',
      content: 'FlowColumn 适用于固定高度容器内的多列布局。大多数场景下，LazyVerticalGrid 或 Row 更合适'
    },
  ],

  relatedComponents: ['flow-row', 'column', 'lazy-horizontal-grid'],
  since: '1.4.0',
}
