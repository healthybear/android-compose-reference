import type { ComponentEntry } from '../../types'

export const switchComponent: ComponentEntry = {
  id: 'switch',
  demo: { id: 'switch', sourceFile: 'SwitchDemo.kt' },
  name: 'Switch',
  category: 'Form',
  description: 'Switch 是 Material Design 3 的开关切换组件，用于二元状态的即时开/关控制。状态变化立即生效，无需确认。对应 Android View 的 SwitchCompat。',
  tags: ['switch', 'toggle', 'form', 'boolean', 'on-off', 'settings'],
  params: [
    { name: 'checked', type: 'Boolean', required: true, description: '当前开关状态，true 为开启，false 为关闭' },
    { name: 'onCheckedChange', type: '((Boolean) -> Unit)?', required: true, description: '状态变化回调，null 时开关变为只读' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于设置尺寸、内边距等' },
    { name: 'thumbContent', type: '@Composable (() -> Unit)?', default: 'null', description: '滑块内容，通常为图标，自动适配尺寸' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用，false 时显示禁用样式且不可交互' },
    { name: 'colors', type: 'SwitchColors', default: 'SwitchDefaults.colors()', description: '颜色配置（滑块色/轨道色/选中/未选中）' },
    { name: 'interactionSource', type: 'MutableInteractionSource?', default: 'null', description: '交互状态源' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var notificationsEnabled by remember { mutableStateOf(true) }

Row(
    verticalAlignment = Alignment.CenterVertically,
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp)
) {
    Text(
        text = "推送通知",
        modifier = Modifier.weight(1f)
    )
    Switch(
        checked = notificationsEnabled,
        onCheckedChange = { notificationsEnabled = it }
    )
}`,
    },
    {
      title: '带图标的滑块',
      code: `var wifiEnabled by remember { mutableStateOf(false) }

Switch(
    checked = wifiEnabled,
    onCheckedChange = { wifiEnabled = it },
    thumbContent = if (wifiEnabled) {
        {
            Icon(
                imageVector = Icons.Default.Check,
                contentDescription = null,
                modifier = Modifier.size(SwitchDefaults.IconSize)
            )
        }
    } else null
)`,
    },
    {
      title: '设置列表',
      code: `data class Setting(val title: String, val description: String, var enabled: Boolean)

@Composable
fun SettingsList() {
    var settings by remember {
        mutableStateOf(
            listOf(
                Setting("推送通知", "接收应用通知", true),
                Setting("自动更新", "Wi-Fi 下自动更新应用", false),
                Setting("省电模式", "延长电池续航", false)
            )
        )
    }

    Column {
        settings.forEachIndexed { index, setting ->
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = setting.title,
                        style = MaterialTheme.typography.bodyLarge
                    )
                    Text(
                        text = setting.description,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                Switch(
                    checked = setting.enabled,
                    onCheckedChange = { checked ->
                        settings = settings.toMutableList().apply {
                            this[index] = setting.copy(enabled = checked)
                        }
                    }
                )
            }
            if (index < settings.size - 1) {
                HorizontalDivider()
            }
        }
    }
}`,
    },
    {
      title: '禁用状态',
      code: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    // 禁用且未选中
    Switch(
        checked = false,
        onCheckedChange = null,
        enabled = false
    )

    // 禁用且已选中
    Switch(
        checked = true,
        onCheckedChange = null,
        enabled = false
    )
}`,
    },
    {
      title: '自定义颜色',
      code: `var checked by remember { mutableStateOf(true) }

Switch(
    checked = checked,
    onCheckedChange = { checked = it },
    colors = SwitchDefaults.colors(
        checkedThumbColor = Color.White,
        checkedTrackColor = Color(0xFF4CAF50),
        uncheckedThumbColor = Color.White,
        uncheckedTrackColor = Color.LightGray
    )
)`,
    },
    {
      title: '可点击区域扩大',
      code: `var enabled by remember { mutableStateOf(false) }

Row(
    verticalAlignment = Alignment.CenterVertically,
    modifier = Modifier
        .fillMaxWidth()
        .clickable { enabled = !enabled }  // 整行可点击
        .padding(16.dp)
) {
    Text("飞行模式", modifier = Modifier.weight(1f))
    Switch(
        checked = enabled,
        onCheckedChange = null  // 由外层 clickable 控制
    )
}`,
    },
  ],

  useCases: [
    {
      title: '确认对话框开关',
      description: '重要设置变更前弹出确认对话框',
      code: `@Composable
fun DangerousSettingSwitch() {
    var checked by remember { mutableStateOf(false) }
    var showDialog by remember { mutableStateOf(false) }

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column(modifier = Modifier.weight(1f)) {
            Text("开发者模式", style = MaterialTheme.typography.bodyLarge)
            Text(
                "启用后可能影响系统稳定性",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.error
            )
        }
        Switch(
            checked = checked,
            onCheckedChange = {
                if (it) {
                    showDialog = true
                } else {
                    checked = false
                }
            }
        )
    }

    if (showDialog) {
        AlertDialog(
            onDismissRequest = { showDialog = false },
            title = { Text("启用开发者模式？") },
            text = { Text("此操作可能影响系统稳定性，确定要继续吗？") },
            confirmButton = {
                TextButton(onClick = {
                    checked = true
                    showDialog = false
                }) {
                    Text("确定")
                }
            },
            dismissButton = {
                TextButton(onClick = { showDialog = false }) {
                    Text("取消")
                }
            }
        )
    }
}`
    },
    {
      title: '联动开关',
      description: '主开关控制子开关的启用状态',
      code: `@Composable
fun LinkedSwitches() {
    var masterEnabled by remember { mutableStateOf(false) }
    var option1 by remember { mutableStateOf(true) }
    var option2 by remember { mutableStateOf(false) }

    Column {
        // 主开关
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("同步", modifier = Modifier.weight(1f))
            Switch(
                checked = masterEnabled,
                onCheckedChange = { masterEnabled = it }
            )
        }

        HorizontalDivider()

        // 子选项（仅在主开关开启时可用）
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(start = 32.dp, end = 16.dp, top = 12.dp, bottom = 12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("同步联系人", modifier = Modifier.weight(1f))
            Switch(
                checked = option1,
                onCheckedChange = { option1 = it },
                enabled = masterEnabled
            )
        }

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(start = 32.dp, end = 16.dp, top = 12.dp, bottom = 12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("同步日历", modifier = Modifier.weight(1f))
            Switch(
                checked = option2,
                onCheckedChange = { option2 = it },
                enabled = masterEnabled
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: 'Switch 适合即时生效的设置',
      description: '状态变化立即生效，不需要额外确认。需要确认的操作使用 Checkbox',
      goodExample: `// 即时生效的设置
Switch(
    checked = darkMode,
    onCheckedChange = { darkMode = it }
)`,
      badExample: `// 需要确认的操作应使用 Checkbox
Switch(
    checked = deleteAccount,
    onCheckedChange = { deleteAccount = it }
)`
    },
    {
      title: 'Switch 应配合标签使用',
      description: '单独的 Switch 用户不知道它控制什么',
      goodExample: `Row {
    Text("通知", modifier = Modifier.weight(1f))
    Switch(checked = enabled, onCheckedChange = { enabled = it })
}`,
      badExample: `// 没有标签，用户不知道开关的作用
Switch(checked = enabled, onCheckedChange = { enabled = it })`
    },
    {
      title: '整行可点击以扩大点击区域',
      description: '使用 clickable 让标签也可以切换开关',
      goodExample: `Row(
    modifier = Modifier
        .fillMaxWidth()
        .clickable { enabled = !enabled }
        .padding(16.dp)
) {
    Text("通知")
    Switch(checked = enabled, onCheckedChange = null)
}`,
    },
    {
      title: '重要操作前显示确认对话框',
      description: '危险或不可逆操作应弹窗确认',
      goodExample: `Switch(
    checked = developerMode,
    onCheckedChange = {
        if (it) showConfirmDialog = true
        else developerMode = false
    }
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Switch vs Checkbox',
      content: 'Switch 用于即时生效的设置（开/关灯）；Checkbox 用于需要提交的选项（表单、批量操作）'
    },
    {
      type: 'warning',
      title: 'onCheckedChange = null 使 Switch 只读',
      content: 'onCheckedChange 传 null 时，Switch 变为只读，可显示状态但不可切换。外层 clickable 仍可控制'
    },
    {
      type: 'info',
      title: 'thumbContent 自动适配尺寸',
      content: '使用 SwitchDefaults.IconSize 确保图标尺寸合适。图标过大会被裁剪'
    },
    {
      type: 'info',
      title: 'Switch 自动满足最小触摸目标',
      content: 'Switch 默认尺寸已满足 48dp 最小触摸目标，无需额外 padding'
    },
    {
      type: 'error',
      title: '避免用 Switch 控制危险操作',
      content: '删除数据、格式化等不可逆操作不应使用 Switch，应使用需要确认的按钮'
    },
  ],

  relatedComponents: ['checkbox', 'radio-button', 'slider'],
  since: '1.0.0',
}
