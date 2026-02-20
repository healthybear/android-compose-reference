import type { ComponentEntry } from '../../types'

export const graphicsModifierComponent: ComponentEntry = {
  id: 'modifier-graphics',
  name: 'Modifier.alpha / rotate / scale',
  category: 'Modifier',
  description: '图形变换修饰符，alpha 控制透明度，rotate 旋转，scale 缩放，均不影响布局占位，常与动画结合使用。',
  tags: ['alpha', 'rotate', 'scale', 'transform', '透明度', '旋转', '缩放'],
  params: [
    { name: 'alpha（alpha）', type: 'Float', required: true, description: '透明度，0f 完全透明，1f 完全不透明' },
    { name: 'degrees（rotate）', type: 'Float', required: true, description: '旋转角度，顺时针为正' },
    { name: 'scaleX（scale）', type: 'Float', default: 'scale', description: 'X 轴缩放比例' },
    { name: 'scaleY（scale）', type: 'Float', default: 'scale', description: 'Y 轴缩放比例' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `// 透明度
Box(modifier = Modifier.size(80.dp).background(Color.Red).alpha(0.5f))

// 旋转（不影响布局）
Icon(
    Icons.Default.ArrowForward,
    contentDescription = null,
    modifier = Modifier.rotate(90f)  // 向下箭头
)

// 缩放
Image(
    painter = painterResource(R.drawable.logo),
    contentDescription = null,
    modifier = Modifier.scale(1.5f)
)`,
    },
    {
      title: '配合动画',
      code: `var expanded by remember { mutableStateOf(false) }
val rotation by animateFloatAsState(
    targetValue = if (expanded) 180f else 0f,
    label = "rotation"
)
val alpha by animateFloatAsState(
    targetValue = if (expanded) 1f else 0.4f,
    label = "alpha"
)

IconButton(onClick = { expanded = !expanded }) {
    Icon(
        Icons.Default.ExpandMore,
        contentDescription = if (expanded) "收起" else "展开",
        modifier = Modifier.rotate(rotation).alpha(alpha)
    )
}`,
    },
    {
      title: 'graphicsLayer（组合变换）',
      code: `// graphicsLayer 可同时设置多个变换，性能更好（单次 RenderNode）
Box(
    modifier = Modifier
        .size(100.dp)
        .graphicsLayer {
            alpha = 0.8f
            rotationZ = 45f
            scaleX = 1.2f
            scaleY = 1.2f
            shadowElevation = 8.dp.toPx()
            shape = RoundedCornerShape(8.dp)
            clip = true
        }
        .background(MaterialTheme.colorScheme.primary)
)`,
    },
  ],
}
