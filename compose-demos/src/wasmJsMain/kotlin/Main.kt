import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.CanvasBasedWindow
import kotlinx.browser.window
import org.w3c.dom.MessageEvent

@OptIn(ExperimentalComposeUiApi::class)
fun main() {
    // 从 URL 参数读取要展示的 demo
    val demoId = window.location.search
        .removePrefix("?")
        .split("&")
        .firstOrNull { it.startsWith("demo=") }
        ?.removePrefix("demo=")
        ?: "button"

    CanvasBasedWindow(canvasElementId = "ComposeTarget") {
        // 监听来自 Vue 的主题切换消息
        val isDark = remember { mutableStateOf(false) }
        DisposableEffect(Unit) {
            val handler: (dynamic) -> Unit = { event ->
                val data = (event as MessageEvent).data
                if (data != null) {
                    val type = js("data.type") as? String
                    if (type == "theme") {
                        isDark.value = js("data.dark") as? Boolean ?: false
                    }
                }
            }
            window.addEventListener("message", handler)
            onDispose { window.removeEventListener("message", handler) }
        }

        val colorScheme = if (isDark.value) darkColorScheme() else lightColorScheme()

        MaterialTheme(colorScheme = colorScheme) {
            Surface(
                modifier = Modifier.fillMaxSize(),
                color = MaterialTheme.colorScheme.background
            ) {
                Box(modifier = Modifier.padding(24.dp)) {
                    when (demoId) {
                        "button" -> ButtonDemo()
                        "text" -> TextDemo()
                        else -> Text("Demo '$demoId' not found")
                    }
                }
            }
        }
    }
}
