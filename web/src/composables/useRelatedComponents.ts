import { computed } from 'vue'
import { allComponents } from '@/data/components'
import type { ComponentEntry } from '@/data/types'

export function useRelatedComponents(current: () => ComponentEntry | undefined) {
  return computed<ComponentEntry[]>(() => {
    const comp = current()
    if (!comp) return []
    const currentTags = new Set(comp.tags)
    return allComponents
      .filter(c => c.id !== comp.id)
      .map(c => ({
        component: c,
        score: c.tags.filter(t => currentTags.has(t)).length + (c.category === comp.category ? 2 : 0),
        sharedTags: c.tags.filter(t => currentTags.has(t)).length,
      }))
      .filter(({ sharedTags }) => sharedTags >= 1)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(({ component }) => component)
  })
}
