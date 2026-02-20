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
    Text("已选：\${date}")
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
val endMillis = rangePickerState.selectedEndDateMillis`,
    },
  ],
}
