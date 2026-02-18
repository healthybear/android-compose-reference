# 数据模型

组件条目的 TypeScript 类型定义，位于 [web/src/data/types.ts](../web/src/data/types.ts)。

## ComponentEntry

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | `string` | ✅ | 唯一标识，用于路由和 Demo 匹配，如 `"button"` |
| `name` | `string` | ✅ | 显示名称，如 `"Button"` |
| `category` | `string` | ✅ | 分类，如 `"Layout"` / `"Material"` / `"Foundation"` |
| `description` | `string` | ✅ | 一句话描述 |
| `params` | `ComponentParam[]` | ✅ | 参数列表，可为空数组 |
| `examples` | `CodeExample[]` | ✅ | 代码示例列表 |
| `demoId` | `string` | ❌ | 对应 Wasm Demo 的 ID，有值时显示交互预览 |
| `tags` | `string[]` | ✅ | 搜索关键词 |

## ComponentParam

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | `string` | ✅ | 参数名 |
| `type` | `string` | ✅ | Kotlin 类型 |
| `default` | `string` | ❌ | 默认值 |
| `description` | `string` | ✅ | 参数说明 |
| `required` | `boolean` | ❌ | 是否必填，显示红色标签 |

## CodeExample

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | `string` | ✅ | 示例标题 |
| `code` | `string` | ✅ | Kotlin 代码，Shiki 高亮渲染 |
| `description` | `string` | ❌ | 示例补充说明 |

## 示例

```ts
import type { ComponentEntry } from '../types'

export const myEntry: ComponentEntry = {
  id: 'surface',
  name: 'Surface',
  category: 'Material',
  description: 'Material Design 的基础容器，提供背景色、圆角和阴影。',
  tags: ['surface', 'material', 'container', 'card'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'shape', type: 'Shape', default: 'MaterialTheme.shapes.medium', description: '形状' },
    { name: 'color', type: 'Color', default: 'MaterialTheme.colorScheme.surface', description: '背景色' },
    { name: 'tonalElevation', type: 'Dp', default: '0.dp', description: '色调高度，影响表面颜色深浅' },
    { name: 'content', type: '@Composable () -> Unit', required: true, description: '内容插槽' },
  ],
  examples: [
    {
      title: '基础用法',
      code: `Surface(
    shape = RoundedCornerShape(12.dp),
    tonalElevation = 4.dp
) {
    Text("Hello", modifier = Modifier.padding(16.dp))
}`,
    },
  ],
}
```
