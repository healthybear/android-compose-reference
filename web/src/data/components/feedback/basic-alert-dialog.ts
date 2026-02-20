import type { ComponentEntry } from '../../types'

export const basicAlertDialogComponent: ComponentEntry = {
  id: 'basic-alert-dialog',
  name: 'BasicAlertDialog',
  category: 'Feedback',
  description: 'M3 完全自定义对话框容器，不预设任何插槽，适合需要自定义布局的复杂对话框场景。',
  tags: ['dialog', 'custom', 'modal', 'basic', '自定义对话框'],
  params: [
    { name: 'onDismissRequest', type: '() -> Unit', required: true, description: '点击对话框外部或返回键时的关闭回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'properties', type: 'DialogProperties', default: 'DialogProperties()', description: '对话框属性，如是否可通过返回键关闭' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '完全自定义的对话框内容' },
  ],
  examples: [
    {
      title: '自定义布局对话框',
      code: `BasicAlertDialog(onDismissRequest = { showDialog = false }) {
    Surface(
        shape = MaterialTheme.shapes.extraLarge,
        tonalElevation = 6.dp
    ) {
        Column(modifier = Modifier.padding(24.dp)) {
            Text("选择主题", style = MaterialTheme.typography.headlineSmall)
            Spacer(Modifier.height(16.dp))
            listOf("跟随系统", "浅色", "深色").forEach { option ->
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { selectedTheme = option }
                        .padding(vertical = 8.dp)
                ) {
                    RadioButton(selected = selectedTheme == option, onClick = { selectedTheme = option })
                    Spacer(Modifier.width(8.dp))
                    Text(option)
                }
            }
            Spacer(Modifier.height(8.dp))
            Row(modifier = Modifier.align(Alignment.End)) {
                TextButton(onClick = { showDialog = false }) { Text("取消") }
                TextButton(onClick = { showDialog = false }) { Text("确认") }
            }
        }
    }
}`,
    },
    {
      title: '图片预览对话框',
      code: `BasicAlertDialog(
    onDismissRequest = { showDialog = false },
    properties = DialogProperties(usePlatformDefaultWidth = false)
) {
    Box(
        modifier = Modifier
            .fillMaxWidth(0.9f)
            .clickable { showDialog = false }
    ) {
        AsyncImage(
            model = imageUrl,
            contentDescription = null,
            modifier = Modifier.fillMaxWidth().clip(RoundedCornerShape(12.dp))
        )
    }
}`,
    },
  ],
}
