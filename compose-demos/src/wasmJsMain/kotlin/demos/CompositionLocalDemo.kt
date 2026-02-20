package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// ── CompositionLocal 定义 ─────────────────────────────────
private val LocalAccentColor = compositionLocalOf { Color(0xFF6750A4) }
private val LocalCardElevation = compositionLocalOf { 4.dp }
private val LocalUserName = compositionLocalOf { "访客" }

/**
 * CompositionLocalDemo 演示 CompositionLocal 的隐式参数传递机制。
 *
 * CompositionLocal 允许在组合树中"隐式"地向下传递数据，
 * 无需通过每一层函数参数显式传递（避免 prop drilling）。
 *
 * 两种创建方式：
 * - `compositionLocalOf { defaultValue }` — 值变化时只重组读取该值的组件（推荐）
 * - `staticCompositionLocalOf { defaultValue }` — 值变化时重组整个 Provider 子树
 *   （适合极少变化的值，如字体、屏幕方向）
 *
 * 使用模式：
 * 1. 在文件顶层声明 `val LocalXxx = compositionLocalOf { defaultValue }`
 * 2. 用 `CompositionLocalProvider(LocalXxx provides value) { ... }` 提供值
 * 3. 在子组件中用 `LocalXxx.current` 读取当前值
 *
 * 典型用途：主题颜色、字体、语言、当前用户信息、依赖注入。
 */
@Composable
fun CompositionLocalDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("CompositionLocal 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础用法 ───────────────────────────────────────
        SectionLabel("基础用法（CompositionLocalProvider）")
        var accentColor by remember { mutableStateOf(Color(0xFF6750A4)) }

        val colorOptions = listOf(
            "紫色" to Color(0xFF6750A4),
            "绿色" to Color(0xFF386A20),
            "橙色" to Color(0xFFBF360C),
            "蓝色" to Color(0xFF0061A4)
        )

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                colorOptions.forEach { (name, color) ->
                    FilterChip(
                        selected = accentColor == color,
                        onClick = { accentColor = color },
                        label = { Text(name) }
                    )
                }
            }

            CompositionLocalProvider(LocalAccentColor provides accentColor) {
                AccentColorCard("外层卡片")
                CompositionLocalProvider(LocalAccentColor provides Color(0xFF006874)) {
                    AccentColorCard("内层覆盖（青色）")
                }
            }
        }

        HorizontalDivider()

        // ── 2. 多值传递 ───────────────────────────────────────
        SectionLabel("多值同时传递")
        var userName by remember { mutableStateOf("Alice") }

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                listOf("Alice", "Bob", "Charlie").forEach { name ->
                    FilterChip(
                        selected = userName == name,
                        onClick = { userName = name },
                        label = { Text(name) }
                    )
                }
            }

            CompositionLocalProvider(
                LocalUserName provides userName,
                LocalCardElevation provides 8.dp,
                LocalAccentColor provides Color(0xFF006874)
            ) {
                UserInfoCard()
            }
        }

        HorizontalDivider()

        // ── 3. staticCompositionLocalOf ──────────────────────
        SectionLabel("staticCompositionLocalOf vs compositionLocalOf")
        Column(
            modifier = Modifier.fillMaxWidth()
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                .padding(12.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Box(
                    modifier = Modifier.weight(1f)
                        .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(6.dp))
                        .padding(8.dp)
                ) {
                    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text("compositionLocalOf", style = MaterialTheme.typography.labelMedium,
                            color = MaterialTheme.colorScheme.primary)
                        Text("• 值变化时只重组读取该值的组件\n• 适合频繁变化的值",
                            style = MaterialTheme.typography.labelSmall)
                    }
                }
                Box(
                    modifier = Modifier.weight(1f)
                        .background(MaterialTheme.colorScheme.secondaryContainer, RoundedCornerShape(6.dp))
                        .padding(8.dp)
                ) {
                    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text("staticCompositionLocalOf", style = MaterialTheme.typography.labelMedium,
                            color = MaterialTheme.colorScheme.secondary)
                        Text("• 值变化时重组整个 Provider 子树\n• 适合很少变化的值",
                            style = MaterialTheme.typography.labelSmall)
                    }
                }
            }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• CompositionLocal 实现隐式参数传递，避免 prop drilling\n" +
            "• CompositionLocalProvider 覆盖指定范围内的值\n" +
            "• 典型用途：主题、语言、用户信息、依赖注入",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

@Composable
private fun AccentColorCard(title: String) {
    val color = LocalAccentColor.current
    Box(
        modifier = Modifier.fillMaxWidth().height(56.dp)
            .background(color.copy(alpha = 0.15f), RoundedCornerShape(8.dp))
            .padding(horizontal = 12.dp),
        contentAlignment = Alignment.CenterStart
    ) {
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(modifier = Modifier.size(16.dp).background(color, RoundedCornerShape(4.dp)))
            Text(title, style = MaterialTheme.typography.bodyMedium)
            Text("LocalAccentColor = $color", style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant, fontSize = 10.sp)
        }
    }
}

@Composable
private fun UserInfoCard() {
    val name = LocalUserName.current
    val elevation = LocalCardElevation.current
    val accent = LocalAccentColor.current
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = elevation)
    ) {
        Row(
            modifier = Modifier.padding(12.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier.size(40.dp).background(accent, RoundedCornerShape(20.dp)),
                contentAlignment = Alignment.Center
            ) {
                Text(name.first().toString(), color = Color.White,
                    style = MaterialTheme.typography.titleMedium)
            }
            Column {
                Text(name, style = MaterialTheme.typography.titleSmall)
                Text("elevation=${elevation}", style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
    }
}
