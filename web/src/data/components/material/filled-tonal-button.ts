import type { ComponentEntry } from '../../types'

export const filledTonalButtonComponent: ComponentEntry = {
  id: 'filled-tonal-button',
  name: 'FilledTonalButton',
  category: 'Material',
  description: '使用次要容器色填充的按钮，强调程度介于 Button 和 OutlinedButton 之间。',
  tags: ['button', 'tonal', 'secondary', 'filled', '按钮'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互' },
    { name: 'shape', type: 'Shape', default: 'ButtonDefaults.filledTonalShape', description: '按钮形状' },
    { name: 'colors', type: 'ButtonColors', default: 'ButtonDefaults.filledTonalButtonColors()', description: '颜色配置' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'ButtonDefaults.ContentPadding', description: '内容内边距' },
    { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '按钮内容插槽' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `FilledTonalButton(onClick = { /* 保存草稿 */ }) {
    Text("保存草稿")
}`,
    },
    {
      title: '带图标',
      code: `FilledTonalButton(onClick = { /* 分享 */ }) {
    Icon(
        Icons.Default.Share,
        contentDescription = null,
        modifier = Modifier.size(ButtonDefaults.IconSize)
    )
    Spacer(Modifier.size(ButtonDefaults.IconSpacing))
    Text("分享")
}`,
    },
  ],
}
