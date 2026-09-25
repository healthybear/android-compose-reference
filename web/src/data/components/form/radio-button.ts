import type { ComponentEntry } from '../../types'

export const radioButtonComponent: ComponentEntry = {
  id: 'radio-button',
  demo: { id: 'radio-button', sourceFile: 'RadioButtonDemo.kt' },
  name: 'RadioButton',
  category: 'Form',
  description: 'RadioButton 是 Material Design 3 的单选按钮组件，用于从多个选项中选择一个。同组内的 RadioButton 互斥，选中一个会自动取消其他选项。通常配合标签使用。',
  tags: ['radiobutton', 'form', 'selection', 'radio', 'single-choice', 'exclusive'],
  params: [
    { name: 'selected', type: 'Boolean', required: true, description: '是否选中，true 为选中，false 为未选中' },
    { name: 'onClick', type: '(() -> Unit)?', required: true, description: '点击回调，null 时 RadioButton 变为只读' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、内边距等' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用，false 时显示禁用样式且不可交互' },
    { name: 'colors', type: 'RadioButtonColors', default: 'RadioButtonDefaults.colors()', description: '颜色配置（选中/未选中/禁用状态）' },
    { name: 'interactionSource', type: 'MutableInteractionSource?', default: 'null', description: '交互状态源' },
  ],
  examples: [
    {
      title: '基础单选组',
      code: `val options = listOf("选项 A", "选项 B", "选项 C")
var selectedOption by remember { mutableStateOf(options[0]) }

Column {
    options.forEach { option ->
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier
                .fillMaxWidth()
                .selectable(
                    selected = selectedOption == option,
                    onClick = { selectedOption = option }
                )
                .padding(16.dp)
        ) {
            RadioButton(
                selected = selectedOption == option,
                onClick = null  // 由外层 selectable 控制
            )
            Spacer(Modifier.width(8.dp))
            Text(option)
        }
    }
}`,
    },
    {
      title: '带描述的单选项',
      code: `data class Option(val title: String, val description: String)

val options = listOf(
    Option("免费版", "基础功能，广告支持"),
    Option("专业版", "¥30/月，无广告，高级功能"),
    Option("企业版", "¥99/月，团队协作，优先支持")
)
var selectedOption by remember { mutableStateOf(options[0]) }

Column {
    options.forEach { option ->
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .selectable(
                    selected = selectedOption == option,
                    onClick = { selectedOption = option }
                )
                .padding(16.dp),
            verticalAlignment = Alignment.Top
        ) {
            RadioButton(
                selected = selectedOption == option,
                onClick = null,
                modifier = Modifier.padding(top = 2.dp)
            )
            Spacer(Modifier.width(12.dp))
            Column {
                Text(
                    option.title,
                    style = MaterialTheme.typography.bodyLarge
                )
                Text(
                    option.description,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}`,
    },
    {
      title: '水平单选组',
      code: `val options = listOf("小", "中", "大")
var selected by remember { mutableStateOf("中") }

Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.SpaceEvenly
) {
    options.forEach { option ->
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.selectable(
                selected = selected == option,
                onClick = { selected = option }
            )
        ) {
            RadioButton(
                selected = selected == option,
                onClick = null
            )
            Text(option)
        }
    }
}`,
    },
    {
      title: '禁用状态',
      code: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    // 禁用且未选中
    Row(verticalAlignment = Alignment.CenterVertically) {
        RadioButton(
            selected = false,
            onClick = null,
            enabled = false
        )
        Text("禁用选项", color = Color.Gray)
    }

    // 禁用且已选中
    Row(verticalAlignment = Alignment.CenterVertically) {
        RadioButton(
            selected = true,
            onClick = null,
            enabled = false
        )
        Text("已选（禁用）", color = Color.Gray)
    }
}`,
    },
    {
      title: '自定义颜色',
      code: `var selected by remember { mutableStateOf(true) }

RadioButton(
    selected = selected,
    onClick = { selected = !selected },
    colors = RadioButtonDefaults.colors(
        selectedColor = Color(0xFF4CAF50),
        unselectedColor = Color.Gray
    )
)`,
    },
    {
      title: '使用枚举管理选项',
      code: `enum class PaymentMethod(val displayName: String) {
    ALIPAY("支付宝"),
    WECHAT("微信支付"),
    CREDIT_CARD("信用卡")
}

@Composable
fun PaymentSelector() {
    var selected by remember { mutableStateOf(PaymentMethod.ALIPAY) }

    Column {
        PaymentMethod.values().forEach { method ->
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .fillMaxWidth()
                    .selectable(
                        selected = selected == method,
                        onClick = { selected = method }
                    )
                    .padding(16.dp)
            ) {
                RadioButton(
                    selected = selected == method,
                    onClick = null
                )
                Spacer(Modifier.width(8.dp))
                Text(method.displayName)
            }
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '表单中的单选字段',
      description: '在表单中使用 RadioButton 选择单个选项',
      code: `@Composable
fun GenderSelector(
    selectedGender: Gender,
    onGenderChange: (Gender) -> Unit
) {
    Column {
        Text(
            "性别",
            style = MaterialTheme.typography.labelLarge,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        Gender.values().forEach { gender ->
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .fillMaxWidth()
                    .selectable(
                        selected = selectedGender == gender,
                        onClick = { onGenderChange(gender) }
                    )
                    .padding(vertical = 8.dp)
            ) {
                RadioButton(
                    selected = selectedGender == gender,
                    onClick = null
                )
                Spacer(Modifier.width(8.dp))
                Text(gender.displayName)
            }
        }
    }
}

enum class Gender(val displayName: String) {
    MALE("男"),
    FEMALE("女"),
    OTHER("其他")
}`
    },
    {
      title: '设置面板',
      description: '使用 RadioButton 选择应用设置选项',
      code: `@Composable
fun ThemeSelector() {
    var theme by remember { mutableStateOf(Theme.SYSTEM) }

    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                "主题设置",
                style = MaterialTheme.typography.titleMedium,
                modifier = Modifier.padding(bottom = 12.dp)
            )

            Theme.values().forEach { option ->
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier
                        .fillMaxWidth()
                        .selectable(
                            selected = theme == option,
                            onClick = { theme = option }
                        )
                        .padding(vertical = 12.dp)
                ) {
                    RadioButton(
                        selected = theme == option,
                        onClick = null
                    )
                    Spacer(Modifier.width(12.dp))
                    Column {
                        Text(option.title)
                        Text(
                            option.description,
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        }
    }
}

enum class Theme(val title: String, val description: String) {
    LIGHT("浅色", "始终使用浅色主题"),
    DARK("深色", "始终使用深色主题"),
    SYSTEM("跟随系统", "根据系统设置自动切换")
}`
    },
  ],

  bestPractices: [
    {
      title: 'RadioButton 应成组使用',
      description: 'RadioButton 必须配合其他选项使用，至少 2 个选项',
      goodExample: `val options = listOf("选项 1", "选项 2", "选项 3")
var selected by remember { mutableStateOf(options[0]) }

options.forEach { option ->
    RadioButton(
        selected = selected == option,
        onClick = { selected = option }
    )
}`,
      badExample: `// 单独一个 RadioButton 无意义
RadioButton(selected = true, onClick = { })`
    },
    {
      title: '使用 selectable 而非 clickable',
      description: 'selectable 提供更好的无障碍支持',
      goodExample: `Row(
    modifier = Modifier.selectable(
        selected = selected == option,
        onClick = { selected = option }
    )
) {
    RadioButton(selected = selected == option, onClick = null)
    Text(option)
}`,
      badExample: `Row(
    modifier = Modifier.clickable { selected = option }
) {
    RadioButton(selected = selected == option, onClick = null)
    // clickable 不提供单选语义
}`
    },
    {
      title: 'RadioButton 配合标签使用',
      description: '单独的 RadioButton 用户不知道选择的是什么',
      goodExample: `Row {
    RadioButton(selected = true, onClick = { })
    Text("选项说明")
}`,
      badExample: `// 没有标签，用户不知道选项含义
RadioButton(selected = true, onClick = { })`
    },
    {
      title: '至少有一个默认选中',
      description: 'RadioButton 组应始终有一个选项被选中',
      goodExample: `var selected by remember { mutableStateOf(options[0]) }  // 默认选中第一项`,
      badExample: `var selected by remember { mutableStateOf<String?>(null) }  // 无默认选项`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'RadioButton 用于互斥单选',
      content: 'RadioButton 适合 2-7 个互斥选项。选项过多（>7）考虑使用 Dropdown 或 BottomSheet'
    },
    {
      type: 'warning',
      title: 'RadioButton 选中后不能取消选中',
      content: 'RadioButton 组中必须始终有一个选中。需要可取消的选项使用 Checkbox'
    },
    {
      type: 'info',
      title: '使用 selectable 提供无障碍支持',
      content: 'Modifier.selectable 自动添加单选组的语义信息，比 clickable 更适合 RadioButton'
    },
    {
      type: 'info',
      title: 'RadioButton 自动满足最小触摸目标',
      content: 'RadioButton 默认尺寸已满足 48dp 最小触摸目标，但配合 selectable 扩展整行更友好'
    },
    {
      type: 'error',
      title: '避免选项过多',
      content: '超过 7 个选项时，RadioButton 列表过长。考虑使用 DropdownMenu 或分组展示'
    },
  ],

  relatedComponents: ['checkbox', 'switch', 'dropdown-menu'],
  since: '1.0.0',
}
