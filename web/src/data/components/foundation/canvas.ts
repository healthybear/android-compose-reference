import type { ComponentEntry } from '../../types'

export const canvasComponent: ComponentEntry = {
  id: 'canvas',
  name: 'Canvas',
  category: 'Foundation',
  description: '提供 DrawScope 进行自定义 2D 绘制，对应 View 系统的 onDraw()。',
  tags: ['canvas', 'draw', 'custom', 'paint', '2d'],
  params: [
    { name: 'modifier', type: 'Modifier', required: true, description: '必须通过 Modifier 指定尺寸' },
    { name: 'onDraw', type: 'DrawScope.() -> Unit', required: true, description: '绘制回调，在 DrawScope 中调用绘制 API' },
  ],
  examples: [
    {
      title: '绘制圆形和矩形',
      code: `Canvas(modifier = Modifier.size(200.dp)) {
    drawCircle(
        color = Color.Blue,
        radius = size.minDimension / 2
    )
    drawRect(
        color = Color.Red.copy(alpha = 0.5f),
        size = Size(100.dp.toPx(), 60.dp.toPx())
    )
}`,
    },
    {
      title: '绘制折线图',
      code: `Canvas(modifier = Modifier.fillMaxWidth().height(120.dp)) {
    val points = listOf(0f, 40f, 20f, 80f, 60f, 100f)
    val path = Path()
    points.forEachIndexed { i, y ->
        val x = i * (size.width / (points.size - 1))
        if (i == 0) path.moveTo(x, size.height - y.dp.toPx())
        else path.lineTo(x, size.height - y.dp.toPx())
    }
    drawPath(path, color = Color.Green, style = Stroke(width = 3.dp.toPx()))
}`,
    },
  ],
}
