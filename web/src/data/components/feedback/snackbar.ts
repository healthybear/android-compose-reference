import type { ComponentEntry } from '../../types'

export const snackbarComponent: ComponentEntry = {
  id: 'snackbar',
  name: 'Snackbar / SnackbarHost',
  category: 'Feedback',
  description: '底部短暂提示条，通过 SnackbarHostState 触发，配合 Scaffold 的 snackbarHost 插槽使用。',
  tags: ['snackbar', 'toast', 'notification', 'feedback', '提示'],
  params: [
    { name: 'hostState', type: 'SnackbarHostState', required: true, description: 'SnackbarHost 的状态对象，用于触发显示' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: 'SnackbarHost 的修饰符' },
    { name: 'snackbar', type: '@Composable (SnackbarData) -> Unit', default: '{ Snackbar(it) }', description: '自定义 Snackbar 外观' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `val snackbarHostState = remember { SnackbarHostState() }
val scope = rememberCoroutineScope()

Scaffold(
    snackbarHost = { SnackbarHost(snackbarHostState) }
) { padding ->
    Button(
        onClick = {
            scope.launch {
                snackbarHostState.showSnackbar("操作成功")
            }
        },
        modifier = Modifier.padding(padding)
    ) {
        Text("显示提示")
    }
}`,
    },
    {
      title: '带操作按钮 + 处理结果',
      code: `scope.launch {
    val result = snackbarHostState.showSnackbar(
        message = "已删除",
        actionLabel = "撤销",
        duration = SnackbarDuration.Long
    )
    if (result == SnackbarResult.ActionPerformed) {
        // 用户点击了"撤销"
        undoDelete()
    }
}`,
    },
  ],
}
