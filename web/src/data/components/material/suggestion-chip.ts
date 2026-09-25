import type { ComponentEntry } from '../../types'

export const suggestionChipComponent: ComponentEntry = {
  id: 'suggestion-chip',
  demo: { id: 'suggestion-chip', sourceFile: 'SuggestionChipDemo.kt' },
  name: 'SuggestionChip',
  category: 'Material',
  description: '建议 Chip，展示系统或 AI 生成的建议内容，供用户快速选择，不带选中状态。',
  tags: ['chip', 'suggestion', 'recommendation', 'ai', '建议'],
  params: [
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'label', type: '@Composable () -> Unit', required: true, description: '建议文字' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互' },
    { name: 'icon', type: '@Composable (() -> Unit)?', default: 'null', description: '前置图标' },
    { name: 'shape', type: 'Shape', default: 'SuggestionChipDefaults.shape', description: '形状' },
    { name: 'colors', type: 'ChipColors', default: 'SuggestionChipDefaults.suggestionChipColors()', description: '颜色配置' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `SuggestionChip(
    onClick = { /* 应用建议 */ },
    label = { Text("明天上午 10:00") }
)`,
    },
    {
      title: '搜索建议列表',
      code: `val suggestions = listOf("Jetpack Compose", "Compose Multiplatform", "Compose Animation")

LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    items(suggestions) { suggestion ->
        SuggestionChip(
            onClick = { searchQuery = suggestion },
            label = { Text(suggestion) }
        )
    }
}`,
    },
    {
      title: '带图标的建议',
      code: `SuggestionChip(
    onClick = { applyTime("09:00") },
    label = { Text("明天 09:00") },
    icon = {
        Icon(
            Icons.Default.Schedule,
            contentDescription = null,
            modifier = Modifier.size(SuggestionChipDefaults.IconSize)
        )
    }
)`,
    },
    {
      title: '智能回复建议',
      code: `val quickReplies = listOf("好的", "收到", "谢谢", "稍后联系")

FlowRow(
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    quickReplies.forEach { reply ->
        SuggestionChip(
            onClick = { sendMessage(reply) },
            label = { Text(reply) }
        )
    }
}`,
    },
    {
      title: '地点建议',
      code: `val locationSuggestions = listOf(
    "家" to Icons.Default.Home,
    "公司" to Icons.Default.Work,
    "健身房" to Icons.Default.FitnessCenter
)

Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    locationSuggestions.forEach { (name, icon) ->
        SuggestionChip(
            onClick = { selectLocation(name) },
            label = { Text(name) },
            icon = {
                Icon(
                    icon,
                    contentDescription = null,
                    modifier = Modifier.size(SuggestionChipDefaults.IconSize)
                )
            }
        )
    }
}`,
    },
    {
      title: '动态生成的建议',
      code: `val recentSearches = listOf("Kotlin 协程", "Jetpack Compose", "Android Studio")

Column(modifier = Modifier.fillMaxWidth()) {
    Text(
        text = "最近搜索",
        style = MaterialTheme.typography.titleSmall,
        modifier = Modifier.padding(bottom = 8.dp)
    )
    FlowRow(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        recentSearches.forEach { search ->
            SuggestionChip(
                onClick = {
                    performSearch(search)
                },
                label = { Text(search) },
                icon = {
                    Icon(
                        Icons.Default.History,
                        contentDescription = null,
                        modifier = Modifier.size(SuggestionChipDefaults.IconSize)
                    )
                }
            )
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '搜索框自动完成',
      description: '在搜索框下方显示搜索建议和历史记录',
      code: `@Composable
fun SearchBarWithSuggestions(
    query: String,
    onQueryChange: (String) -> Unit,
    onSearch: (String) -> Unit
) {
    val suggestions = remember(query) {
        if (query.length >= 2) {
            getSuggestions(query)  // 根据输入获取建议
        } else {
            getRecentSearches()  // 显示最近搜索
        }
    }

    Column(modifier = Modifier.fillMaxWidth()) {
        OutlinedTextField(
            value = query,
            onValueChange = onQueryChange,
            label = { Text("搜索") },
            leadingIcon = {
                Icon(Icons.Default.Search, contentDescription = null)
            },
            trailingIcon = {
                if (query.isNotEmpty()) {
                    IconButton(onClick = { onQueryChange("") }) {
                        Icon(Icons.Default.Close, contentDescription = "清空")
                    }
                }
            },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true
        )

        if (suggestions.isNotEmpty()) {
            Spacer(Modifier.height(12.dp))

            Text(
                text = if (query.isEmpty()) "最近搜索" else "搜索建议",
                style = MaterialTheme.typography.labelMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )

            Spacer(Modifier.height(8.dp))

            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                suggestions.forEach { suggestion ->
                    SuggestionChip(
                        onClick = {
                            onQueryChange(suggestion)
                            onSearch(suggestion)
                        },
                        label = { Text(suggestion) },
                        icon = {
                            Icon(
                                if (query.isEmpty()) Icons.Default.History else Icons.Default.Search,
                                contentDescription = null,
                                modifier = Modifier.size(SuggestionChipDefaults.IconSize)
                            )
                        }
                    )
                }
            }
        }
    }
}`
    },
    {
      title: '日程安排快捷选择',
      description: '提供常用时间段的快捷选择建议',
      code: `@Composable
fun TimeSelector(
    onTimeSelected: (String) -> Unit
) {
    val now = remember { LocalDateTime.now() }
    val timeSuggestions = remember {
        listOf(
            "现在" to now.format(DateTimeFormatter.ofPattern("HH:mm")),
            "1小时后" to now.plusHours(1).format(DateTimeFormatter.ofPattern("HH:mm")),
            "明天上午9点" to "09:00",
            "明天下午2点" to "14:00",
            "本周五下午5点" to "17:00"
        )
    }

    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(
            text = "快捷选择",
            style = MaterialTheme.typography.titleMedium
        )

        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            timeSuggestions.forEach { (label, time) ->
                SuggestionChip(
                    onClick = { onTimeSelected(time) },
                    label = { Text(label) },
                    icon = {
                        Icon(
                            Icons.Default.Schedule,
                            contentDescription = null,
                            modifier = Modifier.size(SuggestionChipDefaults.IconSize)
                        )
                    }
                )
            }
        }

        HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))

        Text(
            text = "或选择具体时间",
            style = MaterialTheme.typography.labelMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        // 自定义时间选择器
        OutlinedButton(
            onClick = { /* 打开时间选择器 */ },
            modifier = Modifier.fillMaxWidth()
        ) {
            Icon(Icons.Default.AccessTime, contentDescription = null)
            Spacer(Modifier.width(8.dp))
            Text("自定义时间")
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: 'SuggestionChip 用于系统建议',
      description: 'SuggestionChip 展示系统或 AI 生成的建议，不是用户输入',
      goodExample: `// 系统生成的搜索建议
SuggestionChip(
    onClick = { applySearch(suggestion) },
    label = { Text(suggestion) }
)`,
      badExample: `// 用户已选择的标签应该用 InputChip
SuggestionChip(
    onClick = {},
    label = { Text(userTag) }
)`
    },
    {
      title: 'SuggestionChip 不带选中状态',
      description: 'SuggestionChip 没有 selected 参数，点击即应用',
      goodExample: `SuggestionChip(
    onClick = { applySuggestion() },
    label = { Text("建议") }
)`,
      badExample: `// SuggestionChip 没有 selected 状态
// 如需选中状态使用 FilterChip
FilterChip(
    selected = isSelected,
    onClick = { toggleSelection() },
    label = { Text("筛选项") }
)`
    },
    {
      title: '建议应该简短明了',
      description: 'SuggestionChip 的文字应该简短，通常不超过 10 个字',
      goodExample: `SuggestionChip(
    onClick = {},
    label = { Text("明天上午 10:00") }
)`,
      badExample: `SuggestionChip(
    onClick = {},
    label = { Text("明天上午 10:00 在会议室 A 举行的产品评审会议") }
)`
    },
    {
      title: '配合 FlowRow 实现自动换行',
      description: '多个建议使用 FlowRow 布局',
      goodExample: `FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    suggestions.forEach { suggestion ->
        SuggestionChip(onClick = {}, label = { Text(suggestion) })
    }
}`,
      badExample: `// LazyRow 需要手动滚动，不适合建议场景
LazyRow {
    items(suggestions) { suggestion ->
        SuggestionChip(onClick = {}, label = { Text(suggestion) })
    }
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'SuggestionChip 用于提供建议',
      content: 'SuggestionChip 展示系统、AI 或算法生成的建议，供用户快速选择'
    },
    {
      type: 'tip',
      title: '适合智能回复和快捷输入',
      content: 'SuggestionChip 非常适合实现智能回复、快捷时间选择、地点建议等功能'
    },
    {
      type: 'warning',
      title: '与 InputChip 的区别',
      content: 'SuggestionChip 是系统建议，InputChip 是用户输入。建议被采纳后应转换为 InputChip'
    },
    {
      type: 'tip',
      title: '建议应该可点击',
      content: 'SuggestionChip 的 onClick 应该直接应用建议，而不是仅切换选中状态'
    },
    {
      type: 'tip',
      title: '可以动态生成',
      content: 'SuggestionChip 的内容可以根据上下文、用户历史、时间等动态生成'
    },
    {
      type: 'danger',
      title: '避免建议过多',
      content: '建议数量应该控制在 3-8 个，过多会让用户难以选择'
    },
  ],

  relatedComponents: ['input-chip', 'assist-chip', 'filter-chip'],
  since: '1.2.0',
}
