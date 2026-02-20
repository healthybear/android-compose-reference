import type { ComponentEntry } from '../../types'

export const tooltipComponent: ComponentEntry = {
  id: 'tooltip',
  name: 'TooltipBox',
  category: 'Feedback',
  description: '气泡提示容器，长按触发显示在目标组件附近。内部使用 PlainTooltip（纯文字）或 RichTooltip（富文本+操作按钮）作为提示内容。',
  tags: ['tooltip', 'hint', 'popup', 'longpress', '提示气泡'],
  params: [
    { name: 'tooltip', type: '@Composable TooltipScope.() -> Unit', required: true, description: 'Tooltip 内容，通常为 PlainTooltip { Text(...) }' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: 'TooltipBox 的修饰符' },
    { name: 'state', type: 'TooltipState', default: 'rememberTooltipState()', description: 'Tooltip 显示状态' },
    { name: 'positionProvider', type: 'PopupPositionProvider', default: 'TooltipDefaults.rememberPlainTooltipPositionProvider()', description: '气泡位置策略' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '触发 Tooltip 的目标组件' },
  ],
  examples: [
    {
      title: '基础用法（长按触发）',
      code: `TooltipBox(
    positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
    tooltip = { PlainTooltip { Text("删除") } },
    state = rememberTooltipState()
) {
    IconButton(onClick = { /* 删除 */ }) {
        Icon(Icons.Default.Delete, contentDescription = "删除")
    }
}`,
    },
    {
      title: 'RichTooltip（富文本气泡）',
      code: `TooltipBox(
    positionProvider = TooltipDefaults.rememberRichTooltipPositionProvider(),
    tooltip = {
        RichTooltip(
            title = { Text("格式化") },
            action = {
                TextButton(onClick = { /* 了解更多 */ }) { Text("了解更多") }
            }
        ) {
            Text("将选中文字应用 Markdown 格式。")
        }
    },
    state = rememberTooltipState(isPersistent = true)
) {
    IconButton(onClick = {}) {
        Icon(Icons.Default.FormatBold, contentDescription = "格式化")
    }
}`,
    },
  ],
}
