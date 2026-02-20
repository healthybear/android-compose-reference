import type { ComponentEntry } from '../../types'

export const extendedFabComponent: ComponentEntry = {
  id: 'extended-fab',
  name: 'ExtendedFloatingActionButton',
  category: 'Material',
  description: '带文字标签的扩展悬浮操作按钮，比普通 FAB 更具描述性，支持滚动时自动收缩。',
  tags: ['fab', 'extended', 'floating', 'action', '扩展悬浮按钮'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'text', type: '@Composable () -> Unit', required: true, description: '文字标签' },
    { name: 'icon', type: '@Composable () -> Unit', required: true, description: '图标' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'expanded', type: 'Boolean', default: 'true', description: '是否展开显示文字，false 时收缩为圆形' },
    { name: 'shape', type: 'Shape', default: 'FloatingActionButtonDefaults.extendedFabShape', description: '形状' },
    { name: 'containerColor', type: 'Color', default: 'FloatingActionButtonDefaults.containerColor', description: '背景色' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `ExtendedFloatingActionButton(
    onClick = { /* 新建 */ },
    icon = { Icon(Icons.Default.Add, contentDescription = null) },
    text = { Text("新建") }
)`,
    },
    {
      title: '滚动时自动收缩',
      code: `val listState = rememberLazyListState()
val expanded by remember {
    derivedStateOf { listState.firstVisibleItemIndex == 0 }
}

Scaffold(
    floatingActionButton = {
        ExtendedFloatingActionButton(
            onClick = { /* 新建 */ },
            expanded = expanded,
            icon = { Icon(Icons.Default.Add, contentDescription = null) },
            text = { Text("新建") }
        )
    }
) { padding ->
    LazyColumn(state = listState, contentPadding = padding) {
        items(50) { Text("Item $it", modifier = Modifier.padding(16.dp)) }
    }
}`,
    },
  ],
}
