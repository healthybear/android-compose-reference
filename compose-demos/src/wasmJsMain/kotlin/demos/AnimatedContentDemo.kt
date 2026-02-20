package demos

import androidx.compose.animation.*
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp

@Composable
fun AnimatedContentDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("AnimatedContent 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 数字递增 ───────────────────────────────────────
        SectionLabel("数字递增（滑动切换）")
        var count by remember { mutableStateOf(0) }
        Row(
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            OutlinedButton(onClick = { if (count > 0) count-- }) { Text("-") }
            AnimatedContent(
                targetState = count,
                transitionSpec = {
                    if (targetState > initialState) {
                        slideInVertically { it } + fadeIn() togetherWith slideOutVertically { -it } + fadeOut()
                    } else {
                        slideInVertically { -it } + fadeIn() togetherWith slideOutVertically { it } + fadeOut()
                    }
                },
                label = "counter"
            ) { target ->
                Text(
                    "$target",
                    style = MaterialTheme.typography.displaySmall,
                    modifier = Modifier.width(80.dp),
                    textAlign = TextAlign.Center
                )
            }
            Button(onClick = { count++ }) { Text("+") }
        }

        HorizontalDivider()

        // ── 2. 内容切换 ───────────────────────────────────────
        SectionLabel("内容切换（淡入淡出）")
        val tabs = listOf("简介", "参数", "示例")
        var selectedTab by remember { mutableStateOf(0) }
        val tabContents = listOf(
            "AnimatedContent 在目标状态变化时，以动画方式切换内容。",
            "targetState: S\ntransitionSpec: ContentTransform\nlabel: String",
            "常见场景：数字计数器、Tab 内容切换、步骤向导。"
        )

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            TabRow(selectedTabIndex = selectedTab) {
                tabs.forEachIndexed { i, tab ->
                    Tab(selected = i == selectedTab, onClick = { selectedTab = i }, text = { Text(tab) })
                }
            }
            AnimatedContent(
                targetState = selectedTab,
                transitionSpec = { fadeIn(tween(200)) togetherWith fadeOut(tween(200)) },
                label = "tab_content"
            ) { tab ->
                Box(
                    modifier = Modifier.fillMaxWidth().height(80.dp)
                        .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                        .padding(16.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(tabContents[tab], style = MaterialTheme.typography.bodyMedium)
                }
            }
        }

        HorizontalDivider()

        // ── 3. 尺寸动画 ───────────────────────────────────────
        SectionLabel("SizeTransform — 尺寸变化动画")
        var expanded by remember { mutableStateOf(false) }
        AnimatedContent(
            targetState = expanded,
            transitionSpec = {
                fadeIn() togetherWith fadeOut() using SizeTransform(clip = false)
            },
            label = "size_transform"
        ) { isExpanded ->
            if (isExpanded) {
                Card(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Text("展开内容", style = MaterialTheme.typography.titleSmall)
                        Text("这里是展开后的详细内容，高度会随内容自动动画过渡。", style = MaterialTheme.typography.bodySmall)
                        TextButton(onClick = { expanded = false }) { Text("收起") }
                    }
                }
            } else {
                OutlinedButton(onClick = { expanded = true }) { Text("展开查看详情") }
            }
        }
    }
}
