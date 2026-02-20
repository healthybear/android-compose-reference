package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * ElevatedCardDemo 演示 Material3 ElevatedCard 的用法。
 *
 * ElevatedCard 是带有阴影的卡片变体，通过更高的 elevation（阴影高度）
 * 在视觉上与背景产生更强的层次感，适合需要突出显示的内容区域。
 *
 * 三种 Card 变体对比：
 * - Card（Filled）：填充背景 + 轻微阴影，最常用，适合大多数场景
 * - ElevatedCard：更高阴影，视觉层级更强，适合需要强调的内容
 * - OutlinedCard：边框轮廓，无阴影，适合扁平化设计风格
 *
 * elevation 参数：
 * 使用 `CardDefaults.elevatedCardElevation(defaultElevation = Xdp)` 自定义阴影高度，
 * 不同状态（pressed、focused、hovered）可以设置不同的阴影值。
 */
@Composable
fun ElevatedCardDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("ElevatedCard 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("阴影层级对比")
        Text(
            "ElevatedCard 使用 surfaceContainerLow 背景色，阴影比普通 Card 更明显。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            Card(modifier = Modifier.weight(1f)) {
                Box(modifier = Modifier.padding(16.dp)) {
                    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text("Card", style = MaterialTheme.typography.titleSmall)
                        Text("默认阴影", style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }
            ElevatedCard(modifier = Modifier.weight(1f)) {
                Box(modifier = Modifier.padding(16.dp)) {
                    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text("ElevatedCard", style = MaterialTheme.typography.titleSmall)
                        Text("更高阴影", style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }
        }

        HorizontalDivider()

        SectionLabel("可点击 ElevatedCard")
        ElevatedCard(
            onClick = {},
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("点击我", style = MaterialTheme.typography.titleMedium)
                Text("ElevatedCard 同样支持 onClick 参数。",
                    style = MaterialTheme.typography.bodyMedium)
            }
        }

        HorizontalDivider()

        SectionLabel("卡片列表")
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            repeat(3) { i ->
                ElevatedCard(modifier = Modifier.fillMaxWidth()) {
                    Row(
                        modifier = Modifier.padding(12.dp).fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("列表项 ${i + 1}", style = MaterialTheme.typography.bodyLarge)
                        Text("详情 →", style = MaterialTheme.typography.labelMedium,
                            color = MaterialTheme.colorScheme.primary)
                    }
                }
            }
        }
    }
}
