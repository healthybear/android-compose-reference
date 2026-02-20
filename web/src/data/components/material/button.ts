import type { ComponentEntry } from '../../types'

export const buttonComponent: ComponentEntry = {
  id: 'button',
  name: 'Button',
  category: 'Material',
  description: 'Material Design 按钮，响应点击事件，支持启用/禁用状态。',
  tags: ['button', 'click', 'material', 'interaction', 'action'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击时的回调' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用按钮' },
    { name: 'colors', type: 'ButtonColors', default: 'ButtonDefaults.buttonColors()', description: '按钮颜色配置' },
    { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '按钮内容插槽' },
  ],
  examples: [
    {
      title: '基础按钮',
      code: `Button(onClick = { /* 处理点击 */ }) {
    Text("点击我")
}`,
    },
    {
      title: '禁用状态',
      code: `Button(
    onClick = {},
    enabled = false
) {
    Text("不可用")
}`,
    },
    {
      title: '带图标的按钮',
      code: `Button(onClick = { /* 处理点击 */ }) {
    Icon(Icons.Default.Add, contentDescription = null)
    Spacer(Modifier.width(8.dp))
    Text("添加")
}`,
    },
  ],
  demoId: 'button',
}
