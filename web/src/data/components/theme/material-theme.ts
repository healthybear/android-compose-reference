import type { ComponentEntry } from '../../types'

export const materialThemeComponent: ComponentEntry = {
  id: 'material-theme',
  demo: { id: 'material-theme', sourceFile: 'MaterialThemeDemo.kt' },
  name: 'MaterialTheme',
  category: 'Theme',
  description: 'Material3 主题提供者，向子树注入 colorScheme、typography、shapes，是 M3 应用的根节点。',
  tags: ['materialtheme', 'theme', 'colorscheme', 'typography', 'shapes', 'material3'],
  params: [
    { name: 'colorScheme', type: 'ColorScheme', default: 'MaterialTheme.colorScheme', description: '颜色方案，通过 lightColorScheme/darkColorScheme 创建' },
    { name: 'typography', type: 'Typography', default: 'MaterialTheme.typography', description: '字体排版规范' },
    { name: 'shapes', type: 'Shapes', default: 'MaterialTheme.shapes', description: '形状规范（extra small 到 extra large）' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '应用内容' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `@Composable
fun App() {
    MaterialTheme {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colorScheme.background
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "Hello Material 3",
                    style = MaterialTheme.typography.headlineMedium,
                    color = MaterialTheme.colorScheme.primary
                )
                Button(onClick = {}) {
                    Text("Action")
                }
            }
        }
    }
}`,
    },
    {
      title: '自定义颜色主题',
      code: `val LightColorScheme = lightColorScheme(
    primary = Color(0xFF6750A4),
    onPrimary = Color(0xFFFFFFFF),
    primaryContainer = Color(0xFFEADDFF),
    onPrimaryContainer = Color(0xFF21005D),
    secondary = Color(0xFF625B71),
    tertiary = Color(0xFF7D5260),
    background = Color(0xFFFFFBFE),
    surface = Color(0xFFFFFBFE),
    error = Color(0xFFB3261E)
)

val DarkColorScheme = darkColorScheme(
    primary = Color(0xFFD0BCFF),
    onPrimary = Color(0xFF381E72),
    primaryContainer = Color(0xFF4F378B),
    onPrimaryContainer = Color(0xFFEADDFF),
    secondary = Color(0xFFCCC2DC),
    tertiary = Color(0xFFEFB8C8),
    background = Color(0xFF1C1B1F),
    surface = Color(0xFF1C1B1F),
    error = Color(0xFFF2B8B5)
)

@Composable
fun MyAppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}`,
    },
    {
      title: '完整自定义主题（颜色+字体+形状）',
      code: `val CustomTypography = Typography(
    displayLarge = TextStyle(
        fontFamily = FontFamily.Serif,
        fontWeight = FontWeight.Normal,
        fontSize = 57.sp,
        lineHeight = 64.sp
    ),
    titleLarge = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Bold,
        fontSize = 22.sp,
        lineHeight = 28.sp
    ),
    bodyLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 24.sp,
        letterSpacing = 0.5.sp
    )
)

val CustomShapes = Shapes(
    extraSmall = RoundedCornerShape(2.dp),
    small = RoundedCornerShape(4.dp),
    medium = RoundedCornerShape(8.dp),
    large = RoundedCornerShape(16.dp),
    extraLarge = RoundedCornerShape(24.dp)
)

@Composable
fun CustomTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme,
        typography = CustomTypography,
        shapes = CustomShapes,
        content = content
    )
}`,
    },
    {
      title: '读取主题值',
      code: `@Composable
fun ThemedComponent() {
    // 读取颜色
    val primaryColor = MaterialTheme.colorScheme.primary
    val surfaceColor = MaterialTheme.colorScheme.surface
    val errorColor = MaterialTheme.colorScheme.error

    // 读取字体样式
    val headlineStyle = MaterialTheme.typography.headlineMedium
    val bodyStyle = MaterialTheme.typography.bodyLarge

    // 读取形状
    val cardShape = MaterialTheme.shapes.medium
    val buttonShape = MaterialTheme.shapes.small

    Card(
        shape = cardShape,
        colors = CardDefaults.cardColors(containerColor = surfaceColor)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = "标题",
                style = headlineStyle,
                color = primaryColor
            )
            Text(
                text = "正文内容",
                style = bodyStyle
            )
        }
    }
}`,
    },
    {
      title: 'Dynamic Color（动态颜色）',
      code: `@Composable
fun DynamicTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context)
            else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}`,
    },
    {
      title: '嵌套主题覆盖',
      code: `@Composable
fun NestedThemeExample() {
    MaterialTheme {
        Column {
            Text(
                text = "外层主题",
                color = MaterialTheme.colorScheme.primary
            )

            // 局部覆盖颜色方案
            MaterialTheme(
                colorScheme = lightColorScheme(
                    primary = Color.Red,
                    onPrimary = Color.White
                )
            ) {
                Button(onClick = {}) {
                    Text("红色按钮")  // 使用覆盖后的 primary 色
                }
            }

            Text(
                text = "恢复外层主题",
                color = MaterialTheme.colorScheme.primary
            )
        }
    }
}`,
    },
    {
      title: '品牌主题配置',
      code: `object BrandColors {
    val BrandBlue = Color(0xFF0066CC)
    val BrandOrange = Color(0xFFFF6600)
    val BrandGreen = Color(0xFF00AA66)
}

val BrandLightTheme = lightColorScheme(
    primary = BrandColors.BrandBlue,
    onPrimary = Color.White,
    primaryContainer = BrandColors.BrandBlue.copy(alpha = 0.1f),
    secondary = BrandColors.BrandOrange,
    tertiary = BrandColors.BrandGreen,
    background = Color(0xFFFAFAFA),
    surface = Color.White,
    surfaceVariant = Color(0xFFF5F5F5)
)

@Composable
fun BrandedApp(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = BrandLightTheme,
        content = content
    )
}`,
    },
    {
      title: '主题切换动画',
      code: `@Composable
fun AnimatedTheme(
    darkTheme: Boolean,
    content: @Composable () -> Unit
) {
    val targetColorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    val animatedColorScheme = ColorScheme(
        primary = animateColorAsState(
            targetValue = targetColorScheme.primary,
            animationSpec = tween(300)
        ).value,
        onPrimary = animateColorAsState(targetColorScheme.onPrimary).value,
        background = animateColorAsState(targetColorScheme.background).value,
        surface = animateColorAsState(targetColorScheme.surface).value,
        // ... 其他颜色类似处理
    )

    MaterialTheme(
        colorScheme = animatedColorScheme,
        content = content
    )
}`,
    },
  ],

  useCases: [
    {
      title: '多品牌应用主题切换',
      description: '支持用户在多个预设品牌主题之间切换',
      code: `enum class ThemeVariant { BLUE, GREEN, PURPLE }

@Composable
fun MultiThemeApp() {
    var currentTheme by remember { mutableStateOf(ThemeVariant.BLUE) }

    val colorScheme = when (currentTheme) {
        ThemeVariant.BLUE -> lightColorScheme(
            primary = Color(0xFF1976D2),
            secondary = Color(0xFF42A5F5)
        )
        ThemeVariant.GREEN -> lightColorScheme(
            primary = Color(0xFF388E3C),
            secondary = Color(0xFF66BB6A)
        )
        ThemeVariant.PURPLE -> lightColorScheme(
            primary = Color(0xFF7B1FA2),
            secondary = Color(0xFFBA68C8)
        )
    }

    MaterialTheme(colorScheme = colorScheme) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text("主题切换示例") },
                    actions = {
                        IconButton(onClick = {
                            currentTheme = ThemeVariant.entries[
                                (currentTheme.ordinal + 1) % ThemeVariant.entries.size
                            ]
                        }) {
                            Icon(Icons.Default.Palette, "切换主题")
                        }
                    }
                )
            }
        ) { padding ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding)
                    .padding(16.dp)
            ) {
                Card(modifier = Modifier.fillMaxWidth()) {
                    Text(
                        text = "当前主题: " + currentTheme.name,
                        modifier = Modifier.padding(16.dp),
                        style = MaterialTheme.typography.titleLarge
                    )
                }
            }
        }
    }
}`
    },
    {
      title: '主题配置管理',
      description: '从远程配置或本地存储加载主题配置',
      code: `data class ThemeConfig(
    val primaryColor: String,
    val secondaryColor: String,
    val useDarkTheme: Boolean,
    val fontScale: Float = 1f
)

@Composable
fun ConfigurableTheme(
    config: ThemeConfig,
    content: @Composable () -> Unit
) {
    val colorScheme = if (config.useDarkTheme) {
        darkColorScheme(
            primary = Color(android.graphics.Color.parseColor(config.primaryColor)),
            secondary = Color(android.graphics.Color.parseColor(config.secondaryColor))
        )
    } else {
        lightColorScheme(
            primary = Color(android.graphics.Color.parseColor(config.primaryColor)),
            secondary = Color(android.graphics.Color.parseColor(config.secondaryColor))
        )
    }

    val typography = Typography().run {
        copy(
            displayLarge = displayLarge.copy(fontSize = displayLarge.fontSize * config.fontScale),
            headlineMedium = headlineMedium.copy(fontSize = headlineMedium.fontSize * config.fontScale),
            bodyLarge = bodyLarge.copy(fontSize = bodyLarge.fontSize * config.fontScale)
        )
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = typography,
        content = content
    )
}

// 使用示例
@Composable
fun App() {
    val configFlow = remember { loadThemeConfig() }
    val config by configFlow.collectAsState(
        initial = ThemeConfig(
            primaryColor = "#6750A4",
            secondaryColor = "#625B71",
            useDarkTheme = false
        )
    )

    ConfigurableTheme(config = config) {
        MainScreen()
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '在应用根部设置主题',
      description: 'MaterialTheme 应该包裹整个应用内容，通常在 setContent 中作为根组件',
      goodExample: `class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyAppTheme {
                MainScreen()
            }
        }
    }
}`,
      badExample: `class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            // 缺少主题包裹，组件无法获取主题值
            MainScreen()
        }
    }
}`,
    },
    {
      title: '使用语义化颜色而非硬编码',
      description: '始终通过 MaterialTheme.colorScheme 访问颜色，确保主题切换时颜色自动更新',
      goodExample: `Text(
    text = "标题",
    color = MaterialTheme.colorScheme.primary,
    style = MaterialTheme.typography.titleLarge
)`,
      badExample: `Text(
    text = "标题",
    color = Color(0xFF6750A4),  // 硬编码颜色，主题切换时不会变化
    fontSize = 22.sp  // 硬编码字体大小
)`,
    },
    {
      title: '深色主题适配',
      description: '为深色和浅色主题分别定义 ColorScheme，确保在两种模式下都有良好的视觉效果',
      goodExample: `@Composable
