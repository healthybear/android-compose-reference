import type { ComponentEntry } from '../../types'

export const modifierPaddingComponent: ComponentEntry = {
  id: 'modifier-padding',
  name: 'Modifier.padding',
  category: 'Modifier',
  description: '为组件添加内边距，支持四边统一、水平/垂直、或各边单独设置。',
  tags: ['modifier', 'padding', 'margin', 'spacing', 'inset'],
  params: [
    { name: 'all', type: 'Dp', description: '四边统一内边距' },
    { name: 'horizontal / vertical', type: 'Dp', description: '水平或垂直方向内边距' },
    { name: 'start / top / end / bottom', type: 'Dp', description: '各边单独设置' },
    { name: 'paddingValues', type: 'PaddingValues', description: '传入 PaddingValues 对象' },
  ],
  examples: [
    {
      title: '常用写法',
      code: `// 四边 16dp
Text("A", modifier = Modifier.padding(16.dp))

// 水平 16dp，垂直 8dp
Text("B", modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp))

// 各边单独
Text("C", modifier = Modifier.padding(start = 16.dp, top = 8.dp))`,
    },
  ],
}
