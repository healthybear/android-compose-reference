/**
 * 组件数据汇总
 *
 * 功能：
 * 1. 导入所有分类的组件数据
 * 2. 定义当前文档对应的 Compose 版本
 * 3. 配置侧边栏分组结构
 * 4. 导出统一的组件列表供全局使用
 */
import type { ComponentGroup, ComposeVersion } from '../types'
import { foundationComponents } from './foundation/index'
import { layoutComponents } from './layout/index'
import { lazyListComponents } from './lazy-list/index'
import { modifierComponents } from './modifier/index'
import { themeComponents } from './theme/index'
import { materialComponents } from './material/index'
import { formComponents } from './form/index'
import { feedbackComponents } from './feedback/index'
import { navigationComponents } from './navigation/index'
import { animationComponents } from './animation/index'
import { gesturesComponents } from './gestures/index'
import { stateComponents } from './state/index'
import { advancedComponents } from './advanced/index'
import { ecosystemComponents } from './ecosystem/index'

// 当前文档基于的 Compose 版本
// 维护说明：更新 Compose 版本时需同步修改此处
export const composeVersion: ComposeVersion = {
  bom: '2026.02.00',
  ui: '1.10.3',
  material3: '1.4.0',
  runtime: '1.10.3',
  foundation: '1.10.3',
}

// 侧边栏分组配置
// 每个分组包含：
// - label: 显示名称
// - icon: Element Plus 图标名称
// - categories: 包含的组件分类（可多个）
export const componentGroups: ComponentGroup[] = [
  { label: '布局',       icon: 'Grid',        categories: ['Layout', 'LazyList'] },
  { label: '基础组件',   icon: 'Picture',      categories: ['Foundation'] },
  { label: 'Modifier',  icon: 'MagicStick',   categories: ['Modifier'] },
  { label: '主题',       icon: 'Brush',        categories: ['Theme'] },
  { label: '表单',       icon: 'EditPen',      categories: ['Form'] },
  { label: 'Material',  icon: 'Star',         categories: ['Material'] },
  { label: '反馈',       icon: 'Bell',         categories: ['Feedback'] },
  { label: '导航',       icon: 'Menu',         categories: ['Navigation'] },
  { label: '动画',       icon: 'VideoPlay',    categories: ['Animation'] },
  { label: '手势',       icon: 'Pointer',      categories: ['Gestures'] },
  { label: '状态',       icon: 'DataLine',     categories: ['State'] },
  { label: '进阶',       icon: 'Tools',        categories: ['Advanced'] },
  { label: '生态集成',   icon: 'Connection',   categories: ['Ecosystem'] },
]

// 汇总所有分类的组件
// 顺序决定了"上一个/下一个"导航的顺序
export const sampleComponents = [
  ...foundationComponents,
  ...layoutComponents,
  ...lazyListComponents,
  ...modifierComponents,
  ...themeComponents,
  ...materialComponents,
  ...formComponents,
  ...feedbackComponents,
  ...navigationComponents,
  ...animationComponents,
  ...gesturesComponents,
  ...stateComponents,
  ...advancedComponents,
  ...ecosystemComponents,
]

export const allComponents = sampleComponents

export const categories = [...new Set(sampleComponents.map(c => c.category))]
