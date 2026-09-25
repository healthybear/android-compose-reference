import type { ComponentEntry } from '../../types'

export const infiniteTransitionComponent: ComponentEntry = {
  id: 'infinite-transition',
  demo: { id: 'infinite-transition', sourceFile: 'InfiniteTransitionDemo.kt' },
  name: 'rememberInfiniteTransition',
  category: 'Animation',
  description: '创建无限循环动画，适合加载指示器、呼吸灯、闪烁效果、骨架屏等持续运行的动画场景。组件在生命周期内持续播放，离开屏幕时自动暂停。',
  tags: ['animation', 'infinite', 'loop', 'repeat', '循环动画'],
  params: [
    { name: 'label', type: 'String', default: '"InfiniteTransition"', description: '调试标签，用于调试工具识别' },
  ],
  examples: [
    {
      title: '呼吸灯效果',
      code: `val infiniteTransition = rememberInfiniteTransition(label = "pulse")

val alpha by infiniteTransition.animateFloat(
    initialValue = 0.2f,
    targetValue = 1f,
    animationSpec = infiniteRepeatable(
        animation = tween(1000),
        repeatMode = RepeatMode.Reverse
    ),
    label = "alpha"
)

Box(
    modifier = Modifier
        .size(80.dp)
        .alpha(alpha)
        .background(MaterialTheme.colorScheme.primary, CircleShape)
)`,
    },
    {
      title: '旋转加载动画',
      code: `val infiniteTransition = rememberInfiniteTransition(label = "rotate")

val rotation by infiniteTransition.animateFloat(
    initialValue = 0f,
    targetValue = 360f,
    animationSpec = infiniteRepeatable(
        animation = tween(1000, easing = LinearEasing),
        repeatMode = RepeatMode.Restart
    ),
    label = "rotation"
)

Icon(
    Icons.Default.Refresh,
    contentDescription = "加载中",
    modifier = Modifier.rotate(rotation)
)`,
    },
    {
      title: '颜色渐变循环',
      code: `val infiniteTransition = rememberInfiniteTransition(label = "color")

val color by infiniteTransition.animateColor(
    initialValue = MaterialTheme.colorScheme.primary,
    targetValue = MaterialTheme.colorScheme.tertiary,
    animationSpec = infiniteRepeatable(
        animation = tween(2000),
        repeatMode = RepeatMode.Reverse
    ),
    label = "color"
)

Box(
    modifier = Modifier
        .fillMaxWidth()
        .height(4.dp)
        .background(color)
)`,
    },
    {
      title: '所有可用的动画类型',
      code: `val infiniteTransition = rememberInfiniteTransition(label = "demo")

// Float 动画
val float by infiniteTransition.animateFloat(
    initialValue = 0f,
    targetValue = 1f,
    animationSpec = infiniteRepeatable(tween(1000))
)

// Color 动画
val color by infiniteTransition.animateColor(
    initialValue = Color.Red,
    targetValue = Color.Blue,
    animationSpec = infiniteRepeatable(tween(1000))
)

// Dp 动画
val dp by infiniteTransition.animateDp(
    initialValue = 10.dp,
    targetValue = 50.dp,
    animationSpec = infiniteRepeatable(tween(1000))
)

// Offset 动画
val offset by infiniteTransition.animateOffset(
    initialValue = Offset.Zero,
    targetValue = Offset(100f, 100f),
    animationSpec = infiniteRepeatable(tween(1000))
)

// Size 动画
val size by infiniteTransition.animateSize(
    initialValue = Size(50f, 50f),
    targetValue = Size(100f, 100f),
    animationSpec = infiniteRepeatable(tween(1000))
)`,
    },
    {
      title: '骨架屏加载动画',
      code: `val infiniteTransition = rememberInfiniteTransition(label = "skeleton")

val shimmerTranslate by infiniteTransition.animateFloat(
    initialValue = 0f,
    targetValue = 1000f,
    animationSpec = infiniteRepeatable(
        animation = tween(1200, easing = LinearEasing),
        repeatMode = RepeatMode.Restart
    ),
    label = "shimmer"
)

val brush = Brush.horizontalGradient(
    colors = listOf(
        Color.LightGray.copy(alpha = 0.3f),
        Color.LightGray.copy(alpha = 0.5f),
        Color.LightGray.copy(alpha = 0.3f)
    ),
    startX = shimmerTranslate - 300f,
    endX = shimmerTranslate
)

Column(
    modifier = Modifier.padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(20.dp)
            .background(brush, RoundedCornerShape(4.dp))
    )
    Box(
        modifier = Modifier
            .fillMaxWidth(0.7f)
            .height(20.dp)
            .background(brush, RoundedCornerShape(4.dp))
    )
}`,
    },
    {
      title: '多个属性同时动画',
      code: `val infiniteTransition = rememberInfiniteTransition(label = "multi")

val scale by infiniteTransition.animateFloat(
    initialValue = 0.8f,
    targetValue = 1.2f,
    animationSpec = infiniteRepeatable(
        animation = tween(600),
        repeatMode = RepeatMode.Reverse
    ),
    label = "scale"
)

val alpha by infiniteTransition.animateFloat(
    initialValue = 0.5f,
    targetValue = 1f,
    animationSpec = infiniteRepeatable(
        animation = tween(600),
        repeatMode = RepeatMode.Reverse
    ),
    label = "alpha"
)

Box(
    modifier = Modifier
        .size(60.dp)
        .scale(scale)
        .alpha(alpha)
        .background(MaterialTheme.colorScheme.primary, CircleShape)
)`,
    },
  ],

  useCases: [
    {
      title: '搜索加载指示器',
      description: '搜索时显示的动态加载提示',
      code: `@Composable
fun SearchLoadingIndicator() {
    val infiniteTransition = rememberInfiniteTransition(label = "search")

    val dotScale1 by infiniteTransition.animateFloat(
        initialValue = 0.5f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(600),
            repeatMode = RepeatMode.Reverse
        ),
        label = "dot1"
    )

    val dotScale2 by infiniteTransition.animateFloat(
        initialValue = 0.5f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(600, delayMillis = 200),
            repeatMode = RepeatMode.Reverse
        ),
        label = "dot2"
    )

    val dotScale3 by infiniteTransition.animateFloat(
        initialValue = 0.5f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(600, delayMillis = 400),
            repeatMode = RepeatMode.Reverse
        ),
        label = "dot3"
    )

    Row(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text("搜索中")
        Box(
            modifier = Modifier
                .size(8.dp)
                .scale(dotScale1)
                .background(MaterialTheme.colorScheme.primary, CircleShape)
        )
        Box(
            modifier = Modifier
                .size(8.dp)
                .scale(dotScale2)
                .background(MaterialTheme.colorScheme.primary, CircleShape)
        )
        Box(
            modifier = Modifier
                .size(8.dp)
                .scale(dotScale3)
                .background(MaterialTheme.colorScheme.primary, CircleShape)
        )
    }
}`,
    },
    {
      title: '波纹扩散效果',
      description: '类似雷达扫描的波纹动画',
      code: `@Composable
fun RippleEffect() {
    val infiniteTransition = rememberInfiniteTransition(label = "ripple")

    val scale1 by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 2f,
        animationSpec = infiniteRepeatable(
            animation = tween(2000, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "ripple1"
    )

    val scale2 by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 2f,
        animationSpec = infiniteRepeatable(
            animation = tween(2000, delayMillis = 666, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "ripple2"
    )

    val scale3 by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 2f,
        animationSpec = infiniteRepeatable(
            animation = tween(2000, delayMillis = 1333, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "ripple3"
    )

    Box(
        modifier = Modifier.size(100.dp),
        contentAlignment = Alignment.Center
    ) {
        // 三层波纹
        Box(
            modifier = Modifier
                .size(50.dp)
                .scale(scale1)
                .alpha(1f - scale1 / 2f)
                .border(2.dp, MaterialTheme.colorScheme.primary, CircleShape)
        )
        Box(
            modifier = Modifier
                .size(50.dp)
                .scale(scale2)
                .alpha(1f - scale2 / 2f)
                .border(2.dp, MaterialTheme.colorScheme.primary, CircleShape)
        )
        Box(
            modifier = Modifier
                .size(50.dp)
                .scale(scale3)
                .alpha(1f - scale3 / 2f)
                .border(2.dp, MaterialTheme.colorScheme.primary, CircleShape)
        )

        // 中心点
        Box(
            modifier = Modifier
                .size(20.dp)
                .background(MaterialTheme.colorScheme.primary, CircleShape)
        )
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '使用 RepeatMode 控制循环方式',
      description: 'Reverse 会来回循环，Restart 会从头开始，选择合适的模式',
      goodExample: `// 呼吸灯用 Reverse
infiniteRepeatable(
    animation = tween(1000),
    repeatMode = RepeatMode.Reverse
)

// 旋转用 Restart
infiniteRepeatable(
    animation = tween(1000),
    repeatMode = RepeatMode.Restart
)`,
    },
    {
      title: '旋转动画使用 LinearEasing',
      description: '旋转动画应该使用线性缓动，避免速度变化',
      goodExample: `infiniteTransition.animateFloat(
    initialValue = 0f,
    targetValue = 360f,
    animationSpec = infiniteRepeatable(
        animation = tween(1000, easing = LinearEasing)
    )
)`,
      badExample: `// 默认 FastOutSlowInEasing 会导致旋转不均匀
infiniteTransition.animateFloat(
    initialValue = 0f,
    targetValue = 360f,
    animationSpec = infiniteRepeatable(animation = tween(1000))
)`,
    },
    {
      title: '使用条件控制动画播放',
      description: '根据状态决定是否显示无限动画组件',
      goodExample: `if (isLoading) {
    val infiniteTransition = rememberInfiniteTransition()
    // 动画只在加载时运行
}`,
      badExample: `// 动画会一直运行，浪费资源
val infiniteTransition = rememberInfiniteTransition()
if (isLoading) {
    // 使用动画
}`,
    },
    {
      title: '为多波动画添加延迟',
      description: '使用 delayMillis 为多个动画添加相位差，创建波浪效果',
      goodExample: `// 三个点依次跳动
val scale1 by infiniteTransition.animateFloat(
    animationSpec = infiniteRepeatable(tween(600))
)
val scale2 by infiniteTransition.animateFloat(
    animationSpec = infiniteRepeatable(tween(600, delayMillis = 200))
)
val scale3 by infiniteTransition.animateFloat(
    animationSpec = infiniteRepeatable(tween(600, delayMillis = 400))
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: '自动生命周期管理',
      content: 'rememberInfiniteTransition 会在组件进入 Composition 时开始动画，离开时自动停止，无需手动管理',
    },
    {
      type: 'info',
      title: 'initialValue 的作用',
      content: 'initialValue 是动画的起始值，targetValue 是目标值。Reverse 模式下动画会在两者之间往返，Restart 模式下会从 initial 跳回起点',
    },
    {
      type: 'info',
      title: '使用 delayMillis 创建序列动画',
      content: '通过为不同动画设置不同的 delayMillis，可以创建有序的动画序列效果，如波浪、依次加载等',
    },
    {
      type: 'warning',
      title: '注意性能影响',
      content: '无限动画会持续触发重组。避免在列表的每一项都使用无限动画，会严重影响滚动性能',
    },
    {
      type: 'warning',
      title: '避免复杂计算',
      content: '动画值每帧都会更新。避免在使用动画值的地方进行复杂计算，会影响帧率',
    },
    {
      type: 'error',
      title: '不要忘记停止动画',
      content: '如果动画只在特定条件下需要（如加载状态），使用条件渲染整个动画组件，而不是一直运行但隐藏',
    },
  ],

  relatedComponents: ['animate-as-state', 'update-transition', 'animated-visibility'],
  since: '1.0.0',
}
