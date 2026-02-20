import type { ComponentEntry } from '../../types'

export const basicTextFieldComponent: ComponentEntry = {
  id: 'basic-text-field',
  name: 'BasicTextField',
  category: 'Form',
  description: '无样式的底层文本输入组件，通过 decorationBox 完全自定义外观，适合构建定制输入框。',
  tags: ['basictextfield', 'input', 'custom', 'form', 'text'],
  params: [
    { name: 'value', type: 'String', required: true, description: '当前输入值' },
    { name: 'onValueChange', type: '(String) -> Unit', required: true, description: '值变化回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'textStyle', type: 'TextStyle', default: 'TextStyle.Default', description: '文字样式' },
    { name: 'decorationBox', type: '@Composable (innerTextField: @Composable () -> Unit) -> Unit', default: '{ it() }', description: '自定义外观装饰，innerTextField 为实际输入区域' },
    { name: 'singleLine', type: 'Boolean', default: 'false', description: '是否单行' },
  ],
  examples: [
    {
      title: '自定义样式输入框',
      code: `var text by remember { mutableStateOf("") }

BasicTextField(
    value = text,
    onValueChange = { text = it },
    textStyle = MaterialTheme.typography.bodyLarge,
    singleLine = true,
    decorationBox = { innerTextField ->
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .border(1.dp, MaterialTheme.colorScheme.outline, RoundedCornerShape(8.dp))
                .padding(horizontal = 16.dp, vertical = 12.dp)
        ) {
            if (text.isEmpty()) {
                Text("请输入...", color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            innerTextField()
        }
    }
)`,
    },
  ],
}
