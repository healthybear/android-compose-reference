import type { ComponentEntry } from '../../types'

export const graphicsModifierComponent: ComponentEntry = {
  id: 'modifier-graphics',
  name: 'Modifier.alpha / rotate / scale',
  category: 'Modifier',
  description: '图形变换修饰符，alpha 控制透明度，rotate 旋转，scale 缩放，均不影响布局占位，常与动画结合使用。',
  tags: ['alpha', 'rotate', 'scale', 'transform', '透明度', '旋转', '缩放'],
  params: [
    { name: 'alpha（alpha）', type: 'Float', required: true, description: '透明度，0f 完全透明，1f 完全不透明' },
    { name: 'degrees（rotate）', type: 'Float', required: true, description: '旋转角度，顺时针为正' },
    { name: 'scaleX（scale）', type: 'Float', default: 'scale', description: 'X 轴缩放比例' },
    { name: 'scaleY（scale）', type: 'Float', default: 'scale', description: 'Y 轴缩放比例' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `// 透明度
Box(modifier = Modifier.size(80.dp).background(Color.Red).alpha(0.5f))

// 旋转（不影响布局）
Icon(
    Icons.Default.ArrowForward,
    contentDescription = null,
    modifier = Modifier.rotate(90f)  // 向下箭头
)

// 缩放
Image(
    painter = painterResource(R.drawable.logo),
    contentDescription = null,
    modifier = Modifier.scale(1.5f)
)

// X 和 Y 轴独立缩放
Box(
    modifier = Modifier
        .size(100.dp, 50.dp)
        .background(Color.Blue)
        .scale(scaleX = 1.5f, scaleY = 0.8f)
)`,
    },
    {
      title: '配合动画',
      code: `var expanded by remember { mutableStateOf(false) }
val rotation by animateFloatAsState(
    targetValue = if (expanded) 180f else 0f,
    label = "rotation"
)
val alpha by animateFloatAsState(
    targetValue = if (expanded) 1f else 0.4f,
    label = "alpha"
)

IconButton(onClick = { expanded = !expanded }) {
    Icon(
        Icons.Default.ExpandMore,
        contentDescription = if (expanded) "收起" else "展开",
        modifier = Modifier.rotate(rotation).alpha(alpha)
    )
}

// 缩放动画
var pressed by remember { mutableStateOf(false) }
val scale by animateFloatAsState(
    targetValue = if (pressed) 0.9f else 1f,
    animationSpec = spring(dampingRatio = Spring.DampingRatioMediumBouncy),
    label = "scale"
)

Button(
    onClick = { },
    modifier = Modifier
        .scale(scale)
        .pointerInput(Unit) {
            detectTapGestures(
                onPress = {
                    pressed = true
                    tryAwaitRelease()
                    pressed = false
                }
            )
        }
) {
    Text("按压缩放")
}`,
    },
    {
      title: 'graphicsLayer（组合变换）',
      code: `// graphicsLayer 可同时设置多个变换，性能更好（单次 RenderNode）
Box(
    modifier = Modifier
        .size(100.dp)
        .graphicsLayer {
            alpha = 0.8f
            rotationZ = 45f
            scaleX = 1.2f
            scaleY = 1.2f
            shadowElevation = 8.dp.toPx()
            shape = RoundedCornerShape(8.dp)
            clip = true
        }
        .background(MaterialTheme.colorScheme.primary)
)

// 3D 旋转效果
var rotationX by remember { mutableFloatStateOf(0f) }
var rotationY by remember { mutableFloatStateOf(0f) }

Box(
    modifier = Modifier
        .size(150.dp)
        .graphicsLayer {
            this.rotationX = rotationX
            this.rotationY = rotationY
            cameraDistance = 12f * density
        }
        .background(MaterialTheme.colorScheme.primary, RoundedCornerShape(16.dp))
        .pointerInput(Unit) {
            detectDragGestures { change, dragAmount ->
                rotationY += dragAmount.x * 0.5f
                rotationX -= dragAmount.y * 0.5f
            }
        },
    contentAlignment = Alignment.Center
) {
    Text("3D 旋转", color = Color.White, fontWeight = FontWeight.Bold)
}`,
    },
    {
      title: '变换原点（transformOrigin）',
      code: `Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.SpaceEvenly
) {
    // 左上角为原点旋转
    Box(
        modifier = Modifier
            .size(60.dp)
            .graphicsLayer {
                transformOrigin = TransformOrigin(0f, 0f)
                rotationZ = 45f
            }
            .background(Color.Red)
    )

    // 中心为原点旋转（默认）
    Box(
        modifier = Modifier
            .size(60.dp)
            .graphicsLayer {
                transformOrigin = TransformOrigin.Center
                rotationZ = 45f
            }
            .background(Color.Green)
    )

    // 右下角为原点旋转
    Box(
        modifier = Modifier
            .size(60.dp)
            .graphicsLayer {
                transformOrigin = TransformOrigin(1f, 1f)
                rotationZ = 45f
            }
            .background(Color.Blue)
    )
}`,
    },
    {
      title: '平移（translation）',
      code: `// 使用 graphicsLayer 平移（不影响布局）
Box(
    modifier = Modifier
        .size(100.dp)
        .graphicsLayer {
            translationX = 50.dp.toPx()
            translationY = 30.dp.toPx()
        }
        .background(MaterialTheme.colorScheme.primary)
)

// 动画平移
var offsetX by remember { mutableFloatStateOf(0f) }

val animatedOffset by animateFloatAsState(
    targetValue = offsetX,
    animationSpec = spring(),
    label = "offset"
)

Column {
    Box(
        modifier = Modifier
            .size(80.dp)
            .graphicsLayer {
                translationX = animatedOffset
            }
            .background(Color.Blue, CircleShape)
    )

    Spacer(Modifier.height(16.dp))

    Button(onClick = {
        offsetX = if (offsetX == 0f) 200f else 0f
    }) {
        Text("平移")
    }
}`,
    },
    {
      title: '组合多种变换',
      code: `var animate by remember { mutableStateOf(false) }

val rotation by animateFloatAsState(
    targetValue = if (animate) 360f else 0f,
    animationSpec = tween(1000),
    label = "rotation"
)

val scale by animateFloatAsState(
    targetValue = if (animate) 1.5f else 1f,
    animationSpec = spring(dampingRatio = Spring.DampingRatioMediumBouncy),
    label = "scale"
)

val alpha by animateFloatAsState(
    targetValue = if (animate) 0.3f else 1f,
    label = "alpha"
)

Column(horizontalAlignment = Alignment.CenterHorizontally) {
    Icon(
        Icons.Default.Star,
        contentDescription = null,
        modifier = Modifier
            .size(80.dp)
            .graphicsLayer {
                rotationZ = rotation
                scaleX = scale
                scaleY = scale
                this.alpha = alpha
            },
        tint = Color(0xFFFFD700)
    )

    Spacer(Modifier.height(16.dp))

    Button(onClick = { animate = !animate }) {
        Text("播放动画")
    }
}`,
    },
    {
      title: '透视效果（cameraDistance）',
      code: `var rotationY by remember { mutableFloatStateOf(0f) }

Column(horizontalAlignment = Alignment.CenterHorizontally) {
    // 近距离透视（更强烈的 3D 效果）
    Card(
        modifier = Modifier
            .size(150.dp, 200.dp)
            .graphicsLayer {
                this.rotationY = rotationY
                cameraDistance = 8f * density  // 相机距离近
            }
    ) {
        Box(
            modifier = Modifier.fillMaxSize().background(Color(0xFF6200EE)),
            contentAlignment = Alignment.Center
        ) {
            Text("近透视", color = Color.White, fontWeight = FontWeight.Bold)
        }
    }

    Spacer(Modifier.height(24.dp))

    // 远距离透视（较弱的 3D 效果）
    Card(
        modifier = Modifier
            .size(150.dp, 200.dp)
            .graphicsLayer {
                this.rotationY = rotationY
                cameraDistance = 30f * density  // 相机距离远
            }
    ) {
        Box(
            modifier = Modifier.fillMaxSize().background(Color(0xFF03DAC5)),
            contentAlignment = Alignment.Center
        ) {
            Text("远透视", color = Color.White, fontWeight = FontWeight.Bold)
        }
    }

    Spacer(Modifier.height(16.dp))

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
      title: '翻转卡片动画',
      description: '实现卡片翻转显示正反面的效果',
      code: `@Composable
fun FlipCard() {
    var flipped by remember { mutableStateOf(false) }
    val rotation by animateFloatAsState(
        targetValue = if (flipped) 180f else 0f,
        animationSpec = tween(600),
        label = "flip"
    )

    Card(
        modifier = Modifier
            .size(200.dp, 300.dp)
            .graphicsLayer {
                rotationY = rotation
                cameraDistance = 12f * density
            }
            .clickable { flipped = !flipped },
        elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    if (rotation <= 90f) {
                        MaterialTheme.colorScheme.primary
                    } else {
                        MaterialTheme.colorScheme.secondary
                    }
                ),
            contentAlignment = Alignment.Center
        ) {
            // 正反面文字需要根据旋转角度调整
            Text(
                text = if (rotation <= 90f) "正面" else "反面",
                color = Color.White,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.graphicsLayer {
                    // 反面文字需要水平翻转
                    rotationY = if (rotation > 90f) 180f else 0f
                }
            )
        }
    }
}`
    },
    {
      title: '悬浮按钮点击效果',
      description: '实现按钮按下时的缩放和阴影效果',
      code: `@Composable
fun AnimatedFab(onClick: () -> Unit) {
    var pressed by remember { mutableStateOf(false) }

    val scale by animateFloatAsState(
        targetValue = if (pressed) 0.85f else 1f,
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioMediumBouncy,
            stiffness = Spring.StiffnessLow
        ),
        label = "scale"
    )

    val elevation by animateDpAsState(
        targetValue = if (pressed) 2.dp else 6.dp,
        label = "elevation"
    )

    FloatingActionButton(
        onClick = onClick,
        modifier = Modifier
            .scale(scale)
            .pointerInput(Unit) {
                detectTapGestures(
                    onPress = {
                        pressed = true
                        val released = tryAwaitRelease()
                        pressed = false
                        if (released) {
                            onClick()
                        }
                    }
                )
            },
        elevation = FloatingActionButtonDefaults.elevation(
            defaultElevation = elevation
        )
    ) {
        Icon(Icons.Default.Add, contentDescription = "添加")
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 graphicsLayer 而非多个独立修饰符',
      description: '多个变换组合时，graphicsLayer 性能更好，只触发一次 RenderNode 更新',
      goodExample: `Modifier.graphicsLayer {
    alpha = 0.8f
    rotationZ = 45f
    scaleX = 1.2f
    scaleY = 1.2f
}`,
      badExample: `Modifier
    .alpha(0.8f)
    .rotate(45f)
    .scale(1.2f)  // 多次 RenderNode 更新`,
    },
    {
      title: '变换不影响布局',
      description: '图形变换不影响测量和布局，其他组件不会因变换而移动',
      goodExample: `// 旋转不影响布局空间
Row {
    Box(Modifier.size(50.dp).rotate(45f).background(Color.Red))
    Box(Modifier.size(50.dp).background(Color.Blue))  // 紧邻，不受旋转影响
}`,
    },
    {
      title: '使用 animateFloatAsState 平滑过渡',
      description: '配合动画 API 实现平滑的变换效果',
      goodExample: `val rotation by animateFloatAsState(
    targetValue = if (expanded) 180f else 0f,
    label = "rotation"
)

Modifier.rotate(rotation)`,
      badExample: `val rotation = if (expanded) 180f else 0f
Modifier.rotate(rotation)  // 突变，没有过渡`,
    },
    {
      title: '3D 变换需要设置 cameraDistance',
      description: '使用 rotationX/rotationY 时设置合适的相机距离以获得透视效果',
      goodExample: `Modifier.graphicsLayer {
    rotationY = 45f
    cameraDistance = 12f * density  // 设置相机距离
}`,
      badExample: `Modifier.graphicsLayer {
    rotationY = 45f
    // 没有设置 cameraDistance，透视效果不明显
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: '变换不影响布局',
      content: 'alpha、rotate、scale 等图形变换不会改变组件的布局尺寸和位置，只影响渲染效果'
    },
    {
      type: 'info',
      title: 'graphicsLayer 使用 RenderNode',
      content: 'graphicsLayer 利用 RenderNode 硬件加速，性能优于直接使用 Canvas 绘制'
    },
    {
      type: 'info',
      title: '旋转角度单位是度',
      content: 'rotate(45f) 表示顺时针旋转 45 度，负值表示逆时针旋转'
    },
    {
      type: 'info',
      title: 'TransformOrigin 控制变换中心',
      content: '默认以组件中心为原点，可通过 transformOrigin 修改为其他位置（值范围 0f-1f）'
    },
    {
      type: 'info',
      title: 'cameraDistance 控制透视强度',
      content: '3D 旋转时，较小的 cameraDistance 产生更强烈的透视效果，通常使用 8f-30f * density'
    },
    {
      type: 'warning',
      title: 'alpha = 0f 不会禁用交互',
      content: '完全透明的组件仍然可以接收点击等交互事件，需要配合 enabled 参数控制'
    },
  ],

  relatedComponents: ['animated-visibility', 'animate-as-state'],
  since: '1.0.0',
}
