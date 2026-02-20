package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.unit.dp

@Composable
fun SuggestionChipDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("SuggestionChip 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 搜索建议列表 ───────────────────────────────────
        SectionLabel("搜索建议")
        var query by remember { mutableStateOf("") }
        val suggestions = listOf(
            "Jetpack Compose 教程",
            "Compose 动画",
            "Material3 主题",
            "Kotlin Flow",
            "Android 架构",
            "Compose 性能优化",
        )

        OutlinedTextField(
            value = query,
            onValueChange = { query = it },
            placeholder = { Text("点击建议填入") },
            singleLine = true,
            modifier = androidx.compose.ui.Modifier.fillMaxWidth()
        )
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            suggestions.forEach { s ->
                SuggestionChip(
                    onClick = { query = s },
                    label = { Text(s) }
                )
            }
        }

        HorizontalDivider()

        // ── 2. ElevatedSuggestionChip ─────────────────────────
        SectionLabel("ElevatedSuggestionChip")
        val topics = listOf("UI 设计", "状态管理", "副作用", "自定义布局", "手势处理")
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            topics.forEach { topic ->
                ElevatedSuggestionChip(
                    onClick = {},
                    label = { Text(topic) }
                )
            }
        }

        HorizontalDivider()

        // ── 3. 禁用状态 ───────────────────────────────────────
        SectionLabel("禁用状态")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            SuggestionChip(onClick = {}, label = { Text("正常") })
            SuggestionChip(onClick = {}, label = { Text("禁用") }, enabled = false)
            ElevatedSuggestionChip(onClick = {}, label = { Text("Elevated 禁用") }, enabled = false)
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "SuggestionChip 用于展示系统生成的建议，不持有选中状态。\n常见场景：搜索建议、话题推荐、自动补全。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
