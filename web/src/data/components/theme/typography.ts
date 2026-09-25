import type { ComponentEntry } from '../../types'

export const typographyComponent: ComponentEntry = {
  id: 'typography',
  demo: { id: 'typography', sourceFile: 'TypographyDemo.kt' },
  name: 'Typography',
  category: 'Theme',
  description: 'Material3 字体排版规范，定义 displayLarge 到 labelSmall 共 15 个文字样式。',
  tags: ['typography', 'textstyle', 'font', 'theme', 'material3', 'type-scale'],
  params: [
    { name: 'displayLarge/Medium/Small', type: 'TextStyle', description: '展示级大标题，用于醒目数字/标题（57/45/36 sp）' },
    { name: 'headlineLarge/Medium/Small', type: 'TextStyle', description: '页面标题级别（32/28/24 sp）' },
    { name: 'titleLarge/Medium/Small', type: 'TextStyle', description: '组件标题，如 TopAppBar（22/16/14 sp）' },
    { name: 'bodyLarge/Medium/Small', type: 'TextStyle', description: '正文内容（16/14/12 sp）' },
    { name: 'labelLarge/Medium/Small', type: 'TextStyle', description: '标签、按钮文字（14/12/11 sp）' },
  ],
  examples: [
    {
      title: '使用内置样式',
      code: `@Composable
fun TypographyShowcase() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text("Display Large", style = MaterialTheme.typography.displayLarge)
        Text("Display Medium", style = MaterialTheme.typography.displayMedium)
        Text("Display Small", style = MaterialTheme.typography.displaySmall)

        Spacer(modifier = Modifier.height(8.dp))

        Text("Headline Large", style = MaterialTheme.typography.headlineLarge)
        Text("Headline Medium", style = MaterialTheme.typography.headlineMedium)
        Text("Headline Small", style = MaterialTheme.typography.headlineSmall)

        Spacer(modifier = Modifier.height(8.dp))

        Text("Title Large", style = MaterialTheme.typography.titleLarge)
        Text("Title Medium", style = MaterialTheme.typography.titleMedium)
        Text("Title Small", style = MaterialTheme.typography.titleSmall)

        Spacer(modifier = Modifier.height(8.dp))

        Text("Body Large", style = MaterialTheme.typography.bodyLarge)
        Text("Body Medium", style = MaterialTheme.typography.bodyMedium)
        Text("Body Small", style = MaterialTheme.typography.bodySmall)

        Spacer(modifier = Modifier.height(8.dp))

        Text("Label Large", style = MaterialTheme.typography.labelLarge)
        Text("Label Medium", style = MaterialTheme.typography.labelMedium)
        Text("Label Small", style = MaterialTheme.typography.labelSmall)
    }
}`,
    },
    {
      title: '自定义字体家族',
      code: `val RobotoFontFamily = FontFamily(
    Font(R.font.roboto_regular, FontWeight.Normal),
    Font(R.font.roboto_medium, FontWeight.Medium),
    Font(R.font.roboto_bold, FontWeight.Bold)
)

val OpenSansFontFamily = FontFamily(
    Font(R.font.opensans_regular, FontWeight.Normal),
    Font(R.font.opensans_semibold, FontWeight.SemiBold),
    Font(R.font.opensans_bold, FontWeight.Bold)
)

val CustomTypography = Typography(
    // Display 使用衬线字体
    displayLarge = TextStyle(
        fontFamily = FontFamily.Serif,
        fontWeight = FontWeight.Normal,
        fontSize = 57.sp,
        lineHeight = 64.sp,
        letterSpacing = (-0.25).sp
    ),

    // Headline 使用 Roboto
    headlineMedium = TextStyle(
        fontFamily = RobotoFontFamily,
        fontWeight = FontWeight.Bold,
        fontSize = 28.sp,
        lineHeight = 36.sp
    ),

    // Body 使用 Open Sans
    bodyLarge = TextStyle(
        fontFamily = OpenSansFontFamily,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 24.sp,
        letterSpacing = 0.5.sp
    ),

    // Label 使用无衬线字体
    labelMedium = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Medium,
        fontSize = 12.sp,
        lineHeight = 16.sp,
        letterSpacing = 0.5.sp
    )
)

@Composable
fun AppTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        typography = CustomTypography,
        content = content
    )
}`,
    },
    {
      title: '完整的 Typography 定义',
      code: `val AppTypography = Typography(
    displayLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 57.sp,
        lineHeight = 64.sp,
        letterSpacing = (-0.25).sp
    ),
    displayMedium = TextStyle(
        fontWeight = FontWeight.Normal,
        fontSize = 45.sp,
        lineHeight = 52.sp,
        letterSpacing = 0.sp
    ),
    displaySmall = TextStyle(
        fontWeight = FontWeight.Normal,
        fontSize = 36.sp,
        lineHeight = 44.sp,
        letterSpacing = 0.sp
    ),

    headlineLarge = TextStyle(
        fontWeight = FontWeight.Bold,
        fontSize = 32.sp,
        lineHeight = 40.sp,
        letterSpacing = 0.sp
    ),
    headlineMedium = TextStyle(
        fontWeight = FontWeight.Bold,
        fontSize = 28.sp,
        lineHeight = 36.sp,
        letterSpacing = 0.sp
    ),
    headlineSmall = TextStyle(
        fontWeight = FontWeight.Bold,
        fontSize = 24.sp,
        lineHeight = 32.sp,
        letterSpacing = 0.sp
    ),

    titleLarge = TextStyle(
        fontWeight = FontWeight.Medium,
        fontSize = 22.sp,
        lineHeight = 28.sp,
        letterSpacing = 0.sp
    ),
    titleMedium = TextStyle(
        fontWeight = FontWeight.Medium,
        fontSize = 16.sp,
        lineHeight = 24.sp,
        letterSpacing = 0.15.sp
    ),
    titleSmall = TextStyle(
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = 20.sp,
        letterSpacing = 0.1.sp
    ),

    bodyLarge = TextStyle(
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 24.sp,
        letterSpacing = 0.5.sp
    ),
    bodyMedium = TextStyle(
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 20.sp,
        letterSpacing = 0.25.sp
    ),
    bodySmall = TextStyle(
        fontWeight = FontWeight.Normal,
        fontSize = 12.sp,
        lineHeight = 16.sp,
        letterSpacing = 0.4.sp
    ),

    labelLarge = TextStyle(
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = 20.sp,
        letterSpacing = 0.1.sp
    ),
    labelMedium = TextStyle(
        fontWeight = FontWeight.Medium,
        fontSize = 12.sp,
        lineHeight = 16.sp,
        letterSpacing = 0.5.sp
    ),
    labelSmall = TextStyle(
        fontWeight = FontWeight.Medium,
        fontSize = 11.sp,
        lineHeight = 16.sp,
        letterSpacing = 0.5.sp
    )
)`,
    },
    {
      title: '扩展 TextStyle',
      code: `@Composable
fun StyledText() {
    val baseStyle = MaterialTheme.typography.bodyLarge

    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        // 基于主题样式进行扩展
        Text(
            text = "加粗文字",
            style = baseStyle.copy(fontWeight = FontWeight.Bold)
        )

        Text(
            text = "斜体文字",
            style = baseStyle.copy(fontStyle = FontStyle.Italic)
        )

        Text(
            text = "彩色文字",
            style = baseStyle.copy(
                color = MaterialTheme.colorScheme.primary
            )
        )

        Text(
            text = "带下划线",
            style = baseStyle.copy(
                textDecoration = TextDecoration.Underline
            )
        )

        Text(
            text = "增加行高的段落文字，增加行高可以提升长文本的可读性，" +
                  "让读者更容易区分行与行之间的内容。",
            style = baseStyle.copy(lineHeight = 28.sp)
        )
    }
}`,
    },
    {
      title: '响应式字体大小',
      code: `@Composable
fun ResponsiveTypography() {
    val configuration = LocalConfiguration.current
    val screenWidth = configuration.screenWidthDp

    // 根据屏幕宽度调整字体缩放
    val fontScale = when {
        screenWidth < 360 -> 0.9f
        screenWidth > 600 -> 1.1f
        else -> 1f
    }

    val scaledTypography = Typography(
        displayLarge = MaterialTheme.typography.displayLarge.copy(
            fontSize = MaterialTheme.typography.displayLarge.fontSize * fontScale
        ),
        headlineMedium = MaterialTheme.typography.headlineMedium.copy(
            fontSize = MaterialTheme.typography.headlineMedium.fontSize * fontScale
        ),
        bodyLarge = MaterialTheme.typography.bodyLarge.copy(
            fontSize = MaterialTheme.typography.bodyLarge.fontSize * fontScale
        )
    )

    MaterialTheme(typography = scaledTypography) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("响应式标题", style = MaterialTheme.typography.headlineMedium)
            Text("响应式正文内容", style = MaterialTheme.typography.bodyLarge)
        }
    }
}`,
    },
    {
      title: '可变字体（Variable Fonts）',
      code: `val InterVariableFont = FontFamily(
    Font(
        resId = R.font.inter_variable,
        weight = FontWeight.Normal,
        variationSettings = FontVariation.Settings(
            FontVariation.weight(400),
            FontVariation.width(100f)
        )
    ),
    Font(
        resId = R.font.inter_variable,
        weight = FontWeight.Medium,
        variationSettings = FontVariation.Settings(
            FontVariation.weight(500)
        )
    ),
    Font(
        resId = R.font.inter_variable,
        weight = FontWeight.Bold,
        variationSettings = FontVariation.Settings(
            FontVariation.weight(700)
        )
    )
)

val VariableFontTypography = Typography(
    bodyLarge = TextStyle(
        fontFamily = InterVariableFont,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 24.sp
    ),
    titleLarge = TextStyle(
        fontFamily = InterVariableFont,
        fontWeight = FontWeight.Bold,
        fontSize = 22.sp,
        lineHeight = 28.sp
    )
)`,
    },
    {
      title: '多语言字体配置',
      code: `val ChineseFontFamily = FontFamily(
    Font(R.font.noto_sans_sc_regular, FontWeight.Normal),
    Font(R.font.noto_sans_sc_medium, FontWeight.Medium),
    Font(R.font.noto_sans_sc_bold, FontWeight.Bold)
)

val ArabicFontFamily = FontFamily(
    Font(R.font.noto_sans_arabic_regular, FontWeight.Normal),
    Font(R.font.noto_sans_arabic_bold, FontWeight.Bold)
)

@Composable
fun LocalizedTypography() {
    val locale = LocalContext.current.resources.configuration.locales[0]

    val fontFamily = when (locale.language) {
        "zh" -> ChineseFontFamily
        "ar" -> ArabicFontFamily
        else -> FontFamily.Default
    }

    val typography = Typography(
        bodyLarge = TextStyle(
            fontFamily = fontFamily,
            fontSize = 16.sp,
            lineHeight = 24.sp
        ),
        titleLarge = TextStyle(
            fontFamily = fontFamily,
            fontWeight = FontWeight.Bold,
            fontSize = 22.sp,
            lineHeight = 28.sp
        )
    )

    MaterialTheme(typography = typography) {
        Text("本地化文本", style = MaterialTheme.typography.bodyLarge)
    }
}`,
    },
    {
      title: 'TextStyle 合并',
      code: `@Composable
fun MergedStyles() {
    // 定义基础样式
    val baseStyle = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontSize = 16.sp,
        lineHeight = 24.sp
    )

    // 定义强调样式
    val emphasisStyle = TextStyle(
        fontWeight = FontWeight.Bold,
        color = MaterialTheme.colorScheme.primary
    )

    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        // 使用单一样式
        Text("普通文本", style = baseStyle)

        // 合并多个样式
        Text(
            "强调文本",
            style = baseStyle.merge(emphasisStyle)
        )

        // 主题样式 + 自定义样式
        Text(
            "主题标题",
            style = MaterialTheme.typography.titleLarge.merge(
                TextStyle(color = MaterialTheme.colorScheme.tertiary)
            )
        )
    }
}`,
    },
  ],

  useCases: [
    {
      title: '文章阅读界面',
      description: '为长文本阅读场景配置舒适的字体排版',
      code: `val ArticleTypography = Typography(
    // 文章标题
    headlineLarge = TextStyle(
        fontFamily = FontFamily.Serif,
        fontWeight = FontWeight.Bold,
        fontSize = 32.sp,
        lineHeight = 40.sp,
        letterSpacing = 0.sp
    ),

    // 副标题
    headlineMedium = TextStyle(
        fontFamily = FontFamily.Serif,
        fontWeight = FontWeight.Medium,
        fontSize = 24.sp,
        lineHeight = 32.sp
    ),

    // 正文 - 增加行高提升可读性
    bodyLarge = TextStyle(
        fontFamily = FontFamily.Serif,
        fontWeight = FontWeight.Normal,
        fontSize = 18.sp,
        lineHeight = 32.sp,  // 1.78 倍行高
        letterSpacing = 0.sp
    ),

    // 引用文本
    bodyMedium = TextStyle(
        fontFamily = FontFamily.Serif,
        fontWeight = FontWeight.Normal,
        fontStyle = FontStyle.Italic,
        fontSize = 16.sp,
        lineHeight = 28.sp
    ),

    // 图片说明
    bodySmall = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 20.sp,
        color = Color.Gray
    )
)

@Composable
fun ArticleReader(article: Article) {
    MaterialTheme(typography = ArticleTypography) {
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 24.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                Text(
                    text = article.title,
                    style = MaterialTheme.typography.headlineLarge
                )
            }

            item {
                Text(
                    text = article.subtitle,
                    style = MaterialTheme.typography.headlineMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            item {
                Text(
                    text = article.content,
                    style = MaterialTheme.typography.bodyLarge
                )
            }

            item {
                Surface(
                    color = MaterialTheme.colorScheme.surfaceVariant,
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(
                        text = article.quote,
                        style = MaterialTheme.typography.bodyMedium,
                        modifier = Modifier.padding(16.dp)
                    )
                }
            }
        }
    }
}`
    },
    {
      title: '可访问性字体缩放',
      description: '支持系统字体大小设置，确保可访问性',
      code: `@Composable
fun AccessibleTypography(
    userFontScale: Float = 1f,
    content: @Composable () -> Unit
) {
    // 限制字体缩放范围，防止过大或过小
    val clampedScale = userFontScale.coerceIn(0.8f, 1.5f)

    val scaledTypography = Typography(
        displayLarge = TextStyle(
            fontSize = (57 * clampedScale).sp,
            lineHeight = (64 * clampedScale).sp,
            fontWeight = FontWeight.Normal
        ),
        headlineMedium = TextStyle(
            fontSize = (28 * clampedScale).sp,
            lineHeight = (36 * clampedScale).sp,
            fontWeight = FontWeight.Bold
        ),
        bodyLarge = TextStyle(
            fontSize = (16 * clampedScale).sp,
            lineHeight = (24 * clampedScale).sp,
            fontWeight = FontWeight.Normal
        ),
        labelMedium = TextStyle(
            // Label 字体最小保持在可读范围
            fontSize = maxOf(12f, 12 * clampedScale).sp,
            lineHeight = maxOf(16f, 16 * clampedScale).sp,
            fontWeight = FontWeight.Medium
        )
    )

    MaterialTheme(typography = scaledTypography) {
        content()
    }
}

@Composable
fun SettingsScreen() {
    var fontScale by remember { mutableStateOf(1f) }

    Column(modifier = Modifier.padding(16.dp)) {
        Text("字体大小设置")

        Slider(
            value = fontScale,
            onValueChange = { fontScale = it },
            valueRange = 0.8f..1.5f
        )

        Text("预览：" + fontScale.toString())

        AccessibleTypography(userFontScale = fontScale) {
            Column {
                Text("标题", style = MaterialTheme.typography.headlineMedium)
                Text("正文内容", style = MaterialTheme.typography.bodyLarge)
                Text("标签", style = MaterialTheme.typography.labelMedium)
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用语义化的样式名称',
      description: '根据内容的语义角色选择样式，而非根据视觉大小',
      goodExample: `// 根据语义选择
TopAppBar(
    title = { Text("标题", style = MaterialTheme.typography.titleLarge) }
)

Text(
    text = "正文段落",
    style = MaterialTheme.typography.bodyMedium
)

Button(onClick = {}) {
    Text("按钮", style = MaterialTheme.typography.labelLarge)
}`,
      badExample: `// 根据大小选择，语义不明确
TopAppBar(
    title = { Text("标题", fontSize = 22.sp) }
)

Text("正文", fontSize = 14.sp)  // 硬编码尺寸`,
    },
    {
      title: '合理配置行高',
      description: '行高应为字号的 1.2-1.8 倍，长文本使用更大行高',
      goodExample: `Typography(
    bodyLarge = TextStyle(
        fontSize = 16.sp,
        lineHeight = 24.sp  // 1.5 倍行高，适合阅读
    ),
    labelMedium = TextStyle(
        fontSize = 12.sp,
        lineHeight = 16.sp  // 1.33 倍行高，紧凑布局
    )
)`,
      badExample: `Typography(
    bodyLarge = TextStyle(
        fontSize = 16.sp,
        lineHeight = 16.sp  // 行高太小，行间距不足
    )
)`,
    },
    {
      title: '限制字体家族数量',
      description: '应用中使用 1-2 个字体家族，避免视觉混乱',
      goodExample: `val AppTypography = Typography(
    // 标题使用衬线字体
    displayLarge = TextStyle(fontFamily = FontFamily.Serif),
    headlineMedium = TextStyle(fontFamily = FontFamily.Serif),

    // 正文使用无衬线字体
    bodyLarge = TextStyle(fontFamily = FontFamily.SansSerif),
    labelMedium = TextStyle(fontFamily = FontFamily.SansSerif)
)`,
      badExample: `val AppTypography = Typography(
    displayLarge = TextStyle(fontFamily = Font1),
    headlineMedium = TextStyle(fontFamily = Font2),
    bodyLarge = TextStyle(fontFamily = Font3),  // 太多字体
    labelMedium = TextStyle(fontFamily = Font4)
)`,
    },
    {
      title: '使用 sp 而非 dp',
      description: '字体大小必须使用 sp 单位以支持系统字体缩放',
      goodExample: `TextStyle(
    fontSize = 16.sp,
    lineHeight = 24.sp,
    letterSpacing = 0.5.sp
)`,
      badExample: `TextStyle(
    fontSize = 16.dp,  // 错误：不跟随系统字体设置
    lineHeight = 24.dp
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Material 3 类型比例系统',
      content: 'Typography 定义了 15 个文字样式，分为 5 个类别（Display/Headline/Title/Body/Label），每个类别 3 个尺寸（Large/Medium/Small），覆盖从展示标题到小标签的所有场景'
    },
    {
      type: 'tip',
      title: '默认字体回退',
      content: '如果未指定 fontFamily，Compose 使用系统默认字体。Android 系统默认是 Roboto，可以通过 FontFamily.Default 显式指定'
    },
    {
      type: 'tip',
      title: 'TextStyle.merge() 的优先级',
      content: 'merge() 方法中，参数中的非空属性会覆盖调用者的属性。例如 baseStyle.merge(emphasisStyle)，emphasisStyle 的属性优先'
    },
    {
      type: 'warning',
      title: '字体文件大小',
      content: '自定义字体会增加 APK 大小。单个字体文件通常 100-500 KB，可变字体可能达到 1 MB。考虑使用 Downloadable Fonts 或仅包含必要的字重'
    },
    {
      type: 'warning',
      title: 'letterSpacing 单位',
      content: 'letterSpacing 使用 sp 单位，正值增加间距，负值减少间距。过大或过小的字间距都会影响可读性，建议在 -0.25sp 到 0.5sp 之间'
    },
    {
      type: 'danger',
      title: '避免极端字体大小',
      content: '过小的字体（< 12sp）影响可读性，过大的字体（> 100sp）可能导致布局问题。关键内容字体至少 14sp，确保符合可访问性标准'
    },
    {
      type: 'tip',
      title: 'Downloadable Fonts',
      content: '使用 Google Fonts 的 Downloadable Fonts 功能可以减小 APK 大小，系统会按需下载字体。配置方式：Font(resId, weight, GoogleFont("Roboto"))'
    },
  ],

  relatedComponents: ['material-theme', 'text'],
  since: '1.0.0',
}
