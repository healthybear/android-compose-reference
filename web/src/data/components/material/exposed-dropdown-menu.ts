import type { ComponentEntry } from '../../types'

export const exposedDropdownMenuComponent: ComponentEntry = {
  id: 'exposed-dropdown-menu',
  demo: { id: 'exposed-dropdown-menu', sourceFile: 'ExposedDropdownMenuDemo.kt' },
  name: 'ExposedDropdownMenuBox',
  category: 'Material',
  description: '暴露式下拉选择框，将 TextField 与下拉菜单结合，用于表单中的单项选择场景。',
  tags: ['dropdown', 'select', 'picker', 'form', 'exposed', '下拉选择'],
  params: [
    { name: 'expanded', type: 'Boolean', required: true, description: '下拉菜单是否展开' },
    { name: 'onExpandedChange', type: '(Boolean) -> Unit', required: true, description: '展开状态变化回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'content', type: '@Composable ExposedDropdownMenuBoxScope.() -> Unit', required: true, description: '内容，包含 TextField 和 ExposedDropdownMenu' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `val options = listOf("选项 A", "选项 B", "选项 C", "选项 D")
var expanded by remember { mutableStateOf(false) }
var selectedOption by remember { mutableStateOf(options[0]) }

ExposedDropdownMenuBox(
    expanded = expanded,
    onExpandedChange = { expanded = it }
) {
    OutlinedTextField(
        value = selectedOption,
        onValueChange = {},
        readOnly = true,
        label = { Text("请选择") },
        trailingIcon = {
            ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded)
        },
        colors = ExposedDropdownMenuDefaults.outlinedTextFieldColors(),
        modifier = Modifier
            .menuAnchor()
            .fillMaxWidth()
    )
    ExposedDropdownMenu(
        expanded = expanded,
        onDismissRequest = { expanded = false }
    ) {
        options.forEach { option ->
            DropdownMenuItem(
                text = { Text(option) },
                onClick = {
                    selectedOption = option
                    expanded = false
                },
                contentPadding = ExposedDropdownMenuDefaults.ItemContentPadding
            )
        }
    }
}`,
    },
    {
      title: '可编辑过滤（自动完成）',
      code: `val allOptions = listOf("北京", "上海", "广州", "深圳", "杭州", "成都", "重庆")
var query by remember { mutableStateOf("") }
var expanded by remember { mutableStateOf(false) }
val filteredOptions = allOptions.filter {
    it.contains(query, ignoreCase = true)
}

ExposedDropdownMenuBox(
    expanded = expanded && filteredOptions.isNotEmpty(),
    onExpandedChange = { expanded = it }
) {
    TextField(
        value = query,
        onValueChange = {
            query = it
            expanded = true
        },
        label = { Text("搜索城市") },
        trailingIcon = {
            ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded)
        },
        colors = ExposedDropdownMenuDefaults.textFieldColors(),
        modifier = Modifier
            .menuAnchor()
            .fillMaxWidth()
    )
    if (filteredOptions.isNotEmpty()) {
        ExposedDropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            filteredOptions.forEach { option ->
                DropdownMenuItem(
                    text = { Text(option) },
                    onClick = {
                        query = option
                        expanded = false
                    },
                    contentPadding = ExposedDropdownMenuDefaults.ItemContentPadding
                )
            }
        }
    }
}`,
    },
    {
      title: '带图标的选项',
      code: `data class Country(val name: String, val code: String, val flag: String)

val countries = listOf(
    Country("中国", "CN", "🇨🇳"),
    Country("美国", "US", "🇺🇸"),
    Country("日本", "JP", "🇯🇵"),
    Country("英国", "GB", "🇬🇧")
)
var expanded by remember { mutableStateOf(false) }
var selectedCountry by remember { mutableStateOf(countries[0]) }

