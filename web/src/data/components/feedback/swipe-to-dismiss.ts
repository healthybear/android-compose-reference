import type { ComponentEntry } from '../../types'

export const swipeToDismissComponent: ComponentEntry = {
  id: 'swipe-to-dismiss',
  name: 'SwipeToDismissBox',
  category: 'Feedback',
  description: '左右滑动删除/操作容器，滑动时在背景层显示操作提示，松手后触发回调，符合 Material3 规范。',
  tags: ['swipe', 'dismiss', 'delete', 'gesture', '滑动删除'],
  params: [
    { name: 'state', type: 'SwipeToDismissBoxState', required: true, description: '滑动状态，由 rememberSwipeToDismissBoxState() 创建' },
    { name: 'backgroundContent', type: '@Composable RowScope.() -> Unit', required: true, description: '滑动时显示的背景层，通常为删除/操作提示' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enableDismissFromStartToEnd', type: 'Boolean', default: 'true', description: '是否允许从左向右滑动' },
    { name: 'enableDismissFromEndToStart', type: 'Boolean', default: 'true', description: '是否允许从右向左滑动' },
    { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '前景内容，即列表项本身' },
  ],
  examples: [
    {
      title: '滑动删除列表项',
      code: `var items by remember { mutableStateOf(List(10) { "Item $it" }) }

LazyColumn {
    items(items, key = { it }) { item ->
        val dismissState = rememberSwipeToDismissBoxState(
            confirmValueChange = { value ->
                if (value == SwipeToDismissBoxValue.EndToStart) {
                    items = items - item
                    true
                } else false
            }
        )
        SwipeToDismissBox(
            state = dismissState,
            enableDismissFromStartToEnd = false,
            backgroundContent = {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(MaterialTheme.colorScheme.errorContainer)
                        .padding(end = 16.dp),
                    contentAlignment = Alignment.CenterEnd
                ) {
                    Icon(Icons.Default.Delete, contentDescription = "删除", tint = MaterialTheme.colorScheme.onErrorContainer)
                }
            }
        ) {
            ListItem(headlineContent = { Text(item) }, modifier = Modifier.background(MaterialTheme.colorScheme.surface))
        }
    }
}`,
    },
    {
      title: '双向滑动（归档/删除）',
      code: `SwipeToDismissBox(
    state = dismissState,
    backgroundContent = {
        val direction = dismissState.targetValue
        val color = when (direction) {
            SwipeToDismissBoxValue.StartToEnd -> Color.Green.copy(alpha = 0.3f)
            SwipeToDismissBoxValue.EndToStart -> Color.Red.copy(alpha = 0.3f)
            else -> Color.Transparent
        }
        Box(modifier = Modifier.fillMaxSize().background(color))
    }
) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Text("可双向滑动的内容", modifier = Modifier.padding(16.dp))
    }
}`,
    },
  ],
}
