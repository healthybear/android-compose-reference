import type { ComponentEntry } from '../../types'

export const typographyComponent: ComponentEntry = {
  id: 'typography',
  name: 'Typography',
  category: 'Theme',
  description: 'Material3 字体排版规范，定义 displayLarge 到 labelSmall 共 15 个文字样式。',
  tags: ['typography', 'textstyle', 'font', 'theme', 'material3', 'type-scale'],
  params: [
    { name: 'displayLarge/Medium/Small', type: 'TextStyle', description: '展示级大标题，用于醒目数字/标题' },
    { name: 'headlineLarge/Medium/Small', type: 'TextStyle', description: '页面标题级别' },
    { name: 'titleLarge/Medium/Small', type: 'TextStyle', description: '组件标题，如 TopAppBar' },
    { name: 'bodyLarge/Medium/Small', type: 'TextStyle', description: '正文内容' },
    { name: 'labelLarge/Medium/Small', type: 'TextStyle', description: '标签、按钮文字' },
  ],
  examples: [
    {
      title: '使用内置样式',
      code: `Column {
    Text("展示标题", style = MaterialTheme.typography.displaySmall)
    Text("页面标题", style = MaterialTheme.typography.headlineMedium)
    Text("正文内容", style = MaterialTheme.typography.bodyLarge)
    Text("标签文字", style = MaterialTheme.typography.labelMedium)
}`,
    },
    {
      title: '自定义字体',
      code: `val AppTypography = Typography(
    titleLarge = TextStyle(
        fontFamily = FontFamily(Font(R.font.roboto_medium)),
        fontWeight = FontWeight.Medium,
        fontSize = 22.sp,
        lineHeight = 28.sp
    )
)

MaterialTheme(typography = AppTypography) { /* ... */ }`,
    },
  ],
}