ExposedDropdownMenuBox(
    expanded = expanded,
    onExpandedChange = { expanded = it }
) {
    OutlinedTextField(
        value = selectedCountry.name,
        onValueChange = {},
        readOnly = true,
        label = { Text("选择国家") },
        leadingIcon = {
            Text(selectedCountry.flag, fontSize = 24.sp)
        },
        trailingIcon = {
            ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded)
        },
        modifier = Modifier.menuAnchor().fillMaxWidth()
    )
    ExposedDropdownMenu(
        expanded = expanded,
        onDismissRequest = { expanded = false }
    ) {
        countries.forEach { country ->
            DropdownMenuItem(
                text = { Text(country.name) },
                leadingIcon = {
                    Text(country.flag, fontSize = 20.sp)
                },
                onClick = {
                    selectedCountry = country
                    expanded = false
                }
            )
        }
    }
}`,
    },
    {
      title: '表单场景（多个下拉框）',
      code: `data class FormData(
    var category: String = "电子产品",
    var brand: String = "苹果",
    var model: String = "iPhone 15"
)

val formData = remember { FormData() }
val categories = listOf("电子产品", "服饰", "图书", "食品")
val brands = mapOf(
    "电子产品" to listOf("苹果", "华为", "小米", "三星"),
    "服饰" to listOf("Nike", "Adidas", "优衣库"),
    "图书" to listOf("人民文学", "机械工业", "电子工业"),
    "食品" to listOf("三只松鼠", "百草味", "良品铺子")
)

Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
    // 分类选择
    var categoryExpanded by remember { mutableStateOf(false) }
    ExposedDropdownMenuBox(
        expanded = categoryExpanded,
        onExpandedChange = { categoryExpanded = it }
    ) {
        OutlinedTextField(
            value = formData.category,
            onValueChange = {},
            readOnly = true,
            label = { Text("商品分类") },
            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(categoryExpanded) },
            modifier = Modifier.menuAnchor().fillMaxWidth()
        )
        ExposedDropdownMenu(
            expanded = categoryExpanded,
            onDismissRequest = { categoryExpanded = false }
        ) {
            categories.forEach { category ->
                DropdownMenuItem(
                    text = { Text(category) },
                    onClick = {
                        formData.category = category
                        formData.brand = brands[category]?.firstOrNull() ?: ""
                        categoryExpanded = false
                    }
                )
            }
        }
    }

    // 品牌选择（根据分类动态变化）
    var brandExpanded by remember { mutableStateOf(false) }
    ExposedDropdownMenuBox(
        expanded = brandExpanded,
        onExpandedChange = { brandExpanded = it }
    ) {
        OutlinedTextField(
            value = formData.brand,
            onValueChange = {},
            readOnly = true,
            label = { Text("品牌") },
            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(brandExpanded) },
            modifier = Modifier.menuAnchor().fillMaxWidth()
        )
        ExposedDropdownMenu(
            expanded = brandExpanded,
            onDismissRequest = { brandExpanded = false }
        ) {
            brands[formData.category]?.forEach { brand ->
                DropdownMenuItem(
                    text = { Text(brand) },
                    onClick = {
                        formData.brand = brand
                        brandExpanded = false
                    }
                )
            }
        }
    }

    Button(
        onClick = { /* 提交表单 */ },
        modifier = Modifier.fillMaxWidth()
    ) {
        Text("提交")
    }
}`,
    },
    {
      title: '带分组的选项',
      code: `data class MenuItem(val name: String, val group: String)

val menuItems = listOf(
    MenuItem("首页", "主要"),
    MenuItem("发现", "主要"),
    MenuItem("消息", "主要"),
    MenuItem("设置", "其他"),
    MenuItem("帮助", "其他"),
    MenuItem("关于", "其他")
)
var expanded by remember { mutableStateOf(false) }
var selectedItem by remember { mutableStateOf(menuItems[0]) }

