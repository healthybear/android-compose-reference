import type { ComponentEntry } from '../../types'

export const modifierOffsetComponent: ComponentEntry = {
  id: 'modifier-offset',
  name: 'Modifier.offset / graphicsLayer',
  category: 'Modifier',
  description: 'offset 偏移组件位置；graphicsLayer 在绘制层做变换（缩放、旋转、透明度），不影响布局。',
  tags: ['modifier', 'offset', 'graphicslayer', 'transform', 'translate', 'rotate', 'scale'],
  params: [
    { name: 'offset(x, y)', type: 'Modifier', description: '偏移组件，影响布局' },
    { name: 'graphicsLayer { scaleX/Y }', type: 'Modifier', description: '缩放，不影响布局' },
    { name: 'graphicsLayer { rotationZ }', type: 'Modifier', description: '旋转角度（度）' },
    { name: 'graphicsLayer { alpha }', type: 'Modifier', description: '透明度 0f-1f' },
    { name: 'graphicsLayer { translationX/Y }', type: 'Modifier', description: '平移，不影响布局' },
  ],
  examples: [
    {
      title: 'graphicsLayer 变换',
      code: `Box(
    modifier = Modifier
        .size(100.dp)
        .graphicsLayer {
            scaleX = 1.2f
            scaleY = 1.2f
            rotationZ = 45f
            alpha = 0.8f
        }
        .background(Color.Blue)
)`,
    },
  ],
}
