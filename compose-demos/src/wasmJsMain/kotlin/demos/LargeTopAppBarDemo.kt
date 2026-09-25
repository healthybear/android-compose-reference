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
 * LargeTopAppBarDemo 演示 Material3 LargeTopAppBar 的用法。
 *
 * LargeTopAppBar 是大标题顶部应用栏，滚动时会折叠变小。
 *
 * 核心特性：
 * - 标题占据更多空间，更突出
 * - 支持滚动折叠效果
 * - 适合内容详情页
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LargeTopAppBarDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("LargeTopAppBar 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("基础用法")

        LargeTopAppBar(
            title = { Text("大标题样式") },
            navigationIcon = {
                IconButton(onClick = {}) {
                    Icon(Icons.Filled.ArrowBack, contentDescription = "返回")
                }
            },
            actions = {
                IconButton(onClick = {}) {
                    Icon(Icons.Filled.Share, contentDescription = "分享")
                }
                IconButton(onClick = {}) {
                    Icon(Icons.Filled.MoreVert, contentDescription = "更多")
                }
            }
        )

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "LargeTopAppBar 适合用于详情页面，标题更大更突出。\n" +
            "在实际使用中，通常配合 Scaffold 和 LazyColumn 的 scrollBehavior 实现滚动折叠效果。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
