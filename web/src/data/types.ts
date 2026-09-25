/**
 * 核心数据类型定义
 *
 * 包含：
 * - ComponentEntry: 组件条目（包含参数、示例、标签等）
 * - ComponentParam: 组件参数定义
 * - CodeExample: 代码示例
 * - ComponentCategory: 组件分类枚举
 * - ComponentGroup: 组件分组（用于侧边栏导航）
 * - ComposeVersion: Android 文档 Compose 版本信息
 * - WasmRuntimeVersion: Wasm Demo 运行时版本信息
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
  /**
   * 说明性片段可省略 import、宿主函数或上下文，不单独作为 Kotlin 文件编译。
   * 需要可编译的完整参考实现时，使用同一组件的 `demo` 源码。
   */
  kind?: 'explanatory'
}

/**
 * Compose Wasm Demo 元数据
 */
export interface ComponentDemo {
  id: string          // URL 和 Kotlin DemoRegistry 使用的唯一 ID
  /**
   * demos/ 目录下、由 wasmJsBrowserDistribution 编译的完整 Kotlin 参考示例。
   * 页面展示的“预览源码”直接读取该受控文件，而不是复制一份字符串。
   */
  sourceFile: string
}

/**
 * 使用场景说明
 */
export interface UseCase {
  title: string         // 场景标题
  description: string   // 场景描述
  code?: string         // 示例代码（可选）
}

/**
 * 最佳实践条目
 * 支持两种格式：
 * 1. 简单格式：type + title + content（用于 Element Plus Alert）
 * 2. 详细格式：title + description + goodExample + badExample
 */
export interface BestPractice {
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info'  // Element Plus ElAlert 支持的类型（可选）
  title: string         // 实践标题
  content?: string      // 简单说明（与 type 一起使用）
  description?: string  // 详细说明（旧格式）
  goodExample?: string  // 好的示例（可选）
  badExample?: string   // 错误示例（可选）
}

/**
 * 注意事项/陷阱
 * 支持两种格式：content（新）或 description（旧）
 */
export interface Note {
  type: 'primary' | 'success' | 'warning' | 'error' | 'info'  // Element Plus ElAlert 支持的类型
  title: string         // 标题
  content?: string      // 内容（新格式）
  description?: string  // 内容（旧格式，向后兼容）
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
  demo?: ComponentDemo    // Wasm Demo 元数据（可选，有则显示交互预览）
  tags: string[]          // 标签（用于搜索和相关推荐）

  // 新增深度内容字段（可选）
  useCases?: UseCase[]            // 使用场景
  bestPractices?: BestPractice[]  // 最佳实践
  notes?: Note[]                  // 注意事项/提示
  relatedComponents?: string[]    // 相关组件 ID
  since?: string                  // 引入版本（如 '1.0.0'）
  experimental?: boolean          // 是否实验性 API
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
  | 'Composition'
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
 * Wasm Demo 实际使用的 Compose Multiplatform 运行时版本
 */
export interface WasmRuntimeVersion {
  composeMultiplatform: string
  kotlin: string
}

/**
 * 教程步骤
 */
export interface GuideStep {
  title: string         // 步骤标题
  content: string       // 步骤内容
  code?: string         // 示例代码（可选）
  /** 指南中的代码默认为说明性片段，允许省略上下文。 */
  codeKind?: 'explanatory'
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
