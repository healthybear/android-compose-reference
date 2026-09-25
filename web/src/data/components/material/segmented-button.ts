import type { ComponentEntry } from '../../types'

export const segmentedButtonComponent: ComponentEntry = {
  id: 'segmented-button',
  name: 'SegmentedButton',
  category: 'Material',
  description: 'Material3 分段按钮，用于在一组互斥选项中切换，SingleChoiceSegmentedButtonRow 单选，MultiChoiceSegmentedButtonRow 多选。',
  tags: ['segmented', 'button', 'toggle', 'choice', '分段按钮'],
  params: [
    { name: 'selected', type: 'Boolean', required: true, description: '是否选中' },
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'shape', type: 'Shape', required: true, description: '按钮形状，通常由 SegmentedButtonDefaults.itemShape 提供' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用' },
    { name: 'colors', type: 'SegmentedButtonColors', default: 'SegmentedButtonDefaults.colors()', description: '颜色配置' },
    { name: 'icon', type: '@Composable () -> Unit', default: '{ SegmentedButtonDefaults.ActiveIcon() }', description: '选中时显示的图标' },
    { name: 'label', type: '@Composable () -> Unit', required: true, description: '按钮文字内容' },
  ],
  examples: [
    {
      title: '单选分段按钮',
      code: `val options = listOf("日", "周", "月")
var selectedIndex by remember { mutableIntStateOf(0) }

SingleChoiceSegmentedButtonRow {
    options.forEachIndexed { index, label ->
        SegmentedButton(
            selected = selectedIndex == index,
            onClick = { selectedIndex = index },
            shape = SegmentedButtonDefaults.itemShape(index, options.size),
            label = { Text(label) }
        )
    }
}`,
    },
    {
      title: '多选分段按钮',
      code: `val options = listOf("粗体", "斜体", "下划线")
val selected = remember { mutableStateListOf(false, false, false) }

MultiChoiceSegmentedButtonRow {
    options.forEachIndexed { index, label ->
        SegmentedButton(
            checked = selected[index],
            onCheckedChange = { selected[index] = it },
            shape = SegmentedButtonDefaults.itemShape(index, options.size),
            label = { Text(label) }
        )
    }
}`,
    },
    {
      title: '带图标的分段按钮',
      code: `val options = listOf(
    Pair("列表", Icons.Default.List),
    Pair("网格", Icons.Default.GridView),
    Pair("地图", Icons.Default.Map)
)
var selectedIndex by remember { mutableIntStateOf(0) }

SingleChoiceSegmentedButtonRow {
    options.forEachIndexed { index, (label, icon) ->
        SegmentedButton(
            selected = selectedIndex == index,
            onClick = { selectedIndex = index },
            shape = SegmentedButtonDefaults.itemShape(index, options.size),
            icon = {
                SegmentedButtonDefaults.Icon(active = selectedIndex == index) {
                    Icon(icon, contentDescription = null, modifier = Modifier.size(SegmentedButtonDefaults.IconSize))
                }
            },
            label = { Text(label) }
        )
    }
}`,
    },
    {
      title: '仅图标',
      code: `val viewModes = listOf(
    Icons.Default.ViewList,
    Icons.Default.ViewModule,
    Icons.Default.ViewQuilt
)
var selectedMode by remember { mutableIntStateOf(0) }

SingleChoiceSegmentedButtonRow {
    viewModes.forEachIndexed { index, icon ->
        SegmentedButton(
            selected = selectedMode == index,
            onClick = { selectedMode = index },
            shape = SegmentedButtonDefaults.itemShape(index, viewModes.size),
            icon = {
                SegmentedButtonDefaults.Icon(active = selectedMode == index) {
                    Icon(
                        icon,
                        contentDescription = "视图模式 $index",
                        modifier = Modifier.size(SegmentedButtonDefaults.IconSize)
                    )
                }
            },
            label = {}
        )
    }
}`,
    },
    {
      title: '时间范围选择',
      code: `val timeRanges = listOf("今天", "本周", "本月", "全部")
var selectedRange by remember { mutableIntStateOf(0) }

Column(modifier = Modifier.fillMaxWidth()) {
    SingleChoiceSegmentedButtonRow(
        modifier = Modifier.fillMaxWidth()
    ) {
        timeRanges.forEachIndexed { index, range ->
            SegmentedButton(
                selected = selectedRange == index,
                onClick = {
                    selectedRange = index
                    loadDataForRange(range)
                },
                shape = SegmentedButtonDefaults.itemShape(index, timeRanges.size),
                label = { Text(range) },
                modifier = Modifier.weight(1f)
            )
        }
    }
}`,
    },
    {
      title: '文本格式工具栏',
      code: `data class FormatOption(val name: String, val icon: ImageVector)

val formatOptions = listOf(
    FormatOption("粗体", Icons.Default.FormatBold),
    FormatOption("斜体", Icons.Default.FormatItalic),
    FormatOption("下划线", Icons.Default.FormatUnderlined)
)
val selectedFormats = remember { mutableStateListOf<Int>() }

MultiChoiceSegmentedButtonRow {
    formatOptions.forEachIndexed { index, option ->
        SegmentedButton(
            checked = index in selectedFormats,
            onCheckedChange = { checked ->
                if (checked) {
                    selectedFormats.add(index)
                } else {
                    selectedFormats.remove(index)
                }
                applyFormat(option.name, checked)
            },
            shape = SegmentedButtonDefaults.itemShape(index, formatOptions.size),
            icon = {
                SegmentedButtonDefaults.Icon(active = index in selectedFormats) {
                    Icon(
                        option.icon,
                        contentDescription = option.name,
                        modifier = Modifier.size(SegmentedButtonDefaults.IconSize)
                    )
                }
            },
            label = {}
        )
    }
}`,
    },
  ],

  useCases: [
    {
      title: '数据可视化视图切换',
      description: '在图表应用中切换不同的数据展示方式',
      code: `@Composable
fun DataVisualizationScreen(
    data: List<DataPoint>
) {
    var viewType by remember { mutableStateOf(ViewType.CHART) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // 视图切换器
        SingleChoiceSegmentedButtonRow(
            modifier = Modifier.fillMaxWidth()
        ) {
            ViewType.entries.forEachIndexed { index, type ->
                SegmentedButton(
                    selected = viewType == type,
                    onClick = { viewType = type },
                    shape = SegmentedButtonDefaults.itemShape(
                        index,
                        ViewType.entries.size
                    ),
                    icon = {
                        SegmentedButtonDefaults.Icon(active = viewType == type) {
                            Icon(
                                type.icon,
                                contentDescription = null,
                                modifier = Modifier.size(SegmentedButtonDefaults.IconSize)
                            )
                        }
                    },
                    label = { Text(type.label) },
                    modifier = Modifier.weight(1f)
                )
            }
        }

        Spacer(Modifier.height(24.dp))

        // 根据选择显示不同视图
        when (viewType) {
            ViewType.CHART -> ChartView(data)
            ViewType.TABLE -> TableView(data)
            ViewType.LIST -> ListView(data)
        }
    }
}

enum class ViewType(val label: String, val icon: ImageVector) {
    CHART("图表", Icons.Default.BarChart),
    TABLE("表格", Icons.Default.TableChart),
    LIST("列表", Icons.Default.List)
}`
    },
    {
      title: '文件排序和筛选',
      description: '文件管理器中的排序和筛选控制',
      code: `@Composable
fun FileManager(
    files: List<File>
) {
    var sortBy by remember { mutableStateOf(SortBy.NAME) }
    val selectedTypes = remember { mutableStateListOf<FileType>() }

    Column(modifier = Modifier.fillMaxWidth()) {
        // 排序选择
        Text(
            text = "排序方式",
            style = MaterialTheme.typography.labelMedium,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        SingleChoiceSegmentedButtonRow {
            SortBy.entries.forEachIndexed { index, sort ->
                SegmentedButton(
                    selected = sortBy == sort,
                    onClick = { sortBy = sort },
                    shape = SegmentedButtonDefaults.itemShape(index, SortBy.entries.size),
                    label = { Text(sort.label) },
                    icon = {
                        SegmentedButtonDefaults.Icon(active = sortBy == sort) {
                            Icon(
                                sort.icon,
                                contentDescription = null,
                                modifier = Modifier.size(SegmentedButtonDefaults.IconSize)
                            )
                        }
                    }
                )
            }
        }

        Spacer(Modifier.height(16.dp))

        // 文件类型筛选
        Text(
            text = "文件类型",
            style = MaterialTheme.typography.labelMedium,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        MultiChoiceSegmentedButtonRow {
            FileType.entries.forEachIndexed { index, type ->
                SegmentedButton(
                    checked = type in selectedTypes,
                    onCheckedChange = { checked ->
                        if (checked) {
                            selectedTypes.add(type)
                        } else {
                            selectedTypes.remove(type)
                        }
                    },
                    shape = SegmentedButtonDefaults.itemShape(index, FileType.entries.size),
                    label = { Text(type.label) }
                )
            }
        }

        Spacer(Modifier.height(16.dp))

        // 显示筛选后的文件列表
        val filteredFiles = files
            .filter { selectedTypes.isEmpty() || it.type in selectedTypes }
            .sortedWith(sortBy.comparator)

        LazyColumn {
            items(filteredFiles) { file ->
                FileListItem(file)
            }
        }
    }
}

enum class SortBy(val label: String, val icon: ImageVector, val comparator: Comparator<File>) {
    NAME("名称", Icons.Default.SortByAlpha, compareBy { it.name }),
    DATE("日期", Icons.Default.CalendarToday, compareByDescending { it.date }),
    SIZE("大小", Icons.Default.Storage, compareByDescending { it.size })
}

enum class FileType(val label: String) {
    DOCUMENT("文档"),
    IMAGE("图片"),
    VIDEO("视频"),
    AUDIO("音频")
}`
    },
  ],

  bestPractices: [
    {
      title: '必须使用对应的容器',
      description: 'SegmentedButton 必须在 SingleChoice 或 MultiChoice 容器中使用',
      goodExample: `SingleChoiceSegmentedButtonRow {
    options.forEachIndexed { index, label ->
        SegmentedButton(
            selected = selectedIndex == index,
            onClick = { selectedIndex = index },
            shape = SegmentedButtonDefaults.itemShape(index, options.size),
            label = { Text(label) }
        )
    }
}`,
      badExample: `// 错误：SegmentedButton 不能单独使用
Row {
    SegmentedButton(
        selected = true,
        onClick = {},
        shape = RoundedCornerShape(8.dp),
        label = { Text("选项") }
    )
}`
    },
    {
      title: 'shape 必须使用 itemShape',
      description: '使用 SegmentedButtonDefaults.itemShape 确保边缘按钮圆角正确',
      goodExample: `SegmentedButton(
    selected = true,
    onClick = {},
    shape = SegmentedButtonDefaults.itemShape(index, count),
    label = { Text("选项") }
)`,
      badExample: `SegmentedButton(
    selected = true,
    onClick = {},
    shape = RoundedCornerShape(8.dp),  // 错误
    label = { Text("选项") }
)`
    },
    {
      title: '选项数量应适中',
      description: 'SegmentedButton 选项数量建议 2-5 个',
      goodExample: `// 3 个选项，清晰易选
val options = listOf("日", "周", "月")`,
      badExample: `// 7 个选项过多，考虑使用 Dropdown
val options = listOf("日", "周", "月", "季", "半年", "年", "全部")`
    },
    {
      title: '单选用 SingleChoice，多选用 MultiChoice',
      description: '根据业务逻辑选择正确的容器类型',
      goodExample: `// 视图模式单选
SingleChoiceSegmentedButtonRow {
    SegmentedButton(selected = ..., onClick = ...)
}

// 文本格式多选
MultiChoiceSegmentedButtonRow {
    SegmentedButton(checked = ..., onCheckedChange = ...)
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'SegmentedButton 需要容器',
      content: 'SegmentedButton 必须在 SingleChoiceSegmentedButtonRow 或 MultiChoiceSegmentedButtonRow 中使用'
    },
    {
      type: 'warning',
      title: 'SingleChoice 和 MultiChoice 的参数不同',
      content: 'SingleChoice 使用 selected + onClick，MultiChoice 使用 checked + onCheckedChange'
    },
    {
      type: 'info',
      title: '适合并列互斥的选项',
      content: 'SegmentedButton 适合展示并列关系且互斥的选项，如视图模式、时间范围等'
    },
    {
      type: 'info',
      title: 'itemShape 自动处理边缘圆角',
      content: 'itemShape 会根据位置自动设置圆角：第一个左侧圆角，最后一个右侧圆角，中间无圆角'
    },
    {
      type: 'warning',
      title: '不适合层级关系',
      content: 'SegmentedButton 展示的选项应该是平级关系，不适合主次分明或层级结构'
    },
    {
      type: 'error',
      title: 'forEachIndexed 中 index 必须正确',
      content: 'itemShape 的 index 参数必须与实际位置对应，否则圆角显示错误'
    },
  ],

  relatedComponents: ['button', 'filter-chip', 'radio-button'],
  since: '1.2.0',
}
