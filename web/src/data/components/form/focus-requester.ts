import type { ComponentEntry } from '../../types'

export const focusRequesterComponent: ComponentEntry = {
  id: 'focus-requester',
  name: 'FocusRequester',
  category: 'Form',
  description: '焦点管理工具，用于程序化地请求或移动焦点，常用于自动聚焦输入框。',
  tags: ['focusrequester', 'focus', 'form', 'keyboard', 'input'],
  params: [
    { name: 'Modifier.focusRequester(focusRequester)', type: 'Modifier', description: '将 FocusRequester 绑定到组件' },
    { name: 'focusRequester.requestFocus()', type: 'Unit', description: '请求焦点，通常在 LaunchedEffect 中调用' },
    { name: 'Modifier.focusProperties { next = ... }', type: 'Modifier', description: '设置 Tab 键焦点顺序' },
  ],
  examples: [
    {
      title: '自动聚焦',
      code: `val focusRequester = remember { FocusRequester() }

TextField(
    value = text,
    onValueChange = { text = it },
    modifier = Modifier.focusRequester(focusRequester)
)

LaunchedEffect(Unit) {
    focusRequester.requestFocus()
}`,
    },
    {
      title: '焦点链（回车跳转下一个）',
      code: `val (first, second) = remember { FocusRequester.createRefs() }

TextField(
    value = name,
    onValueChange = { name = it },
    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next),
    keyboardActions = KeyboardActions(onNext = { second.requestFocus() }),
    modifier = Modifier.focusRequester(first)
)
TextField(
    value = email,
    onValueChange = { email = it },
    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
    modifier = Modifier.focusRequester(second)
)`,
    },
  ],
}
