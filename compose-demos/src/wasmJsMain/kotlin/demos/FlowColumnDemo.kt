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
 * FlowColumnDemo 演示了 Compose 中 FlowColumn 布局的核心用法。
 *
 * FlowColumn 是垂直流式布局容器，与 FlowRow 互为镜像关系：
 *  - FlowRow  主轴水平，子项超出宽度时换行（向下）
 *  - FlowColumn 主轴垂直，子项超出高度时换列（向右）
 *
 * 本示例涵盖三个关键知识点：
 *  1. 自动换列             —— 子项超出容器高度时自动折列，适合固定高度的横向滚动场景
 *  2. verticalArrangement  —— 控制每列内子项的垂直分布方式
 *  3. maxItemsInEachColumn —— 强制限制每列最多显示的子项数量
 *
 * 学习建议：FlowColumn 适合横向时间轴、固定行数的标签矩阵等场景。
 * 与 FlowRow 对比阅读，理解主轴方向切换后各参数的对称变化。
 */
@Composable
fun FlowColumnDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("FlowColumn 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 自动换列 ───────────────────────────────────────
        // FlowColumn 在垂直方向排列子项，当列高度不足时自动开启新列向右延伸。
        // 这里固定容器高度为 200dp，10 个 Item 会自动分布到多列中。
        // verticalArrangement 控制列内间距，horizontalArrangement 控制列间间距。
        SectionLabel("自动换列")
        Text(
            "子项超出高度时自动换到下一列",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(4.dp))

        FlowColumn(
            verticalArrangement = Arrangement.spacedBy(8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(200.dp)
        ) {
            repeat(10) { i ->
                Box(
                    modifier = Modifier
                        .background(
                            MaterialTheme.colorScheme.primaryContainer,
                            RoundedCornerShape(8.dp)
                        )
                        .padding(horizontal = 16.dp, vertical = 10.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text("Item ${i + 1}", style = MaterialTheme.typography.labelMedium)
                }
            }
        }

        HorizontalDivider()

        // ── 2. verticalArrangement 对比 ───────────────────────
        // verticalArrangement 控制 FlowColumn 每列内子项的垂直分布方式。
        // 与 Column 的 verticalArrangement 语义完全相同，只是作用范围是每一列。
        // 这里用固定高度容器（120dp）放入 3 个色块，确保有剩余空间可分配。
        SectionLabel("verticalArrangement 对比")
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            listOf(
                Arrangement.Top          to "Top",
                Arrangement.Center       to "Center",
                Arrangement.SpaceBetween to "SpaceBetween",
            ).forEach { (arr, label) ->
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    FlowColumn(
                        verticalArrangement = arr,
                        modifier = Modifier
                            .width(60.dp)
                            .height(120.dp)
                            .background(
                                MaterialTheme.colorScheme.surfaceVariant,
                                RoundedCornerShape(4.dp)
                            )
                            .padding(4.dp)
                    ) {
                        repeat(3) { i ->
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(20.dp)
                                    .background(
                                        listOf(
                                            MaterialTheme.colorScheme.primary,
                                            MaterialTheme.colorScheme.secondary,
                                            MaterialTheme.colorScheme.tertiary
                                        )[i],
                                        RoundedCornerShape(2.dp)
                                    )
                            )
                        }
                    }
                    Spacer(Modifier.height(4.dp))
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 3. maxItemsInEachColumn ───────────────────────────
        // maxItemsInEachColumn 强制每列最多放 N 个子项，超出则开启新列，与子项实际高度无关。
        // 这里设为 3，8 个 Item 会分布为 3+3+2 三列（从左到右）。
        // 与 maxItemsInEachRow 对称，适合需要固定行数布局的场景。
        SectionLabel("maxItemsInEachColumn = 3")
        FlowColumn(
            verticalArrangement = Arrangement.spacedBy(8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            maxItemsInEachColumn = 3,
            modifier = Modifier.fillMaxWidth().height(140.dp)
        ) {
            repeat(8) { i ->
                Box(
                    modifier = Modifier
                        .background(
                            MaterialTheme.colorScheme.secondaryContainer,
                            RoundedCornerShape(8.dp)
                        )
                        .padding(horizontal = 14.dp, vertical = 8.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text("Item ${i + 1}", style = MaterialTheme.typography.labelMedium)
                }
            }
        }
    }
}
