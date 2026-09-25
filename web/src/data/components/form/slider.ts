import type { ComponentEntry } from '../../types'

export const sliderComponent: ComponentEntry = {
  id: 'slider',
  demo: { id: 'slider', sourceFile: 'SliderDemo.kt' },
  name: 'Slider',
  category: 'Form',
  description: 'Slider 是 Material Design 3 的滑动条组件，用于在连续或离散的范围内选择单个值。适合音量、亮度、价格范围等需要快速调节的场景。对应 Android View 的 SeekBar。',
  tags: ['slider', 'seekbar', 'form', 'range', 'progress', 'input'],
  params: [
    { name: 'value', type: 'Float', required: true, description: '当前值，必须在 valueRange 范围内' },
    { name: 'onValueChange', type: '(Float) -> Unit', required: true, description: '值变化回调，拖动时持续触发' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置宽度等' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用，false 时显示禁用样式且不可交互' },
    { name: 'valueRange', type: 'ClosedFloatingPointRange<Float>', default: '0f..1f', description: '取值范围，默认 0 到 1' },
    { name: 'steps', type: 'Int', default: '0', description: '离散步数（不含起止点），0 表示连续滑动' },
    { name: 'onValueChangeFinished', type: '(() -> Unit)?', default: 'null', description: '拖动结束回调，用于保存设置或触发操作' },
    { name: 'colors', type: 'SliderColors', default: 'SliderDefaults.colors()', description: '颜色配置' },
    { name: 'interactionSource', type: 'MutableInteractionSource?', default: 'null', description: '交互状态源' },
  ],
  examples: [
    {
      title: '基础用法（连续滑动）',
      code: `var sliderValue by remember { mutableFloatStateOf(0.5f) }

Column(modifier = Modifier.padding(16.dp)) {
    Text(
        "不透明度",
        style = MaterialTheme.typography.labelLarge
    )
    Slider(
        value = sliderValue,
        onValueChange = { sliderValue = it },
        modifier = Modifier.fillMaxWidth()
    )
    Text(
        "当前值: 0.50",
        style = MaterialTheme.typography.bodySmall
    )
}`,
    },
    {
      title: '离散步进（音量调节）',
      code: `var volume by remember { mutableFloatStateOf(5f) }

Column(modifier = Modifier.padding(16.dp)) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text("音量")
        Text(volume.toInt().toString())
    }

    Slider(
        value = volume,
        onValueChange = { volume = it },
        valueRange = 0f..10f,
        steps = 9,  // 11 个刻度点（0-10），steps = 9
        onValueChangeFinished = {
            // 拖动结束时保存设置
            saveVolume(volume.toInt())
        },
        modifier = Modifier.fillMaxWidth()
    )
}`,
    },
    {
      title: '带图标的滑块',
      code: `var brightness by remember { mutableFloatStateOf(0.5f) }

Row(
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp),
    verticalAlignment = Alignment.CenterVertically
) {
    Icon(
        imageVector = Icons.Default.BrightnessLow,
        contentDescription = null,
        modifier = Modifier.size(24.dp)
    )
    Spacer(Modifier.width(12.dp))
    Slider(
        value = brightness,
        onValueChange = { brightness = it },
        modifier = Modifier.weight(1f)
    )
    Spacer(Modifier.width(12.dp))
    Icon(
        imageVector = Icons.Default.BrightnessHigh,
        contentDescription = null,
        modifier = Modifier.size(24.dp)
    )
}`,
    },
    {
      title: '价格范围选择器',
      code: `var price by remember { mutableFloatStateOf(500f) }

Column(modifier = Modifier.padding(16.dp)) {
    Text(
        "价格上限: ¥500",
        style = MaterialTheme.typography.titleMedium
    )
    Spacer(Modifier.height(8.dp))
    Slider(
        value = price,
        onValueChange = { price = it },
        valueRange = 0f..1000f,
        steps = 19,  // 步进 50
        modifier = Modifier.fillMaxWidth()
    )
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text("¥0", style = MaterialTheme.typography.bodySmall)
        Text("¥1000", style = MaterialTheme.typography.bodySmall)
    }
}`,
    },
    {
      title: '禁用状态',
      code: `Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
    // 正常状态
    Slider(
        value = 0.5f,
        onValueChange = {},
        modifier = Modifier.fillMaxWidth()
    )

    // 禁用状态
    Slider(
        value = 0.7f,
        onValueChange = {},
        enabled = false,
        modifier = Modifier.fillMaxWidth()
    )
}`,
    },
    {
      title: '自定义颜色',
      code: `var value by remember { mutableFloatStateOf(0.6f) }

Slider(
    value = value,
    onValueChange = { value = it },
    colors = SliderDefaults.colors(
        thumbColor = Color(0xFF4CAF50),
        activeTrackColor = Color(0xFF4CAF50),
        inactiveTrackColor = Color(0xFFE0E0E0)
    ),
    modifier = Modifier.fillMaxWidth()
)`,
    },
  ],

  useCases: [
    {
      title: '设置面板',
      description: '使用 Slider 调节应用设置',
      code: `@Composable
fun SettingsPanel() {
    var brightness by remember { mutableFloatStateOf(0.8f) }
    var volume by remember { mutableFloatStateOf(5f) }
    var fontSize by remember { mutableFloatStateOf(16f) }

    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        // 亮度
        SettingSlider(
            label = "亮度",
            value = brightness,
            onValueChange = { brightness = it },
            valueRange = 0f..1f,
            valueFormatter = { ((it * 100).toInt()).toString() + "%" }
        )

        // 音量
        SettingSlider(
            label = "音量",
            value = volume,
            onValueChange = { volume = it },
            valueRange = 0f..10f,
            steps = 9,
            valueFormatter = { it.toInt().toString() }
        )

        // 字体大小
        SettingSlider(
            label = "字体大小",
            value = fontSize,
            onValueChange = { fontSize = it },
            valueRange = 12f..24f,
            steps = 11,
            valueFormatter = { it.toInt().toString() + "sp" }
        )
    }
}

@Composable
fun SettingSlider(
    label: String,
    value: Float,
    onValueChange: (Float) -> Unit,
    valueRange: ClosedFloatingPointRange<Float> = 0f..1f,
    steps: Int = 0,
    valueFormatter: (Float) -> String = { it.toString() }
) {
    Column {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(label, style = MaterialTheme.typography.bodyLarge)
            Text(
                valueFormatter(value),
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.primary
            )
        }
        Slider(
            value = value,
            onValueChange = onValueChange,
            valueRange = valueRange,
            steps = steps,
            modifier = Modifier.fillMaxWidth()
        )
    }
}`
    },
    {
      title: '实时预览',
      description: '滑动时实时预览效果',
      code: `@Composable
fun TextSizePreview() {
    var textSize by remember { mutableFloatStateOf(16f) }

    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // 预览区
        Card(
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(
                text = "预览文本",
                fontSize = textSize.sp,
                modifier = Modifier.padding(24.dp)
            )
        }

        // 控制滑块
        Column {
            Text("字体大小: 16sp")
            Slider(
                value = textSize,
                onValueChange = { textSize = it },
                valueRange = 12f..32f,
                steps = 19,
                modifier = Modifier.fillMaxWidth()
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '为 Slider 提供标签和当前值',
      description: '让用户知道正在调节什么以及当前值',
      goodExample: `Column {
    Text("音量: 5")
    Slider(value = volume, onValueChange = { volume = it })
}`,
      badExample: `// 没有标签，用户不知道调节的是什么
Slider(value = volume, onValueChange = { volume = it })`
    },
    {
      title: '使用 onValueChangeFinished 保存设置',
      description: '避免拖动时频繁保存，在结束时统一保存',
      goodExample: `Slider(
    value = volume,
    onValueChange = { volume = it },
    onValueChangeFinished = {
        saveSettings()  // 拖动结束时保存
    }
)`,
      badExample: `Slider(
    value = volume,
    onValueChange = {
        volume = it
        saveSettings()  // 拖动时频繁保存
    }
)`
    },
    {
      title: '合理设置 steps',
      description: 'steps 是中间点数量，不包含起止点',
      goodExample: `// 0-10 共 11 个刻度点，steps = 9
Slider(
    value = volume,
    onValueChange = { volume = it },
    valueRange = 0f..10f,
    steps = 9
)`,
      badExample: `// steps = 10 会有 12 个刻度点
Slider(
    value = volume,
    onValueChange = { volume = it },
    valueRange = 0f..10f,
    steps = 10
)`
    },
    {
      title: '显示范围端点值',
      description: '帮助用户理解取值范围',
      goodExample: `Column {
    Slider(value = price, onValueChange = { price = it })
    Row(Modifier.fillMaxWidth(), Arrangement.SpaceBetween) {
        Text("¥0")
        Text("¥1000")
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Slider vs RangeSlider',
      content: 'Slider 选择单个值；RangeSlider 选择一个范围（最小值和最大值）'
    },
    {
      type: 'warning',
      title: 'steps 计算方式',
      content: 'steps 是中间分隔点数量，不包含起止点。例如 valueRange = 0f..10f, steps = 9 表示 11 个刻度（0,1,2,...,10）'
    },
    {
      type: 'info',
      title: 'onValueChange 持续触发',
      content: 'onValueChange 在拖动过程中持续触发。频繁操作（如网络请求）应放在 onValueChangeFinished 中'
    },
    {
      type: 'info',
      title: 'Slider 自动满足最小触摸目标',
      content: 'Slider 的滑块默认尺寸已满足 48dp 最小触摸目标，无需额外调整'
    },
    {
      type: 'error',
      title: '注意精度问题',
      content: 'Float 类型有精度限制。需要精确整数值时，使用 value.toInt() 或 value.roundToInt()'
    },
  ],

  relatedComponents: ['range-slider'],
  since: '1.0.0',
}