fun MyTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) {
        darkColorScheme(
            primary = Color(0xFFD0BCFF),
            background = Color(0xFF1C1B1F)
        )
    } else {
        lightColorScheme(
            primary = Color(0xFF6750A4),
            background = Color(0xFFFFFBFE)
        )
    }
    MaterialTheme(colorScheme = colorScheme, content = content)
}`,
      badExample: `@Composable
fun MyTheme(content: @Composable () -> Unit) {
    // 只定义浅色主题，深色模式下视觉效果差
    MaterialTheme(
        colorScheme = lightColorScheme(),
        content = content
    )
}`,
    },
    {
      title: '避免过度嵌套主题',
      description: '局部覆盖主题应谨慎使用，频繁嵌套会导致主题不一致',
      goodExample: `MaterialTheme {
    Scaffold { padding ->
        // 整个应用使用统一主题
        Content(modifier = Modifier.padding(padding))
    }
}`,
      badExample: `MaterialTheme {
    Column {
        MaterialTheme(colorScheme = lightColorScheme()) {
            Header()  // 不同主题
        }
        MaterialTheme(colorScheme = darkColorScheme()) {
            Body()  // 又是不同主题，视觉混乱
        }
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'MaterialTheme 是 CompositionLocal 提供者',
      content: 'MaterialTheme 通过 CompositionLocalProvider 向子树注入 LocalColorScheme、LocalTypography、LocalShapes 等值，子组件通过 MaterialTheme.colorScheme 等属性访问'
    },
    {
      type: 'tip',
      title: 'Dynamic Color 支持',
      content: 'Android 12+ 支持动态颜色（Material You），使用 dynamicLightColorScheme(context) 和 dynamicDarkColorScheme(context) 从系统壁纸提取颜色'
    },
    {
      type: 'tip',
      title: '主题继承',
      content: '如果只传入部分参数，未指定的参数会继承外层 MaterialTheme 的值。例如只覆盖 colorScheme 时，typography 和 shapes 保持不变'
    },
    {
      type: 'warning',
      title: 'Material 2 迁移到 Material 3',
      content: 'Material 3 使用 MaterialTheme，Material 2 使用 androidx.compose.material.MaterialTheme。两者 API 不兼容，ColorScheme 结构也不同'
    },
    {
      type: 'warning',
      title: '主题切换性能',
      content: '改变主题参数会导致所有依赖主题值的组件重组。大型应用中频繁切换主题可能影响性能，建议配合 remember 缓存主题配置'
    },
    {
      type: 'danger',
      title: '避免在组件内部创建主题',
      content: '不要在频繁重组的组件内部创建 ColorScheme/Typography/Shapes 对象，应该使用 remember 或定义为顶层变量，否则每次重组都会创建新对象'
    },
    {
      type: 'tip',
      title: '预览主题',
      content: '使用 @Preview 时需要用 MaterialTheme 包裹组件才能正确显示主题效果：@Preview @Composable fun PreviewCard() { MaterialTheme { CardComponent() } }'
    },
  ],

  relatedComponents: ['color-scheme', 'typography', 'shapes', 'local-content-color'],
  since: '1.0.0',
}
