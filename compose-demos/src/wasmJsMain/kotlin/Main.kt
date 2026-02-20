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
import demos.*
import demos.VerticalPagerDemo
import kotlinx.browser.document
import kotlinx.browser.window
import org.jetbrains.compose.resources.Font
import org.w3c.dom.MessageEvent
import org.w3c.dom.events.Event

private external interface ThemeMessage : JsAny {
    val type: String?
    val dark: Boolean?
}

private fun reportHeight() {
    val canvas = document.getElementById("ComposeTarget")
    if (canvas != null) {
        val h = canvas.scrollHeight
        window.parent.postMessage(buildHeightMessage(h), "*")
    }
}

private fun buildHeightMessage(height: Int): JsAny =
    js("({ type: 'height', height: height })")

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
            SideEffect { reportHeight() }
            Surface(
                modifier = Modifier.fillMaxSize(),
                color = MaterialTheme.colorScheme.background
            ) {
                Box(modifier = Modifier.padding(24.dp)) {
                    when (demoId) {
                        "button"               -> ButtonDemo()
                        "text"                 -> TextDemo()
                        "image"                -> ImageDemo()
                        "icon"                 -> IconDemo()
                        "canvas"               -> CanvasDemo()
                        "column"               -> ColumnDemo()
                        "row"                  -> RowDemo()
                        "box"                  -> BoxDemo()
                        "box-with-constraints" -> BoxWithConstraintsDemo()
                        "spacer"               -> SpacerDemo()
                        "flow-row"             -> FlowRowDemo()
                        "flow-column"          -> FlowColumnDemo()
                        "lazy-column"          -> LazyColumnDemo()
                        "lazy-row"             -> LazyRowDemo()
                        "lazy-vertical-grid"   -> LazyVerticalGridDemo()
                        "lazy-horizontal-grid" -> LazyHorizontalGridDemo()
                        "horizontal-pager"     -> HorizontalPagerDemo()
                        "vertical-pager"       -> VerticalPagerDemo()
                        "modifier-size"        -> ModifierSizeDemo()
                        "modifier-padding"     -> ModifierPaddingDemo()
                        "modifier-background"  -> ModifierBackgroundDemo()
                        "modifier-clickable"   -> ModifierClickableDemo()
                        "modifier-offset"      -> ModifierOffsetDemo()
                        "modifier-scroll"      -> ModifierScrollDemo()
                        "material-theme"       -> MaterialThemeDemo()
                        "color-scheme"         -> ColorSchemeDemo()
                        "typography"           -> TypographyDemo()
                        "shapes"               -> {
                            ShapesDemo()
                        }
                        "outlined-button"      -> OutlinedButtonDemo()
                        "text-button"          -> TextButtonDemo()
                        "filled-tonal-button"  -> FilledTonalButtonDemo()
                        "elevated-button"      -> ElevatedButtonDemo()
                        "icon-button"          -> IconButtonDemo()
                        "floating-action-button" -> FabDemo()
                        "extended-fab"         -> ExtendedFabDemo()
                        "assist-chip"          -> AssistChipDemo()
                        "filter-chip"          -> FilterChipDemo()
                        "input-chip"           -> InputChipDemo()
                        "suggestion-chip"      -> SuggestionChipDemo()
                        "card"                 -> CardDemo()
                        "elevated-card"        -> ElevatedCardDemo()
                        "outlined-card"        -> OutlinedCardDemo()
                        "badge"                -> BadgeDemo()
                        "list-item"            -> ListItemDemo()
                        "horizontal-divider"   -> HorizontalDividerDemo()
                        "dropdown-menu"        -> DropdownMenuDemo()
                        "exposed-dropdown-menu" -> ExposedDropdownMenuDemo()
                        "text-field"           -> TextFieldDemo()
                        "outlined-text-field"  -> OutlinedTextFieldDemo()
                        "checkbox"             -> CheckboxDemo()
                        "radio-button"         -> RadioButtonDemo()
                        "switch"               -> SwitchDemo()
                        "slider"               -> SliderDemo()
                        "range-slider"         -> RangeSliderDemo()
                        "alert-dialog"         -> AlertDialogDemo()
                        "basic-alert-dialog"   -> BasicAlertDialogDemo()
                        "snackbar"             -> SnackbarDemo()
                        "circular-progress"    -> CircularProgressDemo()
                        "linear-progress"      -> LinearProgressDemo()
                        "swipe-to-dismiss"     -> SwipeToDismissDemo()
                        "top-app-bar"          -> TopAppBarDemo()
                        "bottom-app-bar"       -> BottomAppBarDemo()
                        "navigation-drawer"    -> NavigationDrawerDemo()
                        "permanent-navigation-drawer" -> PermanentNavigationDrawerDemo()
                        "animated-visibility"  -> AnimatedVisibilityDemo()
                        "animated-content"     -> AnimatedContentDemo()
                        "crossfade"            -> CrossfadeDemo()
                        "animate-as-state"     -> AnimateAsStateDemo()
                        "update-transition"    -> UpdateTransitionDemo()
                        "infinite-transition"  -> InfiniteTransitionDemo()
                        "modifier-draggable"   -> DraggableDemo()
                        "modifier-transformable" -> TransformableDemo()
                        "detect-tap-gestures"  -> DetectTapGesturesDemo()
                        "detect-drag-gestures" -> DetectDragGesturesDemo()
                        "remember"             -> RememberDemo()
                        "derived-state-of"     -> DerivedStateOfDemo()
                        "launched-effect"      -> LaunchedEffectDemo()
                        "side-effect"          -> SideEffectDemo()
                        "disposable-effect"    -> DisposableEffectDemo()
                        "produce-state"        -> ProduceStateDemo()
                        "composition-local"    -> CompositionLocalDemo()
                        "custom-layout"        -> CustomLayoutDemo()
                        "subcompose-layout"    -> SubcomposeLayoutDemo()
                        "draw-modifier"        -> DrawModifierDemo()
                        "brush"                -> BrushDemo()
                        else                   -> Text("Demo '$demoId' not found")
                    }
                }
            }
        }
    }
}
