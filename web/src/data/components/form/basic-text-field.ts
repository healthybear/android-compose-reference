import type { ComponentEntry } from '../../types'

export const basicTextFieldComponent: ComponentEntry = {
  id: 'basic-text-field',
  name: 'BasicTextField',
  category: 'Form',
  description: 'BasicTextField 是无样式的底层文本输入组件，提供完全自定义的外观。从 Compose UI 1.8+ 开始使用新的 TextFieldState API，性能更优且功能更强大。适合需要自定义输入框样式的场景。',
  tags: ['basictextfield', 'input', 'custom', 'form', 'text', 'unstyled'],
  params: [
    { name: 'state', type: 'TextFieldState', required: true, description: '文本状态，由 rememberTextFieldState() 创建，持有输入内容、光标位置和选区' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、内边距等' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用输入' },
    { name: 'readOnly', type: 'Boolean', default: 'false', description: '是否只读（可选择但不可编辑）' },
    { name: 'inputTransformation', type: 'InputTransformation?', default: 'null', description: '输入过滤/转换，如限制字符类型、最大长度、格式化' },
    { name: 'textStyle', type: 'TextStyle', default: 'TextStyle.Default', description: '输入文本样式' },
    { name: 'keyboardOptions', type: 'KeyboardOptions', default: 'KeyboardOptions.Default', description: '键盘类型、输入法动作等配置' },
    { name: 'keyboardActions', type: 'KeyboardActions', default: 'KeyboardActions.Default', description: '键盘动作回调' },
    { name: 'lineLimits', type: 'TextFieldLineLimits', default: 'TextFieldLineLimits.Default', description: '行数限制（SingleLine 或 MultiLine(minHeightInLines, maxHeightInLines)）' },
    { name: 'onTextLayout', type: '(Density.(getResult: () -> TextLayoutResult?) -> Unit)?', default: 'null', description: '文本布局回调' },
    { name: 'interactionSource', type: 'MutableInteractionSource?', default: 'null', description: '交互状态源' },
    { name: 'cursorBrush', type: 'Brush', default: 'SolidColor(Color.Black)', description: '光标颜色' },
    { name: 'outputTransformation', type: 'OutputTransformation?', default: 'null', description: '输出展示转换（如密码遮罩、格式化显示）' },
    { name: 'decorator', type: 'TextFieldDecorator?', default: 'null', description: '自定义外观装饰，通过 TextFieldDecorator { innerTextField -> } 包裹输入区域' },
    { name: 'scrollState', type: 'ScrollState', default: 'rememberScrollState()', description: '滚动状态，用于单行文本的水平滚动' },
    { name: 'codepointTransformation', type: 'CodepointTransformation?', default: 'null', description: '字符级转换（已废弃，使用 outputTransformation）' },
  ],
  examples: [
    {
      title: '基础用法（自定义边框）',
      code: `val state = rememberTextFieldState()

BasicTextField(
    state = state,
    textStyle = MaterialTheme.typography.bodyLarge,
    lineLimits = TextFieldLineLimits.SingleLine,
    decorator = { innerTextField ->
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
        .then { _, valueWithChanges ->
            // 只允许字母和数字
            if (!valueWithChanges.asCharSequence().all { it.isLetterOrDigit() }) {
                valueWithChanges.revertAllChanges()
            }
        },
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Ascii),
    decorator = { innerTextField ->
        Column {
            innerTextField()
            Text(
                "8 / 20",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
)`,
    },
    {
      title: '格式化显示（电话号码）',
      code: `val state = rememberTextFieldState()

BasicTextField(
    state = state,
    inputTransformation = InputTransformation
        .maxLength(11)
        .then { _, changes ->
            // 只允许数字
            if (!changes.asCharSequence().all { it.isDigit() }) {
                changes.revertAllChanges()
            }
        },
    outputTransformation = { text ->
        // 格式化显示为 138-1234-5678
        val digits = text.toString()
        val formatted = buildString {
            digits.forEachIndexed { index, char ->
                if (index == 3 || index == 7) append('-')
                append(char)
            }
        }
        TransformedText(formatted, PhoneNumberOffsetMapping(digits.length))
    },
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone),
    decorator = { innerTextField ->
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.LightGray.copy(alpha = 0.3f), RoundedCornerShape(8.dp))
                .padding(16.dp)
        ) {
            innerTextField()
        }
    }
)`,
    },
    {
      title: '读取和修改文本',
      code: `val state = rememberTextFieldState(initialText = "初始内容")

// 读取当前文本
val text: CharSequence = state.text
val textString = state.text.toString()

// 程序化修改文本
Button(onClick = {
    state.edit {
        replace(0, length, "新内容")
        placeCursorAtEnd()
    }
}) {
    Text("替换文本")
}

// 清空
Button(onClick = {
    state.clearText()
}) {
    Text("清空")
}

BasicTextField(state = state)`,
    },
    {
      title: '带图标的搜索框',
      code: `val state = rememberTextFieldState()

BasicTextField(
    state = state,
    lineLimits = TextFieldLineLimits.SingleLine,
    textStyle = MaterialTheme.typography.bodyLarge,
    decorator = { innerTextField ->
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    MaterialTheme.colorScheme.surfaceVariant,
                    RoundedCornerShape(24.dp)
                )
                .padding(horizontal = 16.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                Icons.Default.Search,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Spacer(Modifier.width(8.dp))
            Box(modifier = Modifier.weight(1f)) {
                if (state.text.isEmpty()) {
                    Text(
                        "搜索...",
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                innerTextField()
            }
            if (state.text.isNotEmpty()) {
                IconButton(onClick = { state.clearText() }) {
                    Icon(Icons.Default.Clear, contentDescription = "清除")
                }
            }
        }
    }
)`,
    },
  ],

  useCases: [
    {
      title: '自定义标签和错误提示',
      description: '使用 decorator 实现完全自定义的输入框布局',
      code: `@Composable
fun CustomTextField(
    state: TextFieldState,
    label: String,
    errorMessage: String? = null,
    modifier: Modifier = Modifier
) {
    Column(modifier = modifier) {
        Text(
            text = label,
            style = MaterialTheme.typography.labelMedium,
            color = if (errorMessage != null) MaterialTheme.colorScheme.error
                    else MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(4.dp))
        BasicTextField(
            state = state,
            textStyle = MaterialTheme.typography.bodyLarge,
            lineLimits = TextFieldLineLimits.SingleLine,
            cursorBrush = SolidColor(MaterialTheme.colorScheme.primary),
            decorator = { innerTextField ->
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .border(
                            width = 1.dp,
                            color = if (errorMessage != null) MaterialTheme.colorScheme.error
                                    else MaterialTheme.colorScheme.outline,
                            shape = RoundedCornerShape(8.dp)
                        )
                        .padding(16.dp)
                ) {
                    innerTextField()
                }
            }
        )
        if (errorMessage != null) {
            Spacer(Modifier.height(4.dp))
            Text(
                text = errorMessage,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.error
            )
        }
    }
}`
    },
    {
      title: 'Tag 输入框（多值输入）',
      description: '实现类似标签输入的自定义控件',
      code: `@Composable
fun TagInput(
    tags: List<String>,
    onTagsChange: (List<String>) -> Unit
) {
    val state = rememberTextFieldState()
    val focusRequester = remember { FocusRequester() }

    BasicTextField(
        state = state,
        lineLimits = TextFieldLineLimits.SingleLine,
        keyboardOptions = KeyboardOptions(
            imeAction = ImeAction.Done
        ),
        keyboardActions = KeyboardActions(
            onDone = {
                val text = state.text.toString().trim()
                if (text.isNotEmpty()) {
                    onTagsChange(tags + text)
                    state.clearText()
                }
            }
        ),
        modifier = Modifier.focusRequester(focusRequester),
        decorator = { innerTextField ->
            FlowRow(
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, Color.Gray, RoundedCornerShape(8.dp))
                    .padding(8.dp)
                    .clickable { focusRequester.requestFocus() },
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                tags.forEach { tag ->
                    TagChip(
                        text = tag,
                        onRemove = {
                            onTagsChange(tags - tag)
                        }
                    )
                }
                Box(modifier = Modifier.weight(1f, fill = false)) {
                    if (state.text.isEmpty() && tags.isEmpty()) {
                        Text(
                            "添加标签...",
                            color = Color.Gray
                        )
                    }
                    innerTextField()
                }
            }
        }
    )
}

@Composable
fun TagChip(text: String, onRemove: () -> Unit) {
    Surface(
        color = MaterialTheme.colorScheme.primaryContainer,
        shape = RoundedCornerShape(16.dp)
    ) {
        Row(
            modifier = Modifier.padding(start = 12.dp, end = 4.dp, top = 4.dp, bottom = 4.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(text, style = MaterialTheme.typography.bodySmall)
            IconButton(
                onClick = onRemove,
                modifier = Modifier.size(20.dp)
            ) {
                Icon(
                    Icons.Default.Close,
                    contentDescription = "移除",
                    modifier = Modifier.size(16.dp)
                )
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 decorator 而非直接嵌套',
      description: 'decorator 确保输入区域正确处理焦点和触摸事件',
      goodExample: `BasicTextField(
    state = state,
    decorator = { innerTextField ->
        Box(modifier = Modifier.border(1.dp, Color.Gray)) {
            innerTextField()  // 必须调用
        }
    }
)`,
      badExample: `// 错误：不使用 decorator，直接嵌套 Box
Box(modifier = Modifier.border(1.dp, Color.Gray)) {
    BasicTextField(state = state)
    // 点击边框区域可能无法聚焦
}`
    },
    {
      title: '使用 inputTransformation 而非手动过滤',
      description: 'inputTransformation 性能更好且处理更完整（包括粘贴等）',
      goodExample: `BasicTextField(
    state = state,
    inputTransformation = InputTransformation.maxLength(10)
        .then { _, changes ->
            if (!changes.asCharSequence().all { it.isDigit() }) {
                changes.revertAllChanges()
            }
        }
)`,
      badExample: `// 旧版 API 方式（不推荐）
var text by remember { mutableStateOf("") }
BasicTextField(
    value = text,
    onValueChange = { newValue ->
        if (newValue.all { it.isDigit() } && newValue.length <= 10) {
            text = newValue
        }
    }
)`
    },
    {
      title: '为空状态提供占位符',
      description: '在 decorator 中检查状态并显示占位文本',
      goodExample: `decorator = { innerTextField ->
    Box {
        if (state.text.isEmpty()) {
            Text("请输入...", color = Color.Gray)
        }
        innerTextField()
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'TextFieldState 是新 API',
      content: 'Compose UI 1.8+ 推荐使用 TextFieldState API。旧版的 value + onValueChange API 仍然可用但不推荐新项目使用'
    },
    {
      type: 'warning',
      title: 'BasicTextField 无内置样式',
      content: 'BasicTextField 不提供任何视觉样式（无背景、无边框、无标签）。如需 Material Design 样式，使用 TextField 或 OutlinedTextField'
    },
    {
      type: 'info',
      title: 'TextFieldState 可保存和观察',
      content: 'TextFieldState.text 是可观察的 State，可以直接在 Composable 中读取并自动重组。使用 state.edit { } 可以批量修改文本'
    },
    {
      type: 'info',
      title: 'inputTransformation 和 outputTransformation 的区别',
      content: 'inputTransformation 影响实际存储的值（如过滤非法字符）；outputTransformation 只影响显示（如格式化显示），不改变实际值'
    },
    {
      type: 'error',
      title: '自定义 decorator 时注意焦点处理',
      content: '确保 innerTextField() 的父容器可点击且点击会聚焦输入框。避免在装饰器中拦截点击事件'
    },
  ],

  relatedComponents: ['text-field', 'outlined-text-field', 'text'],
  since: '1.0.0',
}
