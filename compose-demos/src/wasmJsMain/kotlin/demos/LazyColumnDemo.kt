package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

private val sampleItems = (1..40).map { "Item $it" }
private val groupedItems = mapOf(
    "A 组" to (1..5).map { "A-$it" },
    "B 组" to (1..5).map { "B-$it" },
    "C 组" to (1..5).map { "C-$it" },
)

/**
 * LazyColumnDemo 演示了 Jetpack Compose 中 LazyColumn 的两种核心用法。
 *
 * LazyColumn 是 Compose 的高性能垂直滚动列表，只渲染当前可见的条目（类似 RecyclerView），
 * 适合展示数量不确定或较多的列表数据。
 *
 * 本示例涵盖：
 * 1. 基础滚动列表：使用 itemsIndexed 渲染带序号的交替色条目
 * 2. stickyHeader：实现分组吸顶效果，滚动时组标题固定在顶部
 *
 * 学习要点：
 * - LazyColumn 的 verticalArrangement 控制条目间距，避免手动添加 Spacer
 * - itemsIndexed 比 items 多提供 index 参数，方便实现斑马纹等索引相关逻辑
 * - stickyHeader 是 LazyListScope 的扩展函数，只在 LazyColumn/LazyRow 内可用
 */
@Composable
fun LazyColumnDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("LazyColumn 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础滚动列表 ───────────────────────────────────
        // 使用 itemsIndexed 遍历列表，index 用于实现交替背景色（斑马纹）
        // height(200.dp) 限制列表高度，超出部分可滚动查看，避免撑满整个屏幕
        SectionLabel("基础列表（40 条，可滚动）")
        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(6.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(200.dp)
        ) {
            itemsIndexed(sampleItems) { index, item ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(
                            if (index % 2 == 0)
                                MaterialTheme.colorScheme.surfaceVariant
                            else
                                MaterialTheme.colorScheme.surface,
                            RoundedCornerShape(6.dp)
                        )
                        .padding(horizontal = 12.dp, vertical = 10.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(item, style = MaterialTheme.typography.bodyMedium)
                    Text(
                        "#${index + 1}",
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }

        HorizontalDivider()

        // ── 2. stickyHeader ───────────────────────────────────
        // stickyHeader 让分组标题在滚动时"粘"在列表顶部，直到下一个分组标题将其顶走
        // 这是 LazyListScope 的特有能力，普通 Column 无法实现此效果
        // 注意：stickyHeader 的背景色应与列表背景区分，否则视觉上无法体现"吸顶"感
        SectionLabel("stickyHeader — 分组吸顶")
        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(4.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(220.dp)
        ) {
            groupedItems.forEach { (group, items) ->
                stickyHeader {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(MaterialTheme.colorScheme.primaryContainer)
                            .padding(horizontal = 12.dp, vertical = 6.dp)
                    ) {
                        Text(
                            group,
                            style = MaterialTheme.typography.labelLarge,
                            color = MaterialTheme.colorScheme.onPrimaryContainer
                        )
                    }
                }
                itemsIndexed(items) { _, item ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 12.dp, vertical = 8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(8.dp)
                                .background(
                                    MaterialTheme.colorScheme.primary,
                                    RoundedCornerShape(4.dp)
                                )
                        )
                        Spacer(Modifier.width(10.dp))
                        Text(item, style = MaterialTheme.typography.bodyMedium)
                    }
                }
            }
        }
    }
}
