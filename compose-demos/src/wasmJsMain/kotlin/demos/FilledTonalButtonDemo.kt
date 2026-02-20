package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Download
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun FilledTonalButtonDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("FilledTonalButton 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("基础用法")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            var count by remember { mutableStateOf(0) }
            FilledTonalButton(onClick = { count++ }) { Text("点击（$count）") }
            FilledTonalButton(onClick = {}, enabled = false) { Text("禁用") }
        }

        HorizontalDivider()

        SectionLabel("带图标")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            FilledTonalButton(onClick = {}) {
                Icon(Icons.Filled.Download, contentDescription = null, modifier = Modifier.size(ButtonDefaults.IconSize))
                Spacer(Modifier.size(ButtonDefaults.IconSpacing))
                Text("下载")
            }
            FilledTonalButton(onClick = {}) {
                Icon(Icons.Filled.Share, contentDescription = null, modifier = Modifier.size(ButtonDefaults.IconSize))
                Spacer(Modifier.size(ButtonDefaults.IconSpacing))
                Text("分享")
            }
        }

        HorizontalDivider()

        SectionLabel("与 Button 对比")
        Text(
            "FilledTonalButton 使用 secondaryContainer 色，视觉权重低于 Button（primary），适合次要操作。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            Button(onClick = {}) { Text("主要操作") }
            FilledTonalButton(onClick = {}) { Text("次要操作") }
            TextButton(onClick = {}) { Text("辅助操作") }
        }
    }
}
