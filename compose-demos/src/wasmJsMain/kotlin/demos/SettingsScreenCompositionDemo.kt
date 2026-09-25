package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp

/**
 * SettingsScreenCompositionDemo 演示完整的设置页面场景。
 *
 * 展示如何组合多种组件构建常见的应用设置界面：
 * - ListItem + Switch（开关设置）
 * - ListItem + Slider（数值调节）
 * - ListItem + Dialog（选项选择）
 * - 分组设置项
 * - 用户信息展示
 * - 操作反馈
 *
 * 学习要点：
 * - 设置页面的标准布局模式
 * - 组件之间的数据流转
 * - 用户偏好的状态管理
 * - 对话框与设置项联动
 */
@Composable
fun SettingsScreenCompositionDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("设置页面组合示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("完整设置界面")

        // 设置状态
        var notificationsEnabled by remember { mutableStateOf(true) }
        var soundEnabled by remember { mutableStateOf(true) }
        var vibrationEnabled by remember { mutableStateOf(false) }
        var darkMode by remember { mutableStateOf(false) }
        var autoSync by remember { mutableStateOf(true) }
        var fontSize by remember { mutableStateOf(16f) }
        var cacheSize by remember { mutableStateOf(512f) }

        var selectedLanguage by remember { mutableStateOf("简体中文") }
        var showLanguageDialog by remember { mutableStateOf(false) }

        var selectedTheme by remember { mutableStateOf("跟随系统") }
        var showThemeDialog by remember { mutableStateOf(false) }

        var showAboutDialog by remember { mutableStateOf(false) }
        var showClearCacheDialog by remember { mutableStateOf(false) }

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            LazyColumn(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(600.dp)
            ) {
                // 用户信息头部
                item {
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        colors = CardDefaults.cardColors(
                            containerColor = MaterialTheme.colorScheme.primaryContainer
                        )
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp),
                            horizontalArrangement = Arrangement.spacedBy(16.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(64.dp)
                                    .clip(CircleShape)
                                    .background(MaterialTheme.colorScheme.primary),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    Icons.Filled.Person,
                                    contentDescription = null,
                                    modifier = Modifier.size(36.dp),
                                    tint = MaterialTheme.colorScheme.onPrimary
                                )
                            }
                            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                                Text(
                                    "张三",
                                    style = MaterialTheme.typography.titleMedium
                                )
                                Text(
                                    "zhangsan@example.com",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                                AssistChip(
                                    onClick = { },
                                    label = {
                                        Text(
                                            "编辑资料",
                                            style = MaterialTheme.typography.labelSmall
                                        )
                                    },
                                    modifier = Modifier.height(28.dp)
                                )
                            }
                        }
                    }
                }

                // 通知设置
                item {
                    SettingsSectionHeader("通知")
                }

                item {
                    SettingsItem(
                        icon = Icons.Filled.Notifications,
                        title = "推送通知",
                        subtitle = if (notificationsEnabled) "已开启" else "已关闭",
                        trailing = {
                            Switch(
                                checked = notificationsEnabled,
                                onCheckedChange = { notificationsEnabled = it }
                            )
                        }
                    )
                }

                item {
                    SettingsItem(
                        icon = Icons.Filled.Star,
                        title = "通知声音",
                        subtitle = "来消息时播放声音",
                        enabled = notificationsEnabled,
                        trailing = {
                            Switch(
                                checked = soundEnabled,
                                onCheckedChange = { soundEnabled = it },
                                enabled = notificationsEnabled
                            )
                        }
                    )
                }

                item {
                    SettingsItem(
                        icon = Icons.Filled.Build,
                        title = "振动",
                        subtitle = "来消息时震动提醒",
                        enabled = notificationsEnabled,
                        trailing = {
                            Switch(
                                checked = vibrationEnabled,
                                onCheckedChange = { vibrationEnabled = it },
                                enabled = notificationsEnabled
                            )
                        }
                    )
                }

                // 显示设置
                item {
                    SettingsSectionHeader("显示")
                }

                item {
                    SettingsItem(
                        icon = Icons.Filled.Face,
                        title = "主题",
                        subtitle = selectedTheme,
                        onClick = { showThemeDialog = true }
                    )
                }

                item {
                    SettingsItem(
                        icon = Icons.Filled.DateRange,
                        title = "深色模式",
                        subtitle = "减少眼睛疲劳",
                        trailing = {
                            Switch(
                                checked = darkMode,
                                onCheckedChange = { darkMode = it }
                            )
                        }
                    )
                }

                item {
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp, vertical = 8.dp)
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp),
                            verticalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    "字体大小",
                                    style = MaterialTheme.typography.bodyMedium
                                )
                                Text(
                                    "${fontSize.toInt()} sp",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.primary
                                )
                            }
                            Slider(
                                value = fontSize,
                                onValueChange = { fontSize = it },
                                valueRange = 12f..24f,
                                steps = 5
                            )
                            Text(
                                "预览文字效果",
                                style = MaterialTheme.typography.bodyMedium.copy(
                                    fontSize = androidx.compose.ui.unit.sp(fontSize.toInt())
                                )
                            )
                        }
                    }
                }

                // 数据与存储
                item {
                    SettingsSectionHeader("数据与存储")
                }

                item {
                    SettingsItem(
                        icon = Icons.Filled.Refresh,
                        title = "自动同步",
                        subtitle = "在后台自动同步数据",
                        trailing = {
                            Switch(
                                checked = autoSync,
                                onCheckedChange = { autoSync = it }
                            )
                        }
                    )
                }

                item {
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp, vertical = 8.dp)
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp),
                            verticalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    "缓存大小限制",
                                    style = MaterialTheme.typography.bodyMedium
                                )
                                Text(
                                    "${cacheSize.toInt()} MB",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.primary
                                )
                            }
                            Slider(
                                value = cacheSize,
                                onValueChange = { cacheSize = it },
                                valueRange = 256f..2048f,
                                steps = 6
                            )
                        }
                    }
                }

                item {
                    SettingsItem(
                        icon = Icons.Filled.Delete,
                        title = "清除缓存",
                        subtitle = "已使用 ${(cacheSize * 0.6).toInt()} MB",
                        onClick = { showClearCacheDialog = true }
                    )
                }

                // 通用设置
                item {
                    SettingsSectionHeader("通用")
                }

                item {
                    SettingsItem(
                        icon = Icons.Filled.LocationOn,
                        title = "语言",
                        subtitle = selectedLanguage,
                        onClick = { showLanguageDialog = true }
                    )
                }

                item {
                    SettingsItem(
                        icon = Icons.Filled.Info,
                        title = "关于",
                        subtitle = "版本 1.0.0",
                        onClick = { showAboutDialog = true }
                    )
                }

                item {
                    SettingsItem(
                        icon = Icons.Filled.Email,
                        title = "反馈与建议",
                        subtitle = "帮助我们改进",
                        onClick = { }
                    )
                }

                // 底部间距
                item {
                    Spacer(Modifier.height(16.dp))
                }
            }
        }

        // 语言选择对话框
        if (showLanguageDialog) {
            val languages = listOf("简体中文", "English", "日本語", "한국어")
            AlertDialog(
                onDismissRequest = { showLanguageDialog = false },
                title = { Text("选择语言") },
                text = {
                    Column {
                        languages.forEach { lang ->
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable {
                                        selectedLanguage = lang
                                        showLanguageDialog = false
                                    }
                                    .padding(vertical = 12.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                RadioButton(
                                    selected = lang == selectedLanguage,
                                    onClick = {
                                        selectedLanguage = lang
                                        showLanguageDialog = false
                                    }
                                )
                                Spacer(Modifier.width(8.dp))
                                Text(lang)
                            }
                        }
                    }
                },
                confirmButton = {
                    TextButton(onClick = { showLanguageDialog = false }) {
                        Text("取消")
                    }
                }
            )
        }

        // 主题选择对话框
        if (showThemeDialog) {
            val themes = listOf("跟随系统", "浅色模式", "深色模式")
            AlertDialog(
                onDismissRequest = { showThemeDialog = false },
                title = { Text("选择主题") },
                text = {
                    Column {
                        themes.forEach { theme ->
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable {
                                        selectedTheme = theme
                                        showThemeDialog = false
                                    }
                                    .padding(vertical = 12.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                RadioButton(
                                    selected = theme == selectedTheme,
                                    onClick = {
                                        selectedTheme = theme
                                        showThemeDialog = false
                                    }
                                )
                                Spacer(Modifier.width(8.dp))
                                Text(theme)
                            }
                        }
                    }
                },
                confirmButton = {
                    TextButton(onClick = { showThemeDialog = false }) {
                        Text("取消")
                    }
                }
            )
        }

        // 清除缓存确认对话框
        if (showClearCacheDialog) {
            AlertDialog(
                onDismissRequest = { showClearCacheDialog = false },
                icon = { Icon(Icons.Filled.Delete, contentDescription = null) },
                title = { Text("清除缓存") },
                text = { Text("确定要清除应用缓存吗？这不会删除您的个人数据。") },
                confirmButton = {
                    Button(onClick = { showClearCacheDialog = false }) {
                        Text("清除")
                    }
                },
                dismissButton = {
                    TextButton(onClick = { showClearCacheDialog = false }) {
                        Text("取消")
                    }
                }
            )
        }

        // 关于对话框
        if (showAboutDialog) {
            AlertDialog(
                onDismissRequest = { showAboutDialog = false },
                icon = {
                    Icon(
                        Icons.Filled.Info,
                        contentDescription = null,
                        modifier = Modifier.size(48.dp),
                        tint = MaterialTheme.colorScheme.primary
                    )
                },
                title = { Text("关于应用") },
                text = {
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Text("版本：1.0.0")
                        Text("构建号：20260101")
                        HorizontalDivider()
                        Text(
                            "这是一个演示应用，展示 Jetpack Compose 组件的组合使用。",
                            style = MaterialTheme.typography.bodySmall
                        )
                    }
                },
                confirmButton = {
                    Button(onClick = { showAboutDialog = false }) {
                        Text("确定")
                    }
                }
            )
        }
    }
}

@Composable
private fun SettingsSectionHeader(title: String) {
    Text(
        title,
        style = MaterialTheme.typography.titleSmall,
        color = MaterialTheme.colorScheme.primary,
        modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
    )
}

@Composable
private fun SettingsItem(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    title: String,
    subtitle: String,
    enabled: Boolean = true,
    onClick: (() -> Unit)? = null,
    trailing: @Composable (() -> Unit)? = null
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 4.dp)
            .then(
                if (onClick != null) Modifier.clickable(enabled = enabled) { onClick() }
                else Modifier
            ),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                icon,
                contentDescription = null,
                tint = if (enabled)
                    MaterialTheme.colorScheme.primary
                else
                    MaterialTheme.colorScheme.outline
            )
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                Text(
                    title,
                    style = MaterialTheme.typography.bodyMedium,
                    color = if (enabled)
                        MaterialTheme.colorScheme.onSurface
                    else
                        MaterialTheme.colorScheme.outline
                )
                Text(
                    subtitle,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            if (trailing != null) {
                trailing()
            } else if (onClick != null) {
                Icon(
                    Icons.Filled.KeyboardArrowRight,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.outline
                )
            }
        }
    }
}
