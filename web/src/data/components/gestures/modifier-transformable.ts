import type { ComponentEntry } from '../../types'

export const transformableComponent: ComponentEntry = {
  id: 'modifier-transformable',
  demo: { id: 'modifier-transformable', sourceFile: 'TransformableDemo.kt' },
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
    {
      title: '双击重置变换',
      code: `var scale by remember { mutableFloatStateOf(1f) }
var rotation by remember { mutableFloatStateOf(0f) }
var offset by remember { mutableStateOf(Offset.Zero) }
val scope = rememberCoroutineScope()

val state = rememberTransformableState { zoomChange, offsetChange, rotationChange ->
    scale = (scale * zoomChange).coerceIn(0.5f, 3f)
    rotation += rotationChange
    offset += offsetChange
}

Box(
    modifier = Modifier
        .fillMaxSize()
        .pointerInput(Unit) {
            detectTapGestures(
                onDoubleTap = {
                    // 双击重置所有变换
                    scale = 1f
                    rotation = 0f
                    offset = Offset.Zero
                }
            )
        }
) {
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
    )
}`,
    },
    {
      title: '带动画的缩放',
      code: `val scale = remember { Animatable(1f) }
val rotation = remember { Animatable(0f) }
val offset = remember { Animatable(Offset.Zero, Offset.VectorConverter) }
val scope = rememberCoroutineScope()

val state = rememberTransformableState { zoomChange, offsetChange, rotationChange ->
    scope.launch {
        scale.snapTo((scale.value * zoomChange).coerceIn(0.5f, 3f))
        rotation.snapTo(rotation.value + rotationChange)
        offset.snapTo(offset.value + offsetChange)
    }
}

Image(
    painter = painterResource(R.drawable.photo),
    contentDescription = null,
    modifier = Modifier
        .graphicsLayer(
            scaleX = scale.value,
            scaleY = scale.value,
            rotationZ = rotation.value,
            translationX = offset.value.x,
            translationY = offset.value.y
        )
        .transformable(
            state = state,
            onTransformStopped = {
                // 松手后回弹到默认状态
                scope.launch {
                    launch { scale.animateTo(1f) }
                    launch { rotation.animateTo(0f) }
                    launch { offset.animateTo(Offset.Zero) }
                }
            }
        )
        .fillMaxSize()
)`,
    },
    {
      title: '显示变换信息',
      code: `var scale by remember { mutableFloatStateOf(1f) }
var rotation by remember { mutableFloatStateOf(0f) }
var offset by remember { mutableStateOf(Offset.Zero) }
var isTransforming by remember { mutableStateOf(false) }

val state = rememberTransformableState { zoomChange, offsetChange, rotationChange ->
    scale = (scale * zoomChange).coerceIn(0.5f, 5f)
    rotation += rotationChange
    offset += offsetChange
}

Box(modifier = Modifier.fillMaxSize()) {
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
            .transformable(
                state = state,
                onTransformStarted = { isTransforming = true },
                onTransformStopped = { isTransforming = false }
            )
            .fillMaxSize()
    )

    // 信息面板
    Surface(
        modifier = Modifier
            .align(Alignment.BottomCenter)
            .padding(16.dp),
        color = MaterialTheme.colorScheme.surface.copy(alpha = 0.9f),
        shape = RoundedCornerShape(8.dp)
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text("缩放: " + "%.2f".format(scale) + "x")
            Text("旋转: " + "%.0f".format(rotation) + "°")
            Text("偏移: (" + "%.0f".format(offset.x) + ", " + "%.0f".format(offset.y) + ")")
            Text("状态: " + if (isTransforming) "变换中" else "空闲")
        }
    }
}`,
    },
    {
      title: '限制平移范围',
      code: `var scale by remember { mutableFloatStateOf(1f) }
var offset by remember { mutableStateOf(Offset.Zero) }

BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
    val maxWidth = constraints.maxWidth.toFloat()
    val maxHeight = constraints.maxHeight.toFloat()

    val state = rememberTransformableState { zoomChange, offsetChange, rotationChange ->
        scale = (scale * zoomChange).coerceIn(1f, 4f)

        // 根据缩放限制平移范围
        val maxOffsetX = (maxWidth * (scale - 1f)) / 2f
        val maxOffsetY = (maxHeight * (scale - 1f)) / 2f

        offset = Offset(
            x = (offset.x + offsetChange.x).coerceIn(-maxOffsetX, maxOffsetX),
            y = (offset.y + offsetChange.y).coerceIn(-maxOffsetY, maxOffsetY)
        )
    }

    Image(
        painter = painterResource(R.drawable.photo),
        contentDescription = null,
        contentScale = ContentScale.Fit,
        modifier = Modifier
            .graphicsLayer(
                scaleX = scale,
                scaleY = scale,
                translationX = offset.x,
                translationY = offset.y
            )
            .transformable(state = state, lockRotationOnZoomPan = true)
            .fillMaxSize()
    )
}`,
    },
  ],

  useCases: [
    {
      title: '图片查看器',
      description: '支持双指缩放、旋转、平移的图片查看器',
      code: `@Composable
fun ImageViewer(imageRes: Int) {
    var scale by remember { mutableFloatStateOf(1f) }
    var rotation by remember { mutableFloatStateOf(0f) }
    var offset by remember { mutableStateOf(Offset.Zero) }

    val state = rememberTransformableState { zoomChange, offsetChange, rotationChange ->
        scale = (scale * zoomChange).coerceIn(0.5f, 5f)
        rotation += rotationChange
        offset += offsetChange
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black)
            .pointerInput(Unit) {
                detectTapGestures(
                    onDoubleTap = { tapOffset ->
                        if (scale > 1f) {
                            // 双击还原
                            scale = 1f
                            rotation = 0f
                            offset = Offset.Zero
                        } else {
                            // 双击放大到点击位置
                            scale = 2.5f
                            offset = (center - tapOffset) * 1.5f
                        }
                    }
                )
            }
    ) {
        Image(
            painter = painterResource(imageRes),
            contentDescription = null,
            contentScale = ContentScale.Fit,
            modifier = Modifier
                .fillMaxSize()
                .graphicsLayer(
                    scaleX = scale,
                    scaleY = scale,
                    rotationZ = rotation,
                    translationX = offset.x,
                    translationY = offset.y
                )
                .transformable(state = state)
        )

        // 重置按钮
        if (scale != 1f || rotation != 0f || offset != Offset.Zero) {
            FloatingActionButton(
                onClick = {
                    scale = 1f
                    rotation = 0f
                    offset = Offset.Zero
                },
                modifier = Modifier
                    .align(Alignment.BottomEnd)
                    .padding(16.dp)
            ) {
                Icon(Icons.Default.Refresh, contentDescription = "重置")
            }
        }
    }
}`,
    },
    {
      title: '交互式地图',
      description: '可缩放和平移的地图组件',
      code: `@Composable
fun InteractiveMap() {
    var scale by remember { mutableFloatStateOf(1f) }
    var offset by remember { mutableStateOf(Offset.Zero) }

    BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
        val maxWidth = constraints.maxWidth.toFloat()
        val maxHeight = constraints.maxHeight.toFloat()

        val state = rememberTransformableState { zoomChange, offsetChange, _ ->
            val newScale = (scale * zoomChange).coerceIn(1f, 5f)

            // 限制平移不超出边界
            val maxOffsetX = (maxWidth * (newScale - 1f)) / 2f
            val maxOffsetY = (maxHeight * (newScale - 1f)) / 2f

            scale = newScale
            offset = Offset(
                x = (offset.x + offsetChange.x).coerceIn(-maxOffsetX, maxOffsetX),
                y = (offset.y + offsetChange.y).coerceIn(-maxOffsetY, maxOffsetY)
            )
        }

        Box(modifier = Modifier.fillMaxSize()) {
            // 地图内容
            Image(
                painter = painterResource(R.drawable.map),
                contentDescription = "地图",
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .fillMaxSize()
                    .graphicsLayer(
                        scaleX = scale,
                        scaleY = scale,
                        translationX = offset.x,
                        translationY = offset.y
                    )
                    .transformable(state = state, lockRotationOnZoomPan = true)
            )

            // 缩放控制
            Column(
                modifier = Modifier
                    .align(Alignment.BottomEnd)
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                FloatingActionButton(
                    onClick = { scale = (scale * 1.5f).coerceAtMost(5f) },
                    modifier = Modifier.size(48.dp)
                ) {
                    Icon(Icons.Default.Add, contentDescription = "放大")
                }
                FloatingActionButton(
                    onClick = { scale = (scale / 1.5f).coerceAtLeast(1f) },
                    modifier = Modifier.size(48.dp)
                ) {
                    Icon(Icons.Default.Remove, contentDescription = "缩小")
                }
            }

            // 缩放指示器
            Text(
                text = (scale * 100).roundToInt().toString() + "%",
                modifier = Modifier
                    .align(Alignment.TopEnd)
                    .padding(16.dp)
                    .background(
                        MaterialTheme.colorScheme.surface.copy(alpha = 0.8f),
                        RoundedCornerShape(4.dp)
                    )
                    .padding(8.dp)
            )
        }
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '始终使用 graphicsLayer 应用变换',
      description: 'graphicsLayer 在 GPU 上执行变换，性能更好且不影响布局',
      goodExample: `Modifier
    .graphicsLayer(
        scaleX = scale,
        scaleY = scale,
        rotationZ = rotation,
        translationX = offset.x,
        translationY = offset.y
    )
    .transformable(state = state)`,
      badExample: `// 使用 scale/rotate 修饰符会触发重新布局
Modifier
    .scale(scale)
    .rotate(rotation)
    .transformable(state = state)`,
    },
    {
      title: '使用 coerceIn 限制缩放范围',
      description: '防止缩放过小或过大导致内容不可用',
      goodExample: `rememberTransformableState { zoomChange, offsetChange, rotationChange ->
    scale = (scale * zoomChange).coerceIn(0.5f, 5f)
}`,
      badExample: `rememberTransformableState { zoomChange, offsetChange, rotationChange ->
    scale *= zoomChange  // 可能缩放到 0 或无限大
}`,
    },
    {
      title: '锁定旋转简化用户体验',
      description: '对于地图、文档等内容，通常锁定旋转只保留缩放和平移',
      goodExample: `Modifier.transformable(
    state = state,
    lockRotationOnZoomPan = true  // 只允许缩放和平移
)`,
    },
    {
      title: '使用 Animatable 实现平滑回弹',
      description: '用 Animatable 配合 snapTo 可以在手势结束后添加动画效果',
      goodExample: `val scale = remember { Animatable(1f) }

rememberTransformableState { zoomChange, _, _ ->
    scope.launch {
        scale.snapTo((scale.value * zoomChange).coerceIn(0.5f, 3f))
    }
}

// 松手后回弹
onTransformStopped = {
    scope.launch { scale.animateTo(1f) }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'zoomChange 是缩放倍数',
      content: 'zoomChange 是本次缩放的倍数（不是目标值），需要乘以当前 scale：scale *= zoomChange',
    },
    {
      type: 'info',
      title: 'rotationChange 是增量角度',
      content: 'rotationChange 是本次旋转的角度增量（单位：度），需要累加到当前 rotation：rotation += rotationChange',
    },
    {
      type: 'tip',
      title: '双指捏合触发缩放',
      content: '两根手指同时按下并改变距离时触发缩放，改变相对角度时触发旋转，同时移动时触发平移',
    },
    {
      type: 'tip',
      title: '结合 detectTapGestures 实现双击',
      content: '在 transformable 外层使用 pointerInput + detectTapGestures 可以同时支持双击和变换手势',
    },
    {
      type: 'warning',
      title: 'offsetChange 受缩放影响',
      content: '平移偏移量 offsetChange 在缩放状态下会被放大，需要根据 scale 调整或限制平移范围',
    },
    {
      type: 'warning',
      title: '避免在回调中执行耗时操作',
      content: 'rememberTransformableState 回调在每一帧都会执行，避免复杂计算或状态读取',
    },
    {
      type: 'danger',
      title: '注意浮点数精度问题',
      content: '连续的旋转和缩放可能导致浮点数累积误差，必要时添加归一化或重置逻辑',
    },
  ],

  relatedComponents: ['detect-drag-gestures', 'modifier-draggable', 'detect-tap-gestures'],
  since: '1.0.0',
}
