import type { ComponentEntry } from '../../types'

export const keyboardOptionsComponent: ComponentEntry = {
  id: 'keyboard-options',
  name: 'KeyboardOptions / KeyboardActions',
  category: 'Form',
  description: 'KeyboardOptions 配置键盘类型和 IME 动作按钮；KeyboardActions 处理 IME 动作回调。',
  tags: ['keyboardoptions', 'keyboardactions', 'ime', 'keyboard', 'form'],
  params: [
    { name: 'keyboardType', type: 'KeyboardType', default: 'KeyboardType.Text', description: 'Text / Number / Email / Password / Phone / Uri 等' },
    { name: 'imeAction', type: 'ImeAction', default: 'ImeAction.Default', description: 'Done / Next / Search / Send / Go 等' },
    { name: 'capitalization', type: 'KeyboardCapitalization', default: 'None', description: '自动大写：None / Words / Sentences / Characters' },
    { name: 'autoCorrect', type: 'Boolean', default: 'true', description: '是否启用自动纠错' },
  ],
  examples: [
    {
      title: '常用键盘配置',
      code: `// 数字键盘 + 完成按钮
TextField(
    value = phone,
    onValueChange = { phone = it },
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Phone,
        imeAction = ImeAction.Done
    ),
    keyboardActions = KeyboardActions(
        onDone = { focusManager.clearFocus() }
    )
)`,
    },
    {
      title: '搜索键盘',
      code: `TextField(
    value = query,
    onValueChange = { query = it },
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Text,
        imeAction = ImeAction.Search
    ),
    keyboardActions = KeyboardActions(
        onSearch = { performSearch(query) }
    )
)`,
    },
  ],
}
