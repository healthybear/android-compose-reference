import type { ComponentEntry } from '../../types'

export const surfaceComponent: ComponentEntry = {
  id: 'surface',
  name: 'Surface',
  category: 'Layout',
  description: 'Surface 是 Material Design 的基础容器组件，提供背景色、形状、阴影、边框和点击交互。它是构建 Card、Button 等 Material 组件的基础，并自动适配主题色调。',
  tags: ['surface', 'container', 'material3', 'card', 'elevation', 'background'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、内边距等' },
    { name: 'shape', type: 'Shape', default: 'RectangleShape', description: '形状，支持圆角、切角等（RoundedCornerShape/CutCornerShape/CircleShape）' },
    { name: 'color', type: 'Color', default: 'MaterialTheme.colorScheme.surface', description: '背景色，通常使用主题中的 surface 色' },
    { name: 'contentColor', type: 'Color', default: 'contentColorFor(color)', description: '内容默认颜色，自动根据背景色选择对比色' },
    { name: 'tonalElevation', type: 'Dp', default: '0.dp', description: '色调高度，影响 surface 颜色叠加（Material 3 的色彩层次系统）' },
    { name: 'shadowElevation', type: 'Dp', default: '0.dp', description: '阴影高度，控制投影效果' },
    { name: 'border', type: 'BorderStroke?', default: 'null', description: '边框描边（宽度和颜色）' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '内容插槽' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `Surface(
    shape = RoundedCornerShape(12.dp),
    tonalElevation = 2.dp,
    shadowElevation = 4.dp,
    modifier = Modifier.padding(16.dp)
) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("标题", style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(8.dp))
        Text("这是一段内容文字。", style = MaterialTheme.typography.bodyMedium)
    }
}`,
    },
    {
      title: '可点击 Surface',
      code: `Surface(
    onClick = { /* 处理点击 */ },
    shape = RoundedCornerShape(16.dp),
    color = MaterialTheme.colorScheme.primaryContainer,
    modifier = Modifier.fillMaxWidth().padding(16.dp)
) {
    Row(
        modifier = Modifier.padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(Icons.Default.Notifications, contentDescription = null)
        Spacer(Modifier.width(12.dp))
        Text("点击查看通知", style = MaterialTheme.typography.bodyLarge)
    }
}`,
    },
    {
      title: '带边框',
      code: `Surface(
    shape = RoundedCornerShape(8.dp),
    border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline),
    color = Color.Transparent,
    modifier = Modifier.fillMaxWidth().padding(16.dp)
) {
    Text(
        text = "带边框的容器",
        modifier = Modifier.padding(16.dp)
    )
}`,
    },
    {
      title: '不同色调高度',
      code: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    Surface(tonalElevation = 0.dp) {
        Text("Elevation 0", modifier = Modifier.padding(16.dp))
    }
    Surface(tonalElevation = 1.dp) {
        Text("Elevation 1", modifier = Modifier.padding(16.dp))
    }
    Surface(tonalElevation = 3.dp) {
        Text("Elevation 3", modifier = Modifier.padding(16.dp))
    }
    Surface(tonalElevation = 5.dp) {
        Text("Elevation 5", modifier = Modifier.padding(16.dp))
    }
}`,
    },
    {
      title: '圆形头像容器',
      code: `Surface(
    shape = CircleShape,
    color = MaterialTheme.colorScheme.primaryContainer,
    modifier = Modifier.size(80.dp)
) {
    Box(contentAlignment = Alignment.Center) {
        Icon(
            Icons.Default.Person,
            contentDescription = "用户头像",
            modifier = Modifier.size(48.dp)
        )
    }
}`,
    },
    {
      title: '带交互状态的卡片',
      code: `var selected by remember { mutableStateOf(false) }

Surface(
    onClick = { selected = !selected },
    shape = RoundedCornerShape(12.dp),
    color = if (selected) {
        MaterialTheme.colorScheme.primaryContainer
    } else {
        MaterialTheme.colorScheme.surface
    },
    tonalElevation = if (selected) 3.dp else 1.dp,
    border = if (selected) {
        BorderStroke(2.dp, MaterialTheme.colorScheme.primary)
    } else null,
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp)
) {
    Row(
        modifier = Modifier.padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        if (selected) {
            Icon(
                Icons.Default.CheckCircle,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary
            )
            Spacer(Modifier.width(8.dp))
        }
        Text("选项卡片")
    }
}`,
    },
  ],

  useCases: [
    {
      title: '卡片列表项',
      description: '使用 Surface 构建统一风格的列表项卡片',
      code: `LazyColumn(
    contentPadding = PaddingValues(16.dp),
    verticalArrangement = Arrangement.spacedBy(12.dp)
) {
    items(items) { item ->
        Surface(
            onClick = { /* 导航到详情 */ },
            shape = RoundedCornerShape(12.dp),
            tonalElevation = 1.dp,
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier.padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                // 左侧图片
                AsyncImage(
                    model = item.imageUrl,
                    contentDescription = null,
                    modifier = Modifier
                        .size(60.dp)
                        .clip(RoundedCornerShape(8.dp))
                )

                Spacer(Modifier.width(12.dp))

                // 右侧内容
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        item.title,
                        style = MaterialTheme.typography.titleMedium
                    )
                    Spacer(Modifier.height(4.dp))
                    Text(
                        item.description,
                        style = MaterialTheme.typography.bodySmall,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }
        }
    }
}`
    },
    {
      title: '设置项容器',
      description: '使用 Surface 创建带分组的设置列表',
      code: `Column(
    modifier = Modifier
        .fillMaxSize()
        .padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp)
) {
    // 账户设置组
    Surface(
        shape = RoundedCornerShape(12.dp),
        tonalElevation = 1.dp
    ) {
        Column {
            SettingItem(
                icon = Icons.Default.Person,
                title = "个人信息",
                onClick = { }
            )
            Divider()
            SettingItem(
                icon = Icons.Default.Lock,
                title = "隐私设置",
                onClick = { }
            )
        }
    }

    // 通用设置组
    Surface(
        shape = RoundedCornerShape(12.dp),
        tonalElevation = 1.dp
    ) {
        Column {
            SettingItem(
                icon = Icons.Default.Notifications,
                title = "通知",
                onClick = { }
            )
            Divider()
            SettingItem(
                icon = Icons.Default.Language,
                title = "语言",
                onClick = { }
            )
        }
    }
}

