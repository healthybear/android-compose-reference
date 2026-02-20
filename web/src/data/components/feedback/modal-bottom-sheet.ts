import type { ComponentEntry } from '../../types'

export const modalBottomSheetComponent: ComponentEntry = {
  id: 'modal-bottom-sheet',
  name: 'ModalBottomSheet',
  category: 'Feedback',
  description: '模态底部弹出面板，从屏幕底部滑入，支持拖拽关闭，适合操作菜单、详情预览等场景。',
  tags: ['bottom-sheet', 'modal', 'sheet', 'drawer', '底部面板'],
  params: [
    { name: 'onDismissRequest', type: '() -> Unit', required: true, description: '面板关闭时的回调（下滑或点击遮罩）' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'sheetState', type: 'SheetState', default: 'rememberModalBottomSheetState()', description: '面板状态，可控制展开/收起' },
    { name: 'shape', type: 'Shape', default: 'BottomSheetDefaults.ExpandedShape', description: '面板形状，默认顶部圆角' },
    { name: 'containerColor', type: 'Color', default: 'BottomSheetDefaults.ContainerColor', description: '面板背景色' },
    { name: 'dragHandle', type: '@Composable (() -> Unit)?', default: '{ BottomSheetDefaults.DragHandle() }', description: '顶部拖拽把手，设为 null 可隐藏' },
    { name: 'content', type: '@Composable ColumnScope.() -> Unit', required: true, description: '面板内容' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var showSheet by remember { mutableStateOf(false) }

Button(onClick = { showSheet = true }) { Text("打开面板") }

if (showSheet) {
    ModalBottomSheet(onDismissRequest = { showSheet = false }) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("操作菜单", style = MaterialTheme.typography.titleMedium)
            Spacer(Modifier.height(16.dp))
            ListItem(
                headlineContent = { Text("分享") },
                leadingContent = { Icon(Icons.Default.Share, null) },
                modifier = Modifier.clickable { showSheet = false }
            )
            ListItem(
                headlineContent = { Text("收藏") },
                leadingContent = { Icon(Icons.Default.Favorite, null) },
                modifier = Modifier.clickable { showSheet = false }
            )
            Spacer(Modifier.height(16.dp))
        }
    }
}`,
    },
    {
      title: '程序控制展开/收起',
      code: `val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)
val scope = rememberCoroutineScope()

if (showSheet) {
    ModalBottomSheet(
        onDismissRequest = { showSheet = false },
        sheetState = sheetState
    ) {
        Button(
            onClick = {
                scope.launch { sheetState.hide() }.invokeOnCompletion {
                    if (!sheetState.isVisible) showSheet = false
                }
            },
            modifier = Modifier.padding(16.dp)
        ) {
            Text("关闭")
        }
    }
}`,
    },
  ],
}
