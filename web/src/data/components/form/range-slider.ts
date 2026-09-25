import type { ComponentEntry } from '../../types'

export const rangeSliderComponent: ComponentEntry = {
  id: 'range-slider',
  demo: { id: 'range-slider', sourceFile: 'RangeSliderDemo.kt' },
  name: 'RangeSlider',
  category: 'Form',
  description: '范围滑动条，同时选择一个范围的起始值和结束值。',
  tags: ['rangeslider', 'slider', 'form', 'range', 'interval'],
  params: [
    { name: 'value', type: 'ClosedFloatingPointRange<Float>', required: true, description: '当前范围值' },
    { name: 'onValueChange', type: '(ClosedFloatingPointRange<Float>) -> Unit', required: true, description: '范围变化回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'valueRange', type: 'ClosedFloatingPointRange<Float>', default: '0f..1f', description: '可选范围' },
    { name: 'steps', type: 'Int', default: '0', description: '离散步数' },
  ],
  examples: [
    {
      title: '价格区间筛选',
      code: `var priceRange by remember { mutableStateOf(100f..500f) }

Column(modifier = Modifier.padding(16.dp)) {
    Text(
        text = "价格范围",
        style = MaterialTheme.typography.titleMedium,
        modifier = Modifier.padding(bottom = 8.dp)
    )

    RangeSlider(
        value = priceRange,
        onValueChange = { priceRange = it },
        valueRange = 0f..1000f,
        modifier = Modifier.fillMaxWidth()
    )

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text("¥100")
        Text("¥500")
    }
}`,
    },
    {
      title: '年龄范围选择',
      code: `var ageRange by remember { mutableStateOf(25f..45f) }

Column(modifier = Modifier.padding(16.dp)) {
    Text(
        text = "年龄：25 - 45 岁",
        style = MaterialTheme.typography.bodyLarge
    )

    RangeSlider(
        value = ageRange,
        onValueChange = { ageRange = it },
        valueRange = 18f..65f,
        steps = 46,  // 18-65 之间有 47 个整数值，steps = 46
        modifier = Modifier.fillMaxWidth()
    )
}`,
    },
    {
      title: '时间段选择（小时）',
      code: `var timeRange by remember { mutableStateOf(9f..17f) }

Column(modifier = Modifier.padding(16.dp)) {
    Text("工作时间", style = MaterialTheme.typography.titleMedium)

    Spacer(Modifier.height(16.dp))

    RangeSlider(
        value = timeRange,
        onValueChange = { timeRange = it },
        valueRange = 0f..24f,
        steps = 23,
        modifier = Modifier.fillMaxWidth()
    )

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text("9:00")
        Text("17:00")
    }
}`,
    },
    {
      title: '离散步进值',
      code: `var rangeValue by remember { mutableStateOf(20f..60f) }

Column(modifier = Modifier.padding(16.dp)) {
    Text("数值范围：20 - 60")

    RangeSlider(
        value = rangeValue,
        onValueChange = { rangeValue = it },
        valueRange = 0f..100f,
        steps = 9,  // 0, 10, 20, ..., 100 共11个点，steps = 9
        modifier = Modifier.fillMaxWidth()
    )

    // 显示所有步进点
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        for (i in 0..10) {
            Text(
                text = (i * 10).toString(),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}`,
    },
    {
      title: '自定义颜色',
      code: `var range by remember { mutableStateOf(0.3f..0.7f) }

Column(modifier = Modifier.padding(16.dp)) {
    RangeSlider(
        value = range,
        onValueChange = { range = it },
        valueRange = 0f..1f,
        colors = SliderDefaults.colors(
            thumbColor = MaterialTheme.colorScheme.primary,
            activeTrackColor = MaterialTheme.colorScheme.primary,
            inactiveTrackColor = MaterialTheme.colorScheme.surfaceVariant
        ),
        modifier = Modifier.fillMaxWidth()
    )

    Text(
        text = "30.0% - 70.0%",
        style = MaterialTheme.typography.bodyMedium
    )
}`,
    },
    {
      title: '带标签的范围选择',
      code: `var sizeRange by remember { mutableStateOf(38f..42f) }
val sizeLabels = listOf("XS", "S", "M", "L", "XL", "XXL")

Column(modifier = Modifier.padding(16.dp)) {
    Text(
        text = "尺码范围",
        style = MaterialTheme.typography.titleMedium,
        modifier = Modifier.padding(bottom = 8.dp)
    )

    RangeSlider(
        value = sizeRange,
        onValueChange = { sizeRange = it },
        valueRange = 36f..46f,
        steps = 9,
        modifier = Modifier.fillMaxWidth()
    )

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text("码数 38")
        Text("码数 42")
    }
}`,
    },
  ],

  useCases: [
    {
      title: '商品筛选面板',
      description: '电商应用中的价格和属性范围筛选',
      code: `@Composable
fun ProductFilterPanel(
    priceRange: ClosedFloatingPointRange<Float>,
    onPriceRangeChange: (ClosedFloatingPointRange<Float>) -> Unit,
    discountRange: ClosedFloatingPointRange<Float>,
    onDiscountRangeChange: (ClosedFloatingPointRange<Float>) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        // 价格筛选
        Text(
            text = "价格范围",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        RangeSlider(
            value = priceRange,
            onValueChange = onPriceRangeChange,
            valueRange = 0f..5000f,
            steps = 49,
            modifier = Modifier.fillMaxWidth()
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text("¥100", style = MaterialTheme.typography.bodyMedium)
            Text("¥500", style = MaterialTheme.typography.bodyMedium)
        }

        Spacer(Modifier.height(24.dp))

        // 折扣筛选
        Text(
            text = "折扣范围",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        RangeSlider(
            value = discountRange,
            onValueChange = onDiscountRangeChange,
            valueRange = 0f..100f,
            steps = 9,
            modifier = Modifier.fillMaxWidth()
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text("20% OFF", style = MaterialTheme.typography.bodyMedium)
            Text("50% OFF", style = MaterialTheme.typography.bodyMedium)
        }

        Spacer(Modifier.height(16.dp))

        Button(
            onClick = { /* 应用筛选 */ },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("应用筛选")
        }
    }
}`
    },
    {
      title: '视频进度区间选择',
      description: '视频编辑应用中选择裁剪区间',
      code: `@Composable
fun VideoTrimmer(
    videoDuration: Float,  // 秒
    trimRange: ClosedFloatingPointRange<Float>,
    onTrimRangeChange: (ClosedFloatingPointRange<Float>) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        Text(
            text = "选择裁剪区间",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        // 视频时间轴
        Box(modifier = Modifier.fillMaxWidth()) {
            // 背景时间轴
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(60.dp)
                    .background(
                        MaterialTheme.colorScheme.surfaceVariant,
                        RoundedCornerShape(8.dp)
                    )
            )

            // 范围滑块
            RangeSlider(
                value = trimRange,
                onValueChange = onTrimRangeChange,
                valueRange = 0f..videoDuration,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 20.dp)
            )
        }

        Spacer(Modifier.height(8.dp))

        // 时间显示
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = formatTime(trimRange.start),
                style = MaterialTheme.typography.bodyMedium
            )
            Text(
                text = "时长：01:30",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.primary
            )
            Text(
                text = formatTime(trimRange.endInclusive),
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}

private fun formatTime(seconds: Float): String {
    val totalSeconds = seconds.toInt()
    val minutes = totalSeconds / 60
    val secs = totalSeconds % 60
    return String.format("%02d:%02d", minutes, secs)
}`
    },
  ],

  bestPractices: [
    {
      title: '合理设置 steps 参数',
      description: 'steps 是区间内的分隔点数量，不是总点数',
      goodExample: `// valueRange 0-100，需要每10一档（0, 10, 20, ..., 100）
// 共 11 个值点，中间有 10 个间隔
RangeSlider(
    value = range,
    onValueChange = { range = it },
    valueRange = 0f..100f,
    steps = 9  // 10个间隔需要 9 个steps
)`,
      badExample: `// 错误：steps = 11 会产生 12 个间隔
RangeSlider(
    value = range,
    onValueChange = { range = it },
    valueRange = 0f..100f,
    steps = 11  // 错误
)`
    },
    {
      title: '使用 onValueChange 而非 onValueChangeFinished',
      description: 'RangeSlider 通常需要实时反馈，使用 onValueChange',
      goodExample: `var priceRange by remember { mutableStateOf(100f..500f) }

RangeSlider(
    value = priceRange,
    onValueChange = { priceRange = it },  // 实时更新
    valueRange = 0f..1000f
)

// 如果需要延迟操作（如网络请求），使用防抖
LaunchedEffect(priceRange) {
    delay(500)  // 停止拖动 500ms 后再请求
    fetchProducts(priceRange)
}`,
    },
    {
      title: '提供清晰的数值标签',
      description: '在滑块上下显示当前选择的数值',
      goodExample: `Column {
    Text("价格：¥100 - ¥500")
    RangeSlider(value = range, onValueChange = { range = it })
    Row(
        Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text("¥0")
        Text("¥1000")
    }
}`,
      badExample: `// 没有标签，用户不知道具体数值
RangeSlider(value = range, onValueChange = { range = it })`
    },
    {
      title: '确保最小间距',
      description: '业务逻辑可能需要强制最小范围间距',
      goodExample: `var range by remember { mutableStateOf(100f..500f) }

RangeSlider(
    value = range,
    onValueChange = { newRange ->
        // 确保最小间距 50
        if (newRange.endInclusive - newRange.start >= 50f) {
            range = newRange
        }
    },
    valueRange = 0f..1000f
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'RangeSlider 返回 ClosedFloatingPointRange',
      content: 'value 类型为 ClosedFloatingPointRange<Float>，使用 .start 和 .endInclusive 访问起始和结束值'
    },
    {
      type: 'warning',
      title: 'steps 参数的计算方式',
      content: 'steps 是区间内的分隔点数量，不包括起点和终点。例如 valueRange = 0f..100f, steps = 9 会产生 0, 10, 20, ..., 100 共 11 个点'
    },
    {
      type: 'tip',
      title: '使用 steps = 0 实现连续滑动',
      content: 'steps = 0（默认值）时滑块连续滑动，适合价格、百分比等连续值。设置 steps 可实现离散步进'
    },
    {
      type: 'tip',
      title: '范围顺序自动纠正',
      content: 'RangeSlider 会自动确保 start <= endInclusive，用户拖动时不会出现反向范围'
    },
    {
      type: 'danger',
      title: 'valueRange 必须是有效范围',
      content: 'valueRange.start 必须小于 valueRange.endInclusive，否则会抛出异常'
    },
    {
      type: 'tip',
      title: '配合 LaunchedEffect 实现防抖',
      content: '如果范围变化触发耗时操作（如网络请求），使用 LaunchedEffect + delay 实现防抖，避免频繁调用'
    },
  ],

  relatedComponents: ['slider', 'text-field', 'outlined-text-field'],
  since: '1.0.0',
}
