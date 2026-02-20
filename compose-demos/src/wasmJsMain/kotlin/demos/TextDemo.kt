import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun TextDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Text 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. Typography 体系 ────────────────────────────
        SectionLabel("Typography 体系")
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            listOf(
                "Display Small"  to MaterialTheme.typography.displaySmall,
                "Headline Medium" to MaterialTheme.typography.headlineMedium,
                "Title Large"    to MaterialTheme.typography.titleLarge,
                "Title Medium"   to MaterialTheme.typography.titleMedium,
                "Body Large"     to MaterialTheme.typography.bodyLarge,
                "Body Medium"    to MaterialTheme.typography.bodyMedium,
                "Body Small"     to MaterialTheme.typography.bodySmall,
                "Label Medium"   to MaterialTheme.typography.labelMedium,
            ).forEach { (label, style) ->
                Text(label, style = style)
            }
        }

        HorizontalDivider()

        // ── 2. 字重 & 字号 ────────────────────────────────
        SectionLabel("字重 & 字号")
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                listOf(
                    FontWeight.Thin to "Thin",
                    FontWeight.Light to "Light",
                    FontWeight.Normal to "Normal",
                    FontWeight.Medium to "Medium",
                    FontWeight.SemiBold to "SemiBold",
                    FontWeight.Bold to "Bold",
                    FontWeight.ExtraBold to "ExtraBold",
                    FontWeight.Black to "Black",
                ).forEach { (weight, label) ->
                    Text(label, fontWeight = weight, fontSize = 14.sp)
                }
            }
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                listOf(10, 12, 14, 16, 18, 22, 28, 36).forEach { size ->
                    Text("${size}sp", fontSize = size.sp)
                }
            }
        }

        HorizontalDivider()

        // ── 3. 颜色 ───────────────────────────────────────
        SectionLabel("颜色")
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("Primary 颜色", color = MaterialTheme.colorScheme.primary)
            Text("Secondary 颜色", color = MaterialTheme.colorScheme.secondary)
            Text("Tertiary 颜色", color = MaterialTheme.colorScheme.tertiary)
            Text("Error 颜色", color = MaterialTheme.colorScheme.error)
            Text("Outline 颜色", color = MaterialTheme.colorScheme.outline)
            Text(
                "自定义颜色",
                color = Color(0xFF6650A4),
                fontWeight = FontWeight.Medium
            )
        }

        HorizontalDivider()

        // ── 4. 装饰 & 样式 ────────────────────────────────
        SectionLabel("装饰 & 样式")
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("下划线文本", textDecoration = TextDecoration.Underline)
            Text("删除线文本", textDecoration = TextDecoration.LineThrough)
            Text("斜体文本", fontStyle = FontStyle.Italic)
            Text(
                "下划线 + 删除线",
                textDecoration = TextDecoration.combine(
                    listOf(TextDecoration.Underline, TextDecoration.LineThrough)
                )
            )
        }

        HorizontalDivider()

        // ── 5. AnnotatedString 富文本 ─────────────────────
        SectionLabel("AnnotatedString 富文本")
        Text(
            buildAnnotatedString {
                append("普通文字，")
                withStyle(SpanStyle(color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.Bold)) {
                    append("高亮加粗，")
                }
                withStyle(SpanStyle(textDecoration = TextDecoration.Underline, color = MaterialTheme.colorScheme.secondary)) {
                    append("下划线链接，")
                }
                withStyle(SpanStyle(background = MaterialTheme.colorScheme.primaryContainer, fontSize = 13.sp)) {
                    append(" 背景高亮 ")
                }
                append("，继续普通文字。")
            }
        )

        HorizontalDivider()

        // ── 6. 溢出处理 ───────────────────────────────────
        SectionLabel("溢出处理")
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text("maxLines=1 + Ellipsis：", style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.outline)
            Text(
                "这是一段很长的文本内容，超出一行后会显示省略号，演示 TextOverflow.Ellipsis 的效果。",
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
            Text("maxLines=2 + Clip：", style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.outline)
            Text(
                "这是一段很长的文本内容，超出两行后直接裁剪，演示 TextOverflow.Clip 的效果，不显示省略号。",
                maxLines = 2,
                overflow = TextOverflow.Clip
            )
        }

        HorizontalDivider()

        // ── 7. 对齐 ───────────────────────────────────────
        SectionLabel("文本对齐")
        Column(
            verticalArrangement = Arrangement.spacedBy(4.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            listOf(
                TextAlign.Start to "Start 对齐",
                TextAlign.Center to "Center 对齐",
                TextAlign.End to "End 对齐",
            ).forEach { (align, label) ->
                Text(
                    label,
                    textAlign = align,
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(
                            MaterialTheme.colorScheme.surfaceVariant,
                            RoundedCornerShape(4.dp)
                        )
                        .padding(horizontal = 8.dp, vertical = 2.dp)
                )
            }
        }
    }
}

@Composable
private fun SectionLabel(text: String) {
    Text(
        text,
        style = MaterialTheme.typography.labelMedium,
        color = MaterialTheme.colorScheme.outline
    )
}
