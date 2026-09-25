import type { ComponentEntry } from '../../types'

export const buttonComponent: ComponentEntry = {
  id: 'button',
  name: 'Button',
  category: 'Material',
  description: 'Material Design 按钮，响应点击事件，支持启用/禁用状态。',
  tags: ['button', 'click', 'material', 'interaction', 'action'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击时的回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符，用于调整外观和布局' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用按钮' },
    { name: 'shape', type: 'Shape', default: 'ButtonDefaults.shape', description: '按钮形状' },
    { name: 'colors', type: 'ButtonColors', default: 'ButtonDefaults.buttonColors()', description: '按钮颜色配置' },
    { name: 'elevation', type: 'ButtonElevation?', default: 'ButtonDefaults.buttonElevation()', description: '按钮阴影高度' },
    { name: 'border', type: 'BorderStroke?', default: 'null', description: '边框描边' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'ButtonDefaults.ContentPadding', description: '内容内边距' },
    { name: 'interactionSource', type: 'MutableInteractionSource?', default: 'null', description: '交互状态源，用于自定义交互效果' },
    { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '按钮内容插槽' },
  ],
  examples: [
    {
      title: '基础按钮',
      code: `Button(onClick = { /* 处理点击 */ }) {
    Text("点击我")
}`,
    },
    {
      title: '禁用状态',
      code: `Button(
    onClick = {},
    enabled = false
) {
    Text("不可用")
}`,
    },
    {
      title: '带图标的按钮',
      code: `Button(onClick = { /* 处理点击 */ }) {
    Icon(Icons.Default.Add, contentDescription = null)
    Spacer(Modifier.width(8.dp))
    Text("添加")
}`,
    },
    {
      title: '自定义颜色',
      code: `Button(
    onClick = { },
    colors = ButtonDefaults.buttonColors(
        containerColor = Color.Red,
        contentColor = Color.White
    )
) {
    Text("自定义颜色")
}`,
    },
    {
      title: '圆角按钮',
      code: `Button(
    onClick = { },
    shape = RoundedCornerShape(50)
) {
    Text("圆角按钮")
}`,
    },
  ],
  demo: { id: 'button', sourceFile: 'ButtonDemo.kt' },

  useCases: [
    {
      title: '表单提交',
      description: '在表单中作为提交按钮，通常配合状态管理使用',
      code: `var isLoading by remember { mutableStateOf(false) }

Button(
    onClick = {
        isLoading = true
        // 执行提交操作
    },
    enabled = !isLoading
) {
    if (isLoading) {
        CircularProgressIndicator(
            modifier = Modifier.size(16.dp),
            strokeWidth = 2.dp
        )
    } else {
        Text("提交")
    }
}`
    },
    {
      title: '导航操作',
      description: '触发页面跳转或路由导航',
      code: `Button(onClick = { navController.navigate("detail") }) {
    Text("查看详情")
}`
    },
  ],

  bestPractices: [
    {
      title: '提供清晰的点击反馈',
      description: '按钮点击后应该有明确的视觉或行为反馈，避免用户重复点击',
      goodExample: `var clicked by remember { mutableStateOf(false) }
Button(
    onClick = { clicked = true },
    enabled = !clicked
) {
    Text(if (clicked) "已提交" else "提交")
}`,
      badExample: `// 没有禁用，用户可能重复提交
Button(onClick = { submitForm() }) {
    Text("提交")
}`
    },
    {
      title: '合理使用 enabled 状态',
      description: '当操作不可用时禁用按钮，而不是隐藏按钮',
      goodExample: `Button(
    onClick = { },
    enabled = formValid
) {
    Text("提交")
}`,
      badExample: `// 不推荐：隐藏按钮会让用户困惑
if (formValid) {
    Button(onClick = { }) {
        Text("提交")
    }
}`
    },
    {
      title: '使用 Modifier 控制尺寸',
      description: '通过 Modifier 统一控制按钮尺寸，保持界面一致性',
      goodExample: `Button(
    onClick = { },
    modifier = Modifier.fillMaxWidth()
) {
    Text("全宽按钮")
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: '内容默认水平排列',
      content: 'Button 的 content 使用 RowScope，内部元素默认水平排列，如需垂直排列可嵌套 Column'
    },
    {
      type: 'warning',
      title: '避免嵌套可点击组件',
      content: '不要在 Button 内部放置其他可点击组件（如另一个 Button 或 IconButton），这会导致点击事件冲突'
    },
    {
      type: 'info',
      title: '使用 InteractionSource 自定义交互效果',
      content: '通过 remember { MutableInteractionSource() } 可以监听按钮的按下、释放、悬停等状态，实现自定义交互动画'
    },
    {
      type: 'error',
      title: '注意无障碍性',
      content: '如果按钮只包含图标，务必为 Icon 提供 contentDescription，以便屏幕阅读器正确识别'
    },
  ],

  relatedComponents: ['text-button', 'outlined-button', 'elevated-button', 'filled-tonal-button', 'icon-button'],
  since: '1.0.0',
}
