package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Send
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun OutlinedButtonDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("OutlinedButton 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("基础用法")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            var count by remember { mutableStateOf(0) }
            OutlinedButton(onClick = { count++ }) { Text("点击（$count）") }
            OutlinedButton(onClick = {}, enabled = false) { Text("禁用") }
        }

        HorizontalDivider()

        SectionLabel("带图标")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            OutlinedButton(onClick = {}) {
                Icon(Icons.Filled.Send, contentDescription = null, modifier = Modifier.size(ButtonDefaults.IconSize))
                Spacer(Modifier.size(ButtonDefaults.IconSpacing))
                Text("发送")
            }
            OutlinedButton(onClick = {}) {
                Text("新建")
                Spacer(Modifier.size(ButtonDefaults.IconSpacing))
                Icon(Icons.Filled.Add, contentDescription = null, modifier = Modifier.size(ButtonDefaults.IconSize))
            }
        }

        HorizontalDivider()

        SectionLabel("尺寸变体")
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedButton(
                onClick = {},
                contentPadding = PaddingValues(horizontal = 8.dp, vertical = 4.dp)
            ) { Text("小号", style = MaterialTheme.typography.labelSmall) }
            OutlinedButton(onClick = {}) { Text("默认") }
            OutlinedButton(
                onClick = {},
                modifier = Modifier.fillMaxWidth()
            ) { Text("全宽") }
        }
    }
}
