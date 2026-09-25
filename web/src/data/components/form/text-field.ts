import type { ComponentEntry } from '../../types'

export const textFieldComponent: ComponentEntry = {
  id: 'text-field',
  demo: { id: 'text-field', sourceFile: 'TextFieldDemo.kt' },
  name: 'TextField',
  category: 'Form',
  description: 'TextField 是 Material Design 3 的填充风格文本输入框，支持浮动标签、占位符、前后图标、错误状态、辅助文本等功能。适合表单输入场景。',
  tags: ['textfield', 'input', 'form', 'edittext', 'text', 'keyboard'],
  params: [
    { name: 'value', type: 'String', required: true, description: '当前输入值，必须由状态管理' },
    { name: 'onValueChange', type: '(String) -> Unit', required: true, description: '值变化回调，用于更新状态' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、内边距等' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用输入' },
    { name: 'readOnly', type: 'Boolean', default: 'false', description: '是否只读（可选择但不可编辑）' },
    { name: 'textStyle', type: 'TextStyle', default: 'LocalTextStyle.current', description: '输入文本样式' },
    { name: 'label', type: '@Composable (() -> Unit)?', default: 'null', description: '浮动标签，聚焦时上移' },
    { name: 'placeholder', type: '@Composable (() -> Unit)?', default: 'null', description: '占位提示文字，仅空值时显示' },
    { name: 'leadingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '前置图标' },
    { name: 'trailingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '后置图标' },
    { name: 'prefix', type: '@Composable (() -> Unit)?', default: 'null', description: '输入内容前缀' },
    { name: 'suffix', type: '@Composable (() -> Unit)?', default: 'null', description: '输入内容后缀' },
    { name: 'supportingText', type: '@Composable (() -> Unit)?', default: 'null', description: '底部辅助文字或错误提示' },
    { name: 'isError', type: 'Boolean', default: 'false', description: '是否显示错误状态（红色样式）' },
    { name: 'visualTransformation', type: 'VisualTransformation', default: 'VisualTransformation.None', description: '视觉转换（如密码遮罩）' },
    { name: 'keyboardOptions', type: 'KeyboardOptions', default: 'KeyboardOptions.Default', description: '键盘类型和 IME 动作（Enter/Search/Done 等）' },
    { name: 'keyboardActions', type: 'KeyboardActions', default: 'KeyboardActions.Default', description: '键盘动作回调' },
    { name: 'singleLine', type: 'Boolean', default: 'false', description: '是否单行（单行时禁用换行）' },
    { name: 'maxLines', type: 'Int', default: 'if (singleLine) 1 else Int.MAX_VALUE', description: '最大行数' },
    { name: 'minLines', type: 'Int', default: '1', description: '最小行数' },
    { name: 'interactionSource', type: 'MutableInteractionSource?', default: 'null', description: '交互状态源' },
    { name: 'shape', type: 'Shape', default: 'TextFieldDefaults.shape', description: '输入框形状' },
    { name: 'colors', type: 'TextFieldColors', default: 'TextFieldDefaults.colors()', description: '颜色配置' },
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
      title: '带验证的邮箱输入',
      code: `var email by remember { mutableStateOf("") }
val isError = email.isNotEmpty() && !email.contains("@")

TextField(
    value = email,
    onValueChange = { email = it },
    label = { Text("邮箱") },
    leadingIcon = {
        Icon(Icons.Default.Email, contentDescription = null)
    },
    isError = isError,
    supportingText = {
        if (isError) {
            Text("请输入有效的邮箱地址")
        } else {
            Text("用于接收验证码")
        }
    },
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
    singleLine = true
)`,
    },
    {
      title: '搜索框',
      code: `var query by remember { mutableStateOf("") }

TextField(
    value = query,
    onValueChange = { query = it },
    placeholder = { Text("搜索...") },
    leadingIcon = {
        Icon(Icons.Default.Search, contentDescription = "搜索")
    },
    trailingIcon = {
        if (query.isNotEmpty()) {
            IconButton(onClick = { query = "" }) {
                Icon(Icons.Default.Clear, contentDescription = "清除")
            }
        }
    },
    keyboardOptions = KeyboardOptions(
        imeAction = ImeAction.Search
    ),
    keyboardActions = KeyboardActions(
        onSearch = {
            // 执行搜索
            performSearch(query)
        }
    ),
    singleLine = true,
    modifier = Modifier.fillMaxWidth()
)`,
    },
    {
      title: '多行文本输入',
      code: `var comment by remember { mutableStateOf("") }

TextField(
    value = comment,
    onValueChange = { comment = it },
    label = { Text("评论") },
    placeholder = { Text("请输入您的评论...") },
    supportingText = {
        Text("128 / 500")
    },
    maxLines = 5,
    minLines = 3,
    modifier = Modifier.fillMaxWidth()
)`,
    },
    {
      title: '数字输入（带前后缀）',
      code: `var amount by remember { mutableStateOf("") }

TextField(
    value = amount,
    onValueChange = { newValue ->
        // 只允许数字
        if (newValue.all { it.isDigit() || it == '.' }) {
            amount = newValue
        }
    },
    label = { Text("金额") },
    prefix = { Text("¥ ") },
    suffix = { Text(" 元") },
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Decimal
    ),
    singleLine = true
)`,
    },
  ],

  useCases: [
    {
      title: '表单验证示例',
      description: '实时验证输入内容并显示错误提示',
      code: `@Composable
fun ValidatedForm() {
    var name by remember { mutableStateOf("") }
    var phone by remember { mutableStateOf("") }

    val nameError = name.isNotEmpty() && name.length < 2
    val phoneError = phone.isNotEmpty() && !phone.matches(Regex("^1[3-9]\\\\d{9}\$"))

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        TextField(
            value = name,
            onValueChange = { name = it },
            label = { Text("姓名") },
            isError = nameError,
            supportingText = {
                if (nameError) Text("姓名至少需要 2 个字符")
            },
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )

        TextField(
            value = phone,
            onValueChange = { phone = it },
            label = { Text("手机号") },
            leadingIcon = {
                Icon(Icons.Default.Phone, contentDescription = null)
            },
            isError = phoneError,
            supportingText = {
                if (phoneError) Text("请输入有效的手机号码")
            },
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Phone
            ),
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )

        Button(
            onClick = { /* 提交表单 */ },
            enabled = !nameError && !phoneError && name.isNotEmpty() && phone.isNotEmpty(),
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("提交")
        }
    }
}`
    },
    {
      title: '动态键盘处理',
      description: '根据输入内容动态切换键盘动作',
      code: `@Composable
fun ChatInput(onSend: (String) -> Unit) {
    var message by remember { mutableStateOf("") }
    val focusManager = LocalFocusManager.current

    TextField(
        value = message,
        onValueChange = { message = it },
        placeholder = { Text("输入消息...") },
        trailingIcon = {
            IconButton(
                onClick = {
                    if (message.isNotBlank()) {
                        onSend(message)
                        message = ""
                    }
                },
                enabled = message.isNotBlank()
            ) {
                Icon(Icons.AutoMirrored.Filled.Send, contentDescription = "发送")
            }
        },
        keyboardOptions = KeyboardOptions(
            imeAction = if (message.isBlank()) ImeAction.None else ImeAction.Send
        ),
        keyboardActions = KeyboardActions(
            onSend = {
                if (message.isNotBlank()) {
                    onSend(message)
                    message = ""
                }
                focusManager.clearFocus()
            }
        ),
        modifier = Modifier.fillMaxWidth()
    )
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 remember 管理状态',
      description: 'TextField 必须配合状态使用，不能直接传入字面量',
      goodExample: `var text by remember { mutableStateOf("") }
TextField(
    value = text,
    onValueChange = { text = it }
)`,
      badExample: `// 错误：无法编辑
TextField(
    value = "固定文本",
    onValueChange = {}
)`
    },
    {
      title: '单行输入使用 singleLine = true',
      description: '避免用户输入换行符，配合 keyboardOptions 使用',
      goodExample: `TextField(
    value = username,
    onValueChange = { username = it },
    singleLine = true,
    keyboardOptions = KeyboardOptions(
        imeAction = ImeAction.Next
    )
)`,
      badExample: `// 用户名输入框允许换行，体验不佳
TextField(
    value = username,
    onValueChange = { username = it }
)`
    },
    {
      title: '使用 keyboardActions 响应键盘动作',
      description: '监听 Enter/Done/Search 等键盘动作',
      goodExample: `TextField(
    value = query,
    onValueChange = { query = it },
    keyboardOptions = KeyboardOptions(
        imeAction = ImeAction.Search
    ),
    keyboardActions = KeyboardActions(
        onSearch = { performSearch(query) }
    )
)`,
    },
    {
      title: '为图标提供 contentDescription',
      description: '确保无障碍用户能理解图标功能',
      goodExample: `TextField(
    value = text,
    onValueChange = { text = it },
    trailingIcon = {
        IconButton(onClick = { text = "" }) {
            Icon(Icons.Default.Clear, contentDescription = "清除文本")
        }
    }
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'TextField 是受控组件',
      content: 'TextField 必须由外部状态驱动，每次 onValueChange 回调后需要更新 value，否则输入内容不会显示'
    },
    {
      type: 'warning',
      title: 'isError 只改变视觉样式',
      content: 'isError = true 只会改变颜色为红色，不会阻止输入或自动显示错误信息。错误提示需要通过 supportingText 手动添加'
    },
    {
      type: 'tip',
      title: '使用 visualTransformation 实现特殊格式',
      content: '除了 PasswordVisualTransformation，还可以自定义 VisualTransformation 实现电话号码、信用卡号等格式化显示'
    },
    {
      type: 'tip',
      title: 'readOnly vs enabled',
      content: 'readOnly = true 允许选择和复制文本但不能编辑；enabled = false 完全禁用交互，文本呈灰色且无法选择'
    },
    {
      type: 'danger',
      title: '避免在 onValueChange 中执行耗时操作',
      content: 'onValueChange 在每次输入时都会调用。如需验证或格式化，使用 derivedStateOf 或 LaunchedEffect 延迟处理'
    },
  ],

  relatedComponents: ['outlined-text-field', 'basic-text-field', 'text'],
  since: '1.0.0',
}
