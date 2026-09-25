import type { ComponentEntry } from '../../types'

export const modifierSizeComponent: ComponentEntry = {
  id: 'modifier-size',
  demo: { id: 'modifier-size', sourceFile: 'ModifierSizeDemo.kt' },
  name: 'Modifier.size',
  category: 'Modifier',
  description: 'Modifier.size 及相关修饰符用于控制组件尺寸，包括固定尺寸、填充父容器、尺寸范围限制等。是布局中最常用的 Modifier 之一。',
  tags: ['modifier', 'size', 'width', 'height', 'fillmaxsize', 'layout'],
  params: [
    { name: 'size(width, height)', type: 'Modifier', description: '同时设置宽高，size(100.dp) 表示正方形' },
    { name: 'width(dp)', type: 'Modifier', description: '设置固定宽度' },
    { name: 'height(dp)', type: 'Modifier', description: '设置固定高度' },
    { name: 'fillMaxSize(fraction)', type: 'Modifier', description: '填充父容器，fraction 默认 1f（100%）' },
    { name: 'fillMaxWidth(fraction)', type: 'Modifier', description: '填充父容器宽度' },
    { name: 'fillMaxHeight(fraction)', type: 'Modifier', description: '填充父容器高度' },
    { name: 'wrapContentSize(align, unbounded)', type: 'Modifier', description: '收缩到内容大小，align 控制对齐，unbounded 允许超出父容器' },
    { name: 'requiredSize(dp)', type: 'Modifier', description: '强制尺寸，忽略父容器约束（慎用）' },
    { name: 'widthIn(min, max)', type: 'Modifier', description: '限制宽度范围' },
    { name: 'heightIn(min, max)', type: 'Modifier', description: '限制高度范围' },
    { name: 'sizeIn(minWidth, minHeight, maxWidth, maxHeight)', type: 'Modifier', description: '限制宽高范围' },
    { name: 'defaultMinSize(minWidth, minHeight)', type: 'Modifier', description: '设置最小尺寸建议（可被子元素覆盖）' },
  ],
  examples: [
    {
      title: '固定尺寸',
      code: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    // 正方形
    Box(
        modifier = Modifier
            .size(100.dp)
            .background(Color.Blue)
    )

    // 矩形：单独设置宽高
    Box(
        modifier = Modifier
            .width(150.dp)
            .height(80.dp)
            .background(Color.Green)
    )

    // 矩形：size 指定宽高
    Box(
        modifier = Modifier
            .size(width = 200.dp, height = 60.dp)
            .background(Color.Red)
    )
}`,
    },
    {
      title: '填充父容器',
      code: `Box(modifier = Modifier.size(300.dp)) {
    // 填满整个父容器
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.LightGray)
    )

    // 填满宽度，高度固定
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(56.dp)
            .background(Color.Blue)
    )

    // 填满 50%
    Box(
        modifier = Modifier
            .fillMaxSize(0.5f)
            .background(Color.Red)
            .align(Alignment.Center)
    )
}`,
    },
    {
      title: '尺寸范围限制',
      code: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    // 最小 100dp，最大 300dp
    Box(
        modifier = Modifier
            .widthIn(min = 100.dp, max = 300.dp)
            .height(60.dp)
            .background(Color.Blue)
    )

    // 只限制最小宽度
    Box(
        modifier = Modifier
            .widthIn(min = 150.dp)
            .height(60.dp)
            .background(Color.Green)
    )

    // 综合限制
    Box(
        modifier = Modifier
            .sizeIn(
                minWidth = 100.dp,
                maxWidth = 400.dp,
                minHeight = 48.dp,
                maxHeight = 200.dp
            )
            .background(Color.Red)
    )
}`,
    },
    {
      title: 'wrapContentSize 用法',
      code: `// 子元素比父容器大时，收缩并居中
Box(
    modifier = Modifier
        .size(100.dp)
        .background(Color.LightGray)
) {
    Text(
        text = "很长的文本内容会超出父容器",
        modifier = Modifier.wrapContentSize(Alignment.Center)
    )
}

// unbounded = true 允许超出父容器
Box(
    modifier = Modifier
        .size(100.dp)
        .background(Color.LightGray)
) {
    Text(
        text = "超长文本",
        modifier = Modifier.wrapContentSize(
            align = Alignment.TopStart,
            unbounded = true
        )
    )
}`,
    },
    {
      title: 'requiredSize 强制尺寸',
      code: `Row(
    modifier = Modifier.width(200.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp)
) {
    // 普通 size：受父容器约束
    Box(
        modifier = Modifier
            .weight(1f)
            .size(150.dp)  // 实际会被压缩
            .background(Color.Blue)
    )

    // requiredSize：忽略父约束，强制 150dp
    Box(
        modifier = Modifier
            .requiredSize(150.dp)  // 可能超出父容器
            .background(Color.Red)
    )
}`,
    },
    {
      title: 'defaultMinSize 最小尺寸建议',
      code: `@Composable
fun MinimumTouchTarget(
    onClick: () -> Unit,
    content: @Composable () -> Unit
) {
    Box(
        modifier = Modifier
            .defaultMinSize(minWidth = 48.dp, minHeight = 48.dp)
            .clickable(onClick = onClick),
        contentAlignment = Alignment.Center
    ) {
        content()
    }
}

// 使用
MinimumTouchTarget(onClick = { }) {
    Icon(Icons.Default.Close, contentDescription = "关闭")
}`,
    },
  ],

  useCases: [
    {
      title: '响应式布局',
      description: '根据屏幕宽度动态调整组件尺寸',
      code: `@Composable
fun ResponsiveCard() {
    val configuration = LocalConfiguration.current
    val cardWidth = when {
        configuration.screenWidthDp >= 600 -> 400.dp
        else -> configuration.screenWidthDp.dp - 32.dp
    }

    Card(
        modifier = Modifier
            .width(cardWidth)
            .height(200.dp)
    ) {
        CardContent()
    }
}`
    },
    {
      title: '固定宽高比',
      description: '使用 aspectRatio 保持固定比例',
      code: `@Composable
fun VideoThumbnail(imageUrl: String) {
    AsyncImage(
        model = imageUrl,
        contentDescription = "视频缩略图",
        modifier = Modifier
            .fillMaxWidth()
            .aspectRatio(16f / 9f),  // 16:9 宽高比
        contentScale = ContentScale.Crop
    )
}`
    },
  ],

  bestPractices: [
    {
      title: 'fillMaxSize 需要父容器有明确尺寸',
      description: '父容器必须有尺寸约束，否则 fillMaxSize 无效',
      goodExample: `Box(modifier = Modifier.size(200.dp)) {
    Box(modifier = Modifier.fillMaxSize()) {
        // 正常填充 200dp x 200dp
    }
}`,
      badExample: `Box {
    Box(modifier = Modifier.fillMaxSize()) {
        // 父容器无尺寸，fillMaxSize 无效
    }
}`
    },
    {
      title: '避免过度使用 requiredSize',
      description: 'requiredSize 会忽略父约束，可能导致布局溢出',
      goodExample: `// 使用普通 size 尊重父约束
Box(
    modifier = Modifier
        .size(100.dp)
        .background(Color.Blue)
)`,
      badExample: `// requiredSize 可能超出父容器，破坏布局
Box(modifier = Modifier.width(50.dp)) {
    Box(
        modifier = Modifier
            .requiredSize(100.dp)  // 超出父容器 50dp
            .background(Color.Blue)
    )
}`
    },
    {
      title: '使用 widthIn/heightIn 而非条件判断',
      description: '尺寸范围限制比手动计算更简洁',
      goodExample: `Box(
    modifier = Modifier
        .widthIn(min = 100.dp, max = 300.dp)
        .height(60.dp)
)`,
      badExample: `val width = min(max(actualWidth, 100.dp), 300.dp)
Box(
    modifier = Modifier
        .width(width)
        .height(60.dp)
)`
    },
    {
      title: 'size 在 padding 之前',
      description: 'size 应在 padding 之前，否则 padding 会挤压内容',
      goodExample: `Box(
    modifier = Modifier
        .size(100.dp)
        .padding(16.dp)  // 内容区域 68dp x 68dp
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'fillMax* 是相对于父容器的',
      content: 'fillMaxSize/Width/Height 根据父容器的约束填充，而不是屏幕尺寸。要填充整个屏幕，确保父容器链一直到根都有尺寸'
    },
    {
      type: 'warning',
      title: 'size 在某些 Scope 中不可用',
      content: '在 RowScope 中使用 width 可能导致冲突（weight 优先）。在 BoxScope 中 size 影响对齐'
    },
    {
      type: 'info',
      title: '使用 aspectRatio 保持比例',
      content: 'Modifier.aspectRatio(16f / 9f) 可以根据一个维度自动计算另一个维度，常用于图片和视频'
    },
    {
      type: 'info',
      title: 'defaultMinSize 用于无障碍',
      content: 'defaultMinSize(48.dp, 48.dp) 确保可点击元素满足最小触摸目标尺寸，提升无障碍性'
    },
    {
      type: 'error',
      title: 'requiredSize 破坏布局层级',
      content: 'requiredSize 忽略父约束，可能导致内容超出父容器或屏幕边界。仅在明确需要时使用'
    },
  ],

  relatedComponents: ['modifier-padding', 'modifier-offset', 'box', 'spacer'],
  since: '1.0.0',
}
