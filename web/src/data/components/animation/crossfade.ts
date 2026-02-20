import type { ComponentEntry } from '../../types'

export const crossfadeComponent: ComponentEntry = {
  id: 'crossfade',
  name: 'Crossfade',
  category: 'Animation',
  description: '在不同内容之间执行淡入淡出交叉过渡，是 AnimatedContent 的简化版，适合简单的内容切换场景。',
  tags: ['animation', 'crossfade', 'fade', 'transition', '淡入淡出'],
  params: [
    { name: 'targetState', type: 'T', required: true, description: '目标状态，变化时触发交叉淡入淡出' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'animationSpec', type: 'FiniteAnimationSpec<Float>', default: 'tween()', description: '动画规格，控制时长和缓动曲线' },
    { name: 'label', type: 'String', default: '"Crossfade"', description: '调试标签' },
    { name: 'content', type: '@Composable (T) -> Unit', required: true, description: '根据目标状态渲染的内容' },
  ],
  examples: [
    {
      title: '页面切换',
      code: `var currentPage by remember { mutableStateOf("home") }

Crossfade(targetState = currentPage) { page ->
    when (page) {
        "home"     -> HomeScreen()
        "profile"  -> ProfileScreen()
        "settings" -> SettingsScreen()
    }
}`,
    },
    {
      title: '图标切换',
      code: `var isPlaying by remember { mutableStateOf(false) }

IconButton(onClick = { isPlaying = !isPlaying }) {
    Crossfade(targetState = isPlaying, animationSpec = tween(300)) { playing ->
        if (playing) {
            Icon(Icons.Default.Pause, contentDescription = "暂停")
        } else {
            Icon(Icons.Default.PlayArrow, contentDescription = "播放")
        }
    }
}`,
    },
  ],
}
