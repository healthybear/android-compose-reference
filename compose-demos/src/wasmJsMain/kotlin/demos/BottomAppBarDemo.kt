package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun BottomAppBarDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("BottomAppBar 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础 BottomAppBar ──────────────────────────────
        SectionLabel("基础 BottomAppBar")
        BottomAppBar(
            actions = {
                IconButton(onClick = {}) { Icon(Icons.Filled.Home, contentDescription = "首页") }
                IconButton(onClick = {}) { Icon(Icons.Filled.Search, contentDescription = "搜索") }
                IconButton(onClick = {}) { Icon(Icons.Filled.Favorite, contentDescription = "收藏") }
                IconButton(onClick = {}) { Icon(Icons.Filled.Person, contentDescription = "我的") }
            }
        )

        HorizontalDivider()

        // ── 2. 带 FAB 的 BottomAppBar ─────────────────────────
        SectionLabel("带 FAB 的 BottomAppBar")
        BottomAppBar(
            actions = {
                IconButton(onClick = {}) { Icon(Icons.Filled.Menu, contentDescription = "菜单") }
                IconButton(onClick = {}) { Icon(Icons.Filled.Search, contentDescription = "搜索") }
                IconButton(onClick = {}) { Icon(Icons.Filled.MoreVert, contentDescription = "更多") }
            },
            floatingActionButton = {
                FloatingActionButton(onClick = {}) {
                    Icon(Icons.Filled.Add, contentDescription = "新建")
                }
            }
        )

        HorizontalDivider()

        // ── 3. NavigationBar（底部导航栏）────────────────────
        SectionLabel("NavigationBar — 底部导航")
        Text(
            "NavigationBar 是更常用的底部导航组件，支持选中状态和标签。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        val navItems = listOf(
            Icons.Filled.Home        to "首页",
            Icons.Filled.Search      to "搜索",
            Icons.Filled.Notifications to "通知",
            Icons.Filled.Person      to "我的",
        )
        var selectedNav by androidx.compose.runtime.remember { androidx.compose.runtime.mutableStateOf(0) }
        NavigationBar {
            navItems.forEachIndexed { i, (icon, label) ->
                NavigationBarItem(
                    selected = i == selectedNav,
                    onClick = { selectedNav = i },
                    icon = { Icon(icon, contentDescription = label) },
                    label = { Text(label) }
                )
            }
        }
    }
}
