import type { ComponentEntry } from '../../types'

export const lottieComponent: ComponentEntry = {
  id: 'lottie',
  name: 'Lottie',
  category: 'Ecosystem',
  description: 'Airbnb Lottie 的 Compose 版本，播放 JSON/dotLottie 格式的矢量动画，需引入 com.airbnb.android:lottie-compose。',
  tags: ['lottie', 'animation', 'json', 'vector', '矢量动画'],
  params: [
    { name: 'composition', type: 'LottieComposition?', required: true, description: 'Lottie 动画组合对象，由 rememberLottieComposition() 加载' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'progress', type: '() -> Float', default: '{ 0f }', description: '播放进度 0f~1f，通常由 animateLottieCompositionAsState 提供' },
    { name: 'speed', type: 'Float', default: '1f', description: '播放速度倍率，负值反向播放' },
    { name: 'contentScale', type: 'ContentScale', default: 'ContentScale.Fit', description: '缩放模式' },
    { name: 'clipToCompositionBounds', type: 'Boolean', default: 'true', description: '是否裁剪到动画边界' },
  ],
  examples: [
    {
      title: '循环播放',
      code: `// build.gradle.kts
// implementation("com.airbnb.android:lottie-compose:6.6.0")

// res/raw/loading.json 或 assets/loading.lottie
val composition by rememberLottieComposition(
    LottieCompositionSpec.RawRes(R.raw.loading)
)
val progress by animateLottieCompositionAsState(
    composition = composition,
    iterations = LottieConstants.IterateForever
)

LottieAnimation(
    composition = composition,
    progress = { progress },
    modifier = Modifier.size(120.dp)
)`,
    },
    {
      title: '播放一次后停止',
      code: `val composition by rememberLottieComposition(
    LottieCompositionSpec.Url("https://assets.lottiefiles.com/packages/lf20_success.json")
)
val progress by animateLottieCompositionAsState(
    composition = composition,
    iterations = 1,
    isPlaying = true
)

LottieAnimation(
    composition = composition,
    progress = { progress },
    modifier = Modifier.size(200.dp)
)`,
    },
    {
      title: '手动控制播放',
      code: `val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.heart))
val animatable = rememberLottieAnimatable()
val scope = rememberCoroutineScope()

LottieAnimation(
    composition = composition,
    progress = { animatable.progress },
    modifier = Modifier.size(80.dp).clickable {
        scope.launch {
            animatable.animate(
                composition = composition,
                iterations = 1,
                speed = 1.5f
            )
        }
    }
)`,
    },
    {
      title: '控制播放/暂停',
      code: `var isPlaying by remember { mutableStateOf(false) }
val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.animation))
val progress by animateLottieCompositionAsState(
    composition = composition,
    isPlaying = isPlaying,
    iterations = LottieConstants.IterateForever
)

Column(horizontalAlignment = Alignment.CenterHorizontally) {
    LottieAnimation(
        composition = composition,
        progress = { progress },
        modifier = Modifier.size(200.dp)
    )

    Button(onClick = { isPlaying = !isPlaying }) {
        Text(if (isPlaying) "暂停" else "播放")
    }
}`,
    },
    {
      title: '反向播放和速度控制',
      code: `var speed by remember { mutableStateOf(1f) }
val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.car))
val progress by animateLottieCompositionAsState(
    composition = composition,
    speed = speed,
    iterations = LottieConstants.IterateForever
)

Column {
    LottieAnimation(
        composition = composition,
        progress = { progress },
        modifier = Modifier.size(200.dp)
    )

    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        Button(onClick = { speed = -2f }) { Text("快退") }
        Button(onClick = { speed = -1f }) { Text("倒放") }
        Button(onClick = { speed = 1f }) { Text("正常") }
        Button(onClick = { speed = 2f }) { Text("2倍速") }
    }
}`,
    },
    {
      title: '从 Assets 加载动画',
      code: `val composition by rememberLottieComposition(
    LottieCompositionSpec.Asset("animations/welcome.json")
)
val progress by animateLottieCompositionAsState(
    composition = composition,
    iterations = 1
)

LottieAnimation(
    composition = composition,
    progress = { progress },
    modifier = Modifier.fillMaxWidth().height(300.dp)
)`,
    },
    {
      title: '监听加载和播放状态',
      code: `var isLoading by remember { mutableStateOf(true) }
var hasError by remember { mutableStateOf(false) }

val composition by rememberLottieComposition(
    spec = LottieCompositionSpec.Url("https://example.com/animation.json"),
    onRetry = { failCount, exception ->
        // 重试逻辑：最多重试 3 次
        failCount < 3
    }
)

LaunchedEffect(composition) {
    isLoading = composition == null
    hasError = composition == null
}

val progress by animateLottieCompositionAsState(
    composition = composition,
    iterations = LottieConstants.IterateForever
)

Box(modifier = Modifier.size(150.dp), contentAlignment = Alignment.Center) {
    when {
        isLoading -> CircularProgressIndicator()
        hasError -> Text("加载失败", color = Color.Red)
        else -> LottieAnimation(
            composition = composition,
            progress = { progress }
        )
    }
}`,
    },
    {
      title: '动态属性（更改颜色、文本）',
      code: `val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.badge))
val dynamicProperties = rememberLottieDynamicProperties(
    rememberLottieDynamicProperty(
        property = LottieProperty.COLOR,
        value = Color.Red.toArgb(),
        keyPath = arrayOf("Layer", "Shape", "Fill")
    ),
    rememberLottieDynamicProperty(
        property = LottieProperty.TEXT,
        value = "VIP",
        keyPath = arrayOf("TextLayer")
    )
)

LottieAnimation(
    composition = composition,
    progress = { 1f },
    dynamicProperties = dynamicProperties,
    modifier = Modifier.size(100.dp)
)`,
    },
  ],

  useCases: [
    {
      title: '启动页动画',
      description: '应用启动时播放品牌动画，完成后跳转主页',
      code: `@Composable
fun SplashScreen(onAnimationEnd: () -> Unit) {
    val composition by rememberLottieComposition(
        LottieCompositionSpec.RawRes(R.raw.splash)
    )
    val progress by animateLottieCompositionAsState(
        composition = composition,
        iterations = 1,
        isPlaying = true
    )

    LaunchedEffect(progress) {
        if (progress == 1f) {
            delay(300)
            onAnimationEnd()
        }
    }

    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        LottieAnimation(
            composition = composition,
            progress = { progress },
            modifier = Modifier.size(300.dp)
        )
    }
}`
    },
    {
      title: '操作反馈动画',
      description: '用户操作后播放成功/失败动画提供即时反馈',
      code: `@Composable
fun OperationFeedback(
    result: OperationResult?,
    onDismiss: () -> Unit
) {
    val animationRes = when (result) {
        is OperationResult.Success -> R.raw.success
        is OperationResult.Error -> R.raw.error
        null -> return
    }

    val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(animationRes))
    val progress by animateLottieCompositionAsState(
        composition = composition,
        iterations = 1,
        isPlaying = true
    )

    LaunchedEffect(progress) {
        if (progress == 1f) {
            delay(500)
            onDismiss()
        }
    }

    Dialog(onDismissRequest = onDismiss) {
        Column(
            modifier = Modifier
                .size(250.dp)
                .background(Color.White, RoundedCornerShape(16.dp))
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            LottieAnimation(
                composition = composition,
                progress = { progress },
                modifier = Modifier.size(120.dp)
            )
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = when (result) {
                    is OperationResult.Success -> result.message
                    is OperationResult.Error -> result.message
                    null -> ""
                },
                style = MaterialTheme.typography.bodyLarge
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 .lottie 格式而非 .json',
      description: '.lottie 是压缩格式，文件更小，加载更快',
      goodExample: `// 使用 .lottie 格式（推荐）
val composition by rememberLottieComposition(
    LottieCompositionSpec.Asset("animation.lottie")
)`,
      badExample: `// JSON 格式文件更大
val composition by rememberLottieComposition(
    LottieCompositionSpec.Asset("animation.json")
)`
    },
    {
      title: '避免过大的动画文件',
      description: '超过 200KB 的动画会影响加载性能和内存占用',
      goodExample: `// 在 LottieFiles 导出时选择：
// - 移除隐藏图层
// - 压缩图像
// - 降低关键帧密度
// - 导出为 .lottie 格式`,
      badExample: `// 直接使用从 After Effects 导出的完整 JSON
// 可能包含不必要的图层和高精度数据`
    },
    {
      title: '复杂动画使用硬件加速',
      description: '为复杂动画启用硬件层加速渲染性能',
      goodExample: `LottieAnimation(
    composition = composition,
    progress = { progress },
    modifier = Modifier
        .size(200.dp)
        .graphicsLayer {
            // 启用硬件加速
        }
)`,
    },
    {
      title: '预加载常用动画',
      description: '在应用启动时预加载常用动画到内存',
      goodExample: `// Application 或启动页
class MyApp : Application() {
    override fun onCreate() {
        super.onCreate()
        // 预加载
        LottieCompositionFactory.fromRawRes(this, R.raw.loading)
        LottieCompositionFactory.fromRawRes(this, R.raw.success)
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Lottie 动画来源',
      content: '可从 lottiefiles.com 下载免费动画，或使用 After Effects + Bodymovin 插件导出自定义动画'
    },
    {
      type: 'tip',
      title: 'iterations 参数说明',
      content: 'iterations = 1 播放一次，LottieConstants.IterateForever 无限循环，传入整数指定播放次数'
    },
    {
      type: 'tip',
      title: '使用 rememberLottieAnimatable 完全控制',
      content: 'rememberLottieAnimatable 提供 animate()、snapTo()、stop() 等方法，可精确控制播放进度和时机'
    },
    {
      type: 'warning',
      title: '网络加载动画需要处理失败情况',
      content: '使用 LottieCompositionSpec.Url 时，网络请求可能失败。使用 onRetry 参数配置重试逻辑，并提供加载失败的 UI'
    },
    {
      type: 'warning',
      title: '动态属性需要知道图层路径',
      content: '修改颜色、文本等动态属性时，需要在 After Effects 中查看图层名称。keyPath 不匹配时修改不会生效'
    },
    {
      type: 'danger',
      title: '列表中使用大型动画会导致卡顿',
      content: '在 LazyColumn 中避免使用复杂或大尺寸的 Lottie 动画。考虑使用静态图片或简化的动画版本'
    },
  ],

  relatedComponents: ['animated-visibility', 'crossfade', 'infinite-transition', 'canvas'],
  since: '1.0.0',
}
