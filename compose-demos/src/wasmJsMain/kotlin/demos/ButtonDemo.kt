import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ButtonDemo() {
    var count by remember { mutableStateOf(0) }

    Column(
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            text = "Button 示例",
            style = MaterialTheme.typography.titleMedium
        )

        // 基础按钮
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { count++ }) {
                Text("点击计数: $count")
            }
            OutlinedButton(onClick = { count = 0 }) {
                Text("重置")
            }
        }

        // 禁用状态
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = {}, enabled = false) {
                Text("禁用按钮")
            }
            FilledTonalButton(onClick = {}) {
                Text("Tonal 按钮")
            }
        }

        // 文字按钮
        TextButton(onClick = {}) {
            Text("TextButton")
        }
    }
}
