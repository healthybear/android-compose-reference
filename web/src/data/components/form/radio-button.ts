import type { ComponentEntry } from '../../types'

export const radioButtonComponent: ComponentEntry = {
  id: 'radio-button',
  name: 'RadioButton',
  category: 'Form',
  description: '单选按钮，同组内互斥选择，通常配合 Row 和文字标签使用。',
  tags: ['radiobutton', 'form', 'selection', 'radio', 'single-choice'],
  params: [
    { name: 'selected', type: 'Boolean', required: true, description: '是否选中' },
    { name: 'onClick', type: '(() -> Unit)?', required: true, description: '点击回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用' },
  ],
  examples: [
    {
      title: '单选组',
      code: `val options = listOf("选项 A", "选项 B", "选项 C")
var selected by remember { mutableStateOf(options[0]) }

Column {
    options.forEach { option ->
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier
                .fillMaxWidth()
                .clickable { selected = option }
                .padding(vertical = 4.dp)
        ) {
            RadioButton(selected = selected == option, onClick = { selected = option })
            Text(option)
        }
    }
}`,
    },
  ],
}
