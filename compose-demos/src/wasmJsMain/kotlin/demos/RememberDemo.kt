package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun RememberDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("remember 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础 remember ──────────────────────────────────
        SectionLabel("基础 remember")
        var count by remember { mutableStateOf(0) }
        Row(
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Button(onClick = { count++ }) { Text("点击 +1") }
            Text("计数：$count", style = MaterialTheme.typography.titleMedium,
                color = MaterialTheme.colorScheme.primary)
            TextButton(onClick = { count = 0 }) { Text("重置") }
        }

        HorizontalDivider()

        // ── 2. remember vs 普通变量 ───────────────────────────
        SectionLabel("remember vs 普通变量")
        var trigger by remember { mutableStateOf(0) }
        val remembered by remember { mutableStateOf("重组不变") }
        // 普通变量每次重组都重新赋值
        val notRemembered = "重组时 trigger=$trigger"

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { trigger++ }) { Text("触发重组（trigger=$trigger）") }
            Row(
                modifier = Modifier.fillMaxWidth()
                    .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                    .padding(12.dp),
                horizontalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Column(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text("remember", style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.primary)
                    Text(remembered, style = MaterialTheme.typography.bodySmall)
                }
                Column(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text("普通变量", style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.secondary)
                    Text(notRemembered, style = MaterialTheme.typography.bodySmall)
                }
            }
        }

        HorizontalDivider()

        // ── 3. rememberSaveable ───────────────────────────────
        SectionLabel("rememberSaveable（跨重组保存）")
        var savedCount by rememberSaveable { mutableStateOf(0) }
        Row(
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Button(onClick = { savedCount++ }) { Text("rememberSaveable +1") }
            Text("$savedCount", style = MaterialTheme.typography.titleMedium,
                color = MaterialTheme.colorScheme.tertiary)
        }
        Text(
            "rememberSaveable 在 Activity 重建（旋转屏幕）后仍保留值",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        HorizontalDivider()

        // ── 4. remember { } 计算缓存 ─────────────────────────
        SectionLabel("remember 缓存计算结果")
        var input by remember { mutableStateOf(10) }
        val factorial = remember(input) {
            var result = 1L
            for (i in 1..input) result *= i
            result
        }
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                OutlinedButton(onClick = { if (input > 0) input-- }) { Text("-") }
                Text("$input!", style = MaterialTheme.typography.titleMedium)
                OutlinedButton(onClick = { if (input < 15) input++ }) { Text("+") }
            }
            Text("= $factorial", style = MaterialTheme.typography.titleLarge,
                color = MaterialTheme.colorScheme.primary)
            Text("remember(key) 仅在 key 变化时重新计算",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• remember { } 在重组间保留值，组件离开组合树时释放\n" +
            "• rememberSaveable 额外支持 Bundle 序列化（Activity 重建）\n" +
            "• remember(key) { } 当 key 变化时重新执行 lambda",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
