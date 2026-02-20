import type { ComponentEntry } from '../../types'

export const transformableComponent: ComponentEntry = {
  id: 'modifier-transformable',
  name: 'Modifier.transformable',
  category: 'Gestures',
  description: '同时处理缩放、旋转、平移三种多点触控手势，适合图片查看器、地图等需要自由变换的场景。',
  tags: ['gesture', 'transform', 'scale', 'rotate', '多点触控'],
  params: [
    { name: 'state', type: 'TransformableState', required: true, description: '变换状态，由 rememberTransformableState 创建' },
    { name: 'lockRotationOnZoomPan', type: 'Boolean', default: 'false', description: '缩放/平移时是否锁定旋转' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用手势' },
  ],
  examples: [
    {
      title: '图片缩放旋转',
      code: `var scale by remember { mutableFloatStateOf(1f) }
var rotation by remember { mutableFloatStateOf(0f) }
var offset by remember { mutableStateOf(Offset.Zero) }

val state = rememberTransformableState { zoomChange, offsetChange, rotationChange ->
    scale = (scale * zoomChange).coerceIn(0.5f, 5f)
    rotation += rotationChange
    offset += offsetChange
}

Image(
    painter = painterResource(R.drawable.photo),
    contentDescription = null,
    modifier = Modifier
        .graphicsLayer(
            scaleX = scale,
            scaleY = scale,
            rotationZ = rotation,
            translationX = offset.x,
            translationY = offset.y
        )
        .transformable(state = state)
        .fillMaxSize()
)`,
    },
    {
      title: '仅缩放（锁定旋转）',
      code: `var scale by remember { mutableFloatStateOf(1f) }

val state = rememberTransformableState { zoomChange, _, _ ->
    scale = (scale * zoomChange).coerceIn(1f, 4f)
}

Box(
    modifier = Modifier
        .graphicsLayer(scaleX = scale, scaleY = scale)
        .transformable(state = state, lockRotationOnZoomPan = true)
        .fillMaxSize()
) {
    // 内容
}`,
    },
  ],
}
