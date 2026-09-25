import type { ComponentEntry } from '../../types'

export const animateAsStateComponent: ComponentEntry = {
  id: 'animate-as-state',
  demo: { id: 'animate-as-state', sourceFile: 'AnimateAsStateDemo.kt' },
  name: 'animate*AsState',
  category: 'Animation',
  description: '将普通状态值转换为带动画的状态，值变化时自动执行补间动画，是最简单的动画 API。包含 animateFloatAsState、animateColorAsState、animateDpAsState 等多个变体。',
  tags: ['animation', 'state', 'tween', 'spring', '状态动画'],
  params: [
    { name: 'targetValue', type: 'T', required: true, description: '目标值，变化时触发动画' },
    { name: 'animationSpec', type: 'AnimationSpec<T>', default: 'spring()', description: '动画规格，spring（弹簧）或 tween（补间）' },
    { name: 'label', type: 'String', default: '"animate*AsState"', description: '调试标签，用于调试工具识别' },
    { name: 'finishedListener', type: '((T) -> Unit)?', default: 'null', description: '动画完成回调，可用于链式动画' },
  ],
  examples: [
    {
      title: '尺寸/透明度动画',
      code: `var expanded by remember { mutableStateOf(false) }

val size by animateDpAsState(
    targetValue = if (expanded) 200.dp else 80.dp,
    animationSpec = spring(dampingRatio = Spring.DampingRatioMediumBouncy),
    label = "size"
)
val alpha by animateFloatAsState(
    targetValue = if (expanded) 1f else 0.3f,
    label = "alpha"
)

Box(
    modifier = Modifier
        .size(size)
        .alpha(alpha)
        .background(MaterialTheme.colorScheme.primary, RoundedCornerShape(12.dp))
        .clickable { expanded = !expanded }
)`,
    },
    {
      title: '颜色动画',
      code: `var selected by remember { mutableStateOf(false) }

val backgroundColor by animateColorAsState(
    targetValue = if (selected) MaterialTheme.colorScheme.primaryContainer
                  else MaterialTheme.colorScheme.surfaceVariant,
    animationSpec = tween(durationMillis = 300),
    label = "bgColor"
)

Box(
    modifier = Modifier
        .fillMaxWidth()
        .height(56.dp)
        .background(backgroundColor)
        .clickable { selected = !selected },
    contentAlignment = Alignment.Center
) {
    Text(if (selected) "已选中" else "点击选中")
}`,
    },
    {
      title: '所有可用变体',
      code: `// Float 动画（透明度、旋转角度等）
val alpha by animateFloatAsState(targetValue = 0.5f)

// Dp 动画（尺寸、间距等）
val size by animateDpAsState(targetValue = 100.dp)

// Color 动画
val color by animateColorAsState(targetValue = Color.Red)

// Int 动画（数字计数器等）
val count by animateIntAsState(targetValue = 100)

// Offset 动画（位置偏移）
val offset by animateOffsetAsState(targetValue = Offset(100f, 100f))

// Size 动画
val boxSize by animateSizeAsState(targetValue = Size(200f, 200f))

// Rect 动画（矩形区域）
val rect by animateRectAsState(targetValue = Rect(0f, 0f, 100f, 100f))

// IntOffset 动画（整数偏移）
val intOffset by animateIntOffsetAsState(targetValue = IntOffset(50, 50))

// IntSize 动画
val intSize by animateIntSizeAsState(targetValue = IntSize(200, 200))`,
    },
    {
      title: '不同的动画规格',
      code: `// 弹簧动画（默认，自然有弹性）
val size1 by animateDpAsState(
    targetValue = 100.dp,
    animationSpec = spring(
        dampingRatio = Spring.DampingRatioMediumBouncy,
        stiffness = Spring.StiffnessMedium
    )
)

// 补间动画（线性时间）
val size2 by animateDpAsState(
    targetValue = 100.dp,
    animationSpec = tween(
        durationMillis = 300,
        delayMillis = 0,
        easing = FastOutSlowInEasing
    )
)

// 关键帧动画（多阶段）
val size3 by animateDpAsState(
    targetValue = 100.dp,
    animationSpec = keyframes {
        durationMillis = 600
        50.dp at 150 with LinearEasing
        80.dp at 300 with FastOutSlowInEasing
    }
)

// 重复动画
val size4 by animateDpAsState(
    targetValue = 100.dp,
    animationSpec = repeatable(
        iterations = 3,
        animation = tween(300),
        repeatMode = RepeatMode.Reverse
    )
)`,
    },
    {
      title: '动画完成回调',
      code: `var stage by remember { mutableStateOf(0) }

val size by animateDpAsState(
    targetValue = when (stage) {
        0 -> 50.dp
        1 -> 100.dp
        else -> 150.dp
    },
    animationSpec = tween(500),
    finishedListener = { finalValue ->
        // 链式动画：当前动画完成后自动进入下一阶段
        if (stage < 2) {
            stage++
        }
    }
)

Box(
    modifier = Modifier
        .size(size)
        .background(MaterialTheme.colorScheme.primary)
)`,
    },
  ],

  useCases: [
    {
      title: '进度指示器',
      description: '平滑显示加载或下载进度',
      code: `var progress by remember { mutableStateOf(0f) }

val animatedProgress by animateFloatAsState(
    targetValue = progress,
    animationSpec = tween(durationMillis = 300)
)

Column(modifier = Modifier.padding(16.dp)) {
    LinearProgressIndicator(
        progress = { animatedProgress },
        modifier = Modifier.fillMaxWidth(),
    )

    Text("60%")

    Button(onClick = {
        progress = (progress + 0.2f).coerceAtMost(1f)
    }) {
        Text("增加进度")
    }
}`,
    },
    {
      title: '数字计数器动画',
      description: '显示计数器时带有数字递增动画效果',
      code: `var targetValue by remember { mutableStateOf(0) }

val animatedValue by animateIntAsState(
    targetValue = targetValue,
    animationSpec = tween(durationMillis = 1000)
)

Column(horizontalAlignment = Alignment.CenterHorizontally) {
    Text(
        text = animatedValue.toString(),
        style = MaterialTheme.typography.displayLarge,
        fontWeight = FontWeight.Bold
    )

    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        Button(onClick = { targetValue += 10 }) {
            Text("+10")
        }
        Button(onClick = { targetValue = 0 }) {
            Text("重置")
        }
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '选择合适的动画规格',
      description: 'spring 适合交互动画（自然有弹性），tween 适合过渡动画（时间可控）',
      goodExample: `// 交互元素用 spring
val size by animateDpAsState(
    targetValue = if (pressed) 90.dp else 100.dp,
    animationSpec = spring()
)

// 页面过渡用 tween
val alpha by animateFloatAsState(
    targetValue = if (visible) 1f else 0f,
    animationSpec = tween(300)
)`,
      badExample: `// 交互用 tween 会显得僵硬
val size by animateDpAsState(
    targetValue = if (pressed) 90.dp else 100.dp,
    animationSpec = tween(200)
)`,
    },
    {
      title: '使用 by 委托简化代码',
      description: '使用属性委托 by 可以直接获取动画值，无需 .value',
      goodExample: `val size by animateDpAsState(targetValue = 100.dp)
Box(modifier = Modifier.size(size))`,
      badExample: `val size = animateDpAsState(targetValue = 100.dp)
Box(modifier = Modifier.size(size.value))`,
    },
    {
      title: '为动画提供 label',
      description: 'label 参数有助于在动画调试工具中识别动画',
      goodExample: `val offset by animateDpAsState(
    targetValue = targetOffset,
    label = "cardOffset"
)`,
    },
    {
      title: '避免在循环中创建动画',
      description: '每次重组都会创建新的动画实例，导致性能问题',
      goodExample: `@Composable
fun AnimatedItem(selected: Boolean) {
    val alpha by animateFloatAsState(
        targetValue = if (selected) 1f else 0.5f
    )
    Box(modifier = Modifier.alpha(alpha))
}`,
      badExample: `// 在 items 中直接使用会每次都创建
items(list) { item ->
    val alpha by animateFloatAsState(...)
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: '最简单的动画 API',
      content: 'animate*AsState 是 Compose 中最简单的动画 API，只需改变目标值，动画会自动执行。适合 90% 的简单动画场景',
    },
    {
      type: 'info',
      title: '默认使用 spring 动画',
      content: 'spring() 是默认的 animationSpec，它会产生自然的弹性效果。如果需要精确控制时长，使用 tween()',
    },
    {
      type: 'info',
      title: '返回值是 State 对象',
      content: '函数返回 State<T>，建议使用 by 委托获取值。这样当动画值变化时会触发重组',
    },
    {
      type: 'warning',
      title: '频繁变化的值会取消之前的动画',
      content: '如果 targetValue 在动画播放期间再次改变，之前的动画会被中断，从当前值开始新的动画',
    },
    {
      type: 'error',
      title: '不要在 LaunchedEffect 中使用',
      content: '这些函数必须在 Composable 函数中调用，不能在协程或 LaunchedEffect 中使用。如需在协程中控制动画，使用 Animatable',
    },
  ],

  relatedComponents: ['animated-visibility', 'animated-content', 'update-transition'],
  since: '1.0.0',
}
