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
}

// 延迟聚焦
LaunchedEffect(Unit) {
    delay(300)  // 等待动画完成
    focusRequester.requestFocus()
}`,
    },
    {
      title: '焦点链（回车跳转下一个）',
      code: `val (first, second, third) = remember { FocusRequester.createRefs() }

Column(
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(12.dp)
) {
    TextField(
        value = name,
        onValueChange = { name = it },
        label = { Text("姓名") },
        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next),
        keyboardActions = KeyboardActions(onNext = { second.requestFocus() }),
        modifier = Modifier
            .fillMaxWidth()
            .focusRequester(first)
    )

    TextField(
        value = email,
        onValueChange = { email = it },
        label = { Text("邮箱") },
        keyboardOptions = KeyboardOptions(
            keyboardType = KeyboardType.Email,
            imeAction = ImeAction.Next
        ),
        keyboardActions = KeyboardActions(onNext = { third.requestFocus() }),
        modifier = Modifier
            .fillMaxWidth()
            .focusRequester(second)
    )

    TextField(
        value = phone,
        onValueChange = { phone = it },
        label = { Text("手机号") },
        keyboardOptions = KeyboardOptions(
            keyboardType = KeyboardType.Phone,
            imeAction = ImeAction.Done
        ),
        keyboardActions = KeyboardActions(onDone = {
            // 完成输入，隐藏键盘
            defaultKeyboardAction(ImeAction.Done)
        }),
        modifier = Modifier
            .fillMaxWidth()
            .focusRequester(third)
    )
}

LaunchedEffect(Unit) {
    first.requestFocus()
}`,
    },
    {
      title: '条件聚焦',
      code: `var showDialog by remember { mutableStateOf(false) }
val focusRequester = remember { FocusRequester() }

if (showDialog) {
    AlertDialog(
        onDismissRequest = { showDialog = false },
        title = { Text("输入名称") },
        text = {
            TextField(
                value = inputText,
                onValueChange = { inputText = it },
                modifier = Modifier.focusRequester(focusRequester)
            )
        },
        confirmButton = {
            TextButton(onClick = { showDialog = false }) {
                Text("确定")
            }
        }
    )

    LaunchedEffect(Unit) {
        // 对话框显示后自动聚焦输入框
        focusRequester.requestFocus()
    }
}

Button(onClick = { showDialog = true }) {
    Text("打开对话框")
}`,
    },
    {
      title: '搜索框自动聚焦',
      code: `@Composable
fun SearchScreen() {
    var searchQuery by remember { mutableStateOf("") }
    val focusRequester = remember { FocusRequester() }
    val focusManager = LocalFocusManager.current

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    TextField(
                        value = searchQuery,
                        onValueChange = { searchQuery = it },
                        placeholder = { Text("搜索...") },
                        modifier = Modifier
                            .fillMaxWidth()
                            .focusRequester(focusRequester),
                        colors = TextFieldDefaults.colors(
                            unfocusedContainerColor = Color.Transparent,
                            focusedContainerColor = Color.Transparent
                        ),
                        singleLine = true,
                        trailingIcon = {
                            if (searchQuery.isNotEmpty()) {
                                IconButton(onClick = {
                                    searchQuery = ""
                                    focusRequester.requestFocus()
                                }) {
                                    Icon(Icons.Default.Clear, contentDescription = "清除")
                                }
                            }
                        }
                    )
                },
                navigationIcon = {
                    IconButton(onClick = {
                        focusManager.clearFocus()
                        // 返回上一页
                    }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "返回")
                    }
                }
            )
        }
    ) { padding ->
        // 搜索结果列表
        LazyColumn(contentPadding = padding) {
            items(20) { index ->
                ListItem(
                    headlineContent = { Text("搜索结果 " + index.toString()) }
                )
            }
        }
    }

    LaunchedEffect(Unit) {
        focusRequester.requestFocus()
    }
}`,
    },
    {
      title: '表单验证后聚焦错误字段',
      code: `data class FormData(val name: String = "", val email: String = "", val age: String = "")

