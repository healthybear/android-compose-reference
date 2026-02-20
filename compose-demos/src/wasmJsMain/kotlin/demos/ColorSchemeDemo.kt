package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

/**
 * ColorScheme 颜色方案演示
 *
 * Material Design 3 的 ColorScheme 包含 30 个颜色角色，每个角色都有明确的语义。
 * 核心设计原则：每种"容器色"都有对应的"on色"作为其上方内容的前景色，
 * 例如 primary（按钮背景）搭配 onPrimary（按钮文字），保证无障碍对比度。
 *
 * 颜色角色分组：
 * - 主色系（primary）：品牌主色，用于最重要的交互元素
 * - 次色系（secondary）：辅助色，用于次要操作和信息强调
 * - 第三色系（tertiary）：点缀色，用于对比性的强调元素
 * - 错误色（error）：专用于错误状态，不应挪作他用
 * - 背景/表面（background/surface）：页面底层和卡片层的颜色
 * - 轮廓（outline）：分割线、边框等描边元素
 *
 * 学习要点：始终用语义化颜色名称而非硬编码颜色值，
 * 这样亮色/暗色主题切换时无需修改任何业务代码。
 */
@Composable
fun ColorSchemeDemo() {
    val cs = MaterialTheme.colorScheme

    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("ColorScheme 示例", style = MaterialTheme.typography.titleMedium)

        // ── 主色系 ────────────────────────────────────────────
        // primary 是品牌最核心的颜色，通常用于 FAB、主要按钮、选中状态等。
        // primaryContainer 比 primary 更柔和，适合作为芯片、标签的背景。
        // 规律：xxxContainer 颜色比 xxx 更浅（亮色模式），视觉层级更低。
        SectionLabel("主色系")
        ColorGroup(
            listOf(
                cs.primary         to "primary"         to cs.onPrimary,
                cs.onPrimary       to "onPrimary"       to cs.primary,
                cs.primaryContainer to "primaryContainer" to cs.onPrimaryContainer,
                cs.onPrimaryContainer to "onPrimaryContainer" to cs.primaryContainer,
            )
        )

        // ── 次色系 ────────────────────────────────────────────
        // secondary 用于次要操作，与 primary 形成视觉层级区分。
        // 典型用途：过滤器芯片、次要按钮、辅助信息高亮。
        // 在同一界面中，primary 和 secondary 不应同时大面积使用，避免视觉混乱。
        SectionLabel("次色系")
        ColorGroup(
            listOf(
                cs.secondary         to "secondary"         to cs.onSecondary,
                cs.onSecondary       to "onSecondary"       to cs.secondary,
                cs.secondaryContainer to "secondaryContainer" to cs.onSecondaryContainer,
                cs.onSecondaryContainer to "onSecondaryContainer" to cs.secondaryContainer,
            )
        )

        // ── 第三色系 ──────────────────────────────────────────
        // tertiary 是可选的点缀色，用于与主次色形成对比的强调元素。
        // 例如：日历中标记特殊日期、进度条的完成部分、徽章等。
        // 如果品牌色只有一种，tertiary 可以设置为与 primary 互补的颜色。
        SectionLabel("第三色系")
        ColorGroup(
            listOf(
                cs.tertiary         to "tertiary"         to cs.onTertiary,
                cs.onTertiary       to "onTertiary"       to cs.tertiary,
                cs.tertiaryContainer to "tertiaryContainer" to cs.onTertiaryContainer,
                cs.onTertiaryContainer to "onTertiaryContainer" to cs.tertiaryContainer,
            )
        )

        // ── 错误色 ────────────────────────────────────────────
        // error 颜色组专门用于表示错误、危险、破坏性操作。
        // 不要将 error 颜色用于非错误场景（如警告用 tertiary，成功用自定义颜色），
        // 保持 error 的语义纯粹性，有助于用户快速识别问题所在。
        SectionLabel("错误色")
        ColorGroup(
            listOf(
                cs.error         to "error"         to cs.onError,
                cs.onError       to "onError"       to cs.error,
                cs.errorContainer to "errorContainer" to cs.onErrorContainer,
                cs.onErrorContainer to "onErrorContainer" to cs.errorContainer,
            )
        )

        // ── 背景 & 表面 ───────────────────────────────────────
        // background 是页面最底层的颜色，surface 是卡片、对话框等浮层的颜色。
        // surfaceVariant 比 surface 略有色调，用于需要与 surface 区分的区域（如输入框背景）。
        // 注意：这些颜色在亮色模式下接近白色，需要加边框才能看清边界（showBorder=true）。
        SectionLabel("背景 & 表面")
        ColorGroup(
            listOf(
                cs.background    to "background"    to cs.onBackground,
                cs.onBackground  to "onBackground"  to cs.background,
                cs.surface       to "surface"       to cs.onSurface,
                cs.onSurface     to "onSurface"     to cs.surface,
                cs.surfaceVariant to "surfaceVariant" to cs.onSurfaceVariant,
                cs.onSurfaceVariant to "onSurfaceVariant" to cs.surfaceVariant,
            ),
            showBorder = true
        )

        // ── 轮廓 ──────────────────────────────────────────────
        // outline 用于需要强调的边框（如输入框、卡片边框）。
        // outlineVariant 更淡，用于装饰性分割线（如列表分隔线 HorizontalDivider）。
        // 两者的区别：outline 有功能性意义，outlineVariant 仅作视觉辅助。
        SectionLabel("轮廓")
        ColorGroup(
            listOf(
                cs.outline        to "outline"        to cs.background,
                cs.outlineVariant to "outlineVariant" to cs.onBackground,
            ),
            showBorder = true
        )
    }
}

@Composable
private fun ColorGroup(
    items: List<Pair<Pair<Color, String>, Color>>,
    showBorder: Boolean = false
) {
    // 每行 2 个
    items.chunked(2).forEach { row ->
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            row.forEach { (colorLabel, textColor) ->
                val (color, label) = colorLabel
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(48.dp)
                        .background(color, RoundedCornerShape(6.dp))
                        .then(
                            if (showBorder)
                                Modifier.border(1.dp, MaterialTheme.colorScheme.outline, RoundedCornerShape(6.dp))
                            else Modifier
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        label,
                        style = MaterialTheme.typography.labelSmall,
                        color = textColor
                    )
                }
            }
        }
    }
}
