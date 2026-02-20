import type { ComponentEntry } from '../../types'

export const animatedContentComponent: ComponentEntry = {
  id: 'animated-content',
  name: 'AnimatedContent',
  category: 'Animation',
  description: '当目标状态变化时，为内容切换添加动画过渡，适合数字变化、页面切换、内容替换等场景。',
  tags: ['animation', 'content', 'transition', 'crossfade', '内容切换动画'],
  params: [
    { name: 'targetState', type: 'S', required: true, description: '目标状态，状态变化时触发动画' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'transitionSpec', type: 'AnimatedContentTransitionScope<S>.() -> ContentTransform', default: 'fadeIn() + scaleIn() togetherWith fadeOut() + scaleOut()', description: '进入/退出动画规格' },
    { name: 'contentAlignment', type: 'Alignment', default: 'Alignment.TopStart', description: '内容对齐方式' },
    { name: 'label', type: 'String', default: '"AnimatedContent"', description: '调试标签' },
    { name: 'content', type: '@Composable AnimatedVisibilityScope.(S) -> Unit', required: true, description: '根据目标状态渲染的内容' },
  ],
  examples: [
    {
      title: '数字计数动画',
      code: `var count by remember { mutableIntStateOf(0) }

Row(verticalAlignment = Alignment.CenterVertically) {
    IconButton(onClick = { count-- }) { Icon(Icons.Default.Remove, null) }

    AnimatedContent(
        targetState = count,
        transitionSpec = {
            if (targetState > initialState) {
                slideInVertically { -it } + fadeIn() togetherWith slideOutVertically { it } + fadeOut()
            } else {
                slideInVertically { it } + fadeIn() togetherWith slideOutVertically { -it } + fadeOut()
            }
        }
    ) { target ->
        Text("$target", style = MaterialTheme.typography.headlineMedium)
    }

    IconButton(onClick = { count++ }) { Icon(Icons.Default.Add, null) }
}`,
    },
    {
      title: '多状态内容切换',
      code: `sealed class UiState { object Loading : UiState(); data class Success(val data: String) : UiState(); object Error : UiState() }

AnimatedContent(targetState = uiState) { state ->
    when (state) {
        is UiState.Loading -> CircularProgressIndicator()
        is UiState.Success -> Text(state.data)
        is UiState.Error   -> Text("加载失败", color = MaterialTheme.colorScheme.error)
    }
}`,
    },
  ],
}
