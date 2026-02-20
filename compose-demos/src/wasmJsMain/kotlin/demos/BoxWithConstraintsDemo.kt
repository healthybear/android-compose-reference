package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * BoxWithConstraintsDemo 演示了如何利用 BoxWithConstraints 实现响应式布局。
 *
 * BoxWithConstraints 是 Box 的增强版本，它在布局阶段将父容器的约束信息
 *（maxWidth、maxHeight、minWidth、minHeight）暴露给子 Composable，
 * 使开发者可以根据可用空间动态决定布局结构。
 *
 * 核心价值：
 *  - 在同一个 Composable 中根据屏幕/容器宽度切换单列/多列布局
 *  - 比 WindowSizeClass 更细粒度，适合组件级别的自适应
 *  - 避免在父层传递尺寸参数，让组件自身感知约束
 *
 * 注意：BoxWithConstraints 会触发子树的重新测量，性能开销略高于普通 Box，
 * 仅在真正需要响应式布局时使用。
 */
@Composable
fun BoxWithConstraintsDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("BoxWithConstraints 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("根据 maxWidth 切换布局")
        Text(
            "BoxWithConstraints 可在 Composable 内读取父容器约束，实现响应式布局。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        HorizontalDivider()

        // ── 宽容器：双列布局 ──────────────────────────────────
        // fillMaxWidth 让 BoxWithConstraints 撑满父容器，maxWidth 即为屏幕/父容器宽度。
        // 当 maxWidth >= 400.dp 时切换为 Row（水平排列），充分利用宽屏空间。
        // 否则降级为 Column（垂直排列），保证窄屏下的可读性。
        SectionLabel("宽容器（maxWidth ≥ 400 dp）→ 双列")
        BoxWithConstraints(modifier = Modifier.fillMaxWidth()) {
            if (maxWidth >= 400.dp) {
                Row(
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    repeat(4) { i ->
                        Box(
                            modifier = Modifier
                                .weight(1f)
                                .height(60.dp)
                                .background(
                                    listOf(
                                        MaterialTheme.colorScheme.primaryContainer,
                                        MaterialTheme.colorScheme.secondaryContainer,
                                        MaterialTheme.colorScheme.tertiaryContainer,
                                        MaterialTheme.colorScheme.errorContainer,
                                    )[i],
                                    RoundedCornerShape(8.dp)
                                ),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("Item ${i + 1}", style = MaterialTheme.typography.labelMedium)
                        }
                    }
                }
            } else {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    repeat(4) { i ->
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(40.dp)
                                .background(
                                    listOf(
                                        MaterialTheme.colorScheme.primaryContainer,
                                        MaterialTheme.colorScheme.secondaryContainer,
                                        MaterialTheme.colorScheme.tertiaryContainer,
                                        MaterialTheme.colorScheme.errorContainer,
                                    )[i],
                                    RoundedCornerShape(8.dp)
                                ),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("Item ${i + 1}", style = MaterialTheme.typography.labelMedium)
                        }
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 窄容器：强制单列 ──────────────────────────────────
        // 通过 Modifier.width(240.dp) 人为限制容器宽度，模拟窄屏场景。
        // 此时 maxWidth = 240.dp < 400.dp，条件分支进入 Column 路径。
        // 文字中直接插值 $maxWidth 可帮助开发者在调试时直观看到实际约束值。
        SectionLabel("窄容器（maxWidth < 400 dp）→ 单列")
        BoxWithConstraints(
            modifier = Modifier.width(240.dp)
        ) {
            if (maxWidth >= 400.dp) {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    repeat(4) { i ->
                        Box(
                            modifier = Modifier
                                .weight(1f)
                                .height(40.dp)
                                .background(
                                    MaterialTheme.colorScheme.primaryContainer,
                                    RoundedCornerShape(8.dp)
                                ),
                            contentAlignment = Alignment.Center
                        ) { Text("Item ${i + 1}", style = MaterialTheme.typography.labelSmall) }
                    }
                }
            } else {
                val currentMaxWidth = maxWidth
                Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    repeat(4) { i ->
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(32.dp)
                                .background(
                                    listOf(
                                        MaterialTheme.colorScheme.primaryContainer,
                                        MaterialTheme.colorScheme.secondaryContainer,
                                        MaterialTheme.colorScheme.tertiaryContainer,
                                        MaterialTheme.colorScheme.errorContainer,
                                    )[i],
                                    RoundedCornerShape(8.dp)
                                ),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                "Item ${i + 1}（maxWidth = $currentMaxWidth）",
                                style = MaterialTheme.typography.labelSmall
                            )
                        }
                    }
                }
            }
        }
    }
}
