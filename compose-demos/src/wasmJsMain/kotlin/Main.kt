/**
 * Jetpack Compose for Web 主入口文件
 *
 * 功能：
 * 1. 在浏览器中通过 Canvas 渲染 Compose UI 组件示例
 * 2. 从 URL 参数读取要展示的组件 ID（如 ?demo=button）
 * 3. 支持深色/浅色主题切换（通过 postMessage 与父页面通信）
 * 4. 自动向父页面报告内容高度，用于 iframe 自适应
 */

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.*
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.CanvasBasedWindow
import compose_demos.generated.resources.Res
import compose_demos.generated.resources.NotoSansSC_Regular
import demos.DemoRegistry
import kotlinx.browser.document
import kotlinx.browser.window
import org.jetbrains.compose.resources.Font
import org.w3c.dom.MessageEvent
import org.w3c.dom.events.Event

/**
 * 主题消息接口
 * 用于接收父页面通过 postMessage 发送的主题切换消息
 *
 * 示例消息格式：{ type: "theme", dark: true }
 */
private external interface ThemeMessage : JsAny {
    val type: String?    // 消息类型，这里固定为 "theme"
    val dark: Boolean?   // 是否为深色模式
}

/**
 * 向父页面报告当前内容的高度
 *
 * 工作原理：
 * 1. 获取 Canvas 元素（id="ComposeTarget"）
 * 2. 读取其 scrollHeight（内容实际高度）
 * 3. 通过 postMessage 发送给父页面
 *
 * 用途：当这个页面被嵌入到 iframe 中时，父页面可以根据这个高度自动调整 iframe 高度
 */
private fun reportHeight() {
    val canvas = document.getElementById("ComposeTarget")
    if (canvas != null) {
        val h = canvas.scrollHeight
        // 向父窗口发送高度消息，"*" 表示不限制目标域名
        window.parent.postMessage(buildHeightMessage(h), "*")
    }
}

/**
 * 构建高度消息对象
 *
 * @param height 内容高度（像素）
 * @return JavaScript 对象：{ type: 'height', height: 123 }
 */
private fun buildHeightMessage(height: Int): JsAny =
    js("({ type: 'height', height: height })")

/**
 * 程序主入口
 *
 * 执行流程：
 * 1. 从 URL 参数解析要展示的组件 ID（如 ?demo=button）
 * 2. 创建 Canvas 窗口并渲染 Compose UI
 * 3. 监听父页面的主题切换消息
 * 4. 配置中文字体（思源黑体）
 * 5. 应用 Material3 主题
 * 6. 根据 demoId 渲染对应的组件示例
 */
@OptIn(ExperimentalComposeUiApi::class)
fun main() {
    // ========== 1. 解析 URL 参数，获取要展示的组件 ID ==========
    // 示例：访问 ?demo=button 会得到 demoId = "button"
    // 如果没有参数，默认展示 "button"
    val demoId = window.location.search
        .removePrefix("?")                          // 去掉开头的 ?
        .split("&")                                 // 按 & 分割多个参数
        .firstOrNull { it.startsWith("demo=") }     // 找到 demo= 开头的参数
        ?.removePrefix("demo=")                     // 去掉 demo= 前缀
        ?: "button"                                 // 默认值

    // ========== 2. 创建 Canvas 窗口 ==========
    // 在网页中 id="ComposeTarget" 的 <canvas> 元素上渲染 Compose UI
    CanvasBasedWindow(canvasElementId = "ComposeTarget") {
        // ========== 3. 监听主题切换消息 ==========
        // 用于响应父页面发送的深色/浅色模式切换
        val isDark = remember { mutableStateOf(false) }  // 当前是否为深色模式
        DisposableEffect(Unit) {
            // 定义消息处理函数
            val handler: (Event) -> Unit = { event ->
                val data = (event as MessageEvent).data
                if (data != null) {
                    val msg = data.unsafeCast<ThemeMessage>()
                    // 如果收到主题切换消息，更新 isDark 状态
                    if (msg.type == "theme") {
                        isDark.value = msg.dark == true
                    }
                }
            }
            // 注册消息监听器
            window.addEventListener("message", handler)
            // 组件销毁时移除监听器，避免内存泄漏
            onDispose { window.removeEventListener("message", handler) }
        }

        // ========== 4. 配置中文字体 ==========
        // 加载思源黑体（Noto Sans SC），支持中文显示
        val notoSansSC = FontFamily(
            Font(Res.font.NotoSansSC_Regular, weight = FontWeight.Normal),
            Font(Res.font.NotoSansSC_Regular, weight = FontWeight.Bold),
        )

        // 将中文字体应用到所有文本样式
        val defaultTypography = Typography()
        val typography = Typography(
            bodyLarge   = defaultTypography.bodyLarge.copy(fontFamily = notoSansSC),
            bodyMedium  = defaultTypography.bodyMedium.copy(fontFamily = notoSansSC),
            bodySmall   = defaultTypography.bodySmall.copy(fontFamily = notoSansSC),
            titleLarge  = defaultTypography.titleLarge.copy(fontFamily = notoSansSC),
            titleMedium = defaultTypography.titleMedium.copy(fontFamily = notoSansSC),
            titleSmall  = defaultTypography.titleSmall.copy(fontFamily = notoSansSC),
            labelLarge  = defaultTypography.labelLarge.copy(fontFamily = notoSansSC),
            labelMedium = defaultTypography.labelMedium.copy(fontFamily = notoSansSC),
            labelSmall  = defaultTypography.labelSmall.copy(fontFamily = notoSansSC),
        )

        // ========== 5. 应用 Material3 主题 ==========
        // 根据 isDark 状态选择深色或浅色配色方案
        val colorScheme = if (isDark.value) darkColorScheme() else lightColorScheme()

        MaterialTheme(colorScheme = colorScheme, typography = typography) {
            // 每次重组后向父页面报告高度（用于 iframe 自适应）
            SideEffect { reportHeight() }

            Surface(
                modifier = Modifier.fillMaxSize(),
                color = MaterialTheme.colorScheme.background
            ) {
                // 添加 24dp 内边距
                Box(modifier = Modifier.padding(24.dp)) {
                    // ========== 6. 根据 demoId 渲染对应的组件 ==========
                    DemoRegistry.Render(demoId)
                }
            }
        }
    }
}
