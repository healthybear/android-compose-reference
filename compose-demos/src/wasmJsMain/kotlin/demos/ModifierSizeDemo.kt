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
 * ModifierSizeDemo 演示 Compose 中控制组件尺寸的核心 Modifier。
 *
 * 尺寸相关 Modifier 是布局系统的基础，决定组件在父容器中占用的空间：
 * - [Modifier.size]：同时设置宽高为固定 dp 值
 * - [Modifier.width] / [Modifier.height]：单独设置宽或高
 * - [Modifier.fillMaxWidth] / [Modifier.fillMaxHeight] / [Modifier.fillMaxSize]：
 *   填充父容器的可用宽度/高度/全部空间，可传入 0f~1f 的比例参数
 * - [Modifier.wrapContentSize]：收缩到内容所需的最小尺寸，忽略父容器的最小尺寸约束
 *
 * 关键概念：Compose 布局约束（Constraints）
 * 父容器向子组件传递 minWidth/maxWidth/minHeight/maxHeight 约束，
 * 子组件在约束范围内决定自身尺寸。fillMaxWidth 等 Modifier 通过
 * 将自身尺寸设为约束的最大值来实现"填满"效果。
 */
@Composable
fun ModifierSizeDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Modifier.size 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. size(dp) 固定尺寸 ──────────────────────────────
        SectionLabel("size(dp) — 固定宽高")
        Row(
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.Bottom
        ) {
            listOf(32.dp to "32", 56.dp to "56", 80.dp to "80", 100.dp to "100").forEach { (s, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(s)
                            .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(6.dp))
                    )
                    Text("${label}dp", style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 2. fillMaxWidth / fillMaxHeight ───────────────────
        SectionLabel("fillMaxWidth / fillMaxHeight")
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(32.dp)
                    .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(6.dp)),
                contentAlignment = Alignment.Center
            ) { Text("fillMaxWidth()", style = MaterialTheme.typography.labelMedium) }

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth(0.5f)
                        .height(32.dp)
                        .background(MaterialTheme.colorScheme.secondaryContainer, RoundedCornerShape(6.dp)),
                    contentAlignment = Alignment.Center
                ) { Text("fillMaxWidth(0.5f)", style = MaterialTheme.typography.labelSmall) }
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(32.dp)
                        .background(MaterialTheme.colorScheme.tertiaryContainer, RoundedCornerShape(6.dp)),
                    contentAlignment = Alignment.Center
                ) { Text("剩余宽度", style = MaterialTheme.typography.labelSmall) }
            }
        }

        HorizontalDivider()

        // ── 3. wrapContentSize ────────────────────────────────
        SectionLabel("wrapContentSize — 内容决定尺寸")
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(80.dp)
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp)),
            contentAlignment = Alignment.Center
        ) {
            Box(
                modifier = Modifier
                    .wrapContentSize()
                    .background(MaterialTheme.colorScheme.primary, RoundedCornerShape(6.dp))
                    .padding(horizontal = 16.dp, vertical = 8.dp)
            ) {
                Text(
                    "wrapContentSize",
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.onPrimary
                )
            }
        }

        HorizontalDivider()

        // ── 4. requiredSize vs size ───────────────────────────
        SectionLabel("width / height 单独设置")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .width(120.dp)
                    .height(40.dp)
                    .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(6.dp)),
                contentAlignment = Alignment.Center
            ) { Text("width=120, height=40", style = MaterialTheme.typography.labelSmall) }

            Box(
                modifier = Modifier
                    .width(60.dp)
                    .height(60.dp)
                    .background(MaterialTheme.colorScheme.secondaryContainer, RoundedCornerShape(6.dp)),
                contentAlignment = Alignment.Center
            ) { Text("60×60", style = MaterialTheme.typography.labelSmall) }
        }
    }
}
