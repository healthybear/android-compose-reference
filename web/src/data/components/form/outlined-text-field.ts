import type { ComponentEntry } from '../../types'

export const outlinedTextFieldComponent: ComponentEntry = {
  id: 'outlined-text-field',
  name: 'OutlinedTextField',
  category: 'Form',
  description: '描边风格的文本输入框，与 TextField 参数相同，外观为带边框的轮廓样式。',
  tags: ['outlinedtextfield', 'input', 'form', 'outlined', 'edittext'],
  params: [
    { name: 'value', type: 'String', required: true, description: '当前输入值' },
    { name: 'onValueChange', type: '(String) -> Unit', required: true, description: '值变化回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'label', type: '@Composable (() -> Unit)?', default: 'null', description: '浮动标签' },
    { name: 'placeholder', type: '@Composable (() -> Unit)?', default: 'null', description: '占位提示文字' },
    { name: 'isError', type: 'Boolean', default: 'false', description: '是否显示错误状态' },
    { name: 'singleLine', type: 'Boolean', default: 'false', description: '是否单行' },
    { name: 'minLines', type: 'Int', default: '1', description: '最小行数' },
    { name: 'maxLines', type: 'Int', default: 'Int.MAX_VALUE', description: '最大行数' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var text by remember { mutableStateOf("") }

OutlinedTextField(
    value = text,
    onValueChange = { text = it },
    label = { Text("搜索") },
    leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
    modifier = Modifier.fillMaxWidth()
)`,
    },
    {
      title: '多行输入',
      code: `var note by remember { mutableStateOf("") }

OutlinedTextField(
    value = note,
    onValueChange = { note = it },
    label = { Text("备注") },
    minLines = 3,
    maxLines = 5,
    modifier = Modifier.fillMaxWidth()
)`,
    },
  ],
}
