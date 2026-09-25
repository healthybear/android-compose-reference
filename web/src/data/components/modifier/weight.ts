import type { ComponentEntry } from '../../types'

export const modifierWeightComponent: ComponentEntry = {
  id: 'modifier-weight',
  demo: { id: 'modifier-weight', sourceFile: 'ModifierWeightDemo.kt' },
  name: 'Modifier.weight',
  category: 'Modifier',
  description: 'Modifier.weight 用于在 Row/Column 中按权重分配剩余空间。子元素根据权重值按比例占用父容器的可用空间，是实现弹性布局的关键修饰符。',
  tags: ['modifier', 'weight', 'flex', 'layout', 'space'],
  params: [
    { name: 'weight', type: 'Float', required: true, description: '权重值，决定占用空间的比例。weight(1f) 表示权重为 1' },
    { name: 'fill', type: 'Boolean', default: 'true', description: '是否填充分配的空间。true 时强制填充，false 时最多占用分配的空间' },
  ],
  examples: [
    {
      title: '基础权重分配',
      code: `Row(
    modifier = Modifier
        .fillMaxWidth()
        .height(100.dp)
) {
    Box(
        modifier = Modifier
            .weight(1f)
            .fillMaxHeight()
            .background(Color.Red)
    )

    Box(
        modifier = Modifier
            .weight(1f)
            .fillMaxHeight()
            .background(Color.Blue)
    )
}`,
    },
    {
      title: '不同权重比例',
      code: `Row(
    modifier = Modifier
        .fillMaxWidth()
        .height(100.dp)
) {
    // 占 1/4
    Box(
        modifier = Modifier
            .weight(1f)
            .fillMaxHeight()
            .background(Color.Red)
    )

    // 占 3/4
    Box(
        modifier = Modifier
            .weight(3f)
            .fillMaxHeight()
            .background(Color.Blue)
    )
}`,
    },
    {
      title: '权重 + 固定尺寸混用',
      code: `Row(
    modifier = Modifier
        .fillMaxWidth()
        .height(100.dp)
) {
    // 固定宽度 80dp
    Box(
        modifier = Modifier
            .width(80.dp)
            .fillMaxHeight()
            .background(Color.Red)
    )

    // 占据剩余空间
    Box(
        modifier = Modifier
            .weight(1f)
            .fillMaxHeight()
            .background(Color.Blue)
    )

    // 固定宽度 60dp
    Box(
        modifier = Modifier
            .width(60.dp)
            .fillMaxHeight()
            .background(Color.Green)
    )
}`,
    },
    {
      title: 'fill = false（不强制填充）',
      code: `Row(
    modifier = Modifier
        .fillMaxWidth()
        .height(100.dp)
        .border(1.dp, Color.Gray)
) {
    // fill = true（默认），强制填充分配的空间
    Box(
        modifier = Modifier
            .weight(1f, fill = true)
            .height(50.dp)
            .background(Color.Red)
    )

    Spacer(Modifier.width(8.dp))

    // fill = false，最多占用分配的空间，但不强制填充
    Box(
        modifier = Modifier
            .weight(1f, fill = false)
            .height(50.dp)
            .background(Color.Blue)
    )
}`,
    },
    {
      title: 'Column 中的垂直权重',
      code: `Column(
    modifier = Modifier
        .fillMaxSize()
        .padding(16.dp)
) {
    // 顶部固定高度
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(60.dp)
            .background(Color.Red)
    )

    Spacer(Modifier.height(8.dp))

    // 中间占据剩余空间
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .weight(1f)
            .background(Color.Blue)
    )

    Spacer(Modifier.height(8.dp))

    // 底部固定高度
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(60.dp)
            .background(Color.Green)
    )
}`,
    },
    {
      title: '多权重复杂布局',
      code: `Column(
    modifier = Modifier.fillMaxSize()
) {
    // 顶部占 1/3
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .weight(1f)
            .background(Color.Red)
    )

    // 中间占 2/3
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .weight(2f)
    ) {
        // 左侧占 1/3
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxHeight()
                .background(Color.Blue)
        )

        // 右侧占 2/3
        Box(
            modifier = Modifier
                .weight(2f)
                .fillMaxHeight()
                .background(Color.Green)
        )
    }
}`,
    },
    {
      title: '表单布局（标签 + 输入框）',
      code: `Column(
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp)
) {
    // 姓名
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            "姓名：",
            modifier = Modifier.width(80.dp)
        )
        OutlinedTextField(
            value = name,
            onValueChange = { name = it },
            modifier = Modifier.weight(1f)
        )
    }

    // 手机
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            "手机：",
            modifier = Modifier.width(80.dp)
        )
        OutlinedTextField(
            value = phone,
            onValueChange = { phone = it },
            modifier = Modifier.weight(1f)
        )
    }
}`,
    },
  ],

  useCases: [
    {
      title: 'Scaffold 式布局',
      description: '顶部/底部固定，中间内容区域自适应',
      code: `Column(modifier = Modifier.fillMaxSize()) {
    // 顶部 TopAppBar（固定高度）
    TopAppBar(
        title = { Text("标题") }
    )

    // 中间内容区域（占据剩余空间）
    LazyColumn(
        modifier = Modifier
            .fillMaxWidth()
            .weight(1f)
    ) {
        items(100) { index ->
            ListItem(
                headlineContent = { Text("Item $index") }
            )
        }
    }

    // 底部操作栏（固定高度）
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        OutlinedButton(
            onClick = { },
            modifier = Modifier.weight(1f)
        ) {
            Text("取消")
        }

        Button(
            onClick = { },
            modifier = Modifier.weight(1f)
        ) {
            Text("确定")
        }
    }
}`
    },
    {
      title: '左右分栏布局',
      description: '侧边栏 + 主内容区',
      code: `Row(modifier = Modifier.fillMaxSize()) {
    // 左侧导航栏（固定宽度或占 1/4）
    NavigationRail(
        modifier = Modifier
            .width(80.dp)
            .fillMaxHeight()
    ) {
        // 导航项
    }

    // 右侧主内容区（占据剩余空间）
    Box(
        modifier = Modifier
            .weight(1f)
            .fillMaxHeight()
            .background(MaterialTheme.colorScheme.background)
    ) {
        // 主内容
        Content()
    }
}`
    },
  ],

  bestPractices: [
    {
      title: 'weight 只在 Row/Column 中有效',
      description: 'weight 修饰符只能用于 RowScope 和 ColumnScope',
      goodExample: `Row {
    Box(Modifier.weight(1f))
}

Column {
    Box(Modifier.weight(1f))
}`,
      badExample: `Box {
    Box(Modifier.weight(1f))  // 无效，Box 不支持 weight
}`
    },
    {
      title: '权重是相对比例',
      description: '权重值是相对的，weight(1f) 和 weight(2f) 的比例是 1:2',
      goodExample: `Row {
    Box(Modifier.weight(1f))  // 占 1/3
    Box(Modifier.weight(2f))  // 占 2/3
}`,
    },
    {
      title: '固定尺寸 + 权重混用',
      description: '固定尺寸先占用空间，权重分配剩余空间',
      goodExample: `Row(Modifier.fillMaxWidth()) {
    Box(Modifier.width(100.dp))  // 固定 100dp
    Box(Modifier.weight(1f))     // 占据剩余空间
    Box(Modifier.width(80.dp))   // 固定 80dp
}`,
    },
    {
      title: '使用 weight(1f) 让组件占满剩余空间',
      description: '单个 weight(1f) 可以让组件占据所有剩余空间',
      goodExample: `Column(Modifier.fillMaxSize()) {
    TopBar()                      // 固定高度
    Content(Modifier.weight(1f))  // 占满剩余高度
    BottomBar()                   // 固定高度
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'weight 分配剩余空间',
      content: 'weight 只分配剩余空间。固定尺寸的子元素先占用空间，然后权重元素按比例分配剩余部分'
    },
    {
      type: 'warning',
      title: 'weight 必须配合 Row/Column 使用',
      content: 'weight 只在 RowScope 和 ColumnScope 中有效，在 Box 等其他布局中无效'
    },
    {
      type: 'info',
      title: 'fill 参数控制填充行为',
      content: 'fill = true（默认）强制填充分配的空间；fill = false 时最多占用分配的空间，但不强制填充'
    },
    {
      type: 'info',
      title: '权重值可以是任意正数',
      content: 'weight 值不必是整数，可以是 0.5f、1.5f 等。关键是相对比例，weight(2f) 和 weight(4f) 效果等同于 weight(1f) 和 weight(2f)'
    },
    {
      type: 'error',
      title: '避免所有子元素都使用固定尺寸',
      content: '如果所有子元素都使用固定尺寸（无 weight），可能导致内容溢出或空间浪费。至少一个子元素应使用 weight 来适应不同屏幕尺寸'
    },
  ],

  relatedComponents: ['row', 'column', 'modifier-size'],
  since: '1.0.0',
}
