import type { ComponentEntry } from '../../types'

export const navigationRailComponent: ComponentEntry = {
  id: 'navigation-rail',
  name: 'NavigationRail',
  category: 'Navigation',
  description: '侧边导航栏，适合平板或折叠屏等宽屏设备，垂直排列导航项，可在顶部放置 FAB 或 Logo。',
  tags: ['navigation', 'rail', 'sidebar', 'tablet', '侧边导航'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'containerColor', type: 'Color', default: 'NavigationRailDefaults.ContainerColor', description: '背景色' },
    { name: 'header', type: '@Composable (ColumnScope.() -> Unit)?', default: 'null', description: '顶部区域，可放置 FAB 或 Logo' },
    { name: 'content', type: '@Composable ColumnScope.() -> Unit', required: true, description: '导航项内容，通常为多个 NavigationRailItem' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `var selectedIndex by remember { mutableIntStateOf(0) }

NavigationRail {
    navItems.forEachIndexed { index, item ->
        NavigationRailItem(
            selected = selectedIndex == index,
            onClick = { selectedIndex = index },
            icon = { Icon(item.icon, contentDescription = item.label) },
            label = { Text(item.label) }
        )
    }
}`,
    },
    {
      title: '顶部带 FAB',
      code: `NavigationRail(
    header = {
        FloatingActionButton(
            onClick = { /* 新建 */ },
            modifier = Modifier.padding(bottom = 8.dp)
        ) {
            Icon(Icons.Default.Add, contentDescription = "新建")
        }
    }
) {
    navItems.forEachIndexed { index, item ->
        NavigationRailItem(
            selected = selectedIndex == index,
            onClick = { selectedIndex = index },
            icon = { Icon(item.icon, contentDescription = item.label) },
            label = { Text(item.label) }
        )
    }
}`,
    },
    {
      title: '自适应布局（手机/平板）',
      code: `val windowSizeClass = calculateWindowSizeClass(activity)
val isExpanded = windowSizeClass.widthSizeClass == WindowWidthSizeClass.Expanded

Row(modifier = Modifier.fillMaxSize()) {
    if (isExpanded) {
        NavigationRail {
            navItems.forEachIndexed { index, item ->
                NavigationRailItem(selected = selectedIndex == index, onClick = { selectedIndex = index }, icon = { Icon(item.icon, null) }, label = { Text(item.label) })
            }
        }
    }
    Box(modifier = Modifier.weight(1f)) {
        // 页面内容
    }
}
if (!isExpanded) {
    NavigationBar {
        navItems.forEachIndexed { index, item ->
            NavigationBarItem(selected = selectedIndex == index, onClick = { selectedIndex = index }, icon = { Icon(item.icon, null) }, label = { Text(item.label) })
        }
    }
}`,
    },
  ],
}
