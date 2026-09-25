import type { ComponentEntry } from '../../types'

export const localContentColorComponent: ComponentEntry = {
  id: 'local-content-color',
  demo: { id: 'local-content-color', sourceFile: 'LocalContentColorDemo.kt' },
  name: 'LocalContentColor',
  category: 'Theme',
  description: 'CompositionLocal 提供当前内容的默认颜色，Text 和 Icon 等组件未指定颜色时自动使用。Surface 等容器会根据背景色自动设置合适的内容色。',
  tags: ['localcontentcolor', 'compositionlocal', 'color', 'theme', 'contentcolor'],
  params: [
    { name: 'LocalContentColor.current', type: 'Color', description: '读取当前作用域的内容颜色' },
    { name: 'CompositionLocalProvider', type: '@Composable', description: '通过 CompositionLocalProvider 设置新的内容颜色' },
  ],
  examples: [
    {
      title: '读取当前内容颜色',
      code: `@Composable
fun ContentColorExample() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        // Text 默认使用 LocalContentColor
        Text("默认内容颜色")

        // 显式读取
        val contentColor = LocalContentColor.current
        Text(
            text = "显式使用内容颜色",
            color = contentColor
        )

        // Icon 也默认使用 LocalContentColor
        Icon(
            imageVector = Icons.Default.Star,
            contentDescription = "Star",
            tint = LocalContentColor.current
        )
    }
}`,
    },
    {
      title: 'Surface 自动设置内容颜色',
      code: `@Composable
fun SurfaceContentColor() {
    Row(
        modifier = Modifier.padding(16.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        // Primary 背景 - 自动设置 onPrimary 为内容色
        Surface(
            color = MaterialTheme.colorScheme.primary,
            shape = RoundedCornerShape(8.dp)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Primary Surface")
                Icon(Icons.Default.Check, "Check")
                // 文字和图标自动使用 onPrimary 颜色
            }
        }

        // Secondary Container - 自动设置 onSecondaryContainer
        Surface(
            color = MaterialTheme.colorScheme.secondaryContainer,
            shape = RoundedCornerShape(8.dp)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Secondary Container")
                Icon(Icons.Default.Info, "Info")
                // 自动使用 onSecondaryContainer 颜色
            }
        }
    }
}`,
    },
    {
      title: '手动覆盖内容颜色',
      code: `@Composable
fun OverrideContentColor() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // 默认内容颜色
        Text("默认颜色")
        Icon(Icons.Default.Home, "Home")

        // 覆盖整个区域的内容颜色
        CompositionLocalProvider(
            LocalContentColor provides MaterialTheme.colorScheme.primary
        ) {
            Column {
                Text("主色文字")
                Icon(Icons.Default.Star, "Star")
                Text("都使用主色")
            }
        }

        // 恢复默认颜色
        Text("恢复默认颜色")
    }
}`,
    },
    {
      title: '带透明度的内容颜色',
      code: `@Composable
fun ContentAlphaExample() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        // 100% 不透明
        Text(
            text = "高强调文字",
            color = LocalContentColor.current
        )

        // 74% 不透明 - 中等强调
        Text(
            text = "中等强调文字",
            color = LocalContentColor.current.copy(alpha = 0.74f)
        )

        // 38% 不透明 - 禁用状态
        Text(
            text = "禁用状态文字",
            color = LocalContentColor.current.copy(alpha = 0.38f)
        )

        Divider()

        // 使用 CompositionLocal 设置透明度
        CompositionLocalProvider(
            LocalContentColor provides LocalContentColor.current.copy(alpha = 0.6f)
        ) {
            Column {
                Text("整个区域 60% 透明")
                Icon(Icons.Default.Info, "Info")
            }
        }
    }
}`,
    },
    {
      title: 'contentColorFor() 辅助函数',
      code: `@Composable
fun ContentColorForExample() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        // 根据背景色自动获取合适的内容色
        val backgroundColor = MaterialTheme.colorScheme.primaryContainer
        val contentColor = contentColorFor(backgroundColor)

        Surface(
            color = backgroundColor,
            shape = RoundedCornerShape(8.dp)
        ) {
            CompositionLocalProvider(LocalContentColor provides contentColor) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text("自动匹配的内容颜色")
                    Text(
                        text = "背景色: primaryContainer",
                        style = MaterialTheme.typography.bodySmall
                    )
                    Text(
                        text = "内容色: onPrimaryContainer",
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }
        }
    }
}`,
    },
    {
      title: '自定义组件中使用',
      code: `@Composable
fun CustomCard(
    title: String,
    content: String,
    backgroundColor: Color,
    modifier: Modifier = Modifier
) {
    // 根据背景色自动选择内容色
    val contentColor = contentColorFor(backgroundColor)

    Surface(
        color = backgroundColor,
        shape = MaterialTheme.shapes.medium,
        modifier = modifier
    ) {
        CompositionLocalProvider(LocalContentColor provides contentColor) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleLarge
                    // 自动使用 LocalContentColor
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = content,
                    style = MaterialTheme.typography.bodyMedium
                    // 也自动使用 LocalContentColor
                )
            }
        }
    }
}

@Composable
fun Usage() {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        CustomCard(
            title = "Primary Card",
            content = "内容自动使用 onPrimary",
            backgroundColor = MaterialTheme.colorScheme.primary
        )

        CustomCard(
            title = "Error Card",
            content = "内容自动使用 onError",
            backgroundColor = MaterialTheme.colorScheme.error
        )
    }
}`,
    },
    {
      title: '禁用状态的内容颜色',
      code: `@Composable
fun DisabledContentColor() {
    var enabled by remember { mutableStateOf(true) }

    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Switch(
            checked = enabled,
            onCheckedChange = { enabled = it }
        )

        // 根据启用状态调整内容颜色
        val contentColor = if (enabled) {
            LocalContentColor.current
        } else {
            LocalContentColor.current.copy(alpha = 0.38f)
        }

        CompositionLocalProvider(LocalContentColor provides contentColor) {
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text(
                    text = "标题文字",
                    style = MaterialTheme.typography.titleMedium
                )
                Text(
                    text = "正文内容",
                    style = MaterialTheme.typography.bodyMedium
                )
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Icon(Icons.Default.Star, "Star")
                    Icon(Icons.Default.Favorite, "Favorite")
                    Icon(Icons.Default.Share, "Share")
                }
            }
        }
    }
}`,
    },
    {
      title: '嵌套 Surface 的颜色继承',
      code: `@Composable
fun NestedSurfaceColors() {
    // 外层 Surface - Primary 背景
    Surface(
        color = MaterialTheme.colorScheme.primary,
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            // 使用 onPrimary 颜色
            Text(
                text = "外层 Surface",
                style = MaterialTheme.typography.titleLarge
            )

            Spacer(modifier = Modifier.height(8.dp))

            // 内层 Surface - 覆盖颜色
            Surface(
                color = MaterialTheme.colorScheme.surfaceVariant,
                shape = RoundedCornerShape(8.dp)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    // 现在使用 onSurfaceVariant 颜色
                    Text(
                        text = "内层 Surface",
                        style = MaterialTheme.typography.titleMedium
                    )
                    Text(
                        text = "内容颜色自动切换",
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            // 回到外层 Surface，恢复 onPrimary
            Text("又回到外层颜色")
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '主题感知的自定义组件',
      description: '创建能够自动适应不同背景色的可复用组件',
      code: `@Composable
fun Badge(
    text: String,
    containerColor: Color = MaterialTheme.colorScheme.primaryContainer,
    modifier: Modifier = Modifier
) {
    // 自动选择合适的内容颜色
    val contentColor = contentColorFor(containerColor)

    Surface(
        color = containerColor,
        shape = MaterialTheme.shapes.small,
        modifier = modifier
    ) {
        CompositionLocalProvider(LocalContentColor provides contentColor) {
            Text(
                text = text,
                style = MaterialTheme.typography.labelSmall,
                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
            )
        }
    }
}

@Composable
fun StatusBadge(status: String) {
    Row(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier.padding(16.dp)
    ) {
        when (status) {
            "success" -> Badge(
                text = "成功",
                containerColor = Color(0xFF4CAF50)
            )
            "warning" -> Badge(
                text = "警告",
                containerColor = Color(0xFFFF9800)
            )
            "error" -> Badge(
                text = "错误",
                containerColor = MaterialTheme.colorScheme.errorContainer
            )
            else -> Badge(
                text = "默认",
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        }
    }
}

// Badge 组件会自动为每种背景色选择合适的文字颜色
// 无需为每种状态手动指定文字颜色`
    },
    {
      title: '可访问性增强',
      description: '根据背景色自动确保足够的对比度',
      code: `@Composable
fun AccessibleTextContainer(
    backgroundColor: Color,
    content: @Composable () -> Unit
) {
    // 计算背景色的亮度
    val luminance = backgroundColor.luminance()

    // 根据亮度选择黑色或白色文字
    val contentColor = if (luminance > 0.5f) {
        Color.Black.copy(alpha = 0.87f)  // 浅色背景用深色文字
    } else {
        Color.White.copy(alpha = 0.87f)  // 深色背景用浅色文字
    }

    Surface(
        color = backgroundColor,
        shape = MaterialTheme.shapes.medium,
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        CompositionLocalProvider(LocalContentColor provides contentColor) {
            Box(modifier = Modifier.padding(16.dp)) {
                content()
            }
        }
    }
}

@Composable
fun AccessibilityDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        // 深色背景 - 自动使用浅色文字
        AccessibleTextContainer(backgroundColor = Color(0xFF1A237E)) {
            Text("深色背景，浅色文字")
        }

        // 浅色背景 - 自动使用深色文字
        AccessibleTextContainer(backgroundColor = Color(0xFFE3F2FD)) {
            Text("浅色背景，深色文字")
        }

        // 中等亮度背景
        AccessibleTextContainer(backgroundColor = Color(0xFF5C6BC0)) {
            Column {
                Text(
                    text = "自动适应的文字颜色",
                    style = MaterialTheme.typography.titleMedium
                )
                Text(
                    text = "确保可读性",
                    style = MaterialTheme.typography.bodySmall
                )
            }
        }
    }
}

// 辅助函数：计算颜色亮度
fun Color.luminance(): Float {
    return 0.299f * red + 0.587f * green + 0.114f * blue
}`
    },
  ],

  bestPractices: [
    {
      title: '让组件自动使用 LocalContentColor',
      description: 'Text 和 Icon 组件默认使用 LocalContentColor，无需显式指定',
      goodExample: `Surface(color = MaterialTheme.colorScheme.primary) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("标题")  // 自动使用 onPrimary
        Icon(Icons.Default.Star, "Star")  // 自动使用 onPrimary
    }
}`,
      badExample: `Surface(color = MaterialTheme.colorScheme.primary) {
    Column(modifier = Modifier.padding(16.dp)) {
        // 硬编码颜色，主题切换时不会更新
        Text("标题", color = Color.White)
        Icon(Icons.Default.Star, "Star", tint = Color.White)
    }
}`,
    },
    {
      title: '使用 contentColorFor() 自动匹配',
      description: '为自定义容器设置背景色时，使用 contentColorFor() 获取匹配的内容色',
      goodExample: `@Composable
fun CustomContainer(backgroundColor: Color) {
    val contentColor = contentColorFor(backgroundColor)

    Surface(color = backgroundColor) {
        CompositionLocalProvider(LocalContentColor provides contentColor) {
            Text("自动匹配的内容颜色")
        }
    }
}`,
      badExample: `@Composable
fun CustomContainer(backgroundColor: Color) {
    Surface(color = backgroundColor) {
        // 内容颜色不匹配背景，可能看不清
        Text("内容")
    }
}`,
    },
    {
      title: '透明度表达强调程度',
      description: '使用 LocalContentColor.copy(alpha) 而非完全不同的颜色来表达不同强调级别',
      goodExample: `Column {
    Text(
        text = "主要内容",
        color = LocalContentColor.current  // 100% 高强调
    )
    Text(
        text = "次要内容",
        color = LocalContentColor.current.copy(alpha = 0.74f)  // 74% 中等强调
    )
    Text(
        text = "辅助说明",
        color = LocalContentColor.current.copy(alpha = 0.38f)  // 38% 低强调
    )
}`,
      badExample: `Column {
    Text("主要内容", color = Color.Black)
    Text("次要内容", color = Color.Blue)  // 颜色不统一
    Text("辅助说明", color = Color.Gray)  // 视觉混乱
}`,
    },
    {
      title: 'Surface 会自动设置 LocalContentColor',
      description: 'Surface 组件已经处理了 LocalContentColor，无需手动设置',
      goodExample: `Surface(
    color = MaterialTheme.colorScheme.primaryContainer
) {
    // Surface 自动设置了 onPrimaryContainer
    Text("内容")
}`,
      badExample: `Surface(
    color = MaterialTheme.colorScheme.primaryContainer
) {
    // 多余的 CompositionLocalProvider
    CompositionLocalProvider(
        LocalContentColor provides MaterialTheme.colorScheme.onPrimaryContainer
    ) {
        Text("内容")
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'LocalContentColor 是 CompositionLocal',
      content: 'LocalContentColor 通过 CompositionLocal 机制在组件树中传递。子组件会继承父组件设置的值，除非被显式覆盖'
    },
    {
      type: 'tip',
      title: 'Text 和 Icon 默认行为',
      content: 'Text 组件的 color 参数默认值是 Color.Unspecified，这种情况下会使用 LocalContentColor.current。Icon 的 tint 参数同理'
    },
    {
      type: 'tip',
      title: 'contentColorFor() 的映射关系',
      content: 'contentColorFor() 函数根据 Material 3 规范返回匹配的内容色：primary → onPrimary、primaryContainer → onPrimaryContainer、surface → onSurface 等'
    },
    {
      type: 'warning',
      title: 'Color.Unspecified 的作用',
      content: '只有当颜色参数为 Color.Unspecified 时，组件才会使用 LocalContentColor。如果显式传入任何颜色（包括 Color.Transparent），将不会使用 LocalContentColor'
    },
    {
      type: 'warning',
      title: '透明度的可访问性',
      content: '使用透明度降低文字对比度时，确保最终对比度仍符合 WCAG 标准（至少 4.5:1）。过低的透明度（< 0.38）可能导致内容难以阅读'
    },
    {
      type: 'danger',
      title: '避免硬编码 Color.White/Black',
      content: '硬编码 Color.White 或 Color.Black 会导致深色主题不适配。始终使用 LocalContentColor 或 MaterialTheme.colorScheme 中的语义颜色'
    },
    {
      type: 'tip',
      title: 'LocalContentColor 的作用域',
      content: 'CompositionLocalProvider 设置的 LocalContentColor 只影响其 content lambda 内的组件，退出作用域后自动恢复到外层的值'
    },
  ],

  relatedComponents: ['material-theme', 'color-scheme', 'surface', 'text', 'icon'],
  since: '1.0.0',
}
