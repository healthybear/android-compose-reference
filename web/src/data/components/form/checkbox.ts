import type { ComponentEntry } from '../../types'

export const checkboxComponent: ComponentEntry = {
  id: 'checkbox',
  demo: { id: 'checkbox', sourceFile: 'CheckboxDemo.kt' },
  name: 'Checkbox',
  category: 'Form',
  description: 'Checkbox 是 Material Design 3 的复选框组件，支持选中、未选中、不确定三种状态。适合多选场景、表单选项、全选控制等。通常配合文字标签使用。',
  tags: ['checkbox', 'form', 'selection', 'toggle', 'check', 'multi-select'],
  params: [
    { name: 'checked', type: 'Boolean', required: true, description: '是否选中，true 为选中，false 为未选中' },
    { name: 'onCheckedChange', type: '((Boolean) -> Unit)?', required: true, description: '状态变化回调，null 时 Checkbox 变为只读' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、内边距等' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用，false 时显示禁用样式且不可交互' },
    { name: 'colors', type: 'CheckboxColors', default: 'CheckboxDefaults.colors()', description: '颜色配置（选中/未选中/禁用状态）' },
    { name: 'interactionSource', type: 'MutableInteractionSource?', default: 'null', description: '交互状态源' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var checked by remember { mutableStateOf(false) }

Row(
    verticalAlignment = Alignment.CenterVertically,
    modifier = Modifier
        .fillMaxWidth()
        .clickable { checked = !checked }
        .padding(16.dp)
) {
    Checkbox(
        checked = checked,
        onCheckedChange = null  // 由外层 clickable 控制
    )
    Spacer(Modifier.width(8.dp))
    Text("同意用户协议")
}`,
    },
    {
      title: '多选列表',
      code: `data class Option(val id: Int, val text: String, var checked: Boolean)

@Composable
fun MultiSelectList() {
    var options by remember {
        mutableStateOf(
            listOf(
                Option(1, "选项 1", false),
                Option(2, "选项 2", true),
                Option(3, "选项 3", false)
            )
        )
    }

    Column {
        options.forEachIndexed { index, option ->
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable {
                        options = options.toMutableList().apply {
                            this[index] = option.copy(checked = !option.checked)
                        }
                    }
                    .padding(16.dp)
            ) {
                Checkbox(
                    checked = option.checked,
                    onCheckedChange = null
                )
                Spacer(Modifier.width(8.dp))
                Text(option.text)
            }
        }
    }
}`,
    },
    {
      title: '全选功能（三态 Checkbox）',
      code: `@Composable
fun SelectAllExample() {
    val items = remember { mutableStateListOf(false, false, false) }
    val allChecked = items.all { it }
    val someChecked = items.any { it }

    Column {
        // 全选复选框
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier
                .fillMaxWidth()
                .clickable {
                    val newState = !allChecked
                    items.indices.forEach { items[it] = newState }
                }
                .padding(16.dp)
        ) {
            TriStateCheckbox(
                state = when {
                    allChecked -> ToggleableState.On
                    someChecked -> ToggleableState.Indeterminate
                    else -> ToggleableState.Off
                },
                onClick = null
            )
            Spacer(Modifier.width(8.dp))
            Text("全选", fontWeight = FontWeight.Bold)
        }

        HorizontalDivider()

        // 子选项
        items.forEachIndexed { index, checked ->
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { items[index] = !items[index] }
                    .padding(start = 32.dp, end = 16.dp, top = 12.dp, bottom = 12.dp)
            ) {
                Checkbox(
                    checked = checked,
                    onCheckedChange = null
                )
                Spacer(Modifier.width(8.dp))
                Text("选项 " + (index + 1))
            }
        }
    }
}`,
    },
    {
      title: '禁用状态',
      code: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    // 禁用且未选中
    Row(verticalAlignment = Alignment.CenterVertically) {
        Checkbox(
            checked = false,
            onCheckedChange = null,
            enabled = false
        )
        Text("禁用未选中", color = Color.Gray)
    }

    // 禁用且已选中
    Row(verticalAlignment = Alignment.CenterVertically) {
        Checkbox(
            checked = true,
            onCheckedChange = null,
            enabled = false
        )
        Text("禁用已选中", color = Color.Gray)
    }
}`,
    },
    {
      title: '自定义颜色',
      code: `var checked by remember { mutableStateOf(true) }

Row(verticalAlignment = Alignment.CenterVertically) {
    Checkbox(
        checked = checked,
        onCheckedChange = { checked = it },
        colors = CheckboxDefaults.colors(
            checkedColor = Color(0xFF4CAF50),
            uncheckedColor = Color.Gray,
            checkmarkColor = Color.White
        )
    )
    Text("自定义颜色")
}`,
    },
    {
      title: '表单验证',
      code: `@Composable
fun FormWithValidation() {
    var agreeTerms by remember { mutableStateOf(false) }
    var agreePrivacy by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(
                checked = agreeTerms,
                onCheckedChange = { agreeTerms = it }
            )
            Spacer(Modifier.width(8.dp))
            Text("我已阅读并同意")
            TextButton(onClick = { /* 查看协议 */ }) {
                Text("《用户协议》")
            }
        }

        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(
                checked = agreePrivacy,
                onCheckedChange = { agreePrivacy = it }
            )
            Spacer(Modifier.width(8.dp))
            Text("我已阅读并同意")
            TextButton(onClick = { /* 查看隐私政策 */ }) {
                Text("《隐私政策》")
            }
        }

        Button(
            onClick = { /* 提交 */ },
            enabled = agreeTerms && agreePrivacy,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("注册")
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '批量操作',
      description: '使用 Checkbox 选择多个项目进行批量操作',
      code: `@Composable
fun BatchOperationList(items: List<Item>) {
    var selectedIds by remember { mutableStateOf(setOf<Int>()) }

    Column {
        // 批量操作栏
        AnimatedVisibility(visible = selectedIds.isNotEmpty()) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(MaterialTheme.colorScheme.primaryContainer)
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("已选择 3 项")
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    IconButton(onClick = { /* 删除 */ }) {
                        Icon(Icons.Default.Delete, contentDescription = "删除")
                    }
                    IconButton(onClick = { /* 分享 */ }) {
                        Icon(Icons.Default.Share, contentDescription = "分享")
                    }
                }
            }
        }

        // 列表项
        LazyColumn {
            items(items) { item ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable {
                            selectedIds = if (item.id in selectedIds) {
                                selectedIds - item.id
                            } else {
                                selectedIds + item.id
                            }
                        }
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Checkbox(
                        checked = item.id in selectedIds,
                        onCheckedChange = null
                    )
                    Spacer(Modifier.width(12.dp))
                    Text(item.title)
                }
            }
        }
    }
}`
    },
    {
      title: '分组筛选',
      description: '使用 Checkbox 实现多级筛选功能',
      code: `@Composable
