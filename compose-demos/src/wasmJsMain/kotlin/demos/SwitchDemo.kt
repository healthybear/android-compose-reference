package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun SwitchDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("Switch 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础开关 ───────────────────────────────────────
        SectionLabel("基础 Switch")
        var checked1 by remember { mutableStateOf(false) }
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            Switch(checked = checked1, onCheckedChange = { checked1 = it })
            Text(if (checked1) "已开启" else "已关闭", style = MaterialTheme.typography.bodyMedium)
        }

        HorizontalDivider()

        // ── 2. 带 thumbContent 图标 ───────────────────────────
        SectionLabel("thumbContent — 滑块图标")
        var checked2 by remember { mutableStateOf(true) }
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            Switch(
                checked = checked2,
                onCheckedChange = { checked2 = it },
                thumbContent = {
                    Icon(
                        imageVector = if (checked2) Icons.Filled.Check else Icons.Filled.Close,
                        contentDescription = null,
                        modifier = Modifier.size(SwitchDefaults.IconSize)
                    )
                }
            )
            Text(if (checked2) "开启（带 ✓ 图标）" else "关闭（带 ✕ 图标）",
                style = MaterialTheme.typography.bodyMedium)
        }

        HorizontalDivider()

        // ── 3. 设置列表场景 ───────────────────────────────────
        SectionLabel("场景示例：设置列表")
        val settings = remember {
            mutableStateListOf(
                "接收通知" to true,
                "深色模式" to false,
                "自动播放" to true,
                "省流量模式" to false,
            )
        }
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(vertical = 4.dp)) {
                settings.forEachIndexed { i, (label, _) ->
                    Row(
                        modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(label, style = MaterialTheme.typography.bodyMedium)
                        Switch(
                            checked = settings[i].second,
                            onCheckedChange = { settings[i] = settings[i].first to it }
                        )
                    }
                    if (i < settings.lastIndex) HorizontalDivider(modifier = Modifier.padding(horizontal = 16.dp))
                }
            }
        }

        HorizontalDivider()

        // ── 4. 禁用状态 ───────────────────────────────────────
        SectionLabel("禁用状态")
        Row(horizontalArrangement = Arrangement.spacedBy(24.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Switch(checked = true, onCheckedChange = null, enabled = false)
                Text("禁用开", style = MaterialTheme.typography.bodySmall)
            }
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Switch(checked = false, onCheckedChange = null, enabled = false)
                Text("禁用关", style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}
