import type { ComponentEntry } from '../../types'

export const datePickerComponent: ComponentEntry = {
  id: 'date-picker',
  name: 'DatePicker',
  category: 'Form',
  description: 'Material3 日期选择器，支持内联展示或弹窗形式，可选单日期或日期范围。',
  tags: ['datepicker', 'date', 'calendar', 'form', '日期选择'],
  params: [
    { name: 'state', type: 'DatePickerState', required: true, description: '日期状态，由 rememberDatePickerState() 创建，持有选中日期的毫秒时间戳' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'dateFormatter', type: 'DatePickerFormatter', default: 'DatePickerDefaults.dateFormatter()', description: '日期格式化器' },
    { name: 'title', type: '@Composable (() -> Unit)?', default: '{ DatePickerDefaults.DatePickerTitle(...) }', description: '标题插槽' },
    { name: 'headline', type: '@Composable (() -> Unit)?', default: '{ DatePickerDefaults.DatePickerHeadline(...) }', description: '已选日期展示区域' },
    { name: 'showModeToggle', type: 'Boolean', default: 'true', description: '是否显示日历/输入模式切换按钮' },
    { name: 'colors', type: 'DatePickerColors', default: 'DatePickerDefaults.colors()', description: '颜色配置' },
  ],
  examples: [
    {
      title: '内联日期选择器',
      code: `val datePickerState = rememberDatePickerState()

DatePicker(state = datePickerState)

// 读取选中日期（毫秒时间戳）
val selectedMillis = datePickerState.selectedDateMillis
if (selectedMillis != null) {
    val date = Instant.ofEpochMilli(selectedMillis)
        .atZone(ZoneId.systemDefault()).toLocalDate()
    Text("已选：2024-09-25")
}`,
    },
    {
      title: 'DatePickerDialog（弹窗）',
      code: `var showDialog by remember { mutableStateOf(false) }
val datePickerState = rememberDatePickerState()

Button(onClick = { showDialog = true }) { Text("选择日期") }

if (showDialog) {
    DatePickerDialog(
        onDismissRequest = { showDialog = false },
        confirmButton = {
            TextButton(onClick = { showDialog = false }) { Text("确定") }
        },
        dismissButton = {
            TextButton(onClick = { showDialog = false }) { Text("取消") }
        }
    ) {
        DatePicker(state = datePickerState)
    }
}`,
    },
    {
      title: 'DateRangePicker（日期范围）',
      code: `val rangePickerState = rememberDateRangePickerState()

DateRangePicker(
    state = rangePickerState,
    modifier = Modifier.height(500.dp)
)

val startMillis = rangePickerState.selectedStartDateMillis
val endMillis = rangePickerState.selectedEndDateMillis
if (startMillis != null && endMillis != null) {
    val startDate = Instant.ofEpochMilli(startMillis)
        .atZone(ZoneId.systemDefault()).toLocalDate()
    val endDate = Instant.ofEpochMilli(endMillis)
        .atZone(ZoneId.systemDefault()).toLocalDate()
    Text("选择范围：2024-09-25 至 2024-09-30")
}`,
    },
    {
      title: '限制日期范围（仅未来 30 天）',
      code: `val today = System.currentTimeMillis()
val thirtyDaysLater = today + 30L * 24 * 60 * 60 * 1000

val datePickerState = rememberDatePickerState(
    initialSelectedDateMillis = today,
    yearRange = IntRange(2024, 2025),
    selectableDates = object : SelectableDates {
        override fun isSelectableDate(utcTimeMillis: Long): Boolean {
            return utcTimeMillis >= today && utcTimeMillis <= thirtyDaysLater
        }
    }
)

DatePicker(state = datePickerState)`,
    },
    {
      title: '自定义标题和 Headline',
      code: `val datePickerState = rememberDatePickerState()

DatePicker(
    state = datePickerState,
    title = {
        Text(
            text = "选择预约日期",
            modifier = Modifier.padding(16.dp),
            style = MaterialTheme.typography.titleLarge
        )
    },
    headline = {
        val selectedMillis = datePickerState.selectedDateMillis
        if (selectedMillis != null) {
            val date = Instant.ofEpochMilli(selectedMillis)
                .atZone(ZoneId.systemDefault()).toLocalDate()
            val formatter = DateTimeFormatter.ofPattern("yyyy年M月d日")
            Text(
                text = date.format(formatter),
                modifier = Modifier.padding(16.dp),
                style = MaterialTheme.typography.headlineMedium
            )
        } else {
            Text("未选择日期", modifier = Modifier.padding(16.dp))
        }
    }
)`,
    },
    {
      title: '表盘/输入模式切换',
      code: `var showDialog by remember { mutableStateOf(false) }
val datePickerState = rememberDatePickerState()

Button(onClick = { showDialog = true }) { Text("选择日期") }

if (showDialog) {
    DatePickerDialog(
        onDismissRequest = { showDialog = false },
        confirmButton = {
            TextButton(onClick = { showDialog = false }) { Text("确定") }
        }
    ) {
        DatePicker(
            state = datePickerState,
            showModeToggle = true  // 显示切换按钮
        )
    }
}`,
    },
  ],

  useCases: [
    {
      title: '生日选择器',
      description: '限制日期范围到合理年龄，不允许选择未来日期',
      code: `@Composable
fun BirthdayPicker(
    selectedDate: LocalDate?,
    onDateSelected: (LocalDate) -> Unit
) {
    var showDialog by remember { mutableStateOf(false) }
    val today = LocalDate.now()
    val minAge = 13 // 最小年龄
    val maxAge = 120 // 最大年龄

    val datePickerState = rememberDatePickerState(
        initialSelectedDateMillis = selectedDate?.atStartOfDay(ZoneId.systemDefault())?.toInstant()?.toEpochMilli(),
        yearRange = IntRange(today.year - maxAge, today.year - minAge),
        selectableDates = object : SelectableDates {
            override fun isSelectableDate(utcTimeMillis: Long): Boolean {
                val date = Instant.ofEpochMilli(utcTimeMillis)
                    .atZone(ZoneId.systemDefault()).toLocalDate()
                return date.isBefore(today.minusYears(minAge.toLong()))
            }
        }
    )

    OutlinedTextField(
        value = selectedDate?.toString() ?: "",
        onValueChange = {},
        readOnly = true,
        label = { Text("出生日期") },
        trailingIcon = {
            IconButton(onClick = { showDialog = true }) {
                Icon(Icons.Default.CalendarToday, "选择日期")
            }
        },
        modifier = Modifier.fillMaxWidth()
    )

    if (showDialog) {
        DatePickerDialog(
            onDismissRequest = { showDialog = false },
            confirmButton = {
                TextButton(onClick = {
                    datePickerState.selectedDateMillis?.let { millis ->
                        val date = Instant.ofEpochMilli(millis)
                            .atZone(ZoneId.systemDefault()).toLocalDate()
                        onDateSelected(date)
                    }
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
        ) {
            DatePicker(state = datePickerState)
        }
    }
}`
    },
    {
      title: '酒店预订日期范围选择',
      description: '选择入住和退房日期，至少入住一晚',
      code: `@Composable
fun HotelBookingDatePicker(
    checkInDate: LocalDate?,
    checkOutDate: LocalDate?,
    onDatesSelected: (LocalDate, LocalDate) -> Unit
) {
    var showDialog by remember { mutableStateOf(false) }
    val today = LocalDate.now()

    val rangePickerState = rememberDateRangePickerState(
        initialSelectedStartDateMillis = checkInDate?.atStartOfDay(ZoneId.systemDefault())?.toInstant()?.toEpochMilli(),
        initialSelectedEndDateMillis = checkOutDate?.atStartOfDay(ZoneId.systemDefault())?.toInstant()?.toEpochMilli(),
        selectableDates = object : SelectableDates {
            override fun isSelectableDate(utcTimeMillis: Long): Boolean {
                val date = Instant.ofEpochMilli(utcTimeMillis)
                    .atZone(ZoneId.systemDefault()).toLocalDate()
                return !date.isBefore(today)
            }
        }
    )

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { showDialog = true }
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text("入住日期", style = MaterialTheme.typography.bodySmall)
                Text(checkInDate?.toString() ?: "选择日期")
            }
            Icon(Icons.Default.ArrowForward, null)
            Column(modifier = Modifier.weight(1f)) {
                Text("退房日期", style = MaterialTheme.typography.bodySmall)
                Text(checkOutDate?.toString() ?: "选择日期")
            }
        }
    }

    if (showDialog) {
        DatePickerDialog(
            onDismissRequest = { showDialog = false },
            confirmButton = {
                TextButton(
                    onClick = {
                        val startMillis = rangePickerState.selectedStartDateMillis
                        val endMillis = rangePickerState.selectedEndDateMillis
                        if (startMillis != null && endMillis != null) {
                            val start = Instant.ofEpochMilli(startMillis)
                                .atZone(ZoneId.systemDefault()).toLocalDate()
                            val end = Instant.ofEpochMilli(endMillis)
                                .atZone(ZoneId.systemDefault()).toLocalDate()
                            onDatesSelected(start, end)
                            showDialog = false
                        }
                    },
                    enabled = rangePickerState.selectedStartDateMillis != null &&
                             rangePickerState.selectedEndDateMillis != null
                ) {
                    Text("确定")
                }
            },
            dismissButton = {
                TextButton(onClick = { showDialog = false }) { Text("取消") }
            }
        ) {
            DateRangePicker(
                state = rangePickerState,
                title = { Text("选择入住和退房日期", modifier = Modifier.padding(16.dp)) }
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 SelectableDates 限制可选日期',
      description: '通过自定义 SelectableDates 接口禁用不可选日期',
      goodExample: `val datePickerState = rememberDatePickerState(
    selectableDates = object : SelectableDates {
        override fun isSelectableDate(utcTimeMillis: Long): Boolean {
            val date = Instant.ofEpochMilli(utcTimeMillis)
                .atZone(ZoneId.systemDefault()).toLocalDate()
            // 仅允许工作日
            return date.dayOfWeek !in listOf(DayOfWeek.SATURDAY, DayOfWeek.SUNDAY)
        }
    }
)`,
      badExample: `// 未限制日期范围，用户可能选择无效日期
val datePickerState = rememberDatePickerState()
DatePicker(state = datePickerState)`
    },
    {
      title: '正确处理时区转换',
      description: '使用系统默认时区转换毫秒时间戳',
      goodExample: `val selectedMillis = datePickerState.selectedDateMillis
if (selectedMillis != null) {
    val date = Instant.ofEpochMilli(selectedMillis)
        .atZone(ZoneId.systemDefault())
        .toLocalDate()
    // 使用 LocalDate 进行业务逻辑
}`,
      badExample: `// 直接使用时间戳可能因时区问题导致日期偏差
val selectedMillis = datePickerState.selectedDateMillis
val date = Date(selectedMillis!!)  // 不推荐`
    },
    {
      title: '使用 DatePickerDialog 而非自定义 Dialog',
      description: 'DatePickerDialog 已经处理好了尺寸和响应式布局',
      goodExample: `DatePickerDialog(
    onDismissRequest = { showDialog = false },
    confirmButton = { TextButton(onClick = { }) { Text("确定") } }
) {
    DatePicker(state = datePickerState)
}`,
      badExample: `Dialog(onDismissRequest = { showDialog = false }) {
    // 手动处理尺寸和布局容易出错
    Surface {
        DatePicker(state = datePickerState)
    }
}`
    },
    {
      title: '为 DateRangePicker 提供合理的高度',
      description: '日期范围选择器需要更多空间展示两个日期',
      goodExample: `DateRangePicker(
    state = rangePickerState,
    modifier = Modifier.height(500.dp)  // 提供足够高度
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'DatePicker 的三种模式',
      content: 'DatePicker 支持日历模式（默认）和输入模式。用户可以通过 showModeToggle 控制是否显示切换按钮。输入模式适合快速输入已知日期'
    },
    {
      type: 'warning',
      title: '时间戳使用 UTC 时区',
      content: 'DatePickerState 返回的时间戳是 UTC 00:00 的毫秒数。转换为 LocalDate 时必须指定时区，建议使用 ZoneId.systemDefault()'
    },
    {
      type: 'info',
      title: '初始化已选日期',
      content: '使用 rememberDatePickerState(initialSelectedDateMillis = ...) 设置初始日期。将 LocalDate 转换为毫秒时：date.atStartOfDay(ZoneId.systemDefault()).toInstant().toEpochMilli()'
    },
    {
      type: 'info',
      title: '年份范围控制',
      content: 'yearRange 参数控制日历显示的年份范围，默认为 IntRange(1900, 2100)。对于生日选择等场景，建议设置合理范围'
    },
    {
      type: 'error',
      title: 'DatePickerState 不会自动保存',
      content: '使用 rememberDatePickerState 创建的状态仅在组合期间保留。如需跨配置更改保存，使用 rememberSaveable { DatePickerState(...) }'
    },
    {
      type: 'info',
      title: 'DateRangePicker 要求起始日期早于结束日期',
      content: '用户必须先选择起始日期，再选择结束日期。如果先选了结束日期，会自动将其设为起始日期'
    },
  ],

  relatedComponents: ['time-picker', 'text-field', 'outlined-text-field'],
  since: '1.0.0',
}
