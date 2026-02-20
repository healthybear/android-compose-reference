import type { ComponentEntry } from '../../types'

export const selectionContainerComponent: ComponentEntry = {
  id: 'selection-container',
  name: 'SelectionContainer',
  category: 'Foundation',
  description: '文字选择容器，包裹 Text 后用户可长按选中文字并复制，默认情况下 Compose 的 Text 不可选中。',
  tags: ['selection', 'copy', 'text', 'selectable', '文字选择'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'selection', type: 'Selection?', default: 'null', description: '当前选中范围，配合 onSelectionChange 实现受控模式' },
    { name: 'onSelectionChange', type: '(Selection?) -> Unit', default: '{}', description: '选中范围变化回调' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '包含可选中文字的内容' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `SelectionContainer {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("这段文字可以被选中并复制。", style = MaterialTheme.typography.bodyLarge)
        Spacer(Modifier.height(8.dp))
        Text("长按即可选择文字范围。", style = MaterialTheme.typography.bodyMedium)
    }
}`,
    },
    {
      title: '禁用部分文字选择',
      code: `SelectionContainer {
    Column {
        Text("这段文字可以选中")
        // DisableSelection 可以在 SelectionContainer 内部禁用特定区域
        DisableSelection {
            Text("这段文字不可选中", color = MaterialTheme.colorScheme.outline)
        }
        Text("这段文字也可以选中")
    }
}`,
    },
  ],
}
