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
      title: 'TimePicker 弹窗（24小时制）',
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
val minute = timePickerState.minute
Text("已选时间：14:30")`,
    },
    {
      title: 'TimeInput（键盘输入模式）',
      code: `val timePickerState = rememberTimePickerState(is24Hour = false)

// TimeInput 比 TimePicker 更紧凑，适合空间有限的场景
TimeInput(
    state = timePickerState,
    modifier = Modifier.padding(16.dp)
)

// 读取时间（12小时制需要判断 AM/PM）
val hour = timePickerState.hour  // 0-23
val minute = timePickerState.minute
val displayHour = if (timePickerState.is24hour) {
    hour
} else {
    if (hour == 0) 12 else if (hour > 12) hour - 12 else hour
}
val period = if (hour >= 12) "PM" else "AM"
Text("选中时间：9:30 AM")`,
    },
    {
      title: '表盘/输入模式切换',
      code: `var showDial by remember { mutableStateOf(true) }
val timePickerState = rememberTimePickerState(
    initialHour = 14,
    initialMinute = 30,
    is24Hour = true
)

Column(
    horizontalAlignment = Alignment.CenterHorizontally,
    modifier = Modifier.padding(16.dp)
) {
    if (showDial) {
        TimePicker(state = timePickerState)
    } else {
        TimeInput(state = timePickerState)
    }

    Spacer(Modifier.height(16.dp))

    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        IconButton(onClick = { showDial = !showDial }) {
            Icon(
                if (showDial) Icons.Default.Keyboard else Icons.Default.AccessTime,
                contentDescription = if (showDial) "切换到键盘" else "切换到表盘"
            )
        }
    }
}`,
    },
    {
      title: '12小时制 AM/PM 选择',
      code: `var showDialog by remember { mutableStateOf(false) }
val timePickerState = rememberTimePickerState(
    initialHour = 9,
    initialMinute = 30,
    is24Hour = false  // 12小时制
)

Button(onClick = { showDialog = true }) {
    Text("选择会议时间")
}

if (showDialog) {
    AlertDialog(
        onDismissRequest = { showDialog = false },
        confirmButton = {
            TextButton(onClick = {
                showDialog = false
            }) {
                Text("确定")
            }
        },
        dismissButton = {
            TextButton(onClick = { showDialog = false }) {
                Text("取消")
            }
        },
        text = {
            TimePicker(state = timePickerState)
        }
    )
}`,
    },
    {
      title: '闹钟时间设置',
      code: `@Composable
fun AlarmTimeSetting(
    initialHour: Int = 7,
    initialMinute: Int = 0,
    onTimeSet: (Int, Int) -> Unit
) {
    var showDialog by remember { mutableStateOf(false) }
    val timePickerState = rememberTimePickerState(
        initialHour = initialHour,
        initialMinute = initialMinute,
        is24Hour = true
    )

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { showDialog = true }
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Column {
                Text("闹钟时间", style = MaterialTheme.typography.bodyMedium)
                Text(
                    text = String.format("%02d:%02d", initialHour, initialMinute),
                    style = MaterialTheme.typography.headlineMedium
                )
            }
            Icon(Icons.Default.AccessTime, contentDescription = "设置时间")
        }
    }

    if (showDialog) {
        AlertDialog(
            onDismissRequest = { showDialog = false },
            confirmButton = {
                TextButton(onClick = {
                    onTimeSet(timePickerState.hour, timePickerState.minute)
                    showDialog = false
                }) {
                    Text("确定")
                }
            },
            dismissButton = {
                TextButton(onClick = { showDialog = false }) {
                    Text("取消")
                }
            },
            text = {
                TimePicker(state = timePickerState)
            }
        )
    }
}`,
    },
    {
      title: '自适应布局模式',
      code: `val timePickerState = rememberTimePickerState()

// LayoutType 可根据可用空间自动选择布局
TimePicker(
    state = timePickerState,
    layoutType = TimePickerDefaults.layoutType(),  // 自动选择
    modifier = Modifier.fillMaxWidth()
)

