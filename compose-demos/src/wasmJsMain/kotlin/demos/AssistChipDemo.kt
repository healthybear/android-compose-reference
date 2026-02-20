package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.unit.dp

/**
 * AssistChipDemo 演示 Material3 AssistChip 的用法。
 *
 * AssistChip 是四种 Chip 之一，专门用于"辅助操作"场景：
 * 引导用户执行与当前上下文相关的操作（如"设置"、"分享"、"导航"），
 * 本身不持有选中/未选中状态（区别于 FilterChip）。
 *
 * 核心参数：
 * - `onClick`：点击回调
 * - `label`：标签内容插槽
 * - `leadingIcon`：前置图标（使用 AssistChipDefaults.IconSize 约束尺寸）
 * - `enabled`：禁用状态
 *
 * 变体：
 * - [AssistChip]：标准样式，无阴影
 * - [ElevatedAssistChip]：带阴影，视觉层级更高，适合浅色背景
 *
 * 典型用途：快捷操作建议、智能助手推荐操作。
 */
@Composable
fun AssistChipDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("AssistChip 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础用法 ───────────────────────────────────────
        SectionLabel("基础用法")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            AssistChip(onClick = {}, label = { Text("操作建议") })
            AssistChip(onClick = {}, label = { Text("禁用") }, enabled = false)
        }

        HorizontalDivider()

        // ── 2. 带图标 ─────────────────────────────────────────
        SectionLabel("leadingIcon")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            AssistChip(
                onClick = {},
                label = { Text("设置") },
                leadingIcon = {
                    Icon(Icons.Filled.Settings, contentDescription = null,
                        modifier = androidx.compose.ui.Modifier.size(AssistChipDefaults.IconSize))
                }
            )
            AssistChip(
                onClick = {},
                label = { Text("分享") },
                leadingIcon = {
                    Icon(Icons.Filled.Share, contentDescription = null,
                        modifier = androidx.compose.ui.Modifier.size(AssistChipDefaults.IconSize))
                }
            )
            AssistChip(
                onClick = {},
                label = { Text("位置") },
                leadingIcon = {
                    Icon(Icons.Filled.LocationOn, contentDescription = null,
                        modifier = androidx.compose.ui.Modifier.size(AssistChipDefaults.IconSize))
                }
            )
        }

        HorizontalDivider()

        // ── 3. Elevated 变体 ──────────────────────────────────
        SectionLabel("ElevatedAssistChip")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            ElevatedAssistChip(onClick = {}, label = { Text("推荐操作") })
            ElevatedAssistChip(
                onClick = {},
                label = { Text("导航") },
                leadingIcon = {
                    Icon(Icons.Filled.Navigation, contentDescription = null,
                        modifier = androidx.compose.ui.Modifier.size(AssistChipDefaults.IconSize))
                }
            )
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "AssistChip 用于引导用户执行操作，不持有选中状态。\n常见场景：快捷操作、智能建议。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
