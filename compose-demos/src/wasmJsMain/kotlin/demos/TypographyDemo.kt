package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun TypographyDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Typography 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("Display")
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("Display Large",  style = MaterialTheme.typography.displayLarge)
            Text("Display Medium", style = MaterialTheme.typography.displayMedium)
            Text("Display Small",  style = MaterialTheme.typography.displaySmall)
        }

        HorizontalDivider()

        SectionLabel("Headline")
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("Headline Large",  style = MaterialTheme.typography.headlineLarge)
            Text("Headline Medium", style = MaterialTheme.typography.headlineMedium)
            Text("Headline Small",  style = MaterialTheme.typography.headlineSmall)
        }

        HorizontalDivider()

        SectionLabel("Title")
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("Title Large",  style = MaterialTheme.typography.titleLarge)
            Text("Title Medium", style = MaterialTheme.typography.titleMedium)
            Text("Title Small",  style = MaterialTheme.typography.titleSmall)
        }

        HorizontalDivider()

        SectionLabel("Body")
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("Body Large",  style = MaterialTheme.typography.bodyLarge)
            Text("Body Medium", style = MaterialTheme.typography.bodyMedium)
            Text("Body Small",  style = MaterialTheme.typography.bodySmall)
        }

        HorizontalDivider()

        SectionLabel("Label")
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("Label Large",  style = MaterialTheme.typography.labelLarge)
            Text("Label Medium", style = MaterialTheme.typography.labelMedium)
            Text("Label Small",  style = MaterialTheme.typography.labelSmall)
        }

        HorizontalDivider()

        SectionLabel("实际使用场景对照")
        Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
            Text("页面大标题 → headlineLarge", style = MaterialTheme.typography.headlineLarge)
            Text("卡片标题 → titleMedium", style = MaterialTheme.typography.titleMedium)
            Text("正文内容 → bodyMedium，适合段落文字，行高舒适，易于阅读。", style = MaterialTheme.typography.bodyMedium)
            Text("辅助说明 → bodySmall", style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
            Text("按钮文字 → labelLarge", style = MaterialTheme.typography.labelLarge)
            Text("角标 / 标签 → labelSmall", style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}
