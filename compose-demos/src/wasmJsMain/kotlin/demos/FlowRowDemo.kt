package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * FlowRowDemo 演示了 Compose 中 FlowRow 布局的核心用法。
 *
 * FlowRow 是水平流式布局容器，当一行放不下更多子项时会自动换行。
 * 这解决了 Row 不能换行的痛点，非常适合标签云、筛选条件、Chip 组等场景。
 *
 * 本示例涵盖三个关键知识点：
 *  1. 自动换行          —— 子项超出容器宽度时自动折行，无需手动计算
 *  2. horizontalArrangement —— 控制每行内子项的水平分布方式
 *  3. maxItemsInEachRow —— 强制限制每行最多显示的子项数量
 *
 * 学习建议：FlowRow 是 Compose 1.4+ 引入的布局，使用前确认依赖版本。
 * 与 LazyVerticalGrid 相比，FlowRow 更适合子项尺寸不固定的场景。
 */
@Composable
fun FlowRowDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("FlowRow 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 自动换行 ───────────────────────────────────────
        // FlowRow 会测量每个子项的宽度，当当前行剩余空间不足时自动换行。
        // horizontalArrangement 和 verticalArrangement 分别控制行内间距和行间间距。
        // 这里用 SuggestionChip 模拟真实的标签云场景，标签长度不一，换行效果明显。
        SectionLabel("自动换行")
        Text(
            "子项超出宽度时自动换到下一行",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(4.dp))

        val tags = listOf(
            "Jetpack Compose", "Kotlin", "Android", "Material3",
            "UI", "Layout", "FlowRow", "Modifier", "State", "Animation"
        )

        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            tags.forEach { tag ->
                SuggestionChip(onClick = {}, label = { Text(tag) })
            }
        }

        HorizontalDivider()

        // ── 2. horizontalArrangement 对比 ─────────────────────
        // FlowRow 的 horizontalArrangement 作用于每一行内部的子项分布。
        // 注意：SpaceBetween 在只有一个子项的行上效果与 Start 相同（无法分配间距）。
        // 这里故意用少量子项（A/BB/CCC）确保它们在同一行，便于对比效果。
        SectionLabel("horizontalArrangement 对比")
        listOf(
            Arrangement.Start        to "Start",
            Arrangement.Center       to "Center",
            Arrangement.End          to "End",
            Arrangement.SpaceBetween to "SpaceBetween",
        ).forEach { (arr, label) ->
            Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                Text(label, style = MaterialTheme.typography.labelSmall)
                FlowRow(
                    horizontalArrangement = arr,
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(
                            MaterialTheme.colorScheme.surfaceVariant,
                            RoundedCornerShape(4.dp)
                        )
                        .padding(4.dp)
                ) {
                    listOf("A", "BB", "CCC").forEach { t ->
                        Box(
                            modifier = Modifier
                                .padding(2.dp)
                                .background(
                                    MaterialTheme.colorScheme.primaryContainer,
                                    RoundedCornerShape(4.dp)
                                )
                                .padding(horizontal = 12.dp, vertical = 6.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(t, style = MaterialTheme.typography.labelMedium)
                        }
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 3. maxItemsInEachRow ──────────────────────────────
        // maxItemsInEachRow 强制每行最多放 N 个子项，超出则换行，与子项实际宽度无关。
        // 这里设为 3，7 个 Item 会分布为 3+3+1 三行。
        // 适合需要固定列数网格但子项尺寸不完全相同的场景。
        SectionLabel("maxItemsInEachRow = 3")
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
            maxItemsInEachRow = 3,
            modifier = Modifier.fillMaxWidth()
        ) {
            repeat(7) { i ->
                Box(
                    modifier = Modifier
                        .background(
                            MaterialTheme.colorScheme.secondaryContainer,
                            RoundedCornerShape(8.dp)
                        )
                        .padding(horizontal = 16.dp, vertical = 8.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text("Item ${i + 1}", style = MaterialTheme.typography.labelMedium)
                }
            }
        }
    }
}