@Composable
fun SettingItem(
    icon: ImageVector,
    title: String,
    onClick: () -> Unit
) {
    Surface(
        onClick = onClick,
        color = Color.Transparent
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(icon, contentDescription = null)
            Spacer(Modifier.width(16.dp))
            Text(title, modifier = Modifier.weight(1f))
            Icon(
                Icons.AutoMirrored.Filled.KeyboardArrowRight,
                contentDescription = null
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 tonalElevation 而非 shadowElevation',
      description: 'Material 3 推荐使用色调高度（tonalElevation）来表现层次，阴影仅用于强调',
      goodExample: `// Material 3 风格：使用色调高度
Surface(
    tonalElevation = 2.dp,
    shadowElevation = 0.dp
) {
    Text("内容")
}`,
      badExample: `// 过度使用阴影（Material 2 风格）
Surface(
    shadowElevation = 8.dp
) {
    Text("内容")
}`
    },
    {
      title: '使用主题色而非硬编码颜色',
      description: '使用 MaterialTheme.colorScheme 中的色彩，确保主题切换正常',
      goodExample: `Surface(
    color = MaterialTheme.colorScheme.primaryContainer,
    contentColor = MaterialTheme.colorScheme.onPrimaryContainer
) {
    Text("内容")
}`,
      badExample: `Surface(
    color = Color(0xFF6200EE),
    contentColor = Color.White
) {
    Text("内容")
}`
    },
    {
      title: '可点击 Surface 应有视觉反馈',
      description: '使用 onClick 时，通过色调或边框变化提供明确反馈',
      goodExample: `Surface(
    onClick = { },
    tonalElevation = 1.dp,
    shape = RoundedCornerShape(8.dp)
) {
    Text("可点击", modifier = Modifier.padding(16.dp))
}`,
    },
    {
      title: '避免过度嵌套 Surface',
      description: '过多嵌套会增加渲染开销，考虑使用 Box + Modifier.background',
      goodExample: `Surface(
    tonalElevation = 2.dp
) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("标题")
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    MaterialTheme.colorScheme.surfaceVariant,
                    RoundedCornerShape(8.dp)
                )
                .padding(8.dp)
        ) {
            Text("子内容")
        }
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'contentColorFor 自动对比',
      content: 'Surface 会自动调用 contentColorFor() 根据背景色选择合适的前景色，确保内容可读性。这个颜色会通过 LocalContentColor 传递给子组件'
    },
    {
      type: 'warning',
      title: 'tonalElevation 与 shadowElevation 的区别',
      content: 'tonalElevation 通过叠加主题色来表现层次（Material 3），shadowElevation 通过投影表现层次。两者可以独立设置，但推荐主要使用 tonalElevation'
    },
    {
      type: 'info',
      title: '可点击 Surface 的重载版本',
      content: 'Surface 提供 onClick 参数的重载版本，内置了涟漪效果和交互状态。对于简单点击场景，优先使用这个版本而不是 Modifier.clickable'
    },
    {
      type: 'info',
      title: 'Surface 是响应式的',
      content: 'Surface 会自动适应父容器的约束。使用 Modifier.fillMaxWidth() 或 Modifier.size() 来控制尺寸'
    },
    {
      type: 'error',
      title: '注意无障碍性',
      content: '可点击的 Surface 应确保有足够的点击目标尺寸（最小 48.dp），并为图标提供 contentDescription'
    },
  ],

  relatedComponents: ['card', 'box', 'button', 'elevated-card', 'outlined-card'],
  since: '1.0.0',
}
