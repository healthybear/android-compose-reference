import type { ComponentEntry } from '../../types'

export const colorSchemeComponent: ComponentEntry = {
  id: 'color-scheme',
  demo: { id: 'color-scheme', sourceFile: 'ColorSchemeDemo.kt' },
  name: 'ColorScheme',
  category: 'Theme',
  description: 'Material3 颜色系统，包含 primary/secondary/tertiary 及其容器色、surface 系列等 30 个语义色。',
  tags: ['colorscheme', 'color', 'theme', 'material3', 'palette', 'dynamic-color'],
  params: [
    { name: 'primary', type: 'Color', required: true, description: '主色，用于关键 UI 元素（按钮、FAB、激活状态）' },
    { name: 'onPrimary', type: 'Color', required: true, description: '主色上的内容色（文字、图标）' },
    { name: 'primaryContainer', type: 'Color', required: true, description: '主色容器背景（低强度的主色区域）' },
    { name: 'onPrimaryContainer', type: 'Color', required: true, description: '主色容器上的内容色' },
    { name: 'secondary', type: 'Color', required: true, description: '辅助色，用于次要操作' },
    { name: 'onSecondary', type: 'Color', required: true, description: '辅助色上的内容色' },
    { name: 'secondaryContainer', type: 'Color', required: true, description: '辅助色容器' },
    { name: 'tertiary', type: 'Color', required: true, description: '第三色，用于强调和对比' },
    { name: 'surface', type: 'Color', required: true, description: '表面色（卡片、对话框背景）' },
    { name: 'surfaceVariant', type: 'Color', required: true, description: '表面变体色（区分不同层级）' },
    { name: 'background', type: 'Color', required: true, description: '背景色（应用整体背景）' },
    { name: 'error', type: 'Color', required: true, description: '错误状态色' },
    { name: 'outline', type: 'Color', required: true, description: '边框和分割线颜色' },
  ],
  examples: [
    {
      title: '创建浅色主题',
      code: `val MyLightColorScheme = lightColorScheme(
    primary = Color(0xFF6750A4),
    onPrimary = Color(0xFFFFFFFF),
    primaryContainer = Color(0xFFEADDFF),
    onPrimaryContainer = Color(0xFF21005D),

    secondary = Color(0xFF625B71),
    onSecondary = Color(0xFFFFFFFF),
    secondaryContainer = Color(0xFFE8DEF8),
    onSecondaryContainer = Color(0xFF1D192B),

    tertiary = Color(0xFF7D5260),
    onTertiary = Color(0xFFFFFFFF),
    tertiaryContainer = Color(0xFFFFD8E4),
    onTertiaryContainer = Color(0xFF31111D),

    error = Color(0xFFB3261E),
    onError = Color(0xFFFFFFFF),
    errorContainer = Color(0xFFF9DEDC),
    onErrorContainer = Color(0xFF410E0B),

    background = Color(0xFFFFFBFE),
    onBackground = Color(0xFF1C1B1F),

    surface = Color(0xFFFFFBFE),
    onSurface = Color(0xFF1C1B1F),
    surfaceVariant = Color(0xFFE7E0EC),
    onSurfaceVariant = Color(0xFF49454F),

    outline = Color(0xFF79747E),
    outlineVariant = Color(0xFFCAC4D0)
)`,
    },
    {
      title: '创建深色主题',
      code: `val MyDarkColorScheme = darkColorScheme(
    primary = Color(0xFFD0BCFF),
    onPrimary = Color(0xFF381E72),
    primaryContainer = Color(0xFF4F378B),
    onPrimaryContainer = Color(0xFFEADDFF),

    secondary = Color(0xFFCCC2DC),
    onSecondary = Color(0xFF332D41),
    secondaryContainer = Color(0xFF4A4458),
    onSecondaryContainer = Color(0xFFE8DEF8),

    tertiary = Color(0xFFEFB8C8),
    onTertiary = Color(0xFF492532),
    tertiaryContainer = Color(0xFF633B48),
    onTertiaryContainer = Color(0xFFFFD8E4),

    error = Color(0xFFF2B8B5),
    onError = Color(0xFF601410),
    errorContainer = Color(0xFF8C1D18),
    onErrorContainer = Color(0xFFF9DEDC),

    background = Color(0xFF1C1B1F),
    onBackground = Color(0xFFE6E1E5),

    surface = Color(0xFF1C1B1F),
    onSurface = Color(0xFFE6E1E5),
    surfaceVariant = Color(0xFF49454F),
    onSurfaceVariant = Color(0xFFCAC4D0),

    outline = Color(0xFF938F99),
    outlineVariant = Color(0xFF49454F)
)`,
    },
    {
      title: 'Dynamic Color（Android 12+ 壁纸取色）',
      code: `@Composable
fun AppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val context = LocalContext.current

    val colorScheme = when {
        // Android 12+ 支持动态颜色
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            if (darkTheme) dynamicDarkColorScheme(context)
            else dynamicLightColorScheme(context)
        }
        // 低版本使用自定义主题
        darkTheme -> MyDarkColorScheme
        else -> MyLightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}`,
    },
    {
      title: '使用语义化颜色',
      code: `@Composable
fun SemanticColorExample() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        // 主色按钮
        Button(
            onClick = {},
            colors = ButtonDefaults.buttonColors(
                containerColor = MaterialTheme.colorScheme.primary,
                contentColor = MaterialTheme.colorScheme.onPrimary
            )
        ) {
            Text("主要操作")
        }

        // 辅助色按钮
        Button(
            onClick = {},
            colors = ButtonDefaults.buttonColors(
                containerColor = MaterialTheme.colorScheme.secondaryContainer,
                contentColor = MaterialTheme.colorScheme.onSecondaryContainer
            )
        ) {
            Text("次要操作")
        }

        // 表面色卡片
        Card(
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            Text(
                text = "卡片内容",
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(16.dp)
            )
        }

        // 错误状态
        Text(
            text = "错误提示信息",
            color = MaterialTheme.colorScheme.error,
            modifier = Modifier
                .background(
                    MaterialTheme.colorScheme.errorContainer,
                    RoundedCornerShape(4.dp)
                )
                .padding(8.dp)
        )
    }
}`,
    },
    {
      title: '品牌色配置',
      code: `object BrandColors {
    // 品牌主色
    val Primary = Color(0xFF0066CC)
    val PrimaryVariant = Color(0xFF004C99)

    // 品牌辅助色
    val Accent = Color(0xFFFF6600)

    // 中性色
    val Gray50 = Color(0xFFFAFAFA)
    val Gray900 = Color(0xFF212121)
}

val BrandLightScheme = lightColorScheme(
    primary = BrandColors.Primary,
    onPrimary = Color.White,
    primaryContainer = BrandColors.Primary.copy(alpha = 0.12f),
    onPrimaryContainer = BrandColors.PrimaryVariant,

    secondary = BrandColors.Accent,
    onSecondary = Color.White,
    secondaryContainer = BrandColors.Accent.copy(alpha = 0.12f),
    onSecondaryContainer = BrandColors.Accent,

    background = BrandColors.Gray50,
    onBackground = BrandColors.Gray900,

    surface = Color.White,
    onSurface = BrandColors.Gray900
)`,
    },
    {
      title: 'Surface 层级系统',
      code: `@Composable
fun SurfaceElevationExample() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // 基础表面
        Surface(
            tonalElevation = 0.dp,
            color = MaterialTheme.colorScheme.surface
        ) {
            Text(
                text = "Level 0 - 基础表面",
                modifier = Modifier.padding(16.dp)
            )
        }

        // 抬升表面 1
        Surface(
            tonalElevation = 1.dp,
            color = MaterialTheme.colorScheme.surface
        ) {
            Text(
                text = "Level 1 - 轻微抬升",
                modifier = Modifier.padding(16.dp)
            )
        }

        // 抬升表面 3
        Surface(
            tonalElevation = 3.dp,
            color = MaterialTheme.colorScheme.surface
        ) {
            Text(
                text = "Level 3 - 中度抬升（卡片）",
                modifier = Modifier.padding(16.dp)
            )
        }

        // 抬升表面 5
        Surface(
            tonalElevation = 5.dp,
            color = MaterialTheme.colorScheme.surface
        ) {
            Text(
                text = "Level 5 - 高度抬升（对话框）",
                modifier = Modifier.padding(16.dp)
            )
        }
    }
}`,
    },
    {
      title: 'Container 色使用',
      code: `@Composable
fun ContainerColorExample() {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        // Primary Container - 低强度主色区域
        Box(
            modifier = Modifier
                .weight(1f)
                .height(100.dp)
                .background(
                    MaterialTheme.colorScheme.primaryContainer,
                    RoundedCornerShape(8.dp)
                ),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Star,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.onPrimaryContainer
            )
        }

        // Secondary Container - 辅助色区域
        Box(
            modifier = Modifier
                .weight(1f)
                .height(100.dp)
                .background(
                    MaterialTheme.colorScheme.secondaryContainer,
                    RoundedCornerShape(8.dp)
                ),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Favorite,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.onSecondaryContainer
            )
        }

        // Tertiary Container - 强调色区域
        Box(
            modifier = Modifier
                .weight(1f)
                .height(100.dp)
                .background(
                    MaterialTheme.colorScheme.tertiaryContainer,
                    RoundedCornerShape(8.dp)
                ),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Notifications,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.onTertiaryContainer
            )
        }
    }
}`,
    },
    {
      title: '边框和分割线',
      code: `@Composable
fun OutlineColorExample() {
    Column(modifier = Modifier.padding(16.dp)) {
        // 使用 outline 作为边框
        OutlinedTextField(
            value = "",
            onValueChange = {},
            label = { Text("输入框") },
            colors = OutlinedTextFieldDefaults.colors(
                unfocusedBorderColor = MaterialTheme.colorScheme.outline,
                focusedBorderColor = MaterialTheme.colorScheme.primary
            )
        )

        Spacer(modifier = Modifier.height(16.dp))

        // 使用 outline 作为分割线
        HorizontalDivider(
            color = MaterialTheme.colorScheme.outline,
            thickness = 1.dp
        )

        Spacer(modifier = Modifier.height(16.dp))

        // 使用 outlineVariant 作为更淡的边框
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .border(
                    1.dp,
                    MaterialTheme.colorScheme.outlineVariant,
                    RoundedCornerShape(8.dp)
                )
                .padding(16.dp)
        ) {
            Text("使用 outlineVariant 的淡边框")
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '主题切换系统',
      description: '实现深色/浅色主题切换，支持跟随系统或手动选择',
      code: `enum class ThemeMode { LIGHT, DARK, SYSTEM }

class ThemeViewModel : ViewModel() {
    private val _themeMode = MutableStateFlow(ThemeMode.SYSTEM)
    val themeMode = _themeMode.asStateFlow()

    fun setThemeMode(mode: ThemeMode) {
        _themeMode.value = mode
    }
}

@Composable
fun ThemedApp(viewModel: ThemeViewModel = viewModel()) {
    val themeMode by viewModel.themeMode.collectAsState()
    val systemInDarkTheme = isSystemInDarkTheme()

    val darkTheme = when (themeMode) {
        ThemeMode.LIGHT -> false
        ThemeMode.DARK -> true
        ThemeMode.SYSTEM -> systemInDarkTheme
    }

    val colorScheme = if (darkTheme) MyDarkColorScheme else MyLightColorScheme

    MaterialTheme(colorScheme = colorScheme) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text("主题设置") },
                    actions = {
                        IconButton(onClick = {
                            val nextMode = when (themeMode) {
                                ThemeMode.LIGHT -> ThemeMode.DARK
                                ThemeMode.DARK -> ThemeMode.SYSTEM
                                ThemeMode.SYSTEM -> ThemeMode.LIGHT
                            }
                            viewModel.setThemeMode(nextMode)
                        }) {
                            Icon(
                                imageVector = when (themeMode) {
                                    ThemeMode.LIGHT -> Icons.Default.LightMode
                                    ThemeMode.DARK -> Icons.Default.DarkMode
                                    ThemeMode.SYSTEM -> Icons.Default.Settings
                                },
                                contentDescription = "切换主题"
                            )
                        }
                    }
                )
            }
        ) { padding ->
            Content(modifier = Modifier.padding(padding))
        }
    }
}`
    },
    {
      title: '状态颜色系统',
      description: '为不同状态（成功、警告、信息）定义扩展颜色',
      code: `data class ExtendedColorScheme(
    val colorScheme: ColorScheme,
    val success: Color,
    val onSuccess: Color,
    val successContainer: Color,
    val warning: Color,
    val onWarning: Color,
    val warningContainer: Color,
    val info: Color,
    val onInfo: Color,
    val infoContainer: Color
)

