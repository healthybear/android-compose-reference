import type { ComponentEntry } from '../../types'

export const materialThemeComponent: ComponentEntry = {
  id: 'material-theme',
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
      title: '自定义主题',
      code: `val MyColorScheme = lightColorScheme(
    primary = Color(0xFF6650A4),
    secondary = Color(0xFF625B71),
    tertiary = Color(0xFF7D5260)
)

@Composable
fun MyAppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = if (darkTheme) darkColorScheme() else MyColorScheme,
        content = content
    )
}`,
    },
    {
      title: '读取主题值',
      code: `// 在任意 Composable 中读取
val primary = MaterialTheme.colorScheme.primary
val titleStyle = MaterialTheme.typography.titleLarge
val cornerShape = MaterialTheme.shapes.medium

Text(
    text = "主题文字",
    color = primary,
    style = titleStyle
)`,
    },
  ],
}
