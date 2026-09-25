import type { ComponentEntry } from '../../types'

export const formCompositionComponent: ComponentEntry = {
  id: 'form-composition',
  demo: { id: 'form-composition', sourceFile: 'FormCompositionDemo.kt' },
  name: 'Form Composition',
  category: 'Composition',
  description: '完整的表单组合示例，展示如何结合 TextField、Checkbox、Button、Dialog 等组件实现实际的注册表单场景。',
  tags: ['form', 'composition', 'validation', '表单', '组合'],
  params: [],
  examples: [
    {
      title: '完整注册表单',
      code: `var username by remember { mutableStateOf("") }
var email by remember { mutableStateOf("") }
var password by remember { mutableStateOf("") }
var acceptTerms by remember { mutableStateOf(false) }

Column {
    OutlinedTextField(
        value = username,
        onValueChange = { username = it },
        label = { Text("用户名") }
    )
    OutlinedTextField(
        value = email,
        onValueChange = { email = it },
        label = { Text("邮箱") }
    )
    OutlinedTextField(
        value = password,
        onValueChange = { password = it },
        label = { Text("密码") },
        visualTransformation = PasswordVisualTransformation()
    )
    Row {
        Checkbox(
            checked = acceptTerms,
            onCheckedChange = { acceptTerms = it }
        )
        Text("同意用户协议")
    }
    Button(
        onClick = { /* 提交 */ },
        enabled = username.isNotEmpty() && email.isNotEmpty() && password.isNotEmpty() && acceptTerms
    ) {
        Text("注册")
    }
}`,
    },
  ],
  bestPractices: [
    {
      type: 'info',
      title: '实时验证用户输入',
      content: '在用户输入时提供即时反馈，显示错误提示和验证状态',
    },
    {
      type: 'info',
      title: '处理加载状态',
      content: '提交时显示加载指示器，防止重复提交',
    },
  ],
  relatedComponents: ['text-field', 'outlined-text-field', 'button', 'checkbox', 'alert-dialog'],
  since: '1.0.0',
}
