package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * PermanentNavigationDrawerDemo 演示 Material3 PermanentNavigationDrawer 的用法。
 *
 * PermanentNavigationDrawer 是常驻侧边栏，始终可见，不需要手势触发，
 * 适合平板、桌面端等宽屏设备的导航布局。
 *
 * 与 ModalNavigationDrawer 的区别：
 * - ModalNavigationDrawer：模态，需要手势/按钮触发，有遮罩层，适合手机
 * - PermanentNavigationDrawer：常驻，始终显示，占用固定宽度，适合宽屏
 *
 * 核心参数：
 * - `drawerContent`：侧边栏内容插槽（通常是 PermanentDrawerSheet + NavigationDrawerItem 列表）
 * - `content`：主内容区域，与侧边栏并排显示
 *
 * 响应式布局建议：
 * 使用 BoxWithConstraints 检测屏幕宽度，宽屏用 PermanentNavigationDrawer，
 * 窄屏用 ModalNavigationDrawer，实现自适应导航。
 */
@Composable
fun PermanentNavigationDrawerDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("PermanentNavigationDrawer 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("说明")
        Text(
            "PermanentNavigationDrawer 常驻显示，不可收起，适合宽屏/平板布局。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        HorizontalDivider()

        SectionLabel("常驻侧边栏")
        val navItems = listOf(
            Icons.Filled.Home        to "首页",
            Icons.Filled.Search      to "搜索",
            Icons.Filled.Favorite    to "收藏",
            Icons.Filled.Notifications to "通知",
            Icons.Filled.Settings    to "设置",
        )
        var selectedItem by remember { mutableStateOf("首页") }

        PermanentNavigationDrawer(
            drawerContent = {
                PermanentDrawerSheet(modifier = Modifier.width(220.dp)) {
                    Spacer(Modifier.height(12.dp))
                    Text(
                        "应用名称",
                        style = MaterialTheme.typography.titleMedium,
                        modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
                    )
                    HorizontalDivider()
                    navItems.forEach { (icon, label) ->
                        NavigationDrawerItem(
                            icon = { Icon(icon, contentDescription = null) },
                            label = { Text(label) },
                            selected = label == selectedItem,
                            onClick = { selectedItem = label }
                        )
                    }
                }
            }
        ) {
            // 主内容区
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text("当前页面：$selectedItem", style = MaterialTheme.typography.titleMedium)
                Text(
                    "侧边栏始终可见，点击菜单项切换内容区。",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        HorizontalDivider()

        // ── NavigationRail（竖向导航栏）──────────────────────
        SectionLabel("NavigationRail — 竖向导航栏")
        Text(
            "NavigationRail 是介于 NavigationBar 和 Drawer 之间的选项，适合中等宽度屏幕。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        var selectedRail by remember { mutableStateOf(0) }
        Row(modifier = Modifier.height(200.dp)) {
            NavigationRail {
                navItems.forEachIndexed { i, (icon, label) ->
                    NavigationRailItem(
                        selected = i == selectedRail,
                        onClick = { selectedRail = i },
                        icon = { Icon(icon, contentDescription = label) },
                        label = { Text(label) }
                    )
                }
            }
            Box(
                modifier = Modifier.fillMaxSize().padding(16.dp)
            ) {
                Text("当前：${navItems[selectedRail].second}", style = MaterialTheme.typography.bodyMedium)
            }
        }
    }
}
