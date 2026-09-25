import type { ComponentEntry } from '../../types'

export const flowRowComponent: ComponentEntry = {
  id: 'flow-row',
  demo: { id: 'flow-row', sourceFile: 'FlowRowDemo.kt' },
  name: 'FlowRow',
  category: 'Layout',
  description: '水平流式布局，子元素超出宽度时自动换行，类似 CSS flexbox wrap。',
  tags: ['flowrow', 'layout', 'wrap', 'flow', 'flex'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'horizontalArrangement', type: 'Arrangement.Horizontal', default: 'Arrangement.Start', description: '水平排列方式' },
    { name: 'verticalArrangement', type: 'Arrangement.Vertical', default: 'Arrangement.Top', description: '行间垂直排列方式' },
    { name: 'maxItemsInEachRow', type: 'Int', default: 'Int.MAX_VALUE', description: '每行最多子元素数' },
    { name: 'content', type: '@Composable FlowRowScope.() -> Unit', required: true, description: '子元素内容' },
  ],
  examples: [
    {
      title: '标签云',
      code: `val tags = listOf("Kotlin", "Compose", "Android", "Material3", "UI", "Jetpack", "Coroutines")

FlowRow(
    modifier = Modifier.padding(16.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    tags.forEach { tag ->
        AssistChip(
            onClick = { /* 点击标签 */ },
            label = { Text(tag) }
        )
    }
}`,
    },
    {
      title: '限制每行数量',
      code: `FlowRow(
    modifier = Modifier.padding(16.dp),
    maxItemsInEachRow = 3,
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    repeat(7) { index ->
        Card(modifier = Modifier.size(80.dp)) {
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier.fillMaxSize()
            ) {
                Text((index + 1).toString())
            }
        }
    }
}`,
    },
    {
      title: '不同排列方式',
      code: `Column(modifier = Modifier.padding(16.dp)) {
    Text("Start 排列", style = MaterialTheme.typography.titleSmall)
    FlowRow(
        horizontalArrangement = Arrangement.Start,
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        repeat(5) { FilterChip(selected = false, onClick = {}, label = { Text("项 " + (it + 1)) }) }
    }

    Spacer(Modifier.height(16.dp))

    Text("Center 排列", style = MaterialTheme.typography.titleSmall)
    FlowRow(
        horizontalArrangement = Arrangement.Center,
        verticalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        repeat(5) { FilterChip(selected = false, onClick = {}, label = { Text("项 " + (it + 1)) }) }
    }

    Spacer(Modifier.height(16.dp))

    Text("SpaceBetween 排列", style = MaterialTheme.typography.titleSmall)
    FlowRow(
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        repeat(5) { FilterChip(selected = false, onClick = {}, label = { Text("项 " + (it + 1)) }) }
    }
}`,
    },
    {
      title: '图片网格自动换行',
      code: `FlowRow(
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    images.forEach { imageUrl ->
        AsyncImage(
            model = imageUrl,
            contentDescription = null,
            modifier = Modifier
                .size(100.dp)
                .clip(RoundedCornerShape(8.dp)),
            contentScale = ContentScale.Crop
        )
    }
}`,
    },
    {
      title: '多选筛选器',
      code: `var selectedFilters by remember { mutableStateOf(setOf<String>()) }
val filters = listOf("全部", "最新", "热门", "推荐", "视频", "图文", "长文", "问答")

FlowRow(
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    filters.forEach { filter ->
        FilterChip(
            selected = filter in selectedFilters,
            onClick = {
                selectedFilters = if (filter in selectedFilters) {
                    selectedFilters - filter
                } else {
                    selectedFilters + filter
                }
            },
            label = { Text(filter) },
            leadingIcon = if (filter in selectedFilters) {
                { Icon(Icons.Default.Check, contentDescription = null, modifier = Modifier.size(18.dp)) }
            } else null
        )
    }
}`,
    },
    {
      title: '响应式按钮组',
      code: `FlowRow(
    modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp, Alignment.CenterHorizontally),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    Button(onClick = { /* 保存 */ }) {
        Icon(Icons.Default.Save, contentDescription = null)
        Spacer(Modifier.width(4.dp))
        Text("保存")
    }
    Button(onClick = { /* 分享 */ }) {
        Icon(Icons.Default.Share, contentDescription = null)
        Spacer(Modifier.width(4.dp))
        Text("分享")
    }
    OutlinedButton(onClick = { /* 编辑 */ }) {
        Icon(Icons.Default.Edit, contentDescription = null)
        Spacer(Modifier.width(4.dp))
        Text("编辑")
    }
    OutlinedButton(onClick = { /* 删除 */ }) {
        Icon(Icons.Default.Delete, contentDescription = null)
        Spacer(Modifier.width(4.dp))
        Text("删除")
    }
}`,
    },
  ],

  useCases: [
    {
      title: '搜索关键词标签',
      description: '显示热门搜索关键词，自动换行排列',
      code: `@Composable
fun HotSearchKeywords(
    keywords: List<String>,
    onKeywordClick: (String) -> Unit
) {
    Column(modifier = Modifier.padding(16.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "热门搜索",
                style = MaterialTheme.typography.titleMedium
            )
            TextButton(onClick = { /* 换一批 */ }) {
                Icon(Icons.Default.Refresh, contentDescription = null, modifier = Modifier.size(18.dp))
                Spacer(Modifier.width(4.dp))
                Text("换一批")
            }
        }

        Spacer(Modifier.height(12.dp))

        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            keywords.forEachIndexed { index, keyword ->
                SuggestionChip(
                    onClick = { onKeywordClick(keyword) },
                    label = {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            if (index < 3) {
                                // 前三名显示数字徽章
                                Surface(
                                    shape = CircleShape,
                                    color = when (index) {
                                        0 -> Color(0xFFFF6B6B)
                                        1 -> Color(0xFFFF9F43)
                                        else -> Color(0xFFFFD93D)
                                    },
                                    modifier = Modifier.size(16.dp)
                                ) {
                                    Text(
                                        text = (index + 1).toString(),
                                        modifier = Modifier.fillMaxSize(),
                                        textAlign = TextAlign.Center,
                                        style = MaterialTheme.typography.labelSmall,
                                        color = Color.White
                                    )
                                }
                                Spacer(Modifier.width(4.dp))
                            }
                            Text(keyword)
                        }
                    }
                )
            }
        }
    }
}`
    },
    {
      title: '商品属性选择器',
      description: '电商商品详情页的颜色、尺码等属性选择',
      code: `@Composable
fun ProductAttributeSelector(
    attributes: Map<String, List<String>>,
    selectedAttributes: Map<String, String>,
    onAttributeSelected: (String, String) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        attributes.forEach { (attributeName, values) ->
            Text(
                text = attributeName,
                style = MaterialTheme.typography.titleSmall,
                modifier = Modifier.padding(bottom = 8.dp)
            )

            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.padding(bottom = 16.dp)
            ) {
                values.forEach { value ->
                    val isSelected = selectedAttributes[attributeName] == value

                    FilterChip(
                        selected = isSelected,
                        onClick = { onAttributeSelected(attributeName, value) },
                        label = { Text(value) },
                        border = if (isSelected) {
                            FilterChipDefaults.filterChipBorder(
                                enabled = true,
                                selected = true,
                                borderColor = MaterialTheme.colorScheme.primary,
                                selectedBorderColor = MaterialTheme.colorScheme.primary,
                                borderWidth = 2.dp,
                                selectedBorderWidth = 2.dp
                            )
                        } else {
                            FilterChipDefaults.filterChipBorder(enabled = true, selected = false)
                        }
                    )
                }
            }
        }

        // 显示已选择的组合
        if (selectedAttributes.isNotEmpty()) {
            HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))
            Text(
                text = "已选：" + selectedAttributes.values.joinToString(" / "),
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.primary
            )
        }
    }
}

// 使用示例
val attributes = mapOf(
    "颜色" to listOf("黑色", "白色", "蓝色", "红色"),
    "尺码" to listOf("S", "M", "L", "XL", "XXL"),
    "版本" to listOf("标准版", "高配版", "旗舰版")
)
var selectedAttributes by remember { mutableStateOf(mapOf<String, String>()) }

ProductAttributeSelector(
    attributes = attributes,
    selectedAttributes = selectedAttributes,
    onAttributeSelected = { name, value ->
        selectedAttributes = selectedAttributes + (name to value)
    }
)`
    },
  ],

  bestPractices: [
    {
      title: '使用 Arrangement.spacedBy 设置间距',
      description: '统一设置子项之间的间距，而非在子项上设置 padding',
      goodExample: `FlowRow(
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    items.forEach { item ->
        ItemChip(item)  // 不需要额外 padding
    }
}`,
      badExample: `FlowRow {
    items.forEach { item ->
        ItemChip(
            item,
            modifier = Modifier.padding(4.dp)  // 会导致边缘有额外空白
        )
    }
}`
    },
    {
      title: 'maxItemsInEachRow 用于强制换行',
      description: '当需要固定每行最大数量时使用',
      goodExample: `// 每行最多显示 4 个，多余的自动换行
FlowRow(
    maxItemsInEachRow = 4,
    horizontalArrangement = Arrangement.spacedBy(8.dp)
) {
    items.forEach { item -> ItemCard(item) }
}`,
    },
    {
      title: 'FlowRow vs LazyVerticalGrid',
      description: '根据数据量和滚动需求选择合适的组件',
      goodExample: `// 少量固定项（<50）：使用 FlowRow
FlowRow { repeat(10) { Chip(...) } }

// 大量数据或需要滚动：使用 LazyVerticalGrid
LazyVerticalGrid(columns = GridCells.Adaptive(100.dp)) {
    items(1000) { item -> ItemCard(item) }
}`,
    },
    {
      title: '结合 Modifier.fillMaxWidth 实现响应式',
      description: 'FlowRow 会根据可用宽度自动换行',
      goodExample: `FlowRow(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.spacedBy(8.dp)
) {
    // 自动根据屏幕宽度换行
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'FlowRow 自动换行特性',
      content: 'FlowRow 类似 CSS flexbox 的 flex-wrap: wrap，子项超出宽度时自动换到下一行，无需手动计算'
    },
    {
      type: 'tip',
      title: 'horizontalArrangement 支持对齐方式',
      content: 'Arrangement.Start、Center、End、SpaceBetween、SpaceAround、SpaceEvenly 以及 spacedBy 组合，控制每行内的子项排列'
    },
    {
      type: 'warning',
      title: 'FlowRow 不支持懒加载',
      content: 'FlowRow 会立即组合所有子项。如果子项数量很多（>100），考虑使用 LazyVerticalGrid 或分页加载'
    },
    {
      type: 'tip',
      title: 'verticalArrangement 控制行间距',
      content: 'verticalArrangement 控制行与行之间的间距和对齐方式，常用 Arrangement.spacedBy(8.dp) 设置固定行间距'
    },
    {
      type: 'tip',
      title: 'maxItemsInEachRow 强制换行',
      content: 'maxItemsInEachRow 限制每行最多显示的子项数量，达到上限后强制换行，即使还有剩余空间'
    },
    {
      type: 'danger',
      title: '注意子项尺寸一致性',
      content: '如果子项宽度差异很大，FlowRow 可能产生不规则的行高。建议子项使用相近的尺寸或固定高度'
    },
  ],

  relatedComponents: ['flow-column', 'lazy-vertical-grid', 'row', 'column'],
  since: '1.4.0',
}
