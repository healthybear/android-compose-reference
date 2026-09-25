import type { ComponentEntry } from '../../types'

export const compositionLocalComponent: ComponentEntry = {
  id: 'composition-local',
  demo: { id: 'composition-local', sourceFile: 'CompositionLocalDemo.kt' },
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
        Text("欢迎，" + userName)
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
    {
      title: '嵌套提供不同值',
      code: `val LocalUserRole = compositionLocalOf<String> { "guest" }

@Composable
fun App() {
    CompositionLocalProvider(LocalUserRole provides "user") {
        Column {
            Text("当前角色：" + LocalUserRole.current)  // user

            // 嵌套提供新值
            CompositionLocalProvider(LocalUserRole provides "admin") {
                Text("当前角色：" + LocalUserRole.current)  // admin
                AdminPanel()
            }

            Text("当前角色：" + LocalUserRole.current)  // user（恢复外层值）
        }
    }
}`,
    },
    {
      title: '自定义主题系统',
      code: `data class AppTheme(
    val primaryColor: Color,
    val secondaryColor: Color,
    val typography: Typography
)

val LocalAppTheme = compositionLocalOf<AppTheme> {
    error("未提供 AppTheme")
}

@Composable
fun AppThemeProvider(
    theme: AppTheme = AppTheme(
        primaryColor = Color(0xFF6200EE),
        secondaryColor = Color(0xFF03DAC5),
        typography = Typography.Default
    ),
    content: @Composable () -> Unit
) {
    CompositionLocalProvider(LocalAppTheme provides theme) {
        content()
    }
}

// 使用
@Composable
fun ThemedButton(text: String, onClick: () -> Unit) {
    val theme = LocalAppTheme.current
    Button(
        onClick = onClick,
        colors = ButtonDefaults.buttonColors(
            containerColor = theme.primaryColor
        )
    ) {
        Text(text)
    }
}`,
    },
    {
      title: '多个 CompositionLocal 组合',
      code: `val LocalUser = compositionLocalOf<User?> { null }
val LocalPermissions = compositionLocalOf<Set<String>> { emptySet() }
val LocalAnalytics = compositionLocalOf<Analytics?> { null }

@Composable
fun AppProviders(
    user: User?,
    permissions: Set<String>,
    analytics: Analytics,
    content: @Composable () -> Unit
) {
    CompositionLocalProvider(
        LocalUser provides user,
        LocalPermissions provides permissions,
        LocalAnalytics provides analytics
    ) {
        content()
    }
}

// 在深层组件中使用
@Composable
fun ProtectedFeature() {
    val user = LocalUser.current
    val permissions = LocalPermissions.current
    val analytics = LocalAnalytics.current

    if (user != null && "premium" in permissions) {
        Button(onClick = {
            analytics?.track("premium_feature_used")
        }) {
            Text("高级功能")
        }
    } else {
        Text("需要高级会员")
    }
}`,
    },
    {
      title: '使用内置 CompositionLocal',
      code: `@Composable
fun SystemInfoCard() {
    val context = LocalContext.current
    val density = LocalDensity.current
    val lifecycleOwner = LocalLifecycleOwner.current
    val configuration = LocalConfiguration.current

    Column(modifier = Modifier.padding(16.dp)) {
        Text("包名：" + context.packageName)
        Text("屏幕密度：" + density.density)
        Text("屏幕宽度：" + configuration.screenWidthDp + "dp")

        // dp 转 px
        val dpValue = 100.dp
        val pxValue = with(density) { dpValue.toPx() }
        Text("100dp = " + pxValue + "px")
    }
}`,
    },
    {
      title: '可空类型的 CompositionLocal',
      code: `// 定义可空类型，避免强制提供值
val LocalCurrentUserId = compositionLocalOf<String?> { null }

@Composable
fun UserDependentContent() {
    val userId = LocalCurrentUserId.current

    if (userId != null) {
        Text("用户ID：" + userId)
        UserProfile(userId)
    } else {
        Text("未登录")
        LoginPrompt()
    }
}

// 提供值
@Composable
fun AuthenticatedApp(userId: String) {
    CompositionLocalProvider(LocalCurrentUserId provides userId) {
        MainContent()
    }
}`,
    },
  ],

  useCases: [
    {
      title: '全局配置注入',
      description: '将应用配置、API 客户端等依赖注入到组合树',
      code: `data class AppConfig(
    val apiBaseUrl: String,
    val enableDebug: Boolean,
    val maxRetries: Int
)

interface ApiClient {
    suspend fun fetchData(endpoint: String): Result<String>
}

val LocalAppConfig = staticCompositionLocalOf<AppConfig> {
    error("AppConfig not provided")
}

val LocalApiClient = staticCompositionLocalOf<ApiClient> {
    error("ApiClient not provided")
}

@Composable
fun App() {
    val config = remember {
        AppConfig(
            apiBaseUrl = "https://api.example.com",
            enableDebug = BuildConfig.DEBUG,
            maxRetries = 3
        )
    }
    val apiClient = remember { ApiClientImpl(config) }

    CompositionLocalProvider(
        LocalAppConfig provides config,
        LocalApiClient provides apiClient
    ) {
        NavigationHost()
    }
}

// 在任意组件中使用
@Composable
fun DataScreen() {
    val apiClient = LocalApiClient.current
    val config = LocalAppConfig.current

    var data by remember { mutableStateOf<String?>(null) }

    LaunchedEffect(Unit) {
        val result = apiClient.fetchData("/users")
        data = result.getOrNull()
    }

    if (config.enableDebug) {
        Text("Debug: API Base = " + config.apiBaseUrl)
    }
    data?.let { Text(it) }
}`
    },
    {
      title: '多语言支持',
      description: '通过 CompositionLocal 提供本地化字符串',
      code: `interface Strings {
    val welcome: String
    val login: String
    val logout: String
    val settings: String
}

class EnglishStrings : Strings {
    override val welcome = "Welcome"
    override val login = "Login"
    override val logout = "Logout"
    override val settings = "Settings"
}

class ChineseStrings : Strings {
    override val welcome = "欢迎"
    override val login = "登录"
    override val logout = "退出"
    override val settings = "设置"
}

val LocalStrings = compositionLocalOf<Strings> {
    EnglishStrings()
}

@Composable
fun LanguageProvider(
    language: String,
    content: @Composable () -> Unit
) {
    val strings = remember(language) {
        when (language) {
            "zh" -> ChineseStrings()
            else -> EnglishStrings()
        }
    }

    CompositionLocalProvider(LocalStrings provides strings) {
        content()
    }
}

// 使用
@Composable
fun WelcomeScreen() {
    val strings = LocalStrings.current

    Column(modifier = Modifier.padding(16.dp)) {
        Text(
            text = strings.welcome,
            style = MaterialTheme.typography.headlineMedium
        )
        Button(onClick = { }) {
            Text(strings.login)
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '优先使用 staticCompositionLocalOf',
      description: '对于不常变化的值使用 static 版本，性能更好',
      goodExample: `// 应用配置很少变化
val LocalAppConfig = staticCompositionLocalOf {
    AppConfig.default
}`,
      badExample: `// 使用 compositionLocalOf 会导致不必要的重组
val LocalAppConfig = compositionLocalOf {
    AppConfig.default
}`
    },
    {
      title: '避免过度使用 CompositionLocal',
      description: '仅用于真正需要跨多层传递的数据，简单场景直接传参',
      goodExample: `// 简单场景：直接传参
@Composable
fun ParentScreen() {
    val userId = "123"
    ChildComponent(userId = userId)
}

@Composable
fun ChildComponent(userId: String) {
    Text("User: " + userId)
}`,
      badExample: `// 过度设计：仅两层就用 CompositionLocal
val LocalUserId = compositionLocalOf { "" }

@Composable
fun ParentScreen() {
    CompositionLocalProvider(LocalUserId provides "123") {
        ChildComponent()
    }
}

@Composable
fun ChildComponent() {
    val userId = LocalUserId.current
    Text("User: " + userId)
}`
    },
    {
      title: '提供有意义的默认值或错误信息',
      description: '帮助开发者快速发现未提供值的问题',
      goodExample: `val LocalApiClient = compositionLocalOf<ApiClient> {
    error("ApiClient not provided. Wrap with ApiClientProvider.")
}

val LocalThemeMode = compositionLocalOf {
    ThemeMode.LIGHT  // 合理的默认值
}`,
      badExample: `val LocalApiClient = compositionLocalOf<ApiClient> {
    error("Error")  // 错误信息不明确
}

val LocalThemeMode = compositionLocalOf<ThemeMode> {
    error("No default")  // 应该提供默认值
}`
    },
    {
      title: '将 CompositionLocal 定义为顶层变量',
      description: '便于全局访问和重用',
      goodExample: `// 文件顶层
val LocalUser = compositionLocalOf<User?> { null }

@Composable
fun App() {
    CompositionLocalProvider(LocalUser provides currentUser) {
        MainContent()
    }
}`,
      badExample: `@Composable
fun App() {
    // 在函数内定义，无法在其他地方访问
    val localUser = compositionLocalOf<User?> { null }
    // ...
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'CompositionLocal 的作用域',
      content: 'CompositionLocal 的值在提供它的 CompositionLocalProvider 及其所有子组件中可用，类似于 React 的 Context'
    },
    {
      type: 'warning',
      title: 'compositionLocalOf vs staticCompositionLocalOf 的性能差异',
      content: 'compositionLocalOf 值变化时只重组读取该值的组件；staticCompositionLocalOf 值变化时重组整个子树。static 版本读取更快但更新代价更高，适合不常变化的值'
    },
    {
      type: 'tip',
      title: '内置 CompositionLocal 列表',
      content: 'Compose 提供了许多内置 CompositionLocal：LocalContext、LocalConfiguration、LocalDensity、LocalLifecycleOwner、LocalView、LocalFocusManager、LocalSoftwareKeyboardController 等'
    },
    {
      type: 'tip',
      title: '调试 CompositionLocal',
      content: '在 Layout Inspector 中可以查看当前组件可访问的所有 CompositionLocal 值，帮助调试嵌套提供的问题'
    },
    {
      type: 'danger',
      title: '避免在 CompositionLocal 中存储可变状态',
      content: '不要直接在 CompositionLocal 中存储 mutableStateOf。应该提供一个稳定的对象（如 ViewModel），在其中管理状态'
    },
    {
      type: 'warning',
      title: 'CompositionLocal 不是依赖注入框架',
      content: 'CompositionLocal 适合传递环境信息（主题、配置、Context），不适合替代完整的依赖注入框架（如 Hilt、Koin）'
    },
  ],

  relatedComponents: ['remember', 'side-effect'],
  since: '1.0.0',
}
