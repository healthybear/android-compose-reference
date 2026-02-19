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
import kotlinx.browser.window
import org.jetbrains.compose.resources.Font
import org.w3c.dom.MessageEvent
import org.w3c.dom.events.Event

private external interface ThemeMessage : JsAny {
    val type: String?
    val dark: Boolean?
}

@OptIn(ExperimentalComposeUiApi::class)
fun main() {
    val demoId = window.location.search
        .removePrefix("?")
        .split("&")
        .firstOrNull { it.startsWith("demo=") }
        ?.removePrefix("demo=")
        ?: "button"

    CanvasBasedWindow(canvasElementId = "ComposeTarget") {
        val isDark = remember { mutableStateOf(false) }
        DisposableEffect(Unit) {
            val handler: (Event) -> Unit = { event ->
                val data = (event as MessageEvent).data
                if (data != null) {
                    val msg = data.unsafeCast<ThemeMessage>()
                    if (msg.type == "theme") {
                        isDark.value = msg.dark ?: false
                    }
                }
            }
            window.addEventListener("message", handler)
            onDispose { window.removeEventListener("message", handler) }
        }

        val notoSansSC = FontFamily(
            Font(Res.font.NotoSansSC_Regular, weight = FontWeight.Normal),
            Font(Res.font.NotoSansSC_Regular, weight = FontWeight.Bold),
        )

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

        val colorScheme = if (isDark.value) darkColorScheme() else lightColorScheme()

        MaterialTheme(colorScheme = colorScheme, typography = typography) {
            Surface(
                modifier = Modifier.fillMaxSize(),
                color = MaterialTheme.colorScheme.background
            ) {
                Box(modifier = Modifier.padding(24.dp)) {
                    when (demoId) {
                        "button" -> ButtonDemo()
                        "text"   -> TextDemo()
                        else     -> Text("Demo '$demoId' not found")
                    }
                }
            }
        }
    }
}
