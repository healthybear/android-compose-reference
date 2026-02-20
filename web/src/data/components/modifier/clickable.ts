import type { ComponentEntry } from '../../types'

export const modifierClickableComponent: ComponentEntry = {
  id: 'modifier-clickable',
  name: 'Modifier.clickable / combinedClickable',
  category: 'Modifier',
  description: '为任意组件添加点击交互，支持单击、长按、双击。',
  tags: ['modifier', 'clickable', 'click', 'tap', 'gesture', 'interaction'],
  params: [
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用点击' },
    { name: 'onClickLabel', type: 'String?', default: 'null', description: '无障碍点击描述' },
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'onLongClick', type: '(() -> Unit)?', default: 'null', description: '长按回调（combinedClickable）' },
    { name: 'onDoubleClick', type: '(() -> Unit)?', default: 'null', description: '双击回调（combinedClickable）' },
  ],
  examples: [
    {
      title: '基础点击',
      code: `Box(
    modifier = Modifier
        .clickable { /* 处理点击 */ }
        .padding(16.dp)
) {
    Text("点击我")
}`,
    },
    {
      title: '长按 + 双击',
      code: `Box(
    modifier = Modifier.combinedClickable(
        onClick = { /* 单击 */ },
        onLongClick = { /* 长按 */ },
        onDoubleClick = { /* 双击 */ }
    ).padding(16.dp)
) {
    Text("多种手势")
}`,
    },
  ],
}
