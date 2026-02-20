import type { ComponentEntry } from '../../types'

export const lazyHorizontalGridComponent: ComponentEntry = {
  id: 'lazy-horizontal-grid',
  name: 'LazyHorizontalGrid',
  category: 'LazyList',
  description: '水平方向的懒加载网格，固定行数，横向滚动。',
  tags: ['lazyhorizontalgrid', 'grid', 'horizontal', 'scroll', 'list'],
  params: [
    { name: 'rows', type: 'GridCells', required: true, description: 'GridCells.Fixed(n) 固定行数' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'state', type: 'LazyGridState', default: 'rememberLazyGridState()', description: '网格滚动状态' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'PaddingValues(0.dp)', description: '内容区域内边距' },
    { name: 'content', type: 'LazyGridScope.() -> Unit', required: true, description: '网格内容' },
  ],
  examples: [
    {
      title: '固定 2 行横向滚动',
      code: `LazyHorizontalGrid(
    rows = GridCells.Fixed(2),
    modifier = Modifier.height(200.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    items(items) { item ->
        Card(modifier = Modifier.size(120.dp, 80.dp)) { Text(item.name) }
    }
}`,
    },
  ],
}
