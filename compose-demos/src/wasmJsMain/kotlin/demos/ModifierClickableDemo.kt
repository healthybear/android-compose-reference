package demos

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.combinedClickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * ModifierClickableDemo 演示 Modifier.clickable 和 combinedClickable 的用法。
 *
 * clickable 是为任意组件添加点击交互的标准方式，自动提供：
 * - Ripple 水波纹视觉反馈（Material Design 规范）
 * - 无障碍语义（将组件标记为可点击）
 * - 键盘/遥控器焦点支持
 *
 * 两种 API：
 * - [Modifier.clickable]：只处理单击，最常用
 * - [Modifier.combinedClickable]：同时处理单击、双击、长按（需要 @OptIn ExperimentalFoundationApi）
 *
 * 禁用 Ripple：传入 `indication = null` 和自定义 `interactionSource` 可关闭水波纹，
 * 适合不需要视觉反馈的场景（如透明遮罩层）。
 *
 * enabled 参数：设为 false 时组件不响应点击，且 Ripple 也不显示。
 */
@OptIn(ExperimentalFoundationApi::class)
@Composable
fun ModifierClickableDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Modifier.clickable 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础点击计数 ───────────────────────────────────
        SectionLabel("clickable — 点击计数")
        var count by remember { mutableStateOf(0) }
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(64.dp)
                .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(12.dp))
                .clickable { count++ },
            contentAlignment = Alignment.Center
        ) {
            Text(
                "点击次数：$count",
                style = MaterialTheme.typography.titleMedium,
                color = MaterialTheme.colorScheme.onPrimaryContainer
            )
        }

        HorizontalDivider()

        // ── 2. ripple 水波纹 ──────────────────────────────────
        SectionLabel("ripple — 水波纹效果")
        Text(
            "默认 clickable 自带 ripple，点击可见水波纹",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            var r1 by remember { mutableStateOf(0) }
            var r2 by remember { mutableStateOf(0) }

            Box(
                modifier = Modifier
                    .weight(1f)
                    .height(56.dp)
                    .background(MaterialTheme.colorScheme.secondaryContainer, RoundedCornerShape(12.dp))
                    .clickable { r1++ },
                contentAlignment = Alignment.Center
            ) {
                Text("有 ripple（$r1）", style = MaterialTheme.typography.labelLarge)
            }

            Box(
                modifier = Modifier
                    .weight(1f)
                    .height(56.dp)
                    .background(MaterialTheme.colorScheme.tertiaryContainer, RoundedCornerShape(12.dp))
                    .clickable(
                        indication = null,
                        interactionSource = remember { androidx.compose.foundation.interaction.MutableInteractionSource() }
                    ) { r2++ },
                contentAlignment = Alignment.Center
            ) {
                Text("无 ripple（$r2）", style = MaterialTheme.typography.labelLarge)
            }
        }

        HorizontalDivider()

        // ── 3. combinedClickable — 长按 / 双击 ────────────────
        SectionLabel("combinedClickable — 单击 / 双击 / 长按")
        var action by remember { mutableStateOf("等待操作…") }
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(80.dp)
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(12.dp))
                .combinedClickable(
                    onClick      = { action = "单击" },
                    onDoubleClick = { action = "双击" },
                    onLongClick  = { action = "长按" }
                ),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("单击 / 双击 / 长按我", style = MaterialTheme.typography.bodyMedium)
                Text(
                    action,
                    style = MaterialTheme.typography.titleMedium,
                    color = MaterialTheme.colorScheme.primary
                )
            }
        }

        HorizontalDivider()

        // ── 4. enabled 控制 ───────────────────────────────────
        SectionLabel("enabled — 禁用点击")
        var enabled by remember { mutableStateOf(true) }
        var disabledCount by remember { mutableStateOf(0) }
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(56.dp)
                    .background(
                        if (enabled) MaterialTheme.colorScheme.primaryContainer
                        else MaterialTheme.colorScheme.surfaceVariant,
                        RoundedCornerShape(12.dp)
                    )
                    .clickable(enabled = enabled) { disabledCount++ },
                contentAlignment = Alignment.Center
            ) {
                Text(
                    if (enabled) "可点击（$disabledCount）" else "已禁用",
                    style = MaterialTheme.typography.labelLarge,
                    color = if (enabled) MaterialTheme.colorScheme.onPrimaryContainer
                            else MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            Button(onClick = { enabled = !enabled }) {
                Text(if (enabled) "禁用" else "启用")
            }
        }
    }
}
