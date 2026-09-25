import type { ComponentEntry } from '../../types'

export const onboardingCompositionComponent: ComponentEntry = {
  id: 'onboarding-composition',
  demo: { id: 'onboarding-composition', sourceFile: 'OnboardingCompositionDemo.kt' },
  name: 'Onboarding Composition',
  category: 'Composition',
  description: '应用引导流程组合示例，展示如何使用 HorizontalPager、AnimatedContent 等组件实现多步骤引导。',
  tags: ['onboarding', 'composition', 'pager', 'tutorial', '引导', '组合'],
  params: [],
  examples: [
    {
      title: '多页引导流程',
      code: `val pagerState = rememberPagerState(pageCount = { 4 })

Column {
    HorizontalPager(state = pagerState) { page ->
        Column {
            Icon(pages[page].icon, contentDescription = null)
            Text(pages[page].title)
            Text(pages[page].description)
        }
    }

    Row {
        pages.forEachIndexed { index, _ ->
            Box(
                modifier = Modifier
                    .size(if (index == pagerState.currentPage) 24.dp else 8.dp, 8.dp)
                    .background(
                        if (index == pagerState.currentPage)
                            MaterialTheme.colorScheme.primary
                        else
                            MaterialTheme.colorScheme.outline
                    )
            )
        }
    }

    Button(onClick = {
        if (pagerState.currentPage < pages.size - 1) {
            scope.launch { pagerState.animateScrollToPage(pagerState.currentPage + 1) }
        } else {
            onComplete()
        }
    }) {
        Text(if (pagerState.currentPage == pages.size - 1) "开始使用" else "下一步")
    }
}`,
    },
  ],
  bestPractices: [
    {
      type: 'tip',
      title: '提供跳过按钮',
      content: '允许用户跳过引导，直接进入应用',
    },
    {
      type: 'tip',
      title: '使用页面指示器',
      content: '显示当前页面位置和总页数',
    },
  ],
  relatedComponents: ['horizontal-pager', 'animated-content', 'button'],
  since: '1.0.0',
}
