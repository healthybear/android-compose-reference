package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
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
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/**
 * SearchBarCompositionDemo 演示搜索场景的组件组合。
 *
 * 展示如何组合 TextField、LazyColumn、Card 等组件实现常见的搜索功能，包括：
 * - 实时搜索过滤
 * - 搜索防抖（避免频繁触发）
 * - 搜索历史记录
 * - 加载状态和空状态
 * - 搜索结果高亮
 *
 * 学习要点：
 * - 使用 LaunchedEffect 实现防抖逻辑
 * - 列表过滤的性能优化
 * - 状态管理：搜索词、结果、历史
 * - 用户体验：即时反馈和清晰的状态指示
 */
@Composable
fun SearchBarCompositionDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("搜索场景组合示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("实时搜索 + 历史记录")

        var searchQuery by remember { mutableStateOf("") }
        var isSearching by remember { mutableStateOf(false) }
        var searchResults by remember { mutableStateOf<List<SearchItem>>(emptyList()) }
        val searchHistory = remember { mutableStateListOf<String>() }
        var showHistory by remember { mutableStateOf(false) }

        val scope = rememberCoroutineScope()

        // 模拟数据源
        val allItems = remember {
            listOf(
                SearchItem("Kotlin", "现代编程语言", "语言"),
                SearchItem("Jetpack Compose", "声明式 UI 框架", "框架"),
                SearchItem("Material Design 3", "设计系统", "设计"),
                SearchItem("Coroutines", "异步编程库", "库"),
                SearchItem("Flow", "响应式数据流", "库"),
                SearchItem("Android Studio", "官方 IDE", "工具"),
                SearchItem("Gradle", "构建工具", "工具"),
                SearchItem("Retrofit", "网络请求库", "库"),
                SearchItem("Room", "本地数据库", "库"),
                SearchItem("Hilt", "依赖注入框架", "框架"),
                SearchItem("Navigation", "导航组件", "组件"),
                SearchItem("ViewModel", "架构组件", "组件"),
                SearchItem("LiveData", "可观察数据", "组件"),
                SearchItem("Paging", "分页加载库", "库"),
                SearchItem("WorkManager", "后台任务", "组件")
            )
        }

        // 防抖搜索
        LaunchedEffect(searchQuery) {
            if (searchQuery.isEmpty()) {
                searchResults = emptyList()
                isSearching = false
                showHistory = false
                return@LaunchedEffect
            }

            isSearching = true
            showHistory = false
            delay(500) // 防抖延迟

            // 执行搜索
            searchResults = allItems.filter {
                it.title.contains(searchQuery, ignoreCase = true) ||
                it.description.contains(searchQuery, ignoreCase = true) ||
                it.category.contains(searchQuery, ignoreCase = true)
            }
            isSearching = false
        }

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                // 搜索框
                OutlinedTextField(
                    value = searchQuery,
                    onValueChange = { searchQuery = it },
                    placeholder = { Text("搜索 Kotlin、Compose、Android…") },
                    leadingIcon = {
                        Icon(Icons.Filled.Search, contentDescription = null)
                    },
                    trailingIcon = {
                        Row {
                            if (searchQuery.isNotEmpty()) {
                                IconButton(onClick = { searchQuery = "" }) {
                                    Icon(Icons.Filled.Close, contentDescription = "清空")
                                }
                            }
                            IconButton(onClick = { showHistory = !showHistory }) {
                                Icon(
                                    Icons.Filled.Add,
                                    contentDescription = "历史记录",
                                    tint = if (showHistory) MaterialTheme.colorScheme.primary
                                           else MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                    },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                // 搜索状态提示
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        when {
                            isSearching -> "搜索中…"
                            searchQuery.isEmpty() && !showHistory -> "输入关键词开始搜索"
                            searchQuery.isNotEmpty() && searchResults.isEmpty() -> "未找到相关结果"
                            searchQuery.isNotEmpty() -> "找到 ${searchResults.size} 个结果"
                            showHistory && searchHistory.isEmpty() -> "暂无搜索历史"
                            showHistory -> "最近搜索"
                            else -> ""
                        },
                        style = MaterialTheme.typography.labelMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    if (showHistory && searchHistory.isNotEmpty()) {
                        TextButton(
                            onClick = { searchHistory.clear() },
                            contentPadding = PaddingValues(horizontal = 8.dp, vertical = 4.dp)
                        ) {
                            Text("清空历史", style = MaterialTheme.typography.labelSmall)
                        }
                    }
                }

                HorizontalDivider()

                // 结果区域
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(300.dp)
                ) {
                    when {
                        // 显示搜索历史
                        showHistory && searchHistory.isNotEmpty() -> {
                            LazyColumn(
                                verticalArrangement = Arrangement.spacedBy(4.dp)
                            ) {
                                items(searchHistory.reversed()) { historyItem ->
                                    Row(
                                        modifier = Modifier
                                            .fillMaxWidth()
                                            .clip(RoundedCornerShape(8.dp))
                                            .clickable {
                                                searchQuery = historyItem
                                                showHistory = false
                                            }
                                            .padding(12.dp),
                                        horizontalArrangement = Arrangement.SpaceBetween,
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Row(
                                            horizontalArrangement = Arrangement.spacedBy(12.dp),
                                            verticalAlignment = Alignment.CenterVertically
                                        ) {
                                            Icon(
                                                Icons.Filled.Add,
                                                contentDescription = null,
                                                tint = MaterialTheme.colorScheme.outline,
                                                modifier = Modifier.size(20.dp)
                                            )
                                            Text(
                                                historyItem,
                                                style = MaterialTheme.typography.bodyMedium
                                            )
                                        }
                                        IconButton(
                                            onClick = { searchHistory.remove(historyItem) }
                                        ) {
                                            Icon(
                                                Icons.Filled.Close,
                                                contentDescription = "删除",
                                                modifier = Modifier.size(18.dp)
                                            )
                                        }
                                    }
                                }
                            }
                        }

                        // 加载中
                        isSearching -> {
                            Box(
                                modifier = Modifier.fillMaxSize(),
                                contentAlignment = Alignment.Center
                            ) {
                                Column(
                                    horizontalAlignment = Alignment.CenterHorizontally,
                                    verticalArrangement = Arrangement.spacedBy(12.dp)
                                ) {
                                    CircularProgressIndicator()
                                    Text(
                                        "正在搜索「$searchQuery」…",
                                        style = MaterialTheme.typography.bodySmall,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant
                                    )
                                }
                            }
                        }

                        // 搜索结果
                        searchResults.isNotEmpty() -> {
                            LazyColumn(
                                verticalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                items(searchResults, key = { it.title }) { item ->
                                    Card(
                                        modifier = Modifier
                                            .fillMaxWidth()
                                            .clickable {
                                                // 添加到历史记录
                                                if (searchQuery !in searchHistory) {
                                                    searchHistory.add(searchQuery)
                                                    if (searchHistory.size > 10) {
                                                        searchHistory.removeAt(0)
                                                    }
                                                }
                                            },
                                        colors = CardDefaults.cardColors(
                                            containerColor = MaterialTheme.colorScheme.surface
                                        )
                                    ) {
                                        Row(
                                            modifier = Modifier
                                                .fillMaxWidth()
                                                .padding(12.dp),
                                            horizontalArrangement = Arrangement.spacedBy(12.dp)
                                        ) {
                                            // 分类图标
                                            Box(
                                                modifier = Modifier
                                                    .size(40.dp)
                                                    .clip(CircleShape)
                                                    .background(MaterialTheme.colorScheme.primaryContainer),
                                                contentAlignment = Alignment.Center
                                            ) {
                                                Text(
                                                    item.category.first().toString(),
                                                    style = MaterialTheme.typography.titleMedium,
                                                    color = MaterialTheme.colorScheme.onPrimaryContainer
                                                )
                                            }

                                            Column(
                                                modifier = Modifier.weight(1f),
                                                verticalArrangement = Arrangement.spacedBy(4.dp)
                                            ) {
                                                Text(
                                                    item.title,
                                                    style = MaterialTheme.typography.bodyLarge
                                                )
                                                Text(
                                                    item.description,
                                                    style = MaterialTheme.typography.bodySmall,
                                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                                )
                                                AssistChip(
                                                    onClick = { },
                                                    label = {
                                                        Text(
                                                            item.category,
                                                            style = MaterialTheme.typography.labelSmall
                                                        )
                                                    },
                                                    modifier = Modifier.height(24.dp)
                                                )
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // 空状态
                        searchQuery.isEmpty() && !showHistory -> {
                            Box(
                                modifier = Modifier.fillMaxSize(),
                                contentAlignment = Alignment.Center
                            ) {
                                Column(
                                    horizontalAlignment = Alignment.CenterHorizontally,
                                    verticalArrangement = Arrangement.spacedBy(12.dp)
                                ) {
                                    Icon(
                                        Icons.Filled.Search,
                                        contentDescription = null,
                                        modifier = Modifier.size(64.dp),
                                        tint = MaterialTheme.colorScheme.outline
                                    )
                                    Text(
                                        "开始搜索",
                                        style = MaterialTheme.typography.bodyLarge,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant
                                    )
                                    Text(
                                        "支持搜索：${allItems.size} 个技术和工具",
                                        style = MaterialTheme.typography.bodySmall,
                                        color = MaterialTheme.colorScheme.outline
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

private data class SearchItem(
    val title: String,
    val description: String,
    val category: String
)
