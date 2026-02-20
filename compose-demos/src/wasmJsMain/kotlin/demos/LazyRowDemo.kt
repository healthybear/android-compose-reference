package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * LazyRowDemo 演示了 Jetpack Compose 中 LazyRow 的三种典型用法。
 *
 * LazyRow 是 LazyColumn 的水平版本，按需渲染可见条目，适合横向滚动场景，
 * 例如：图片轮播缩略图、标签筛选栏、横向卡片列表等。
 *
 * 本示例涵盖：
 * 1. 基础横向滚动：使用 itemsIndexed 渲染带序号的方块条目
 * 2. 卡片列表：展示不同主题色的横向卡片，模拟真实业务场景
 * 3. contentPadding：演示首尾留白与普通 padding 的区别
 *
 * 学习要点：
 * - contentPadding 与 Modifier.padding 的区别：前者在滚动内容区域外留白，
 *   滚动时首尾条目仍可完整显示；后者会裁剪超出区域的内容
 * - horizontalArrangement = Arrangement.spacedBy() 统一控制条目间距，
 *   比在每个条目内手动加 Spacer 更简洁
 * - LazyRow 内部使用解构声明 (title, color) 可让代码更易读
 */
@Composable
fun LazyRowDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("LazyRow 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础横向滚动 ───────────────────────────────────
        // contentPadding 在列表两端各留 4dp 空白，防止首尾条目紧贴边缘
        // itemsIndexed 同时提供 index 和 item，此处 index 用于显示序号标签
        SectionLabel("基础横向列表（可滚动）")
        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            contentPadding = PaddingValues(horizontal = 4.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            itemsIndexed((1..20).toList()) { index, item ->
                Box(
                    modifier = Modifier
                        .size(72.dp)
                        .background(
                            MaterialTheme.colorScheme.primaryContainer,
                            RoundedCornerShape(12.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(
                            "$item",
                            style = MaterialTheme.typography.titleMedium,
                            color = MaterialTheme.colorScheme.onPrimaryContainer
                        )
                        Text(
                            "#${index + 1}",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onPrimaryContainer
                        )
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 2. 卡片列表 ───────────────────────────────────────
        // 使用 Pair<String, Color> 将标题与颜色绑定，通过解构声明简化 lambda 参数
        // 每张卡片使用 Material3 的语义色（primaryContainer、secondaryContainer 等），
        // 保证在亮色/暗色主题下都有良好对比度
        SectionLabel("横向卡片列表")
        val cards = listOf(
            "Compose"   to MaterialTheme.colorScheme.primaryContainer,
            "Kotlin"    to MaterialTheme.colorScheme.secondaryContainer,
            "Material3" to MaterialTheme.colorScheme.tertiaryContainer,
            "Android"   to MaterialTheme.colorScheme.errorContainer,
            "Wasm"      to MaterialTheme.colorScheme.surfaceVariant,
            "Coroutines" to MaterialTheme.colorScheme.primaryContainer,
            "Flow"      to MaterialTheme.colorScheme.secondaryContainer,
        )
        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            contentPadding = PaddingValues(horizontal = 4.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            itemsIndexed(cards) { _, (title, color) ->
                Card(
                    modifier = Modifier.width(120.dp).height(80.dp),
                    colors = CardDefaults.cardColors(containerColor = color),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(title, style = MaterialTheme.typography.titleSmall)
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 3. contentPadding 说明 ────────────────────────────
        // contentPadding(horizontal = 32.dp) 让列表在视觉上"缩进"，
        // 但滚动时第一个和最后一个条目仍能滚动到容器边缘，不会被裁剪
        // 若改用 Modifier.padding(horizontal = 32.dp)，条目滚到边缘时会被遮住
        SectionLabel("contentPadding — 首尾留白")
        Text(
            "设置 contentPadding 后，列表首尾会有额外空白，但滚动时内容仍可滚到边缘。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            contentPadding = PaddingValues(horizontal = 32.dp),
            modifier = Modifier
                .fillMaxWidth()
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                .padding(vertical = 8.dp)
        ) {
            items(8) { i ->
                Box(
                    modifier = Modifier
                        .size(48.dp)
                        .background(
                            MaterialTheme.colorScheme.secondary,
                            RoundedCornerShape(8.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        "${i + 1}",
                        style = MaterialTheme.typography.labelLarge,
                        color = MaterialTheme.colorScheme.onSecondary
                    )
                }
            }
        }
    }
}
