package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun RadioButtonDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("RadioButton 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础单选组 ─────────────────────────────────────
        SectionLabel("基础单选组")
        val options1 = listOf("选项 A", "选项 B", "选项 C")
        var selected1 by remember { mutableStateOf(options1[0]) }
        Column {
            options1.forEach { opt ->
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    RadioButton(
                        selected = opt == selected1,
                        onClick = { selected1 = opt }
                    )
                    Text(opt, style = MaterialTheme.typography.bodyMedium)
                }
            }
        }
        Text("已选：$selected1", style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant)

        HorizontalDivider()

        // ── 2. 实际场景：支付方式 ─────────────────────────────
        SectionLabel("场景示例：支付方式")
        val payOptions = listOf("微信支付", "支付宝", "银行卡", "货到付款")
        var selectedPay by remember { mutableStateOf(payOptions[0]) }
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(8.dp)) {
                payOptions.forEach { opt ->
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp)
                    ) {
                        RadioButton(
                            selected = opt == selectedPay,
                            onClick = { selectedPay = opt }
                        )
                        Text(opt, style = MaterialTheme.typography.bodyMedium)
                    }
                    if (opt != payOptions.last()) HorizontalDivider(modifier = Modifier.padding(start = 48.dp))
                }
            }
        }

        HorizontalDivider()

        // ── 3. 禁用状态 ───────────────────────────────────────
        SectionLabel("禁用状态")
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                RadioButton(selected = true, onClick = null, enabled = false)
                Text("禁用已选", style = MaterialTheme.typography.bodySmall)
            }
            Row(verticalAlignment = Alignment.CenterVertically) {
                RadioButton(selected = false, onClick = null, enabled = false)
                Text("禁用未选", style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}
