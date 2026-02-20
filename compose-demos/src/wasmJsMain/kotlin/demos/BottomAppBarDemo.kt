package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * BottomAppBarDemo 演示 Material3 BottomAppBar 的用法。
 *
 * BottomAppBar 是底部操作栏，通常放置在 Scaffold 的 bottomBar 插槽中，
 * 包含页面级操作按钮，可选配合 FAB（浮动操作按钮）使用。
 *
 * 核心参数：
 * - `actions`：左侧操作区域（RowScope），通常放 2-4 个 IconButton
 * - `floatingActionButton`：右侧 FAB 插槽（可选），FAB 会嵌入 BottomAppBar
 *
 * 与 NavigationBar 的区别：
 * - BottomAppBar：放置操作按钮，不用于页面导航
 * - NavigationBar：用于底部导航，每个 item 对应一个页面
 *
 * 注意：BottomAppBar 通常与 Scaffold 配合使用，
 * 在 Wasm Demo 中直接展示其外观，不涉及 Scaffold 集成。
 */
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
