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
  ],
}
