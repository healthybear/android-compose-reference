import type { ComponentEntry } from '../../types'

export const listWithDialogCompositionComponent: ComponentEntry = {
  id: 'list-with-dialog-composition',
  demo: { id: 'list-with-dialog-composition', sourceFile: 'ListWithDialogCompositionDemo.kt' },
  name: 'List with Dialog Composition',
  category: 'Composition',
  description: '列表与对话框组合示例，展示任务列表管理系统，包含展开/收起动画、详情对话框、删除确认等功能。',
  tags: ['list', 'dialog', 'composition', 'animation', '列表', '对话框', '组合'],
  params: [],
  examples: [
    {
      title: '任务列表管理',
      code: `LazyColumn {
    items(todos, key = { it.id }) { item ->
        Card {
            Row {
                Text(item.title)
                IconButton(onClick = { showDialog = true }) {
                    Icon(Icons.Filled.Info, contentDescription = "详情")
                }
            }
            AnimatedVisibility(visible = item.expanded) {
                Text(item.details)
            }
        }
    }
}

if (showDialog) {
    AlertDialog(
        onDismissRequest = { showDialog = false },
        title = { Text("任务详情") },
        text = { Text(selectedItem?.description ?: "") },
        confirmButton = {
            Button(onClick = { showDialog = false }) {
                Text("关闭")
            }
        }
    )
}`,
    },
  ],
  bestPractices: [
    {
      type: 'tip',
      title: '使用 AnimatedVisibility 实现平滑展开',
      content: '列表项展开收起时添加动画，提升用户体验',
    },
    {
      type: 'tip',
      title: '重要操作需要二次确认',
      content: '删除等不可逆操作应使用对话框确认',
    },
  ],
  relatedComponents: ['lazy-column', 'alert-dialog', 'animated-visibility', 'card'],
  since: '1.0.0',
}
