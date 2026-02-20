package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.unit.dp
import kotlin.math.roundToInt

/**
 * RangeSliderDemo 演示 Material3 RangeSlider 的用法。
 *
 * RangeSlider 是区间选择控件，有两个滑块分别控制范围的起始值和结束值，
 * 常用于价格区间筛选、时间段选择等场景。
 *
 * 核心参数：
 * - `value`：当前区间，类型为 `ClosedFloatingPointRange<Float>`（如 20f..80f）
 * - `onValueChange`：区间变化回调，参数为新的 ClosedFloatingPointRange
 * - `valueRange`：可选范围，默认 0f..1f
 * - `steps`：离散步数（同 Slider）
 *
 * 注意：RangeSlider 是实验性 API（@ExperimentalMaterial3Api），
 * 使用时需要 @OptIn(ExperimentalMaterial3Api::class)。
 */
@Composable
fun RangeSliderDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("RangeSlider 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础区间选择 ───────────────────────────────────
        SectionLabel("基础区间选择")
        var range1 by remember { mutableStateOf(0.2f..0.8f) }
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            RangeSlider(value = range1, onValueChange = { range1 = it })
            Text(
                "范围：${(range1.start * 100).roundToInt()} ~ ${(range1.endInclusive * 100).roundToInt()}",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }

        HorizontalDivider()

        // ── 2. 自定义范围 ─────────────────────────────────────
        SectionLabel("自定义范围（0..1000）")
        var range2 by remember { mutableStateOf(200f..700f) }
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            RangeSlider(
                value = range2,
                onValueChange = { range2 = it },
                valueRange = 0f..1000f
            )
            Text(
                "范围：${range2.start.roundToInt()} ~ ${range2.endInclusive.roundToInt()}",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }

        HorizontalDivider()

        // ── 3. steps 离散区间 ─────────────────────────────────
        SectionLabel("steps — 离散区间")
        var range3 by remember { mutableStateOf(1f..3f) }
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            RangeSlider(
                value = range3,
                onValueChange = { range3 = it },
                valueRange = 0f..5f,
                steps = 4
            )
            Text(
                "档位：${range3.start.roundToInt()} ~ ${range3.endInclusive.roundToInt()}",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }

        HorizontalDivider()

        // ── 4. 场景示例：价格区间 ─────────────────────────────
        SectionLabel("场景示例：价格区间筛选")
        var priceRange by remember { mutableStateOf(100f..500f) }
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = androidx.compose.ui.Modifier.fillMaxWidth()
            ) {
                Text("¥ ${priceRange.start.roundToInt()}", style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.primary)
                Text("¥ ${priceRange.endInclusive.roundToInt()}", style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.primary)
            }
            RangeSlider(
                value = priceRange,
                onValueChange = { priceRange = it },
                valueRange = 0f..1000f
            )
            Row(
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = androidx.compose.ui.Modifier.fillMaxWidth()
            ) {
                Text("¥0", style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant)
                Text("¥1000", style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }

        HorizontalDivider()

        // ── 5. 禁用状态 ───────────────────────────────────────
        SectionLabel("禁用状态")
        RangeSlider(value = 0.3f..0.7f, onValueChange = {}, enabled = false)
    }
}
