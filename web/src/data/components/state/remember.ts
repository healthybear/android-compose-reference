import type { ComponentEntry } from '../../types'

export const rememberComponent: ComponentEntry = {
  id: 'remember',
  name: 'remember / rememberSaveable',
  category: 'State',
  description: 'remember 在重组间保留状态；rememberSaveable 额外在 Activity 重建（旋转屏幕、进程恢复）后保留状态。',
  tags: ['state', 'remember', 'saveable', 'recomposition', '状态保留'],
  params: [
    { name: 'keys', type: 'vararg Any?', default: '（无）', description: 'remember 的依赖键，键变化时重新计算值' },
    { name: 'calculation', type: '() -> T', required: true, description: '初始化计算块，只在首次组合或键变化时执行' },
  ],
  examples: [
    {
      title: 'remember 基础用法',
      code: `// 计数器：重组时保留，旋转屏幕后重置
var count by remember { mutableIntStateOf(0) }

Column {
    Text("计数：$count")
    Button(onClick = { count++ }) { Text("+1") }
}`,
    },
    {
      title: 'rememberSaveable（旋转后保留）',
      code: `// 旋转屏幕、返回重进后仍保留
var text by rememberSaveable { mutableStateOf("") }

TextField(
    value = text,
    onValueChange = { text = it },
    label = { Text("输入内容") }
)`,
    },
    {
      title: 'remember 带 key（依赖变化时重算）',
      code: `// userId 变化时重新创建 userState
val userState = remember(userId) {
    UserState(userId)
}

// 常见场景：缓存计算结果
val sortedList = remember(items, sortOrder) {
    items.sortedWith(sortOrder.comparator)
}`,
    },
  ],
}
