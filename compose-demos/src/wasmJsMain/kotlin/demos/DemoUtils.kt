package demos

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import kotlin.math.abs
import kotlin.math.roundToLong

@Composable
fun SectionLabel(text: String) {
    Text(
        text,
        style = MaterialTheme.typography.labelMedium,
        color = MaterialTheme.colorScheme.outline
    )
}

fun Float.fmt(decimals: Int = 2): String {
    var factor = 1L
    repeat(decimals) { factor *= 10 }
    val scaled = (this * factor).roundToLong()
    val intPart = scaled / factor
    val fracPart = abs(scaled % factor)
    val sign = if (this < 0 && intPart == 0L) "-" else ""
    return if (decimals == 0) "$intPart"
    else "$sign$intPart.${fracPart.toString().padStart(decimals, '0')}"
}

