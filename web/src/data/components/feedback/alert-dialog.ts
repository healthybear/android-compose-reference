import type { ComponentEntry } from '../../types'

export const alertDialogComponent: ComponentEntry = {
  id: 'alert-dialog',
  name: 'AlertDialog',
  category: 'Feedback',
  description: 'Material3 标准警告对话框，包含图标、标题、正文和操作按钮插槽，适合需要用户确认的场景。',
  tags: ['dialog', 'alert', 'confirm', 'modal', '对话框'],
  params: [
    { name: 'onDismissRequest', type: '() -> Unit', required: true, description: '点击对话框外部或返回键时的关闭回调' },
    { name: 'confirmButton', type: '@Composable () -> Unit', required: true, description: '确认按钮，通常为 TextButton' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'dismissButton', type: '@Composable (() -> Unit)?', default: 'null', description: '取消按钮' },
    { name: 'icon', type: '@Composable (() -> Unit)?', default: 'null', description: '顶部图标' },
    { name: 'title', type: '@Composable (() -> Unit)?', default: 'null', description: '标题' },
    { name: 'text', type: '@Composable (() -> Unit)?', default: 'null', description: '正文内容' },
    { name: 'shape', type: 'Shape', default: 'AlertDialogDefaults.shape', description: '对话框形状' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var showDialog by remember { mutableStateOf(false) }

if (showDialog) {
    AlertDialog(
        onDismissRequest = { showDialog = false },
        title = { Text("确认删除？") },
        text = { Text("删除后无法恢复，请确认是否继续。") },
        confirmButton = {
            TextButton(onClick = { showDialog = false; /* 执行删除 */ }) {
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
      title: '带图标',
      code: `AlertDialog(
    onDismissRequest = { showDialog = false },
    icon = { Icon(Icons.Default.Warning, contentDescription = null) },
    title = { Text("权限请求") },
    text = { Text("此功能需要访问您的位置信息。") },
    confirmButton = {
        TextButton(onClick = { showDialog = false }) { Text("允许") }
    },
    dismissButton = {
        TextButton(onClick = { showDialog = false }) { Text("拒绝") }
    }
)`,
    },
  ],
}
