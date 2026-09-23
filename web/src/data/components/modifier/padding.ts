import type { ComponentEntry } from '../../types'

export const modifierPaddingComponent: ComponentEntry = {
  id: 'modifier-padding',
  demo: { id: 'modifier-padding', sourceFile: 'ModifierPaddingDemo.kt' },
  name: 'Modifier.padding',
  category: 'Modifier',
  description: 'Modifier.padding 为组件添加内边距，在组件内容与边界之间创建空白空间。支持四边统一、水平/垂直方向、或各边单独设置。padding 的位置在 Modifier 链中很重要。',
  tags: ['modifier', 'padding', 'spacing', 'inset', 'layout'],
  params: [
    { name: 'all', type: 'Dp', description: '四边统一内边距，padding(16.dp)' },
    { name: 'horizontal', type: 'Dp', description: '左右（start/end）统一内边距' },
    { name: 'vertical', type: 'Dp', description: '上下（top/bottom）统一内边距' },
    { name: 'start', type: 'Dp', default: '0.dp', description: '起始边（LTR 为左，RTL 为右）内边距' },
    { name: 'top', type: 'Dp', default: '0.dp', description: '顶部内边距' },
    { name: 'end', type: 'Dp', default: '0.dp', description: '结束边（LTR 为右，RTL 为左）内边距' },
    { name: 'bottom', type: 'Dp', default: '0.dp', description: '底部内边距' },
    { name: 'paddingValues', type: 'PaddingValues', description: '传入 PaddingValues 对象，用于复用 Scaffold 等提供的 padding' },
  ],
  examples: [
    {
      title: '四边统一内边距',
      code: `Text(
    text = "四周 16dp 内边距",
    modifier = Modifier
        .background(Color.LightGray)
        .padding(16.dp)
        .background(Color.Yellow)
)`,
    },
    {
      title: '水平和垂直内边距',
      code: `Text(
    text = "水平 24dp，垂直 8dp",
    modifier = Modifier
        .background(Color.LightGray)
        .padding(horizontal = 24.dp, vertical = 8.dp)
        .background(Color.Yellow)
)`,
    },
    {
      title: '各边单独设置',
      code: `Text(
    text = "上 8dp，下 16dp，左右 12dp",
    modifier = Modifier
        .background(Color.LightGray)
        .padding(
            start = 12.dp,
            top = 8.dp,
            end = 12.dp,
            bottom = 16.dp
        )
        .background(Color.Yellow)
)`,
    },
    {
      title: 'padding 顺序的影响',
      code: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    // padding 在 background 之前：内边距在背景内部
    Text(
        "Padding 在前",
        modifier = Modifier
            .padding(16.dp)
            .background(Color.Blue)
    )

    // background 在 padding 之前：内边距在背景外部
    Text(
        "Background 在前",
        modifier = Modifier
            .background(Color.Blue)
            .padding(16.dp)
    )
}`,
    },
    {
      title: '使用 PaddingValues',
      code: `@Composable
fun ContentWithScaffoldPadding() {
    Scaffold { paddingValues ->
        // 应用 Scaffold 提供的 padding
        LazyColumn(
            modifier = Modifier.padding(paddingValues)
        ) {
            items(100) { index ->
                Text("Item $index")
            }
        }
    }
}`,
    },
    {
      title: '多层嵌套 padding',
      code: `Box(
    modifier = Modifier
        .background(Color.Red)
        .padding(16.dp)
        .background(Color.Green)
        .padding(8.dp)
        .background(Color.Blue)
) {
    Text("多层内边距", color = Color.White)
}`,
    },
  ],

  useCases: [
    {
      title: '卡片内容布局',
      description: '使用 padding 为卡片内容创建呼吸空间',
      code: `Card(
    modifier = Modifier.fillMaxWidth()
) {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text(
            "卡片标题",
            style = MaterialTheme.typography.titleLarge
        )
        Text(
            "卡片内容描述，使用 padding 确保内容不会紧贴边缘。",
            style = MaterialTheme.typography.bodyMedium
        )
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.End
        ) {
            TextButton(onClick = { }) { Text("取消") }
            TextButton(onClick = { }) { Text("确认") }
        }
    }
}`
    },
    {
      title: '列表项间距',
      description: '为列表项添加内边距，而不是使用 Spacer',
      code: `LazyColumn {
    items(items) { item ->
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clickable { onItemClick(item) }
                .padding(horizontal = 16.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(item.icon, contentDescription = null)
            Spacer(Modifier.width(12.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(item.title, style = MaterialTheme.typography.bodyLarge)
                Text(item.subtitle, style = MaterialTheme.typography.bodySmall)
            }
        }
        HorizontalDivider()
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '注意 Modifier 顺序',
      description: 'padding 相对于 background、border、clickable 的位置决定效果',
      goodExample: `// 点击区域包含内边距
Box(
    modifier = Modifier
        .clickable { }
        .padding(16.dp)
) {
    Text("内容")
}`,
      badExample: `// 点击区域不包含内边距，边缘难以点击
Box(
    modifier = Modifier
        .padding(16.dp)
        .clickable { }
) {
    Text("内容")
}`
    },
    {
      title: '使用 start/end 而非 left/right',
      description: '确保 RTL 布局下正确镜像',
      goodExample: `Text(
    "内容",
    modifier = Modifier.padding(start = 16.dp, end = 16.dp)
)`,
      badExample: `// RTL 语言下不会镜像
Text(
    "内容",
    modifier = Modifier.padding(left = 16.dp, right = 16.dp)
)`
    },
    {
      title: '避免过度嵌套 padding',
      description: '合并相邻的 padding，提高可读性',
      goodExample: `Box(
    modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
) {
    Text("内容")
}`,
      badExample: `Box(
    modifier = Modifier
        .padding(horizontal = 16.dp)
        .padding(vertical = 8.dp)
) {
    Text("内容")
}`
    },
    {
      title: '使用 PaddingValues 传递 Scaffold padding',
      description: '确保内容不被 TopAppBar/BottomBar 遮挡',
      goodExample: `Scaffold { paddingValues ->
    LazyColumn(
        modifier = Modifier.padding(paddingValues)
    ) {
        items(list) { Text(it) }
    }
}`,
      badExample: `Scaffold { paddingValues ->
    // 内容被 AppBar 遮挡
    LazyColumn {
        items(list) { Text(it) }
    }
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'padding 增加组件尺寸',
      content: 'padding 会增加组件的测量尺寸。例如 Box(Modifier.size(100.dp).padding(16.dp)) 的实际尺寸仍为 100dp，内容区域为 68dp x 68dp'
    },
    {
      type: 'warning',
      title: 'padding 在 size 之后无效',
      content: 'Modifier.size(100.dp).padding(16.dp) 中，padding 不会影响外部尺寸，只会压缩内部空间。padding 应在 size 之前'
    },
    {
      type: 'tip',
      title: '使用 padding 而非 Spacer 更简洁',
      content: '单个组件周围的空白用 padding 比 Spacer 更简洁。Spacer 适合动态间距或 weight 场景'
    },
    {
      type: 'tip',
      title: 'PaddingValues 可以解构',
      content: 'val (start, top, end, bottom) = paddingValues.calculateLeftPadding/Top/Right/Bottom(layoutDirection)'
    },
    {
      type: 'danger',
      title: '注意与 clickable 的交互',
      content: 'clickable 放在 padding 之前，点击区域包含 padding；放在之后，点击区域不含 padding。根据需求选择顺序'
    },
  ],

  relatedComponents: ['modifier-size', 'modifier-offset', 'spacer', 'box'],
  since: '1.0.0',
}
