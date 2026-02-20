import type { ComponentEntry } from '../../types'

export const horizontalPagerComponent: ComponentEntry = {
  id: 'horizontal-pager',
  name: 'HorizontalPager',
  category: 'LazyList',
  description: '水平翻页容器，每次滚动一整页，常用于轮播图、引导页，对应 ViewPager2。',
  tags: ['horizontalpager', 'pager', 'viewpager', 'carousel', 'swipe'],
  params: [
    { name: 'state', type: 'PagerState', required: true, description: '通过 rememberPagerState() 创建' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'pageSpacing', type: 'Dp', default: '0.dp', description: '页面间距' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'PaddingValues(0.dp)', description: '内容内边距，可用于显示相邻页面' },
    { name: 'pageContent', type: '@Composable PagerScope.(page: Int) -> Unit', required: true, description: '每页内容，page 为当前页索引' },
  ],
  examples: [
    {
      title: '基础轮播',
      code: `val pagerState = rememberPagerState(pageCount = { images.size })

HorizontalPager(state = pagerState) { page ->
    AsyncImage(
        model = images[page],
        contentDescription = null,
        modifier = Modifier.fillMaxWidth().aspectRatio(16f / 9f)
    )
}`,
    },
    {
      title: '带指示器',
      code: `val pagerState = rememberPagerState(pageCount = { 4 })

Column {
    HorizontalPager(state = pagerState, modifier = Modifier.weight(1f)) { page ->
        Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxSize()) {
            Text("第 \${page + 1} 页")
        }
    }
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.Center
    ) {
        repeat(4) { index ->
            val selected = pagerState.currentPage == index
            Box(
                modifier = Modifier
                    .padding(4.dp)
                    .size(if (selected) 10.dp else 8.dp)
                    .clip(CircleShape)
                    .background(if (selected) MaterialTheme.colorScheme.primary else Color.Gray)
            )
        }
    }
}`,
    },
  ],
}
