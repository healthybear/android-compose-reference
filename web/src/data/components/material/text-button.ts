import type { ComponentEntry } from '../../types'

export const textButtonComponent: ComponentEntry = {
  id: 'text-button',
  demo: { id: 'text-button', sourceFile: 'TextButtonDemo.kt' },
  name: 'TextButton',
  category: 'Material',
  description: '无背景无边框的文字按钮，用于低强调操作，如对话框内的操作或内联操作。',
  tags: ['button', 'text', 'flat', 'low-emphasis', '按钮'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互' },
    { name: 'shape', type: 'Shape', default: 'ButtonDefaults.textShape', description: '按钮形状' },
    { name: 'colors', type: 'ButtonColors', default: 'ButtonDefaults.textButtonColors()', description: '颜色配置' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'ButtonDefaults.TextButtonContentPadding', description: '内容内边距' },
    { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '按钮内容插槽' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `TextButton(onClick = { /* 了解更多 */ }) {
    Text("了解更多")
}`,
    },
    {
      title: '对话框内操作',
      code: `AlertDialog(
    onDismissRequest = { showDialog = false },
    title = { Text("确认删除？") },
    text = { Text("此操作不可撤销。") },
    confirmButton = {
        TextButton(onClick = { /* 删除 */ }) { Text("删除") }
    },
    dismissButton = {
        TextButton(onClick = { showDialog = false }) { Text("取消") }
    }
)`,
    },
    {
      title: '带图标',
      code: `TextButton(onClick = { /* 查看全部 */ }) {
    Text("查看全部")
    Spacer(Modifier.width(4.dp))
    Icon(
        Icons.AutoMirrored.Filled.KeyboardArrowRight,
        contentDescription = null,
        modifier = Modifier.size(18.dp)
    )
}`,
    },
    {
      title: '卡片底部操作',
      code: `Card(modifier = Modifier.fillMaxWidth()) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("标题", style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(8.dp))
        Text("内容描述...")
        Spacer(Modifier.height(12.dp))
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.End
        ) {
            TextButton(onClick = { /* 分享 */ }) {
                Text("分享")
            }
            TextButton(onClick = { /* 详情 */ }) {
                Text("详情")
            }
        }
    }
}`,
    },
    {
      title: '内联链接',
      code: `Row(
    verticalAlignment = Alignment.CenterVertically
) {
    Text("同意即表示您接受")
    TextButton(
        onClick = { /* 查看协议 */ },
        contentPadding = PaddingValues(horizontal = 4.dp)
    ) {
        Text("用户协议", textDecoration = TextDecoration.Underline)
    }
    Text("和")
    TextButton(
        onClick = { /* 查看隐私政策 */ },
        contentPadding = PaddingValues(horizontal = 4.dp)
    ) {
        Text("隐私政策", textDecoration = TextDecoration.Underline)
    }
}`,
    },
    {
      title: '列表项内操作',
      code: `LazyColumn {
    items(items) { item ->
        ListItem(
            headlineContent = { Text(item.title) },
            supportingContent = { Text(item.description) },
            trailingContent = {
                TextButton(onClick = { viewDetails(item) }) {
                    Text("查看")
                }
            }
        )
    }
}`,
    },
  ],

  useCases: [
    {
      title: '空状态页面',
      description: '在空状态页面使用 TextButton 提供轻量级操作',
      code: `@Composable
fun EmptyStateView(
    onRefresh: () -> Unit,
    onAddNew: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Icon(
            Icons.Default.Inbox,
            contentDescription = null,
            modifier = Modifier.size(120.dp),
            tint = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.4f)
        )

        Spacer(Modifier.height(16.dp))

        Text(
            text = "暂无内容",
            style = MaterialTheme.typography.titleLarge,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Spacer(Modifier.height(8.dp))

        Text(
            text = "还没有任何记录，点击下方按钮开始添加",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = TextAlign.Center
        )

        Spacer(Modifier.height(24.dp))

        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            TextButton(onClick = onRefresh) {
                Icon(Icons.Default.Refresh, contentDescription = null, modifier = Modifier.size(ButtonDefaults.IconSize))
                Spacer(Modifier.width(ButtonDefaults.IconSpacing))
                Text("刷新")
            }

            Button(onClick = onAddNew) {
                Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(ButtonDefaults.IconSize))
                Spacer(Modifier.width(ButtonDefaults.IconSpacing))
                Text("添加")
            }
        }
    }
}`
    },
    {
      title: '分段内容的"查看更多"',
      description: '在内容卡片或列表末尾添加查看更多按钮',
      code: `@Composable
fun RecentItemsSection(
    items: List<Item>,
    onViewAll: () -> Unit
) {
    Column(
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "最近项目",
                style = MaterialTheme.typography.titleMedium
            )
            TextButton(onClick = onViewAll) {
                Text("查看全部")
                Spacer(Modifier.width(4.dp))
                Icon(
                    Icons.AutoMirrored.Filled.KeyboardArrowRight,
                    contentDescription = null,
                    modifier = Modifier.size(18.dp)
                )
            }
        }

        LazyRow(
            contentPadding = PaddingValues(horizontal = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(items.take(5)) { item ->
                ItemCard(item)
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '用于最低强调的操作',
      description: 'TextButton 强调程度最低，适合可选或辅助性操作',
      goodExample: `Column {
    Button(onClick = { /* 主要 */ }) { Text("立即购买") }
    TextButton(onClick = { /* 辅助 */ }) { Text("了解更多") }
}`,
      badExample: `// 主要操作使用 TextButton，不够突出
Column {
    TextButton(onClick = { }) { Text("立即购买") }
    TextButton(onClick = { }) { Text("了解更多") }
}`
    },
    {
      title: '对话框推荐使用 TextButton',
      description: 'Material Design 3 推荐对话框操作按钮使用 TextButton',
      goodExample: `AlertDialog(
    onDismissRequest = { },
    confirmButton = { TextButton(onClick = { }) { Text("确认") } },
    dismissButton = { TextButton(onClick = { }) { Text("取消") } }
)`,
      badExample: `AlertDialog(
    onDismissRequest = { },
    confirmButton = { Button(onClick = { }) { Text("确认") } },
    dismissButton = { Button(onClick = { }) { Text("取消") } }
)`
    },
    {
      title: '减小内边距用于内联文本',
      description: '内联使用时调整 contentPadding 避免过多空白',
      goodExample: `Row {
    Text("阅读")
    TextButton(
        onClick = { },
        contentPadding = PaddingValues(horizontal = 4.dp)
    ) {
        Text("服务条款")
    }
}`,
      badExample: `Row {
    Text("阅读")
    TextButton(onClick = { }) {
        // 默认内边距过大，打断文字流
        Text("服务条款")
    }
}`
    },
    {
      title: '危险操作使用 error 颜色',
      description: '删除等破坏性操作使用 error 颜色警示',
      goodExample: `TextButton(
    onClick = { deleteItem() },
    colors = ButtonDefaults.textButtonColors(
        contentColor = MaterialTheme.colorScheme.error
    )
) {
    Text("删除")
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'TextButton 无背景无边框',
      content: 'TextButton 只有文字和可选图标，仅在按下时显示涟漪效果'
    },
    {
      type: 'info',
      title: '强调层次最低但仍可交互',
      content: 'TextButton 虽然强调程度最低，但仍然保持可点击状态的视觉反馈'
    },
    {
      type: 'warning',
      title: '不适合独立使用',
      content: 'TextButton 不应单独作为页面唯一的操作按钮，应配合更高强调的按钮使用'
    },
    {
      type: 'info',
      title: 'contentPadding 默认较小',
      content: 'TextButton 的默认 contentPadding 比其他按钮小，更适合密集排列和内联使用'
    },
    {
      type: 'info',
      title: '适合导航和链接',
      content: 'TextButton 非常适合用作内部导航链接，配合下划线效果可模拟超链接'
    },
    {
      type: 'error',
      title: '避免在复杂背景上使用',
      content: 'TextButton 无背景，在图片或复杂背景上可能难以辨识，应确保有足够对比度'
    },
  ],

  relatedComponents: ['button', 'outlined-button', 'filled-tonal-button', 'icon-button'],
  since: '1.0.0',
}
