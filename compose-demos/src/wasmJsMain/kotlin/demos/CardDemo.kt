package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * CardDemo 演示 Material3 Card 的基础用法。
 *
 * Card 是 Material Design 中用于展示相关信息的容器组件，默认带有圆角和轻微阴影（Tonal elevation）。
 * 内部可放置任意 Composable，常见布局为标题 + 正文 + 操作按钮。
 *
 * 三种变体（本文件演示基础 Card，其余见 ElevatedCardDemo / OutlinedCardDemo）：
 * - [Card]：默认填充样式，使用 surface 颜色 + tonal elevation
 * - [ElevatedCard]：更高阴影，视觉层次更突出
 * - [OutlinedCard]：描边样式，无阴影，适合扁平化设计
 *
 * 可点击 Card：
 * - 传入 `onClick` 参数即可让整张卡片响应点击，自动添加 Ripple 反馈
 * - 适合列表项、导航入口等场景
 *
 * 内容布局建议：
 * - 封面图放在 Card 顶部（使用 Box + Canvas 或 Image）
 * - 文字内容用 Column + padding(16.dp) 包裹
 * - 操作按钮放在底部 Row 中
 */
@Composable
fun CardDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("Card 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础卡片 ───────────────────────────────────────
        SectionLabel("基础 Card")
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("卡片标题", style = MaterialTheme.typography.titleMedium)
                Text(
                    "这是卡片的正文内容，可以放置任意 Composable。Card 默认带有圆角和轻微阴影。",
                    style = MaterialTheme.typography.bodyMedium
                )
            }
        }

        HorizontalDivider()

        // ── 2. 可点击卡片 ─────────────────────────────────────
        SectionLabel("可点击 Card")
        var clickCount by remember { mutableStateOf(0) }
        Card(
            onClick = { clickCount++ },
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier.padding(16.dp).fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text("可点击卡片", style = MaterialTheme.typography.titleSmall)
                    Text("点击次数：$clickCount", style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
                Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                    IconButton(onClick = {}) {
                        Icon(Icons.Filled.Favorite, contentDescription = "收藏")
                    }
                    IconButton(onClick = {}) {
                        Icon(Icons.Filled.Share, contentDescription = "分享")
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 3. 内容布局示例 ───────────────────────────────────
        SectionLabel("内容布局")
        Card(modifier = Modifier.fillMaxWidth()) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(80.dp)
                    .padding(0.dp),
                contentAlignment = Alignment.Center
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(0.dp),
                    contentAlignment = Alignment.Center
                ) {
                    androidx.compose.foundation.Canvas(modifier = Modifier.fillMaxSize()) {
                        drawRect(
                            brush = androidx.compose.ui.graphics.Brush.linearGradient(
                                listOf(
                                    androidx.compose.ui.graphics.Color(0xFF6650A4),
                                    androidx.compose.ui.graphics.Color(0xFF03DAC5)
                                )
                            )
                        )
                    }
                    Text("封面图区域", style = MaterialTheme.typography.labelLarge,
                        color = androidx.compose.ui.graphics.Color.White)
                }
            }
            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text("文章标题", style = MaterialTheme.typography.titleMedium)
                Text("副标题 · 2026-02-20", style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant)
                Text("摘要内容放在这里，通常 2-3 行，超出用 ellipsis 截断。",
                    style = MaterialTheme.typography.bodyMedium,
                    maxLines = 2,
                    overflow = androidx.compose.ui.text.style.TextOverflow.Ellipsis)
            }
        }
    }
}
