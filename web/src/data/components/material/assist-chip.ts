import type { ComponentEntry } from '../../types'

export const assistChipComponent: ComponentEntry = {
  id: 'assist-chip',
  demo: { id: 'assist-chip', sourceFile: 'AssistChipDemo.kt' },
  name: 'AssistChip',
  category: 'Material',
  description: 'AssistChip 是辅助操作标签，用于触发与当前内容相关的辅助动作，如"添加到日历"、"分享"、"导航"等。通常配合图标使用，提供快捷操作入口。',
  tags: ['chip', 'assist', 'action', 'tag', 'button'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'label', type: '@Composable () -> Unit', required: true, description: '标签文字，通常为 Text 组件' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互，false 时显示禁用样式' },
    { name: 'leadingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '前置图标，使用 AssistChipDefaults.IconSize' },
    { name: 'trailingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '后置图标，不常用' },
    { name: 'shape', type: 'Shape', default: 'AssistChipDefaults.shape', description: '形状，默认圆角矩形' },
    { name: 'colors', type: 'ChipColors', default: 'AssistChipDefaults.assistChipColors()', description: '颜色配置' },
    { name: 'elevation', type: 'ChipElevation?', default: 'AssistChipDefaults.assistChipElevation()', description: '阴影配置' },
    { name: 'border', type: 'BorderStroke?', default: 'AssistChipDefaults.assistChipBorder()', description: '边框配置' },
    { name: 'interactionSource', type: 'MutableInteractionSource?', default: 'null', description: '交互状态源' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `AssistChip(
    onClick = { /* 添加到日历 */ },
    label = { Text("添加到日历") },
    leadingIcon = {
        Icon(
            Icons.Default.Event,
            contentDescription = null,
            modifier = Modifier.size(AssistChipDefaults.IconSize)
        )
    }
)`,
    },
    {
      title: 'Chip 组合',
      code: `Row(
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    modifier = Modifier.horizontalScroll(rememberScrollState())
) {
    AssistChip(
        onClick = { /* 分享 */ },
        label = { Text("分享") },
        leadingIcon = {
            Icon(
                Icons.Default.Share,
                contentDescription = null,
                modifier = Modifier.size(AssistChipDefaults.IconSize)
            )
        }
    )

    AssistChip(
        onClick = { /* 收藏 */ },
        label = { Text("收藏") },
        leadingIcon = {
            Icon(
                Icons.Default.Bookmark,
                contentDescription = null,
                modifier = Modifier.size(AssistChipDefaults.IconSize)
            )
        }
    )

    AssistChip(
        onClick = { /* 导航 */ },
        label = { Text("导航") },
        leadingIcon = {
            Icon(
                Icons.Default.Navigation,
                contentDescription = null,
                modifier = Modifier.size(AssistChipDefaults.IconSize)
            )
        }
    )
}`,
    },
    {
      title: '无图标 Chip',
      code: `Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    AssistChip(
        onClick = { /* 查看详情 */ },
        label = { Text("查看详情") }
    )

    AssistChip(
        onClick = { /* 了解更多 */ },
        label = { Text("了解更多") }
    )
}`,
    },
    {
      title: '禁用状态',
      code: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    AssistChip(
        onClick = { },
        label = { Text("正常状态") },
        leadingIcon = {
            Icon(
                Icons.Default.Check,
                contentDescription = null,
                modifier = Modifier.size(AssistChipDefaults.IconSize)
            )
        }
    )

    AssistChip(
        onClick = { },
        label = { Text("禁用状态") },
        enabled = false,
        leadingIcon = {
            Icon(
                Icons.Default.Check,
                contentDescription = null,
                modifier = Modifier.size(AssistChipDefaults.IconSize)
            )
        }
    )
}`,
    },
    {
      title: '自定义颜色',
      code: `AssistChip(
    onClick = { },
    label = { Text("自定义样式") },
    colors = AssistChipDefaults.assistChipColors(
        containerColor = MaterialTheme.colorScheme.primaryContainer,
        labelColor = MaterialTheme.colorScheme.onPrimaryContainer,
        leadingIconContentColor = MaterialTheme.colorScheme.onPrimaryContainer
    ),
    leadingIcon = {
        Icon(
            Icons.Default.Star,
            contentDescription = null,
            modifier = Modifier.size(AssistChipDefaults.IconSize)
        )
    }
)`,
    },
    {
      title: '可滚动的 Chip 列表',
      code: `val actions = listOf(
    "分享" to Icons.Default.Share,
    "收藏" to Icons.Default.Bookmark,
    "复制链接" to Icons.Default.Link,
    "下载" to Icons.Default.Download,
    "打印" to Icons.Default.Print
)

Row(
    modifier = Modifier
        .fillMaxWidth()
        .horizontalScroll(rememberScrollState())
        .padding(horizontal = 16.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp)
) {
    actions.forEach { (label, icon) ->
        AssistChip(
            onClick = { /* 处理操作 */ },
            label = { Text(label) },
            leadingIcon = {
                Icon(
                    icon,
                    contentDescription = null,
                    modifier = Modifier.size(AssistChipDefaults.IconSize)
                )
            }
        )
    }
}`,
    },
  ],

  useCases: [
    {
      title: '文章详情快捷操作',
      description: '在文章底部提供快捷操作',
      code: `@Composable
fun ArticleActions() {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        AssistChip(
            onClick = { /* 添加到收藏 */ },
            label = { Text("收藏") },
            leadingIcon = {
                Icon(
                    Icons.Default.Bookmark,
                    contentDescription = null,
                    modifier = Modifier.size(AssistChipDefaults.IconSize)
                )
            }
        )

        AssistChip(
            onClick = { /* 分享文章 */ },
            label = { Text("分享") },
            leadingIcon = {
                Icon(
                    Icons.Default.Share,
                    contentDescription = null,
                    modifier = Modifier.size(AssistChipDefaults.IconSize)
                )
            }
        )

        AssistChip(
            onClick = { /* 举报 */ },
            label = { Text("举报") },
            leadingIcon = {
                Icon(
                    Icons.Default.Report,
                    contentDescription = null,
                    modifier = Modifier.size(AssistChipDefaults.IconSize)
                )
            }
        )
    }
}`
    },
    {
      title: '地点信息快捷操作',
      description: '地图/位置相关的辅助操作',
      code: `@Composable
fun LocationActions(location: Location) {
    Row(
        modifier = Modifier.padding(16.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        AssistChip(
            onClick = { /* 导航到此地 */ },
            label = { Text("导航") },
            leadingIcon = {
                Icon(
                    Icons.Default.Navigation,
                    contentDescription = null,
                    modifier = Modifier.size(AssistChipDefaults.IconSize)
                )
            }
        )

        AssistChip(
            onClick = { /* 添加到日历 */ },
            label = { Text("添加提醒") },
            leadingIcon = {
                Icon(
                    Icons.Default.Event,
                    contentDescription = null,
                    modifier = Modifier.size(AssistChipDefaults.IconSize)
                )
            }
        )

        AssistChip(
            onClick = { /* 分享位置 */ },
            label = { Text("分享位置") },
            leadingIcon = {
                Icon(
                    Icons.Default.Share,
                    contentDescription = null,
                    modifier = Modifier.size(AssistChipDefaults.IconSize)
                )
            }
        )
    }
}`
    },
  ],

  bestPractices: [
    {
      title: 'AssistChip 用于辅助操作',
      description: 'AssistChip 用于次要操作，主要操作使用 Button',
      goodExample: `Column {
    Button(onClick = { /* 购买 */ }) { Text("立即购买") }
    Row {
        AssistChip(onClick = { /* 收藏 */ }, label = { Text("收藏") })
        AssistChip(onClick = { /* 分享 */ }, label = { Text("分享") })
    }
}`,
      badExample: `// 主要操作不应使用 AssistChip
AssistChip(onClick = { /* 提交订单 */ }, label = { Text("提交订单") })`
    },
    {
      title: '图标使用 AssistChipDefaults.IconSize',
      description: '确保图标尺寸符合规范',
      goodExample: `leadingIcon = {
    Icon(
        Icons.Default.Share,
        contentDescription = null,
        modifier = Modifier.size(AssistChipDefaults.IconSize)
    )
}`,
      badExample: `leadingIcon = {
    Icon(Icons.Default.Share, contentDescription = null)
    // 未设置尺寸，可能过大
}`
    },
    {
      title: '多个 Chip 使用 Row 或横向滚动',
      description: '确保 Chip 能完整显示',
      goodExample: `Row(
    modifier = Modifier.horizontalScroll(rememberScrollState()),
    horizontalArrangement = Arrangement.spacedBy(8.dp)
) {
    chips.forEach { chip ->
        AssistChip(...)
    }
}`,
      badExample: `// 使用 FlowRow 可能导致换行，Chip 不应换行
FlowRow {
    chips.forEach { AssistChip(...) }
}`
    },
    {
      title: 'Chip 文字应简洁',
      description: '标签文字应简短明了',
      goodExample: `AssistChip(
    onClick = { },
    label = { Text("分享") }  // 简洁
)`,
      badExample: `AssistChip(
    onClick = { },
    label = { Text("分享这篇文章给好友") }  // 过长
)`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Chip 有四种类型',
      content: 'AssistChip（辅助操作）、FilterChip（筛选）、InputChip（输入标签）、SuggestionChip（建议）'
    },
    {
      type: 'warning',
      title: 'AssistChip 不应用于筛选',
      content: '筛选功能应使用 FilterChip，它支持选中状态。AssistChip 只触发一次性操作'
    },
    {
      type: 'info',
      title: 'leadingIcon 比 trailingIcon 更常用',
      content: 'AssistChip 通常只使用前置图标。后置图标一般只用于 InputChip 的关闭按钮'
    },
    {
      type: 'info',
      title: 'Chip 可以不带图标',
      content: '简单的辅助操作可以省略图标，只使用文字标签'
    },
  ],

  relatedComponents: ['filter-chip', 'input-chip', 'suggestion-chip', 'button'],
  since: '1.0.0',
}
