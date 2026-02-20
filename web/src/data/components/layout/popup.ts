import type { ComponentEntry } from '../../types'

export const popupComponent: ComponentEntry = {
  id: 'popup',
  name: 'Popup',
  category: 'Layout',
  description: '底层弹出层，在当前组件上方渲染浮动内容，不受父布局裁剪限制。DropdownMenu、Tooltip 等组件均基于 Popup 实现。',
  tags: ['popup', 'overlay', 'floating', 'window', '弹出层'],
  params: [
    { name: 'alignment', type: 'Alignment', default: 'Alignment.TopStart', description: '相对于锚点的对齐方式' },
    { name: 'offset', type: 'IntOffset', default: 'IntOffset(0, 0)', description: '相对于对齐位置的偏移' },
    { name: 'onDismissRequest', type: '(() -> Unit)?', default: 'null', description: '点击外部区域时的关闭回调' },
    { name: 'properties', type: 'PopupProperties', default: 'PopupProperties()', description: '弹出层属性，如 focusable、dismissOnBackPress 等' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '弹出层内容' },
  ],
  examples: [
    {
      title: '基础浮动提示',
      code: `var showPopup by remember { mutableStateOf(false) }

Box {
    Button(onClick = { showPopup = true }) { Text("显示 Popup") }

    if (showPopup) {
        Popup(
            alignment = Alignment.TopCenter,
            offset = IntOffset(0, -120),
            onDismissRequest = { showPopup = false }
        ) {
            Surface(
                shape = RoundedCornerShape(8.dp),
                shadowElevation = 8.dp,
                color = MaterialTheme.colorScheme.inverseSurface
            ) {
                Text(
                    "这是一个 Popup",
                    color = MaterialTheme.colorScheme.inverseOnSurface,
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp)
                )
            }
        }
    }
}`,
    },
    {
      title: 'PopupProperties 配置',
      code: `Popup(
    alignment = Alignment.Center,
    onDismissRequest = { showPopup = false },
    properties = PopupProperties(
        focusable = true,           // 可获取焦点（键盘输入）
        dismissOnBackPress = true,  // 返回键关闭
        dismissOnClickOutside = true // 点击外部关闭
    )
) {
    Card(modifier = Modifier.padding(16.dp).width(280.dp)) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("弹出内容", style = MaterialTheme.typography.titleMedium)
            Spacer(Modifier.height(8.dp))
            Text("可以放置任意 Composable 内容。")
        }
    }
}`,
    },
  ],
}
