package demos

import androidx.compose.animation.Crossfade
import androidx.compose.animation.core.tween
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
 * CrossfadeDemo 演示 Crossfade 的交叉淡入淡出切换效果。
 *
 * Crossfade 是 AnimatedContent 的简化版，专注于淡入淡出切换，
 * 当 targetState 变化时，旧内容淡出的同时新内容淡入。
 *
 * 核心参数：
 * - `targetState`：驱动内容切换的状态
 * - `animationSpec`：控制淡入淡出的时间曲线（默认 tween(300)）
 * - `label`：调试标签
 * - content lambda 接收当前正在渲染的状态值（动画期间可能是旧值或新值）
 *
 * Crossfade vs AnimatedContent：
 * - Crossfade：只支持淡入淡出，代码更简洁，语义更清晰
 * - AnimatedContent：支持自定义方向性动画（滑入滑出等），功能更强大
 * - 只需要淡入淡出时，优先使用 Crossfade
 *
 * 典型用途：图片切换、页面切换、图标状态切换。
 */
@Composable
fun CrossfadeDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("Crossfade 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础淡入淡出切换 ───────────────────────────────
        SectionLabel("基础 Crossfade")
        var screen by remember { mutableStateOf("首页") }
        val screens = listOf("首页", "搜索", "收藏", "我的")

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                screens.forEach { s ->
                    FilterChip(
                        selected = s == screen,
                        onClick = { screen = s },
                        label = { Text(s) }
                    )
                }
            }
            Crossfade(targetState = screen, label = "screen") { current ->
                Box(
                    modifier = Modifier.fillMaxWidth().height(80.dp)
                        .background(
                            when (current) {
                                "首页" -> MaterialTheme.colorScheme.primaryContainer
                                "搜索" -> MaterialTheme.colorScheme.secondaryContainer
                                "收藏" -> MaterialTheme.colorScheme.tertiaryContainer
                                else   -> MaterialTheme.colorScheme.errorContainer
                            },
                            RoundedCornerShape(8.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            when (current) {
                                "首页" -> Icons.Filled.Home
                                "搜索" -> Icons.Filled.Search
                                "收藏" -> Icons.Filled.Favorite
                                else   -> Icons.Filled.Person
                            },
                            contentDescription = null
                        )
                        Text(current, style = MaterialTheme.typography.titleMedium)
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 2. 自定义动画时长 ─────────────────────────────────
        SectionLabel("自定义 animationSpec（慢速 800ms）")
        var slowScreen by remember { mutableStateOf(true) }
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { slowScreen = !slowScreen }) { Text("切换") }
            Crossfade(
                targetState = slowScreen,
                animationSpec = tween(800),
                label = "slow_crossfade"
            ) { isA ->
                Box(
                    modifier = Modifier.fillMaxWidth().height(60.dp)
                        .background(
                            if (isA) MaterialTheme.colorScheme.primaryContainer
                            else MaterialTheme.colorScheme.secondaryContainer,
                            RoundedCornerShape(8.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text(if (isA) "状态 A" else "状态 B", style = MaterialTheme.typography.titleMedium)
                }
            }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• Crossfade 是 AnimatedContent 的简化版，专注于淡入淡出切换\n" +
            "• 适合图片、页面、图标等内容的平滑切换\n" +
            "• 比 AnimatedContent 代码更简洁，但不支持方向性动画",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        HorizontalDivider()

        // ── 3. 实际场景：主题切换预览 ─────────────────────────
        SectionLabel("场景示例：主题切换预览")

        var selectedTheme by remember { mutableStateOf("Light") }
        val themes = listOf("Light", "Dark", "Auto")

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(
                    "选择主题",
                    style = MaterialTheme.typography.titleSmall
                )

                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    themes.forEach { theme ->
                        FilterChip(
                            selected = theme == selectedTheme,
                            onClick = { selectedTheme = theme },
                            label = { Text(theme) },
                            leadingIcon = {
                                Icon(
                                    when (theme) {
                                        "Light" -> Icons.Filled.Star
                                        "Dark" -> Icons.Filled.Face
                                        else -> Icons.Filled.Build
                                    },
                                    contentDescription = null,
                                    modifier = Modifier.size(16.dp)
                                )
                            }
                        )
                    }
                }

                Crossfade(
                    targetState = selectedTheme,
                    animationSpec = tween(400),
                    label = "theme_preview"
                ) { theme ->
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(
                            containerColor = when (theme) {
                                "Light" -> androidx.compose.ui.graphics.Color(0xFFF5F5F5)
                                "Dark" -> androidx.compose.ui.graphics.Color(0xFF212121)
                                else -> MaterialTheme.colorScheme.surface
                            }
                        )
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp),
                            verticalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Text(
                                "预览效果",
                                style = MaterialTheme.typography.bodyLarge,
                                color = when (theme) {
                                    "Light" -> androidx.compose.ui.graphics.Color.Black
                                    "Dark" -> androidx.compose.ui.graphics.Color.White
                                    else -> MaterialTheme.colorScheme.onSurface
                                }
                            )
                            Text(
                                when (theme) {
                                    "Light" -> "浅色主题 - 适合白天使用"
                                    "Dark" -> "深色主题 - 减少眼睛疲劳"
                                    else -> "自动主题 - 跟随系统设置"
                                },
                                style = MaterialTheme.typography.bodySmall,
                                color = when (theme) {
                                    "Light" -> androidx.compose.ui.graphics.Color.Gray
                                    "Dark" -> androidx.compose.ui.graphics.Color.LightGray
                                    else -> MaterialTheme.colorScheme.onSurfaceVariant
                                }
                            )
                        }
                    }
                }
            }
        }

        HorizontalDivider()

        // ── 4. 实际场景：图片轮播 ─────────────────────────────
        SectionLabel("场景示例：图片轮播切换")

        data class ImageSlide(
            val title: String,
            val description: String,
            val color: androidx.compose.ui.graphics.Color
        )

        val slides = listOf(
            ImageSlide("风景图片 1", "美丽的山川河流", androidx.compose.ui.graphics.Color(0xFF42A5F5)),
            ImageSlide("风景图片 2", "壮观的日落景色", androidx.compose.ui.graphics.Color(0xFFEF5350)),
            ImageSlide("风景图片 3", "宁静的森林小径", androidx.compose.ui.graphics.Color(0xFF66BB6A))
        )

        var currentSlide by remember { mutableStateOf(0) }

        LaunchedEffect(Unit) {
            while (true) {
                kotlinx.coroutines.delay(3000)
                currentSlide = (currentSlide + 1) % slides.size
            }
        }

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Crossfade(
                    targetState = currentSlide,
                    animationSpec = tween(600),
                    label = "image_slider"
                ) { index ->
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(180.dp)
                            .background(
                                slides[index].color,
                                RoundedCornerShape(12.dp)
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Icon(
                                Icons.Filled.Info,
                                contentDescription = null,
                                modifier = Modifier.size(48.dp),
                                tint = androidx.compose.ui.graphics.Color.White
                            )
                            Text(
                                slides[index].title,
                                style = MaterialTheme.typography.titleMedium,
                                color = androidx.compose.ui.graphics.Color.White
                            )
                            Text(
                                slides[index].description,
                                style = MaterialTheme.typography.bodySmall,
                                color = androidx.compose.ui.graphics.Color.White.copy(alpha = 0.8f)
                            )
                        }
                    }
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        slides.forEachIndexed { index, _ ->
                            Box(
                                modifier = Modifier
                                    .size(if (index == currentSlide) 24.dp else 8.dp, 8.dp)
                                    .background(
                                        if (index == currentSlide)
                                            MaterialTheme.colorScheme.primary
                                        else
                                            MaterialTheme.colorScheme.outline.copy(alpha = 0.3f),
                                        RoundedCornerShape(4.dp)
                                    )
                            )
                        }
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        IconButton(
                            onClick = {
                                currentSlide = if (currentSlide > 0) currentSlide - 1 else slides.size - 1
                            }
                        ) {
                            Icon(Icons.Filled.ArrowBack, contentDescription = "上一张")
                        }
                        IconButton(
                            onClick = {
                                currentSlide = (currentSlide + 1) % slides.size
                            }
                        ) {
                            Icon(Icons.Filled.ArrowForward, contentDescription = "下一张")
                        }
                    }
                }

                Text(
                    "每 3 秒自动切换",
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}
