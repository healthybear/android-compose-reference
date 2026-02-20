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
 * RowDemo 演示了 Compose 中 Row 布局的核心用法。
 *
 * Row 是水平线性布局容器，与 Column 互为镜像关系：
 *  - Row 的主轴是水平方向，交叉轴是垂直方向
 *  - Column 的主轴是垂直方向，交叉轴是水平方向
 *
 * 本示例涵盖三个关键知识点：
 *  1. horizontalArrangement —— 控制子项在主轴（水平方向）上的分布方式
 *  2. verticalAlignment     —— 控制子项在交叉轴（垂直方向）上的对齐方式
 *  3. Modifier.weight()     —— 让子项按比例瓜分剩余宽度，实现弹性水平布局
 *
 * 学习建议：与 ColumnDemo 对比阅读，理解主轴/交叉轴概念在两种布局中的对称性。
 */
@Composable
fun RowDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Row 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. horizontalArrangement 对比 ─────────────────────
        // horizontalArrangement 决定子项在 Row 主轴方向（水平）上如何分布空间。
        // Start/Center/End 是绝对定位；SpaceBetween/SpaceAround/SpaceEvenly 均匀分配间距。
        // 区别：SpaceBetween 首尾无间距；SpaceAround 首尾间距是中间的一半；SpaceEvenly 所有间距相等。
        SectionLabel("horizontalArrangement 对比")
        Text(
            "容器宽度撑满，放入 3 个色块",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(4.dp))

        val arrangements = listOf(
            Arrangement.Start        to "Start",
            Arrangement.Center       to "Center",
            Arrangement.End          to "End",
            Arrangement.SpaceBetween to "SpaceBetween",
            Arrangement.SpaceAround  to "SpaceAround",
            Arrangement.SpaceEvenly  to "SpaceEvenly",
        )

        arrangements.forEach { (arr, label) ->
            Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                Text(label, style = MaterialTheme.typography.labelSmall)
                Row(
                    horizontalArrangement = arr,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(28.dp)
                        .background(
                            MaterialTheme.colorScheme.surfaceVariant,
                            RoundedCornerShape(4.dp)
                        )
                        .padding(4.dp)
                ) {
                    listOf(
                        MaterialTheme.colorScheme.primary,
                        MaterialTheme.colorScheme.secondary,
                        MaterialTheme.colorScheme.tertiary
                    ).forEach { color ->
                        Box(
                            modifier = Modifier
                                .width(40.dp)
                                .fillMaxHeight()
                                .background(color, RoundedCornerShape(2.dp))
                        )
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 2. verticalAlignment 对比 ─────────────────────────
        // verticalAlignment 控制子项在交叉轴（垂直方向）上的对齐位置。
        // 这里用三根高度不同的色条演示 Top/CenterVertically/Bottom 的差异。
        // 高度不同是关键：若所有子项等高，三种对齐方式看起来完全一样。
        SectionLabel("verticalAlignment 对比")
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            listOf(
                Alignment.Top    to "Top",
                Alignment.CenterVertically to "Center",
                Alignment.Bottom to "Bottom",
            ).forEach { (align, label) ->
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Row(
                        verticalAlignment = align,
                        modifier = Modifier
                            .width(72.dp)
                            .height(60.dp)
                            .background(
                                MaterialTheme.colorScheme.surfaceVariant,
                                RoundedCornerShape(4.dp)
                            )
                            .padding(4.dp)
                    ) {
                        listOf(40.dp, 24.dp, 16.dp).forEach { h ->
                            Box(
                                modifier = Modifier
                                    .width(14.dp)
                                    .height(h)
                                    .background(
                                        MaterialTheme.colorScheme.primary,
                                        RoundedCornerShape(2.dp)
                                    )
                            )
                            Spacer(Modifier.width(4.dp))
                        }
                    }
                    Spacer(Modifier.height(4.dp))
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 3. weight 填充 ────────────────────────────────────
        // Modifier.weight(n) 在 Row 中按权重比例分配水平剩余空间。
        // 此处三个色块权重为 1:2:1，中间色块宽度是两侧的两倍。
        // 色块内部用 contentAlignment = Center 将文字居中，展示 Box 的对齐能力。
        SectionLabel("weight — 按比例分配宽度")
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            // 1:2:1
            Row(
                modifier = Modifier.fillMaxWidth().height(32.dp),
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                listOf(
                    1f to MaterialTheme.colorScheme.primary,
                    2f to MaterialTheme.colorScheme.secondary,
                    1f to MaterialTheme.colorScheme.tertiary,
                ).forEach { (w, color) ->
                    Box(
                        modifier = Modifier
                            .weight(w)
                            .fillMaxHeight()
                            .background(color, RoundedCornerShape(4.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            "×${w.toInt()}",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onPrimary
                        )
                    }
                }
            }
            Text("weight 1 : 2 : 1", style = MaterialTheme.typography.bodySmall)
        }
    }
}
