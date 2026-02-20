package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun TextButtonDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("TextButton 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("基础用法")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            var count by remember { mutableStateOf(0) }
            TextButton(onClick = { count++ }) { Text("点击（$count）") }
            TextButton(onClick = {}, enabled = false) { Text("禁用") }
        }

        HorizontalDivider()

        SectionLabel("带图标")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            TextButton(onClick = {}) {
                Icon(Icons.Filled.Edit, contentDescription = null, modifier = Modifier.size(ButtonDefaults.IconSize))
                Spacer(Modifier.size(ButtonDefaults.IconSpacing))
                Text("编辑")
            }
            TextButton(onClick = {}) {
                Icon(Icons.Filled.Delete, contentDescription = null, modifier = Modifier.size(ButtonDefaults.IconSize))
                Spacer(Modifier.size(ButtonDefaults.IconSpacing))
                Text("删除")
            }
        }

        HorizontalDivider()

        SectionLabel("常见场景：对话框操作按钮")
        Row(
            modifier = androidx.compose.ui.Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.End
        ) {
            TextButton(onClick = {}) { Text("取消") }
            TextButton(onClick = {}) { Text("确认") }
        }
    }
}
