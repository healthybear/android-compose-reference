import type { ComponentEntry } from '../../types'

export const imageComponent: ComponentEntry = {
  id: 'image',
  name: 'Image',
  category: 'Foundation',
  description: '显示图片资源的基础组件，支持 Painter、ImageBitmap、ImageVector 三种来源。',
  tags: ['image', 'picture', 'bitmap', 'drawable', 'icon'],
  params: [
    { name: 'painter', type: 'Painter', required: true, description: '图片来源，通常用 painterResource()' },
    { name: 'contentDescription', type: 'String?', required: true, description: '无障碍描述，装饰性图片传 null' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'contentScale', type: 'ContentScale', default: 'ContentScale.Fit', description: '图片缩放方式' },
    { name: 'alpha', type: 'Float', default: '1.0f', description: '透明度' },
    { name: 'colorFilter', type: 'ColorFilter?', default: 'null', description: '颜色滤镜' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `Image(
    painter = painterResource(R.drawable.ic_logo),
    contentDescription = "应用 Logo",
    modifier = Modifier.size(80.dp)
)`,
    },
    {
      title: '裁剪为圆形 + 填充缩放',
      code: `Image(
    painter = painterResource(R.drawable.avatar),
    contentDescription = "头像",
    contentScale = ContentScale.Crop,
    modifier = Modifier
        .size(56.dp)
        .clip(CircleShape)
)`,
    },
    {
      title: '矢量图标着色',
      code: `Image(
    imageVector = Icons.Default.Favorite,
    contentDescription = "收藏",
    colorFilter = ColorFilter.tint(MaterialTheme.colorScheme.primary)
)`,
    },
  ],
}
