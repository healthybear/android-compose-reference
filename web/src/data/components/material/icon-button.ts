import type { ComponentEntry } from '../../types'

export const iconButtonComponent: ComponentEntry = {
  id: 'icon-button',
  name: 'IconButton',
  category: 'Material',
  description: '仅包含图标的可点击按钮，常用于工具栏操作、AppBar 动作等场景。',
  tags: ['button', 'icon', 'toolbar', 'action', '图标按钮'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互' },
    { name: 'colors', type: 'IconButtonColors', default: 'IconButtonDefaults.iconButtonColors()', description: '颜色配置' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '图标内容，通常为 Icon' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `IconButton(onClick = { /* 搜索 */ }) {
    Icon(Icons.Default.Search, contentDescription = "搜索")
}`,
    },
    {
      title: 'FilledIconButton / OutlinedIconButton 变体',
      code: `// 填充样式
FilledIconButton(onClick = { /* 添加 */ }) {
    Icon(Icons.Default.Add, contentDescription = "添加")
}

// 描边样式
OutlinedIconButton(onClick = { /* 编辑 */ }) {
    Icon(Icons.Default.Edit, contentDescription = "编辑")
}`,
    },
  ],
}