@Composable
fun ValidationForm() {
    var formData by remember { mutableStateOf(FormData()) }
    var errors by remember { mutableStateOf<Map<String, String>>(emptyMap()) }

    val nameFocusRequester = remember { FocusRequester() }
    val emailFocusRequester = remember { FocusRequester() }
    val ageFocusRequester = remember { FocusRequester() }

    fun validate(): Boolean {
        val newErrors = mutableMapOf<String, String>()

        if (formData.name.isBlank()) {
            newErrors["name"] = "姓名不能为空"
        }
        if (formData.email.isBlank()) {
            newErrors["email"] = "邮箱不能为空"
        } else if (!formData.email.contains("@")) {
            newErrors["email"] = "邮箱格式不正确"
        }
        if (formData.age.isBlank()) {
            newErrors["age"] = "年龄不能为空"
        } else if (formData.age.toIntOrNull() == null) {
            newErrors["age"] = "年龄必须是数字"
        }

        errors = newErrors

        // 聚焦到第一个错误字段
        when (newErrors.keys.firstOrNull()) {
            "name" -> nameFocusRequester.requestFocus()
            "email" -> emailFocusRequester.requestFocus()
            "age" -> ageFocusRequester.requestFocus()
        }

        return newErrors.isEmpty()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        OutlinedTextField(
            value = formData.name,
            onValueChange = { formData = formData.copy(name = it) },
            label = { Text("姓名") },
            isError = errors.containsKey("name"),
            supportingText = errors["name"]?.let { { Text(it) } },
            modifier = Modifier
                .fillMaxWidth()
                .focusRequester(nameFocusRequester)
        )

        OutlinedTextField(
            value = formData.email,
            onValueChange = { formData = formData.copy(email = it) },
            label = { Text("邮箱") },
            isError = errors.containsKey("email"),
            supportingText = errors["email"]?.let { { Text(it) } },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
            modifier = Modifier
                .fillMaxWidth()
                .focusRequester(emailFocusRequester)
        )

        OutlinedTextField(
            value = formData.age,
            onValueChange = { formData = formData.copy(age = it) },
            label = { Text("年龄") },
            isError = errors.containsKey("age"),
            supportingText = errors["age"]?.let { { Text(it) } },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            modifier = Modifier
                .fillMaxWidth()
                .focusRequester(ageFocusRequester)
        )

        Button(
            onClick = {
                if (validate()) {
                    // 提交表单
                }
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("提交")
        }
    }
}`,
    },
    {
      title: '自定义焦点顺序',
      code: `val (field1, field2, field3, field4) = FocusRequester.createRefs()

Column(
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(12.dp)
) {
    TextField(
        value = text1,
        onValueChange = { text1 = it },
        label = { Text("字段 1") },
        modifier = Modifier
            .fillMaxWidth()
            .focusRequester(field1)
            .focusProperties {
                next = field3  // Tab 键跳转到字段 3
            }
    )

    TextField(
        value = text2,
        onValueChange = { text2 = it },
        label = { Text("字段 2") },
        modifier = Modifier
            .fillMaxWidth()
            .focusRequester(field2)
            .focusProperties {
                next = field4  // Tab 键跳转到字段 4
            }
    )

    TextField(
        value = text3,
        onValueChange = { text3 = it },
        label = { Text("字段 3（优先级高）") },
        modifier = Modifier
            .fillMaxWidth()
            .focusRequester(field3)
            .focusProperties {
                next = field2
                previous = field1
            }
    )

    TextField(
        value = text4,
        onValueChange = { text4 = it },
        label = { Text("字段 4") },
        modifier = Modifier
            .fillMaxWidth()
            .focusRequester(field4)
            .focusProperties {
                previous = field2
            }
    )
}`,
    },
    {
      title: '清除焦点',
      code: `val focusRequester = remember { FocusRequester() }
val focusManager = LocalFocusManager.current

Column(
    modifier = Modifier
        .fillMaxSize()
        .padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(12.dp)
) {
    TextField(
        value = text,
        onValueChange = { text = it },
        label = { Text("输入文字") },
        modifier = Modifier
            .fillMaxWidth()
            .focusRequester(focusRequester)
    )

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Button(onClick = { focusRequester.requestFocus() }) {
            Text("聚焦")
        }

        Button(onClick = { focusManager.clearFocus() }) {
            Text("取消聚焦")
        }

        Button(onClick = { focusManager.clearFocus(force = true) }) {
            Text("强制取消")
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '登录表单',
      description: '实现用户名密码输入的焦点管理',
      code: `@Composable
fun LoginScreen() {
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    val (usernameFocus, passwordFocus) = remember { FocusRequester.createRefs() }
    val focusManager = LocalFocusManager.current

    fun login() {
        focusManager.clearFocus()
        // 执行登录逻辑
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(32.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "登录",
            style = MaterialTheme.typography.headlineLarge,
            fontWeight = FontWeight.Bold
        )

        Spacer(Modifier.height(32.dp))

        OutlinedTextField(
            value = username,
            onValueChange = { username = it },
            label = { Text("用户名") },
            leadingIcon = { Icon(Icons.Default.Person, contentDescription = null) },
            singleLine = true,
            keyboardOptions = KeyboardOptions(
                imeAction = ImeAction.Next
            ),
            keyboardActions = KeyboardActions(
                onNext = { passwordFocus.requestFocus() }
            ),
            modifier = Modifier
                .fillMaxWidth()
                .focusRequester(usernameFocus)
        )

        Spacer(Modifier.height(16.dp))

        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("密码") },
            leadingIcon = { Icon(Icons.Default.Lock, contentDescription = null) },
            visualTransformation = PasswordVisualTransformation(),
            singleLine = true,
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Password,
                imeAction = ImeAction.Done
            ),
            keyboardActions = KeyboardActions(
                onDone = { login() }
            ),
            modifier = Modifier
                .fillMaxWidth()
                .focusRequester(passwordFocus)
        )

        Spacer(Modifier.height(24.dp))

        Button(
            onClick = { login() },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("登录")
        }
    }

    LaunchedEffect(Unit) {
        usernameFocus.requestFocus()
    }
}`
    },
    {
      title: '动态表单焦点管理',
      description: '根据用户选择动态聚焦不同的输入字段',
      code: `@Composable
fun DynamicForm() {
    var contactMethod by remember { mutableStateOf("email") }
    var email by remember { mutableStateOf("") }
    var phone by remember { mutableStateOf("") }

    val emailFocusRequester = remember { FocusRequester() }
    val phoneFocusRequester = remember { FocusRequester() }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            text = "选择联系方式",
            style = MaterialTheme.typography.titleMedium
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            FilterChip(
                selected = contactMethod == "email",
                onClick = {
                    contactMethod = "email"
                    emailFocusRequester.requestFocus()
                },
                label = { Text("邮箱") },
                leadingIcon = {
                    Icon(
                        Icons.Default.Email,
                        contentDescription = null,
                        modifier = Modifier.size(18.dp)
                    )
                }
            )

            FilterChip(
                selected = contactMethod == "phone",
                onClick = {
                    contactMethod = "phone"
                    phoneFocusRequester.requestFocus()
                },
                label = { Text("手机") },
                leadingIcon = {
                    Icon(
                        Icons.Default.Phone,
                        contentDescription = null,
                        modifier = Modifier.size(18.dp)
                    )
                }
            )
        }

        AnimatedVisibility(visible = contactMethod == "email") {
            OutlinedTextField(
                value = email,
                onValueChange = { email = it },
                label = { Text("邮箱地址") },
                keyboardOptions = KeyboardOptions(
                    keyboardType = KeyboardType.Email
                ),
                modifier = Modifier
                    .fillMaxWidth()
                    .focusRequester(emailFocusRequester)
            )
        }

        AnimatedVisibility(visible = contactMethod == "phone") {
            OutlinedTextField(
                value = phone,
                onValueChange = { phone = it },
                label = { Text("手机号码") },
                keyboardOptions = KeyboardOptions(
                    keyboardType = KeyboardType.Phone
                ),
                modifier = Modifier
                    .fillMaxWidth()
                    .focusRequester(phoneFocusRequester)
            )
        }

        Button(
            onClick = { /* 提交 */ },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("提交")
        }
    }

    LaunchedEffect(contactMethod) {
        delay(100)  // 等待动画完成
        when (contactMethod) {
            "email" -> emailFocusRequester.requestFocus()
            "phone" -> phoneFocusRequester.requestFocus()
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 LaunchedEffect 请求焦点',
      description: '在组件首次显示时自动聚焦，需要在 LaunchedEffect 中调用',
      goodExample: `val focusRequester = remember { FocusRequester() }

TextField(
    value = text,
    onValueChange = { text = it },
    modifier = Modifier.focusRequester(focusRequester)
)

LaunchedEffect(Unit) {
    focusRequester.requestFocus()
}`,
      badExample: `val focusRequester = remember { FocusRequester() }

TextField(
    value = text,
    onValueChange = { text = it },
    modifier = Modifier.focusRequester(focusRequester)
)

// 直接调用会失败，因为组件还未布局完成
focusRequester.requestFocus()`,
    },
    {
      title: '使用 FocusRequester.createRefs() 创建多个引用',
      description: '需要管理多个焦点时使用解构声明',
      goodExample: `val (first, second, third) = remember { FocusRequester.createRefs() }

TextField(modifier = Modifier.focusRequester(first))
TextField(modifier = Modifier.focusRequester(second))
TextField(modifier = Modifier.focusRequester(third))`,
      badExample: `val focusRequester1 = remember { FocusRequester() }
val focusRequester2 = remember { FocusRequester() }
val focusRequester3 = remember { FocusRequester() }  // 冗余`,
    },
    {
      title: '配合 KeyboardActions 实现表单导航',
      description: '使用 imeAction 和 keyboardActions 实现回车键跳转',
      goodExample: `TextField(
    value = text,
    onValueChange = { text = it },
    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next),
    keyboardActions = KeyboardActions(onNext = { nextFocus.requestFocus() }),
    modifier = Modifier.focusRequester(currentFocus)
)`,
      badExample: `TextField(
    value = text,
    onValueChange = { text = it },
    modifier = Modifier.focusRequester(currentFocus)
)
// 没有设置 imeAction 和 keyboardActions，用户体验差`,
    },
    {
      title: '使用 FocusManager 清除焦点',
      description: '需要隐藏键盘时使用 FocusManager.clearFocus()',
      goodExample: `val focusManager = LocalFocusManager.current

Button(onClick = {
    focusManager.clearFocus()  // 清除焦点并隐藏键盘
    // 提交表单
}) {
    Text("提交")
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'FocusRequester 必须绑定到组件',
      content: '使用 Modifier.focusRequester() 将 FocusRequester 绑定到组件，然后才能调用 requestFocus()'
    },
    {
      type: 'info',
      title: 'requestFocus() 必须在布局完成后调用',
      content: '通常在 LaunchedEffect 中调用 requestFocus()，确保组件已经布局完成'
    },
    {
      type: 'tip',
      title: 'FocusRequester.createRefs() 简化多个引用',
      content: '创建多个 FocusRequester 时使用 createRefs() 并解构声明，代码更简洁'
    },
    {
      type: 'tip',
      title: '使用 focusProperties 自定义焦点顺序',
      content: 'Modifier.focusProperties { next = ...; previous = ... } 可以自定义 Tab 键的焦点顺序'
    },
    {
      type: 'tip',
      title: 'LocalFocusManager 提供全局焦点控制',
      content: 'LocalFocusManager.current.clearFocus() 可以清除当前焦点并隐藏键盘'
    },
    {
      type: 'warning',
      title: '避免在 Composable 顶层直接调用',
      content: 'requestFocus() 必须在事件回调或 LaunchedEffect 中调用，不能在 Composable 函数体直接调用'
    },
  ],

  relatedComponents: ['text-field', 'keyboard-options'],
  since: '1.0.0',
}
