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
 * CenterAlignedTopAppBarDemo 演示 Material3 CenterAlignedTopAppBar 的用法。
 *
 * CenterAlignedTopAppBar 是标题居中的顶部应用栏，适合简洁的页面布局。
 *
 * 核心参数：
 * - `title`：居中显示的标题
 * - `navigationIcon`：左侧导航图标（通常是返回按钮）
 * - `actions`：右侧操作按钮
 * - `scrollBehavior`：滚动行为（固定/折叠等）
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CenterAlignedTopAppBarDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("CenterAlignedTopAppBar 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("基础用法")

        CenterAlignedTopAppBar(
            title = { Text("标题居中") },
            navigationIcon = {
                IconButton(onClick = {}) {
                    Icon(Icons.Filled.ArrowBack, contentDescription = "返回")
                }
            },
            actions = {
                IconButton(onClick = {}) {
                    Icon(Icons.Filled.Search, contentDescription = "搜索")
                }
                IconButton(onClick = {}) {
                    Icon(Icons.Filled.MoreVert, contentDescription = "更多")
                }
            }
        )

        HorizontalDivider()

        SectionLabel("带颜色的 TopAppBar")

        CenterAlignedTopAppBar(
            title = { Text("自定义颜色") },
            navigationIcon = {
                IconButton(onClick = {}) {
                    Icon(Icons.Filled.Menu, contentDescription = "菜单")
                }
            },
            actions = {
                IconButton(onClick = {}) {
                    Icon(Icons.Filled.Favorite, contentDescription = "收藏")
                }
            },
            colors = TopAppBarDefaults.centerAlignedTopAppBarColors(
                containerColor = MaterialTheme.colorScheme.primaryContainer,
                titleContentColor = MaterialTheme.colorScheme.onPrimaryContainer
            )
        )
    }
}