val LocalExtendedColors = staticCompositionLocalOf {
    ExtendedColorScheme(
        colorScheme = lightColorScheme(),
        success = Color(0xFF4CAF50),
        onSuccess = Color.White,
        successContainer = Color(0xFFC8E6C9),
        warning = Color(0xFFFF9800),
        onWarning = Color.White,
        warningContainer = Color(0xFFFFE0B2),
        info = Color(0xFF2196F3),
        onInfo = Color.White,
        infoContainer = Color(0xFFBBDEFB)
    )
}

@Composable
fun ExtendedTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val baseColorScheme = if (darkTheme) MyDarkColorScheme else MyLightColorScheme

    val extendedColors = ExtendedColorScheme(
        colorScheme = baseColorScheme,
        success = if (darkTheme) Color(0xFF81C784) else Color(0xFF4CAF50),
        onSuccess = Color.White,
        successContainer = if (darkTheme) Color(0xFF2E7D32) else Color(0xFFC8E6C9),
        warning = if (darkTheme) Color(0xFFFFB74D) else Color(0xFFFF9800),
        onWarning = if (darkTheme) Color.Black else Color.White,
        warningContainer = if (darkTheme) Color(0xFFE65100) else Color(0xFFFFE0B2),
        info = if (darkTheme) Color(0xFF64B5F6) else Color(0xFF2196F3),
        onInfo = Color.White,
        infoContainer = if (darkTheme) Color(0xFF1565C0) else Color(0xFFBBDEFB)
    )

    CompositionLocalProvider(LocalExtendedColors provides extendedColors) {
        MaterialTheme(colorScheme = baseColorScheme, content = content)
    }
}