ExposedDropdownMenuBox(
    expanded = expanded,
    onExpandedChange = { expanded = it }
) {
    OutlinedTextField(
        value = selectedItem.name,
        onValueChange = {},
        readOnly = true,
        label = { Text("导航") },
        trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded) },
        modifier = Modifier.menuAnchor().fillMaxWidth()
    )
    ExposedDropdownMenu(
        expanded = expanded,
        onDismissRequest = { expanded = false }
    ) {
        menuItems.groupBy { it.group }.forEach { (group, items) ->
            // 分组标题
            Text(
                text = group,
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            items.forEach { item ->
                DropdownMenuItem(
                    text = { Text(item.name) },
                    onClick = {
                        selectedItem = item
                        expanded = false
                    }
                )
            }
            if (group != menuItems.last().group) {
                HorizontalDivider()
            }
        }
    }
}`,
    },
    {
      title: '远程搜索（异步加载）',
      code: `var query by remember { mutableStateOf("") }
var expanded by remember { mutableStateOf(false) }
var isLoading by remember { mutableStateOf(false) }
var suggestions by remember { mutableStateOf<List<String>>(emptyList()) }
val scope = rememberCoroutineScope()

ExposedDropdownMenuBox(
    expanded = expanded && (isLoading || suggestions.isNotEmpty()),
    onExpandedChange = { expanded = it }
) {
    TextField(
        value = query,
        onValueChange = { newQuery ->
            query = newQuery
            expanded = true
            isLoading = true

            // 模拟异步搜索
            scope.launch {
                delay(500)
                suggestions = searchRemote(newQuery)
                isLoading = false
            }
        },
        label = { Text("搜索用户") },
        leadingIcon = { Icon(Icons.Default.Search, null) },
        trailingIcon = {
            if (isLoading) {
                CircularProgressIndicator(modifier = Modifier.size(24.dp))
            } else {
                ExposedDropdownMenuDefaults.TrailingIcon(expanded)
            }
        },
        modifier = Modifier.menuAnchor().fillMaxWidth()
    )
    ExposedDropdownMenu(
        expanded = expanded && !isLoading,
        onDismissRequest = { expanded = false }
    ) {
        if (suggestions.isEmpty()) {
            DropdownMenuItem(
                text = { Text("无搜索结果") },
                onClick = {},
                enabled = false
            )
        } else {
            suggestions.forEach { suggestion ->
                DropdownMenuItem(
                    text = { Text(suggestion) },
                    onClick = {
                        query = suggestion
                        expanded = false
                    }
                )
            }
        }
    }
}

suspend fun searchRemote(query: String): List<String> {
    // 模拟网络请求
    delay(500)
    return listOf("用户A", "用户B", "用户C").filter { it.contains(query) }
}`,
    },
  ],

  useCases: [
    {
      title: '地址选择器（省市区联动）',
      description: '三级联动选择，选择省份后自动更新城市列表',
      code: `@Composable
