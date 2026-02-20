package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun TopAppBarDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("TopAppBar 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. CenterAlignedTopAppBar ─────────────────────────
        SectionLabel("CenterAlignedTopAppBar")
        CenterAlignedTopAppBar(
            title = { Text("页面标题") },
            navigationIcon = {
                IconButton(onClick = {}) {
                    Icon(Icons.Filled.ArrowBack, contentDescription = "返回")
                }
            },
            actions = {
                IconButton(onClick = {}) { Icon(Icons.Filled.Search, contentDescription = "搜索") }
                IconButton(onClick = {}) { Icon(Icons.Filled.MoreVert, contentDescription = "更多") }
            }
        )

        HorizontalDivider()

        // ── 2. TopAppBar（左对齐）────────────────────────────
        SectionLabel("TopAppBar（标题左对齐）")
        TopAppBar(
            title = { Text("左对齐标题") },
            navigationIcon = {
                IconButton(onClick = {}) {
                    Icon(Icons.Filled.Menu, contentDescription = "菜单")
                }
            },
            actions = {
                IconButton(onClick = {}) { Icon(Icons.Filled.Favorite, contentDescription = "收藏") }
                IconButton(onClick = {}) { Icon(Icons.Filled.Share, contentDescription = "分享") }
            }
        )

        HorizontalDivider()

        // ── 3. MediumTopAppBar ────────────────────────────────
        SectionLabel("MediumTopAppBar")
        MediumTopAppBar(
            title = { Text("Medium 标题") },
            navigationIcon = {
                IconButton(onClick = {}) {
                    Icon(Icons.Filled.ArrowBack, contentDescription = "返回")
                }
            },
            actions = {
                IconButton(onClick = {}) { Icon(Icons.Filled.Edit, contentDescription = "编辑") }
            }
        )

        HorizontalDivider()

        // ── 4. LargeTopAppBar ─────────────────────────────────
        SectionLabel("LargeTopAppBar")
        LargeTopAppBar(
            title = { Text("Large 大标题") },
            navigationIcon = {
                IconButton(onClick = {}) {
                    Icon(Icons.Filled.ArrowBack, contentDescription = "返回")
                }
            },
            actions = {
                IconButton(onClick = {}) { Icon(Icons.Filled.Settings, contentDescription = "设置") }
            }
        )

        HorizontalDivider()

        // ── 5. 自定义颜色 ─────────────────────────────────────
        SectionLabel("colors 自定义")
        CenterAlignedTopAppBar(
            title = { Text("自定义颜色") },
            navigationIcon = {
                IconButton(onClick = {}) {
                    Icon(Icons.Filled.ArrowBack, contentDescription = "返回")
                }
            },
            colors = TopAppBarDefaults.centerAlignedTopAppBarColors(
                containerColor = MaterialTheme.colorScheme.primaryContainer,
                titleContentColor = MaterialTheme.colorScheme.onPrimaryContainer,
                navigationIconContentColor = MaterialTheme.colorScheme.onPrimaryContainer,
                actionIconContentColor = MaterialTheme.colorScheme.onPrimaryContainer
            ),
            actions = {
                IconButton(onClick = {}) { Icon(Icons.Filled.MoreVert, contentDescription = "更多") }
            }
        )
    }
}
