import type { ComponentEntry } from '../../types'

export const boxWithConstraintsComponent: ComponentEntry = {
  id: 'box-with-constraints',
  name: 'BoxWithConstraints',
  category: 'Layout',
  description: '可在内容中读取父容器约束（maxWidth/maxHeight）的 Box，适合响应式布局。',
  tags: ['boxwithconstraints', 'layout', 'constraints', 'responsive', 'adaptive'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'contentAlignment', type: 'Alignment', default: 'Alignment.TopStart', description: '子元素默认对齐方式' },
    { name: 'content', type: '@Composable BoxWithConstraintsScope.() -> Unit', required: true, description: '可访问 maxWidth/maxHeight/constraints 的内容插槽' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `BoxWithConstraints {
    if (maxWidth < 600.dp) {
        Text("手机布局")
    } else {
        Text("平板布局")
    }
}`,
    },
    {
      title: '按比例分配宽度',
      code: `BoxWithConstraints(modifier = Modifier.fillMaxWidth()) {
    val itemWidth = maxWidth / 3
    Row {
        repeat(3) {
            Box(modifier = Modifier.width(itemWidth)) {
                Text("列 $it")
            }
        }
    }
}`,
    },
  ],
}
