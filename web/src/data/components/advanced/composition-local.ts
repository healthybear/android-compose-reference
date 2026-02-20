import type { ComponentEntry } from '../../types'

export const compositionLocalComponent: ComponentEntry = {
  id: 'composition-local',
  name: 'CompositionLocal',
  category: 'Advanced',
  description: '隐式地向组合树中传递数据，无需逐层传参，适合主题、语言、用户信息等全局共享数据。',
  tags: ['compositionlocal', 'context', 'provider', 'implicit', '隐式传参'],
  params: [
    { name: 'defaultFactory', type: '() -> T', required: true, description: 'compositionLocalOf 的默认值工厂，未提供时抛出异常或返回默认值' },
  ],
  examples: [
    {
      title: '定义和使用 CompositionLocal',
      code: `// 定义（通常在顶层文件）
val LocalUserName = compositionLocalOf<String> { error("未提供 UserName") }
val LocalIsLoggedIn = staticCompositionLocalOf { false }  // 值不常变化时用 static

// 提供值
@Composable
fun App() {
    CompositionLocalProvider(
        LocalUserName provides "张三",
        LocalIsLoggedIn provides true
    ) {
        MainScreen()
    }
}

// 在任意子组件中读取
@Composable
fun WelcomeText() {
    val userName = LocalUserName.current
    val isLoggedIn = LocalIsLoggedIn.current
    if (isLoggedIn) {
        Text("欢迎，$userName")
    }
}`,
    },
    {
      title: 'compositionLocalOf vs staticCompositionLocalOf',
      code: `// compositionLocalOf：值变化时只重组读取该值的子树（推荐用于频繁变化的值）
val LocalThemeColor = compositionLocalOf { Color.Blue }

// staticCompositionLocalOf：值变化时重组整个提供者子树（适合不常变化的值，性能更好）
val LocalAppConfig = staticCompositionLocalOf { AppConfig() }

// 内置常用 CompositionLocal：
// LocalContext.current          — Android Context
// LocalLifecycleOwner.current   — LifecycleOwner
// LocalDensity.current          — Density（dp/px 转换）
// LocalFocusManager.current     — 焦点管理
// MaterialTheme.colorScheme     — 颜色方案（内部也是 CompositionLocal）`,
    },
  ],
}
