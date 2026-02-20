package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * FabDemo 演示 Material3 中三种尺寸的 [FloatingActionButton] 用法。
 *
 * FAB 用于屏幕上最重要的单一操作，始终悬浮于内容之上：
 * - [SmallFloatingActionButton] — 40 dp，用于次要或辅助浮动操作
 * - [FloatingActionButton]（默认）— 56 dp，标准主操作按钮
 * - [LargeFloatingActionButton] — 96 dp，用于需要更大触控区域的场景
 *
 * containerColor 可通过 primaryContainer / secondaryContainer / tertiaryContainer
 * 调整语义色，以匹配不同的操作优先级。
 */
@Composable
fun FabDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("FloatingActionButton 示例", style = MaterialTheme.typography.titleMedium)

        // SmallFAB 适合工具栏或卡片内的辅助浮动操作，触控区域较小，
        // 不应作为页面主操作入口，以免与标准 FAB 产生视觉竞争。
        // ── 1. SmallFloatingActionButton ─────────────────────
        SectionLabel("SmallFloatingActionButton")
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp), verticalAlignment = Alignment.CenterVertically) {
            SmallFloatingActionButton(onClick = {}) {
                Icon(Icons.Filled.Add, contentDescription = "添加")
            }
            Text("size = 40 dp", style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        HorizontalDivider()

        // 标准 FAB 是页面最重要的单一操作入口，每个页面通常只放一个，
        // 固定在右下角，始终悬浮于滚动内容之上，确保随时可触达。
        // ── 2. FloatingActionButton（默认）────────────────────
        SectionLabel("FloatingActionButton（默认）")
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp), verticalAlignment = Alignment.CenterVertically) {
            FloatingActionButton(onClick = {}) {
                Icon(Icons.Filled.Add, contentDescription = "添加")
            }
            Text("size = 56 dp", style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        HorizontalDivider()

        // LargeFAB 适合平板或宽屏布局，或操作本身需要更大触控目标的场景，
        // 内部图标建议同步放大（如 36 dp），以保持视觉比例协调。
        // ── 3. LargeFloatingActionButton ─────────────────────
        SectionLabel("LargeFloatingActionButton")
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp), verticalAlignment = Alignment.CenterVertically) {
            LargeFloatingActionButton(onClick = {}) {
                Icon(Icons.Filled.Add, contentDescription = "添加",
                    modifier = Modifier.size(36.dp))
            }
            Text("size = 96 dp", style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        HorizontalDivider()

        // 通过 containerColor + contentColor（tint）配对使用 Material3 色彩系统，
        // 确保前景色与背景色的对比度始终满足无障碍要求（on* 色与 *Container 色配对）。
        // ── 4. 自定义颜色 ─────────────────────────────────────
        SectionLabel("containerColor 自定义")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            FloatingActionButton(
                onClick = {},
                containerColor = MaterialTheme.colorScheme.primaryContainer
            ) {
                Icon(Icons.Filled.Edit, contentDescription = "编辑",
                    tint = MaterialTheme.colorScheme.onPrimaryContainer)
            }
            FloatingActionButton(
                onClick = {},
                containerColor = MaterialTheme.colorScheme.secondaryContainer
            ) {
                Icon(Icons.Filled.Edit, contentDescription = "编辑",
                    tint = MaterialTheme.colorScheme.onSecondaryContainer)
            }
            FloatingActionButton(
                onClick = {},
                containerColor = MaterialTheme.colorScheme.tertiaryContainer
            ) {
                Icon(Icons.Filled.Edit, contentDescription = "编辑",
                    tint = MaterialTheme.colorScheme.onTertiaryContainer)
            }
        }
    }
}
