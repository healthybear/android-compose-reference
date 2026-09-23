import type { ComponentEntry } from '../../types'

export const imageComponent: ComponentEntry = {
  id: 'image',
  demo: { id: 'image', sourceFile: 'ImageDemo.kt' },
  name: 'Image',
  category: 'Foundation',
  description: 'Image 是 Compose 中显示图片的基础组件，支持本地资源（Drawable）、位图（Bitmap）、矢量图（ImageVector）等多种来源。提供灵活的缩放、裁剪和滤镜功能。',
  tags: ['image', 'picture', 'bitmap', 'drawable', 'icon', 'photo'],
  params: [
    { name: 'painter', type: 'Painter', required: true, description: '图片来源，使用 painterResource()/rememberImagePainter() 等创建' },
    { name: 'contentDescription', type: 'String?', required: true, description: '无障碍描述，装饰性图片传 null' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、形状等' },
    { name: 'alignment', type: 'Alignment', default: 'Alignment.Center', description: '图片在容器中的对齐方式' },
    { name: 'contentScale', type: 'ContentScale', default: 'ContentScale.Fit', description: '图片缩放方式（Fit/Crop/FillWidth/FillHeight/Inside/None）' },
    { name: 'alpha', type: 'Float', default: '1.0f', description: '透明度 0f-1f' },
    { name: 'colorFilter', type: 'ColorFilter?', default: 'null', description: '颜色滤镜，用于着色或混合模式' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `Image(
    painter = painterResource(R.drawable.ic_logo),
    contentDescription = "应用 Logo",
    modifier = Modifier.size(80.dp)
)`,
    },
    {
      title: '不同缩放模式',
      code: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    // Fit：完整显示，保持宽高比
    Image(
        painter = painterResource(R.drawable.photo),
        contentDescription = null,
        contentScale = ContentScale.Fit,
        modifier = Modifier.size(200.dp, 100.dp)
    )

    // Crop：填满容器，裁剪超出部分
    Image(
        painter = painterResource(R.drawable.photo),
        contentDescription = null,
        contentScale = ContentScale.Crop,
        modifier = Modifier.size(200.dp, 100.dp)
    )

    // FillWidth：宽度填满，高度按比例
    Image(
        painter = painterResource(R.drawable.photo),
        contentDescription = null,
        contentScale = ContentScale.FillWidth,
        modifier = Modifier.width(200.dp)
    )
}`,
    },
    {
      title: '圆形头像',
      code: `Image(
    painter = painterResource(R.drawable.avatar),
    contentDescription = "用户头像",
    contentScale = ContentScale.Crop,
    modifier = Modifier
        .size(56.dp)
        .clip(CircleShape)
        .border(2.dp, MaterialTheme.colorScheme.primary, CircleShape)
)`,
    },
    {
      title: '圆角图片',
      code: `Image(
    painter = painterResource(R.drawable.banner),
    contentDescription = "横幅图片",
    contentScale = ContentScale.Crop,
    modifier = Modifier
        .fillMaxWidth()
        .height(200.dp)
        .clip(RoundedCornerShape(12.dp))
)`,
    },
    {
      title: '矢量图标着色',
      code: `Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    // 使用 ImageVector
    Image(
        imageVector = Icons.Default.Favorite,
        contentDescription = "收藏",
        colorFilter = ColorFilter.tint(Color.Red),
        modifier = Modifier.size(24.dp)
    )

    // 使用主题色
    Image(
        imageVector = Icons.Default.Star,
        contentDescription = "星标",
        colorFilter = ColorFilter.tint(MaterialTheme.colorScheme.primary),
        modifier = Modifier.size(24.dp)
    )
}`,
    },
    {
      title: '半透明遮罩',
      code: `Box {
    Image(
        painter = painterResource(R.drawable.background),
        contentDescription = null,
        contentScale = ContentScale.Crop,
        alpha = 0.3f,
        modifier = Modifier.fillMaxSize()
    )

    Text(
        text = "前景文字",
        style = MaterialTheme.typography.headlineLarge,
        modifier = Modifier.align(Alignment.Center)
    )
}`,
    },
  ],

  useCases: [
    {
      title: '加载网络图片（使用 Coil）',
      description: '结合 Coil 库加载网络图片',
      code: `// 添加依赖：implementation("io.coil-kt:coil-compose:2.4.0")

@Composable
fun NetworkImage(imageUrl: String) {
    AsyncImage(
        model = ImageRequest.Builder(LocalContext.current)
            .data(imageUrl)
            .crossfade(true)
            .build(),
        contentDescription = "网络图片",
        contentScale = ContentScale.Crop,
        modifier = Modifier
            .fillMaxWidth()
            .height(200.dp)
            .clip(RoundedCornerShape(8.dp))
    )
}`
    },
    {
      title: '图片占位符和错误处理',
      description: '加载时显示占位符，失败时显示错误图',
      code: `AsyncImage(
    model = ImageRequest.Builder(LocalContext.current)
        .data(imageUrl)
        .placeholder(R.drawable.placeholder)
        .error(R.drawable.error)
        .build(),
    contentDescription = "商品图片",
    contentScale = ContentScale.Crop,
    modifier = Modifier
        .size(120.dp)
        .clip(RoundedCornerShape(8.dp))
)`
    },
  ],

  bestPractices: [
    {
      title: '为 contentDescription 提供有意义的描述',
      description: '装饰性图片传 null，功能性图片提供清晰描述',
      goodExample: `// 功能性图片
Image(
    painter = painterResource(R.drawable.user_avatar),
    contentDescription = "张三的头像"
)

// 装饰性图片
Image(
    painter = painterResource(R.drawable.decoration),
    contentDescription = null
)`,
      badExample: `// 含糊的描述
Image(
    painter = painterResource(R.drawable.user_avatar),
    contentDescription = "图片"
)`
    },
    {
      title: '使用 ContentScale.Crop 避免拉伸',
      description: '需要填满容器时使用 Crop 而非 FillBounds',
      goodExample: `Image(
    painter = painterResource(R.drawable.photo),
    contentDescription = null,
    contentScale = ContentScale.Crop,  // 保持宽高比
    modifier = Modifier.size(100.dp)
)`,
      badExample: `Image(
    painter = painterResource(R.drawable.photo),
    contentDescription = null,
    contentScale = ContentScale.FillBounds,  // 可能拉伸变形
    modifier = Modifier.size(100.dp)
)`
    },
    {
      title: '限制图片尺寸',
      description: '明确指定尺寸，避免大图占用过多内存',
      goodExample: `Image(
    painter = painterResource(R.drawable.large_photo),
    contentDescription = null,
    modifier = Modifier.size(200.dp)  // 明确尺寸
)`,
      badExample: `Image(
    painter = painterResource(R.drawable.large_photo),
    contentDescription = null
    // 未指定尺寸，可能加载完整大图
)`
    },
    {
      title: '使用 Icon 而非 Image 显示图标',
      description: 'Icon 组件提供更好的主题色适配',
      goodExample: `Icon(
    imageVector = Icons.Default.Settings,
    contentDescription = "设置"
)`,
      badExample: `Image(
    imageVector = Icons.Default.Settings,
    contentDescription = "设置"
)`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Image vs Icon',
      content: 'Image 用于显示照片、插图等内容图片；Icon 用于显示矢量图标，自动适配主题色和尺寸'
    },
    {
      type: 'warning',
      title: 'Image 不缓存网络图片',
      content: 'Image 本身不支持网络图片。需要网络图片加载，使用 Coil、Glide 等库提供的 AsyncImage'
    },
    {
      type: 'tip',
      title: 'ContentScale 选择指南',
      content: 'Fit - 完整显示；Crop - 填满裁剪；FillWidth/Height - 单边填满；Inside - 不放大；None - 原始尺寸'
    },
    {
      type: 'tip',
      title: '使用 ColorFilter.tint 着色',
      content: 'ColorFilter.tint(color) 可以为矢量图标或单色图片着色，常用于图标适配主题'
    },
    {
      type: 'danger',
      title: '避免在列表中加载大图',
      content: 'LazyColumn 中的图片应使用缩略图或指定合理尺寸，避免内存溢出和卡顿'
    },
  ],

  relatedComponents: ['icon', 'box'],
  since: '1.0.0',
}
