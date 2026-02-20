import type { ComponentEntry } from '../../types'

export const boxComponent: ComponentEntry = {
  id: 'box',
  name: 'Box',
  category: 'Layout',
  description: '将子元素叠加放置的布局容器，类似 FrameLayout。',
  tags: ['box', 'layout', 'stack', 'overlay', 'frame'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'contentAlignment', type: 'Alignment', default: 'Alignment.TopStart', description: '子元素默认对齐方式' },
    { name: 'content', type: '@Composable BoxScope.() -> Unit', required: true, description: '子元素内容' },
  ],
  examples: [
    {
      title: '叠加布局',
      code: `Box(
    modifier = Modifier.size(100.dp),
    contentAlignment = Alignment.Center
) {
    // 背景
    Box(modifier = Modifier.fillMaxSize().background(Color.Blue))
    // 前景文字
    Text("居中", color = Color.White)
}`,
    },
  ],
}
