/**
 * 相关组件推荐算法
 *
 * 功能：根据当前组件的标签和分类，推荐最相关的其他组件
 *
 * 评分规则：
 * - 每个共享标签：+1 分
 * - 相同分类：+2 分
 * - 最少需要 1 个共享标签才会被推荐
 * - 按评分降序排列，最多返回 6 个组件
 */
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
      .map(c => {
        // 计算共享标签数量
        const sharedTags = c.tags.filter(t => currentTags.has(t)).length
        // 评分 = 共享标签数 + 分类加成（同分类 +2 分）
        return { component: c, score: sharedTags + (c.category === comp.category ? 2 : 0), sharedTags }
      })
      // 过滤：至少有 1 个共享标签
      .filter(({ sharedTags }) => sharedTags >= 1)
      // 排序：评分高的在前
      .sort((a, b) => b.score - a.score)
      // 限制：最多返回 6 个
      .slice(0, 6)
      .map(({ component }) => component)
  })
}
