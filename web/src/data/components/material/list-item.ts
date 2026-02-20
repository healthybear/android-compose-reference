import type { ComponentEntry } from '../../types'

export const listItemComponent: ComponentEntry = {
  id: 'list-item',
  name: 'ListItem',
  category: 'Material',
  description: 'Material Design 列表项，支持标题、副标题、前置/后置内容插槽，符合 Material3 规范的标准列表行。',
  tags: ['list', 'item', 'row', 'listview', '列表项'],
  params: [
    { name: 'headlineContent', type: '@Composable () -> Unit', required: true, description: '主标题内容' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'overlineContent', type: '@Composable (() -> Unit)?', default: 'null', description: '标题上方的小字' },
    { name: 'supportingContent', type: '@Composable (() -> Unit)?', default: 'null', description: '副标题/描述文字' },
    { name: 'leadingContent', type: '@Composable (() -> Unit)?', default: 'null', description: '左侧内容，如头像、图标' },
    { name: 'trailingContent', type: '@Composable (() -> Unit)?', default: 'null', description: '右侧内容，如操作按钮、状态文字' },
    { name: 'colors', type: 'ListItemColors', default: 'ListItemDefaults.colors()', description: '颜色配置' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `ListItem(
    headlineContent = { Text("联系人姓名") },
    supportingContent = { Text("手机号码") },
    leadingContent = {
        Icon(Icons.Default.Person, contentDescription = null)
    },
    trailingContent = {
        IconButton(onClick = { /* 拨打 */ }) {
            Icon(Icons.Default.Phone, contentDescription = "拨打")
        }
    }
)`,
    },
    {
      title: '可点击列表项',
      code: `Column {
    items.forEach { item ->
        ListItem(
            headlineContent = { Text(item.title) },
            supportingContent = { Text(item.subtitle) },
            leadingContent = {
                AsyncImage(model = item.avatarUrl, contentDescription = null, modifier = Modifier.size(40.dp).clip(CircleShape))
            },
            modifier = Modifier.clickable { navController.navigate("detail/${item.id}") }
        )
        HorizontalDivider()
    }
}`,
    },
  ],
}
