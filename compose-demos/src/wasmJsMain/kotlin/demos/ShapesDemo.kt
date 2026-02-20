package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.CutCornerShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ShapesDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Shapes 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. MaterialTheme.shapes 五档圆角 ──────────────────
        SectionLabel("MaterialTheme.shapes — 五档圆角")
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            listOf(
                MaterialTheme.shapes.extraSmall to "extraSmall",
                MaterialTheme.shapes.small      to "small",
                MaterialTheme.shapes.medium     to "medium",
                MaterialTheme.shapes.large      to "large",
                MaterialTheme.shapes.extraLarge to "extraLarge",
            ).forEach { (shape, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(52.dp)
                            .background(MaterialTheme.colorScheme.primaryContainer, shape)
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 2. RoundedCornerShape 自定义 ──────────────────────
        SectionLabel("RoundedCornerShape — 自定义圆角")
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            listOf(
                RoundedCornerShape(0.dp)  to "0dp",
                RoundedCornerShape(4.dp)  to "4dp",
                RoundedCornerShape(12.dp) to "12dp",
                RoundedCornerShape(50)    to "50%",
                CircleShape               to "Circle",
            ).forEach { (shape, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(52.dp)
                            .background(MaterialTheme.colorScheme.secondary, shape)
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 3. 各角独立设置 ───────────────────────────────────
        SectionLabel("各角独立圆角")
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            listOf(
                RoundedCornerShape(topStart = 16.dp)                          to "topStart",
                RoundedCornerShape(topEnd = 16.dp)                            to "topEnd",
                RoundedCornerShape(bottomStart = 16.dp)                       to "bottomStart",
                RoundedCornerShape(bottomEnd = 16.dp)                         to "bottomEnd",
                RoundedCornerShape(topStart = 16.dp, bottomEnd = 16.dp)       to "对角",
            ).forEach { (shape, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(52.dp)
                            .background(MaterialTheme.colorScheme.tertiary, shape)
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 4. CutCornerShape ─────────────────────────────────
        SectionLabel("CutCornerShape — 切角")
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            listOf(
                CutCornerShape(4.dp)  to "4dp",
                CutCornerShape(8.dp)  to "8dp",
                CutCornerShape(16.dp) to "16dp",
                CutCornerShape(topStart = 16.dp, bottomEnd = 16.dp) to "对角切",
            ).forEach { (shape, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(52.dp)
                            .background(MaterialTheme.colorScheme.errorContainer, shape)
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 5. border + shape ─────────────────────────────────
        SectionLabel("border 配合 shape")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            listOf(
                RoundedCornerShape(8.dp)  to "rounded",
                CircleShape               to "circle",
                CutCornerShape(8.dp)      to "cut",
            ).forEach { (shape, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(56.dp)
                            .border(2.dp, MaterialTheme.colorScheme.primary, shape)
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }
    }
}
