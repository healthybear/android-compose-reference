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

/**
 * AnimatedContentDemo 演示 AnimatedContent 的内容切换动画。
 *
 * AnimatedContent 在 targetState 变化时，以动画方式切换显示的内容，
 * 旧内容退出的同时新内容进入，两者在动画期间同时存在于组合树中。
 *
 * 核心参数：
 * - `targetState`：驱动内容切换的状态（任意类型）
 * - `transitionSpec`：定义 ContentTransform，使用 `togetherWith` 中缀函数
 *   将 EnterTransition 和 ExitTransition 组合：`enter togetherWith exit`
 * - `label`：调试标签，用于 Android Studio 动画检查工具
 *
 * 方向感动画技巧：
 * 在 transitionSpec 中比较 targetState 和 initialState，
 * 根据新旧值的大小关系选择不同的滑动方向，使动画具有语义方向感。
 *
 * SizeTransform：使用 `using SizeTransform(clip = false)` 让容器尺寸也参与动画，
 * 适合从小组件展开为大组件的场景。
 */
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
