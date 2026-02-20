import type { ComponentEntry } from '../../types'

export const timePickerComponent: ComponentEntry = {
  id: 'time-picker',
  name: 'TimePicker',
  category: 'Form',
  description: 'Material3 时间选择器，支持表盘（TimePicker）和输入（TimeInput）两种模式，通常配合 Dialog 使用。',
  tags: ['timepicker', 'time', 'clock', 'form', '时间选择'],
  params: [
    { name: 'state', type: 'TimePickerState', required: true, description: '时间状态，由 rememberTimePickerState() 创建，持有小时和分钟' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'colors', type: 'TimePickerColors', default: 'TimePickerDefaults.colors()', description: '颜色配置' },
    { name: 'layoutType', type: 'TimePickerLayoutType', default: 'TimePickerDefaults.layoutType()', description: '布局类型，Vertical（表盘）或 Horizontal' },
  ],
  examples: [
    {
      title: 'TimePicker 弹窗',
      code: `var showDialog by remember { mutableStateOf(false) }
val timePickerState = rememberTimePickerState(
    initialHour = 9,
    initialMinute = 0,
    is24Hour = true
)

Button(onClick = { showDialog = true }) { Text("选择时间") }

if (showDialog) {
    AlertDialog(
        onDismissRequest = { showDialog = false },
        confirmButton = {
            TextButton(onClick = { showDialog = false }) { Text("确定") }
        },
        dismissButton = {
            TextButton(onClick = { showDialog = false }) { Text("取消") }
        },
        text = {
            TimePicker(state = timePickerState)
        }
    )
}

// 读取选中时间
val hour = timePickerState.hour
val minute = timePickerState.minute`,
    },
    {
      title: 'TimeInput（键盘输入模式）',
      code: `val timePickerState = rememberTimePickerState(is24Hour = false)

// TimeInput 比 TimePicker 更紧凑，适合空间有限的场景
TimeInput(state = timePickerState)`,
    },
    {
      title: '表盘/输入模式切换',
      code: `var showDial by remember { mutableStateOf(true) }
val timePickerState = rememberTimePickerState()

Column(horizontalAlignment = Alignment.CenterHorizontally) {
    if (showDial) {
        TimePicker(state = timePickerState)
    } else {
        TimeInput(state = timePickerState)
    }
    TextButton(onClick = { showDial = !showDial }) {
        Text(if (showDial) "切换到键盘输入" else "切换到表盘")
    }
}`,
    },
  ],
}
