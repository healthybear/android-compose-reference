import type { ComponentEntry } from '../../types'

export const outlinedCardComponent: ComponentEntry = {
  id: 'outlined-card',
  demo: { id: 'outlined-card', sourceFile: 'OutlinedCardDemo.kt' },
  name: 'OutlinedCard',
  category: 'Material',
  description: '带边框的卡片，无阴影，通过描边与背景区分，适合扁平化设计风格。',
  tags: ['card', 'outlined', 'border', 'flat', '描边卡片'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'onClick', type: '(() -> Unit)?', default: 'null', description: '点击回调' },
    { name: 'shape', type: 'Shape', default: 'CardDefaults.outlinedShape', description: '形状' },
    { name: 'colors', type: 'CardColors', default: 'CardDefaults.outlinedCardColors()', description: '颜色配置' },
    { name: 'elevation', type: 'CardElevation', default: 'CardDefaults.outlinedCardElevation()', description: '阴影配置，默认无阴影' },
    { name: 'border', type: 'BorderStroke', default: 'CardDefaults.outlinedCardBorder()', description: '边框样式' },
    { name: 'content', type: '@Composable ColumnScope.() -> Unit', required: true, description: '卡片内容' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `OutlinedCard(modifier = Modifier.fillMaxWidth()) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("描边卡片", style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(8.dp))
        Text("无阴影，通过边框与背景区分。")
    }
}`,
    },
    {
      title: '自定义边框颜色',
      code: `OutlinedCard(
    border = BorderStroke(2.dp, MaterialTheme.colorScheme.primary),
    modifier = Modifier.fillMaxWidth()
) {
    Text("自定义边框", modifier = Modifier.padding(16.dp))
}`,
    },
    {
      title: '可选择卡片',
      code: `var selected by remember { mutableStateOf(false) }

OutlinedCard(
    onClick = { selected = !selected },
    border = BorderStroke(
        width = if (selected) 2.dp else 1.dp,
        color = if (selected) {
            MaterialTheme.colorScheme.primary
        } else {
            MaterialTheme.colorScheme.outline
        }
    ),
    colors = CardDefaults.outlinedCardColors(
        containerColor = if (selected) {
            MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.3f)
        } else {
            MaterialTheme.colorScheme.surface
        }
    ),
    modifier = Modifier.fillMaxWidth()
) {
    Row(
        modifier = Modifier.padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        RadioButton(
            selected = selected,
            onClick = null
        )
        Spacer(Modifier.width(12.dp))
        Text("选项内容")
    }
}`,
    },
    {
      title: '信息提示卡片',
      code: `OutlinedCard(
    border = BorderStroke(1.dp, MaterialTheme.colorScheme.primary),
    colors = CardDefaults.outlinedCardColors(
        containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.1f)
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
            tint = MaterialTheme.colorScheme.primary,
            modifier = Modifier.size(24.dp)
        )
        Spacer(Modifier.width(12.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = "提示",
                style = MaterialTheme.typography.titleSmall,
                color = MaterialTheme.colorScheme.primary
            )
            Text(
                text = "这是一条重要信息",
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}`,
    },
    {
      title: '透明背景卡片',
      code: `OutlinedCard(
    colors = CardDefaults.outlinedCardColors(
        containerColor = Color.Transparent
    ),
    modifier = Modifier.fillMaxWidth()
) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text(
            text = "透明背景",
            style = MaterialTheme.typography.titleMedium
        )
        Spacer(Modifier.height(8.dp))
        Text("适合在图片或渐变背景上使用")
    }
}`,
    },
    {
      title: '表单分组卡片',
      code: `Column(
    modifier = Modifier.fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(16.dp)
) {
    OutlinedCard(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("基本信息", style = MaterialTheme.typography.titleMedium)
            Spacer(Modifier.height(12.dp))
            OutlinedTextField(
                value = name,
                onValueChange = { name = it },
                label = { Text("姓名") },
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(Modifier.height(8.dp))
            OutlinedTextField(
                value = email,
                onValueChange = { email = it },
                label = { Text("邮箱") },
                modifier = Modifier.fillMaxWidth()
            )
        }
    }

    OutlinedCard(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("联系方式", style = MaterialTheme.typography.titleMedium)
            Spacer(Modifier.height(12.dp))
            OutlinedTextField(
                value = phone,
                onValueChange = { phone = it },
                label = { Text("手机号") },
                modifier = Modifier.fillMaxWidth()
            )
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '选项卡列表',
      description: '使用 OutlinedCard 实现单选或多选选项组',
      code: `@Composable
fun PaymentMethodSelector(
    methods: List<PaymentMethod>,
    selectedMethod: PaymentMethod?,
    onMethodSelected: (PaymentMethod) -> Unit
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(
            text = "选择支付方式",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        methods.forEach { method ->
            val isSelected = method == selectedMethod

            OutlinedCard(
                onClick = { onMethodSelected(method) },
                border = BorderStroke(
                    width = if (isSelected) 2.dp else 1.dp,
                    color = if (isSelected) {
                        MaterialTheme.colorScheme.primary
                    } else {
                        MaterialTheme.colorScheme.outline
                    }
                ),
                colors = CardDefaults.outlinedCardColors(
                    containerColor = if (isSelected) {
                        MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.2f)
                    } else {
                        Color.Transparent
                    }
                ),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        method.icon,
                        contentDescription = null,
                        modifier = Modifier.size(32.dp),
                        tint = if (isSelected) {
                            MaterialTheme.colorScheme.primary
                        } else {
                            MaterialTheme.colorScheme.onSurfaceVariant
                        }
                    )
                    Spacer(Modifier.width(16.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = method.name,
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                        )
                        Text(
                            text = method.description,
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    if (isSelected) {
                        Icon(
                            Icons.Default.CheckCircle,
                            contentDescription = "已选择",
                            tint = MaterialTheme.colorScheme.primary
                        )
                    }
                }
            }
        }
    }
}`
    },
    {
      title: '状态提示卡片组',
      description: '使用不同边框颜色表示不同状态的提示信息',
      code: `@Composable
fun StatusMessageCard(
    type: MessageType,
    title: String,
    message: String,
    onDismiss: (() -> Unit)? = null
) {
    val (color, icon) = when (type) {
        MessageType.INFO -> MaterialTheme.colorScheme.primary to Icons.Default.Info
        MessageType.SUCCESS -> Color.Green to Icons.Default.CheckCircle
        MessageType.WARNING -> Color(0xFFFFA726) to Icons.Default.Warning
        MessageType.ERROR -> MaterialTheme.colorScheme.error to Icons.Default.Error
    }

    OutlinedCard(
        border = BorderStroke(1.dp, color),
        colors = CardDefaults.outlinedCardColors(
            containerColor = color.copy(alpha = 0.05f)
        ),
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.Top
        ) {
            Icon(
                icon,
                contentDescription = null,
                tint = color,
                modifier = Modifier.size(24.dp)
            )
            Spacer(Modifier.width(12.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleSmall,
                    color = color,
                    fontWeight = FontWeight.Bold
                )
                Spacer(Modifier.height(4.dp))
                Text(
                    text = message,
                    style = MaterialTheme.typography.bodyMedium
                )
            }
            if (onDismiss != null) {
                IconButton(
                    onClick = onDismiss,
                    modifier = Modifier.size(24.dp)
                ) {
                    Icon(
                        Icons.Default.Close,
                        contentDescription = "关闭",
                        modifier = Modifier.size(18.dp)
                    )
                }
            }
        }
    }
}

