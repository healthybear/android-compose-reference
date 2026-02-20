import type { ComponentEntry } from '../../types'

export const bottomAppBarComponent: ComponentEntry = {
  id: 'bottom-app-bar',
  name: 'BottomAppBar',
  category: 'Navigation',
  description: '底部应用栏，放置操作按钮，可与 FAB 配合使用，适合操作密集型页面（如编辑器、播放器）。',
  tags: ['bottombar', 'appbar', 'toolbar', 'actions', '底部操作栏'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'containerColor', type: 'Color', default: 'BottomAppBarDefaults.containerColor', description: '背景色' },
    { name: 'contentColor', type: 'Color', default: 'contentColorFor(containerColor)', description: '内容颜色' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'BottomAppBarDefaults.ContentPadding', description: '内容内边距' },
    { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '操作按钮内容' },
  ],
  examples: [
    {
      title: '配合 FAB 使用',
      code: `Scaffold(
    bottomBar = {
        BottomAppBar {
            IconButton(onClick = { /* 检查 */ }) {
                Icon(Icons.Default.Check, contentDescription = "检查")
            }
            IconButton(onClick = { /* 搜索 */ }) {
                Icon(Icons.Default.Search, contentDescription = "搜索")
            }
            IconButton(onClick = { /* 更多 */ }) {
                Icon(Icons.Default.MoreVert, contentDescription = "更多")
            }
        }
    },
    floatingActionButton = {
        FloatingActionButton(onClick = { /* 新建 */ }) {
            Icon(Icons.Default.Add, contentDescription = "新建")
        }
    },
    floatingActionButtonPosition = FabPosition.EndOverlay
) { padding ->
    // 内容
}`,
    },
    {
      title: '编辑器工具栏',
      code: `BottomAppBar {
    IconButton(onClick = { /* 加粗 */ }) {
        Icon(Icons.Default.FormatBold, contentDescription = "加粗")
    }
    IconButton(onClick = { /* 斜体 */ }) {
        Icon(Icons.Default.FormatItalic, contentDescription = "斜体")
    }
    IconButton(onClick = { /* 下划线 */ }) {
        Icon(Icons.Default.FormatUnderlined, contentDescription = "下划线")
    }
    Spacer(Modifier.weight(1f))
    IconButton(onClick = { /* 撤销 */ }) {
        Icon(Icons.Default.Undo, contentDescription = "撤销")
    }
    IconButton(onClick = { /* 重做 */ }) {
        Icon(Icons.Default.Redo, contentDescription = "重做")
    }
}`,
    },
  ],
}
