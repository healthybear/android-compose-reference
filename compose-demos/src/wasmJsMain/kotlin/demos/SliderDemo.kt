package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import kotlin.math.roundToInt

@Composable
fun SliderDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("Slider 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 连续值 ─────────────────────────────────────────
        SectionLabel("连续值 Slider")
        var value1 by remember { mutableStateOf(0.5f) }
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Slider(value = value1, onValueChange = { value1 = it })
            Text("值：${(value1 * 100).roundToInt()}",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        HorizontalDivider()

        // ── 2. 自定义范围 ─────────────────────────────────────
        SectionLabel("自定义范围（0..200）")
        var value2 by remember { mutableStateOf(100f) }
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Slider(
                value = value2,
                onValueChange = { value2 = it },
                valueRange = 0f..200f
            )
            Text("值：${value2.roundToInt()}",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        HorizontalDivider()

        // ── 3. steps 离散值 ───────────────────────────────────
        SectionLabel("steps — 离散值（5 档）")
        var value3 by remember { mutableStateOf(2f) }
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Slider(
                value = value3,
                onValueChange = { value3 = it },
                valueRange = 0f..4f,
                steps = 3   // steps = 分隔数 - 1，共 5 个停靠点
            )
            val labels = listOf("极低", "低", "中", "高", "极高")
            Text("档位：${labels.getOrElse(value3.roundToInt()) { "" }}（${value3.roundToInt()}）",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        HorizontalDivider()

        // ── 4. 实际场景：音量控制 ─────────────────────────────
        SectionLabel("场景示例：音量控制")
        var volume by remember { mutableStateOf(0.6f) }
        Row(
            verticalAlignment = androidx.compose.ui.Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Icon(
                imageVector = if (volume == 0f)
                    androidx.compose.material.icons.Icons.Filled.VolumeOff
                else if (volume < 0.5f)
                    androidx.compose.material.icons.Icons.Filled.VolumeDown
                else
                    androidx.compose.material.icons.Icons.Filled.VolumeUp,
                contentDescription = null
            )
            Slider(
                value = volume,
                onValueChange = { volume = it },
                modifier = Modifier.weight(1f)
            )
            Text("${(volume * 100).roundToInt()}%",
                style = MaterialTheme.typography.labelMedium,
                modifier = Modifier.width(40.dp))
        }

        HorizontalDivider()

        // ── 5. 禁用状态 ───────────────────────────────────────
        SectionLabel("禁用状态")
        Slider(value = 0.4f, onValueChange = {}, enabled = false)
    }
}
