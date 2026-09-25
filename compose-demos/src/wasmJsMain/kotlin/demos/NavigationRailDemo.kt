package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * NavigationRailDemo 演示 Material3 NavigationRail 的用法。
 *
 * NavigationRail 是侧边导航栏，适合平板或大屏设备的垂直导航。
 *
 * 核心参数：
 * - `header`：顶部可选的 FAB 或 logo
 * - NavigationRailItem：导航项
 *   - `selected`：是否选中
 *   - `onClick`：点击回调
 *   - `icon`：图标
 *   - `label`：标签文字
 *
 * 使用场景：
 * - 平板或大屏设备
 * - 需要持久显示的导航
 * - 3-7 个主要导航项
 */
@Composable
fun NavigationRailDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("NavigationRail 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("基础用法")

        var selectedItem by remember { mutableStateOf(0) }
        val items = listOf(
            "首页" to Icons.Filled.Home,
            "搜索" to Icons.Filled.Search,
            "收藏" to Icons.Filled.Favorite,
            "设置" to Icons.Filled.Settings
        )

        Row(modifier = Modifier.height(400.dp)) {
            NavigationRail {
                items.forEachIndexed { index, (label, icon) ->
                    NavigationRailItem(
                        icon = { Icon(icon, contentDescription = label) },
                        label = { Text(label) },
                        selected = selectedItem == index,
                        onClick = { selectedItem = index }
                    )
                }
            }

            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    "已选择：${items[selectedItem].first}",
                    style = MaterialTheme.typography.headlineSmall
                )
            }
        }

        HorizontalDivider()

        SectionLabel("带 FAB 的 NavigationRail")

        var selectedItem2 by remember { mutableStateOf(0) }

        Row(modifier = Modifier.height(400.dp)) {
            NavigationRail(
                header = {
                    FloatingActionButton(
                        onClick = {},
                        modifier = Modifier.padding(vertical = 12.dp)
                    ) {
                        Icon(Icons.Filled.Add, contentDescription = "添加")
                    }
                }
            ) {
                items.take(3).forEachIndexed { index, (label, icon) ->
                    NavigationRailItem(
                        icon = { Icon(icon, contentDescription = label) },
                        label = { Text(label) },
                        selected = selectedItem2 == index,
                        onClick = { selectedItem2 = index }
                    )
                }
            }

            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    "当前页面：${items[selectedItem2].first}",
                    style = MaterialTheme.typography.bodyLarge
                )
            }
        }
    }
}
