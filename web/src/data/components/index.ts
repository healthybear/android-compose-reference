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

// 当前内容基于此版本，如需更新请同步修改
export const composeVersion: ComposeVersion = {
  bom: '2026.02.00',
  ui: '1.10.3',
  material3: '1.4.0',
  runtime: '1.10.3',
  foundation: '1.10.3',
}

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
