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
    {
      title: '图片变换（圆角、模糊、灰度）',
      code: `AsyncImage(
    model = ImageRequest.Builder(LocalContext.current)
        .data(imageUrl)
        .crossfade(300)
        .transformations(
            CircleCropTransformation(),
            BlurTransformation(radius = 10f),
            GrayscaleTransformation()
        )
        .build(),
    contentDescription = "变换后的图片",
    modifier = Modifier.size(150.dp)
)`,
    },
    {
      title: '手动监听加载状态',
      code: `var isLoading by remember { mutableStateOf(false) }
var isError by remember { mutableStateOf(false) }

Box {
    AsyncImage(
        model = imageUrl,
        contentDescription = "产品图",
        modifier = Modifier.fillMaxWidth().height(200.dp),
        contentScale = ContentScale.Crop,
        onLoading = { isLoading = true },
        onSuccess = { isLoading = false },
        onError = {
            isLoading = false
            isError = true
        }
    )

    if (isLoading) {
        CircularProgressIndicator(
            modifier = Modifier.align(Alignment.Center)
        )
    }

    if (isError) {
        Text(
            text = "加载失败",
            modifier = Modifier.align(Alignment.Center),
            color = Color.Red
        )
    }
}`,
    },
    {
      title: '内存和磁盘缓存配置',
      code: `// Application 中配置 ImageLoader
class MyApp : Application(), ImageLoaderFactory {
    override fun newImageLoader(): ImageLoader {
        return ImageLoader.Builder(this)
            .memoryCache {
                MemoryCache.Builder(this)
                    .maxSizePercent(0.25)  // 使用 25% 的应用内存
                    .build()
            }
            .diskCache {
                DiskCache.Builder()
                    .directory(cacheDir.resolve("image_cache"))
                    .maxSizeBytes(512 * 1024 * 1024)  // 512MB
                    .build()
            }
            .respectCacheHeaders(false)  // 忽略服务器缓存头
            .build()
    }
}

// 使用时自动使用配置的 ImageLoader
AsyncImage(
    model = imageUrl,
    contentDescription = "缓存图片"
)`,
    },
    {
      title: '指定图片尺寸优化内存',
      code: `// 列表中的缩略图：指定目标尺寸减少内存占用
LazyColumn {
    items(imageUrls) { url ->
        AsyncImage(
            model = ImageRequest.Builder(LocalContext.current)
                .data(url)
                .size(300, 200)  // 限制解码尺寸
                .scale(Scale.FILL)
                .build(),
            contentDescription = null,
            contentScale = ContentScale.Crop,
            modifier = Modifier
                .fillMaxWidth()
                .height(200.dp)
        )
    }
}`,
    },
    {
      title: '预加载图片',
      code: `@Composable
fun PreloadImages(imageUrls: List<String>) {
    val context = LocalContext.current
    val imageLoader = context.imageLoader

    LaunchedEffect(imageUrls) {
        imageUrls.forEach { url ->
            val request = ImageRequest.Builder(context)
                .data(url)
                .build()
            imageLoader.enqueue(request)  // 预加载到缓存
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '图片网格相册',
      description: '在网格布局中高效加载大量图片',
      code: `@Composable
fun PhotoGrid(photos: List<Photo>) {
    LazyVerticalGrid(
        columns = GridCells.Fixed(3),
        horizontalArrangement = Arrangement.spacedBy(2.dp),
        verticalArrangement = Arrangement.spacedBy(2.dp)
    ) {
        items(photos) { photo ->
            AsyncImage(
                model = ImageRequest.Builder(LocalContext.current)
                    .data(photo.thumbnailUrl)
                    .size(400)  // 限制解码尺寸
                    .crossfade(200)
                    .build(),
                contentDescription = photo.description,
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .aspectRatio(1f)
                    .clickable { /* 打开大图 */ }
            )
        }
    }
}`
    },
    {
      title: '头像上传预览',
      description: '选择图片后预览，上传成功后显示网络图片',
      code: `@Composable
fun AvatarPicker(
    currentAvatarUrl: String?,
    onAvatarSelected: (Uri) -> Unit
) {
    var selectedImageUri by remember { mutableStateOf<Uri?>(null) }
    val launcher = rememberLauncherForActivityResult(
        ActivityResultContracts.GetContent()
    ) { uri ->
        uri?.let {
            selectedImageUri = it
            onAvatarSelected(it)
        }
    }

    Box(
        modifier = Modifier.size(120.dp),
        contentAlignment = Alignment.Center
    ) {
        AsyncImage(
            model = selectedImageUri ?: currentAvatarUrl,
            contentDescription = "用户头像",
            contentScale = ContentScale.Crop,
            placeholder = painterResource(R.drawable.default_avatar),
            modifier = Modifier
                .fillMaxSize()
                .clip(CircleShape)
                .border(2.dp, MaterialTheme.colorScheme.primary, CircleShape)
                .clickable { launcher.launch("image/*") }
        )

        Icon(
            imageVector = Icons.Default.CameraAlt,
            contentDescription = "更换头像",
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .size(32.dp)
                .background(MaterialTheme.colorScheme.primary, CircleShape)
                .padding(6.dp),
            tint = Color.White
        )
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 ImageRequest 指定目标尺寸',
      description: '在列表中加载图片时，指定 size() 限制解码尺寸以节省内存',
      goodExample: `AsyncImage(
    model = ImageRequest.Builder(context)
        .data(imageUrl)
        .size(400, 300)  // 限制解码尺寸
        .build(),
    contentDescription = null,
    modifier = Modifier.size(200.dp, 150.dp)
)`,
      badExample: `// 加载完整大图到内存，即使只显示小尺寸
AsyncImage(
    model = imageUrl,
    contentDescription = null,
    modifier = Modifier.size(200.dp, 150.dp)
)`
    },
    {
      title: '配置合理的缓存策略',
      description: '根据应用需求配置内存缓存和磁盘缓存大小',
      goodExample: `// Application 中配置
ImageLoader.Builder(context)
    .memoryCache {
        MemoryCache.Builder(context)
            .maxSizePercent(0.25)  // 使用 25% 内存
            .build()
    }
    .diskCache {
        DiskCache.Builder()
            .maxSizeBytes(512 * 1024 * 1024)  // 512MB
            .build()
    }
    .build()`,
      badExample: `// 使用默认配置，可能不适合应用需求
ImageLoader.Builder(context).build()`
    },
    {
      title: '为不同状态提供占位符',
      description: '使用 placeholder、error、fallback 提升用户体验',
      goodExample: `AsyncImage(
    model = imageUrl,
    contentDescription = null,
    placeholder = painterResource(R.drawable.placeholder),
    error = painterResource(R.drawable.error),
    fallback = painterResource(R.drawable.default)
)`,
      badExample: `// 加载失败时显示空白
AsyncImage(
    model = imageUrl,
    contentDescription = null
)`
    },
    {
      title: '使用 crossfade 增强视觉效果',
      description: '启用淡入动画使图片加载更平滑',
      goodExample: `AsyncImage(
    model = ImageRequest.Builder(context)
        .data(imageUrl)
        .crossfade(300)  // 300ms 淡入
        .build(),
    contentDescription = null
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Coil 3.x 与 2.x 的区别',
      content: 'Coil 3.x 包名从 io.coil-kt:coil-compose 变为 io.coil-kt.coil3:coil-compose，支持 Kotlin Multiplatform'
    },
    {
      type: 'info',
      title: '优先使用 AsyncImage 而非 rememberAsyncImagePainter',
      content: 'AsyncImage 是更高级的 API，内部处理了 painter 状态管理。只有需要完全自定义绘制时才使用 rememberAsyncImagePainter'
    },
    {
      type: 'info',
      title: '使用 SubcomposeAsyncImage 自定义加载状态',
      content: 'SubcomposeAsyncImage 允许根据加载状态（Loading/Success/Error）显示完全自定义的 UI，比 placeholder/error 参数更灵活'
    },
    {
      type: 'warning',
      title: '图片变换会增加内存和 CPU 开销',
      content: '每次应用变换（如模糊、圆角）都会创建新的 Bitmap。在列表中应避免复杂变换，或使用服务器端处理'
    },
    {
      type: 'warning',
      title: 'crossfade 持续时间不宜过长',
      content: '推荐 200-400ms。过长的淡入动画会让界面感觉迟缓，尤其在快速滚动的列表中'
    },
    {
      type: 'error',
      title: '列表中未指定尺寸会导致 OOM',
      content: '在 LazyColumn/LazyGrid 中加载图片时，务必使用 ImageRequest.Builder().size() 限制解码尺寸，否则可能加载原图导致内存溢出'
    },
  ],

  relatedComponents: ['image', 'icon', 'box', 'lazy-column'],
  since: '1.0.0',
}
