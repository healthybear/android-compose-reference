import type { ComponentEntry } from '../../types'

export const outlinedButtonComponent: ComponentEntry = {
  id: 'outlined-button',
  demo: { id: 'outlined-button', sourceFile: 'OutlinedButtonDemo.kt' },
  name: 'OutlinedButton',
  category: 'Material',
  description: '带边框的次要操作按钮，适合与主按钮并列使用的取消/次要操作。',
  tags: ['button', 'outlined', 'secondary', 'border', '按钮'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互' },
    { name: 'shape', type: 'Shape', default: 'ButtonDefaults.outlinedShape', description: '按钮形状' },
    { name: 'colors', type: 'ButtonColors', default: 'ButtonDefaults.outlinedButtonColors()', description: '颜色配置' },
    { name: 'border', type: 'BorderStroke?', default: 'ButtonDefaults.outlinedButtonBorder', description: '边框样式' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'ButtonDefaults.ContentPadding', description: '内容内边距' },
    { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '按钮内容插槽' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `OutlinedButton(onClick = { /* 取消 */ }) {
    Text("取消")
}`,
    },
    {
      title: '与主按钮并列',
      code: `Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    OutlinedButton(onClick = { /* 取消 */ }) {
        Text("取消")
    }
    Button(onClick = { /* 确认 */ }) {
        Text("确认")
    }
}`,
    },
    {
      title: '带图标',
      code: `OutlinedButton(onClick = { /* 过滤 */ }) {
    Icon(
        Icons.Default.FilterList,
        contentDescription = null,
        modifier = Modifier.size(ButtonDefaults.IconSize)
    )
    Spacer(Modifier.size(ButtonDefaults.IconSpacing))
    Text("筛选")
}`,
    },
    {
      title: '对话框取消按钮',
      code: `AlertDialog(
    onDismissRequest = { showDialog = false },
    title = { Text("确认删除") },
    text = { Text("删除后无法恢复，确定要继续吗？") },
    confirmButton = {
        Button(onClick = { delete() }) {
            Text("删除")
        }
    },
    dismissButton = {
        OutlinedButton(onClick = { showDialog = false }) {
            Text("取消")
        }
    }
)`,
    },
    {
      title: '自定义边框颜色',
      code: `OutlinedButton(
    onClick = { /* 操作 */ },
    border = BorderStroke(2.dp, MaterialTheme.colorScheme.error)
) {
    Text("危险操作", color = MaterialTheme.colorScheme.error)
}`,
    },
    {
      title: '全宽按钮组',
      code: `Column(
    modifier = Modifier.fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(12.dp)
) {
    OutlinedButton(
        onClick = { /* 用邮箱登录 */ },
        modifier = Modifier.fillMaxWidth()
    ) {
        Icon(Icons.Default.Email, contentDescription = null, modifier = Modifier.size(ButtonDefaults.IconSize))
        Spacer(Modifier.size(ButtonDefaults.IconSpacing))
        Text("使用邮箱登录")
    }
    OutlinedButton(
        onClick = { /* 用手机号登录 */ },
        modifier = Modifier.fillMaxWidth()
    ) {
        Icon(Icons.Default.Phone, contentDescription = null, modifier = Modifier.size(ButtonDefaults.IconSize))
        Spacer(Modifier.size(ButtonDefaults.IconSpacing))
        Text("使用手机号登录")
    }
}`,
    },
  ],

  useCases: [
    {
      title: '表单取消操作',
      description: '在表单底部提供取消和提交按钮',
      code: `@Composable
fun UserProfileForm(
    onCancel: () -> Unit,
    onSave: (UserProfile) -> Unit
) {
    var name by remember { mutableStateOf("") }
    var bio by remember { mutableStateOf("") }
    var isModified by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        OutlinedTextField(
            value = name,
            onValueChange = {
                name = it
                isModified = true
            },
            label = { Text("姓名") },
            modifier = Modifier.fillMaxWidth()
        )

        OutlinedTextField(
            value = bio,
            onValueChange = {
                bio = it
                isModified = true
            },
            label = { Text("个人简介") },
            modifier = Modifier
                .fillMaxWidth()
                .height(120.dp),
            maxLines = 5
        )

        Spacer(Modifier.height(8.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            OutlinedButton(
                onClick = onCancel,
                modifier = Modifier.weight(1f)
            ) {
                Text("取消")
            }

            Button(
                onClick = { onSave(UserProfile(name, bio)) },
                enabled = isModified && name.isNotBlank(),
                modifier = Modifier.weight(1f)
            ) {
                Text("保存")
            }
        }
    }
}`
    },
    {
      title: '卡片操作按钮',
      description: '在内容卡片中使用低强调的操作按钮',
      code: `@Composable
fun NotificationCard(
    notification: Notification,
    onAccept: () -> Unit,
    onDecline: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    Icons.Default.Notifications,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.primary
                )
                Spacer(Modifier.width(12.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = notification.title,
                        style = MaterialTheme.typography.titleMedium
                    )
                    Text(
                        text = notification.time,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }

            Spacer(Modifier.height(12.dp))

            Text(
                text = notification.message,
                style = MaterialTheme.typography.bodyMedium
            )

            Spacer(Modifier.height(16.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedButton(
                    onClick = onDecline,
                    modifier = Modifier.weight(1f)
                ) {
                    Text("拒绝")
                }
                FilledTonalButton(
                    onClick = onAccept,
                    modifier = Modifier.weight(1f)
                ) {
                    Text("接受")
                }
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '用于取消和次要操作',
      description: 'OutlinedButton 强调程度低，适合取消、返回等次要操作',
      goodExample: `Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    OutlinedButton(onClick = { /* 取消 */ }) { Text("取消") }
    Button(onClick = { /* 确认 */ }) { Text("确认") }
}`,
      badExample: `// 两个都用 Button，强调过度
Row {
    Button(onClick = { }) { Text("取消") }
    Button(onClick = { }) { Text("确认") }
}`
    },
    {
      title: '搭配危险操作使用颜色',
      description: '破坏性操作使用 error 颜色的边框和文字',
      goodExample: `OutlinedButton(
    onClick = { deleteAccount() },
    border = BorderStroke(1.dp, MaterialTheme.colorScheme.error),
    colors = ButtonDefaults.outlinedButtonColors(
        contentColor = MaterialTheme.colorScheme.error
    )
) {
    Text("删除账号")
}`,
      badExample: `OutlinedButton(onClick = { deleteAccount() }) {
    Text("删除账号")  // 缺少视觉警告
}`
    },
    {
      title: '避免在浅色背景上难以辨识',
      description: '确保边框颜色与背景有足够对比度',
      goodExample: `// 使用 outline 颜色确保可见性
OutlinedButton(
    onClick = { },
    border = ButtonDefaults.outlinedButtonBorder
) { Text("操作") }`,
      badExample: `// 自定义过浅的边框色
OutlinedButton(
    onClick = { },
    border = BorderStroke(1.dp, Color.LightGray)
) { Text("操作") }`
    },
    {
      title: '与 FilledButton 搭配明确主次',
      description: '主次分明的按钮组合能引导用户做出正确选择',
      goodExample: `Row {
    OutlinedButton(onClick = { /* 次要 */ }) { Text("稍后") }
    Spacer(Modifier.width(8.dp))
    Button(onClick = { /* 主要 */ }) { Text("立即设置") }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'OutlinedButton 的默认边框',
      content: 'OutlinedButton 默认使用 1.dp 宽度的 outline 颜色边框，透明背景'
    },
    {
      type: 'info',
      title: '适合用作对话框取消按钮',
      content: 'Material Design 推荐对话框的取消/否定按钮使用 OutlinedButton 或 TextButton'
    },
    {
      type: 'warning',
      title: '不适合作为页面主要操作',
      content: 'OutlinedButton 强调程度低，不应用作页面的主要行动号召（CTA）'
    },
    {
      type: 'info',
      title: '边框会跟随交互状态变化',
      content: '按下时边框颜色会变化，提供清晰的视觉反馈'
    },
    {
      type: 'info',
      title: '深色模式下自动适配',
      content: 'OutlinedButton 的边框颜色会自动适配深色主题，确保可见性'
    },
    {
      type: 'error',
      title: '避免边框过细或过粗',
      content: '边框宽度应保持在 1-2dp 之间，过细难以辨识，过粗视觉笨重'
    },
  ],

  relatedComponents: ['button', 'filled-tonal-button', 'elevated-button', 'text-button'],
  since: '1.0.0',
}
