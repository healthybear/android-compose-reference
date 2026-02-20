package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

/**
 * ColumnDemo 演示了 Compose 中 Column 布局的核心用法。
 *
 * Column 是垂直线性布局容器，类似于 Android View 体系中的垂直 LinearLayout。
 * 本示例涵盖三个关键知识点：
 *  1. verticalArrangement —— 控制子项在主轴（垂直方向）上的分布方式
 *  2. horizontalAlignment —— 控制子项在交叉轴（水平方向）上的对齐方式
 *  3. Modifier.weight()   —— 让子项按比例瓜分剩余空间，实现弹性布局
 *
 * 学习建议：对比每种 Arrangement / Alignment 的视觉效果，理解它们的差异。
 */
@Composable
fun ColumnDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Column 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. verticalArrangement 对比 ───────────────────────
        // verticalArrangement 决定子项在 Column 主轴方向（垂直）上如何分布空间。
        // Top/Center/Bottom 是绝对定位；SpaceBetween/SpaceAround/SpaceEvenly 则均匀分配间距。
        // 注意：只有容器高度大于所有子项高度之和时，Arrangement 才会产生可见效果。
        SectionLabel("verticalArrangement 对比")
        Text(
            "容器高度固定 120 dp，放入 3 个色块",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(4.dp))

        val arrangements = listOf(
            Arrangement.Top          to "Top",
            Arrangement.Center       to "Center",
            Arrangement.Bottom       to "Bottom",
            Arrangement.SpaceBetween to "SpaceBetween",
            Arrangement.SpaceAround  to "SpaceAround",
            Arrangement.SpaceEvenly  to "SpaceEvenly",
        )

        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            arrangements.forEach { (arr, label) ->
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Column(
                        verticalArrangement = arr,
                        modifier = Modifier
                            .width(44.dp)
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

        // ── 2. horizontalAlignment 对比 ───────────────────────
        // horizontalAlignment 控制子项在交叉轴（水平方向）上的对齐位置。
        // Start 靠左、CenterHorizontally 居中、End 靠右。
        // 这里用三条宽度递减的色块直观展示对齐效果，宽度不同才能看出差异。
        SectionLabel("horizontalAlignment 对比")
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            listOf(
                Alignment.Start          to "Start",
                Alignment.CenterHorizontally to "Center",
                Alignment.End            to "End",
            ).forEach { (align, label) ->
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Column(
                        horizontalAlignment = align,
                        modifier = Modifier
                            .width(80.dp)
                            .height(80.dp)
                            .background(
                                MaterialTheme.colorScheme.surfaceVariant,
                                RoundedCornerShape(4.dp)
                            )
                            .padding(4.dp)
                    ) {
                        listOf(60.dp, 40.dp, 20.dp).forEach { w ->
                            Box(
                                modifier = Modifier
                                    .width(w)
                                    .height(14.dp)
                                    .background(
                                        MaterialTheme.colorScheme.primary,
                                        RoundedCornerShape(2.dp)
                                    )
                            )
                            Spacer(Modifier.height(4.dp))
                        }
                    }
                    Spacer(Modifier.height(4.dp))
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 3. weight 填充 ────────────────────────────────────
        // Modifier.weight(n) 让子项按权重比例瓜分父容器的剩余空间。
        // 此处三个色块权重为 1:2:1，意味着中间色块的高度是两侧的两倍。
        // weight 只在父容器尺寸确定（如 fillMaxHeight 或固定高度）时才生效。
        SectionLabel("weight — 按比例分配高度")
        Row(
            modifier = Modifier.height(120.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // 1:2:1
            Column(
                modifier = Modifier.width(60.dp).fillMaxHeight(),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                listOf(
                    1f to MaterialTheme.colorScheme.primary,
                    2f to MaterialTheme.colorScheme.secondary,
                    1f to MaterialTheme.colorScheme.tertiary,
                ).forEach { (w, color) ->
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .weight(w)
                            .background(color, RoundedCornerShape(2.dp))
                    )
                }
            }
            Column(
                modifier = Modifier.fillMaxHeight(),
                verticalArrangement = Arrangement.Center
            ) {
                Text("weight 1:2:1", style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}
