import type { ComponentEntry } from '../../types'

export const textFieldComponent: ComponentEntry = {
  id: 'text-field',
  name: 'TextField',
  category: 'Form',
  description: '填充风格的文本输入框，支持浮动标签、占位符、前后图标、错误状态等。',
  tags: ['textfield', 'input', 'form', 'edittext', 'text'],
  params: [
    { name: 'value', type: 'String', required: true, description: '当前输入值' },
    { name: 'onValueChange', type: '(String) -> Unit', required: true, description: '值变化回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'label', type: '@Composable (() -> Unit)?', default: 'null', description: '浮动标签' },
    { name: 'placeholder', type: '@Composable (() -> Unit)?', default: 'null', description: '占位提示文字' },
    { name: 'leadingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '前置图标' },
    { name: 'trailingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '后置图标' },
    { name: 'supportingText', type: '@Composable (() -> Unit)?', default: 'null', description: '底部辅助文字或错误提示' },
    { name: 'isError', type: 'Boolean', default: 'false', description: '是否显示错误状态' },
    { name: 'singleLine', type: 'Boolean', default: 'false', description: '是否单行' },
    { name: 'keyboardOptions', type: 'KeyboardOptions', default: 'KeyboardOptions.Default', description: '键盘类型和 IME 动作' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var text by remember { mutableStateOf("") }

TextField(
    value = text,
    onValueChange = { text = it },
    label = { Text("用户名") },
    placeholder = { Text("请输入用户名") },
    modifier = Modifier.fillMaxWidth()
)`,
    },
    {
      title: '密码输入框',
      code: `var password by remember { mutableStateOf("") }
var visible by remember { mutableStateOf(false) }

TextField(
    value = password,
    onValueChange = { password = it },
    label = { Text("密码") },
    visualTransformation = if (visible) VisualTransformation.None
                           else PasswordVisualTransformation(),
    trailingIcon = {
        IconButton(onClick = { visible = !visible }) {
            Icon(
                if (visible) Icons.Default.Visibility else Icons.Default.VisibilityOff,
                contentDescription = if (visible) "隐藏密码" else "显示密码"
            )
        }
    },
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
    singleLine = true
)`,
    },
    {
      title: '错误状态',
      code: `var email by remember { mutableStateOf("") }
val isError = email.isNotEmpty() && !email.contains("@")

TextField(
    value = email,
    onValueChange = { email = it },
    label = { Text("邮箱") },
    isError = isError,
    supportingText = {
        if (isError) Text("请输入有效的邮箱地址", color = MaterialTheme.colorScheme.error)
    },
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email)
)`,
    },
  ],
}
