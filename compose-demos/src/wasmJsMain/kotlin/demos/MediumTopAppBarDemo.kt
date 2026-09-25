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
 * MediumTopAppBarDemo 演示 Material3 MediumTopAppBar 的用法。
 *
 * MediumTopAppBar 是中等大小标题的顶部应用栏，介于普通和大标题之间。
 *
 * 核心特性：
 * - 标题比普通 TopAppBar 更大，但比 LargeTopAppBar 小
 * - 支持滚动折叠
 * - 适合列表页面
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MediumTopAppBarDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("MediumTopAppBar 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("基础用法")

        MediumTopAppBar(
            title = { Text("中等标题样式") },
            navigationIcon = {
                IconButton(onClick = {}) {
                    Icon(Icons.Filled.Menu, contentDescription = "菜单")
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

        SectionLabel("自定义颜色")

        MediumTopAppBar(
            title = { Text("自定义样式") },
            navigationIcon = {
                IconButton(onClick = {}) {
                    Icon(Icons.Filled.ArrowBack, contentDescription = "返回")
                }
            },
            colors = TopAppBarDefaults.mediumTopAppBarColors(
                containerColor = MaterialTheme.colorScheme.secondaryContainer,
                titleContentColor = MaterialTheme.colorScheme.onSecondaryContainer
            )
        )
    }
}
