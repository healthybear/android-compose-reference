import type { ComponentEntry } from '../../types'

export const derivedStateOfComponent: ComponentEntry = {
  id: 'derived-state-of',
  name: 'derivedStateOf',
  category: 'State',
  description: '从一个或多个状态派生出新状态，只有派生结果变化时才触发重组，避免不必要的重组开销。',
  tags: ['state', 'derived', 'computed', 'optimization', '派生状态'],
  params: [
    { name: 'calculation', type: '() -> T', required: true, description: '派生计算块，读取其他状态并返回派生值' },
  ],
  examples: [
    {
      title: '列表滚动状态派生',
      code: `val listState = rememberLazyListState()

// 只有 firstVisibleItemIndex 从 0 变为非 0（或反之）时才重组
val showScrollToTop by remember {
    derivedStateOf { listState.firstVisibleItemIndex > 0 }
}

Box {
    LazyColumn(state = listState) {
        items(100) { Text("Item $it", modifier = Modifier.padding(16.dp)) }
    }
    AnimatedVisibility(
        visible = showScrollToTop,
        modifier = Modifier.align(Alignment.BottomEnd).padding(16.dp)
    ) {
        FloatingActionButton(onClick = { /* 滚回顶部 */ }) {
            Icon(Icons.Default.KeyboardArrowUp, contentDescription = "回到顶部")
        }
    }
}`,
    },
    {
      title: '表单验证',
      code: `var email by remember { mutableStateOf("") }
var password by remember { mutableStateOf("") }

// 只有 isValid 结果变化时才重组按钮
val isValid by remember {
    derivedStateOf {
        email.contains("@") && password.length >= 8
    }
}

Button(onClick = { /* 登录 */ }, enabled = isValid) {
    Text("登录")
}`,
    },
  ],
}
