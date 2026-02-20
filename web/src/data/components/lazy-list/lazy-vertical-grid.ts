import type { ComponentEntry } from '../../types'

export const lazyVerticalGridComponent: ComponentEntry = {
  id: 'lazy-vertical-grid',
  name: 'LazyVerticalGrid',
  category: 'LazyList',
  description: '垂直方向的懒加载网格，支持固定列数或自适应列宽。',
  tags: ['lazyverticalgrid', 'grid', 'list', 'recyclerview', 'gridlayout'],
  params: [
    { name: 'columns', type: 'GridCells', required: true, description: 'GridCells.Fixed(n) 固定列数，GridCells.Adaptive(minSize) 自适应' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'state', type: 'LazyGridState', default: 'rememberLazyGridState()', description: '网格滚动状态' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'PaddingValues(0.dp)', description: '内容区域内边距' },
    { name: 'verticalArrangement', type: 'Arrangement.Vertical', default: 'Arrangement.Top', description: '行间距' },
    { name: 'horizontalArrangement', type: 'Arrangement.Horizontal', default: 'Arrangement.Start', description: '列间距' },
    { name: 'content', type: 'LazyGridScope.() -> Unit', required: true, description: '网格内容' },
  ],
  examples: [
    {
      title: '固定 2 列',
      code: `LazyVerticalGrid(
    columns = GridCells.Fixed(2),
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp),
    contentPadding = PaddingValues(16.dp)
) {
    items(photos) { photo ->
        AsyncImage(model = photo.url, contentDescription = null,
            modifier = Modifier.aspectRatio(1f))
    }
}`,
    },
    {
      title: '自适应列宽（最小 150dp）',
      code: `LazyVerticalGrid(columns = GridCells.Adaptive(minSize = 150.dp)) {
    items(items) { item ->
        Card(modifier = Modifier.padding(4.dp)) { Text(item.name) }
    }
}`,
    },
  ],
}
