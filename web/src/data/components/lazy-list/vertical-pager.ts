import type { ComponentEntry } from '../../types'

export const verticalPagerComponent: ComponentEntry = {
  id: 'vertical-pager',
  name: 'VerticalPager',
  category: 'LazyList',
  description: '垂直翻页容器，每次滚动一整页，常用于短视频流、竖向引导页。',
  tags: ['verticalpager', 'pager', 'vertical', 'scroll', 'swipe'],
  params: [
    { name: 'state', type: 'PagerState', required: true, description: '通过 rememberPagerState() 创建' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'pageSpacing', type: 'Dp', default: '0.dp', description: '页面间距' },
    { name: 'contentPadding', type: 'PaddingValues', default: 'PaddingValues(0.dp)', description: '内容内边距' },
    { name: 'pageContent', type: '@Composable PagerScope.(page: Int) -> Unit', required: true, description: '每页内容，page 为当前页索引' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `val pagerState = rememberPagerState(pageCount = { 5 })

VerticalPager(
    state = pagerState,
    modifier = Modifier.fillMaxSize()
) { page ->
    Box(
        contentAlignment = Alignment.Center,
        modifier = Modifier.fillMaxSize()
    ) {
        Text("第 \${page + 1} 页", style = MaterialTheme.typography.headlineMedium)
    }
}`,
    },
    {
      title: '短视频风格 + 当前页判断',
      code: `val pagerState = rememberPagerState(pageCount = { videos.size })

VerticalPager(state = pagerState) { page ->
    val isCurrentPage = pagerState.currentPage == page
    VideoItem(
        video = videos[page],
        isPlaying = isCurrentPage,
        modifier = Modifier.fillMaxSize()
    )
}`,
    },
  ],
}
