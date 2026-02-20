import type { ComponentEntry } from '../../types'

export const launchedEffectComponent: ComponentEntry = {
  id: 'launched-effect',
  name: 'LaunchedEffect',
  category: 'State',
  description: '在 Composable 中启动协程执行副作用，key 变化时取消并重启协程，组件离开组合时自动取消。',
  tags: ['effect', 'coroutine', 'side-effect', 'lifecycle', '副作用'],
  params: [
    { name: 'key1', type: 'Any?', required: true, description: '依赖键，变化时重启协程；传 Unit 表示只在首次组合时执行' },
    { name: 'key2', type: 'Any?', default: '（可选）', description: '第二个依赖键' },
    { name: 'block', type: 'suspend CoroutineScope.() -> Unit', required: true, description: '协程块，在 Compose 协程作用域中执行' },
  ],
  examples: [
    {
      title: '页面加载数据',
      code: `var data by remember { mutableStateOf<List<Item>?>(null) }

LaunchedEffect(Unit) {  // Unit = 只执行一次
    data = repository.fetchItems()
}

if (data == null) {
    CircularProgressIndicator()
} else {
    LazyColumn {
        items(data!!) { Text(it.title) }
    }
}`,
    },
    {
      title: 'key 变化时重新加载',
      code: `var userId by remember { mutableStateOf("user_1") }
var profile by remember { mutableStateOf<Profile?>(null) }

LaunchedEffect(userId) {  // userId 变化时重新执行
    profile = null  // 清空旧数据
    profile = userRepository.getProfile(userId)
}`,
    },
    {
      title: '显示 Snackbar',
      code: `val snackbarHostState = remember { SnackbarHostState() }

// errorMessage 变化时显示 Snackbar
LaunchedEffect(errorMessage) {
    errorMessage?.let {
        snackbarHostState.showSnackbar(it)
    }
}`,
    },
  ],
}
