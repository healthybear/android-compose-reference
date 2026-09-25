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
      title: '电话号码输入',
      code: `var phone by remember { mutableStateOf("") }
val focusManager = LocalFocusManager.current

TextField(
    value = phone,
    onValueChange = { phone = it },
    label = { Text("手机号") },
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Phone,
        imeAction = ImeAction.Done
    ),
    keyboardActions = KeyboardActions(
        onDone = { focusManager.clearFocus() }
    ),
    modifier = Modifier.fillMaxWidth()
)`,
    },
    {
      title: '搜索框',
      code: `var query by remember { mutableStateOf("") }

TextField(
    value = query,
    onValueChange = { query = it },
    label = { Text("搜索") },
    leadingIcon = {
        Icon(Icons.Default.Search, contentDescription = null)
    },
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Text,
        imeAction = ImeAction.Search
    ),
    keyboardActions = KeyboardActions(
        onSearch = {
            performSearch(query)
            // 可选：清除焦点
            // focusManager.clearFocus()
        }
    ),
    modifier = Modifier.fillMaxWidth()
)`,
    },
    {
      title: '邮箱输入',
      code: `var email by remember { mutableStateOf("") }

OutlinedTextField(
    value = email,
    onValueChange = { email = it },
    label = { Text("邮箱地址") },
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Email,
        imeAction = ImeAction.Next,
        autoCorrect = false  // 关闭自动纠错
    ),
    modifier = Modifier.fillMaxWidth()
)`,
    },
    {
      title: '密码输入',
      code: `var password by remember { mutableStateOf("") }
var passwordVisible by remember { mutableStateOf(false) }

OutlinedTextField(
    value = password,
    onValueChange = { password = it },
    label = { Text("密码") },
    visualTransformation = if (passwordVisible) {
        VisualTransformation.None
    } else {
        PasswordVisualTransformation()
    },
    trailingIcon = {
        IconButton(onClick = { passwordVisible = !passwordVisible }) {
            Icon(
                if (passwordVisible) Icons.Default.Visibility else Icons.Default.VisibilityOff,
                contentDescription = if (passwordVisible) "隐藏密码" else "显示密码"
            )
        }
    },
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Password,
        imeAction = ImeAction.Done,
        autoCorrect = false
    ),
    keyboardActions = KeyboardActions(
        onDone = { submitLogin() }
    ),
    modifier = Modifier.fillMaxWidth()
)`,
    },
    {
      title: '多行文本与自动大写',
      code: `var message by remember { mutableStateOf("") }

TextField(
    value = message,
    onValueChange = { message = it },
    label = { Text("留言") },
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Text,
        capitalization = KeyboardCapitalization.Sentences,  // 句首自动大写
        autoCorrect = true,
        imeAction = ImeAction.Default
    ),
    maxLines = 5,
    modifier = Modifier.fillMaxWidth()
)`,
    },
    {
      title: '表单焦点链',
      code: `var name by remember { mutableStateOf("") }
var email by remember { mutableStateOf("") }
var phone by remember { mutableStateOf("") }
val focusManager = LocalFocusManager.current

Column(
    modifier = Modifier.padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp)
) {
    OutlinedTextField(
        value = name,
        onValueChange = { name = it },
        label = { Text("姓名") },
        keyboardOptions = KeyboardOptions(
            imeAction = ImeAction.Next,
            capitalization = KeyboardCapitalization.Words
        ),
        modifier = Modifier.fillMaxWidth()
    )

    OutlinedTextField(
        value = email,
        onValueChange = { email = it },
        label = { Text("邮箱") },
        keyboardOptions = KeyboardOptions(
            keyboardType = KeyboardType.Email,
            imeAction = ImeAction.Next
        ),
        modifier = Modifier.fillMaxWidth()
    )

    OutlinedTextField(
        value = phone,
        onValueChange = { phone = it },
        label = { Text("手机号") },
        keyboardOptions = KeyboardOptions(
            keyboardType = KeyboardType.Phone,
            imeAction = ImeAction.Done
        ),
        keyboardActions = KeyboardActions(
            onDone = {
                focusManager.clearFocus()
                submitForm(name, email, phone)
            }
        ),
        modifier = Modifier.fillMaxWidth()
    )
}`,
    },
    {
      title: '数字输入与格式化',
      code: `var amount by remember { mutableStateOf("") }

OutlinedTextField(
    value = amount,
    onValueChange = { newValue ->
        // 仅允许数字和小数点
        if (newValue.isEmpty() || newValue.matches(Regex("^\\d*\\.?\\d*$"))) {
            amount = newValue
        }
    },
    label = { Text("金额") },
    prefix = { Text("¥") },
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Decimal,  // 数字键盘带小数点
        imeAction = ImeAction.Done
    ),
    keyboardActions = KeyboardActions(
        onDone = { processPayment(amount.toFloatOrNull() ?: 0f) }
    ),
    modifier = Modifier.fillMaxWidth()
)`,
    },
    {
      title: 'URI 输入',
      code: `var websiteUrl by remember { mutableStateOf("") }

OutlinedTextField(
    value = websiteUrl,
    onValueChange = { websiteUrl = it },
    label = { Text("网址") },
    leadingIcon = {
        Icon(Icons.Default.Link, contentDescription = null)
    },
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Uri,
        imeAction = ImeAction.Go,
        autoCorrect = false
    ),
    keyboardActions = KeyboardActions(
        onGo = {
            openBrowser(websiteUrl)
        }
    ),
    modifier = Modifier.fillMaxWidth()
)`,
    },
  ],

  useCases: [
    {
      title: '登录表单',
      description: '用户名和密码输入，带焦点切换和提交',
      code: `@Composable
fun LoginForm(
    onLogin: (String, String) -> Unit
) {
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var passwordVisible by remember { mutableStateOf(false) }
    val focusManager = LocalFocusManager.current

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        OutlinedTextField(
            value = username,
            onValueChange = { username = it },
            label = { Text("用户名或邮箱") },
            leadingIcon = {
                Icon(Icons.Default.Person, contentDescription = null)
            },
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Email,
                imeAction = ImeAction.Next,
                autoCorrect = false,
                capitalization = KeyboardCapitalization.None
            ),
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )

        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("密码") },
            leadingIcon = {
                Icon(Icons.Default.Lock, contentDescription = null)
            },
            trailingIcon = {
                IconButton(onClick = { passwordVisible = !passwordVisible }) {
                    Icon(
                        if (passwordVisible) Icons.Default.Visibility else Icons.Default.VisibilityOff,
                        contentDescription = if (passwordVisible) "隐藏密码" else "显示密码"
                    )
                }
            },
            visualTransformation = if (passwordVisible) {
                VisualTransformation.None
            } else {
                PasswordVisualTransformation()
            },
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Password,
                imeAction = ImeAction.Done,
                autoCorrect = false
            ),
            keyboardActions = KeyboardActions(
                onDone = {
                    focusManager.clearFocus()
                    if (username.isNotEmpty() && password.isNotEmpty()) {
                        onLogin(username, password)
                    }
                }
            ),
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )

        Button(
            onClick = {
                focusManager.clearFocus()
                onLogin(username, password)
            },
            enabled = username.isNotEmpty() && password.isNotEmpty(),
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("登录")
        }
    }
}`
    },
    {
      title: '聊天输入框',
      description: '发送消息的文本输入，支持回车发送',
      code: `@Composable
fun ChatInputBar(
    onSendMessage: (String) -> Unit
) {
    var message by remember { mutableStateOf("") }
    val focusManager = LocalFocusManager.current

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        verticalAlignment = Alignment.Bottom
    ) {
        TextField(
            value = message,
            onValueChange = { message = it },
            placeholder = { Text("输入消息...") },
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Text,
                imeAction = ImeAction.Send,
                capitalization = KeyboardCapitalization.Sentences
            ),
            keyboardActions = KeyboardActions(
                onSend = {
                    if (message.isNotBlank()) {
                        onSendMessage(message.trim())
                        message = ""
                    }
                }
            ),
            maxLines = 5,
            modifier = Modifier
                .weight(1f)
                .padding(end = 8.dp)
        )

        IconButton(
            onClick = {
                if (message.isNotBlank()) {
                    onSendMessage(message.trim())
                    message = ""
                    focusManager.clearFocus()
                }
            },
            enabled = message.isNotBlank()
        ) {
            Icon(
                Icons.Default.Send,
                contentDescription = "发送",
                tint = if (message.isNotBlank()) {
                    MaterialTheme.colorScheme.primary
                } else {
                    MaterialTheme.colorScheme.onSurfaceVariant
                }
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '为不同输入类型选择正确的 KeyboardType',
      description: '使用合适的键盘类型提升输入体验',
      goodExample: `// 电话号码：显示数字键盘
TextField(
    value = phone,
    onValueChange = { phone = it },
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone)
)

// 邮箱：带 @ 和 . 的键盘
TextField(
    value = email,
    onValueChange = { email = it },
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email)
)

