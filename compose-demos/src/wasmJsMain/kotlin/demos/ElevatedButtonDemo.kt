package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.ThumbUp
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * ElevatedButtonDemo 演示 [ElevatedButton] 的用法。
 *
 * ElevatedButton 通过阴影（elevation）而非填充色来与背景区分，
 * 适合放置在有色背景（如图片、卡片）上，需要按钮可见但不抢夺焦点的场景。
 * 其视觉权重低于 [Button] 和 [FilledTonalButton]，高于 [OutlinedButton]。
 */
@Composable
fun ElevatedButtonDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("ElevatedButton 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("基础用法")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            var count by remember { mutableStateOf(0) }
            ElevatedButton(onClick = { count++ }) { Text("点击（$count）") }
            ElevatedButton(onClick = {}, enabled = false) { Text("禁用") }
        }

        HorizontalDivider()

        SectionLabel("带图标")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            ElevatedButton(onClick = {}) {
                Icon(Icons.Filled.Star, contentDescription = null, modifier = Modifier.size(ButtonDefaults.IconSize))
                Spacer(Modifier.size(ButtonDefaults.IconSpacing))
                Text("收藏")
            }
            ElevatedButton(onClick = {}) {
                Icon(Icons.Filled.ThumbUp, contentDescription = null, modifier = Modifier.size(ButtonDefaults.IconSize))
                Spacer(Modifier.size(ButtonDefaults.IconSpacing))
                Text("点赞")
            }
        }

        HorizontalDivider()

        SectionLabel("五种按钮层级对比")
        Text(
            "从高到低：Button > FilledTonal > Elevated > Outlined > Text",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = {}) { Text("Button（最高权重）") }
            FilledTonalButton(onClick = {}) { Text("FilledTonalButton") }
            ElevatedButton(onClick = {}) { Text("ElevatedButton") }
            OutlinedButton(onClick = {}) { Text("OutlinedButton") }
            TextButton(onClick = {}) { Text("TextButton（最低权重）") }
        }
    }
}