fun FilterPanel() {
    var categories by remember {
        mutableStateOf(
            mapOf(
                "电子产品" to listOf("手机", "电脑", "平板"),
                "服饰" to listOf("上衣", "裤子", "鞋子")
            )
        )
    }
    var selected by remember { mutableStateOf(setOf<String>()) }

    Column {
        categories.forEach { (category, items) ->
            Text(
                category,
                style = MaterialTheme.typography.titleMedium,
                modifier = Modifier.padding(16.dp)
            )

            items.forEach { item ->
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable {
                            selected = if (item in selected) {
                                selected - item
                            } else {
                                selected + item
                            }
                        }
                        .padding(start = 32.dp, end = 16.dp, top = 8.dp, bottom = 8.dp)
                ) {
                    Checkbox(
                        checked = item in selected,
                        onCheckedChange = null
                    )
                    Spacer(Modifier.width(8.dp))
                    Text(item)
                }
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: 'Checkbox 应配合标签使用',
      description: '单独的 Checkbox 用户不知道它的含义',
      goodExample: `Row(verticalAlignment = Alignment.CenterVertically) {
    Checkbox(checked = agreed, onCheckedChange = { agreed = it })
    Text("同意协议")
}`,
      badExample: `// 没有标签，用户不知道选择的是什么
Checkbox(checked = agreed, onCheckedChange = { agreed = it })`
    },
    {
      title: '扩大点击区域以提升体验',
      description: '使用 clickable 让整行可点击',
      goodExample: `Row(
    modifier = Modifier
        .fillMaxWidth()
        .clickable { checked = !checked }
        .padding(16.dp)
) {
    Checkbox(checked = checked, onCheckedChange = null)
    Text("选项")
}`,
      badExample: `Row {
    Checkbox(checked = checked, onCheckedChange = { checked = it })
    Text("选项")  // 文本不可点击
}`
    },
    {
      title: '使用 TriStateCheckbox 实现全选',
      description: '三态 Checkbox 可以清晰表示全选/部分选中/未选中',
      goodExample: `TriStateCheckbox(
    state = when {
        allChecked -> ToggleableState.On
        someChecked -> ToggleableState.Indeterminate
        else -> ToggleableState.Off
    },
    onClick = { toggleAll() }
)`,
    },
    {
      title: 'Checkbox 适合需要提交的场景',
      description: 'Checkbox 适合表单，Switch 适合即时生效的设置',
      goodExample: `// 表单：使用 Checkbox
Checkbox(checked = agreeTerms, onCheckedChange = { agreeTerms = it })
Button(onClick = { submit() }, enabled = agreeTerms) { Text("提交") }`,
      badExample: `// 即时设置应使用 Switch
Checkbox(checked = darkMode, onCheckedChange = { darkMode = it })`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Checkbox vs Switch',
      content: 'Checkbox 用于多选、表单提交场景；Switch 用于单个即时生效的开关设置'
    },
    {
      type: 'warning',
      title: 'onCheckedChange = null 使 Checkbox 只读',
      content: 'onCheckedChange 传 null 时，Checkbox 变为只读，可显示状态但不可切换。外层 clickable 仍可控制'
    },
    {
      type: 'tip',
      title: 'TriStateCheckbox 的三种状态',
      content: 'On（全选）、Off（全不选）、Indeterminate（部分选中），通常用于全选功能'
    },
    {
      type: 'tip',
      title: 'Checkbox 自动满足最小触摸目标',
      content: 'Checkbox 默认尺寸已满足 48dp 最小触摸目标，但配合 clickable 扩展整行更友好'
    },
    {
      type: 'danger',
      title: '避免用 Checkbox 控制危险操作',
      content: '删除等不可逆操作不应只用 Checkbox 确认，应使用二次确认对话框'
    },
  ],

  relatedComponents: ['switch', 'radio-button'],
  since: '1.0.0',
}