// 使用扩展颜色
@Composable
fun StatusCard(message: String, type: String) {
    val colors = LocalExtendedColors.current

    val (bgColor, textColor) = when (type) {
        "success" -> colors.successContainer to colors.onSuccess
        "warning" -> colors.warningContainer to colors.onWarning
        "info" -> colors.infoContainer to colors.onInfo
        else -> MaterialTheme.colorScheme.errorContainer to
                MaterialTheme.colorScheme.onErrorContainer
    }

    Surface(
        color = bgColor,
        shape = RoundedCornerShape(8.dp)
    ) {
        Text(
            text = message,
            color = textColor,
            modifier = Modifier.padding(16.dp)
        )
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '始终配对使用 color 和 onColor',
      description: '每个背景色都应该配对使用对应的内容色，确保足够的对比度',
      goodExample: `Surface(color = MaterialTheme.colorScheme.primary) {
    Text(
        text = "按钮",
        color = MaterialTheme.colorScheme.onPrimary  // 正确：使用配对的 onPrimary
    )
}`,
      badExample: `Surface(color = MaterialTheme.colorScheme.primary) {
    Text(
        text = "按钮",
        color = Color.White  // 错误：硬编码颜色，可能对比度不足
    )
}`,
    },
    {
      title: '使用 Container 色降低强度',
      description: 'Container 色提供低强度版本，适合大面积背景',
      goodExample: `// 使用 primaryContainer 作为大面积背景
Card(
    colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.primaryContainer
    )
) {
    Text(
        text = "内容",
        color = MaterialTheme.colorScheme.onPrimaryContainer
    )
}`,
      badExample: `// 直接使用 primary 作为大面积背景，过于强烈
Card(
    colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.primary
    )
) {
    Text(text = "内容")
}`,
    },
    {
      title: '深色和浅色主题分别定义',
      description: '为深色和浅色模式创建单独的 ColorScheme，确保两种模式下都有良好的可读性',
      goodExample: `val lightScheme = lightColorScheme(
    primary = Color(0xFF6750A4),
    background = Color(0xFFFFFBFE)
)

val darkScheme = darkColorScheme(
    primary = Color(0xFFD0BCFF),  // 更亮的颜色用于深色背景
    background = Color(0xFF1C1B1F)
)`,
      badExample: `// 深色和浅色使用相同的颜色值
val scheme = lightColorScheme(
    primary = Color(0xFF6750A4),  // 深色模式下可能看不清
    background = Color.White
)`,
    },
    {
      title: '避免硬编码颜色',
      description: '使用 MaterialTheme.colorScheme 访问颜色，而非直接使用 Color() 构造',
      goodExample: `Text(
    text = "标题",
    color = MaterialTheme.colorScheme.primary,
    style = MaterialTheme.typography.titleLarge
)

Divider(color = MaterialTheme.colorScheme.outline)`,
      badExample: `Text(
    text = "标题",
    color = Color(0xFF6750A4),  // 硬编码，主题切换时不会更新
    fontSize = 22.sp
)

Divider(color = Color.Gray)  // 硬编码，不跟随主题`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Material 3 颜色角色系统',
      content: 'ColorScheme 定义了 40 个颜色角色（color roles），包括 primary/secondary/tertiary 三组主色，每组有 base/on/container/onContainer 四种变体，plus surface/background/error 及其变体'
    },
    {
      type: 'info',
      title: 'Dynamic Color 需要 Android 12+',
      content: 'dynamicLightColorScheme() 和 dynamicDarkColorScheme() 从系统壁纸提取颜色，需要 Android 12 (API 31) 及以上。低版本设备需要提供 fallback ColorScheme'
    },
    {
      type: 'info',
      title: 'Surface Tint 自动调整',
      content: 'Surface 组件的 tonalElevation 参数会自动在 surface 色基础上叠加 primary 色的 tint，实现不同层级的视觉区分，无需手动定义多个 surface 颜色'
    },
    {
      type: 'warning',
      title: 'Color.copy() 创建变体',
      content: '使用 Color.copy(alpha = 0.12f) 创建半透明变体时，注意叠加在不同背景上效果可能不一致。建议为浅色和深色主题分别定义实色值'
    },
    {
      type: 'warning',
      title: 'Outline 不要用作填充色',
      content: 'outline 和 outlineVariant 专门用于边框和分割线，对比度较低，不适合作为文字或图标的背景色'
    },
    {
      type: 'error',
      title: '确保足够的对比度',
      content: 'WCAG AA 标准要求文字与背景对比度至少 4.5:1（大文字 3:1）。使用 Material Theme Builder 工具验证颜色方案的可访问性'
    },
    {
      type: 'info',
      title: 'Material Theme Builder 工具',
      content: '使用 Google 的 Material Theme Builder (m3.material.io/theme-builder) 生成符合 M3 规范的完整 ColorScheme，可导出为 Compose 代码'
    },
  ],

  relatedComponents: ['material-theme', 'surface', 'local-content-color'],
  since: '1.0.0',
}
