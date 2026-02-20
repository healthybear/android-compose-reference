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
 * ModifierPaddingDemo 演示 Modifier.padding 的各种用法。
 *
 * padding 在组件内容与其边界之间添加空白间距，是最常用的布局 Modifier 之一。
 * 它通过缩小子组件可用的约束空间来实现内边距效果。
 *
 * 四种重载形式：
 * - `padding(all)` — 四边相同间距
 * - `padding(horizontal, vertical)` — 水平/垂直方向分别设置
 * - `padding(start, top, end, bottom)` — 四边独立设置（支持 RTL）
 * - `padding(PaddingValues)` — 接受 PaddingValues 对象（如 Scaffold 的 innerPadding）
 *
 * 重要：Modifier 的顺序影响最终效果。
 * `background → padding` 表示背景包含内边距区域（背景更大）；
 * `padding → background` 表示背景只覆盖内容区域（背景更小）。
 */
@Composable
fun ModifierPaddingDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Modifier.padding 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. all ────────────────────────────────────────────
        SectionLabel("padding(all) — 四边相同")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            listOf(4.dp to "4dp", 12.dp to "12dp", 24.dp to "24dp").forEach { (p, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(6.dp))
                    ) {
                        Box(
                            modifier = Modifier
                                .padding(p)
                                .size(40.dp)
                                .background(MaterialTheme.colorScheme.primary, RoundedCornerShape(4.dp))
                        )
                    }
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 2. horizontal + vertical ──────────────────────────
        SectionLabel("padding(horizontal, vertical) — 分轴设置")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            listOf(
                (8.dp to 4.dp)   to "h=8, v=4",
                (16.dp to 8.dp)  to "h=16, v=8",
                (4.dp to 16.dp)  to "h=4, v=16",
            ).forEach { (pair, label) ->
                val (h, v) = pair
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(6.dp))
                    ) {
                        Box(
                            modifier = Modifier
                                .padding(horizontal = h, vertical = v)
                                .size(40.dp)
                                .background(MaterialTheme.colorScheme.secondary, RoundedCornerShape(4.dp))
                        )
                    }
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 3. 各边单独设置 ───────────────────────────────────
        SectionLabel("padding(start, top, end, bottom) — 各边独立")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            listOf(
                Modifier.padding(start = 24.dp)                    to "start=24",
                Modifier.padding(top = 24.dp)                      to "top=24",
                Modifier.padding(end = 24.dp)                      to "end=24",
                Modifier.padding(bottom = 24.dp)                   to "bottom=24",
                Modifier.padding(start = 16.dp, bottom = 16.dp)   to "start+bottom",
            ).forEach { (mod, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(6.dp))
                    ) {
                        Box(
                            modifier = mod
                                .size(32.dp)
                                .background(MaterialTheme.colorScheme.tertiary, RoundedCornerShape(4.dp))
                        )
                    }
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 4. padding 与 background 顺序 ─────────────────────
        SectionLabel("顺序影响效果：background 在 padding 前 vs 后")
        Row(horizontalArrangement = Arrangement.spacedBy(24.dp)) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Box(
                    modifier = Modifier
                        .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(8.dp))
                        .padding(16.dp)
                        .size(48.dp)
                        .background(MaterialTheme.colorScheme.primary, RoundedCornerShape(4.dp))
                )
                Text("bg → padding → bg", style = MaterialTheme.typography.labelSmall)
            }
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Box(
                    modifier = Modifier
                        .padding(16.dp)
                        .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(8.dp))
                        .size(48.dp)
                )
                Text("padding → bg", style = MaterialTheme.typography.labelSmall)
            }
        }
    }
}