fun AddressSelector() {
    data class Address(
        var province: String = "广东省",
        var city: String = "深圳市",
        var district: String = "南山区"
    )

    val address = remember { Address() }
    val provinces = addressData.keys.toList()

    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text("收货地址", style = MaterialTheme.typography.titleLarge)

        // 省份选择
        var provinceExpanded by remember { mutableStateOf(false) }
        ExposedDropdownMenuBox(
            expanded = provinceExpanded,
            onExpandedChange = { provinceExpanded = it }
        ) {
            OutlinedTextField(
                value = address.province,
                onValueChange = {},
                readOnly = true,
                label = { Text("省份") },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(provinceExpanded) },
                modifier = Modifier.menuAnchor().fillMaxWidth()
            )
            ExposedDropdownMenu(
                expanded = provinceExpanded,
                onDismissRequest = { provinceExpanded = false }
            ) {
                provinces.forEach { province ->
                    DropdownMenuItem(
                        text = { Text(province) },
                        onClick = {
                            address.province = province
                            address.city = addressData[province]?.keys?.firstOrNull() ?: ""
                            address.district = addressData[province]?.get(address.city)?.firstOrNull() ?: ""
                            provinceExpanded = false
                        }
                    )
                }
            }
        }

        // 城市选择
        var cityExpanded by remember { mutableStateOf(false) }
        ExposedDropdownMenuBox(
            expanded = cityExpanded,
            onExpandedChange = { cityExpanded = it }
        ) {
            OutlinedTextField(
                value = address.city,
                onValueChange = {},
                readOnly = true,
                label = { Text("城市") },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(cityExpanded) },
                modifier = Modifier.menuAnchor().fillMaxWidth()
            )
            ExposedDropdownMenu(
                expanded = cityExpanded,
                onDismissRequest = { cityExpanded = false }
            ) {
                addressData[address.province]?.keys?.forEach { city ->
                    DropdownMenuItem(
                        text = { Text(city) },
                        onClick = {
                            address.city = city
                            address.district = addressData[address.province]?.get(city)?.firstOrNull() ?: ""
                            cityExpanded = false
                        }
                    )
                }
            }
        }

        // 区县选择
        var districtExpanded by remember { mutableStateOf(false) }
        ExposedDropdownMenuBox(
            expanded = districtExpanded,
            onExpandedChange = { districtExpanded = it }
        ) {
            OutlinedTextField(
                value = address.district,
                onValueChange = {},
                readOnly = true,
                label = { Text("区县") },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(districtExpanded) },
                modifier = Modifier.menuAnchor().fillMaxWidth()
            )
            ExposedDropdownMenu(
                expanded = districtExpanded,
                onDismissRequest = { districtExpanded = false }
            ) {
                addressData[address.province]?.get(address.city)?.forEach { district ->
                    DropdownMenuItem(
                        text = { Text(district) },
                        onClick = {
                            address.district = district
                            districtExpanded = false
                        }
                    )
                }
            }
        }

        OutlinedTextField(
            value = "",
            onValueChange = {},
            label = { Text("详细地址") },
            modifier = Modifier.fillMaxWidth(),
            minLines = 3
        )
    }
}

val addressData = mapOf(
    "广东省" to mapOf(
        "深圳市" to listOf("南山区", "福田区", "罗湖区"),
        "广州市" to listOf("天河区", "越秀区", "海珠区")
    ),
    "浙江省" to mapOf(
        "杭州市" to listOf("西湖区", "拱墅区", "余杭区"),
        "宁波市" to listOf("海曙区", "江北区", "鄞州区")
    )
)`,
    },
    {
      title: '筛选器组合',
      description: '电商商品筛选页面，多个下拉选择器组合',
      code: `@Composable
fun ProductFilterScreen() {
    data class FilterState(
        var category: String = "全部",
        var brand: String = "全部",
        var priceRange: String = "全部",
        var sortBy: String = "综合排序"
    )

    val filterState = remember { FilterState() }
    val categories = listOf("全部", "手机", "电脑", "平板", "配件")
    val brands = listOf("全部", "苹果", "华为", "小米", "三星", "OPPO")
    val priceRanges = listOf("全部", "0-1000", "1000-3000", "3000-5000", "5000以上")
    val sortOptions = listOf("综合排序", "价格从低到高", "价格从高到低", "销量", "新品")

    Column(modifier = Modifier.fillMaxSize()) {
        // 筛选栏
        Surface(
            modifier = Modifier.fillMaxWidth(),
            shadowElevation = 4.dp
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 8.dp, vertical = 4.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                // 分类
                FilterDropdown(
                    label = filterState.category,
                    options = categories,
                    onSelect = { filterState.category = it },
                    modifier = Modifier.weight(1f)
                )

                // 品牌
                FilterDropdown(
                    label = filterState.brand,
                    options = brands,
                    onSelect = { filterState.brand = it },
                    modifier = Modifier.weight(1f)
                )

                // 价格
                FilterDropdown(
                    label = filterState.priceRange,
                    options = priceRanges,
                    onSelect = { filterState.priceRange = it },
                    modifier = Modifier.weight(1f)
                )

                // 排序
                FilterDropdown(
                    label = filterState.sortBy,
                    options = sortOptions,
                    onSelect = { filterState.sortBy = it },
                    modifier = Modifier.weight(1f)
                )
            }
        }

        // 商品列表
        LazyColumn(modifier = Modifier.fillMaxSize()) {
            items(20) { index ->
                ProductCard(index = index)
            }
        }
    }
}