// 或强制使用水平布局（适合横屏）
TimePicker(
    state = timePickerState,
    layoutType = TimePickerLayoutType.Horizontal
)`,
    },
  ],

  useCases: [
    {
      title: '预约时间选择器',
      description: '结合日期选择器实现完整的预约时间选择功能',
      code: `@Composable
fun AppointmentTimePicker(
    selectedDate: LocalDate,
    selectedTime: LocalTime?,
    onTimeSelected: (LocalTime) -> Unit
) {
    var showDialog by remember { mutableStateOf(false) }
    val timePickerState = rememberTimePickerState(
        initialHour = selectedTime?.hour ?: 9,
        initialMinute = selectedTime?.minute ?: 0,
        is24Hour = true
    )

    OutlinedTextField(
        value = selectedTime?.format(DateTimeFormatter.ofPattern("HH:mm")) ?: "",
        onValueChange = {},
        readOnly = true,
        label = { Text("预约时间") },
        trailingIcon = {
            IconButton(onClick = { showDialog = true }) {
                Icon(Icons.Default.AccessTime, "选择时间")
            }
        },
        modifier = Modifier.fillMaxWidth()
    )

    if (showDialog) {
        AlertDialog(
            onDismissRequest = { showDialog = false },
            confirmButton = {
                TextButton(onClick = {
                    val time = LocalTime.of(
                        timePickerState.hour,
                        timePickerState.minute
                    )
                    onTimeSelected(time)
                    showDialog = false
                }) {
                    Text("确定")
                }
            },
            dismissButton = {
                TextButton(onClick = { showDialog = false }) {
                    Text("取消")
                }
            },
            title = {
                Text("选择预约时间")
            },
            text = {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(
                        text = selectedDate.format(DateTimeFormatter.ofPattern("yyyy年M月d日")),
                        style = MaterialTheme.typography.bodyMedium,
                        modifier = Modifier.padding(bottom = 16.dp)
                    )
                    TimePicker(state = timePickerState)
                }
            }
        )
    }
}`
    },
    {
      title: '营业时间设置',
      description: '设置商店的开门和关门时间',
      code: `@Composable
