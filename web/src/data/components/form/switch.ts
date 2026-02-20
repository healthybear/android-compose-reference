import type { ComponentEntry } from '../../types'

export const switchComponent: ComponentEntry = {
  id: 'switch',
  name: 'Switch',
  category: 'Form',
  description: '开关切换组件，用于二元状态的开/关控制，对应 View 系统的 SwitchCompat。',
  tags: ['switch', 'toggle', 'form', 'boolean', 'on-off'],
  params: [
    { name: 'checked', type: 'Boolean', required: true, description: '是否开启' },
    { name: 'onCheckedChange', type: '((Boolean) -> Unit)?', required: true, description: '状态变化回调' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否启用' },
    { name: 'thumbContent', type: '@Composable (() -> Unit)?', default: 'null', description: '自定义滑块内容（如图标）' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var enabled by remember { mutableStateOf(true) }

Row(
    verticalAlignment = Alignment.CenterVertically,
    modifier = Modifier.fillMaxWidth()
) {
    Text("通知", modifier = Modifier.weight(1f))
    Switch(checked = enabled, onCheckedChange = { enabled = it })
}`,
    },
    {
      title: '带图标的滑块',
      code: `var checked by remember { mutableStateOf(false) }

Switch(
    checked = checked,
    onCheckedChange = { checked = it },
    thumbContent = if (checked) {
        {
            Icon(
                Icons.Default.Check,
                contentDescription = null,
                modifier = Modifier.size(SwitchDefaults.IconSize)
            )
        }
    } else null
)`,
    },
  ],
}
