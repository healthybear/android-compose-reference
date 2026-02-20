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
  ],
}
