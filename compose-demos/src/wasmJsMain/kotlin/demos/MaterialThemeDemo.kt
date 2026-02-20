package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * MaterialTheme 综合演示
 *
 * MaterialTheme 是 Material Design 3 的核心入口，它通过 CompositionLocal 机制
 * 将 colorScheme、typography、shapes 三大设计令牌注入整个组件树。
 * 任何子 Composable 都可以通过 MaterialTheme.xxx 直接读取，无需手动传参。
 *
 * 本 Demo 展示：
 * - 亮色/暗色主题切换时，所有颜色如何自动响应
 * - 如何通过 MaterialTheme.colorScheme 访问语义化颜色
 * - 如何通过 MaterialTheme.typography 访问字体样式层级
 * - 如何通过 MaterialTheme.shapes 访问统一的圆角形状
 *
 * 关键概念：MaterialTheme 本质上是一个 CompositionLocalProvider，
 * 修改主题只需在顶层替换 colorScheme/typography/shapes 参数即可全局生效。
 */
@Composable
fun MaterialThemeDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("MaterialTheme 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 亮/暗色说明 ────────────────────────────────────
        // 亮色与暗色主题共用同一套语义化颜色名称（如 primary、surface），
        // 切换主题时只需替换 colorScheme 对象，所有引用该颜色的组件会自动重组。
        // 这正是"语义化颜色"的价值：代码无需感知当前是亮色还是暗色。
        SectionLabel("亮色 / 暗色切换")
        Text(
            "点击右上角 🌙 / ☀️ 按钮可切换主题，当前 Demo 会随之响应。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        // 当前主题色块预览
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            listOf(
                MaterialTheme.colorScheme.background  to "background",
                MaterialTheme.colorScheme.surface     to "surface",
                MaterialTheme.colorScheme.primary     to "primary",
                MaterialTheme.colorScheme.secondary   to "secondary",
            ).forEach { (color, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(56.dp)
                            .background(color, RoundedCornerShape(8.dp))
                            .then(
                                if (color == MaterialTheme.colorScheme.background ||
                                    color == MaterialTheme.colorScheme.surface)
                                    Modifier.border(1.dp, MaterialTheme.colorScheme.outline, RoundedCornerShape(8.dp))
                                else Modifier
                            )
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 2. colorScheme 访问 ───────────────────────────────
        // colorScheme 包含 30+ 个语义化颜色角色，每个角色都有对应的"on"色（前景色）。
        // 例如 primaryContainer 作为背景时，应搭配 onPrimaryContainer 作为文字颜色，
        // 这样在亮色/暗色模式下对比度都能满足无障碍标准（WCAG AA）。
        SectionLabel("MaterialTheme.colorScheme 访问")
        Text(
            "在任意 Composable 中通过 MaterialTheme.colorScheme.xxx 读取当前主题色。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(8.dp))
                .padding(16.dp)
        ) {
            Text(
                "primaryContainer 背景 + onPrimaryContainer 文字",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onPrimaryContainer
            )
        }

        HorizontalDivider()

        // ── 3. typography 访问 ────────────────────────────────
        // typography 定义了从 displayLarge 到 labelSmall 共 15 个文字样式层级。
        // 使用语义化名称（如 titleLarge、bodyMedium）而非硬编码字号，
        // 好处是：换主题时字体家族、字重、行高可以整体替换，无需逐处修改。
        SectionLabel("MaterialTheme.typography 访问")
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("titleLarge", style = MaterialTheme.typography.titleLarge)
            Text("bodyLarge", style = MaterialTheme.typography.bodyLarge)
            Text("labelMedium", style = MaterialTheme.typography.labelMedium)
        }

        HorizontalDivider()

        // ── 4. shapes 访问 ────────────────────────────────────
        // shapes 提供 extraSmall/small/medium/large/extraLarge 五个圆角级别。
        // Material 3 建议不同尺寸的组件使用对应级别的圆角，例如：
        // 小型芯片用 extraSmall，卡片用 medium，底部弹窗用 extraLarge。
        // 统一通过 MaterialTheme.shapes 引用，方便品牌定制时一处修改全局生效。
        SectionLabel("MaterialTheme.shapes 访问")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            listOf(
                MaterialTheme.shapes.extraSmall to "extraSmall",
                MaterialTheme.shapes.medium     to "medium",
                MaterialTheme.shapes.extraLarge to "extraLarge",
            ).forEach { (shape, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(56.dp)
                            .background(MaterialTheme.colorScheme.primary, shape)
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }
    }
}
