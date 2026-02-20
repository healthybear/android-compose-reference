import type { ComponentEntry } from '../../types'

export const dropdownMenuComponent: ComponentEntry = {
  id: 'dropdown-menu',
  name: 'DropdownMenu',
  category: 'Material',
  description: '下拉菜单，锚定在触发元素附近弹出，包含一组 DropdownMenuItem 操作项。',
  tags: ['dropdown', 'menu', 'popup', 'context-menu', '下拉菜单'],
  params: [
    { name: 'expanded', type: 'Boolean', required: true, description: '是否展开显示菜单' },
    { name: 'onDismissRequest', type: '() -> Unit', required: true, description: '点击菜单外部时的关闭回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'offset', type: 'DpOffset', default: 'DpOffset(0.dp, 0.dp)', description: '相对锚点的偏移量' },
    { name: 'properties', type: 'PopupProperties', default: 'PopupProperties(focusable = true)', description: '弹窗属性' },
    { name: 'content', type: '@Composable ColumnScope.() -> Unit', required: true, description: '菜单内容，通常为 DropdownMenuItem 列表' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var expanded by remember { mutableStateOf(false) }

Box {
    IconButton(onClick = { expanded = true }) {
        Icon(Icons.Default.MoreVert, contentDescription = "更多")
    }
    DropdownMenu(
        expanded = expanded,
        onDismissRequest = { expanded = false }
    ) {
        DropdownMenuItem(
            text = { Text("编辑") },
            onClick = { expanded = false; /* 编辑 */ },
            leadingIcon = { Icon(Icons.Default.Edit, contentDescription = null) }
        )
        DropdownMenuItem(
            text = { Text("删除") },
            onClick = { expanded = false; /* 删除 */ },
            leadingIcon = { Icon(Icons.Default.Delete, contentDescription = null) }
        )
    }
}`,
    },
    {
      title: '带分割线的菜单',
      code: `DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
    DropdownMenuItem(text = { Text("复制") }, onClick = { expanded = false })
    DropdownMenuItem(text = { Text("粘贴") }, onClick = { expanded = false })
    HorizontalDivider()
    DropdownMenuItem(
        text = { Text("删除", color = MaterialTheme.colorScheme.error) },
        onClick = { expanded = false }
    )
}`,
    },
  ],
}
