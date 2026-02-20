import type { ComponentEntry } from '../../types'

export const lazyStaggeredGridComponent: ComponentEntry = {
  id: 'lazy-staggered-grid',
  name: 'LazyVerticalStaggeredGrid',
  category: 'LazyList',
  description: '垂直瀑布流网格，每列高度独立，适合图片流、卡片流等高度不一致的场景。对应水平方向为 LazyHorizontalStaggeredGrid。',
  tags: ['staggered', 'grid', 'waterfall', 'masonry', '瀑布流'],
  params: [
    { name: 'columns', type: 'StaggeredGridCells', required: true, description: '列数配置，Fixed(n) 固定列数，Adaptive(minSize) 自适应列宽' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'state', type: 'LazyStaggeredGridState', default: 'rememberLazyStaggeredGridState()', description: '滚动状态' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'PaddingValues(0.dp)', description: '内容区域内边距' },
    { name: 'verticalItemSpacing', type: 'Dp', default: '0.dp', description: '子项垂直间距' },
    { name: 'horizontalArrangement', type: 'Arrangement.Horizontal', default: 'Arrangement.spacedBy(0.dp)', description: '列间距配置' },
    { name: 'userScrollEnabled', type: 'Boolean', default: 'true', description: '是否允许用户手势滚动' },
    { name: 'content', type: 'LazyStaggeredGridScope.() -> Unit', required: true, description: '列表内容，使用 item/items DSL' },
  ],
  examples: [
    {
      title: '固定列数瀑布流',
      code: `val items = remember {
    List(20) { index ->
        Pair("Item \${index + 1}", (80 + (index * 37) % 120).dp)
    }
}

LazyVerticalStaggeredGrid(
    columns = StaggeredGridCells.Fixed(2),
    verticalItemSpacing = 8.dp,
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    contentPadding = PaddingValues(16.dp),
    modifier = Modifier.fillMaxSize()
) {
    items(items) { (title, height) ->
        Card(modifier = Modifier.fillMaxWidth().height(height)) {
            Text(title, modifier = Modifier.padding(12.dp))
        }
    }
}`,
    },
    {
      title: '自适应列宽',
      code: `LazyVerticalStaggeredGrid(
    columns = StaggeredGridCells.Adaptive(minSize = 160.dp),
    verticalItemSpacing = 8.dp,
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    contentPadding = PaddingValues(16.dp)
) {
    items(photoList, key = { it.id }) { photo ->
        AsyncImage(
            model = photo.url,
            contentDescription = null,
            modifier = Modifier
                .fillMaxWidth()
                .aspectRatio(photo.width.toFloat() / photo.height),
            contentScale = ContentScale.Crop
        )
    }
}`,
    },
    {
      title: 'LazyHorizontalStaggeredGrid',
      code: `LazyHorizontalStaggeredGrid(
    rows = StaggeredGridCells.Fixed(3),
    verticalArrangement = Arrangement.spacedBy(8.dp),
    horizontalItemSpacing = 8.dp,
    contentPadding = PaddingValues(16.dp),
    modifier = Modifier.height(300.dp)
) {
    items(tagList) { tag ->
        SuggestionChip(
            onClick = {},
            label = { Text(tag) }
        )
    }
}`,
    },
  ],
}
