import type { ComponentEntry } from '../../types'

export const collectAsStateComponent: ComponentEntry = {
  id: 'collect-as-state',
  name: 'collectAsState',
  category: 'State',
  description: '将 Kotlin Flow / StateFlow / SharedFlow 收集为 Compose State，Flow 发射新值时自动触发重组。',
  tags: ['state', 'flow', 'stateflow', 'viewmodel', 'collect'],
  params: [
    { name: 'initial', type: 'T', default: '（StateFlow 使用 value）', description: '初始值，StateFlow 自动使用当前值' },
    { name: 'context', type: 'CoroutineContext', default: 'EmptyCoroutineContext', description: '收集协程上下文，默认在主线程' },
  ],
  examples: [
    {
      title: '收集 ViewModel StateFlow',
      code: `// ViewModel
class CounterViewModel : ViewModel() {
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()

    fun increment() { _count.value++ }
}

// Composable
@Composable
fun CounterScreen(viewModel: CounterViewModel = viewModel()) {
    val count by viewModel.count.collectAsState()

    Column {
        Text("计数：$count")
        Button(onClick = { viewModel.increment() }) { Text("+1") }
    }
}`,
    },
    {
      title: '收集普通 Flow（带初始值）',
      code: `// 普通 Flow 需要提供初始值
val timerFlow = flow {
    var i = 0
    while (true) {
        emit(i++)
        delay(1000)
    }
}

@Composable
fun Timer() {
    val seconds by timerFlow.collectAsState(initial = 0)
    Text("已运行：${seconds}s")
}`,
    },
  ],
}
