import type { ComponentEntry } from '../../types'

export const spacerComponent: ComponentEntry = {
  id: 'spacer',
  name: 'Spacer',
  category: 'Layout',
  description: '占位用的空白组件，通过 Modifier 指定尺寸，常用于 Row/Column 中添加间距。',
  tags: ['spacer', 'layout', 'gap', 'space', 'padding'],
  params: [
    { name: 'modifier', type: 'Modifier', required: true, description: '通过 Modifier.width/height/weight 指定占位尺寸' },
  ],
  examples: [
    {
      title: '固定间距',
      code: `Row {
    Text("左")
    Spacer(modifier = Modifier.width(16.dp))
    Text("右")
}`,
    },
    {
      title: '弹性填充（推到两端）',
      code: `Row(modifier = Modifier.fillMaxWidth()) {
    Text("左侧")
    Spacer(modifier = Modifier.weight(1f))
    Text("右侧")
}`,
    },
  ],
}
