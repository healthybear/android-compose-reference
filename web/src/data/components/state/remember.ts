import type { ComponentEntry } from '../../types'

export const rememberComponent: ComponentEntry = {
  id: 'remember',
  demo: { id: 'remember', sourceFile: 'RememberDemo.kt' },
  name: 'remember',
  category: 'State',
  description: 'remember 是 Compose 中最基础的状态保留机制，在重组（Recomposition）期间保存值。配合 mutableStateOf 创建可观察状态，状态变化时自动触发 UI 更新。',
  tags: ['state', 'remember', 'recomposition', 'memoization', 'cache'],
  params: [
    { name: 'key1, key2, ...', type: 'Any?', default: '无', description: '依赖键（可选），任一键变化时重新执行 calculation' },
    { name: 'calculation', type: '() -> T', required: true, description: '初始化计算块，返回要记住的值。仅在首次组合或键变化时执行' },
  ],
  examples: [
    {
      title: '基础计数器',
      code: `@Composable
fun Counter() {
    var count by remember { mutableIntStateOf(0) }

    Column {
        Text("计数：$count")
        Button(onClick = { count++ }) {
            Text("+1")
        }
    }
}`,
    },
    {
      title: '缓存计算结果',
      code: `@Composable
fun ExpensiveList(items: List<Item>) {
    // 只在 items 变化时重新排序
    val sortedItems = remember(items) {
        items.sortedBy { it.priority }
    }

    LazyColumn {
        items(sortedItems) { item ->
            ItemRow(item)
        }
    }
}`,
    },
    {
      title: '多个依赖键',
      code: `@Composable
fun FilteredList(
    items: List<Item>,
    filter: String,
    sortOrder: SortOrder
) {
    // items、filter、sortOrder 任一变化时重新计算
    val processedItems = remember(items, filter, sortOrder) {
        items
            .filter { it.name.contains(filter, ignoreCase = true) }
            .sortedWith(sortOrder.comparator)
    }

    LazyColumn {
        items(processedItems) { item ->
            Text(item.name)
        }
    }
}`,
    },
    {
      title: '记住对象实例',
      code: `@Composable
fun AnimatedContent() {
    // 创建并记住动画状态，避免每次重组都重新创建
    val animationState = remember {
        Animatable(0f)
    }

    LaunchedEffect(Unit) {
        animationState.animateTo(1f, tween(1000))
    }

    Box(
        modifier = Modifier
            .alpha(animationState.value)
            .fillMaxSize()
    ) {
        Text("淡入内容")
    }
}`,
    },
    {
      title: 'remember vs 局部变量',
      code: `@Composable
fun ComparisonExample() {
    // ❌ 错误：每次重组都重新创建，状态丢失
    var wrongCount = 0

    // ✅ 正确：重组时保留状态
    var correctCount by remember { mutableIntStateOf(0) }

    Button(onClick = {
        wrongCount++      // 点击后重组，wrongCount 重置为 0
        correctCount++    // 正确累加
    }) {
        Text("错误计数: $wrongCount, 正确计数: $correctCount")
    }
}`,
    },
    {
      title: '委托属性语法',
      code: `@Composable
fun DelegateExample() {
    // 使用 by 委托，直接读写值
    var text by remember { mutableStateOf("") }
    text = "新值"  // 直接赋值

    // 不使用 by，需要 .value
    val textState = remember { mutableStateOf("") }
    textState.value = "新值"  // 通过 .value 访问
}`,
    },
  ],

  useCases: [
    {
      title: '表单状态管理',
      description: '使用 remember 管理多个输入字段的状态',
      code: `@Composable
fun LoginForm(onLogin: (String, String) -> Unit) {
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var rememberMe by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        TextField(
            value = username,
            onValueChange = { username = it },
            label = { Text("用户名") }
        )

        TextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("密码") },
            visualTransformation = PasswordVisualTransformation()
        )

        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(
                checked = rememberMe,
                onCheckedChange = { rememberMe = it }
            )
            Text("记住我")
        }

        Button(
            onClick = { onLogin(username, password) },
            enabled = username.isNotBlank() && password.isNotBlank()
        ) {
            Text("登录")
        }
    }
}`
    },
    {
      title: '优化昂贵计算',
      description: '缓存计算密集型结果，避免不必要的重复计算',
      code: `@Composable
fun StatisticsView(data: List<DataPoint>) {
    // 只在 data 变化时重新计算统计数据
    val statistics = remember(data) {
        Statistics(
            mean = data.map { it.value }.average(),
            median = data.sorted()[data.size / 2].value,
            stdDev = calculateStdDev(data)
        )
    }

    Column {
        Text("平均值: \${statistics.mean}")
        Text("中位数: \${statistics.median}")
        Text("标准差: \${statistics.stdDev}")
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '为可观察状态使用 remember',
      description: '需要在重组间保留并触发 UI 更新的状态必须用 remember',
      goodExample: `// 状态变化时自动更新 UI
var count by remember { mutableIntStateOf(0) }
Button(onClick = { count++ }) {
    Text("$count")
}`,
      badExample: `// 每次重组都重置为 0，无法累加
var count = 0
Button(onClick = { count++ }) {
    Text("$count")  // 永远显示 0
}`
    },
    {
      title: '合理使用依赖键',
      description: '只传入真正影响计算结果的键，避免不必要的重新计算',
      goodExample: `// 只依赖实际使用的参数
val filtered = remember(items, filter) {
    items.filter { it.name.contains(filter) }
}`,
      badExample: `// 依赖了不相关的状态，导致不必要的重新计算
val filtered = remember(items, filter, unrelatedState) {
    items.filter { it.name.contains(filter) }
}`
    },
    {
      title: '避免在 remember 中执行副作用',
      description: 'remember 用于记忆值，副作用应使用 LaunchedEffect 等',
      goodExample: `// 副作用在 LaunchedEffect 中
LaunchedEffect(userId) {
    fetchUserData(userId)
}

// remember 只用于记忆状态
var userData by remember { mutableStateOf<User?>(null) }`,
      badExample: `// 错误：remember 中执行网络请求
val userData = remember(userId) {
    fetchUserData(userId)  // 阻塞组合，且可能多次执行
}`
    },
    {
      title: '昂贵对象创建使用 remember',
      description: '避免每次重组都重新创建相同的对象',
      goodExample: `// 只创建一次
val animatable = remember { Animatable(0f) }
val focusRequester = remember { FocusRequester() }`,
      badExample: `// 每次重组都重新创建，浪费性能
val animatable = Animatable(0f)
val focusRequester = FocusRequester()`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'remember 只在重组间保留',
      content: 'remember 的值在 Composable 离开组合树或配置变更（如旋转屏幕）时会丢失。需要跨配置变更保留状态，使用 rememberSaveable'
    },
    {
      type: 'warning',
      title: 'remember 不是异步的',
      content: 'remember 的 calculation 在组合时同步执行。不要在其中执行耗时操作或挂起函数，应使用 LaunchedEffect + remember 状态'
    },
    {
      type: 'tip',
      title: 'remember 支持无键和多键',
      content: 'remember { } 无依赖键，只初始化一次；remember(key1, key2) 多个键，任一变化就重新计算'
    },
    {
      type: 'tip',
      title: '使用 by 简化代码',
      content: 'var state by remember { mutableStateOf(value) } 使用属性委托，比 state.value = newValue 更简洁'
    },
    {
      type: 'danger',
      title: '避免捕获外部可变变量',
      content: 'remember 闭包中不要捕获外部非 State 的可变变量，值变化时不会触发重新计算，导致状态不一致'
    },
  ],

  relatedComponents: ['derived-state-of', 'launched-effect', 'disposable-effect'],
  since: '1.0.0',
}