fun BusinessHoursSetting(
    openTime: LocalTime,
    closeTime: LocalTime,
    onOpenTimeChange: (LocalTime) -> Unit,
    onCloseTimeChange: (LocalTime) -> Unit
) {
    var editingType by remember { mutableStateOf<String?>(null) }

    val openTimeState = rememberTimePickerState(
        initialHour = openTime.hour,
        initialMinute = openTime.minute,
        is24Hour = true
    )

    val closeTimeState = rememberTimePickerState(
        initialHour = closeTime.hour,
        initialMinute = closeTime.minute,
        is24Hour = true
    )

    Column(modifier = Modifier.padding(16.dp)) {
        Text(
            text = "营业时间",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            // 开门时间
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("开门", style = MaterialTheme.typography.bodySmall)
                TextButton(onClick = { editingType = "open" }) {
                    Text(
                        text = String.format("%02d:%02d", openTime.hour, openTime.minute),
                        style = MaterialTheme.typography.headlineMedium
                    )
                }
            }

            Text("至", modifier = Modifier.align(Alignment.CenterVertically))

            // 关门时间
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("关门", style = MaterialTheme.typography.bodySmall)
                TextButton(onClick = { editingType = "close" }) {
                    Text(
                        text = String.format("%02d:%02d", closeTime.hour, closeTime.minute),
                        style = MaterialTheme.typography.headlineMedium
                    )
                }
            }
        }
    }

    when (editingType) {
        "open" -> {
            AlertDialog(
                onDismissRequest = { editingType = null },
                confirmButton = {
                    TextButton(onClick = {
                        onOpenTimeChange(LocalTime.of(openTimeState.hour, openTimeState.minute))
                        editingType = null
                    }) {
                        Text("确定")
                    }
                },
                dismissButton = {
                    TextButton(onClick = { editingType = null }) {
                        Text("取消")
                    }
                },
                title = { Text("设置开门时间") },
                text = { TimePicker(state = openTimeState) }
            )
        }
        "close" -> {
            AlertDialog(
                onDismissRequest = { editingType = null },
                confirmButton = {
                    TextButton(onClick = {
                        onCloseTimeChange(LocalTime.of(closeTimeState.hour, closeTimeState.minute))
                        editingType = null
                    }) {
                        Text("确定")
                    }
                },
                dismissButton = {
                    TextButton(onClick = { editingType = null }) {
                        Text("取消")
                    }
                },
                title = { Text("设置关门时间") },
                text = { TimePicker(state = closeTimeState) }
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '根据场景选择表盘或输入模式',
      description: 'TimeInput 更适合已知时间的快速输入，TimePicker 适合浏览选择',
      goodExample: `// 闹钟设置：用户通常有明确时间，使用 TimeInput
TimeInput(state = timePickerState)

// 日程安排：用户需要浏览时间段，使用 TimePicker
TimePicker(state = timePickerState)`,
    },
    {
      title: '12小时制正确转换',
      description: '从24小时制状态值转换为12小时制显示',
      goodExample: `val timePickerState = rememberTimePickerState(is24Hour = false)
val hour = timePickerState.hour  // 始终是 0-23
val displayHour = if (hour == 0) 12 else if (hour > 12) hour - 12 else hour
val period = if (hour >= 12) "PM" else "AM"
Text("$displayHour:$minute $period")`,
      badExample: `// 错误：直接使用 hour 值作为 12 小时制显示
val hour = timePickerState.hour
Text("$hour:$minute")  // hour = 0 会显示 0:00 而非 12:00 AM`
    },
    {
      title: '使用 AlertDialog 而非自定义 Dialog',
      description: 'AlertDialog 提供了标准的时间选择器布局',
      goodExample: `AlertDialog(
    onDismissRequest = { showDialog = false },
    confirmButton = { TextButton(onClick = { }) { Text("确定") } },
    text = { TimePicker(state = timePickerState) }
)`,
      badExample: `Dialog(onDismissRequest = { }) {
    Surface {
        Column {
            TimePicker(state = timePickerState)
            // 手动添加按钮容易布局不一致
        }
    }
}`
    },
    {
      title: '提供模式切换按钮',
      description: '让用户可以在表盘和输入模式间切换',
      goodExample: `var showDial by remember { mutableStateOf(true) }

Column {
    if (showDial) {
        TimePicker(state = timePickerState)
    } else {
        TimeInput(state = timePickerState)
    }
    IconButton(onClick = { showDial = !showDial }) {
        Icon(
            if (showDial) Icons.Default.Keyboard else Icons.Default.AccessTime,
            contentDescription = "切换模式"
        )
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'TimePickerState 始终使用24小时制存储',
      content: 'hour 属性始终返回 0-23 的值，即使 is24Hour = false。显示时需要手动转换为 12 小时制格式'
    },
    {
      type: 'warning',
      title: 'TimePicker 占用空间较大',
      content: 'TimePicker 的表盘模式需要较大的显示空间（约 400dp 高度）。在小屏或横屏设备上考虑使用 TimeInput 或 layoutType = Horizontal'
    },
    {
      type: 'info',
      title: '使用 TimePickerLayoutType 适配不同屏幕',
      content: 'TimePickerLayoutType.Horizontal 适合横屏或空间受限场景，Vertical 适合竖屏。使用 TimePickerDefaults.layoutType() 可自动选择'
    },
    {
      type: 'info',
      title: 'TimeInput 支持键盘快速输入',
      content: 'TimeInput 模式下用户可以直接输入数字，比表盘点击更快捷，适合已知具体时间的场景'
    },
    {
      type: 'error',
      title: 'TimePickerState 不会自动保存',
      content: '使用 rememberTimePickerState 创建的状态仅在组合期间保留。如需跨配置更改保存，使用 rememberSaveable { TimePickerState(...) }'
    },
    {
      type: 'info',
      title: '分钟值始终是整数',
      content: 'TimePicker 不支持秒级精度，minute 值范围为 0-59。如需秒级选择，需要自定义组件'
    },
  ],

  relatedComponents: ['date-picker', 'text-field', 'outlined-text-field'],
  since: '1.0.0',
}