// 金额：数字键盘带小数点
TextField(
    value = price,
    onValueChange = { price = it },
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal)
)`,
      badExample: `// 所有输入都用默认键盘
TextField(
    value = phone,  // 电话号码但显示全键盘
    onValueChange = { phone = it }
)`
    },
    {
      title: '使用 ImeAction 构建焦点链',
      description: '表单中使用 Next/Done 引导用户',
      goodExample: `Column {
    TextField(
        value = field1,
        onValueChange = { field1 = it },
        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next)
    )
    TextField(
        value = field2,
        onValueChange = { field2 = it },
        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next)
    )
    TextField(
        value = field3,
        onValueChange = { field3 = it },
        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
        keyboardActions = KeyboardActions(
            onDone = { submitForm() }
        )
    )
}`,
      badExample: `// 所有字段都用默认，用户不知道是否还有下一个字段
TextField(value = field1, onValueChange = { field1 = it })
TextField(value = field2, onValueChange = { field2 = it })
TextField(value = field3, onValueChange = { field3 = it })`
    },
    {
      title: '密码和邮箱输入关闭自动纠错',
      description: '敏感输入应禁用自动纠错和自动大写',
      goodExample: `TextField(
    value = email,
    onValueChange = { email = it },
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Email,
        autoCorrect = false,
        capitalization = KeyboardCapitalization.None
    )
)

