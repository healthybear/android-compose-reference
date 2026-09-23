import type { ComponentEntry } from '../../types'

export const modifierClickableComponent: ComponentEntry = {
  id: 'modifier-clickable',
  demo: { id: 'modifier-clickable', sourceFile: 'ModifierClickableDemo.kt' },
  name: 'Modifier.clickable',
  category: 'Modifier',
  description: 'Modifier.clickable 为任意组件添加点击交互，内置涟漪效果。combinedClickable 支持单击、长按、双击等复杂手势。是最常用的交互 Modifier 之一。',
  tags: ['modifier', 'clickable', 'click', 'tap', 'gesture', 'interaction'],
  params: [
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用点击，false 时禁用交互和涟漪效果' },
    { name: 'onClickLabel', type: 'String?', default: 'null', description: '无障碍点击操作描述，屏幕阅读器会读出' },
    { name: 'role', type: 'Role?', default: 'null', description: '语义角色（Button/Checkbox/Tab 等）' },
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'interactionSource', type: 'MutableInteractionSource?', default: 'null', description: '交互状态源，用于监听按下、悬停等状态' },
    { name: 'indication', type: 'Indication?', default: 'LocalIndication.current', description: '视觉反馈效果，默认涟漪效果，null 为无反馈' },
  ],
  examples: [
    {
      title: '基础点击',
      code: `Box(
    modifier = Modifier
        .clickable { println("点击了") }
        .padding(16.dp)
        .background(MaterialTheme.colorScheme.primaryContainer)
) {
    Text("点击我")
}`,
    },
    {
      title: '禁用涟漪效果',
      code: `// 方式 1：使用 null indication
Box(
    modifier = Modifier
        .clickable(
            indication = null,
            interactionSource = remember { MutableInteractionSource() }
        ) {
            // 点击逻辑
        }
        .padding(16.dp)
) {
    Text("无涟漪点击")
}

// 方式 2：使用 pointerInput
Box(
    modifier = Modifier
        .pointerInput(Unit) {
            detectTapGestures(onTap = { /* 点击 */ })
        }
        .padding(16.dp)
) {
    Text("无涟漪点击")
}`,
    },
    {
      title: '长按 + 双击',
      code: `var lastAction by remember { mutableStateOf("") }

Box(
    modifier = Modifier
        .combinedClickable(
            onClick = { lastAction = "单击" },
            onLongClick = { lastAction = "长按" },
            onDoubleClick = { lastAction = "双击" }
        )
        .padding(16.dp)
        .background(MaterialTheme.colorScheme.secondaryContainer)
) {
    Text("多种手势: $lastAction")
}`,
    },
    {
      title: '监听交互状态',
      code: `val interactionSource = remember { MutableInteractionSource() }
val isPressed by interactionSource.collectIsPressedAsState()

Box(
    modifier = Modifier
        .clickable(
            interactionSource = interactionSource,
            indication = rememberRipple()
        ) {
            // 点击逻辑
        }
        .padding(16.dp)
        .background(
            if (isPressed) Color.Blue else Color.LightGray
        )
) {
    Text("按下时变色", color = if (isPressed) Color.White else Color.Black)
}`,
    },
    {
      title: '可切换状态',
      code: `var isSelected by remember { mutableStateOf(false) }

Row(
    modifier = Modifier
        .clickable(
            role = Role.Checkbox
        ) {
            isSelected = !isSelected
        }
        .padding(16.dp),
    verticalAlignment = Alignment.CenterVertically
) {
    Icon(
        imageVector = if (isSelected) Icons.Default.CheckCircle
                      else Icons.Default.RadioButtonUnchecked,
        contentDescription = null,
        tint = if (isSelected) MaterialTheme.colorScheme.primary
               else MaterialTheme.colorScheme.onSurface
    )
    Spacer(Modifier.width(8.dp))
    Text("可选项")
}`,
    },
    {
      title: 'clickable 位置影响点击区域',
      code: `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    // clickable 在 padding 之前：点击区域包含 padding
    Text(
        "点击区域大",
        modifier = Modifier
            .clickable { }
            .padding(16.dp)
            .background(Color.LightGray)
    )

    // clickable 在 padding 之后：点击区域不含 padding
    Text(
        "点击区域小",
        modifier = Modifier
            .padding(16.dp)
            .background(Color.LightGray)
            .clickable { }
    )
}`,
    },
  ],

  useCases: [
    {
      title: '自定义列表项点击',
      description: '为列表项添加点击和长按功能',
      code: `@Composable
fun ListItemWithActions(
    item: Item,
    onItemClick: (Item) -> Unit,
    onItemLongPress: (Item) -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .combinedClickable(
                onClick = { onItemClick(item) },
                onLongClick = { onItemLongPress(item) }
            )
            .padding(horizontal = 16.dp, vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(item.icon, contentDescription = null)
        Spacer(Modifier.width(12.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text(item.title, style = MaterialTheme.typography.bodyLarge)
            Text(item.subtitle, style = MaterialTheme.typography.bodySmall)
        }
    }
    HorizontalDivider()
}`
    },
    {
      title: '可展开/收起的卡片',
      description: '使用 clickable 控制卡片展开状态',
      code: `@Composable
fun ExpandableCard(title: String, content: String) {
    var expanded by remember { mutableStateOf(false) }

    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier
                .clickable { expanded = !expanded }
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(title, style = MaterialTheme.typography.titleMedium)
                Icon(
                    imageVector = if (expanded) Icons.Default.ExpandLess
                                  else Icons.Default.ExpandMore,
                    contentDescription = if (expanded) "收起" else "展开"
                )
            }

            AnimatedVisibility(visible = expanded) {
                Text(
                    text = content,
                    modifier = Modifier.padding(top = 8.dp),
                    style = MaterialTheme.typography.bodyMedium
                )
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 Button/IconButton 而非 clickable',
      description: 'Material 组件提供更好的样式和无障碍支持',
      goodExample: `// 按钮：使用 Button
Button(onClick = { }) {
    Text("提交")
}

// 图标：使用 IconButton
IconButton(onClick = { }) {
    Icon(Icons.Default.Search, contentDescription = "搜索")
}`,
      badExample: `// 不推荐：手动实现按钮
Text(
    "提交",
    modifier = Modifier
        .clickable { }
        .padding(16.dp)
        .background(Color.Blue)
)`
    },
    {
      title: '为 clickable 提供 onClickLabel',
      description: '提升无障碍体验，让屏幕阅读器用户知道点击操作',
      goodExample: `Icon(
    Icons.Default.Delete,
    contentDescription = "删除图标",
    modifier = Modifier.clickable(
        onClickLabel = "删除此项"
    ) {
        deleteItem()
    }
)`,
      badExample: `Icon(
    Icons.Default.Delete,
    contentDescription = null,
    modifier = Modifier.clickable { deleteItem() }
)`
    },
    {
      title: 'clickable 应在 padding 之前',
      description: '确保 padding 区域也可点击，避免点击死角',
      goodExample: `Box(
    modifier = Modifier
        .clickable { }
        .padding(16.dp)  // padding 在点击区域内
) {
    Text("内容")
}`,
      badExample: `Box(
    modifier = Modifier
        .padding(16.dp)
        .clickable { }  // padding 区域不可点击
) {
    Text("内容")
}`
    },
    {
      title: '避免嵌套 clickable',
      description: '嵌套 clickable 会导致点击事件冲突',
      goodExample: `Column {
    Text(
        "列表项",
        modifier = Modifier
            .clickable { /* 点击整项 */ }
            .padding(16.dp)
    )
}`,
      badExample: `Column(
    modifier = Modifier.clickable { /* 外层点击 */ }
) {
    Text(
        "列表项",
        modifier = Modifier.clickable { /* 内层点击，会覆盖外层 */ }
    )
}`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'clickable 自动添加语义信息',
      content: 'clickable 会自动为组件添加可点击的语义信息，无障碍服务可以识别'
    },
    {
      type: 'warning',
      title: 'clickable 与 clickable 组件冲突',
      content: 'Card(onClick = {}) 等本身可点击的组件不要再添加 clickable，会导致双重点击效果'
    },
    {
      type: 'tip',
      title: '使用 indication = null 禁用涟漪',
      content: '某些场景（如选择器、开关）不需要涟漪效果，设置 indication = null 即可'
    },
    {
      type: 'tip',
      title: 'combinedClickable 的手势优先级',
      content: 'onDoubleClick > onLongClick > onClick。如果有双击，单击会有延迟以区分双击'
    },
    {
      type: 'danger',
      title: '注意最小触摸目标尺寸',
      content: '可点击元素应至少 48dp x 48dp。使用 Modifier.defaultMinSize(48.dp, 48.dp) 确保无障碍性'
    },
  ],

  relatedComponents: ['button', 'icon-button', 'modifier-pointer-input', 'card'],
  since: '1.0.0',
}
