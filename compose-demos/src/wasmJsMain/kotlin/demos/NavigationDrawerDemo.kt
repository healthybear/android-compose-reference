package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * NavigationDrawerDemo 演示 Material3 ModalNavigationDrawer 的用法。
 *
 * ModalNavigationDrawer 是模态侧边抽屉，点击菜单图标时从左侧滑入，
 * 点击遮罩层或关闭按钮时收起，适合移动端的主导航场景。
 *
 * 核心 API：
 * - [ModalNavigationDrawer]：抽屉容器，`drawerContent` 插槽放置导航内容
 * - [DrawerState] / [rememberDrawerState]：控制抽屉开关状态
 *   - `drawerState.open()` / `drawerState.close()`：挂起函数，带动画
 *   - `drawerState.isOpen` / `drawerState.isClosed`：当前状态
 * - [ModalDrawerSheet]：抽屉内容的标准容器，提供正确的宽度和背景
 * - [NavigationDrawerItem]：抽屉内的导航项，支持 selected 高亮状态
 *
 * 注意：open/close 是挂起函数，需要在协程中调用（rememberCoroutineScope）。
 */
@Composable
fun NavigationDrawerDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("NavigationDrawer 示例", style = MaterialTheme.typography.titleMedium)

        // ── ModalNavigationDrawer ─────────────────────────────
        SectionLabel("ModalNavigationDrawer — 侧边抽屉")
        val drawerState = rememberDrawerState(DrawerValue.Closed)
        var selectedItem by remember { mutableStateOf("首页") }

        val navItems = listOf(
            Icons.Filled.Home        to "首页",
            Icons.Filled.Search      to "搜索",
            Icons.Filled.Favorite    to "收藏",
            Icons.Filled.Notifications to "通知",
            Icons.Filled.Settings    to "设置",
        )

        ModalNavigationDrawer(
            drawerState = drawerState,
            drawerContent = {
                ModalDrawerSheet {
                    Spacer(Modifier.height(12.dp))
                    Text(
                        "导航菜单",
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
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Button(onClick = {
                    // drawerState.open() 是 suspend，需要 coroutineScope
                }) { Text("（在真实场景中点击汉堡菜单打开抽屉）") }
                Text(
                    "当前选中：$selectedItem",
                    style = MaterialTheme.typography.bodyMedium
                )
                Text(
                    "注意：ModalNavigationDrawer 需要配合 coroutineScope.launch { drawerState.open() } 使用。\n" +
                    "在此 Demo 中抽屉内容已展开显示在下方。",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        HorizontalDivider()

        // ── 抽屉内容单独展示 ──────────────────────────────────
        SectionLabel("DrawerSheet 内容预览")
        ModalDrawerSheet(modifier = Modifier.width(280.dp)) {
            Spacer(Modifier.height(12.dp))
            Text(
                "应用名称",
                style = MaterialTheme.typography.titleLarge,
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
        Text("当前选中：$selectedItem", style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}
