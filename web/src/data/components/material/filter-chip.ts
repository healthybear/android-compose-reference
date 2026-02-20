import type { ComponentEntry } from '../../types'

export const filterChipComponent: ComponentEntry = {
  id: 'filter-chip',
  name: 'FilterChip',
  category: 'Material',
  description: '过滤 Chip，带选中状态，用于从一组选项中筛选内容，选中时显示勾选图标。',
  tags: ['chip', 'filter', 'selectable', 'toggle', '过滤'],
  params: [
    { name: 'selected', type: 'Boolean', required: true, description: '是否选中' },
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调，用于切换选中状态' },
    { name: 'label', type: '@Composable () -> Unit', required: true, description: '标签文字' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互' },
    { name: 'leadingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '前置图标，selected=true 时通常显示勾选图标' },
    { name: 'trailingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '后置图标' },
    { name: 'colors', type: 'SelectableChipColors', default: 'FilterChipDefaults.filterChipColors()', description: '颜色配置' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var selected by remember { mutableStateOf(false) }

FilterChip(
    selected = selected,
    onClick = { selected = !selected },
    label = { Text("免费") },
    leadingIcon = if (selected) {
        { Icon(Icons.Default.Done, contentDescription = null, modifier = Modifier.size(FilterChipDefaults.IconSize)) }
    } else null
)`,
    },
    {
      title: '多选过滤组',
      code: `val filters = listOf("全部", "免费", "付费", "新品")
var selectedFilter by remember { mutableStateOf("全部") }

Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    filters.forEach { filter ->
        FilterChip(
            selected = selectedFilter == filter,
            onClick = { selectedFilter = filter },
            label = { Text(filter) }
        )
    }
}`,
    },
  ],
}
