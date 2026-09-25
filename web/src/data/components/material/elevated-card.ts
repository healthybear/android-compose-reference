import type { ComponentEntry } from '../../types'

export const elevatedCardComponent: ComponentEntry = {
  id: 'elevated-card',
  demo: { id: 'elevated-card', sourceFile: 'ElevatedCardDemo.kt' },
  name: 'ElevatedCard',
  category: 'Material',
  description: '带明显阴影的卡片，通过阴影高度与背景区分，适合需要突出层次感的内容。',
  tags: ['card', 'elevated', 'shadow', 'container', '阴影卡片'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'onClick', type: '(() -> Unit)?', default: 'null', description: '点击回调' },
    { name: 'shape', type: 'Shape', default: 'CardDefaults.elevatedShape', description: '形状' },
    { name: 'colors', type: 'CardColors', default: 'CardDefaults.elevatedCardColors()', description: '颜色配置' },
    { name: 'elevation', type: 'CardElevation', default: 'CardDefaults.elevatedCardElevation()', description: '阴影配置，默认高度更大' },
    { name: 'content', type: '@Composable ColumnScope.() -> Unit', required: true, description: '卡片内容' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `ElevatedCard(modifier = Modifier.fillMaxWidth()) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("突出显示的内容", style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(8.dp))
        Text("ElevatedCard 通过阴影与背景区分层次。")
    }
}`,
    },
    {
      title: '自定义阴影高度',
      code: `ElevatedCard(
    elevation = CardDefaults.elevatedCardElevation(defaultElevation = 8.dp),
    modifier = Modifier.fillMaxWidth()
) {
    Text("高阴影卡片", modifier = Modifier.padding(16.dp))
}`,
    },
    {
      title: '可点击卡片',
      code: `ElevatedCard(
    onClick = { navController.navigate("detail") },
    modifier = Modifier.fillMaxWidth()
) {
    Row(
        modifier = Modifier.padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            Icons.Default.Article,
            contentDescription = null,
            modifier = Modifier.size(40.dp),
            tint = MaterialTheme.colorScheme.primary
        )
        Spacer(Modifier.width(16.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = "文章标题",
                style = MaterialTheme.typography.titleMedium
            )
            Text(
                text = "点击查看详情",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
        Icon(
            Icons.AutoMirrored.Filled.KeyboardArrowRight,
            contentDescription = null
        )
    }
}`,
    },
    {
      title: '带图片的产品卡片',
      code: `ElevatedCard(
    modifier = Modifier.width(180.dp)
) {
    Column {
        AsyncImage(
            model = product.imageUrl,
            contentDescription = product.name,
            modifier = Modifier
                .fillMaxWidth()
                .height(180.dp),
            contentScale = ContentScale.Crop
        )
        Column(modifier = Modifier.padding(12.dp)) {
            Text(
                text = product.name,
                style = MaterialTheme.typography.titleSmall,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis
            )
            Spacer(Modifier.height(4.dp))
            Text(
                text = product.price,
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.primary,
                fontWeight = FontWeight.Bold
            )
        }
    }
}`,
    },
    {
      title: '浮动操作卡片',
      code: `Box(modifier = Modifier.fillMaxSize()) {
    // 主内容
    LazyColumn(
        modifier = Modifier.fillMaxSize()
    ) {
        items(20) {
            Text("列表项 $it", modifier = Modifier.padding(16.dp))
        }
    }

    // 浮动卡片
    ElevatedCard(
        modifier = Modifier
            .align(Alignment.BottomCenter)
            .padding(16.dp)
            .fillMaxWidth(),
        elevation = CardDefaults.elevatedCardElevation(defaultElevation = 6.dp)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text("共 3 项", style = MaterialTheme.typography.titleMedium)
                Text("总计: ¥128.00", style = MaterialTheme.typography.bodyMedium)
            }
            Button(onClick = { /* 结算 */ }) {
                Text("结算")
            }
        }
    }
}`,
    },
    {
      title: '网格卡片',
      code: `LazyVerticalGrid(
    columns = GridCells.Fixed(2),
    contentPadding = PaddingValues(16.dp),
    horizontalArrangement = Arrangement.spacedBy(12.dp),
    verticalArrangement = Arrangement.spacedBy(12.dp)
) {
    items(categories) { category ->
        ElevatedCard(
            onClick = { selectCategory(category) }
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Icon(
                    category.icon,
                    contentDescription = null,
                    modifier = Modifier.size(48.dp),
                    tint = MaterialTheme.colorScheme.primary
                )
                Spacer(Modifier.height(8.dp))
                Text(
                    text = category.name,
                    style = MaterialTheme.typography.titleSmall,
                    textAlign = TextAlign.Center
                )
            }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '仪表盘统计卡片',
      description: '使用 ElevatedCard 展示关键指标，通过阴影突出重要数据',
      code: `@Composable
fun DashboardStats() {
    LazyRow(
        contentPadding = PaddingValues(16.dp),
        horizontalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            StatCard(
                title = "今日访问",
                value = "1,234",
                change = "+12.5%",
                isPositive = true,
                icon = Icons.Default.Visibility
            )
        }
        item {
            StatCard(
                title = "新增用户",
                value = "89",
                change = "+8.2%",
                isPositive = true,
                icon = Icons.Default.PersonAdd
            )
        }
        item {
            StatCard(
                title = "收入",
                value = "¥5,678",
                change = "-3.1%",
                isPositive = false,
                icon = Icons.Default.AttachMoney
            )
        }
    }
}

@Composable
fun StatCard(
    title: String,
    value: String,
    change: String,
    isPositive: Boolean,
    icon: ImageVector
) {
    ElevatedCard(
        modifier = Modifier.width(160.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    icon,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.size(24.dp)
                )
                Surface(
                    color = if (isPositive) {
                        Color.Green.copy(alpha = 0.1f)
                    } else {
                        Color.Red.copy(alpha = 0.1f)
                    },
                    shape = RoundedCornerShape(4.dp)
                ) {
                    Text(
                        text = change,
                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                        style = MaterialTheme.typography.labelSmall,
                        color = if (isPositive) Color.Green else Color.Red
                    )
                }
            }
            Spacer(Modifier.height(12.dp))
            Text(
                text = value,
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = title,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}`
    },
    {
      title: '通知卡片',
      description: '重要通知使用 ElevatedCard 提高可见性',
      code: `@Composable
fun ImportantNotificationCard(
    notification: Notification,
    onDismiss: () -> Unit
) {
    ElevatedCard(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        elevation = CardDefaults.elevatedCardElevation(
            defaultElevation = 4.dp
        )
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        Icons.Default.Notifications,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary
                    )
                    Spacer(Modifier.width(8.dp))
                    Text(
                        text = "重要通知",
                        style = MaterialTheme.typography.titleMedium,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
                IconButton(onClick = onDismiss) {
                    Icon(Icons.Default.Close, contentDescription = "关闭")
                }
            }

            Spacer(Modifier.height(8.dp))

            Text(
                text = notification.title,
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Bold
            )

            Spacer(Modifier.height(4.dp))

            Text(
                text = notification.message,
                style = MaterialTheme.typography.bodyMedium
            )

            Spacer(Modifier.height(12.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.End
            ) {
                TextButton(onClick = { /* 稍后 */ }) {
                    Text("稍后提醒")
                }
                Spacer(Modifier.width(8.dp))
                Button(onClick = { /* 查看 */ }) {
                    Text("立即查看")
                }
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '用于突出重要内容',
      description: 'ElevatedCard 的阴影能吸引注意力，适合需要突出的内容',
      goodExample: `// 重要通知使用 ElevatedCard
ElevatedCard {
    Text("重要：系统将于今晚维护")
}
// 普通内容使用 Card
Card {
    Text("普通消息内容")
}`,
      badExample: `// 所有内容都用 ElevatedCard，失去重点
Column {
    ElevatedCard { Text("消息1") }
    ElevatedCard { Text("消息2") }
    ElevatedCard { Text("消息3") }
}`
    },
    {
      title: '避免过度使用阴影',
      description: '页面中阴影元素过多会显得杂乱',
      goodExample: `// 适度使用阴影
LazyColumn {
    item { ElevatedCard { /* 置顶卡片 */ } }
    items(normalItems) {
        Card { /* 普通卡片 */ }
    }
}`,
      badExample: `// 所有卡片都用阴影
LazyColumn {
    items(allItems) {
        ElevatedCard { /* 内容 */ }
    }
}`
    },
    {
      title: '根据场景调整阴影高度',
      description: '不同场景使用不同的阴影高度表达层次',
      goodExample: `// 普通卡片 2-4dp
ElevatedCard(
    elevation = CardDefaults.elevatedCardElevation(defaultElevation = 2.dp)
) { }

// 浮动卡片 6-8dp
ElevatedCard(
    elevation = CardDefaults.elevatedCardElevation(defaultElevation = 6.dp)
) { }`,
      badExample: `// 所有卡片使用相同过高阴影
ElevatedCard(
    elevation = CardDefaults.elevatedCardElevation(defaultElevation = 12.dp)
) { }`
    },
    {
      title: 'Card vs ElevatedCard 的选择',
      description: '普通内容用 Card，需要突出的用 ElevatedCard',
      goodExample: `// 普通列表项
Card { Text("列表项") }

// 特殊推荐项
ElevatedCard { Text("精选推荐") }`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'ElevatedCard 默认阴影为 1dp',
      content: 'ElevatedCard 的默认阴影高度为 1dp（Card 的阴影接近 0），按下时为 3dp'
    },
    {
      type: 'info',
      title: '阴影在浅色模式更明显',
      content: 'ElevatedCard 的阴影效果在浅色主题下更明显，深色模式下阴影效果较弱'
    },
    {
      type: 'info',
      title: '用于浮动内容',
      content: 'ElevatedCard 适合实现浮动工具栏、购物车底栏等覆盖在内容之上的元素'
    },
    {
      type: 'warning',
      title: '与 Card 的区别',
      content: 'ElevatedCard 和 Card 的主要区别是阴影高度，API 完全相同，可以互换使用'
    },
    {
      type: 'info',
      title: '搭配背景色使用',
      content: '在带背景色的页面上，ElevatedCard 的阴影效果能更好地区分层次'
    },
    {
      type: 'error',
      title: '避免嵌套使用',
      content: '不要在 ElevatedCard 内嵌套另一个 ElevatedCard，会造成阴影层次混乱'
    },
  ],

  relatedComponents: ['card', 'outlined-card', 'surface'],
  since: '1.0.0',
}
