package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * OutlinedCardDemo 演示 Material3 OutlinedCard 的用法。
 *
 * OutlinedCard 使用边框轮廓代替阴影来区分内容区域，
 * 背景透明（使用 surface 色），适合扁平化设计风格。
 *
 * 三种 Card 变体对比：
 * - Card（Filled）：填充背景 + 轻微阴影，最常用
 * - ElevatedCard：更高阴影，视觉层级更强
 * - OutlinedCard：边框轮廓，无阴影，适合浅色背景上的内容分组
 *
 * 使用场景：
 * - 表单中的分组容器
 * - 需要与背景融合但又要有边界感的内容区域
 * - 与 ElevatedCard 并排展示时提供视觉对比
 *
 * border 参数：使用 `CardDefaults.outlinedCardBorder()` 获取标准边框样式，
 * 也可以传入自定义 BorderStroke。
 */
@Composable
fun OutlinedCardDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("OutlinedCard 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("三种 Card 对比")
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Card(modifier = Modifier.fillMaxWidth()) {
                Box(modifier = Modifier.padding(12.dp)) {
                    Text("Card — 填充背景 + 轻微阴影", style = MaterialTheme.typography.bodyMedium)
                }
            }
            ElevatedCard(modifier = Modifier.fillMaxWidth()) {
                Box(modifier = Modifier.padding(12.dp)) {
                    Text("ElevatedCard — 更高阴影", style = MaterialTheme.typography.bodyMedium)
                }
            }
            OutlinedCard(modifier = Modifier.fillMaxWidth()) {
                Box(modifier = Modifier.padding(12.dp)) {
                    Text("OutlinedCard — 边框，无阴影", style = MaterialTheme.typography.bodyMedium)
                }
            }
        }

        HorizontalDivider()

        SectionLabel("可点击 OutlinedCard")
        OutlinedCard(
            onClick = {},
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("点击我", style = MaterialTheme.typography.titleMedium)
                Text("OutlinedCard 适合需要明确边界但不想要阴影的场景。",
                    style = MaterialTheme.typography.bodyMedium)
            }
        }

        HorizontalDivider()

        SectionLabel("网格卡片")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            repeat(3) { i ->
                OutlinedCard(modifier = Modifier.weight(1f)) {
                    Column(
                        modifier = Modifier.padding(12.dp).fillMaxWidth(),
                        verticalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Text("标题 ${i + 1}", style = MaterialTheme.typography.titleSmall)
                        Text("描述文字", style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }
        }
    }
}
