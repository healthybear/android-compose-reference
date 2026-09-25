import type { ComponentEntry } from '../../types'

export const boxComponent: ComponentEntry = {
  id: 'box',
  demo: { id: 'box', sourceFile: 'BoxDemo.kt' },
  name: 'Box',
  category: 'Layout',
  description: 'Box 是层叠布局容器，将子元素按 Z 轴顺序堆叠放置。后声明的元素会覆盖在先声明元素之上，类似 Android 的 FrameLayout。',
  tags: ['box', 'layout', 'stack', 'overlay', 'frame', 'z-index'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、内边距、背景等' },
    { name: 'contentAlignment', type: 'Alignment', default: 'Alignment.TopStart', description: '子元素默认对齐方式（TopStart/TopCenter/TopEnd/CenterStart/Center/CenterEnd/BottomStart/BottomCenter/BottomEnd）' },
    { name: 'propagateMinConstraints', type: 'Boolean', default: 'false', description: '是否将最小约束传递给子元素（true 时子元素会填满 Box）' },
    { name: 'content', type: '@Composable BoxScope.() -> Unit', required: true, description: '子元素内容，在 BoxScope 中可使用 align 和 matchParentSize 修饰符' },
  ],
  examples: [
    {
      title: '基础叠加布局',
      code: `Box(
    modifier = Modifier.size(100.dp),
    contentAlignment = Alignment.Center
) {
    // 背景
    Box(modifier = Modifier.fillMaxSize().background(Color.Blue))
    // 前景文字
    Text("居中", color = Color.White)
}`,
    },
    {
      title: '图片上叠加文本',
      code: `Box(modifier = Modifier.size(200.dp)) {
    Image(
        painter = painterResource(R.drawable.photo),
        contentDescription = null,
        modifier = Modifier.fillMaxSize(),
        contentScale = ContentScale.Crop
    )
    Text(
        text = "图片标题",
        modifier = Modifier
            .align(Alignment.BottomStart)
            .background(Color.Black.copy(alpha = 0.5f))
            .padding(8.dp),
        color = Color.White
    )
}`,
    },
    {
      title: '加载指示器覆盖层',
      code: `Box {
    // 主要内容
    LazyColumn(modifier = Modifier.fillMaxSize()) {
        items(items) { item ->
            Text(item.name)
        }
    }

    // 加载指示器（居中覆盖）
    if (isLoading) {
        CircularProgressIndicator(
            modifier = Modifier.align(Alignment.Center)
        )
    }
}`,
    },
    {
      title: '使用 matchParentSize',
      code: `Box(modifier = Modifier.size(100.dp)) {
    // 背景图片（匹配父容器尺寸）
    Image(
        painter = painterResource(R.drawable.bg),
        contentDescription = null,
        modifier = Modifier.matchParentSize(),
        contentScale = ContentScale.Crop
    )
    // 前景按钮（不影响 Box 尺寸）
    Button(
        onClick = { },
        modifier = Modifier.align(Alignment.Center)
    ) {
        Text("按钮")
    }
}`,
    },
    {
      title: '角标徽章',
      code: `Box {
    Icon(
        Icons.Default.Notifications,
        contentDescription = "通知",
        modifier = Modifier.size(24.dp)
    )
    // 右上角红点徽章
    Box(
        modifier = Modifier
            .size(8.dp)
            .align(Alignment.TopEnd)
            .background(Color.Red, CircleShape)
    )
}`,
    },
    {
      title: '多层叠加',
      code: `Box(modifier = Modifier.fillMaxSize()) {
    // 第一层：背景
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.LightGray)
    )

    // 第二层：内容
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("内容区域")
    }

    // 第三层：悬浮按钮
    FloatingActionButton(
        onClick = { },
        modifier = Modifier
            .align(Alignment.BottomEnd)
            .padding(16.dp)
    ) {
        Icon(Icons.Default.Add, contentDescription = "添加")
    }
}`,
    },
  ],

  useCases: [
    {
      title: '卡片内容带操作按钮',
      description: '使用 Box 实现卡片内容上叠加操作按钮的布局',
      code: `Card(modifier = Modifier.fillMaxWidth()) {
    Box {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text("卡片标题", style = MaterialTheme.typography.titleLarge)
            Spacer(Modifier.height(8.dp))
            Text("卡片内容描述...")
        }

        // 右上角菜单按钮
        IconButton(
            onClick = { showMenu = true },
            modifier = Modifier.align(Alignment.TopEnd)
        ) {
            Icon(Icons.Default.MoreVert, contentDescription = "更多")
        }
    }
}`
    },
    {
      title: '视频播放器控制层',
      description: '视频上叠加半透明控制栏',
      code: `Box(modifier = Modifier.fillMaxSize()) {
    // 视频播放器
    AndroidView(
        factory = { context ->
            VideoView(context).apply {
                setVideoURI(videoUri)
                start()
            }
        },
        modifier = Modifier.matchParentSize()
    )

    // 控制栏（底部半透明遮罩）
    Box(
        modifier = Modifier
            .align(Alignment.BottomCenter)
            .fillMaxWidth()
            .background(
                Brush.verticalGradient(
                    colors = listOf(Color.Transparent, Color.Black.copy(alpha = 0.7f))
                )
            )
            .padding(16.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = { togglePlayPause() }) {
                Icon(
                    if (isPlaying) Icons.Default.Pause else Icons.Default.PlayArrow,
                    contentDescription = if (isPlaying) "暂停" else "播放",
                    tint = Color.White
                )
            }
            Text(
                "$currentTime / $totalTime",
                color = Color.White
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 matchParentSize 而非 fillMaxSize',
      description: 'matchParentSize 不参与 Box 的尺寸测量，避免影响其他子元素',
      goodExample: `Box(modifier = Modifier.size(100.dp)) {
    // 背景不影响 Box 尺寸
    Image(
        painter = painterResource(R.drawable.bg),
        contentDescription = null,
        modifier = Modifier.matchParentSize()
    )
    Text("内容")
}`,
      badExample: `Box {
    // fillMaxSize 会让 Box 尺寸不确定
    Image(
        painter = painterResource(R.drawable.bg),
        contentDescription = null,
        modifier = Modifier.fillMaxSize()
    )
    Text("内容")
}`
    },
    {
      title: '明确指定 Box 的尺寸',
      description: 'Box 自身没有固定尺寸，需要通过 modifier 或父容器约束来确定大小',
      goodExample: `// 方式 1：直接指定尺寸
Box(modifier = Modifier.size(200.dp)) {
    Text("内容")
}

// 方式 2：填充父容器
Column(modifier = Modifier.fillMaxSize()) {
    Box(modifier = Modifier.fillMaxWidth().height(100.dp)) {
        Text("内容")
    }
}`,
      badExample: `// Box 没有尺寸约束，可能显示异常
Box {
    Text("内容")
}`
    },
    {
      title: '使用半透明遮罩提升可读性',
      description: '在图片上叠加文本时，使用半透明背景确保文本清晰可读',
      goodExample: `Box {
    Image(painter = painterResource(R.drawable.photo), contentDescription = null)
    Text(
        text = "文本",
        modifier = Modifier
            .background(Color.Black.copy(alpha = 0.5f))
            .padding(8.dp),
        color = Color.White
    )
}`,
    },
    {
      title: '控制子元素绘制顺序',
      description: '先声明的元素在下层，后声明的元素在上层',
      goodExample: `Box {
    // 1. 最底层：背景
    Box(Modifier.fillMaxSize().background(Color.Gray))
    // 2. 中间层：内容
    Text("内容")
    // 3. 最上层：按钮
    IconButton(onClick = { }, modifier = Modifier.align(Alignment.TopEnd)) {
        Icon(Icons.Default.Close, contentDescription = "关闭")
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'BoxScope 提供专属修饰符',
      content: 'Box 的 content 在 BoxScope 中执行，子元素可使用 Modifier.align() 单独设置对齐位置，使用 Modifier.matchParentSize() 匹配父容器尺寸而不影响测量'
    },
    {
      type: 'warning',
      title: '避免过度嵌套 Box',
      content: '多层 Box 嵌套会增加布局复杂度和性能开销。如果只是简单的背景和内容，考虑使用 Surface 或 Modifier.background'
    },
    {
      type: 'info',
      title: 'propagateMinConstraints 的用途',
      content: '设置为 true 时，Box 会强制所有子元素填满整个 Box，适用于需要所有子元素统一尺寸的场景'
    },
    {
      type: 'info',
      title: '使用 Box 实现居中布局',
      content: 'Box(contentAlignment = Alignment.Center) 是实现单个元素居中的最简单方式，比 Column/Row 更轻量'
    },
    {
      type: 'error',
      title: '注意点击事件遮挡',
      content: '上层元素会遮挡下层元素的点击事件。如需点击穿透，可使用 Modifier.pointerInput { } 或调整布局结构'
    },
  ],

  relatedComponents: ['column', 'row', 'surface', 'box-with-constraints', 'scaffold'],
  since: '1.0.0',
}
