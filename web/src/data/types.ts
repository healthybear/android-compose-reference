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
  | 'Material'
  | 'Foundation'
  | 'Animation'
  | 'Text'
  | 'Gestures'
  | 'State'
