import type { ComponentEntry } from '../../types'

export const elevatedButtonComponent: ComponentEntry = {
  id: 'elevated-button',
  name: 'ElevatedButton',
  category: 'Material',
  description: '带阴影的低强调按钮，用于需要与背景区分但不需要强调的操作。',
  tags: ['button', 'elevated', 'shadow', 'low-emphasis', '按钮'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互' },
    { name: 'shape', type: 'Shape', default: 'ButtonDefaults.elevatedShape', description: '按钮形状' },
    { name: 'colors', type: 'ButtonColors', default: 'ButtonDefaults.elevatedButtonColors()', description: '颜色配置' },
    { name: 'elevation', type: 'ButtonElevation?', default: 'ButtonDefaults.elevatedButtonElevation()', description: '阴影高度配置' },
    { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '按钮内容插槽' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `ElevatedButton(onClick = { /* 操作 */ }) {
    Text("操作")
}`,
    },
    {
      title: '禁用状态',
      code: `ElevatedButton(
    onClick = {},
    enabled = false
) {
    Text("不可用")
}`,
    },
  ],
}
