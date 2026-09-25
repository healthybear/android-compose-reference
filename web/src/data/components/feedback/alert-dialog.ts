import type { ComponentEntry } from '../../types'

export const alertDialogComponent: ComponentEntry = {
  id: 'alert-dialog',
  demo: { id: 'alert-dialog', sourceFile: 'AlertDialogDemo.kt' },
  name: 'AlertDialog',
  category: 'Feedback',
  description: 'AlertDialog 是 Material Design 3 的标准警告对话框，用于需要用户确认或做出选择的场景。包含图标、标题、正文和操作按钮插槽，支持自定义内容。',
  tags: ['dialog', 'alert', 'confirm', 'modal', 'popup'],
  params: [
    { name: 'onDismissRequest', type: '() -> Unit', required: true, description: '点击对话框外部或返回键时的关闭回调' },
    { name: 'confirmButton', type: '@Composable () -> Unit', required: true, description: '确认按钮，通常为 TextButton' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'dismissButton', type: '@Composable (() -> Unit)?', default: 'null', description: '取消按钮，可选' },
    { name: 'icon', type: '@Composable (() -> Unit)?', default: 'null', description: '顶部图标，用于强化对话框类型（警告/信息/错误）' },
    { name: 'title', type: '@Composable (() -> Unit)?', default: 'null', description: '标题，简洁概括对话框目的' },
    { name: 'text', type: '@Composable (() -> Unit)?', default: 'null', description: '正文内容，详细说明' },
    { name: 'shape', type: 'Shape', default: 'AlertDialogDefaults.shape', description: '对话框形状，默认圆角矩形' },
    { name: 'containerColor', type: 'Color', default: 'AlertDialogDefaults.containerColor', description: '容器背景色' },
    { name: 'tonalElevation', type: 'Dp', default: 'AlertDialogDefaults.TonalElevation', description: '色调高度' },
    { name: 'properties', type: 'DialogProperties', default: 'DialogProperties()', description: '对话框属性配置' },
  ],
  examples: [
    {
      title: '基础确认对话框',
      code: `var showDialog by remember { mutableStateOf(false) }

Button(onClick = { showDialog = true }) {
    Text("删除")
}

if (showDialog) {
    AlertDialog(
        onDismissRequest = { showDialog = false },
        title = { Text("确认删除？") },
        text = { Text("删除后无法恢复，请确认是否继续。") },
        confirmButton = {
            TextButton(
                onClick = {
                    showDialog = false
                    // 执行删除操作
                }
            ) {
                Text("删除")
            }
        },
        dismissButton = {
            TextButton(onClick = { showDialog = false }) {
                Text("取消")
            }
        }
    )
}`,
    },
    {
      title: '带图标的警告对话框',
      code: `var showWarning by remember { mutableStateOf(false) }

if (showWarning) {
    AlertDialog(
        onDismissRequest = { showWarning = false },
        icon = {
            Icon(
                Icons.Default.Warning,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.error
            )
        },
        title = { Text("权限请求") },
        text = {
            Text("此功能需要访问您的位置信息，用于提供附近的商家推荐。")
        },
        confirmButton = {
            TextButton(
                onClick = {
                    showWarning = false
                    // 请求权限
                }
            ) {
                Text("允许")
            }
        },
        dismissButton = {
            TextButton(onClick = { showWarning = false }) {
                Text("拒绝")
            }
        }
    )
}`,
    },
    {
      title: '单按钮对话框',
      code: `var showInfo by remember { mutableStateOf(false) }

if (showInfo) {
    AlertDialog(
        onDismissRequest = { showInfo = false },
        icon = {
            Icon(
                Icons.Default.Info,
                contentDescription = null
            )
        },
        title = { Text("操作成功") },
        text = { Text("您的更改已保存。") },
        confirmButton = {
            TextButton(onClick = { showInfo = false }) {
                Text("确定")
            }
        }
    )
}`,
    },
    {
      title: '自定义内容对话框',
      code: `var showCustom by remember { mutableStateOf(false) }
var selectedOption by remember { mutableStateOf(0) }

if (showCustom) {
    AlertDialog(
        onDismissRequest = { showCustom = false },
        title = { Text("选择主题") },
        text = {
            Column {
                listOf("浅色", "深色", "跟随系统").forEachIndexed { index, theme ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .selectable(
                                selected = selectedOption == index,
                                onClick = { selectedOption = index }
                            )
                            .padding(vertical = 8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        RadioButton(
                            selected = selectedOption == index,
                            onClick = null
                        )
                        Spacer(Modifier.width(8.dp))
                        Text(theme)
                    }
                }
            }
        },
        confirmButton = {
            TextButton(
                onClick = {
                    showCustom = false
                    // 应用主题
                }
            ) {
                Text("确定")
            }
        },
        dismissButton = {
            TextButton(onClick = { showCustom = false }) {
                Text("取消")
            }
        }
    )
}`,
    },
    {
      title: '禁止点击外部关闭',
      code: `var showDialog by remember { mutableStateOf(false) }

if (showDialog) {
    AlertDialog(
        onDismissRequest = { }, // 空实现，禁止点击外部关闭
        title = { Text("正在处理") },
        text = { Text("请勿关闭对话框...") },
        confirmButton = { },
        properties = DialogProperties(
            dismissOnBackPress = false,
            dismissOnClickOutside = false
        )
    )
}`,
    },
    {
      title: '危险操作确认',
      code: `var showDanger by remember { mutableStateOf(false) }

if (showDanger) {
    AlertDialog(
        onDismissRequest = { showDanger = false },
        icon = {
            Icon(
                Icons.Default.Error,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.error
            )
        },
        title = { Text("清空所有数据？") },
        text = {
            Column {
                Text("此操作将：")
                Spacer(Modifier.height(8.dp))
                Text("• 删除所有本地数据")
                Text("• 清除缓存和历史记录")
                Text("• 重置所有设置")
                Spacer(Modifier.height(8.dp))
                Text(
                    "此操作无法撤销！",
                    color = MaterialTheme.colorScheme.error,
                    fontWeight = FontWeight.Bold
                )
            }
        },
        confirmButton = {
            TextButton(
                onClick = {
                    showDanger = false
                    // 执行清空操作
                },
                colors = ButtonDefaults.textButtonColors(
                    contentColor = MaterialTheme.colorScheme.error
                )
            ) {
                Text("清空")
            }
        },
        dismissButton = {
            TextButton(onClick = { showDanger = false }) {
                Text("取消")
            }
        }
    )
}`,
    },
  ],

  useCases: [
    {
      title: '退出登录确认',
      description: '确认退出登录操作',
      code: `@Composable
fun LogoutConfirmDialog(
    onConfirm: () -> Unit,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        icon = {
            Icon(
                Icons.AutoMirrored.Filled.ExitToApp,
                contentDescription = null
            )
        },
        title = { Text("确认退出登录？") },
        text = { Text("退出后需要重新登录才能访问个人信息。") },
        confirmButton = {
            TextButton(onClick = onConfirm) {
                Text("退出")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("取消")
            }
        }
    )
}`
    },
    {
      title: '表单放弃确认',
      description: '未保存更改时的返回确认',
      code: `@Composable
fun DiscardChangesDialog(
    onDiscard: () -> Unit,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("放弃更改？") },
        text = { Text("您有未保存的更改，确定要放弃吗？") },
        confirmButton = {
            TextButton(onClick = onDiscard) {
                Text("放弃")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("继续编辑")
            }
        }
    )
}`
    },
  ],

  bestPractices: [
    {
      title: '标题应简洁明确',
      description: '使用疑问句或明确的操作说明',
      goodExample: `title = { Text("确认删除？") }`,
      badExample: `title = { Text("提示") }  // 过于笼统`
    },
    {
      title: '按钮顺序：取消在左，确认在右',
      description: 'dismissButton 在左，confirmButton 在右',
      goodExample: `confirmButton = { TextButton(...) { Text("删除") } }
dismissButton = { TextButton(...) { Text("取消") } }`,
    },
    {
      title: '危险操作使用 error 颜色',
      description: '删除、清空等不可逆操作应醒目提示',
      goodExample: `icon = {
    Icon(
        Icons.Default.Warning,
        contentDescription = null,
        tint = MaterialTheme.colorScheme.error
    )
}`,
    },
    {
      title: '避免在对话框中嵌套对话框',
      description: '多层对话框会困惑用户',
      goodExample: `// 关闭第一个对话框，再打开第二个
showDialog1 = false
showDialog2 = true`,
      badExample: `if (showDialog1) {
    AlertDialog(...) {
        if (showDialog2) {  // 嵌套对话框
            AlertDialog(...)
        }
    }
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'AlertDialog vs BasicAlertDialog',
      content: 'AlertDialog 是标准 Material 对话框；BasicAlertDialog 无内置布局，完全自定义'
    },
    {
      type: 'warning',
      title: 'onDismissRequest 必须处理',
      content: 'onDismissRequest 在点击外部或返回键时触发，必须正确关闭对话框，否则用户无法退出'
    },
    {
      type: 'tip',
      title: '使用 DialogProperties 控制行为',
      content: 'dismissOnBackPress/dismissOnClickOutside 控制是否允许通过返回键或点击外部关闭对话框'
    },
    {
      type: 'tip',
      title: '对话框自动处理返回键',
      content: 'AlertDialog 自动拦截返回键并调用 onDismissRequest，无需手动处理'
    },
    {
      type: 'danger',
      title: '避免在对话框中执行耗时操作',
      content: '确认按钮的 onClick 应立即关闭对话框，耗时操作放在 LaunchedEffect 中异步执行'
    },
  ],

  relatedComponents: ['basic-alert-dialog', 'snackbar', 'modal-bottom-sheet'],
  since: '1.0.0',
}