@Composable
fun FilterDropdown(
    label: String,
    options: List<String>,
    onSelect: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }

    ExposedDropdownMenuBox(
        expanded = expanded,
        onExpandedChange = { expanded = it },
        modifier = modifier
    ) {
        OutlinedTextField(
            value = label,
            onValueChange = {},
            readOnly = true,
            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded) },
            modifier = Modifier.menuAnchor(),
            textStyle = MaterialTheme.typography.bodySmall,
            singleLine = true
        )
        ExposedDropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            options.forEach { option ->
                DropdownMenuItem(
                    text = { Text(option, style = MaterialTheme.typography.bodyMedium) },
                    onClick = {
                        onSelect(option)
                        expanded = false
                    }
                )
            }
        }
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '必须使用 menuAnchor() 修饰符',
      description: 'TextField 需要 menuAnchor() 才能正确定位下拉菜单',
      goodExample: `OutlinedTextField(
    value = selected,
    onValueChange = {},
    modifier = Modifier.menuAnchor().fillMaxWidth()
)`,
      badExample: `OutlinedTextField(
    value = selected,
    onValueChange = {},
    modifier = Modifier.fillMaxWidth()  // 缺少 menuAnchor()
)`,
    },
    {
      title: '只读选择器设置 readOnly = true',
      description: '纯选择场景禁止输入，避免用户混淆',
      goodExample: `OutlinedTextField(
    value = selectedOption,
    onValueChange = {},
    readOnly = true  // 只能通过下拉选择
)`,
      badExample: `OutlinedTextField(
    value = selectedOption,
    onValueChange = { selectedOption = it }  // 允许输入但无效
)`,
    },
    {
      title: '使用 ExposedDropdownMenuDefaults',
      description: '使用官方提供的默认样式保持一致性',
      goodExample: `trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded) }
colors = ExposedDropdownMenuDefaults.textFieldColors()
contentPadding = ExposedDropdownMenuDefaults.ItemContentPadding`,
    },
    {
      title: '可编辑过滤要处理空结果',
      description: '过滤后无结果时给用户明确提示',
      goodExample: `if (filteredOptions.isEmpty()) {
    DropdownMenuItem(
        text = { Text("无匹配结果") },
        onClick = {},
        enabled = false
    )
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'ExposedDropdownMenuBox 的作用',
      content: 'ExposedDropdownMenuBox 是容器，协调 TextField 和下拉菜单的展开/收起状态',
    },
    {
      type: 'info',
      title: '与 DropdownMenu 的区别',
      content: 'ExposedDropdownMenu 与输入框结合，DropdownMenu 独立使用（通常配合 Button）',
    },
    {
      type: 'tip',
      title: '支持两种模式',
      content: '只读模式（readOnly = true）用于选择器，可编辑模式用于自动完成/搜索',
    },
    {
      type: 'tip',
      title: 'menuAnchor() 是必需的',
      content: 'TextField 必须添加 Modifier.menuAnchor()，否则下拉菜单无法正确定位',
    },
    {
      type: 'warning',
      title: '下拉菜单位置自动调整',
      content: '当空间不足时，下拉菜单会自动向上展开而不是向下',
    },
    {
      type: 'warning',
      title: '选项过多时考虑滚动',
      content: 'ExposedDropdownMenu 内部自带滚动，但选项太多时考虑分页或搜索',
    },
    {
      type: 'danger',
      title: '避免在 LazyColumn 中使用',
      content: '在滚动列表中使用下拉菜单可能导致定位问题和性能问题',
    },
  ],

  relatedComponents: ['dropdown-menu', 'text-field'],
  since: '1.0.0',
}
