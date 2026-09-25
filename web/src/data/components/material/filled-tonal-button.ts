import type { ComponentEntry } from '../../types'

export const filledTonalButtonComponent: ComponentEntry = {
  id: 'filled-tonal-button',
  demo: { id: 'filled-tonal-button', sourceFile: 'FilledTonalButtonDemo.kt' },
  name: 'FilledTonalButton',
  category: 'Material',
  description: '使用次要容器色填充的按钮，强调程度介于 Button 和 OutlinedButton 之间。',
  tags: ['button', 'tonal', 'secondary', 'filled', '按钮'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互' },
    { name: 'shape', type: 'Shape', default: 'ButtonDefaults.filledTonalShape', description: '按钮形状' },
    { name: 'colors', type: 'ButtonColors', default: 'ButtonDefaults.filledTonalButtonColors()', description: '颜色配置' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'ButtonDefaults.ContentPadding', description: '内容内边距' },
    { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '按钮内容插槽' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `FilledTonalButton(onClick = { /* 保存草稿 */ }) {
    Text("保存草稿")
}`,
    },
    {
      title: '带图标',
      code: `FilledTonalButton(onClick = { /* 分享 */ }) {
    Icon(
        Icons.Default.Share,
        contentDescription = null,
        modifier = Modifier.size(ButtonDefaults.IconSize)
    )
    Spacer(Modifier.size(ButtonDefaults.IconSpacing))
    Text("分享")
}`,
    },
    {
      title: '强调程度对比',
      code: `Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
    Button(onClick = { /* 最高强调 */ }) {
        Text("立即购买")
    }
    FilledTonalButton(onClick = { /* 中等强调 */ }) {
        Text("加入购物车")
    }
    OutlinedButton(onClick = { /* 低强调 */ }) {
        Text("查看详情")
    }
}`,
    },
    {
      title: '工具栏操作',
      code: `Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.spacedBy(8.dp)
) {
    FilledTonalButton(
        onClick = { /* 编辑 */ },
        modifier = Modifier.weight(1f)
    ) {
        Icon(Icons.Default.Edit, contentDescription = null, modifier = Modifier.size(ButtonDefaults.IconSize))
        Spacer(Modifier.size(ButtonDefaults.IconSpacing))
        Text("编辑")
    }
    FilledTonalButton(
        onClick = { /* 分享 */ },
        modifier = Modifier.weight(1f)
    ) {
        Icon(Icons.Default.Share, contentDescription = null, modifier = Modifier.size(ButtonDefaults.IconSize))
        Spacer(Modifier.size(ButtonDefaults.IconSpacing))
        Text("分享")
    }
}`,
    },
    {
      title: '禁用状态',
      code: `FilledTonalButton(
    onClick = {},
    enabled = false
) {
    Text("不可用")
}`,
    },
    {
      title: '带加载状态',
      code: `var isLoading by remember { mutableStateOf(false) }

FilledTonalButton(
    onClick = {
        isLoading = true
        // 执行操作
    },
    enabled = !isLoading,
    modifier = Modifier.fillMaxWidth()
) {
    if (isLoading) {
        CircularProgressIndicator(
            modifier = Modifier.size(16.dp),
            strokeWidth = 2.dp,
            color = MaterialTheme.colorScheme.onSecondaryContainer
        )
        Spacer(Modifier.size(ButtonDefaults.IconSpacing))
    }
    Text(if (isLoading) "处理中..." else "提交")
}`,
    },
  ],

  useCases: [
    {
      title: '多步骤表单',
      description: '在多步骤流程中，使用 FilledTonalButton 作为"继续"按钮',
      code: `@Composable
fun MultiStepForm(
    currentStep: Int,
    totalSteps: Int,
    onPrevious: () -> Unit,
    onNext: () -> Unit,
    onSubmit: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        // 步骤指示器
        LinearProgressIndicator(
            progress = { currentStep.toFloat() / totalSteps },
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(Modifier.height(16.dp))

        Text(
            text = "步骤 $currentStep / $totalSteps",
            style = MaterialTheme.typography.labelLarge
        )

        Spacer(Modifier.height(24.dp))

        // 表单内容
        Text("表单内容区域...")

        Spacer(Modifier.height(32.dp))

        // 操作按钮
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            if (currentStep > 1) {
                OutlinedButton(
                    onClick = onPrevious,
                    modifier = Modifier.weight(1f)
                ) {
                    Text("上一步")
                }
            }

            if (currentStep < totalSteps) {
                FilledTonalButton(
                    onClick = onNext,
                    modifier = Modifier.weight(1f)
                ) {
                    Text("下一步")
                }
            } else {
                Button(
                    onClick = onSubmit,
                    modifier = Modifier.weight(1f)
                ) {
                    Text("完成")
                }
            }
        }
    }
}`
    },
    {
      title: '内容操作栏',
      description: '内容详情页的次要操作按钮组',
      code: `@Composable
fun ArticleActionBar(
    onEdit: () -> Unit,
    onShare: () -> Unit,
    onBookmark: () -> Unit,
    isBookmarked: Boolean
) {
    Surface(
        modifier = Modifier.fillMaxWidth(),
        tonalElevation = 2.dp
    ) {
        Row(
            modifier = Modifier
                .padding(horizontal = 16.dp, vertical = 12.dp)
                .fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            FilledTonalButton(
                onClick = onEdit,
                modifier = Modifier.weight(1f)
            ) {
                Icon(
                    Icons.Default.Edit,
                    contentDescription = null,
                    modifier = Modifier.size(ButtonDefaults.IconSize)
                )
                Spacer(Modifier.size(ButtonDefaults.IconSpacing))
                Text("编辑")
            }

            FilledTonalButton(
                onClick = onShare,
                modifier = Modifier.weight(1f)
            ) {
                Icon(
                    Icons.Default.Share,
                    contentDescription = null,
                    modifier = Modifier.size(ButtonDefaults.IconSize)
                )
                Spacer(Modifier.size(ButtonDefaults.IconSpacing))
                Text("分享")
            }

            FilledTonalButton(
                onClick = onBookmark,
                colors = if (isBookmarked) {
                    ButtonDefaults.filledTonalButtonColors(
                        containerColor = MaterialTheme.colorScheme.primaryContainer
                    )
                } else {
                    ButtonDefaults.filledTonalButtonColors()
                }
            ) {
                Icon(
                    if (isBookmarked) Icons.Default.Bookmark else Icons.Default.BookmarkBorder,
                    contentDescription = if (isBookmarked) "取消收藏" else "收藏"
                )
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '用于中等强调的操作',
      description: 'FilledTonalButton 强调程度介于 Button 和 OutlinedButton 之间',
      goodExample: `// 主次分明的按钮组合
Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    Button(onClick = { /* 主要 */ }) { Text("立即购买") }
    FilledTonalButton(onClick = { /* 次要 */ }) { Text("加入购物车") }
}`,
      badExample: `// 两个主要按钮，强调不明确
Row {
    Button(onClick = { }) { Text("购买") }
    Button(onClick = { }) { Text("加入购物车") }
}`
    },
    {
      title: '避免与 Button 颜色混淆',
      description: '使用默认的 secondaryContainer 颜色，不要自定义为 primary 色',
      goodExample: `FilledTonalButton(
    onClick = { },
    colors = ButtonDefaults.filledTonalButtonColors()
) { Text("操作") }`,
      badExample: `FilledTonalButton(
    onClick = { },
    colors = ButtonDefaults.filledTonalButtonColors(
        containerColor = MaterialTheme.colorScheme.primary
    )
) { Text("操作") }  // 与 Button 视觉相同，失去区分度`
    },
    {
      title: '适合工具栏和操作栏',
      description: 'FilledTonalButton 的柔和背景色适合密集排列的工具栏',
      goodExample: `Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    FilledTonalButton(onClick = { }) { Text("编辑") }
    FilledTonalButton(onClick = { }) { Text("分享") }
    FilledTonalButton(onClick = { }) { Text("删除") }
}`,
      badExample: `// Button 密集排列视觉过于强烈
Row {
    Button(onClick = { }) { Text("编辑") }
    Button(onClick = { }) { Text("分享") }
    Button(onClick = { }) { Text("删除") }
}`
    },
    {
      title: '搭配主题色使用',
      description: '使用主题的 secondaryContainer 确保一致性',
      goodExample: `FilledTonalButton(
    onClick = { },
    colors = ButtonDefaults.filledTonalButtonColors()
) { Text("操作") }`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'FilledTonalButton 使用次要容器色',
      content: 'FilledTonalButton 默认使用 secondaryContainer 作为背景色，onSecondaryContainer 作为内容色'
    },
    {
      type: 'tip',
      title: '强调层次：Button > FilledTonalButton > OutlinedButton > TextButton',
      content: 'FilledTonalButton 在视觉层次中处于中间位置，适合次要但仍需一定强调的操作'
    },
    {
      type: 'tip',
      title: '适合替代 ElevatedButton',
      content: '在需要填充样式但不需要最高强调时，FilledTonalButton 是比 ElevatedButton 更现代的选择'
    },
    {
      type: 'warning',
      title: '不要过度使用',
      content: '一个界面中不要使用过多 FilledTonalButton，会降低主按钮的辨识度'
    },
    {
      type: 'tip',
      title: '搭配图标效果更好',
      content: 'FilledTonalButton 配合图标使用时，能更清晰地传达操作意图'
    },
    {
      type: 'danger',
      title: '避免用于破坏性操作',
      content: '删除、清空等危险操作应使用 OutlinedButton 或 TextButton 降低强调，不要使用 FilledTonalButton'
    },
  ],

  relatedComponents: ['button', 'elevated-button', 'outlined-button', 'text-button'],
  since: '1.0.0',
}
