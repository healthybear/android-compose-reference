package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.CutCornerShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * Shapes 形状系统演示
 *
 * Compose 中的形状（Shape）不仅影响视觉外观，还决定了触摸涟漪（Ripple）
 * 和裁剪（clip）的边界，因此形状是 UI 交互体验的重要组成部分。
 *
 * 形状的三种来源：
 * 1. MaterialTheme.shapes：主题预定义的五档圆角，推荐优先使用，便于全局统一
 * 2. RoundedCornerShape：圆角矩形，支持 dp 值或百分比，可独立设置每个角
 * 3. CutCornerShape：切角矩形，将圆角替换为直线切角，风格更硬朗
 *
 * 关键 API：
 * - Modifier.background(color, shape)：用形状裁剪背景色
 * - Modifier.clip(shape)：裁剪子内容（如图片圆角）
 * - Modifier.border(width, color, shape)：沿形状边界绘制描边
 *
 * 注意：background 和 clip 都会裁剪内容，但 border 只绘制边框线，
 * 如果需要内容也被裁剪，需要同时使用 clip。
 */
@Composable
fun ShapesDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {

        Text("Shapes 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. MaterialTheme.shapes 五档圆角 ──────────────────
        // Material 3 规范为不同尺寸的组件指定了对应的圆角档位：
        // extraSmall(4dp)：小型组件如 TextField、Snackbar
        // small(8dp)：按钮、卡片内的小元素
        // medium(12dp)：卡片、菜单、对话框
        // large(16dp)：导航抽屉、侧边栏
        // extraLarge(28dp)：底部弹窗、大型卡片
        // 遵循这套规范可以让界面在视觉上保持一致的"圆润感"。
        SectionLabel("MaterialTheme.shapes — 五档圆角")
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            listOf(
                MaterialTheme.shapes.extraSmall to "extraSmall",
                MaterialTheme.shapes.small      to "small",
                MaterialTheme.shapes.medium     to "medium",
                MaterialTheme.shapes.large      to "large",
                MaterialTheme.shapes.extraLarge to "extraLarge",
            ).forEach { (shape, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(52.dp)
                            .background(MaterialTheme.colorScheme.primaryContainer, shape)
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 2. RoundedCornerShape 自定义 ──────────────────────
        // RoundedCornerShape 接受 dp 值或百分比（Int 类型，如 50 表示 50%）。
        // RoundedCornerShape(50) 与 CircleShape 效果相同，但 CircleShape 语义更清晰。
        // 当需要精确控制圆角大小（如品牌规范要求 6dp）时使用此方式。
        SectionLabel("RoundedCornerShape — 自定义圆角")
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            listOf(
                RoundedCornerShape(0.dp)  to "0dp",
                RoundedCornerShape(4.dp)  to "4dp",
                RoundedCornerShape(12.dp) to "12dp",
                RoundedCornerShape(50)    to "50%",
                CircleShape               to "Circle",
            ).forEach { (shape, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(52.dp)
                            .background(MaterialTheme.colorScheme.secondary, shape)
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 3. 各角独立设置 ───────────────────────────────────
        // RoundedCornerShape 支持 topStart/topEnd/bottomStart/bottomEnd 四个角独立设置。
        // 注意使用 Start/End 而非 Left/Right，这样在 RTL（从右到左）语言环境下
        // 形状会自动镜像，无需额外处理国际化适配。
        // 对角圆角（topStart + bottomEnd）常用于聊天气泡等特殊 UI 场景。
        SectionLabel("各角独立圆角")
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            listOf(
                RoundedCornerShape(topStart = 16.dp)                          to "topStart",
                RoundedCornerShape(topEnd = 16.dp)                            to "topEnd",
                RoundedCornerShape(bottomStart = 16.dp)                       to "bottomStart",
                RoundedCornerShape(bottomEnd = 16.dp)                         to "bottomEnd",
                RoundedCornerShape(topStart = 16.dp, bottomEnd = 16.dp)       to "对角",
            ).forEach { (shape, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(52.dp)
                            .background(MaterialTheme.colorScheme.tertiary, shape)
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 4. CutCornerShape ─────────────────────────────────
        // CutCornerShape 将角替换为 45° 斜切线，产生多边形效果。
        // 与 RoundedCornerShape 一样支持四角独立设置。
        // 适合需要"科技感"或"工业风"的 UI 设计，如游戏 UI、数据仪表盘。
        // 注意：切角尺寸过大会让形状看起来像钻石，需要根据组件尺寸调整。
        SectionLabel("CutCornerShape — 切角")
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            listOf(
                CutCornerShape(4.dp)  to "4dp",
                CutCornerShape(8.dp)  to "8dp",
                CutCornerShape(16.dp) to "16dp",
                CutCornerShape(topStart = 16.dp, bottomEnd = 16.dp) to "对角切",
            ).forEach { (shape, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(52.dp)
                            .background(MaterialTheme.colorScheme.errorContainer, shape)
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }

        HorizontalDivider()

        // ── 5. border + shape ─────────────────────────────────
        // Modifier.border 必须传入 shape 参数，否则边框会是矩形而内容是圆角，
        // 导致边框与背景形状不匹配的视觉 bug。
        // 这里展示纯描边（无背景填充）的效果，常用于"轮廓按钮"（OutlinedButton）风格。
        SectionLabel("border 配合 shape")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            listOf(
                RoundedCornerShape(8.dp)  to "rounded",
                CircleShape               to "circle",
                CutCornerShape(8.dp)      to "cut",
            ).forEach { (shape, label) ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(56.dp)
                            .border(2.dp, MaterialTheme.colorScheme.primary, shape)
                    )
                    Text(label, style = MaterialTheme.typography.labelSmall)
                }
            }
        }
    }
}
