import type { ComponentEntry } from '../../types'

export const fabComponent: ComponentEntry = {
  id: 'floating-action-button',
  name: 'FloatingActionButton',
  category: 'Material',
  description: '悬浮操作按钮，代表页面的主要操作，通常放置在 Scaffold 的 floatingActionButton 插槽中。',
  tags: ['fab', 'floating', 'action', 'button', '悬浮按钮'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'shape', type: 'Shape', default: 'FloatingActionButtonDefaults.shape', description: '形状，默认大圆角' },
    { name: 'containerColor', type: 'Color', default: 'FloatingActionButtonDefaults.containerColor', description: '背景色' },
    { name: 'elevation', type: 'FloatingActionButtonElevation', default: 'FloatingActionButtonDefaults.elevation()', description: '阴影配置' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '内容，通常为 Icon' },
  ],
  examples: [
    {
      title: '基础用法（配合 Scaffold）',
      code: `Scaffold(
    floatingActionButton = {
        FloatingActionButton(onClick = { /* 新建 */ }) {
            Icon(Icons.Default.Add, contentDescription = "新建")
        }
    }
) { paddingValues ->
    // 页面内容
}`,
    },
    {
      title: '尺寸变体',
      code: `// 小号
SmallFloatingActionButton(onClick = {}) {
    Icon(Icons.Default.Add, contentDescription = null)
}

// 大号
LargeFloatingActionButton(onClick = {}) {
    Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(36.dp))
}`,
    },
  ],
}
