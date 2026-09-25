package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * TooltipDemo 演示 Material3 Tooltip 的用法。
 *
 * Tooltip 是悬浮提示组件，用于显示补充信息。
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TooltipDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("Tooltip 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("基础用法")

        TooltipBox(
            positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
            tooltip = {
                PlainTooltip {
                    Text("这是一个提示")
                }
            },
            state = rememberTooltipState()
        ) {
            IconButton(onClick = {}) {
                Icon(Icons.Filled.Info, contentDescription = "信息")
            }
        }
    }
}
