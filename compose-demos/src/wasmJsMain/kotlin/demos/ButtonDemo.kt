import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ButtonDemo() {
    var count by remember { mutableStateOf(0) }
    var liked by remember { mutableStateOf(false) }
    var loading by remember { mutableStateOf(false) }

    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Button 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 五种样式 ───────────────────────────────────
        SectionLabel("五种样式")
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Button(onClick = {}) { Text("Filled") }
            FilledTonalButton(onClick = {}) { Text("Tonal") }
            OutlinedButton(onClick = {}) { Text("Outlined") }
            ElevatedButton(onClick = {}) { Text("Elevated") }
            TextButton(onClick = {}) { Text("Text") }
        }

        HorizontalDivider()

        // ── 2. 禁用 & 加载中 ──────────────────────────────
        SectionLabel("状态：正常 / 禁用 / 加载中")
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Button(onClick = {}) { Text("正常") }
            Button(onClick = {}, enabled = false) { Text("禁用") }
            Button(
                onClick = { loading = !loading },
                enabled = !loading
            ) {
                if (loading) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(16.dp),
                        strokeWidth = 2.dp,
                        color = MaterialTheme.colorScheme.onPrimary
                    )
                    Spacer(Modifier.width(8.dp))
                    Text("加载中…")
                } else {
                    Text("点击加载")
                }
            }
        }

        HorizontalDivider()

        // ── 3. 交互计数 ───────────────────────────────────
        SectionLabel("交互计数")
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Button(onClick = { count++ }) { Text("+1") }
            OutlinedButton(onClick = { if (count > 0) count-- }) { Text("-1") }
            TextButton(onClick = { count = 0 }) { Text("重置") }
            Text(
                "计数：$count",
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.primary
            )
        }

        HorizontalDivider()

        // ── 4. 切换状态按钮 ───────────────────────────────
        SectionLabel("切换状态")
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Button(
                onClick = { liked = !liked },
                colors = if (liked)
                    ButtonDefaults.buttonColors(
                        containerColor = MaterialTheme.colorScheme.errorContainer,
                        contentColor = MaterialTheme.colorScheme.onErrorContainer
                    )
                else ButtonDefaults.buttonColors()
            ) {
                Text(if (liked) "♥ 已收藏" else "♡ 收藏")
            }
            OutlinedButton(
                onClick = { liked = !liked },
                colors = if (liked)
                    ButtonDefaults.outlinedButtonColors(
                        contentColor = MaterialTheme.colorScheme.error
                    )
                else ButtonDefaults.outlinedButtonColors()
            ) {
                Text(if (liked) "取消收藏" else "收藏")
            }
        }

        HorizontalDivider()

        // ── 5. FAB ────────────────────────────────────────
        SectionLabel("FloatingActionButton")
        Row(
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            SmallFloatingActionButton(onClick = {}) { Text("+") }
            FloatingActionButton(onClick = {}) { Text("+") }
            LargeFloatingActionButton(onClick = {}) { Text("+") }
            ExtendedFloatingActionButton(
                onClick = {},
                text = { Text("新建") },
                icon = { Text("+") }
            )
        }
    }
}

@Composable
private fun SectionLabel(text: String) {
    Text(
        text,
        style = MaterialTheme.typography.labelMedium,
        color = MaterialTheme.colorScheme.outline
    )
}
