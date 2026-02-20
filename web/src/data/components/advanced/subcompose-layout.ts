import type { ComponentEntry } from '../../types'

export const subcomposeLayoutComponent: ComponentEntry = {
  id: 'subcompose-layout',
  name: 'SubcomposeLayout',
  category: 'Advanced',
  description: '允许在测量阶段动态组合子内容，可根据父组件约束条件决定渲染哪些子组件，BoxWithConstraints 内部即使用此 API。',
  tags: ['layout', 'subcompose', 'dynamic', 'measure', '动态布局'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'state', type: 'SubcomposeLayoutState?', default: 'null', description: '可选状态，用于复用 slot' },
    { name: 'measurePolicy', type: 'SubcomposeMeasureScope.(Constraints) -> MeasureResult', required: true, description: '测量策略，可在此调用 subcompose() 动态创建子组件' },
  ],
  examples: [
    {
      title: '根据可用宽度决定布局',
      code: `SubcomposeLayout { constraints ->
    // 先测量内容，获取其尺寸
    val contentPlaceables = subcompose("content") {
        Text("主要内容")
    }.map { it.measure(constraints) }

    val contentWidth = contentPlaceables.maxOf { it.width }

    // 根据剩余空间决定是否显示侧边栏
    val sidebarPlaceables = if (constraints.maxWidth - contentWidth > 200) {
        subcompose("sidebar") {
            SidebarContent()
        }.map { it.measure(Constraints.fixedWidth(200)) }
    } else emptyList()

    layout(constraints.maxWidth, constraints.maxHeight) {
        contentPlaceables.forEach { it.placeRelative(0, 0) }
        sidebarPlaceables.forEach { it.placeRelative(contentWidth, 0) }
    }
}`,
    },
    {
      title: '实现自适应文字截断',
      code: `SubcomposeLayout { constraints ->
    // 先尝试完整内容
    val fullContent = subcompose("full") { Text(fullText) }
        .map { it.measure(constraints) }

    if (fullContent.first().height <= maxHeight) {
        // 内容放得下，直接显示
        layout(constraints.maxWidth, fullContent.first().height) {
            fullContent.forEach { it.placeRelative(0, 0) }
        }
    } else {
        // 放不下，显示截断版本
        val truncated = subcompose("truncated") { Text(truncatedText) }
            .map { it.measure(constraints) }
        layout(constraints.maxWidth, truncated.first().height) {
            truncated.forEach { it.placeRelative(0, 0) }
        }
    }
}`,
    },
  ],
}
