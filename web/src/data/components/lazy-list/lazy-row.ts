import type { ComponentEntry } from '../../types'

export const lazyRowComponent: ComponentEntry = {
  id: 'lazy-row',
  name: 'LazyRow',
  category: 'LazyList',
  description: '水平方向的懒加载列表，对应 RecyclerView（水平）。',
  tags: ['lazyrow', 'list', 'horizontal', 'scroll', 'recyclerview'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'state', type: 'LazyListState', default: 'rememberLazyListState()', description: '列表滚动状态' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'PaddingValues(0.dp)', description: '内容区域内边距' },
    { name: 'horizontalArrangement', type: 'Arrangement.Horizontal', default: 'Arrangement.Start', description: '子项水平排列方式' },
    { name: 'content', type: 'LazyListScope.() -> Unit', required: true, description: '列表内容' },
  ],
  examples: [
    {
      title: '横向卡片列表',
      code: `LazyRow(
    contentPadding = PaddingValues(horizontal = 16.dp),
    horizontalArrangement = Arrangement.spacedBy(12.dp)
) {
    items(categories) { category ->
        Card(modifier = Modifier.size(120.dp, 80.dp)) {
            Box(contentAlignment = Alignment.Center) { Text(category) }
        }
    }
}`,
    },
  ],
}
