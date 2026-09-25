import type { ComponentEntry } from '../../types'

export const settingsScreenCompositionComponent: ComponentEntry = {
  id: 'settings-screen-composition',
  demo: { id: 'settings-screen-composition', sourceFile: 'SettingsScreenCompositionDemo.kt' },
  name: 'Settings Screen Composition',
  category: 'Composition',
  description: '完整的设置页面组合示例，展示如何使用 Switch、Slider、Dialog 等组件构建设置界面。',
  tags: ['settings', 'composition', 'preferences', '设置', '组合'],
  params: [],
  examples: [
    {
      title: '设置页面布局',
      code: `LazyColumn {
    item {
        Text("通知", style = MaterialTheme.typography.titleSmall)
    }
    item {
        Row {
            Text("推送通知")
            Spacer(Modifier.weight(1f))
            Switch(checked = notificationsEnabled, onCheckedChange = { notificationsEnabled = it })
        }
    }
    item {
        Text("显示", style = MaterialTheme.typography.titleSmall)
    }
    item {
        Column {
            Text("字体大小")
            Slider(value = fontSize, onValueChange = { fontSize = it }, valueRange = 12f..24f)
        }
    }
}`,
    },
  ],
  bestPractices: [
    {
      type: 'info',
      title: '分组设置项',
      content: '使用分组标题将相关设置项组织在一起',
    },
    {
      type: 'info',
      title: '提供实时预览',
      content: '对于字体大小等设置，提供实时预览效果',
    },
  ],
  relatedComponents: ['switch', 'slider', 'lazy-column', 'alert-dialog'],
  since: '1.0.0',
}