TextField(
    value = password,
    onValueChange = { password = it },
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Password,
        autoCorrect = false
    )
)`,
      badExample: `// 自动纠错可能改变邮箱或密码
TextField(
    value = email,
    onValueChange = { email = it },
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email)
    // 默认 autoCorrect = true
)`
    },
    {
      title: '实现 KeyboardActions 回调',
      description: '响应用户的键盘动作提供即时反馈',
      goodExample: `TextField(
    value = query,
    onValueChange = { query = it },
    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
    keyboardActions = KeyboardActions(
        onSearch = {
            performSearch(query)
            focusManager.clearFocus()
        }
    )
)`,
      badExample: `// 定义了 ImeAction.Search 但没有处理
TextField(
    value = query,
    onValueChange = { query = it },
    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search)
    // 用户点击搜索按钮没有任何反应
)`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'KeyboardType 影响虚拟键盘布局',
      content: 'KeyboardType 会改变软键盘显示的按键布局。Text 显示全键盘，Number 只显示数字，Email 包含 @ 和 .com 快捷键等'
    },
    {
      type: 'info',
      title: 'ImeAction 常用值',
      content: 'Done（完成）、Next（下一项）、Search（搜索）、Send（发送）、Go（前往）。根据输入场景选择合适的动作，提升用户体验'
    },
    {
      type: 'warning',
      title: 'autoCorrect 默认为 true',
      content: '自动纠错默认开启，对于邮箱、密码、代码等精确输入，应设置 autoCorrect = false'
    },
    {
      type: 'info',
      title: 'KeyboardCapitalization 选项',
      content: 'None（不大写）、Characters（全部大写）、Words（单词首字母大写）、Sentences（句首大写）。姓名用 Words，留言用 Sentences'
    },
    {
      type: 'error',
      title: 'KeyboardActions 不保证触发',
      content: 'KeyboardActions 回调依赖输入法实现，部分输入法可能不触发。关键操作应同时提供按钮'
    },
    {
      type: 'info',
      title: 'Number vs Decimal vs Phone',
      content: 'Number 只显示整数键盘，Decimal 包含小数点，Phone 包含 + * # 等电话特殊字符'
    },
  ],

  relatedComponents: ['text-field', 'outlined-text-field', 'basic-text-field'],
  since: '1.0.0',
}
