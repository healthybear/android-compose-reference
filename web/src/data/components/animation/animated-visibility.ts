import type { ComponentEntry } from '../../types'

export const animatedVisibilityComponent: ComponentEntry = {
  id: 'animated-visibility',
  name: 'AnimatedVisibility',
  category: 'Animation',
  description: '为子组件的显示/隐藏添加进入和退出动画，支持淡入淡出、滑动、缩放等内置过渡效果。',
  tags: ['animation', 'visibility', 'enter', 'exit', '显隐动画'],
  params: [
    { name: 'visible', type: 'Boolean', required: true, description: '是否显示内容' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enter', type: 'EnterTransition', default: 'fadeIn() + expandVertically()', description: '进入动画，可组合多个效果' },
    { name: 'exit', type: 'ExitTransition', default: 'fadeOut() + shrinkVertically()', description: '退出动画，可组合多个效果' },
    { name: 'label', type: 'String', default: '"AnimatedVisibility"', description: '调试标签' },
    { name: 'content', type: '@Composable AnimatedVisibilityScope.() -> Unit', required: true, description: '需要动画显隐的内容' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var visible by remember { mutableStateOf(true) }

Button(onClick = { visible = !visible }) {
    Text(if (visible) "隐藏" else "显示")
}

AnimatedVisibility(visible = visible) {
    Card(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
        Text("可动画显隐的内容", modifier = Modifier.padding(16.dp))
    }
}`,
    },
    {
      title: '自定义进入/退出动画',
      code: `AnimatedVisibility(
    visible = visible,
    enter = slideInHorizontally { -it } + fadeIn(),
    exit = slideOutHorizontally { -it } + fadeOut()
) {
    Text("从左侧滑入/滑出")
}

// 常用进入效果：
// fadeIn()、expandIn()、expandVertically()、expandHorizontally()
// slideInVertically { it }、slideInHorizontally { -it }
// scaleIn()

// 常用退出效果（对应 shrink/slideOut/scaleOut/fadeOut）`,
    },
  ],
}
