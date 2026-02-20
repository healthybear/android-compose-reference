import type { ComponentEntry } from '../../types'

export const coilAsyncImageComponent: ComponentEntry = {
  id: 'coil-async-image',
  name: 'AsyncImage',
  category: 'Ecosystem',
  description: 'Coil 3.x 提供的异步图片加载组件，支持网络/本地图片、占位图、错误图、淡入动画，需引入 io.coil-kt.coil3:coil-compose。',
  tags: ['image', 'coil', 'async', 'network', '异步图片'],
  params: [
    { name: 'model', type: 'Any?', required: true, description: '图片来源，支持 URL 字符串、Uri、File、ImageRequest 等' },
    { name: 'contentDescription', type: 'String?', required: true, description: '无障碍描述，装饰性图片传 null' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'placeholder', type: 'Painter?', default: 'null', description: '加载中占位图' },
    { name: 'error', type: 'Painter?', default: 'null', description: '加载失败时显示的图片' },
    { name: 'fallback', type: 'Painter?', default: 'null', description: 'model 为 null 时显示的图片' },
    { name: 'contentScale', type: 'ContentScale', default: 'ContentScale.Fit', description: '图片缩放模式' },
    { name: 'onSuccess', type: '((AsyncImagePainter.State.Success) -> Unit)?', default: 'null', description: '加载成功回调' },
    { name: 'onError', type: '((AsyncImagePainter.State.Error) -> Unit)?', default: 'null', description: '加载失败回调' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `// build.gradle.kts
// implementation("io.coil-kt.coil3:coil-compose:3.0.4")
// implementation("io.coil-kt.coil3:coil-network-okhttp:3.0.4")

AsyncImage(
    model = "https://example.com/avatar.jpg",
    contentDescription = "用户头像",
    modifier = Modifier.size(80.dp).clip(CircleShape),
    contentScale = ContentScale.Crop
)`,
    },
    {
      title: '带占位图和错误图',
      code: `AsyncImage(
    model = ImageRequest.Builder(LocalContext.current)
        .data(imageUrl)
        .crossfade(true)  // 淡入动画
        .build(),
    contentDescription = "商品图片",
    placeholder = painterResource(R.drawable.placeholder),
    error = painterResource(R.drawable.error_image),
    modifier = Modifier
        .fillMaxWidth()
        .aspectRatio(16f / 9f)
        .clip(RoundedCornerShape(8.dp)),
    contentScale = ContentScale.Crop
)`,
    },
    {
      title: 'SubcomposeAsyncImage（自定义加载状态）',
      code: `SubcomposeAsyncImage(
    model = imageUrl,
    contentDescription = null,
    modifier = Modifier.size(120.dp).clip(RoundedCornerShape(8.dp))
) {
    when (painter.state) {
        is AsyncImagePainter.State.Loading -> {
            Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator(modifier = Modifier.size(24.dp))
            }
        }
        is AsyncImagePainter.State.Error -> {
            Icon(Icons.Default.BrokenImage, contentDescription = null, modifier = Modifier.fillMaxSize())
        }
        else -> SubcomposeAsyncImageContent()
    }
}`,
    },
  ],
}