enum class MessageType {
    INFO, SUCCESS, WARNING, ERROR
}`
    },
  ],

  bestPractices: [
    {
      title: '用于扁平化设计',
      description: 'OutlinedCard 无阴影，适合扁平化、极简风格的界面',
      goodExample: `// 扁平化设计使用 OutlinedCard
OutlinedCard {
    Text("内容")
}`,
      badExample: `// 扁平化设计使用阴影卡片显得突兀
ElevatedCard {
    Text("内容")
}`
    },
    {
      title: '选择状态用边框粗细和颜色区分',
      description: '通过调整边框宽度和颜色表达选中状态',
      goodExample: `OutlinedCard(
    border = BorderStroke(
        width = if (selected) 2.dp else 1.dp,
        color = if (selected) primary else outline
    )
) { }`,
      badExample: `// 选中状态不明显
OutlinedCard(
    border = BorderStroke(1.dp, outline)
) { }`
    },
    {
      title: '状态卡片使用语义化颜色',
      description: '信息、成功、警告、错误使用对应的边框颜色',
      goodExample: `// 错误提示使用 error 颜色
OutlinedCard(
    border = BorderStroke(1.dp, MaterialTheme.colorScheme.error),
    colors = CardDefaults.outlinedCardColors(
        containerColor = MaterialTheme.colorScheme.error.copy(alpha = 0.1f)
    )
) { }`,
      badExample: `// 错误提示使用默认颜色
OutlinedCard { Text("错误信息") }`
    },
    {
      title: '透明背景适合图片背景',
      description: '在图片或渐变背景上使用透明容器',
      goodExample: `Box {
    BackgroundImage()
    OutlinedCard(
        colors = CardDefaults.outlinedCardColors(
            containerColor = Color.Transparent
        )
    ) { }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'OutlinedCard 默认无阴影',
      content: 'OutlinedCard 的阴影高度为 0dp，完全依靠边框与背景区分'
    },
    {
      type: 'info',
      title: '适合密集排列',
      content: 'OutlinedCard 无阴影，多个卡片密集排列时不会产生视觉混乱'
    },
    {
      type: 'info',
      title: '边框颜色自动适配主题',
      content: 'OutlinedCard 默认使用 outline 颜色，会自动适配浅色/深色主题'
    },
    {
      type: 'warning',
      title: '深色背景上可能不明显',
      content: '在深色背景上，浅色边框可能难以辨识，需要调整边框颜色或背景色'
    },
    {
      type: 'info',
      title: '与 Card 和 ElevatedCard 的选择',
      content: 'Card 轻微阴影、OutlinedCard 边框、ElevatedCard 明显阴影，根据视觉层次选择'
    },
    {
      type: 'error',
      title: '避免边框颜色与内容冲突',
      content: '自定义边框颜色时，确保与内部文字和图标颜色有足够对比度'
    },
  ],

  relatedComponents: ['card', 'elevated-card', 'surface'],
  since: '1.0.0',
}
