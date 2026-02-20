import type { ComponentEntry } from '../../types'

export const inputChipComponent: ComponentEntry = {
  id: 'input-chip',
  name: 'InputChip',
  category: 'Material',
  description: '输入 Chip，表示用户输入的信息（如标签、联系人），通常带删除按钮，可选中。',
  tags: ['chip', 'input', 'tag', 'deletable', '输入标签'],
  params: [
    { name: 'selected', type: 'Boolean', required: true, description: '是否选中' },
    { name: 'onClick', type: '() -> Unit', required: true, description: '点击回调' },
    { name: 'label', type: '@Composable () -> Unit', required: true, description: '标签文字' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enabled', type: 'Boolean', default: 'true', description: '是否可交互' },
    { name: 'avatar', type: '@Composable (() -> Unit)?', default: 'null', description: '头像，显示在最左侧' },
    { name: 'leadingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '前置图标' },
    { name: 'trailingIcon', type: '@Composable (() -> Unit)?', default: 'null', description: '后置图标，通常为删除按钮' },
  ],
  examples: [
    {
      title: '可删除标签',
      code: `var tags by remember { mutableStateOf(listOf("Kotlin", "Compose", "Android")) }

Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    tags.forEach { tag ->
        InputChip(
            selected = false,
            onClick = {},
            label = { Text(tag) },
            trailingIcon = {
                Icon(
                    Icons.Default.Close,
                    contentDescription = "删除 $tag",
                    modifier = Modifier
                        .size(InputChipDefaults.IconSize)
                        .clickable { tags = tags - tag }
                )
            }
        )
    }
}`,
    },
    {
      title: '带头像',
      code: `InputChip(
    selected = false,
    onClick = {},
    label = { Text("张三") },
    avatar = {
        Icon(Icons.Default.Person, contentDescription = null, modifier = Modifier.size(InputChipDefaults.AvatarSize))
    },
    trailingIcon = {
        Icon(Icons.Default.Close, contentDescription = "移除", modifier = Modifier.size(InputChipDefaults.IconSize))
    }
)`,
    },
  ],
}
