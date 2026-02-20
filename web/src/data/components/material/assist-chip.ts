import type { ComponentEntry } from '../../types'

export const assistChipComponent: ComponentEntry = {
  id: 'assist-chip',
  name: 'AssistChip',
  category: 'Material',
  description: '辅助操作 Chip，用于触发与当前内容相关的辅助动作，如"添加到日历"、"分享"等。',
  tags: ['chip', 'assist', 'action', 'tag', '标签'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'label', type: '@Composable () -> Unit', required: true, description: '标签文字' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互' },
    { name: 'leadingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '前置图标' },
    { name: 'trailingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '后置图标' },
    { name: 'shape', type: 'Shape', default: 'AssistChipDefaults.shape', description: '形状' },
    { name: 'colors', type: 'ChipColors', default: 'AssistChipDefaults.assistChipColors()', description: '颜色配置' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `AssistChip(
    onClick = { /* 添加到日历 */ },
    label = { Text("添加到日历") },
    leadingIcon = {
        Icon(Icons.Default.DateRange, contentDescription = null, modifier = Modifier.size(AssistChipDefaults.IconSize))
    }
)`,
    },
    {
      title: 'Chip 组合',
      code: `Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    AssistChip(onClick = {}, label = { Text("分享") })
    AssistChip(onClick = {}, label = { Text("收藏") })
    AssistChip(onClick = {}, label = { Text("举报") })
}`,
    },
  ],
}
