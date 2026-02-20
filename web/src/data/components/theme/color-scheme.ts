import type { ComponentEntry } from '../../types'

export const colorSchemeComponent: ComponentEntry = {
  id: 'color-scheme',
  name: 'ColorScheme',
  category: 'Theme',
  description: 'Material3 颜色系统，包含 primary/secondary/tertiary 及其容器色、surface 系列等 30 个语义色。',
  tags: ['colorscheme', 'color', 'theme', 'material3', 'palette', 'dynamic-color'],
  params: [
    { name: 'primary', type: 'Color', required: true, description: '主色，用于关键 UI 元素' },
    { name: 'onPrimary', type: 'Color', required: true, description: '主色上的内容色' },
    { name: 'primaryContainer', type: 'Color', required: true, description: '主色容器背景' },
    { name: 'secondary / tertiary', type: 'Color', required: true, description: '辅助色和第三色' },
    { name: 'surface / background', type: 'Color', required: true, description: '表面色和背景色' },
    { name: 'error', type: 'Color', required: true, description: '错误状态色' },
  ],
  examples: [
    {
      title: 'Dynamic Color（Android 12+）',
      code: `@Composable
fun AppTheme(content: @Composable () -> Unit) {
    val context = LocalContext.current
    val colorScheme = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        if (isSystemInDarkTheme()) dynamicDarkColorScheme(context)
        else dynamicLightColorScheme(context)
    } else {
        if (isSystemInDarkTheme()) darkColorScheme() else lightColorScheme()
    }
    MaterialTheme(colorScheme = colorScheme, content = content)
}`,
    },
    {
      title: '使用语义色',
      code: `// 推荐：使用语义色而非硬编码
Surface(color = MaterialTheme.colorScheme.primaryContainer) {
    Text(
        text = "容器内文字",
        color = MaterialTheme.colorScheme.onPrimaryContainer
    )
}`,
    },
  ],
}
