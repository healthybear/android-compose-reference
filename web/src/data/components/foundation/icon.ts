import type { ComponentEntry } from '../../types'

export const iconComponent: ComponentEntry = {
  id: 'icon',
  demo: { id: 'icon', sourceFile: 'IconDemo.kt' },
  name: 'Icon',
  category: 'Foundation',
  description: 'Icon 是显示矢量图标的专用组件，自动适配主题色和内容色。比 Image 更适合显示图标，提供更好的可访问性和主题集成。',
  tags: ['icon', 'vector', 'material-icons', 'symbol', 'graphic'],
  params: [
    { name: 'imageVector', type: 'ImageVector', required: true, description: '矢量图标，如 Icons.Default.Add（与 painter/bitmap 互斥）' },
    { name: 'painter', type: 'Painter', required: true, description: 'Drawable 资源，使用 painterResource()（与 imageVector 互斥）' },
    { name: 'bitmap', type: 'ImageBitmap', required: true, description: '位图图标（与其他两个互斥）' },
    { name: 'contentDescription', type: 'String?', required: true, description: '无障碍描述，装饰性图标传 null' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、内边距等' },
    { name: 'tint', type: 'Color', default: 'LocalContentColor.current', description: '图标着色，默认使用当前内容色' },
  ],
  examples: [
    {
      title: '基础 Material 图标',
      code: `Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    Icon(
        imageVector = Icons.Default.Add,
        contentDescription = "添加"
    )

    Icon(
        imageVector = Icons.Default.Search,
        contentDescription = "搜索"
    )

    Icon(
        imageVector = Icons.Default.Settings,
        contentDescription = "设置"
    )
}`,
    },
    {
      title: '自定义颜色和尺寸',
      code: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    // 红色收藏图标
    Icon(
        imageVector = Icons.Default.Favorite,
        contentDescription = "收藏",
        tint = Color.Red,
        modifier = Modifier.size(32.dp)
    )

    // 使用主题色
    Icon(
        imageVector = Icons.Default.Star,
        contentDescription = "星标",
        tint = MaterialTheme.colorScheme.primary,
        modifier = Modifier.size(24.dp)
    )

    // 大尺寸图标
    Icon(
        imageVector = Icons.Default.Warning,
        contentDescription = "警告",
        tint = MaterialTheme.colorScheme.error,
        modifier = Modifier.size(48.dp)
    )
}`,
    },
    {
      title: 'Filled、Outlined、Rounded 样式',
      code: `Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    // Filled（默认）
    Icon(
        imageVector = Icons.Filled.Home,
        contentDescription = "首页"
    )

    // Outlined
    Icon(
        imageVector = Icons.Outlined.Home,
        contentDescription = "首页"
    )

    // Rounded
    Icon(
        imageVector = Icons.Rounded.Home,
        contentDescription = "首页"
    )

    // Sharp
    Icon(
        imageVector = Icons.Sharp.Home,
        contentDescription = "首页"
    )

    // TwoTone
    Icon(
        imageVector = Icons.TwoTone.Home,
        contentDescription = "首页"
    )
}`,
    },
    {
      title: '使用自定义 Drawable',
      code: `Icon(
    painter = painterResource(R.drawable.ic_custom_logo),
    contentDescription = "公司 Logo",
    tint = MaterialTheme.colorScheme.primary,
    modifier = Modifier.size(40.dp)
)`,
    },
    {
      title: '自动继承内容色',
      code: `// Icon 自动使用父容器的内容色
Button(onClick = { }) {
    Icon(
        imageVector = Icons.Default.Add,
        contentDescription = null,
        modifier = Modifier.size(18.dp)
    )
    Spacer(Modifier.width(8.dp))
    Text("添加")
}

// Surface 设置内容色，Icon 自动适配
Surface(
    color = MaterialTheme.colorScheme.primaryContainer,
    contentColor = MaterialTheme.colorScheme.onPrimaryContainer
) {
    Row(
        modifier = Modifier.padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(Icons.Default.Info, contentDescription = null)
        Spacer(Modifier.width(8.dp))
        Text("信息提示")
    }
}`,
    },
    {
      title: '装饰性图标（contentDescription = null）',
      code: `ListItem(
    headlineContent = { Text("通知") },
    leadingContent = {
        // 装饰性图标，已有文本说明
        Icon(
            imageVector = Icons.Default.Notifications,
            contentDescription = null
        )
    }
)`,
    },
  ],

  useCases: [
    {
      title: '带图标的列表项',
      description: '在列表中使用图标提升识别度',
      code: `@Composable
fun MenuListItem(
    icon: ImageVector,
    title: String,
    onClick: () -> Unit
) {
    ListItem(
        headlineContent = { Text(title) },
        leadingContent = {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary
            )
        },
        modifier = Modifier.clickable(onClick = onClick)
    )
}

// 使用
Column {
    MenuListItem(Icons.Default.Person, "个人资料") { }
    MenuListItem(Icons.Default.Settings, "设置") { }
    MenuListItem(Icons.Default.Logout, "退出登录") { }
}`
    },
    {
      title: '状态图标',
      description: '根据状态显示不同图标和颜色',
      code: `@Composable
fun StatusIcon(status: Status) {
    val (icon, color) = when (status) {
        Status.Success -> Icons.Default.CheckCircle to Color(0xFF4CAF50)
        Status.Warning -> Icons.Default.Warning to Color(0xFFFFA500)
        Status.Error -> Icons.Default.Error to Color(0xFFF44336)
        Status.Info -> Icons.Default.Info to MaterialTheme.colorScheme.primary
    }

    Icon(
        imageVector = icon,
        contentDescription = status.name,
        tint = color,
        modifier = Modifier.size(24.dp)
    )
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 Icon 而非 Image 显示图标',
      description: 'Icon 自动适配主题和内容色，更适合图标场景',
      goodExample: `Icon(
    imageVector = Icons.Default.Settings,
    contentDescription = "设置"
)`,
      badExample: `Image(
    imageVector = Icons.Default.Settings,
    contentDescription = "设置"
    // 不会自动适配主题色
)`
    },
    {
      title: '装饰性图标使用 contentDescription = null',
      description: '当图标纯粹装饰，旁边有文字说明时',
      goodExample: `Row {
    Icon(
        Icons.Default.Star,
        contentDescription = null  // 旁边有"收藏"文字
    )
    Text("收藏")
}`,
      badExample: `Row {
    Icon(
        Icons.Default.Star,
        contentDescription = "星星图标"  // 冗余描述
    )
    Text("收藏")
}`
    },
    {
      title: '功能性图标提供清晰描述',
      description: '独立使用的图标必须有描述',
      goodExample: `IconButton(onClick = { delete() }) {
    Icon(
        Icons.Default.Delete,
        contentDescription = "删除此项"  // 明确说明功能
    )
}`,
      badExample: `IconButton(onClick = { delete() }) {
    Icon(
        Icons.Default.Delete,
        contentDescription = null  // 屏幕阅读器无法理解
    )
}`
    },
    {
      title: '避免硬编码颜色',
      description: '使用主题色确保深色模式正常',
      goodExample: `Icon(
    Icons.Default.Star,
    contentDescription = "星标",
    tint = MaterialTheme.colorScheme.primary
)`,
      badExample: `Icon(
    Icons.Default.Star,
    contentDescription = "星标",
    tint = Color(0xFF0000FF)  // 深色模式下可能不可见
)`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Icon 默认尺寸为 24.dp',
      content: 'Icon 的默认尺寸是 24.dp，符合 Material Design 图标规范。需要其他尺寸使用 Modifier.size()'
    },
    {
      type: 'warning',
      title: 'tint 只对单色图标有效',
      content: 'tint 会将图标重新着色为单一颜色。对于多色图标（如品牌 Logo），应使用 Image 并设置 tint = null'
    },
    {
      type: 'tip',
      title: 'Material Icons 有五种风格',
      content: 'Icons.Filled（默认）、Icons.Outlined、Icons.Rounded、Icons.Sharp、Icons.TwoTone，选择适合设计风格的'
    },
    {
      type: 'tip',
      title: 'Icon 自动使用 LocalContentColor',
      content: 'Icon 默认使用当前作用域的内容色，与 Text 颜色保持一致，无需手动设置'
    },
    {
      type: 'danger',
      title: '注意图标尺寸对可访问性的影响',
      content: '可点击图标应至少 48.dp x 48.dp（包括 padding）。单独的小图标可能难以点击'
    },
  ],

  relatedComponents: ['image', 'icon-button', 'button'],
  since: '1.0.0',
}
