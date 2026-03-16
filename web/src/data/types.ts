/**
 * 核心数据类型定义
 *
 * 包含：
 * - ComponentEntry: 组件条目（包含参数、示例、标签等）
 * - ComponentParam: 组件参数定义
 * - CodeExample: 代码示例
 * - ComponentCategory: 组件分类枚举
 * - ComponentGroup: 组件分组（用于侧边栏导航）
 * - ComposeVersion: Compose 版本信息
 * - GuideEntry: 教程条目
 */

/**
 * 组件参数定义
 * 用于描述 Compose 组件的函数参数
 */
export interface ComponentParam {
  name: string          // 参数名
  type: string          // 参数类型（如 'Modifier', 'String', '() -> Unit'）
  default?: string      // 默认值（可选）
  description: string   // 参数说明
  required?: boolean    // 是否必填（可选，默认 false）
}

/**
 * 代码示例
 */
export interface CodeExample {
  title: string         // 示例标题
  code: string          // Kotlin 代码
  description?: string  // 示例说明（可选）
}

/**
 * 组件条目
 * 表示一个 Compose 组件的完整文档
 */
export interface ComponentEntry {
  id: string              // 唯一标识（kebab-case，如 'text-button'）
  name: string            // 组件名称（如 'TextButton'）
  category: string        // 所属分类（如 'Material'）
  description: string     // 组件描述
  params: ComponentParam[]  // 参数列表
  examples: CodeExample[]   // 代码示例列表
  demoId?: string         // WASM demo ID（可选，有则显示交互预览）
  tags: string[]          // 标签（用于搜索和相关推荐）
}

/**
 * 组件分类枚举
 * 用于组织和筛选组件
 */
export type ComponentCategory =
  | 'Layout'
  | 'LazyList'
  | 'Foundation'
  | 'Modifier'
  | 'Theme'
  | 'Form'
  | 'Material'
  | 'Feedback'
  | 'Navigation'
  | 'Animation'
  | 'Gestures'
  | 'State'
  | 'Advanced'
  | 'Ecosystem'

/**
 * 组件分组
 * 用于侧边栏导航的分组显示
 */
export interface ComponentGroup {
  label: string               // 分组标签（如 '布局'）
  icon: string                // 图标名称（Element Plus 图标）
  categories: ComponentCategory[]  // 包含的分类
}

/**
 * Compose 版本信息
 * 记录当前文档对应的 Compose 库版本
 */
export interface ComposeVersion {
  bom: string          // BOM 版本
  ui: string           // Compose UI 版本
  material3: string    // Material3 版本
  runtime: string      // Runtime 版本
  foundation: string   // Foundation 版本
}

/**
 * 教程步骤
 */
export interface GuideStep {
  title: string         // 步骤标题
  content: string       // 步骤内容
  code?: string         // 示例代码（可选）
  tip?: string          // 提示信息（可选）
  previewUrl?: string   // iframe 预览地址（可选）
}

/**
 * 教程条目
 */
export interface GuideEntry {
  id: string                    // 唯一标识
  title: string                 // 教程标题
  description: string           // 教程描述
  icon: string                  // 图标
  difficulty: 'beginner' | 'intermediate' | 'advanced'  // 难度级别
  steps: GuideStep[]            // 步骤列表
  relatedComponents?: string[]  // 相关组件 ID（可选）
}
