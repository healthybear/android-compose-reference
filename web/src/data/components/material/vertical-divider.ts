import type { ComponentEntry } from '../../types'

export const verticalDividerComponent: ComponentEntry = {
  id: 'vertical-divider',
  name: 'VerticalDivider',
  category: 'Material',
  description: '垂直分割线，用于在水平排列的元素之间添加视觉分隔，通常用于 Row 或 BottomAppBar 中。',
  tags: ['divider', 'vertical', 'separator', '分割线'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，通常设置高度' },
    { name: 'thickness', type: 'Dp', default: 'DividerDefaults.Thickness', description: '线条粗细（1.dp）' },
    { name: 'color', type: 'Color', default: 'DividerDefaults.color', description: '线条颜色' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `Row(
    modifier = Modifier.height(40.dp),
    verticalAlignment = Alignment.CenterVertically
) {
    Text("左侧内容")
    VerticalDivider(
        modifier = Modifier.padding(horizontal = 8.dp)
    )
    Text("右侧内容")
}`,
    },
    {
      title: '工具栏中的分隔',
      code: `Row(
    modifier = Modifier
        .fillMaxWidth()
        .height(56.dp)
        .padding(horizontal = 8.dp),
    verticalAlignment = Alignment.CenterVertically
) {
    IconButton(onClick = {}) { Icon(Icons.Default.FormatBold, "粗体") }
    IconButton(onClick = {}) { Icon(Icons.Default.FormatItalic, "斜体") }
    IconButton(onClick = {}) { Icon(Icons.Default.FormatUnderlined, "下划线") }

    VerticalDivider(
        modifier = Modifier
            .height(24.dp)
            .padding(horizontal = 8.dp)
    )

    IconButton(onClick = {}) { Icon(Icons.Default.FormatAlignLeft, "左对齐") }
    IconButton(onClick = {}) { Icon(Icons.Default.FormatAlignCenter, "居中") }
    IconButton(onClick = {}) { Icon(Icons.Default.FormatAlignRight, "右对齐") }
}`,
    },
    {
      title: '自定义颜色和粗细',
      code: `Row(
    modifier = Modifier
        .height(48.dp)
        .padding(16.dp),
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.spacedBy(12.dp)
) {
    Text("项目 1")
    VerticalDivider(
        thickness = 2.dp,
        color = MaterialTheme.colorScheme.primary
    )
    Text("项目 2")
    VerticalDivider(
        thickness = 2.dp,
        color = MaterialTheme.colorScheme.primary
    )
    Text("项目 3")
}`,
    },
    {
      title: 'BottomAppBar 中的分隔',
      code: `BottomAppBar {
    IconButton(onClick = {}) { Icon(Icons.Default.Home, "首页") }
    IconButton(onClick = {}) { Icon(Icons.Default.Search, "搜索") }

    VerticalDivider(
        modifier = Modifier
            .height(32.dp)
            .padding(horizontal = 8.dp)
    )

    IconButton(onClick = {}) { Icon(Icons.Default.Notifications, "通知") }
    IconButton(onClick = {}) { Icon(Icons.Default.Person, "我的") }
}`,
    },
    {
      title: '卡片中的分栏布局',
      code: `Card(modifier = Modifier.fillMaxWidth()) {
    Row(
        modifier = Modifier
            .height(120.dp)
            .padding(16.dp)
    ) {
        Column(
            modifier = Modifier.weight(1f),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text("1234", style = MaterialTheme.typography.headlineMedium)
            Text("关注", style = MaterialTheme.typography.bodySmall)
        }

        VerticalDivider(
            modifier = Modifier.padding(horizontal = 16.dp)
        )

        Column(
            modifier = Modifier.weight(1f),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text("5678", style = MaterialTheme.typography.headlineMedium)
            Text("粉丝", style = MaterialTheme.typography.bodySmall)
        }

        VerticalDivider(
            modifier = Modifier.padding(horizontal = 16.dp)
        )

        Column(
            modifier = Modifier.weight(1f),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text("999", style = MaterialTheme.typography.headlineMedium)
            Text("获赞", style = MaterialTheme.typography.bodySmall)
        }
    }
}`,
    },
    {
      title: '导航栏分隔',
      code: `Row(
    modifier = Modifier
        .fillMaxWidth()
        .height(56.dp)
        .background(MaterialTheme.colorScheme.surface),
    verticalAlignment = Alignment.CenterVertically
) {
    TextButton(onClick = {}) { Text("首页") }
    VerticalDivider(modifier = Modifier.height(20.dp))
    TextButton(onClick = {}) { Text("分类") }
    VerticalDivider(modifier = Modifier.height(20.dp))
    TextButton(onClick = {}) { Text("购物车") }
    VerticalDivider(modifier = Modifier.height(20.dp))
    TextButton(onClick = {}) { Text("我的") }
}`,
    },
  ],

  useCases: [
    {
      title: '编辑器工具栏分组',
      description: '将相关的编辑功能按钮分组显示',
      code: `@Composable
fun EditorToolbar() {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .height(56.dp)
            .background(MaterialTheme.colorScheme.surface)
            .padding(horizontal = 8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        // 文本样式组
        IconButton(onClick = {}) { Icon(Icons.Default.FormatBold, "粗体") }
        IconButton(onClick = {}) { Icon(Icons.Default.FormatItalic, "斜体") }
        IconButton(onClick = {}) { Icon(Icons.Default.FormatUnderlined, "下划线") }

        VerticalDivider(
            modifier = Modifier
                .height(24.dp)
                .padding(horizontal = 8.dp)
        )

        // 对齐方式组
        IconButton(onClick = {}) { Icon(Icons.Default.FormatAlignLeft, "左对齐") }
        IconButton(onClick = {}) { Icon(Icons.Default.FormatAlignCenter, "居中") }
        IconButton(onClick = {}) { Icon(Icons.Default.FormatAlignRight, "右对齐") }

        VerticalDivider(
            modifier = Modifier
                .height(24.dp)
                .padding(horizontal = 8.dp)
        )

        // 列表组
        IconButton(onClick = {}) { Icon(Icons.Default.FormatListBulleted, "无序列表") }
        IconButton(onClick = {}) { Icon(Icons.Default.FormatListNumbered, "有序列表") }

        Spacer(Modifier.weight(1f))

        // 撤销重做组
        IconButton(onClick = {}) { Icon(Icons.Default.Undo, "撤销") }
        IconButton(onClick = {}) { Icon(Icons.Default.Redo, "重做") }
    }
}`
    },
    {
      title: '统计信息分栏',
      description: '用户资料卡片中的关注、粉丝、获赞统计',
      code: `@Composable
fun UserStatsCard(
    followingCount: Int,
    followersCount: Int,
    likesCount: Int,
    onFollowingClick: () -> Unit,
    onFollowersClick: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .height(100.dp)
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            // 关注
            Column(
                modifier = Modifier
                    .weight(1f)
                    .clickable { onFollowingClick() },
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Text(
                    text = formatCount(followingCount),
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "关注",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            VerticalDivider(
                modifier = Modifier.padding(horizontal = 12.dp)
            )

            // 粉丝
            Column(
                modifier = Modifier
                    .weight(1f)
                    .clickable { onFollowersClick() },
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Text(
                    text = formatCount(followersCount),
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "粉丝",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            VerticalDivider(
                modifier = Modifier.padding(horizontal = 12.dp)
            )

            // 获赞
            Column(
                modifier = Modifier.weight(1f),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Text(
                    text = formatCount(likesCount),
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "获赞",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

private fun formatCount(count: Int): String {
    return when {
        count >= 10000 -> (count / 10000).toString() + "w"
        count >= 1000 -> (count / 1000).toString() + "k"
        else -> count.toString()
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '明确指定 VerticalDivider 的高度',
      description: 'VerticalDivider 默认填满父容器高度，通常需要限制',
      goodExample: `Row(modifier = Modifier.height(48.dp)) {
    Text("左")
    VerticalDivider(modifier = Modifier.height(24.dp))  // 明确高度
    Text("右")
}`,
      badExample: `Row(modifier = Modifier.height(48.dp)) {
    Text("左")
    VerticalDivider()  // 高度会是 48.dp，可能过高
    Text("右")
}`
    },
    {
      title: '使用 padding 控制分隔线与内容的距离',
      description: '通过水平 padding 调整分隔线与内容的间距',
      goodExample: `VerticalDivider(
    modifier = Modifier.padding(horizontal = 8.dp)  // 左右各 8dp 间距
)`,
    },
    {
      title: 'VerticalDivider 用于 Row，HorizontalDivider 用于 Column',
      description: '根据布局方向选择合适的分隔线',
      goodExample: `// 水平布局用垂直分隔线
Row {
    Item1()
    VerticalDivider()
    Item2()
}

// 垂直布局用水平分隔线
Column {
    Item1()
    HorizontalDivider()
    Item2()
}`,
    },
    {
      title: '保持分隔线样式一致',
      description: '同一界面中的分隔线应使用一致的粗细和颜色',
      goodExample: `val dividerModifier = Modifier
    .height(24.dp)
    .padding(horizontal = 8.dp)

Row {
    Item1()
    VerticalDivider(modifier = dividerModifier)
    Item2()
    VerticalDivider(modifier = dividerModifier)
    Item3()
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'VerticalDivider 默认填满父容器高度',
      content: 'VerticalDivider 会自动填充父容器的高度。通常需要用 Modifier.height() 限制其高度'
    },
    {
      type: 'info',
      title: 'thickness 默认为 1.dp',
      content: 'VerticalDivider 的默认粗细是 1.dp，适合大多数场景。特殊需求可以自定义'
    },
    {
      type: 'info',
      title: '颜色默认使用 outline 颜色',
      content: 'VerticalDivider 默认使用 MaterialTheme.colorScheme.outline 颜色，与主题自动适配'
    },
    {
      type: 'warning',
      title: 'Row 需要有明确的高度',
      content: '如果 Row 没有明确的高度约束，VerticalDivider 可能显示异常。确保父容器有高度'
    },
    {
      type: 'info',
      title: '使用场景',
      content: 'VerticalDivider 适合工具栏按钮分组、统计信息分栏、导航项分隔等水平布局场景'
    },
  ],

  relatedComponents: ['horizontal-divider', 'row'],
  since: '1.0.0',
}
