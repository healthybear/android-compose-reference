import type { ComponentEntry } from '../../types'

export const customLayoutComponent: ComponentEntry = {
  id: 'custom-layout',
  name: 'Layout（自定义布局）',
  category: 'Advanced',
  description: '完全自定义测量和放置逻辑的布局组件，通过 MeasurePolicy 控制子组件的尺寸和位置。',
  tags: ['layout', 'custom', 'measure', 'place', '自定义布局'],
  params: [
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '子组件内容' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'measurePolicy', type: 'MeasurePolicy', required: true, description: '测量策略，定义如何测量和放置子组件' },
  ],
  examples: [
    {
      title: '垂直居中布局',
      code: `@Composable
fun CenteredColumn(
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit
) {
    Layout(content = content, modifier = modifier) { measurables, constraints ->
        // 1. 测量所有子组件
        val placeables = measurables.map { it.measure(constraints) }

        // 2. 确定自身尺寸
        val width = constraints.maxWidth
        val height = placeables.sumOf { it.height }

        layout(width, height) {
            // 3. 放置子组件
            var yOffset = 0
            placeables.forEach { placeable ->
                val xOffset = (width - placeable.width) / 2  // 水平居中
                placeable.placeRelative(xOffset, yOffset)
                yOffset += placeable.height
            }
        }
    }
}`,
    },
    {
      title: '使用 layout Modifier 微调',
      code: `// 对单个组件使用 layout modifier 调整测量/放置
Text(
    "偏移文字",
    modifier = Modifier.layout { measurable, constraints ->
        val placeable = measurable.measure(constraints)
        // 报告比实际更小的高度（让后续组件上移）
        layout(placeable.width, placeable.height / 2) {
            placeable.placeRelative(0, 0)
        }
    }
)`,
    },
  ],
}
