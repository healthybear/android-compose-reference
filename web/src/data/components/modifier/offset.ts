import type { ComponentEntry } from '../../types'

export const modifierOffsetComponent: ComponentEntry = {
  id: 'modifier-offset',
  demo: { id: 'modifier-offset', sourceFile: 'ModifierOffsetDemo.kt' },
  name: 'Modifier.offset',
  category: 'Modifier',
  description: 'Modifier.offset 用于偏移组件位置，影响布局测量。graphicsLayer 在绘制层做变换（平移、缩放、旋转、透明度），不影响布局，性能更好。',
  tags: ['modifier', 'offset', 'graphicslayer', 'transform', 'translate', 'rotate', 'scale'],
  params: [
    { name: 'offset(x, y)', type: 'Modifier', description: '静态偏移，x 和 y 为 Dp 值，影响布局测量' },
    { name: 'offset(lambda)', type: 'Modifier', description: '动态偏移，返回 IntOffset，每次重组重新计算' },
    { name: 'absoluteOffset(x, y)', type: 'Modifier', description: '绝对偏移，不受 RTL 影响' },
    { name: 'graphicsLayer { translationX/Y }', type: 'Modifier', description: '平移（像素），不影响布局，性能更好' },
    { name: 'graphicsLayer { scaleX/Y }', type: 'Modifier', description: '缩放倍数，围绕中心缩放' },
    { name: 'graphicsLayer { rotationZ }', type: 'Modifier', description: '平面旋转角度（度）' },
    { name: 'graphicsLayer { rotationX/Y }', type: 'Modifier', description: '3D 旋转（X 轴/Y 轴）' },
    { name: 'graphicsLayer { alpha }', type: 'Modifier', description: '透明度 0f-1f' },
    { name: 'graphicsLayer { transformOrigin }', type: 'Modifier', description: '变换原点（默认 Center）' },
  ],
  examples: [
    {
      title: '基础 offset 偏移',
      code: `Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    // 正常位置
    Box(
        modifier = Modifier
            .size(50.dp)
            .background(Color.Blue)
    )

    // 向右下偏移
    Box(
        modifier = Modifier
            .size(50.dp)
            .offset(x = 20.dp, y = 10.dp)
            .background(Color.Red)
    )

    // 向左上偏移（负值）
    Box(
        modifier = Modifier
            .size(50.dp)
            .offset(x = (-10).dp, y = (-5).dp)
            .background(Color.Green)
    )
}`,
    },
    {
      title: '动态 offset',
      code: `var offsetX by remember { mutableStateOf(0f) }

Column {
    Box(
        modifier = Modifier
            .size(50.dp)
            .offset { IntOffset(offsetX.roundToInt(), 0) }
            .background(Color.Blue)
    )

    Slider(
        value = offsetX,
        onValueChange = { offsetX = it },
        valueRange = -200f..200f
    )
}`,
    },
    {
      title: 'graphicsLayer 变换',
      code: `Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
    // 缩放
    Box(
        modifier = Modifier
            .size(50.dp)
            .graphicsLayer {
                scaleX = 1.5f
                scaleY = 1.5f
            }
            .background(Color.Blue)
    )

    // 旋转
    Box(
        modifier = Modifier
            .size(50.dp)
            .graphicsLayer {
                rotationZ = 45f
            }
            .background(Color.Red)
    )

    // 透明度
    Box(
        modifier = Modifier
            .size(50.dp)
            .graphicsLayer {
                alpha = 0.5f
            }
            .background(Color.Green)
    )
}`,
    },
    {
      title: '组合变换',
      code: `var rotation by remember { mutableFloatStateOf(0f) }

LaunchedEffect(Unit) {
    while (true) {
        rotation = (rotation + 1f) % 360f
        delay(16)
    }
}

Box(
    modifier = Modifier
        .size(100.dp)
        .graphicsLayer {
            rotationZ = rotation
            scaleX = 1f + (rotation / 360f) * 0.5f
            scaleY = 1f + (rotation / 360f) * 0.5f
            alpha = 0.5f + (rotation / 360f) * 0.5f
        }
        .background(Color.Blue)
)`,
    },
    {
      title: '变换原点',
      code: `Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
    // 围绕中心旋转（默认）
    Box(
        modifier = Modifier
            .size(60.dp)
            .graphicsLayer {
                rotationZ = 45f
                transformOrigin = TransformOrigin.Center
            }
            .background(Color.Blue)
    )

    // 围绕左上角旋转
    Box(
        modifier = Modifier
            .size(60.dp)
            .graphicsLayer {
                rotationZ = 45f
                transformOrigin = TransformOrigin(0f, 0f)
            }
            .background(Color.Red)
    )

    // 围绕右下角旋转
    Box(
        modifier = Modifier
            .size(60.dp)
            .graphicsLayer {
                rotationZ = 45f
                transformOrigin = TransformOrigin(1f, 1f)
            }
            .background(Color.Green)
    )
}`,
    },
    {
      title: '3D 旋转效果',
      code: `var rotationY by remember { mutableFloatStateOf(0f) }

Column(horizontalAlignment = Alignment.CenterHorizontally) {
    Card(
        modifier = Modifier
            .width(200.dp)
            .height(300.dp)
            .graphicsLayer {
                rotationY = rotationY
                cameraDistance = 12f * density
            }
    ) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text("3D 卡片", style = MaterialTheme.typography.headlineMedium)
        }
    }

    Slider(
        value = rotationY,
        onValueChange = { rotationY = it },
        valueRange = -180f..180f
    )
}`,
    },
  ],

  useCases: [
    {
      title: '拖拽偏移',
      description: '使用 offset 实现可拖拽的组件',
      code: `@Composable
fun DraggableBox() {
    var offsetX by remember { mutableFloatStateOf(0f) }
    var offsetY by remember { mutableFloatStateOf(0f) }

    Box(
        modifier = Modifier
            .offset { IntOffset(offsetX.roundToInt(), offsetY.roundToInt()) }
            .size(100.dp)
            .background(Color.Blue)
            .pointerInput(Unit) {
                detectDragGestures { change, dragAmount ->
                    change.consume()
                    offsetX += dragAmount.x
                    offsetY += dragAmount.y
                }
            }
    )
}`
    },
    {
      title: '按钮按下动画',
      description: '使用 graphicsLayer 实现按下缩放效果',
      code: `@Composable
fun ScaleButton(
    text: String,
    onClick: () -> Unit
) {
    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()

    val scale by animateFloatAsState(
        targetValue = if (isPressed) 0.95f else 1f,
        label = "scale"
    )

    Button(
        onClick = onClick,
        interactionSource = interactionSource,
        modifier = Modifier.graphicsLayer {
            scaleX = scale
            scaleY = scale
        }
    ) {
        Text(text)
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 graphicsLayer 而非 offset 做动画',
      description: 'graphicsLayer 不触发重新布局，性能更好',
      goodExample: `// 性能好：graphicsLayer 不重新布局
Box(
    modifier = Modifier
        .graphicsLayer {
            translationX = animatedOffset
        }
        .background(Color.Blue)
)`,
      badExample: `// 性能差：offset 每次都重新布局
Box(
    modifier = Modifier
        .offset { IntOffset(animatedOffset.roundToInt(), 0) }
        .background(Color.Blue)
)`
    },
    {
      title: 'offset 使用 offset { } lambda 而非直接 offset()',
      description: '避免不必要的重组',
      goodExample: `var offsetX by remember { mutableStateOf(0f) }
Box(
    modifier = Modifier.offset { IntOffset(offsetX.roundToInt(), 0) }
)`,
      badExample: `var offsetX by remember { mutableStateOf(0f) }
Box(
    modifier = Modifier.offset(x = offsetX.dp, y = 0.dp)
    // 每次 offsetX 变化都会重新创建 Modifier
)`
    },
    {
      title: '注意 offset 影响布局',
      description: 'offset 会改变组件的实际位置，可能遮挡其他元素',
      goodExample: `// 使用 graphicsLayer 做视觉偏移
Box(
    modifier = Modifier.graphicsLayer {
        translationX = 100f
    }
)`,
    },
    {
      title: '使用 transformOrigin 控制变换中心',
      description: '缩放和旋转应明确指定原点',
      goodExample: `Box(
    modifier = Modifier.graphicsLayer {
        scaleX = 2f
        transformOrigin = TransformOrigin(0f, 0f)  // 从左上角缩放
    }
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'offset vs graphicsLayer.translation',
      content: 'offset 使用 Dp 且影响布局；graphicsLayer.translation 使用像素且不影响布局。动画场景优先使用 graphicsLayer'
    },
    {
      type: 'warning',
      title: 'offset 可能导致内容被裁剪',
      content: 'offset 偏移后的内容可能超出父容器边界被裁剪。如需突破边界，父容器使用 Modifier.clipToBounds(false)'
    },
    {
      type: 'info',
      title: 'graphicsLayer 支持硬件加速',
      content: 'graphicsLayer 的变换在 GPU 层执行，性能优异，适合复杂动画'
    },
    {
      type: 'info',
      title: 'absoluteOffset 用于 RTL 无关的偏移',
      content: 'offset 在 RTL 布局下会镜像，absoluteOffset 始终按绝对方向偏移'
    },
    {
      type: 'error',
      title: '避免在 offset lambda 中读取状态',
      content: 'offset { } lambda 在每次布局时调用，避免在其中读取频繁变化的状态，会导致性能问题'
    },
  ],

  relatedComponents: ['modifier-padding', 'modifier-size', 'animated-visibility'],
  since: '1.0.0',
}
