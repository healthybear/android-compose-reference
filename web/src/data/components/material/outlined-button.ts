import type { ComponentEntry } from '../../types'

export const outlinedButtonComponent: ComponentEntry = {
  id: 'outlined-button',
  name: 'OutlinedButton',
  category: 'Material',
  description: '带边框的次要操作按钮，适合与主按钮并列使用的取消/次要操作。',
  tags: ['button', 'outlined', 'secondary', 'border', '按钮'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互' },
    { name: 'shape', type: 'Shape', default: 'ButtonDefaults.outlinedShape', description: '按钮形状' },
    { name: 'colors', type: 'ButtonColors', default: 'ButtonDefaults.outlinedButtonColors()', description: '颜色配置' },
    { name: 'border', type: 'BorderStroke?', default: 'ButtonDefaults.outlinedButtonBorder', description: '边框样式' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'ButtonDefaults.ContentPadding', description: '内容内边距' },
    { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '按钮内容插槽' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `OutlinedButton(onClick = { /* 取消 */ }) {
    Text("取消")
}`,
    },
    {
      title: '与主按钮并列',
      code: `Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    OutlinedButton(onClick = { /* 取消 */ }) {
        Text("取消")
    }
    Button(onClick = { /* 确认 */ }) {
        Text("确认")
    }
}`,
    },
  ],
}
