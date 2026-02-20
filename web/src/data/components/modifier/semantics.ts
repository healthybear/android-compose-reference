import type { ComponentEntry } from '../../types'

export const modifierSemanticsComponent: ComponentEntry = {
  id: 'modifier-semantics',
  name: 'Modifier.semantics',
  category: 'Modifier',
  description: '为组件添加无障碍语义信息，供 TalkBack 等辅助技术读取，提升应用可访问性。',
  tags: ['modifier', 'semantics', 'accessibility', 'a11y', 'talkback'],
  params: [
    { name: 'mergeDescendants', type: 'Boolean', default: 'false', description: '是否将子节点语义合并到当前节点' },
    { name: 'properties', type: 'SemanticsPropertyReceiver.() -> Unit', required: true, description: '语义属性设置块' },
  ],
  examples: [
    {
      title: '自定义内容描述',
      code: `Box(
    modifier = Modifier.semantics {
        contentDescription = "用户头像，点击查看个人资料"
    }
) {
    Image(painter = painterResource(R.drawable.avatar), contentDescription = null)
}`,
    },
    {
      title: '合并子节点语义',
      code: `Row(
    modifier = Modifier
        .semantics(mergeDescendants = true) {}
        .clickable { /* 整行可点击 */ }
        .padding(16.dp)
) {
    Icon(Icons.Default.Star, contentDescription = null)
    Spacer(Modifier.width(8.dp))
    Text("收藏")
}`,
    },
  ],
}
