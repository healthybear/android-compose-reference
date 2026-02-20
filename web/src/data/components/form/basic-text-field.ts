import type { ComponentEntry } from '../../types'

export const basicTextFieldComponent: ComponentEntry = {
  id: 'basic-text-field',
  name: 'BasicTextField',
  category: 'Form',
  description: '无样式的底层文本输入组件，通过 decorator 完全自定义外观。ui 1.8+ 使用 TextFieldState 替代旧版 String + onValueChange API。',
  tags: ['basictextfield', 'input', 'custom', 'form', 'text'],
  params: [
    { name: 'state', type: 'TextFieldState', required: true, description: '文本状态，由 rememberTextFieldState() 创建，持有输入内容与光标位置' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'textStyle', type: 'TextStyle', default: 'TextStyle.Default', description: '文字样式' },
    { name: 'lineLimits', type: 'TextFieldLineLimits', default: 'TextFieldLineLimits.Default', description: '行数限制，SingleLine 或 MultiLine(maxHeightInLines)' },
    { name: 'decorator', type: 'TextFieldDecorator?', default: 'null', description: '自定义外观装饰，通过 TextFieldDecorator { innerTextField -> } 包裹输入区域' },
    { name: 'inputTransformation', type: 'InputTransformation?', default: 'null', description: '输入过滤/转换，如限制字符类型、最大长度' },
    { name: 'outputTransformation', type: 'OutputTransformation?', default: 'null', description: '输出展示转换，如格式化显示（不影响实际值）' },
    { name: 'keyboardOptions', type: 'KeyboardOptions', default: 'KeyboardOptions.Default', description: '键盘类型、输入法动作等配置' },
  ],
  examples: [
    {
      title: '自定义样式输入框',
      code: `val state = rememberTextFieldState()

BasicTextField(
    state = state,
    textStyle = MaterialTheme.typography.bodyLarge,
    lineLimits = TextFieldLineLimits.SingleLine,
    decorator = TextFieldDecorator { innerTextField ->
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .border(1.dp, MaterialTheme.colorScheme.outline, RoundedCornerShape(8.dp))
                .padding(horizontal = 16.dp, vertical = 12.dp)
        ) {
            if (state.text.isEmpty()) {
                Text("请输入...", color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            innerTextField()
        }
    }
)`,
    },
    {
      title: '限制输入长度与字符类型',
      code: `val state = rememberTextFieldState()

BasicTextField(
    state = state,
    lineLimits = TextFieldLineLimits.SingleLine,
    inputTransformation = InputTransformation.maxLength(20)
        .then(InputTransformation { _, valueWithChanges ->
            // 只允许字母和数字
            if (!valueWithChanges.asCharSequence().all { it.isLetterOrDigit() }) {
                valueWithChanges.revertAllChanges()
            }
        }),
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Ascii)
)`,
    },
    {
      title: '读取当前值',
      code: `val state = rememberTextFieldState(initialText = "初始内容")

// 直接读取文本
val text = state.text  // CharSequence

// 转为 String
val str = state.text.toString()

// 程序化修改
state.edit {
    replace(0, length, "新内容")
}`,
    },
  ],
}
