import type { ComponentEntry } from '../../types'

export const suggestionChipComponent: ComponentEntry = {
  id: 'suggestion-chip',
  name: 'SuggestionChip',
  category: 'Material',
  description: '建议 Chip，展示系统或 AI 生成的建议内容，供用户快速选择，不带选中状态。',
  tags: ['chip', 'suggestion', 'recommendation', 'ai', '建议'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'label', type: '@Composable () -> Unit', required: true, description: '建议文字' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互' },
    { name: 'icon', type: '@Composable (() -> Unit)?', default: 'null', description: '前置图标' },
    { name: 'shape', type: 'Shape', default: 'SuggestionChipDefaults.shape', description: '形状' },
    { name: 'colors', type: 'ChipColors', default: 'SuggestionChipDefaults.suggestionChipColors()', description: '颜色配置' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `SuggestionChip(
    onClick = { /* 应用建议 */ },
    label = { Text("明天上午 10:00") }
)`,
    },
    {
      title: '搜索建议列表',
      code: `val suggestions = listOf("Jetpack Compose", "Compose Multiplatform", "Compose Animation")

LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    items(suggestions) { suggestion ->
        SuggestionChip(
            onClick = { searchQuery = suggestion },
            label = { Text(suggestion) }
        )
    }
}`,
    },
  ],
}
