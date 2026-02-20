import type { ComponentEntry } from '../../types'

export const textButtonComponent: ComponentEntry = {
  id: 'text-button',
  name: 'TextButton',
  category: 'Material',
  description: '无背景无边框的文字按钮，用于低强调操作，如对话框内的操作或内联操作。',
  tags: ['button', 'text', 'flat', 'low-emphasis', '按钮'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互' },
    { name: 'shape', type: 'Shape', default: 'ButtonDefaults.textShape', description: '按钮形状' },
    { name: 'colors', type: 'ButtonColors', default: 'ButtonDefaults.textButtonColors()', description: '颜色配置' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'ButtonDefaults.TextButtonContentPadding', description: '内容内边距' },
    { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '按钮内容插槽' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `TextButton(onClick = { /* 了解更多 */ }) {
    Text("了解更多")
}`,
    },
    {
      title: '对话框内操作',
      code: `AlertDialog(
    onDismissRequest = { showDialog = false },
    title = { Text("确认删除？") },
    text = { Text("此操作不可撤销。") },
    confirmButton = {
        TextButton(onClick = { /* 删除 */ }) { Text("删除") }
    },
    dismissButton = {
        TextButton(onClick = { showDialog = false }) { Text("取消") }
    }
)`,
    },
  ],
}
