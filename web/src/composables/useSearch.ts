import { computed, ref } from 'vue'
import { allComponents } from '@/data/components'
import type { ComponentEntry } from '@/data/types'

export function useSearch() {
  const query = ref('')

  const results = computed<ComponentEntry[]>(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return allComponents
    return allComponents.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.includes(q)) ||
        c.category.toLowerCase().includes(q)
    )
  })

  return { query, results }
}
