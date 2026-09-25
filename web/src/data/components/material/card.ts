import type { ComponentEntry } from '../../types'

export const cardComponent: ComponentEntry = {
  id: 'card',
  demo: { id: 'card', sourceFile: 'CardDemo.kt' },
  name: 'Card',
  category: 'Material',
  description: 'Card 是 Material Design 3 的填充风格卡片容器，提供圆角、背景色和轻微阴影。支持点击交互，内容在 ColumnScope 中垂直排列。适合展示独立的信息块。',
  tags: ['card', 'container', 'surface', 'material', 'clickable'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、内边距等' },
    { name: 'shape', type: 'Shape', default: 'CardDefaults.shape', description: '卡片形状，默认 12.dp 圆角' },
    { name: 'colors', type: 'CardColors', default: 'CardDefaults.cardColors()', description: '颜色配置（背景色和内容色）' },
    { name: 'elevation', type: 'CardElevation', default: 'CardDefaults.cardElevation()', description: '阴影高度配置（默认/按下/聚焦/拖拽状态）' },
    { name: 'border', type: 'BorderStroke?', default: 'null', description: '边框描边' },
    { name: 'content', type: '@Composable ColumnScope.() -> Unit', required: true, description: '卡片内容，在 ColumnScope 中垂直排列' },
  ],
  examples: [
    {
      title: '基础卡片',
      code: `Card(modifier = Modifier.fillMaxWidth()) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("标题", style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(8.dp))
        Text("这是卡片的正文内容，可以放置任意 Composable。")
    }
}`,
    },
    {
      title: '可点击卡片',
      code: `Card(
    onClick = { navController.navigate("detail/\$id") },
    modifier = Modifier.fillMaxWidth()
) {
    Row(
        modifier = Modifier.padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(Icons.Default.Article, contentDescription = null)
        Spacer(Modifier.width(12.dp))
        Column {
            Text("文章标题", style = MaterialTheme.typography.titleSmall)
            Text("副标题", style = MaterialTheme.typography.bodySmall)
        }
    }
}`,
    },
    {
      title: '带图片的卡片',
      code: `Card(modifier = Modifier.width(300.dp)) {
    Column {
        AsyncImage(
            model = imageUrl,
            contentDescription = "封面图",
            modifier = Modifier
                .fillMaxWidth()
                .height(180.dp),
            contentScale = ContentScale.Crop
        )
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                "卡片标题",
                style = MaterialTheme.typography.titleLarge
            )
            Spacer(Modifier.height(8.dp))
            Text(
                "卡片描述内容，介绍相关信息。",
                style = MaterialTheme.typography.bodyMedium
            )
            Spacer(Modifier.height(16.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.End
            ) {
                TextButton(onClick = { }) {
                    Text("取消")
                }
                Spacer(Modifier.width(8.dp))
                TextButton(onClick = { }) {
                    Text("确认")
                }
            }
        }
    }
}`,
    },
    {
      title: '自定义颜色和阴影',
      code: `Card(
    colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.primaryContainer,
        contentColor = MaterialTheme.colorScheme.onPrimaryContainer
    ),
    elevation = CardDefaults.cardElevation(
        defaultElevation = 6.dp
    ),
    modifier = Modifier.fillMaxWidth()
) {
    Text(
        text = "高亮卡片",
        modifier = Modifier.padding(16.dp),
        style = MaterialTheme.typography.titleMedium
    )
}`,
    },
    {
      title: '带边框的卡片',
      code: `Card(
    border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline),
    colors = CardDefaults.cardColors(
        containerColor = Color.Transparent
    ),
    modifier = Modifier.fillMaxWidth()
) {
    Row(
        modifier = Modifier.padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            Icons.Default.Info,
            contentDescription = null,
            tint = MaterialTheme.colorScheme.primary
        )
        Spacer(Modifier.width(12.dp))
        Text("提示信息卡片")
    }
}`,
    },
    {
      title: '列表项卡片',
      code: `LazyColumn(
    contentPadding = PaddingValues(16.dp),
    verticalArrangement = Arrangement.spacedBy(12.dp)
) {
    items(items, key = { it.id }) { item ->
        Card(
            onClick = { onItemClick(item) },
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier.padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                AsyncImage(
                    model = item.imageUrl,
                    contentDescription = null,
                    modifier = Modifier
                        .size(60.dp)
                        .clip(RoundedCornerShape(8.dp))
                )
                Spacer(Modifier.width(12.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        item.title,
                        style = MaterialTheme.typography.titleMedium
                    )
                    Text(
                        item.subtitle,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                Icon(
                    Icons.AutoMirrored.Filled.KeyboardArrowRight,
                    contentDescription = null
                )
            }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '信息展示卡片',
      description: '使用卡片展示统计数据或关键信息',
      code: `@Composable
fun StatCard(
    title: String,
    value: String,
    icon: ImageVector,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier.width(150.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Icon(
                icon,
                contentDescription = null,
                modifier = Modifier.size(32.dp),
                tint = MaterialTheme.colorScheme.primary
            )
            Spacer(Modifier.height(8.dp))
            Text(
                value,
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold
            )
            Text(
                title,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

// 使用
Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
    StatCard("总用户", "1,234", Icons.Default.Person)
    StatCard("今日访问", "567", Icons.Default.Visibility)
}`
    },
    {
      title: '可选择卡片组',
      description: '实现单选或多选卡片列表',
      code: `@Composable
fun SelectableCardGroup(
    options: List<String>,
    selectedOption: String,
    onSelect: (String) -> Unit
) {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        options.forEach { option ->
            val isSelected = option == selectedOption
            Card(
                onClick = { onSelect(option) },
                colors = CardDefaults.cardColors(
                    containerColor = if (isSelected) {
                        MaterialTheme.colorScheme.primaryContainer
                    } else {
                        MaterialTheme.colorScheme.surface
                    }
                ),
                border = if (isSelected) {
                    BorderStroke(2.dp, MaterialTheme.colorScheme.primary)
                } else null,
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    RadioButton(
                        selected = isSelected,
                        onClick = null
                    )
                    Spacer(Modifier.width(12.dp))
                    Text(option)
                }
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 onClick 而非外层 clickable',
      description: 'Card 的 onClick 内置了涟漪效果和交互状态',
      goodExample: `Card(
    onClick = { /* 处理点击 */ }
) {
    Text("内容")
}`,
      badExample: `Card(
    modifier = Modifier.clickable { /* 处理点击 */ }
) {
    Text("内容")
    // clickable 在 Card 外层，涟漪效果异常
}`
    },
    {
      title: '内容使用 padding',
      description: 'Card 内容默认无内边距，需要手动添加',
      goodExample: `Card {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("标题")
        Text("内容")
    }
}`,
      badExample: `Card {
    Column {
        // 内容紧贴边缘，视觉效果不佳
        Text("标题")
        Text("内容")
    }
}`
    },
    {
      title: '使用主题色而非硬编码',
      description: '使用 CardDefaults 和主题色确保一致性',
      goodExample: `Card(
    colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.primaryContainer
    )
) { }`,
      badExample: `Card(
    colors = CardDefaults.cardColors(
        containerColor = Color(0xFFE3F2FD)
    )
) { }`
    },
    {
      title: '非点击卡片不要添加 onClick',
      description: '避免添加空 onClick，会导致不必要的交互状态',
      goodExample: `// 纯展示卡片，不添加 onClick
Card {
    Text("静态内容")
}`,
      badExample: `Card(onClick = {}) {
    // 空 onClick 会显示涟漪效果但无实际作用
    Text("静态内容")
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Card 的 content 在 ColumnScope 中',
      content: 'Card 内容默认垂直排列。如需水平布局，在内容中使用 Row'
    },
    {
      type: 'warning',
      title: 'Card 默认阴影很轻',
      content: 'Material 3 的 Card 默认阴影为 1.dp，非常轻微。如需更明显的层次感，使用 ElevatedCard 或自定义 elevation'
    },
    {
      type: 'info',
      title: '使用 ElevatedCard 和 OutlinedCard',
      content: 'Compose 提供 ElevatedCard（更高阴影）和 OutlinedCard（描边无填充）两种变体，API 与 Card 完全相同'
    },
    {
      type: 'info',
      title: 'CardElevation 支持交互状态',
      content: 'CardDefaults.cardElevation() 可以为不同状态（默认/按下/拖拽）设置不同阴影高度'
    },
    {
      type: 'error',
      title: '避免嵌套可点击元素',
      content: '如果 Card 有 onClick，内部不要再放置 Button 等可点击元素，会导致点击事件冲突。使用 IconButton 或分离交互区域'
    },
  ],

  relatedComponents: ['elevated-card', 'outlined-card', 'surface', 'list-item'],
  since: '1.0.0',
}
