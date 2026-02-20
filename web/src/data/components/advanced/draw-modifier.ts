import type { ComponentEntry } from '../../types'

export const drawModifierComponent: ComponentEntry = {
  id: 'draw-modifier',
  name: 'drawBehind / drawWithContent',
  category: 'Advanced',
  description: 'drawBehind 在组件背后绘制自定义图形；drawWithContent 可在组件内容前后插入绘制，两者都使用 Canvas DrawScope API。',
  tags: ['draw', 'canvas', 'custom', 'graphics', '自定义绘制'],
  params: [
    { name: 'onDraw', type: 'DrawScope.() -> Unit', required: true, description: '绘制块，在 DrawScope 中调用 drawCircle、drawRect 等绘制函数' },
  ],
  examples: [
    {
      title: 'drawBehind 绘制背景装饰',
      code: `// 在文字后面画一个圆形高亮背景
Text(
    text = "3",
    color = Color.White,
    modifier = Modifier
        .padding(8.dp)
        .drawBehind {
            drawCircle(
                color = Color.Red,
                radius = size.minDimension / 2
            )
        }
)

// 绘制自定义下划线
Text(
    text = "带下划线",
    modifier = Modifier.drawBehind {
        val strokeWidth = 2.dp.toPx()
        val y = size.height - strokeWidth / 2
        drawLine(
            color = Color.Blue,
            start = Offset(0f, y),
            end = Offset(size.width, y),
            strokeWidth = strokeWidth
        )
    }
)`,
    },
    {
      title: 'drawWithContent 叠加效果',
      code: `// 在内容上叠加渐变遮罩（实现文字淡出效果）
LazyColumn(
    modifier = Modifier
        .fillMaxSize()
        .drawWithContent {
            drawContent()  // 先绘制原始内容
            // 再叠加底部渐变遮罩
            drawRect(
                brush = Brush.verticalGradient(
                    colors = listOf(Color.Transparent, Color.White),
                    startY = size.height * 0.7f,
                    endY = size.height
                )
            )
        }
) { /* 列表内容 */ }`,
    },
  ],
}
