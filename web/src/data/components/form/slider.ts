import type { ComponentEntry } from '../../types'

export const sliderComponent: ComponentEntry = {
  id: 'slider',
  name: 'Slider',
  category: 'Form',
  description: '滑动条，在连续或离散范围内选择单个值，对应 View 系统的 SeekBar。',
  tags: ['slider', 'seekbar', 'form', 'range', 'progress'],
  params: [
    { name: 'value', type: 'Float', required: true, description: '当前值' },
    { name: 'onValueChange', type: '(Float) -> Unit', required: true, description: '值变化回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用' },
    { name: 'valueRange', type: 'ClosedFloatingPointRange<Float>', default: '0f..1f', description: '取值范围' },
    { name: 'steps', type: 'Int', default: '0', description: '离散步数，0 表示连续' },
    { name: 'onValueChangeFinished', type: '(() -> Unit)?', default: 'null', description: '拖动结束回调' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var sliderValue by remember { mutableStateOf(0.5f) }

Column {
    Slider(
        value = sliderValue,
        onValueChange = { sliderValue = it },
        modifier = Modifier.fillMaxWidth()
    )
    Text("当前值：\${"%.2f".format(sliderValue)}")
}`,
    },
    {
      title: '离散步进',
      code: `var volume by remember { mutableStateOf(5f) }

Slider(
    value = volume,
    onValueChange = { volume = it },
    valueRange = 0f..10f,
    steps = 9,  // 将范围分为 10 段
    onValueChangeFinished = { /* 保存设置 */ }
)`,
    },
  ],
}
