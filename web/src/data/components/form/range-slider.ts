import type { ComponentEntry } from '../../types'

export const rangeSliderComponent: ComponentEntry = {
  id: 'range-slider',
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

Column {
    RangeSlider(
        value = priceRange,
        onValueChange = { priceRange = it },
        valueRange = 0f..1000f,
        modifier = Modifier.fillMaxWidth()
    )
    Text("价格：¥\${"%.0f".format(priceRange.start)} - ¥\${"%.0f".format(priceRange.endInclusive)}")
}`,
    },
  ],
}
