import type { ComponentEntry } from '../../types'

export const filterChipComponent: ComponentEntry = {
  id: 'filter-chip',
  demo: { id: 'filter-chip', sourceFile: 'FilterChipDemo.kt' },
  name: 'FilterChip',
  category: 'Material',
  description: 'FilterChip 是筛选标签，支持选中状态切换，用于从一组选项中筛选内容。选中时显示勾选图标和不同背景色，常用于商品筛选、分类过滤等场景。',
  tags: ['chip', 'filter', 'selectable', 'toggle', 'checkbox'],
  params: [
    { name: 'selected', type: 'Boolean', required: true, description: '是否选中' },
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调，用于切换选中状态' },
    { name: 'label', type: '@Composable () -> Unit', required: true, description: '标签文字，通常为 Text 组件' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互，false 时显示禁用样式' },
    { name: 'leadingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '前置图标，选中时通常显示 Done 图标' },
    { name: 'trailingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '后置图标，不常用' },
    { name: 'shape', type: 'Shape', default: 'FilterChipDefaults.shape', description: '形状，默认圆角矩形' },
    { name: 'colors', type: 'SelectableChipColors', default: 'FilterChipDefaults.filterChipColors()', description: '颜色配置，包含选中和未选中状态' },
    { name: 'elevation', type: 'SelectableChipElevation?', default: 'FilterChipDefaults.filterChipElevation()', description: '阴影配置' },
    { name: 'border', type: 'BorderStroke?', default: 'FilterChipDefaults.filterChipBorder()', description: '边框配置' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var selected by remember { mutableStateOf(false) }

FilterChip(
    selected = selected,
    onClick = { selected = !selected },
    label = { Text("免费配送") },
    leadingIcon = if (selected) {
        {
            Icon(
                Icons.Default.Done,
                contentDescription = null,
                modifier = Modifier.size(FilterChipDefaults.IconSize)
            )
        }
    } else null
)`,
    },
    {
      title: '单选过滤组',
      code: `val categories = listOf("全部", "美食", "购物", "娱乐", "出行")
var selectedCategory by remember { mutableStateOf("全部") }

Row(
    modifier = Modifier
        .fillMaxWidth()
        .horizontalScroll(rememberScrollState())
        .padding(horizontal = 16.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp)
) {
    categories.forEach { category ->
        FilterChip(
            selected = selectedCategory == category,
            onClick = { selectedCategory = category },
            label = { Text(category) },
            leadingIcon = if (selectedCategory == category) {
                {
                    Icon(
                        Icons.Default.Done,
                        contentDescription = null,
                        modifier = Modifier.size(FilterChipDefaults.IconSize)
                    )
                }
            } else null
        )
    }
}`,
    },
    {
      title: '多选过滤组',
      code: `data class Filter(val name: String, var selected: Boolean)

var filters by remember {
    mutableStateOf(
        listOf(
            Filter("免费配送", false),
            Filter("新品", false),
            Filter("折扣", false),
            Filter("品牌", false)
        )
    )
}

FlowRow(
    modifier = Modifier.padding(16.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    filters.forEachIndexed { index, filter ->
        FilterChip(
            selected = filter.selected,
            onClick = {
                filters = filters.toMutableList().also {
                    it[index] = filter.copy(selected = !filter.selected)
                }
            },
            label = { Text(filter.name) },
            leadingIcon = if (filter.selected) {
                {
                    Icon(
                        Icons.Default.Done,
                        contentDescription = null,
                        modifier = Modifier.size(FilterChipDefaults.IconSize)
                    )
                }
            } else null
        )
    }
}`,
    },
    {
      title: '带图标的过滤选项',
      code: `data class PriceFilter(
    val label: String,
    val icon: ImageVector,
    var selected: Boolean
)

var priceFilters by remember {
    mutableStateOf(
        listOf(
            PriceFilter("0-50", Icons.Default.AttachMoney, false),
            PriceFilter("50-100", Icons.Default.Money, false),
            PriceFilter("100+", Icons.Default.CurrencyYen, false)
        )
    )
}

Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    priceFilters.forEachIndexed { index, filter ->
        FilterChip(
            selected = filter.selected,
            onClick = {
                priceFilters = priceFilters.toMutableList().also {
                    it[index] = filter.copy(selected = !filter.selected)
                }
            },
            label = { Text(filter.label) },
            leadingIcon = {
                Icon(
                    filter.icon,
                    contentDescription = null,
                    modifier = Modifier.size(FilterChipDefaults.IconSize)
                )
            }
        )
    }
}`,
    },
    {
      title: '自定义选中样式',
      code: `var selected by remember { mutableStateOf(false) }

FilterChip(
    selected = selected,
    onClick = { selected = !selected },
    label = { Text("特价") },
    colors = FilterChipDefaults.filterChipColors(
        selectedContainerColor = MaterialTheme.colorScheme.errorContainer,
        selectedLabelColor = MaterialTheme.colorScheme.onErrorContainer,
        selectedLeadingIconColor = MaterialTheme.colorScheme.onErrorContainer
    ),
    leadingIcon = if (selected) {
        {
            Icon(
                Icons.Default.Done,
                contentDescription = null,
                modifier = Modifier.size(FilterChipDefaults.IconSize)
            )
        }
    } else null
)`,
    },
    {
      title: '禁用状态',
      code: `Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    FilterChip(
        selected = false,
        onClick = { },
        label = { Text("可用筛选") }
    )

    FilterChip(
        selected = false,
        onClick = { },
        label = { Text("禁用筛选") },
        enabled = false
    )

    FilterChip(
        selected = true,
        onClick = { },
        label = { Text("已选中禁用") },
        enabled = false,
        leadingIcon = {
            Icon(
                Icons.Default.Done,
                contentDescription = null,
                modifier = Modifier.size(FilterChipDefaults.IconSize)
            )
        }
    )
}`,
    },
  ],

  useCases: [
    {
      title: '商品列表筛选',
      description: '电商应用商品筛选功能',
      code: `@Composable
fun ProductFilterScreen(viewModel: ProductViewModel) {
    val filters by viewModel.filters.collectAsState()
    val products by viewModel.filteredProducts.collectAsState()

    Column {
        // 筛选栏
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState())
                .padding(16.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            filters.forEach { filter ->
                FilterChip(
                    selected = filter.selected,
                    onClick = { viewModel.toggleFilter(filter.id) },
                    label = { Text(filter.name) },
                    leadingIcon = if (filter.selected) {
                        {
                            Icon(
                                Icons.Default.Done,
                                contentDescription = null,
                                modifier = Modifier.size(FilterChipDefaults.IconSize)
                            )
                        }
                    } else null
                )
            }
        }

        HorizontalDivider()

        // 商品列表
        LazyColumn(modifier = Modifier.fillMaxSize()) {
            items(products) { product ->
                ProductItem(product)
            }
        }
    }
}`
    },
    {
      title: '搜索结果筛选',
      description: '搜索页面的分类筛选',
      code: `@Composable
fun SearchResultScreen(query: String, viewModel: SearchViewModel) {
    val selectedTypes by viewModel.selectedTypes.collectAsState()
    val results by viewModel.searchResults.collectAsState()

    val types = listOf("全部", "文章", "视频", "图片", "用户")

    Scaffold(
        topBar = {
            TopAppBar(title = { Text("搜索: $query") })
        }
    ) { paddingValues ->
        Column(modifier = Modifier.padding(paddingValues)) {
            // 类型筛选
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                types.forEach { type ->
                    FilterChip(
                        selected = type in selectedTypes,
                        onClick = { viewModel.toggleType(type) },
                        label = { Text(type) },
                        leadingIcon = if (type in selectedTypes) {
                            {
                                Icon(
                                    Icons.Default.Done,
                                    contentDescription = null,
                                    modifier = Modifier.size(FilterChipDefaults.IconSize)
                                )
                            }
                        } else null
                    )
                }
            }

            // 搜索结果
            LazyColumn(modifier = Modifier.fillMaxSize()) {
                items(results) { result ->
                    SearchResultItem(result)
                }
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '选中时显示 Done 图标',
      description: '符合 Material Design 规范',
      goodExample: `FilterChip(
    selected = selected,
    onClick = { selected = !selected },
    label = { Text("筛选项") },
    leadingIcon = if (selected) {
        {
            Icon(
                Icons.Default.Done,
                contentDescription = null,
                modifier = Modifier.size(FilterChipDefaults.IconSize)
            )
        }
    } else null
)`,
      badExample: `FilterChip(
    selected = selected,
    onClick = { selected = !selected },
    label = { Text("筛选项") }
    // 缺少选中图标，视觉反馈不明显
)`
    },
    {
      title: '使用 FlowRow 处理换行',
      description: '筛选项较多时自动换行',
      goodExample: `FlowRow(
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    filters.forEach { filter ->
        FilterChip(...)
    }
}`,
      badExample: `Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    filters.forEach { filter ->
        FilterChip(...)  // 太多会超出屏幕
    }
}`
    },
    {
      title: '多选时使用列表管理状态',
      description: '便于状态管理和更新',
      goodExample: `data class Filter(val id: String, val name: String, val selected: Boolean)

var filters by remember {
    mutableStateOf(listOf(
        Filter("1", "免费", false),
        Filter("2", "新品", false)
    ))
}

FilterChip(
    selected = filter.selected,
    onClick = {
        filters = filters.map {
            if (it.id == filter.id) it.copy(selected = !it.selected)
            else it
        }
    },
    ...
)`,
    },
    {
      title: 'FilterChip 用于筛选，AssistChip 用于操作',
      description: '根据用途选择合适的 Chip 类型',
      goodExample: `// 筛选功能
FilterChip(
    selected = selected,
    onClick = { selected = !selected },
    label = { Text("免费") }
)

// 操作功能
AssistChip(
    onClick = { /* 分享 */ },
    label = { Text("分享") }
)`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'FilterChip 支持选中状态',
      content: 'FilterChip 与 AssistChip 的主要区别是支持 selected 状态，用于筛选场景'
    },
    {
      type: 'warning',
      title: 'leadingIcon 需要手动处理',
      content: 'FilterChip 不会自动显示选中图标，需要根据 selected 状态手动添加 leadingIcon'
    },
    {
      type: 'tip',
      title: '图标使用 FilterChipDefaults.IconSize',
      content: '确保图标尺寸符合规范（18dp）'
    },
    {
      type: 'tip',
      title: '单选时只需一个 String 状态',
      content: '单选场景只需记录当前选中项，无需为每个选项维护 Boolean 状态'
    },
  ],

  relatedComponents: ['assist-chip', 'input-chip', 'suggestion-chip'],
  since: '1.0.0',
}
