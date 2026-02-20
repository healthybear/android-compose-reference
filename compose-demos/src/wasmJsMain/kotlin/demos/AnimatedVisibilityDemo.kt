package demos

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun AnimatedVisibilityDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("AnimatedVisibility 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础淡入淡出 ───────────────────────────────────
        SectionLabel("基础淡入淡出（fadeIn / fadeOut）")
        var visible1 by remember { mutableStateOf(true) }
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { visible1 = !visible1 }) {
                Text(if (visible1) "隐藏" else "显示")
            }
            AnimatedVisibility(visible = visible1) {
                Box(
                    modifier = Modifier.fillMaxWidth().height(48.dp)
                        .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(8.dp)),
                    contentAlignment = Alignment.Center
                ) { Text("淡入淡出内容", style = MaterialTheme.typography.bodyMedium) }
            }
        }

        HorizontalDivider()

        // ── 2. 滑入滑出 ───────────────────────────────────────
        SectionLabel("滑入滑出（slideIn / slideOut）")
        var visible2 by remember { mutableStateOf(true) }
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { visible2 = !visible2 }) {
                Text(if (visible2) "隐藏" else "显示")
            }
            AnimatedVisibility(
                visible = visible2,
                enter = slideInVertically { -it },
                exit = slideOutVertically { -it }
            ) {
                Box(
                    modifier = Modifier.fillMaxWidth().height(48.dp)
                        .background(MaterialTheme.colorScheme.secondaryContainer, RoundedCornerShape(8.dp)),
                    contentAlignment = Alignment.Center
                ) { Text("从顶部滑入", style = MaterialTheme.typography.bodyMedium) }
            }
        }

        HorizontalDivider()

        // ── 3. 展开收起 ───────────────────────────────────────
        SectionLabel("展开收起（expandVertically / shrinkVertically）")
        var visible3 by remember { mutableStateOf(false) }
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedButton(onClick = { visible3 = !visible3 }) {
                Text(if (visible3) "收起详情 ▲" else "展开详情 ▼")
            }
            AnimatedVisibility(
                visible = visible3,
                enter = expandVertically(),
                exit = shrinkVertically()
            ) {
                Card(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text("详情内容", style = MaterialTheme.typography.titleSmall)
                        Text("这里是展开后显示的详细信息，可以放任意内容。", style = MaterialTheme.typography.bodySmall)
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 4. 自定义 enter/exit 组合 ─────────────────────────
        SectionLabel("自定义组合（fadeIn + expandHorizontally）")
        var visible4 by remember { mutableStateOf(true) }
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            FilledTonalButton(onClick = { visible4 = !visible4 }) {
                Text(if (visible4) "隐藏" else "显示")
            }
            AnimatedVisibility(
                visible = visible4,
                enter = fadeIn() + expandHorizontally(),
                exit = fadeOut() + shrinkHorizontally()
            ) {
                Box(
                    modifier = Modifier.height(48.dp)
                        .background(MaterialTheme.colorScheme.tertiaryContainer, RoundedCornerShape(8.dp))
                        .padding(horizontal = 24.dp),
                    contentAlignment = Alignment.Center
                ) { Text("水平展开 + 淡入", style = MaterialTheme.typography.bodyMedium) }
            }
        }
    }
}
