import type { ComponentEntry } from '../../types'

export const elevatedButtonComponent: ComponentEntry = {
  id: 'elevated-button',
  demo: { id: 'elevated-button', sourceFile: 'ElevatedButtonDemo.kt' },
  name: 'ElevatedButton',
  category: 'Material',
  description: '带阴影的低强调按钮，用于需要与背景区分但不需要强调的操作。',
  tags: ['button', 'elevated', 'shadow', 'low-emphasis', '按钮'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互' },
    { name: 'shape', type: 'Shape', default: 'ButtonDefaults.elevatedShape', description: '按钮形状' },
    { name: 'colors', type: 'ButtonColors', default: 'ButtonDefaults.elevatedButtonColors()', description: '颜色配置' },
    { name: 'elevation', type: 'ButtonElevation?', default: 'ButtonDefaults.elevatedButtonElevation()', description: '阴影高度配置' },
    { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '按钮内容插槽' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `ElevatedButton(onClick = { /* 操作 */ }) {
    Text("操作")
}`,
    },
    {
      title: '禁用状态',
      code: `ElevatedButton(
    onClick = {},
    enabled = false
) {
    Text("不可用")
}`,
    },
    {
      title: '带图标',
      code: `ElevatedButton(onClick = { /* 导出 */ }) {
    Icon(
        Icons.Default.Download,
        contentDescription = null,
        modifier = Modifier.size(ButtonDefaults.IconSize)
    )
    Spacer(Modifier.size(ButtonDefaults.IconSpacing))
    Text("导出")
}`,
    },
    {
      title: '卡片操作按钮',
      code: `Card(modifier = Modifier.fillMaxWidth()) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("文章标题", style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(8.dp))
        Text("文章摘要内容...")
        Spacer(Modifier.height(16.dp))
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            ElevatedButton(
                onClick = { /* 查看详情 */ },
                modifier = Modifier.weight(1f)
            ) {
                Text("查看详情")
            }
            ElevatedButton(onClick = { /* 分享 */ }) {
                Icon(Icons.Default.Share, contentDescription = "分享")
            }
        }
    }
}`,
    },
    {
      title: '自定义阴影',
      code: `ElevatedButton(
    onClick = { /* 操作 */ },
    elevation = ButtonDefaults.elevatedButtonElevation(
        defaultElevation = 4.dp,
        pressedElevation = 8.dp,
        disabledElevation = 0.dp
    )
) {
    Text("自定义阴影")
}`,
    },
    {
      title: '全宽按钮',
      code: `ElevatedButton(
    onClick = { /* 继续 */ },
    modifier = Modifier.fillMaxWidth()
) {
    Text("继续")
}`,
    },
  ],

  useCases: [
    {
      title: '白色背景上的次要操作',
      description: '在白色或浅色背景上，通过阴影突出次要操作按钮',
      code: `@Composable
fun ProductCard(product: Product) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        )
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            AsyncImage(
                model = product.imageUrl,
                contentDescription = null,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(180.dp)
                    .clip(RoundedCornerShape(8.dp))
            )
            Spacer(Modifier.height(12.dp))
            Text(
                text = product.name,
                style = MaterialTheme.typography.titleMedium
            )
            Text(
                text = product.price,
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.primary
            )
            Spacer(Modifier.height(12.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                ElevatedButton(
                    onClick = { addToCart(product) },
                    modifier = Modifier.weight(1f)
                ) {
                    Icon(
                        Icons.Default.ShoppingCart,
                        contentDescription = null,
                        modifier = Modifier.size(ButtonDefaults.IconSize)
                    )
                    Spacer(Modifier.size(ButtonDefaults.IconSpacing))
                    Text("加入购物车")
                }
                ElevatedButton(onClick = { addToWishlist(product) }) {
                    Icon(Icons.Default.FavoriteBorder, contentDescription = "收藏")
                }
            }
        }
    }
}`
    },
    {
      title: '导航栏操作按钮',
      description: '在顶部导航栏或工具栏中使用阴影按钮区分操作',
      code: `@Composable
fun EditorToolbar(
    onSave: () -> Unit,
    onPreview: () -> Unit
) {
    Surface(
        modifier = Modifier.fillMaxWidth(),
        tonalElevation = 2.dp
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "文档编辑器",
                style = MaterialTheme.typography.titleMedium,
                modifier = Modifier.weight(1f)
            )
            ElevatedButton(onClick = onPreview) {
                Icon(
                    Icons.Default.Visibility,
                    contentDescription = null,
                    modifier = Modifier.size(ButtonDefaults.IconSize)
                )
                Spacer(Modifier.size(ButtonDefaults.IconSpacing))
                Text("预览")
            }
            Button(onClick = onSave) {
                Text("保存")
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '用于浅色背景上的次要操作',
      description: 'ElevatedButton 通过阴影与背景区分，适合浅色背景',
      goodExample: `// 白色卡片上的操作按钮
Card(colors = CardDefaults.cardColors(containerColor = Color.White)) {
    ElevatedButton(onClick = { }) {
        Text("操作")
    }
}`,
      badExample: `// 深色背景上阴影不明显
Surface(color = Color.DarkGray) {
    ElevatedButton(onClick = { }) {
        Text("操作")
    }
}`
    },
    {
      title: '与 Button 搭配使用',
      description: 'ElevatedButton 强调程度低于 Button，适合并列次要操作',
      goodExample: `Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    ElevatedButton(onClick = { /* 次要 */ }) {
        Text("取消")
    }
    Button(onClick = { /* 主要 */ }) {
        Text("确认")
    }
}`,
      badExample: `// 两个都用 ElevatedButton，缺少主次区分
Row {
    ElevatedButton(onClick = { }) { Text("取消") }
    ElevatedButton(onClick = { }) { Text("确认") }
}`
    },
    {
      title: '避免过度使用阴影',
      description: '阴影过多会让界面显得杂乱，一个区域内不要使用太多阴影元素',
      goodExample: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    // 只在需要的地方使用阴影
    ElevatedButton(onClick = { }) { Text("操作1") }
    TextButton(onClick = { }) { Text("操作2") }
}`,
      badExample: `// 阴影过多，视觉混乱
Column {
    ElevatedButton(onClick = { }) { Text("操作1") }
    ElevatedButton(onClick = { }) { Text("操作2") }
    ElevatedButton(onClick = { }) { Text("操作3") }
}`
    },
    {
      title: '根据状态调整阴影高度',
      description: '使用 elevation 参数为不同交互状态设置合适的阴影',
      goodExample: `ElevatedButton(
    onClick = { },
    elevation = ButtonDefaults.elevatedButtonElevation(
        defaultElevation = 2.dp,
        pressedElevation = 6.dp
    )
) { Text("按钮") }`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'ElevatedButton 默认阴影',
      content: 'ElevatedButton 的默认阴影高度为 1.dp，按下时为 3.dp，禁用时为 0.dp'
    },
    {
      type: 'tip',
      title: '阴影在浅色背景上更明显',
      content: 'ElevatedButton 的阴影效果在白色或浅色背景上最明显，深色模式下阴影效果较弱'
    },
    {
      type: 'tip',
      title: '用于替代 OutlinedButton',
      content: '当不希望使用边框但需要与背景区分时，ElevatedButton 是 OutlinedButton 的良好替代'
    },
    {
      type: 'warning',
      title: '不适合高强调操作',
      content: 'ElevatedButton 强调程度低于 FilledButton，不适合页面的主要行动号召（CTA）'
    },
    {
      type: 'tip',
      title: '背景色跟随主题',
      content: 'ElevatedButton 默认使用 surface 颜色作为背景，会自动适配浅色/深色主题'
    },
    {
      type: 'danger',
      title: '避免在已有阴影的容器中使用',
      content: '不要在 Card、ElevatedCard 等已有阴影的容器中使用 ElevatedButton，会造成阴影层次冲突'
    },
  ],

  relatedComponents: ['button', 'filled-tonal-button', 'outlined-button', 'text-button'],
  since: '1.0.0',
}
