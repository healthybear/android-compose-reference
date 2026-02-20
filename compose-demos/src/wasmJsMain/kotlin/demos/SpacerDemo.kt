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
 * SpacerDemo 演示了 Compose 中 Spacer 的两种核心用法。
 *
 * Spacer 是一个不可见的占位组件，专门用于在布局中插入空白间距。
 * 相比直接在 Modifier 上设置 padding，Spacer 更语义化，也更灵活。
 *
 * 本示例涵盖两个关键知识点：
 *  1. 固定间距 —— Spacer(Modifier.height/width(Xdp)) 插入精确的固定空白
 *  2. 弹性填充 —— Spacer(Modifier.weight(1f)) 吸收剩余空间，实现"推到两端"效果
 *
 * 学习建议：weight 填充是实现"顶部内容 + 底部按钮"或"左侧标题 + 右侧操作"
 * 布局的惯用模式，比使用 Arrangement.SpaceBetween 更灵活。
 */
@Composable
fun SpacerDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Spacer 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 固定间距 ───────────────────────────────────────
        // Spacer(Modifier.height(Xdp)) 在 Column 中插入固定高度的空白。
        // 对比三种间距（4/12/24 dp）可以直观感受间距大小对视觉节奏的影响。
        // 注意：这里每组 Block A/B 之后还有 16dp 的分隔，避免各组之间粘连。
        SectionLabel("固定间距 — Spacer(Modifier.height / width)")
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                .padding(12.dp)
        ) {
            listOf(4.dp to "4 dp", 12.dp to "12 dp", 24.dp to "24 dp").forEach { (space, label) ->
                ColorBlock("Block A", MaterialTheme.colorScheme.primaryContainer)
                Spacer(Modifier.height(space))
                ColorBlock("Block B（间距 $label）", MaterialTheme.colorScheme.secondaryContainer)
                Spacer(Modifier.height(16.dp))
            }
        }

        HorizontalDivider()

        // ── 2. weight 填充剩余空间 ────────────────────────────
        // Spacer(Modifier.weight(1f)) 会吸收父容器中所有未被其他子项占用的空间。
        // 在 Column 中：将按钮"推"到底部（顶部内容 + 弹性空白 + 底部按钮）。
        // 在 Row 中：将右侧操作"推"到最右边（左侧标题 + 弹性空白 + 右侧操作）。
        // 前提：父容器必须有确定的尺寸（如 height(160.dp) 或 fillMaxWidth），weight 才能生效。
        SectionLabel("weight 填充 — Spacer(Modifier.weight(1f))")
        Text(
            "Spacer 配合 weight 可把剩余空间推到两端",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(4.dp))

        // 垂直方向：把按钮推到底部
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .height(160.dp)
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                .padding(12.dp)
        ) {
            Text("顶部内容", style = MaterialTheme.typography.bodyMedium)
            Spacer(Modifier.weight(1f))
            Button(onClick = {}) { Text("底部按钮") }
        }

        Spacer(Modifier.height(8.dp))

        // 水平方向：把按钮推到右侧
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("左侧标题", style = MaterialTheme.typography.bodyMedium)
            Spacer(Modifier.weight(1f))
            TextButton(onClick = {}) { Text("右侧操作") }
        }
    }
}

@Composable
private fun ColorBlock(label: String, color: androidx.compose.ui.graphics.Color) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(32.dp)
            .background(color, RoundedCornerShape(4.dp)),
        contentAlignment = Alignment.Center
    ) {
        Text(label, style = MaterialTheme.typography.labelSmall)
    }
}
