export interface ComponentParam {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

export interface CodeExample {
  title: string
  code: string
  description?: string
}

export interface ComponentEntry {
  id: string
  name: string
  category: string
  description: string
  params: ComponentParam[]
  examples: CodeExample[]
  demoId?: string
  tags: string[]
}

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

export interface ComponentGroup {
  label: string
  icon: string
  categories: ComponentCategory[]
}

export interface ComposeVersion {
  bom: string
  ui: string
  material3: string
  runtime: string
  foundation: string
}

export interface GuideStep {
  title: string
  content: string
  code?: string
  tip?: string
  previewUrl?: string  // iframe 预览地址
}

export interface GuideEntry {
  id: string
  title: string
  description: string
  icon: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  steps: GuideStep[]
  relatedComponents?: string[]
}
