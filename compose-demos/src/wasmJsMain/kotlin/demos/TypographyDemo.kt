package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * Typography 字体排版演示
 *
 * Material Design 3 的 Typography 系统定义了 15 个文字样式，分为 5 个语义组：
 * Display、Headline、Title、Body、Label，每组各有 Large/Medium/Small 三个尺寸。
 *
 * 设计哲学：用语义化名称而非具体字号来描述文字层级，
 * 这样设计师可以在不改动代码的情况下调整整套字体规范。
 *
 * 各组的典型用途：
 * - Display：英雄区大标题，字号最大（57/45/36sp），通常只用于短文本
 * - Headline：页面/区块标题，字号次之（32/28/24sp）
 * - Title：卡片标题、对话框标题、列表项主文字（22/16/14sp）
 * - Body：正文段落，行高较大，适合长文本阅读（16/14/12sp）
 * - Label：按钮文字、标签、角标等小型 UI 元素（14/12/11sp）
 *
 * 实践建议：不要因为"字够大"就用 Display，要根据内容的语义层级选择样式，
 * 保持层级一致性才能让界面有清晰的视觉秩序。
 */
@Composable
fun TypographyDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Typography 示例", style = MaterialTheme.typography.titleMedium)

        // Display 组：字号最大，用于视觉冲击力强的英雄区标题。
        // 在移动端实际项目中较少使用，更多见于平板/桌面端的大屏布局。
        SectionLabel("Display")
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("Display Large",  style = MaterialTheme.typography.displayLarge)
            Text("Display Medium", style = MaterialTheme.typography.displayMedium)
            Text("Display Small",  style = MaterialTheme.typography.displaySmall)
        }

        HorizontalDivider()

        // Headline 组：页面级标题，是移动端最常用的大字号层级。
        // headlineLarge 适合顶部页面标题，headlineSmall 适合区块小标题。
        SectionLabel("Headline")
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("Headline Large",  style = MaterialTheme.typography.headlineLarge)
            Text("Headline Medium", style = MaterialTheme.typography.headlineMedium)
            Text("Headline Small",  style = MaterialTheme.typography.headlineSmall)
        }

        HorizontalDivider()

        // Title 组：组件级标题，如卡片标题、AppBar 标题、列表项主文字。
        // titleMedium 是 TopAppBar 默认使用的样式，titleSmall 常用于列表副标题。
        SectionLabel("Title")
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("Title Large",  style = MaterialTheme.typography.titleLarge)
            Text("Title Medium", style = MaterialTheme.typography.titleMedium)
            Text("Title Small",  style = MaterialTheme.typography.titleSmall)
        }

        HorizontalDivider()

        // Body 组：正文内容，行高（lineHeight）比 Title 更大，专为长文本阅读优化。
        // bodyMedium 是段落正文的首选，bodySmall 用于辅助说明、时间戳等次要信息。
        SectionLabel("Body")
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("Body Large",  style = MaterialTheme.typography.bodyLarge)
            Text("Body Medium", style = MaterialTheme.typography.bodyMedium)
            Text("Body Small",  style = MaterialTheme.typography.bodySmall)
        }

        HorizontalDivider()

        // Label 组：最小的文字层级，字重通常较粗以保证小尺寸下的可读性。
        // labelLarge 是 Button 组件默认使用的文字样式，
        // labelSmall 用于角标、徽章、图表刻度等极小的 UI 元素。
        SectionLabel("Label")
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("Label Large",  style = MaterialTheme.typography.labelLarge)
            Text("Label Medium", style = MaterialTheme.typography.labelMedium)
            Text("Label Small",  style = MaterialTheme.typography.labelSmall)
        }

        HorizontalDivider()

        // 实际场景对照：将抽象的样式名称映射到具体的 UI 场景，
        // 帮助开发者建立"看到设计稿 → 选择正确样式"的直觉。
        // 注意 onSurfaceVariant 颜色用于降低次要文字的视觉权重，形成层级感。
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
