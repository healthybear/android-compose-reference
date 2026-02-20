import type { ComponentEntry } from '../../types'

export const modifierSizeComponent: ComponentEntry = {
  id: 'modifier-size',
  name: 'Modifier.size / fillMax*',
  category: 'Modifier',
  description: '控制组件尺寸的修饰符，包括固定尺寸、填充父容器、限制范围等。',
  tags: ['modifier', 'size', 'width', 'height', 'fillmaxsize', 'layout'],
  params: [
    { name: 'size(dp)', type: 'Modifier', description: '宽高均设为指定值' },
    { name: 'width(dp) / height(dp)', type: 'Modifier', description: '单独设置宽或高' },
    { name: 'fillMaxSize(fraction)', type: 'Modifier', description: '填充父容器，fraction 默认 1f' },
    { name: 'fillMaxWidth / fillMaxHeight', type: 'Modifier', description: '仅填充宽或高' },
    { name: 'wrapContentSize()', type: 'Modifier', description: '收缩到内容大小' },
    { name: 'requiredSize(dp)', type: 'Modifier', description: '强制尺寸，忽略父约束' },
  ],
  examples: [
    {
      title: '常用尺寸修饰符',
      code: `// 固定尺寸
Box(modifier = Modifier.size(100.dp))

// 宽填满，高固定
Box(modifier = Modifier.fillMaxWidth().height(56.dp))

// 填满父容器
Box(modifier = Modifier.fillMaxSize())

// 填满 50%
Box(modifier = Modifier.fillMaxSize(0.5f))`,
    },
    {
      title: '尺寸范围限制',
      code: `Box(
    modifier = Modifier
        .widthIn(min = 100.dp, max = 300.dp)
        .heightIn(min = 48.dp)
)`,
    },
  ],
}
