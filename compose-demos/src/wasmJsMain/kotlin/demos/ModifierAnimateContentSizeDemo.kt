package demos

import androidx.compose.animation.animateContentSize
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * ModifierAnimateContentSizeDemo 演示 Modifier.animateContentSize() 的用法。
 *
 * animateContentSize 在内容大小变化时自动添加动画过渡。
 *
 * 核心特性：
 * - 自动检测尺寸变化
 * - 平滑的过渡动画
 * - 无需手动管理动画状态
 *
 * 使用场景：
 * - 展开/收起内容
 * - 动态文本长度变化
 * - 可变数量的列表项
 */
@Composable
fun ModifierAnimateContentSizeDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("Modifier.animateContentSize 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础用法 ───────────────────────────────────────
        SectionLabel("基础展开/收起")

        var expanded1 by remember { mutableStateOf(false) }

        Card(
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .animateContentSize() // 关键：自动动画
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("展开查看详情", style = MaterialTheme.typography.bodyLarge)
                    IconButton(onClick = { expanded1 = !expanded1 }) {
                        Icon(
                            if (expanded1) Icons.Filled.KeyboardArrowUp
                            else Icons.Filled.KeyboardArrowDown,
                            contentDescription = if (expanded1) "收起" else "展开"
                        )
                    }
                }

                if (expanded1) {
                    HorizontalDivider()
                    Text(
                        "这是展开后的详细内容。animateContentSize 会自动为高度变化添加平滑的动画效果。",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }

        HorizontalDivider()

        // ── 2. 动态文本长度 ───────────────────────────────────
        SectionLabel("动态文本长度")

        var showFullText by remember { mutableStateOf(false) }
        val shortText = "点击查看完整内容..."
        val fullText = "这是完整的文本内容。Modifier.animateContentSize() 会自动处理文本长度变化带来的尺寸改变，无需手动编写动画代码。"

        Card(
            modifier = Modifier.fillMaxWidth(),
            onClick = { showFullText = !showFullText }
        ) {
            Text(
                text = if (showFullText) fullText else shortText,
                modifier = Modifier
                    .fillMaxWidth()
                    .animateContentSize()
                    .padding(16.dp),
                style = MaterialTheme.typography.bodyMedium
            )
        }

        HorizontalDivider()

        // ── 3. 动态列表项 ─────────────────────────────────────
        SectionLabel("动态列表项数量")

        var itemCount by remember { mutableStateOf(3) }

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .animateContentSize()
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text(
                    "列表项（$itemCount 个）",
                    style = MaterialTheme.typography.titleSmall
                )

                repeat(itemCount) { index ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(
                                MaterialTheme.colorScheme.surface,
                                RoundedCornerShape(8.dp)
                            )
                            .padding(12.dp),
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(Icons.Filled.Star, contentDescription = null)
                        Text("项目 ${index + 1}")
                    }
                }

                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Button(
                        onClick = { if (itemCount < 6) itemCount++ },
                        enabled = itemCount < 6
                    ) {
                        Text("添加项目")
                    }
                    OutlinedButton(
                        onClick = { if (itemCount > 1) itemCount-- },
                        enabled = itemCount > 1
                    ) {
                        Text("删除项目")
                    }
                }
            }
        }
    }
}
