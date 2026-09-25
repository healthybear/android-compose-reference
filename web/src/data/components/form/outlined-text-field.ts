import type { ComponentEntry } from '../../types'

export const outlinedTextFieldComponent: ComponentEntry = {
  id: 'outlined-text-field',
  demo: { id: 'outlined-text-field', sourceFile: 'OutlinedTextFieldDemo.kt' },
  name: 'OutlinedTextField',
  category: 'Form',
  description: 'OutlinedTextField 是 Material Design 3 的描边风格文本输入框，带有明显的边框轮廓。与 TextField 功能完全相同，但视觉上更突出，适合需要明确边界的表单。',
  tags: ['outlinedtextfield', 'input', 'form', 'outlined', 'edittext', 'border'],
  params: [
    { name: 'value', type: 'String', required: true, description: '当前输入值，必须由状态管理' },
    { name: 'onValueChange', type: '(String) -> Unit', required: true, description: '值变化回调，用于更新状态' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、内边距等' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用输入' },
    { name: 'readOnly', type: 'Boolean', default: 'false', description: '是否只读（可选择但不可编辑）' },
    { name: 'textStyle', type: 'TextStyle', default: 'LocalTextStyle.current', description: '输入文本样式' },
    { name: 'label', type: '@Composable (() -> Unit)?', default: 'null', description: '浮动标签，聚焦时移到边框上' },
    { name: 'placeholder', type: '@Composable (() -> Unit)?', default: 'null', description: '占位提示文字，仅空值时显示' },
    { name: 'leadingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '前置图标' },
    { name: 'trailingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '后置图标' },
    { name: 'prefix', type: '@Composable (() -> Unit)?', default: 'null', description: '输入内容前缀' },
    { name: 'suffix', type: '@Composable (() -> Unit)?', default: 'null', description: '输入内容后缀' },
    { name: 'supportingText', type: '@Composable (() -> Unit)?', default: 'null', description: '底部辅助文字或错误提示' },
    { name: 'isError', type: 'Boolean', default: 'false', description: '是否显示错误状态（红色边框）' },
    { name: 'visualTransformation', type: 'VisualTransformation', default: 'VisualTransformation.None', description: '视觉转换（如密码遮罩）' },
    { name: 'keyboardOptions', type: 'KeyboardOptions', default: 'KeyboardOptions.Default', description: '键盘类型和 IME 动作' },
    { name: 'keyboardActions', type: 'KeyboardActions', default: 'KeyboardActions.Default', description: '键盘动作回调' },
    { name: 'singleLine', type: 'Boolean', default: 'false', description: '是否单行（单行时禁用换行）' },
    { name: 'maxLines', type: 'Int', default: 'if (singleLine) 1 else Int.MAX_VALUE', description: '最大行数' },
    { name: 'minLines', type: 'Int', default: '1', description: '最小行数' },
    { name: 'interactionSource', type: 'MutableInteractionSource?', default: 'null', description: '交互状态源' },
    { name: 'shape', type: 'Shape', default: 'OutlinedTextFieldDefaults.shape', description: '输入框形状' },
    { name: 'colors', type: 'TextFieldColors', default: 'OutlinedTextFieldDefaults.colors()', description: '颜色配置' },
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
      title: '多行文本输入',
      code: `var note by remember { mutableStateOf("") }

OutlinedTextField(
    value = note,
    onValueChange = { note = it },
    label = { Text("备注") },
    placeholder = { Text("请输入备注内容...") },
    minLines = 3,
    maxLines = 5,
    modifier = Modifier.fillMaxWidth()
)`,
    },
    {
      title: '带验证的表单输入',
      code: `var username by remember { mutableStateOf("") }
val isValid = username.length >= 3
val showError = username.isNotEmpty() && !isValid

OutlinedTextField(
    value = username,
    onValueChange = { username = it },
    label = { Text("用户名") },
    leadingIcon = {
        Icon(Icons.Default.Person, contentDescription = null)
    },
    isError = showError,
    supportingText = {
        when {
            showError -> Text("用户名至少需要 3 个字符")
            username.isEmpty() -> Text("必填项")
            else -> Text("用户名可用")
        }
    },
    singleLine = true,
    modifier = Modifier.fillMaxWidth()
)`,
    },
    {
      title: '价格输入（带前缀）',
      code: `var price by remember { mutableStateOf("") }

OutlinedTextField(
    value = price,
    onValueChange = { newValue ->
        // 只允许数字和小数点
        if (newValue.isEmpty() || newValue.matches(Regex("^\\\\d*\\\\.?\\\\d*\$"))) {
            price = newValue
        }
    },
    label = { Text("价格") },
    prefix = { Text("¥ ") },
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Decimal
    ),
    singleLine = true,
    modifier = Modifier.fillMaxWidth()
)`,
    },
    {
      title: '下拉选择输入框',
      code: `var selectedOption by remember { mutableStateOf("") }
var expanded by remember { mutableStateOf(false) }
val options = listOf("选项 1", "选项 2", "选项 3")

ExposedDropdownMenuBox(
    expanded = expanded,
    onExpandedChange = { expanded = it }
) {
    OutlinedTextField(
        value = selectedOption,
        onValueChange = {},
        readOnly = true,
        label = { Text("选择选项") },
        trailingIcon = {
            ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded)
        },
        modifier = Modifier
            .menuAnchor()
            .fillMaxWidth()
    )

    ExposedDropdownMenu(
        expanded = expanded,
        onDismissRequest = { expanded = false }
    ) {
        options.forEach { option ->
            DropdownMenuItem(
                text = { Text(option) },
                onClick = {
                    selectedOption = option
                    expanded = false
                }
            )
        }
    }
}`,
    },
    {
      title: '密码强度指示器',
      code: `var password by remember { mutableStateOf("") }
var visible by remember { mutableStateOf(false) }

val strength = when {
    password.length < 6 -> "弱"
    password.length < 10 -> "中"
    else -> "强"
}

val strengthColor = when (strength) {
    "弱" -> MaterialTheme.colorScheme.error
    "中" -> Color(0xFFFFA500)
    else -> Color(0xFF4CAF50)
}

OutlinedTextField(
    value = password,
    onValueChange = { password = it },
    label = { Text("密码") },
    visualTransformation = if (visible) VisualTransformation.None
                           else PasswordVisualTransformation(),
    trailingIcon = {
        IconButton(onClick = { visible = !visible }) {
            Icon(
                if (visible) Icons.Default.Visibility else Icons.Default.VisibilityOff,
                contentDescription = if (visible) "隐藏" else "显示"
            )
        }
    },
    supportingText = {
        if (password.isNotEmpty()) {
            Text(
                "密码强度: $strength",
                color = strengthColor
            )
        }
    },
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Password
    ),
    singleLine = true,
    modifier = Modifier.fillMaxWidth()
)`,
    },
  ],

  useCases: [
    {
      title: '登录表单',
      description: '使用 OutlinedTextField 构建清晰的登录界面',
      code: `@Composable
fun LoginForm(
    onLogin: (String, String) -> Unit
) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var passwordVisible by remember { mutableStateOf(false) }

    val emailError = email.isNotEmpty() && !Patterns.EMAIL_ADDRESS.matcher(email).matches()

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("邮箱") },
            leadingIcon = {
                Icon(Icons.Default.Email, contentDescription = null)
            },
            isError = emailError,
            supportingText = {
                if (emailError) Text("请输入有效的邮箱地址")
            },
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Email,
                imeAction = ImeAction.Next
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
                        if (passwordVisible) Icons.Default.Visibility
                        else Icons.Default.VisibilityOff,
                        contentDescription = null
                    )
                }
            },
            visualTransformation = if (passwordVisible) VisualTransformation.None
                                   else PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Password,
                imeAction = ImeAction.Done
            ),
            keyboardActions = KeyboardActions(
                onDone = {
                    if (!emailError && email.isNotEmpty() && password.isNotEmpty()) {
                        onLogin(email, password)
                    }
                }
            ),
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )

        Button(
            onClick = { onLogin(email, password) },
            enabled = !emailError && email.isNotEmpty() && password.isNotEmpty(),
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("登录")
        }
    }
}`
    },
    {
      title: '动态验证反馈',
      description: '实时验证输入并提供即时反馈',
      code: `@Composable
fun PhoneNumberInput(
    value: String,
    onValueChange: (String) -> Unit
) {
    val isValid = value.matches(Regex("^1[3-9]\\\\d{9}\$"))
    val showCheck = value.length == 11 && isValid

    OutlinedTextField(
        value = value,
        onValueChange = { newValue ->
            // 只允许数字且最多 11 位
            if (newValue.all { it.isDigit() } && newValue.length <= 11) {
                onValueChange(newValue)
            }
        },
        label = { Text("手机号") },
        leadingIcon = {
            Icon(Icons.Default.Phone, contentDescription = null)
        },
        trailingIcon = {
            if (showCheck) {
                Icon(
                    Icons.Default.CheckCircle,
                    contentDescription = "有效",
                    tint = MaterialTheme.colorScheme.primary
                )
            }
        },
        isError = value.length == 11 && !isValid,
        supportingText = {
            Text("11 / 11")
        },
        keyboardOptions = KeyboardOptions(
            keyboardType = KeyboardType.Phone
        ),
        singleLine = true,
        modifier = Modifier.fillMaxWidth()
    )
}`
    },
  ],

  bestPractices: [
    {
      title: 'OutlinedTextField vs TextField 选择',
      description: 'OutlinedTextField 边界清晰，适合复杂表单；TextField 更轻量，适合搜索框',
      goodExample: `// 表单场景：使用 OutlinedTextField
OutlinedTextField(
    value = name,
    onValueChange = { name = it },
    label = { Text("姓名") }
)

// 搜索场景：使用 TextField
TextField(
    value = query,
    onValueChange = { query = it },
    placeholder = { Text("搜索...") }
)`,
    },
    {
      title: '合理使用 readOnly',
      description: '下拉选择等场景使用 readOnly 而不是 enabled = false',
      goodExample: `OutlinedTextField(
    value = selectedOption,
    onValueChange = {},
    readOnly = true,  // 可点击触发下拉，但不能直接输入
    label = { Text("选择城市") }
)`,
      badExample: `OutlinedTextField(
    value = selectedOption,
    onValueChange = {},
    enabled = false,  // 完全禁用，无法点击
    label = { Text("选择城市") }
)`
    },
    {
      title: 'supportingText 提供有用信息',
      description: '使用辅助文本引导用户而不只是显示错误',
      goodExample: `OutlinedTextField(
    value = password,
    onValueChange = { password = it },
    label = { Text("密码") },
    supportingText = {
        if (password.isEmpty()) {
            Text("至少 8 个字符，包含字母和数字")
        } else if (password.length < 8) {
            Text("密码过短")
        } else {
            Text("密码强度良好")
        }
    }
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'OutlinedTextField 与 TextField 参数完全相同',
      content: '两者只是视觉风格不同（描边 vs 填充），所有参数、功能、用法都一致，可以直接互换'
    },
    {
      type: 'warning',
      title: '浮动标签需要边框空间',
      content: 'OutlinedTextField 的标签聚焦时会浮动到边框上，如果标签过长可能被裁剪。建议保持标签简短'
    },
    {
      type: 'tip',
      title: 'OutlinedTextField 更适合浅色背景',
      content: '描边风格在浅色背景上更清晰。深色背景下，TextField 的填充风格可能视觉效果更好'
    },
    {
      type: 'tip',
      title: '使用 colors 自定义边框颜色',
      content: 'OutlinedTextFieldDefaults.colors() 可以自定义聚焦/未聚焦/错误状态的边框颜色'
    },
    {
      type: 'danger',
      title: '避免过度使用错误状态',
      content: '不要在用户开始输入时就显示错误。应该在失去焦点或提交表单时验证，避免干扰用户输入'
    },
  ],

  relatedComponents: ['text-field', 'basic-text-field'],
  since: '1.0.0',
}
