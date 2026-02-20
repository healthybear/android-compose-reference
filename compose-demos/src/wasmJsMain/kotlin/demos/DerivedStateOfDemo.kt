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
fun DerivedStateOfDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("derivedStateOf 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础：从列表派生计数 ───────────────────────────
        SectionLabel("从列表派生统计值")
        val items = remember { mutableStateListOf("苹果", "香蕉", "橙子", "葡萄", "西瓜") }
        var newItem by remember { mutableStateOf("") }

        // derivedStateOf：只有 items 变化时才重新计算
        val itemCount by remember { derivedStateOf { items.size } }
        val hasItems by remember { derivedStateOf { items.isNotEmpty() } }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                OutlinedTextField(
                    value = newItem,
                    onValueChange = { newItem = it },
                    label = { Text("新条目") },
                    modifier = Modifier.weight(1f),
                    singleLine = true
                )
                Button(
                    onClick = { if (newItem.isNotBlank()) { items.add(newItem); newItem = "" } },
                    enabled = newItem.isNotBlank()
                ) { Text("添加") }
            }

            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                AssistChip(onClick = {}, label = { Text("共 $itemCount 项") })
                if (!hasItems) {
                    AssistChip(onClick = {}, label = { Text("列表为空") })
                }
            }

            if (hasItems) {
                Column(
                    modifier = Modifier.fillMaxWidth()
                        .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                        .padding(8.dp),
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    items.forEachIndexed { i, item ->
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text("${i + 1}. $item", style = MaterialTheme.typography.bodySmall)
                            TextButton(onClick = { items.removeAt(i) }) { Text("删除") }
                        }
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 2. 表单验证 ───────────────────────────────────────
        SectionLabel("表单验证（派生可提交状态）")
        var username by remember { mutableStateOf("") }
        var password by remember { mutableStateOf("") }

        val isUsernameValid by remember { derivedStateOf { username.length >= 3 } }
        val isPasswordValid by remember { derivedStateOf { password.length >= 6 } }
        val canSubmit by remember { derivedStateOf { isUsernameValid && isPasswordValid } }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedTextField(
                value = username,
                onValueChange = { username = it },
                label = { Text("用户名（≥3字符）") },
                isError = username.isNotEmpty() && !isUsernameValid,
                supportingText = if (username.isNotEmpty() && !isUsernameValid) {
                    { Text("用户名至少 3 个字符") }
                } else null,
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )
            OutlinedTextField(
                value = password,
                onValueChange = { password = it },
                label = { Text("密码（≥6字符）") },
                isError = password.isNotEmpty() && !isPasswordValid,
                supportingText = if (password.isNotEmpty() && !isPasswordValid) {
                    { Text("密码至少 6 个字符") }
                } else null,
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )
            Button(
                onClick = { username = ""; password = "" },
                enabled = canSubmit
            ) { Text("提交") }
            Text(
                "canSubmit = isUsernameValid($isUsernameValid) && isPasswordValid($isPasswordValid)",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }

        HorizontalDivider()

        // ── 3. 滚动位置派生 ───────────────────────────────────
        SectionLabel("滚动位置派生（showScrollTop）")
        val scrollState = androidx.compose.foundation.rememberScrollState()
        val showScrollTop by remember { derivedStateOf { scrollState.value > 100 } }

        Box {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(120.dp)
                    .verticalScroll(scrollState)
                    .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                    .padding(8.dp),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                repeat(10) { i ->
                    Text("列表项 ${i + 1}", style = MaterialTheme.typography.bodySmall)
                }
            }
            if (showScrollTop) {
                SmallFloatingActionButton(
                    onClick = { },
                    modifier = Modifier.align(Alignment.BottomEnd).padding(8.dp)
                ) { Text("↑") }
            }
        }
        Text(
            "scrollState.value=${scrollState.value}  showScrollTop=$showScrollTop",
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• derivedStateOf { } 从其他 State 派生新 State\n" +
            "• 只有依赖的 State 变化时才重新计算，避免不必要重组\n" +
            "• 适合：过滤列表、表单验证、滚动阈值判断等场景",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
