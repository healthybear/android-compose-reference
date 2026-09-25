import type { ComponentEntry } from '../../types'

export const horizontalDividerComponent: ComponentEntry = {
  id: 'horizontal-divider',
  demo: { id: 'horizontal-divider', sourceFile: 'HorizontalDividerDemo.kt' },
  name: 'HorizontalDivider',
  category: 'Material',
  description: 'HorizontalDivider 是 Material Design 3 的水平分割线组件，用于在列表项、内容区块之间添加视觉分隔。支持自定义厚度、颜色和缩进。',
  tags: ['divider', 'separator', 'line', 'horizontal', 'delimiter'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，可控制宽度和内边距' },
    { name: 'thickness', type: 'Dp', default: 'DividerDefaults.Thickness (1.dp)', description: '线条厚度' },
    { name: 'color', type: 'Color', default: 'DividerDefaults.color', description: '线条颜色，默认使用主题的 outlineVariant' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `Column {
    Text("第一部分")
    HorizontalDivider()
    Text("第二部分")
    HorizontalDivider()
    Text("第三部分")
}`,
    },
    {
      title: '列表项之间的分割线',
      code: `Column {
    listItems.forEachIndexed { index, item ->
        ListItem(
            headlineContent = { Text(item.title) },
            supportingContent = { Text(item.subtitle) }
        )
        if (index < listItems.lastIndex) {
            HorizontalDivider()
        }
    }
}`,
    },
    {
      title: '带缩进的分割线',
      code: `Column {
    items.forEachIndexed { index, item ->
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 12.dp)
        ) {
            Icon(item.icon, contentDescription = null)
            Spacer(Modifier.width(16.dp))
            Text(item.text)
        }

        if (index < items.lastIndex) {
            // 左侧缩进 56dp（16dp padding + 24dp icon + 16dp spacing）
            HorizontalDivider(
                modifier = Modifier.padding(start = 56.dp)
            )
        }
    }
}`,
    },
    {
      title: '自定义样式',
      code: `Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
    // 粗分割线
    HorizontalDivider(
        thickness = 4.dp,
        color = MaterialTheme.colorScheme.primary
    )

    // 半透明分割线
    HorizontalDivider(
        thickness = 1.dp,
        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.12f)
    )

    // 虚线效果（使用 drawBehind）
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(1.dp)
            .drawBehind {
                drawLine(
                    color = Color.Gray,
                    start = Offset(0f, 0f),
                    end = Offset(size.width, 0f),
                    strokeWidth = 1.dp.toPx(),
                    pathEffect = PathEffect.dashPathEffect(floatArrayOf(10f, 10f))
                )
            }
    )
}`,
    },
    {
      title: '卡片中的分组',
      code: `Card(modifier = Modifier.fillMaxWidth()) {
    Column {
        Text(
            "账户信息",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(16.dp)
        )

        HorizontalDivider()

        ListItem(
            headlineContent = { Text("用户名") },
            trailingContent = { Text("张三") }
        )
        HorizontalDivider()

        ListItem(
            headlineContent = { Text("邮箱") },
            trailingContent = { Text("zhangsan@example.com") }
        )
        HorizontalDivider()

        ListItem(
            headlineContent = { Text("手机号") },
            trailingContent = { Text("138****8888") }
        )
    }
}`,
    },
    {
      title: '内边距控制',
      code: `Column {
    Text("标题", modifier = Modifier.padding(16.dp))

    // 全宽分割线
    HorizontalDivider()

    Text("内容 1", modifier = Modifier.padding(16.dp))

    // 左右各缩进 16dp
    HorizontalDivider(
        modifier = Modifier.padding(horizontal = 16.dp)
    )

    Text("内容 2", modifier = Modifier.padding(16.dp))
}`,
    },
  ],

  useCases: [
    {
      title: '设置页面分组',
      description: '使用分割线分隔不同的设置组',
      code: `@Composable
fun SettingsScreen() {
    LazyColumn {
        item {
            Text(
                "账户",
                style = MaterialTheme.typography.titleSmall,
                modifier = Modifier.padding(16.dp)
            )
        }

        item {
            SettingItem("个人信息", onClick = { })
        }
        item { HorizontalDivider(modifier = Modifier.padding(start = 16.dp)) }

        item {
            SettingItem("隐私设置", onClick = { })
        }
        item { HorizontalDivider() }

        item {
            Text(
                "通用",
                style = MaterialTheme.typography.titleSmall,
                modifier = Modifier.padding(16.dp)
            )
        }

        item {
            SettingItem("语言", onClick = { })
        }
        item { HorizontalDivider(modifier = Modifier.padding(start = 16.dp)) }

        item {
            SettingItem("主题", onClick = { })
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '避免在最后一项后添加分割线',
      description: '列表最后一项不需要分割线',
      goodExample: `items.forEachIndexed { index, item ->
    ListItem(item)
    if (index < items.lastIndex) {  // 最后一项不加
        HorizontalDivider()
    }
}`,
      badExample: `items.forEach { item ->
    ListItem(item)
    HorizontalDivider()  // 最后一项后也有分割线
}`
    },
    {
      title: '列表项分割线应缩进对齐内容',
      description: '缩进与列表项内容对齐，视觉更整齐',
      goodExample: `ListItem(
    leadingContent = { Icon(...) },  // 56dp (16+24+16)
    headlineContent = { Text("标题") }
)
HorizontalDivider(
    modifier = Modifier.padding(start = 56.dp)  // 对齐文字
)`,
      badExample: `ListItem(...)
HorizontalDivider()  // 从最左侧开始，割裂感强`
    },
    {
      title: '使用默认颜色确保主题适配',
      description: '避免硬编码颜色',
      goodExample: `HorizontalDivider()  // 使用默认主题色`,
      badExample: `HorizontalDivider(
    color = Color.Gray  // 深色模式下可能不可见
)`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'HorizontalDivider vs VerticalDivider',
      content: 'HorizontalDivider 用于垂直布局（Column），VerticalDivider 用于水平布局（Row）'
    },
    {
      type: 'info',
      title: '默认厚度为 1.dp',
      content: 'Material Design 3 标准分割线厚度为 1.dp，通常不需要修改'
    },
    {
      type: 'info',
      title: '使用 padding 控制缩进',
      content: 'Modifier.padding(start = 16.dp) 可以让分割线从指定位置开始，对齐内容'
    },
    {
      type: 'warning',
      title: '不要过度使用分割线',
      content: '过多分割线会让界面显得杂乱。考虑使用留白（Spacer）或背景色区分'
    },
  ],

  relatedComponents: ['vertical-divider', 'spacer', 'list-item'],
  since: '1.0.0',
}
